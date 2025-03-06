<script setup lang="ts">
import { ref, nextTick } from 'vue'
import type { CSSProperties } from 'vue'
export interface Props {
  containerClass?: string // 加载条容器的类名
  containerStyle?: CSSProperties // 加载条容器的样式
  loadingBarSize?: number // 加载条大小，单位 px
  colorLoading?: string // 加载中颜色
  colorFinish?: string // 加载完成颜色
  colorError?: string // 加载错误颜色
  to?: string | HTMLElement // 加载条的挂载位置，可选：元素标签名（例如 body）或者元素本身
}
withDefaults(defineProps<Props>(), {
  containerClass: undefined,
  containerStyle: () => ({}),
  loadingBarSize: 2,
  colorLoading: '#1677ff',
  colorFinish: '#1677ff',
  colorError: '#ff4d4f',
  to: 'body'
})
const showLoadingBar = ref<boolean>(false) // 加载条是否显示
const loadingBarRef = ref() // 加载条元素引用
const loadingStarted = ref<boolean>(false) // 加载条是否开始
const loadingFinishing = ref<boolean>(false) // 加载条是否完成
const loadingErroring = ref<boolean>(false) // 加载条是否报错
function init(): void {
  showLoadingBar.value = false
  loadingFinishing.value = false
  loadingErroring.value = false
}
// 加载条开始加载的回调函数
async function start(from = 0, to = 80, status: 'starting' | 'error' = 'starting'): Promise<void> {
  loadingStarted.value = true
  init()
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
function onAfterLeave(): void {
  init()
}
defineExpose({
  start,
  finish,
  error
})
</script>
<template>
  <Teleport :disabled="!to" :to="to">
    <Transition name="fade-in" @after-enter="onAfterEnter" @after-leave="onAfterLeave">
      <div
        v-show="showLoadingBar"
        class="m-loading-bar-container"
        :class="containerClass"
        :style="[
          `--loading-bar-size: ${loadingBarSize}px; --loading-bar-color-loading: ${colorLoading}; --loading-bar-color-finish: ${colorFinish}; --loading-bar-color-error: ${colorError};`,
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
.m-loading-bar-container {
  z-index: 9999;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
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
