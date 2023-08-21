<script setup lang="ts">
import { ref, computed, onMounted, nextTick } from 'vue'
import Space from '../space'
interface Tag {
  label?: string // 标签文本名 string | slot
  closable?: boolean // 标签是否可以关闭，默认 true
  color?: string // 标签颜色
  icon?: string // 设置图标 string | slot
  size?: 'small'|'middle'|'large' // 标签尺寸
}
interface Props {
  closable?: boolean // 标签是否可以关闭
  color?: string // 标签颜色
  icon?: string // 设置图标 string | slot
  size?: 'small'|'middle'|'large' // 标签尺寸
  dynamic?: boolean // 是否启用标签动态添加和删除
  value?: string[]|Tag[] // 动态标签数组，dynamic 为 true 时生效
  // 启用动态标签后，可设置以下 Space 相关属性
  spaceWidth?: string|number // 间距区域总宽度
  spaceAlign?: 'stretch'|'start'|'end'|'center'|'baseline' // 垂直排列方式
  spaceDirection?: 'horizontal'|'vertical' // 间距方向
  spaceSize?: number|number[]|'small'|'middle'|'large' // 间距大小，数组时表示: [水平间距, 垂直间距]
}
const props = withDefaults(defineProps<Props>(), {
  closable: false,
  color: '',
  icon: '',
  size: 'middle',
  dynamic: false,
  value: () => [],
  spaceWidth: 'auto',
  spaceAlign: 'start',
  spaceDirection: 'horizontal',
  spaceSize: 'small'
})
const isStrArray = computed(() => {
  if (props.dynamic) {
    if (props.value.length) {
      if (typeof props.value[0] === 'string') {
        return true
      }
      if (typeof props.value[0] === 'object') {
        return false
      }
    }
  }
  return null
})
const tags = computed(() => {
  if (props.dynamic) {
    if (props.value.length) {
      if (isStrArray.value) {
        return props.value.map((tag: any) => {
          return {
            label: tag,
            closable: true
          }
        })
      } else {
        return props.value.map((tag: any) => {
          return {
            closable: true,
            ...tag
          }
        })
      }
    }
  }
  return []
})
const inputRef = ref()
const showInput = ref(false)
const inputValue = ref('')
const presetColor = ['success', 'processing', 'error', 'warning', 'default', 'pink', 'red', 'yellow', 'orange', 'cyan', 'green', 'blue', 'purple', 'geekblue', 'magenta', 'volcano', 'gold', 'lime']
const hidden = ref(false)
const iconRef = ref()
const showIcon = ref(1)
const tagsIconRef = ref()
const showTagsIcon = ref(Array(props.value.length).fill(1))
onMounted(() => {
  if (props.dynamic) {
    for (let n = 0; n < props.value.length; n++) {
      showTagsIcon.value[n] = tagsIconRef.value[n].offsetWidth
    }
  } else {
    showIcon.value = iconRef.value.offsetWidth
  }
})
const emits = defineEmits(['update:value', 'close', 'dynamicClose'])
function onClose (e: MouseEvent) {
  hidden.value = true
  emits('close', e)
}
function onCloseTags (tag: Tag, n: number) {
  const newValue = (props.value as any[]).filter((tag: any, index: number) => {
    return index !== n
  })
  emits('update:value', newValue)
  emits('dynamicClose', tag, n)
}
function onAdd () {
  showInput.value = true
  nextTick(() => {
    inputRef.value.focus()
  })
}
function onChange () {
  if (isStrArray.value) {
    emits('update:value', [...props.value, inputValue.value])
  } else {
    emits('update:value', [
      ...props.value,
      {
        label: inputValue.value
      }
    ])
  }
  showInput.value = false
  inputRef.value = ''
}
function onKeyboard (e: KeyboardEvent) {
  if (e.key === 'Enter') {
    inputRef.value.blur()
  }
}
</script>
<template>
  <div
    v-if="!dynamic"
    class="m-tag"
    :class="[`tag-${size}`, color && presetColor.includes(color) ? 'tag-' + color:'', {'has-color': color && !presetColor.includes(color), hidden: hidden}]"
    :style="`background-color: ${color && !presetColor.includes(color) ? color : ''};`">
    <span class="m-icon" ref="iconRef" v-if="showIcon">
      <slot name="icon"></slot>
    </span>
    <span class="u-tag">
      <slot></slot>
    </span>
    <span class="m-close" v-if="closable" @click="onClose">
      <svg focusable="false" class="u-close" data-icon="close" width="1em" height="1em" fill="currentColor" aria-hidden="true" viewBox="64 64 896 896"><path d="M563.8 512l262.5-312.9c4.4-5.2.7-13.1-6.1-13.1h-79.8c-4.7 0-9.2 2.1-12.3 5.7L511.6 449.8 295.1 191.7c-3-3.6-7.5-5.7-12.3-5.7H203c-6.8 0-10.5 7.9-6.1 13.1L459.4 512 196.9 824.9A7.95 7.95 0 00203 838h79.8c4.7 0 9.2-2.1 12.3-5.7l216.5-258.1 216.5 258.1c3 3.6 7.5 5.7 12.3 5.7h79.8c6.8 0 10.5-7.9 6.1-13.1L563.8 512z"></path></svg>
    </span>
    </div>
  <template v-else>
    <Space :width="spaceWidth" :align="spaceAlign" :direction="spaceDirection" :size="spaceSize">
      <div
        class="m-tag"
        :class="[`tag-${tag.size || size}`, (tag.color || color) && presetColor.includes((tag.color || color)) ? 'tag-' + (tag.color || color):'', {'has-color': (tag.color || color) && !presetColor.includes((tag.color || color))}]"
        :style="`background-color: ${(tag.color || color) && !presetColor.includes((tag.color || color)) ? (tag.color || color) : ''};`"
        v-for="(tag, index) in tags" :key="index">
        <span class="m-icon" ref="tagsIconRef" v-if="showTagsIcon[index]">
          <slot name="icon" :index="index">{{ tag.icon }}</slot>
        </span>
        <span class="u-tag">
          <slot :label="tag.label" :index="index">{{ tag.label }}</slot>
        </span>
        <span class="m-close" v-if="tag.closable || closable" @click="onCloseTags(tag, index)">
          <svg focusable="false" class="u-close" data-icon="close" width="1em" height="1em" fill="currentColor" aria-hidden="true" viewBox="64 64 896 896"><path d="M563.8 512l262.5-312.9c4.4-5.2.7-13.1-6.1-13.1h-79.8c-4.7 0-9.2 2.1-12.3 5.7L511.6 449.8 295.1 191.7c-3-3.6-7.5-5.7-12.3-5.7H203c-6.8 0-10.5 7.9-6.1 13.1L459.4 512 196.9 824.9A7.95 7.95 0 00203 838h79.8c4.7 0 9.2-2.1 12.3-5.7l216.5-258.1 216.5 258.1c3 3.6 7.5 5.7 12.3 5.7h79.8c6.8 0 10.5-7.9 6.1-13.1L563.8 512z"></path></svg>
        </span>
      </div>
      <div v-if="!showInput" class="m-tag" :class="[`tag-${size}`, {'m-plus': dynamic}]" @click="onAdd">
        <svg focusable="false" class="u-plus" data-icon="plus" width="1em" height="1em" fill="currentColor" aria-hidden="true" viewBox="64 64 896 896"><path d="M482 152h60q8 0 8 8v704q0 8-8 8h-60q-8 0-8-8V160q0-8 8-8z"></path><path d="M176 474h672q8 0 8 8v60q0 8-8 8H176q-8 0-8-8v-60q0-8 8-8z"></path></svg>
      </div>
      <input
        v-show="showInput"
        ref="inputRef"
        class="u-input"
        :class="`input-${size}`"
        type="text"
        v-model="inputValue"
        @blur="showInput = false"
        @change="onChange"
        @keydown="onKeyboard" />
    </Space>
  </template>
</template>
<style lang="less" scoped>
.m-tag {
  height: 24px;
  font-size: 14px;
  line-height: 22px;
  display: inline-block;
  color: rgba(0, 0, 0, .88);
  padding-inline: 7px;
  white-space: nowrap;
  background: rgba(0, 0, 0, .02);
  border: 1px solid #d9d9d9;
  border-radius: 6px;
  transition: all .2s;
  text-align: start;
  .m-icon {
    margin-right: 5px;
    display: inline-flex;
    align-items: center;
    text-align: center;
    vertical-align: -.125em;
  }
  .u-tag {
    display: inline-block;
    vertical-align: bottom;
  }
  .u-plus {
    display: inline-flex;
    align-items: center;
    width: 14px;
    height: 14px;
    fill: rgba(0, 0, 0, .88);
    font-style: normal;
    line-height: 0;
    text-align: center;
    vertical-align: -0.175em;
    transition: fill .2s;
  }
  .m-close {
    margin-inline-start: 3px;
    font-size: 12px;
    display: inline-flex;
    align-items: center;
    font-style: normal;
    line-height: 0;
    text-align: center;
    vertical-align: -0.125em;
    cursor: pointer;
    .u-close {
      display: inline-block;
      line-height: 1;
      fill: rgba(0, 0, 0, .45);
      transition: all .2s;
      &:hover {
        fill: rgba(0, 0, 0, .88);
      }
    }
  }
}
.tag-small {
  height: 22px;
  font-size: 12px;
  line-height: 20px;
  border-radius: 4px;
  .u-plus {
    width: 12px;
    height: 12px;
  }
  .m-close {
    font-size: 10px;
  }
}
.tag-large {
  height: 28px;
  line-height: 26px;
  .m-close {
    font-size: 14px;
    vertical-align: -0.16em;
  }
}
.m-plus {
  background: rgb(255, 255, 255);
  border-style: dashed;
  padding-inline: 10px;
  text-align: center;
  cursor: pointer;
  &:hover {
    border-color: @themeColor;
    .u-plus {
      fill: @themeColor;
    }
  }
}
.u-input {
  width: 86px;
  color: rgba(0, 0, 0, .88);
  height: 24px;
  font-size: 14px;
  line-height: 22px;
  padding: 0 8px;
  position: relative;
  display: inline-block;
  min-width: 0;
  background-color: #ffffff;
  border: 1px solid #d9d9d9;
  border-radius: 6px;
  outline: none;
  transition: all .2s;
  &:focus {
    border-color: #4096ff;
    box-shadow: 0 0 0 2px rgba(5, 145, 255, .1);
    border-inline-end-width: 1px;
    outline: 0;
  }
}
.input-small {
  width: 78px;
  height: 22px;
  font-size: 12px;
  line-height: 20px;
  padding: 0 6px;
  border-radius: 4px;
}
.input-large {
  width: 90px;
  height: 28px;
  line-height: 26px;
}
.tag-success {
  color: #52c41a;
  background: #f6ffed;
  border-color: #b7eb8f;
  :deep(svg) {
    fill: #52c41a;
  }
}
.tag-processing {
  color: #1677ff;
  background: #e6f4ff;
  border-color: #91caff;
  :deep(svg) {
    fill: #1677ff;
  }
}
.tag-error {
  color: #ff4d4f;
  background: #fff2f0;
  border-color: #ffccc7;
  :deep(svg) {
    fill: #ff4d4f;
  }
}
.tag-warning {
  color: #faad14;
  background: #fffbe6;
  border-color: #ffe58f;
  :deep(svg) {
    fill: #faad14;
  }
}
.tag-pink {
  color: #c41d7f;
  background: #fff0f6;
  border-color: #ffadd2;
  :deep(svg) {
    fill: #c41d7f;
  }
}
.tag-red {
  color: #cf1322;
  background: #fff1f0;
  border-color: #ffa39e;
  :deep(svg) {
    fill: #cf1322;
  }
}
.tag-yellow {
  color: #d4b106;
  background: #feffe6;
  border-color: #fffb8f;
  :deep(svg) {
    fill: #d4b106;
  }
}
.tag-orange {
  color: #d46b08;
  background: #fff7e6;
  border-color: #ffd591;
  :deep(svg) {
    fill: #d46b08;
  }
}
.tag-green {
  color: #389e0d;
  background: #f6ffed;
  border-color: #b7eb8f;
  :deep(svg) {
    fill: #389e0d;
  }
}
.tag-cyan {
  color: #08979c;
  background: #e6fffb;
  border-color: #87e8de;
  :deep(svg) {
    fill: #08979c;
  }
}
.tag-blue {
  color: #0958d9;
  background: #e6f4ff;
  border-color: #91caff;
  :deep(svg) {
    fill: #0958d9;
  }
}
.tag-purple {
  color: #531dab;
  background: #f9f0ff;
  border-color: #d3adf7;
  :deep(svg) {
    fill: #531dab;
  }
}
.tag-geekblue {
  color: #1d39c4;
  background: #f0f5ff;
  border-color: #adc6ff;
  :deep(svg) {
    fill: #1d39c4;
  }
}
.tag-magenta {
  color: #eb2f96;
  background: #fff0f6;
  border-color: #ffadd2;
  :deep(svg) {
    fill: #eb2f96;
  }
}
.tag-volcano {
  color: #d4380d;
  background: #fff2e8;
  border-color: #ffbb96;
  :deep(svg) {
    fill: #d4380d;
  }
}
.tag-gold {
  color: #d48806;
  background: #fffbe6;
  border-color: #ffe58f;
  :deep(svg) {
    fill: #d48806;
  }
}
.tag-lime {
  color: #7cb305;
  background: #fcffe6;
  border-color: #eaff8f;
  :deep(svg) {
    fill: #7cb305;
  }
}
.has-color {
  color: #fff;
  border-color: transparent;
  .m-close .u-close {
    fill: rgba(255, 255, 255, .85);
    &:hover {
      fill: rgba(255, 255, 255, 1);
    }
  }
}
.hidden {
  display: none;
}
</style>
