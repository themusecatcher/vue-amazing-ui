import { describe, expect, it } from 'vitest'
import { nextTick } from 'vue'
import { mount } from '@vue/test-utils'
import Pagination from 'components/pagination'
import Select from 'components/select'

/**
 * Pagination 页码窗口 / 钳制 / 交互回归
 *
 * 锁住三条历史缺陷：
 * 1. 受控页越界后没有任何页码处于 active 态（total 缩小、父侧未同步时）；
 * 2. 非受控页在 total 缩小后仍保留越界值，total 回升会跳回无效页码；
 * 3. 换每页条数后当前页未按新总页数钳制。
 *
 * 断言口径：只校验渲染出来的页码序列、active 页码与派发事件，不依赖内部实现。
 * ⚠️ 显隐统一读 `style.display`：happy-dom 的 `getComputedStyle` 不返回 display，
 * `isVisible()` 在无布局环境下恒为 true，不能作为断言依据。
 */

/** 渲染出的页码文本序列（含固定渲染的首尾页码） */
function pageTexts(wrapper: ReturnType<typeof mount>): string[] {
  return wrapper.findAll('.pagination-item').map((node) => node.text())
}

function activePage(wrapper: ReturnType<typeof mount>): string {
  return wrapper.find('.pagination-item-active').text()
}

function hidden(element: Element): boolean {
  return (element as HTMLElement).style.display === 'none'
}

describe('Pagination 页码窗口', () => {
  it('首页展示前若干页，右侧省略号可点', () => {
    const wrapper = mount(Pagination, { props: { total: 500, page: 1 } })

    expect(pageTexts(wrapper)).toEqual(['1', '2', '3', '4', '5', '50'])
    expect(hidden(wrapper.find('.pagination-jump-prev').element)).toBe(true)
    expect(hidden(wrapper.find('.pagination-jump-next').element)).toBe(false)
  })

  it('中间页两侧省略号同时出现', () => {
    const wrapper = mount(Pagination, { props: { total: 500, page: 25 } })

    expect(pageTexts(wrapper)).toEqual(['1', '23', '24', '25', '26', '27', '50'])
    expect(hidden(wrapper.find('.pagination-jump-prev').element)).toBe(false)
    expect(hidden(wrapper.find('.pagination-jump-next').element)).toBe(false)
  })

  it('末页右侧省略号隐藏（避免与末页码重复）', () => {
    const wrapper = mount(Pagination, { props: { total: 500, page: 50 } })

    expect(pageTexts(wrapper)).toEqual(['1', '46', '47', '48', '49', '50'])
    expect(hidden(wrapper.find('.pagination-jump-prev').element)).toBe(false)
    expect(hidden(wrapper.find('.pagination-jump-next').element)).toBe(true)
  })

  it('总页数不超过一屏时全部页码直出，无省略号', () => {
    const wrapper = mount(Pagination, { props: { total: 40 } })

    expect(pageTexts(wrapper)).toEqual(['1', '2', '3', '4'])
    expect(hidden(wrapper.find('.pagination-jump-prev').element)).toBe(true)
    expect(hidden(wrapper.find('.pagination-jump-next').element)).toBe(true)
  })
})

describe('Pagination 隐藏条件', () => {
  it('total 为 0 时整块隐藏', () => {
    const wrapper = mount(Pagination, { props: { total: 0 } })

    expect(hidden(wrapper.element)).toBe(true)
  })

  it('hideOnSinglePage 且不足一页时隐藏，超出一页时展示', async () => {
    const wrapper = mount(Pagination, { props: { total: 5, hideOnSinglePage: true } })
    expect(hidden(wrapper.element)).toBe(true)

    await wrapper.setProps({ total: 15 })
    expect(hidden(wrapper.element)).toBe(false)
  })
})

describe('Pagination 页码钳制', () => {
  it('受控页越界时按总页数渲染，不会出现「无 active 页码」', () => {
    const wrapper = mount(Pagination, { props: { total: 50, page: 99 } })

    expect(activePage(wrapper)).toBe('5')
    // 受控时只影响渲染，不擅自改写父值
    expect(wrapper.emitted('update:page')).toBeUndefined()
  })

  it('非受控页在 total 缩小后回写为钳制后的页码', async () => {
    const wrapper = mount(Pagination, { props: { total: 100, defaultPage: 9 } })
    expect(activePage(wrapper)).toBe('9')

    await wrapper.setProps({ total: 40 })
    expect(activePage(wrapper)).toBe('4')
    expect(wrapper.emitted('update:page')?.at(-1)).toEqual([4])
  })

  it('换每页条数时按新总页数钳制当前页，并派发两个事件', async () => {
    const wrapper = mount(Pagination, { props: { total: 100, defaultPage: 9 } })

    wrapper.findComponent(Select).vm.$emit('change', 20)
    await nextTick()

    expect(activePage(wrapper)).toBe('5')
    expect(wrapper.emitted('pageSizeChange')?.at(-1)).toEqual([5, 20])
    expect(wrapper.emitted('change')?.at(-1)).toEqual([5, 20])
  })

  it('受控时换每页条数同样收敛并上报新页码', async () => {
    const wrapper = mount(Pagination, { props: { total: 100, page: 10, pageSize: 10, showSizeChanger: true } })

    wrapper.findComponent(Select).vm.$emit('change', 20)
    await nextTick()

    expect(wrapper.emitted('update:page')?.at(-1)).toEqual([5])
    expect(wrapper.emitted('pageSizeChange')?.at(-1)).toEqual([5, 20])
    expect(wrapper.emitted('change')?.at(-1)).toEqual([5, 20])
  })

  it('总数为 0 时换每页条数不产生页码 0', async () => {
    const wrapper = mount(Pagination, { props: { total: 0, page: 1, pageSize: 10, showSizeChanger: true } })

    wrapper.findComponent(Select).vm.$emit('change', 20)
    await nextTick()

    expect(wrapper.emitted('pageSizeChange')?.at(-1)).toEqual([1, 20])
  })
})

describe('Pagination 交互', () => {
  it('点击页码切换并派发 change', async () => {
    const wrapper = mount(Pagination, { props: { total: 500, page: 1 } })

    await wrapper.findAll('.pagination-item')[1].trigger('click')

    expect(wrapper.emitted('change')?.at(-1)).toEqual([2, 10])
  })

  it('省略号按 pageAmount 翻页', async () => {
    const wrapper = mount(Pagination, { props: { total: 500, page: 25 } })

    await wrapper.find('.pagination-jump-next').trigger('click')

    expect(wrapper.emitted('change')?.at(-1)).toEqual([30, 10])
  })

  it('回车立即跳转，越界钳制到首尾页，非法输入不触发', async () => {
    const wrapper = mount(Pagination, {
      props: { total: 100, showQuickJumper: true },
      attachTo: document.body
    })
    const jumper = wrapper.find('.pagination-jump-page input')

    await jumper.setValue('999')
    await jumper.trigger('keydown.enter')
    expect(wrapper.emitted('change')?.at(-1)).toEqual([10, 10])

    await jumper.setValue('abc')
    await jumper.trigger('keydown.enter')
    expect(wrapper.emitted('change')?.at(-1)).toEqual([10, 10])

    wrapper.unmount()
  })

  it('跳转框拦截非数字按键，数字与功能键放行', async () => {
    const wrapper = mount(Pagination, {
      props: { total: 500, showQuickJumper: true },
      attachTo: document.body
    })
    const jumper = wrapper.find('.pagination-jump-page input').element

    const letter = new KeyboardEvent('keydown', { key: 'a', bubbles: true, cancelable: true })
    jumper.dispatchEvent(letter)
    expect(letter.defaultPrevented).toBe(true)

    const digit = new KeyboardEvent('keydown', { key: '7', bubbles: true, cancelable: true })
    jumper.dispatchEvent(digit)
    expect(digit.defaultPrevented).toBe(false)

    const backspace = new KeyboardEvent('keydown', { key: 'Backspace', bubbles: true, cancelable: true })
    jumper.dispatchEvent(backspace)
    expect(backspace.defaultPrevented).toBe(false)

    wrapper.unmount()
  })

  it('粘贴等绕开按键的输入按数字过滤', async () => {
    const wrapper = mount(Pagination, {
      props: { total: 500, showQuickJumper: true },
      attachTo: document.body
    })
    const jumper = wrapper.find('.pagination-jump-page input')

    await jumper.setValue('a1b2')
    await nextTick()
    expect((jumper.element as HTMLInputElement).value).toBe('12')

    // 纯非法字符：过滤结果与旧值相同（都是空），需走一次复位才清得掉
    await jumper.setValue('abc')
    await nextTick()
    await nextTick()
    expect((jumper.element as HTMLInputElement).value).toBe('')

    wrapper.unmount()
  })

  it('跳转框失焦到分页项时只清空输入，不额外派发 change', async () => {
    const wrapper = mount(Pagination, {
      props: { total: 500, showQuickJumper: true },
      attachTo: document.body
    })
    const jumper = wrapper.find('.pagination-jump-page input')
    await jumper.setValue('7')

    // 点击页码会让输入框失焦，且 relatedTarget 是该页码：跳转由点击负责
    const pager = wrapper.findAll('.pagination-item')[1].element
    jumper.element.dispatchEvent(new FocusEvent('blur', { relatedTarget: pager }))
    await nextTick()
    await nextTick()

    expect(wrapper.emitted('change')).toBeUndefined()
    expect((jumper.element as HTMLInputElement).value).toBe('')

    wrapper.unmount()
  })

  it('跳转框失焦到分页外时按输入值跳转', async () => {
    const wrapper = mount(Pagination, {
      props: { total: 500, showQuickJumper: true },
      attachTo: document.body
    })
    const jumper = wrapper.find('.pagination-jump-page input')
    await jumper.setValue('7')

    jumper.element.dispatchEvent(new FocusEvent('blur', { relatedTarget: null }))
    await nextTick()
    await nextTick()

    expect(wrapper.emitted('change')?.at(-1)).toEqual([7, 10])
    expect((jumper.element as HTMLInputElement).value).toBe('')

    wrapper.unmount()
  })

  it('goButton 渲染确认按钮，点击后才跳转', async () => {
    const wrapper = mount(Pagination, {
      props: { total: 500, showQuickJumper: { goButton: true } },
      attachTo: document.body
    })
    const button = wrapper.find('.pagination-jump-button')
    expect(button.exists()).toBe(true)
    expect(button.text()).toBe('确定')

    await wrapper.find('.pagination-jump-page input').setValue('7')
    await button.trigger('click')
    expect(wrapper.emitted('change')?.at(-1)).toEqual([7, 10])

    wrapper.unmount()
  })

  it('goButton 支持自定义文案', () => {
    const wrapper = mount(Pagination, { props: { total: 500, showQuickJumper: { goButton: '前往' } } })

    expect(wrapper.find('.pagination-jump-button').text()).toBe('前往')
  })

  it('有 goButton 时失焦不提交，保留输入内容', async () => {
    const wrapper = mount(Pagination, {
      props: { total: 500, showQuickJumper: { goButton: true } },
      attachTo: document.body
    })
    const jumper = wrapper.find('.pagination-jump-page input')
    await jumper.setValue('7')

    jumper.element.dispatchEvent(new FocusEvent('blur', { relatedTarget: null }))
    await nextTick()

    expect(wrapper.emitted('change')).toBeUndefined()
    expect((jumper.element as HTMLInputElement).value).toBe('7')

    wrapper.unmount()
  })

  it('布尔形态与空对象形态都不渲染确认按钮', () => {
    const booleanForm = mount(Pagination, { props: { total: 500, showQuickJumper: true } })
    const emptyObjectForm = mount(Pagination, { props: { total: 500, showQuickJumper: {} } })

    expect(booleanForm.find('.pagination-jump-button').exists()).toBe(false)
    expect(emptyObjectForm.find('.pagination-jump-button').exists()).toBe(false)

    booleanForm.unmount()
    emptyObjectForm.unmount()
  })

  it('禁用时不响应点击与键盘', async () => {
    const wrapper = mount(Pagination, { props: { total: 500, disabled: true } })

    await wrapper.findAll('.pagination-item')[1].trigger('click')

    expect(wrapper.emitted('change')).toBeUndefined()
    expect(activePage(wrapper)).toBe('1')
  })

  it('翻页控件在边界处不可聚焦', async () => {
    const wrapper = mount(Pagination, { props: { total: 500, page: 1 } })

    expect(wrapper.find('.pagination-prev').attributes('tabindex')).toBe('-1')
    expect(wrapper.find('.pagination-next').attributes('tabindex')).toBe('0')
  })
})

describe('Pagination 无障碍与样式开关', () => {
  it('当前页带 aria-current，其余不带', () => {
    const wrapper = mount(Pagination, { props: { total: 500, page: 25 } })

    expect(wrapper.findAll('[aria-current="page"]')).toHaveLength(1)
    expect(activePage(wrapper)).toBe('25')
  })

  it('bordered 默认带边框，传 false 切换无边框风格', async () => {
    const wrapper = mount(Pagination, { props: { total: 500 } })
    expect(wrapper.classes()).not.toContain('pagination-borderless')

    await wrapper.setProps({ bordered: false })
    expect(wrapper.classes()).toContain('pagination-borderless')
  })
})
