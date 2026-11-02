// @vitest-environment node
import { describe, expect, it, afterEach } from 'vitest'
import { mkdtempSync, mkdirSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { dirname, join } from 'node:path'
import {
  checkModelProps,
  collectModelDefaultProblems,
  parseModelContract,
  parseModelDefaults,
  parseObjectFieldNames
} from '../scripts/check-model-props.js'

/**
 * v-model 声明契约校验的用例（纯源码文本断言，无 DOM、无产物）
 *
 * 契约有三条（见 `scripts/check-model-props.js` 头部与 development/component-design.md）：
 * ① 公共 API 禁止 `defineModel`，只放行白名单内的待迁移存量；
 * ② 白名单内仍用 `defineModel` 时，字段必须并入对外 props 类型（`interface Props` 或 `Props & { x?: ... }`）；
 * ③ `useControlledModel` 的字段在 `withDefaults` 里只能写 `undefined`（布尔字段必须显式写），
 * 否则「传值即受控」的判据恒真。
 * 本用例锁定「能报出来」与「不误报（合并块 / 无参数模型 / 内部组件 / 展开项）」两侧。
 */

const tempDirs: string[] = []
// 测试夹具的路径是 demo/Demo.vue，需显式放行才能触达第二条断言
const ALLOWED = new Set(['demo/Demo.vue'])

function createFixture(source: string, name = 'Demo') {
  const rootDir = mkdtempSync(join(tmpdir(), 'va-model-props-'))
  tempDirs.push(rootDir)
  const sfcPath = join(rootDir, 'components', 'demo', `${name}.vue`)
  mkdirSync(dirname(sfcPath), { recursive: true })
  writeFileSync(sfcPath, source)
  return rootDir
}

afterEach(() => {
  tempDirs.splice(0).forEach((dir) => rmSync(dir, { recursive: true, force: true }))
})

describe('parseObjectFieldNames', () => {
  it('只取顶层字段，嵌套对象与箭头函数的 > 不影响判定', () => {
    const body = `
      value?: string | number
      open?: boolean
      render?: (arg: { origin: string; extra: number }) => void
    `
    expect(parseObjectFieldNames(body)).toEqual(['value', 'open', 'render'])
  })
})

describe('parseModelContract', () => {
  it('解析具名模型与无参数模型（默认 modelValue）', () => {
    const source = `
      <script setup lang="ts">
      const value = defineModel<string | number>('value', { default: null })
      const open = defineModel<boolean>()
      </script>
    `
    const { models } = parseModelContract(source)
    expect(models).toEqual(['value', 'modelValue'])
  })

  it('合并块字段计入 declared，且标记 typed', () => {
    const source = `
      <script setup lang="ts">
      export interface Props {
        display?: 'panel' | 'card'
      }
      export type DemoProps = Props & {
        value?: string | number
      }
      const value = defineModel<string | number>('value')
      </script>
    `
    const { declared, typed } = parseModelContract(source)
    expect(typed).toBe(true)
    expect([...declared]).toEqual(expect.arrayContaining(['display', 'value']))
  })

  it('没有对外 props 类型时不标记 typed（内部组件）', () => {
    const source = `
      <script setup lang="ts">
      const open = defineModel<boolean>('open')
      </script>
    `
    const { typed, declared } = parseModelContract(source)
    expect(typed).toBe(false)
    expect(declared.size).toBe(0)
  })
})

describe('checkModelProps', () => {
  it('模型字段写在 interface Props 中：通过', () => {
    const rootDir = createFixture(`
      <script setup lang="ts">
      export interface Props {
        value?: string | number
        display?: 'panel' | 'card'
      }
      const value = defineModel<string | number>('value')
      </script>
    `)
    const result = checkModelProps({ rootDir, allowedSfc: ALLOWED })
    expect(result.problems).toEqual([])
    expect(result.checked).toBe(1)
  })

  it('模型字段经 Props & { ... } 合并：通过', () => {
    const rootDir = createFixture(`
      <script setup lang="ts">
      export interface Props {
        display?: 'panel' | 'card'
      }
      export type DemoProps = Props & {
        value?: string | number
      }
      const value = defineModel<string | number>('value')
      </script>
    `)
    const result = checkModelProps({ rootDir, allowedSfc: ALLOWED })
    expect(result.problems).toEqual([])
  })

  it('模型字段两处都没有：报问题', () => {
    const rootDir = createFixture(`
      <script setup lang="ts">
      export interface Props {
        display?: 'panel' | 'card'
      }
      const value = defineModel<string | number>('value')
      </script>
    `)
    const result = checkModelProps({ rootDir, allowedSfc: ALLOWED })
    expect(result.problems).toHaveLength(1)
    expect(result.problems[0]).toContain("defineModel('value')")
  })

  it('内部组件（无对外 props 类型）：跳过而非报错', () => {
    const rootDir = createFixture(`
      <script setup lang="ts">
      const open = defineModel<boolean>('open')
      </script>
    `)
    const result = checkModelProps({ rootDir, allowedSfc: ALLOWED })
    expect(result.problems).toEqual([])
    expect(result.skipped).toBe(1)
    expect(result.checked).toBe(0)
  })

  it('白名单之外使用 defineModel：直接报「公共 API 禁止」而非字段缺失', () => {
    const rootDir = createFixture(`
      <script setup lang="ts">
      export interface Props {
        value?: string | number
      }
      const value = defineModel<string | number>('value')
      </script>
    `)
    // 默认白名单不含 demo/Demo.vue
    const result = checkModelProps({ rootDir })
    expect(result.problems).toHaveLength(1)
    expect(result.problems[0]).toContain('公共 API 禁止用 defineModel')
    expect(result.problems[0]).toContain('useControlledModel')
  })
})

describe('parseModelDefaults', () => {
  it('取顶层字段的默认值，行尾注释与尾逗号不影响判定', () => {
    const source = `
      <script setup lang="ts">
      const props = withDefaults(defineProps<Props>(), {
        value: undefined,
        open: undefined,
        tableLayout: undefined, // 固定表头时默认值为 fixed
        to: 'body',
        push: () => ({ distance: 16 })
      })
      </script>
    `
    const { hasBlock, hasSpread, defaults } = parseModelDefaults(source)
    expect(hasBlock).toBe(true)
    expect(hasSpread).toBe(false)
    expect(defaults.get('value')).toBe('undefined')
    expect(defaults.get('tableLayout')).toBe('undefined')
    expect(defaults.get('to')).toBe("'body'")
    expect(defaults.get('push')).toBe('() => ({ distance: 16 })')
  })

  it('含展开项时标记 hasSpread，供上层退化为「只判字段是否在块内」', () => {
    const { hasSpread } = parseModelDefaults(`
      const props = withDefaults(defineProps<Props>(), {
        ...SHARED_DEFAULTS,
        openControl: false
      })
    `)
    expect(hasSpread).toBe(true)
  })
})

describe('collectModelDefaultProblems', () => {
  it('双模字段给了非 undefined 默认值：报问题（判据恒真）', () => {
    const problems = collectModelDefaultProblems(
      `
      export interface Props {
        expandedRowKeys?: string[]
      }
      const props = withDefaults(defineProps<Props>(), {
        expandedRowKeys: () => []
      })
      const model = useControlledModel<string[]>('expandedRowKeys', [])
      `,
      'components/table/Table.vue'
    )
    expect(problems).toHaveLength(1)
    expect(problems[0]).toContain('expandedRowKeys')
    expect(problems[0]).toContain('() => []')
  })

  it('布尔字段未在 withDefaults 声明：报问题（缺省被强转为 false）', () => {
    const problems = collectModelDefaultProblems(
      `
      export interface Props {
        open?: boolean
      }
      const props = withDefaults(defineProps<Props>(), {
        autofocus: true
      })
      const model = useControlledModel<boolean>('open', false)
      `,
      'components/drawer/Drawer.vue'
    )
    expect(problems).toHaveLength(1)
    expect(problems[0]).toContain('boolean')
  })

  it('显式 undefined / 非布尔字段缺省 / 含展开项时都不报（避免误伤）', () => {
    const explicitUndefined = `
      const props = withDefaults(defineProps<Props>(), { value: undefined, open: undefined })
      const a = useControlledModel<string>('value', '')
      const b = useControlledModel<boolean>('open', false)
    `
    expect(collectModelDefaultProblems(explicitUndefined, 'components/demo/Demo.vue')).toEqual([])

    const nonBooleanAbsent = `
      const props = withDefaults(defineProps<Props>(), { size: 'middle' })
      const a = useControlledModel<string>('value', '')
    `
    expect(collectModelDefaultProblems(nonBooleanAbsent, 'components/demo/Demo.vue')).toEqual([])

    const withSpread = `
      const props = withDefaults(defineProps<Props>(), { ...SHARED, size: 'middle' })
      const a = useControlledModel<boolean>('open', false)
    `
    expect(collectModelDefaultProblems(withSpread, 'components/demo/Demo.vue')).toEqual([])
  })
})
