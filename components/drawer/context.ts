import type { InjectionKey } from 'vue'

/**
 * 多层抽屉推动通道的值结构：子抽屉开合时通知父抽屉让位 / 复位
 *
 * 只承载两个命令式方法，位移状态留在父抽屉内部，故整条通道不参与渲染。
 */
export interface ParentDrawerOpts {
  /** 子抽屉打开：父抽屉让出位移 */
  setPush: () => void
  /** 子抽屉关闭：父抽屉复位 */
  setPull: () => void
}

/**
 * 父抽屉推动通道的注入键
 *
 * - 提供方：`Drawer`（每层抽屉向下提供自身的 `setPush` / `setPull`）
 * - 消费方：`Drawer`（子级读取最近一层父抽屉，开合动画期间调用）
 * - 响应式：否（只承载命令式方法，位移状态留在父抽屉内部）
 * - 未命中：`undefined`，按「没有父抽屉，不需要推动」处理
 *
 * 键定义在 `.vue` 之外：provide / inject 两侧共享同一 `InjectionKey`，
 * 改错键名或改错值结构都会在编译期报错，而不是静默退化为「无父抽屉」。
 */
export const parentDrawerOptsKey: InjectionKey<ParentDrawerOpts> = Symbol('vaParentDrawerOpts')
