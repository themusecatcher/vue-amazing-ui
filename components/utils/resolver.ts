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
// Provider 组件自身无样式文件，复用其底层组件的样式
// 用 Partial 表达「可能查不到」，与运行时行为一致；值约束为 ComponentName，拼错即在编译期报错
const providerStyles: Partial<Record<ComponentName, ComponentName>> = {
  MessageProvider: 'Message',
  NotificationProvider: 'Notification',
  ModalProvider: 'Modal',
  DialogProvider: 'Dialog'
}
// 定义组件依赖关系（仅声明「除自身外的样式依赖」，自身样式由 providerStyles / componentsMap 兜底）
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
  // Provider 自身无样式文件，以其底层组件（如 MessageProvider -> Message）的样式作为自身样式
  const styleComponent = providerStyles[componentName] ?? componentName
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
