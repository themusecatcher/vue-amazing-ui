import { ref, nextTick } from 'vue'
import type { Ref } from 'vue'
/**
 * 组合式函数
 * 测量触发器、弹出面板与相对定位容器的矩形，收敛定位容器查询与测量骨架
 *
 * 高层定位 composable 的测量层：向上查找面板最近的非 static 定位容器（getPositionedContainer），
 * 并在 nextTick 后统一测量定位容器与触发器的视口矩形，消除各弹出组件逐字重复的测量样板。
 * 翻转算法、对齐几何与遮挡边界因组件差异保留在各组件层（见设计文档查漏补缺结论）。
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
