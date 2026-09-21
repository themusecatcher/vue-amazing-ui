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

## resolver 按需引入（样式入口模型）

`components/utils/resolver.ts` 提供 `VueAmazingUIResolver`，供 `unplugin-vue-components` 按需引入。它只回答一个问题：**「该组件的样式入口在哪」**，返回**单条**路径 `vue-amazing-ui/<es|lib>/<dir>/style/index.{js,cjs}`。

「组件 → 样式依赖」这份知识不在运行时拼接多条 CSS 路径，而是**下沉到构建产物**：每个组件目录下都会生成一个样式入口，入口内部按固定顺序引用所需 CSS：

```
es/tooltip/style/index.js
├── import '../../style/global.css'   // 1. 全局默认样式
├── import '../Tooltip.css'           // 2. 自身样式（或 styleSources 指向的来源组件）
├── import '../../popup/Popup.css'    // 3. 依赖组件样式（componentDependencies 表顺序、去重保留首次出现）
└── import '../../vendor-styles/…'    // 4. 第三方样式（vendorStylesByComponent）
```

消费方三种写法：

| 场景 | 写法 |
| :--- | :--- |
| 自动按需引入（推荐） | `VueAmazingUIResolver({ cjs: false })`，由 `sideEffects` 注入上述单条入口 |
| 手动引入（推荐） | `import 'vue-amazing-ui/es/button/style'` —— **裸目录写法**（`package.json` 的 `exports` 已加 `"./es/*/style"` / `"./lib/*/style"` 映射，Node / 打包器均可解析）；需要完全显式时可用 `…/button/style/index.js` |
| 旧写法（仍有效） | `import 'vue-amazing-ui/es/button/Button.css'` —— 只含组件自身样式，依赖组件样式与全局默认样式需自行补齐 |

### 单一数据源：`components/utils/style-deps.ts`

| 表 | 作用 | 谁读 |
| :--- | :--- | :--- |
| `componentsMap` | 组件名 → 产物目录（如 `Button: 'button'`；复合组件走子目录，如 `Row: 'grid/row'`、`Descriptions: 'descriptions/descriptions'`、`ListItem: 'list/list-item'`），并收录 Provider 组件 | resolver（拼入口路径）＋ 生成器 |
| `styleSources` | 自身无样式文件的组件 → 承载其样式的组件（如 `MessageProvider: 'Message'`、`DescriptionsItem: 'Descriptions'`） | resolver（决定入口落在哪个目录）＋ 生成器 |
| `componentDependencies` | 组件的样式依赖（如 `Table` 依赖 `Checkbox` / `Pagination` 等） | 生成器（按表顺序写进入口）＋ `scripts/verify-style-deps.js`（与产物 chunk 闭包双向比对） |
| `stylelessComponents` | 完全没有样式的组件（`ConfigProvider` / `Highlight` / `NumberAnimation` / `Watermark`） | resolver（返回空）+ 生成器（跳过） |

表结构带类型约束，组件名写错会在编译期报错，而非静默生成 `undefined` 路径：

- `ComponentName = keyof typeof componentsMap`：作为 `styleSources` / `componentDependencies` 的键值约束，用 `Partial<Record<...>>` 表达「可能查不到」。
- `isComponentName(name): name is ComponentName`：`resolve` 时的类型守卫，未收录的组件名直接返回 `undefined`，交给其他 resolver 处理。

第三方样式由 `components/utils/vendor-styles.ts` 统一派生：`vendorStyles` 定义 `source`（node_modules 源路径）与 `target`（产物内路径，含 `vendorStylesDir` 常量与「镜像原包结构」约定），`vendorStylesByComponent` 按组件名索引，供生成器写入样式入口。

### 构建期与发布期校验（写错即失败，不再静默缺样式）

| 时机 | 落点 | 校验内容 |
| :--- | :--- | :--- |
| 库构建 | `build/generate-style-entries.ts`（由 `vite.config.ts` 的 `stylePostBuildPlugin` 在 `mergeComponentStyles()` 之后顺序调用） | ① 入口引用的每个 CSS 都真实存在（表写错 / SFC 漏 `<style>` 块 → 报出「哪个组件缺哪个文件」）；② 组件目录下「与组件同名前缀」的 CSS 恰好 1 份（残留 `Tooltip2.css` → 报错） |
| 发布前 | `pnpm guard`（`scripts/prepublish-guard.js`） | 毫秒级存在性校验：无编号 CSS、每个组件都有样式入口与 `index.d.ts`、入口内相对路径均可解析 |
| 发布前 / CI | `pnpm verify:deps`（`scripts/verify-style-deps.js`） | 用产物 chunk 依赖图闭包**双向**校验 `componentDependencies`：`closure ⊆ table` 抓漏写、`table ⊆ closure` 抓 stale |

> 全量扫描与登记完整性由 `tests/resolver.spec.ts` 与 `tests/generate-style-entries.spec.ts` 守护：
> 前者校验每个组件的入口路径合法（不含 `undefined`）、并扫描 `components/**/*.vue` 中所有不含 `<style>` 块的 SFC 是否已登记；
> 后者直接断言入口内的 CSS 顺序、依赖摊平结果与 vendor 行。

## 新增组件「三步接线」Checklist

1. **建组件**：`components/<kebab-case>/` 下创建 `Xxx.vue` + `index.ts`（三件套结构）。
2. **登记汇总**：在 `components/components.ts` 末尾追加 `export type { XxxProps } from './<kebab-case>'` + `export { default as Xxx } from './<kebab-case>'`（类型已在组件级 `index.ts` 重命名为 `XxxProps`）。
3. **登记按需**：在 `components/utils/style-deps.ts` 的 `componentsMap` 追加 `Xxx: '<kebab-case>'`（用到其它组件的样式再补 `componentDependencies`）。样式入口 `es|lib/<dir>/style/*` 由构建期自动生成，**不需要手写**。

> - 若组件无样式文件，还需登记到 `stylelessComponents` 白名单（见 [component-design.md](component-design.md)）。
> - 若新增的是全局提示类 Provider 组件，需在 `styleSources` 中登记其底层组件（见上文 resolver 章节）。
> - 自检：`pnpm check` 全绿后执行 `pnpm verify`（= 构建 → 依赖一致性 → 按需引入验证 → 产物守卫）。
>   漏填 / 拼错依赖名会在**库构建期**直接失败，不再等消费方发现样式缺失。

## 新增工具函数 Checklist

工具函数 / Hooks 涉及「barrel + 入口 + 文档」三处登记，缺一处会导致无法从包总出口引入，或文档站不显示：

1. **建函数**：在 `components/utils/` 的对应分组文件中新增并导出（`format` / `math` / `function` / `dom` / `color` / `hooks` / `observers` / `position` / `z-index` / `floating-mount` / `render`）。
2. **登记 barrel 与入口**：确认所属分组已被 `components/utils/index.ts` 的 `export *` 覆盖；再到 `components/index.ts` 的导出列表中显式登记函数名（公开类型用 `export type` 一并登记）。仅供组件内部复用的实现细节函数（如 `getParentElement` / `renderContentToVNode` / `createKeyGenerator` / `getFloatingBoundaryRect`）与通用 Hook（如 `useInject` / `useWave` / `useWindowWidth`）**未从主入口导出**（不登记入口，仅从 barrel 供组件内部引入），不承诺 API 稳定性。
3. **登记文档**：在 `docs/utils/functions/` 新增一篇或归入既有 md；并在 `docs/.vitepress/config.ts` 的 `sidebar['/utils/']` 「工具」分组登记链接。

> 演示页不是必须项：工具函数如需可视化演示，可复用既有 `src/views/<camelCase>/` 页面承载。
