# 演示与文档编写规范 Demo & Doc Guide

> 描述新增组件后需同步编写的对外配套：`src/views/` 演示页（`pnpm dev`）与 `docs/` 文档站（`pnpm docs:dev`）。二者共同承载同一组用例，内容需保持一致。

## 演示页（src/views/）

### 目录结构

每个组件在 `src/views/` 下独占一个 **kebab-case** 目录，内含两个文件：

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

可选 `backTop: false`：关闭外壳（`src/layouts/GlobalLayout.vue`）自带的 `BackTop`，用于页面内自带回到顶部的演示（如 `back-top`、`config-provider` 两个页面）；字段类型见 `types/router.d.ts`。

```ts
export default {
  title: '回到顶部',
  backTop: false
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

### 状态绑定（每个演示主题独立）

> 每个分节的 demo 必须绑定**自己的**响应式状态，禁止多个主题共用同一个绑定值。

```ts
// ❌ 基本使用 / 禁用 / 禁用选项 … 共用一个 selectedValue
// ✅ 各分节独立绑定：避免操作一个用例时其余用例同步联动，便于单独核对每个特性
const basicValue = ref(5)
const disabledValue = ref(5)
const disabledOptionValue = ref(5)
```

- **为什么**：共用绑定值会让「操作 A 用例时 B / C 用例同步联动」——用户无法逐个核对特性，截图 / 录屏 / 实机对照也会失真。
- **命名**：与主题语义对齐（`basicValue` / `disabledValue` / `searchableValue` …），多个主题并列时在首个变量前加一行注释说明（见上例）。
- **例外**：**同一主题内**的成对用例可共用（如「三种尺寸」的多个 Select、「下拉面板弹出位置」的 bottom / top 对照），它们是同一用例的对照展示。
- **文档页同源**：`docs/guide/components/{组件名}.md` 的页面级 `<script setup>` 需与演示页逐项对应（见「演示与文档的对应」）；`::: details Show Code` 代码块是独立可复制示例，块内用局部命名（如 `selectedValue`）不受此约束。

### 全局包裹（src/App.vue）

演示应用在根组件做了一层全局包裹，这是演示页里能直接调用 `useLoadingBar()` / `useMessage()` / `useModal()` 等方法的前提：

```text
ConfigProvider（theme 注入）
└── LoadingBarProvider → MessageProvider → ModalProvider → DialogProvider → NotificationProvider
    ├── RouterView（Watermark 页除外）
    └── Watermark（content="Vue Amazing UI"）
```

- `ConfigProvider` 提供主题（`theme` 支持 `seed` 颜色种子与 `mode` 模式；组件级覆盖改用嵌套作用域）；布局层主题开关直接改写 `src/theme.ts` 的 `mode`，页面底板两种模式都取 `--va-bg-container-color`（浅色 `#fff` / 暗色 `#141414`，与组件容器表面同源），卡片始终用容器色。
- 五个 `XxxProvider` 依次嵌套，使任意演示页内可直接使用对应的 `useXxx()`。
- 路由切换进度**不**复用上面这个 `LoadingBarProvider`：路由守卫位于组件树之外，改由 `createDiscreteApi(['loadingBar'])` 创建独立实例（`src/router/index.ts` 中惰性单例），并通过 `src/theme.ts` 与根组件共享同一份主题。

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
- 路由 `name` 由路径转 PascalCase 拼接（`button` → `Button`；缩写词片段整体大写，如 `qr-code` → `QRCode`，与组件对外名一致）。
- `meta.title` 取自 `index.ts` 的默认导出。

> 因此新增演示只需在 `src/views/<kebab-case>/` 下放 `Index.vue` + `index.ts` 两个文件，路由自动生效。

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

### Button Props

| 名称 | 说明 | 类型 | 默认值 |
| :--- | :--- | :--- | :----- |

...

### ButtonItem Type

<!-- 类型章节标题 = 属性表引用的公开导出名 + ` Type`；接口 4 列 / 组件产出回调 3 列 / 别名 2 列，按结构取舍 -->

| 名称 | 说明 | 类型 | 默认值 |
| :--- | :--- | :--- | :----- |

...

## Slots

| 名称 | 说明 | 用法 |
| :--- | :--- | :--- |

...

## Methods

| 名称 | 说明 | 类型 |
| :--- | :--- | :--- |

...

## Events

| 名称 | 说明 | 类型 |
| :--- | :--- | :--- |

...

## CSS 变量

<!-- 可选章节：仅组件暴露主题变量时添加；固定 3 列，首列「名称」写 --va-<组件>-* 全名 -->

| 名称 | 说明 | 默认值 |
| :--- | :--- | :--- |

...
````

约定：

- 标题 `# 中文名 ComponentName`（英文 PascalCase 名）。
- 顶部 `<GlobalElement />` 是文档页必备占位（注册全局组件）。
- 斜体说明句统一用**下划线**包裹：顶部描述写 `_中文名用于……_`，每个示例标题下用一行 `_说明_` 描述；❌ 不写 `*说明*`（两种写法渲染等价，但历史上混用过，统一为下划线形态；`docs/**` 不纳入 Prettier，故该写法是稳定的）。
- 可交互 demo 直接写在正文，用内联 `<script setup>` 提供响应式状态。
- 每个示例后接 `::: details Show Code` 折叠块，展示可复制的完整代码。
- 章节顺序统一为：何时使用 → 基本使用 → APIs → Slots → Methods → Events → CSS 变量（可选，仅组件暴露主题变量时）；表格一律**带首尾竖线**（`| 名称 | 说明 | 类型 | 默认值 |`，2026-10-23 修订：原「无首尾竖线的紧凑写法」在增删列时易错位，实测两种写法渲染一致，新写/改动的表按新格式、存量不追溯）；**全部表格首列统一「名称」**（❌ 不写「参数 / 字段 / 属性名」），详见 §表格规范速查。
- `update:xxx` 属于 `v-model` 双向绑定的更新事件，**不写入 Events 表**；双向绑定统一在 APIs 表的参数名后标注 `<Tag color="cyan">v-model</Tag>`（如 `open <Tag color="cyan">v-model</Tag>`），避免同一语义在两处重复维护。
- **必填 prop 用 `required` 标签标识**（2026-10-23 新增）：`value <Tag color="red">required</Tag>`，与 `v-model` 标签同款；两者并存时顺序固定 `v-model` 在前、`required` 在后（`value <Tag color="cyan">v-model</Tag> <Tag color="red">required</Tag>`）。默认值列同时写 `—`（标签给扫读、`—` 给精确语义）。⚠️ 只在**真必填**时使用（源码 `required: true`，或缺该 prop 组件无法工作），可选 prop 即便业务上常用也 ❌ 不加，否则标签贬值。
- APIs / Events / Methods 表中的类型引用一律写**组件入口重命名后的公开导出名**（如 `SliderMarks`、`TabsItem`、`SwiperImage`），确保读者可直接 `import type`，且与 IDE 类型提示一致；**类型章节标题同样使用该公开导出名**（如 `### SliderMarks Type`，锚点 `#slidermarks-type`），使目录、链接文字、`import type` 三者一致。⚠️ 2026-10-23 修订：原规定「标题保留 SFC 内定义名、锚点不随引用名变更」，实测导致 39 处类型标题与读者点击的链接文字不一致（占 87 个类型标题的 45%，如 `TabsItem` → `### Item Type`），且 `Item Type` / `Option Type` / `Image Type` 在多组件重复，目录树与页内查找无法定位；改名须同步该文件内全部 `#xxx-type` 锚点。文档自造的结构性类型（源码中无对应导出，如 ConfigProvider 的 `Config`、Scrollbar 的 `ScrollBehavior`）沿用文档内命名，但加组件前缀避免跨页重名。
- **`## Slots` 表的「用法」列写插槽的实际用法**：默认插槽 `v-slot:default`、具名插槽 `v-slot:xxx`、带作用域参数写 `v-slot:xxx="{ a, b }"`；❌ 不写 `-` / `{ option: T }` 这类「参数」列形态。列头固定为「名称 | 说明 | 用法」，与 `docs/guide/template.md` 一致；该列表达的是插槽**用法**（消费侧语法），不要与 APIs / Methods / Events 表的「类型」列（TS 类型 / 签名）混写。
- `## Slots` 表需与组件 `defineSlots` 的定义**逐项对应**（名称、是否有作用域参数）；插槽参数由 `v-bind` 动态展开、无法静态收窄时（如 `option`），用法列只写 `v-slot:option`。
- **表格内禁止裸对象字面量**：APIs / Events 等表格单元格里直接写 `{ label: 'label' }` 会被 markdown 的属性语法当作前一个标签的 HTML 属性（渲染成 `<td ... label:="" ...>`），轻则单元格内容丢失，重则同名属性重复让 `pnpm docs:build` 直接失败（报 `Duplicate attribute`）。对象字面量一律用行内代码包裹：`` `{ label: 'label', value: 'value' }` ``。

### 表格规范速查（2026-10-23 制定）

> 背景：全量盘点 73 个组件文档 346 张表格后发现口径长期漂移——`## APIs` 下首列「参数 / 名称」5:5 分裂（Props 表 84 张用「参数」、类型表 65 张用「名称」），类型表存在 4 种形态，39 处类型标题与属性表引用的公开名不一致（占 87 个类型标题的 45%）。以下为唯一标准。

| 表 | 列头 | 备注 |
|:--|:--|:--|
| 组件 Props（`### {组件名} Props`） | 名称 \| 说明 \| 类型 \| 默认值 | 名称列**不写 `?`**；必填用 `<Tag color="red">required</Tag>` 标签 + 默认值列 `—` 双标记 |
| 类型表 · 接口 / 对象结构 | 名称 \| 说明 \| 类型 \| 默认值 | 可选字段名后加 `?`，与源码 `interface` 逐字段一致 |
| 类型表 · 组件产出的回调 / 实例 | 名称 \| 说明 \| 类型 | 字段全由组件填写，无「默认值」维度 |
| 类型表 · 别名 / 联合 / 枚举 | 名称 \| 值 | ❌ 不硬套四列（会留下两列恒空） |
| `## Slots` | 名称 \| 说明 \| 用法 | 用法列写 `v-slot:xxx` |
| `## Methods` / `## Events` | 名称 \| 说明 \| 类型 | 类型列写完整签名，❌ 不写 `Function` |
| 工具函数 `## Params` | 名称 \| 说明 \| 类型 \| 默认值 | 首列同为「名称」 |
| 工具函数 `## Return` | 纯函数：`类型 \| 说明`；composable：`名称 \| 说明 \| 类型` | 按语义分流，不追求列数统一（纯函数无「名称」维度） |
| `## CSS 变量` | 名称 \| 说明 \| 默认值 | 名称列写 `--va-<组件>-*` 全名。主清单 `docs/guide/parts/component-vars.md` 由 `scripts/gen-component-vars-doc.js` 生成，改表头须改生成器后重新生成 |
| `## 自定义样式`（DOM 类名） | 名称 \| 说明 | 首列写类名，列头仍用「名称」；❌ 不加「层级 / 对应配置项」等自拟列 |

- **标题**：组件用 `### {组件名} Props`（复合组件逐子组件，如 `### Descriptions Props` / `### DescriptionsItem Props`），类型用 `### {公开导出名} Type`；两者平级，读者一眼区分「组件属性 / 数据类型」。
- **类型表位置**：紧跟**唯一引用它的表格**所在章节——只被 `## Methods` 引用的就放 `## Methods` 下（如 `scrollbar` 的 `ScrollBehavior`），只被某个 Props 表引用的紧随其后；被多处引用的下沉到 `## APIs` 末尾。判定口径：读者读到引用点就能往下找到定义。
- **默认值列**：有缺省写 TS 字面量（`false` / `[]` / `'top'`）；可选未传写 `undefined`；必填 / 无缺省写 `—`（em dash，❌ 不用 ASCII `-`，与表格分隔线混淆）。
- **转义**：联合类型统一 `&#124;`；单元格内禁裸对象字面量（用反引号包裹）；表头不得截断（`默认值` 不写成 `默认`）。
- **行序**：Props 表 ≡ 源码 `Props` 声明顺序（六段式分组）；类型表 ≡ `interface` 字段顺序。
- **存量**：不追溯，随本次改动逐步收敛；新增 / 重写的表必须合规。优先收敛顺序：① 首列「参数」→「名称」② 类型标题 → 公开导出名（同步锚点）③ 组件标题补 ` Props` ④ 必填 prop 补 `required` 标签。

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

| 名称 | 说明 | 类型 | 默认值 |
| ---- | ---- | ---- | ------ |

...

## Return

| 类型 | 说明 |
| ---- | ---- |

...
````

### 侧边栏维护

文档页写好后，需在 `docs/.vitepress/config.ts` 的 `sidebar` 中登记，否则页面不会出现在站点导航：

- 组件文档 → `sidebar['/guide/']` 的「组件」分组。
- 工具函数文档 → `sidebar['/utils/']` 的「工具」分组。

## 演示与文档的对应

演示页（`src/views/`）与组件文档（`docs/guide/components/`）内容需保持一致：文档中的 demo 通常对应演示页的某个分节，二者共同维护同一组用例。

- 用例标题 / 简介描述：逐字一致（`<code>` ↔ 反引号、docs 补整行斜体）。
- 分节的状态绑定：演示页的 `ref` 与文档页级 `<script setup>` 的 `ref` **逐项对应**（见「状态绑定（每个演示主题独立）」），改一处必须同步另一处——否则两边联动行为不一致。
