# 定制主题

<GlobalElement />

`Vue Amazing UI` 通过使用 `ConfigProvider` 调整主题，默认情况下主题色为 <Tag :bordered="false" color="#1677ff">#1677ff</Tag>，无需任何配置

更多关于 `ConfigProvider` 的使用，参见 [全局化配置 ConfigProvider](/guide/components/config-provider.html)

## 动态切换主题

_配置的全局主题色会注入后代组件；切换主题色只需修改主色字段（整体替换 `theme` 对象、就地改写其内的主色、运行期增删组件键均可），推荐用 `computed` 派生_

```vue
<!-- App.vue -->
<script setup lang="ts">
import { computed, ref } from 'vue'
import type { ConfigProviderTheme } from 'vue-amazing-ui'
const primaryColor = ref<string>('#ff6900')
const theme = computed<ConfigProviderTheme>(() => ({
  common: {
    primaryColor: primaryColor.value
  }
}))
</script>
<template>
  <ConfigProvider :theme="theme">
    <RouterView />
  </ConfigProvider>
</template>
```

## 定制组件主题

_组件主题配置方法同全局主题配置方法，键名为组件名（`PascalCase`），组件主题色会覆盖 `common` 全局主题色；未单独配置的组件沿用 `common`，`common` 未配置时回退内置默认色阶_

```vue
<!-- App.vue -->
<script setup lang="ts">
import { ref } from 'vue'
import type { ConfigProviderTheme } from 'vue-amazing-ui'
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

主题配置目前仅支持 `primaryColor` 一个字段
