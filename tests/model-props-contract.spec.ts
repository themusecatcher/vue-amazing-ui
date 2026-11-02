// @vitest-environment node
import { describe, expect, it, afterEach } from 'vitest'
import { mkdtempSync, mkdirSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { dirname, join } from 'node:path'
import { checkModelProps, parseModelContract, parseObjectFieldNames } from '../scripts/check-model-props.js'

/**
 * v-model 声明契约校验的用例（纯源码文本断言，无 DOM、无产物）
 *
 * 契约有两条（见 `scripts/check-model-props.js` 头部与 development/component-design.md）：
 * ① 公共 API 禁止 `defineModel`，只放行白名单内的待迁移存量；
 * ② 白名单内仍用 `defineModel` 时，字段必须并入对外 props 类型（`interface Props` 或 `Props & { x?: ... }`）。
 * 本用例锁定「能报出来」与「不误报（合并块 / 无参数模型 / 内部组件）」两侧。
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
