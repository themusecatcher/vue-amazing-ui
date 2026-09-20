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

`components/index.ts` 是库的入口，承担四件事：

```ts
import './style/global.less'      // 1. 引入全局样式（副作用）
import * as components from './components'
export * from './components'      // 2. 重导出全部组件与类型
export { dateFormat, ... } from './utils'                      // 3. 导出工具函数与 Hooks（显式列举）
export type { AnimationFrameID, DownloadOptions, ... } from './utils'  // 公开的工具函数类型
export { VueAmazingUIResolver } from './utils/resolver'        // 4. 按需引入 resolver
export type { VueAmazingUIResolverOptions } from './utils/resolver'
```

> `components.ts` 除组件外还透传 `createDiscreteApi` / `DiscreteApiInstance` / `DiscreteApiOptions`；`install` 注册时按「有无 `install` 方法」过滤，因此这些函数导出不会被当作插件安装。

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
| `componentsMap` | 组件名 → 目录路径映射（如 `Button: 'button'`；复合组件走子目录，如 `Row: 'grid/row'`、`Descriptions: 'descriptions/descriptions'`、`ListItem: 'list/list-item'`），并收录 Provider 组件 |
| `styleSources` | 自身无样式文件的组件 → 承载其样式的组件（如 `MessageProvider: 'Message'`、`DescriptionsItem: 'Descriptions'`），用于复用来源组件的产物 CSS |
| `componentDependencies` | 组件的样式依赖（如 `Table` 依赖 `Checkbox` / `Pagination` 等） |
| `getSideEffects` | 计算按需引入时应携带的样式 sideEffects（全局样式 + 自身及依赖组件 CSS + 第三方样式） |

表结构带类型约束，组件名写错会在编译期报错，而非静默生成 `undefined` 路径：

- `ComponentName = keyof typeof componentsMap`：作为 `styleSources` / `componentDependencies` 的键值约束，用 `Partial<Record<...>>` 表达「可能查不到」。
- `isComponentName(name): name is ComponentName`：`resolve` 时的类型守卫，未收录的组件名直接返回 `undefined`，交给其他 resolver 处理。

第三方样式由 `components/utils/vendor-styles.ts` 统一派生：`vendorStylesByComponent` 从 `vendorStyles`（含 `vendorStylesDir` 常量与「镜像原包结构」的 `target` 约定）过滤生成，`getSideEffects` 按组件名查表追加，两处不会各自硬编码。

新增组件时必须同步维护 `componentsMap`（必要时 `componentDependencies`）；新增全局提示类 Provider 时还需在 `styleSources` 中登记其底层组件，否则按需引入会失效或缺样式；新增无 `<style>` 块的组件见 [component-design.md](component-design.md) 的无样式组件章节。

> `components/utils/resolver.ts` 的 `getSideEffects` 白名单（[`ConfigProvider` / `Highlight` / `NumberAnimation` / `Watermark`]）与 `styleSources` 的覆盖完整性由 `tests/resolver.spec.ts` 自动校验：扫描 `components/**/*.vue` 中所有不含 `<style>` 块的 SFC，未登记即测试失败。

## 新增组件「三步接线」Checklist

1. **建组件**：`components/<kebab-case>/` 下创建 `Xxx.vue` + `index.ts`（三件套结构）。
2. **登记汇总**：在 `components/components.ts` 末尾追加 `export type { XxxProps } from './<kebab-case>'` + `export { default as Xxx } from './<kebab-case>'`（类型已在组件级 `index.ts` 重命名为 `XxxProps`）。
3. **登记按需**：在 `components/utils/resolver.ts` 的 `componentsMap` 追加 `Xxx: '<kebab-case>'`（有样式依赖再补 `componentDependencies`）。

> - 若组件无样式文件，还需在 `getSideEffects` 的「无样式组件」白名单中登记（见 [component-design.md](component-design.md)）。
> - 若新增的是全局提示类 Provider 组件，需在 `styleSources` 中登记其底层组件（见上文 resolver 章节）。

## 新增工具函数 Checklist

工具函数 / Hooks 涉及「barrel + 入口 + 文档」三处登记，缺一处会导致无法从包总出口引入，或文档站不显示：

1. **建函数**：在 `components/utils/` 的对应分组文件中新增并导出（`format` / `math` / `function` / `dom` / `color` / `hooks` / `observers` / `position` / `z-index` / `floating-mount` / `render`）。
2. **登记 barrel 与入口**：确认所属分组已被 `components/utils/index.ts` 的 `export *` 覆盖；再到 `components/index.ts` 的导出列表中显式登记函数名（公开类型用 `export type` 一并登记）。仅供组件内部复用的实现细节函数（如 `getParentElement` / `renderContentToVNode` / `createKeyGenerator` / `getFloatingBoundaryRect`）与通用 Hook（如 `useInject` / `useWave` / `useWindowWidth`）**未从主入口导出**（不登记入口，仅从 barrel 供组件内部引入），不承诺 API 稳定性。
3. **登记文档**：在 `docs/utils/functions/` 新增一篇或归入既有 md；并在 `docs/.vitepress/config.ts` 的 `sidebar['/utils/']` 「工具」分组登记链接。

> 演示页不是必须项：工具函数如需可视化演示，可复用既有 `src/views/<camelCase>/` 页面承载。
