<script setup lang="ts">
import { ref } from 'vue'
import type { CSSProperties, Slot } from 'vue'
import Button from '../button'
import { rafTimeout } from '../utils'
interface Collapse {
  key?: string | number // 对应 activeKey，如果没有传入 key 属性，则默认使用数据索引 (0,1,2...) 绑定
  header?: string // 面板标题 string | slot
  content?: string // 面板内容 string | slot
  disabled?: boolean // 是否禁用展开，默认 false
  showArrow?: boolean // 是否展示箭头，默认 true
  extra?: string // 面板标题右侧的额外内容 string | slot
}
interface Props {
  collapseData?: Collapse[] // 折叠面板数据，可使用 slot 替换指定 key 的 header、content、arrow、extra、lang
  activeKey?: number[] | number | string[] | string | null // (v-model) 当前激活 tab 面板的 key
  disabled?: boolean // 是否禁用，优先级低于 Collapse 的 disabled
  collapseStyle?: CSSProperties // 设置面板的样式
  bordered?: boolean // 带边框风格的折叠面板
  copyable?: boolean // 是否可复制面板内容
  lang?: string // 面板右上角固定内容，例如标识 language string | slot
  itemStyle?: CSSProperties // 设置面板容器的样式
  headerStyle?: CSSProperties // 设置面板标题的样式
  contentStyle?: CSSProperties // 设置面板内容的样式
  arrow?: Slot // 自定义箭头切换图标 slot
  showArrow?: boolean // 是否展示箭头，优先级低于 Collapse 的 showArrow
  arrowPlacement?: 'left' | 'right' // 箭头位置
  arrowStyle?: CSSProperties // 设置面板箭头的样式
  extra?: string // 面板标题右侧的额外内容 string | slot
  ghost?: boolean // 使折叠面板透明且无边框
}
const props = withDefaults(defineProps<Props>(), {
  collapseData: () => [],
  activeKey: null,
  disabled: false,
  collapseStyle: () => ({}),
  bordered: true,
  copyable: false,
  lang: undefined,
  itemStyle: () => ({}),
  headerStyle: () => ({}),
  contentStyle: () => ({}),
  arrow: undefined,
  showArrow: true,
  arrowPlacement: 'left',
  arrowStyle: () => ({}),
  extra: undefined,
  ghost: false
})
const contentRef = ref()
const clickIndex = ref<number>(0)
function onEnter(el: Element) {
  ;(el as HTMLElement).style.height =
    contentRef.value[clickIndex.value].offsetHeight + (props.bordered && !props.ghost ? 1 : 0) + 'px'
  ;(el as HTMLElement).style.opacity = '1'
}
function onAfterEnter(el: Element) {
  ;(el as HTMLElement).style.removeProperty('height')
  ;(el as HTMLElement).style.removeProperty('opacity')
}
function onLeave(el: Element) {
  ;(el as HTMLElement).style.height =
    contentRef.value[clickIndex.value].offsetHeight + (props.bordered && !props.ghost ? 1 : 0) + 'px'
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
  if (activeCheck(key)) {
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
function activeCheck(key: number | string): boolean {
  if (Array.isArray(props.activeKey)) {
    return (props.activeKey as any[]).includes(key)
  } else {
    return props.activeKey === key
  }
}
const copyTxt = ref('Copy')
function onCopy(index: number) {
  navigator.clipboard.writeText(contentRef.value[index].innerText || '').then(
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
    :style="collapseStyle"
  >
    <div
      class="m-collapse-item"
      :class="{ 'collapse-item-disabled': data.disabled === undefined ? disabled : data.disabled }"
      :style="itemStyle"
      v-for="(data, index) in collapseData"
      :key="index"
    >
      <div
        tabindex="0"
        class="m-collapse-header"
        :class="{ 'collapse-header-no-arrow': data.showArrow !== undefined ? !data.showArrow : !showArrow }"
        :style="headerStyle"
        @click="
          (data.disabled === undefined ? disabled : data.disabled) ? () => false : onClick(data.key || index, index)
        "
        @keydown="onKeyboard($event, data.key || index, index)"
      >
        <div
          v-if="data.showArrow !== undefined ? data.showArrow : showArrow"
          class="collapse-arrow"
          :style="arrowStyle"
        >
          <slot name="arrow" :key="data.key || index" :active="activeCheck(data.key || index)">
            <svg
              class="arrow-svg"
              :class="{ 'arrow-rotate': activeCheck(data.key || index) }"
              focusable="false"
              data-icon="right"
              width="1em"
              height="1em"
              fill="currentColor"
              aria-hidden="true"
              viewBox="64 64 896 896"
            >
              <path
                d="M765.7 486.8L314.9 134.7A7.97 7.97 0 00302 141v77.3c0 4.9 2.3 9.6 6.1 12.6l360 281.1-360 281.1c-3.9 3-6.1 7.7-6.1 12.6V883c0 6.7 7.7 10.4 12.9 6.3l450.8-352.1a31.96 31.96 0 000-50.4z"
              ></path>
            </svg>
          </slot>
        </div>
        <div class="collapse-header">
          <slot name="header" :header="data.header" :key="data.key || index" :active="activeCheck(data.key || index)">
            {{ data.header || '--' }}
          </slot>
        </div>
        <div class="collapse-extra">
          <slot name="extra" :extra="data.extra" :key="data.key || index" :active="activeCheck(data.key || index)">
            {{ data.extra || extra }}
          </slot>
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
          v-show="activeCheck(data.key || index)"
          class="m-collapse-content"
          :class="{ 'collapse-copyable': copyable }"
        >
          <div class="collapse-lang">
            <slot name="lang" :lang="lang" :key="data.key || index" :active="activeCheck(data.key || index)">
              {{ lang }}
            </slot>
          </div>
          <Button class="collapse-copy" size="small" type="primary" @click="onCopy(index)">{{ copyTxt }}</Button>
          <div ref="contentRef" class="collapse-content" :style="contentStyle">
            <slot
              name="content"
              :content="data.content"
              :key="data.key || index"
              :active="activeCheck(data.key || index)"
            >
              {{ data.content }}
            </slot>
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
  font-size: 14px;
  color: rgba(0, 0, 0, 0.88);
  line-height: 1.5714285714285714;
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
      position: relative;
      display: flex;
      flex-wrap: nowrap;
      align-items: flex-start;
      padding: 12px 16px;
      color: rgba(0, 0, 0, 0.88);
      line-height: 1.5714285714285714;
      cursor: pointer;
      transition: all 0.3s;
      &:focus {
        outline: none;
      }
      .collapse-arrow {
        font-size: 12px;
        height: 22px;
        display: flex;
        align-items: center;
        padding-right: 12px;
        .arrow-rotate {
          transform: rotate(90deg);
        }
        :deep(svg) {
          fill: currentColor;
          transition: transform 0.3s;
        }
      }
      .collapse-header {
        // 元素会根据自身的宽度与高度来确定尺寸，但是会伸长并吸收 flex 容器中额外的自由空间，也会缩短自身来适应 flex 容器
        flex: auto; // 相当于 flex: 1 1 auto
        margin-right: auto;
        display: inline-block;
      }
      .collapse-extra {
        display: flex;
        align-items: center;
        :deep(svg) {
          fill: currentColor;
        }
      }
    }
    .collapse-header-no-arrow {
      padding-left: 12px;
    }
    .m-collapse-content {
      position: relative;
      color: rgba(0, 0, 0, 0.88);
      background-color: #ffffff;
      border-top: 1px solid #d9d9d9;
      .collapse-lang {
        position: absolute;
        right: 10px;
        top: 6px;
        font-size: 14px;
        color: rgba(0, 0, 0, 0.38);
        opacity: 1;
        transition: opacity 0.3s;
      }
      .collapse-copy {
        position: absolute;
        right: 8px;
        top: 8px;
        opacity: 0;
        pointer-events: none;
        transition: opacity 0.3s;
      }
      .collapse-content {
        padding: 16px;
        white-space: pre-wrap;
      }
    }
    .collapse-copyable {
      &:hover {
        .collapse-lang {
          opacity: 0;
          pointer-events: none;
        }
        .collapse-copy {
          opacity: 1;
          pointer-events: auto;
        }
      }
    }
  }
  .collapse-item-disabled {
    .m-collapse-header {
      color: rgba(0, 0, 0, 0.25);
      cursor: not-allowed;
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
  .m-collapse-item .m-collapse-header .collapse-arrow {
    order: 1; // order 属性定义项目的排列顺序。数值越小，排列越靠前，默认为 0
    padding-right: 0;
    padding-left: 12px;
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
