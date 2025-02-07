<script setup lang="ts">
import { ref } from 'vue'
import { CalendarOutlined } from '@ant-design/icons-vue'
import { subDays, addDays, format } from 'date-fns'
import dayjs, { Dayjs } from 'dayjs'
const date = ref(Date.now())
const antDate = ref(dayjs(Date.now()))
const value = ref<Dayjs>()
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
const display = ref('panel')
function disabledDate(timestamp: number): boolean {
  console.log('timestamp', timestamp)
  if (subDays(Date.now(), 4).getTime() < timestamp && timestamp < addDays(Date.now(), 3).getTime()) {
    return true
  }
  return false
}
function antDisabledDate(currentDate: Dayjs): boolean {
  console.log('currentDate', currentDate)
  if (currentDate?.$D < 10) {
    return true
  }
  return false
}
function onSelect(timestamp: number, source: 'date' | 'month') {
  console.log('select', timestamp, source)
  message.value.success(format(timestamp, 'yyyy-MM-dd'))
}
function onAntSelect(date: Dayjs, info: any) {
  console.log('antSelect', date, info)
}
function onPanelChange(info: any, mode: 'month' | 'year') {
  console.log('panelChange', info, mode)
}
function onAntPanelChange(date: Dayjs, mode: 'month' | 'year') {
  console.log('antPanelChange', date, mode)
}

const getMonths = (value: Dayjs) => {
  const localeData = value.localeData();
  const months = [];
  for (let i = 0; i < 12; i++) {
    months.push(localeData.monthsShort(value.month(i)));
  }
  return months;
};

const getYears = (value: Dayjs) => {
  const year = value.year();
  const years = [];
  for (let i = year - 10; i < year + 10; i += 1) {
    years.push(i);
  }
  return years;
};
</script>
<template>
  <div>
    <h1>{{ $route.name }} {{ $route.meta.title }}</h1>
    <h2 class="mt30 mb10">基本使用</h2>
    <Calendar @panelChange="onPanelChange" />
    <a-calendar @panelChange="onPanelChange" />
    <h2 class="mt30 mb10">卡片模式</h2>
    <Space>
      <Calendar display="card" />
      <div :style="{ width: '300px', border: '1px solid #d9d9d9', borderRadius: '4px' }">
        <a-calendar :fullscreen="false" @panelChange="onPanelChange" />
      </div>
    </Space>
    <h2 class="mt30 mb10">通知事项日历</h2>
    <Calendar @panelChange="onPanelChange">
      <template #dateCellValue="{ dateObject, year, month, date, timestamp }">
        <template v-if="format(timestamp, 'yyyy-MM-dd') === '2025-02-12'">
          <span style="font-size: 16px; font-weight: 500;">{{ date }}</span>
        </template>
      </template>
      <template #dateCellContent="{ dateObject, year, month, date, timestamp }">
        <template v-if="format(timestamp, 'yyyy-MM-dd') === '2025-02-12'">
          <GradientText
            :size="20"
            :weight="500"
            :gradient="{
              deg: '90deg',
              from: '#09c8ce',
              to: '#eb2f96'
            }"
          >元宵节</GradientText>
        </template>
      </template>
    </Calendar>
    <h2 class="mt30 mb10">选择功能</h2>
    <Alert type="info" :message="`You selected date: ${format(date, 'yyyy-MM-dd')}`" />
    <Calendar v-model:value="date" @select="onSelect" @panelChange="onPanelChange" />
    <Alert type="info" :message="`You selected date: ${antDate.format('YYYY-MM-DD')}`" />
    <a-calendar v-model:value="antDate" @select="onAntSelect" @panelChange="onAntPanelChange" />
    <h2 class="mt30 mb10">禁用日期</h2>
    <Flex vertical>
      <Space align="center">
        display:<Radio :options="displayOptions" v-model:value="display" button button-style="solid" />
      </Space>
      <Calendar :disabled-date="disabledDate" :display="display" v-model:value="date" @select="onSelect" @panelChange="onPanelChange" />
      <!-- <Calendar :disabled-date="disabledDate" v-model:value="date" @select="onSelect" @panelChange="onPanelChange" /> -->
      <!-- <a-calendar :disabled-date="antDisabledDate" v-model:value="antDate" @panelChange="onPanelChange" /> -->
      <!-- <div :style="{ width: '300px', border: '1px solid #d9d9d9', borderRadius: '4px' }">
        <a-calendar :disabled-date="antDisabledDate" v-model:value="antDate" :fullscreen="false" @panelChange="onPanelChange" />
      </div> -->
    </Flex>
    <h2 class="mt30 mb10">自定义头部内容</h2>
    <Space>
      <Calendar header="Custom header" display="card" @panelChange="onPanelChange" />
      <Calendar display="card" @panelChange="onPanelChange">
        <template #header>
          <CalendarOutlined /> 日历
        </template>
      </Calendar>
    </Space>
    <div style="width: 300px; border: 1px solid #d9d9d9; border-radius: 4px">
      <a-calendar v-model:value="value" :fullscreen="false" @panelChange="onAntPanelChange">
        <template #headerRender="{ value: current, type, onChange, onTypeChange }">
          <div style="padding: 10px">
            <div style="margin-bottom: 10px">Custom header</div>
            <a-row type="flex" justify="space-between">
              <a-col>
                <a-radio-group size="small" :value="type" @change="e => onTypeChange(e.target.value)">
                  <a-radio-button value="month">Month</a-radio-button>
                  <a-radio-button value="year">Year</a-radio-button>
                </a-radio-group>
              </a-col>
              <a-col>
                <a-select
                  size="small"
                  :dropdown-match-select-width="false"
                  class="my-year-select"
                  :value="String(current.year())"
                  @change="
                    newYear => {
                      onChange(current.year(+newYear));
                    }
                  "
                >
                  <a-select-option
                    v-for="val in getYears(current)"
                    :key="String(val)"
                    class="year-item"
                  >
                    {{ val }}
                  </a-select-option>
                </a-select>
              </a-col>
              <a-col>
                <a-select
                  size="small"
                  :dropdown-match-select-width="false"
                  :value="String(current.month())"
                  @change="
                    selectedMonth => {
                      onChange(current.month(parseInt(String(selectedMonth), 10)));
                    }
                  "
                >
                  <a-select-option
                    v-for="(val, index) in getMonths(current)"
                    :key="String(index)"
                    class="month-item"
                  >
                    {{ val }}
                  </a-select-option>
                </a-select>
              </a-col>
            </a-row>
          </div>
        </template>
      </a-calendar>
    </div>
    <Message ref="message" />
  </div>
</template>
<style lang="less" scoped></style>
