# 定制主题

<GlobalElement />

`Vue Amazing UI` 通过使用 `ConfigProvider` 调整主题，默认情况下主题色为 <Tag :bordered="false" color="#1677ff">#1677ff</Tag>，无需任何配置

更多关于 `ConfigProvider` 的使用，参见 [全局化配置 ConfigProvider](/guide/components/config-provider.html)

## 动态切换主题

_配置的全局主题色会注入后代组件，如果要动态切换主题色，只需要修改 `theme` 对象即可_

```vue
<!-- App.vue -->
<script setup lang="ts">
import { ref } from 'vue'
import type { ConfigProviderTheme } from 'vue-amazing-ui'
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

_组件主题配置方法同全局主题配置方法，并且组件主题色会覆盖全局主题色_

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

## 字体

_组件库不声明页面字体，字体跟随宿主（谁提供字体谁声明）_

- 库的样式产物**不含 `body` / `html` 字体声明**，也不自带字体文件；组件内文字继承宿主页面字体，避免组件库覆盖宿主已有排版。
- 需要统一调整库组件字体时，在宿主页面声明即可（组件内的原生输入框 `input` / `textarea` / `select` / `button` 已由库统一 `font-family: inherit`，同样跟随）：

```css
body {
  font-family: Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
}
```

- 字号：组件内部字号由组件自身声明（正文基准 14px），**不随宿主 `font-size` 变化**；由使用者传入文本的组件（如 `Highlight`、`Ellipsis`、`NumberAnimation` 等行内组件）按设计跟随上下文。
- 字体不走 `ConfigProvider` 主题（该通道只承载颜色）：如需按区域分别设置，用宿主 CSS 作用域即可。
