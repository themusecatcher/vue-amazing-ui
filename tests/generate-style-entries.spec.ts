import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import { existsSync, mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { dirname, join } from 'node:path'
import { generateStyleEntries } from '../build/generate-style-entries'
import type { GenerateStyleEntriesOptions } from '../build/generate-style-entries'
import { componentsMap, styleSources, componentDependencies, stylelessComponents } from 'components/utils/style-deps'
import { vendorStylesByComponent } from 'components/utils/vendor-styles'

/**
 * 每组件样式入口生成器的守护
 *
 * 背景：产物 JS 不 import 任何 CSS，组件样式由消费方 resolver 的 sideEffects 决定。生成器把
 * 「组件 → 样式依赖」固化成 `es|lib/<dir>/style/index.{js,cjs}` 入口后，resolver 只需返回单条路径，
 * 且任何「表写错 / CSS 缺失 / 编号残留」都在**库构建期**报错，而不是消费方运行时静默缺样式。
 *
 * fixture 直接按生产表（style-deps.ts + vendor-styles.ts）铺出完整产物文件树，
 * 保证断言对象与真实构建一致；「缺失 / 编号残留」两类负面用例通过删除或追加文件构造。
 */

const compMap = componentsMap as Record<string, string>
const sourceMap = styleSources as Record<string, string | undefined>
const depsMap = componentDependencies as Record<string, string[] | undefined>
const componentNames = Object.keys(compMap)

/** 组件自身（或样式来源组件）的 CSS 相对产物根的路径 */
function cssOf(name: string): string {
  return `${compMap[name]}/${name}.css`
}

/** 生产表推导出的「产物中应当存在的 CSS 文件」集合（相对产物根） */
function expectedCssFiles(): string[] {
  const files = new Set<string>(['style/global.css'])
  componentNames.forEach((name) => {
    if (stylelessComponents.includes(name)) {
      return
    }
    files.add(cssOf(sourceMap[name] ?? name))
    ;(depsMap[name] ?? []).forEach((dep) => files.add(cssOf(dep)))
    ;(vendorStylesByComponent[name] ?? []).forEach((target) => files.add(target))
  })
  return [...files]
}

let rootDir = ''

function write(relativePath: string, content = '/* fixture */\n'): void {
  const fullPath = join(rootDir, relativePath)
  mkdirSync(dirname(fullPath), { recursive: true })
  writeFileSync(fullPath, content, 'utf-8')
}

function read(relativePath: string): string {
  return readFileSync(join(rootDir, relativePath), 'utf-8')
}

function lines(relativePath: string): string[] {
  return read(relativePath).trimEnd().split('\n')
}

/** 静默 logger：断言走返回值与产物文件，避免测试输出噪音 */
const silentLogger: GenerateStyleEntriesOptions['logger'] = null

function generate(): string[] {
  return generateStyleEntries({ rootDir, logger: silentLogger })
}

beforeEach(() => {
  rootDir = mkdtempSync(join(tmpdir(), 'va-style-entries-'))
  expectedCssFiles().forEach((css) => {
    write(join('es', css))
    write(join('lib', css))
  })
})

afterEach(() => {
  rmSync(rootDir, { recursive: true, force: true })
})

describe('generateStyleEntries - 入口内容与顺序', () => {
  it('顺序为 global → 自身 → 依赖（表顺序）→ vendor（以 Tooltip 为例）', () => {
    generate()

    expect(lines('es/tooltip/style/index.js')).toEqual([
      "import '../../style/global.css'",
      "import '../Tooltip.css'",
      "import '../../popup/Popup.css'"
    ])
  })

  it('Table 的 11 个依赖按 componentDependencies 表顺序摊平（共 13 行）', () => {
    generate()

    expect(lines('es/table/style/index.js')).toEqual([
      "import '../../style/global.css'",
      "import '../Table.css'",
      "import '../../checkbox/Checkbox.css'",
      "import '../../ellipsis/Ellipsis.css'",
      "import '../../empty/Empty.css'",
      "import '../../pagination/Pagination.css'",
      "import '../../input/Input.css'",
      "import '../../select/Select.css'",
      "import '../../radio/Radio.css'",
      "import '../../scrollbar/Scrollbar.css'",
      "import '../../spin/Spin.css'",
      "import '../../tooltip/Tooltip.css'",
      "import '../../popup/Popup.css'"
    ])
  })

  it('同一目录下的多个组件名共用一个入口，且不出现重复 import', () => {
    const generated = generate()

    // Message 与 MessageProvider（styleSources 指向 Message）共用 es/message/style/index.js
    expect(lines('es/message/style/index.js')).toEqual(["import '../../style/global.css'", "import '../Message.css'"])
    // Provider 不额外产出目录
    expect(existsSync(join(rootDir, 'es/message-provider'))).toBe(false)
    // 每个「唯一产物目录」只生成 2 个文件（index.js + index.d.ts）
    // 唯一产物目录 = 各组件「样式来源组件」的目录去重（DescriptionsItem 不产出自己的入口）
    const uniqueDirs = new Set(
      componentNames
        .filter((name) => !stylelessComponents.includes(name))
        .map((name) => compMap[sourceMap[name] ?? name])
    )
    expect(generated.filter((file) => file.includes('/es/')).length).toBe(uniqueDirs.size * 2)
  })

  it('嵌套目录（grid/row、list/list-item）的相对路径正确', () => {
    generate()

    expect(lines('es/grid/row/style/index.js')).toEqual(["import '../../../style/global.css'", "import '../Row.css'"])
    expect(lines('es/list/list-item/style/index.js')).toEqual([
      "import '../../../style/global.css'",
      "import '../ListItem.css'",
      "import '../../../avatar/Avatar.css'"
    ])
  })

  it('主组件平铺目录（descriptions、list）的相对路径为一级', () => {
    generate()

    expect(lines('es/descriptions/style/index.js')).toEqual([
      "import '../../style/global.css'",
      "import '../Descriptions.css'"
    ])
    expect(lines('es/list/style/index.js')).toEqual([
      "import '../../style/global.css'",
      "import '../List.css'",
      "import '../../empty/Empty.css'",
      "import '../../pagination/Pagination.css'",
      "import '../../input/Input.css'",
      "import '../../select/Select.css'",
      "import '../../scrollbar/Scrollbar.css'",
      "import '../../spin/Spin.css'"
    ])
  })

  it('vendor：DatePicker / Swiper 的入口含第三方样式行', () => {
    generate()

    expect(lines('es/date-picker/style/index.js')).toEqual([
      "import '../../style/global.css'",
      "import '../DatePicker.css'",
      "import '../../vendor-styles/vue-datepicker/main.css'"
    ])
    const swiper = lines('es/swiper/style/index.js')
    expect(swiper).toContain("import '../../vendor-styles/swiper/swiper.css'")
    expect(swiper).toContain("import '../../vendor-styles/swiper/modules/effect-cards.css'")
    expect(swiper).toHaveLength(2 + (vendorStylesByComponent.Swiper?.length ?? 0))
  })
})

describe('generateStyleEntries - 断言与格式', () => {
  it('无样式组件不生成入口', () => {
    generate()

    stylelessComponents.forEach((name) => {
      expect(existsSync(join(rootDir, 'es', compMap[name], 'style', 'index.js')), `${name} 不应生成入口`).toBe(false)
    })
  })

  it('目标 CSS 缺失时 throw，消息含组件名与缺失文件路径', () => {
    rmSync(join(rootDir, 'es/skeleton/Skeleton.css'))

    expect(() => generate()).toThrowError(/Card 缺少样式文件[\s\S]*es\/skeleton\/Skeleton\.css/)
  })

  it('同名前缀 CSS 出现编号残留时 throw', () => {
    write('es/tooltip/Tooltip2.css')

    expect(() => generate()).toThrowError(/Tooltip 的样式文件数量异常[\s\S]*Tooltip2\.css/)
  })

  it('两种格式：esm 用 import、cjs 用 require，并各写 index.d.ts 为 export {}', () => {
    generate()

    expect(read('es/tooltip/style/index.js')).toContain("import '../../style/global.css'")
    expect(lines('lib/tooltip/style/index.cjs')).toEqual([
      "require('../../style/global.css')",
      "require('../Tooltip.css')",
      "require('../../popup/Popup.css')"
    ])
    expect(read('es/tooltip/style/index.d.ts')).toBe('export {}\n')
    expect(read('lib/tooltip/style/index.d.ts')).toBe('export {}\n')
  })

  it('幂等：重复调用覆盖写，内容不叠加', () => {
    const first = generate()
    const firstContent = read('es/tooltip/style/index.js')

    const second = generate()

    expect(second).toEqual(first)
    expect(read('es/tooltip/style/index.js')).toBe(firstContent)
  })
})

describe('generateStyleEntries - 依赖表回归防护', () => {
  it('Modal / Notification 的入口包含 Scrollbar 依赖', () => {
    generate()

    expect(lines('es/modal/style/index.js')).toContain("import '../../scrollbar/Scrollbar.css'")
    expect(lines('es/notification/style/index.js')).toContain("import '../../scrollbar/Scrollbar.css'")
  })

  it('Upload 移除内嵌 Message 后，入口不再引用 Message 样式', () => {
    generate()

    expect(lines('es/upload/style/index.js').some((line) => line.includes('message/Message.css'))).toBe(false)
  })

  it('Provider 与底层组件共用同一入口，不产生 provider 目录', () => {
    generate()
    ;['message-provider', 'notification-provider', 'modal-provider', 'dialog-provider'].forEach((dir) => {
      expect(existsSync(join(rootDir, 'es', dir)), `${dir} 不应存在`).toBe(false)
    })
    expect(lines('es/modal/style/index.js')).toEqual([
      "import '../../style/global.css'",
      "import '../Modal.css'",
      "import '../../button/Button.css'",
      "import '../../scrollbar/Scrollbar.css'"
    ])
  })
})
