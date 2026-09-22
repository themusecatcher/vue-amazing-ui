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

## 插槽类型（defineSlots）

插槽统一用 `defineSlots` 声明类型，并在 SFC 内导出 `interface <组件名>Slots`（如 `ButtonSlots`），使模板与 `$slots` 获得类型提示：

```ts
// components/button/Button.vue
export interface ButtonSlots {
  icon?: () => VNode[]
  default?: () => VNode[]
}
defineSlots<ButtonSlots>()
```

- 插槽类型名统一为 `<组件名>Slots`，可选插槽用 `?`。
- 该类型在 SFC 内 `export` 后**不经入口 / `components.ts` 对外导出**，仅供组件自身使用，不属于库的公开 API。

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

`message` / `modal` / `notification` / `dialog` / `loading-bar` 五个全局提示类组件采用「SFC + Hook + Provider」三段式，目录结构（以 message 为例，其余四个同构）：

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

入口汇总导出（`message/index.ts`）——`Provider` 与组件本体一样经 `withInstall` 包装，以支持 `app.use(MessageProvider)`：

```ts
import Message from './Message.vue'
import MessageProviderComp from './MessageProvider.vue'
import { withInstall } from '../utils/type'

export type { Props as MessageProps, MessageOptions, MessageReactive, MessageUpdate } from './Message.vue'
export type { MessageApi } from './useMessage'
export { useMessage } from './useMessage'

// 与普通组件一致，挂 install 以支持 app.use(MessageProvider) 单组件安装
export const MessageProvider = withInstall(MessageProviderComp)

export default withInstall(Message)
```

### createDiscreteApi

`components/discrete/createDiscreteApi.ts` 提供脱离组件树上下文的命令式 API（可在 axios 拦截器、路由守卫、Pinia action 中调用）。它创建独立 Vue 应用实例，依次包裹 `ConfigProvider` 与各 `XxxProvider`，内部通过「提取器」组件在 `setup` 中取出 api；主题采用 离散 API 形态，由调用方通过第二参 `configProviderProps`（及各 `XxxProviderProps`，支持 `Ref` / `computed` 响应式）显式传入，不依赖模块级全局状态。

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

## 单组件目录的辅助文件

单组件目录并非固定为「`Xxx.vue` + `index.ts`」两个文件，可按需在同一目录内增加辅助模块，例如：

```
components/modal/
├── Modal.vue           # 组件本体
├── ModalProvider.vue   # Provider
├── useModal.ts         # Hook
├── ModalRenderHost.ts  # 辅助模块（渲染宿主等内部实现细节）
└── index.ts            # 入口
```

## 无样式组件

组件库的样式一律写在 SFC 的 `<style lang="less" scoped>` 块内（唯一的独立样式文件是 `components/style/global.less`），因此「无样式组件」指的是 **SFC 内没有 `<style>` 块的组件**——按需引入时不能引用其并不存在的 `Xxx.css`。这类 SFC 分三种情况处理：

| 情况 | 组件 | 处理方式 |
| :--- | :--- | :--- |
| 业务组件，自身完全无样式 | `ConfigProvider` / `Highlight` / `NumberAnimation` / `Watermark` | 登记在 `style-deps.ts` 的 `stylelessComponents` 白名单中：resolver 返回空 sideEffects，样式入口生成器跳过 |
| 命令式 API 的 Provider | `MessageProvider` / `ModalProvider` / `DialogProvider` / `NotificationProvider` / `LoadingBarProvider` | 在 `styleSources` 中登记其底层组件（如 `MessageProvider: 'Message'`、`LoadingBarProvider: 'LoadingBar'`），与底层组件**共用同一个样式入口** |
| 子组件，样式定义在父 SFC 内 | `DescriptionsItem`（样式写在 `Descriptions.vue` 的 `<style>` 中） | 在 `styleSources` 中登记父组件（`DescriptionsItem: 'Descriptions'`），否则 resolver 会指向并不存在的入口目录 |

> 新增无 `<style>` 块的 SFC 时，必须同步在 `components/utils/style-deps.ts` 中登记（白名单或 `styleSources`），
> 否则按需引入会引用不存在的样式入口。`tests/resolver.spec.ts` 会扫描 `components/**/*.vue` 自动校验登记完整性。

## 主题系统

- **注入源头**：`ConfigProvider` 通过 `provide('common', ...)` / `provide('components', ...)` 注入主题，`theme` prop 支持 `common.primaryColor` 与按组件覆盖（如 `Button.primaryColor`）。
- **调色板**：`getColorPalettes(primaryColor)` → `@ant-design/colors` 的 `generate`，返回 10 级色阶。
- **阴影色**：`getAlphaColor(frontColor, bg)` → 基于 `@ctrl/tinycolor` 计算。
- **暗黑模式**：`toggleDark()` 工具函数一键切换。
- **全局变量**：`components/style/global.less` 定义 `--primary-color` 等基础变量。
