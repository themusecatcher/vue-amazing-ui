/**
 * `<html>` 全局变量写入与多实例仲裁
 *
 * 只有 `abstract: true` 且处于根作用域的实例才会写 `<html>`。这里集中三件事：
 * 1. 写入/撤销：全量写整张变量表，并在首次写入前记录原值，卸载时逐项恢复；
 * 2. 仲裁：注册表里**最后一个已配置主题**的实例是唯一 owner，失去 owner 立刻撤销；
 * 3. 生命周期：`register()` / `dispose()` 由编排层在 `onMounted` / `onUnmounted` 调用。
 *
 * 为什么不用 head 里的 `<style>`：静态 tag 无法表达「谁最后挂载」，先卸载者还会把仍在
 * 挂载的实例的值一并清掉；注册表 + 唯一 owner 才能保证「同一时刻只有一个写者」。
 */

import { computed, ref } from 'vue'
import type { ComputedRef, Ref } from 'vue'
import { MODE_ATTRIBUTE } from '../theme'
import type { ResolvedMode, ThemeSeed, ThemeSnapshot } from '../theme'
import { isDevEnv, log } from '../utils/log'
import { hasGlobalConfig, hasSeedValue, hasThemeConfig } from './theme-config'
import type { ThemeConfig } from './theme-config'

interface WriterRegistration {
  /** 是否已配置全局主题域（未配置的实例不参与 owner 竞选，避免挡住后面的实例） */
  configured: () => boolean
  /** 重新仲裁：让每个写者按自身位置决定写入还是撤销 */
  sync: () => void
}

/** 模块级注册表：只收录「无祖先作用域、未被离散实例跳过、无包裹元素」的实例 */
const globalWriters: WriterRegistration[] = []

/** 取最后一个已配置主题的写者 —— 它就是全局写入的唯一 owner */
function resolveGlobalOwner(): WriterRegistration | undefined {
  for (let index = globalWriters.length - 1; index >= 0; index -= 1) {
    const candidate = globalWriters[index]
    if (candidate.configured()) {
      return candidate
    }
  }
  return undefined
}

/** 注册 / 注销后让所有写者重新仲裁 */
function refreshGlobalWriters(): void {
  globalWriters.forEach((writer) => writer.sync())
}

export interface GlobalWriterOptions {
  /** 结构上是否可写 `<html>`（无祖先作用域、未被跳过、`abstract: true`） */
  canWriteGlobal: ComputedRef<boolean>
  /** 读取 `theme` prop（保持响应式追踪） */
  getTheme: () => ThemeConfig | undefined
  /** 当前作用域的实际模式 */
  resolvedMode: ComputedRef<ResolvedMode>
  /** 生效种子（决定是否写全局变量表） */
  effectiveSeed: ComputedRef<ThemeSeed | undefined>
  /** 42 个全局语义变量的派生结果 */
  snapshot: ComputedRef<ThemeSnapshot>
  /** 组件级主色变量（与全局变量写在同一节点） */
  componentVars: ComputedRef<Record<string, string>>
}

export interface GlobalWriter {
  /** 是否拥有 `<html>` 写入权 */
  isGlobalOwner: Ref<boolean>
  /** 是否处于「应该写 `<html>`」状态（结构可写 + 配置了全局主题域） */
  writesGlobal: ComputedRef<boolean>
  /** 重新仲裁（主题从无到有 / 从有到无、兄弟实例增删时调用） */
  syncGlobalOwnership: () => void
  /** 按当前状态写入或撤销（主题 / 模式变化时调用） */
  applyGlobal: () => void
  /** 恢复到写入前的快照（卸载、让位、主题移除时调用） */
  restoreGlobal: () => void
  /** 挂载后注册为写者并参与首次仲裁 */
  register: () => void
  /** 卸载时注销、撤销写入并让剩余写者重新仲裁 */
  dispose: () => void
}

/**
 * 创建一个全局写者（每个 ConfigProvider 实例一个）
 *
 * 状态（写入前快照、mode 属性原值）都封装在闭包里，避免实例之间串值。
 */
export function createGlobalWriter(options: GlobalWriterOptions): GlobalWriter {
  // `<html>` 写入资格：结构上可写，且当前确实配置了全局主题域。两者分开：注册表要覆盖
  // 「挂载时未配置、运行期才配置 seed」的场景；但只有组件级配置（没有 seed / mode）的实例
  // 不参与 owner 竞选，否则它会在卸载时把另一个实例写入的全局变量清掉。
  const writesGlobal = computed(() => options.canWriteGlobal.value && hasGlobalConfig(options.getTheme()))
  const isGlobalOwner = ref(false)

  // 写入前的快照：卸载 / 主题移除时逐项恢复，避免误删宿主或其他实例写入的值
  const previousValues = new Map<string, string>()
  let previousModeAttribute: string | null = null
  let modeAttributeWritten = false

  let selfWriter: WriterRegistration | undefined

  /** 重新仲裁：只有最后一个已配置主题的写者持有 `<html>` 写入权 */
  function syncGlobalOwnership(): void {
    if (!writesGlobal.value) {
      if (isGlobalOwner.value) {
        // 运行期从「写 <html>」切到「写包裹元素」：撤销全局写入，避免两处变量同时生效
        isGlobalOwner.value = false
        restoreGlobal()
      }
      return
    }
    const shouldOwn = resolveGlobalOwner() === selfWriter && hasGlobalConfig(options.getTheme())
    if (shouldOwn === isGlobalOwner.value) {
      return
    }
    isGlobalOwner.value = shouldOwn
    if (shouldOwn) {
      if (isDevEnv() && globalWriters.length > 1) {
        log(
          'warn',
          'ConfigProvider',
          '检测到多个顶层主题实例同时存在，只有最后挂载者写入 <html>；嵌套换肤请改用 abstract: false'
        )
      }
      applyGlobal()
    } else {
      // 出现更晚的兄弟实例：撤销自己的写入，避免与新 owner 的值叠加残留
      restoreGlobal()
    }
  }

  function applyGlobal(): void {
    if (typeof document === 'undefined') {
      return
    }
    if (!writesGlobal.value) {
      restoreGlobal()
      return
    }
    if (!isGlobalOwner.value) {
      // 让位给更晚的兄弟实例
      return
    }
    const theme = options.getTheme()
    if (!hasThemeConfig(theme)) {
      // 主题被移除：撤销本实例写过的变量与属性，回到静态默认表
      restoreGlobal()
      return
    }
    const element = document.documentElement
    const mode = options.resolvedMode.value

    const vars: Record<string, string> = {}
    if (hasSeedValue(options.effectiveSeed.value)) {
      Object.assign(vars, options.snapshot.value)
    }
    Object.assign(vars, options.componentVars.value)

    // 只切 mode（无生效种子、无组件配置）：交给静态默认表，只写 data-va-mode
    if (!Object.keys(vars).length) {
      restoreWrittenValues()
      if (theme?.mode !== undefined) {
        writeModeAttribute(element, mode)
      } else {
        restoreModeAttribute()
      }
      return
    }

    // 每次变化全量写整张表：主题切换是低频操作，diff 的簿记成本高于它省下的几次 DOM 写
    Object.entries(vars).forEach(([name, value]) => {
      if (!previousValues.has(name)) {
        previousValues.set(name, element.style.getPropertyValue(name))
      }
      element.style.setProperty(name, value)
    })

    // 本轮不再写入的变量（seed / 组件配置被移除）恢复到写入前的值，避免残留
    const staleNames = [...previousValues.keys()].filter((name) => !(name in vars))
    staleNames.forEach((name) => {
      const value = previousValues.get(name)
      if (value) {
        element.style.setProperty(name, value)
      } else {
        element.style.removeProperty(name)
      }
      previousValues.delete(name)
    })

    if (theme?.mode !== undefined) {
      writeModeAttribute(element, mode)
    } else {
      restoreModeAttribute()
    }
  }

  /** 写 mode 属性并记录首次写入前的值（供卸载恢复） */
  function writeModeAttribute(element: HTMLElement, mode: ResolvedMode): void {
    if (!modeAttributeWritten) {
      previousModeAttribute = element.getAttribute(MODE_ATTRIBUTE)
      modeAttributeWritten = true
    }
    element.setAttribute(MODE_ATTRIBUTE, mode)
  }

  /** 恢复本实例写过的变量（不动 mode 属性） */
  function restoreWrittenValues(): void {
    if (typeof document === 'undefined') {
      return
    }
    const element = document.documentElement
    previousValues.forEach((value, name) => {
      if (value) {
        element.style.setProperty(name, value)
      } else {
        element.style.removeProperty(name)
      }
    })
    previousValues.clear()
  }

  /** 恢复本实例写入前的 mode 属性（不改变量） */
  function restoreModeAttribute(): void {
    if (typeof document === 'undefined' || !modeAttributeWritten) {
      return
    }
    const element = document.documentElement
    if (previousModeAttribute === null) {
      element.removeAttribute(MODE_ATTRIBUTE)
    } else {
      element.setAttribute(MODE_ATTRIBUTE, previousModeAttribute)
    }
    modeAttributeWritten = false
    previousModeAttribute = null
  }

  /** 恢复写入前的快照；未覆盖过的属性移除，让静态默认表重新生效 */
  function restoreGlobal(): void {
    if (typeof document === 'undefined') {
      return
    }
    restoreWrittenValues()
    restoreModeAttribute()
  }

  function register(): void {
    // 用结构判定而不是 `writesGlobal`：挂载时未配置、运行期才加 seed 的实例也要能接管
    if (!options.canWriteGlobal.value) {
      return
    }
    selfWriter = {
      configured: () => hasGlobalConfig(options.getTheme()),
      sync: syncGlobalOwnership
    }
    globalWriters.push(selfWriter)
    refreshGlobalWriters()
  }

  function dispose(): void {
    if (selfWriter) {
      const index = globalWriters.indexOf(selfWriter)
      if (index >= 0) {
        globalWriters.splice(index, 1)
      }
      selfWriter = undefined
    }
    // 先撤销自己的写入，再让剩余写者重新仲裁（仍有 owner 时会补写自己的值）
    isGlobalOwner.value = false
    restoreGlobal()
    refreshGlobalWriters()
  }

  return { isGlobalOwner, writesGlobal, syncGlobalOwnership, applyGlobal, restoreGlobal, register, dispose }
}
