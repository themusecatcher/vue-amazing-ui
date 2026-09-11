import { computed, defineComponent, h, onUnmounted, ref, watch } from 'vue'
import type { CSSProperties, PropType } from 'vue'

/**
 * Badge 的单个数字位：变化时上下滚动一格。
 *
 * 刻意保持为无样式组件（.ts 而非 .vue）：滚动所依赖的 transition / transform-style /
 * overflow 等样式统一由 Badge.vue 提供，避免新增 CSS chunk 从而影响按需引入的样式注入。
 */
// 数字位单元：offset 为相对当前项的偏移格数，0 表示位于文档流中的当前项，其余项绝对定位
interface UnitNumber {
  value: string
  offset: number
}
// 计算从 start 滚动到 end 需要走过的格数
function getOffset(start: number, end: number, unit: -1 | 1): number {
  let index = start
  let offset = 0
  while ((index + 10) % 10 !== end) {
    index += unit
    offset += unit
  }
  return offset
}
export default defineComponent({
  name: 'SingleNumber',
  props: {
    value: { type: String as PropType<string>, required: true },
    count: { type: Number as PropType<number>, required: true }
  },
  setup(props) {
    const originValue = computed(() => Number(props.value))
    const originCount = computed(() => Math.abs(props.count))
    // 上一次滚动结束时的位值与整体数值，用于计算滚动方向与位移
    const prevValue = ref(originValue.value)
    const prevCount = ref(originCount.value)
    let transitionEndTimer: ReturnType<typeof setTimeout> | null = null
    function clearTransitionEndTimer(): void {
      if (transitionEndTimer) {
        clearTimeout(transitionEndTimer)
        transitionEndTimer = null
      }
    }
    // 滚动结束（或 transitionend 未触发时的兜底）后复位状态，使 DOM 收敛为单个当前数字
    function onTransitionEnd(): void {
      clearTransitionEndTimer()
      prevValue.value = originValue.value
      prevCount.value = originCount.value
    }
    watch(
      originValue,
      () => {
        clearTransitionEndTimer()
        transitionEndTimer = setTimeout(onTransitionEnd, 1000)
      },
      { flush: 'post' }
    )
    onUnmounted(clearTransitionEndTimer)
    // 当前值未变化（或非法）时不滚动，仅渲染单个数字并禁用过渡，避免首帧/复位时产生位移
    const isStatic = computed(() => {
      return prevValue.value === originValue.value || Number.isNaN(originValue.value) || Number.isNaN(prevValue.value)
    })
    const units = computed<UnitNumber[]>(() => {
      if (isStatic.value) {
        return [{ value: props.value, offset: 0 }]
      }
      const value = originValue.value
      const unitNumberList: number[] = []
      // 构造从当前值起连续 11 个数（覆盖 0~9 全部个位），保证任意两位数字间的滚动路径连续
      for (let index = value; index <= value + 10; index += 1) {
        unitNumberList.push(index)
      }
      const prevIndex = unitNumberList.findIndex((n) => n % 10 === prevValue.value)
      return unitNumberList.map((n, index) => ({
        value: `${n % 10}`,
        offset: index - prevIndex
      }))
    })
    const offsetStyle = computed<CSSProperties>(() => {
      if (isStatic.value) {
        return { transition: 'none' }
      }
      // 数值变大向上滚（+1），变小向下滚（-1），保证滚动方向与数值增减一致
      const unit = prevCount.value < originCount.value ? 1 : -1
      const offset = getOffset(prevValue.value, originValue.value, unit)
      return { transform: `translateY(${offset * -100}%)` }
    })
    return () =>
      h(
        'span',
        { class: 'number-value', style: offsetStyle.value, onTransitionend: onTransitionEnd },
        units.value.map((unit) =>
          h(
            'span',
            {
              class: 'number',
              style: unit.offset ? { position: 'absolute', top: `${unit.offset * 100}%`, left: 0 } : undefined
            },
            unit.value
          )
        )
      )
  }
})
