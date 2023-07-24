<script lang="ts">
/*
  一个根节点时，禁用组件根节点自动继承 attribute，必须使用这种写法！然后在要继承 attribute 的节点上绑定 v-bind="$attrs" 即可
  多个根节点时，只需在要继承 attribute 的节点上绑定 v-bind="$attrs" 即可
*/
export default {
  inheritAttrs: false
}
</script>
<script setup lang="ts">
import { ref, computed, watch, onMounted, onUnmounted } from 'vue'
interface Props {
  width?: string|number // 输入框宽度
  allowClear?: boolean // 可以点击清除图标删除内容
  autoSize?: boolean|{minRows:number, maxRows:number} // 自适应内容高度
  disabled?: boolean // 是否禁用
  maxlength?: number // 最大长度
  showCount?: boolean // 是否展示字数
  value?: string // 输入框内容(v-model)
  valueModifiers?: object // 用于访问组件的v-model上添加的修饰符
}
const props = withDefaults(defineProps<Props>(), {
  width: '100%',
  allowClear: false,
  autoSize: false,
  disabled: false,
  maxlength: undefined,
  showCount: false,
  value: '',
  valueModifiers: () => ({})
})
const areaWidth = computed(() => {
  if (typeof props.width === 'number') {
    return props.width + 'px'
  }
  return props.width
})
const showCountNum = computed(() => {
  if (props.maxlength) {
    return props.value.length + ' / ' + props.maxlength
  }
  return props.value.length
})
watch(
  () => props.value,
  (to) => {
    // console.log('%O', textarea.value)
  }
)
const textarea = ref()
const areaHeight = ref()
const suffixRef = ref()
const showSuffix = ref(1)
const observer = ref()
onMounted(() => {
  if (props.autoSize) {
    getAreaHeight()
  }
  showSuffix.value = suffixRef.value.offsetWidth
  // 观察器的配置（需要观察什么变动）
  const config = { attributes: true, childList: false, subtree: false }
  // 创建一个观察器实例并传入回调函数
  observer.value = new MutationObserver(callback)
  // 以上述配置开始观察目标节点
  observer.value.observe(textarea.value, config)
})
onUnmounted(() => {
  // 之后，可停止观察
  observer.value.disconnect()
})
/*
  使用 MutationObserver 监听 textarea resize 时的属性变化
  参考文档：https://developer.mozilla.org/zh-CN/docs/Web/API/MutationObserver
*/
// 当观察到变动时执行的回调函数
const callback = function (mutationsList: any, observer: any) {
  console.log('mutation')
  getAreaHeight()
  // Use traditional 'for loops' for IE 11
  // for(let mutation of mutationsList) {
  //   if (mutation.type === 'childList') {
  //     console.log('A child node has been added or removed.')
  //   }
  //   if (mutation.type === 'attributes') {
  //     console.log('The ' + mutation.attributeName + ' attribute was modified.')
  //     console.log(mutation.target.style.height)
  //   }
  // }
}
function getAreaHeight () {
  areaHeight.value = textarea.value.offsetHeight
}
const emits = defineEmits(['update:value', 'change', 'enter'])
function onInput (e: any) {
  if (!('lazy' in props.valueModifiers)) {
    emits('update:value', e.target.value)
    emits('change', e)
  }
}
function onChange (e: any) {
  if ('lazy' in props.valueModifiers) {
    emits('update:value', e.target.value)
    emits('change', e)
  }
}
function onKeyboard (e: any) {
  if (e.key === 'Enter') {
    emits('enter', e)
  }
}
const input = ref()
function onClear () {
  emits('update:value', '')
  input.value.focus()
}
</script>
<template>
  <div class="m-textarea" :class="{disabled: disabled}" :style="`width: ${areaWidth};`">
    <textarea
      ref="textarea"
      class="u-textarea"
      :class="{'auto-size': autoSize}"
      :style="`height: ${areaHeight}px;`"
      :value="value"
      :maxlength="maxlength"
      :disabled="disabled"
      @input="onInput"
      @change="onChange"
      @keydown="onKeyboard"
      v-bind="$attrs" />
    <span class="m-suffix" ref="suffixRef" v-if="showSuffix">
      <span class="m-action" v-if="!disabled&&allowClear&&value" @click="onClear">
        <svg focusable="false" class="u-clear" data-icon="close-circle" width="1em" height="1em" fill="currentColor" aria-hidden="true" viewBox="64 64 896 896"><path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm165.4 618.2l-66-.3L512 563.4l-99.3 118.4-66.1.3c-4.4 0-8-3.5-8-8 0-1.9.7-3.7 1.9-5.2l130.1-155L340.5 359a8.32 8.32 0 01-1.9-5.2c0-4.4 3.6-8 8-8l66.1.3L512 464.6l99.3-118.4 66-.3c4.4 0 8 3.5 8 8 0 1.9-.7 3.7-1.9 5.2L553.5 514l130 155c1.2 1.5 1.9 3.3 1.9 5.2 0 4.4-3.6 8-8 8z"></path></svg>
      </span>
      <span class="m-count" v-if="showCount">{{ showCountNum }}</span>
    </span>
  </div>
</template>
<style lang="less" scoped>
.m-textarea {
  position: relative;
  display: inline-block;
  .u-textarea {
    width: 100%;
    min-width: 0;
    min-height: 32px;
    max-width: 100%;
    height: auto;
    padding: 4px 11px;
    color: rgba(0, 0, 0, 0.88);
    font-size: 14px;
    line-height: 1.5714285714285714;
    transition: all 0.3s, height 0s;
    resize: vertical;
    position: relative;
    display: inline-block;
    vertical-align: bottom;
    text-overflow: ellipsis;
    background-color: #ffffff;
    border: 1px solid #d9d9d9;
    border-radius: 6px;
    outline: none;
    &:hover {
      border-color: #4096ff;
      border-inline-end-width: 1px;
      z-index: 1;
    }
    &:focus-within {
      border-color: #4096ff;
      box-shadow: 0 0 0 2px rgba(5, 145, 255, 0.1);
      border-inline-end-width: 1px;
      outline: 0;
    }
  }
  .auto-size {
    max-height: 9.0072e15px;
    resize: none;
  }
  textarea:disabled {
    color: rgba(0, 0, 0, 0.25);
  }
  textarea::-webkit-input-placeholder {
    color: rgba(0, 0, 0, 0.25)
  }
  textarea:-moz-placeholder {
    color: rgba(0, 0, 0, 0.25)
  }
  textarea::-moz-placeholder {
    color: rgba(0, 0, 0, 0.25)
  }
  textarea:-ms-input-placeholder {
    color: rgba(0, 0, 0, 0.25)
  }
  .m-suffix {
    margin-inline-start: 4px;
    display: flex;
    flex: none;
    align-items: center;
    span {
      margin-right: 4px;
    }
    .m-action {
      cursor: pointer;
      .u-clear {
        font-size: 12px;
        display: inline-block;
        fill: rgba(0, 0, 0, 0.25);
        text-align: center;
        line-height: 0;
        vertical-align: -0.08em;
        transition: fill 0.3s;
        &:hover {
          fill: rgba(0, 0, 0, 0.45);
        }
      }
    }
    .m-count {
      color: rgba(0, 0, 0, 0.45);
    }
  }
}
.disabled {
  color: rgba(0, 0, 0, 0.25);
  background-color: rgba(0, 0, 0, 0.04);
  cursor: not-allowed;
  &:hover {
    border-color: #d9d9d9;
  }
  &:focus-within {
    border-color: #d9d9d9;
    box-shadow: none
  }
  .u-textare {
    background-color: transparent;
    cursor: not-allowed;
  }
}
</style>
