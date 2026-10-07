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
- 需要统一调整库组件字体时，在宿主页面声明即可（库的全局样式已对 `input` / `textarea` / `select` / `button` 统一声明 `font-family: inherit`，**宿主页面上的同名原生控件同样跟随**；该规则用 `:where()` 包裹、特异性为 0，宿主任何同名规则都能覆盖它）：

```css
body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}
```

- **建议把字体声明在 `body` / `html` 上**：浮层与弹窗虽然 `Teleport` 到 `body`，也能自然继承，无需任何额外处理（声明在中间层容器时才需要下面的承接机制）。
- 字号：组件内部字号由组件自身声明（正文基准 14px），**不随宿主 `font-size` 变化**；由使用者传入文本、且组件未为其提供视觉规格的内容型组件（如 `Ellipsis`）按设计跟随上下文。
- 浮层（下拉面板 / 提示 / 弹窗等）：库不声明字体族，而浮层内容会 `Teleport` 到 `body` 从而脱离页面继承链，故浮层会自动承接**触发位置的字体族**（字号仍由组件自身声明）。若需浮层使用特定字体，把 `font-family` 声明在触发元素所在的祖先容器上即可。
- 字体不走 `ConfigProvider` 主题（该通道只承载颜色）：如需按区域分别设置，用宿主 CSS 作用域即可。
