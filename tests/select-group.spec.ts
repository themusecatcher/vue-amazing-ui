import { describe, it, expect, afterEach } from 'vitest'
import { nextTick } from 'vue'
import { mount } from '@vue/test-utils'
import Select from 'components/select/Select.vue'
import type { Option } from 'components/select/Select.vue'

/**
 * 分组子选项（`fieldNames.options`）契约（分组标题与子选项）：
 * - 分组条目自身不可选中，只渲染标题；组内子选项按扁平常量顺序参与选中 / 键盘导航 / 过滤
 * - 分组标题不占「展示下标」：change 第 3 参仍等于扁平候选中的下标
 * - 过滤时按组内选项命中，未命中的组连同标题整体消失
 */
const GROUP_OPTIONS: Option[] = [
  {
    label: 'Manager',
    options: [
      { label: 'Jack', value: 'jack' },
      { label: 'Lucy', value: 'lucy' }
    ]
  },
  {
    label: 'Engineer',
    options: [{ label: 'Yiminghe', value: 'yiminghe' }]
  }
]

let wrapper: ReturnType<typeof mount> | null = null

afterEach(() => {
  wrapper?.unmount()
  wrapper = null
  document.querySelectorAll('.select-panel-wrapper').forEach((el) => el.remove())
})

/** 等待「状态变更 → 面板渲染」稳定 */
async function flush(): Promise<void> {
  let prev = ''
  for (let turn = 0; turn < 20; turn++) {
    await nextTick()
    await new Promise<void>((resolve) => setTimeout(resolve, 0))
    const current = document.body.innerHTML
    if (current === prev) {
      return
    }
    prev = current
  }
}

/** 面板内的渲染顺序：分组标题与选项混排，用类名区分 */
function panelTexts(): string[] {
  return [...document.querySelectorAll('.select-option-group, .select-option')].map(
    (el) => el.textContent?.trim() ?? ''
  )
}

function hoverTexts(): string[] {
  return [...document.querySelectorAll('.select-option.option-hover')].map((el) => el.textContent?.trim() ?? '')
}

async function pressKey(key: string): Promise<void> {
  const input = wrapper!.find('.search-input').element as HTMLInputElement
  input.dispatchEvent(new KeyboardEvent('keydown', { key, bubbles: true }))
  await flush()
}

describe('Select 分组子选项（fieldNames.options）', () => {
  it('按扁平常量顺序渲染：分组标题 + 组内选项，默认高亮落在首个可选子项', async () => {
    wrapper = mount(Select, {
      attachTo: document.body,
      global: { stubs: { transition: false } },
      props: { options: GROUP_OPTIONS, defaultOpen: true }
    })
    await flush()
    expect(panelTexts()).toEqual(['Manager', 'Jack', 'Lucy', 'Engineer', 'Yiminghe'])
    // 分组标题不可高亮：默认高亮为第一组的首个子项
    expect(hoverTexts()).toEqual(['Jack'])
    // 子选项带 option-grouped 类（左缩进一级），分组标题不带
    expect(document.querySelectorAll('.select-option.option-grouped')).toHaveLength(3)
    expect(document.querySelector('.select-option-group.option-grouped')).toBeNull()
  })

  it('键盘导航跳过分组标题，change 第 3 参为扁平候选下标', async () => {
    wrapper = mount(Select, {
      attachTo: document.body,
      global: { stubs: { transition: false } },
      props: { options: GROUP_OPTIONS, defaultOpen: true }
    })
    await flush()

    await pressKey('ArrowDown')
    expect(hoverTexts()).toEqual(['Lucy'])
    // 跨组时跳过「Engineer」标题，直接落到 Yiminghe
    await pressKey('ArrowDown')
    expect(hoverTexts()).toEqual(['Yiminghe'])
    await pressKey('Enter')
    expect(wrapper.emitted('update:value')?.at(-1)).toEqual(['yiminghe'])
    // 扁平候选下标：Jack(0) / Lucy(1) / Yiminghe(2)，标题不占位
    expect(wrapper.emitted('change')?.at(-1)?.[2]).toBe(2)
  })

  it('自定义分组字段名（fieldNames.options）', async () => {
    wrapper = mount(Select, {
      attachTo: document.body,
      global: { stubs: { transition: false } },
      props: {
        defaultOpen: true,
        options: [
          {
            name: 'Manager',
            items: [
              { id: 'jack', name: 'Jack' },
              { id: 'lucy', name: 'Lucy' }
            ]
          }
        ],
        fieldNames: { label: 'name', value: 'id', options: 'items' }
      }
    })
    await flush()
    expect(panelTexts()).toEqual(['Manager', 'Jack', 'Lucy'])
    expect(hoverTexts()).toEqual(['Jack'])
  })

  it('过滤命中组内选项时保留该组标题，未命中的组整体消失', async () => {
    wrapper = mount(Select, {
      attachTo: document.body,
      global: { stubs: { transition: false } },
      props: { options: GROUP_OPTIONS, defaultOpen: true, showSearch: true, optionFilterProp: 'label' }
    })
    await flush()
    await wrapper.find('.search-input').setValue('Lucy')
    await flush()
    expect(panelTexts()).toEqual(['Manager', 'Lucy'])

    await wrapper.find('.search-input').setValue('Yiminghe')
    await flush()
    expect(panelTexts()).toEqual(['Engineer', 'Yiminghe'])
  })
})
