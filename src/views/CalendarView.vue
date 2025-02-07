<script setup lang="ts">
import { ref } from 'vue'
import { format } from 'date-fns'
import dayjs, { Dayjs } from 'dayjs'
const date = ref(Date.now())
const antDate = ref(dayjs(Date.now()))
function onSelect(timestamp: number, source: 'date' | 'month') {
  console.log('select', timestamp, source)
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
</script>
<template>
  <div>
    <!-- <h1>{{ $route.name }} {{ $route.meta.title }}</h1>
    <h2 class="mt30 mb10">基本使用</h2> -->
    <Calendar @panelChange="onPanelChange" />
    <!-- <a-calendar @panelChange="onPanelChange" /> -->
    <h2 class="mt30 mb10">卡片模式</h2>
    <Space>
      <Calendar display="card" />
      <div :style="{ width: '300px', border: '1px solid #d9d9d9', borderRadius: '4px' }">
        <a-calendar :fullscreen="false" @panelChange="onPanelChange" />
      </div>
    </Space>
    <h2 class="mt30 mb10">选择功能</h2>
    <Alert type="info" :message="`You selected date: ${format(date, 'yyyy-MM-dd')}`" />
    <Calendar v-model:value="date" @select="onSelect" @panelChange="onPanelChange" />
    <Alert type="info" :message="`You selected date: ${antDate.format('YYYY-MM-DD')}`" />
    <a-calendar v-model:value="antDate" @select="onAntSelect" @panelChange="onAntPanelChange" />
    <h2 class="mt30 mb10">自定义头部和尾部</h2>
    <!-- <div style="width: 300px; border: 1px solid #d9d9d9; border-radius: 4px">
      <a-calendar v-model:value="value" :fullscreen="false" @panelChange="onPanelChange">
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
    </div> -->
  </div>
</template>
<style lang="less" scoped></style>
