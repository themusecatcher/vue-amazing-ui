// @vitest-environment node
import { describe, expect, it, afterEach } from 'vitest'
import { mkdtempSync, mkdirSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { dirname, join } from 'node:path'
import {
  checkModelProps,
  collectEmitDeclareProblems,
  collectModelDefaultProblems,
  parseModelDefaults
} from '../scripts/check-model-props'

/**
 * v-model 声明契约校验的用例（纯源码文本断言，无 DOM、无产物）
 *
 * 契约有三条（见 `scripts/check-model-props.ts` 头部与 development/component-design.md）：
 * ① 全库禁止 `defineModel`（无白名单例外，公共 API 与内部组件一律适用）；
 * ② `useControlledModel` 的字段在 `withDefaults` 里只能写 `undefined`（布尔字段必须显式写），
 * 否则「传值即受控」的判据恒真；
 * ③ 同一字段必须在 `defineEmits` 里声明 `update:x`，否则每次交互都输出 dev 告警、监听器落进 `$attrs`。
 * 本用例锁定「能报出来」与「不误报（展开项 / 未标注泛型 / 注释 / 含函数成员的类型参数）」两侧。
 */

const tempDirs: string[] = []

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

describe('checkModelProps', () => {
  it('使用 defineModel：报「禁止」并给出替代写法，不再提示加白名单', () => {
    const rootDir = createFixture(`
      <script setup lang="ts">
      export interface Props {
        value?: string | number
      }
      const value = defineModel<string | number>('value')
      </script>
    `)
    const result = checkModelProps({ rootDir })
    expect(result.problems).toHaveLength(1)
    expect(result.problems[0]).toContain("defineModel('value')")
    expect(result.problems[0]).toContain('禁止用 defineModel')
    expect(result.problems[0]).toContain('useControlledModel')
    expect(result.problems[0]).not.toContain('白名单')
  })

  it('无参数 defineModel（默认 modelValue）同样报问题', () => {
    const rootDir = createFixture(`
      <script setup lang="ts">
      const model = defineModel<boolean>()
      </script>
    `)
    const result = checkModelProps({ rootDir })
    expect(result.problems).toHaveLength(1)
    expect(result.problems[0]).toContain("defineModel('modelValue')")
  })

  it('未使用 defineModel 的双模字段（已声明 update:x）：通过且计入 defaultsChecked', () => {
    const rootDir = createFixture(`
      <script setup lang="ts">
      export interface Props {
        value?: string | number
      }
      const props = withDefaults(defineProps<Props>(), { value: undefined })
      const emits = defineEmits(['update:value'])
      const valueModel = useControlledModel<string>('value', '')
      </script>
    `)
    const result = checkModelProps({ rootDir })
    expect(result.problems).toEqual([])
    expect(result.defaultsChecked).toBe(1)
  })

  it('双模字段漏声明 update:x：报问题并指到 defineEmits', () => {
    const rootDir = createFixture(`
      <script setup lang="ts">
      export interface Props {
        value?: string | number
      }
      const props = withDefaults(defineProps<Props>(), { value: undefined })
      const emits = defineEmits(['change'])
      const valueModel = useControlledModel<string>('value', '')
      </script>
    `)
    const result = checkModelProps({ rootDir })
    expect(result.problems).toHaveLength(1)
    expect(result.problems[0]).toContain("useControlledModel('value')")
    expect(result.problems[0]).toContain('update:value')
    expect(result.problems[0]).toContain('$attrs')
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

  it('不写泛型的调用同样参与默认值判定（泛型不是识别前提）', () => {
    const problems = collectModelDefaultProblems(
      `
      const props = withDefaults(defineProps<Props>(), { open: false })
      const model = useControlledModel('open', false)
      `,
      'components/demo/Demo.vue'
    )
    expect(problems).toHaveLength(1)
    expect(problems[0]).toContain('open')
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

  it('注释里的 useControlledModel 调用不参与判定（不误报默认值缺失）', () => {
    const source = `
      const props = withDefaults(defineProps<Props>(), { size: 'middle' })
      // 原先写法：useControlledModel<boolean>('open', false)
      /* 备用写法：useControlledModel('value', '') */
    `
    expect(collectModelDefaultProblems(source, 'components/demo/Demo.vue')).toEqual([])
  })
})

describe('parseModelDefaults 的泛型配平', () => {
  it('类型参数含函数成员时仍能解析（原 `[^)]*` 写法会静默跳过整个默认值块）', () => {
    const { hasBlock, blocked, defaults } = parseModelDefaults(`
      const props = withDefaults(defineProps<Props & { onItemClick?: (item: Item) => void }>(), {
        open: undefined,
        size: 'middle'
      })
    `)
    expect(blocked).toBe(false)
    expect(hasBlock).toBe(true)
    expect(defaults.get('open')).toBe('undefined')
    expect(defaults.get('size')).toBe("'middle'")
  })

  it('嵌套泛型与箭头函数不影响配平', () => {
    const { hasBlock, defaults } = parseModelDefaults(`
      const props = withDefaults(defineProps<Props<{ a: string }>>(), { open: undefined })
    `)
    expect(hasBlock).toBe(true)
    expect(defaults.get('open')).toBe('undefined')
  })

  it('没有默认值块时不算解析失败', () => {
    const { hasBlock, blocked } = parseModelDefaults(`const props = defineProps<Props>()`)
    expect(hasBlock).toBe(false)
    expect(blocked).toBe(false)
  })

  it('无法解析时标记 blocked，由上层转成问题而非静默通过', () => {
    const source = `
      const props = withDefaults(defineProps<Props>(), SHARED_DEFAULTS)
      const open = useControlledModel<boolean>('open', false)
    `
    expect(parseModelDefaults(source).blocked).toBe(true)
    const problems = collectModelDefaultProblems(source, 'components/demo/Demo.vue')
    expect(problems).toHaveLength(1)
    expect(problems[0]).toContain('无法解析')
  })
})

describe('collectEmitDeclareProblems', () => {
  it('对象字面量声明 update:x：通过', () => {
    const source = `
      const emits = defineEmits<{ 'update:value': [value: string]; change: [value: string] }>()
      const valueModel = useControlledModel<string>('value', '')
    `
    expect(collectEmitDeclareProblems(source, 'components/demo/Demo.vue')).toEqual([])
  })

  it('数组形态的 defineEmits 同样算声明', () => {
    const source = `
      const emits = defineEmits(['update:open', 'change'])
      const openModel = useControlledModel<boolean>('open', false)
    `
    expect(collectEmitDeclareProblems(source, 'components/demo/Demo.vue')).toEqual([])
  })

  it('只有派发调用、没有声明：报问题（调用点不算声明）', () => {
    const source = `
      const emits = defineEmits(['change'])
      const valueModel = useControlledModel<string>('value', '')
      function commit(next: string): void {
        valueModel.value = next
        emits('update:value', next)
      }
    `
    const problems = collectEmitDeclareProblems(source, 'components/demo/Demo.vue')
    expect(problems).toHaveLength(1)
    expect(problems[0]).toContain("useControlledModel('value')")
    expect(problems[0]).toContain('update:value')
    expect(problems[0]).toContain('defineEmits')
  })

  it('注释里的字符串不算声明', () => {
    const source = `
      const emits = defineEmits(['change'])
      const valueModel = useControlledModel<string>('value', '')
      // 记得补 'update:value' 声明
    `
    expect(collectEmitDeclareProblems(source, 'components/demo/Demo.vue')).toHaveLength(1)
  })

  it('同一字段的多次调用只报一次', () => {
    const source = `
      const emits = defineEmits(['change'])
      const a = useControlledModel<string>('value', '')
      const b = useControlledModel<string>('value', '')
    `
    expect(collectEmitDeclareProblems(source, 'components/demo/Demo.vue')).toHaveLength(1)
  })
})
