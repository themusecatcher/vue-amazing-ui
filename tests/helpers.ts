import { nextTick } from 'vue'

/**
 * 等待浮层显隐落定（`<Transition>` + `v-show` 场景的公共等待）。
 *
 * 为什么不能只等固定毫秒：面板的 `display` 由**过渡收尾**写入（`v-show` 在 leave 结束后才落值）。
 * 测试环境不注入组件 CSS（vitest 默认 `css: false`），过渡时长为 0，Vue 改走
 * `requestAnimationFrame` 路径收尾 —— 浏览器实测约 2 帧 / 4.8ms；`tests/setup.ts` 又把全局 rAF
 * 覆写为 `setTimeout(1ms)`，故约 2ms。固定毫秒等待在满负载并行（CI）下会被拖慢，
 * 从而读到「尚未落定」的状态 ⇒ 偶发假红（产品无缺陷，纯断言时机问题）。
 *
 * 因此这里**先显式等两帧**，再叠原有固定等待作为下限：严格 ≥ 各文件旧有的等待，不放松任何断言。
 *
 * 注：`tests/floating-position.spec.ts` 中的固定等待是「等一拍让 rAF / 异步回调落定」，
 * 且含帧级合并计数断言（`reads === 1`），语义与显隐落定不同，刻意保留未替换。
 */
export async function flushTransition(): Promise<void> {
  await nextTick()
  await new Promise<void>((resolve) => {
    requestAnimationFrame(() => requestAnimationFrame(() => resolve()))
  })
  await new Promise<void>((resolve) => setTimeout(resolve, 10))
  await nextTick()
}
