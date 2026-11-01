// @vitest-environment node
import { describe, expect, it, afterEach } from 'vitest'
import { mkdtempSync, mkdirSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { dirname, join } from 'node:path'
import { checkModelProps, parseModelContract, parseObjectFieldNames } from '../scripts/check-model-props.js'

/**
 * v-model 对外类型契约校验的用例（纯源码文本断言，无 DOM、无产物）
 *
 * 背景见 `scripts/check-model-props.js` 头部：`defineModel` 生成的 prop 不在 `interface Props` 里，
 * 对外具名类型须手动合并 `Props & { value?: ... }`，漏补时只有使用方显式标注 `XxxProps` 才暴露。
 * 本用例锁定「能报出来」与「不误报（合并块 / 无参数模型 / 内部组件）」两侧。
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
    const result = checkModelProps({ rootDir })
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
    const result = checkModelProps({ rootDir })
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
    const result = checkModelProps({ rootDir })
    expect(result.problems).toHaveLength(1)
    expect(result.problems[0]).toContain("defineModel('value')")
  })

  it('内部组件（无对外 props 类型）：跳过而非报错', () => {
    const rootDir = createFixture(`
      <script setup lang="ts">
      const open = defineModel<boolean>('open')
      </script>
    `)
    const result = checkModelProps({ rootDir })
    expect(result.problems).toEqual([])
    expect(result.skipped).toBe(1)
    expect(result.checked).toBe(0)
  })
})
