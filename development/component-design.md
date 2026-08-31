# 组件设计规范 Component Design

> 描述单个组件的实现约定：SFC 结构、Props 定义、样式、主题、函数式组件等模式。

## SFC 结构骨架

组件统一为单文件组件（SFC），三段式结构：

```vue
<script setup lang="ts">
// 逻辑
</script>
<template>
  <!-- 模板 -->
</template>
<style lang="less" scoped>
/* 样式 */
</style>
```

- `<script setup lang="ts">`：组合式 API，全量 TypeScript。
- `<style lang="less" scoped>`：Less 预处理器，scoped 作用域。

## Props 定义规范

Props 在 SFC 内以 `interface Props` 定义，配合 `withDefaults` 声明默认值：

```ts
export interface Props {
  type?: 'default' | 'primary' | 'danger' // 设置按钮类型
  size?: 'small' | 'middle' | 'large'      // 设置按钮尺寸
  disabled?: boolean                       // 是否禁用
}
const props = withDefaults(defineProps<Props>(), {
  type: 'default',
  size: 'middle',
  disabled: false
})
```

约定：

- 接口名统一为 `Props`，并通过 `export` 导出（供入口转出为 `XxxProps`）。
- 每个字段必须带**中文注释**（文档与类型提示共用）。
- 联合类型直接内联在接口中（`'small' | 'middle' | 'large'`），可选字段用 `?`。

## 类型导出约定

- 主类型：`interface Props`，导出后由 `components.ts` 重命名为 `<组件名>Props`。
- 子类型：命名 `<组件名><语义>`，如 `AutoCompleteOption`、`CalendarDateItem`，在 SFC 内定义并 `export`。

## 事件（emit）

用 `defineEmits` 声明事件，必要时带类型：

```ts
const emit = defineEmits(['click'])
// 或带类型
const emit = defineEmits<{
  (e: 'change', value: string): void
}>()
```

## 主题注入 useInject

组件通过 `useInject` 获取主题色，无需自行处理主题传递：

```ts
import { useInject } from 'components/utils'
const { colorPalettes, shadowColor } = useInject('Button') // 组件名作为 key
```

- `colorPalettes`：由主色生成的 10 级调色板（`@ant-design/colors` 的 `generate`）。
- `shadowColor`：由主色派生的阴影色。
- `key` 传组件名，用于匹配 `ConfigProvider` 中该组件的个性化主题。

## 插槽检测 useSlotsExist

判断插槽是否被使用，用于条件渲染（如「仅图标」按钮）：

```ts
const slotsExist = useSlotsExist(['icon', 'default'])
const showIconOnly = computed(() => slotsExist.icon && !slotsExist.default)
```

## 样式规范

- Less + scoped，类名采用 BEM 风格前缀（如 `btn-wrap` / `btn-primary` / `btn-icon-only`）。
- 主题相关颜色**必须使用 CSS 变量**，禁止硬编码主题色：

```less
.btn-primary {
  background-color: var(--button-primary-color);
  &:hover {
    background-color: var(--button-primary-color-hover);
  }
}
```

- CSS 变量在模板中通过内联 style 注入（源于 `colorPalettes`）：

```vue
:style="`
  --button-primary-color: ${colorPalettesComputed[5]};
  --button-primary-color-hover: ${colorPalettesComputed[4]};
`"
```

- 嵌套不超过 3 层。

## 函数式 / 全局组件模式

`message` / `modal` / `notification` 三个全局提示类组件采用「SFC + Hook + Provider」三段式，目录结构：

```
components/message/
├── Message.vue          # 组件本体（含 Props 类型、Message/MessageReactive 类型）
├── MessageProvider.vue  # Provider：provide api
├── useMessage.ts        # useMessage Hook + MessageApi 类型 + injection key
└── index.ts             # 汇总导出（Message + MessageProvider + useMessage）
```

职责划分：

| 文件 | 职责 |
| :--- | :--- |
| `Message.vue` | 渲染与交互，`defineEmits(['ready'])` 就绪后回调 api |
| `useMessage.ts` | 定义 `MessageApi` 接口与 injection key，`useMessage()` 通过 `inject` 取 api |
| `MessageProvider.vue` | `provide` api 占位实现，子组件就绪后用真实实现覆盖 |

入口汇总导出（`message/index.ts`）：

```ts
import Message from './Message.vue'
import MessageProviderComp from './MessageProvider.vue'
import { withInstall } from '../utils/type'

export type { Props, Message } from './Message.vue'
export type { MessageApi } from './useMessage'
export { useMessage } from './useMessage'
export const MessageProvider = withInstall(MessageProviderComp)
export default withInstall(Message)
```

### createDiscreteApi

`components/discrete/createDiscreteApi.ts` 提供脱离组件树上下文的命令式 API（可在 axios 拦截器、路由守卫、Pinia action 中调用）。它创建独立 Vue 应用实例，依次包裹 `ConfigProvider` 与各 `XxxProvider`，内部通过「提取器」组件在 `setup` 中取出 api；主题取自 `_internal/theme-snapshot` 模块级快照。

## 复合组件模式

`Descriptions` / `Grid` / `List` 等一个目录对应多个组件：

```
components/grid/
├── row/
│   ├── Row.vue
│   └── index.ts
├── col/
│   ├── Col.vue
│   └── index.ts
└── index.ts        # 汇总导出 Row + Col
```

## 无样式组件

`ConfigProvider` / `Highlight` / `NumberAnimation` / `Watermark` 无独立 CSS 文件，需在 `resolver.ts` 的 `getSideEffects` 白名单中登记，按需引入时不携带组件 CSS。

## 主题系统

- **注入源头**：`ConfigProvider` 通过 `provide('common', ...)` / `provide('components', ...)` 注入主题，`theme` prop 支持 `common.primaryColor` 与按组件覆盖（如 `Button.primaryColor`）。
- **调色板**：`getColorPalettes(primaryColor)` → `@ant-design/colors` 的 `generate`，返回 10 级色阶。
- **阴影色**：`getAlphaColor(frontColor, bg)` → 基于 `@ctrl/tinycolor` 计算。
- **暗黑模式**：`toggleDark()` 工具函数一键切换。
- **全局变量**：`components/style/global.less` 定义 `--primary-color` 等基础变量。
