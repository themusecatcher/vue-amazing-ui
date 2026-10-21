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
- **字段之间不留空行**：接口内的分组语义由**字段顺序 + 行尾注释**表达，不用空行分段；全文件不保留连续空行。空行不承载语义，删掉不影响理解的一律删除（同类要求适用于 `{组件名}Slots`、类型对象与 `withDefaults` 默认值对象）。

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

## 主题样式约定

组件**不承担主题逻辑**：样式只消费 CSS 变量，没有主题 Hook、没有组件级主题注册表，也不自行派生颜色。

- 颜色只允许出现在两处：构建产物 `components/style/generated/theme.css`（40 个默认变量）与「按设计固定」的例外（见下）；
- 组件私有的结构色用 `--<comp>-*`（如 `--button-primary-color`）在自身 `<style>` 中声明，值必须是 `var(--va-*)` 或 `var(--va-cp-<component>-primary-*, var(--va-*))`；需要按实例覆盖时（如 `Button.color`）由脚本派生具体色值写到该私有变量上；
- **组件级主色桥**：组件内每一处「跟随主色」的消费都写成 `var(--va-cp-<component>-primary-*, var(--va-*))`（如 `var(--va-cp-switch-primary-color, var(--va-primary-color))`）。桥变量由 `ConfigProvider` 按 `theme.components.<Component>.primaryColor` 写在作用域节点上，组件不感知它的存在；未配置时回落到全局令牌，默认外观不变；
- 设计上不随主题变化的颜色保留字面量，不算主题泄漏：预设色板（`Tag` / `Badge` / `Timeline` / `Tooltip` / `GradientText` / `Result`）、深色 `Sider` / `theme="dark"` 的 `Menu`、`Image` 预览与 `Video` 播放器的固定 chrome、中性投影；遮罩一律用 `--va-mask-color`（不要用 `--va-text-color-3`，否则暗色下会变白蒙层）；
- 浮层经 Teleport 脱离组件树时，主题变量有两条下发路径：① 作用域令牌（全局 40 个 + 组件级桥 / 公开令牌）由 `ConfigProvider` 经 `THEME_TELEPORT_KEY` 写到浮层容器；② 组件私有的面板变量（如 `--picker-*`）随面板 `:style` 下发，值仍写 `var(--va-*)` / `var(--va-cp-*)` 引用，不做 JS 取色；
- 新增组件若消费主色，把消费点接上桥变量即可支持 `theme.components`，并在 `components/theme/component-vars.js` 的 `THEME_COMPONENTS` 登记（守护脚本会校验「登记了就必须有消费点」）；不消费主色的组件无需任何主题代码。`pnpm verify:theme` 会拦截回潮。

## 插槽检测 useSlotsExist

判断插槽是否被使用，用于条件渲染（如「仅图标」按钮）：

```ts
const slotsExist = useSlotsExist(['icon', 'default'])
const showIconOnly = computed(() => slotsExist.icon && !slotsExist.default)
```

## 告警与日志 log

组件与工具函数内**禁止直写 `console.*`**（由 `eslint.config.js` 的 `custom/no-console-in-components` 守护，仅出口文件放行），统一走 `components/utils/log.ts` 的单一出口：

```ts
import { log } from 'components/utils'

log(level, component, message, error?)
// level: 'warn' | 'error' | 'debug'
log('warn', 'BackTop', '未找到容器元素，滚动监听未启用')
log('error', 'Dialog', 'onOk 执行出错', err)
log('debug', 'position', '浮层精确尺寸测量失败，跳过位移取整', err)
```

选择规则：**级别即环境策略**，记一句话即可 —— `error` 线上可观测，`warn` / `debug` 仅开发期：

| level | 输出环境 | 适用场景 |
| :-- | :-- | :-- |
| `error` | 全环境 | 运行时失败：回调抛错、编码 / 绘制 / 读取失败等导致功能不可用的问题 |
| `warn` | 仅开发期 | 调用方式有误、入参被忽略、配置不生效等使用提醒 |
| `debug` | 仅开发期 | 预期内降级（跨域限制、测量失败、字体检测失败），库内已兜底、用户无需处理 |

- 输出结构固定为 `[vue-amazing-ui] {组件名或工具名}: {中文说明}`，前缀由出口拼装，组件内不要手写。
- 「开发期」指**最终构建 / 运行这份代码时的模式**（`NODE_ENV !== 'production'`），不是「库作者写代码期间」：库自身演示站与单测、第三方项目的 dev server 都算开发期；第三方项目的 build 产物算生产。同一份库产物在两种场景下表现不同，这是设计目的。
- **环境判定必须经 `components/utils/log.ts`（内部用 `process.env.NODE_ENV`），禁止手写 `import.meta.env.DEV`**：后者在库构建中会被内联为 `false`，导致使用方任何环境都收不到告警；前者原样保留在产物中（`dist` / `es` / `lib` 已核对），由使用方的打包工具按其自身环境替换。
- 不经打包工具直接引产物（`<script>` 引 `UMD` / `CDN`）时 `process` 不存在，按非开发环境处理，`warn` / `debug` 静默 —— 属该模式的已知限制。

## 样式规范

- Less + scoped，类名采用 BEM 风格前缀（如 `btn-wrap` / `btn-primary` / `btn-icon-only`）。
- 主题相关颜色**必须使用语义变量**，禁止硬编码主题色：

```less
.btn-primary {
  // 私有变量的默认值指向全局别名
  --button-primary-color: var(--va-primary-color);
  --button-primary-color-hover: var(--va-primary-color-hover);

  background-color: var(--button-primary-color);
  &:hover {
    background-color: var(--button-primary-color-hover);
  }
}
```

- 只有「按实例覆盖颜色」（如 `Button.color`）才在脚本里派生具体色值，并把值写到**组件私有变量**上；组件不得写入 `--va-*` 别名。

```vue
:style="buttonThemeStyle"
```

- 嵌套不超过 3 层。
- **行内控件与文字混排（2026-10-17 定）**：需要「文字 + 控件（`Input` / `Select` 等行内元素）」同处一行且位置稳定时，该行容器必须用**盒对齐**并固定行高，禁止用基线对齐：
  - 写法：容器 `display: flex; align-items: center;`，行高取控件高度（`small` 24 / `middle` 32 / `large` 40）；不得矮于控件，否则控件从行底溢出。
  - 原因：控件是行内元素，出现 / 消失会改变所在行盒的基线，`align-items: baseline` 的容器会因此产生 1px 级整行位移（原生控件同样如此，属 CSS 固有行为）。
  - 禁止用改控件自身 `vertical-align` 的方式消除该位移：那只是在「参与基线（与文字对齐最好、但会带动整行）」与「不参与基线（不带动整行、但控件内文字与相邻文字错开约 5px）」之间换一种缺陷，两者不可兼得。控件保持与原生输入框同口径的基线对齐。
- 组件内的 CSS 变量必须带**组件名前缀**（如 `--divider-border-color`、`--flex-align`；允许组件名的稳定缩写，如 `--float-btn-*`），避免与其它组件或宿主页面的同名变量相互污染；`va-` 前缀只用于对外暴露的全局命名（`components/style/global.less` 的 `--va-link-*` 与页面滚动锁写入 `<html>` 的 `--va-scrollbar-width`，后者由 `components/utils/dom.ts` 经 `html.style` 设置、消费方带 `0px` 兜底读取）。
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
| 业务组件，自身完全无样式 | `ConfigProvider` / `Highlight` / `NumberAnimation` / `PickerIcon` / `Watermark` | 登记在 `style-deps.ts` 的 `stylelessComponents` 白名单中：resolver 返回空 sideEffects，样式入口生成器跳过（自身样式入口不生成，但**与有自身 CSS 的组件共用产物目录**时，该目录的入口仍会产出，其中不得引用它的 `Xxx.css`） |
| 命令式 API 的 Provider | `MessageProvider` / `ModalProvider` / `DialogProvider` / `NotificationProvider` / `LoadingBarProvider` | 在 `styleSources` 中登记其底层组件（如 `MessageProvider: 'Message'`、`LoadingBarProvider: 'LoadingBar'`），与底层组件**共用同一个样式入口** |
| 子组件，样式定义在父 SFC 内 | `DescriptionsItem`（`Descriptions.vue`）、`SelectOption` / `SelectOptGroup`（`Select.vue`）、`MenuItem` / `MenuSubMenu` / `MenuItemGroup` / `MenuDivider`（`Menu.vue`） | 在 `styleSources` 中登记父组件（如 `DescriptionsItem: 'Descriptions'`、`MenuItem: 'Menu'`），否则 resolver 会指向并不存在的入口目录 |

> 新增无 `<style>` 块的 SFC 时，必须同步在 `components/utils/style-deps.ts` 中登记（白名单或 `styleSources`），
> 否则按需引入会引用不存在的样式入口。`tests/resolver.spec.ts` 会扫描 `components/**/*.vue` 自动校验登记完整性。

## 主题系统

- **配置面**：`components/theme/derive.ts` 中的 7 个颜色种子（`primary` / `success` / `warning` / `error` / `info` / `neutralText` / `neutralBg`），默认主色 `#1677ff`。
- **派生**：`components/theme/derive.ts`（单文件）按固定档位映射（`@ant-design/colors` 生成色阶 → 浅底 1 / 描边 3 / 链接悬停 4 / 悬停 5 / 常态与主色文字 6 / 按下 7）并组装 40 个变量，构建期与运行期共用；产物只含 sRGB `#hex` / `rgba()`。不做对比度兜底：品牌色偏浅时由使用者换色，而不是系统改写。
- **默认表**：`build/gen-theme.ts` 在 vite `buildStart` 生成 `components/style/generated/theme.css`（`:root` 浅色表 + `[data-va-mode='dark']` 暗色表，各 40 个变量；暗色表另带 `color-scheme: dark`，让原生滚动条与表单控件同步），由 `components/style/global.less` 以 `@import (inline)` 并入每份样式产物，因此按需引入天然携带默认表。
- **载体**：`ConfigProvider` 只做「合并种子 → 调派生 → 写作用域变量」。未传 `theme` 时不写任何变量；默认 `abstract=false`，写自己的包裹元素（SSR 可直接序列化，首帧即正确）；显式 `abstract=true` 的最外层实例写 `<html>`（`onMounted` 后，SSR 不执行）；卸载时恢复写入前的快照。
- **组件级主色**：`theme.components.<Component>.primaryColor` 只接受一个通用主色，Provider 用 `deriveColorStates` / `deriveFocusShadow` 展开成两组变量写到同一作用域节点：内部桥 `--va-cp-<component>-primary-*`（所有组件通用，覆盖该组件全部主色使用点）与注册表 `themeRole` 公开令牌（Button / Slider / Menu 的细粒度覆盖入口）。支持清单见 `component-vars.js` 的 `THEME_COMPONENTS`，未登记键开发环境告警；只配置组件、没有 `seed` / `mode` 的 `abstract=true` 实例不参与 `<html>` 写入权仲裁（需改用 `false` 或补全局主题）。
- **暗色**：`mode` 是派生入参而不是第二套种子；只切 `mode` 时只写 `data-va-mode`，由静态表接管；`mode="auto"` 监听 `prefers-color-scheme` 并在卸载时解除。
- **填充档位**：`--va-fill-color-1/2/3/4` 依次为三级 / 二级 / 最强 / 最淡的中性叠加，编号不代表强度；最淡的底纹与默认标签底用 `fill-color-4`，水印等需要更高可见度的默认色用 `fill-color-3`。
- **只读快照**：`provide(THEME_SNAPSHOT_KEY, snapshot)` 仅供 canvas / SVG / 第三方 JS 读取，禁止借它写行内变量。`Watermark` 是首个消费者：默认水印色取快照里的 `--va-fill-color-3`（浅色 .15 黑 / 暗色 .18 白），主题变化时重绘；无 Provider 时回退浅色默认。
- **文档一致性口径**：机械清单（组件令牌）由 `scripts/gen-component-vars-doc.js` 生成，`tests/component-vars.spec.ts` 逐字节守护，生成物需提交；`定制主题` 页的叙事段（颜色变量清单、已知限制的理由）手写、只保证结论正确，不做逐值自动化 —— 新增可枚举清单优先走生成，不要再手写第二张表。
- **取色出口**：公开 `derive(seed, mode)` 供 JS / canvas / SVG 场景取与 `--va-*` 逐值一致的结果；旧版色板 / 透明度色工具（`getColorPalettes` / `getAlphaColor`）已移除，焦点环所需的「等效半透明色」作为私有函数 `alphaOver` 留在 `theme/derive.ts`。
- **演示站 / 文档站的暗色**：两处的主题开关都直接驱动 `ConfigProvider.mode` —— 演示站改写 `src/theme.ts` 的共享 `theme`（`layouts/GlobalLayout.vue`），文档站把 VitePress 的 `useData().isDark` 映射成 `mode`（`docs/.vitepress/theme/index.ts`）；两处均不使用 `html.dark` + `filter: invert()` 模拟暗色（旧的 `toggleDark()` 工具函数已随本版本移除，暗色统一由 `mode` / `data-va-mode` 驱动）。
