import { describe, it, expect, afterEach, vi } from 'vitest'
import { nextTick, ref } from 'vue'
import { mount } from '@vue/test-utils'
import Cascader from 'components/cascader/Cascader.vue'
import Popup from 'components/popup'

const sleep = (ms: number): Promise<void> => new Promise((resolve) => setTimeout(resolve, ms))

const OPTIONS = [
  {
    label: '浙江',
    value: 'zhejiang',
    children: [
      { label: '杭州', value: 'hangzhou', children: [{ label: '西湖', value: 'xihu' }] },
      { label: '宁波', value: 'ningbo', children: [{ label: '鄞州', value: 'yinzhou' }] }
    ]
  },
  { label: '江苏', value: 'jiangsu', children: [] }
]

let wrapper: ReturnType<typeof mount> | null = null

/** 面板经 Teleport 挂到 body，卸载时需一并清理，避免污染后续用例 */
afterEach(() => {
  wrapper?.unmount()
  wrapper = null
  document.querySelectorAll('.va-popup-container').forEach((el) => el.remove())
})

async function flush(): Promise<void> {
  await nextTick()
  await nextTick()
}

/** 触发器回填文本 */
function triggerText(): string {
  return wrapper?.find('.cascader-item').text().trim() ?? ''
}

/** 当前面板中的列 */
function menus(): HTMLElement[] {
  return [...document.querySelectorAll<HTMLElement>('.cascader-menu')]
}

/** 当前高亮（激活）选项文本 */
function activeTexts(): string[] {
  return [...document.querySelectorAll<HTMLElement>('.option-active')].map((el) => el.textContent?.trim() ?? '')
}

/** 各列选项文本 */
function columnTexts(columnIndex: number): string[] {
  const menu = menus()[columnIndex]
  if (!menu) return []
  return [...menu.querySelectorAll('.cascader-option')].map((el) => el.textContent?.trim() ?? '')
}

async function openPanel(): Promise<void> {
  await wrapper?.trigger('click')
  await flush()
  await sleep(20)
}

async function clickOption(label: string): Promise<void> {
  const target = [...document.querySelectorAll<HTMLElement>('.cascader-option')].find(
    (el) => el.textContent?.trim() === label
  )
  expect(target, `未找到选项「${label}」`).toBeTruthy()
  target?.dispatchEvent(new MouseEvent('click', { bubbles: true }))
  await flush()
  await sleep(20)
}

describe('Cascader 基础行为', () => {
  it('value 路径渲染为完整路径文本', async () => {
    wrapper = mount(Cascader, {
      attachTo: document.body,
      props: { options: OPTIONS, value: ['zhejiang', 'hangzhou', 'xihu'] }
    })
    await flush()
    expect(triggerText()).toBe('浙江 / 杭州 / 西湖')
  })

  it('未选中时展示占位文本', async () => {
    wrapper = mount(Cascader, { attachTo: document.body, props: { options: OPTIONS, placeholder: '请选择地区' } })
    await flush()
    expect(triggerText()).toBe('请选择地区')
  })

  it('多选未选中时同样展示占位文本', async () => {
    wrapper = mount(Cascader, {
      attachTo: document.body,
      props: { options: OPTIONS, multiple: true, placeholder: '请选择地区' }
    })
    await flush()
    expect(wrapper.find('.cascader-placeholder').text()).toBe('请选择地区')
  })

  it('单选重新打开按当前 value 复位展开列', async () => {
    wrapper = mount(Cascader, {
      attachTo: document.body,
      props: { options: OPTIONS, value: ['zhejiang', 'hangzhou', 'xihu'] }
    })
    await flush()
    await openPanel()
    expect(menus().length).toBe(3)

    await wrapper.trigger('click')
    await flush()
    await wrapper.setProps({ value: ['zhejiang', 'ningbo', 'yinzhou'] })
    await flush()
    await openPanel()
    expect(menus().length).toBe(3)
    expect(columnTexts(1)).toEqual(['杭州', '宁波'])
  })

  it('展开面板首列展示根级选项，点选父级追加下一列', async () => {
    wrapper = mount(Cascader, { attachTo: document.body, props: { options: OPTIONS } })
    await flush()
    await openPanel()
    expect(columnTexts(0)).toEqual(['浙江', '江苏'])

    await clickOption('浙江')
    expect(menus().length).toBe(2)
    expect(columnTexts(1)).toEqual(['杭州', '宁波'])
  })
})

describe('Cascader 展开方式与自定义触发器', () => {
  it('expandTrigger 为 hover 时悬浮父级展开下一列', async () => {
    wrapper = mount(Cascader, {
      attachTo: document.body,
      props: { options: OPTIONS, expandTrigger: 'hover' }
    })
    await flush()
    await openPanel()
    const firstColumnOption = document.querySelector<HTMLElement>('.cascader-option')
    firstColumnOption?.dispatchEvent(new MouseEvent('mouseenter', { bubbles: true }))
    await flush()
    expect(menus().length).toBe(2)
    expect(columnTexts(1)).toEqual(['杭州', '宁波'])
  })

  it('提供默认插槽时整体替换触发器，点击可展开面板', async () => {
    wrapper = mount(Cascader, {
      attachTo: document.body,
      props: { options: OPTIONS },
      slots: { default: () => '切换城市' }
    })
    await flush()
    expect(wrapper.find('.cascader-content-container').exists()).toBe(false)
    expect(wrapper.find('.cascader-custom-trigger').text()).toBe('切换城市')

    await openPanel()
    expect(menus().length).toBe(1)
  })
})

describe('Cascader 值变更', () => {
  it('选中叶子节点派发 change，第二参为路径上的选项数据', async () => {
    wrapper = mount(Cascader, { attachTo: document.body, props: { options: OPTIONS } })
    await flush()
    await openPanel()
    await clickOption('浙江')
    await clickOption('杭州')
    await clickOption('西湖')

    const events = wrapper.emitted('change')
    expect(events).toBeTruthy()
    const [values, options] = events?.[events.length - 1] as [string[], { value: string }[]]
    expect(values).toEqual(['zhejiang', 'hangzhou', 'xihu'])
    expect(options.map((option) => option.value)).toEqual(['zhejiang', 'hangzhou', 'xihu'])
  })

  it('changeOnSelect 为 true 时点选父级即改变值', async () => {
    wrapper = mount(Cascader, { attachTo: document.body, props: { options: OPTIONS, changeOnSelect: true } })
    await flush()
    await openPanel()
    await clickOption('浙江')

    const events = wrapper.emitted('change')
    expect(events).toBeTruthy()
    expect(events?.[events.length - 1][0]).toEqual(['zhejiang'])
  })

  it('changeOnSelect 为 false 时点选父级不改变值', async () => {
    wrapper = mount(Cascader, { attachTo: document.body, props: { options: OPTIONS } })
    await flush()
    await openPanel()
    await clickOption('浙江')
    expect(wrapper.emitted('change')).toBeUndefined()
  })

  it('点选叶子收起面板后输入框保留可见光标', async () => {
    wrapper = mount(Cascader, { attachTo: document.body, props: { options: OPTIONS } })
    await flush()
    await openPanel()
    await wrapper.find('.search-input').trigger('focus')
    await clickOption('浙江')
    await clickOption('杭州')
    await clickOption('西湖')

    expect(wrapper.findComponent(Popup).props('show')).toBe(false)
    // 关闭面板只是收起浮层，焦点仍在输入框：光标样式不能跟着面板一起消失
    expect(wrapper.find('.search-input').classes()).toContain('caret-show')
  })

  it('点击清除图标后回写空路径', async () => {
    wrapper = mount(Cascader, {
      attachTo: document.body,
      props: { options: OPTIONS, value: ['zhejiang', 'hangzhou', 'xihu'], allowClear: true }
    })
    await flush()
    const clearIcon = wrapper.find('.clear-svg')
    expect(clearIcon.exists()).toBe(true)
    await clearIcon.trigger('click')

    const events = wrapper.emitted('change')
    expect(events?.[events.length - 1][0]).toEqual([])
  })

  it('面板展开时清除：收起面板且列不在收起前塌陷', async () => {
    wrapper = mount(Cascader, {
      attachTo: document.body,
      props: { options: OPTIONS, value: ['zhejiang', 'hangzhou', 'xihu'], allowClear: true }
    })
    await flush()
    await openPanel()
    await clickOption('浙江')
    expect(menus().length).toBe(2)

    await wrapper.find('.clear-svg').trigger('click')
    // 收起动画期间列内容保持不变，避免「右列先消失、首列再淡出」
    expect(menus().length).toBe(2)
    await flush()
    expect(wrapper.find('.cascader-wrap').classes()).not.toContain('cascader-open')
    expect(wrapper.emitted('change')?.[0][0]).toEqual([])
  })

  it('禁用选项不触发变更', async () => {
    wrapper = mount(Cascader, {
      attachTo: document.body,
      props: {
        options: [{ label: '浙江', value: 'zhejiang', disabled: true, children: [] }]
      }
    })
    await flush()
    await openPanel()
    await clickOption('浙江')
    expect(wrapper.emitted('change')).toBeUndefined()
  })
})

describe('Cascader 搜索', () => {
  it('输入关键词后按完整路径展示命中结果，并高亮关键词', async () => {
    wrapper = mount(Cascader, {
      attachTo: document.body,
      props: { options: OPTIONS, showSearch: true }
    })
    await flush()
    await openPanel()

    const input = wrapper.find('.search-input').element as HTMLInputElement
    input.value = '西'
    input.dispatchEvent(new Event('input', { bubbles: true }))
    await flush()
    await sleep(20)

    expect(columnTexts(0)).toEqual(['浙江 / 杭州 / 西湖'])
    const keyword = document.querySelector('.cascader-option-keyword')
    expect(keyword?.textContent).toBe('西')
  })

  it('输入法合成期间隐藏占位文本，避免与拼音重叠', async () => {
    wrapper = mount(Cascader, { attachTo: document.body, props: { options: OPTIONS, showSearch: true } })
    await flush()
    expect(wrapper.find('.cascader-placeholder').exists()).toBe(true)

    await wrapper.find('.search-input').trigger('compositionstart')
    await flush()
    expect(wrapper.find('.cascader-placeholder').exists()).toBe(false)

    await wrapper.find('.search-input').trigger('compositionend')
    await flush()
    expect(wrapper.find('.cascader-placeholder').exists()).toBe(true)
  })

  it('showSearch 传 filter 函数时按函数判定命中', async () => {
    wrapper = mount(Cascader, {
      attachTo: document.body,
      props: {
        options: OPTIONS,
        showSearch: { filter: (_inputValue: string, path: { value?: string }[]) => path[0]?.value === 'jiangsu' }
      }
    })
    await flush()
    await openPanel()

    const input = wrapper.find('.search-input').element as HTMLInputElement
    input.value = '任意'
    input.dispatchEvent(new Event('input', { bubbles: true }))
    await flush()
    await sleep(20)

    expect(columnTexts(0)).toEqual(['江苏'])
  })

  it('搜索无结果时展示空数据', async () => {
    wrapper = mount(Cascader, { attachTo: document.body, props: { options: OPTIONS, showSearch: true } })
    await flush()
    await openPanel()

    const input = wrapper.find('.search-input').element as HTMLInputElement
    input.value = '不存在'
    input.dispatchEvent(new Event('input', { bubbles: true }))
    await flush()
    await sleep(20)

    expect(document.querySelector('.cascader-panel-empty')).toBeTruthy()
  })
})

describe('Cascader 多选', () => {
  it('勾选叶子节点后 change 收到路径数组', async () => {
    wrapper = mount(Cascader, { attachTo: document.body, props: { options: OPTIONS, multiple: true } })
    await flush()
    await openPanel()
    await clickOption('浙江')
    await clickOption('杭州')
    await clickOption('西湖')

    const events = wrapper.emitted('change')
    expect(events).toBeTruthy()
    // SHOW_PARENT 下「杭州」的子项已全部选中，回填折叠到父级路径
    expect(events?.[events.length - 1][0]).toEqual([['zhejiang', 'hangzhou']])
  })

  it('勾选父级连带全部叶子，默认回填父级路径', async () => {
    wrapper = mount(Cascader, { attachTo: document.body, props: { options: OPTIONS, multiple: true } })
    await flush()
    await openPanel()
    const checkbox = document.querySelector<HTMLElement>('.cascader-option-checkbox')
    checkbox?.dispatchEvent(new MouseEvent('click', { bubbles: true }))
    await flush()

    const events = wrapper.emitted('change')
    expect(events?.[events.length - 1][0]).toEqual([['zhejiang']])
  })

  it('半选的父级点勾选补齐整棵子树，不丢失已勾选分支', async () => {
    wrapper = mount(Cascader, {
      attachTo: document.body,
      props: { options: OPTIONS, multiple: true, value: [['zhejiang', 'hangzhou', 'xihu']] }
    })
    await flush()
    await openPanel()
    const checkbox = document.querySelector<HTMLElement>('.cascader-option-checkbox')
    checkbox?.dispatchEvent(new MouseEvent('click', { bubbles: true }))
    await flush()

    const events = wrapper.emitted('change')
    // 浙江下「杭州」已全选、「宁波」未选，点浙江应补齐宁波而不是把杭州替换成宁波
    expect(events?.[events.length - 1][0]).toEqual([['zhejiang']])
  })

  it('多选展开面板只展示根列，不按已选值展开', async () => {
    wrapper = mount(Cascader, {
      attachTo: document.body,
      props: { options: OPTIONS, multiple: true, value: [['zhejiang', 'hangzhou', 'xihu']] }
    })
    await flush()
    await openPanel()
    // 多选没有「当前路径」：多条已选值取第一条展开会误导，与单选口径区分
    expect(menus().length).toBe(1)
  })

  it('多选关闭后重新打开沿用上次展开的列', async () => {
    wrapper = mount(Cascader, { attachTo: document.body, props: { options: OPTIONS, multiple: true } })
    await flush()
    await openPanel()
    expect(menus().length).toBe(1)

    await clickOption('浙江')
    expect(menus().length).toBe(2)

    await wrapper.trigger('click')
    await flush()
    await openPanel()
    // 多选不复位激活路径：用户手动展开的列在下次打开时保留
    expect(menus().length).toBe(2)
    expect(columnTexts(1)).toEqual(['杭州', '宁波'])
  })

  it('showCheckedStrategy 为 SHOW_CHILD 时回填叶子路径', async () => {
    wrapper = mount(Cascader, {
      attachTo: document.body,
      props: { options: OPTIONS, multiple: true, showCheckedStrategy: 'SHOW_CHILD' }
    })
    await flush()
    await openPanel()
    const checkbox = document.querySelector<HTMLElement>('.cascader-option-checkbox')
    checkbox?.dispatchEvent(new MouseEvent('click', { bubbles: true }))
    await flush()

    const events = wrapper.emitted('change')
    expect(events?.[events.length - 1][0]).toEqual([
      ['zhejiang', 'hangzhou', 'xihu'],
      ['zhejiang', 'ningbo', 'yinzhou']
    ])
  })

  it('SHOW_PARENT 下禁用子项不阻断父级折叠', async () => {
    const optionsWithDisabled = [
      {
        label: '浙江',
        value: 'zhejiang',
        children: [
          {
            label: '杭州',
            value: 'hangzhou',
            children: [
              { label: '西湖', value: 'xihu' },
              { label: '下沙', value: 'xiasha', disabled: true }
            ]
          },
          { label: '宁波', value: 'ningbo', children: [{ label: '鄞州', value: 'yinzhou' }] }
        ]
      }
    ]
    wrapper = mount(Cascader, {
      attachTo: document.body,
      props: { options: optionsWithDisabled, multiple: true, value: [['zhejiang', 'hangzhou', 'xihu']] }
    })
    await flush()
    // 杭州下仅剩「西湖」可勾选，父级折叠为「杭州」；浙江下「宁波」未选，不折叠
    expect(wrapper.find('.cascader-selection-item').text()).toContain('杭州')
    expect(wrapper.find('.cascader-selection-item').text()).not.toContain('浙江')
  })

  it('多选回填顺序跟随值中路径的先后，可折叠分支在首次出现处收敛', async () => {
    wrapper = mount(Cascader, {
      attachTo: document.body,
      props: {
        options: OPTIONS,
        multiple: true,
        value: [['jiangsu'], ['zhejiang', 'ningbo', 'yinzhou'], ['zhejiang', 'hangzhou', 'xihu']]
      }
    })
    await flush()
    // 浙江两个分支全选折叠为「浙江」，但它排在江苏之后（值里的先后），而不是按选项树序排到最前
    expect(wrapper.findAll('.cascader-selection-item').map((el) => el.text())).toEqual(['江苏', '浙江'])
  })

  it('已选路径渲染为 tag，超出 maxTagCount 的部分折叠', async () => {
    wrapper = mount(Cascader, {
      attachTo: document.body,
      props: {
        options: OPTIONS,
        multiple: true,
        maxTagCount: 1,
        value: [
          ['zhejiang', 'hangzhou', 'xihu'],
          ['jiangsu', 'nanjing', 'zhonghuamen']
        ]
      }
    })
    await flush()
    const tags = wrapper.findAll('.cascader-selection-item')
    // 浙江下尚有「鄞州」未选，折叠到「杭州」；江苏仅一个子项，折叠到「江苏」
    expect(tags[0].text()).toContain('杭州')
    expect(wrapper.find('.cascader-selection-item-rest').text()).toContain('+ 1')
  })

  it('responsive 折叠为输入框预留占位，避免 tag 占满整行后输入框换行', async () => {
    // happy-dom 无布局：打桩容器宽度与 tag / 折叠提示宽度，并保留 ResizeObserver 回调手动触发重算
    let resizeCallback: ResizeObserverCallback | null = null
    const realResizeObserver = globalThis.ResizeObserver
    globalThis.ResizeObserver = class {
      constructor(callback: ResizeObserverCallback) {
        resizeCallback = callback
      }
      observe(): void {}
      unobserve(): void {}
      disconnect(): void {}
    } as unknown as typeof ResizeObserver
    const clientWidthSpy = vi.spyOn(HTMLElement.prototype, 'clientWidth', 'get').mockImplementation(function (
      this: HTMLElement
    ) {
      return this.classList.contains('cascader-content-container') ? 210 : 0
    })
    const offsetWidthSpy = vi.spyOn(HTMLElement.prototype, 'offsetWidth', 'get').mockImplementation(function (
      this: HTMLElement
    ) {
      if (this.classList.contains('cascader-selection-item-rest')) return 55
      if (this.classList.contains('cascader-selection-item')) return 71
      return 0
    })
    wrapper = mount(Cascader, {
      attachTo: document.body,
      props: {
        options: OPTIONS,
        multiple: true,
        maxTagCount: 'responsive',
        showCheckedStrategy: 'SHOW_CHILD',
        value: [['zhejiang', 'hangzhou', 'xihu'], ['zhejiang', 'ningbo', 'yinzhou'], ['jiangsu']]
      }
    })
    await flush()
    // 前提：ResizeObserver 已注册（首次测量发生在尺寸回调里）
    expect(typeof resizeCallback).toBe('function')
    // 首次测量时折叠提示尚未渲染（rest 宽度按 0 计），尺寸变化回调后按真实宽度重算
    resizeCallback?.([] as unknown as ResizeObserverEntry[], {} as ResizeObserver)
    await flush()
    // 2 个 tag（71 + 4） + 折叠提示（55 + 4） = 209 > 210 - 输入框占位（4 + 4），故只保留 1 个
    expect(wrapper.find('.cascader-selection-item-rest').text()).toContain('+ 2')
    clientWidthSpy.mockRestore()
    offsetWidthSpy.mockRestore()
    globalThis.ResizeObserver = realResizeObserver
  })

  it('tagRender 插槽接管 tag 内容', async () => {
    wrapper = mount(Cascader, {
      attachTo: document.body,
      props: { options: OPTIONS, multiple: true, value: [['zhejiang', 'hangzhou', 'xihu']] },
      slots: { tagRender: (params: { label: string }) => `TAG:${params.label}` }
    })
    await flush()
    expect(wrapper.find('.cascader-selection-item').text()).toBe('TAG:杭州')
    // 自定义 tag 的皮肤由使用者接管，包裹层不再附加默认 chip 皮肤
    expect(wrapper.find('.cascader-selection-item').classes()).toContain('cascader-selection-item-custom')
  })
})

describe('Cascader 触发器布局与面板宽度', () => {
  it('多选时输入框排在 tag 之后，且不渲染后缀箭头', async () => {
    wrapper = mount(Cascader, {
      attachTo: document.body,
      props: { options: OPTIONS, multiple: true, value: [['zhejiang', 'hangzhou', 'xihu']] }
    })
    await flush()
    const container = wrapper.find('.cascader-content-container')
    const classNames = [...container.element.children].map((el) => el.className)
    expect(classNames.indexOf('cascader-selection-item')).toBeLessThan(classNames.indexOf('cascader-search'))
    expect(wrapper.find('.arrow-svg').exists()).toBe(false)
    expect(wrapper.find('.cascader-suffix').exists()).toBe(false)
  })

  it('单选保留后缀箭头，输入框位置不影响回填内容', async () => {
    wrapper = mount(Cascader, {
      attachTo: document.body,
      props: { options: OPTIONS, value: ['zhejiang', 'hangzhou', 'xihu'] }
    })
    await flush()
    expect(wrapper.find('.arrow-svg').exists()).toBe(true)
    expect(triggerText()).toBe('浙江 / 杭州 / 西湖')
  })

  it('搜索态后缀切为搜索图标，收起后回落箭头', async () => {
    wrapper = mount(Cascader, { attachTo: document.body, props: { options: OPTIONS, showSearch: true } })
    await flush()
    expect(wrapper.find('.arrow-svg').classes()).toContain('show-svg')
    expect(wrapper.find('.search-svg').classes()).not.toContain('show-svg')

    await openPanel()
    expect(wrapper.find('.arrow-svg').classes()).not.toContain('show-svg')
    expect(wrapper.find('.search-svg').classes()).toContain('show-svg')
  })

  it('notFoundContent 传 null 时仍展开面板并回落默认空态', async () => {
    wrapper = mount(Cascader, { attachTo: document.body, props: { options: [], notFoundContent: null } })
    await flush()
    await openPanel()
    expect(wrapper.findComponent(Popup).props('show')).toBe(true)
    expect(document.querySelector('.cascader-panel-empty')).toBeTruthy()
  })

  it('面板宽度由列内容决定，不与选择器等宽；搜索结果与空态保留最小宽度', async () => {
    wrapper = mount(Cascader, { attachTo: document.body, props: { options: OPTIONS } })
    await flush()
    expect(wrapper.findComponent(Popup).props('matchTriggerWidth')).toBe(false)

    await wrapper.setProps({ showSearch: true, searchValue: '西' })
    await flush()
    expect(wrapper.findComponent(Popup).props('matchTriggerWidth')).toBe('minWidth')

    await wrapper.setProps({ showSearch: { matchInputWidth: false } })
    await flush()
    expect(wrapper.findComponent(Popup).props('matchTriggerWidth')).toBe(false)

    await wrapper.setProps({ showSearch: true, options: [] })
    await flush()
    expect(wrapper.findComponent(Popup).props('matchTriggerWidth')).toBe('minWidth')
  })
})

describe('Cascader 非受控与异步加载', () => {
  it('defaultValue 作为非受控初值', async () => {
    wrapper = mount(Cascader, {
      attachTo: document.body,
      props: { options: OPTIONS, defaultValue: ['zhejiang', 'hangzhou', 'xihu'] }
    })
    await flush()
    expect(triggerText()).toBe('浙江 / 杭州 / 西湖')
  })

  it('展开无可选子项的父级时触发 loadData，子项写入后追加下一列', async () => {
    const asyncOptions = [{ label: '浙江', value: 'zhejiang', isLeaf: false }]
    const loadData = (path: { label?: string }[]) => {
      expect(path[path.length - 1]?.label).toBe('浙江')
      ;(asyncOptions[0] as { children?: unknown[] }).children = [{ label: '杭州', value: 'hangzhou' }]
    }
    wrapper = mount(Cascader, { attachTo: document.body, props: { options: asyncOptions, loadData } })
    await flush()
    await openPanel()
    await clickOption('浙江')
    await flush()
    await sleep(20)
    expect(columnTexts(1)).toEqual(['杭州'])
  })

  it('子项写入后就地解除加载图标', async () => {
    const asyncOptions = ref([{ label: '浙江', value: 'zhejiang', isLeaf: false }])
    const loadData = (path: { label?: string }[]) => {
      const target = path[path.length - 1] as { loading?: boolean; children?: unknown[] }
      target.loading = true
      setTimeout(() => {
        target.children = [{ label: '杭州', value: 'hangzhou' }]
        target.loading = false
      }, 120)
    }
    wrapper = mount(Cascader, { attachTo: document.body, props: { options: asyncOptions.value, loadData } })
    await flush()
    await openPanel()
    await clickOption('浙江')
    expect(document.querySelector('.cascader-option-loading-icon')).toBeTruthy()

    await sleep(180)
    await flush()
    // 子项已到位：即使 options 是就地补写（数组引用不变）也要解除加载态
    expect(document.querySelector('.cascader-option-loading-icon')).toBeNull()
    expect(columnTexts(1)).toEqual(['杭州'])
  })

  it('键盘 ↓↑ 在当前激活列内移动，不自动展开子列', async () => {
    wrapper = mount(Cascader, { attachTo: document.body, props: { options: OPTIONS } })
    await flush()
    await openPanel()
    const input = wrapper.find('.search-input')

    await input.trigger('keydown', { key: 'ArrowDown' })
    await flush()
    expect(activeTexts()).toEqual(['浙江'])

    await input.trigger('keydown', { key: 'ArrowDown' })
    await flush()
    // 第二次仍在根列内移动到江苏，而不是钻进浙江的子列
    expect(activeTexts()).toEqual(['江苏'])
  })

  it('键盘 → 进入子列、← 退回上一列，首列再按 ← 收起面板', async () => {
    wrapper = mount(Cascader, { attachTo: document.body, props: { options: OPTIONS } })
    await flush()
    await openPanel()
    const input = wrapper.find('.search-input')

    await input.trigger('keydown', { key: 'ArrowDown' })
    await flush()
    await input.trigger('keydown', { key: 'ArrowRight' })
    await flush()
    expect(menus().length).toBe(3)

    await input.trigger('keydown', { key: 'ArrowLeft' })
    await flush()
    expect(menus().length).toBe(2)
    expect(wrapper.findComponent(Popup).props('show')).toBe(true)

    await input.trigger('keydown', { key: 'ArrowLeft' })
    await flush()
    expect(wrapper.findComponent(Popup).props('show')).toBe(false)
  })
})
describe('Cascader 面板底部操作区', () => {
  it('提供 action 插槽时渲染底部操作区，未提供时不渲染', async () => {
    wrapper = mount(Cascader, {
      attachTo: document.body,
      props: { options: OPTIONS },
      slots: { action: '<button class="demo-confirm">确定</button>' }
    })
    await flush()
    await openPanel()
    const footer = document.querySelector('.cascader-panel-footer')
    expect(footer).toBeTruthy()
    expect(footer?.querySelector('.demo-confirm')).toBeTruthy()
    wrapper.unmount()
    wrapper = null

    wrapper = mount(Cascader, { attachTo: document.body, props: { options: OPTIONS } })
    await flush()
    await openPanel()
    expect(document.querySelector('.cascader-panel-footer')).toBeNull()
  })
})

describe('Cascader 已勾选数据', () => {
  it('多选勾选后 getCheckedData 返回选项数据，单选返回空数组', async () => {
    const single = mount(Cascader, { attachTo: document.body, props: { options: OPTIONS } })
    await flush()
    expect((single.vm as unknown as { getCheckedData: () => unknown[] }).getCheckedData()).toEqual([])
    single.unmount()

    wrapper = mount(Cascader, {
      attachTo: document.body,
      props: { options: OPTIONS, multiple: true, value: [['zhejiang', 'hangzhou', 'xihu']] }
    })
    await flush()
    const data = (wrapper.vm as unknown as { getCheckedData: () => { value?: string }[][] }).getCheckedData()
    expect(data.length).toBe(1)
    // SHOW_PARENT（默认）：杭州下唯一叶子被选中即折叠到杭州
    expect(data[0].map((option) => option.value)).toEqual(['zhejiang', 'hangzhou'])
  })

  it('SHOW_CHILD 策略下 getCheckedData 返回叶子路径', async () => {
    wrapper = mount(Cascader, {
      attachTo: document.body,
      props: {
        options: OPTIONS,
        multiple: true,
        showCheckedStrategy: 'SHOW_CHILD',
        value: [['zhejiang', 'hangzhou', 'xihu']]
      }
    })
    await flush()
    const data = (wrapper.vm as unknown as { getCheckedData: () => { value?: string }[][] }).getCheckedData()
    expect(data[0].map((option) => option.value)).toEqual(['zhejiang', 'hangzhou', 'xihu'])
  })
})

describe('Cascader 虚拟滚动', () => {
  /** 60 个叶子选项的根列，面板高 180 一行 32 时一屏只装得下约 6 行 */
  const MANY = Array.from({ length: 60 }, (_, index) => ({
    label: `选项${index}`,
    value: `v${index}`
  }))

  it('默认不开启虚拟滚动：全量渲染且无占位', async () => {
    wrapper = mount(Cascader, { attachTo: document.body, props: { options: MANY } })
    await flush()
    await openPanel()
    expect(columnTexts(0).length).toBe(MANY.length)
    expect(document.querySelectorAll('.cascader-virtual-placeholder').length).toBe(0)
  })

  it('显式开启时只渲染可视区选项，未渲染区用占位撑高', async () => {
    wrapper = mount(Cascader, { attachTo: document.body, props: { options: MANY, virtual: true } })
    await flush()
    await openPanel()
    const rendered = columnTexts(0).length
    expect(rendered).toBeGreaterThan(0)
    expect(rendered).toBeLessThan(MANY.length)
    expect(document.querySelectorAll('.cascader-virtual-placeholder').length).toBeGreaterThan(0)
  })

  it('选项数不超过一屏时全量渲染', async () => {
    wrapper = mount(Cascader, { attachTo: document.body, props: { options: OPTIONS } })
    await flush()
    await openPanel()
    expect(columnTexts(0).length).toBe(OPTIONS.length)
    expect(document.querySelectorAll('.cascader-virtual-placeholder').length).toBe(0)
  })
})

describe('Cascader 虚拟滚动的列状态维护', () => {
  /** 5 个省 × 40 个市，面板高 64（两行），足以触发虚拟滚动 */
  const TREE = Array.from({ length: 5 }, (_, province) => ({
    label: `省${province}`,
    value: `p-${province}`,
    children: Array.from({ length: 40 }, (_, city) => ({
      label: `市${province}-${city}`,
      value: `c-${province}-${city}`
    }))
  }))
  const PROPS = { options: TREE, panelHeight: 64, virtual: true }

  /** 该列 Scrollbar 的滚动容器 */
  function columnContainer(columnIndex: number): HTMLElement {
    const container = menus()[columnIndex]?.querySelector<HTMLElement>('.scrollbar-container')
    expect(container, `未找到第 ${columnIndex} 列滚动容器`).toBeTruthy()
    return container as HTMLElement
  }

  async function scrollColumn(columnIndex: number, top: number): Promise<void> {
    const container = columnContainer(columnIndex)
    container.scrollTop = top
    container.dispatchEvent(new Event('scroll'))
    await flush()
  }

  it('切换父级后子列滚动位置回到顶部，并渲染新父级的子项', async () => {
    wrapper = mount(Cascader, { attachTo: document.body, props: PROPS })
    await flush()
    await openPanel()
    await clickOption('省0')
    await scrollColumn(1, 200)
    expect(columnContainer(1).scrollTop).toBe(200)

    await clickOption('省1')
    await flush()
    expect(columnContainer(1).scrollTop).toBe(0)
    expect(columnTexts(1)[0]).toBe('市1-0')
  })

  it('收起后重新展开，各列保持收起前的滚动位置且不为空白', async () => {
    wrapper = mount(Cascader, { attachTo: document.body, props: PROPS })
    await flush()
    await openPanel()
    await scrollColumn(0, 200)

    const input = wrapper.find('.search-input')
    await input.trigger('keydown', { key: 'Escape' })
    await flush()
    await sleep(20)

    await openPanel()
    expect(columnTexts(0).length).toBeGreaterThan(0)
    expect(columnContainer(0).scrollTop).toBe(200)
    // 渲染窗口跟随保持的位置：首项不再是省0，而是滚动位置对应的项
    expect(columnTexts(0)).not.toContain('省0')
  })

  it('滚动位置超出当前列内容高度时渲染窗口自动夹取，不出现空列', async () => {
    wrapper = mount(Cascader, { attachTo: document.body, props: PROPS })
    await flush()
    await openPanel()
    await clickOption('省0')
    await scrollColumn(1, 200)

    // 换成子项更少的父级：缓存偏移远超新内容高度
    await clickOption('省0')
    await flush()
    expect(columnTexts(1).length).toBeGreaterThan(0)
  })
})

describe('Cascader 重开面板后的激活项可见性', () => {
  /** 100 个省，value 指向靠后的第 60 个 */
  const MANY = Array.from({ length: 100 }, (_, index) => ({
    label: `省${index}`,
    value: `p-${index}`
  }))
  const PROPS = { options: MANY, panelHeight: 64, value: ['p-60'], virtual: true }

  it('重新展开后，选中项仍落在渲染窗口内', async () => {
    wrapper = mount(Cascader, { attachTo: document.body, props: PROPS })
    await flush()
    await openPanel()
    expect(columnTexts(0), '首次打开应定位到选中项').toContain('省60')

    const input = wrapper.find('.search-input')
    await input.trigger('keydown', { key: 'Escape' })
    await flush()
    await sleep(20)

    await openPanel()
    expect(columnTexts(0), '重新打开仍应定位到选中项').toContain('省60')
  })
})

describe('Cascader 全量渲染下的激活项定位', () => {
  /** 100 个省，value 指向第 60 个；行高按 32、面板视口 64（jsdom 无布局，几何由下面的 stub 提供） */
  const MANY = Array.from({ length: 100 }, (_, index) => ({
    label: `省${index}`,
    value: `p-${index}`
  }))

  it('打开长列表时把选中项滚入可视区', async () => {
    const rect = (top: number, bottom: number): DOMRect =>
      ({
        top,
        bottom,
        height: bottom - top,
        left: 0,
        right: 100,
        width: 100,
        x: 0,
        y: top,
        toJSON: () => ({})
      }) as DOMRect
    const spy = vi.spyOn(HTMLElement.prototype, 'getBoundingClientRect').mockImplementation(function (
      this: HTMLElement
    ): DOMRect {
      if (this.classList.contains('scrollbar-container')) return rect(0, 64)
      if (this.classList.contains('cascader-option') && this.parentElement) {
        const index = Array.prototype.indexOf.call(this.parentElement.children, this)
        return rect(index * 32, index * 32 + 32)
      }
      return rect(0, 0)
    })
    try {
      wrapper = mount(Cascader, { attachTo: document.body, props: { options: MANY, panelHeight: 64, value: ['p-60'] } })
      await flush()
      await openPanel()
      expect(columnTexts(0).length, '默认全量渲染').toBe(MANY.length)
      // 第 60 项占 1920~1952，超出视口底部 64 → 最小幅度滚动到 1952 - 64
      expect(document.querySelector<HTMLElement>('.scrollbar-container')?.scrollTop).toBe(1888)
    } finally {
      spy.mockRestore()
    }
  })
})

describe('Cascader 虚拟列宽度锁定', () => {
  const MANY = Array.from({ length: 60 }, (_, index) => ({
    label: `选项${index}`,
    value: `v${index}`
  }))

  it('虚拟列按整列最宽行锁定宽度，切片内容变化不改列宽', async () => {
    // jsdom 无布局：把测量层的实测宽度打成 200，其余元素为 0
    const origin = HTMLElement.prototype.getBoundingClientRect
    HTMLElement.prototype.getBoundingClientRect = function (this: HTMLElement): DOMRect {
      const width = this.classList.contains('cascader-menu-measure') ? 200 : 0
      return { top: 0, left: 0, right: width, bottom: 0, width, height: 0, x: 0, y: 0, toJSON: () => ({}) } as DOMRect
    }
    try {
      wrapper = mount(Cascader, { attachTo: document.body, props: { options: MANY, virtual: true } })
      await flush()
      await openPanel()
      await flush()
      // 200 + 列左右内边距 8
      expect(menus()[0].style.minWidth).toBe('208px')

      // 滚到中段：仍按整列宽度渲染，不随切片变化
      const container = menus()[0].querySelector<HTMLElement>('.scrollbar-container')
      container!.scrollTop = 200
      container!.dispatchEvent(new Event('scroll'))
      await flush()
      expect(menus()[0].style.minWidth).toBe('208px')
    } finally {
      HTMLElement.prototype.getBoundingClientRect = origin
    }
  })
})
