import { readFileSync, readdirSync } from 'node:fs'
import { join, resolve } from 'node:path'
import { describe, it, expect, vi } from 'vitest'
import { defineComponent, h, nextTick, reactive, ref, watch } from 'vue'
import { mount } from '@vue/test-utils'
import type { VueWrapper } from '@vue/test-utils'
import ConfigProvider from 'components/config-provider/ConfigProvider.vue'
import Menu from 'components/menu'
import { getAlphaColor, getColorPalettes, useInject } from 'components/utils'

/**
 * ConfigProvider 主题体系的登记完整性 + 按组件覆盖回归
 *
 * 背景：组件经 `useInject('<组件名>')` 读取主题，命中 `components` 注入表的前提是 ConfigProvider
 * 已为该组件名登记表项。漏登记时，`theme['<组件名>']` 会在写入色阶处抛
 * `TypeError: Cannot set properties of undefined`（`Menu` 曾如此），故此处以
 * 「源码扫描 → 与登记表比对」的方式守护：新增消费主题色的组件若漏登记即失败。
 */
const configProviderSource = readFileSync(
  resolve(process.cwd(), 'components/config-provider/ConfigProvider.vue'),
  'utf-8'
)
const RED = '#f5222d'

/** 扫描全部 SFC，取 `useInject('<组件名>')` 的组件名（库内唯一的主题色消费入口） */
function collectThemeConsumers(): string[] {
  const names = new Set<string>()
  const walk = (dir: string): void => {
    for (const entry of readdirSync(dir, { withFileTypes: true })) {
      const full = join(dir, entry.name)
      if (entry.isDirectory()) {
        walk(full)
      } else if (entry.name.endsWith('.vue')) {
        const source = readFileSync(full, 'utf-8')
        for (const matched of source.matchAll(/useInject\('([A-Za-z0-9]+)'\)/g)) {
          names.add(matched[1])
        }
      }
    }
  }
  walk(resolve(process.cwd(), 'components'))
  return [...names].sort()
}
/** 解析 `Theme` 接口登记的组件键（使用方的类型入口；`common` 非组件，排除） */
function parseThemeKeys(): string[] {
  const block = configProviderSource.match(/export interface Theme \{([\s\S]*?)\n\}/)
  if (!block) {
    throw new Error('未能从 ConfigProvider.vue 中解析出 Theme 接口')
  }
  return [...block[1].matchAll(/^\s{2}([A-Za-z0-9]+)\?: \{/gm)]
    .map((matched) => matched[1])
    .filter((name) => name !== 'common')
    .sort()
}
/** 解析 `componentsThemeColor` 表登记的组件键（运行时色阶的写入目标） */
function parseThemeColorKeys(): string[] {
  const block = configProviderSource.match(
    /const componentsThemeColor = reactive<Record<string, ThemeColor>>\(\{([\s\S]*?)\n\}\)/
  )
  if (!block) {
    throw new Error('未能从 ConfigProvider.vue 中解析出 componentsThemeColor')
  }
  return [...block[1].matchAll(/^\s{2}([A-Za-z0-9]+): \{/gm)].map((matched) => matched[1]).sort()
}

describe('ConfigProvider 主题体系登记完整性', () => {
  it('消费主题色的组件均已登记到 Theme 接口与组件主题表', () => {
    const consumers = collectThemeConsumers()
    expect(consumers.length).toBeGreaterThan(0)
    expect(parseThemeKeys()).toEqual(consumers)
    expect(parseThemeColorKeys()).toEqual(consumers)
  })
})

describe('ConfigProvider 按组件覆盖主题色', () => {
  it('theme.Menu 生效：色阶注入菜单根节点且不抛错', async () => {
    const wrapper = mount(ConfigProvider, {
      props: { theme: { Menu: { primaryColor: RED } } },
      slots: { default: () => h(Menu, { mode: 'horizontal', items: [{ key: '1', label: 'A' }] }) }
    })
    await nextTick()
    const root = wrapper.find('.menu-wrap')
    expect(root.exists()).toBe(true)
    expect(root.element.style.getPropertyValue('--menu-primary-color')).toBe(getColorPalettes(RED)[5])
  })
})

const BLUE = '#1677ff'

/** 读取菜单根节点上的主色变量（`useInject('Menu')` 派生后的最终产物） */
function menuPrimaryColorVar(wrapper: VueWrapper): string {
  return wrapper.find('.menu-wrap').element.style.getPropertyValue('--menu-primary-color')
}
/** 用于观测色阶的菜单节点 */
const menuNode = () => h(Menu, { mode: 'horizontal', items: [{ key: '1', label: 'A' }] })
/** 宿主：把 `theme` 透传给 `ConfigProvider`，内部渲染一个菜单用于观测色阶 */
function createMenuHost(theme: unknown): ReturnType<typeof defineComponent> {
  return defineComponent({
    setup() {
      return () => h(ConfigProvider, { theme }, { default: menuNode })
    }
  })
}
/** 色阶探针：统计某组件键的主题色阶被替换（即被重写）的次数 */
function createPaletteProbe(key: string): { probe: ReturnType<typeof defineComponent>; changes: () => number } {
  let changes = 0
  const probe = defineComponent({
    setup() {
      const { colorPalettes } = useInject(key)
      watch(colorPalettes, () => {
        changes++
      })
      return () => h('span')
    }
  })
  return { probe, changes: () => changes }
}

describe('ConfigProvider 主题的就地改写', () => {
  it('就地改写 theme 内的组件主色即生效，无需整体替换', async () => {
    const theme = reactive<{ Menu: { primaryColor: string } }>({ Menu: { primaryColor: RED } })
    const wrapper = mount(createMenuHost(theme))
    await nextTick()
    expect(menuPrimaryColorVar(wrapper)).toBe(getColorPalettes(RED)[5])

    theme.Menu.primaryColor = BLUE
    await nextTick()
    expect(menuPrimaryColorVar(wrapper)).toBe(getColorPalettes(BLUE)[5])
  })

  it('就地改写 theme.common 主色即生效，未单独配置的组件跟随', async () => {
    const theme = reactive<{ common: { primaryColor: string } }>({ common: { primaryColor: RED } })
    const wrapper = mount(createMenuHost(theme))
    await nextTick()
    expect(menuPrimaryColorVar(wrapper)).toBe(getColorPalettes(RED)[5])

    theme.common.primaryColor = BLUE
    await nextTick()
    expect(menuPrimaryColorVar(wrapper)).toBe(getColorPalettes(BLUE)[5])
  })

  it('组件键存在但未配置主色时，common 变化需同步该组件色阶', async () => {
    const theme = reactive<{ common: { primaryColor: string }; Menu: { primaryColor?: string } }>({
      common: { primaryColor: RED },
      Menu: {}
    })
    const wrapper = mount(createMenuHost(theme))
    await nextTick()
    expect(menuPrimaryColorVar(wrapper)).toBe(getColorPalettes(RED)[5])

    theme.common.primaryColor = BLUE
    await nextTick()
    expect(menuPrimaryColorVar(wrapper)).toBe(getColorPalettes(BLUE)[5])
  })

  it('挂载后才新增的组件级覆盖即生效', async () => {
    const theme = reactive<{ Menu?: { primaryColor?: string } }>({})
    const wrapper = mount(createMenuHost(theme))
    await nextTick()
    expect(menuPrimaryColorVar(wrapper)).toBe(getColorPalettes(BLUE)[5])

    theme.Menu = { primaryColor: RED }
    await nextTick()
    expect(menuPrimaryColorVar(wrapper)).toBe(getColorPalettes(RED)[5])
  })

  it('挂载后移除组件级覆盖即回退 common', async () => {
    const theme = reactive<{ Menu?: { primaryColor: string } }>({ Menu: { primaryColor: RED } })
    const wrapper = mount(createMenuHost(theme))
    await nextTick()
    expect(menuPrimaryColorVar(wrapper)).toBe(getColorPalettes(RED)[5])

    delete theme.Menu
    await nextTick()
    expect(menuPrimaryColorVar(wrapper)).toBe(getColorPalettes(BLUE)[5])
  })

  it('theme 值未变时不重算色阶（同一主题反复传入新对象）', async () => {
    const renderTick = ref<number>(0)
    const { probe, changes } = createPaletteProbe('Menu')
    const Host = defineComponent({
      setup() {
        return () => {
          // 读取计数以驱动宿主重渲染，模拟父组件因无关状态变化而重渲染
          void renderTick.value
          return h(ConfigProvider, { theme: { Menu: { primaryColor: RED } } }, { default: () => h(probe) })
        }
      }
    })
    mount(Host)
    await nextTick()
    const before = changes()
    for (let i = 0; i < 5; i++) {
      renderTick.value++
      await nextTick()
    }
    expect(changes()).toBe(before)
  })

  it('改其它键的主色时，主色未变的键不被重写', async () => {
    const theme = reactive<Record<string, { primaryColor: string }>>({
      Menu: { primaryColor: RED },
      Button: { primaryColor: BLUE }
    })
    const { probe, changes } = createPaletteProbe('Menu')
    const Host = defineComponent({
      setup() {
        return () => h(ConfigProvider, { theme }, { default: () => h(probe) })
      }
    })
    mount(Host)
    await nextTick()
    const before = changes()

    theme.Button.primaryColor = '#18a058'
    await nextTick()
    expect(changes()).toBe(before)
  })

  it('移除后重新添加相同主色的覆盖仍会生效', async () => {
    const theme = reactive<{ Menu?: { primaryColor: string } }>({ Menu: { primaryColor: RED } })
    const wrapper = mount(createMenuHost(theme))
    await nextTick()
    expect(menuPrimaryColorVar(wrapper)).toBe(getColorPalettes(RED)[5])

    delete theme.Menu
    await nextTick()
    expect(menuPrimaryColorVar(wrapper)).toBe(getColorPalettes(BLUE)[5])

    // 主色与移除前相同：不得被「主色未变」的判定误跳过
    theme.Menu = { primaryColor: RED }
    await nextTick()
    expect(menuPrimaryColorVar(wrapper)).toBe(getColorPalettes(RED)[5])
  })

  it('仅调整主题键顺序不重算色阶（签名与键顺序无关）', async () => {
    const order = ref<number>(0)
    const { probe, changes } = createPaletteProbe('Menu')
    const Host = defineComponent({
      setup() {
        return () => {
          // 两个键的值均不变，仅整体替换为主题对象中键顺序不同的新对象
          const menu = { primaryColor: RED }
          const button = { primaryColor: BLUE }
          const theme = order.value === 0 ? { Menu: menu, Button: button } : { Button: button, Menu: menu }
          return h(ConfigProvider, { theme }, { default: () => h(probe) })
        }
      }
    })
    mount(Host)
    await nextTick()
    const before = changes()
    order.value = 1
    await nextTick()
    expect(changes()).toBe(before)
  })
})

describe('嵌套 ConfigProvider 的主题隔离', () => {
  it('内层覆盖的增删只作用于内层，外层增删也不影响内层', async () => {
    const outerTheme = reactive<{ Menu?: { primaryColor: string } }>({ Menu: { primaryColor: RED } })
    const innerTheme = reactive<{ Menu?: { primaryColor: string } }>({})
    const Host = defineComponent({
      setup() {
        return () =>
          h(
            ConfigProvider,
            { theme: outerTheme },
            {
              default: () => [
                h('div', { class: 'outer-menu' }, [menuNode()]),
                h(
                  ConfigProvider,
                  { theme: innerTheme },
                  {
                    default: () => h('div', { class: 'inner-menu' }, [menuNode()])
                  }
                )
              ]
            }
          )
      }
    })
    const wrapper = mount(Host)
    await nextTick()
    const readVar = (selector: string): string =>
      wrapper.find(`${selector} .menu-wrap`).element.style.getPropertyValue('--menu-primary-color')

    // 内层未配置该组件键：取内层 common（默认色阶），不串用外层的组件覆盖
    expect(readVar('.outer-menu')).toBe(getColorPalettes(RED)[5])
    expect(readVar('.inner-menu')).toBe(getColorPalettes(BLUE)[5])

    // 内层新增覆盖：只改内层
    innerTheme.Menu = { primaryColor: '#18a058' }
    await nextTick()
    expect(readVar('.inner-menu')).toBe(getColorPalettes('#18a058')[5])
    expect(readVar('.outer-menu')).toBe(getColorPalettes(RED)[5])

    // 外层移除覆盖：不影响内层（内层覆盖表与复位状态均为实例私有）
    delete outerTheme.Menu
    await nextTick()
    expect(readVar('.outer-menu')).toBe(getColorPalettes(BLUE)[5])
    expect(readVar('.inner-menu')).toBe(getColorPalettes('#18a058')[5])
  })
})

describe('ConfigProvider 对非本库组件键的容错', () => {
  it('theme 中的非本库组件键被跳过并告警，且不阻断其余键', async () => {
    const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {})
    // 坏键排在前面：修复前它抛错会中断整个回调，导致其后合法的 Menu 键不再写入
    const theme = reactive<Record<string, { primaryColor: string }>>({
      Foo: { primaryColor: BLUE },
      Menu: { primaryColor: RED }
    })
    const wrapper = mount(createMenuHost(theme))
    await nextTick()
    expect(menuPrimaryColorVar(wrapper)).toBe(getColorPalettes(RED)[5])
    expect(warnSpy).toHaveBeenCalledWith(expect.stringContaining('非本库组件键：Foo'))
    warnSpy.mockRestore()
  })
})

describe('useInject 的内置默认主题', () => {
  it('无 ConfigProvider 时回退默认色阶（主色 #1677ff）', () => {
    const Probe = defineComponent({
      setup() {
        const { colorPalettes, shadowColor } = useInject('Menu')
        return () => h('span', { class: 'probe' }, `${colorPalettes.value[5]}|${shadowColor.value}`)
      }
    })
    const wrapper = mount(Probe)
    // 默认阴影色取色阶最浅一级（与 `ConfigProvider` 写入 `common` 时的取法一致）
    expect(wrapper.find('.probe').text()).toBe(
      `${getColorPalettes(BLUE)[5]}|${getAlphaColor(getColorPalettes(BLUE)[0])}`
    )
  })
})
