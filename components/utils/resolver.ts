import { vendorStylesByComponent } from './vendor-styles'
// 所有组件样式的路径映射
const componentsMap = {
  Alert: 'alert',
  AutoComplete: 'auto-complete',
  Avatar: 'avatar',
  BackTop: 'back-top',
  Badge: 'badge',
  Breadcrumb: 'breadcrumb',
  Button: 'button',
  Calendar: 'calendar',
  Card: 'card',
  Carousel: 'carousel',
  Cascader: 'cascader',
  Checkbox: 'checkbox',
  Collapse: 'collapse',
  ColorPicker: 'color-picker',
  ConfigProvider: 'config-provider',
  Countdown: 'countdown',
  DatePicker: 'date-picker',
  Descriptions: 'descriptions/descriptions',
  DescriptionsItem: 'descriptions/descriptions-item',
  Dialog: 'dialog',
  Divider: 'divider',
  Drawer: 'drawer',
  Dropdown: 'dropdown/dropdown',
  DropdownButton: 'dropdown/dropdown-button',
  Ellipsis: 'ellipsis',
  Empty: 'empty',
  Flex: 'flex',
  FloatButton: 'float-button',
  GradientText: 'gradient-text',
  Row: 'grid/row',
  Col: 'grid/col',
  Highlight: 'highlight',
  Image: 'image',
  Input: 'input',
  InputNumber: 'input-number',
  InputSearch: 'input-search',
  List: 'list/list',
  ListItem: 'list/list-item',
  LoadingBar: 'loading-bar',
  Message: 'message',
  Modal: 'modal',
  Notification: 'notification',
  NumberAnimation: 'number-animation',
  Pagination: 'pagination',
  Popconfirm: 'popconfirm',
  Popover: 'popover',
  Progress: 'progress',
  QRCode: 'qr-code',
  Radio: 'radio',
  Rate: 'rate',
  Result: 'result',
  Scrollbar: 'scrollbar',
  Segmented: 'segmented',
  Select: 'select',
  Skeleton: 'skeleton',
  Slider: 'slider',
  Space: 'space',
  Spin: 'spin',
  Statistic: 'statistic',
  Steps: 'steps',
  Swiper: 'swiper',
  Switch: 'switch',
  Table: 'table',
  Tabs: 'tabs',
  Tag: 'tag',
  Textarea: 'textarea',
  TextScroll: 'text-scroll',
  Timeline: 'timeline',
  Tooltip: 'tooltip',
  Upload: 'upload',
  Video: 'video',
  Waterfall: 'waterfall',
  Watermark: 'watermark',
  // 命令式调用入口组件：与底层组件同目录，自身无独立样式文件
  MessageProvider: 'message',
  NotificationProvider: 'notification',
  ModalProvider: 'modal',
  DialogProvider: 'dialog'
}
/** 已收录的组件名，用于约束下方各映射表的键与值，避免写错组件名生成 undefined 路径 */
type ComponentName = keyof typeof componentsMap
/** 类型守卫：判断传入的组件名是否已被 componentsMap 收录 */
function isComponentName(name: string): name is ComponentName {
  return name in componentsMap
}
// 组件样式的来源表：键为「自身无样式文件的组件」，值为「承载其样式的组件」
// 两类来源：① 命令式 Provider 复用底层组件的样式；② 子组件样式定义在父组件 SFC 内（如 DescriptionsItem）
// 用 Partial 表达「可能查不到」，与运行时行为一致；值约束为 ComponentName，拼错即在编译期报错
const styleSources: Partial<Record<ComponentName, ComponentName>> = {
  MessageProvider: 'Message',
  NotificationProvider: 'Notification',
  ModalProvider: 'Modal',
  DialogProvider: 'Dialog',
  DescriptionsItem: 'Descriptions'
}
// 定义组件依赖关系（仅声明「除自身外的样式依赖」，自身样式由 styleSources / componentsMap 兜底）
const componentDependencies: Partial<Record<ComponentName, ComponentName[]>> = {
  AutoComplete: ['Scrollbar'],
  BackTop: ['Tooltip'],
  Calendar: ['Radio', 'Select', 'Empty', 'Scrollbar'],
  Card: ['Skeleton'],
  Carousel: ['Spin'],
  Cascader: ['Select', 'Empty', 'Scrollbar'],
  Collapse: ['Button'],
  ColorPicker: ['Button', 'Input', 'Tooltip'],
  Dialog: ['Button', 'Scrollbar'],
  DialogProvider: ['Button', 'Scrollbar'],
  Drawer: ['Scrollbar'],
  Dropdown: ['Tooltip'],
  DropdownButton: ['Button', 'Dropdown', 'Tooltip'],
  Ellipsis: ['Tooltip'],
  FloatButton: ['Badge', 'Tooltip'],
  Image: ['Space', 'Spin'],
  InputSearch: ['Button'],
  List: ['Empty', 'Pagination', 'Input', 'Select', 'Scrollbar', 'Spin'],
  ListItem: ['Avatar'],
  Modal: ['Button', 'Scrollbar'],
  ModalProvider: ['Button', 'Scrollbar'],
  Notification: ['Scrollbar'],
  NotificationProvider: ['Scrollbar'],
  Pagination: ['Input', 'Select', 'Empty', 'Scrollbar'],
  Popconfirm: ['Button', 'Tooltip'],
  Popover: ['Tooltip'],
  Rate: ['Tooltip'],
  Select: ['Empty', 'Scrollbar'],
  Table: ['Checkbox', 'Ellipsis', 'Empty', 'Pagination', 'Input', 'Select', 'Radio', 'Scrollbar', 'Spin', 'Tooltip'],
  Tag: ['Space'],
  TextScroll: ['Ellipsis', 'Tooltip'],
  Upload: ['Image', 'Space', 'Spin'],
  Waterfall: ['Spin']
}
function getSideEffects(componentName: ComponentName, options?: VueAmazingUIResolverOptions) {
  if (['ConfigProvider', 'Highlight', 'NumberAnimation', 'Watermark'].includes(componentName)) {
    // 无样式文件的组件
    return []
  }
  // 组件自身无样式文件时，改取其样式来源组件的样式（如 MessageProvider -> Message、DescriptionsItem -> Descriptions）
  const styleComponent = styleSources[componentName] ?? componentName
  const sideEffectsComponents: ComponentName[] = [styleComponent] // 组件依赖的所有样式
  const dependencies = componentDependencies[componentName]
  if (dependencies) {
    sideEffectsComponents.push(...dependencies)
  }
  const type = options?.cjs ? 'lib' : 'es'
  const sideEffects: string[] = [`vue-amazing-ui/${type}/style/global.css`] // 组件库全局默认样式
  sideEffectsComponents.forEach((component: ComponentName) => {
    sideEffects.push(`vue-amazing-ui/${type}/${componentsMap[component]}/${component}.css`)
  })
  // 第三方样式依赖：从共享清单按组件名查表，追加到 sideEffects（构建时已复制到产物 vendor 固定路径）
  const vendorTargets = vendorStylesByComponent[componentName]
  if (vendorTargets) {
    vendorTargets.forEach((target) => {
      sideEffects.push(`vue-amazing-ui/${type}/${target}`)
    })
  }
  return sideEffects
}
export interface VueAmazingUIResolverOptions {
  cjs?: boolean // whether use commonjs build, default false
}
export function VueAmazingUIResolver(options?: VueAmazingUIResolverOptions) {
  return {
    type: 'component' as const,
    resolve: (componentName: string) => {
      // where `componentName` is always CapitalCase
      if (isComponentName(componentName)) {
        return {
          name: componentName, // 组件名
          from: 'vue-amazing-ui', // 组件库名称
          sideEffects: getSideEffects(componentName, options) // 组件样式文件
        }
      }
    }
  }
}
