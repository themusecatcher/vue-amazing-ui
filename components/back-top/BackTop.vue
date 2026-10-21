<script setup lang="ts">
import { ref, computed, watch, onMounted, onBeforeUnmount, inject } from 'vue'
import type { CSSProperties, VNode } from 'vue'
import { THEME_TELEPORT_KEY } from 'components/config-provider/context'
import Tooltip, { type TooltipProps } from 'components/tooltip'
import { useSlotsExist, useOptionsSupported, getScrollParent, log } from 'components/utils'

export interface Props {
  icon?: VNode | (() => VNode) // 自定义图标，支持 VNode / 渲染函数；插槽形态请用 #icon
  description?: string // 文字描述
  tooltip?: string // 文字提示内容
  tooltipProps?: TooltipProps // Tooltip 组件属性配置，参考 Tooltip Props
  type?: 'default' | 'primary' // 设置按钮类型
  shape?: 'circle' | 'square' // 设置按钮形状
  bottom?: number | string // BackTop 距离页面底部的高度，单位 px
  right?: number | string // BackTop 距离页面右侧的宽度，单位 px
  zIndex?: number // 设置 BackTop 的 z-index
  visibilityHeight?: number // 滚动时触发显示回到顶部按钮的高度，单位 px
  to?: string | HTMLElement // BackTop 渲染的容器节点，可选：CSS 选择器（例如 'body'）或者元素本身
  listenTo?: string | HTMLElement | Document | (() => HTMLElement | Document) // 监听滚动的元素，如果为 undefined 会监听距离最近的一个可滚动的祖先节点；支持 CSS 选择器、元素、Document 或返回目标的函数
}
// 声明组件插槽类型
export interface BackTopSlots {
  tooltip?: () => VNode[]
  default?: () => VNode[]
  icon?: () => VNode[]
  description?: () => VNode[]
}

// 主题转发：回到顶部按钮 Teleport 到 body，作用域变量写在包裹元素上时由 Provider 下发过来
const teleportTheme = inject(THEME_TELEPORT_KEY, null)
const teleportThemeVars = computed<CSSProperties>(() => (teleportTheme?.value?.vars as CSSProperties) ?? {})
const teleportThemeMode = computed(() => teleportTheme?.value?.mode)
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
defineSlots<BackTopSlots>()
const initialDisplay = ref<boolean>(false) // 性能优化，使用 v-if 避免初始时不必要的渲染，展示之后使用 v-show 来控制显示隐藏
const backTopPlaceholderRef = ref<HTMLElement | null>(null) // backTop 元素引用
const scrollTop = ref<number>(0) // 滚动距离
const scrollTarget = ref<HTMLElement | Document | null>(null) // 滚动目标
const { isSupported: passiveSupported } = useOptionsSupported('passive')
let scrollEventTarget: Window | HTMLElement | Document | null = null // 实际承载 scroll 事件的目标，整页滚动时为 window
const emits = defineEmits(['click', 'show'])
const slotsExist = useSlotsExist(['tooltip', 'description'])
// 页面滚动锁：右对齐偏移叠加被回收的滚动条宽度（属性单位约定为 px），锁定期间位置与锁定前一致；
// 未锁定时变量缺失，`var()` 回退为 0px，取值与原先完全相同
const lockScrollOffset = 'var(--va-scrollbar-width, 0px)'
const backTopStyle = computed(() => {
  const right = typeof props.right === 'number' ? `${props.right}px` : props.right
  return {
    bottom: typeof props.bottom === 'number' ? `${props.bottom}px` : props.bottom,
    right: `calc(${right} + ${lockScrollOffset})`
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
  backTopShow,
  (to) => {
    if (to && !initialDisplay.value) {
      initialDisplay.value = true
    }
  },
  {
    immediate: true
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
})
// 解析 listenTo 指定的滚动目标：CSS 选择器、元素、Document 或返回目标的函数
function resolveListenTarget(): HTMLElement | Document | null {
  const { listenTo } = props
  if (typeof listenTo === 'function') {
    return listenTo() ?? null
  }
  if (typeof listenTo === 'string') {
    // 按 CSS 选择器解析：标签名（如 'body'）本身也是合法选择器，历史写法不受影响；
    // 非法选择器会让 querySelector 抛出 SyntaxError，此处按「找不到目标」处理，交由下方统一告警
    try {
      return document.querySelector<HTMLElement>(listenTo)
    } catch {
      // 非法选择器：不中断组件，按未找到目标处理
      return null
    }
  }
  if (listenTo instanceof Document || listenTo instanceof HTMLElement) {
    return listenTo
  }
  return null
}
// 查询并监听滚动元素
function observeScroll(): void {
  cleanup()
  if (props.listenTo === undefined) {
    scrollTarget.value = getScrollParent(backTopPlaceholderRef.value)
  } else {
    scrollTarget.value = resolveListenTarget()
  }
  if (!scrollTarget.value) {
    log('warn', 'BackTop', '未找到容器元素，滚动监听未启用')
  }
  scrollEventTarget = getScrollEventTarget()
  scrollEventTarget?.addEventListener('scroll', updateScrollTop, passiveSupported.value ? { passive: true } : undefined)
  updateScrollTop()
}
// scroll 事件的实际监听目标：整页滚动时只派发到 window，documentElement 收不到，需改听 window
function getScrollEventTarget(): Window | HTMLElement | Document | null {
  const target = scrollTarget.value
  if (!target) return null
  return target === document.documentElement ? window : target
}
// 读取滚动距离与执行 scrollTo 的元素：Document 自身没有这两个能力，需回退到 documentElement
function getScrollElement(): HTMLElement | null {
  const target = scrollTarget.value
  if (!target) return null
  return target instanceof Document ? target.documentElement : target
}
// 从滚动元素读取滚动距离
function updateScrollTop(): void {
  scrollTop.value = getScrollElement()?.scrollTop ?? 0
}
// 清理 scroll 监听与目标引用
function cleanup(): void {
  scrollEventTarget?.removeEventListener('scroll', updateScrollTop)
  scrollEventTarget = null
  scrollTarget.value = null
}
function onBackTop(): void {
  const element = getScrollElement()
  if (element) {
    element.scrollTo({
      top: 0,
      behavior: 'smooth' // 平滑滚动并产生过渡效果
    })
  }
  emits('click')
}
</script>
<template>
  <div ref="backTopPlaceholderRef" class="back-top-placeholder" style="display: none">
    <Teleport :to="to">
      <Transition name="zoom">
        <div
          v-if="initialDisplay"
          v-show="backTopShow"
          class="back-top"
          :style="[
            teleportThemeVars,
            backTopStyle,
            `
              --back-top-z-index: ${zIndex};
              --back-top-width: 44px;
              --back-top-height: 44px;
              --back-top-icon-size: 26px;
              --back-top-icon-with-description-size: 24px;
              --back-top-description-font-size: 12px;
              --back-top-circle-border-radius: calc(var(--back-top-width) / 2);
              --back-top-square-border-radius: 8px;
            `
          ]"
          @click="onBackTop"
          v-bind="$attrs"
          :data-va-mode="teleportThemeMode"
        >
          <Tooltip
            :style="`border-radius: var(--back-top-${shape}-border-radius)`"
            :content-style="{ borderRadius: `var(--back-top-${shape}-border-radius)` }"
            v-bind="tooltipProps"
          >
            <template v-if="showTooltip" #tooltip>
              <slot name="tooltip">{{ tooltip }}</slot>
            </template>
            <div class="back-top-wrap" :class="`back-top-${type} back-top-${shape}`">
              <slot>
                <span class="back-top-icon" :class="{ 'icon-with-description': showDescription }">
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
                <span v-if="showDescription" class="back-top-description">
                  <slot name="description">{{ description }}</slot>
                </span>
              </slot>
            </div>
          </Tooltip>
        </div>
      </Transition>
    </Teleport>
  </div>
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
.back-top {
  position: fixed;
  z-index: var(--back-top-z-index);
  .back-top-wrap {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: var(--back-top-height);
    min-width: var(--back-top-width);
    cursor: pointer;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    .back-top-icon {
      display: inline-flex;
      font-size: var(--back-top-icon-size);
      :deep(svg) {
        pointer-events: none;
        fill: currentColor;
        transition: color 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      }
    }
    .icon-with-description {
      font-size: var(--back-top-icon-with-description-size);
    }
    .back-top-description {
      display: flex;
      align-items: center;
      font-size: var(--back-top-description-font-size);
      font-weight: 500;
      line-height: 1.2;
      pointer-events: none;
      transition: color 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    }
  }
  .back-top-default {
    color: var(--va-text-color-1);
    background-color: var(--va-bg-container-color);
    box-shadow: var(--va-popup-shadow);
    .back-top-icon,
    .back-top-description {
      color: var(--va-text-color-1);
    }
    &:hover {
      color: var(--va-cp-back-top-primary-color, var(--va-primary-color));
      background-color: var(--va-bg-container-color);
      box-shadow: var(--va-popup-shadow);
      .back-top-icon,
      .back-top-description {
        color: var(--va-cp-back-top-primary-color, var(--va-primary-color));
      }
    }
  }
  .back-top-primary {
    color: var(--va-text-color-solid);
    background-color: var(--va-cp-back-top-primary-color, var(--va-primary-color));
    box-shadow: var(--va-popup-shadow);
    .back-top-icon,
    .back-top-description {
      color: var(--va-text-color-solid);
    }
    &:hover {
      color: var(--va-text-color-solid);
      background-color: var(--va-cp-back-top-primary-color-hover, var(--va-primary-color-hover));
      box-shadow: var(--va-popup-shadow);
      .back-top-icon,
      .back-top-description {
        color: var(--va-text-color-solid);
      }
    }
  }
  .back-top-circle {
    border-radius: var(--back-top-circle-border-radius);
  }
  .back-top-square {
    border-radius: var(--back-top-square-border-radius);
  }
}
</style>
