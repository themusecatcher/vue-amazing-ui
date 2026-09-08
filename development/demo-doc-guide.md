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

:::: details Show Code
```vue
...可复制的完整代码...
```
::::

## APIs

### Button

| 参数 | 说明 | 类型 | 默认值 |
| :-- | :-- | :-- | :-- |
...

## Slots

...

## Events

...
````

约定：

- 标题 `# 中文名 ComponentName`（英文 PascalCase 名）。
- 顶部 `<GlobalElement />` 是文档页必备占位（注册全局组件）。
- 每个示例标题下用一行斜体 `_说明_` 描述。
- 可交互 demo 直接写在正文，用内联 `<script setup>` 提供响应式状态。
- 每个示例后接 `:::: details Show Code` 折叠块，展示可复制的完整代码。

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

:::: details Show Source Code
```ts
// 完整源码
```
::::

<script setup lang="ts">
// 内联 demo 逻辑
</script>

## 基本使用
...

## Params
| 参数 | 说明 | 类型 | 默认值 |

## Return
| 类型 | 说明 |
````

### 侧边栏维护

文档页写好后，需在 `docs/.vitepress/config.ts` 的 `sidebar` 中登记，否则页面不会出现在站点导航：

- 组件文档 → `sidebar['/guide/']` 的「组件」分组。
- 工具函数文档 → `sidebar['/utils/']` 的「工具」分组。

## 演示与文档的对应

演示页（`src/views/`）与组件文档（`docs/guide/components/`）内容需保持一致：文档中的 demo 通常对应演示页的某个分节，二者共同维护同一组用例。
