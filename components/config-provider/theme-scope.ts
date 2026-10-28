/**
 * ConfigProvider 的主题域（编排层）
 *
 * 值分发全部交给 CSS 继承：Provider 只做三件事 —— 合并种子、调用派生、把变量写到作用域节点。
 * 组件不参与主题，也没有任何 `inject` 主题的入口。
 *
 * 本文件只负责「编排」，具体能力已拆到同目录的模块：
 * - `theme-config.ts`：主题结构、空值判定、组件键工具（纯函数）；
 * - `use-theme-seed.ts`：种子继承、42 个变量派生、组件级主色展开（纯数据）；
 * - `theme-global-writer.ts`：`<html>` 写入、恢复、注册表与唯一 owner 仲裁；
 * - `use-theme-teleport.ts`：浮层转发内容组装（纯函数）；
 * - `theme-mode.ts`：系统配色偏好探测与监听（浏览器 API）。
 *
 * 写入策略（行为不变）：
 * - 未传 `theme`（或传空对象）→ 不写任何变量，也不登记作用域，交给静态默认表；
 * - `abstract: false`（默认）→ 变量与 `data-va-mode` 绑定在包裹元素上（SSR 可直接序列化）；
 * - `abstract: true` → 挂载后写 `<html>`（应用级主题、含 body 级链接），多实例由注册表仲裁；
 * - 只切 mode（无种子）→ 两种形态都不写变量，只写 `data-va-mode`，交给静态表；
 * - Teleport 浮层：变量只写包裹元素时，经 `themeTeleportKey` 转发到浮层根节点；
 * - 嵌套且 `abstract: true` → 没有可承载的 DOM 节点，仅继承外层；
 * - 卸载时恢复写入前的快照，静态默认表重新生效。
 */

import { computed, onMounted, onUnmounted, provide, ref, watch } from 'vue'
import type { ComputedRef, CSSProperties } from 'vue'
import { THEME_VAR_NAMES } from '../theme'
import type { ResolvedMode } from '../theme'
import { injectFromChain } from '../utils'
import { isDevEnv, log } from '../utils/log'
import { skipThemeWriteKey, themeDomScopeKey, themeModeKey, themeScopeKey, themeTeleportKey } from './context'
import type { TeleportTheme } from './context'
import { createGlobalWriter } from './theme-global-writer'
import { hasComponentConfig, hasGlobalConfig, hasSeedValue, hasThemeConfig } from './theme-config'
import type { ThemeConfig } from './theme-config'
import { systemPrefersDark, watchSystemMode } from './theme-mode'
import { useThemeSeed } from './use-theme-seed'
import { resolveTeleportTheme } from './use-theme-teleport'

export type { ComponentThemeConfig, ConfigProviderTheme, ThemeComponentKey, ThemeConfig } from './theme-config'

export interface ThemeScopeOptions {
  /** 读取 `theme` prop（保持响应式追踪） */
  getTheme: () => ThemeConfig | undefined
  /** 是否无包裹元素 */
  getAbstract: () => boolean
}

export interface ThemeScope {
  /** 包裹元素上的变量与 mode（`abstract: false` 时绑定） */
  scopeStyle: ComputedRef<CSSProperties>
  scopeMode: ComputedRef<ResolvedMode | undefined>
}

export function useThemeScope(options: ThemeScopeOptions): ThemeScope {
  // 祖先作用域：仅表示「父链上已有实例真正写过变量」，未配置主题的 Provider 不算
  // 以下均沿实例链读取：离散实例在 `app.runWithContext` 上下文创建，裸 `inject` 会改道到宿主 app
  const ancestorScope = injectFromChain(themeScopeKey) ?? false
  const skipGlobalWrite = injectFromChain(skipThemeWriteKey) ?? false
  const parentMode = injectFromChain(themeModeKey) ?? null
  const ancestorDomScope = injectFromChain(themeDomScopeKey) ?? false
  // 登记作用域供子级判定：只要配置过主题（种子或模式）就登记，空主题实例不占用「最外层」名额。
  // 以 setup 时的 theme 快照判定 —— 嵌套关系在子级 setup 时已固定，运行期切换主题不改变层级。
  // 口径必须与 `scopeMode` 一致：只切 mode 的实例同样构成一个「就近模式作用域」，
  // 其子级不应再抢占 `<html>`（否则嵌套换肤会泄漏成整页换肤）。
  provide(themeScopeKey, ancestorScope || hasThemeConfig(options.getTheme()))

  // 系统偏好只在客户端有意义；SSR 首帧按 light，客户端挂载后由监听纠正
  const systemDark = ref(systemPrefersDark())

  const resolvedMode = computed<ResolvedMode>(() => {
    const mode = options.getTheme()?.mode
    if (mode === 'light' || mode === 'dark') {
      return mode
    }
    if (mode === 'auto') {
      return systemDark.value ? 'dark' : 'light'
    }
    // 未显式传 mode：继承父级作用域，避免在暗色区域内派生出浅色变量。
    // 这里看的是「是否有父级作用域节点」，与父级是否写过变量无关（只切 mode 的父级同样要继承）
    return parentMode ? parentMode.value : 'light'
  })
  provide(themeModeKey, resolvedMode)

  // 种子继承 + 42 个变量派生 + 组件级主色展开（内部会 provide 种子与快照通道）
  const { effectiveSeed, snapshot, componentVars } = useThemeSeed({ getTheme: options.getTheme, resolvedMode })

  const configured = computed(() => hasThemeConfig(options.getTheme()))

  // DOM 作用域：变量写在包裹元素上（配置过主题且非 abstract），或祖先已是 DOM 作用域。
  // 嵌套层级在 setup 时固定，故以快照值下发；Teleport 浮层据此判断是否需要自带变量。
  const selfScoped = computed(() => hasThemeConfig(options.getTheme()) && !options.getAbstract())
  const domScope = ancestorDomScope || selfScoped.value
  provide(themeDomScopeKey, domScope)

  // `mode="auto"` 的首帧延迟：系统偏好在服务端不可知，此时下发任何值都会与客户端首次渲染不一致
  // （hydration mismatch）。因此 auto 模式在挂载前不写变量与 mode 属性 —— SSR 与客户端首帧
  // 两侧都是空，hydration 完成后由 onMounted 补写（Vue 保证 mounted 只在 hydration 之后触发）。
  // 显式 mode 时首帧即可确定，仍保持「首帧即正确」
  const mounted = ref(false)
  const deferForAuto = computed(() => options.getTheme()?.mode === 'auto' && !mounted.value)
  // 先于下方 writer 注册的 onMounted 执行（同一组件内按注册顺序）：
  // `mode="auto"` + `abstract: true` 的首帧补齐依赖此处已把 mounted 置为 true，
  // 否则注册写者时的首次 applyGlobal 仍会被 deferForAuto 拦住，变量不会写入。
  onMounted(() => {
    mounted.value = true
  })

  const scopeStyle = computed<CSSProperties>(() => {
    // 只切 mode（无生效种子、无组件配置）时不写变量：交给静态默认表
    // （`[data-va-mode]` 已声明两个模式的全量表）。若在这里写内联变量，
    // 会遮蔽宿主对 `:root` 单个 `--va-*` 的覆盖，也让「纯 CSS 切暗色」失效。
    if (!configured.value || deferForAuto.value) {
      return {}
    }
    const style: Record<string, string> = {}
    if (hasSeedValue(effectiveSeed.value)) {
      const vars = snapshot.value
      THEME_VAR_NAMES.forEach((name) => {
        style[name] = vars[name]
      })
    }
    Object.assign(style, componentVars.value)
    return style as CSSProperties
  })

  const scopeMode = computed<ResolvedMode | undefined>(() => {
    if (!configured.value || deferForAuto.value) {
      return undefined
    }
    // 只配置组件主色、没有 seed / 显式 mode 时不声明模式：组件令牌已经按继承到的模式派生，
    // 其余变量继续继承外层 / 静态表；此时再写 `data-va-mode` 会让静态表在包裹元素上
    // 重新声明全量变量，反而遮蔽宿主对 `:root` 的覆盖。
    if (options.getTheme()?.mode === undefined && !hasSeedValue(effectiveSeed.value)) {
      return undefined
    }
    return resolvedMode.value
  })

  // `<html>` 写入：结构资格 + 注册表仲裁 + 恢复，全部收敛在 writer 内
  const writer = createGlobalWriter({
    canWriteGlobal: computed(() => !ancestorScope && !skipGlobalWrite && options.getAbstract()),
    getTheme: options.getTheme,
    resolvedMode,
    effectiveSeed,
    snapshot,
    componentVars
  })
  const { writesGlobal, isGlobalOwner, syncGlobalOwnership, applyGlobal, register, dispose } = writer

  // Teleport 浮层转发：变量不在 `<html>` 上时（DOM 作用域 / 被降级的离散实例 / 未拿到写入权的顶层实例），
  // 浮层必须自带一份当前作用域的令牌；真正持有 `<html>` 的 owner 不转发，让浮层直接继承。
  // 父级通道：自身未配置主题时透传 —— 否则嵌套一个空 ConfigProvider 会 provide(null)，
  // 把外层作用域已建立的转发通道切断，其子树里的浮层退回 <html> 的静态表。
  const parentTeleportTheme = injectFromChain(themeTeleportKey) ?? null
  const teleportTheme = computed<TeleportTheme | null>(() => {
    if (!configured.value) {
      return parentTeleportTheme?.value ?? null
    }
    // 走到这里 configured 必为 true（未配置已在上方透传父级通道），故不再重复判断
    const needsForward =
      ancestorDomScope || selfScoped.value || skipGlobalWrite || (writesGlobal.value && !isGlobalOwner.value)
    if (!needsForward || deferForAuto.value) {
      // 保持惰性：不需要转发时不读取 snapshot，未配置主题的实例不会触发派生
      return null
    }
    const theme = resolveTeleportTheme({
      seeded: hasSeedValue(effectiveSeed.value),
      explicitMode: options.getTheme()?.mode !== undefined,
      getSnapshot: () => snapshot.value,
      componentVars: componentVars.value,
      mode: resolvedMode.value
    })
    // 没有可转发的内容（组件主色非法 / 只配了未支持的键，且无种子与显式 mode）：
    // 不建立通道，浮层直接继承 `<html>` 上的静态表或宿主主题。
    if (!Object.keys(theme.vars).length && theme.mode === undefined) {
      return null
    }
    return theme
  })
  provide(themeTeleportKey, teleportTheme)

  let stopSystemMode: (() => void) | null = null
  function syncSystemModeListener(): void {
    const auto = options.getTheme()?.mode === 'auto'
    if (auto && !stopSystemMode) {
      // 重新探测：离开 auto 期间系统配色可能已变化，不能沿用陈旧值
      systemDark.value = systemPrefersDark()
      stopSystemMode = watchSystemMode((dark) => {
        systemDark.value = dark
      })
    } else if (!auto && stopSystemMode) {
      stopSystemMode()
      stopSystemMode = null
    }
  }

  watch(
    () => options.getTheme()?.mode,
    () => {
      syncSystemModeListener()
    }
  )

  let stopThemeWatch: (() => void) | null = null
  onMounted(() => {
    syncSystemModeListener()
    // 注册为全局写者参与仲裁（不登记的实例无法成为 owner，也不影响别人的仲裁）
    register()
    stopThemeWatch = watch(
      [() => options.getTheme(), resolvedMode],
      () => {
        // 主题从无到有 / 从有到无都会改变竞选资格，需先重仲裁再写入
        syncGlobalOwnership()
        applyGlobal()
      },
      { deep: true }
    )
  })
  onUnmounted(() => {
    stopThemeWatch?.()
    stopThemeWatch = null
    stopSystemMode?.()
    stopSystemMode = null
    // 注销 + 撤销写入 + 让剩余写者重新仲裁
    dispose()
  })

  if (
    isDevEnv() &&
    !skipGlobalWrite &&
    !ancestorScope &&
    options.getAbstract() &&
    hasComponentConfig(options.getTheme()) &&
    !hasGlobalConfig(options.getTheme())
  ) {
    // 只有组件级配置、没有 seed / mode：不参与 <html> 写入权仲裁，否则会清掉别的实例写入的全局变量
    log(
      'warn',
      'ConfigProvider',
      'theme.components 在 abstract: true 时需与 seed / mode 同层才能写入 <html>；请补充 seed / mode，或改用 abstract: false'
    )
  }

  if (isDevEnv() && ancestorScope && options.getAbstract() && hasThemeConfig(options.getTheme())) {
    // 嵌套在已生效的主题作用域内且无包裹元素：没有可写变量与 mode 的节点，只能随外层生效
    log('warn', 'ConfigProvider', '嵌套实例需传 abstract: false 才能隔离主题（当前无包裹元素，已随外层生效）')
  }

  return { scopeStyle, scopeMode }
}
