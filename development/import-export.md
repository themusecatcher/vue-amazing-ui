# 导入导出规范 Import & Export

> 描述组件库的分层导出模型、命名约定与新增组件的接线流程。

## 分层导出模型

组件库采用「三层导出」结构：

```
components/<name>/index.ts   （组件级：默认导出组件 + 类型）
        ↓ 汇总
components/components.ts     （汇总级：统一命名 Props as XxxProps）
        ↓ 汇总
components/index.ts          （入口级：install + 工具函数 + resolver）
```

## 组件级导出（单组件 index.ts）

每个组件的 `index.ts` 是固定三件套：

```ts
// components/button/index.ts
import Button from './Button.vue'
export type { Props } from './Button.vue'
import { withInstall } from '../utils/type'

export default withInstall(Button)
```

要点：

- **默认导出**必须是 `withInstall(Xxx)` 包裹后的组件，以支持 `app.use(Button)` 单组件安装。
- 组件 Props 类型在 SFC 内部以 `interface Props` 定义并导出，入口处 `export type { Props }` 转出。
- 子类型（如 `Option`、`Responsive`）同样在 SFC 内定义、入口转出。

## 汇总级导出（components.ts）

`components/components.ts` 是命名约定的集中处，负责把每个组件的 `Props` 统一重命名为 `XxxProps`，并导出组件本身：

```ts
export type { Props as ButtonProps } from './button'
export { default as Button } from './button'
```

命名约定：

| 约定 | 说明 |
| :--- | :--- |
| 组件导出名 | PascalCase，与组件名一致（`Button` / `AutoComplete`） |
| Props 类型名 | `<组件名>Props`（`ButtonProps` / `AutoCompleteProps`） |
| 子类型名 | `<组件名><子类型>`（`AutoCompleteOption` / `CalendarDateItem`） |

复合组件（一个目录多个子组件）需逐一导出，例如：

```ts
// Descriptions + DescriptionsItem
export type { DescriptionsProps, DescriptionsItemProps } from './descriptions'
export { Descriptions, DescriptionsItem } from './descriptions'

// Grid + Row + Col
export type { RowProps, ColProps } from './grid'
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
    // 遍历所有 SFC 组件按 __name 注册；useXxx / createDiscreteApi 等函数导出无 __name 会被自然过滤
    if (component && typeof component === 'object' && '__name' in component) {
      const name = (component as { __name?: string }).__name
      if (name && !app.component(name)) {
        app.component(name, component as Component)
      }
    }
  })
  return app
}
```

- 遍历 `components` 的所有导出，按 SFC 的 `__name` 注册全局组件。
- `useXxx` / `createDiscreteApi` 等函数导出因无 `__name` 被自然过滤。

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

`components/utils/resolver.ts` 提供 `VueAmazingUIResolver`，供 `unplugin-vue-components` 按需引入。核心是三张表：

| 表 | 作用 |
| :--- | :--- |
| `componentsMap` | 组件名 → 目录路径映射（如 `Button: 'button'`） |
| `componentDependencies` | 组件的样式依赖（如 `Table` 依赖 `Checkbox` 等） |
| `getSideEffects` | 计算按需引入时应携带的样式 sideEffects |

新增组件时必须同步维护 `componentsMap`（必要时 `componentDependencies`），否则按需引入会失效。

## 新增组件「三步接线」Checklist

1. **建组件**：`components/<kebab-case>/` 下创建 `Xxx.vue` + `index.ts`（三件套结构）。
2. **登记汇总**：在 `components/components.ts` 末尾追加 `export type { Props as XxxProps }` + `export { default as Xxx }`。
3. **登记按需**：在 `components/utils/resolver.ts` 的 `componentsMap` 追加 `Xxx: '<kebab-case>'`（有样式依赖再补 `componentDependencies`）。

> 若组件无样式文件，还需在 `getSideEffects` 的「无样式组件」白名单中登记（见 [component-design.md](component-design.md)）。
