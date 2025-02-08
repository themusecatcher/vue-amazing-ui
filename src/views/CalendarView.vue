<script setup lang="ts">
import { ref, watchEffect } from 'vue'
import { CalendarOutlined } from '@ant-design/icons-vue'
import { subDays, addDays, format } from 'date-fns'
import type { CalendarStartDayOfWeek, CalendarDefaultWeek, CalendarDateItem, CalendarMonthItem } from 'components/index'
const date = ref(Date.now())
const cardDate = ref(Date.now())
const modeDate = ref(Date.now())
const headerDate = ref(Date.now())
const startDayOfWeekDate = ref(Date.now())
const formatDate = ref(Date.now())
const noticeDate = ref(Date.now())
const selectDate = ref(Date.now())
const disableDate = ref(Date.now())
const dateStr = ref(format(Date.now(), 'yyyy-MM-dd'))
const message = ref()
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
const modeDisplay = ref('card')
const display = ref('panel')
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
const startDayOfWeek = ref<CalendarStartDayOfWeek>(6)
watchEffect(() => {
  console.log('date', date.value)
})
watchEffect(() => {
  console.log('cardDate', cardDate.value)
})
watchEffect(() => {
  console.log('modeDate', modeDate.value)
})
watchEffect(() => {
  console.log('headerDate', headerDate.value)
})
watchEffect(() => {
  console.log('startDayOfWeekDate', startDayOfWeekDate.value)
})
watchEffect(() => {
  console.log('formatDate', formatDate.value)
})
watchEffect(() => {
  console.log('noticeDate', noticeDate.value)
})
watchEffect(() => {
  console.log('selectDate', selectDate.value)
})
watchEffect(() => {
  console.log('disableDate', disableDate.value)
})
watchEffect(() => {
  console.log('dateStr', dateStr.value)
})
function cardDateFormat(date: number) {
  return String(date).padStart(2, '0')
}
function cardWeekFormat(defaultWeek: CalendarDefaultWeek, week: number) {
  return `周${defaultWeek}`
}
function cardMonthFormat(month: number) {
  const chineseNumber = ['一', '二', '三', '四', '五', '六', '七', '八', '九', '十', '十一', '十二']
  return `${chineseNumber[month - 1]}月`
}
function panelDateFormat(date: number) {
  return `${date}日`
}
function panelWeekFormat(defaultWeek: CalendarDefaultWeek, week: number) {
  return `星期${defaultWeek}`
}
function disabledDate(timestamp: number): boolean {
  // console.log('timestamp', timestamp)
  if (subDays(Date.now(), 4).getTime() < timestamp && timestamp < addDays(Date.now(), 3).getTime()) {
    return true
  }
  return false
}
function onSelect(date: string | number, source: 'date' | 'month') {
  console.log('select', date, source)
  message.value.success(format(date, 'yyyy-MM-dd'))
}
function onChange(date: string | number, dateObject: CalendarDateItem['dateObject'] | CalendarMonthItem['dateObject']) {
  console.log('change', date, dateObject)
}
interface PanelInfo {
  year: number
  month?: number
}
function onPanelChange(info: PanelInfo, mode: 'month' | 'year') {
  console.log('panelChange', info, mode)
}
</script>
<template>
  <div>
    <h1>{{ $route.name }} {{ $route.meta.title }}</h1>
    <h2 class="mt30 mb10">基本使用</h2>
    <Calendar v-model:value="date" @change="onChange" @panelChange="onPanelChange" />
    <h2 class="mt30 mb10">卡片模式</h2>
    <Calendar v-model:value="cardDate" display="card" />
    <h2 class="mt30 mb10">初始模式</h2>
    <Flex vertical>
      <Space align="center">
        display:<Radio :options="displayOptions" v-model:value="modeDisplay" button button-style="solid" />
      </Space>
      <Calendar v-model:value="modeDate" mode="year" :display="modeDisplay" />
    </Flex>
    <h2 class="mt30 mb10">自定义头部内容</h2>
    <Space>
      <Calendar v-model:value="headerDate" header="Custom header" display="card" @panelChange="onPanelChange" />
      <Calendar v-model:value="headerDate" display="card" @panelChange="onPanelChange">
        <template #header>
          <CalendarOutlined /> 日历
        </template>
      </Calendar>
    </Space>
    <h2 class="mt30 mb10">自定义一周的开始</h2>
    <Flex vertical>
      <Space align="center">
        startDayOfWeek:<Radio :options="weekOptions" v-model:value="startDayOfWeek" button button-style="solid" />
      </Space>
      <Calendar v-model:value="startDayOfWeekDate" :start-day-of-week="startDayOfWeek" />
    </Flex>
    <h2 class="mt30 mb10">自定义展示格式</h2>
    <h3 class="mb10">使用 dateFormat / weekFormat / monthFormat 自定义日期/星期/月的展示格式</h3>
    <Space>
      <Calendar v-model:value="formatDate" header="Date format" display="card" :date-format="cardDateFormat" @panelChange="onPanelChange" />
      <Calendar v-model:value="formatDate" header="Week format" display="card" :week-format="cardWeekFormat" @panelChange="onPanelChange" />
      <Calendar v-model:value="formatDate" header="Month format" mode="year" display="card" :month-format="cardMonthFormat" @panelChange="onPanelChange" />
    </Space>
    <Calendar
      v-model:value="formatDate"
      :date-format="panelDateFormat"
      :week-format="panelWeekFormat"
      @panelChange="onPanelChange"
    />
    <h2 class="mt30 mb10">通知事项日历</h2>
    <Calendar v-model:value="noticeDate" @panelChange="onPanelChange">
      <template #dateCellValue="{ dateObject, year, month, date, timestamp }">
        <template v-if="format(timestamp, 'yyyy-MM-dd') === '2025-02-12'">
          <GradientText
            style="line-height: 24px"
            :size="16"
            :weight="600"
            :gradient="{
              deg: '90deg',
              from: '#09c8ce',
              to: '#eb2f96' }"
          >{{ date }} (元宵节)</GradientText>
        </template>
      </template>
      <template #dateCellContent="{ dateObject, year, month, date, timestamp }">
        <template v-if="format(timestamp, 'yyyy-MM-dd') === '2025-02-12'">
          <Badge color="geekblue" title="This a geekblue text" text="This a geekblue long text" />
          <Badge color="magenta" text="This a magenta text" />
          <Badge color="volcano" text="This a volcano text" />
        </template>
      </template>
    </Calendar>
    <h2 class="mt30 mb10">选择功能</h2>
    <Alert type="info" :message="`You selected date: ${format(selectDate, 'yyyy-MM-dd')}`" />
    <Calendar v-model:value="selectDate" @select="onSelect" @panelChange="onPanelChange" />
    <h2 class="mt30 mb10">禁用日期</h2>
    <Flex vertical>
      <Space align="center">
        display:<Radio :options="displayOptions" v-model:value="display" button button-style="solid" />
      </Space>
      <Calendar v-model:value="disableDate" :disabled-date="disabledDate" :display="display" v-model:value="date" @select="onSelect" @panelChange="onPanelChange" />
    </Flex>
    <h2 class="mt30 mb10">自定义日期格式</h2>
    <Calendar v-model:value="dateStr" value-format="yyyy-MM-dd" />
    <Message ref="message" />
  </div>
</template>
<style lang="less" scoped>
.m-badge {
  width: 100%;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
</style>
