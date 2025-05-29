# 快速上手

<GlobalElement />

## 介绍

功能丰富，简单易用！

## 使用

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
  useScroll,
  useFps,
  useMediaQuery,
  useResizeObserver,
  useSlotsExist,
  useInject,
  useOptionsSupported
} from 'vue-amazing-ui'
</script>
```

## 说明

Name | Description | Type
:--- | :--- | :---
dateFormat | 格式化日期时间字符串函数 | (value: number &#124; string &#124; Date = Date.now(), format: string = 'YYYY-MM-DD HH:mm:ss') => string
formatNumber | 数字格式化函数 | (value: number &#124; string, precision: number = 2, separator: string = ',', decimal: string = '.', prefix?: string, suffix?: string) => string
rafTimeout | 使用 `requestAnimationFrame` 实现的延迟 `setTimeout` 或间隔 `setInterval` 调用函数 | (fn: Function, delay: number = 0, interval: boolean = false) => \{ id: number }
cancelRaf | 用于取消 `rafTimeout` 函数 | (raf: { id: number }) => void
throttle | 节流函数 | (fn: Function, delay: number = 300) => Function
debounce | 防抖函数 | (fn: Function, delay: number = 300) => Function
add | 消除 `js` 加减精度问题的加法函数 | (num1: number, num2: number) => number
downloadFile | 下载文件并自定义文件名，未传 `fileName` 时，从文件地址中自动提取文件名称 | (url: string, fileName?: string) => void
toggleDark | 一键切换暗黑模式函数 | () => void
useEventListener | 使用 `Vue` 的生命周期钩子添加和移除事件监听器 | (target: HTMLElement &#124; Window &#124; Document, event: string, callback: Function) => void
useMutationObserver | 使用 `MutationObserver` 观察 `DOM` 元素的变化 | (target: Ref &#124; Ref[] &#124; HTMLElement &#124; HTMLElement[], callback: MutationCallback, options = {}) => { start: \() => void; stop: \() => void }
useScroll | 实时监测目标元素滚动位置及状态 | (target: Ref &#124; HTMLElement &#124; Window &#124; Document = window, throttleDelay: number = 0, onScroll?: (e: Event) => void, onStop?: (e: Event) => void) => { x: Ref\<number>; xScrollMax: Ref\<number>; y: Ref\<number>; yScrollMax: Ref\<number>; isScrolling: Ref\<boolean>; left: Ref\<boolean>; right: Ref\<boolean>; top: Ref\<boolean>; bottom: Ref\<boolean> }
useFps | 实时监测浏览器刷新率FPS | () => { fps: Ref\<number> }
useMediaQuery | 使用媒体查询来判断当前环境是否符合指定的媒体查询条件 | (mediaQuery: string) => { match: Ref\<boolean> }
useResizeObserver | 使用 `ResizeObserver` 观察 `DOM` 元素尺寸变化 | (target: Ref &#124; Ref[] &#124; HTMLElement &#124; HTMLElement[], callback: ResizeObserverCallback, options = {}) => { start: \() => void; stop: \() => void }
useSlotsExist | 监听给定名称或名称数组的插槽是否存在，支持监听单个插槽或一组插槽的存在 | <T extends string &#124; string[] = 'default'>(slotsName: T) => T extends string ? ComputedRef\<boolean> : Reactive\<Record\<string, ComputedRef\<boolean>>>
useInject | 使用依赖注入的函数，用于获取颜色调色板和阴影颜色 | (key: string) => { colorPalettes: Ref\<string[]>; shadowColor: Ref\<string> }
useOptionsSupported | 检查浏览器是否支持给定的事件监听器选项 | (prop: 'capture' &#124; 'once' &#124; 'passive' &#124; 'signal') => { isSupported: Ref\<boolean> }
