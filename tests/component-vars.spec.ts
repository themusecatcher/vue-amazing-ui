// @vitest-environment node
import { describe, expect, it } from 'vitest'
import { existsSync, readFileSync, readdirSync } from 'node:fs'
import { dirname, relative, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { THEME_VAR_NAMES } from 'components/theme'
import {
  COMPONENT_THEME_NAMES,
  COMPONENT_VAR_NAMES,
  COMPONENT_VARS,
  COMPONENT_VARS_BY_COMPONENT,
  THEME_COMPONENTS
} from 'components/theme/component-vars.js'
import { collectVarRefs, collectVarUsages, splitSfc, stripComments } from '../scripts/component-vars-check.js'
import { render } from '../scripts/gen-component-vars-doc.js'

/**
 * 组件级公开令牌的契约测试（源码扫描，无 DOM）
 *
 * 覆盖四条口径：注册表自洽、消费方式（每处都带 fallback 且与注册表一致）、
 * 结构约束（`<style>` 不得声明公开令牌）、文档与使用点基线不漂移。
 */
const rootDir = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const componentDir = resolve(rootDir, 'components')

/** 允许出现在组件里的 `--va-*`：42 个全局别名 + 53 个组件令牌 + 全局运行时变量 */
const allowedVarNames = new Set<string>([...THEME_VAR_NAMES, ...COMPONENT_VAR_NAMES, '--va-scrollbar-width'])

/**
 * 使用点基线：每个组件的公开令牌消费处总数
 *
 * 数量变化意味着「某个状态不再被令牌覆盖」或「新增了覆盖点」，两种情况都必须人工确认后
 * 再改这里 —— 数字是刻意的减速带，不是可有可无的快照。
 */
const usageBaseline: Record<string, number> = {
  // 53 + danger 波纹色（`--button-ripple-color` 取 `--va-button-danger-color`）1 处
  'button/Button.vue': 54,
  // 派生组件：分割线跟随 Button 的 hover 色（primary 2 + danger-hover 2 + 链式 danger 2）
  'dropdown/dropdown-button/DropdownButton.vue': 6,
  // 轨道 2 + 未选 2 + 滑块 3 + 气泡 2 + 刻度点 3（dot 描边 / 悬停 / 激活）
  'slider/Slider.vue': 14,
  // 主色桥 palette 1（浅色选中底）/ text 1（浅色选中字）/ color 2（深色选中底、深色水平选中底）
  // + 选中态 7（选中字 4、选中底 3）+ 三处表面各 1（根列表 / 浮层面板 / 内联子菜单）
  'menu/Menu.vue': 14,
  'text-scroll/TextScroll.vue': 4,
  'scrollbar/Scrollbar.vue': 2,
  // 容器 / 表单类公开令牌（P1）：底色、边框、表头/页脚、浮层表面
  'alert/Alert.vue': 2,
  'card/Card.vue': 3,
  'drawer/Drawer.vue': 3,
  'input/Input.vue': 14,
  'modal/Modal.vue': 3,
  'table/Table.vue': 24,
  'textarea/Textarea.vue': 10
}

function walkVueFiles(dir: string, result: string[] = []): string[] {
  readdirSync(dir, { withFileTypes: true }).forEach((entry) => {
    const fullPath = resolve(dir, entry.name)
    if (entry.isDirectory()) {
      walkVueFiles(fullPath, result)
    } else if (entry.name.endsWith('.vue')) {
      result.push(relative(componentDir, fullPath).split('\\').join('/'))
    }
  })
  return result
}

const vueFiles = walkVueFiles(componentDir)

/** 读取组件源码（已剥离注释），按文件缓存 */
const sourceCache = new Map<string, string>()
function readSource(file: string): string {
  if (!sourceCache.has(file)) {
    sourceCache.set(file, stripComments(readFileSync(resolve(componentDir, file), 'utf-8')))
  }
  return sourceCache.get(file) as string
}

/** 读取组件的 `<style>` 段（已剥离注释），按文件缓存 */
const styleCache = new Map<string, string>()
function readStyle(file: string): string {
  if (!styleCache.has(file)) {
    styleCache.set(file, splitSfc(readSource(file)).style)
  }
  return styleCache.get(file) as string
}

/** 读取组件目录下所有 `.vue` / `.ts` / `.less` 源码（已剥离注释） */
function readDirSources(dir: string): string {
  let output = ''
  readdirSync(dir, { withFileTypes: true }).forEach((entry) => {
    const fullPath = resolve(dir, entry.name)
    if (entry.isDirectory()) {
      output += readDirSources(fullPath)
      return
    }
    if (/\.(vue|ts|less)$/.test(entry.name)) {
      output += stripComments(readFileSync(fullPath, 'utf-8'))
    }
  })
  return output
}

/** 组件键 → 桥变量 kebab 段 */
function toKebab(key: string): string {
  return key.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase()
}

describe('组件令牌注册表', () => {
  it('名称数组与元数据键集合完全一致', () => {
    const names = [...COMPONENT_VAR_NAMES].sort()
    const keys = Object.keys(COMPONENT_VARS).sort()
    expect(keys).toEqual(names)
  })

  it('每个令牌都以 --va- 开头', () => {
    COMPONENT_VAR_NAMES.forEach((name) => {
      expect(name.startsWith('--va-')).toBe(true)
    })
  })

  it('元数据完整：file 存在、group / fallback / description 非空', () => {
    COMPONENT_VAR_NAMES.forEach((name) => {
      const meta = COMPONENT_VARS[name]
      expect(meta, `缺少 ${name} 的元数据`).toBeTruthy()
      expect(meta.group.length).toBeGreaterThan(0)
      expect(meta.fallback.length).toBeGreaterThan(0)
      expect(meta.description.length).toBeGreaterThan(0)
      expect(existsSync(resolve(componentDir, meta.file)), `file 不存在：${meta.file}`).toBe(true)
    })
  })

  it('fallback 指向私有名时必须提供 resolved.light / resolved.dark', () => {
    COMPONENT_VAR_NAMES.forEach((name) => {
      const meta = COMPONENT_VARS[name]
      if (!/var\(--(?!va-)[a-z0-9-]+/.test(meta.fallback)) {
        return
      }
      expect(meta.resolved, `缺少 resolved：${name}`).toBeTruthy()
      expect(meta.resolved?.light.length).toBeGreaterThan(0)
      expect(meta.resolved?.dark.length).toBeGreaterThan(0)
    })
  })

  it('组件级主色元数据自洽：component 非空、themeRole 合法、themeState 必须成对出现', () => {
    const states = new Set(['base', 'hover', 'active', 'bg', 'border', 'solid'])
    COMPONENT_VAR_NAMES.forEach((name) => {
      const meta = COMPONENT_VARS[name]
      expect(meta.component.length).toBeGreaterThan(0)
      if (!meta.themeRole) {
        expect(meta.themeState).toBeUndefined()
        return
      }
      expect(meta.themeRole).toBe('primary')
      expect(meta.themeState, `缺少 themeState：${name}`).toBeTruthy()
      if (typeof meta.themeState === 'string') {
        expect(states.has(meta.themeState), `非法 themeState：${name}`).toBe(true)
        return
      }
      if (!meta.themeState) {
        return
      }
      expect(states.has(meta.themeState.light), `非法 themeState.light：${name}`).toBe(true)
      expect(states.has(meta.themeState.dark), `非法 themeState.dark：${name}`).toBe(true)
    })
  })

  it('COMPONENT_THEME_NAMES 与注册表中出现 themeRole 的组件完全一致', () => {
    const expected = [
      ...new Set(
        COMPONENT_VAR_NAMES.map((name) => COMPONENT_VARS[name])
          .filter((meta) => meta.themeRole)
          .map((meta) => meta.component)
      )
    ]
    expect([...COMPONENT_THEME_NAMES]).toEqual(expected)
    expect(expected).toContain('Button')
    expect(expected).toContain('Slider')
    expect(expected).toContain('Menu')
  })
})

describe('组件级主色预索引', () => {
  it('COMPONENT_VARS_BY_COMPONENT 覆盖且仅覆盖带 themeRole 的令牌', () => {
    const expected: Record<string, string[]> = {}
    COMPONENT_VAR_NAMES.forEach((name) => {
      const meta = COMPONENT_VARS[name]
      if (!meta.themeRole) {
        return
      }
      ;(expected[meta.component] ??= []).push(name)
    })
    const actual: Record<string, string[]> = {}
    Object.entries(COMPONENT_VARS_BY_COMPONENT).forEach(([component, entries]) => {
      actual[component] = entries.map(([name]) => name)
    })
    expect(actual).toEqual(expected)
  })
})

describe('配置键类型契约', () => {
  it('ThemeComponentKey 联合类型与注册表键集合逐项一致（顺序也一致）', () => {
    // 类型定义在 .types.ts（.d.ts 只声明 .js 的值导出）；手写 .d.ts 不会被 tsc 搬进产物，
    // 类型必须由普通 .ts 产出，使用方才能解析这份联合类型
    const typesSource = readFileSync(resolve(componentDir, 'theme/component-vars.types.ts'), 'utf-8')
    const block = typesSource.match(/export type ThemeComponentKey\s*=([\s\S]*?)(?=\nexport\b)/)
    expect(block, '缺少 ThemeComponentKey 联合类型').toBeTruthy()
    const typedKeys = [...(block?.[1] ?? '').matchAll(/'([A-Za-z0-9]+)'/g)].map((matched) => matched[1])
    expect(typedKeys).toEqual(THEME_COMPONENTS.map((item) => item.key))
  })
})

describe('组件令牌的消费方式', () => {
  it.each(COMPONENT_VAR_NAMES)('%s 的每一处使用都带与注册表一致的 fallback', (name) => {
    const meta = COMPONENT_VARS[name]
    const problems: string[] = []
    // 扫描全库：派生组件（如 DropdownButton）也会消费 Button 的令牌，漏写 fallback 同样会静默失效
    vueFiles.forEach((file) => {
      collectVarUsages(readStyle(file), name).forEach((usage) => {
        if (!usage.hasFallback) {
          problems.push(`${file} 缺少 fallback`)
        } else if (usage.fallback !== meta.fallback) {
          problems.push(`${file} 的 fallback 与注册表不一致`)
        }
      })
    })
    expect(problems).toEqual([])
  })

  it.each(COMPONENT_VAR_NAMES)('%s 不在 <style> 中声明', (name) => {
    const meta = COMPONENT_VARS[name]
    expect(readStyle(meta.file)).not.toContain(`${name}:`)
  })

  it('令牌使用点总数与基线一致（含派生组件）', () => {
    const actual: Record<string, number> = {}
    COMPONENT_VAR_NAMES.forEach((name) => {
      vueFiles.forEach((file) => {
        const count = collectVarUsages(readStyle(file), name).length
        if (count > 0) {
          actual[file] = (actual[file] ?? 0) + count
        }
      })
    })
    expect(actual).toEqual(usageBaseline)
  })
})

describe('默认值一致性', () => {
  it('resolved 的取值仍出现在所属组件源码里（皮肤改动后文档不会失真）', () => {
    const missing: string[] = []
    COMPONENT_VAR_NAMES.forEach((name) => {
      const { file, resolved } = COMPONENT_VARS[name]
      if (!resolved) {
        return
      }
      const source = readFileSync(resolve(componentDir, file), 'utf-8')
      if (!source.includes(resolved.light)) {
        missing.push(`${name} 浅色 → ${resolved.light}`)
      }
      if (!source.includes(resolved.dark)) {
        missing.push(`${name} 深色 → ${resolved.dark}`)
      }
    })
    expect(missing).toEqual([])
  })
})

describe('全库变量登记', () => {
  it('组件里不存在未登记的 --va-*（引用或写入）', () => {
    const unregistered = new Set<string>()
    vueFiles.forEach((file) => {
      const source = stripComments(readFileSync(resolve(componentDir, file), 'utf-8'))
      for (const matched of source.matchAll(/var\((--va-[a-z0-9-]+)/g)) {
        const name = matched[1]
        if (!allowedVarNames.has(name) && !name.startsWith('--va-local-') && !name.startsWith('--va-cp-')) {
          unregistered.add(`${name}（${file} 引用）`)
        }
      }
      for (const matched of source.matchAll(/(--va-[a-z0-9-]+)\s*:/g)) {
        const name = matched[1]
        if (!allowedVarNames.has(name) && !name.startsWith('--va-local-')) {
          unregistered.add(`${name}（${file} 写入）`)
        }
      }
    })
    expect([...unregistered]).toEqual([])
  })
})

describe('组件级主色覆盖', () => {
  it('清单内每个组件都有桥变量消费（公开令牌映射组件除外）', () => {
    const publicMapped = new Set(COMPONENT_THEME_NAMES)
    const missing: string[] = []
    THEME_COMPONENTS.forEach(({ key, dir }) => {
      if (publicMapped.has(key)) {
        return
      }
      const sources = readDirSources(resolve(componentDir, dir))
      if (!sources.includes(`--va-cp-${toKebab(key)}-`)) {
        missing.push(`${key}（${dir}）`)
      }
    })
    expect(missing).toEqual([])
  })

  it('所有内部桥变量引用都带 fallback', () => {
    const missing: string[] = []
    vueFiles.forEach((file) => {
      collectVarRefs(readSource(file)).forEach(({ name, hasFallback }) => {
        if (name.startsWith('--va-cp-') && !hasFallback) {
          missing.push(`${file} → ${name}`)
        }
      })
    })
    expect(missing).toEqual([])
  })
})

describe('悬空引用', () => {
  it('不存在「无 fallback 且从未声明」的变量引用（整条声明会被浏览器丢弃）', () => {
    const declared = new Set<string>()
    vueFiles.forEach((file) => {
      const source = readSource(file)
      for (const matched of source.matchAll(/(--[a-z0-9-]+)\s*:/g)) {
        declared.add(matched[1])
      }
      // 脚本里的对象键写成 `'--menu-primary-color': value`
      for (const matched of source.matchAll(/['"](--[a-z0-9-]+)['"]\s*:/g)) {
        declared.add(matched[1])
      }
    })
    const dangling: string[] = []
    vueFiles.forEach((file) => {
      collectVarRefs(readSource(file)).forEach(({ name, hasFallback }) => {
        // `--va-*` 由主题表声明；以 `-` 结尾的是动态拼接的名字（var(--back-top-${shape}-…))
        if (hasFallback || name.startsWith('--va-') || name.endsWith('-')) {
          return
        }
        if (!declared.has(name)) {
          dangling.push(`${name}（${file}）`)
        }
      })
    })
    expect(dangling).toEqual([])
  })
})

describe('文档页', () => {
  const docPath = resolve(rootDir, 'docs/guide/parts/component-vars.md')

  it('包含全部组件令牌名', () => {
    expect(existsSync(docPath), '缺少 docs/guide/parts/component-vars.md，请先跑生成脚本').toBe(true)
    const doc = readFileSync(docPath, 'utf-8')
    const missing = COMPONENT_VAR_NAMES.filter((name) => !doc.includes(`\`${name}\``))
    expect(missing).toEqual([])
  })

  it('按模式分列的默认值已生成', () => {
    const doc = readFileSync(docPath, 'utf-8')
    COMPONENT_VAR_NAMES.forEach((name) => {
      const { resolved } = COMPONENT_VARS[name]
      if (!resolved) {
        return
      }
      expect(doc).toContain(resolved.light)
      expect(doc).toContain(resolved.dark)
    })
  })

  // 逐字节比对：补上前两条用例抓不到的「删令牌后残留段落 / 说明文字漂移 / 表格被手改」
  it('生成物与注册表逐字节一致（改注册表后需重跑 node scripts/gen-component-vars-doc.js）', () => {
    expect(readFileSync(docPath, 'utf-8')).toBe(render())
  })

  // 数量只出现在手写的「颜色变量清单」里，是那一节唯一可机械判定的硬事实
  // 用行首锚定，避免命中上文「共 `7` 个」种子数量
  it('「颜色变量清单」的数量与变量契约一致', () => {
    const page = readFileSync(resolve(rootDir, 'docs/guide/customize-theme.md'), 'utf-8')
    expect(page.match(/^_共 `(\d+)` 个；/m)?.[1]).toBe(String(THEME_VAR_NAMES.length))
  })
})
