# 导入导出规范 Import & Export

> 描述组件库的分层导出模型、命名约定与新增组件的接线流程。

## 分层导出模型

组件库采用「三层导出」结构，**类型的重命名（`Props as XxxProps`）在组件级完成**，汇总级只做透传：

```
components/<name>/index.ts   （组件级：withInstall 默认导出 + 重命名后的 XxxProps / 子类型）
        ↓ 汇总
components/components.ts     （汇总级：原样透传组件与类型，不再重命名）
        ↓ 汇总
components/index.ts          （入口级：install + 工具函数 + resolver）
```

## 组件级导出（单组件 index.ts）

每个组件的 `index.ts` 是固定三件套（类型即在入口处完成重命名）：

```ts
// components/button/index.ts
import Button from './Button.vue'
export type { Props as ButtonProps } from './Button.vue'
import { withInstall } from '../utils/type'

export default withInstall(Button)
```

要点：

- **默认导出**必须是 `withInstall(Xxx)` 包裹后的组件，以支持 `app.use(Button)` 单组件安装。
- 组件 Props 类型在 SFC 内部以 `interface Props` 定义，入口处用 `as` 重命名为 `<组件名>Props` 后转出。
- 子类型（如 `Option`、`Responsive`）同样在 SFC 内定义，入口处按 `<组件名><子类型>` 重命名转出（如 `Responsive as DescriptionsResponsive`）。

## 汇总级导出（components.ts）

`components/components.ts` 只做**原样透传**：把各组件入口已重命名好的类型与组件统一转出，不再承担重命名职责：

```ts
export type { ButtonProps } from './button'
export { default as Button } from './button'
```

命名约定（在组件级入口完成，汇总级沿用）：

| 约定 | 说明 |
| :--- | :--- |
| 组件导出名 | PascalCase，与组件名一致（`Button` / `AutoComplete`） |
| Props 类型名 | `<组件名>Props`（`ButtonProps` / `AutoCompleteProps`） |
| 子类型名 | `<组件名><子类型>`（`AutoCompleteOption` / `CalendarDateItem`） |

复合组件（一个目录多个子组件）先在**目录级 `index.ts`** 收集子组件并重命名，再由 `components.ts` 透传：

```ts
// components/descriptions/index.ts
import Descriptions from './descriptions'
import DescriptionsItem from './descriptions-item'
export type { DescriptionsProps, Responsive as DescriptionsResponsive } from './descriptions'
export type { DescriptionsItemProps } from './descriptions-item'
export { Descriptions, DescriptionsItem }
```

```ts
// components/grid/index.ts
import Row from './row'
import Col from './col'
export type { RowProps, Responsive as RowResponsive } from './row'
export type { ColProps } from './col'
export { Row, Col }
```

```ts
// components/components.ts（透传目录级入口）
export type { DescriptionsProps, DescriptionsResponsive, DescriptionsItemProps } from './descriptions'
export { Descriptions, DescriptionsItem } from './descriptions'
export type { RowProps, RowResponsive, ColProps } from './grid'
export { Row, Col } from './grid'
```

## 入口级导出（index.ts）

`components/index.ts` 是库的入口，承担三件事：

```ts
import './style/global.less'      // 1. 引入全局样式（副作用）
import * as components from './components'
export * from './components'      // 2. 重导出全部组件与类型
export { dateFormat, ... } from './utils'   // 3. 导出工具函数与 Hooks
export { VueAmazingUIResolver } from './utils/resolver'
```

### install 全局注册

```ts
export const install = function (app: App) {
  Object.values(components).forEach((component) => {
    // 组件与 Provider 经 withInstall 包装后均带 install 方法，可直接作为插件安装；
    // useXxx / createDiscreteApi 等函数导出无 install，会被自然过滤
    const plugin = component as Plugin
    if (typeof plugin.install === 'function') {
      app.use(plugin)
    }
  })
  return app // 返回 app 以支持链式调用：app.use(A).use(B)
}
```

- 遍历 `components` 的所有导出，按插件的 `install` 方法注册（`app.use(plugin)`）。
- 组件与 Provider 经 `withInstall` 包裹后均带 `install` 方法；`useXxx` / `createDiscreteApi` 等函数导出无 `install`，被自然过滤。

## withInstall

`components/utils/type.ts` 中定义的高阶函数，给任意 SFC 挂上 `install` 方法：

```ts
export const withInstall = <T extends Component>(comp: T) => {
  const c = comp as any
  c.install = function (app: App) {
    app.component(c.__name, comp)
  }
  return comp as T & Plugin
}
```

## 工具函数导出

`components/utils/index.ts` 按分组 `export *` 汇总，最终由 `components/index.ts` 显式列举导出。新增工具函数需在 `components/index.ts` 的导出列表中同步登记。

## resolver 按需引入

`components/utils/resolver.ts` 提供 `VueAmazingUIResolver`，供 `unplugin-vue-components` 按需引入。核心是四张表：

| 表 | 作用 |
| :--- | :--- |
| `componentsMap` | 组件名 → 目录路径映射（如 `Button: 'button'`、复合组件 `Row: 'grid/row'`），并收录 Provider 组件 |
| `providerStyles` | Provider 组件 → 底层组件名（如 `MessageProvider: 'Message'`），用于复用底层组件样式 |
| `componentDependencies` | 组件的样式依赖（如 `Table` 依赖 `Checkbox` 等） |
| `getSideEffects` | 计算按需引入时应携带的样式 sideEffects |

新增组件时必须同步维护 `componentsMap`（必要时 `componentDependencies`）；新增全局提示类 Provider 时还需登记 `providerStyles`，否则按需引入会失效或缺样式。

## 新增组件「三步接线」Checklist

1. **建组件**：`components/<kebab-case>/` 下创建 `Xxx.vue` + `index.ts`（三件套结构）。
2. **登记汇总**：在 `components/components.ts` 末尾追加 `export type { XxxProps } from './<kebab-case>'` + `export { default as Xxx } from './<kebab-case>'`（类型已在组件级 `index.ts` 重命名为 `XxxProps`）。
3. **登记按需**：在 `components/utils/resolver.ts` 的 `componentsMap` 追加 `Xxx: '<kebab-case>'`（有样式依赖再补 `componentDependencies`）。

> - 若组件无样式文件，还需在 `getSideEffects` 的「无样式组件」白名单中登记（见 [component-design.md](component-design.md)）。
> - 若新增的是全局提示类 Provider 组件，需在 `providerStyles` 中登记其底层组件（见上文 resolver 章节）。
