<script setup lang="ts">
import { ref, watchEffect } from 'vue'
import { CalendarOutlined } from '@ant-design/icons-vue'
import { format, subDays, addDays } from 'date-fns'
import { generate } from '@ant-design/colors'
import type { CalendarDayOfWeek, CalendarDefaultWeek, CalendarDateItem, CalendarMonthItem } from 'vue-amazing-ui'
const date = ref(Date.now())
const cardDate = ref(Date.now())
const modeDate = ref(Date.now())
const customCardStyleDate = ref(Date.now())
const headerDate = ref(Date.now())
const startDayOfWeekDate = ref(Date.now())
const formatDate = ref(Date.now())
const noticeDate = ref(Date.now())
const slotDate = ref(Date.now())
const selectDate = ref(new Date('2030-10-06').getTime())
const disableDate = ref(Date.now())
const dateStr = ref(format(Date.now(), 'yyyy-MM-dd'))
const customThemeDate = ref(Date.now())
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
const disabledDisplay = ref('panel')
const customThemeDisplay = ref('panel')
const primaryColor = ref('#ff6900')
const primaryShadowColor = ref('rgba(255, 116, 32, 0.1)')
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
  console.log('customCardStyleDate', customCardStyleDate.value)
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
  console.log('slotDate', slotDate.value)
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
watchEffect(() => {
  console.log('customThemeDate', customThemeDate.value)
})
function cardDateFormat(date: number, timestamp: number) {
  return String(date).padStart(2, '0')
}
function cardWeekFormat(defaultWeek: CalendarDefaultWeek, week: CalendarDayOfWeek) {
  return `周${defaultWeek}`
}
function cardMonthFormat(month: number, timestamp: number) {
  const chineseNumber = ['一', '二', '三', '四', '五', '六', '七', '八', '九', '十', '十一', '十二']
  return `${chineseNumber[month - 1]}月`
}
function panelDateFormat(date: number, timestamp: number) {
  return format(timestamp, 'do')
}
function panelWeekFormat(defaultWeek: CalendarDefaultWeek, week: CalendarDayOfWeek, timestamp: number) {
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
function getThemeStyle(color: string) {
  const colorPalettes = generate(color)
  const style = {
    '--calendar-primary-color': color,
    '--calendar-panel-primary-bg-color': colorPalettes[0],
    '--calendar-card-primary-bg-color': color
  }
  return style
}
function getSelectThemeStyle(color: string) {
  const colorPalettes = generate(color)
  const style = {
    '--select-primary-color-hover': colorPalettes[4],
    '--select-primary-color-focus': colorPalettes[4],
    '--select-primary-shadow-color': primaryShadowColor.value,
    '--select-item-bg-color-active': colorPalettes[0]
  }
  return style
}
function onSelect(date: string | number, source: 'date' | 'month') {
  console.log('select', date, source)
  message.value.success(format(date, 'yyyy-MM-dd'))
}
function onChange(
  date: string | number,
  dateOrMonth: CalendarDateItem['dateObject'] | CalendarMonthItem['monthObject']
) {
  console.log('change', date, dateOrMonth)
}
function onPanelChange(date: string | number, info: { year: number; month?: number }, mode: 'month' | 'year') {
  console.log('panelChange', date, info, mode)
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
    <Calendar v-model:value="date" @change="onChange" @panelChange="onPanelChange" />
    <h2 class="mt30 mb10">卡片模式</h2>
    <Calendar v-model:value="cardDate" display="card" @change="onChange" @panelChange="onPanelChange" />
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
        <template #header> <CalendarOutlined /> 日历 </template>
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
    <h3 class="mb10">使用 weekFormat / dateFormat / monthFormat 自定义日期/星期/月的展示格式</h3>
    <Flex vertical>
      <Space>
        <Calendar
          header="Date format"
          display="card"
          v-model:value="formatDate"
          :date-format="cardDateFormat"
          @panelChange="onPanelChange"
        />
        <Calendar
          header="Week format"
          display="card"
          v-model:value="formatDate"
          :week-format="cardWeekFormat"
          @panelChange="onPanelChange"
        />
        <Calendar
          header="Month format"
          mode="year"
          display="card"
          v-model:value="formatDate"
          :month-format="cardMonthFormat"
          @panelChange="onPanelChange"
        />
      </Space>
      <Calendar
        v-model:value="formatDate"
        :date-format="panelDateFormat"
        :week-format="panelWeekFormat"
        :month-format="panelMonthFormat"
        @panelChange="onPanelChange"
      />
    </Flex>
    <h2 class="mt30 mb10">通知事项日历</h2>
    <Calendar v-model:value="noticeDate" @panelChange="onPanelChange">
      <template #dateValue="{ dateObject, timestamp }">
        <span v-if="[8, 12, 16].includes(dateObject.date)">{{ dateObject.date }}日</span>
      </template>
      <template #dateContent="{ dateObject, timestamp }">
        <template v-if="[8, 12, 16].includes(dateObject.date)">
          <Badge status="warning" text="This is warning event." />
          <Badge status="success" text="This is usual event." />
          <Badge color="volcano" text="This is volcano event" />
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
          <Badge status="warning" text="This is warning event." />
          <Badge status="success" text="This is usual event." />
          <Badge color="volcano" text="This is volcano event" />
        </template>
      </template>
    </Calendar>
    <h2 class="mt30 mb10">自定义插槽</h2>
    <Calendar v-model:value="slotDate" @panelChange="onPanelChange">
      <template #week="{ defaultWeek, week, timestamp }">
        {{ format(timestamp, 'EEE') }}
      </template>
      <template #dateValue="{ dateObject, timestamp }"> {{ dateObject.date }}日 </template>
      <template #monthValue="{ monthObject, timestamp }">
        {{ format(timestamp, 'MMMM') }}
      </template>
    </Calendar>
    <h2 class="mt30 mb10">选择功能</h2>
    <Flex vertical>
      <Alert type="info" :message="`You selected date: ${format(selectDate, 'yyyy-MM-dd')}`" />
      <Calendar v-model:value="selectDate" @select="onSelect" @panelChange="onPanelChange" />
    </Flex>
    <h2 class="mt30 mb10">禁用日期</h2>
    <Flex vertical>
      <Space align="center">
        display:<Radio :options="displayOptions" v-model:value="disabledDisplay" button button-style="solid" />
      </Space>
      <Space>
        <Flex vertical>
          <Alert type="info" message="禁用指定日期 (以今天为准的前三天和后三天)" />
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
            v-model:value="disableDate"
            :disabled-date="disabledWeekend"
            :display="disabledDisplay"
            @select="onSelect"
            @panelChange="onPanelChange"
          />
        </Flex>
      </Space>
    </Flex>
    <h2 class="mt30 mb10">自定义日期格式</h2>
    <Flex vertical>
      <Alert type="info" :message="`You selected date: ${dateStr}`" />
      <Calendar v-model:value="dateStr" value-format="yyyy-MM-dd" @panelChange="onPanelChange" />
    </Flex>
    <h2 class="mt30 mb10">自定义主题色</h2>
    <Flex vertical>
      <Space align="center"> primaryColor:<ColorPicker style="width: 200px" v-model:value="primaryColor" /> </Space>
      <Space align="center">
        primaryShadowColor:<ColorPicker style="width: 200px" v-model:value="primaryShadowColor" />
      </Space>
      <Space align="center">
        display:
        <Radio
          :style="`--radio-primary-color: ${primaryColor}`"
          :options="displayOptions"
          v-model:value="customThemeDisplay"
          button
          button-style="solid"
        />
      </Space>
      <Calendar
        :style="getThemeStyle(primaryColor)"
        v-model:value="customThemeDate"
        :display="customThemeDisplay"
        :year-select-props="{ style: getSelectThemeStyle(primaryColor) }"
        :month-select-props="{ style: getSelectThemeStyle(primaryColor) }"
        :mode-radio-props="{ style: { '--radio-primary-color': primaryColor } }"
        @panelChange="onPanelChange"
      />
    </Flex>
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
