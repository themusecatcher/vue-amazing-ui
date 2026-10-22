<script setup lang="ts">
import { ref } from 'vue'
import { CalendarOutlined } from '@ant-design/icons-vue'
import { format, subDays, addDays } from 'date-fns'
import type {
  CalendarProps,
  CalendarDayOfWeek,
  CalendarDefaultWeek,
  CalendarDateItem,
  CalendarMonthItem,
  CalendarSelectInfo
} from 'vue-amazing-ui'
import { useMessage } from 'vue-amazing-ui'
const date = ref(Date.now())
const cardDate = ref(Date.now())
const modeDate = ref(Date.now())
const headerDate = ref(Date.now())
const headerSlotDate = ref(Date.now())
const headerFullDate = ref(new Date(2026, 9, 15).getTime())
const startDayOfWeekDate = ref(Date.now())
const dateFormatValue = ref(Date.now())
const weekFormatValue = ref(Date.now())
const monthFormatValue = ref(Date.now())
const panelFormatValue = ref(Date.now())
const noticeDate = ref(Date.now())
const slotDate = ref(Date.now())
const selectDate = ref(new Date(2030, 9, 6).getTime())
const disableDate = ref(Date.now())
const disableWeekendDate = ref(Date.now())
const wholeMonthDate = ref(Date.now())
const dateStr = ref(format(Date.now(), 'yyyy-MM-dd'))
const fullCellDate = ref(new Date(2026, 9, 15).getTime())
const fullMonthDate = ref(new Date(2026, 9, 15).getTime())
const rangeDate = ref(new Date(2026, 9, 15).getTime())
const keyboardDate = ref(new Date(2026, 9, 15).getTime())
// 可选区间用例：入参为时间戳
const validRangeValue: [number, number] = [new Date(2026, 9, 10).getTime(), new Date(2026, 9, 20).getTime()]
// 非受控初值用例：仅作为 defaultValue 传入，不参与 v-model
const defaultDate = new Date(2026, 4, 20).getTime()
const message = useMessage()
// 头部整体替换用例：插槽不提供选项数据，年月选项由使用方自行构造
const headerFullModeOptions = [
  { label: '月', value: 'month' },
  { label: '年', value: 'year' }
]
const headerFullMonthOptions = Array.from({ length: 12 }, (_, index) => ({
  label: `${index + 1}月`,
  value: index + 1
}))
function getHeaderFullYearOptions(year: number): { label: string; value: number }[] {
  const options: { label: string; value: number }[] = []
  for (let value = year - 10; value < year + 10; value++) {
    options.push({ label: `${value}年`, value })
  }
  return options
}
// 插槽参数只读：模式与年月变更经回调写回，年月变更以当月 15 日为代表日
function onHeaderFullTypeChange(value: unknown, onTypeChange: (mode: 'month' | 'year') => void): void {
  if (value === 'month' || value === 'year') onTypeChange(value)
}
function onHeaderFullYearChange(value: unknown, month: number, onChange: (value: string | number) => void): void {
  onChange(new Date(Number(value), month - 1, 15).getTime())
}
function onHeaderFullMonthChange(value: unknown, year: number, onChange: (value: string | number) => void): void {
  onChange(new Date(year, Number(value) - 1, 15).getTime())
}
// 头部标题里的「日」取自插槽 value（与 v-model 同源），无法解析时占位
function getHeaderFullDay(value: string | number | undefined): string {
  if (value === undefined || value === '') return '--'
  const timestamp = Number(value)
  return Number.isFinite(timestamp) ? format(timestamp, 'd') : '--'
}
const displayOptions = [
  {
    label: 'panel',
    value: 'panel'
  },
  {
    label: 'card',
    value: 'card'
  }
]
const modeDisplay = ref<CalendarProps['display']>('card')
const disabledDisplay = ref<CalendarProps['display']>('panel')
const weekOptions = [
  {
    label: '周一',
    value: 0
  },
  {
    label: '周二',
    value: 1
  },
  {
    label: '周三',
    value: 2
  },
  {
    label: '周四',
    value: 3
  },
  {
    label: '周五',
    value: 4
  },
  {
    label: '周六',
    value: 5
  },
  {
    label: '周日',
    value: 6
  }
]
const startDayOfWeek = ref<CalendarDayOfWeek>(6)
function cardDateFormat(date: number, timestamp: number) {
  return String(date).padStart(2, '0')
}
function cardWeekFormat(defaultWeek: CalendarDefaultWeek, week: number) {
  return `周${defaultWeek}`
}
function cardMonthFormat(month: number, timestamp: number) {
  const chineseNumber = ['一', '二', '三', '四', '五', '六', '七', '八', '九', '十', '十一', '十二']
  return `${chineseNumber[month - 1]}月`
}
function panelDateFormat(date: number, timestamp: number) {
  return format(timestamp, 'do')
}
function panelWeekFormat(defaultWeek: CalendarDefaultWeek, week: number, timestamp: number) {
  return format(timestamp, 'EEEE')
}
function panelMonthFormat(month: number, timestamp: number) {
  return format(timestamp, 'MMM')
}
function disabledDate(timestamp: number): boolean {
  if (subDays(Date.now(), 4).getTime() < timestamp && timestamp < addDays(Date.now(), 3).getTime()) {
    return true
  }
  return false
}
function disabledWeekend(timestamp: number): boolean {
  return ['6', '7'].includes(format(timestamp, 'i'))
}
// 整层禁用用例：整个 2026-03 都不可选（月份面板的月份格应呈禁用态）
function disabledMarch(timestamp: number): boolean {
  return format(timestamp, 'yyyy-MM') === '2026-03'
}
// 整格替换用例：#dateFull 替换后组件不再注入选中样式，示例按选中值自行判断
function isFullCellSelected(timestamp: number): boolean {
  return format(timestamp, 'yyyy-MM-dd') === format(fullCellDate.value, 'yyyy-MM-dd')
}
// 整格替换用例：#monthFull 同理由业务自绘，按「年 + 月」判断选中态
function isFullMonthSelected(timestamp: number): boolean {
  return format(timestamp, 'yyyy-MM') === format(fullMonthDate.value, 'yyyy-MM')
}
function onSelect(value: string | number | undefined, info: CalendarSelectInfo) {
  console.log('select', value, info)
  if (typeof value === 'number') message.success(format(value, 'yyyy-MM-dd'))
}
function onChange(
  value: string | number,
  dateOrMonth?: CalendarDateItem['dateObject'] | CalendarMonthItem['monthObject']
) {
  console.log('change', value, dateOrMonth)
}
function onPanelChange(
  value: string | number | undefined,
  info: { year: number; month?: number },
  mode: 'month' | 'year'
) {
  console.log('panelChange', value, info, mode)
}
</script>
<template>
  <div>
    <h1>{{ $route.name }} {{ $route.meta.title }}</h1>
    <ul class="m-list">
      <li>
        <a class="u-file" href="https://date-fns.org/" target="_blank">date-fns</a>
      </li>
    </ul>
    <h2 class="mt30 mb10">基本使用</h2>
    <p class="mb10">日期区固定渲染六周（42 格），末行补齐相邻月份日期，面板 / 卡片形态一致</p>
    <Calendar v-model:value="date" @change="onChange" @panelChange="onPanelChange" />
    <h2 class="mt30 mb10">卡片模式</h2>
    <p class="mb10">卡片模式以 <code>300px</code> 为宽度基准，容器更窄时自适应收缩</p>
    <Calendar v-model:value="cardDate" display="card" @change="onChange" @panelChange="onPanelChange" />
    <h2 class="mt30 mb10">初始模式</h2>
    <p class="mb10"><code>mode</code> 指定面板模式（月 / 年）：外部变更会同步到面板，面板内切换模式不会回写该属性</p>
    <Flex vertical>
      <Space align="center">
        display:<RadioGroup :options="displayOptions" v-model:value="modeDisplay" button button-style="solid" />
      </Space>
      <Calendar v-model:value="modeDate" mode="year" :display="modeDisplay" />
    </Flex>
    <h2 class="mt30 mb10">自定义头部内容</h2>
    <p class="mb10">头部内容行由 <code>header</code> 属性或 <code>#header</code> 插槽替换</p>
    <Space>
      <Calendar v-model:value="headerDate" header="Custom header" display="card" @panelChange="onPanelChange" />
      <Calendar v-model:value="headerSlotDate" display="card" @panelChange="onPanelChange">
        <template #header> <CalendarOutlined /> 日历 </template>
      </Calendar>
    </Space>
    <h2 class="mt30 mb10">头部整体替换</h2>
    <p class="mb10"><code>#headerFull</code> 插槽接管整行头部：使用后默认的年 / 月选择器与模式切换不再渲染</p>
    <Calendar v-model:value="headerFullDate" display="card" @panelChange="onPanelChange">
      <template #headerFull="{ year, month, mode, value, onChange, onTypeChange }">
        <div class="header-full">
          <div class="header-full-title">自定义头部：{{ year }} 年 {{ month }} 月 {{ getHeaderFullDay(value) }} 日</div>
          <div class="header-full-actions">
            <RadioGroup
              :options="headerFullModeOptions"
              :value="mode"
              button
              size="small"
              button-style="solid"
              @change="(value) => onHeaderFullTypeChange(value, onTypeChange)"
            />
            <Select
              size="small"
              :options="getHeaderFullYearOptions(year)"
              :value="year"
              :max-display="8"
              @change="(value) => onHeaderFullYearChange(value, month, onChange)"
            />
            <Select
              size="small"
              :options="headerFullMonthOptions"
              :value="month"
              :max-display="8"
              @change="(value) => onHeaderFullMonthChange(value, year, onChange)"
            />
          </div>
        </div>
      </template>
    </Calendar>
    <h2 class="mt30 mb10">自定义一周的开始</h2>
    <p class="mb10">取值 <code>0-6</code>，<code>0</code> 为周一</p>
    <Flex vertical>
      <Space align="center">
        startDayOfWeek:<RadioGroup :options="weekOptions" v-model:value="startDayOfWeek" button button-style="solid" />
      </Space>
      <Calendar v-model:value="startDayOfWeekDate" :start-day-of-week="startDayOfWeek" />
    </Flex>
    <h2 class="mt30 mb10">自定义展示格式</h2>
    <p class="mb10"
      >使用 <code>dateFormat</code> / <code>weekFormat</code> / <code>monthFormat</code> 自定义日期 / 星期 /
      月的展示格式</p
    >
    <Flex vertical>
      <Space>
        <Calendar
          header="Date format"
          display="card"
          v-model:value="dateFormatValue"
          :date-format="cardDateFormat"
          @panelChange="onPanelChange"
        />
        <Calendar
          header="Week format"
          display="card"
          v-model:value="weekFormatValue"
          :week-format="cardWeekFormat"
          @panelChange="onPanelChange"
        />
        <Calendar
          header="Month format"
          mode="year"
          display="card"
          v-model:value="monthFormatValue"
          :month-format="cardMonthFormat"
          @panelChange="onPanelChange"
        />
      </Space>
      <Calendar
        v-model:value="panelFormatValue"
        :date-format="panelDateFormat"
        :week-format="panelWeekFormat"
        :month-format="panelMonthFormat"
        @panelChange="onPanelChange"
      />
    </Flex>
    <h2 class="mt30 mb10">自定义日期格式</h2>
    <p class="mb10">指定 <code>valueFormat</code> 后，<code>v-model</code> 的值为按该格式表达的字符串</p>
    <Flex vertical>
      <Alert type="info" :message="`You selected date: ${dateStr}`" />
      <Calendar v-model:value="dateStr" value-format="yyyy-MM-dd" @panelChange="onPanelChange" />
    </Flex>
    <h2 class="mt30 mb10">通知事项日历</h2>
    <p class="mb10">使用 <code>#dateValue</code> 替换日号、<code>#dateContent</code> 在日号下追加内容</p>
    <Calendar v-model:value="noticeDate" @panelChange="onPanelChange">
      <template #dateValue="{ dateObject, timestamp }">
        <span v-if="[8, 12, 16].includes(dateObject.date)">{{ dateObject.date }}日</span>
      </template>
      <template #dateContent="{ dateObject, timestamp }">
        <template v-if="[8, 12, 16].includes(dateObject.date)">
          <div class="notice-item">
            <Badge status="warning" />
            <Ellipsis class="notice-text" :tooltip-max-width="240">This is warning event.</Ellipsis>
          </div>
          <div class="notice-item">
            <Badge status="success" />
            <Ellipsis class="notice-text" :tooltip-max-width="240">This is usual event.</Ellipsis>
          </div>
          <div class="notice-item">
            <Badge color="volcano" />
            <Ellipsis class="notice-text" :tooltip-max-width="240">This is volcano event</Ellipsis>
          </div>
        </template>
      </template>
      <template #monthValue="{ monthObject, timestamp }">
        <template v-if="[1, 7].includes(monthObject.month)">
          <template v-if="monthObject.month === 1">二月</template>
          <template v-if="monthObject.month === 7">八月</template>
        </template>
      </template>
      <template #monthContent="{ monthObject, timestamp }">
        <template v-if="[1, 7].includes(monthObject.month)">
          <div class="notice-item">
            <Badge status="warning" />
            <Ellipsis class="notice-text" :tooltip-max-width="240">This is warning event.</Ellipsis>
          </div>
          <div class="notice-item">
            <Badge status="success" />
            <Ellipsis class="notice-text" :tooltip-max-width="240">This is usual event.</Ellipsis>
          </div>
          <div class="notice-item">
            <Badge color="volcano" />
            <Ellipsis class="notice-text" :tooltip-max-width="240">This is volcano event</Ellipsis>
          </div>
        </template>
      </template>
    </Calendar>
    <h2 class="mt30 mb10">自定义插槽</h2>
    <p class="mb10">使用 <code>#week</code> 插槽替换星期标题</p>
    <Calendar v-model:value="slotDate" @panelChange="onPanelChange">
      <template #week="{ defaultWeek, week, timestamp }">
        {{ format(timestamp, 'EEE') }}
      </template>
      <template #dateValue="{ dateObject, timestamp }"> {{ dateObject.date }}日 </template>
      <template #monthValue="{ monthObject, timestamp }">
        {{ format(timestamp, 'MMMM') }}
      </template>
    </Calendar>
    <h2 class="mt30 mb10">整格替换</h2>
    <p class="mb10">
      使用 <code>#dateFull</code> / <code>#monthFull</code> 替换整个单元格；整格由业务自绘，选中 /
      今天等状态需在插槽内自行表达
    </p>
    <Calendar v-model:value="fullCellDate" @panelChange="onPanelChange">
      <template #dateFull="{ dateObject, timestamp, isCurrentDate }">
        <div
          class="full-cell"
          :class="{
            'full-cell-today': isCurrentDate,
            'full-cell-selected': isFullCellSelected(timestamp)
          }"
        >
          {{ dateObject.date }}
        </div>
      </template>
    </Calendar>
    <br />
    <Calendar v-model:value="fullMonthDate" mode="year" @panelChange="onPanelChange">
      <template #monthFull="{ monthObject, timestamp, isCurrent }">
        <div
          class="full-cell"
          :class="{
            'full-cell-today': isCurrent,
            'full-cell-selected': isFullMonthSelected(timestamp)
          }"
        >
          {{ monthObject.month + 1 }}月
        </div>
      </template>
    </Calendar>
    <h2 class="mt30 mb10">选择功能</h2>
    <p class="mb10"
      ><code>select</code> 事件第二参为 <code>{ source }</code>，区分为年 / 月 / 日 / 头部自定义四种来源</p
    >
    <Flex vertical>
      <Alert type="info" :message="`You selected date: ${format(selectDate, 'yyyy-MM-dd')}`" />
      <Calendar v-model:value="selectDate" @select="onSelect" @panelChange="onPanelChange" />
    </Flex>
    <h2 class="mt30 mb10">禁用日期</h2>
    <p class="mb10"
      ><code>disabledDate</code> 入参为时间戳，返回 <code>true</code> 表示该日期不可选；年 /
      月选择器与月格只替换年月、保留原「日」，该日不可选（命中 <code>disabledDate</code> 或落在
      <code>validRange</code> 外）时收敛到同月最近的可用日</p
    >
    <Flex vertical>
      <Space align="center">
        display:<RadioGroup :options="displayOptions" v-model:value="disabledDisplay" button button-style="solid" />
      </Space>
      <Space align="start" class="mt10">
        <Flex vertical>
          <Alert type="info" message="禁用指定日期 (以今天为准的前三天至后三天，含当天)" />
          <Calendar
            v-model:value="disableDate"
            :disabled-date="disabledDate"
            :display="disabledDisplay"
            @select="onSelect"
            @panelChange="onPanelChange"
          />
        </Flex>
        <Flex vertical>
          <Alert type="info" message="禁用所有周末 (星期六 & 星期日)" />
          <Calendar
            v-model:value="disableWeekendDate"
            :disabled-date="disabledWeekend"
            :display="disabledDisplay"
            @select="onSelect"
            @panelChange="onPanelChange"
          />
        </Flex>
      </Space>
    </Flex>
    <h2 class="mt30 mb10">可选日期区间</h2>
    <p class="mb10"
      ><code>validRange</code> 限定可选区间，区间外的日期不可选，年 / 月选择器的可选项一并收窄；字符串入参按
      <code>valueFormat</code> 解析</p
    >
    <Flex vertical>
      <Alert type="info" message="仅允许选择 2026-10-10 ~ 2026-10-20，区间外的日期不可选" />
      <Calendar
        v-model:value="rangeDate"
        :valid-range="validRangeValue"
        @select="onSelect"
        @panelChange="onPanelChange"
      />
    </Flex>
    <h2 class="mt30 mb10">非受控初值</h2>
    <p class="mb10"
      ><code>defaultValue</code> 同时决定初始面板日期与初始选中值；绑定 <code>value</code> 时以
      <code>value</code> 为准</p
    >
    <Calendar :default-value="defaultDate" @panelChange="onPanelChange" />
    <h2 class="mt30 mb10">整层禁用</h2>
    <p class="mb10"
      >整月都被 <code>disabledDate</code> 禁用时，月份面板（<code>mode="year"</code>）的月份格与年 /
      月选择器的对应项一并禁用</p
    >
    <Calendar v-model:value="wholeMonthDate" mode="year" :disabled-date="disabledMarch" @panelChange="onPanelChange" />
    <h2 class="mt30 mb10">键盘导航</h2>
    <p class="mb10"
      >面板可聚焦，键盘直接移动选中日期；日期面板按日粒度移动，月份面板（<code>mode="year"</code>）按月粒度移动；目标不可选时该次移动不生效</p
    >
    <ul class="keyboard-tips mb10">
      <li>日期面板：← / → 一天、↑ / ↓ 一周、PageUp / PageDown 一月、Ctrl（macOS 为 Cmd）+ ← / → 一年</li>
      <li>月份面板：← / → 一月、↑ / ↓ 一行（三个月）、Ctrl（macOS 为 Cmd）+ ← / → 一年（翻页键不响应）</li>
    </ul>
    <Calendar v-model:value="keyboardDate" @panelChange="onPanelChange" />
  </div>
</template>
<style lang="less" scoped>
/* 每条通知事项独占一行：状态圆点固定宽度，文本交给 Ellipsis 截断并悬浮提示 */
.notice-item {
  display: flex;
  align-items: center;
  .notice-text {
    flex: 1;
    min-width: 0;
  }
}
/* 头部整体替换用例：标题行 + 操作行，两端分布 */
.header-full {
  padding: 10px;
  .header-full-title {
    margin-bottom: 10px;
  }
  .header-full-actions {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 8px;
  }
}
/* 整格替换用例的单元格：整格由业务自绘（浅底圆角块），色值取语义变量以便跟随明暗模式 */
.full-cell {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 26px;
  margin: 0 4px;
  color: var(--va-text-color-1);
  background: var(--va-fill-color-4);
  border-radius: 4px;
  cursor: pointer;
  transition: background 0.2s;
  &:hover {
    background: var(--va-fill-color-2);
  }
}
/* 今天：主色描边；选中：主色实心 + 白字（整格替换下由插槽内容自行表达） */
.full-cell-today {
  color: var(--va-cp-calendar-primary-color, var(--va-primary-color));
  box-shadow: inset 0 0 0 1px var(--va-cp-calendar-primary-color, var(--va-primary-color));
}
.full-cell-selected {
  color: #ffffff;
  background: var(--va-cp-calendar-primary-color, var(--va-primary-color));
  &:hover {
    background: var(--va-cp-calendar-primary-color, var(--va-primary-color));
  }
}
.keyboard-tips {
  margin: 0;
  padding-left: 20px;
  color: var(--va-text-color-2);
  li {
    line-height: 1.8;
  }
}
</style>
