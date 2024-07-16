# 快速上手<BackTop />

## 简要介绍

开箱即用！

## 使用方式

```vue
<script setup lang="ts">
import {
  dateFormat,
  formatNumber,
  rafTimeout,
  cancelRaf,
  throttle,
  debounce,
  add,
  downloadFile,
  toggleDark,
  useEventListener,
  useMutationObserver,
  useScrollDirection,
  useFps
} from 'vue-amazing-ui'
</script>
```

## 常用工具函数

Function name | Descriptions | Arguments
--- | :--- | :---
dateFormat | 格式化日期时间字符串函数 | (timestamp: number &#124; string &#124; Date, format = 'YYYY-MM-DD HH:mm:ss') => string
formatNumber | 数字格式化函数 | (value: number &#124; string, decimal = 2, split = ',') => string
rafTimeout | 使用 `requestAnimationFrame` 实现的延迟 `setTimeout` 或间隔 `setInterval` 调用函数 | (fn: Function, delay = 0, interval = false) => object
cancelRaf | 用于取消 `rafTimeout` 函数 | (raf: { id: number }) => void
throttle | 节流函数 | (fn: Function, delay = 300) => any
debounce | 防抖函数 | (fn: Function, delay = 300) => any
add | 消除js加减精度问题的加法函数 | (num1: number, num2: number) => number
downloadFile | 下载文件并自定义文件名，未传 `name` 时，从文件地址中自动提取文件名称 | (url: string, name: string) => void
toggleDark | 一键切换暗黑模式函数 | () => void
useEventListener | 使用Vue的生命周期钩子添加和移除事件监听器 | (target: HTMLElement &#124; Window, event: string, callback: Function) => void
useMutationObserver | 使用 `MutationObserver` 观察 `DOM` 元素的变化 | (target: Ref &#124; Ref[] &#124; HTMLElement &#124; HTMLElement[], callback: MutationCallback, options = {}) => void
useScrollDirection | 实时监测页面滚动方向 | (throttleDelay: 100) => object
useFps | 实时监测浏览器刷新率FPS | () => object
