# 特性

<BackTop />
<Watermark fullscreen content="Vue Amazing UI" />

## 简要介绍

- 组件库采用 `Vue@{{ getVersion('vue') }}` + `TypeScript@{{ getVersion('typescript') }}` + `Vite@{{ getVersion('vite') }}` + `Less@{{ getVersion('less') }}` 实现！
- 目前包含 `62` 个基础 `UI` 组件以及 `16` 个常用工具函数，并且持续探索更新中...
- 所有组件均为单文件组件 `SFC`，无需安装，直接使用！
- 所有组件样式均使用 `box-sizing: border-box;` 模式！
- 部分组件样式尚未完美适配暗黑模式，可切换至 `light` 模式查看！
- 开箱即用，不墨迹！

## 使用方式

- 全局引入并注册所有组件
- 按需引入并注册部分组件
- **无需任何安装，直接使用单文件组件 `SFC`，亦可一步到位**

  *使用单文件组件 `SFC` 时，请按需引入如下所示组件库默认全局样式：*

  ::: details Show Global Styles

  ```less
  // 全局样式定义
  @themeColor: #1677ff; // 全局主题色
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    caret-color: transparent; // 消除 win 系统点击后出现插入光标闪烁的问题
  }
  body {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif,
    'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji';
  }
  input,
  textarea {
    caret-color: auto;
  }
  a {
    color: @themeColor;
    text-decoration: none;
    background-color: transparent;
    outline: none;
    cursor: pointer;
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
