import { describe, it, expect, vi } from 'vitest'
import { h } from 'vue'
import { mount } from '@vue/test-utils'
import Tag from 'components/tag/Tag.vue'
import CheckableTag from 'components/tag/checkable-tag/CheckableTag.vue'

describe('Tag 基础呈现', () => {
  it('预设色走 class，不产生内联背景色', () => {
    const wrapper = mount(Tag, { props: { color: 'success' } })
    const el = wrapper.find('.tag-wrap')
    expect(el.classes()).toContain('tag-success')
    expect(el.classes()).not.toContain('tag-has-color')
    expect(el.attributes('style')).toBeUndefined()
  })

  it('自定义色值输出内联背景色与 tag-has-color', () => {
    const wrapper = mount(Tag, { props: { color: '#123456' } })
    const el = wrapper.find('.tag-wrap')
    expect(el.attributes('style')).toContain('background-color: #123456')
    expect(el.classes()).toContain('tag-has-color')
  })

  it('预设色的 -inverse 变体按预设色处理，不再落到自定义色分支', () => {
    const wrapper = mount(Tag, { props: { color: 'pink-inverse' } })
    const el = wrapper.find('.tag-wrap')
    expect(el.classes()).toContain('tag-pink-inverse')
    expect(el.classes()).not.toContain('tag-has-color')
    expect(el.attributes('style')).toBeUndefined()
  })

  it('状态色不支持 -inverse 变体，按自定义色值处理', () => {
    const wrapper = mount(Tag, { props: { color: 'success-inverse' } })
    expect(wrapper.find('.tag-wrap').classes()).toContain('tag-has-color')
  })
})

describe('Tag 图标与关闭', () => {
  it('icon 支持 VNode', () => {
    const wrapper = mount(Tag, { props: { icon: h('b', { class: 'custom-icon' }) } })
    expect(wrapper.find('.tag-icon .custom-icon').exists()).toBe(true)
  })

  it('icon 支持字符串', () => {
    const wrapper = mount(Tag, { props: { icon: '😉' } })
    expect(wrapper.find('.tag-icon').text()).toBe('😉')
  })

  it('icon 插槽可读取作用域参数渲染图标', () => {
    const wrapper = mount(Tag, {
      props: { icon: '★' },
      slots: { icon: ({ icon }: { icon?: unknown }) => [h('b', { class: 'scoped-icon' }, String(icon))] }
    })
    expect(wrapper.find('.tag-icon .scoped-icon').text()).toBe('★')
  })

  it('closeIcon 支持 prop 与插槽', () => {
    const byProp = mount(Tag, { props: { closable: true, closeIcon: h('i', { class: 'icon-by-prop' }) } })
    expect(byProp.find('.tag-close .icon-by-prop').exists()).toBe(true)
    const bySlot = mount(Tag, {
      props: { closable: true },
      slots: { closeIcon: () => h('i', { class: 'icon-by-slot' }) }
    })
    expect(bySlot.find('.tag-close .icon-by-slot').exists()).toBe(true)
  })

  it('closeIcon 支持字符串', () => {
    const wrapper = mount(Tag, { props: { closable: true, closeIcon: '×' } })
    expect(wrapper.find('.tag-close').text()).toBe('×')
  })

  it('关闭图标点击后派发 close 并隐藏，且不冒泡到 click', async () => {
    const wrapper = mount(Tag, { props: { closable: true } })
    await wrapper.find('.tag-close').trigger('click')
    expect(wrapper.emitted('close')).toHaveLength(1)
    expect(wrapper.emitted('click')).toBeUndefined()
    expect(wrapper.classes()).toContain('tag-hidden')
  })

  it('父侧在 close 上 preventDefault 时保留标签', async () => {
    const preventDefault = (e: Event) => e.preventDefault()
    const wrapper = mount(Tag, { props: { closable: true }, attrs: { onClose: preventDefault } })
    await wrapper.find('.tag-close').trigger('click')
    expect(wrapper.emitted('close')).toHaveLength(1)
    expect(wrapper.classes()).not.toContain('tag-hidden')
  })

  it('点击标签派发 click 事件', async () => {
    const wrapper = mount(Tag)
    await wrapper.trigger('click')
    expect(wrapper.emitted('click')).toHaveLength(1)
  })
})

/** 输入文本并确认：分开触发 input / change，避免 test-utils 的 setValue 同时触发两者 */
async function typeAndConfirm(wrapper: ReturnType<typeof mount>, text: string) {
  const input = wrapper.find('input')
  ;(input.element as HTMLInputElement).value = text
  await input.trigger('input')
  await wrapper.find('input').trigger('change')
}

describe('Tag 动态模式', () => {
  it('无图标时不渲染图标占位', () => {
    const wrapper = mount(Tag, { props: { dynamic: true, value: ['a', 'b'] } })
    expect(wrapper.findAll('.tag-icon')).toHaveLength(0)
  })

  it('组件级 bordered 传给动态标签项', () => {
    const wrapper = mount(Tag, { props: { dynamic: true, bordered: false, value: ['a'] } })
    expect(wrapper.find('.tag-wrap').classes()).toContain('tag-borderless')
  })

  it('项级 bordered 优先于组件级', () => {
    const wrapper = mount(Tag, {
      props: { dynamic: true, bordered: false, value: [{ label: 'a', bordered: true }] }
    })
    expect(wrapper.find('.tag-wrap').classes()).not.toContain('tag-borderless')
  })

  it('项级图标与颜色生效', () => {
    const wrapper = mount(Tag, {
      props: { dynamic: true, value: [{ label: 'a', icon: h('b', { class: 'item-icon' }), color: 'error' }] }
    })
    expect(wrapper.find('.tag-wrap').classes()).toContain('tag-error')
    expect(wrapper.find('.tag-icon .item-icon').exists()).toBe(true)
  })

  it('icon 插槽按 index 命中时渲染该项图标', () => {
    const wrapper = mount(Tag, {
      props: { dynamic: true, value: ['a', 'b'] },
      slots: {
        icon: ({ index }: { index?: number }) => (index === 0 ? [h('b', { class: 'slot-icon' })] : [])
      }
    })
    const icons = wrapper.findAll('.tag-icon')
    expect(icons).toHaveLength(2)
    expect(icons[0].find('.slot-icon').exists()).toBe(true)
    expect(icons[1].text()).toBe('')
  })

  it('icon 插槽拿到项级图标，缺省回落到组件级', () => {
    const wrapper = mount(Tag, {
      props: { dynamic: true, icon: '全局', value: [{ label: 'a', icon: '项级' }, { label: 'b' }] },
      slots: { icon: ({ icon }: { icon?: unknown }) => [h('b', { class: 'slot-icon' }, String(icon))] }
    })
    const icons = wrapper.findAll('.slot-icon')
    expect(icons[0].text()).toBe('项级')
    expect(icons[1].text()).toBe('全局')
  })

  it('新增标签会 trim 并跳过空值与重复项', async () => {
    const wrapper = mount(Tag, { props: { dynamic: true, value: ['a'] } })

    await wrapper.find('.tag-plus').trigger('click')
    await typeAndConfirm(wrapper, '   ')
    expect(wrapper.emitted('update:value')).toBeUndefined()

    await wrapper.find('.tag-plus').trigger('click')
    await typeAndConfirm(wrapper, ' a ')
    expect(wrapper.emitted('update:value')).toBeUndefined()

    await wrapper.find('.tag-plus').trigger('click')
    await typeAndConfirm(wrapper, ' 新标签 ')
    expect(wrapper.emitted('update:value')?.[0]).toEqual([['a', '新标签']])
  })

  it('对象数组新增的是可关闭的对象项', async () => {
    const wrapper = mount(Tag, { props: { dynamic: true, value: [{ label: 'a' }] } })
    await wrapper.find('.tag-plus').trigger('click')
    await typeAndConfirm(wrapper, 'b')
    expect(wrapper.emitted('update:value')?.[0]).toEqual([[{ label: 'a' }, { label: 'b', closable: true }]])
  })

  it('禁用时点击加号不进入新增输入', async () => {
    const wrapper = mount(Tag, { props: { dynamic: true, disabled: true, value: ['a'] } })
    await wrapper.find('.tag-plus').trigger('click')
    expect(wrapper.find('input').exists()).toBe(false)
    expect(wrapper.find('.tag-plus').classes()).toContain('tag-disabled')
  })

  it('删除项派发 update:value / dynamicClose / close', async () => {
    const wrapper = mount(Tag, { props: { dynamic: true, value: ['a', 'b', 'c'] } })
    await wrapper.findAll('.tag-close')[1].trigger('click')
    expect(wrapper.emitted('update:value')?.[0]).toEqual([['a', 'c']])
    expect(wrapper.emitted('dynamicClose')).toHaveLength(1)
    expect(wrapper.emitted('close')).toHaveLength(1)
  })

  it('删除项时父侧 preventDefault 不改动数组', async () => {
    const preventDefault = (e: Event) => e.preventDefault()
    const wrapper = mount(Tag, { props: { dynamic: true, value: ['a', 'b'] }, attrs: { onClose: preventDefault } })
    await wrapper.findAll('.tag-close')[0].trigger('click')
    expect(wrapper.emitted('update:value')).toBeUndefined()
    expect(wrapper.emitted('dynamicClose')).toBeUndefined()
  })

  it('动态标签组复用同一 closeIcon 属性', () => {
    const wrapper = mount(Tag, {
      props: { dynamic: true, value: ['a', 'b'], closeIcon: h('i', { class: 'shared-close' }) }
    })
    expect(wrapper.findAll('.tag-close .shared-close')).toHaveLength(2)
  })

  it('Escape 关闭输入框', async () => {
    const wrapper = mount(Tag, { props: { dynamic: true, value: ['a'] } })
    await wrapper.find('.tag-plus').trigger('click')
    expect(wrapper.find('input').exists()).toBe(true)
    await wrapper.find('input').trigger('keydown', { key: 'Escape' })
    expect(wrapper.find('input').exists()).toBe(false)
  })
})

describe('CheckableTag', () => {
  it('非受控：点击切换选中态并派发 change', async () => {
    const wrapper = mount(CheckableTag, { slots: { default: () => 'Movies' } })
    expect(wrapper.classes()).not.toContain('checkable-tag-checked')
    await wrapper.trigger('click')
    expect(wrapper.emitted('update:checked')?.[0]).toEqual([true])
    expect(wrapper.emitted('change')?.[0]).toEqual([true])
    expect(wrapper.emitted('click')).toHaveLength(1)
    expect(wrapper.classes()).toContain('checkable-tag-checked')
  })

  it('受控：以父值为准，点击只上报不本地翻转', async () => {
    const wrapper = mount(CheckableTag, { props: { checked: false }, slots: { default: () => 'Movies' } })
    await wrapper.trigger('click')
    expect(wrapper.emitted('update:checked')?.[0]).toEqual([true])
    expect(wrapper.classes()).not.toContain('checkable-tag-checked')
  })

  it('选中态挂载时带选中 class', () => {
    const wrapper = mount(CheckableTag, { props: { checked: true }, slots: { default: () => 'Movies' } })
    expect(wrapper.classes()).toContain('checkable-tag-checked')
  })

  it('切换按钮语义：role + aria-pressed 随选中态变化', async () => {
    const wrapper = mount(CheckableTag, { slots: { default: () => 'Movies' } })
    expect(wrapper.attributes('role')).toBe('button')
    expect(wrapper.attributes('aria-pressed')).toBe('false')
    expect(wrapper.attributes('tabindex')).toBe('0')
    await wrapper.trigger('click')
    expect(wrapper.attributes('aria-pressed')).toBe('true')
  })

  it('禁用时移出 tab 序列并暴露 aria-disabled', () => {
    const wrapper = mount(CheckableTag, { props: { disabled: true }, slots: { default: () => 'Movies' } })
    expect(wrapper.attributes('tabindex')).toBe('-1')
    expect(wrapper.attributes('aria-disabled')).toBe('true')
  })

  it('Enter / Space 可切换选中态', async () => {
    const wrapper = mount(CheckableTag, { slots: { default: () => 'Movies' } })
    await wrapper.trigger('keydown', { key: 'Enter' })
    expect(wrapper.emitted('change')?.[0]).toEqual([true])
    await wrapper.trigger('keydown', { key: ' ' })
    expect(wrapper.emitted('change')?.[1]).toEqual([false])
  })
})

describe('Tag 配色对象 / 禁用 / 圆角', () => {
  it('对象配色分别下发背景、边框与文字色', () => {
    const wrapper = mount(Tag, {
      props: { color: { color: '#f0f0f0', textColor: '#333', borderColor: '#d9d9d9' } }
    })
    const el = wrapper.find('.tag-wrap')
    const style = el.attributes('style') ?? ''
    expect(style).toContain('background-color: #f0f0f0')
    expect(style).toContain('border-color: #d9d9d9')
    expect(style).toContain('--tag-custom-text: #333')
    expect(el.classes()).toContain('tag-has-color')
    expect(el.classes()).not.toContain('tag-success')
  })

  it('对象里只给文字色也视为自定义配色', () => {
    const wrapper = mount(Tag, { props: { color: { textColor: '#1677ff' } } })
    expect(wrapper.find('.tag-wrap').classes()).toContain('tag-has-color')
  })

  it('禁用时点击不派发 click，关闭也不隐藏', async () => {
    const wrapper = mount(Tag, { props: { disabled: true, closable: true } })
    await wrapper.trigger('click')
    expect(wrapper.emitted('click')).toBeUndefined()
    await wrapper.find('.tag-close').trigger('click')
    expect(wrapper.emitted('close')).toBeUndefined()
    expect(wrapper.classes()).not.toContain('tag-hidden')
    expect(wrapper.classes()).toContain('tag-disabled')
  })

  it('动态项可单独禁用，并覆盖组件级 disabled', async () => {
    const wrapper = mount(Tag, {
      props: { dynamic: true, disabled: true, value: [{ label: 'a', disabled: false }] }
    })
    expect(wrapper.find('.tag-wrap').classes()).not.toContain('tag-disabled')
    await wrapper.find('.tag-wrap').trigger('click')
    expect(wrapper.emitted('click')).toHaveLength(1)
  })

  it('禁用时关闭按钮不可聚焦', () => {
    const wrapper = mount(Tag, { props: { disabled: true, closable: true } })
    expect(wrapper.find('.tag-close').attributes('tabindex')).toBe('-1')
  })

  it('round 输出胶囊圆角类', () => {
    const wrapper = mount(Tag, { props: { round: true } })
    expect(wrapper.find('.tag-wrap').classes()).toContain('tag-round')
  })
})

describe('Tag 关闭按钮的无障碍与冒泡', () => {
  it('Enter 键可关闭标签', async () => {
    const wrapper = mount(Tag, { props: { closable: true } })
    await wrapper.find('.tag-close').trigger('keydown', { key: 'Enter' })
    expect(wrapper.emitted('close')).toHaveLength(1)
    expect(wrapper.classes()).toContain('tag-hidden')
  })

  it('关闭按钮具备 button 语义、可访问名称且可聚焦', () => {
    const wrapper = mount(Tag, { props: { closable: true } })
    const close = wrapper.find('.tag-close')
    expect(close.attributes('role')).toBe('button')
    expect(close.attributes('aria-label')).toBe('关闭标签')
    expect(close.attributes('tabindex')).toBe('0')
  })

  it('动态项的关闭按钮把标签文本写进可访问名称，便于区分目标', () => {
    const wrapper = mount(Tag, { props: { dynamic: true, value: ['天空', '大海'] } })
    expect(wrapper.findAll('.tag-close').map((close) => close.attributes('aria-label'))).toEqual([
      '关闭 天空',
      '关闭 大海'
    ])
  })

  it('动态项没有文本时回落到通用可访问名称', () => {
    const wrapper = mount(Tag, { props: { dynamic: true, value: [{ icon: '🙅' }] } })
    expect(wrapper.find('.tag-close').attributes('aria-label')).toBe('关闭标签')
  })

  it('triggerClickOnClose 为 true 时点击关闭同时触发 click', async () => {
    const wrapper = mount(Tag, { props: { closable: true, triggerClickOnClose: true } })
    await wrapper.find('.tag-close').trigger('click')
    expect(wrapper.emitted('close')).toHaveLength(1)
    expect(wrapper.emitted('click')).toHaveLength(1)
  })

  it('新增标签按钮具备 button 语义、可访问名称与键盘入口', async () => {
    const wrapper = mount(Tag, { props: { dynamic: true, value: ['a'] } })
    const plus = wrapper.find('.tag-plus')
    expect(plus.attributes('role')).toBe('button')
    expect(plus.attributes('aria-label')).toBe('新增标签')
    expect(plus.attributes('tabindex')).toBe('0')
    await plus.trigger('keydown', { key: 'Enter' })
    expect(wrapper.find('input').exists()).toBe(true)
    expect(wrapper.find('input').attributes('aria-label')).toBe('新增标签内容')
  })

  it('禁用时新增标签按钮不可聚焦', () => {
    const wrapper = mount(Tag, { props: { dynamic: true, disabled: true, value: ['a'] } })
    const plus = wrapper.find('.tag-plus')
    expect(plus.attributes('tabindex')).toBe('-1')
    expect(plus.attributes('aria-disabled')).toBe('true')
  })
})

describe('Tag 无控制台告警', () => {
  it('常规渲染不产生 Vue warning', () => {
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => {})
    mount(Tag, { props: { dynamic: true, value: ['a', 'b'] } })
    mount(Tag, { props: { dynamic: true, value: [{ label: 'b', color: 'red' }] } })
    mount(Tag, { props: { closable: true, icon: h('b'), color: '#f50' } })
    expect(warn).not.toHaveBeenCalled()
    warn.mockRestore()
  })
})
