/**
 * 组件样式依赖的**类型门面**（数据见同目录 `style-deps.data.js`）
 *
 * 为什么数据在 `.js`：Node 脚本（`scripts/*.js`）无法 import `.ts`，而 `pnpm guard` / `pnpm verify:deps`
 * 需要直接读这份表。数据放到 `.js` 后，Node 侧不再需要「正则解析 TS 源码」的读取器，
 * 新增 / 改动条目也不受源码格式约束（多行、行内注释均可）。
 *
 * 本文件只负责两件 `.js` 表达不了的事：
 * 1. 从数据层推导 `ComponentName`（`keyof typeof componentsMap`），让 resolver / 构建期查表有键类型；
 * 2. 提供 `isComponentName` 类型守卫（`in` 判断的类型收窄无法由纯 JS 数据层表达）。
 *
 * 取舍：跨表引用完整性（`styleSources` / `componentDependencies` / `stylelessComponents` 的键与值都必须
 * 存在于 `componentsMap`）原本是编译期约束（`Partial<Record<ComponentName, ComponentName>>`），数据移到
 * `.js` 后类型系统看不到，改由 `pnpm verify:deps` 的运行期断言守护（见 `scripts/verify-style-deps.js`）。
 * 因此下面的 `as` 只用于「在数据边界上恢复精确类型」，语义由门禁保证。
 */
import {
  componentDependencies as rawComponentDependencies,
  componentsMap as rawComponentsMap,
  stylelessComponents as rawStylelessComponents,
  styleSources as rawStyleSources
} from './style-deps.data.js'

/** 已收录的组件名：由数据层的键推导，新增组件无需改类型 */
export type ComponentName = keyof typeof rawComponentsMap

/** 组件名 → 组件产物目录（相对产物 es|lib 根目录） */
export const componentsMap: Record<ComponentName, string> = rawComponentsMap

/** 组件 → 承载其样式的组件（查不到表示自身即来源） */
export const styleSources = rawStyleSources as Partial<Record<ComponentName, ComponentName>>

/**
 * 组件 → 除自身外的样式依赖（顺序决定入口内的 import 顺序）
 *
 * 仅构建期使用：库内运行期没有消费者，产物 `es|lib/utils/style-deps.js` 经 tree-shaking 后
 * **不含该导出**（`style-deps.d.ts` 仍有声明，与已发布版本的既有形态一致）。请勿从产物深路径读取它。
 */
export const componentDependencies = rawComponentDependencies as Partial<Record<ComponentName, ComponentName[]>>

/** 完全没有样式的组件（按需引入返回空） */
export const stylelessComponents = rawStylelessComponents as ComponentName[]

/** 类型守卫：判断传入的组件名是否已被 componentsMap 收录 */
export function isComponentName(name: string): name is ComponentName {
  return name in componentsMap
}
