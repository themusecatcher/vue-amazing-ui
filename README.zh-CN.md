<p align="center">
  <a href="https://themusecatcher.github.io/vue-amazing-ui/">
    <img width="200" src="https://themusecatcher.github.io/vue-amazing-ui/amazing-logo.svg">
  </a>
</p>

<h1 align="center">Vue Amazing UI</h1>
<p align="center">一个 Vue 3 组件库</p>
<p align="center">使用 TypeScript，都是单文件组件 (SFC)，支持 tree shaking</p>
<p align="center">有点意思</p>
<p align="center"><a href="README.md">English</a> | 中文</p>

## 文档

[Vue Amazing UI](https://themusecatcher.github.io/vue-amazing-ui/)

## 特性

- 组件库采用 `Vue@3.5.13`+ `TypeScript@5.6.3` + `Vite@6.0.2` + `Less@4.2.1` 实现
- 目前共包含 `63` 个基础 `UI` 组件以及 `16` 个工具函数，并且持续探索更新中...
- 顺便一提，它们全都可以 `treeshaking`
- `Vue Amazing UI` 全量使用 `TypeScript` 编写，和你的 `TypeScript` 项目无缝衔接
- 每个组件都是单文件组件 `SFC`，独立使用，也没问题
- 开箱即用，不墨迹

## 安装

```sh
pnpm add vue-amazing-ui
# or
npm install vue-amazing-ui
# or
yarn add vue-amazing-ui
# or
bun add vue-amazing-ui
```

## 使用组件

**全局完整注册（不推荐）**

*失去 `tree-shaking` 的能力，打包后有冗余代码*

```ts
import { createApp } from 'vue'
import App from './App.vue'
import VueAmazingUI from 'vue-amazing-ui'
import 'vue-amazing-ui/css' // 等价于 'vue-amazing-ui/dist/style.css'

const app = createApp(App)
app.use(VueAmazingUI)
app.mount('#app')
```

**全局部分注册**

*全局或局部引入部分组件，都只有导入的组件才会被打包*

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

**局部注册组件（推荐）**

*这种情况下，也只有导入的组件才会被打包*

```vue
<script setup lang="ts">
import { Button } from 'vue-amazing-ui'
import 'vue-amazing-ui/es/button/Button.css'
</script>
<template>
  <Button>button</Button>
</template>
```

**自动按需引入（强烈推荐）**

使用 [`unplugin-vue-components`](https://github.com/unplugin/unplugin-vue-components) 插件来按需自动加载组件，插件会自动解析模板中的使用到的组件，并导入组件和样式

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
// vue-amazing-ui 按需引入
import { VueAmazingUIResolver } from 'vue-amazing-ui'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    Components({
      resolvers: [
        // auto import components from VueAmazingUI
        VueAmazingUIResolver()
      ]
    })
  ]
})
```

然后，你可以在代码中直接使用 `vue-amazing-ui` 的所有组件

```vue
<template>
  <Button>button</Button>
  <Tag>tag</Tag>
</template>
```

## 使用工具函数

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

## 使用类型

*所有类型均可直接从 `vue-amazing-ui` 中引入使用，无需额外安装*

```vue
<script setup lang="ts">
import { Button } from 'vue-amazing-ui'
import type { ButtonProps } from 'vue-amazing-ui'
import 'vue-amazing-ui/es/button/Button.css'

const shape = ref<ButtonProps['shape']>('default')
</script>
<template>
  <Button :shape="shape">button</Button>
</template>
```

## 项目

- 获取项目代码

```sh
git clone https://github.com/themusecatcher/vue-amazing-ui.git
```

- 安装依赖

```sh
cd vue-amazing-ui

pnpm i
```

- 启动

```sh
pnpm dev
```

## 博客

[My CSDN Blogs](https://blog.csdn.net/Dandrose)

## 组件

名称 | 说明 | 名称 | 说明
:-- | :-- | :-- | :--
Alert | 警告提示 | Avatar | 头像
BackTop | 回到顶部 | Badge | 徽标
Breadcrumb | 面包屑 | Button | 按钮
Card | 卡片 | Carousel | 轮播图
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

## 工具函数

名称 | 说明 | 类型
:--- | :--- | :---
dateFormat | 格式化日期时间字符串函数 | (value: number &#124; string &#124; Date = Date.now(), format: string = 'YYYY-MM-DD HH:mm:ss') => string
formatNumber | 数字格式化函数 | (value: number &#124; string, precision: number = 2, separator: string = ',', decimal: string = '.', prefix?: string, suffix?: string) => string
rafTimeout | 使用 `requestAnimationFrame` 实现的 `setTimeout` 或 `setInterval` 调用函数 | (fn: Function, delay: number = 0, interval: boolean = false) => object
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
