<script setup lang="ts">
import { computed, useSlots } from 'vue'
import type { CSSProperties } from 'vue'
import { formatNumber } from '../index'
interface Props {
  title?: string // 数值的标题 string | slot
  value?: string|number // 数值的内容 string | number | slot
  valueStyle?: CSSProperties // 设置数值的样式
  precision?: number //	数值精度
  prefix?: string // 设置数值的前缀 string | slot
  suffix?: string // 设置数值的后缀 string | slot
  separator?: string // 设置千分位标识符
  formatter?: Function // 自定义数值展示
}
const props = withDefaults(defineProps<Props>(), {
  title: '',
  value: '',
  valueStyle: () => ({}),
  precision: 0,
  prefix: '',
  suffix: '',
  separator: ',',
  formatter: (value: string) => value
})
const showValue = computed(() => {
  return props.formatter(formatNumber(props.value, props.precision, props.separator))
})
const slots = useSlots()
const showPrefix = computed(() => {
  const prefixSlots = slots.prefix?.()
  if (prefixSlots) {
    return Boolean(prefixSlots[0].children !== 'v-if' && prefixSlots?.length)
  }
  return props.prefix
})
const showSuffix = computed(() => {
  const suffixSlots = slots.suffix?.()
  if (suffixSlots) {
    return Boolean(suffixSlots[0].children !== 'v-if' && suffixSlots?.length)
  }
  return props.suffix
})
</script>
<template>
  <div class="m-statistic">
    <div class="u-title">
      <slot name="title">{{ title }}</slot>
    </div>
    <div class="m-content" :style="valueStyle">
      <span class="u-prefix" v-if="showPrefix">
        <slot name="prefix">{{ prefix }}</slot>
      </span>
      <span class="u-content-value">
        <slot>{{ showValue }}</slot>
      </span>
      <span class="u-suffix" v-if="showSuffix">
        <slot name="suffix">{{ suffix }}</slot>
      </span>
    </div>
  </div>
</template>
<style lang="less" scoped>
.m-statistic {
  font-size: 14px;
  color: rgba(0, 0, 0, .88);
  line-height: 1.5714285714285714;
  .u-title {
    margin-bottom: 4px;
    color: rgba(0, 0, 0, .45);
    font-size: 14px;
  }
  .m-content {
    color: rgba(0, 0, 0, .88);
    font-size: 24px;
    .u-prefix {
      display: inline-block;
      margin-inline-end: 4px;
    }
    .u-content-value {
      display: inline-block;
      direction: ltr;
    }
    .u-suffix {
      display: inline-block;
      margin-inline-start: 4px;
    }
  }
}
</style>
