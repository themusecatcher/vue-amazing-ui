import { ref, nextTick } from 'vue'
import type { Ref } from 'vue'
/**
 * 组合式函数（定位测量层）
 *
 * 为所有弹出类组件（Select / AutoComplete / Tooltip 等）提供统一的测量骨架，只负责「量」，
 * 不负责「往哪弹」：
 * - 定位容器查询：从面板元素向上找到最近的非 static 祖先（getPositionedContainer），
 *   作为面板绝对定位的参照坐标系；
 * - 矩形测量：在 nextTick 后统一测量定位容器与触发器的视口矩形，消除各组件重复的测量样板。
 *
 * 职责边界：翻转算法、对齐几何、遮挡边界等「定位决策」因组件需求不同，刻意保留在各组件层
 * （如 Tooltip 支持四轴翻转、Select 仅垂直翻转），本函数不参与决策。
 *
 * @param {Ref<HTMLElement | null>} contentRef 触发器内容元素
 * @param {Ref<HTMLElement | null>} panelRef 弹出面板（同时作为 getPositionedContainer 的查询起点）
 * @returns {{ positionedContainerRect: Ref<DOMRect | undefined>, contentRect: Ref<DOMRect | undefined>, measure: () => Promise<void> }} 返回定位容器与内容元素的测量矩形及测量方法
 */
export function useFloatingPosition(
  contentRef: Ref<HTMLElement | null>,
  panelRef: Ref<HTMLElement | null>
): {
  positionedContainerRect: Ref<DOMRect | undefined>
  contentRect: Ref<DOMRect | undefined>
  measure: () => Promise<void>
} {
  const positionedContainer = ref<HTMLElement | null>(null) // 弹出框相对定位的容器元素
  const positionedContainerRect = ref<DOMRect>() // positionedContainer 元素的大小及其相对于视口的位置
  const contentRect = ref<DOMRect>() // 内容元素的大小及其相对于视口的位置

  // 获取弹出框相对定位的容器元素
  function getPositionedContainer(): void {
    let parentElement = panelRef.value?.parentElement
    while (parentElement) {
      if (parentElement === document.documentElement) {
        positionedContainer.value = document.documentElement
        return
      }
      const { position } = getComputedStyle(parentElement)
      if (position !== 'static') {
        positionedContainer.value = parentElement
        return
      }
      parentElement = parentElement.parentElement
    }
  }

  // 在 nextTick 后测量定位容器与内容元素的视口矩形
  async function measure(): Promise<void> {
    await nextTick()
    getPositionedContainer()
    positionedContainerRect.value = positionedContainer.value?.getBoundingClientRect() as DOMRect
    contentRect.value = contentRef.value?.getBoundingClientRect() as DOMRect
  }

  return { positionedContainerRect, contentRect, measure }
}
