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

> **全局部分注册**

_全局或局部引入部分组件，都只有导入的组件才会被打包_

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

> **局部注册组件**

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

> **全局部分注册和局部注册组件，都需手动引入组件库全局默认样式（推荐使用[自动按需引入](/guide/import-on-demand#自动按需引入-强烈推荐)）**

```ts
import { createApp } from 'vue'
import App from './App.vue'
import 'vue-amazing-ui/es/style/global.css' // 引入全局默认样式

const app = createApp(App)
app.mount('#app')
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
  useOptionsSupported,
  getColorPalettes,
  getAlphaColor,
  getScrollParent,
  lockScroll,
  useScrollParent
} from 'vue-amazing-ui'
</script>
```

## 服务端渲染（SSR）

组件库不依赖浏览器全局对象即可完成 `setup`，可在 `Node` 环境直接渲染。但浮层类组件默认经 `Teleport` 挂载到 `body`：

- 视口固定型直接挂 `body`：[抽屉 Drawer](./components/drawer.md)、[对话框 Modal](./components/modal.md) / [Dialog](./components/dialog.md)、[加载条 LoadingBar](./components/loading-bar.md)、[消息提示 Message](./components/message.md)、[通知提醒 Notification](./components/notification.md)；
- 锚点跟随型不传 `to` 时优先挂到最近的承载层内容容器；服务端渲染时没有 `DOM`、不存在承载层，因此同样落 `body`：[文字提示 Tooltip](./components/tooltip.md)、[气泡卡片 Popover](./components/popover.md)、[气泡确认框 Popconfirm](./components/popconfirm.md)、[选择器 Select](./components/select.md)、[自动完成 AutoComplete](./components/auto-complete.md)、[级联选择 Cascader](./components/cascader.md) 等。

服务端渲染时其内容会收集到 `ssrContext.teleports`，**需应用侧注入到 HTML**（例如预留 `<div id="teleports"></div>` 并用 `ssrContext.teleports` 的内容替换；`Nuxt` 等框架已自动处理），否则首屏不含浮层内容，且客户端 `hydration` 会提示节点不匹配：

```ts
const ssrContext: Record<string, unknown> = {}
const html = await renderToString(app, ssrContext)
// ssrContext.teleports.body 即挂载到 body 的浮层内容，需注入到页面
```

也可用 `to` 指定其他挂载节点；`to: false` 表示就地渲染在当前 `DOM`，锚点跟随型浮层（[文字提示 Tooltip](./components/tooltip.md) / [选择器 Select](./components/select.md) / [自动完成 AutoComplete](./components/auto-complete.md) / [级联选择 Cascader](./components/cascader.md)）与 [抽屉 Drawer](./components/drawer.md) / [加载条 LoadingBar](./components/loading-bar.md) 支持该写法。
