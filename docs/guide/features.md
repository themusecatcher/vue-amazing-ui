# 特性

<GlobalElement />

::: tip 温馨提示
由于文档网站部署在静态网站服务 `GitHub Pages`，为了您的流程访问，建议打开代理
:::

## 简要介绍

- 组件库采用 `Vue@{{ getVersion('vue') }}` + `TypeScript@{{ getVersion('typescript') }}` + `Vite@{{ getVersion('vite') }}` + `Less@{{ getVersion('less') }}` 实现！
- 目前共包含 `63` 个基础 `UI` 组件以及 `16` 个工具函数，并且持续探索更新中...
- 顺便一提，它们全都可以 `treeshaking`
- `Vue Amazing UI` 全量使用 `TypeScript` 编写，和你的 `TypeScript` 项目无缝衔接
- 全部组件均采用单文件组件 `SFC` 风格，可独立使用
- 部分组件样式尚未完美适配文档主题的 `dark` 暗黑模式，可切换 `light` 模式查看
- 开箱即用，不墨迹

## 使用方式

- 全局引入注册所有组件
- 全局引入注册部分组件
- 局部引入注册部分组件
- 无需任何安装引入，直接使用单文件组件 `SFC`

  *使用单文件组件 `SFC` 时，请按需要引入如下所示组件库默认全局样式：*

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
