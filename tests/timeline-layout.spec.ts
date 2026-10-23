import { describe, it, expect, beforeAll } from 'vitest'
import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import { createRequire } from 'node:module'

/**
 * 时间轴「自定义轴点定位」与「节点级 position 作用域」布局契约
 *
 * 为什么这样测：这两类缺陷都发生在**同一元素的最终取值**上（多层布局规则互相覆盖），
 * 单看某条规则存在与否没有意义，happy-dom 又没有排版引擎、量不到坐标。
 * 因此这里做三件事：把 SFC 的 `<style lang="less" scoped>` 编译成 CSS → 在真实 DOM 上按
 * 特异性 + 源码顺序求「最终胜出的声明」→ 断言该声明等于几何正确值。
 * （`[data-v]` 属性选择器对每条规则都加同样的权重，不影响相对优先级，故用无 scope 的 DOM 求值。）
 *
 * 用例对应的已发生缺陷（均为实测坐标，非推断）：
 * 1. `mode="right"` + `#dot`：旧实现 `right: 半个轴点` + 基础 `translate(-50%,-50%)`，
 *    净效果又左移半个轴点 ⇒ 轴心 273，正确值 297（偏差 = 一整个轴点宽 24px）。
 * 2. `horizontal` + `#dot`：旧实现水平块对轴点统一 `transform: none`，纵向位移被清掉
 *    ⇒ 轴心 (17,17)，正确值 (5,5)。
 * 3. `alternate` / `label` + `#dot`：旧实现给轴点写的是 `transform: translateX(-50%)`
 *    （默认轴点只需横向），纵向位移被连带清掉 ⇒ 比默认轴点低 11px（24px 图标）。
 * 4. 轴点纵向公式多补了 `+1px`：轴点中心落在「行高/2 − 偏移 + 1」，而内容首行中线是
 *    「行高/2 − 偏移」⇒ 轴点比文字低约 1.5px（目测像文字偏上）。
 * 5. `horizontal` + `position`：交替的单侧覆写仍命中，残留 `margin-left: 50% + 12px`
 *    ⇒ 内容被挤到 46px 宽、行高被撑到 106px（正确 104px / 68px）。
 * 6. `label` 分栏 + `position`：单侧覆写的特异性一旦高过分栏规则，内容会与标签重叠
 *    ⇒ position 规则必须显式排除分栏布局。
 */

const require = createRequire(import.meta.url)
// 走 CJS require：vitest 的 alias 把裸模块名 `less` 指到了 src/assets/less 目录
const less = require('less') as {
  render: (input: string, options?: Record<string, unknown>) => Promise<{ css: string }>
}

interface Rule {
  selectors: string[]
  decls: Map<string, string>
}

interface Specificity {
  id: number
  cls: number
  type: number
}

const RULES: Rule[] = []
const ROOT_DECLS = new Map<string, string>()

/** 组件 SFC 的样式块（Less） */
function readStyleBlock(file: string): string {
  const source = readFileSync(join(process.cwd(), 'components', file), 'utf8')
  const matched = /<style lang="less" scoped>([\s\S]*?)<\/style>/.exec(source)
  if (!matched) {
    throw new Error(`${file} 未找到 <style lang="less" scoped> 块`)
  }
  return matched[1]
}

/** 订阅媒体查询里的规则不参与本组断言（只影响动效），先整体剥离以简化解析 */
function stripAtBlocks(css: string): string {
  return css.replace(/@media[^{]*\{(?:[^{}]*\{[^{}]*\})*[^{}]*\}/g, '')
}

function parseRules(css: string): Rule[] {
  const rules: Rule[] = []
  const body = stripAtBlocks(css.replace(/\/\*[\s\S]*?\*\//g, ''))
  const pattern = /([^{}]+)\{([^{}]*)\}/g
  let matched: RegExpExecArray | null
  while ((matched = pattern.exec(body)) !== null) {
    const selectors = matched[1]
      .split(',')
      .map((item) => item.trim())
      .filter(Boolean)
    const decls = new Map<string, string>()
    for (const chunk of matched[2].split(';')) {
      const index = chunk.indexOf(':')
      if (index < 0) {
        continue
      }
      decls.set(chunk.slice(0, index).trim(), chunk.slice(index + 1).trim())
    }
    rules.push({ selectors, decls })
  }
  return rules
}

const ZERO = (): Specificity => ({ id: 0, cls: 0, type: 0 })

function addSpec(a: Specificity, b: Specificity): Specificity {
  return { id: a.id + b.id, cls: a.cls + b.cls, type: a.type + b.type }
}

function compareSpec(a: Specificity, b: Specificity): number {
  return a.id - b.id || a.cls - b.cls || a.type - b.type
}

function maxSpec(list: Specificity[]): Specificity {
  return list.reduce((max, item) => (compareSpec(item, max) > 0 ? item : max), ZERO())
}

/** 剥离函数型伪类（含嵌套括号），`:where()` 记 0，`:is/:not/:has` 取参数里最高者 */
function extractFunctional(selector: string): { rest: string; spec: Specificity } {
  let rest = ''
  let spec = ZERO()
  let index = 0
  while (index < selector.length) {
    if (selector[index] !== ':') {
      rest += selector[index]
      index += 1
      continue
    }
    const pseudoElement = /^::([\w-]+)/.exec(selector.slice(index))
    if (pseudoElement) {
      spec.type += 1
      index += pseudoElement[0].length
      continue
    }
    const matched = /^:([\w-]+)(\()?/.exec(selector.slice(index))
    if (!matched) {
      index += 1
      continue
    }
    const name = matched[1].toLowerCase()
    if (!matched[2]) {
      if (name !== 'where') {
        spec.cls += 1
      }
      index += matched[0].length
      continue
    }
    let depth = 1
    let cursor = index + matched[0].length
    while (cursor < selector.length && depth > 0) {
      if (selector[cursor] === '(') {
        depth += 1
      } else if (selector[cursor] === ')') {
        depth -= 1
      }
      cursor += 1
    }
    const inner = selector.slice(index + matched[0].length, cursor - 1)
    index = cursor
    if (name === 'where') {
      continue
    }
    if (name === 'is' || name === 'not' || name === 'has' || name === 'matches') {
      spec = addSpec(spec, maxSpec(inner.split(',').map((item) => specificity(item.trim()))))
      continue
    }
    spec.cls += 1
  }
  return { rest, spec }
}

function specificity(selector: string): Specificity {
  const { rest, spec } = extractFunctional(selector)
  const result = { ...spec }
  const body = rest
    .replace(/\[[^\]]*\]/g, () => {
      result.cls += 1
      return ' '
    })
    .replace(/#[\w-]+/g, () => {
      result.id += 1
      return ' '
    })
    .replace(/\.[\w-]+/g, () => {
      result.cls += 1
      return ' '
    })
  body.replace(/(^|[\s>+~])([a-zA-Z][\w-]*)/g, () => {
    result.type += 1
    return ' '
  })
  return result
}

/** 求元素某属性的最终胜出声明（特异性优先，同特异性取源码中更靠后者） */
function winningValue(element: Element, property: string): string | undefined {
  let best: { spec: Specificity; order: number; value: string } | undefined
  RULES.forEach((rule, order) => {
    let spec: Specificity | undefined
    for (const selector of rule.selectors) {
      let matched = false
      try {
        matched = element.matches(selector)
      } catch {
        matched = false
      }
      if (!matched) {
        continue
      }
      const current = specificity(selector)
      if (!spec || compareSpec(current, spec) > 0) {
        spec = current
      }
    }
    if (!spec) {
      return
    }
    const value = rule.decls.get(property)
    if (value === undefined) {
      return
    }
    const better =
      !best || compareSpec(spec, best.spec) > 0 || (compareSpec(spec, best.spec) === 0 && order > best.order)
    if (better) {
      best = { spec, order, value }
    }
  })
  return best?.value
}

interface ItemOptions {
  label?: boolean
  position?: 'left' | 'right'
  custom?: boolean
  pending?: boolean
}

/** 按 TimelineItem 的真实 DOM 结构造节点（顺序：label → tail → head → content） */
function buildItem(options: ItemOptions = {}): string {
  const classes = ['timeline-item-wrap']
  if (options.label) {
    classes.push('timeline-item-has-label')
  }
  if (options.position) {
    classes.push(`timeline-item-${options.position}`)
  }
  if (options.pending) {
    classes.push('timeline-item-pending')
  }
  const label = options.label ? '<div class="timeline-item-label">L</div>' : ''
  const headClass = `timeline-item-head${options.custom ? ' timeline-item-head-custom' : ''}`
  const inner = options.custom ? '<svg viewBox="0 0 16 16"></svg>' : '<span class="timeline-item-head-dot"></span>'
  return [
    `<li class="${classes.join(' ')}">`,
    label,
    '<div class="timeline-item-tail"></div>',
    `<div class="${headClass}">${inner}</div>`,
    '<div class="timeline-item-content"><div class="timeline-item-content-body">A</div></div>',
    '</li>'
  ].join('')
}

/** 挂载一条时间轴，返回各节点的查询结果 */
function mount(listClass: string, items: ItemOptions[]) {
  document.body.innerHTML = `<ul class="timeline-wrap ${listClass}">${items.map(buildItem).join('')}</ul>`
  const list = document.querySelector('.timeline-wrap') as HTMLElement
  const nodes = Array.from(list.querySelectorAll(':scope > li')) as HTMLElement[]
  const pick = (index: number) => {
    const node = nodes[index]
    return {
      li: node,
      head: node.querySelector('.timeline-item-head') as HTMLElement,
      content: node.querySelector('.timeline-item-content') as HTMLElement,
      label: node.querySelector('.timeline-item-label') as HTMLElement | null
    }
  }
  return { list, pick }
}

const HEAD_HALF_EXPR = 'var(--timeline-head-size, 10px) / 2'
const HEAD_SIZE_HALF = `calc(${HEAD_HALF_EXPR})`
const ALT_MARGIN = 'calc(50% + var(--timeline-alt-offset, 12px))'

beforeAll(async () => {
  const timelineCss = await less.render(readStyleBlock('timeline/Timeline.vue'))
  ROOT_DECLS.clear()
  for (const rule of parseRules(timelineCss.css)) {
    if (rule.selectors.some((selector) => selector.startsWith('.timeline-wrap'))) {
      for (const [property, value] of rule.decls) {
        if (property.startsWith('--timeline-')) {
          ROOT_DECLS.set(property, value)
        }
      }
    }
  }
  const itemCss = await less.render(readStyleBlock('timeline/timeline-item/TimelineItem.vue'))
  RULES.length = 0
  RULES.push(...parseRules(timelineCss.css), ...parseRules(itemCss.css))
})

describe('时间轴自定义轴点定位', () => {
  it('右侧模式：以 left 基准锚到「100% − 半个轴点」，与默认轴点同轴心', () => {
    const { pick } = mount('timeline-right', [{}, { custom: true }])
    const { head } = pick(1)

    // 默认轴点右对齐容器右边界（right: 0），轴心落在 100% − 轴点/2；自定义轴点必须同轴心
    expect(winningValue(head, 'left')).toBe(`calc(100% - ${HEAD_HALF_EXPR})`)
    expect(winningValue(head, 'right')).toBe('auto')
    // 位移仍是完整的两轴居中，不再被 right 基准二次抵消
    expect(winningValue(head, 'transform')).toBe('translate(-50%, -50%)')
  })

  it('水平排列：轴点以轴心为原点且保留两轴位移', () => {
    const { pick } = mount('timeline-horizontal', [{}, { custom: true }])
    const { head } = pick(1)

    expect(winningValue(head, 'left')).toBe(HEAD_SIZE_HALF)
    expect(winningValue(head, 'top')).toBe(HEAD_SIZE_HALF)
    expect(winningValue(head, 'transform')).toBe('translate(-50%, -50%)')
  })

  it('交替布局：轴点的纵向位移不被 translateX 覆盖', () => {
    const { pick } = mount('timeline-alternate', [{}, { custom: true }])
    const { head } = pick(1)

    expect(winningValue(head, 'left')).toBe('50%')
    expect(winningValue(head, 'transform')).toBe('translate(-50%, -50%)')
  })

  it('标签分栏：轴点的纵向位移不被 translateX 覆盖', () => {
    const { pick } = mount('', [{ label: true }, { label: true, custom: true }])
    const { head } = pick(1)

    expect(winningValue(head, 'left')).toBe('50%')
    expect(winningValue(head, 'transform')).toBe('translate(-50%, -50%)')
  })

  it('垂直布局：轴点中心 = 内容首行中线（行高/2 − 偏移），与文字垂直居中', () => {
    const { pick } = mount('', [{}, { custom: true }])
    const dot = winningValue(pick(0).head, 'top')
    const custom = winningValue(pick(1).head, 'top')
    const tail = winningValue(pick(0).li.querySelector('.timeline-item-tail') as HTMLElement, 'top')

    // 默认轴点：中心 = top + 轴点/2 = (行高 − 轴点)/2 − 偏移 + 轴点/2 = 行高/2 − 偏移
    expect(dot).toBe(
      'calc((var(--timeline-line-height, 22px) - var(--timeline-head-size, 10px)) / 2 - var(--timeline-content-offset, 7px))'
    )
    // 自定义轴点：top 即中心（配合 translate(-50%,-50%)），两者必须同值
    expect(custom).toBe('calc(var(--timeline-line-height, 22px) / 2 - var(--timeline-content-offset, 7px))')
    // 尾线自轴点下沿起画：(行高 + 轴点)/2 − 偏移
    expect(tail).toBe(
      'calc((var(--timeline-line-height, 22px) + var(--timeline-head-size, 10px)) / 2 - var(--timeline-content-offset, 7px))'
    )
    // 历史缺陷：轴点公式曾多补 1px，导致轴点比文字首行中线低约 1.5px（看着像文字偏上）
    expect(dot).not.toContain('+ 1px')
    expect(custom).not.toContain('+ 1px')
  })

  it('幽灵节点（自定义加载环）沿用同一套定位', () => {
    const { pick } = mount('timeline-pending', [{}, { custom: true, pending: true }])
    const { head } = pick(1)

    expect(winningValue(head, 'left')).toBe(HEAD_SIZE_HALF)
    expect(winningValue(head, 'transform')).toBe('translate(-50%, -50%)')
  })
})

describe('时间轴节点级 position 的作用域', () => {
  it('垂直交替（无标签）：position 覆盖奇偶默认侧', () => {
    const { pick } = mount('timeline-alternate', [{}, { position: 'right' }, { position: 'left' }])

    expect(winningValue(pick(1).content, 'margin-left')).toBe(ALT_MARGIN)
    expect(winningValue(pick(1).content, 'text-align')).toBe('start')
    expect(winningValue(pick(2).content, 'margin-left')).toBe('0')
    expect(winningValue(pick(2).content, 'text-align')).toBe('end')
  })

  it('水平排列：position 不参与，内容保持顺序排布（不残留 50% 左外边距）', () => {
    const { pick } = mount('timeline-horizontal timeline-alternate', [{}, { position: 'right' }])
    const { content } = pick(1)

    expect(winningValue(content, 'margin-left')).toBe('0')
    expect(winningValue(content, 'margin-right')).toBe('0')
    expect(winningValue(content, 'text-align')).toBe('start')
  })

  it('标签分栏：position 不越权，内容侧仍由标签规则决定（否则与标签重叠）', () => {
    const { pick } = mount('timeline-alternate', [{ label: true }, { label: true }, { label: true, position: 'left' }])
    // 第 3 项为奇数位，分栏默认内容在右半；position=left 若越权会把内容拽到左半并与标签重叠
    const { content, label } = pick(2)

    expect(winningValue(content, 'margin-left')).toBe(ALT_MARGIN)
    expect(winningValue(content, 'text-align')).toBe('start')
    expect(winningValue(label as HTMLElement, 'left')).toBe('0')
    expect(winningValue(label as HTMLElement, 'text-align')).toBe('end')
  })
})

describe('时间轴轴点默认值一致性', () => {
  it('节点侧描边 fallback 与容器根声明同值', () => {
    const { pick } = mount('', [{}, {}])
    const border = winningValue(pick(0).head.querySelector('.timeline-item-head-dot') as HTMLElement, 'border')

    expect(ROOT_DECLS.get('--timeline-head-border-width')).toBe('3px')
    expect(border).toContain('var(--timeline-head-border-width, 3px)')
  })
})
