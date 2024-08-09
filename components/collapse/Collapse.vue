<script setup lang="ts">
import { ref } from 'vue'
import Button from '../button'
import { rafTimeout } from '../utils'
interface Collapse {
  key?: string | number // 对应 activeKey，如果没有传入 key 属性，则默认使用数据索引 (0,1,2...) 绑定
  header?: string // 面板标题 string | slot
  text?: string // 面板内容 string | slot
  showArrow?: boolean // 是否展示箭头，默认 true
}
interface Props {
  collapseData?: Collapse[] // 折叠面板数据，可使用 slot 替换对应索引的 header 和 text
  activeKey?: number[] | number | string[] | string | null // (v-model) 当前激活 tab 面板的 key
  bordered?: boolean // 带边框风格的折叠面板
  copyable?: boolean // 是否可复制面板内容
  lang?: string // 面板右上角固定内容，例如标识 language string | slot
  fontSize?: number // 面板标题和内容的字体大小，单位 px
  headerFontSize?: number // 面板标题字体大小，单位 px，优先级高于 fontSize
  textFontSize?: number // 面板内容字体大小，单位 px，优先级高于 fontSize
  showArrow?: boolean // 是否展示所有箭头，优先级低于 Collapse 的 showArrow
  arrowPlacement?: 'left' | 'right' // 箭头位置
  ghost?: boolean // 使折叠面板透明且无边框
}
const props = withDefaults(defineProps<Props>(), {
  collapseData: () => [],
  activeKey: null,
  bordered: true,
  copyable: false,
  lang: undefined,
  fontSize: 14,
  headerFontSize: undefined,
  textFontSize: undefined,
  showArrow: true,
  arrowPlacement: 'left',
  ghost: false
})
const text = ref()
const clickIndex = ref<number>(0)
function onEnter(el: Element) {
  ;(el as HTMLElement).style.height =
    text.value[clickIndex.value].offsetHeight + (props.bordered && !props.ghost ? 1 : 0) + 'px'
  ;(el as HTMLElement).style.opacity = '1'
}
function onAfterEnter(el: Element) {
  ;(el as HTMLElement).style.removeProperty('height')
  ;(el as HTMLElement).style.removeProperty('opacity')
}
function onLeave(el: Element) {
  ;(el as HTMLElement).style.height =
    text.value[clickIndex.value].offsetHeight + (props.bordered && !props.ghost ? 1 : 0) + 'px'
  ;(el as HTMLElement).style.opacity = '1'
}
function onAfterLeave(el: Element) {
  ;(el as HTMLElement).style.removeProperty('height')
  ;(el as HTMLElement).style.removeProperty('opacity')
}
const emits = defineEmits(['update:activeKey', 'change'])
function emitValue(value: any) {
  emits('update:activeKey', value)
  emits('change', value)
}
function onClick(key: number | string, index: number) {
  clickIndex.value = index
  if (activeJudge(key)) {
    if (Array.isArray(props.activeKey)) {
      const res = (props.activeKey as any[]).filter((actKey: number | string) => actKey !== key)
      emitValue(res)
    } else {
      emitValue(null)
    }
  } else {
    if (Array.isArray(props.activeKey)) {
      emitValue([...props.activeKey, key])
    } else {
      emitValue(key)
    }
  }
}
function onKeyboard(e: KeyboardEvent, key: number | string, index: number) {
  if (e.key === 'Enter') {
    onClick(key, index)
  }
}
function activeJudge(key: number | string): boolean {
  if (Array.isArray(props.activeKey)) {
    return (props.activeKey as any[]).includes(key)
  } else {
    return props.activeKey === key
  }
}
const copyTxt = ref('Copy')
function onCopy(index: number) {
  navigator.clipboard.writeText(text.value[index].innerText || '').then(
    () => {
      /* clipboard successfully set */
      copyTxt.value = 'Copied'
      rafTimeout(() => {
        copyTxt.value = 'Copy'
      }, 3000)
    },
    (err) => {
      /* clipboard write failed */
      copyTxt.value = err
    }
  )
}
</script>
<template>
  <div
    class="m-collapse"
    :class="{
      'collapse-borderless': !bordered,
      'collapse-arrow-right': arrowPlacement === 'right',
      'collapse-ghost': ghost
    }"
  >
    <div class="m-collapse-item" v-for="(data, index) in collapseData" :key="index">
      <div
        class="m-collapse-header"
        :class="{ 'collapse-header-no-arrow': data.showArrow !== undefined ? !data.showArrow : !showArrow }"
        tabindex="0"
        @click="onClick(data.key || index, index)"
        @keydown="onKeyboard($event, data.key || index, index)"
      >
        <div class="m-arrow" v-if="data.showArrow !== undefined ? data.showArrow : showArrow">
          <svg
            focusable="false"
            class="u-arrow"
            :class="{ 'arrow-rotate': activeJudge(data.key || index) }"
            data-icon="right"
            aria-hidden="true"
            viewBox="64 64 896 896"
          >
            <path
              d="M765.7 486.8L314.9 134.7A7.97 7.97 0 00302 141v77.3c0 4.9 2.3 9.6 6.1 12.6l360 281.1-360 281.1c-3.9 3-6.1 7.7-6.1 12.6V883c0 6.7 7.7 10.4 12.9 6.3l450.8-352.1a31.96 31.96 0 000-50.4z"
            ></path>
          </svg>
        </div>
        <div class="u-header" :style="`font-size: ${headerFontSize || fontSize}px;`">
          <slot name="header" :header="data.header" :key="data.key || index">{{ data.header || '--' }}</slot>
        </div>
      </div>
      <Transition
        name="collapse"
        @enter="onEnter"
        @after-enter="onAfterEnter"
        @leave="onLeave"
        @after-leave="onAfterLeave"
      >
        <div
          v-show="activeJudge(data.key || index)"
          class="m-collapse-content"
          :class="{ 'u-collapse-copyable': copyable }"
        >
          <div class="u-lang">
            <slot name="lang" :lang="lang" :key="data.key || index">{{ lang }}</slot>
          </div>
          <Button size="small" class="u-copy" type="primary" @click="onCopy(index)">{{ copyTxt }}</Button>
          <div ref="text" class="u-text" :style="`font-size: ${textFontSize || fontSize}px;`">
            <slot name="text" :text="data.text" :key="data.key || index">{{ data.text }}</slot>
          </div>
        </div>
      </Transition>
    </div>
  </div>
</template>
<style lang="less" scoped>
.collapse-enter-active,
.collapse-leave-active {
  overflow: hidden;
  transition:
    height 0.2s cubic-bezier(0.645, 0.045, 0.355, 1),
    opacity 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
}
.collapse-enter-from,
.collapse-leave-to {
  height: 0 !important;
  opacity: 0 !important;
}
.m-collapse {
  background-color: rgba(0, 0, 0, 0.02);
  border: 1px solid #d9d9d9;
  border-bottom: 0;
  border-radius: 8px;
  .m-collapse-item {
    border-bottom: 1px solid #d9d9d9;
    &:last-child {
      border-radius: 0 0 8px 8px;
      .m-collapse-header,
      .m-collapse-content {
        border-radius: 0 0 8px 8px;
      }
    }
    .m-collapse-header {
      display: flex;
      flex-wrap: nowrap;
      align-items: flex-start;
      padding: 12px 16px;
      cursor: pointer;
      transition: all 0.3s;
      &:focus {
        outline: none;
      }
      .m-arrow {
        height: 22px;
        display: flex;
        align-items: center;
        padding-inline-end: 12px;
        .u-arrow {
          display: inline-block;
          width: 12px;
          height: 12px;
          fill: rgba(0, 0, 0, 0.88);
          transition: transform 0.3s;
        }
        .arrow-rotate {
          transform: rotate(90deg);
        }
      }
      .u-header {
        // 元素会根据自身的宽度与高度来确定尺寸，但是会伸长并吸收 flex 容器中额外的自由空间，也会缩短自身来适应 flex 容器
        flex: auto; // 相当于 flex: 1 1 auto
        margin-inline-end: auto;
        display: inline-block;
        color: rgba(0, 0, 0, 0.88);
        line-height: 1.5714285714285714;
      }
      .ml24 {
        margin-left: 24px;
      }
    }
    .collapse-header-no-arrow {
      padding-inline-start: 12px;
    }
    .m-collapse-content {
      position: relative;
      background-color: #ffffff;
      border-top: 1px solid #d9d9d9;
      .u-lang {
        position: absolute;
        right: 10px;
        top: 6px;
        font-size: 14px;
        color: rgba(0, 0, 0, 0.38);
        opacity: 1;
        transition: opacity 0.3s;
      }
      .u-copy {
        position: absolute;
        right: 8px;
        top: 8px;
        opacity: 0;
        pointer-events: none;
        transition: opacity 0.3s;
      }
      .u-text {
        padding: 16px;
        color: rgba(0, 0, 0, 0.88);
        white-space: pre-wrap;
      }
    }
    .u-collapse-copyable {
      &:hover {
        .u-lang {
          opacity: 0;
          pointer-events: none;
        }
        .u-copy {
          opacity: 1;
          pointer-events: auto;
        }
      }
    }
  }
}
.collapse-borderless {
  background-color: rgba(0, 0, 0, 0.02);
  border: 0;
  .m-collapse-item {
    &:last-child {
      border-bottom: 0;
      .m-collapse-header {
        border-radius: 0;
      }
    }
    .m-collapse-content {
      background-color: transparent;
      border-top: 0;
    }
  }
}
.collapse-arrow-right {
  .m-collapse-item .m-collapse-header .m-arrow {
    order: 1; // order 属性定义项目的排列顺序。数值越小，排列越靠前，默认为 0
    padding-inline-end: 0;
    padding-inline-start: 12px;
  }
}
.collapse-ghost {
  background-color: transparent;
  border: 0;
  .m-collapse-item {
    border-bottom: 0;
    .m-collapse-content {
      background-color: transparent;
      border: 0;
    }
  }
}
</style>
