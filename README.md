# vue-amazing-ui

### 安装插件

```
npm install vue-amazing-ui
或：yarn add vue-amazing-ui
```

### 已有组件

组件名 | 说明
:--- | :---
Breadcrumb | 面包屑
Countdown | 倒计时
Pagination | 分页器
Video | 视频播放

### 引入并注册插件

```
// 全部引入
import VueAmazingUI from 'vue-amazing-ui'
import 'vue-amazing-ui/dist/style.css'

app.use(VueAmazingUI)

// 按需引入
import Breadcrumb from 'vue-amazing-ui'
import 'vue-amazing-ui/dist/style.css'

app.use(Breadcrumb)
```

### 组件Demos(示例)

```
<Countdown
  style="margin-top: 50px;"
  title="Countdown"
  :countdown="12 * 30 * 24 * 60 * 60"
  format="Y 年 M 月 D 天 H 时 m 分 s 秒"
  finishedText="Finished"
  @finish="onFinish">
  <template #prefix>There's only </template>
  <!-- <template #finish>&lt; FinishedText slot &gt;</template> -->
  <template #suffix> left for the end.</template>
</CountDown>

<Breadcrumb :routes="routes" :height="60" />

<Pagination
  @change="changePage"
  :current="pagination.p"
  :pageSize="pagination.pageSize"
  :total="total"
  :hideOnSinglePage="hideOnSinglePage"
  :showQuickJumper="true"
  :showTotal="true"
  placement="center"/>

<Video
  v-show="true"
  :videoUrl="videoUrl"
  :videoCover="videoCover"
  :width="800"
  :height="450"
  :autoplay="true"
  :controls="true"
  :loop="false"
  :muted="false"
  preload="auto"
  :showPlay="true"
  :playWidth="96"
  zoom="cotain"/>
```

### 各个组件具体介绍及实现

详见：[My CSDN Blogs](https://blog.csdn.net/Dandrose)
