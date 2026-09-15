import { defineComponent, h, Fragment } from 'vue'
import type { PropType, VNode } from 'vue'

/**
 * `modalRender` 的宿主组件：把默认插槽内容包装成单个 VNode 交给 render 处理。
 * 未配置 render 时原样透传，不产生任何额外 DOM 节点。
 */
export default defineComponent({
  name: 'ModalRenderHost',
  props: {
    render: Function as PropType<((arg: { originVNode: VNode }) => VNode) | undefined>
  },
  setup(props, { slots }) {
    return (): VNode => {
      const originVNode = h(Fragment, null, slots.default?.())
      return props.render ? props.render({ originVNode }) : originVNode
    }
  }
})
