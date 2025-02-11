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

*失去 `tree-shaking` 的能力，打包后有冗余代码*

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

> **局部注册组件**

*这种情况下，也只有导入的组件才会被打包*

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

> **全局部分注册和局部注册组件，都需手动引入组件库全局默认样式（推荐使用[自动按需引入](/guide/ondemand#自动按需引入-强烈推荐)）**

```ts
import { createApp } from 'vue'
import App from './App.vue'
import 'vue-amazing-ui/es/style/global.css' // 引入全局默认样式

const app = createApp(App)
app.mount('#app')
```

## 使用类型

*所有类型均可直接从 `vue-amazing-ui` 中引入使用，无需任何额外安装*

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
  useSlotsExist
} from 'vue-amazing-ui'
</script>
```
