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

## 注释规范

- **组件 SFC（`.vue`）内的函数**：用中文块注释描述「做什么 / 为什么」，**不写 `@param` / `@returns`** —— 私有函数的参数语义由签名与函数名表达，注释里再写一遍只会与签名漂移；需要补充某入参语义时写进描述句或调用点行内注释。
- **`components/utils/` 的导出函数**：按 TSDoc 写 `@param name - 说明` / `@returns 说明`，**类型由签名承接，禁止 `@param {type}` 这类重复标注**。
- 字段注释：`interface Props` 的每个字段、`{组件名}Slots` 的每个插槽必须带中文注释（见上文「Props 定义规范」「插槽类型」）。

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
- 组件内的 CSS 变量必须带**组件名前缀**（如 `--divider-border-color`、`--flex-align`；允许组件名的稳定缩写，如 `--float-btn-*`），避免与其它组件或宿主页面的同名变量相互污染；`va-` 前缀只用于 `components/style/global.less` 中对外暴露的全局命名（`--va-link-*`）。
- **厂商前缀（2026-10-01 定）**：源码中手写的 `-webkit-` / `-moz-` / `-ms-` 前缀是**有意保留**的，禁止以「去冗余」「消除 IDE 的 `vendorPrefix` 提示」为由批量删除：
  - 本库以 SFC 形态分发，组件文件可能被使用方**单独复制**到自己的项目中使用，此时样式由**使用方的构建链**编译。`autoprefixer` 在 Vite 生态中并非默认必备（需使用方自行安装并配置 `postcss.config.js`），其 `browserslist` 也未必与本库（见 `package.json`）一致 —— 手写前缀是这条「源码分发」路径上唯一的兼容兜底。
  - `autoprefixer` 只补齐它认识的属性：`-webkit-box-orient`、`display: -webkit-inline-box`、`-webkit-tap-highlight-color`、`::-webkit-scrollbar*`、`-webkit-line-clamp` 均不在其处理范围内，删除即等于放弃对应兼容（如 `Ellipsis` 的多行截断会在 Safari < 18.2 失效）。这类**无标准等价物**的前缀属不可替代写法，保持原样。
  - 库构建时 `autoprefixer` 的角色是「补齐」而非「清理」：按 `package.json` 的 `browserslist` 实测，产物会在手写的 `-webkit-user-select` 之外补出 `-moz-user-select`；而在「标准属性在前、前缀属性在后」的书写顺序下，手写的 `-webkit-animation` 等会原样保留进 `es` / `lib` 产物。手写前缀与构建期前缀是**互补**关系，不是重复。
  - 新增样式时：**有标准等价物的一律成对写**，标准属性在前（如 `line-clamp: 3;` + `-webkit-line-clamp: 3;`）；没有标准等价物的（如 `-webkit-box-orient`）保持现状，并保证配套依赖完整（`display: -webkit-inline-box` + `-webkit-box-orient: vertical` + `-webkit-line-clamp` 三者必须同时存在）。
  - IDE 报 `Also define the standard property 'line-clamp' for compatibility` 时，正确处置是**补上标准属性**，而不是删掉前缀。
- 字体口径（2026-09-30 定，2026-10-01 补齐承接与档位；落地文件：`components/style/global.less` + `components/utils/inherit-font.ts` + 各组件样式）：
  - **字体族**：库**不**在 `body` / `html` 上声明字体，组件内也**不声明字体族**（字体归宿主，「谁提供字体谁声明」），内置组件不得依赖库级字体声明；确因字形需要写死的（如 `Pagination` 的省略号装饰字符），必须就地注释说明依据。原生表单控件因浏览器 UA 样式**不继承**页面字体，统一由 `components/style/global.less` 的 `:where(input, textarea, select, button) { font-family: inherit }` 兜底（该规则为库级全局规则，会作用于宿主页面上的同名原生控件；`:where()` 使特异性为 0 —— 库只提供默认值，使用方任何同名规则均可覆盖，避免「库规则与宿主规则同特异性、胜负取决于加载顺序」）。
  - **浮层承接**：既然库不声明字体族，`Teleport` 到 `body` 的浮层（未命中承载层时）便脱离宿主字体继承链 → 由 `components/utils/inherit-font.ts` 的 `useInheritAnchorFont(anchor, container, visible)` 在每次「出现」时把**锚点的计算字体族**复制到浮层容器上（只承接 `font-family`，不承接字号；写在容器而非面板，面板自身的字体声明仍可覆盖它）。新增**带锚点的浮层容器**（现已覆盖 `Popup` / `Select` / `AutoComplete`）时须调用它一并承接；无锚点的容器（`Modal` / `Drawer` / `Dialog`）没有可靠的字体来源，改用 `to` 指向宿主字体容器（见 `docs/guide/customize-theme.md`）。
  - **字号**：**呈现型文本必须显式声明 `font-size`**（组件根给出该组件的默认字号，逐元素按需覆盖），**禁止依赖宿主继承**。内容归属判定：文本由使用者传入、且组件**未为其提供视觉规格**的纯文本包装组件（如 `Ellipsis`）必须显式写 `font-size: inherit`；而容器类组件（`Card` / `Alert` / `Descriptions` / `Timeline` / `Collapse`）与**浮层面板内的内容**（如 `Popover`，字号由面板规格决定）已提供视觉规格，由容器根声明字号，**不**改为 `inherit`。⚠️ `Highlight` / `NumberAnimation` 属**无样式组件**（`tests/resolver.spec.ts` 有断言守护），不得为其新增 `<style>` 块，其隐式继承即为正确行为。
  - **字号档位**：正文基准 `14px`；辅助 `12px`；组件标题 / `large` 尺寸 `16px`（`16px` 不得用于正文）；展示型大标题 `20px` / `24px`；装饰性字号（图标微调 `10px`、`font-size: 0` 消隙）必须注释用途。**同一 `size` 档位（`small` / `middle` / `large`）在同类语义下必须取同值**。
  - 审计口径（抽查新增组件时可用）：把宿主 `body` 的字号扰动为 `20px`，组件内自绘文本的计算字号**不得变化**；字体族同理（扰动宿主字体，库内自绘文本随宿主变化是预期行为）。
  - 字体的「可配置性」由宿主的页面字体声明提供，**不进 `ConfigProvider.theme`**（该通道只承载颜色，见「主题系统」）。

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
import { useMessage as useMessageImpl } from './useMessage'
import { withInstall } from '../utils/type'

export type { Props as MessageProps, MessageOptions, MessageReactive, MessageUpdate } from './Message.vue'
export type { MessageApi } from './useMessage'
// 经本地常量再导出（同 select）：纯 `export { useMessage } from './useMessage'` 会被 Rollup 转发优化
// 剔除该具名导出，致产物 index.js 缺它、而 index.d.ts 仍有声明（类型与运行时不一致）
export const useMessage = useMessageImpl

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
| 子组件，样式定义在父 SFC 内 | `DescriptionsItem`（`Descriptions.vue`）、`SelectOption` / `SelectOptGroup`（`Select.vue`）、`MenuItem` / `MenuSubMenu` / `MenuItemGroup` / `MenuDivider`（`Menu.vue`） | 在 `styleSources` 中登记父组件（如 `DescriptionsItem: 'Descriptions'`、`MenuItem: 'Menu'`），否则 resolver 会指向并不存在的入口目录 |

> 新增无 `<style>` 块的 SFC 时，必须同步在 `components/utils/style-deps.ts` 中登记（白名单或 `styleSources`），
> 否则按需引入会引用不存在的样式入口。`tests/resolver.spec.ts` 会扫描 `components/**/*.vue` 自动校验登记完整性。

## 主题系统

- **注入源头**：`ConfigProvider` 通过 `provide('common', ...)` / `provide('components', ...)` 注入主题，`theme` prop 支持 `common.primaryColor` 与按组件覆盖（如 `Button.primaryColor`）。
- **调色板**：`getColorPalettes(primaryColor)` → `@ant-design/colors` 的 `generate`，返回 10 级色阶。
- **阴影色**：`getAlphaColor(frontColor, bg)` → 基于 `@ctrl/tinycolor` 计算。
- **暗黑模式**：`toggleDark()` 工具函数一键切换。
- **主题色来源**：组件经 `useInject(组件名)` 读取 JS 调色板（`components/utils/hooks.ts`），默认主色 `#1677ff` 定义在 `useInject` 内；`components/style/global.less` 不定义全局主题变量，主题色统一由 `ConfigProvider` 的 `theme` 定制。
- **CSS 变量输出**：`common` 主色的色阶写入 `--va-link-color` / `--va-link-color-hover` / `--va-link-color-active`（取色阶第 6 / 4 / 7 级），供链接基座 `:where(a)` 消费。**默认全局生效**：最外层实例（父链上没有其他 `ConfigProvider` 注入过 `common`）把色阶写到 `:root`，页面所有链接随主题色一并变化，卸载时移除变量、回落样式表内的 fallback 默认值；**嵌套实例只在自身子树内生效**：带包裹元素（`abstract` 为 `false`）的实例把色阶写到自身包裹元素上，链接基座逐级向上取值、就近命中 —— 因此嵌套实例想在自己的范围内改变链接配色需采用该形态，且不影响外层。
