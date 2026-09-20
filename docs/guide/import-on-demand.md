# 按需引入（Tree Shaking）

`vue-amazing-ui` 默认支持基于 `ES modules` 的 `tree shaking`

<GlobalElement />

## 手动引入（不推荐）

### 局部注册

```vue
<script setup lang="ts">
import { Button, Tag } from 'vue-amazing-ui'
// 每个组件一个样式入口（推荐写法）：内含全局默认样式 + 组件自身样式 + 其依赖组件样式（无需手动列举）
import 'vue-amazing-ui/es/button/style'
import 'vue-amazing-ui/es/tag/style'
</script>
<template>
  <Button>button</Button>
  <Tag>tag</Tag>
</template>
```

### 全局注册

```ts
// main.ts
import { createApp } from 'vue'
import App from './App.vue'
import { Button, Tag } from 'vue-amazing-ui'
// 每个组件一个样式入口（推荐写法）：内含全局默认样式 + 组件自身样式 + 其依赖组件样式
import 'vue-amazing-ui/es/button/style'
import 'vue-amazing-ui/es/tag/style'

const app = createApp(App)
app.use(Button).use(Tag)
app.mount('#app')
```

> 样式入口也支持（更显式的）文件写法 `import 'vue-amazing-ui/es/button/style/index.js'`。
> 旧写法 `import 'vue-amazing-ui/es/button/Button.css'` 依然有效，但它只引入组件自身样式，依赖组件样式与全局默认样式仍需自行补齐 —— 推荐使用入口写法。

## 自动按需引入（强烈推荐）

使用 [`unplugin-vue-components`](https://github.com/unplugin/unplugin-vue-components) 插件来按需自动加载组件，插件会自动解析模板中的使用到的组件，并导入组件和样式

::: code-group

```sh [pnpm]
$ pnpm add unplugin-vue-components -D
```

```sh [npm]
$ npm install unplugin-vue-components -D
```

```sh [yarn]
$ yarn add unplugin-vue-components -D
```

```sh [bun]
$ bun add unplugin-vue-components -D
```

:::

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
