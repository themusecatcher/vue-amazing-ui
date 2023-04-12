# vue-amazing-ui

## Install & Use

```sh
npm install vue-amazing-ui
#or
yarn add vue-amazing-ui
```

Import and register component

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

## Project

- Get the project code

```sh
git clone https://github.com/themusecatcher/vue-amazing-ui.git
```

- Install dependencies

```sh
cd vue-amazing-ui

yarn
#or
yarn install
```

- Run project

```sh
yarn dev
```

## Components

| Component name | Descriptions |
| :--- | :--- |
Breadcrumb | 面包屑
Button | 按钮
Carousel | 走马灯
Cascader | 级联选择
Checkbox | 多选框
Collapse | 折叠面板
Countdown | 倒计时
DatePicker | 日期选择器
Dialog | 对话框
Divider | 分割线
Empty | 空状态
Image | 图片
InputNumber | 数字输入框
Message | 全局提示
Modal | 信息提示
Notification | 通知提醒框
Pagination | 分页器
Progress | 进度条
QRCode | 二维码
Radio | 单选框
Rate | 评分
Select | 选择器
Slider | 滑动输入条
Spin | 加载中
Steps | 步骤条
Swiper | 触摸滑动插件
Switch | 开关
Table | 表格
Tabs | 标签页
TextScroll | 文字滚动
Timeline | 时间轴
Tooltip | 文字提示
Video | 播放器
Waterfall | 瀑布流

## Details

[My CSDN Blogs](https://blog.csdn.net/Dandrose)