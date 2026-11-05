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
- 示例用 `<Space>` 等布局组件包裹；「控制行在上、演示在下」一律用 `<Flex vertical>` 合并成一块（见下节「表单与演示的纵向布局」）。

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
- **跨分节共用是红线**（2026-11-05 新增）：同一个 `v-model` / 状态变量不得出现在两个及以上分节（docs 的 `## ` / `### `、views 的 `<h2>`），由 `pnpm verify:docs` 第 ③ 项校验；**同一分节内**的成对对照仍可共用（见上条「例外」）。教训：`spin` 曾用 12 个分节共用 `spinning`，改一处开关会联动整页。

### 表单与演示的纵向布局（2026-11-05 新增）

分节内出现「参数控制行在上、演示用例在下」时，两者必须包在**同一个** `<Flex vertical>` 里，纵向间距由 `Flex` 的默认 `gap`（`middle` = 16px）提供：

```vue
<h2 class="mt30 mb10">大小</h2>
<Flex vertical>
  <Flex gap="small" align="center">
    size：<RadioGroup :options="sizeOptions" v-model:value="size" button button-style="solid" />
  </Flex>
  <Tabs v-model:active-key="sizeActiveKey" :size="size">…</Tabs>
  <Tabs v-model:active-key="sizeActiveKey" :size="size" type="card">…</Tabs>
</Flex>
```

- 控制行自身仍是水平行（`<Flex gap="small" align="center">` / `<Space align="center">`），外层再套 `<Flex vertical>` 与演示合成一个纵向块；同一行有多个控件时也用这个水平容器隔开，❌ 不用空 `<span class="demo-divider">` 之类靠 margin 撑位的占位元素。
- ❌ 不用 `class="mb10"` / `<br /><br />` / `style="margin-bottom: 16px"` 手工撑「控制行 → 演示」的间距：控制行换行、演示组件自带外边距时会失配，也看不出两者的从属关系。
- 同方向的多个演示（对照用例）一并放进这个 `<Flex vertical>`，与配置器（`<Flex gap="large" vertical>` 包 `Row` + 演示）保持同一形态。
- 演示产生的结果文案（「最近操作：…」「最近事件：…」）留在 `<Flex vertical>` 之外，沿用 `class="mt10"`。
- `docs/` 同源写法：控制行放进演示所在的 `<Flex vertical>` 内；`<br/>` 只用于「说明文字 → 演示」之间，不用于控制行与演示之间。
- 存量用 `Space vertical` 包裹的老用例功能等价，不强制改造；新写或改动该分节时按本规范收敛。

### 同组面板的渲染内容必须可区分（2026-11-05 新增）

同一组 `TabPane` / 面板用 `v-for` 渲染、内容模板又完全相同时，必须把区分标识渲染出来（如 `面板 {{ item.key }}`、`Content of Tab Pane {{ item.key }}`）：

- **为什么**：内容一致时切换页签视觉毫无变化，读者无法判断 `displayDirective` / `destroyInactiveTabPane` / `animated` 等属性是否生效，验证用例退化成摆设。
- 标识写在面板内容首行，与用例说明同行：`<p class="mb10">面板 {{ item.key }}｜if：切走后内容卸载，输入不保留</p>`。

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

<!-- 类型章节标题 = 属性表引用的公开导出名 + ` Type`；有字段 3 列 / 无字段（别名 / 联合 / 枚举）2 列，类型表不含「默认值」列 -->

| 名称 | 说明 | 类型 |
| :--- | :--- | :--- |

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
- **尾部章节顺序固定为：APIs → Slots → Events → Methods → CSS 变量（可选，仅组件暴露主题变量时）→ 在 setup 外使用（可选，仅离散 API 组件）**；正文示例（何时使用 → 基本使用 → 各示例）在尾部章节之前。章节可缺省（无插槽的组件就没有 `## Slots`），但**相对顺序不得变更**，由 `pnpm verify:docs` 强制校验，唯一标准见 §尾部章节顺序；表格一律**带首尾竖线**（`| 名称 | 说明 | 类型 | 默认值 |`；2026-10-23 修订：原「无首尾竖线的紧凑写法」在增删列时易错位，实测两种写法渲染一致；2026-10-24 全库 151 处存量旧式表已收敛，现无例外）；**全部表格首列统一「名称」**（❌ 不写「参数 / 字段 / 属性名」；内容性速查表不受此限，如「调用方式」「按键」等以语义维度为首列的说明表），详见 §表格规范速查。
- `update:xxx` 属于 `v-model` 双向绑定的更新事件，**不写入 Events 表**；双向绑定统一在 APIs 表的参数名后标注 `<Tag color="cyan">v-model</Tag>`（如 `open <Tag color="cyan">v-model</Tag>`），避免同一语义在两处重复维护。
- **受控 / 非受控的写法**（2026-11-02 新增，对应 component-design.md 的「v-model 声明约定」）：`v-model` 参数行的说明里带上判据，统一句式「传入即受控，不传时由组件内部维护」；提供 `defaultXxx` 的组件改写为「（不传时组件自持，可用 `defaultXxx` 指定初值）」，并在**初值可观察时**补 `## 非受控模式` 示例（判据见下一条）或只在**对应字段所在 Props 表上方**补一行 `> **受控 / 非受控**：…` 契约（判据只在契约行展开一次，其余页面用参数行内句式即可；多组件页面如 `checkbox` / `radio` 必须写在**组**的 Props 表上方，写到 `## APIs` 之下会被读成约束单项组件）；面板开合类字段可在参数行内追加「内部触发只经 `update:open` / `openChange` 上报」。
- **`## 非受控模式` 的唯一判据：初值可观察**（2026-11-04 修订，取代原「按字段类型」分档）：只有「不绑 `v-model`、仅给 `defaultXxx` 时渲染结果与受控版**有肉眼差异**」才值得单开章节——输入框里真有字（`Input` / `InputSearch` / `Textarea` / `InputNumber`）、上传列表真有文件（`Upload`）；静态默认值、外观与受控版完全一致（`Slider` / `Tabs` / `Collapse` / `Pagination` / `Calendar` / `ColorPicker` / `Cascader` 等）一律只留参数行句式 + `> **受控 / 非受控**` 契约行，❌ 不再新增示例章节（上述 7 个存量章节已于 2026-11-04 清理，不得回填）。判据只看**可观察性**、不看字段是否双模：能力写进 API 表，只有真能看出差异时才给 demo。该章节只演示可观察的预填值与「不绑 `v-model` 也能正常交互」，❌ 不写「内容不会丢 / 内部自持」这类**不可观察的实现承诺**（曾有 `input.md` 的 tip 因此被删除，不得回填）；章节名统一为 `## 非受控模式`（`## 非受控初值` / `## 默认值` 一律改名）。
- **必填 prop 用 `required` 标签标识**（2026-10-23 新增）：`value <Tag color="red">required</Tag>`，与 `v-model` 标签同款；两者并存时顺序固定 `v-model` 在前、`required` 在后（`value <Tag color="cyan">v-model</Tag> <Tag color="red">required</Tag>`）。默认值列同时写 `—`（标签给扫读、`—` 给精确语义）。⚠️ 只在**真必填**时使用（源码 `required: true`，或缺该 prop 组件无法工作），可选 prop 即便业务上常用也 ❌ 不加，否则标签贬值。
- APIs / Events / Methods 表中的类型引用一律写**组件入口重命名后的公开导出名**（如 `SliderMarks`、`TabsItem`、`SwiperImage`），确保读者可直接 `import type`，且与 IDE 类型提示一致；**类型章节标题同样使用该公开导出名**（如 `### SliderMarks Type`，锚点 `#slidermarks-type`），使目录、链接文字、`import type` 三者一致。⚠️ 2026-10-23 修订：原规定「标题保留 SFC 内定义名、锚点不随引用名变更」，实测导致 39 处类型标题与读者点击的链接文字不一致（占 87 个类型标题的 45%，如 `TabsItem` → `### Item Type`），且 `Item Type` / `Option Type` / `Image Type` 在多组件重复，目录树与页内查找无法定位；改名须同步该文件内全部 `#xxx-type` 锚点。文档自造的结构性类型（源码中无对应导出，如 ConfigProvider 的 `Config`、Scrollbar 的 `ScrollBehavior`）沿用文档内命名，但加组件前缀避免跨页重名。
- **`## Slots` 表的「用法」列写插槽的实际用法**：默认插槽 `v-slot:default`、具名插槽 `v-slot:xxx`、带作用域参数写 `v-slot:xxx="{ a, b }"`；❌ 不写 `-` / `{ option: T }` 这类「参数」列形态。列头固定为「名称 | 说明 | 用法」，与 `docs/guide/template.md` 一致；该列表达的是插槽**用法**（消费侧语法），不要与 APIs / Methods / Events 表的「类型」列（TS 类型 / 签名）混写。
- `## Slots` 表需与组件 `defineSlots` 的定义**逐项对应**（名称、是否有作用域参数）；插槽参数由 `v-bind` 动态展开、无法静态收窄时（如 `option`），用法列只写 `v-slot:option`。
- **表格内禁止裸对象字面量**：APIs / Events 等表格单元格里直接写 `{ label: 'label' }` 会被 markdown 的属性语法当作前一个标签的 HTML 属性（渲染成 `<td ... label:="" ...>`），轻则单元格内容丢失，重则同名属性重复让 `pnpm docs:build` 直接失败（报 `Duplicate attribute`）。对象字面量一律用行内代码包裹：`` `{ label: 'label', value: 'value' }` ``。

### 尾部章节顺序（2026-11-04 制定，唯一标准）

> 背景：全量盘点 73 个组件文档，旧顺序「APIs → Slots → Methods → Events」执行率仅 85%（11 处漂移、4 种形态：输入类把 Methods 写到 Events 之后，下拉/浮层类把 Events 提到 Slots 之前），且 `pnpm verify:docs` 只校验默认值列、不守护顺序。

| 序号 | 章节 | 缺省条件 | 位置理由 |
|:--|:--|:--|:--|
| 1 | `## APIs` | 必有 | 参数是查文档的第一诉求 |
| 2 | `## Slots` | 无插槽时省略 | 与 Props 同属**模板层声明**（`v-slot`），紧随其后 |
| 3 | `## Events` | 无事件时省略 | 同属模板层（`@event`），保持「写模板」阅读连续 |
| 4 | `## Methods` | 无实例方法时省略 | 需 `ref` 调用 `defineExpose` 暴露的方法，是门槛最高、频次最低的**实例层** API，统一收尾 |
| 5 | `## CSS 变量` | 未暴露主题变量时省略 | 样式定制属补充参考，位于用法定型之后 |
| 6 | `## 在 setup 外使用` | 仅离散 API 组件（dialog / modal / loading-bar / message / notification） | 同属命令式调用，紧邻 Methods |

- **存量**：2026-11-04 一次性收敛 20 个组件文档——9 个原 `A → S → M → E`（checkbox / countdown / date-picker / dialog / modal / radio / scrollbar / time-picker / tooltip）、6 个原 `A → M → E`（loading-bar / message / notification / number-animation / text-scroll / video）、5 个把 Events 提前的（auto-complete / cascader / drawer / dropdown / select）；其中 dialog / modal / loading-bar / message / notification 末尾还带「在 setup 外使用」，位置本就在 Methods 之后，无需变动。现全库 73 个文档 100% 合规，收敛前后逐行比对确认仅行移动（scrollbar 另补一处 `<br/>` 间距），无正文改动。
- 组件 Props 表与类型表（`### Xxx Props` / `### Xxx Type`）归属各自章节，不参与本节排序；`###` 的摆放仍按 §表格规范速查（类型表紧跟唯一引用它的表）。
- 章节标题文字固定为上述 6 种，❌ 不自造 `## 实例方法` / `## 属性` / `## 事件` 等变体，否则脚本与锚点失效。
- 校验：`pnpm verify:docs`（`scripts/verify-docs.ts` 的第 ② 项断言）解析每个文档的 `## ` 尾部章节序列，断言等于上述标准的**子序列**；新增组件文档漏排、乱排都会失败，通篇只写变体标题（一节规范标题都没有，如从零新写时用了 `## Props` / `## 事件`）同样失败。顺序断言与默认值列断言同扫 `docs/`，故不单开脚本与命令。

### 表格规范速查（2026-10-23 制定 / 同日修订二 / 2026-10-24 修订三）

> 背景：全量盘点 73 个组件文档 346 张表格后发现口径长期漂移——`## APIs` 下首列「参数 / 名称」5:5 分裂（Props 表 84 张用「参数」、类型表 65 张用「名称」），类型表存在 4 种形态，39 处类型标题与属性表引用的公开名不一致（占 87 个类型标题的 45%）。以下为唯一标准。
>
> 修订二（同日）：**类型表取消 4 列形态**，统一为「有字段 3 列 / 无字段 2 列」——默认值不属于类型契约（源码无从校验，实测 46 张 4 列类型表中 26 张整列恒 `undefined`），且「用户传入 vs 组件产出」是不可脚本化的语义判定（已出现 `MenuInfo`、`MenuExpandIconInfo`、`DatePickerDisabledTime` 等误排 4 列）。缺省行为重要时并入说明列。
>
> 修订三（2026-10-24）：**存量全量收敛完毕**——151 处旧式「无首尾竖线」表（涉及 39 个组件文档）已全部改为带首尾竖线写法，此后全库表格只有一种写法，扫描只需匹配 `| 名称 | … |`；同时确立两条新口径：① 源码带索引签名（`[propName: string]: any`）的类型表必须列出该行（本次补齐 `AutoCompleteOption` / `CollapseItem` / `MenuOption` / `TableColumn` 4 处）；② 「首列统一名称」只约束规范表格（Props / 类型 / Slots / Methods / Events / 工具函数 / CSS 变量），内容性速查表（如「调用方式」「按键」「标识」等以语义维度为首列的说明表）不受此限。

| 表 | 列头 | 备注 |
|:--|:--|:--|
| 组件 Props（`### {组件名} Props`） | 名称 \| 说明 \| 类型 \| 默认值 | 名称列**不写 `?`**；必填用 `<Tag color="red">required</Tag>` 标签 + 默认值列 `—` 双标记 |
| 类型表 · 有字段（接口 / 对象结构 / 回调 / 实例信息） | 名称 \| 说明 \| 类型 | 可选字段名后加 `?`，与源码 `interface` 逐字段一致（含 `extends` 继承字段）；源码带索引签名（`[propName: string]: any`）时必须列出该行，名称与类型统一为 `[propName: string]` / `any`（2026-10-24 补齐 4 处，2026-10-25 源码侧统一名称与类型口径，见 component-design.md）；❌ 类型表不含「默认值」列（2026-10-23 修订二），缺省行为重要时写进说明列 |
| 类型表 · 无字段（别名 / 联合 / 枚举） | 名称 \| 值 | ❌ 不硬套三列 / 四列（会留下恒空列）；逐取值的说明并入表前说明句（范式见 `DropdownTrigger` / `ScrollBehavior`） |
| `## Slots` | 名称 \| 说明 \| 用法 | 用法列写 `v-slot:xxx` |
| `## Methods` / `## Events` | 名称 \| 说明 \| 类型 | 类型列写完整签名，❌ 不写 `Function` |
| 工具函数 `## Params` | 名称 \| 说明 \| 类型 \| 默认值 | 首列同为「名称」 |
| 工具函数 `## Return` | 纯函数：`类型 \| 说明`；composable：`名称 \| 说明 \| 类型` | 按语义分流，不追求列数统一（纯函数无「名称」维度） |
| `## CSS 变量` | 名称 \| 说明 \| 默认值 | 名称列写 `--va-<组件>-*` 全名。主清单 `docs/guide/parts/component-vars.md` 由 `scripts/gen-component-vars-doc.ts` 生成，改表头须改生成器后重新生成 |
| `## 自定义样式`（DOM 类名） | 名称 \| 说明 | 首列写类名，列头仍用「名称」；❌ 不加「层级 / 对应配置项」等自拟列 |

- **标题**：组件用 `### {组件名} Props`（复合组件逐子组件，如 `### Descriptions Props` / `### DescriptionsItem Props`），类型用 `### {公开导出名} Type`；两者平级，读者一眼区分「组件属性 / 数据类型」。
- **类型表位置**：紧跟**唯一引用它的表格**所在章节——只被 `## Methods` 引用的就放 `## Methods` 下（如 `scrollbar` 的 `ScrollBehavior`），只被某个 Props 表引用的紧随其后；被多处引用的下沉到 `## APIs` 末尾。判定口径：读者读到引用点就能往下找到定义。
- **默认值列**（仅组件 Props / 工具函数 Params 表）：有缺省写 TS 字面量（`false` / `[]` / `'top'`）；可选未传写 `undefined`；必填 / 无缺省写 `—`（em dash，❌ 不用 ASCII `-`，与表格分隔线混淆）。类型表没有该列。**写的是 prop 默认值，不是未传时的有效初始值**——后者写进说明列（如 `time-picker` 的 `hourStep` 默认值列写 `undefined`，说明列写「未传时按 `1` 处理」）；该口径由 `pnpm verify:docs` 与源码 `withDefaults` 逐字段比对强制。
- **类型表 `?` 标记**：可选字段加 `?`（如 `label?`），必填不加（如 `key`），与源码 `interface` 逐字段一致，`extends` 继承字段同样按基接口口径；2 列别名表不加 `?`；索引签名行不加 `?`。`B9j` 用脚本解析源码 `interface` 自动核对。
- **转义**：联合类型统一 `&#124;`；单元格内禁裸对象字面量（用反引号包裹）；表头不得截断（`默认值` 不写成 `默认`）。
- **排版**：单元格内容前后**统一 1 个空格**（`| 名称 | 说明 | 类型 |`），❌ 不用连续空格做列宽对齐——补空格对齐在增删任何内容后必然整体失配，且 diff 噪音淹没真实改动；分隔线统一 `:--`（左对齐），❌ 不随列宽写 `:---------` 这类长横线（2026-10-25 全库归一化：424 张表、190 行对齐 padding、74 种分隔线形态 → 单一形态；无 `--:` / `:-:` 消费方，故不保留右对齐 / 居中语义）。
- **行序**：Props 表 ≡ 源码 `Props` 声明顺序（六段式分组）；类型表 ≡ `interface` 字段顺序。
- **存量**：新增 / 重写的表必须合规；历史存量分批收敛，至 2026-10-24 已全部收敛完毕。收敛顺序：① 首列「参数」→「名称」② 类型标题 → 公开导出名（同步锚点）③ 组件标题补 ` Props` ④ 必填 prop 补 `required` 标签 ⑤ 类型表补 `?`（2026-10-23 已完成 84 处：首轮 42 处 + 同日补齐响应式表 / `MenuOption` / Skeleton 系列 42 处）⑥ 类型表 4 列 → 3 列（2026-10-23 已完成 67 张：删「默认值」列、缺省值并入说明；其中 21 张为表头**无前导竖线**的漏检项，同日补齐；9 张别名表改回 2 列 `名称 | 值`）⑦ 2026-10-24：全库 151 处旧式无首尾竖线表收敛为带首尾竖线写法（涉及 39 个组件文档），并修正 4 张首列不规范的类型表（`DropdownTrigger` / `ScrollBehavior` / date-picker 与 time-picker 的 `DefaultFormat Value`）；存量清零后扫描只需匹配 `| 名称 | … |` 一种表头写法。

### 示例代码风格约定（人工维护）

`docs/**/*.md` 是 VitePress 的 **md-as-SFC**（顶层 `<script setup>` 会被当作真实代码编译），因此**不能纳入 Prettier 格式化**——Prettier 按 markdown 语义处理会改写顶层模板（行首 `>` 被解析为引用块、标签失配），直接导致 `pnpm docs:build` 失败（详见 [build-system.md](build-system.md) 与 `.github/workflows/verify.yml` 文件头）。故示例代码风格由人工约定维持，`::: details Show Code` 折叠块内的代码需与正文 demo 保持同步，并遵循：

- **函数名与括号之间不留空格**：写 `function onClose(e: Event) {`，不写 `function onClose (e: Event) {`。
- **不使用尾逗号**（与 `.prettierrc.json` 的 `trailingComma: "none"` 一致）：数组 / 对象的最后一项后不加 `,`。
- **自闭合标签的 `/>` 前留一个空格**：写 `<ColorPicker :label="labelFormat" />`，不写 `<ColorPicker :label="labelFormat"/>`；**`<br>` 是唯一例外**，文档（md）内统一写 `<br/>`（不写 `<br />`）——源码 `.vue` 模板由 Prettier 格式化，仍是 `<br />`，无需手工调整。
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
- **标题用中性标识，行为差异写在内容区**：页签 / 选项标题保持 `Tab 1` / `Tab 2`、`默认` / `禁用` 这类原始标识，`返回 false` / `Promise.reject` 等行为说明写进 TabPane 内容或说明句；❌ 把行为写进标题——标题要与说明简介逐字对齐，写行为必然导致两边不一致。

### 正文 demo ↔ Show Code 契约（2026-11-05 新增）

> `::: details Show Code` 是正文 demo 的**可复制等价物**，不是「另一份简化示例」。以下为硬约束，其中「自包含」与「跨分节绑定」由 `pnpm verify:docs` 第 ③ 项机械校验；「用例数量 / 数据规模 / 样式同源」依赖章节性质判断，脚本只把差异打印为提示（说明型章节常并排多段代码、Show Code 只覆盖其中一段，机械比较必然误报）。

- **自包含**：块内模板引用的每个标识符都必须在块内 `<script setup>` 定义（`const` / `function` / `import`），❌ 依赖页面级 script 的变量——复制后直接报错。教训：`tabs` 的「新增按钮禁用」块内定义 `editActiveKey`，模板却引用页面级 `disabledAddActiveKey` 等 6 个标识符。
- **用例数量一致**：正文的交互控件（开关 / 选择器 / 按钮）与用例数量，块内必须一一对应，❌ 只留主组件省掉控制项（如缺 `<Switch>` 导致状态无法切换）。
- **数据规模一致**：`v-for` 的数据项数、`slice(0, n)` 的 `n` 与正文一致，❌ 正文 6 个页签、块内只写 3 项。
- **样式同源**：正文用 `tabClass` / 自定义类名时，页面级 `<style>` 必须有对应定义（` :deep()` 命中组件内部元素）；只在 Show Code 里写样式会造成「演示无样式、复制后有样式」。
- **命名可局部化**：块内变量名可不同于页面级（`activeKey` vs `basicActiveKey`），但块内定义与引用必须同名自洽。

### 文档站的样式与间距（2026-11-05 新增）

docs 站**没有** `mt10` / `mb10` 等全局间距类（这些只在演示站 `src/assets/less/global.less` 定义），所以 `class="mb10"` 在文档里不生效。间距按「关系」选择手段，❌ 不要一律堆 `<br/>`：

| 场景 | 写法 | 说明 |
| :-- | :-- | :-- |
| 说明句 / 表格 ↔ 其后的 demo | `<br/>` | 两者是独立内容块，`<br/>` 制造一行空隙即可（范式：说明 → `<br/>` → 表格 → `<br/>` → demo） |
| 参数控制行 + 其驱动的演示 | 同一个 `<Flex vertical>`（或 `<Space vertical>`） | 间距由容器 `gap` 提供，与「表单与演示的纵向布局」一致；❌ 用 `<br/>` 拼出「伪段落」 |
| 并排多个对照用例 | `<Space>` / `<Flex gap="...">` | 横向间距交给容器 `gap`；❌ 连续 `<br/>` 或空段落堆叠 |
| 节与节之间 | 不加 | `## ` 标题自带间距；❌ 在标题前后补 `<br/>` |

- 判断口径：**结构关系用容器（`Flex` / `Space`），纯行间空隙用 `<br/>`**；同一段内容不要混用两种手段。
- 文档页可写页面级 `<style scoped>`，命中子组件内部元素时必须用 `:deep()`。
