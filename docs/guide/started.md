# 快速上手<BackTop />

## 安装

**With PNPM**

```bash
$ pnpm i vue-amazing-ui
# or
$ pnpm add vue-amazing-ui
```

**With YARN**

```bash
$ yarn add vue-amazing-ui
```

**With NPM**

```bash
$ npm i vue-amazing-ui
```

## 使用

> **Global**

```ts
import { createApp } from 'vue'
import App from './App.vue'

import VueAmazingUI from 'vue-amazing-ui'
import 'vue-amazing-ui/css'

const app = createApp(App)
app.use(VueAmazingUI)

app.mount('#app')
```

> **Local**

```vue
<script setup lang="ts">
import { Button } from 'vue-amazing-ui'
import 'vue-amazing-ui/css'
</script>

<template>
  <Button></Button>
</template>
```
