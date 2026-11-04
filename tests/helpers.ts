import { nextTick } from 'vue'

/**
 * 挂载 helper 的入参约定：形参写 `Partial<XxxProps>`，不要写 `Record<string, unknown>`。
 *
 * 背景：`@vue/test-utils` 的 `props` 是泛型形参（`P extends ComponentProps<C>`），约束检查不做
 * 多余属性检查 —— 于是 `mount(Comp, { props: { 拼错的键: 1 } })` 连直接调用都**不会**报错。
 * 把 helper 的形参标注成 `Partial<XxxProps>` 后，调用点获得上下文类型，拼错的键立刻报 TS2561，
 * 这是目前唯一能补上这段检查的低成本手段（覆盖范围仅限经过 helper 的挂载）。
 *
 * 两类例外：① emits 以 `on*` 传入不属于 `Props`（用 `on*` 放行通道，见 `dropdown.spec.ts`）；
 * ② 同一份用例跨组件共享的 helper（如 `trigger-semantics.spec.ts`）保持 `Record<string, unknown>`。
 */

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
