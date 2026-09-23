import type { App, Plugin, Component } from 'vue'

/**
 * 为组件挂载 `install` 方法，使其可被 `app.use()` 全局注册
 *
 * 全局注册名取自 SFC 编译产物上的 `__name`（即组件文件名），故仅适用于具名组件；
 * 返回值带 `Plugin` 类型，`export default withInstall(Xxx)` 即可直接作为插件导出。
 *
 * @param comp - 待包装的组件
 * @returns 原组件与 `install` 方法的交叉类型（可安装、可渲染）
 */
export const withInstall = <T extends Component>(comp: T) => {
  const c = comp as T & { __name?: string } & Partial<Plugin>
  c.install = function (app: App) {
    // __name 由 SFC 编译器按文件名注入；纯 TS 组件可能缺失，以空串兜底避免注册成 undefined 键
    app.component(c.__name ?? '', comp)
  }
  return comp as T & Plugin
}
