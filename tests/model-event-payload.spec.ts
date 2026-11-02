import { describe, it, expect } from 'vitest'
import { mount, flushPromises } from '@vue/test-utils'
import { h, nextTick } from 'vue'
import Table from 'components/table/Table.vue'
import Upload from 'components/upload/Upload.vue'
import Pagination from 'components/pagination/Pagination.vue'
import Select from 'components/select/Select.vue'

/**
 * 受控模式下的事件载荷回归
 *
 * 双模字段的读路径统一走 `useControlledModel`：受控（父传了值）时读取结果就是父侧的值，
 * 因此「写模型 → 立刻回读模型」拿到的仍是**写入前**的父值（props 要等父组件重渲染才更新）。
 * 事件载荷必须由本次操作本地算出的结果承担，否则：
 * - Table：刚展开就上报 `expand(false)`；
 * - Upload：`change` / `success` 第二参漏掉本次上传的文件；
 * - Pagination：pageSize 变化后页码被钳制，`pageSizeChange` / `change` 仍报旧页码。
 */

describe('受控模式：事件载荷取本次操作结果', () => {
  it('Table：受控展开时 expand 为 true、expandedRowsChange 含新 key', async () => {
    const wrapper = mount(Table, {
      props: {
        showExpandColumn: true,
        dataSource: [{ key: '1', name: '张三' }],
        columns: [{ title: '姓名', dataIndex: 'name' }],
        expandedRowKeys: []
      },
      slots: { expandedRowRender: () => h('div', '展开内容') }
    })
    await nextTick()

    await wrapper.find('.table-td-expand button.expand-btn').trigger('click')
    await nextTick()

    expect(wrapper.emitted('expand')?.[0]?.[0]).toBe(true)
    expect(wrapper.emitted('expandedRowsChange')?.[0]).toEqual([['1']])
    expect(wrapper.emitted('update:expandedRowKeys')?.[0]).toEqual([['1']])
  })

  it('Upload：受控时 change / success 携带本次上传的文件', async () => {
    const wrapper = mount(Upload, {
      props: {
        fileList: [],
        uploadMode: 'custom',
        customRequest: () => Promise.resolve({ name: 'a.txt', url: 'http://a' })
      }
    })
    await flushPromises()

    const input = wrapper.find('input[type="file"]')
    Object.defineProperty(input.element, 'files', {
      value: [new File(['x'], 'a.txt', { type: 'text/plain' })],
      configurable: true
    })
    await input.trigger('change')
    await flushPromises()

    const uploaded = { name: 'a.txt', url: 'http://a' }
    expect(wrapper.emitted('update:fileList')?.[0]).toEqual([[uploaded]])
    expect(wrapper.emitted('change')?.[0]).toEqual([[uploaded]])
    expect(wrapper.emitted('success')?.[0]).toEqual([uploaded, [uploaded]])
  })

  it('Pagination：受控时 pageSize 变化后载荷报钳制后的页码', async () => {
    // total 100、page 10、pageSize 改 20 → 最多 5 页，页码需回落到 5
    const wrapper = mount(Pagination, {
      props: { total: 100, page: 10, pageSize: 10, showSizeChanger: true }
    })
    await nextTick()

    wrapper.findComponent(Select).vm.$emit('change', 20)
    await nextTick()

    expect(wrapper.emitted('update:page')?.[0]).toEqual([5])
    expect(wrapper.emitted('pageSizeChange')?.[0]).toEqual([5, 20])
    expect(wrapper.emitted('change')?.[0]).toEqual([5, 20])
  })
})
