<p align="center">
  <a href="https://themusecatcher.github.io/vue-amazing-ui/">
    <img width="200" src="https://themusecatcher.github.io/vue-amazing-ui/amazing-logo.svg">
  </a>
</p>

<h1 align="center">Vue Amazing UI</h1>
<p align="center">A Vue 3 Component Library</p>
<p align="center">Each component is a Single-File Component (SFC), which can be used Independently</p>
<p align="center">Kinda Interesting</p>
<p align="center">English | <a href="README.zh-CN.md">中文</a></p>

## Documentation

[Vue Amazing UI](https://themusecatcher.github.io/vue-amazing-ui/)

## Features

- The component library is implemented with `Vue@3.5.13`+ `TypeScript@5.6.3` + `Vite@6.0.2` + `Less@4.2.1`.
- Currently, it includes `63` basic UI components and `16` utility functions, with continuous exploration and updates ongoing...
- All the stuff in Vue Amazing UI is written in TypeScript. It can work with your typescript project seamlessly.
- Each component is a Single-File Component (`SFC`), and they can be used independently without any issues.
- Ready to use out of the box, no fuss.

## Installation

```bash
npm install vue-amazing-ui
# or
pnpm add vue-amazing-ui
# or
yarn add vue-amazing-ui
# or
bun add vue-amazing-ui
```

## Use Components

**Global Registration All Components**

```ts
import { createApp } from 'vue'
import App from './App.vue'
import VueAmazingUI from 'vue-amazing-ui'
import 'vue-amazing-ui/css'

const app = createApp(App)
app.use(VueAmazingUI).mount('#app')
```

**Global Registration Some Components**

```ts
import { createApp } from 'vue'
import App from './App.vue'
import { Button, Tag } from 'vue-amazing-ui'
import 'vue-amazing-ui/css'

const app = createApp(App)
app.use(Button).use(Tag).mount('#app')
```

**Local Registration**

```vue
<script setup lang="ts">
import { Button } from 'vue-amazing-ui'
import 'vue-amazing-ui/css'
</script>
<template>
  <Button>button</Button>
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
  useSlotsExist
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

## Details

[My CSDN Blogs](https://blog.csdn.net/Dandrose)

## Components

Name | Description | Name | Description
:-- | :-- | :-- | :--
Alert | 警告提示 | Avatar | 头像
BackTop | 回到顶部 | Badge | 徽标
Breadcrumb | 面包屑 | Button | 按钮
Card | 卡片 | Carousel | 走马灯
Cascader | 级联选择 | Checkbox | 复选框
Collapse | 折叠面板 | Countdown | 倒计时
DatePicker | 日期选择 | Descriptions | 描述列表
Dialog | 对话框 | Divider | 分割线
Drawer | 抽屉 | Ellipsis | 文本省略
Empty | 空状态 | Flex | 弹性布局
FloatButton | 浮动按钮 | GradientText | 渐变文字
Grid | 栅格 | Image | 图片
Input | 输入框 | InputNumber | 数字输入框
InputSearch | 搜索框 | List | 列表
LoadingBar | 加载条 | Message | 全局提示
Modal | 模态框 | Notification | 通知提醒
NumberAnimation | 数值动画 | Pagination | 分页
Popconfirm | 弹出确认 | Popover | 气泡卡片
Progress | 进度条 | QRCode | 二维码
Radio | 单选框 | Rate | 评分
Result | 结果 | Scrollbar | 滚动条
Segmented | 分段控制器 | Select | 选择器
Skeleton | 骨架屏 | Slider | 滑动输入条
Space | 间距 | Spin | 加载中
Statistic | 统计数值 | Steps | 步骤条
Swiper | 触摸滑动插件 | Switch | 开关
Table | 表格 | Tabs | 标签页
Tag | 标签 | Textarea | 文本域
TextScroll | 文字滚动 | Timeline | 时间轴
Tooltip | 文字提示 | Upload | 上传
Video | 播放器 | Waterfall | 瀑布流
Watermark | 水印

## Functions

Name | Description | Type
:--- | :--- | :---
dateFormat | 格式化日期时间字符串函数 | (value: number &#124; string &#124; Date = Date.now(), format: string = 'YYYY-MM-DD HH:mm:ss') => string
formatNumber | 数字格式化函数 | (value: number &#124; string, precision: number = 2, separator: string = ',', decimal: string = '.', prefix?: string, suffix?: string) => string
rafTimeout | 使用 `requestAnimationFrame` 实现的延迟 `setTimeout` 或间隔 `setInterval` 调用函数 | (fn: Function, delay: number = 0, interval: boolean = false) => object
cancelRaf | 用于取消 `rafTimeout` 函数 | (raf: { id: number }) => void
throttle | 节流函数 | (fn: Function, delay: number = 300) => any
debounce | 防抖函数 | (fn: Function, delay: number = 300) => any
add | 消除 `js` 加减精度问题的加法函数 | (num1: number, num2: number) => number
downloadFile | 下载文件并自定义文件名，未传 `name` 时，从文件地址中自动提取文件名称 | (url: string, fileName?: string) => void
toggleDark | 一键切换暗黑模式函数 | () => void
useEventListener | 使用 `Vue` 的生命周期钩子添加和移除事件监听器 | (target: HTMLElement &#124; Window &#124; Document, event: string, callback: Function) => void
useMutationObserver | 使用 `MutationObserver` 观察 `DOM` 元素的变化 | (target: Ref &#124; Ref[] &#124; HTMLElement &#124; HTMLElement[], callback: MutationCallback, options = {}) => object
useScroll | 实时监测目标元素滚动位置及状态 | (target: Ref &#124; HTMLElement &#124; Window &#124; Document = window, throttleDelay: number = 0, onScroll?: (e: Event) => void, onStop?: (e: Event) => void) => object
useFps | 实时监测浏览器刷新率FPS | () => object
useMediaQuery | 使用媒体查询来判断当前环境是否符合指定的媒体查询条件 | (mediaQuery: string) => object
useResizeObserver | 使用 `ResizeObserver` 观察 `DOM` 元素尺寸变化 | (target: Ref &#124; Ref[] &#124; HTMLElement &#124; HTMLElement[], callback: ResizeObserverCallback, options = {}) => object
useSlotsExist | 监听给定名称或名称数组的插槽是否存在，支持监听单个插槽或一组插槽的存在 | (slotsName: string &#124; string[] = 'default') => Reactive &#124; Ref\<boolean>
