# vue-amazing-ui

## 安装插件

```
npm install vue-amazing-ui
或：yarn add vue-amazing-ui
```

## 引入并注册插件

```
import VueAmazingUI from 'vue-amazing-ui'
import '../node_modules/vue-amazing-ui/dist/style.css'

app.use(VueUi)

// 或者
import { Pagination, Breadcrumb } from 'vue-amazing-ui'
import '../node_modules/vue-amazing-ui/dist/style.css'

app.use(Pagination).use(Breadcrumb)
```

## 在项目中使用(示例)

```
<Breadcrumb :routes="routes" :height="60" />
```
