<script setup lang="ts">
import { ref, reactive, onMounted, nextTick, computed } from 'vue'
import type { VNode, Slot } from 'vue'
import { getYear, getMonth } from 'date-fns'
import type { SelectOption } from 'vue-amazing-ui'
import Select from 'components/select'
import Radio from 'components/radio'
export interface Props {
  disabledDate?: (timestamp: number) => boolean // 不可选择的日期
  display?: 'panel' | 'card' // 日历展示方式，面板/卡片
  mode?: 'month' | 'year' // 初始模式
  value?: number // (v-model) 当前被选中的日期的时间戳
}
const props = withDefaults(defineProps<Props>(), {
  disabledDate: undefined,
  display: 'panel',
  mode: 'month',
  value: undefined
})
const yearOptions = reactive<SelectOption[]>([])
const monthOptions = reactive<SelectOption[]>([])
const now = Date.now()
const year = ref<number>(getYear(now))
const month = ref<number>(getMonth(now))
onMounted(() => {
  getYearOptions()
  getMonthOptions()
})
function getYearOptions() {
  yearOptions.length = 0
  const startYear = year.value - 10
  const endYear = year.value + 9
  for (let y = startYear; y <= endYear; y++) {
    yearOptions.push({
      label: `${y}年`,
      value: y
    })
  }
}
function getMonthOptions() {
  for (let m = 1; m <= 12; m++) {
    monthOptions.push({
      label: `${m}月`,
      value: m
    })
  }
}
const emits = defineEmits(['update:value', 'change'])
</script>
<template>
  <div class="m-calendar">
    <div class="calendar-header">
      <Select :options="yearOptions" v-model="year" />
      <Select :options="monthOptions" v-model="month" />
    </div>
    <slot name="header"></slot>
  </div>
</template>
<style lang="less" scoped>
.m-calendar {
  color: rgba(0, 0, 0, 0.88);
  font-size: 14px;
  line-height: 1.5714285714285714;
  list-style: none;
  background: #ffffff;
  .calendar-header {
    display: flex;
    justify-content: flex-end;
    padding: 12px 0;
  }
}
</style>
