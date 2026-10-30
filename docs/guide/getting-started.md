---
description: 安装并快速上手 Amazing UI 组件库
---

# 快速上手

<GlobalElement />

## 安装

::: code-group

```sh [pnpm]
$ pnpm add vue-amazing-ui
```

```sh [npm]
$ npm install vue-amazing-ui
```

```sh [yarn]
$ yarn add vue-amazing-ui
```

```sh [bun]
$ bun add vue-amazing-ui
```

:::

## 使用组件

> **全局完整注册（不推荐）**

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

> **按需引入（推荐）**

_只有导入的组件才会被打包；每个组件一个样式入口，已内含组件库全局默认样式 + 组件自身样式 + 其依赖组件样式_

```ts
import { Button, Tag } from 'vue-amazing-ui'
import 'vue-amazing-ui/es/button/style'
import 'vue-amazing-ui/es/tag/style'
```

- 组件可直接在 `main.ts` 中 `app.use(Button).use(Tag)` 全局注册，也可在 `SFC` 中按需使用；
- 更省心的是自动按需引入（无需手写样式引入），详见[按需引入](./import-on-demand.md#自动按需引入-强烈推荐)。

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
  throttle,
  debounce,
  add,
  downloadFile,
  useEventListener,
  useMutationObserver,
  useScroll,
  useFps,
  useMediaQuery,
  useResizeObserver,
  useSlotsExist,
  useOptionsSupported,
  getScrollParent,
  useScrollParent
} from 'vue-amazing-ui'
</script>
```

## 服务端渲染（SSR）

_组件库不依赖浏览器全局对象即可完成 `setup`，可在 `Node` 环境直接渲染_

浮层类组件（抽屉 / 对话框 / 弹窗 / 消息 / 下拉等）默认经 `Teleport` 挂载到 `body`，服务端渲染时其内容会收集到 `ssrContext.teleports`，**需应用侧注入到 HTML**（预留 `<div id="teleports"></div>` 并用其内容替换；`Nuxt` 等框架已自动处理），否则首屏不含浮层内容，且客户端 `hydration` 会提示节点不匹配：

```ts
import { createSSRApp } from 'vue'
import { renderToString } from 'vue/server-renderer'

const app = createSSRApp(App)
const ssrContext: Record<string, unknown> = {}
const html = await renderToString(app, ssrContext)
// ssrContext.teleports.body 即挂载到 body 的浮层内容，需注入到页面
```

各浮层组件均可用 `to` 指定其他挂载节点，`to: false` 表示就地渲染在当前 `DOM`，详见对应组件页的 `to` 属性。
