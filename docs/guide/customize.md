# 定制主题

<GlobalElement />

`Vue Amazing UI` 通过使用 `ConfigProvider` 调整主题，默认情况下主题色为 <Tag :bordered="false" color="#1677ff">#1677ff</Tag>，无需任何配置

更多关于 `ConfigProvider` 的使用，参见 [全局化配置 ConfigProvider](/guide/components/configprovider.html)

## 动态切换主题

*配置的全局主题色会注入后代组件，如果要动态切换主题色，只需要修改 `theme` 对象即可*

```vue
<!-- App.vue -->
<script setup lang="ts">
import { ref } from 'vue'
import { ConfigProviderTheme } from 'vue-amazing-ui'
const theme = ref<ConfigProviderTheme>({
  common: {
    primaryColor: '#ff6900'
  }
})
</script>
<template>
  <ConfigProvider :theme="theme">
    <RouterView />
  </ConfigProvider>
</template>

```

## 定制组件主题

*组件主题配置方法同全局主题配置方法，并且组件主题色会覆盖全局主题色*

```vue
<!-- App.vue -->
<script setup lang="ts">
import { ref } from 'vue'
import { ConfigProviderTheme } from 'vue-amazing-ui'
const theme = ref<ConfigProviderTheme>({
  common: {
    primaryColor: '#1677ff'
  },
  Alert: {
    primaryColor: '#ff6900'
  },
  Button: {
    primaryColor: '#18a058'
  }
})
</script>
<template>
  <ConfigProvider :theme="theme">
    <RouterView />
  </ConfigProvider>
</template>

```
