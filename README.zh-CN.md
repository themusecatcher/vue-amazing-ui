<p align="center">
  <a href="https://themusecatcher.github.io/vue-amazing-ui/">
    <img width="200" src="https://themusecatcher.github.io/vue-amazing-ui/amazing-logo.svg">
  </a>
</p>

<h1 align="center">Vue Amazing UI</h1>
<p align="center">一个 Vue 3 组件库</p>
<p align="center">主题可调，全量使用 TypeScript 和 SFC，支持 tree shaking</p>
<p align="center">有点意思</p>
<p align="center"><a href="README.md">English</a> | 中文</p>

## 文档

[Vue Amazing UI](https://themusecatcher.github.io/vue-amazing-ui/)

## 特性

- 组件库采用 `Vue@3.5.29`+ `TypeScript@5.9.3` + `Vite@7.3.1` + `Less@4.5.1` 实现
- 目前共包含 `67` 个基础 `UI` 组件以及 `18` 个工具函数，并且持续探索更新中...
- 主题可调，你只需提供一个主题色，剩下的都交给我
- 顺便一提，它们全都可以 `treeshaking`
- `Vue Amazing UI` 全量使用 `TypeScript` 编写，和你的 `TypeScript` 项目无缝衔接
- 全部组件均采用单文件组件 `SFC`，可独立使用
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

_失去 `tree-shaking` 的能力，打包后有冗余代码_

```ts
import { createApp } from 'vue'
import App from './App.vue'
import VueAmazingUI from 'vue-amazing-ui'
import 'vue-amazing-ui/css'

const app = createApp(App)
app.use(VueAmazingUI)
app.mount('#app')
```

**全局部分注册**

_这种情况下，只有导入的组件才会被打包_

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

**局部注册组件**

_这种情况下，也只有导入的组件才会被打包_

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

**全局部分注册和局部注册组件，都需手动引入组件库全局默认样式（推荐使用[自动按需引入](https://themusecatcher.github.io/vue-amazing-ui/guide/ondemand.html#%E8%87%AA%E5%8A%A8%E6%8C%89%E9%9C%80%E5%BC%95%E5%85%A5-%E5%BC%BA%E7%83%88%E6%8E%A8%E8%8D%90)）**

```ts
import { createApp } from 'vue'
import App from './App.vue'
import 'vue-amazing-ui/es/style/global.css' // 引入全局默认样式

const app = createApp(App)
app.mount('#app')
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
        VueAmazingUIResolver({
          cjs: false // whether use commonjs build, default false
        })
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

## 使用类型

_所有类型均可直接从 `vue-amazing-ui` 中引入使用，无需任何额外安装_

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
  useSlotsExist,
  useInject,
  useOptionsSupported
} from 'vue-amazing-ui'
</script>
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

- 启动项目

```sh
pnpm dev
```

- 启动文档

```sh
pnpm docs:dev
```

## 博客

[My CSDN Blogs](https://themusecatcher.blog.csdn.net)

## 赞助

`Vue Amazing UI` 是采用 `MIT` 许可的开源项目，使用完全免费。组件库及文档所有工作均由作者一人完成，开发迭代过程实属不易...为了组件库的健康可持续发展，非常期望能获得您的支持与赞助。

#### [成为赞助者](https://themusecatcher.github.io/vue-amazing-ui/sponsor/charge.html)

## 赞助者 🫡

所有的赞助者都将出现在此处，非常感谢你们的支持与赞助 ❤️

<a href="https://github.com/themusecatcher" target="_blank"><img width="64" height="64" src="./docs/public/avatar.png" alt="GitHub@themusecatcher" title="GitHub@themusecatcher"></a> <img width="64" height="64" src="./docs/public/avatar_1.jpeg" alt="WeChat@Ant" title="WeChat@Ant" /> <a href="https://github.com/nizhensh-i" target="_blank"><img width="64" height="64" src="./docs/public/avatar_2.jpg" alt="GitHub@nizhensh-i" title="GitHub@nizhensh-i"></a> <a href="https://github.com/beijin1949" target="_blank"><img width="64" height="64" src="./docs/public/avatar_3.png" alt="GitHub@beijin1949" title="GitHub@beijin1949"></a> <a href="https://github.com/JinZemin" target="_blank"><img width="64" height="64" src="./docs/public/avatar_4.png" alt="GitHub@JinZemin" title="GitHub@JinZemin"></a> <a href="https://github.com/ye5840" target="_blank"><img width="64" height="64" src="./docs/public/avatar_5.png" alt="GitHub@ye5840" title="GitHub@ye5840"></a><img width="64" height="64" src="./docs/public/avatar_6.jpg" alt="WeChat@**洋" title="WeChat@**洋">

## 组件

| 名称            | 说明       | 名称           | 说明       |
| :-------------- | :--------- | :------------- | :--------- |
| Alert           | 警告提示   | Avatar         | 头像       |
| BackTop         | 回到顶部   | Badge          | 徽标       |
| Breadcrumb      | 面包屑     | Button         | 按钮       |
| Calendar        | 日历       | Card           | 卡片       |
| Carousel        | 轮播图     | Cascader       | 级联选择   |
| Checkbox        | 复选框     | Collapse       | 折叠面板   |
| ColorPicker     | 颜色选择器 | ConfigProvider | 全局化配置 |
| Countdown       | 倒计时     | DatePicker     | 日期选择器 |
| Descriptions    | 描述列表   | Dialog         | 对话框     |
| Divider         | 分割线     | Drawer         | 抽屉       |
| Ellipsis        | 文本省略   | Empty          | 空状态     |
| Flex            | 弹性布局   | FloatButton    | 浮动按钮   |
| GradientText    | 渐变文字   | Grid           | 栅格       |
| Highlight       | 高亮文本   | Image          | 图片       |
| Input           | 输入框     | InputNumber    | 数字输入框 |
| InputSearch     | 搜索框     | List           | 列表       |
| LoadingBar      | 加载条     | Message        | 全局提示   |
| Modal           | 模态框     | Notification   | 通知提醒   |
| NumberAnimation | 数值动画   | Pagination     | 分页       |
| Popconfirm      | 弹出确认   | Popover        | 气泡卡片   |
| Progress        | 进度条     | QRCode         | 二维码     |
| Radio           | 单选框     | Rate           | 评分       |
| Result          | 结果       | Scrollbar      | 滚动条     |
| Segmented       | 分段控制器 | Select         | 选择器     |
| Skeleton        | 骨架屏     | Slider         | 滑动输入条 |
| Space           | 间距       | Spin           | 加载中     |
| Statistic       | 统计数值   | Steps          | 步骤条     |
| Swiper          | 触摸滑动   | Switch         | 开关       |
| Table           | 表格       | Tabs           | 标签页     |
| Tag             | 标签       | Textarea       | 文本域     |
| TextScroll      | 文字滚动   | Timeline       | 时间轴     |
| Tooltip         | 文字提示   | Upload         | 上传       |
| Video           | 播放器     | Waterfall      | 瀑布流     |
| Watermark       | 水印       |

## 工具函数

| 名称 | 说明 | 类型 |
| :-- | :-- | :-- |
| dateFormat | 格式化日期时间字符串函数 | (value: number &#124; string &#124; Date = Date.now(), format: string = 'YYYY-MM-DD HH:mm:ss') => string |
| formatNumber | 数字格式化函数 | (value: number &#124; string, precision: number = 2, separator: string = ',', decimal: string = '.', prefix?: string, suffix?: string) => string |
| rafTimeout | 使用 `requestAnimationFrame` 实现的延迟 `setTimeout` 或间隔 `setInterval` 调用函数 | (fn: Function, delay: number = 0, interval: boolean = false) => \{ id: number } |
| cancelRaf | 用于取消 `rafTimeout` 函数 | (raf: { id: number }) => void |
| throttle | 节流函数 | (fn: Function, delay: number = 300) => Function |
| debounce | 防抖函数 | (fn: Function, delay: number = 300) => Function |
| add | 消除 `js` 加减精度问题的加法函数 | (num1: number, num2: number) => number |
| downloadFile | 下载文件并自定义文件名，未传 `fileName` 时，从文件地址中自动提取文件名称 | (url: string, fileName?: string) => void |
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
