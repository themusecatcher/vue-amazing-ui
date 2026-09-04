# 快速上手

<GlobalElement />

## 介绍

`vue-amazing-ui` 内置 `24` 个可独立使用的工具函数，覆盖日期数字格式化、节流防抖、文件下载、暗黑主题、`DOM` 观察与滚动定位等场景。全部按需具名导出、`tree shaking` 友好，功能丰富，简单易用！

### 分类索引

- **格式化与精度**：`dateFormat` · `formatNumber` · `add`
- **定时与交互**：`throttle` · `debounce` · `rafTimeout` · `cancelRaf`
- **文件与主题**：`downloadFile` · `toggleDark`
- **DOM 与能力**：`useEventListener` · `useMutationObserver` · `useResizeObserver` · `useMediaQuery` · `useFps` · `useSlotsExist` · `useInject` · `useOptionsSupported`
- **滚动与定位**：`useScroll` · `useScrollParent` · `lockScroll` · `getScrollParent` · `useFloatingPosition`
- **色板与阴影**：`getColorPalettes` · `getAlphaColor`

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
  useOptionsSupported,
  getColorPalettes,
  getAlphaColor,
  getScrollParent,
  lockScroll,
  useScrollParent,
  useFloatingPosition
} from 'vue-amazing-ui'
</script>
```

## 说明

| Name | Description | Type |
| :-- | :-- | :-- |
| dateFormat | 格式化日期时间字符串函数 | (value: number &#124; string &#124; Date = Date.now(), format: string = 'YYYY-MM-DD HH:mm:ss') => string |
| formatNumber | 数字格式化函数 | (value: number &#124; string, precision: number = 2, separator: string = ',', decimal: string = '.', prefix?: string, suffix?: string) => string |
| rafTimeout | 使用 `requestAnimationFrame` 实现的延迟 `setTimeout` 或间隔 `setInterval` 调用函数 | (fn: Function, delay: number = 0, interval: boolean = false) => \{ id: number } |
| cancelRaf | 用于取消 `rafTimeout` 函数 | (raf: { id: number }) => void |
| throttle | 节流函数 | (fn: Function, delay: number = 300) => Function |
| debounce | 防抖函数 | (fn: Function, delay: number = 300) => Function |
| add | 消除 `js` 加减精度问题的加法函数 | (num1: number, num2: number) => number |
| downloadFile | 下载文件并自定义文件名，内置同源 `anchor` 与跨域 `iframe` 双下载策略，未传 `fileName` 时，从文件地址中自动提取文件名称 | (url: string, fileName?: string, options?: { target?: '_self' &#124; '_blank'; strategy?: 'auto' &#124; 'anchor' &#124; 'iframe' }) => Promise&lt;void&gt; |
| toggleDark | 一键切换暗黑模式函数 | () => void |
| useEventListener | 使用 `Vue` 的生命周期钩子添加和移除事件监听器 | (target: HTMLElement &#124; Window &#124; Document, event: string, callback: Function) => void |
| useMutationObserver | 使用 `MutationObserver` 观察 `DOM` 元素的变化 | (target: Ref &#124; Ref[] &#124; HTMLElement &#124; HTMLElement[], callback: MutationCallback, options: object = {}) => { start: \() => void, stop: \() => void } |
| useScroll | 实时监测目标元素滚动位置及状态 | (target: Ref &#124; HTMLElement &#124; Window &#124; Document = window, throttleDelay: number = 0, onScroll?: (e: Event) => void, onStop?: (e: Event) => void) => { x: Ref\<number>, xScrollMax: Ref\<number>, y: Ref\<number>, yScrollMax: Ref\<number>, isScrolling: Ref\<boolean>, left: Ref\<boolean>, right: Ref\<boolean>, top: Ref\<boolean>, bottom: Ref\<boolean> } |
| useFps | 实时监测浏览器刷新率FPS | () => { fps: Ref\<number> } |
| useMediaQuery | 使用媒体查询来判断当前环境是否符合指定的媒体查询条件 | (mediaQuery: string) => { match: Ref\<boolean> } |
| useResizeObserver | 使用 `ResizeObserver` 观察 `DOM` 元素尺寸变化 | (target: Ref &#124; Ref[] &#124; HTMLElement &#124; HTMLElement[], callback: ResizeObserverCallback, options: object = {}) => { start: \() => void, stop: \() => void } |
| useSlotsExist | 监听给定名称或名称数组的插槽是否存在，支持监听单个插槽或一组插槽的存在 | <T extends string &#124; string[] = 'default'>(slotsName: T) => T extends string ? ComputedRef\<boolean> : Reactive\<Record\<string, ComputedRef\<boolean>>> |
| useInject | 使用依赖注入的函数，用于获取颜色调色板和阴影颜色 | (key: string) => { colorPalettes: Ref\<string[]>, shadowColor: Ref\<string> } |
| useOptionsSupported | 检查浏览器是否支持给定的事件监听器选项 | (prop: 'capture' &#124; 'once' &#124; 'passive' &#124; 'signal') => { isSupported: Ref\<boolean> } |
| getColorPalettes | 根据主色生成颜色调色板函数 | (primaryColor: string) => string[] |
| getAlphaColor | 获取透明度颜色函数，一般用作阴影色 | (frontColor: string, backgroundColor: string = '#ffffff') => string |
| getScrollParent | 向上查找元素最近的可滚动父元素函数 | (el: HTMLElement &#124; null) => HTMLElement &#124; null |
| lockScroll | 锁定页面滚动并补偿滚动条宽度，防止页面横向抖动函数 | () => () => void |
| useScrollParent | 查询并监听最近可滚动父元素，响应视口 `resize` 的组合式函数 | (contentRef: Ref\<HTMLElement &#124; null>, onScroll: () => void, options: object = {}) => { scrollTarget: Ref\<HTMLElement &#124; null>, viewportWidth: Ref\<number>, viewportHeight: Ref\<number>, observeScroll: \() => void, cleanup: \() => void } |
| useFloatingPosition | 为弹出类组件提供统一测量骨架的组合式函数 | (contentRef: Ref\<HTMLElement &#124; null>, panelRef: Ref\<HTMLElement &#124; null>) => { positionedContainerRect: Ref\<DOMRect &#124; undefined>, contentRect: Ref\<DOMRect &#124; undefined>, measure: \() => Promise\<void> } |
