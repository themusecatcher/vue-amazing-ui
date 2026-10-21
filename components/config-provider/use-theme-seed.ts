/**
 * 主题种子的合并、派生与组件级主色展开
 *
 * 负责三件事（都不碰 DOM）：
 * 1. 合并种子：自身传了整份替换，否则继承最近一层作用域；
 * 2. 派生 40 个全局语义变量（`derive`，纯函数）；
 * 3. 展开 `theme.components.<Component>.primaryColor` 为组件变量（桥 + 公开令牌）。
 *
 * 拆分原因：这部分是「纯数据 → 纯数据」，与 `<html>` 写入、Teleport 转发、生命周期无关，
 * 独立后可以单独测试 `buildComponentVars`，也避免编排文件被 200 行派生逻辑淹没。
 */

import { computed, inject, provide, watch } from 'vue'
import type { ComputedRef } from 'vue'
import { COMPONENT_VARS_BY_COMPONENT, derive, deriveColorStates, deriveFocusShadow, normalizeSeedColor } from '../theme'
import type { ResolvedMode, ThemeSeed, ThemeSnapshot } from '../theme'
import { isDevEnv, log } from '../utils/log'
import { THEME_SEED_KEY, THEME_SNAPSHOT_KEY } from './context'
import { COMPONENT_THEME_SUPPORT, componentKeyToKebab } from './theme-config'
import type { ComponentThemeConfig, ThemeConfig } from './theme-config'

/**
 * 组件级主色 → CSS 变量（纯函数）
 *
 * 公开配置只有 `{ primaryColor }`，这里展开成两类变量：
 * 1. 内部通用桥 `--va-cp-<kebab>-primary-*`：所有组件样式统一消费，新增组件只需接线样式；
 * 2. 公开组件令牌映射：Button / Slider / Menu 等注册表里带 `themeRole` 的令牌，
 *    保留给细粒度 CSS 覆盖与文档契约。
 *
 * **两类变量是「同时写、由组件样式二选一消费」，不是覆盖关系**：
 * - 有 `themeRole` 的组件（Button / Slider / Menu）会同时拿到桥与公开令牌；Button / Menu 的
 *   样式只读公开令牌，桥对它们是**冗余写入** —— 这是「所有组件统一写 7 个桥变量」换来的规则简单
 *   （新增组件不必判断走哪条通道，也不需要在运行期知道「某组件是否读桥」）；
 * - Slider 仍读 1 个桥（`--va-cp-slider-primary-border-color`，聚焦边框），因此**不能**按
 *   「是否有 themeRole」一刀切裁剪桥；要裁剪就得引入「组件是否读桥」的元数据与配套守护；
 * - 冗余写入不会造成视觉问题：组件样式的 `var(a, b)` 只引用其中一个名字，另一个不参与计算。
 *
 * 其余组件只读桥；有公开令牌但未标 `themeRole` 的组件（Table / Card 等），其令牌由使用者
 * 手写覆盖，Provider 不写。
 *
 * 非法主色只告警并跳过该组件配置，不影响其余组件与全局种子。
 *
 * @param components - `theme.components` 配置（可为空）
 * @param mode - 当前作用域的实际模式（决定 hover / active 取哪一档）
 */
export function buildComponentVars(components: ThemeConfig['components'], mode: ResolvedMode): Record<string, string> {
  if (!components) {
    return {}
  }
  const vars: Record<string, string> = {}
  const entries = Object.entries(components) as Array<[string, ComponentThemeConfig | undefined]>
  entries.forEach(([component, config]) => {
    if (!COMPONENT_THEME_SUPPORT.has(component)) {
      return
    }
    const primary = config?.primaryColor
    if (primary === undefined) {
      return
    }
    // 与 seed 共用同一归一化口径：`#rrggbbff` 收敛为 `#rrggbb`，半透明 / 非法值才告警。
    // 组件主色的输入经常直接来自颜色选择器的 8 位输出，两处口径必须一致。
    const normalizedPrimary = normalizeSeedColor(primary)
    if (!normalizedPrimary) {
      if (isDevEnv()) {
        log(
          'warn',
          'ConfigProvider',
          `theme.components.${component}.primaryColor 非法（只接受不透明的 #rgb / #rrggbb / #rrggbbff）：${String(primary)}，已忽略该组件配置`
        )
      }
      return
    }
    const states = deriveColorStates(normalizedPrimary, mode)
    // 组件级通用桥：所有组件样式统一消费 `--va-cp-<kebab>-primary-*`，
    // 因此新增组件时只需接线样式，不必再给每个组件设计一套公开令牌。
    const bridgePrefix = `--va-cp-${componentKeyToKebab(component)}`
    vars[`${bridgePrefix}-primary-color`] = states.base
    vars[`${bridgePrefix}-primary-color-hover`] = states.hover
    vars[`${bridgePrefix}-primary-color-active`] = states.active
    vars[`${bridgePrefix}-primary-bg-color`] = states.bg
    vars[`${bridgePrefix}-primary-border-color`] = states.border
    vars[`${bridgePrefix}-primary-text-color`] = states.base
    vars[`${bridgePrefix}-focus-shadow`] = deriveFocusShadow(normalizedPrimary, mode)
    // 预索引：只遍历该组件带 themeRole 的令牌（通常 3~4 条），不再全表扫描 48 条
    ;(COMPONENT_VARS_BY_COMPONENT[component] ?? []).forEach(([name, meta]) => {
      const state = typeof meta.themeState === 'string' ? meta.themeState : meta.themeState?.[mode]
      if (state) {
        vars[name] = states[state]
      }
    })
  })
  return vars
}

export interface ThemeSeedScopeOptions {
  /** 读取 `theme` prop（保持响应式追踪） */
  getTheme: () => ThemeConfig | undefined
  /** 当前作用域的实际模式（由编排层解析，含父级继承与系统偏好） */
  resolvedMode: ComputedRef<ResolvedMode>
}

export interface ThemeSeedScope {
  /** 生效种子：自身传了整体替换，否则继承最近一层作用域的种子 */
  effectiveSeed: ComputedRef<ThemeSeed | undefined>
  /** 40 个全局语义变量的只读派生结果 */
  snapshot: ComputedRef<ThemeSnapshot>
  /** 组件级主色展开出的变量（桥 + 公开令牌） */
  componentVars: ComputedRef<Record<string, string>>
}

/**
 * 建立当前作用域的种子派生：注入父级种子、派生变量、告警未支持的组件键
 *
 * 会 `provide` 两个通道给子级/浮层使用：`THEME_SEED_KEY`（种子继承）与
 * `THEME_SNAPSHOT_KEY`（canvas / SVG 等需要真实色值的场景）。
 */
export function useThemeSeed(options: ThemeSeedScopeOptions): ThemeSeedScope {
  const parentSeed = inject(THEME_SEED_KEY, null)

  // 生效种子：自身传了整份替换，否则继承最近一层作用域的种子 —— 与 mode 的继承口径对称，
  // 否则「外层换品牌色 + 内层只切暗色」会让子树悄悄退回默认蓝
  const effectiveSeed = computed<ThemeSeed | undefined>(() => options.getTheme()?.seed ?? parentSeed?.value)
  provide(THEME_SEED_KEY, effectiveSeed)

  const snapshot = computed<ThemeSnapshot>(() => derive(effectiveSeed.value ?? {}, options.resolvedMode.value))
  provide(THEME_SNAPSHOT_KEY, snapshot)

  const componentVars = computed<Record<string, string>>(() =>
    buildComponentVars(options.getTheme()?.components, options.resolvedMode.value)
  )

  // 未登记的组件键只告警一次：它们没有 themeRole 令牌可写，配置不会生效。
  // 放在 setup 的 watch 里而不是 computed 里，避免每次重算都刷同一条告警。
  const warnedComponents = new Set<string>()
  watch(
    () => options.getTheme()?.components,
    (components) => {
      if (!isDevEnv() || !components) {
        return
      }
      Object.keys(components).forEach((component) => {
        if (COMPONENT_THEME_SUPPORT.has(component) || warnedComponents.has(component)) {
          return
        }
        warnedComponents.add(component)
        log(
          'warn',
          'ConfigProvider',
          `theme.components.${component} 暂不支持组件级主色（支持清单见组件级令牌文档），请改用 --va-${componentKeyToKebab(component)}-* 令牌或嵌套作用域`
        )
      })
    },
    { immediate: true, deep: true }
  )

  return { effectiveSeed, snapshot, componentVars }
}
