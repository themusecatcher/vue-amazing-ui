import { createTextVNode, isVNode } from 'vue'
import type { VNode } from 'vue'

/**
 * 渲染选项名
 *
 * 字符串与数字按文本节点渲染，VNode 原样渲染，供自定义选项名的富内容场景使用。
 */
export function renderOptionLabel(label: string | number | VNode): VNode {
  return isVNode(label) ? label : createTextVNode(String(label))
}
