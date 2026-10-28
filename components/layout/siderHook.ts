import type { InjectionKey } from 'vue'

/**
 * 子级 Sider 登记钩子
 *
 * Layout 借此感知是否包含侧边栏：插槽内容可嵌套多层元素（如包一层 div 或 v-for），
 * 无法由插槽的 VNode 结构可靠推导，故改由 Sider 自身在挂载 / 卸载时登记与注销
 */
export interface SiderHook {
  addSider: (id: string) => void
  removeSider: (id: string) => void
}

/**
 * 子级 Sider 登记通道的注入键
 *
 * - 提供方：`Layout`
 * - 消费方：`LayoutSider`（挂载登记 / 卸载注销）
 * - 响应式：否（只承载两个登记方法，集合由 `Layout` 内部维护）
 * - 未命中：`undefined`，Sider 不登记（表现为 Layout 认为没有侧边栏）
 */
export const siderHookKey: InjectionKey<SiderHook> = Symbol('vaSiderHook')

let siderUid = 0
/** 生成 Sider 唯一标识：仅作登记表键使用、不写入 DOM，故 SSR 两端计数不一致也无副作用 */
export function getSiderId(): string {
  siderUid += 1
  return `layout-sider-${siderUid}`
}
