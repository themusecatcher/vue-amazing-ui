import { describe, expect, it } from 'vitest'
import { nextTick } from 'vue'
import { mount } from '@vue/test-utils'
import Table from 'components/table/Table.vue'

/**
 * 表格排序事件的上报契约
 *
 * `sortChange` 的 `column` 类型已收敛为 `TableColumn`（不再含 `null`）：
 * 点击排序时 `onSorter()` 先写入排序列再置 `clickSorter`，取消排序（第三次点击）只清排序状态、不清排序列，
 * 因此任何一次上报都必然带排序列。这里固化「每次上报都有 column」与「取消排序后数据恢复原序」。
 */
const columns = [
  {
    title: '姓名',
    dataIndex: 'name',
    sorter: (a: Record<string, any>, b: Record<string, any>) => String(a.name).localeCompare(String(b.name))
  },
  { title: '年龄', dataIndex: 'age' }
]

function makeData(): Record<string, any>[] {
  return [
    { key: '1', name: 'Bob', age: 32 },
    { key: '2', name: 'Alice', age: 28 }
  ]
}

function rowNames(wrapper: ReturnType<typeof mount>): string[] {
  return wrapper.findAll('tbody tr').map((node) => node.findAll('td')[0].text())
}

async function clickSorter(wrapper: ReturnType<typeof mount>): Promise<void> {
  await wrapper.find('th.table-cell-has-sorter').trigger('click')
  await nextTick()
}

describe('Table 排序事件', () => {
  it('升序点击后上报排序列与排序后的数据', async () => {
    const wrapper = mount(Table, { props: { columns, dataSource: makeData() } })

    await clickSorter(wrapper)

    const [[column, rows]] = wrapper.emitted('sortChange') as [[Record<string, any>, Record<string, any>[]]]
    expect(column.dataIndex).toBe('name')
    expect((rows as Record<string, any>[]).map((item) => item.name)).toEqual(['Alice', 'Bob'])
    expect(rowNames(wrapper)).toEqual(['Alice', 'Bob'])
  })

  it('取消排序（第三次点击）仍上报排序列，数据恢复原序', async () => {
    const wrapper = mount(Table, { props: { columns, dataSource: makeData() } })

    await clickSorter(wrapper)
    await clickSorter(wrapper)
    await clickSorter(wrapper)

    const events = wrapper.emitted('sortChange') as [Record<string, any>, Record<string, any>[]][]
    expect(events).toHaveLength(3)
    expect(events.every(([column]) => column != null)).toBe(true)
    expect(events[2][0].dataIndex).toBe('name')
    expect(rowNames(wrapper)).toEqual(['Bob', 'Alice'])
  })
})
