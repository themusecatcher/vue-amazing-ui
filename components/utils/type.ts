import type { App, Plugin, Component } from 'vue'
export const withInstall = <T extends Component>(comp: T) => {
  const c = comp as any
  c.install = function (app: App) {
    app.component(c.__name, comp)
  }
  return comp as T & Plugin
}
