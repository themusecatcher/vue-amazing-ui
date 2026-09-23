import { inject, onBeforeUnmount, onMounted, ref } from 'vue'
import type { Ref } from 'vue'
/**
 * 浮层层级（z-index）管理层
 *
 * 解决的问题：甲类（锚点跟随型浮层）与乙类（视口固定 / 全屏型浮层）此前各自硬编码
 * 层级，跨线嵌套必然出错 —— 例如 `Modal`（1000）里放 `Tooltip`（999）时浮层会被遮罩盖住。
 *
 * 机制：
 * - `ConfigProvider` 传入 `baseZIndex` 后建立本管理器并向下注入，甲、乙两条线共同消费；
 * - 每个层在「出现」时向管理器领取一个槽位（`allocate`），分配点恒在当前所有已占层之上，
 *   即**后出现者在上**，嵌套浮层天然自增；
 * - 层消失 / 组件卸载时归还槽位（`release`），最上层归还后下一次分配即回落，
 *   数值随「同时可见的层数」增长而非打开次数；
 * - 未传 `baseZIndex` 时管理器不存在，各组件回退到各自的默认硬编码值（可关闭开关）。
 */

/**
 * 层级步长
 *
 * 同一层内部还会再分层（如 Modal 的遮罩与弹窗相差 10、Image 的遮罩与预览相差 80），
 * 故槽位按 10 递增，并用 `span` 表达「本层需要连续占用几段」。
 */
/**
 * 各浮层族的默认层级（单一真源）
 *
 * 未传 `ConfigProvider.baseZIndex`（未注入层级管理器）时，各组件的 `useZIndex` 恒为本表取值；
 * 注入管理器后改由分配器按「后出现者在上」自增，本表不再参与。
 *
 * 与文档《浮层层级管理 · 各组件默认层级》表一一对应：
 * `tests/z-index-defaults.spec.ts` 会双向校验「组件调用点 ↔ 本表 ↔ 文档表格」，
 * 故改动此处必须同步文档，新增族也必须一并登记到该测试。
 */
export const FLOATING_LAYER_Z_INDEX = {
  /** 锚点跟随型气泡族：`Tooltip` 及其派生的 `Popover` / `Popconfirm` / `Ellipsis` / `ColorPicker` / `Rate` / `BackTop` / `FloatButton` 气泡 */
  tooltip: 1070,
  /** 全屏预览族：`Image`（与气泡族同值，需高于承载层） */
  image: 1070,
  /** 下拉面板族：`Select` / `AutoComplete` / `Cascader` */
  select: 1050,
  /** 承载层族：`Modal` / `Dialog` / `Drawer`（遮罩取该值，弹窗 / 卡片取 +10） */
  overlay: 1000,
  /** 全局反馈层：`Message`（刻意低于锚点跟随型浮层，使消息内浮层不被压住） */
  message: 1030,
  /** 全局反馈层：`Notification` */
  notification: 1040,
  /** 加载条：`LoadingBar`（恒定最上层） */
  loadingBar: 9999
} as const

const Z_INDEX_STEP = 10

/** 单层默认占用的段数 */
const DEFAULT_SPAN = 1

/**
 * 层级分配器
 *
 * 每次分配都落在**当前所有已占用层之上**，从而保证「后出现者在上」：
 * 同一组件重新打开时会先归还旧槽位再领取，因此总能位于其它已打开层之上。
 * 数值随「同时可见的层数」增长，而不是随打开次数无限增长（最上层归还后下一次分配即回落）。
 */
export interface ZIndexManager {
  /** 起始层级（来自 ConfigProvider 的 baseZIndex） */
  baseZIndex: number
  /**
   * 领取一个槽位
   *
   * @param {number} [span = 1] 需要连续占用的段数（如 Modal 的遮罩与弹窗共 2 段）
   * @returns {number} 本层的起始层级
   */
  allocate: (span?: number) => number
  /**
   * 归还槽位
   *
   * @param {number} slot 领取时返回的起始层级
   */
  release: (slot: number) => void
}

/**
 * 创建层级分配器
 *
 * @param {number} baseZIndex 起始层级
 * @returns {ZIndexManager} 分配器实例
 */
export function createZIndexManager(baseZIndex: number): ZIndexManager {
  // 以「段」为单位记录占用：段号 = (层级 - baseZIndex) / Z_INDEX_STEP
  const occupiedUnits = new Set<number>()
  const spanBySlot = new Map<number, number>()
  return {
    baseZIndex,
    allocate(span = DEFAULT_SPAN) {
      // 起始段 = 当前最大已占段 + 1（无占用时从 0 开始），故新层恒在所有已占层之上
      const startUnit = occupiedUnits.size === 0 ? 0 : Math.max(...occupiedUnits) + 1
      for (let i = 0; i < span; i += 1) {
        occupiedUnits.add(startUnit + i)
      }
      const slot = baseZIndex + startUnit * Z_INDEX_STEP
      spanBySlot.set(slot, span)
      return slot
    },
    release(slot) {
      const span = spanBySlot.get(slot)
      if (span === undefined) {
        return
      }
      const unit = Math.round((slot - baseZIndex) / Z_INDEX_STEP)
      for (let i = 0; i < span; i += 1) {
        occupiedUnits.delete(unit + i)
      }
      spanBySlot.delete(slot)
    }
  }
}

/** 层级管理器的注入键（与 ConfigProvider 的 provide 保持一致） */
export const Z_INDEX_INJECT_KEY = 'zIndex'

/**
 * 承载层可见态的注入键
 *
 * 承载型浮层（`Modal` / `Drawer` / `Dialog`）用它把「本层是否处于打开态」注入子树。
 *
 * 为什么需要：容器关闭**不卸载内容**（`Modal` / `Dialog` 默认 `destroyOnClose: false`、
 * `Drawer` 默认 `destroyOnClose: false`），容器内的 `Select` 下拉也不会随容器卸载 ——
 * 其关闭只依赖触发器（input）的 blur，而容器关闭只是把内容 `display: none`、**不派发 blur**，
 * 于是下拉会**停留在打开态**：容器已关闭、下拉仍悬浮在页面上，
 * 且仍占着层级槽位。容器再次打开时会按「后出现者在上」重新领取层级，从而越过这个仍占位的
 * 内部浮层 → 形成「子层在父层之下」的反序层级（下拉被遮罩 / 弹窗盖住），同时让分配点被无谓抬高。
 * 子树内的浮层据此在承载层关闭时收起自身（收起即归还槽位），恢复「数值随同时可见层数增长」。
 */
export const Z_INDEX_CONTAINER_OPEN_KEY = 'zIndexContainerOpen'

/** `useZIndex` 的选项 */
export interface UseZIndexOptions {
  /**
   * 挂载时是否自动领取槽位（默认 `true`）
   *
   * 置为 `false` 后，领取完全由消费者按「出现」驱动（如 `Popup`：`show` 为真才领取、
   * 离开动画结束才归还）。用于「隐藏态不该持有槽位」的浮层 —— 隐藏层继续占位会持续抬高
   * 后续分配点，违背「数值随同时可见层数增长」。
   */
  allocateOnMount?: boolean
}

/**
 * 组合式函数
 * 获取本层的层级值
 *
 * - ConfigProvider 未传 `baseZIndex`（未注入管理器）时：恒为 `fallback`，即该组件的**默认层级**
 *   （见 docs 的「浮层层级管理 · 各组件默认层级」表），此时层级为静态族偏移；
 * - 已注入管理器时：挂载即领取槽位，组件每次「出现」可再调用 `allocate()` —— 内部先归还旧槽位再领取，
 *   使同一组件重新打开时位于其它已打开层之上；
 * - 组件卸载时自动归还槽位，避免数值无限增长；
 * - 位于承载层（Modal / Drawer / Dialog）内部时，浮层还需在承载层关闭时收起自身（见
 *   `Z_INDEX_CONTAINER_OPEN_KEY`），否则会以「已占层」的身份被重新打开的承载层反超。
 *
 * @param {number} fallback 无管理器时的回退层级（= 该组件的默认层级）
 * @param {number} [span = 1] 本层需要连续占用的段数（内部还有相对分层的组件需传更大值）
 * @param {UseZIndexOptions} [options] 选项：`allocateOnMount` 为 `false` 时挂载不领取（由消费者按「出现」驱动）
 * @returns {{ zIndex: Ref<number>, allocate: () => void, release: () => void }} 层级 ref 与领取 / 归还方法
 */
export function useZIndex(
  fallback: number,
  span = DEFAULT_SPAN,
  { allocateOnMount = true }: UseZIndexOptions = {}
): { zIndex: Ref<number>; allocate: () => void; release: () => void } {
  const manager = inject(Z_INDEX_INJECT_KEY, null) as ZIndexManager | null
  const zIndex = ref(fallback)
  let slot: number | null = null
  // 归还当前槽位（幂等）
  function release(): void {
    if (manager && slot !== null) {
      manager.release(slot)
      slot = null
    }
  }
  // 领取槽位：先归还再领取，保证「重新出现 = 位于最上层」
  function allocate(): void {
    if (!manager) return
    release()
    slot = manager.allocate(span)
    zIndex.value = slot
  }
  if (allocateOnMount) {
    onMounted(allocate)
  }
  onBeforeUnmount(release)
  return { zIndex, allocate, release }
}
