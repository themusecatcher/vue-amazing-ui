import { isVNode, createTextVNode } from 'vue'
import type { VNode } from 'vue'

/**
 * 将内容配置统一渲染为 VNode
 *
 * 支持三种内容形态：纯文本、已构造的 VNode、返回 VNode 的渲染函数；
 * 其余情况（含 undefined）统一转为文本节点，保证渲染位置始终有节点可挂载。
 *
 * @param content - 内容配置，可为 undefined
 * @returns 可直接交给 `<component :is>` 渲染的 VNode
 */
export function renderContentToVNode(content: string | VNode | (() => VNode) | undefined): VNode {
  if (typeof content === 'function') {
    return content()
  }
  if (isVNode(content)) {
    return content
  }
  return createTextVNode(content ?? '')
}
