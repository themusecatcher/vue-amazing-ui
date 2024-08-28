<script setup lang="ts">
import { computed } from 'vue'
import type { CSSProperties } from 'vue'
import { formatNumber, useSlotsExist } from '../utils'
interface Props {
  title?: string // 数值的标题 string | slot
  value?: string | number // 数值的内容 string | number | slot
  valueStyle?: CSSProperties // 设置数值的样式
  precision?: number //	数值精度
  prefix?: string // 设置数值的前缀 string | slot
  suffix?: string // 设置数值的后缀 string | slot
  separator?: string // 设置千分位标识符
  formatter?: Function // 自定义数值展示
}
const props = withDefaults(defineProps<Props>(), {
  title: undefined,
  value: undefined,
  valueStyle: () => ({}),
  precision: 0,
  prefix: undefined,
  suffix: undefined,
  separator: ',',
  formatter: (value: string) => value
})
const showValue = computed(() => {
  return props.formatter(formatNumber(props.value || '', props.precision, props.separator))
})
const slotsExist = useSlotsExist(['title', 'prefix', 'suffix'])
const showTitle = computed(() => {
  return slotsExist.title || props.title
})
const showPrefix = computed(() => {
  return slotsExist.prefix || props.prefix
})
const showSuffix = computed(() => {
  return slotsExist.suffix || props.suffix
})
</script>
<template>
  <div class="m-statistic">
    <div v-if="showTitle" class="statistic-title">
      <slot name="title">{{ title }}</slot>
    </div>
    <div class="statistic-content" :style="valueStyle">
      <span v-if="showPrefix" class="statistic-prefix">
        <slot name="prefix">{{ prefix }}</slot>
      </span>
      <span class="statistic-value">
        <slot>{{ showValue }}</slot>
      </span>
      <span v-if="showSuffix" class="statistic-suffix">
        <slot name="suffix">{{ suffix }}</slot>
      </span>
    </div>
  </div>
</template>
<style lang="less" scoped>
.m-statistic {
  font-size: 14px;
  color: rgba(0, 0, 0, 0.88);
  line-height: 1.5714285714285714;
  .statistic-title {
    margin-bottom: 4px;
    color: rgba(0, 0, 0, 0.45);
    font-size: 14px;
  }
  .statistic-content {
    color: rgba(0, 0, 0, 0.88);
    font-size: 24px;
    .statistic-prefix {
      display: inline-block;
      margin-inline-end: 4px;
    }
    .statistic-value {
      display: inline-block;
      direction: ltr;
    }
    .statistic-suffix {
      display: inline-block;
      margin-inline-start: 4px;
    }
  }
}
</style>
