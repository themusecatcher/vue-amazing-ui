<script setup lang="ts">
import { ref } from 'vue'
import type { Ref } from 'vue'
import { addDays, endOfDay, format, getDay, startOfDay } from 'date-fns'
import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn'
import zhCN from 'ant-design-vue/es/locale/zh_CN'
import type { DatePickerProps } from 'vue-amazing-ui'
// 对照组件的月份简称与周文案取自 dayjs 的 locale（ConfigProvider 的 locale 只覆盖面板文案），
// 需显式切换为中文，面板才会显示中文月份 / 周文案并使用周一起始（验收期临时设置，阶段 5 随对照清除）
dayjs.locale('zh-cn')
interface ValuePair {
  ours: Ref<number | null> // 本项目组件：毫秒时间戳
  compare: Ref<string | null> // 对照组件：经 value-format 降为格式化字符串
}
/**
 * 每条用例独立持有一组值
 *
 * 用例之间不共用状态，避免在一个用例里选日期影响到其它用例；两套值分别对应该组件与对照组件的绑定口径。
 */
function createValuePair(offsetDays: number = 0): ValuePair {
  const timestamp = addDays(new Date(), offsetDays).getTime()
  return {
    ours: ref<number | null>(timestamp),
    compare: ref<string | null>(format(timestamp, 'yyyy-MM-dd'))
  }
}
/** 日期时间用例的值对：初始值含时分秒，对照侧按展示格式降为字符串 */
function createDateTimePair(): ValuePair {
  const timestamp = new Date().getTime()
  return {
    ours: ref<number | null>(timestamp),
    compare: ref<string | null>(format(timestamp, 'yyyy-MM-dd HH:mm:ss'))
  }
}
interface RangeValuePair {
  ours: Ref<[number, number] | null> // 本项目组件：两段毫秒时间戳
  compare: Ref<[string, string] | null> // 对照组件：经 value-format 降为格式化字符串
}
/** 范围用例的值对：两端都归一到当日零点，与面板按天选择的粒度一致 */
function createRangePair(startOffset: number = 0, endOffset: number = 7): RangeValuePair {
  const start = startOfDay(addDays(new Date(), startOffset)).getTime()
  const end = startOfDay(addDays(new Date(), endOffset)).getTime()
  return {
    ours: ref<[number, number] | null>([start, end]),
    compare: ref<[string, string] | null>([format(start, 'yyyy-MM-dd'), format(end, 'yyyy-MM-dd')])
  }
}
const { ours: basicValue, compare: basicCompareValue } = createValuePair()
const { ours: slashValue, compare: slashCompareValue } = createValuePair()
const { ours: chineseValue, compare: chineseCompareValue } = createValuePair()
const { ours: disabledValue, compare: disabledCompareValue } = createValuePair()
const { ours: beforeTodayValue, compare: beforeTodayCompareValue } = createValuePair(-3)
const { ours: afterTodayValue, compare: afterTodayCompareValue } = createValuePair(3)
const { ours: weekendValue, compare: weekendCompareValue } = createValuePair()
const { ours: sizeCaseValue, compare: sizeCaseCompareValue } = createValuePair()
const { ours: suffixValue, compare: suffixCompareValue } = createValuePair()
const { ours: warningValue, compare: warningCompareValue } = createValuePair()
const { ours: errorValue, compare: errorCompareValue } = createValuePair()
const { ours: borderlessValue, compare: borderlessCompareValue } = createValuePair()
const { ours: placementBottomLeftValue, compare: placementBottomLeftCompareValue } = createValuePair()
const { ours: placementBottomRightValue, compare: placementBottomRightCompareValue } = createValuePair()
const { ours: placementTopLeftValue, compare: placementTopLeftCompareValue } = createValuePair()
const { ours: placementTopRightValue, compare: placementTopRightCompareValue } = createValuePair()
// 范围用例：主用例（官网 range-picker 的日期范围形态）
const { ours: rangeValue, compare: rangeCompareValue } = createRangePair()
const { ours: sizeRangeValue, compare: sizeRangeCompareValue } = createRangePair()
const rangePlaceholder: [string, string] = ['开始日期', '结束日期']
// 禁用日期用例的范围变体：初始为空值，与官网 disabled-date 用例一致
const disabledRangeValue = ref<[number, number] | null>(null)
const disabledRangeCompareValue = ref<[string, string] | null>(null)
// 日期时间用例：主用例（官网 time）+ 时间面板选项 / 12 小时制 / 隐藏「此刻」三个细项
const { ours: datetimeValue, compare: datetimeCompareValue } = createDateTimePair()
const { ours: minuteStepValue, compare: minuteStepCompareValue } = createDateTimePair()
const { ours: twelveHourValue, compare: twelveHourCompareValue } = createDateTimePair()
const { ours: showNowValue, compare: showNowCompareValue } = createDateTimePair()
// 不可选择日期和时间用例：初始为空值，与官网 disabled-date 用例一致
const disabledDateTimeValue = ref<number | null>(null)
const disabledDateTimeCompareValue = ref<string | null>(null)
// 选中日期时的默认时分秒（官网用例经 showTime.defaultValue 传入 00:00:00）
const defaultTime = startOfDay(new Date()).getTime()
const sizeValue = ref<DatePickerProps['size']>('middle')
const sizeOptions: Array<{ label: string; value: NonNullable<DatePickerProps['size']> }> = [
  { label: 'small', value: 'small' },
  { label: 'middle', value: 'middle' },
  { label: 'large', value: 'large' }
]
// 本项目：disabledDate 入参为「当日零点」的毫秒时间戳
function disabledDateBefore(timestamp: number): boolean {
  return startOfDay(timestamp).getTime() > startOfDay(new Date()).getTime()
}
function disabledDateAfter(timestamp: number): boolean {
  const current = endOfDay(timestamp).getTime()
  return current <= endOfDay(new Date()).getTime() || current > endOfDay(addDays(new Date(), 7)).getTime()
}
function disabledWeekendDate(timestamp: number): boolean {
  const day = getDay(timestamp)
  return day === 0 || day === 6
}
// 官网组件：disabledDate 入参为日期库实例，仅按需读取时间与星期，避免引入日期库
interface ComparableDate {
  valueOf: () => number
  day: () => number
}
function compareDisabledDateBefore(current: ComparableDate): boolean {
  return startOfDay(current.valueOf()).getTime() > startOfDay(new Date()).getTime()
}
function compareDisabledDateAfter(current: ComparableDate): boolean {
  const value = endOfDay(current.valueOf()).getTime()
  return value <= endOfDay(new Date()).getTime() || value > endOfDay(addDays(new Date(), 7)).getTime()
}
function compareDisabledWeekendDate(current: ComparableDate): boolean {
  return current.day() === 0 || current.day() === 6
}
/** 半开区间 [start, end) 的整数序列 */
function range(start: number, end: number): number[] {
  return Array.from({ length: end - start }, (_, index) => index + start)
}
/** 不可选择今天及之前（官网「不可选择日期和时间」用例同口径） */
function disabledDateTodayOrBefore(timestamp: number): boolean {
  return endOfDay(timestamp).getTime() <= endOfDay(new Date()).getTime()
}
function compareDisabledDateTodayOrBefore(current: ComparableDate): boolean {
  return endOfDay(current.valueOf()).getTime() <= endOfDay(new Date()).getTime()
}
/**
 * 禁用的时间区间（与官网用例同一组：4-23 时 / 30-59 分 / 55-56 秒）
 *
 * 两侧共用：本项目的 `disabledTime` 入参为时间戳、官网组件入参为日期库实例，两者均未使用该入参。
 */
function disabledDateTimeUnits() {
  return {
    disabledHours: () => range(4, 24),
    disabledMinutes: () => range(30, 60),
    disabledSeconds: () => [55, 56]
  }
}
</script>
<template>
  <a-config-provider :locale="zhCN">
    <div>
      <h1>{{ $route.name }} {{ $route.meta.title }}</h1>
      <h2 class="mt30 mb10">基本使用</h2>
      <div class="demo-compare">
        <div class="demo-compare-item">
          <p class="demo-compare-label">本项目组件</p>
          <DatePicker v-model:value="basicValue" placeholder="请选择日期" />
        </div>
        <div class="demo-compare-item">
          <p class="demo-compare-label">antd 官网组件</p>
          <a-date-picker v-model:value="basicCompareValue" value-format="YYYY-MM-DD" placeholder="请选择日期" />
        </div>
      </div>
      <h2 class="mt30 mb10">日期格式</h2>
      <p class="mb10">使用 <code>format</code> 定制展示格式</p>
      <div class="demo-compare">
        <div class="demo-compare-item">
          <p class="demo-compare-label">本项目组件</p>
          <Space vertical>
            <DatePicker v-model:value="slashValue" format="yyyy/MM/dd" placeholder="请选择日期" />
            <DatePicker v-model:value="chineseValue" format="yyyy年MM月dd日" placeholder="请选择日期" />
          </Space>
        </div>
        <div class="demo-compare-item">
          <p class="demo-compare-label">antd 官网组件</p>
          <Space vertical>
            <a-date-picker
              v-model:value="slashCompareValue"
              value-format="YYYY-MM-DD"
              format="YYYY/MM/DD"
              placeholder="请选择日期"
            />
            <a-date-picker
              v-model:value="chineseCompareValue"
              value-format="YYYY-MM-DD"
              format="YYYY年MM月DD日"
              placeholder="请选择日期"
            />
          </Space>
        </div>
      </div>
      <h2 class="mt30 mb10">范围选择器</h2>
      <p class="mb10">通过设置 <code>type</code> 属性，指定范围选择器类型</p>
      <div class="demo-compare">
        <div class="demo-compare-item">
          <p class="demo-compare-label">本项目组件</p>
          <DatePicker v-model:value="rangeValue" type="daterange" :placeholder="rangePlaceholder" />
        </div>
        <div class="demo-compare-item">
          <p class="demo-compare-label">antd 官网组件</p>
          <a-range-picker v-model:value="rangeCompareValue" value-format="YYYY-MM-DD" />
        </div>
      </div>
      <h2 class="mt30 mb10">日期时间选择</h2>
      <p class="mb10">
        <code>type="datetime"</code> 增加选择时间功能，时间面板选项经 <code>timePickerProps</code>
        透传；展开期间的选择只落在草稿值上，点「确定」或「此刻」才提交，关闭面板则丢弃草稿
      </p>
      <div class="demo-compare">
        <div class="demo-compare-item">
          <p class="demo-compare-label">本项目组件</p>
          <DatePicker v-model:value="datetimeValue" type="datetime" placeholder="请选择日期时间" />
        </div>
        <div class="demo-compare-item">
          <p class="demo-compare-label">antd 官网组件</p>
          <a-date-picker
            v-model:value="datetimeCompareValue"
            value-format="YYYY-MM-DD HH:mm:ss"
            show-time
            placeholder="请选择日期时间"
          />
        </div>
      </div>
      <p class="mt20 mb10">分钟按 5 分钟步长选择</p>
      <div class="demo-compare">
        <div class="demo-compare-item">
          <p class="demo-compare-label">本项目组件</p>
          <DatePicker
            v-model:value="minuteStepValue"
            type="datetime"
            :time-picker-props="{ minuteStep: 5 }"
            placeholder="请选择日期时间"
          />
        </div>
        <div class="demo-compare-item">
          <p class="demo-compare-label">antd 官网组件</p>
          <a-date-picker
            v-model:value="minuteStepCompareValue"
            value-format="YYYY-MM-DD HH:mm:ss"
            :show-time="{ minuteStep: 5 }"
            placeholder="请选择日期时间"
          />
        </div>
      </div>
      <p class="mt20 mb10">12 小时制：<code>use12Hours</code> 与 12 小时制格式（<code>hh</code>）配合使用</p>
      <div class="demo-compare">
        <div class="demo-compare-item">
          <p class="demo-compare-label">本项目组件</p>
          <DatePicker
            v-model:value="twelveHourValue"
            type="datetime"
            format="yyyy-MM-dd hh:mm:ss"
            :time-picker-props="{ use12Hours: true }"
            placeholder="请选择日期时间"
          />
        </div>
        <div class="demo-compare-item">
          <p class="demo-compare-label">antd 官网组件</p>
          <a-date-picker
            v-model:value="twelveHourCompareValue"
            value-format="YYYY-MM-DD HH:mm:ss"
            format="YYYY-MM-DD hh:mm:ss"
            :show-time="{ use12Hours: true }"
            placeholder="请选择日期时间"
          />
        </div>
      </div>
      <p class="mt20 mb10">隐藏「此刻」快捷</p>
      <div class="demo-compare">
        <div class="demo-compare-item">
          <p class="demo-compare-label">本项目组件</p>
          <DatePicker v-model:value="showNowValue" type="datetime" :show-now="false" placeholder="请选择日期时间" />
        </div>
        <div class="demo-compare-item">
          <p class="demo-compare-label">antd 官网组件</p>
          <a-date-picker
            v-model:value="showNowCompareValue"
            value-format="YYYY-MM-DD HH:mm:ss"
            show-time
            :show-now="false"
            placeholder="请选择日期时间"
          />
        </div>
      </div>
      <h2 class="mt30 mb10">禁用</h2>
      <div class="demo-compare">
        <div class="demo-compare-item">
          <p class="demo-compare-label">本项目组件</p>
          <DatePicker disabled v-model:value="disabledValue" placeholder="请选择日期" />
        </div>
        <div class="demo-compare-item">
          <p class="demo-compare-label">antd 官网组件</p>
          <a-date-picker
            disabled
            v-model:value="disabledCompareValue"
            value-format="YYYY-MM-DD"
            placeholder="请选择日期"
          />
        </div>
      </div>
      <h2 class="mt30 mb10">不可选择日期和时间</h2>
      <p class="mb10">
        <code>disabledDate</code> 与 <code>disabledTime</code> 分别禁止选择部分日期与时间，<code>disabledTime</code>
        需与带时间的形态配合使用
      </p>
      <div class="demo-compare">
        <div class="demo-compare-item">
          <p class="demo-compare-label">本项目组件</p>
          <DatePicker
            v-model:value="disabledDateTimeValue"
            type="datetime"
            :disabled-date="disabledDateTodayOrBefore"
            :disabled-time="disabledDateTimeUnits"
            :default-time="defaultTime"
            placeholder="请选择日期时间"
          />
        </div>
        <div class="demo-compare-item">
          <p class="demo-compare-label">antd 官网组件</p>
          <a-date-picker
            v-model:value="disabledDateTimeCompareValue"
            format="YYYY-MM-DD HH:mm:ss"
            value-format="YYYY-MM-DD HH:mm:ss"
            :disabled-date="compareDisabledDateTodayOrBefore"
            :disabled-time="disabledDateTimeUnits"
            :show-time="{ defaultValue: dayjs('00:00:00', 'HH:mm:ss') }"
            placeholder="请选择日期时间"
          />
        </div>
      </div>
      <p class="mt20 mb10">不可选择今天之后的日期</p>
      <div class="demo-compare">
        <div class="demo-compare-item">
          <p class="demo-compare-label">本项目组件</p>
          <DatePicker v-model:value="beforeTodayValue" :disabled-date="disabledDateBefore" placeholder="请选择日期" />
        </div>
        <div class="demo-compare-item">
          <p class="demo-compare-label">antd 官网组件</p>
          <a-date-picker
            v-model:value="beforeTodayCompareValue"
            value-format="YYYY-MM-DD"
            :disabled-date="compareDisabledDateBefore"
            placeholder="请选择日期"
          />
        </div>
      </div>
      <p class="mt20 mb10">只能选择未来七天内的日期</p>
      <div class="demo-compare">
        <div class="demo-compare-item">
          <p class="demo-compare-label">本项目组件</p>
          <DatePicker v-model:value="afterTodayValue" :disabled-date="disabledDateAfter" placeholder="请选择日期" />
        </div>
        <div class="demo-compare-item">
          <p class="demo-compare-label">antd 官网组件</p>
          <a-date-picker
            v-model:value="afterTodayCompareValue"
            value-format="YYYY-MM-DD"
            :disabled-date="compareDisabledDateAfter"
            placeholder="请选择日期"
          />
        </div>
      </div>
      <p class="mt20 mb10">日期范围不可选择今天及之前（<code>disabledDate</code> 同时作用于两个面板）</p>
      <div class="demo-compare">
        <div class="demo-compare-item">
          <p class="demo-compare-label">本项目组件</p>
          <DatePicker
            v-model:value="disabledRangeValue"
            type="daterange"
            :disabled-date="disabledDateTodayOrBefore"
            :placeholder="rangePlaceholder"
          />
        </div>
        <div class="demo-compare-item">
          <p class="demo-compare-label">antd 官网组件</p>
          <a-range-picker
            v-model:value="disabledRangeCompareValue"
            value-format="YYYY-MM-DD"
            :disabled-date="compareDisabledDateTodayOrBefore"
          />
        </div>
      </div>
      <p class="mt20 mb10">不可选择周六与周日</p>
      <div class="demo-compare">
        <div class="demo-compare-item">
          <p class="demo-compare-label">本项目组件</p>
          <DatePicker v-model:value="weekendValue" :disabled-date="disabledWeekendDate" placeholder="请选择日期" />
        </div>
        <div class="demo-compare-item">
          <p class="demo-compare-label">antd 官网组件</p>
          <a-date-picker
            v-model:value="weekendCompareValue"
            value-format="YYYY-MM-DD"
            :disabled-date="compareDisabledWeekendDate"
            placeholder="请选择日期"
          />
        </div>
      </div>
      <h2 class="mt30 mb10">三种大小</h2>
      <Radio v-model:value="sizeValue" :options="sizeOptions" button button-style="solid" />
      <div class="demo-compare mt10">
        <div class="demo-compare-item">
          <p class="demo-compare-label">本项目组件</p>
          <Space vertical>
            <DatePicker v-model:value="sizeCaseValue" :size="sizeValue" placeholder="请选择日期" />
            <DatePicker
              v-model:value="sizeRangeValue"
              type="daterange"
              :size="sizeValue"
              :placeholder="rangePlaceholder"
            />
          </Space>
        </div>
        <div class="demo-compare-item">
          <p class="demo-compare-label">antd 官网组件</p>
          <Space vertical>
            <a-date-picker
              v-model:value="sizeCaseCompareValue"
              value-format="YYYY-MM-DD"
              :size="sizeValue"
              placeholder="请选择日期"
            />
            <a-range-picker v-model:value="sizeRangeCompareValue" value-format="YYYY-MM-DD" :size="sizeValue" />
          </Space>
        </div>
      </div>
      <h2 class="mt30 mb10">后缀图标</h2>
      <div class="demo-compare">
        <div class="demo-compare-item">
          <p class="demo-compare-label">本项目组件</p>
          <DatePicker v-model:value="suffixValue" placeholder="请选择日期">
            <template #suffixIcon>
              <svg
                width="1em"
                height="1em"
                viewBox="0 0 1024 1024"
                fill="currentColor"
                focusable="false"
                aria-hidden="true"
              >
                <path
                  d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z"
                />
                <path
                  d="M686.7 638.6L544.1 535.5V288c0-4.4-3.6-8-8-8H488c-4.4 0-8 3.6-8 8v275.4c0 2.6 1.2 5 3.3 6.5l165.4 120.6c3.6 2.6 8.6 1.8 11.2-1.7l28.6-39c2.6-3.7 1.8-8.7-1.8-11.2z"
                />
              </svg>
            </template>
          </DatePicker>
        </div>
        <div class="demo-compare-item">
          <p class="demo-compare-label">antd 官网组件</p>
          <a-date-picker v-model:value="suffixCompareValue" value-format="YYYY-MM-DD" placeholder="请选择日期">
            <template #suffixIcon>
              <svg
                width="1em"
                height="1em"
                viewBox="0 0 1024 1024"
                fill="currentColor"
                focusable="false"
                aria-hidden="true"
              >
                <path
                  d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z"
                />
                <path
                  d="M686.7 638.6L544.1 535.5V288c0-4.4-3.6-8-8-8H488c-4.4 0-8 3.6-8 8v275.4c0 2.6 1.2 5 3.3 6.5l165.4 120.6c3.6 2.6 8.6 1.8 11.2-1.7l28.6-39c2.6-3.7 1.8-8.7-1.8-11.2z"
                />
              </svg>
            </template>
          </a-date-picker>
        </div>
      </div>
      <h2 class="mt30 mb10">自定义状态</h2>
      <div class="demo-compare">
        <div class="demo-compare-item">
          <p class="demo-compare-label">本项目组件</p>
          <Space vertical>
            <DatePicker v-model:value="warningValue" status="warning" placeholder="请选择日期" />
            <DatePicker v-model:value="errorValue" status="error" placeholder="请选择日期" />
          </Space>
        </div>
        <div class="demo-compare-item">
          <p class="demo-compare-label">antd 官网组件</p>
          <Space vertical>
            <a-date-picker
              v-model:value="warningCompareValue"
              value-format="YYYY-MM-DD"
              status="warning"
              placeholder="请选择日期"
            />
            <a-date-picker
              v-model:value="errorCompareValue"
              value-format="YYYY-MM-DD"
              status="error"
              placeholder="请选择日期"
            />
          </Space>
        </div>
      </div>
      <h2 class="mt30 mb10">无边框</h2>
      <div class="demo-compare">
        <div class="demo-compare-item">
          <p class="demo-compare-label">本项目组件</p>
          <DatePicker v-model:value="borderlessValue" :bordered="false" placeholder="请选择日期" />
        </div>
        <div class="demo-compare-item">
          <p class="demo-compare-label">antd 官网组件</p>
          <a-date-picker
            v-model:value="borderlessCompareValue"
            value-format="YYYY-MM-DD"
            :bordered="false"
            placeholder="请选择日期"
          />
        </div>
      </div>
      <h2 class="mt30 mb10">弹出位置</h2>
      <div class="demo-compare">
        <div class="demo-compare-item">
          <p class="demo-compare-label">本项目组件</p>
          <Space wrap>
            <DatePicker v-model:value="placementBottomLeftValue" placement="bottomLeft" placeholder="左下" />
            <DatePicker v-model:value="placementBottomRightValue" placement="bottomRight" placeholder="右下" />
            <DatePicker v-model:value="placementTopLeftValue" placement="topLeft" placeholder="左上" />
            <DatePicker v-model:value="placementTopRightValue" placement="topRight" placeholder="右上" />
          </Space>
        </div>
        <div class="demo-compare-item">
          <p class="demo-compare-label">antd 官网组件</p>
          <Space wrap>
            <a-date-picker
              v-model:value="placementBottomLeftCompareValue"
              value-format="YYYY-MM-DD"
              placement="bottomLeft"
              placeholder="左下"
            />
            <a-date-picker
              v-model:value="placementBottomRightCompareValue"
              value-format="YYYY-MM-DD"
              placement="bottomRight"
              placeholder="右下"
            />
            <a-date-picker
              v-model:value="placementTopLeftCompareValue"
              value-format="YYYY-MM-DD"
              placement="topLeft"
              placeholder="左上"
            />
            <a-date-picker
              v-model:value="placementTopRightCompareValue"
              value-format="YYYY-MM-DD"
              placement="topRight"
              placeholder="右上"
            />
          </Space>
        </div>
      </div>
    </div>
  </a-config-provider>
</template>
<style lang="less" scoped>
// 参考库对照布局（验收期临时结构，阶段 5 清除）
.demo-compare {
  display: flex;
  flex-wrap: wrap;
  gap: 16px 48px;
  align-items: flex-start;
  .demo-compare-item {
    min-width: 160px;
  }
  .demo-compare-label {
    margin: 0 0 8px;
    font-size: 12px;
    line-height: 1.5;
    color: rgba(0, 0, 0, 0.45);
  }
}
</style>
