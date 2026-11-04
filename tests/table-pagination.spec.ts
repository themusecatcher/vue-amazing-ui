import { describe, expect, it } from 'vitest'
import { nextTick } from 'vue'
import { mount } from '@vue/test-utils'
import Table from 'components/table/Table.vue'
import type { TableProps } from 'components/table'

/**
 * 表格分页的有效性与初值
 *
 * 锁住两条契约：
 * 1. `pagination.page` / `dataSource` / `total` 变化后页码可能越界，切片与分页渲染统一按有效页码，
 *    不允许出现「表体为空但页码显示正常」；
 * 2. `pagination.defaultPage` / `defaultPageSize` 作为非受控初值生效。
 */
const columns = [{ title: '姓名', dataIndex: 'name' }]

function makeData(total: number): Record<string, any>[] {
  return Array.from({ length: total }, (_, index) => ({ key: `${index + 1}`, name: `row-${index + 1}` }))
}

function mountTable(props: Partial<TableProps> = {}) {
  return mount(Table, { props: { columns, ...props } })
}

function rowTexts(wrapper: ReturnType<typeof mountTable>): string[] {
  return wrapper.findAll('tbody tr').map((node) => node.text())
}

async function clickPage(wrapper: ReturnType<typeof mountTable>, page: string): Promise<void> {
  const target = wrapper.findAll('.pagination-item').find((node) => node.text() === page)
  if (!target) {
    throw new Error(`未找到页码 ${page}`)
  }
  await target.trigger('click')
  await nextTick()
}

describe('Table 分页', () => {
  it('传入越界 page 时按有效页码渲染表体与分页', async () => {
    const wrapper = mountTable({ dataSource: makeData(12), pagination: { page: 3, pageSize: 10 } })
    await nextTick()

    expect(wrapper.find('.pagination-item-active').text()).toBe('2')
    expect(rowTexts(wrapper)).toEqual(['row-11', 'row-12'])
  })

  it('数据量缩小后不停留在越界页', async () => {
    const wrapper = mountTable({ dataSource: makeData(30) })
    await nextTick()

    await clickPage(wrapper, '3')
    expect(rowTexts(wrapper)).toHaveLength(10)

    await wrapper.setProps({ dataSource: makeData(12) })
    await nextTick()

    expect(wrapper.find('.pagination-item-active').text()).toBe('2')
    expect(rowTexts(wrapper)).toEqual(['row-11', 'row-12'])
  })

  it('数据量回升后页码仍可正常翻页', async () => {
    const wrapper = mountTable({ dataSource: makeData(30) })
    await nextTick()

    await clickPage(wrapper, '2')
    expect(wrapper.emitted('change')?.[0]).toEqual([2, 10])

    await wrapper.setProps({ dataSource: makeData(12) })
    await nextTick()
    await clickPage(wrapper, '1')

    expect(wrapper.find('.pagination-item-active').text()).toBe('1')
    expect(rowTexts(wrapper)).toHaveLength(10)
  })

  it('defaultPageSize 作为非受控初值生效', async () => {
    const wrapper = mountTable({ dataSource: makeData(30), pagination: { defaultPageSize: 20 } })
    await nextTick()

    expect(rowTexts(wrapper)).toHaveLength(20)
  })

  it('defaultPage 作为非受控初值生效', async () => {
    const wrapper = mountTable({ dataSource: makeData(30), pagination: { defaultPage: 3 } })
    await nextTick()

    expect(wrapper.find('.pagination-item-active').text()).toBe('3')
    expect(rowTexts(wrapper)[0]).toBe('row-21')
    expect(rowTexts(wrapper)).toHaveLength(10)
  })
})
