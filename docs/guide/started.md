# 快速上手

<BackTop />
<Watermark fullscreen content="Vue Amazing UI" />

## Install

::: code-group

```sh [npm]
$ npm install vue-amazing-ui
```

```sh [pnpm]
$ pnpm add vue-amazing-ui
```

```sh [yarn]
$ yarn add vue-amazing-ui
```

```sh [bun]
$ bun add vue-amazing-ui
```

:::

## Use Components

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

### Use Functions

```vue
<script setup lang="ts">
import {
  dateFormat,
  requestAnimationFrame,
  cancelAnimationFrame,
  rafTimeout,
  cancelRaf,
  throttle,
  debounce,
  add,
  downloadFile,
  formatNumber,
  toggleDark,
  useEventListener
} from 'vue-amazing-ui'
</script>
```
