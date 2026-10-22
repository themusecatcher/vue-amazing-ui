/**
 * 颜色派生（同构纯函数，构建期与运行期共用）
 *
 * 一个文件承担三件紧耦合的事：
 * 1. 种子校验与默认值（唯一配置面）；
 * 2. 色阶 → 语义角色的映射；
 * 3. 组装 40 个别名变量。
 *
 * 为什么合在一起：三者只服务于 `derive`，拆开会让「读一个派生结果要翻三个文件」。
 * 模式解析与 DOM 监听属于 Provider，不放这里 —— 本模块因此可以在 Node 构建期直接执行。
 *
 * 产物只含 `#rrggbb` / `rgba()`，不输出 `oklch()` / `color-mix()`，无浏览器基线依赖。
 */

import { generate } from '@ant-design/colors'
import { TinyColor } from '@ctrl/tinycolor'
import { log } from '../utils/log'
import { THEME_VAR_NAMES } from './vars'
import type { ResolvedMode } from './vars'
import type { ThemeVarName, ThemeVars } from './vars'

/* -------------------------------------------------------------------------- */
/* 种子（配置面）                                                              */
/* -------------------------------------------------------------------------- */

/** 颜色种子：配置面，唯一可传输入；未传的项取默认值 */
export interface ThemeSeed {
  primary?: string
  success?: string
  warning?: string
  error?: string
  /** 未传时跟随 primary，不重复派生 */
  info?: string
  /** 中性文本基准（透明度阶梯的叠加色） */
  neutralText?: string
  /** 中性背景基准；显式传入时两个模式共用 */
  neutralBg?: string
}

/** 种子字段名（含 `info`，用于遍历校验） */
export const SEED_KEYS = ['primary', 'success', 'warning', 'error', 'info', 'neutralText', 'neutralBg'] as const

/** 种子字段名 */
export type SeedKey = (typeof SEED_KEYS)[number]

/**
 * 默认种子
 *
 * `primary` 本版保持 `#1677ff`（与升级前的默认外观一致）；新品牌色与架构变更同版本发布时只需改这一处。
 * `info` 不设默认值：未传时直接复用 primary 的三件套。
 * 中性基准：`neutralText = #000000`（配合透明度阶梯得到 `rgba(0,0,0,.88)`）。
 */
export const DEFAULT_SEEDS: Readonly<Omit<Required<ThemeSeed>, 'info'>> = Object.freeze({
  primary: '#1677ff',
  success: '#52c41a',
  warning: '#faad14',
  error: '#ff4d4f',
  neutralText: '#000000',
  neutralBg: '#ffffff'
})

/** 默认主色（演示站 / 文档站的单一来源，避免与 `DEFAULT_SEEDS` 各写一份而漂移） */
export const DEFAULT_PRIMARY = DEFAULT_SEEDS.primary

/**
 * 归一化后的种子：字段齐全，`info` 已回落到 primary
 *
 * 注意中性字段的口径：`neutralText` / `neutralBg` 是**浅色基准**（暗色默认反转成
 * `#ffffff` / `#000000`，由 `derive` 内部的 `neutralBases` 处理）。外部需要暗色下的
 * 实际中性色时请读 `derive(seed, 'dark')` 的结果，不要拿本类型的字段直接使用。
 */
export type ResolvedSeeds = Readonly<Required<ThemeSeed>>

/**
 * 合法种子：`#rgb` / `#rrggbb`（不接受颜色名、`rgb()` 字符串、带 alpha 的 8 位 hex）
 *
 * 8 位 hex 会被 `@ant-design/colors` 原样带进色阶（基色变成半透明），派生出的按钮底色 /
 * 文字对比度全部失真；种子表达的是「不透明品牌色」，alpha 应在外层用作用域覆盖实现。
 */
const HEX_PATTERN = /^#(?:[0-9a-f]{3}|[0-9a-f]{6})$/i

/**
 * 不透明的 8 位 hexa：`#rrggbbff`
 *
 * 颜色选择器（如本库 `ColorPicker` 的 hex 模式）默认带 alpha 通道输出这一形态，其语义与
 * 6 位 hex 完全等价；种子若一概拒绝，会让「把颜色选择器直接绑定种子」的用法在拖拽后静默失效。
 */
const HEXA_OPAQUE_PATTERN = /^#([0-9a-f]{6})ff$/i

/**
 * 判断是否为「严格 3 / 6 位」hex（不含 alpha）
 *
 * 仅作为历史工具保留：种子与组件主色的校验请用 `normalizeSeedColor`（它接受
 * `#rrggbbff`，半透明仍拒绝）。直接用本函数校验颜色输入会把颜色选择器常见的
 * 8 位不透明输出误判为非法。
 *
 * @param value - 待校验的字符串
 */
export function isHexColor(value: unknown): value is string {
  return typeof value === 'string' && HEX_PATTERN.test(value.trim())
}

/**
 * 归一化为种子可用的不透明 hex
 *
 * 只做一件事：把 `#rrggbbff` 收敛为 `#rrggbb`。半透明（alpha < 1）与其它非法形态一律返回
 * `undefined`，由调用方按「非法」处理 —— 种子表达的是不透明品牌色。
 *
 * 这是「颜色输入」的唯一校验口径：`seed`、`deriveColorStates` 与 `ConfigProvider` 的
 * 组件级主色都必须走它，否则会出现「同一种写法在 seed 生效、在 components 被拒」的不一致
 * （组件主色的输入常常直接来自颜色选择器的 8 位输出）。
 *
 * @param value - 待归一化的字符串
 * @returns 不透明 `#rrggbb`（小写）；非法或半透明时返回 `undefined`
 */
export function normalizeSeedColor(value: unknown): string | undefined {
  if (typeof value !== 'string') {
    return undefined
  }
  const trimmed = value.trim()
  const opaque = HEXA_OPAQUE_PATTERN.exec(trimmed)
  const normalized = opaque ? `#${opaque[1]}` : trimmed
  return HEX_PATTERN.test(normalized) ? normalized.toLowerCase() : undefined
}

/** 从默认种子构造一份完整种子（`info` 跟随 primary） */
export function createSeeds(seed: ThemeSeed = {}): ResolvedSeeds {
  const primary = resolveSeedField('primary', seed.primary)
  return {
    primary,
    success: resolveSeedField('success', seed.success),
    warning: resolveSeedField('warning', seed.warning),
    error: resolveSeedField('error', seed.error),
    info: resolveSeedField('info', seed.info, primary),
    neutralText: resolveSeedField('neutralText', seed.neutralText),
    neutralBg: resolveSeedField('neutralBg', seed.neutralBg)
  }
}

/**
 * 解析单个种子字段：非法值告警并回退默认值，不中断其余字段
 *
 * @param key - 字段名，仅用于告警文案
 * @param value - 使用者传入的值
 * @param fallback - 非法 / 未传时的回落值，默认取 `DEFAULT_SEEDS` 同名字段
 */
function resolveSeedField(key: Exclude<SeedKey, 'info'>, value: string | undefined, fallback?: string): string
function resolveSeedField(key: 'info', value: string | undefined, fallback: string): string
function resolveSeedField(key: SeedKey, value: string | undefined, fallback?: string): string {
  const defaultValue = fallback ?? (DEFAULT_SEEDS as Readonly<Record<string, string>>)[key]
  if (value === undefined) {
    return defaultValue
  }
  const normalized = normalizeSeedColor(value)
  if (!normalized) {
    log(
      'warn',
      'ConfigProvider',
      `theme.seed.${key} 非法（只接受不透明的 #rgb / #rrggbb / #rrggbbff）：${String(value)}，已回退默认值`
    )
    return defaultValue
  }
  return normalized
}

/* -------------------------------------------------------------------------- */
/* 色阶 → 语义角色                                                             */
/* -------------------------------------------------------------------------- */

/** 一个颜色派生出的语义角色 */
interface ColorRoles {
  /** 浅底（色阶 1 档） */
  bg: string
  /** 描边（色阶 3 档） */
  border: string
  /** 悬停（色阶 5 档） */
  hover: string
  /**
   * 更淡一档的悬停色（色阶 4 档，用于链接 hover）
   *
   * 浅色下比常态更浅；暗色下该档位比常态更暗、在深底上可读性明显下降，故暗色沿用 `hover` 档，
   * 只影响暗色链接悬停。
   */
  hoverSoft: string
  /** 常态（色阶 6 档） */
  base: string
  /** 按下（色阶 7 档） */
  active: string
  /** 主色文字（与常态同档，浅色下即种子本身；链接走 info 的角色） */
  text: string
}

/**
 * 色阶索引（0-based）
 *
 * 浅色 1..10 档 = `[0][1][2][3][4][5][6][4][5][6]`，暗色 = `[0][1][2][3][6][5][4][6][5][4]`。
 */
const LIGHT_INDEX: Readonly<Record<keyof ColorRoles, number>> = {
  bg: 0,
  border: 2,
  hover: 4,
  hoverSoft: 3,
  base: 5,
  active: 6,
  text: 5
}
const DARK_INDEX: Readonly<Record<keyof ColorRoles, number>> = {
  bg: 0,
  border: 2,
  hover: 6,
  // 该角色理论取 3 档，但暗色下比常态更暗（#15417e），在深底上几乎不可读，故取 hover 档
  hoverSoft: 6,
  base: 5,
  active: 4,
  text: 5
}

/**
 * 按色阶索引派生一个颜色的语义角色
 *
 * 浅色常态 = 种子本身，暗色常态取暗色色阶第 6 档；不做可读性改写 ——
 * 品牌色是否足够可读由选色负责，而不是由主题系统兜底。
 */
function colorRoles(color: string, mode: ResolvedMode): ColorRoles {
  const colors = generate(color, { theme: mode === 'dark' ? 'dark' : 'default' })
  const index = mode === 'dark' ? DARK_INDEX : LIGHT_INDEX
  return {
    bg: colors[index.bg],
    border: colors[index.border],
    hover: colors[index.hover],
    hoverSoft: colors[index.hoverSoft],
    base: colors[index.base],
    active: colors[index.active],
    text: colors[index.text]
  }
}

/** 中性色角色 */
interface NeutralRoles {
  container: string
  /** 浮层底（Popover / Dropdown / Select 面板等），暗色比 container 提亮一档以拉开层级 */
  elevated: string
  layout: string
  /** 反色浮层底（Tooltip 等「聚光」表面） */
  spotlight: string
  border: string
  split: string
  text1: string
  text2: string
  text3: string
  disabled: string
  fill1: string
  fill2: string
  /** 最强的一档中性叠加，水印等需要更高可见度的默认色取它 */
  fill3: string
  /** 最淡的一档中性叠加，默认标签底、结果区底纹取它 */
  fill4: string
}

/**
 * 按中性色阶梯派生
 *
 * 透明度：浅色文本 0.88 / 0.65 / 0.45 / 0.25、暗色 0.85 / 0.65 / 0.45 / 0.25；
 * 填充浅色 0.04 / 0.06、暗色 0.08 / 0.12；背景与边框按固定明暗量偏移。
 */
function neutralRoles(bgBase: string, textBase: string, mode: ResolvedMode): NeutralRoles {
  const dark = mode === 'dark'
  const solid = (amount: number): string => {
    const color = new TinyColor(bgBase)
    return (dark ? color.lighten(amount) : color.darken(amount)).toHexString()
  }
  const alpha = (value: number): string => new TinyColor(textBase).setAlpha(value).toRgbString()
  return {
    container: solid(dark ? 8 : 0),
    // 浅色与容器同值，暗色提亮到 solid 12，浮层才不会与页面容器同色
    elevated: solid(dark ? 12 : 0),
    layout: solid(dark ? 0 : 4),
    // 反色浮层底：浅色取文本基色 85% 透明度，暗色取背景基色提亮一档
    spotlight: dark ? solid(26) : alpha(0.85),
    border: solid(dark ? 26 : 15),
    split: solid(dark ? 19 : 6),
    text1: alpha(dark ? 0.85 : 0.88),
    text2: alpha(0.65),
    text3: alpha(0.45),
    disabled: alpha(0.25),
    fill1: alpha(dark ? 0.08 : 0.04),
    fill2: alpha(dark ? 0.12 : 0.06),
    fill3: alpha(dark ? 0.18 : 0.15),
    fill4: alpha(dark ? 0.04 : 0.02)
  }
}

/* -------------------------------------------------------------------------- */
/* 组装 40 个变量                                                              */
/* -------------------------------------------------------------------------- */

/** 主色派生出的状态集合（供带颜色 props 的组件按实例派生） */
export interface ColorStates {
  base: string
  hover: string
  active: string
  bg: string
  border: string
  /** 实色底上的前景色，两种模式恒为白（与 `--va-text-color-solid` 同源） */
  solid: string
}

/** 浮层投影 */
const POPUP_SHADOW =
  '0 6px 16px 0 rgba(0, 0, 0, 0.08), 0 3px 6px -4px rgba(0, 0, 0, 0.12), 0 9px 28px 8px rgba(0, 0, 0, 0.05)'

/** 遮罩 */
const MASK_COLOR = 'rgba(0, 0, 0, 0.45)'

/** 主色底上的前景色：两种模式恒为白 */
const SOLID_TEXT_COLOR = '#ffffff'

/** 派生缓存上限：种子通常极少，设上限只为兜住「把颜色选择器直接绑定种子」的极端用法 */
const CACHE_LIMIT = 50
const deriveCache = new Map<string, ThemeVars>()

/**
 * 未显式传入中性种子时的模式基准
 *
 * 浅色 `#ffffff` / `#000000`，暗色 `#000000` / `#ffffff`。
 * 显式传入时两个模式共用同一个基准。
 */
function neutralBases(seed: ThemeSeed, mode: ResolvedMode): { bg: string; text: string } {
  const dark = mode === 'dark'
  const bg = normalizeSeedColor(seed.neutralBg) ?? (dark ? '#000000' : DEFAULT_SEEDS.neutralBg)
  const text = normalizeSeedColor(seed.neutralText) ?? (dark ? '#ffffff' : DEFAULT_SEEDS.neutralText)
  return { bg, text }
}

/**
 * 计算「等效半透明前景色」：把实色改写为叠在指定底色上视觉一致的 rgba
 *
 * 用于焦点环 —— 叠在 addon / 灰底上会自然融合，而不是糊一块不透明浅色。
 * 从 0.01 起逐步增大 α，取第一个能反解出合法 RGB 的取值；前景色本身带透明度时原样返回。
 *
 * 仅主题派生内部使用（不对外导出）：公开的「透明度颜色」工具已随本版移除。
 */
function alphaOver(frontColor: string, backgroundColor: string): string {
  const { r: fR, g: fG, b: fB, a: originAlpha } = new TinyColor(frontColor).toRgb()
  if (originAlpha < 1) return frontColor
  const { r: bR, g: bG, b: bB } = new TinyColor(backgroundColor).toRgb()
  for (let fA = 0.01; fA <= 1; fA += 0.01) {
    const r = Math.round((fR - bR * (1 - fA)) / fA)
    const g = Math.round((fG - bG * (1 - fA)) / fA)
    const b = Math.round((fB - bB * (1 - fA)) / fA)
    if (r >= 0 && r <= 255 && g >= 0 && g <= 255 && b >= 0 && b <= 255) {
      return new TinyColor({ r, g, b, a: Math.round(fA * 100) / 100 }).toRgbString()
    }
  }
  return new TinyColor({ r: fR, g: fG, b: fB, a: 1 }).toRgbString()
}

/**
 * 派生 40 个语义别名变量
 *
 * @param seed - 颜色种子（未传字段取默认值，非法值回退默认值）
 * @param mode - 实际模式（`light` / `dark`，由 Provider 解析）
 * @returns 变量名 → sRGB 色值；键集合与 `THEME_VAR_NAMES` 完全一致
 */
export function derive(seed: ThemeSeed = {}, mode: ResolvedMode = 'light'): ThemeVars {
  const resolved = createSeeds(seed)
  const cacheKey = `${resolved.primary}|${resolved.success}|${resolved.warning}|${resolved.error}|${resolved.info}|${resolved.neutralText}|${resolved.neutralBg}|${mode}`
  const cached = deriveCache.get(cacheKey)
  if (cached) {
    return cached
  }

  const { bg: bgBase, text: textBase } = neutralBases(seed, mode)
  const neutral = neutralRoles(bgBase, textBase, mode)
  const primary = colorRoles(resolved.primary, mode)
  const success = colorRoles(resolved.success, mode)
  const warning = colorRoles(resolved.warning, mode)
  const error = colorRoles(resolved.error, mode)
  // 链接色取自 info：常态 = info 的常态、悬停 / 按下跟随 info 的对应档位
  const info = resolved.info === resolved.primary ? primary : colorRoles(resolved.info, mode)

  const vars: Record<ThemeVarName, string> = {
    '--va-primary-color': primary.base,
    '--va-primary-color-hover': primary.hover,
    '--va-primary-color-active': primary.active,
    '--va-primary-bg-color': primary.bg,
    '--va-primary-border-color': primary.border,
    // 主色文字：两模式均取基色档，因此与主色同值；
    // 消费面：Menu 选中项、Tabs 激活页签、Pagination 当前页等「主色文字」场景，
    // 宿主可单独覆盖以拉开「色块」与「文字」的取色
    '--va-primary-text-color': primary.text,
    // 主色底上的前景色，两种模式恒为白
    '--va-text-color-solid': SOLID_TEXT_COLOR,
    '--va-success-color': success.base,
    '--va-success-bg-color': success.bg,
    '--va-success-border-color': success.border,
    '--va-warning-color': warning.base,
    '--va-warning-bg-color': warning.bg,
    '--va-warning-border-color': warning.border,
    '--va-error-color': error.base,
    '--va-error-bg-color': error.bg,
    '--va-error-border-color': error.border,
    '--va-info-color': info.base,
    '--va-info-bg-color': info.bg,
    '--va-info-border-color': info.border,
    '--va-text-color-1': neutral.text1,
    '--va-text-color-2': neutral.text2,
    '--va-text-color-3': neutral.text3,
    '--va-text-color-disabled': neutral.disabled,
    '--va-bg-container-color': neutral.container,
    '--va-bg-elevated-color': neutral.elevated,
    '--va-bg-layout-color': neutral.layout,
    '--va-bg-spotlight-color': neutral.spotlight,
    '--va-border-color': neutral.border,
    '--va-border-split-color': neutral.split,
    '--va-fill-color-1': neutral.fill1,
    '--va-fill-color-2': neutral.fill2,
    '--va-fill-color-3': neutral.fill3,
    '--va-fill-color-4': neutral.fill4,
    // 阴影基色：浅色用极淡黑；暗色必须加深，浅色阴影在暗底上会变成白色光晕
    '--va-shadow-color': mode === 'dark' ? 'rgba(0, 0, 0, 0.45)' : 'rgba(0, 0, 0, 0.06)',
    // 焦点环：取主色浅底叠在容器色上的半透明等价色（浅色即 rgba(5, 145, 255, 0.1)），
    // 叠在 addon / 灰底上会融合，而不是糊一块不透明浅蓝；
    // 暗色的主色浅底比容器更暗，直接用会在暗底上消失，故改为主色半透明
    '--va-focus-shadow': `0 0 0 2px ${
      mode === 'dark'
        ? new TinyColor(primary.base).setAlpha(0.25).toRgbString()
        : alphaOver(primary.bg, neutral.container)
    }`,
    '--va-popup-shadow': POPUP_SHADOW,
    '--va-mask-color': MASK_COLOR,
    '--va-link-color': info.base,
    '--va-link-color-hover': info.hoverSoft,
    '--va-link-color-active': info.active
  }
  const frozen = Object.freeze(vars) as ThemeVars
  if (deriveCache.size >= CACHE_LIMIT) {
    const oldest = deriveCache.keys().next().value
    if (oldest !== undefined) {
      deriveCache.delete(oldest)
    }
  }
  deriveCache.set(cacheKey, frozen)
  return frozen
}

/**
 * 按实例色派生状态集合（供 `Button.color` 等组件级颜色 props 使用）
 *
 * 只把使用方给的一个颜色展开成与 `--va-*` 同构的状态，组件写到组件私有变量。
 * 索引规则与全局主题一致（常态 / 悬停 / 按下 / 浅底 / 描边取色阶 6 / 5 / 7 / 1 / 3 档）。
 *
 * `mode` 必须由调用方从当前主题作用域取（`THEME_MODE_KEY`）：实例色的 hover / active
 * 在深浅模式下取的是不同色阶档位，固定 light 会让暗色下的自定义色按钮偏亮一档。
 */
export function deriveColorStates(color: string, mode: ResolvedMode = 'light'): ColorStates {
  const normalized = normalizeSeedColor(color)
  if (!normalized) {
    log('warn', 'theme', `deriveColorStates 收到非法颜色：${String(color)}，已回退默认主色`)
    return deriveColorStates(DEFAULT_SEEDS.primary, mode)
  }
  const roles = colorRoles(normalized, mode)
  return {
    base: roles.base,
    hover: roles.hover,
    active: roles.active,
    bg: roles.bg,
    border: roles.border,
    solid: SOLID_TEXT_COLOR
  }
}

/**
 * 按组件级主色派生焦点环
 *
 * 直接委托全局 `derive`：焦点环的口径（浅色取半透明等价色、暗色主色 25% 透明度）
 * 只应有一份实现，组件级与全局必须逐值一致。
 *
 * @param color - 组件级主色（不透明 hex；非法值时与全局派生同样告警并回退默认主色）
 * @param mode - 当前作用域模式
 */
export function deriveFocusShadow(color: string, mode: ResolvedMode = 'light'): string {
  return derive({ primary: color }, mode)['--va-focus-shadow']
}

/** 断言派生结果的键集合与变量契约完全一致（单测与构建期共用） */
export function assertVarContract(vars: ThemeVars): void {
  const keys = Object.keys(vars).sort()
  const expected = [...THEME_VAR_NAMES].sort()
  if (keys.length !== expected.length || keys.some((key, index) => key !== expected[index])) {
    throw new Error(`[theme] 派生变量与契约不一致：${keys.join(',')}`)
  }
}
