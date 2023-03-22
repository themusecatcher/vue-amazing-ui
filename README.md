# vue-amazing-ui

## Install

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
import 'vue-amazing-ui/dist/style.css'

const app = createApp(App)
app.use(VueAmazingUI)
```

**Local**

```vue
<script setup lang="ts">
import { Breadcrumb } from '@web/vue-ui'
import '@web/vue-ui/dist/style.css'
</script>
```

## Components

| Component name | Descriptions |
| :--- | :--- |
Breadcrumb | 面包屑
Button | 按钮
Cascader | 级联选择
Checkbox | 多选框
Countdown | 倒计时
DatePicker | 日期选择器
Dialog | 对话框
Message | 全局提示
Modal | 信息提示
Notification | 通知提醒框
Pagination | 分页器
Radio | 单选框
Select | 选择器
Slider | 滑动输入条
Spin | 加载中
Swiper | 触摸滑动插件
Switch | 开关
TextScroll | 文字滚动
Tooltip | 文字提示
Video | 播放器
Waterfall | 瀑布流

## Details

详见：[My CSDN Blogs](https://blog.csdn.net/Dandrose)