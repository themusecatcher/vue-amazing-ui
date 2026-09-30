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
      <h2 class="mt30 mb10">不可选择日期</h2>
      <p class="mb10">不可选择今天之后的日期</p>
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
          <DatePicker v-model:value="sizeCaseValue" :size="sizeValue" placeholder="请选择日期" />
        </div>
        <div class="demo-compare-item">
          <p class="demo-compare-label">antd 官网组件</p>
          <a-date-picker
            v-model:value="sizeCaseCompareValue"
            value-format="YYYY-MM-DD"
            :size="sizeValue"
            placeholder="请选择日期"
          />
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
