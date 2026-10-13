import { nextTick, onMounted, watch } from 'vue'

/**
 * 承接锚点字体族
 *
 * 浮层 Teleport 到 body 后即脱离宿主 DOM 的字体继承链，而库不在全局声明字体
 * （见 `components/style/global.less`），面板将既拿不到宿主字体、也拿不到库字体。
 * 这里把锚点的计算字体族复制到浮层容器上 —— 复制的是宿主自身的字体，不引入库级声明。
 *
 * - 写在**容器**而非面板：面板的字体声明归消费方，容器只作继承来源，消费方的声明可自然覆盖；
 * - 只承接字体族，不承接字号（字号属组件规格，见 `development/component-design.md` 字体口径）；
 * - 「出现」与「锚点就绪」各触发一次：锚点可能晚于展开就绪（模板 ref 回填 / onMounted 赋值）。
 *
 * @param anchor - 锚点元素 getter（触发器）
 * @param container - 浮层容器元素 getter（承接落点，即定位参照容器）
 * @param visible - 浮层是否处于展开态 getter
 */
export function useInheritAnchorFont(
  anchor: () => HTMLElement | null | undefined,
  container: () => HTMLElement | null | undefined,
  visible: () => boolean
): void {
  function inherit(): void {
    if (typeof window === 'undefined') return
    void nextTick(() => {
      const anchorEl = anchor()
      const containerEl = container()
      if (!anchorEl || !containerEl) return
      containerEl.style.fontFamily = getComputedStyle(anchorEl).fontFamily
    })
  }
  watch(visible, (show) => {
    if (show) inherit()
  })
  watch(anchor, () => {
    if (visible()) inherit()
  })
  // 挂载后补一次：覆盖「初始即为展开态」的情况（此时 visible 不变、watch 不会触发）。
  // 不用 watch 的 immediate：消费组件的展开态可能定义在调用点之后，立即求值会命中 TDZ。
  onMounted(() => {
    if (visible()) inherit()
  })
}
