# vue-amazing-ui

## 安装插件

```
npm install vue-amazing-ui
或：yarn add vue-amazing-ui
```

## 已有组件

组件名 | 说明
:--- | :---
Breadcrumb | 面包屑
Countdown | 倒计时
Pagination | 分页器

## 引入并注册插件

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

## 在项目中使用(示例)

```
<Breadcrumb :routes="routes" :height="60" />
```
