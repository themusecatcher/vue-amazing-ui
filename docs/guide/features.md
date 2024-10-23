# 特性

<FloatButton
  :width="44"
  :height="44"
  :bottom="96"
  :right="40"
  type="primary"
  tooltip="成为赞助者✨"
  :tooltip-props="{
    tooltipStyle: {
      fontWeight: 500
    }
  }"
  href="https://themusecatcher.github.io/vue-amazing-ui/sponsor/charge.html"
  target="_blank"
>
  <template #description>
    <span style="font-size: 14px; font-weight: 600;">赞助</span>
  </template>
</FloatButton>
<BackTop />
<Watermark fullscreen content="Vue Amazing UI" />

## 简要介绍

- 组件库采用 `Vue@{{ getVersion('vue') }}` + `TypeScript@{{ getVersion('typescript') }}` + `Vite@{{ getVersion('vite') }}` + `Less@{{ getVersion('less') }}` 实现！
- 目前共包含 `63` 个基础 `UI` 组件以及 `16` 个工具函数，并且持续探索更新中...
- 所有组件均采用单文件组件 `SFC` 形式，单独使用，也没问题！
- 所有组件样式均使用 `box-sizing: border-box;` 模式！
- 部分组件样式尚未完美适配文档的 `dark` 暗黑模式，可切换 `light` 模式查看！
- 开箱即用，不墨迹！

## 使用方式

- 全局引入并注册所有组件
- 按需引入并注册部分组件
- **无需任何安装，直接使用单文件组件 `SFC`，亦可一步到位**

  *使用单文件组件 `SFC` 时，请按需引入如下所示组件库默认全局样式：*

  ::: details Show Global Styles

  ```less
  // 组件库全局样式定义
  @themeColor: #1677ff; // 全局主题色
  @themeHoverColor: #4096ff; // 主题色悬浮态
  *,
  *::before,
  *::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    caret-color: transparent; // 消除 win 系统点击后出现插入光标闪烁的问题
  }
  body {
    min-height: 100vh;
    font-family:
      Inter,
      -apple-system,
      BlinkMacSystemFont,
      'Segoe UI',
      Roboto,
      Oxygen,
      Ubuntu,
      Cantarell,
      'Fira Sans',
      'Droid Sans',
      'Helvetica Neue',
      sans-serif;
  }
  input,
  textarea {
    caret-color: auto;
  }
  a {
    color: @themeColor;
    text-decoration: none;
    background-color: transparent;
    -webkit-tap-highlight-color: transparent;
    outline: none;
    cursor: pointer;
    transition: color 0.3s;
    &:hover {
      color: #4096ff;
    }
  }
  ```
  
  :::

<script setup lang="ts">
import pkg from '../../package.json'

const dependencies = pkg.dependencies
const devDependencies = pkg.devDependencies
function getVersion (target: string): string {
  for (let name of Object.keys(dependencies)) {
    if (name === target) {
      return dependencies[name].replace('^', '')
    }
  }
  for (let name of Object.keys(devDependencies)) {
    if (name === target) {
      return devDependencies[name].replace('^', '')
    }
  }
  return ''
}
</script>
