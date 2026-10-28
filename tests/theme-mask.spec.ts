// @vitest-environment node
import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import { describe, it, expect } from 'vitest'

/**
 * 主题表面契约（源码扫描）
 *
 * 两类容易在暗色下出错的写法：
 * 1. 遮罩取 `--va-text-color-3`：该变量随模式翻转（暗色是白色），会变成白蒙层；
 * 2. 「反色表面」只改文字色不改底色（或反过来）：暗色下变成白底白字。
 * 这里直接核对源码，防止回潮。
 */
const MASK_COMPONENTS = ['modal/Modal.vue', 'drawer/Drawer.vue', 'image/Image.vue', 'dialog/Dialog.vue']

/** [文件, 必须包含的片段] */
const SURFACE_CASES: [string, string[]][] = [
  // 二维码状态遮罩：白底白字的经典组合，底与文案必须同源
  ['qr-code/QRCode.vue', ['--qr-code-mask-bg-color: var(--va-bg-container-color)']],
  // 菜单折叠气泡：白色文案配「聚光底」
  ['menu/Menu.vue', ['--menu-tooltip-background: var(--va-bg-spotlight-color)']],
  // 颜色面板：浮层底取 elevated（暗色下与页面容器拉开层级）
  ['color-picker/ColorPicker.vue', ['background-color: var(--va-bg-elevated-color)']],
  // 标签的可编辑输入框 / 新增按钮
  ['tag/Tag.vue', ['background: var(--va-bg-container-color)', 'background-color: var(--va-bg-container-color)']],
  // 最淡中性叠加（colorFillQuaternary）
  ['result/Result.vue', ['background-color: var(--va-fill-color-4)']],
  // 表格页脚：公开令牌带默认值，默认仍取最淡中性叠加
  ['table/Table.vue', ['background: var(--va-table-footer-bg-color, var(--va-fill-color-4))']]
]

const readComponent = (file: string): string => readFileSync(join(process.cwd(), 'components', file), 'utf8')

describe('遮罩使用 --va-mask-color', () => {
  MASK_COMPONENTS.forEach((file) => {
    it(`${file} 的遮罩不跟随正文色`, () => {
      const source = readComponent(file)
      expect(source).toContain('var(--va-mask-color)')
      expect(source).not.toMatch(/background(-color)?:\s*var\(--va-text-color-3\)/)
    })
  })
})

describe('反色表面 / 面板底色与文案色同源', () => {
  SURFACE_CASES.forEach(([file, snippets]) => {
    it(`${file} 使用语义底色`, () => {
      const source = readComponent(file)
      snippets.forEach((snippet) => expect(source).toContain(snippet))
    })
  })

  it('颜色面板不再写死白底', () => {
    expect(readComponent('color-picker/ColorPicker.vue')).not.toContain('background-color: #fff;')
  })

  it('标签输入框 / 新增按钮不再写死白底', () => {
    const source = readComponent('tag/Tag.vue')
    expect(source).not.toContain('background-color: #ffffff;')
    expect(source).not.toContain('background: rgb(255, 255, 255);')
  })
})

describe('Teleport 根节点转发作用域主题（源码扫描）', () => {
  // 新增/改动 Teleport 时必须同步转发，否则嵌套作用域下浮层会退回 <html> 的默认表
  const TELEPORT_CONSUMERS = [
    'popup/Popup.vue',
    'modal/Modal.vue',
    'dialog/Dialog.vue',
    'drawer/Drawer.vue',
    'message/Message.vue',
    'notification/Notification.vue',
    'select/Select.vue',
    'auto-complete/AutoComplete.vue',
    'back-top/BackTop.vue',
    'loading-bar/LoadingBar.vue'
  ]

  TELEPORT_CONSUMERS.forEach((file) => {
    it(`${file} 绑定转发变量与模式`, () => {
      const source = readComponent(file)
      expect(source).toContain('themeTeleportKey')
      expect(source).toContain('teleportThemeVars')
      expect(source).toContain('teleportThemeMode')
    })
  })
})

describe('Tag 预设色板按模式继承（不再用后代选择器）', () => {
  const tagSource = (): string => readComponent('tag/Tag.vue')

  it('色板由模式键控变量提供，规则只消费变量', () => {
    const source = tagSource()
    expect(source).toContain(":root,\n[data-va-mode='light'] {")
    expect(source).toContain("[data-va-mode='dark'] {")
    expect(source).toContain('--tag-pink-bg:')
    expect(source).toContain('color: var(--tag-pink-text)')
  })

  it('不再存在 [data-va-mode] 后代选择器（嵌套浅色作用域会取错色板）', () => {
    expect(tagSource()).not.toMatch(/\[data-va-mode='(dark|light)'\]\s+\.tag-/)
  })
})

describe('浮层底统一取 --va-bg-elevated-color（暗色下与 container 同色会失去层级）', () => {
  const ELEVATED_SURFACES = [
    'modal/Modal.vue',
    'drawer/Drawer.vue',
    'message/Message.vue',
    'notification/Notification.vue',
    'dialog/Dialog.vue',
    'color-picker/ColorPicker.vue'
  ]
  ELEVATED_SURFACES.forEach((file) => {
    it(`${file} 的浮层底取 elevated`, () => {
      expect(readComponent(file)).toContain('var(--va-bg-elevated-color)')
    })
  })

  it('菜单弹出子菜单的浮层底取 elevated（深色皮肤除外）', () => {
    expect(readComponent('menu/Menu.vue')).toContain('--menu-popup-background: var(--va-bg-elevated-color)')
  })
})
