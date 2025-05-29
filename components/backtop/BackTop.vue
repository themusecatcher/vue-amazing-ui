<script setup lang="ts">
import { ref, computed, watch, onMounted, onBeforeUnmount } from 'vue'
import type { VNode, Slot } from 'vue'
import Tooltip from 'components/tooltip'
import { useSlotsExist, useMutationObserver, useInject, useOptionsSupported } from 'components/utils'
export interface Props {
  icon?: VNode | Slot // 自定义图标
  description?: string // 文字描述 string | slot
  tooltip?: string // 文字提示内容 string | slot
  tooltipProps?: object // Tooltip 组件属性配置，参考 Tooltip Props
  type?: 'default' | 'primary' // 设置按钮类型
  shape?: 'circle' | 'square' // 设置按钮形状
  bottom?: number | string // BackTop 距离页面底部的高度，单位 px
  right?: number | string // BackTop 距离页面右侧的宽度，单位 px
  zIndex?: number // 设置 BackTop 的 z-index
  visibilityHeight?: number // 滚动时触发显示回到顶部按钮的高度，单位 px
  to?: string | HTMLElement // BackTop 渲染的容器节点，可选：元素标签名 (例如 'body') 或者元素本身，下同
  listenTo?: string | HTMLElement // 监听滚动的元素，如果为 undefined 会监听距离最近的一个可滚动的祖先节点
}
const props = withDefaults(defineProps<Props>(), {
  icon: undefined,
  description: undefined,
  tooltip: undefined,
  tooltipProps: () => ({}),
  type: 'default',
  shape: 'circle',
  bottom: 40,
  right: 40,
  zIndex: 9,
  visibilityHeight: 180,
  to: 'body',
  listenTo: undefined
})
const backtopRef = ref<HTMLElement | null>(null) // backTop 元素引用
const scrollTop = ref<number>(0) // 滚动距离
const scrollTarget = ref<HTMLElement | null>(null) // 滚动目标元素
const targetElement = ref<HTMLElement | null>(null) // 渲染容器元素
const { colorPalettes } = useInject('BackTop') // 主题色注入
const { isSupported: passiveSupported } = useOptionsSupported('passive')
const emits = defineEmits(['click', 'show'])
const slotsExist = useSlotsExist(['tooltip', 'icon', 'description'])
const backTopStyle = computed(() => {
  return {
    bottom: typeof props.bottom === 'number' ? `${props.bottom}px` : props.bottom,
    right: typeof props.right === 'number' ? `${props.right}px` : props.right
  }
})
const backTopShow = computed(() => {
  return scrollTop.value >= props.visibilityHeight
})
const showTooltip = computed(() => {
  return slotsExist.tooltip || props.tooltip
})
const showDescription = computed(() => {
  return slotsExist.description || props.description
})
watch(
  () => props.to,
  () => {
    appendBackTop()
  },
  {
    flush: 'post'
  }
)
watch(
  () => props.listenTo,
  () => {
    observeScroll()
  },
  {
    flush: 'post'
  }
)
watch(backTopShow, (to) => {
  emits('show', to)
})
onMounted(() => {
  observeScroll()
})
onBeforeUnmount(() => {
  cleanup()
  backtopRef.value?.remove()
})
const mutationObserver = useMutationObserver(
  scrollTarget,
  () => {
    scrollTop.value = scrollTarget.value?.scrollTop ?? 0
  },
  { subtree: true, childList: true, attributes: true, characterData: true }
)
function updateScrollTop(e: Event): void {
  scrollTop.value = (e.target as HTMLElement).scrollTop
}
// 查询并监听滚动元素
function observeScroll(): void {
  cleanup()
  if (props.listenTo === undefined) {
    scrollTarget.value = getScrollParent(backtopRef.value)
  } else if (typeof props.listenTo === 'string') {
    scrollTarget.value = document.getElementsByTagName(props.listenTo)[0] as HTMLElement
  } else if (props.listenTo instanceof HTMLElement) {
    scrollTarget.value = props.listenTo
  }
  if (!scrollTarget.value) {
    console.warn('Container of back-top element is not found.')
  }
  scrollTarget.value && scrollTarget.value.addEventListener('scroll', updateScrollTop, passiveSupported.value ? { passive: true } : undefined)
  if (scrollTarget.value === document.documentElement) {
    mutationObserver.start()
  }
  appendBackTop()
}
function cleanup(): void {
  scrollTarget.value && scrollTarget.value.removeEventListener('scroll', updateScrollTop)
  scrollTarget.value = null
  mutationObserver.stop()
}
function appendBackTop(): void {
  // 渲染容器节点
  if (typeof props.to === 'string') {
    targetElement.value = document.getElementsByTagName(props.to)[0] as HTMLElement
  } else if (props.to instanceof HTMLElement) {
    targetElement.value = props.to
  }
  targetElement.value && targetElement.value?.appendChild(backtopRef.value!) // 保证 backtop 节点只存在一个
}
function getParentElement(el: HTMLElement): HTMLElement | null {
  // Document
  if (el === document.documentElement) return null
  return el.parentElement
}
function getScrollParent(el: HTMLElement | null): HTMLElement | null {
  if (el === null) return null
  const parentElement = getParentElement(el)
  if (parentElement === null) return null
  // Document
  if (parentElement === document.documentElement) return document.documentElement
  const isScrollable = (el: HTMLElement): boolean => {
    const { overflow, overflowX, overflowY } = getComputedStyle(el)
    return /(auto|scroll|overlay)/.test(overflow + overflowY + overflowX)
  }
  // Element
  if (isScrollable(parentElement)) return parentElement
  return getScrollParent(parentElement)
}
function onBackTop(): void {
  scrollTarget.value &&
    scrollTarget.value.scrollTo({
      top: 0,
      behavior: 'smooth' // 平滑滚动并产生过渡效果
    })
  emits('click')
}
</script>
<template>
  <Transition name="zoom">
    <div
      v-show="backTopShow"
      ref="backtopRef"
      class="m-backtop"
      :style="[
        backTopStyle,
        `
          --backtop-z-index: ${zIndex};
          --backtop-width: 44px;
          --backtop-height: 44px;
          --backtop-icon-size: 26px;
          --backtop-icon-with-desc-size: 24px;
          --backtop-desc-font-size: 12px;
          --backtop-default-color: rgba(0, 0, 0, 0.88);
          --backtop-default-color-hover: ${colorPalettes[5]};
          --backtop-default-bg-color: rgba(255, 255, 255, 0.88);
          --backtop-default-bg-color-hover: rgba(255, 255, 255);
          --backtop-default-shadow-color: rgba(0, 0, 0, 0.12);
          --backtop-default-shadow-color-hover: rgba(0, 0, 0, 0.12);
          --backtop-primary-color: #fff;
          --backtop-primary-color-hover: #fff;
          --backtop-primary-bg-color: ${colorPalettes[5]};
          --backtop-primary-bg-color-hover: ${colorPalettes[4]};
          --backtop-primary-shadow-color: rgba(9, 88, 217, 0.32);
          --backtop-primary-shadow-color-hover: rgba(9, 88, 217, 0.32);
          --backtop-circle-border-radius: calc(var(--backtop-width) / 2);
          --backtop-square-border-radius: 8px;
        `
      ]"
      @click="onBackTop"
    >
      <Tooltip
        :style="`border-radius: var(--${shape}-border-radius)`"
        :content-style="{ borderRadius: `var(--${shape}-border-radius)` }"
        v-bind="tooltipProps"
      >
        <template v-if="showTooltip" #tooltip>
          <slot name="tooltip">{{ tooltip }}</slot>
        </template>
        <div class="backtop-wrap" :class="`backtop-${type} backtop-${shape}`">
          <slot>
            <span class="backtop-icon" :class="{ 'icon-with-description': showDescription }">
              <slot name="icon">
                <component v-if="icon" :is="icon" />
                <svg
                  v-else
                  width="1em"
                  height="1em"
                  viewBox="0 0 24 24"
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                  xlinkHref="http://www.w3.org/1999/xlink"
                >
                  <g stroke="none" stroke-width="1" fill-rule="evenodd">
                    <g transform="translate(-139.000000, -4423.000000)" fill-rule="nonzero">
                      <g transform="translate(120.000000, 4285.000000)">
                        <g transform="translate(7.000000, 126.000000)">
                          <g
                            transform="translate(24.000000, 24.000000) scale(1, -1) translate(-24.000000, -24.000000) translate(12.000000, 12.000000)"
                          >
                            <g transform="translate(4.000000, 2.000000)">
                              <path
                                d="M8,0 C8.51283584,0 8.93550716,0.38604019 8.99327227,0.883378875 L9,1 L9,10.584 L12.2928932,7.29289322 C12.6834175,6.90236893 13.3165825,6.90236893 13.7071068,7.29289322 C14.0675907,7.65337718 14.0953203,8.22060824 13.7902954,8.61289944 L13.7071068,8.70710678 L8.70710678,13.7071068 L8.62544899,13.7803112 L8.618,13.784 L8.59530661,13.8036654 L8.4840621,13.8753288 L8.37133602,13.9287745 L8.22929083,13.9735893 L8.14346259,13.9897165 L8.03324678,13.9994506 L7.9137692,13.9962979 L7.77070917,13.9735893 L7.6583843,13.9401293 L7.57677845,13.9063266 L7.47929125,13.8540045 L7.4048407,13.8036865 L7.38131006,13.7856883 C7.35030318,13.7612383 7.32077858,13.7349921 7.29289322,13.7071068 L2.29289322,8.70710678 L2.20970461,8.61289944 C1.90467972,8.22060824 1.93240926,7.65337718 2.29289322,7.29289322 C2.65337718,6.93240926 3.22060824,6.90467972 3.61289944,7.20970461 L3.70710678,7.29289322 L7,10.585 L7,1 L7.00672773,0.883378875 C7.06449284,0.38604019 7.48716416,0 8,0 Z"
                              ></path>
                              <path
                                d="M14.9333333,15.9994506 C15.5224371,15.9994506 16,16.4471659 16,16.9994506 C16,17.5122865 15.5882238,17.9349578 15.0577292,17.9927229 L14.9333333,17.9994506 L1.06666667,17.9994506 C0.477562934,17.9994506 0,17.5517354 0,16.9994506 C0,16.4866148 0.411776203,16.0639435 0.9422708,16.0061783 L1.06666667,15.9994506 L14.9333333,15.9994506 Z"
                              ></path>
                            </g>
                          </g>
                        </g>
                      </g>
                    </g>
                  </g>
                </svg>
              </slot>
            </span>
            <span v-if="showDescription" class="backtop-description">
              <slot name="description">{{ description }}</slot>
            </span>
          </slot>
        </div>
      </Tooltip>
    </div>
  </Transition>
</template>
<style lang="less" scoped>
.zoom-enter-active,
.zoom-leave-active {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}
.zoom-enter-from,
.zoom-leave-to {
  opacity: 0;
  transform: scale(0.5);
}
.m-backtop {
  position: fixed;
  z-index: var(--backtop-z-index);
  .backtop-wrap {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: var(--backtop-height);
    min-width: var(--backtop-width);
    cursor: pointer;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    .backtop-icon {
      display: inline-flex;
      font-size: var(--backtop-icon-size);
      :deep(svg) {
        pointer-events: none;
        fill: currentColor;
        transition: color 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      }
    }
    .icon-with-description {
      font-size: var(--backtop-icon-with-desc-size);
    }
    .backtop-description {
      display: flex;
      align-items: center;
      font-size: var(--backtop-desc-font-size);
      font-weight: 500;
      line-height: 1.2;
      pointer-events: none;
      transition: color 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    }
  }
  .backtop-default {
    color: var(--backtop-default-color);
    background-color: var(--backtop-default-bg-color);
    box-shadow: 0 2px 8px 0 var(--backtop-default-shadow-color);
    .backtop-icon,
    .backtop-description {
      color: var(--backtop-default-color);
    }
    &:hover {
      color: var(--backtop-default-color-hover);
      background-color: var(--backtop-default-bg-color-hover);
      box-shadow: 0 2px 8px 3px var(--backtop-default-shadow-color-hover);
      .backtop-icon,
      .backtop-description {
        color: var(--backtop-default-color-hover);
      }
    }
  }
  .backtop-primary {
    color: var(--backtop-primary-color);
    background-color: var(--backtop-primary-bg-color);
    box-shadow: 0 2px 8px 0 var(--backtop-primary-shadow-color);
    .backtop-icon,
    .backtop-description {
      color: var(--backtop-primary-color);
    }
    &:hover {
      color: var(--backtop-primary-color-hover);
      background-color: var(--backtop-primary-bg-color-hover);
      box-shadow: 0 2px 8px 3px var(--backtop-primary-shadow-color-hover);
      .backtop-icon,
      .backtop-description {
        color: var(--backtop-primary-color-hover);
      }
    }
  }
  .backtop-circle {
    border-radius: var(--backtop-circle-border-radius);
  }
  .backtop-square {
    border-radius: var(--backtop-square-border-radius);
  }
}
</style>
