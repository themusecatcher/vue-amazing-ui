# vue-amazing-ui

*组件库采用 `Vue@3.5.11`+ `TypeScript@5.6.3` + `Vite@5.4.8` + `Less@4.2.0` 实现！*<br/>
*目前共包含 `63` 个基础 `UI` 组件以及 `16` 个工具函数，并且持续探索更新中...！*<br/>
*所有组件均采用单文件组件 `SFC` 形式，无需安装，直接使用！*<br/>
*所有组件样式均使用 `box-sizing: border-box;` 模式！*<br/>
*开箱即用，不墨迹！*

## Document & Online Preview

### [Vue Amazing UI](https://themusecatcher.github.io/vue-amazing-ui/)

## Install

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

**Global**

```ts
import { createApp } from 'vue'
import App from './App.vue'

import VueAmazingUI from 'vue-amazing-ui'
import 'vue-amazing-ui/css'

const app = createApp(App)
app.use(VueAmazingUI)
```

**Local**

```vue
<script setup lang="ts">
import { Button } from 'vue-amazing-ui'
import 'vue-amazing-ui/css'
</script>
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
  useScrollDirection,
  useFps,
  useMediaQuery,
  useResizeObserver,
  useSlotsExist
} from 'vue-amazing-ui'
</script>
```

## Use CDN

```html
<script src="https://unpkg.com/vue-amazing-ui@latest"></script>
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

## Components

Name | Description | Name | Description
:-- | :-- | :-- | :--
Alert | 警告提示 | Avatar | 头像
BackTop | 回到顶部 | Badge | 徽标
Breadcrumb | 面包屑 | Button | 按钮
Card | 卡片 | Carousel | 走马灯
Cascader | 级联选择 | Checkbox | 多选框
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
Modal | 信息提示 | Notification | 通知提醒
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

## Details

[My CSDN Blogs](https://blog.csdn.net/Dandrose)

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
useScrollDirection | 实时监测页面滚动方向 | (throttleDelay: number = 100) => object
useFps | 实时监测浏览器刷新率FPS | () => object
useMediaQuery | 使用媒体查询来判断当前环境是否符合指定的媒体查询条件 | (mediaQuery: string) => object
useResizeObserver | 使用 `ResizeObserver` 观察 `DOM` 元素尺寸变化 | (target: Ref &#124; Ref[] &#124; HTMLElement &#124; HTMLElement[], callback: ResizeObserverCallback, options = {}) => object
useSlotsExist | 监听给定名称或名称数组的插槽是否存在，支持监听单个插槽或一组插槽的存在 | (slotsName: string &#124; string[] = 'default') => Reactive &#124; Ref\<boolean>
