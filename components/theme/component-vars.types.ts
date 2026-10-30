/**
 * 组件级公开令牌注册表的类型定义
 *
 * 注册表实现是 `component-vars.js`（Node 脚本与运行期共用的单一数据源，必须是 `.js`：
 * `scripts/` 下的脚本由 `node` 直接执行，Node 20.19 / 22.12 都不支持 import `.ts`）。
 * 但 `tsc` 不会把手写的 `.d.ts` 搬进产物，而类型是公开 API 的一部分
 * （使用方 `import type { ThemeComponentKey } from 'vue-amazing-ui'` 要能解析），
 * 所以类型写在普通 `.ts` 里，由编译器随 `index.d.ts` 一并产出。
 *
 * `.js` 侧的值声明仍在 `component-vars.d.ts`，两处分工：本文件管类型，那边管「`.js` 导出什么」。
 */

/** 组件级通用主色派生出的状态档位（与 `deriveColorStates` 的返回键一致） */
export type ComponentThemeState = 'base' | 'hover' | 'active' | 'bg' | 'border' | 'solid'

/**
 * `theme.components` 的配置键：已接线组件级主色的内置组件
 *
 * 与 `THEME_COMPONENTS` 的 key 集合逐项一致（顺序也一致）：注册表是运行期数据源，
 * 本类型是编译期入口。两份数据漂移时会出现「IDE 报错但运行期可用」或反之，
 * 因此由 `pnpm verify:theme` 与 `tests/component-vars.spec.ts` 双向守护。
 *
 * 新增组件支持时：先接线样式 + 登记 `THEME_COMPONENTS`，再补到这里。
 */
export type ThemeComponentKey =
  | 'Alert'
  | 'AutoComplete'
  | 'BackTop'
  | 'Badge'
  | 'Button'
  | 'Calendar'
  | 'Carousel'
  | 'Cascader'
  | 'Checkbox'
  | 'ColorPicker'
  | 'DatePicker'
  | 'FloatButton'
  | 'GradientText'
  | 'Image'
  | 'Input'
  | 'InputNumber'
  | 'InputSearch'
  | 'LoadingBar'
  | 'Menu'
  | 'Message'
  | 'Modal'
  | 'Notification'
  | 'Pagination'
  | 'Popconfirm'
  | 'Progress'
  | 'Radio'
  | 'Select'
  | 'Slider'
  | 'Spin'
  | 'Steps'
  | 'Swiper'
  | 'Switch'
  | 'Table'
  | 'Tabs'
  | 'Tag'
  | 'TextScroll'
  | 'Textarea'
  | 'TimePicker'
  | 'Timeline'
  | 'Upload'

/** 组件令牌元数据 */
export interface ComponentVarMeta {
  /** 所属组件名（与 `theme.components.<Component>` 的键一致）；Scrollbar 等仅有公开令牌、无桥接线的组件也在此列 */
  component: string
  /** 所属组件源文件（相对 components/） */
  file: string
  /** 令牌组：同一视觉元素的状态族 */
  group: string
  /** 必须与组件样式里的 `var(name, fallback)` 逐字一致 */
  fallback: string
  /** fallback 指向组件私有名时提供的实际默认值 */
  resolved?: { light: string; dark: string }
  /** 组件级通用色角色；未标记表示不跟随组件主色 */
  themeRole?: 'primary'
  /** 取派生状态的哪一档；按模式分列用于皮肤/模式映射不同的组件 */
  themeState?: ComponentThemeState | { light: ComponentThemeState; dark: ComponentThemeState }
  /** 面向使用者的说明 */
  description: string
}

/** 已接线组件级主色的组件清单 */
export interface ThemeComponentMeta {
  /** `theme.components` 的配置键 */
  key: ThemeComponentKey
  /** 组件源码目录（相对 components/） */
  dir: string
}
