import { describe, it, expect } from 'vitest'
import { readdirSync, readFileSync } from 'node:fs'
import { join } from 'node:path'
import { FLOATING_LAYER_Z_INDEX } from 'components/utils'

/**
 * 浮层默认层级「单一真源」守护
 *
 * 这些数值原先同时散落在 9 个组件的 `useZIndex` 字面量、`Popup` 的 `default-zIndex` 绑定
 * 与文档《浮层层级管理 · 各组件默认层级》表中，靠人工同步 → 必然漂移。
 * 现收敛为 `components/utils/z-index.ts` 的 `FLOATING_LAYER_Z_INDEX`，本用例守护三条不变量：
 *
 * 1. **组件侧无字面量**：所有 `useZIndex` 首参与 `default-z-index` 绑定必须引用该常量
 *    （`Popup` 是宿主，默认层级由消费组件经 `defaultZIndex` 传入，属白名单）；
 * 2. **文档与来源一致**：`config-provider.md` 层级表的每行数值，托管行对应常量表
 *    （含层内再分层的 `+10` 派生值），非托管行对应各自组件的真实声明；
 * 3. **数值集合双向一致**：文档表 ↔ `常量表 ∪ 派生值 ∪ 非托管行` 不得有单边多余。
 *
 * 失败时的处理口径：改常量 → 同步文档；新增浮层族 → 常量表 + 文档表 + 本用例三处登记。
 */

const COMPONENTS_DIR = join(process.cwd(), 'components')
const LAYER_DOC_PATH = join(process.cwd(), 'docs', 'guide', 'components', 'config-provider.md')

/** 层内再分层的固定偏移：承载层的「弹窗」、预览层的「预览」均在遮罩之上 +10 */
const INNER_OFFSET = 10

/** 预览层操作按钮（`Image` 左右切换）相对预览内容的固定偏移 */
const IMAGE_OPERATION_OFFSET = 1

/**
 * 不参与自动分配的页面级 / 装饰层数值
 *
 * `BackTop` 9、`FloatButton` 99、`Badge` 9、`Watermark` 90 是各自组件的 `zIndex` prop 默认值；
 * `Spin` 的 9 是局部遮罩的 CSS 层级（不参与全局分配）。它们不属于 `FLOATING_LAYER_Z_INDEX`，
 * 但同处文档表中，故由下方「非托管行」用例单独与真实来源对照。
 */
const UNMANAGED_LEVELS = [9, 99, 90]

/** 允许的非字面量写法：`Popup` 宿主把默认层级透传给内部 `useZIndex` */
const ALLOWED_NON_CONSTANT = new Set(['props.defaultZIndex'])

/** 组件右侧 `withDefaults` 中 `zIndex` prop 默认值的声明形态 */
const PROP_Z_INDEX_PATTERN = /^ {2}zIndex: (\d+),$/m

/** 非托管行 → 真实来源（多来源对应文档中的同一行，如 `Badge` / `Watermark`） */
const UNMANAGED_ROWS: Array<{ row: string; sources: Array<{ file: string; pattern: RegExp }> }> = [
  { row: 'BackTop', sources: [{ file: 'components/back-top/BackTop.vue', pattern: PROP_Z_INDEX_PATTERN }] },
  { row: 'FloatButton', sources: [{ file: 'components/float-button/FloatButton.vue', pattern: PROP_Z_INDEX_PATTERN }] },
  { row: 'Spin', sources: [{ file: 'components/spin/Spin.vue', pattern: /z-index: (\d+);/ }] },
  {
    row: 'Badge',
    sources: [
      { file: 'components/badge/Badge.vue', pattern: PROP_Z_INDEX_PATTERN },
      { file: 'components/watermark/Watermark.vue', pattern: PROP_Z_INDEX_PATTERN }
    ]
  }
]

/**
 * CSS 兜底层级声明
 *
 * CSS 无法 `import` JS 常量，这些「首帧兜底」层级只能以字面量重复书写。相关元素都另有内联层级
 * （`:style` 绑定），而**内联始终覆盖 CSS** —— 于是兜底值一旦过期，**任何行为用例都发现不了**
 * （`tests/z-index.spec.ts` 读的是内联样式）。故此处按常量派生值断言其存在性：常量一变即红。
 */
const CSS_FALLBACK_Z_INDEX: Array<{ file: string; values: number[] }> = [
  { file: 'components/select/Select.vue', values: [FLOATING_LAYER_Z_INDEX.select] },
  { file: 'components/auto-complete/AutoComplete.vue', values: [FLOATING_LAYER_Z_INDEX.select] },
  { file: 'components/drawer/Drawer.vue', values: [FLOATING_LAYER_Z_INDEX.overlay] },
  {
    file: 'components/image/Image.vue',
    values: [
      FLOATING_LAYER_Z_INDEX.image,
      FLOATING_LAYER_Z_INDEX.image + INNER_OFFSET,
      FLOATING_LAYER_Z_INDEX.image + INNER_OFFSET + IMAGE_OPERATION_OFFSET
    ]
  }
]

/** 递归收集组件目录下所有 `.vue`（相对 `components/` 的路径） */
function collectVueFiles(dir: string, prefix = ''): string[] {
  return readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const relativePath = prefix ? `${prefix}/${entry.name}` : entry.name
    if (entry.isDirectory()) {
      return collectVueFiles(join(dir, entry.name), relativePath)
    }
    return entry.name.endsWith('.vue') ? [relativePath] : []
  })
}

/** 从组件源码中取出所有「层级入参」：`useZIndex` 首参与 `default-z-index` 绑定 */
function readLevelArgs(source: string): string[] {
  return [
    ...Array.from(source.matchAll(/useZIndex\(\s*([^,)\n]+)/g), (match) => match[1]),
    ...Array.from(source.matchAll(/:default-z-index="([^"]+)"/g), (match) => match[1])
  ].map((arg) => arg.trim())
}

/**
 * 取某行「默认层级」列的主层级值
 *
 * 优先取加粗数值（托管行与 `BackTop` / `FloatButton` 的书写口径）；
 * 无加粗时退回反引号数值（`Spin` / `Badge`·`Watermark` 行如此书写）。
 */
function readLevels(cell: string): number[] {
  const bold = Array.from(cell.matchAll(/\*\*(\d+)\*\*/g), (match) => Number(match[1]))
  return bold.length > 0 ? bold : Array.from(cell.matchAll(/`(\d+)`/g), (match) => Number(match[1]))
}

/** 解析文档《各组件默认层级》表：返回「浮层名 + 该行的主层级值」 */
function readLayerTable(): Array<{ name: string; levels: number[] }> {
  const markdown = readFileSync(LAYER_DOC_PATH, 'utf8')
  const section = markdown.split('### 各组件默认层级')[1]?.split('\n### ')[0] ?? ''
  if (!section) {
    throw new Error('未在 config-provider.md 中找到《各组件默认层级》小节，请同步更新本用例的选择器')
  }
  return section
    .split('\n')
    .filter((line) => line.startsWith('|') && !/^\|[\s:|-]+\|$/.test(line))
    .slice(1) // 去掉表头行
    .map((line) => {
      const cells = line.split('|').slice(1, -1)
      return {
        name: cells[0].replace(/`/g, '').trim(),
        levels: readLevels(cells[1])
      }
    })
}

/** 从真实来源文件中取出层级数值（要求命中且唯一，避免匹配规则失效后静默通过） */
function readSourceLevels(file: string, pattern: RegExp): number[] {
  const source = readFileSync(join(process.cwd(), file), 'utf8')
  const matched = Array.from(source.matchAll(new RegExp(pattern.source, 'gm')), (match) => Number(match[1]))
  if (matched.length !== 1) {
    throw new Error(`${file} 中按 ${pattern} 命中 ${matched.length} 处层级声明（期望 1 处），请检查匹配规则`)
  }
  return matched
}

const table = readLayerTable()

/**
 * 按「行首组件名」定位文档行（缺失即抛错，避免断言静默跳过）
 *
 * 必须用 `startsWith` 而非 `includes`：`Tooltip` 行的名称里列举了 `BackTop` / `FloatButton` 等
 * 派生气泡，`includes` 会把这些行误判为它们自己的行。
 */
function findRow(fragment: string): { name: string; levels: number[] } {
  const row = table.find((item) => item.name.startsWith(fragment))
  if (!row) {
    throw new Error(`文档层级表缺少以「${fragment}」开头的行，请在 config-provider.md 中补齐`)
  }
  return row
}

describe('浮层默认层级：组件调用点必须引用 FLOATING_LAYER_Z_INDEX', () => {
  it('useZIndex 首参与 default-z-index 绑定均不含层级字面量', () => {
    const offences: string[] = []
    for (const relativePath of collectVueFiles(COMPONENTS_DIR)) {
      const source = readFileSync(join(COMPONENTS_DIR, relativePath), 'utf8')
      for (const arg of readLevelArgs(source)) {
        const isConstant = /^FLOATING_LAYER_Z_INDEX\.[A-Za-z]+$/.test(arg)
        if (!isConstant && !ALLOWED_NON_CONSTANT.has(arg)) {
          offences.push(`${relativePath} → ${arg}`)
        }
      }
    }
    expect(offences).toEqual([])
  })

  it('常量表覆盖全部消费组件（新增浮层族必须登记）', () => {
    const consumers = collectVueFiles(COMPONENTS_DIR).filter((relativePath) =>
      /useZIndex\(|:default-z-index=/.test(readFileSync(join(COMPONENTS_DIR, relativePath), 'utf8'))
    )
    // 消费组件清单：新增时本列表与常量表、文档表需一并更新
    expect(consumers.sort()).toEqual(
      [
        'auto-complete/AutoComplete.vue',
        'dialog/Dialog.vue',
        'drawer/Drawer.vue',
        'image/Image.vue',
        'loading-bar/LoadingBar.vue',
        'message/Message.vue',
        'modal/Modal.vue',
        'notification/Notification.vue',
        'popup/Popup.vue',
        'select/Select.vue',
        'tooltip/Tooltip.vue'
      ].sort()
    )
  })
})

describe('浮层默认层级：文档表格与来源一致', () => {
  it('托管行与 FLOATING_LAYER_Z_INDEX（含 +10 派生值）一致', () => {
    expect(findRow('Tooltip').levels).toEqual([FLOATING_LAYER_Z_INDEX.tooltip])
    expect(findRow('Select').levels).toEqual([FLOATING_LAYER_Z_INDEX.select])
    expect(findRow('Modal').levels).toEqual([
      FLOATING_LAYER_Z_INDEX.overlay,
      FLOATING_LAYER_Z_INDEX.overlay + INNER_OFFSET
    ])
    expect(findRow('Drawer').levels).toEqual([FLOATING_LAYER_Z_INDEX.overlay])
    expect(findRow('Image').levels).toEqual([FLOATING_LAYER_Z_INDEX.image, FLOATING_LAYER_Z_INDEX.image + INNER_OFFSET])
    expect(findRow('Message').levels).toEqual([FLOATING_LAYER_Z_INDEX.message, FLOATING_LAYER_Z_INDEX.notification])
    expect(findRow('LoadingBar').levels).toEqual([FLOATING_LAYER_Z_INDEX.loadingBar])
  })

  it('非托管行与各自组件的真实声明一致（BackTop / FloatButton / Spin / Badge / Watermark）', () => {
    for (const { row, sources } of UNMANAGED_ROWS) {
      const fromSource = sources.flatMap(({ file, pattern }) => readSourceLevels(file, pattern))
      expect(findRow(row).levels).toEqual(fromSource)
    }
  })

  it('表中数值与常量表（含派生值与非托管层）双向一致', () => {
    const documented = new Set(table.flatMap((row) => row.levels))
    const registered = new Set<number>([
      ...Object.values(FLOATING_LAYER_Z_INDEX),
      FLOATING_LAYER_Z_INDEX.overlay + INNER_OFFSET,
      FLOATING_LAYER_Z_INDEX.image + INNER_OFFSET,
      ...UNMANAGED_LEVELS
    ])
    expect(Array.from(documented).filter((value) => !registered.has(value))).toEqual([])
    expect(Array.from(registered).filter((value) => !documented.has(value))).toEqual([])
  })
})

describe('浮层默认层级：CSS 兜底声明与常量表同步', () => {
  it('CSS 兜底层级与常量表派生值一致（内联覆盖使其不可见，故只能断言存在性）', () => {
    const offences: string[] = []
    for (const { file, values } of CSS_FALLBACK_Z_INDEX) {
      const source = readFileSync(join(process.cwd(), file), 'utf8')
      for (const value of values) {
        if (!source.includes(`z-index: ${value};`)) {
          offences.push(`${file} 缺少 \`z-index: ${value};\``)
        }
      }
    }
    expect(offences).toEqual([])
  })
})
