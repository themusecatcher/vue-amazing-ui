# 特性

<GlobalElement />

<Alert type="info" show-icon :bordered="false">
  <template #icon>
    <TeamOutlined />
  </template>
  <p style="font-size: 18px; font-weight: 600; color: #1677ff;">Join Me</p>
  <template #description>
    <p style="font-size: 16px;">
      如果您对 Vue Amazing UI 感兴趣，欢迎加入我，一起开发、维护和迭代组件库。您的贡献将帮助组件库不断的更新与完善，共同打造更 amazing 的 UI 组件库！
    </p>
  </template>
</Alert>

## 简要介绍

- 组件库采用 `Vue@{{ getVersion('vue') }}` + `TypeScript@{{ getVersion('typescript') }}` + `Vite@{{ getVersion('vite') }}` + `Less@{{ getVersion('less') }}` 实现！
- 目前共包含 `67` 个基础 `UI` 组件以及 `18` 个工具函数，并且持续探索更新中...
- 主题可调，你只需提供一个主题色，剩下的都交给我
- 顺便一提，它们全都可以 `treeshaking`
- `Vue Amazing UI` 全量使用 `TypeScript` 编写，和你的 `TypeScript` 项目无缝衔接
- 全部组件均采用单文件组件 `SFC`，可独立使用
- 部分组件样式尚未完美适配文档主题的 `dark` 暗黑模式，可切换 `light` 模式查看
- 开箱即用，不墨迹

## 使用方式

- 全局引入注册所有组件
- 全局引入注册部分组件
- 局部引入注册部分组件
- 无需任何安装引入，直接使用单文件组件 `SFC`

## 全局默认样式

_使用单文件组件 `SFC` 时，请按需要引入如下所示组件库全局默认样式：_

```less
// 组件库全局样式定义
*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  caret-color: transparent; // 消除 win 系统点击后出现插入光标闪烁的问题
}
:root {
  --primary-color: #1677ff;
  --primary-color-hover: #4096ff;
}
body {
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
  color: var(--primary-color);
  text-decoration: none;
  background-color: transparent;
  -webkit-tap-highlight-color: transparent;
  outline: none;
  cursor: pointer;
  transition: color 0.3s ease;
  &:hover {
    color: var(--primary-color-hover);
  }
}
```

<script setup lang="ts">
import { TeamOutlined } from '@ant-design/icons-vue'
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
