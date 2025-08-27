<script setup lang="ts">
import { ref, watchEffect } from 'vue'
import type { CSSProperties, VNode, Slot } from 'vue'
import Button from 'components/button'
import { debounce } from 'components/utils'
export interface Item {
  key?: string | number // 对应 activeKey，如果没有传入 key 属性，则默认使用数据索引 (0,1,2...) 绑定
  disabled?: boolean // 是否禁用展开收起
  header?: string // 面板标题 string | slot
  headerStyle?: CSSProperties // 设置面板标题的样式
  content?: string // 面板内容 string | slot
  contentStyle?: CSSProperties // 设置面板内容的样式
  collapseStyle?: CSSProperties // 设置面板容器的样式
  arrow?: VNode // 自定义箭头切换图标
  showArrow?: boolean // 是否展示箭头
  arrowPlacement?: 'left' | 'right' // 箭头位置
  arrowStyle?: CSSProperties // 设置面板箭头的样式
  extra?: string // 面板标题右侧的额外内容 string | slot
  lang?: string // 面板右上角固定内容，例如 language 标识 string | slot
  copyable?: boolean // 是否可复制面板内容
  copyProps?: object // 复制按钮属性配置，参考 Button Props
  copyText?: string // 复制按钮文本
  copiedText?: string // 已复制按钮文本
  [propName: string]: any // 用于包含带有任意数量的其他属性
}
export interface Props {
  items?: Item[] // 折叠面板数据，可使用 slot 替换指定 key 的 header、content、arrow、extra、lang
  activeKey?: string[] | string | number[] | number | null // (v-model) 当前激活 tab 面板的 key，传入 string | number 类型时，即为手风琴模式
  bordered?: boolean // 带边框风格的折叠面板
  disabled?: boolean // 是否禁用展开收起，较低优先级
  ghost?: boolean // 使折叠面板透明且无边框
  headerStyle?: CSSProperties // 设置面板标题的样式，较低优先级
  contentStyle?: CSSProperties // 设置面板内容的样式，较低优先级
  collapseStyle?: CSSProperties // 设置面板容器的样式，较低优先级
  arrow?: VNode | Slot // 自定义箭头切换图标，较低优先级 vnode | slot
  showArrow?: boolean // 是否展示箭头，较低优先级
  arrowPlacement?: 'left' | 'right' // 箭头位置，较低优先级
  arrowStyle?: CSSProperties // 设置面板箭头的样式，较低优先级
  extra?: string // 面板标题右侧的额外内容，较低优先级 string | slot
  lang?: string // 面板右上角固定内容，例如 language 标识，较低优先级 string | slot
  copyable?: boolean // 是否可复制面板内容，较低优先级
  copyProps?: object // 复制按钮属性配置，参考 Button Props，较低优先级
  copyText?: string // 复制按钮文本，较低优先级
  copiedText?: string // 已复制按钮文本，较低优先级
}
const props = withDefaults(defineProps<Props>(), {
  items: () => [],
  activeKey: null,
  bordered: true,
  disabled: false,
  ghost: false,
  headerStyle: () => ({}),
  contentStyle: () => ({}),
  collapseStyle: () => ({}),
  arrow: undefined,
  showArrow: true,
  arrowPlacement: 'left',
  arrowStyle: () => ({}),
  extra: undefined,
  lang: undefined,
  copyable: false,
  copyProps: () => ({}),
  copyText: 'Copy',
  copiedText: 'Copied'
})
const contentRef = ref() // 面板内容的模板引用
const copyBtnTxt = ref<string>() // 复制按钮文本
const copyBtnClickedKeys = ref<(string | number)[]>([]) // 被点击的复制按钮的 key
const emits = defineEmits(['update:activeKey', 'change'])
watchEffect(() => {
  copyBtnTxt.value = props.copyText
})
function getComputedValue(item: Item, key: keyof Props) {
  let computedValue = props[key as keyof Props]
  if (item?.[key as keyof Item] !== undefined) {
    computedValue = item[key as keyof Item]
  }
  return computedValue
}
function getComputedKey(key: number | string | undefined, index: number) {
  if (key !== undefined) {
    return key
  }
  return index
}
function setProperties(el: Element) {
  ;(el as HTMLElement).style.height =
    (el.lastElementChild as HTMLElement).offsetHeight + (props.bordered && !props.ghost ? 1 : 0) + 'px'
  ;(el as HTMLElement).style.opacity = '1'
}
function removeProperties(el: Element) {
  ;(el as HTMLElement).style.removeProperty('height')
  ;(el as HTMLElement).style.removeProperty('opacity')
}
function emitValue(value: any) {
  emits('update:activeKey', value)
  emits('change', value)
}
function onClick(key: string | number) {
  if (activeCheck(key)) {
    if (Array.isArray(props.activeKey)) {
      const res = (props.activeKey as any[]).filter((actKey: string | number) => actKey !== key)
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
function activeCheck(key: string | number): boolean {
  if (Array.isArray(props.activeKey)) {
    return (props.activeKey as any[]).includes(key)
  } else {
    return props.activeKey === key
  }
}
function getCopyBtnTxt(item: Item, index: number) {
  const copyText = getComputedValue(item, 'copyText')
  const copiedText = getComputedValue(item, 'copiedText')
  if (copyBtnClickedKeys.value.includes(getComputedKey(item.key, index))) {
    return copiedText
  } else {
    return copyText
  }
}
const debounceRestCopyBtn = debounce((key: string | number) => {
  copyBtnClickedKeys.value = copyBtnClickedKeys.value.filter((clickedKey: string | number) => clickedKey !== key)
}, 3000)
function onCopy(index: number, key: string | number) {
  navigator.clipboard.writeText(contentRef.value[index].innerText || '').then(
    () => {
      if (!copyBtnClickedKeys.value.includes(key)) {
        copyBtnClickedKeys.value.push(key)
      }
      /* clipboard successfully set */
      debounceRestCopyBtn(key)
    },
    (err) => {
      /* clipboard write failed */
      console.log('copy failed', err)
    }
  )
}
</script>
<template>
  <div
    class="collapse-wrap"
    :class="{
      'collapse-borderless': !bordered,
      'collapse-ghost': ghost
    }"
  >
    <div
      class="collapse-item"
      :class="{
        'collapse-arrow-left': getComputedValue(item, 'arrowPlacement') === 'left',
        'collapse-arrow-right': getComputedValue(item, 'arrowPlacement') === 'right',
        'collapse-item-disabled': getComputedValue(item, 'disabled')
      }"
      :style="getComputedValue(item, 'collapseStyle') as CSSProperties"
      v-for="(item, index) in items"
      :key="index"
    >
      <div
        tabindex="0"
        class="collapse-header-wrap"
        :class="{ 'collapse-header-no-arrow': getComputedValue(item, 'showArrow') }"
        :style="getComputedValue(item, 'headerStyle') as CSSProperties"
        @click="getComputedValue(item, 'disabled') ? () => false : onClick(getComputedKey(item.key, index))"
        @keydown.enter="onClick(getComputedKey(item.key, index))"
      >
        <div
          v-if="getComputedValue(item, 'showArrow')"
          class="collapse-arrow"
          :style="getComputedValue(item, 'arrowStyle') as CSSProperties"
        >
          <slot
            name="arrow"
            :item="item"
            :key="getComputedKey(item.key, index)"
            :active="activeCheck(getComputedKey(item.key, index))"
          >
            <component
              v-if="getComputedValue(item, 'arrow')"
              :is="getComputedValue(item, 'arrow')"
              class="arrow-svg"
              :class="{ 'arrow-rotate': activeCheck(getComputedKey(item.key, index)) }"
            />
            <svg
              v-else
              class="arrow-svg"
              :class="{ 'arrow-rotate': activeCheck(getComputedKey(item.key, index)) }"
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
          <slot
            name="header"
            :item="item"
            :header="item.header"
            :key="getComputedKey(item.key, index)"
            :active="activeCheck(getComputedKey(item.key, index))"
          >
            {{ item.header }}
          </slot>
        </div>
        <div class="collapse-extra">
          <slot
            name="extra"
            :item="item"
            :extra="getComputedValue(item, 'extra')"
            :key="getComputedKey(item.key, index)"
            :active="activeCheck(getComputedKey(item.key, index))"
          >
            {{ getComputedValue(item, 'extra') }}
          </slot>
        </div>
      </div>
      <Transition
        name="collapse"
        @enter="setProperties"
        @after-enter="removeProperties"
        @leave="setProperties"
        @after-leave="removeProperties"
      >
        <div
          v-show="activeCheck(getComputedKey(item.key, index))"
          class="collapse-content-wrap"
          :class="{ 'collapse-copyable': getComputedValue(item, 'copyable') }"
        >
          <div class="collapse-lang">
            <slot
              name="lang"
              :item="item"
              :lang="getComputedValue(item, 'lang')"
              :key="getComputedKey(item.key, index)"
              :active="activeCheck(getComputedKey(item.key, index))"
            >
              {{ getComputedValue(item, 'lang') }}
            </slot>
          </div>
          <Button
            class="collapse-copy"
            size="small"
            type="primary"
            @click="onCopy(index, getComputedKey(item.key, index))"
            v-bind="getComputedValue(item, 'copyProps') as object"
          >
            {{ getCopyBtnTxt(item, index) }}
          </Button>
          <div
            ref="contentRef"
            class="collapse-content"
            :style="getComputedValue(item, 'contentStyle') as CSSProperties"
          >
            <slot
              name="content"
              :item="item"
              :content="item.content"
              :key="getComputedKey(item.key, index)"
              :active="activeCheck(getComputedKey(item.key, index))"
            >
              {{ item.content }}
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
.collapse-wrap {
  font-size: 14px;
  color: rgba(0, 0, 0, 0.88);
  line-height: 1.5714285714285714;
  background-color: rgba(0, 0, 0, 0.02);
  border: 1px solid #d9d9d9;
  border-bottom: 0;
  border-radius: 8px;
  .collapse-item {
    border-bottom: 1px solid #d9d9d9;
    &:first-child {
      border-radius: 8px 8px 0 0;
      .collapse-header-wrap {
        border-radius: 8px 8px 0 0;
      }
    }
    &:last-child {
      border-radius: 0 0 8px 8px;
      .collapse-header-wrap,
      .collapse-content-wrap {
        border-radius: 0 0 8px 8px;
      }
    }
    .collapse-header-wrap {
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
        :deep(.arrow-svg) {
          transition: transform 0.3s;
        }
        :deep(.arrow-rotate) {
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
    .collapse-content-wrap {
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
  .collapse-arrow-left {
    .collapse-header-wrap .collapse-arrow {
      padding-right: 12px;
    }
  }
  .collapse-arrow-right {
    .collapse-header-wrap .collapse-arrow {
      order: 1; // order 属性定义项目的排列顺序。数值越小，排列越靠前，默认为 0
      padding-left: 12px;
    }
  }
  .collapse-item-disabled {
    .collapse-header-wrap {
      color: rgba(0, 0, 0, 0.25);
      cursor: not-allowed;
    }
  }
}
.collapse-borderless {
  background-color: rgba(0, 0, 0, 0.02);
  border: 0;
  .collapse-item {
    &:last-child {
      border-bottom: 0;
      .collapse-header-wrap {
        border-radius: 0;
      }
    }
    .collapse-content-wrap {
      background-color: transparent;
      border-top: 0;
    }
  }
}
.collapse-ghost {
  background-color: transparent;
  border: 0;
  .collapse-item {
    border-bottom: 0;
    .collapse-content-wrap {
      background-color: transparent;
      border: 0;
    }
  }
}
</style>
