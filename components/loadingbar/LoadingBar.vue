<script setup lang="ts">
import { ref, computed, watch, nextTick } from 'vue'
import type { CSSProperties } from 'vue'
import { useInject } from 'components/utils'
export interface Props {
  containerClass?: string // 加载条容器的类名
  containerStyle?: CSSProperties // 加载条容器的样式
  loadingBarSize?: number // 加载条大小，单位 px
  colorLoading?: string // 加载中颜色
  colorFinish?: string // 加载完成颜色
  colorError?: string // 加载错误颜色
  to?: string | HTMLElement | false // 加载条的挂载位置，可选：元素标签名（例如 body）或者元素本身，false 会待在原地
}
const props = withDefaults(defineProps<Props>(), {
  containerClass: undefined,
  containerStyle: () => ({}),
  loadingBarSize: 2,
  colorLoading: undefined,
  colorFinish: undefined,
  colorError: '#ff4d4f',
  to: 'body'
})
const initialDisplay = ref<boolean>(false) // 性能优化，使用 v-if 避免初始时不必要的渲染，展示之后使用 v-show 来控制显示隐藏
const showLoadingBar = ref<boolean>(false) // 加载条是否显示
const loadingBarRef = ref() // 加载条元素引用
const transitionDisabled = ref(false) // 是否禁用过渡，表示使用仅由 JavaScript 执行的动画
const loadingStarted = ref<boolean>(false) // 加载条是否开始
const loadingFinishing = ref<boolean>(false) // 加载条是否完成
const loadingErroring = ref<boolean>(false) // 加载条是否报错
const { colorPalettes } = useInject('LoadingBar') // 主题色注入
const colorLoadingComputed = computed(() => {
  if (props.colorLoading === undefined) {
    return colorPalettes.value[5]
  } else {
    return props.colorLoading
  }
})
const colorFinishComputed = computed(() => {
  if (props.colorFinish === undefined) {
    return colorPalettes.value[5]
  } else {
    return props.colorFinish
  }
})
watch(
  showLoadingBar,
  (to) => {
    if (to && !initialDisplay.value) {
      initialDisplay.value = true
    }
  },
  {
    immediate: true
  }
)
async function init(): Promise<void> {
  showLoadingBar.value = false
  loadingFinishing.value = false
  loadingErroring.value = false
  transitionDisabled.value = true
  await nextTick()
  transitionDisabled.value = false
}
// 加载条开始加载的回调函数
async function start(from = 0, to = 80, status: 'starting' | 'error' = 'starting'): Promise<void> {
  loadingStarted.value = true
  await init()
  if (loadingFinishing.value) {
    return
  }
  showLoadingBar.value = true
  await nextTick()
  if (!loadingBarRef.value) {
    return
  }
  loadingBarRef.value.style.transition = 'none' // 禁用过渡
  loadingBarRef.value.style.maxWidth = `${from}%`
  void loadingBarRef.value.offsetWidth // 触发浏览器回流(重排)
  loadingBarRef.value.className = `loading-bar loading-bar-${status}`
  loadingBarRef.value.style.transition = ''
  loadingBarRef.value.style.maxWidth = `${to}%`
}
// 加载条结束加载的回调函数
async function finish(): Promise<void> {
  if (loadingFinishing.value || loadingErroring.value) {
    return
  }
  if (loadingStarted.value) {
    await nextTick()
  }
  loadingFinishing.value = true
  if (!loadingBarRef.value) {
    return
  }
  loadingBarRef.value.className = 'loading-bar loading-bar-finishing'
  loadingBarRef.value.style.maxWidth = '100%'
  void loadingBarRef.value.offsetWidth // 触发浏览器回流(重排)
  showLoadingBar.value = false
}
// 加载条出现错误的回调函数
function error(): void {
  if (loadingFinishing.value || loadingErroring.value) {
    return
  }
  if (!showLoadingBar.value) {
    void start(100, 100, 'error').then(() => {
      loadingErroring.value = true
    })
  } else {
    loadingErroring.value = true
    if (!loadingBarRef.value) {
      return
    }
    loadingBarRef.value.className = 'loading-bar loading-bar-error'
    loadingBarRef.value.style.maxWidth = '100%'
    void loadingBarRef.value.offsetWidth
    showLoadingBar.value = false
  }
}
function onAfterEnter(): void {
  if (loadingErroring.value) {
    showLoadingBar.value = false
  }
}
async function onAfterLeave(): Promise<void> {
  await init()
}
defineExpose({
  start,
  finish,
  error
})
</script>
<template>
  <Teleport :disabled="to === false" :to="to === false ? null : to">
    <Transition
      name="fade-in"
      appear
      @after-enter="onAfterEnter"
      @after-leave="onAfterLeave"
      :css="!transitionDisabled"
    >
      <div
        v-if="initialDisplay"
        v-show="showLoadingBar"
        class="loading-bar-container"
        :class="containerClass"
        :style="[
          `
            --loading-bar-size: ${loadingBarSize}px;
            --loading-bar-color-loading: ${colorLoadingComputed};
            --loading-bar-color-finish: ${colorFinishComputed};
            --loading-bar-color-error: ${colorError};
          `,
          containerStyle
        ]"
      >
        <div ref="loadingBarRef" class="loading-bar" style="max-width: 100%"></div>
      </div>
    </Transition>
  </Teleport>
</template>
<style lang="less" scoped>
.fade-in-enter-active {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}
.fade-in-leave-active {
  transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
}
.fade-in-enter-from,
.fade-in-leave-to {
  opacity: 0;
}
.loading-bar-container {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 9999;
  height: var(--loading-bar-size);
  .loading-bar {
    width: 100%;
    transition:
      max-width 4s linear,
      background 0.2s linear;
    height: var(--loading-bar-size);
    border-radius: var(--loading-bar-size);
  }
  .loading-bar-starting {
    background: var(--loading-bar-color-loading);
  }
  .loading-bar-finishing {
    background: var(--loading-bar-color-finish);
    transition:
      max-width 0.2s linear,
      background 0.2s linear;
  }
  .loading-bar-error {
    background: var(--loading-bar-color-error);
    transition:
      max-width 0.2s linear,
      background 0.2s linear;
  }
}
</style>
