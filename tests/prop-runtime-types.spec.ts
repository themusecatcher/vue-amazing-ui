// @vitest-environment node
import { describe, expect, it, afterEach } from 'vitest'
import { mkdtempSync, mkdirSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { dirname, join } from 'node:path'
import {
  checkPropRuntimeTypes,
  parsePropsFields,
  readRuntimePropType,
  splitUnionMembers
} from '../scripts/check-prop-runtime-types.js'

/**
 * props 运行时类型契约校验的用例（源码扫描 + 产物文本断言，无 DOM）
 *
 * 背景见 `scripts/check-prop-runtime-types.js` 头部：`defineProps<Props>()` 无法为 DOM 接口与
 * `keyof typeof` 派生类型生成运行时校验分支，生产编译又剥掉 `skipCheck`，于是发布包里这类 prop
 * 只剩残缺 type，使用方开发环境误报 `Invalid prop`。本用例锁定「能报出来」与「不误报」两侧。
 */

const tempDirs: string[] = []

function createFixture({
  source,
  esArtifact,
  libArtifact,
  extraFiles
}: Record<string, string | undefined> & { extraFiles?: Record<string, string> }) {
  const rootDir = mkdtempSync(join(tmpdir(), 'va-prop-types-'))
  tempDirs.push(rootDir)
  const sfcPath = join(rootDir, 'components', 'demo', 'Demo.vue')
  mkdirSync(dirname(sfcPath), { recursive: true })
  writeFileSync(sfcPath, source)
  const files: Record<string, string | undefined> = {
    'es/demo/Demo.vue2.js': esArtifact,
    'lib/demo/Demo.vue2.cjs': libArtifact,
    ...extraFiles
  }
  Object.entries(files).forEach(([relativePath, content]) => {
    if (!content) {
      return
    }
    const artifactPath = join(rootDir, relativePath)
    mkdirSync(dirname(artifactPath), { recursive: true })
    writeFileSync(artifactPath, content)
  })
  return rootDir
}

afterEach(() => {
  tempDirs.splice(0).forEach((dir) => rmSync(dir, { recursive: true, force: true }))
})

describe('splitUnionMembers', () => {
  it('按顶层 | 拆分，括号内的 | 不拆', () => {
    expect(splitUnionMembers('string | MountElement | (() => HTMLElement | Document)')).toEqual([
      'string',
      'MountElement',
      '(() => HTMLElement | Document)'
    ])
  })
})

describe('parsePropsFields', () => {
  it('去掉行尾注释、合并跨行联合、嵌套对象只算一个字段', () => {
    const fields = parsePropsFields(`
export interface Props {
  to?: string | MountElement | false // 面板挂载的容器节点
  placement?:
    | 'top'
    | 'topLeft'
  style?: {
    color?: string
  }
}
`)
    expect(fields?.get('to')).toBe('string | MountElement | false')
    expect(fields?.get('placement')).toBe("| 'top' | 'topLeft'")
    expect(fields?.get('style')).toBe('{ color?: string }')
    expect(fields?.has('color')).toBe(false)
  })

  it('无 interface Props 时返回 null', () => {
    expect(parsePropsFields('<script setup lang="ts">const a = 1</script>')).toBeNull()
  })
})

describe('readRuntimePropType', () => {
  it('读取带对象的完整写法与短数组写法；无 type 时返回空串', () => {
    const artifact =
      'props:{to:{type:[String,Object,Boolean],default:void 0},empty:[String],anchor:{default:null}},emits:[]'
    expect(readRuntimePropType(artifact, 'to')).toBe('[String,Object,Boolean]')
    expect(readRuntimePropType(artifact, 'empty')).toBe('[String]')
    expect(readRuntimePropType(artifact, 'anchor')).toBe('')
    expect(readRuntimePropType(artifact, 'missing')).toBeNull()
  })
})

describe('checkPropRuntimeTypes', () => {
  it('DOM 类型经 MountElement 且产物含 Object 时通过', () => {
    const rootDir = createFixture({
      source: `<script setup lang="ts">
export interface Props {
  to?: string | MountElement | false // 面板挂载的容器节点
}
</script>`,
      esArtifact: 'props:{to:{type:[String,Object,Boolean],default:void 0}},emits:[]',
      libArtifact: 'props:{to:{type:[String,Object,Boolean],default:void 0}},emits:[]'
    })
    const result = checkPropRuntimeTypes({ rootDir })
    expect(result.problems).toEqual([])
    expect(result.checked).toBe(2)
  })

  it('产物缺 Object 时报错（复现发布包误报 Invalid prop 的根因）', () => {
    const rootDir = createFixture({
      source: `<script setup lang="ts">
export interface Props {
  to?: string | MountElement | false // 面板挂载的容器节点
}
</script>`,
      esArtifact: 'props:{to:{type:[String,Boolean],default:void 0}},emits:[]',
      libArtifact: 'props:{to:{type:[String,Boolean],default:void 0}},emits:[]'
    })
    const result = checkPropRuntimeTypes({ rootDir })
    expect(result.problems).toHaveLength(2)
    expect(result.problems[0]).toContain('缺 Object')
    expect(result.problems[0]).toContain('[String,Boolean]')
  })

  it('源码直接使用裸 HTMLElement 时报错', () => {
    const rootDir = createFixture({
      source: `<script setup lang="ts">
export interface Props {
  to?: string | HTMLElement | false // 面板挂载的容器节点
}
</script>`,
      esArtifact: 'props:{to:{type:[String,Object,Boolean],default:void 0}},emits:[]',
      libArtifact: 'props:{to:{type:[String,Object,Boolean],default:void 0}},emits:[]'
    })
    const result = checkPropRuntimeTypes({ rootDir })
    expect(result.problems.some((problem) => problem.includes('裸 `HTMLElement`'))).toBe(true)
  })

  it('keyof typeof 派生类型缺 String 时报错', () => {
    const rootDir = createFixture({
      source: `<script setup lang="ts">
export type EasingPreset = keyof typeof TransitionPresets
export interface Props {
  easing?: EasingPreset | ((progress: number) => number) // 动画缓动曲线
}
</script>`,
      esArtifact: 'props:{easing:{type:[Array,Function],default:"easeInOutCubic"}},emits:[]',
      libArtifact: 'props:{easing:{type:[Array,Function],default:"easeInOutCubic"}},emits:[]'
    })
    const result = checkPropRuntimeTypes({ rootDir })
    expect(result.problems).toHaveLength(2)
    expect(result.problems[0]).toContain('缺 String')
  })

  it('无 Boolean / Function 分支时生产编译省略 type 属预期，不报错', () => {
    const rootDir = createFixture({
      source: `<script setup lang="ts">
export interface Props {
  to?: string | MountElement // 弹窗容器挂载的节点
}
</script>`,
      esArtifact: 'props:{to:{default:"body"}},emits:[]',
      libArtifact: 'props:{to:{default:"body"}},emits:[]'
    })
    const result = checkPropRuntimeTypes({ rootDir })
    expect(result.problems).toEqual([])
  })

  it('产物缺失时计入 skipped，不误报', () => {
    const rootDir = createFixture({
      source: `<script setup lang="ts">
export interface Props {
  to?: string | MountElement | false // 面板挂载的容器节点
}
</script>`
    })
    const result = checkPropRuntimeTypes({ rootDir })
    expect(result.problems).toEqual([])
    expect(result.checked).toBe(0)
    expect(result.skipped).toBe(2)
  })

  it('编译代码落在 .vue.js（.vue2.js 只是转发壳）时也能校验', () => {
    const shim = 'import f from "./Demo.vue.js";\nexport { f as default };\n'
    const component = 'props:{to:{type:[String,Boolean],default:void 0}},emits:[]'
    const rootDir = createFixture({
      source: `<script setup lang="ts">
export interface Props {
  to?: string | MountElement | false // 面板挂载的容器节点
}
</script>`,
      extraFiles: {
        'es/demo/Demo.vue2.js': shim,
        'es/demo/Demo.vue.js': component,
        'lib/demo/Demo.vue2.cjs': 'module.exports = require("./Demo.vue.cjs")',
        'lib/demo/Demo.vue.cjs': component
      }
    })
    const result = checkPropRuntimeTypes({ rootDir })
    expect(result.checked).toBe(2)
    expect(result.problems).toHaveLength(2)
    expect(result.problems[0]).toContain('缺 Object')
  })

  it('DOM 类型藏在别名里（type X = HTMLElement | Document）同样要求 Object', () => {
    const rootDir = createFixture({
      source: `<script setup lang="ts">
export type ScrollTarget = HTMLElement | Document
export interface Props {
  listenTo?: string | ScrollTarget | (() => HTMLElement | Document) // 监听滚动的元素
}
</script>`,
      esArtifact: 'props:{listenTo:{type:[String,Function],default:void 0}},emits:[]',
      libArtifact: 'props:{listenTo:{type:[String,Function],default:void 0}},emits:[]'
    })
    const result = checkPropRuntimeTypes({ rootDir })
    expect(result.problems).toHaveLength(2)
    expect(result.problems[0]).toContain('缺 Object')
  })
})
