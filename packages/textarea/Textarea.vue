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
import { ref, computed, onMounted } from 'vue'
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
const suffixRef = ref()
const showSuffix = ref(1)
onMounted(() => {
  showSuffix.value = suffixRef.value.offsetWidth
})
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
      class="u-textarea"
      ref="textarea"
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
  font-size: 14px;
  color: rgba(0, 0, 0, 0.88);
  line-height: 1.5714285714285714;
  position: relative;
  display: inline-flex;
  width: 100%;
  min-width: 0;
  padding: 4px 11px;
  background-color: #ffffff;
  border-width: 1px;
  border-style: solid;
  border-color: #d9d9d9;
  border-radius: 6px;
  transition: all 0.2s;
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
  .u-textarea {
    font-size: 14px;
    line-height: 1.5714285714285714;
    position: relative;
    display: inline-block;
    width: 100%;
    min-width: 0;
    background-color: #ffffff;
    border: none;
    outline: none;
    text-overflow: ellipsis;
    transition: all 0.2s;

    height: 32px;
    max-height: 9.0072e15px;
    resize: none;
    text-overflow: ellipsis;
    max-width: 100%;
    min-height: 32px;
    line-height: 1.5714285714285714;
    vertical-align: bottom;
    transition: all 0.3s,height 0s;
    resize: vertical;
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
