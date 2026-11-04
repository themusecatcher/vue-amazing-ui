import { describe, expect, it } from 'vitest'
import { h, nextTick } from 'vue'
import { mount } from '@vue/test-utils'
import Table from 'components/table/Table.vue'
import type { TableProps } from 'components/table'

/**
 * 展开行的受控判据用例
 *
 * 契约（`useControlledModel`，受控判据 = 传值即受控）：
 * - 父不传 `expandedRowKeys`：组件自持，点击即展开（历史缺陷：`withDefaults` 给了 `() => []`，
 *   判据读到 `[]` 而非 `undefined` → 恒为受控 → 展开行永不显示，事件却照常派发）；
 * - 父传了值：只上报，显隐以父侧回写为准。
 */
function mountTable(props: Partial<TableProps> = {}) {
  return mount(Table, {
    props: {
      showExpandColumn: true,
      dataSource: [{ key: '1', name: '张三' }],
      columns: [{ title: '姓名', dataIndex: 'name' }],
      ...props
    },
    slots: {
      expandedRowRender: () => h('div', { class: 'expand-content' }, '展开内容')
    }
  })
}

/** 展开行所在的 `<tr>`：`v-show` 把 display 落在它身上，`td` 本身看不出显隐 */
function expandRowDisplay(wrapper: ReturnType<typeof mountTable>): string {
  const cell = wrapper.find('.table-td-expand-row')
  return (cell.element.parentElement as HTMLElement).style.display
}

describe('Table 展开行', () => {
  it('不传 expandedRowKeys：点击展开后本地生效并上报', async () => {
    const wrapper = mountTable()
    await nextTick()
    expect(expandRowDisplay(wrapper)).toBe('none')

    await wrapper.find('.table-td-expand button.expand-btn').trigger('click')
    await nextTick()

    expect(wrapper.emitted('update:expandedRowKeys')?.[0]).toEqual([['1']])
    expect(expandRowDisplay(wrapper)).not.toBe('none')
  })

  it('父传 expandedRowKeys 且不回写：只上报，显隐保持收起', async () => {
    const wrapper = mountTable({ expandedRowKeys: [] })
    await nextTick()

    await wrapper.find('.table-td-expand button.expand-btn').trigger('click')
    await nextTick()

    expect(wrapper.emitted('update:expandedRowKeys')?.[0]).toEqual([['1']])
    expect(expandRowDisplay(wrapper)).toBe('none')
  })
})
