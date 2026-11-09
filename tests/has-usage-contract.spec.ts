// @vitest-environment node
import { describe, expect, it, afterEach } from 'vitest'
import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { dirname, join } from 'node:path'
import { checkHasUsage, DEFAULT_WHITELIST } from '../scripts/check-has-usage'

/**
 * `:has()` 使用契约（权威层，条文见 development/component-design.md 的「高版本 CSS 特性」）
 *
 * 为什么是单测而不是门禁脚本：豁免路径（写法退化）不会让源码在当前引擎上出错，
 * 不具备抢在 lint / type-check 之前失败的资格；它需要的是「能被验证的判定逻辑」，
 * 而这恰好是独立脚本形态缺的——旧脚本自身零用例，词法判断错了也只是静默打印通过。
 * 本文件同时承担两件事：
 * ① 正向：锁定全库现状（只允许白名单文件使用 `:has()`）；
 * ② 反向：用临时 fixture 逐条验证四类违规真的报得出来、且注释与合法写法不误报。
 */

const tempDirs: string[] = []
/** 反向用例统一把待测文件放进白名单，避免「非白名单」规则干扰单条断言 */
const FIXTURE_WHITELIST = ['demo/Demo.vue']

function createComponents(files: Record<string, string>): string {
  const rootDir = mkdtempSync(join(tmpdir(), 'va-has-usage-'))
  tempDirs.push(rootDir)
  const componentsDir = join(rootDir, 'components')
  for (const [relativePath, source] of Object.entries(files)) {
    const filePath = join(componentsDir, relativePath)
    mkdirSync(dirname(filePath), { recursive: true })
    writeFileSync(filePath, source)
  }
  return componentsDir
}

/** 把样式片段包成可被扫描的 SFC（与真实组件同形态） */
function sfcStyle(style: string): string {
  return `<template><div></div></template>\n<style lang="less" scoped>\n${style}\n</style>\n`
}

afterEach(() => {
  tempDirs.splice(0).forEach((dir) => rmSync(dir, { recursive: true, force: true }))
})

describe(':has() 使用契约（真实源码）', () => {
  it('全库现状符合契约：全部落在白名单文件', () => {
    const { problems, usageCount, whitelist } = checkHasUsage()

    expect(problems).toEqual([])
    expect(whitelist).toEqual(DEFAULT_WHITELIST)
    // 下限锁：证明扫描确实命中了白名单文件，不是「一个文件都没扫到」的空转；
    // 将来 `:has()` 合法减少时同步下调（说明收口在生效，不是回归）
    expect(usageCount).toBeGreaterThanOrEqual(8)
  })
})

describe(':has() 使用契约（检出能力）', () => {
  it('非白名单文件出现 :has()：报位置违规', () => {
    const componentsDir = createComponents({
      'other/Other.vue': sfcStyle('.a:has(> .b) { color: red; }\n.a:not(:has(> .b)) { color: blue; }')
    })
    const { problems } = checkHasUsage({ componentsDir, whitelist: FIXTURE_WHITELIST })

    expect(problems).toHaveLength(1)
    expect(problems[0]).toContain('仅允许出现在白名单文件')
  })

  it('与其他选择器共用逗号列表：报整条规则会被丢弃', () => {
    const componentsDir = createComponents({
      'demo/Demo.vue': sfcStyle('.a:has(> .b), .c:not(:has(> .b)) { color: red; }')
    })
    const { problems } = checkHasUsage({ componentsDir, whitelist: FIXTURE_WHITELIST })

    expect(problems).toHaveLength(1)
    expect(problems[0]).toContain('不得与其他选择器共用逗号列表')
  })

  it('参数为后代选择器：报必须限定直接子项', () => {
    const componentsDir = createComponents({
      'demo/Demo.vue': sfcStyle('.a:has(.b) { color: red; }\n.a:not(:has(> .b)) { color: blue; }')
    })
    const { problems } = checkHasUsage({ componentsDir, whitelist: FIXTURE_WHITELIST })

    expect(problems).toHaveLength(1)
    expect(problems[0]).toContain('必须限定直接子项')
  })

  it('参数为通配 :has(*)：同样报参数违规', () => {
    const componentsDir = createComponents({
      'demo/Demo.vue': sfcStyle('.a:has(*) { color: red; }\n.a:not(:has(> .b)) { color: blue; }')
    })
    const { problems } = checkHasUsage({ componentsDir, whitelist: FIXTURE_WHITELIST })

    expect(problems).toHaveLength(1)
    expect(problems[0]).toContain('通配 :has(*) 亦不允许')
  })

  it('缺少 :not(:has(...)) 兜底分支：报缺少基础形态', () => {
    const componentsDir = createComponents({
      'demo/Demo.vue': sfcStyle('.a:has(> .b) { color: red; }')
    })
    const { problems } = checkHasUsage({ componentsDir, whitelist: FIXTURE_WHITELIST })

    expect(problems).toHaveLength(1)
    expect(problems[0]).toContain('必须提供 :not(:has(...)) 兜底分支')
  })

  it('.less / .css 文件同样纳入扫描（不只看 .vue 的 style 块）', () => {
    const componentsDir = createComponents({
      'demo/Demo.vue': sfcStyle('.a:has(> .b) { color: red; }\n.a:not(:has(> .b)) { color: blue; }'),
      'demo/extra.less': '.x:has(> .y) { color: red; }\n.x:not(:has(> .y)) { color: blue; }',
      'demo/more.css': '.z:has(> .w) { color: red; }\n.z:not(:has(> .w)) { color: blue; }'
    })
    const { problems, usageCount } = checkHasUsage({
      componentsDir,
      whitelist: [...FIXTURE_WHITELIST, 'demo/extra.less', 'demo/more.css']
    })

    expect(problems).toEqual([])
    expect(usageCount).toBe(6)
  })
})

describe(':has() 使用契约（不误报）', () => {
  it('整行注释里提到 :has()：不计为使用', () => {
    const componentsDir = createComponents({
      'demo/Demo.vue': sfcStyle('// 这里用 :has(> .b) 判断分栏布局\n.a { color: red; }')
    })
    const { problems, usageCount } = checkHasUsage({ componentsDir, whitelist: FIXTURE_WHITELIST })

    expect(problems).toEqual([])
    expect(usageCount).toBe(0)
  })

  it('行尾注释里提到 :has()：同样不计为使用', () => {
    const componentsDir = createComponents({
      'demo/Demo.vue': sfcStyle('.a {\n  color: red; // 与 :has(> .b) 的写法对比\n}')
    })
    const { problems, usageCount } = checkHasUsage({ componentsDir, whitelist: FIXTURE_WHITELIST })

    expect(problems).toEqual([])
    expect(usageCount).toBe(0)
  })

  it('合法形态（直接子项 + 兜底分支）：通过', () => {
    const componentsDir = createComponents({
      'demo/Demo.vue': sfcStyle('.a:has(> .b.c) { color: red; }\n.a:not(:has(> .b.c)) { color: blue; }')
    })
    const { problems, usageCount } = checkHasUsage({ componentsDir, whitelist: FIXTURE_WHITELIST })

    expect(problems).toEqual([])
    expect(usageCount).toBe(2)
  })
})
