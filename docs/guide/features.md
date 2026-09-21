# 特性

<GlobalElement />

<Alert type="info" show-icon :bordered="false">
  <template #icon>
    <TeamOutlined />
  </template>
  <p style="font-size: 18px; font-weight: 600; color: #1677ff;">Join Me</p>
  <template #description>
    <p style="font-size: 16px;">
      如果您对
      <GradientText
        :size="18"
        :weight="600"
        :gradient="{
          deg: '90deg',
          from: '#09c8ce',
          to: '#eb2f96'
        }"
      >
        Vue Amazing UI
      </GradientText>
      感兴趣，欢迎加入我，一起开发、维护和迭代组件库。您的贡献将帮助组件库不断的更新与完善，共同打造更
      <GradientText
        :size="18"
        :weight="600"
        :gradient="{
          deg: '90deg',
          from: '#09c8ce',
          to: '#eb2f96'
        }"
      >
        Amazing
      </GradientText>
      的
      <GradientText
        :size="18"
        :weight="600"
        :gradient="{
          deg: '90deg',
          from: '#09c8ce',
          to: '#eb2f96'
        }"
      >
        UI
      </GradientText>
      组件库！
    </p>
  </template>
</Alert>

## 简要介绍

- 组件库采用 `Vue@{{ getVersion('vue') }}` + `TypeScript@{{ getVersion('typescript') }}` + `Vite@{{ getVersion('vite') }}` + `Less@{{ getVersion('less') }}` 实现！
- 目前共包含 `69` 个基础 `UI` 组件以及 `22` 个工具函数，并且持续探索更新中...
- 主题可调，你只需提供一个主题色，剩下的都交给我
- 顺便一提，它们全都可以 `treeshaking`
- `Vue Amazing UI` 全量使用 `TypeScript` 编写，和你的 `TypeScript` 项目无缝衔接
- 全部组件均采用单文件组件 `SFC`，可独立使用
- 部分组件样式尚未完美适配文档主题的 `dark` 暗黑模式，可切换 `light` 模式查看
- 开箱即用，不墨迹

## 使用方式

| 引入方式 | 特点 | 推荐度 |
| :-- | :-- | :-- |
| 全局完整注册所有组件 | 一次全量注册，引入即用，包体积最大 | <Tag color="error" size="small">不推荐</Tag> |
| 全局部分注册组件 | 手动注册需要的组件 | <Tag color="processing" size="small">按需</Tag> |
| 局部注册组件 | 单个组件内 `import` 后使用 | <Tag color="processing" size="small">按需</Tag> |
| 自动按需引入 | `unplugin-vue-components` 自动解析并导入组件与样式 | <Tag color="success" size="small">强烈推荐</Tag> |
| 单文件组件 `SFC` | 无需任何安装引入，直接使用组件源码 | — |

## 全局默认样式

_每个组件的样式入口（如 `import 'vue-amazing-ui/es/button/style'`）已内含下面的全局默认样式，无需单独引入（推荐使用[自动按需引入](/guide/import-on-demand#自动按需引入-强烈推荐)）：_

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
