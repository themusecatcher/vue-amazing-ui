<p align="center">
  <a href="https://themusecatcher.github.io/vue-amazing-ui/">
    <img width="200" src="https://themusecatcher.github.io/vue-amazing-ui/amazing-logo.svg">
  </a>
</p>

<h1 align="center">Vue Amazing UI</h1>
<p align="center">A Vue 3 Component Library</p>
<p align="center">Theme Customizable, Fully using TypeScript and SFC, Supports tree shaking.</p>
<p align="center">Kinda Interesting</p>
<p align="center">English | <a href="README.zh-CN.md">中文</a></p>

## Documentation

[Vue Amazing UI](https://themusecatcher.github.io/vue-amazing-ui/)

## Features

- The component library is implemented with `Vue@3.5.29`+ `TypeScript@5.9.3` + `Vite@7.3.1` + `Less@4.5.1`.
- Currently, it includes `67` basic UI components and `18` utility functions, with continuous exploration and updates ongoing...
- Theme Customizable, all you need is to provide a theme color, then all the stuffs will be done by me.
- By the way, they are all treeshakable.
- All the stuff in Vue Amazing UI is written in TypeScript. It can work with your typescript project seamlessly.
- All components are built in single file component `SFC` and can be used independently.
- Ready to use out of the box, no fuss.

## Installation

```sh
pnpm add vue-amazing-ui
# or
npm install vue-amazing-ui
# or
yarn add vue-amazing-ui
# or
bun add vue-amazing-ui
```

## Use Components

**Global Registration All Components (Not Recommended)**

_No tree-shaking. Bundle will have redundant codes._

```ts
import { createApp } from 'vue'
import App from './App.vue'
import VueAmazingUI from 'vue-amazing-ui'
import 'vue-amazing-ui/css'

const app = createApp(App)
app.use(VueAmazingUI)
app.mount('#app')
```

**Global Partial Registration**

_In this form, only the imported components will be bundled._

```ts
import { createApp } from 'vue'
import App from './App.vue'
import { Button, Tag } from 'vue-amazing-ui'
import 'vue-amazing-ui/es/button/Button.css'
import 'vue-amazing-ui/es/tag/Tag.css'

const app = createApp(App)
app.use(Button).use(Tag)
app.mount('#app')
```

**Local Registration**

_In this form, only the imported components will be bundled as well._

```vue
<script setup lang="ts">
import { Button, Tag } from 'vue-amazing-ui'
import 'vue-amazing-ui/es/button/Button.css'
import 'vue-amazing-ui/es/tag/Tag.css'
</script>
<template>
  <Button>button</Button>
  <Tag>tag</Tag>
</template>
```

**Both Global Partial Registration and Local Registration require manually importing the global default styles of the component library ([Automatic On-Demand Import](https://themusecatcher.github.io/vue-amazing-ui/guide/ondemand.html#%E8%87%AA%E5%8A%A8%E6%8C%89%E9%9C%80%E5%BC%95%E5%85%A5-%E5%BC%BA%E7%83%88%E6%8E%A8%E8%8D%90) is recommended).**

```ts
import { createApp } from 'vue'
import App from './App.vue'
import 'vue-amazing-ui/es/style/global.css' // 引入全局默认样式

const app = createApp(App)
app.mount('#app')
```

**Automatic On-Demand Import (Strongly Recommended)**

Use the [`unplugin-vue-components`](https://github.com/unplugin/unplugin-vue-components) plugin to automatically import components on demand. The plugin will automatically parse the components used in the template and import the components and styles.

```sh
pnpm add unplugin-vue-components -D
# or
npm install unplugin-vue-components -D
# or
yarn add unplugin-vue-components -D
# or
bun add unplugin-vue-components -D
```

```ts
// vite.config.ts
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import Components from 'unplugin-vue-components/vite'
// vue-amazing-ui on-demand import
import { VueAmazingUIResolver } from 'vue-amazing-ui'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    Components({
      resolvers: [
        // auto import components from VueAmazingUI
        VueAmazingUIResolver({
          cjs: false // whether use commonjs build, default false
        })
      ]
    })
  ]
})
```

Then, you can directly use all components from `vue-amazing-ui` in your code.

```vue
<template>
  <Button>button</Button>
  <Tag>tag</Tag>
</template>
```

## Use Types

_All types can be directly imported and used from `vue-amazing-ui` without any additional installation._

```vue
<script setup lang="ts">
import { ref } from 'vue'
import type { ButtonProps } from 'vue-amazing-ui'
const shape = ref<ButtonProps['shape']>('default')
</script>
<template>
  <Button :shape="shape">button</Button>
</template>
```

## Use Functions

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

## Project

- Get the project code

```sh
git clone https://github.com/themusecatcher/vue-amazing-ui.git
```

- Install dependencies

```sh
cd vue-amazing-ui

pnpm i
```

- Run project

```sh
pnpm dev
```

- Run docs

```sh
pnpm docs:dev
```

## Blogs

[My CSDN Blogs](https://themusecatcher.blog.csdn.net)

## Sponsorship

`Vue Amazing UI` is an open-source project licensed under the `MIT` license, and it is completely free to use. All work on the component library and documentation is completed by the author alone, and the development and iteration process has been challenging. For the healthy and sustainable development of the component library, your support and sponsorship are greatly appreciated.

#### [Become a Sponsor](https://themusecatcher.github.io/vue-amazing-ui/sponsor/charge.html)

## Sponsors 🫡

All sponsors will be listed here, thank you very much for your support and sponsorship ❤️

<a href="https://github.com/themusecatcher" target="_blank"><img width="64" height="64" src="./docs/public/avatar.png" alt="GitHub@themusecatcher" title="GitHub@themusecatcher"></a> <img width="64" height="64" src="./docs/public/avatar_1.jpeg" alt="WeChat@Ant" title="WeChat@Ant" /> <a href="https://github.com/nizhensh-i" target="_blank"><img width="64" height="64" src="./docs/public/avatar_2.jpg" alt="GitHub@nizhensh-i" title="GitHub@nizhensh-i"></a> <a href="https://github.com/beijin1949" target="_blank"><img width="64" height="64" src="./docs/public/avatar_3.png" alt="GitHub@beijin1949" title="GitHub@beijin1949"></a> <a href="https://github.com/JinZemin" target="_blank"><img width="64" height="64" src="./docs/public/avatar_4.png" alt="GitHub@JinZemin" title="GitHub@JinZemin"></a> <a href="hhttps://github.com/ye5840" target="_blank"><img width="64" height="64" src="./docs/public/avatar_5.png" alt="GitHub@ye5840" title="GitHub@ye5840"></a><img width="64" height="64" src="./docs/public/avatar_6.jpg" alt="WeChat@**洋" title="WeChat@**洋">

## Components

| Name            | Description | Name           | Description |
| :-------------- | :---------- | :------------- | :---------- |
| Alert           | 警告提示    | Avatar         | 头像        |
| BackTop         | 回到顶部    | Badge          | 徽标        |
| Breadcrumb      | 面包屑      | Button         | 按钮        |
| Calendar        | 日历        | Card           | 卡片        |
| Carousel        | 轮播图      | Cascader       | 级联选择    |
| Checkbox        | 复选框      | Collapse       | 折叠面板    |
| ColorPicker     | 颜色选择器  | ConfigProvider | 全局化配置  |
| Countdown       | 倒计时      | DatePicker     | 日期选择器  |
| Descriptions    | 描述列表    | Dialog         | 对话框      |
| Divider         | 分割线      | Drawer         | 抽屉        |
| Ellipsis        | 文本省略    | Empty          | 空状态      |
| Flex            | 弹性布局    | FloatButton    | 浮动按钮    |
| GradientText    | 渐变文字    | Grid           | 栅格        |
| Highlight       | 高亮文本    | Image          | 图片        |
| Input           | 输入框      | InputNumber    | 数字输入框  |
| InputSearch     | 搜索框      | List           | 列表        |
| LoadingBar      | 加载条      | Message        | 全局提示    |
| Modal           | 模态框      | Notification   | 通知提醒    |
| NumberAnimation | 数值动画    | Pagination     | 分页        |
| Popconfirm      | 弹出确认    | Popover        | 气泡卡片    |
| Progress        | 进度条      | QRCode         | 二维码      |
| Radio           | 单选框      | Rate           | 评分        |
| Result          | 结果        | Scrollbar      | 滚动条      |
| Segmented       | 分段控制器  | Select         | 选择器      |
| Skeleton        | 骨架屏      | Slider         | 滑动输入条  |
| Space           | 间距        | Spin           | 加载中      |
| Statistic       | 统计数值    | Steps          | 步骤条      |
| Swiper          | 触摸滑动    | Switch         | 开关        |
| Table           | 表格        | Tabs           | 标签页      |
| Tag             | 标签        | Textarea       | 文本域      |
| TextScroll      | 文字滚动    | Timeline       | 时间轴      |
| Tooltip         | 文字提示    | Upload         | 上传        |
| Video           | 播放器      | Waterfall      | 瀑布流      |
| Watermark       | 水印        |

## Functions

| Name | Description | Type |
| :-- | :-- | :-- |
| dateFormat | Format date-time string function | (value: number &#124; string &#124; Date = Date.now(), format: string = 'YYYY-MM-DD HH:mm:ss') => string |
| formatNumber | Number formatting function | (value: number &#124; string, precision: number = 2, separator: string = ',', decimal: string = '.', prefix?: string, suffix?: string) => string |
| rafTimeout | Function to implement `setTimeout` or `setInterval` using `requestAnimationFrame` | (fn: Function, delay: number = 0, interval: boolean = false) => \{ id: number } |
| cancelRaf | Function to cancel the `rafTimeout` function | (raf: { id: number }) => void |
| throttle | Throttle function | (fn: Function, delay: number = 300) => Function |
| debounce | Debounce function | (fn: Function, delay: number = 300) => Function |
| add | Addition function that eliminates precision issues in JavaScript arithmetic | (num1: number, num2: number) => number |
| downloadFile | Function to download a file with a custom filename; if no filename is provided, it extracts the filename from the URL | (url: string, fileName?: string) => void |
| toggleDark | Function to toggle dark mode | () => void |
| useEventListener | Function to add and remove event listeners using Vue lifecycle hooks | (target: HTMLElement &#124; Window &#124; Document, event: string, callback: Function) => void |
| useMutationObserver | Function to observe changes in DOM elements using `MutationObserver` | (target: Ref &#124; Ref[] &#124; HTMLElement &#124; HTMLElement[], callback: MutationCallback, options: object = {}) => { start: \() => void, stop: \() => void } |
| useScroll | Function to monitor the scroll position and state of a target element in real time | (target: Ref &#124; HTMLElement &#124; Window &#124; Document = window, throttleDelay: number = 0, onScroll?: (e: Event) => void, onStop?: (e: Event) => void) => { x: Ref\<number>, xScrollMax: Ref\<number>, y: Ref\<number>, yScrollMax: Ref\<number>, isScrolling: Ref\<boolean>, left: Ref\<boolean>, right: Ref\<boolean>, top: Ref\<boolean>, bottom: Ref\<boolean> } |
| useFps | Function to monitor the browser's refresh rate (FPS) in real time | () => { fps: Ref\<number> } |
| useMediaQuery | Function to determine if the current environment matches a specified media query condition | (mediaQuery: string) => { match: Ref\<boolean> } |
| useResizeObserver | Function to observe changes in the dimensions of DOM elements using `ResizeObserver` | (target: Ref &#124; Ref[] &#124; HTMLElement &#124; HTMLElement[], callback: ResizeObserverCallback, options: object = {}) => { start: \() => void, stop: \() => void } |
| useSlotsExist | Function to watch for the existence of slots with given names, supporting single slots or an array of slots | <T extends string &#124; string[] = 'default'>(slotsName: T) => T extends string ? ComputedRef\<boolean> : Reactive\<Record\<string, ComputedRef\<boolean>>> |
| useInject | A function that uses injection to obtain color palettes and shadow color | (key: string) => { colorPalettes: Ref\<string[]>, shadowColor: Ref\<string> } |
| useOptionsSupported | Checks if the browser supports the given event listener options | (prop: 'capture' &#124; 'once' &#124; 'passive' &#124; 'signal') => { isSupported: Ref\<boolean> } |
