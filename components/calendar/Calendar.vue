<script setup lang="ts">
import { ref, nextTick, computed } from 'vue'
import type { VNode, Slot } from 'vue'
import { useSlotsExist } from 'components/utils'
export interface Props {
  type?: 'default' | 'reverse' | 'primary' | 'danger' | 'dashed' | 'text' | 'link' // 设置按钮类型
  shape?: 'default' | 'circle' | 'round' // 设置按钮形状
  icon?: VNode | Slot // 设置按钮图标
  size?: 'small' | 'middle' | 'large' // 设置按钮尺寸
  ghost?: boolean // 按钮背景是否透明，仅当 type: 'primary' | 'danger' 时生效
  buttonClass?: string // 设置按钮类名
  rippleColor?: string // 点击时的波纹颜色，一般不需要设置，默认会根据 type 自动匹配，主要用于自定义样式时且 type: 'default'
  href?: string // 点击跳转的地址，与 a 链接的 href 属性一致
  target?: '_self' | '_blank' // 如何打开目标链接，相当于 a 链接的 target 属性，href 存在时生效
  keyboard?: boolean // 是否支持键盘操作
  disabled?: boolean // 是否禁用
  loading?: boolean // 是否加载中
  loadingType?: 'static' | 'dynamic' // 加载指示符类型
  block?: boolean // 是否将按钮宽度调整为其父宽度
}
const props = withDefaults(defineProps<Props>(), {
  type: 'default',
  shape: 'default',
  icon: undefined,
  size: 'middle',
  ghost: false,
  rippleColor: undefined,
  buttonClass: undefined,
  href: undefined,
  target: '_self',
  keyboard: true,
  disabled: false,
  loading: false,
  loadingType: 'dynamic',
  block: false
})
const presetRippleColors = {
  default: '#1677ff',
  reverse: '#1677ff',
  primary: '#1677ff',
  danger: '#ff4d4f',
  dashed: '#1677ff',
  text: 'transparent',
  link: 'transparent'
}
const wave = ref<boolean>(false)
const emit = defineEmits(['click'])
const slotsExist = useSlotsExist(['icon', 'default'])
const showIcon = computed(() => {
  return slotsExist.icon || props.icon
})
const showIconOnly = computed(() => {
  return showIcon.value && !slotsExist.default
})
function onClick(e: Event) {
  if (wave.value) {
    wave.value = false
    nextTick(() => {
      wave.value = true
    })
  } else {
    wave.value = true
  }
  emit('click', e)
}
function onKeyboard(e: KeyboardEvent) {
  onClick(e)
}
function onWaveEnd() {
  wave.value = false
}
</script>
<template>
</template>
<style lang="less" scoped>
</style>
