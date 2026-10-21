import { describe, it, expect } from 'vitest'
import { generate } from '@ant-design/colors'
import {
  assertVarContract,
  createSeeds,
  derive,
  deriveColorStates,
  deriveFocusShadow,
  DEFAULT_SEEDS,
  isHexColor,
  THEME_VAR_NAMES
} from 'components/theme'

/**
 * 派生核心契约：键集合、输出格式、色阶索引映射与缓存行为
 *
 * 这些断言是「默认表与运行时覆盖逐值一致」的前提：两侧共用同一个 `derive`。
 * 期望值直接取自色阶生成函数，确保语义角色与档位映射不漂移。
 */
const paletteOf = (color: string, mode: 'light' | 'dark' = 'light'): string[] =>
  generate(color, { theme: mode === 'dark' ? 'dark' : 'default' })

describe('derive 变量契约', () => {
  it('两种模式的返回键集合与 THEME_VAR_NAMES 完全相等（40 个）', () => {
    expect(THEME_VAR_NAMES).toHaveLength(40)
    const light = derive({}, 'light')
    const dark = derive({}, 'dark')
    expect(Object.keys(light).sort()).toEqual([...THEME_VAR_NAMES].sort())
    expect(() => assertVarContract(light)).not.toThrow()
    expect(() => assertVarContract(dark)).not.toThrow()
  })

  it('只输出 sRGB #hex / rgba() / 阴影组合，不含 oklch() / color-mix()', () => {
    const vars = derive({ primary: '#18a058' }, 'light')
    Object.entries(vars).forEach(([name, value]) => {
      expect(value).not.toMatch(/oklch|color-mix|hsl\(/i)
      if (name.endsWith('-shadow')) {
        expect(value).toMatch(/rgba\(|^0 /)
        return
      }
      expect(value).toMatch(/^(#[0-9a-f]{6}|rgba\()/)
    })
  })

  it('同一 seed + mode 命中缓存并返回同一对象', () => {
    const first = derive({ primary: '#722ed1' }, 'dark')
    const second = derive({ primary: '#722ed1' }, 'dark')
    expect(second).toBe(first)
  })

  it('未传种子时默认主色保持 #1677ff', () => {
    expect(createSeeds({}).primary).toBe('#1677ff')
    expect(derive({}, 'light')['--va-primary-color']).toBe('#1677ff')
  })

  it('非法种子告警并回退默认值，不中断其余字段', () => {
    const vars = derive({ primary: 'red', success: '#00ff00' }, 'light')
    expect(vars['--va-primary-color']).toBe('#1677ff')
    expect(vars['--va-success-color']).not.toBe('')
  })
})

describe('derive 色阶档位映射', () => {
  const seeds = ['#1677ff', '#ff6900', '#ffce00', '#18a058', '#f5222d']

  seeds.forEach((primary) => {
    it(`primary=${primary} light：常态 / 悬停 / 按下 / 浅底 / 描边取色阶 6 / 5 / 7 / 1 / 3`, () => {
      const colors = paletteOf(primary)
      const vars = derive({ primary }, 'light')
      expect(vars['--va-primary-color']).toBe(colors[5])
      expect(vars['--va-primary-color-hover']).toBe(colors[4])
      expect(vars['--va-primary-color-active']).toBe(colors[6])
      expect(vars['--va-primary-bg-color']).toBe(colors[0])
      expect(vars['--va-primary-border-color']).toBe(colors[2])
    })

    it(`primary=${primary} dark：悬停 / 按下取暗色色阶的第 7 / 5 档`, () => {
      const colors = paletteOf(primary, 'dark')
      const vars = derive({ primary }, 'dark')
      expect(vars['--va-primary-color']).toBe(colors[5])
      expect(vars['--va-primary-color-hover']).toBe(colors[6])
      expect(vars['--va-primary-color-active']).toBe(colors[4])
    })

    it(`primary=${primary}：主色文字 / 链接与主色同值（不做可读性改写）`, () => {
      const vars = derive({ primary }, 'light')
      expect(vars['--va-primary-text-color']).toBe(vars['--va-primary-color'])
      expect(vars['--va-link-color']).toBe(vars['--va-primary-color'])
      expect(vars['--va-link-color-active']).toBe(vars['--va-primary-color-active'])
    })

    it(`primary=${primary}：链接悬停取色阶 3 档（暗色沿用 hover 档）`, () => {
      expect(derive({ primary }, 'light')['--va-link-color-hover']).toBe(paletteOf(primary)[3])
      expect(derive({ primary }, 'dark')['--va-link-color-hover']).toBe(paletteOf(primary, 'dark')[6])
    })
  })

  it('实色底前景色固定为白色，不再输出已移除的冗余别名', () => {
    const vars = derive({ primary: '#ffce00' }, 'light')
    expect(vars['--va-text-color-solid']).toBe('#ffffff')
    expect(vars).not.toHaveProperty('--va-primary-contrast-color')
    expect(vars).not.toHaveProperty('--va-text-color-inverse')
  })

  it('带 alpha 的 8 位 hex 视为非法种子：回退默认主色，不产出半透明主色', () => {
    expect(isHexColor('#1677ff80')).toBe(false)
    expect(derive({ primary: '#1677ff80' }, 'light')['--va-primary-color']).toBe(DEFAULT_SEEDS.primary)
  })

  it('alpha 为 ff 的 8 位 hex 等价于 6 位 hex：按不透明种子生效（颜色选择器默认输出形态）', () => {
    expect(isHexColor('#1677ffff')).toBe(false)
    expect(derive({ primary: '#FF6900FF' }, 'light')).toEqual(derive({ primary: '#ff6900' }, 'light'))
  })

  it('焦点环：浅色取主色浅底在容器色上的半透明等价色', () => {
    const vars = derive({ primary: '#1677ff' }, 'light')
    // #e6f4ff 在白底上的等价半透明表达；叠在 addon / 灰底上会融合而不是糊一块实色
    expect(vars['--va-focus-shadow']).toBe('0 0 0 2px rgba(5, 145, 255, 0.1)')
  })

  it('焦点环：暗色改为主色半透明（主色浅底比容器更暗，直接用会不可见）', () => {
    const vars = derive({ primary: '#1677ff' }, 'dark')
    expect(vars['--va-focus-shadow']).toBe('0 0 0 2px rgba(22, 104, 220, 0.25)')
  })
})

describe('derive 中性色阶梯', () => {
  it('浅色：文本透明度 0.88 / 0.65 / 0.45 / 0.25', () => {
    const vars = derive({}, 'light')
    expect(vars['--va-text-color-1']).toBe('rgba(0, 0, 0, 0.88)')
    expect(vars['--va-text-color-2']).toBe('rgba(0, 0, 0, 0.65)')
    expect(vars['--va-text-color-3']).toBe('rgba(0, 0, 0, 0.45)')
    expect(vars['--va-text-color-disabled']).toBe('rgba(0, 0, 0, 0.25)')
  })

  it('浅色：背景 / 边框 / 填充取默认中性阶梯', () => {
    const vars = derive({}, 'light')
    expect(vars['--va-bg-container-color']).toBe('#ffffff')
    expect(vars['--va-bg-elevated-color']).toBe('#ffffff')
    expect(vars['--va-bg-layout-color']).toBe('#f5f5f5')
    expect(vars['--va-border-color']).toBe('#d9d9d9')
    expect(vars['--va-border-split-color']).toBe('#f0f0f0')
    expect(vars['--va-fill-color-1']).toBe('rgba(0, 0, 0, 0.04)')
    expect(vars['--va-fill-color-2']).toBe('rgba(0, 0, 0, 0.06)')
  })

  it('填充：fill-3 / fill-4 取最强 / 最淡两档中性叠加', () => {
    expect(derive({}, 'light')['--va-fill-color-3']).toBe('rgba(0, 0, 0, 0.15)')
    expect(derive({}, 'dark')['--va-fill-color-3']).toBe('rgba(255, 255, 255, 0.18)')
    expect(derive({}, 'light')['--va-fill-color-4']).toBe('rgba(0, 0, 0, 0.02)')
    expect(derive({}, 'dark')['--va-fill-color-4']).toBe('rgba(255, 255, 255, 0.04)')
  })

  it('暗色：背景 / 边框取暗色阶梯，文本透明度 0.85 起', () => {
    const vars = derive({}, 'dark')
    expect(vars['--va-bg-layout-color']).toBe('#000000')
    expect(vars['--va-bg-container-color']).toBe('#141414')
    // 浮层底比容器提亮一档（solid 12），否则暗色下浮层与卡片无法区分
    expect(vars['--va-bg-elevated-color']).toBe('#1f1f1f')
    expect(vars['--va-border-color']).toBe('#424242')
    expect(vars['--va-border-split-color']).toBe('#303030')
    expect(vars['--va-text-color-1']).toBe('rgba(255, 255, 255, 0.85)')
  })

  it('遮罩两模式相同', () => {
    expect(derive({}, 'light')['--va-mask-color']).toBe('rgba(0, 0, 0, 0.45)')
    expect(derive({}, 'dark')['--va-mask-color']).toBe('rgba(0, 0, 0, 0.45)')
  })

  it('显式传入的中性种子在两个模式下共用', () => {
    const light = derive({ neutralBg: '#f0f0f0', neutralText: '#333333' }, 'light')
    const dark = derive({ neutralBg: '#f0f0f0', neutralText: '#333333' }, 'dark')
    expect(light['--va-bg-container-color']).toBe('#f0f0f0')
    expect(dark['--va-bg-container-color']).not.toBe('#141414')
    expect(dark['--va-text-color-1']).toBe('rgba(51, 51, 51, 0.85)')
  })
})

describe('derive 语义色', () => {
  it('语义色 base 原样输出，info 未传时跟随 primary', () => {
    const vars = derive({ primary: '#722ed1' }, 'light')
    expect(vars['--va-success-color']).toBe(DEFAULT_SEEDS.success)
    expect(vars['--va-info-color']).toBe('#722ed1')
    expect(vars['--va-info-bg-color']).toBe(vars['--va-primary-bg-color'])
  })

  it('info 独立传参时不再跟随 primary', () => {
    const vars = derive({ primary: '#722ed1', info: '#13c2c2' }, 'light')
    expect(vars['--va-info-color']).toBe('#13c2c2')
    expect(vars['--va-info-bg-color']).not.toBe(vars['--va-primary-bg-color'])
  })
})

describe('deriveColorStates 实例色派生', () => {
  it('档位与全局 derive 的同名变量一致（组件级主色与全局主色同构）', () => {
    const color = '#18a058'
    const states = deriveColorStates(color, 'light')
    const vars = derive({ primary: color }, 'light')
    expect(states.base).toBe(vars['--va-primary-color'])
    expect(states.hover).toBe(vars['--va-primary-color-hover'])
    expect(states.active).toBe(vars['--va-primary-color-active'])
    expect(states.bg).toBe(vars['--va-primary-bg-color'])
    expect(states.border).toBe(vars['--va-primary-border-color'])
    expect(states.solid).toBe(vars['--va-text-color-solid'])
  })

  it('暗色模式取暗色色阶，与全局 derive 一致', () => {
    const color = '#18a058'
    const states = deriveColorStates(color, 'dark')
    const vars = derive({ primary: color }, 'dark')
    expect(states.base).toBe(vars['--va-primary-color'])
    expect(states.hover).toBe(vars['--va-primary-color-hover'])
    expect(states.bg).toBe(vars['--va-primary-bg-color'])
  })

  it('非法色告警并回退默认主色，不抛错', () => {
    const states = deriveColorStates('not-a-color', 'light')
    const fallback = deriveColorStates(DEFAULT_SEEDS.primary, 'light')
    expect(states).toEqual(fallback)
  })
})

describe('deriveFocusShadow 组件级焦点环', () => {
  it('与全局 --va-focus-shadow 逐值一致（浅色取主色浅底）', () => {
    const color = '#18a058'
    const vars = derive({ primary: color }, 'light')
    expect(deriveFocusShadow(color, 'light')).toBe(vars['--va-focus-shadow'])
  })

  it('与全局 --va-focus-shadow 逐值一致（暗色取主色 25% 透明度）', () => {
    const color = '#18a058'
    const vars = derive({ primary: color }, 'dark')
    expect(deriveFocusShadow(color, 'dark')).toBe(vars['--va-focus-shadow'])
  })
})
