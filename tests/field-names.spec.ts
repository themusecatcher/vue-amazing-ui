import { describe, it, expect, afterEach } from 'vitest'
import { nextTick } from 'vue'
import { mount } from '@vue/test-utils'
import Select from 'components/select/Select.vue'
import Cascader from 'components/cascader/Cascader.vue'

/**
 * `fieldNames` 契约回归（Select / Cascader）
 *
 * 取值语义为**逐字段 `||` 兜底**——
 * 未传、显式传 `undefined`、传空串的字段，都回退默认字段名（label / value / children）。
 * 该语义的守护点在于「不能写成对象展开 `{ label: 'label', ...fieldNames }`」：
 * 展开会让显式 `undefined` 覆盖掉默认值，导致取不到 label、选中项名称退化为原始值。
 */
let wrapper: ReturnType<typeof mount> | null = null

afterEach(() => {
  wrapper?.unmount()
  wrapper = null
  document.querySelectorAll('.select-panel-wrapper').forEach((el) => el.remove())
})

async function flush(): Promise<void> {
  await nextTick()
  await nextTick()
}

function selectTexts(target: ReturnType<typeof mount>): string[] {
  return target.findAll('.select-item').map((el) => el.text().trim())
}

describe('Select fieldNames', () => {
  it('不传 fieldNames 时按默认 label / value 匹配并展示文本', async () => {
    wrapper = mount(Select, { props: { options: [{ label: '北京', value: 1 }], value: 1 } })
    await flush()
    expect(selectTexts(wrapper)).toEqual(['北京'])
  })

  it('传 fieldNames 时按自定义字段名匹配并展示文本', async () => {
    wrapper = mount(Select, {
      props: { options: [{ name: '北京', id: 1 }], fieldNames: { label: 'name', value: 'id' }, value: 1 }
    })
    await flush()
    expect(selectTexts(wrapper)).toEqual(['北京'])
  })

  it('fieldNames 只传 label 时，value 字段回退默认值', async () => {
    wrapper = mount(Select, {
      props: { options: [{ name: '北京', id: 1 }], fieldNames: { label: 'name' }, value: 1 }
    })
    await flush()
    // value 回退为 'value'，选项上取不到该字段 → 退化为直接展示原始选中值
    expect(selectTexts(wrapper)).toEqual(['1'])
  })

  it('fieldNames 显式传 undefined 的字段同样回退默认值', async () => {
    wrapper = mount(Select, {
      props: {
        options: [{ label: '北京', value: 1 }],
        fieldNames: { label: undefined, value: 'value' },
        value: 1
      }
    })
    await flush()
    expect(selectTexts(wrapper)).toEqual(['北京'])
  })

  it('fieldNames 传空串的字段同样回退默认值', async () => {
    wrapper = mount(Select, {
      props: {
        options: [{ label: '北京', value: 1 }],
        fieldNames: { label: '', value: 'value' },
        value: 1
      }
    })
    await flush()
    expect(selectTexts(wrapper)).toEqual(['北京'])
  })
})

describe('Cascader fieldNames', () => {
  it('传 fieldNames 时按自定义字段名渲染各级文本', async () => {
    wrapper = mount(Cascader, {
      props: {
        options: [{ name: '浙江', id: '2', items: [{ name: '杭州市', id: '21' }] }],
        fieldNames: { label: 'name', value: 'id', children: 'items' },
        value: ['2', '21']
      }
    })
    await flush()
    expect(selectTexts(wrapper)[0]).toBe('浙江')
    expect(selectTexts(wrapper)[1]).toBe('杭州市')
  })

  it('不传 fieldNames 时按默认 label / value / children 渲染各级文本', async () => {
    wrapper = mount(Cascader, {
      props: {
        options: [{ label: '浙江', value: '2', children: [{ label: '杭州市', value: '21' }] }],
        value: ['2', '21']
      }
    })
    await flush()
    expect(selectTexts(wrapper)[0]).toBe('浙江')
    expect(selectTexts(wrapper)[1]).toBe('杭州市')
  })
})
