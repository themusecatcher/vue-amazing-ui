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

export const siderHookKey: InjectionKey<SiderHook> = Symbol('layoutSiderHook')

let siderUid = 0
/** 生成 Sider 唯一标识：仅作登记表键使用、不写入 DOM，故 SSR 两端计数不一致也无副作用 */
export function getSiderId(): string {
  siderUid += 1
  return `layout-sider-${siderUid}`
}
