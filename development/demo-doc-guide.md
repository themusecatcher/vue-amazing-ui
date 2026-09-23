# 演示与文档编写规范 Demo & Doc Guide

> 描述新增组件后需同步编写的对外配套：`src/views/` 演示页（`pnpm dev`）与 `docs/` 文档站（`pnpm docs:dev`）。
> 二者共同承载同一组用例，内容需保持一致。

## 演示页（src/views/）

### 目录结构

每个组件在 `src/views/` 下独占一个 **camelCase** 目录，内含两个文件：

```
src/views/button/
├── Index.vue   # 演示页面
└── index.ts    # 路由 meta（title）
```

### index.ts

只导出一个 `title`，被路由读取为页面标题（`meta.title`）：

```ts
export default {
  title: '按钮'
}
```

### Index.vue

演示页面结构约定：

```vue
<script setup lang="ts">
import { ref } from 'vue'
// 演示所需的响应式状态与逻辑
</script>
<template>
  <div>
    <h1>{{ $route.name }} {{ $route.meta.title }}</h1>
    <h2 class="mt30 mb10">按钮类型</h2>
    <Space>
      <!-- 组件示例 -->
    </Space>
  </div>
</template>
```

- `h1`：页面标题（`$route.name` + `$route.meta.title`）。
- `h2`：按功能分节（`mt30 mb10` 间距类）。
- 示例用 `<Space>` 等布局组件包裹。

### 全局包裹（src/App.vue）

演示应用在根组件做了一层全局包裹，这是演示页里能直接调用 `useMessage()` / `useModal()` 等方法的前提：

```text
ConfigProvider（theme 注入）
└── MessageProvider → ModalProvider → DialogProvider → NotificationProvider
    ├── RouterView（Watermark 页除外）
    ├── Watermark（content="Vue Amazing UI"）
    └── LoadingBar
```

- `ConfigProvider` 提供主题（`theme` 支持 `common.primaryColor` 与按组件覆盖）。
- 四个 `XxxProvider` 依次嵌套，使任意演示页内可直接使用对应的 `useXxx()`。
- 路由切换进度由 `LoadingBar` 与路由守卫（`beforeEach` / `afterEach`）联动。

> 文档站 `docs/.vitepress/theme/index.ts` 采用同构包裹，且整站组件库统一从构建产物 `dist/index` 引入——theme 以相对路径引入库主体与 `XxxProvider`，页面 demo 的 `import` 经解析钩子指向同一 `dist` 出口，二者共享同一 injection key（详见 [build-system.md](build-system.md) 的「别名与模块解析」）。

### 自动路由机制

`src/router/index.ts` 使用 `import.meta.glob` 在**编译时**收集所有演示页，无需手写路由：

```ts
const components = import.meta.glob('../views/**/Index.vue')
const modules = import.meta.glob('../views/**/index.ts', {
  eager: true, // 直接引入模块
  import: 'default' // 加载默认导出
})
```

- 路由 `path` 由目录路径推导（`/views/button/` → `/button`）。
- 路由 `name` 由路径转 PascalCase 拼接（`button` → `Button`）。
- `meta.title` 取自 `index.ts` 的默认导出。

> 因此新增演示只需在 `src/views/<camelCase>/` 下放 `Index.vue` + `index.ts` 两个文件，路由自动生效。

## 文档站（docs/）

### 组件文档位置与命名

组件文档位于 `docs/guide/components/<kebab-case>.md`，文件名与组件目录名一致（如 `auto-complete.md`）。

### 组件文档模板

新建组件文档请以 `docs/guide/template.md` 为模板，结构如下：

````md
# 按钮 Button

<GlobalElement />

_按钮用于开始一个即时操作_

## 何时使用

- 响应用户点击行为，触发相应的业务逻辑

<script setup lang="ts">
// 文档内联 demo 逻辑
</script>

## 基本使用

_七种类型_

<br/>

<Space>
  <Button>Default Button</Button>
</Space>

::: details Show Code

```vue
...可复制的完整代码...
```

:::

## APIs

### Button

参数 | 说明 | 类型 | 默认值
:-- | :-- | :-- | :--
...

## Slots

名称 | 说明 | 用法
:-- | :-- | :--
...

## Methods

名称 | 说明 | 类型
:-- | :-- | :--
...

## Events

名称 | 说明 | 类型
:-- | :-- | :--
...
````

约定：

- 标题 `# 中文名 ComponentName`（英文 PascalCase 名）。
- 顶部 `<GlobalElement />` 是文档页必备占位（注册全局组件）。
- 每个示例标题下用一行斜体 `_说明_` 描述。
- 可交互 demo 直接写在正文，用内联 `<script setup>` 提供响应式状态。
- 每个示例后接 `::: details Show Code` 折叠块，展示可复制的完整代码。
- 章节顺序统一为：何时使用 → 基本使用 → APIs → Slots → Methods → Events；参数表采用无首尾竖线的紧凑写法，与 `docs/guide/template.md` 保持一致。
- `update:xxx` 属于 `v-model` 双向绑定的更新事件，**不写入 Events 表**；双向绑定统一在 APIs 表的参数名后标注 `<Tag color="cyan">v-model</Tag>`（如 `open <Tag color="cyan">v-model</Tag>`），避免同一语义在两处重复维护。
- APIs / Events / Methods 表中的类型引用一律写**组件入口重命名后的公开导出名**（如 `SliderMarks`、`TabsItem`、`SwiperImage`），确保读者可直接 `import type`，且与 IDE 类型提示一致；类型章节标题保留 SFC 内的定义名（如 `### Marks Type`），锚点 `#marks-type` 不随引用名变更，避免全站链接失效。文档自造的结构性类型（源码中无对应导出，如 ConfigProvider 的 `Config`、Scrollbar 的 `ScrollBehavior`）沿用文档内命名。
- **`## Slots` 表的「用法」列写插槽的实际用法**：默认插槽 `v-slot:default`、具名插槽 `v-slot:xxx`、带作用域参数写 `v-slot:xxx="{ a, b }"`；❌ 不写 `-` / `{ option: T }` 这类「参数」列形态。列头固定为「名称 | 说明 | 用法」，与 `docs/guide/template.md` 一致；该列表达的是插槽**用法**（消费侧语法），不要与 APIs / Methods / Events 表的「类型」列（TS 类型 / 签名）混写。
- `## Slots` 表需与组件 `defineSlots` 的定义**逐项对应**（名称、是否有作用域参数）；插槽参数由 `v-bind` 动态展开、无法静态收窄时（如 `option`），用法列只写 `v-slot:option`。

### 示例代码风格约定（人工维护）

`docs/**/*.md` 是 VitePress 的 **md-as-SFC**（顶层 `<script setup>` 会被当作真实代码编译），因此**不能纳入 Prettier 格式化**——Prettier 按 markdown 语义处理会改写顶层模板（行首 `>` 被解析为引用块、标签失配），直接导致 `pnpm docs:build` 失败（详见 [build-system.md](build-system.md) 与 `.github/workflows/verify.yml` 文件头）。故示例代码风格由人工约定维持，`::: details Show Code` 折叠块内的代码需与正文 demo 保持同步，并遵循：

- **函数名与括号之间不留空格**：写 `function onClose(e: Event) {`，不写 `function onClose (e: Event) {`。
- **不使用尾逗号**（与 `.prettierrc.json` 的 `trailingComma: "none"` 一致）：数组 / 对象的最后一项后不加 `,`。
- **自闭合标签的 `/>` 前留一个空格**：写 `<br />`、`<ColorPicker :label="labelFormat" />`，不写 `<br/>`、`<ColorPicker :label="labelFormat"/>`。
- **组件属性较多时每行一个属性**，便于阅读与复制（如 `<AutoComplete>` 的多属性写法）。
- 其余写法与 `.prettierrc.json` 保持一致：二元运算符两侧留空格（`index === 2`）、十六进制颜色用小写（`#fff`）。

### 内联 demo 机制

文档页本质是 VitePress 的 Markdown + Vue 组合：

- `<GlobalElement />`：全局组件占位，由 `docs/.vitepress/theme/index.ts` 的 `enhanceApp` 注册。
- 正文直接使用组件库组件（已 `app.use(VueAmazingUI)` 全局注册）。
- 内联 `<script setup>` 写在正文中，为页面 demo 提供状态。

### 工具函数文档

位于 `docs/utils/functions/<kebab-case>.md`，结构：

````md
# 日期格式化 dateFormat

<GlobalElement />

_格式化日期为指定格式的工具函数_

::: details Show Source Code

```ts
// 完整源码
```

:::

<script setup lang="ts">
// 内联 demo 逻辑
</script>

## 基本使用
...

## Params

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
...

## Return

| 类型 | 说明 |
| --- | --- |
...
````

### 侧边栏维护

文档页写好后，需在 `docs/.vitepress/config.ts` 的 `sidebar` 中登记，否则页面不会出现在站点导航：

- 组件文档 → `sidebar['/guide/']` 的「组件」分组。
- 工具函数文档 → `sidebar['/utils/']` 的「工具」分组。

## 演示与文档的对应

演示页（`src/views/`）与组件文档（`docs/guide/components/`）内容需保持一致：文档中的 demo 通常对应演示页的某个分节，二者共同维护同一组用例。
