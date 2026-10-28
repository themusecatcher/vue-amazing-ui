import type { InjectionKey, Ref } from 'vue'
import type { ResolvedMode, ThemeSeed, ThemeSnapshot } from '../theme'

/**
 * 「跳过主题变量写入」的注入键
 *
 * 该写入只应由**应用最外层**的 ConfigProvider 执行：`createDiscreteApi` 会在其独立应用内
 * 再挂一个 ConfigProvider（上层没有主题作用域标记），若它也写入，会覆盖主应用写入的
 * `--va-*`，并在 `dispose()` 时把它们一并移除（主应用不会重跑写入）。离散实例经由
 * 此键显式跳过：未传 `configProviderProps.theme` 时浮层通过 CSS 继承沿用主应用主题，
 * 传了则由边界转发自带该作用域的令牌（见 `themeTeleportKey`）。
 *
 * 注意：离散实例的浮层 Teleport 到 `body`，`abstract: false` 只会把变量写到它自己的空
 * 包裹节点上，浮层并不在该节点内，因此**无法**用 `abstract: false` 隔离离散实例的主题。
 *
 * ⚠️ 读取必须用 `injectFromChain`（沿组件实例链），不能用裸 `inject`：离散实例常在
 * `vue-router` 导航守卫（`app.runWithContext`）中被创建，此时裸 `inject` 会改道去翻宿主
 * 应用的 app 级 provides，读不到本键 → 离散实例重新参与 `<html>` 写入，与主应用顶层实例
 * 互相抢写并告警「多个顶层主题实例」。同一原因见 `createDiscreteApi` 中提取器取 api 的写法。
 *
 * - 提供方：`createDiscreteApi`（离散实例根组件）
 * - 消费方：`useThemeScope`（`<html>` 写入资格判定）
 * - 响应式：否（一次性布尔标记）
 * - 未命中：`undefined`，按 `false` 处理，即参与正常写入
 */
export const skipThemeWriteKey: InjectionKey<boolean> = Symbol('vaSkipThemeWrite')

/**
 * 作用域标记：子级据此判定「父链上已存在 ConfigProvider」，只有最外层可写 `<html>`
 *
 * - 提供方：`ConfigProvider`（`useThemeScope`）
 * - 消费方：`useThemeScope`（嵌套判定与告警）
 * - 响应式：否（setup 时固定，运行期切换主题不改变层级）
 * - 未命中：`undefined`，按 `false` 处理，即视为最外层
 */
export const themeScopeKey: InjectionKey<boolean> = Symbol('vaThemeScope')

/**
 * 当前作用域的实际模式：嵌套实例未显式传 mode 时继承父级（作用于变量派生，不写 DOM）
 *
 * - 提供方：`ConfigProvider`（`useThemeScope`）
 * - 消费方：`useThemeScope`（嵌套实例继承父级模式）、`Button`（按模式取组件级主色）
 * - 响应式：是（`Ref<ResolvedMode>`）
 * - 未命中：`undefined`，按「无显式模式」处理
 */
export const themeModeKey: InjectionKey<Ref<ResolvedMode>> = Symbol('vaThemeMode')

/**
 * 当前作用域生效的种子：嵌套实例未传 `seed` 时继承最近一层作用域的种子。
 *
 * 与 `mode` 的继承口径对称 —— 否则「外层换品牌色 + 内层只切暗色」会让子树悄悄退回默认蓝。
 * 传了 `seed` 则整体替换（不做逐字段合并）。
 *
 * - 提供方：`ConfigProvider`（`useThemeSeed`）
 * - 消费方：`useThemeSeed`（子级种子继承）
 * - 响应式：是（`Ref<ThemeSeed | undefined>`）
 * - 未命中：`undefined`，即无继承来源
 */
export const themeSeedKey: InjectionKey<Ref<ThemeSeed | undefined>> = Symbol('vaThemeSeed')

/**
 * 只读快照：仅供 canvas / SVG / 第三方 JS 读取，不作为常规取色方式
 *
 * - 提供方：`ConfigProvider`（`useThemeSeed`）
 * - 消费方：`Watermark`、`QRCode`
 * - 响应式：是（`Ref<ThemeSnapshot>`）
 * - 未命中：`undefined`，消费方回读 `<html>` 上的静态变量表
 */
export const themeSnapshotKey: InjectionKey<Ref<ThemeSnapshot>> = Symbol('vaThemeSnapshot')

/**
 * 变量是否写在 DOM 作用域节点（包裹元素）上，而不是 `<html>`。
 *
 * `Teleport` 只移动 DOM、不移动继承链：写在包裹元素上的变量到不了 body 级浮层，
 * 因此这类作用域需要把当前令牌转发到浮层根节点（见 `themeTeleportKey`）。
 *
 * - 提供方：`ConfigProvider`（`useThemeScope`）
 * - 消费方：`useThemeScope`（子级 DOM 作用域继承、转发判定）
 * - 响应式：否（setup 时固定）
 * - 未命中：`undefined`，按 `false` 处理
 */
export const themeDomScopeKey: InjectionKey<boolean> = Symbol('vaThemeDomScope')

/** 需要转发到 Teleport 浮层的主题：变量 + 模式，二者必须成对下发 */
export interface TeleportTheme {
  /**
   * 当前作用域派生出的令牌：40 个全局别名 + 可能存在的组件级公开令牌。
   *
   * 用宽泛的 `Record<string, string>` 而不是 `ThemeVars`：组件级令牌数量随注册表变化，
   * 浮层只需要把它们原样内联到根节点，不关心具体键集合。
   */
  vars: Readonly<Record<string, string>>
  /**
   * 浮层自带的模式属性：`[data-va-mode]` 驱动的组件色板与 `color-scheme` 才能回环。
   *
   * `undefined` 表示当前作用域没有「确定的模式来源」（未传 seed 也未显式传 mode）：
   * 此时不写属性，让浮层继续继承 `<html>` 上的模式，而不是强制定成 light。
   */
  mode: ResolvedMode | undefined
}

/**
 * Teleport 浮层的主题转发通道。
 *
 * - `null`：变量在 `<html>` 上（或被静态表兜底），浮层直接继承即可；
 * - 非空：浮层根节点需内联 `vars` 并写 `data-va-mode`。
 *
 * - 提供方：`ConfigProvider`（`useThemeScope`）
 * - 消费方：`Modal` / `Dialog` / `Drawer` / `Message` / `Notification` / `LoadingBar` /
 *   `Popup` / `Select` / `AutoComplete` / `BackTop` 等 Teleport 浮层
 * - 响应式：是（`Ref<TeleportTheme | null>`）
 * - 未命中：`undefined`，浮层按「直接继承 `<html>`」处理
 */
export const themeTeleportKey: InjectionKey<Ref<TeleportTheme | null>> = Symbol('vaThemeTeleport')
