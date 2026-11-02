import TabPane from './TabPane.vue'
import { withInstall } from '../../utils/type'
import type { Plugin } from 'vue'

export type { Props as TabPaneProps } from './TabPane.vue'

// 静态标记：供 Tabs 从 default 插槽的 vnode.type 上识别本组件（静态标记约定）
const TabPaneComponent = withInstall(TabPane) as typeof TabPane & Plugin & { isTabPane: boolean }
TabPaneComponent.isTabPane = true

export default TabPaneComponent
