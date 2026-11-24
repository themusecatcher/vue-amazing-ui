<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref, useSlots, watch } from 'vue'
import type { CSSProperties, VNode } from 'vue'
import { log, useEventListener, useSlotsExist } from 'components/utils'

// 分段渲染的数值：年按 360 天、月按 30 天折算，从 format 中出现的最大单位开始切分
export interface CountdownRenderParams {
  years: number // 剩余年数
  months: number // 剩余月数
  days: number // 剩余天数
  hours: number // 剩余小时数
  minutes: number // 剩余分钟数
  seconds: number // 剩余秒数
  milliseconds: number // 剩余毫秒数
}
export interface Props {
  title?: string // 倒计时标题
  prefix?: string // 倒计时的前缀
  suffix?: string // 倒计时的后缀
  finish?: string // 倒计时完成后的展示文本
  format?: string // 倒计时展示格式，(Y/YY/YYYY：年，M/MM：月，D/DD：日，H/HH：时，m/mm：分钟，s/ss：秒，S/SS/SSS：毫秒，[文本]：原样输出)
  value?: number // 倒计时数值，支持设置未来某时刻的时间戳 (ms) 或 相对剩余时间 (ms)
  future?: boolean // value 是否为未来某时刻的时间戳；为 false 表示相对剩余时间戳
  titleStyle?: CSSProperties // 设置标题的样式
  valueStyle?: CSSProperties // 设置倒计时的样式
  active?: boolean // 是否处于计时状态，仅当 future: false 时生效
  render?: (params: CountdownRenderParams) => VNode | string // 自定义倒计时的分段渲染
}
// 声明组件插槽类型
export interface CountdownSlots {
  title?: () => VNode[]
  prefix?: () => VNode[]
  suffix?: () => VNode[]
  finish?: () => VNode[]
  render?: (params: CountdownRenderParams) => VNode[]
}
const props = withDefaults(defineProps<Props>(), {
  title: undefined,
  prefix: undefined,
  suffix: undefined,
  finish: undefined,
  format: 'HH:mm:ss',
  value: 0,
  future: true,
  titleStyle: () => ({}),
  valueStyle: () => ({}),
  active: true,
  render: undefined
})
defineSlots<CountdownSlots>()
const emit = defineEmits<{ (e: 'finish'): void }>()
// #render 是渲染委托型插槽，渲染内容取决于作用域参数的取值
// title / prefix / suffix / finish 判的是是否渲染出内容，空插槽回落属性值，仍走 useSlotsExist
const slots = useSlots()
const slotsExist = useSlotsExist(['title', 'prefix', 'suffix', 'finish'])
type CountdownUnit = 'year' | 'month' | 'day' | 'hour' | 'minute' | 'second' | 'millisecond'
type CountdownToken = { type: 'literal'; text: string } | { type: 'unit'; unit: CountdownUnit; length: number }
// 单位换算以秒为基准：日取 24 小时，年按 360 天、月按 30 天折算
const SECONDS_PER_MINUTE = 60
const SECONDS_PER_HOUR = 60 * SECONDS_PER_MINUTE
const SECONDS_PER_DAY = 24 * SECONDS_PER_HOUR
const SECONDS_PER_MONTH = 30 * SECONDS_PER_DAY
const SECONDS_PER_YEAR = 12 * SECONDS_PER_MONTH
// 各单位的毫秒数，用于推导刷新间隔
const UNIT_MS: Record<Exclude<CountdownUnit, 'millisecond'>, number> = {
  year: SECONDS_PER_YEAR * 1000,
  month: SECONDS_PER_MONTH * 1000,
  day: SECONDS_PER_DAY * 1000,
  hour: SECONDS_PER_HOUR * 1000,
  minute: SECONDS_PER_MINUTE * 1000,
  second: 1000
}
// 切分顺序：长单位在前，逐级扣除
const SPLIT_UNITS: [Exclude<CountdownUnit, 'millisecond'>, number][] = [
  ['year', SECONDS_PER_YEAR],
  ['month', SECONDS_PER_MONTH],
  ['day', SECONDS_PER_DAY],
  ['hour', SECONDS_PER_HOUR],
  ['minute', SECONDS_PER_MINUTE],
  ['second', 1]
]
// 毫秒级显示约 30fps，与逐帧相比显著降低重渲染次数
const MILLISECOND_TICK = 33
// setTimeout 可接受的最大延迟，超出会被按 0 处理并立即执行
const MAX_TIMEOUT = 2147483647
// format 中每个单位的取值字段
const UNIT_KEY: Record<CountdownUnit, keyof CountdownRenderParams> = {
  year: 'years',
  month: 'months',
  day: 'days',
  hour: 'hours',
  minute: 'minutes',
  second: 'seconds',
  millisecond: 'milliseconds'
}
// 字面量与单位交替匹配：`[文本]` 优先命中，其余按单位字符取最长连续段
const FORMAT_PATTERN = /\[([^\]]*)]|([YMDHmsS])\2*/g
// 单位字符 → 单位与支持的长度：年取 1 / 2 / 4 位（3 位没有实际语义），毫秒取高位 1 ~ 3 位。
// 表外的长度（如 `YYY` / `MMMM`）整段按字面量原样输出，不拆成多个 token 拼出重复数字
const UNIT_SPEC: Record<string, { unit: CountdownUnit; lengths: number[] } | undefined> = {
  Y: { unit: 'year', lengths: [1, 2, 4] },
  M: { unit: 'month', lengths: [1, 2] },
  D: { unit: 'day', lengths: [1, 2] },
  H: { unit: 'hour', lengths: [1, 2] },
  m: { unit: 'minute', lengths: [1, 2] },
  s: { unit: 'second', lengths: [1, 2] },
  S: { unit: 'millisecond', lengths: [1, 2, 3] }
}
const remainingTime = ref(0) // 剩余毫秒数
let deadline = 0 // 截止时刻（壁钟时间戳），所有显示值都由它与当前时刻求差得到
let timerId: number | null = null // 下一次刷新的定时器句柄
let finished = false // 当前截止时刻是否已派发 finish，保证单次截止只派发一次
const tokens = computed<CountdownToken[]>(() => parseFormat(props.format))
// format 中实际出现的单位，未出现的更大单位不单独切分、向下折算给更小的显示单位
const displayUnits = computed(() => {
  const units = new Set<CountdownUnit>()
  for (const token of tokens.value) {
    if (token.type === 'unit') units.add(token.unit)
  }
  return units
})
const tickInterval = computed(() => {
  let interval: number | null = null
  for (const token of tokens.value) {
    if (token.type !== 'unit') continue
    const unitMs = token.unit === 'millisecond' ? MILLISECOND_TICK : UNIT_MS[token.unit]
    interval = interval === null ? unitMs : Math.min(interval, unitMs)
  }
  return interval ?? 1000
})
const displayTime = computed(() => {
  // 秒级及以上按向上取整显示：对齐到显示边界的刷新会晚 1ms 落地，不补偿会让秒数少 1
  return tickInterval.value >= 1000 ? remainingTime.value + 999 : remainingTime.value
})
const timeParts = computed(() => splitRemaining(displayTime.value, displayUnits.value))
const displayText = computed(() =>
  tokens.value.map((token) => (token.type === 'literal' ? token.text : formatUnit(token, timeParts.value))).join('')
)
const renderNode = computed<(() => VNode | string) | null>(() => {
  const render = props.render
  return render ? () => render(timeParts.value) : null
})
const showTitle = computed(() => {
  return slotsExist.title || props.title
})
const showPrefix = computed(() => {
  return slotsExist.prefix || props.prefix
})
const showSuffix = computed(() => {
  return slotsExist.suffix || props.suffix
})
const showFinish = computed(() => {
  // 文本与插槽任一存在即可展示，否则单独传插槽时永远不会显示
  return (slotsExist.finish || props.finish) && remainingTime.value === 0
})
watch(
  () => props.active,
  (active: boolean) => {
    // 绝对时刻模式跟随真实时间推进，不响应暂停
    if (props.future || finished) return
    if (active) {
      if (remainingTime.value <= 0) return
      deadline = remainingTime.value + Date.now()
      scheduleTick()
    } else {
      stopTimer()
    }
  }
)
watch([() => props.value, () => props.future], initCountdown)
watch(tickInterval, () => {
  // 显示粒度变化后刷新节奏随之调整，正在运行时立即重排
  if (timerId !== null) scheduleTick()
})
// 实参 document 在 setup 期求值，SSR（Node）下必须先判断存在性再调用
if (typeof document !== 'undefined') {
  useEventListener(document, 'visibilitychange', handleVisibilityChange)
}
onMounted(initCountdown)
// 卸载时取消定时器，否则回调会持续持有组件作用域
onUnmounted(stopTimer)
/**
 * 解析 format 为字面量与单位交替的 token 列表
 *
 * 一次扫描即完成切分，无需逐段字符串查找：同一占位符可以出现多次（旧实现只替换首个），
 * `[]` 包裹的文本整段按字面量输出，不参与单位解析 —— 需要原样显示的单词必须包裹，
 * 未包裹的字母里出现 Y / M / D 等仍按单位解析，但只认 `UNIT_SPEC` 里的长度。
 */
function parseFormat(format: string): CountdownToken[] {
  const list: CountdownToken[] = []
  // 独立正则实例：全局正则的 lastIndex 是跨调用共享状态，共用会被并发解析打断
  const pattern = new RegExp(FORMAT_PATTERN.source, 'g')
  let lastIndex = 0
  let match = pattern.exec(format)
  while (match !== null) {
    const index = match.index
    if (index > lastIndex) {
      list.push({ type: 'literal', text: format.slice(lastIndex, index) })
    }
    const escaped = match[1]
    if (escaped !== undefined) {
      list.push({ type: 'literal', text: escaped })
    } else {
      // 第二分支的捕获组只落在首个字符上，整段重复在 match[0] 里
      const text = match[0]
      const spec = UNIT_SPEC[text.charAt(0)]
      if (spec?.lengths.includes(text.length)) {
        list.push({ type: 'unit', unit: spec.unit, length: text.length })
      } else {
        list.push({ type: 'literal', text })
      }
    }
    lastIndex = index + match[0].length
    match = pattern.exec(format)
  }
  if (lastIndex < format.length) {
    list.push({ type: 'literal', text: format.slice(lastIndex) })
  }
  return list
}
// 左侧补零到指定长度
function padZero(value: number, length: number): string {
  return String(value).padStart(length, '0')
}
// 按单位取值并补零：token 长度即补零位数（YYYY 补到 4 位）；
// 毫秒例外，长度是「取高位」的位数（S / SS / SSS 分别为高 1 / 2 / 3 位）
function formatUnit(token: Extract<CountdownToken, { type: 'unit' }>, parts: CountdownRenderParams): string {
  const value = parts[UNIT_KEY[token.unit]]
  if (token.unit === 'millisecond') {
    return padZero(Math.floor(value / 10 ** (3 - token.length)), token.length)
  }
  return padZero(value, token.length)
}
// 把剩余毫秒数切分为年、月、日、时、分、秒、毫秒
// 只对 format 中出现的单位做扣除：未出现的更大单位不单独占用，向下折算给更小的显示单位
function splitRemaining(time: number, units: Set<CountdownUnit>): CountdownRenderParams {
  const total = Math.max(time, 0)
  let rest = Math.floor(total / 1000)
  const parts: CountdownRenderParams = {
    years: 0,
    months: 0,
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    milliseconds: total % 1000
  }
  for (const [unit, seconds] of SPLIT_UNITS) {
    if (!units.has(unit)) continue
    const value = Math.floor(rest / seconds)
    parts[UNIT_KEY[unit]] = value
    rest -= value * seconds
  }
  return parts
}
function stopTimer() {
  if (timerId !== null) {
    window.clearTimeout(timerId)
    timerId = null
  }
}
// 下一次刷新的延迟：落在显示值将要变化的单位边界上，+1 抵消定时器提前触发
function nextDelay(): number {
  const interval = tickInterval.value
  if (interval <= MILLISECOND_TICK) return MILLISECOND_TICK
  const remainder = remainingTime.value % interval
  // 超过 2^31-1 的延迟会被浏览器立即执行，长倒计时需分段唤醒
  return Math.min((remainder === 0 ? interval : remainder) + 1, MAX_TIMEOUT)
}
function scheduleTick() {
  stopTimer()
  if (remainingTime.value <= 0) return
  timerId = window.setTimeout(tick, nextDelay())
}
function tick() {
  timerId = null
  if (finished) return
  const rest = deadline - Date.now()
  if (rest <= 0) {
    countDownFinish()
    return
  }
  remainingTime.value = rest
  scheduleTick()
}
// 回到前台时立即校正：后台期间定时器被节流，到期可能已发生但事件尚未派发
function handleVisibilityChange() {
  if (document.visibilityState === 'hidden') return
  if (finished || deadline === 0) return
  // 相对时间模式暂停期间不推进
  if (!props.future && !props.active) return
  stopTimer()
  tick()
}
function countDownFinish() {
  stopTimer()
  remainingTime.value = 0
  if (finished) return
  finished = true
  emit('finish')
}
function initCountdown() {
  stopTimer()
  finished = false
  deadline = 0
  if (!Number.isFinite(props.value)) {
    log('warn', 'Countdown', 'value 应为有限数值，非有限值按 0 处理')
    remainingTime.value = 0
    return
  }
  const now = Date.now()
  // future 为真时 value 是未来某时刻的时间戳，否则是相对剩余毫秒数
  const target = props.future ? props.value : props.value + now
  if (target <= now) {
    countDownFinish()
    return
  }
  deadline = target
  remainingTime.value = deadline - now
  if (props.future || props.active) {
    scheduleTick()
  }
}
function resetCountdown() {
  initCountdown()
}
defineExpose({
  reset: resetCountdown
})
</script>
<template>
  <div class="countdown-wrap">
    <div v-if="showTitle" class="countdown-title" :style="titleStyle">
      <slot name="title">{{ title }}</slot>
    </div>
    <div class="countdown-time">
      <span v-if="showPrefix" class="time-prefix">
        <slot name="prefix">{{ prefix }}</slot>
      </span>
      <span v-if="showFinish" class="time-value" :style="valueStyle">
        <slot name="finish">{{ finish }}</slot>
      </span>
      <span v-else class="time-value" :style="valueStyle">
        <slot v-if="slots.render" name="render" v-bind="timeParts" />
        <component :is="renderNode" v-else-if="renderNode" />
        <template v-else>{{ displayText }}</template>
      </span>
      <span v-if="showSuffix" class="time-suffix">
        <slot name="suffix">{{ suffix }}</slot>
      </span>
    </div>
  </div>
</template>
<style lang="less" scoped>
.countdown-wrap {
  display: inline-block;
  line-height: 1.5714285714285714;
  .countdown-title {
    margin-bottom: 4px;
    color: var(--va-text-color-3);
    font-size: 14px;
  }
  .countdown-time {
    color: var(--va-text-color-1);
    font-size: 24px;
    font-variant-numeric: tabular-nums; // 数字等宽
    .time-prefix {
      display: inline-block;
      margin-right: 4px;
    }
    .time-value {
      display: inline-block;
      direction: ltr;
      // #render 按「是否提供」判定（见脚本内注释），插槽可能渲染为空：空的行内元素仍会撑起
      // 一个行盒，不收敛会让倒计时区域留出一条空白
      &:empty {
        display: none;
      }
    }
    .time-suffix {
      display: inline-block;
      margin-left: 4px;
    }
  }
}
</style>
