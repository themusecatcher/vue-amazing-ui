import type { InjectionKey, Ref } from 'vue'

/**
 * 侧边栏收起态契约（跨组件）
 *
 * 「外层侧边栏收起 ⇒ 内嵌菜单同步收窄为图标形态」这条约定由 `LayoutSider`（提供方）与 `Menu`（消费方）
 * 两端共享。契约落在 utils 而非任一组件目录：chunk 图按**目录**判定样式依赖，跨目录引用会被误判为
 * 「Menu 依赖 Layout 的 CSS」，而此处只是一个注入键，与样式无关（同类先例见 `floating-mount`）。
 */
export const siderCollapsedKey: InjectionKey<Ref<boolean>> = Symbol('siderCollapsed')
