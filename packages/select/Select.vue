<script setup lang="ts">
import { ref, watch, onMounted } from 'vue'
const props = defineProps({
    options: { // 选项数据
      type: Array<any>,
      default: () => {
        return []
      }
    },
    label: { // 下拉字典项的文本字段名
      type: String,
      default: 'label'
    },
    value: { // 下拉字典项的值字段名
      type: String,
      default: 'value'
    },
    placeholder: { // 下拉框默认文字
      type: String,
      default: '请选择'
    },
    disabled: { // 是否禁用下拉
      type: Boolean,
      default: false
    },
    allowClear: { // 是否支持清楚
      type: Boolean,
      default: false
    },
    width: { // 下拉框宽度
      type: Number,
      default: 200
    },
    height: { // 下拉框高度
      type: Number,
      default: 36
    },
    num: { // 下拉面板最多能展示的下拉项数，超过后滚动显示
      type: Number,
      default: 6
    },
    selectedValue: { // v-model当前选中的option
      type: [Number, String],
      default: null
    }
  })
const selectedName = ref()
const hoverValue = ref() // 鼠标悬浮项的value值
const showOptions = ref(false) // options面板
const activeBlur = ref(true) // 是否激活blur事件
const showClose = ref(false) // 清除按钮显隐
watch(
  () => props.options,  
  (to) => {
  initSelector()
  // console.log('options:', to)
})
watch(
  () => props.selectedValue,  
  (to) => {
  initSelector()
  // console.log('selectedValue:', to)
})
onMounted(() => {
  initSelector()
})
const emits = defineEmits(['update:selectedValue', 'change'])
function initSelector () {
  if (props.selectedValue) {
    const target = props.options.find(option => option[props.value] === props.selectedValue)
    if (target) {
      selectedName.value = target[props.label]
      hoverValue.value = target[props.value]
    } else {
      selectedName.value = props.selectedValue
      hoverValue.value = null
    }
  } else {
    selectedName.value = null
    hoverValue.value = null
  }
}
function onBlur () {
  // console.log('blur')
  if (showOptions.value) {
    showOptions.value = false
  }
}
function onInputEnter () {
  // console.log('input enter')
  if (props.allowClear) {
    showClose.value = true
  }
}
function onInputLeave () {
  // console.log('input leave')
  if (props.allowClear) {
    showClose.value = false
  }
}
function onHover (value: string|number) {
  hoverValue.value = value
}
function onEnter () {
  activeBlur.value = false
}
function onLeave () {
  hoverValue.value = null
  activeBlur.value = true
}
function openSelect () {
  showOptions.value = !showOptions.value
  if (!hoverValue.value && selectedName.value) {
    const target = props.options.find(option => option[props.label] === selectedName.value)
    hoverValue.value = target ? target[props.value] : null
  }
}
function onClear () {
  selectedName.value = null
  hoverValue.value = null
}
function onChange (value: string|number, label: string, index: number) { // 选中下拉项后的回调
  if (selectedName.value !== label) {
    selectedName.value = label
    hoverValue.value = value
    showOptions.value = false
    emits('update:selectedValue', value)
    emits('change', value, label, index)
  }
}
</script>
<template>
  <div class="vue-amazing-selector" :style="`height: ${height}px;`">
    <div
      :class="['m-select-wrap', { 'hover': !disabled, 'focus': showOptions, 'disabled': disabled }]"
      :style="`width: ${width - 2}px; height: ${height - 2}px;`"
      tabindex="0"
      @mouseenter="onInputEnter"
      @mouseleave="onInputLeave"
      @blur="activeBlur && !disabled ? onBlur() : (e: Event) => e.preventDefault()"
      @click="disabled ? (e: Event) => e.preventDefault() : openSelect()">
      <div
        :class="['u-select-input', { 'placeholder': !selectedName }]"
        :style="`line-height: ${height - 2}px;width: ${width - 37}px; height: ${height - 2}px;`"
        :title="selectedName"
      >{{ selectedName || placeholder }}</div>
      <transition name="fade-svg">
        <svg @click="openSelect" v-show="!showClose" :class="['triangle', { 'rotate': showOptions }]" viewBox="64 64 896 896" data-icon="down" aria-hidden="true" focusable="false"><path d="M884 256h-75c-5.1 0-9.9 2.5-12.9 6.6L512 654.2 227.9 262.6c-3-4.1-7.8-6.6-12.9-6.6h-75c-6.5 0-10.3 7.4-6.5 12.7l352.6 486.1c12.8 17.6 39 17.6 51.7 0l352.6-486.1c3.9-5.3.1-12.7-6.4-12.7z"></path></svg>
      </transition>
      <transition name="fade-svg">
        <svg @click.stop="onClear" v-show="showClose" class="close" focusable="false" data-icon="close-circle" aria-hidden="true" viewBox="64 64 896 896"><path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm165.4 618.2l-66-.3L512 563.4l-99.3 118.4-66.1.3c-4.4 0-8-3.5-8-8 0-1.9.7-3.7 1.9-5.2l130.1-155L340.5 359a8.32 8.32 0 01-1.9-5.2c0-4.4 3.6-8 8-8l66.1.3L512 464.6l99.3-118.4 66-.3c4.4 0 8 3.5 8 8 0 1.9-.7 3.7-1.9 5.2L553.5 514l130 155c1.2 1.5 1.9 3.3 1.9 5.2 0 4.4-3.6 8-8 8z"></path></svg>
      </transition>
    </div>
    <transition name="fade">
      <div
        v-show="showOptions"
        class="m-options-panel"
        @mouseenter="onEnter"
        @mouseleave="onLeave"
        :style="`top: ${height + 6}px; line-height: ${height - 12}px; max-height: ${ num * (height - 2) }px; width: ${width}px;`">
        <p
          v-for="(option, index) in options" :key="index"
          :class="['u-option', {'option-selected': option[label]===selectedName, 'option-hover': !option.disabled&&option[value]===hoverValue, 'option-disabled': option.disabled }]"
          :title="option[label]"
          @mouseenter="onHover(option[value])"
          @click="option.disabled ? (e: Event) => e.preventDefault() : onChange(option[value], option[label], index)">
          {{ option[label] }}
        </p>
      </div>
    </transition>
  </div>
</template>
<style lang="less" scoped>
input:focus {
  outline: none;
}
input, p {
  margin: 0;
  padding: 0;
}
.vue-amazing-selector {
  position: relative;
  display: inline-block;
  font-size: 14px;
  font-weight: 400;
  color: rgba(0,0,0,.65);
}
// 渐变过渡效果
.fade-svg-enter-active, .fade-svg-leave-active {
  transition: all .3s;
}
.fade-svg-enter-from, .fade-svg-leave-to {
  opacity: 0;
  // transform: translateY(-6px); // 滑动变换
}
.fade-enter-active, .fade-leave-active {
  transition: all .5s;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
  // transform: translateY(-6px); // 滑动变换
}
.m-select-wrap {
  position: relative;
  display: inline-block;
  border: 1px solid #d9d9d9;
  border-radius: 4px;
  cursor: pointer;
  transition: all .3s cubic-bezier(.645,.045,.355,1);
  .u-select-input {
    display: block;
    text-align: left;
    margin-left: 11px;
    margin-right: 24px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .placeholder {
    color: #bfbfbf;
  }
  .triangle {
    position: absolute;
    top: 50%;
    right: 12px;
    width: 12px;
    height: 12px;
    fill: rgba(0,0,0,.25);
    transform: translateY(-50%);
    -webkit-transform: translateY(-50%);
    transition: transform 0.3s ease-in-out;
    pointer-events: none;
  }
  .rotate {
    transform: translateY(-50%) rotate(180deg);
    -webkit-transform: translateY(-50%) rotate(180deg);
  }
  .close {
    position: absolute;
    top: 50%;
    right: 12px;
    width: 12px;
    height: 12px;
    fill: rgba(140, 140, 140, 0.6);
    transform: translateY(-50%);
    -webkit-transform: translateY(-50%);
    &:hover {
      fill: rgba(100, 100, 100,.8);
    }
  }
}
.hover { // 悬浮时样式
  &:hover {
    border-color: @themeColor;
  }
}
.focus { // 激活时样式
  border-color: @themeColor;
  box-shadow: 0 0 0 2px rgba(24, 144, 255, 20%);
}
.disabled { // 下拉禁用样式
  color: rgba(0,0,0,.25);
  background: #f5f5f5;
  user-select: none;
  cursor: not-allowed;
}
.m-options-panel {
  position: absolute;
  z-index: 999;
  overflow: auto;
  background: #FFF;
  padding: 4px 0;
  border-radius: 4px;
  box-shadow: 0 2px 8px rgba(0,0,0,15%);
  .u-option { // 下拉项默认样式
    text-align: left;
    position: relative;
    display: block;
    padding: 5px 12px;
    font-weight: 400;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    cursor: pointer;
    transition: background .3s ease;
  }
  .option-selected { // 被选中的下拉项样式
    font-weight: 600;
    background: #fafafa;
  }
  .option-hover { // 悬浮时的下拉项样式
    background: #e6f7ff;
  }
  .option-disabled { // 禁用某个下拉选项时的样式
    color: rgba(0,0,0,.25);
    user-select: none;
    cursor: not-allowed;
  }
}
</style>
