---
description: Amazing UI 组件库的核心特性——主题可调、按需引入、全量 TypeScript 与最新技术栈
---

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
- 目前共包含 `73` 个基础 `UI` 组件以及 `16` 个工具函数，并且持续探索更新中...
- 主题可调，你只需提供一个主题色，剩下的都交给我
- 顺便一提，它们全都可以 `treeshaking`
- `Vue Amazing UI` 全量使用 `TypeScript` 编写，和你的 `TypeScript` 项目无缝衔接
- 全部组件均采用单文件组件 `SFC`，可独立使用
- 所有组件已适配 `light` / `dark`，与文档站的明暗切换同源，切换即生效
- 开箱即用，不墨迹

## 主题系统

_组件库的核心能力：**种子 → 派生 → `CSS` 变量 → 组件消费**。`JS` 只算一次、写一次，染色全部交给 `CSS` 引擎，因此切主题不重建样式、不闪烁。_

| 想改什么 | 怎么改 | 粒度 |
| :-- | :-- | :-- |
| 品牌色与语义色（整套换色） | `ConfigProvider` 的 `theme.seed` | 全局 |
| 浅色 / 暗色 / 跟随系统 | `theme.mode` | 全局 |
| 某个组件的整套主色 | `theme.components.<组件>.primaryColor` | 组件组 |
| 某个组件的单个视觉面 | `--va-<组件>-*` 组件令牌 | 单点 |

```vue
<ConfigProvider :theme="{ seed: { primary: '#18a058' }, mode: 'dark' }">
  <Button type="primary">常态 / 悬停 / 按下 / 描边全部自动派生</Button>
</ConfigProvider>
```

- **默认即完整**：不传任何主题时使用构建期生成的静态变量表，首帧正确、`SSR` 可用、切暗色零 `JS`；
- **覆盖有层次**：`seed` → `components` → 组件令牌 → 实例 `prop` / 行内样式，越往后越局部；
- **浮层跟随**：`Teleport` 到 `body` 的弹窗 / 下拉 / 消息由库自动转发当前作用域令牌，无需手工处理。

详见[定制主题](/guide/customize-theme)，组件级令牌见[同页附录](/guide/customize-theme#组件级令牌与整组覆盖)。

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
// 组件库全局样式定义（主题变量表由构建期内联在此之上，为便于阅读此处省略）
*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}
body {
  -webkit-tap-highlight-color: transparent;
}
// 字体归位：库不在 body 上声明字体，字体由宿主决定（谁提供字体谁声明）；
// 库只兜底原生表单控件 —— 它们的字体不受继承影响（UA 样式强制 Arial / monospace 等），必须显式 inherit；
// 用 :where() 包裹使特异性为 0，使用方任意同名规则均可覆盖（不受样式加载顺序影响）
:where(input, textarea, select, button) {
  font-family: inherit;
}
:where(a) {
  color: var(--va-link-color);
  text-decoration: none;
  background-color: transparent;
  cursor: pointer;
  transition: color 0.3s;
  -webkit-text-decoration-skip: objects;
  &:hover {
    color: var(--va-link-color-hover);
  }
  &:active {
    color: var(--va-link-color-active);
  }
  &[disabled] {
    color: var(--va-text-color-disabled);
    cursor: not-allowed;
  }
}
```

`:where(a)` 是全库唯一的链接基座，颜色取语义变量 `--va-link-*`（默认值来自静态变量表，`ConfigProvider` 按种子派生后覆盖）；因外层包裹 `:where()` 而特异性为 `0`，使用方的任意链接样式都能覆盖它。主题请通过 [全局化配置 ConfigProvider](/guide/components/config-provider.html) 的 `theme.seed` 定制，插入光标等页面级样式由使用方在自己的页面样式中定义。

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
