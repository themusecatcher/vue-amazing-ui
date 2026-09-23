/**
 * 组件样式依赖的单一数据源（SSOT）
 *
 * 「组件 → 样式依赖」这份知识只在本文档维护，两侧消费：
 * 1. `components/utils/resolver.ts` —— 按需引入时回答「该组件的样式入口在哪」（只读 componentsMap /
 *    styleSources / stylelessComponents，不再读取 componentDependencies 与 vendor 表）；
 * 2. `build/generate-style-entries.ts` —— 构建期生成每组件样式入口 `es|lib/<dir>/style/index.{js,cjs}`，
 *    把 componentDependencies 与 vendorStylesByComponent 的依赖顺序固化进产物（读全部表）。
 *
 * 因此依赖表漏写 / 写 stale 只影响构建期生成（漏写依赖→构建报错，写 stale→`pnpm verify:deps` 抓出），
 * 不会再表现为「消费方运行时静默缺样式」。
 */

/** 组件名 → 组件样式所在目录（相对产物 es|lib 根目录） */
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
  Comment: 'comment',
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
  Popup: 'popup',
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
/**
 * 组件样式的来源表：键为「自身无样式文件的组件」，值为「承载其样式的组件」
 *
 * 两类来源：① 命令式 Provider 复用底层组件的样式；② 子组件样式定义在父组件 SFC 内（如 DescriptionsItem）。
 * 用 Partial 表达「可能查不到」，与运行时行为一致；值约束为 ComponentName，拼错即在编译期报错。
 */
const styleSources: Partial<Record<ComponentName, ComponentName>> = {
  MessageProvider: 'Message',
  NotificationProvider: 'Notification',
  ModalProvider: 'Modal',
  DialogProvider: 'Dialog',
  DescriptionsItem: 'Descriptions'
}
/**
 * 组件样式依赖关系（仅声明「除自身外」的样式依赖；自身样式由 styleSources / componentsMap 兜底）
 *
 * - Tooltip 的浮层宿主为 Popup，故 Tooltip 及其全部间接依赖组件都要追加 Popup；
 * - 依赖项必须是「有自己 CSS 的组件」，不能是 styleSources 的键（复用他人样式）或 stylelessComponents
 *   （无样式），否则生成器会拼出不存在的 CSS 路径（构建期有存在性断言兜底）。
 */
const componentDependencies: Partial<Record<ComponentName, ComponentName[]>> = {
  AutoComplete: ['Scrollbar'],
  BackTop: ['Tooltip', 'Popup'],
  Calendar: ['Radio', 'Select', 'Empty', 'Scrollbar'],
  Card: ['Skeleton'],
  Carousel: ['Spin'],
  Cascader: ['Select', 'Empty', 'Scrollbar'],
  Collapse: ['Button'],
  ColorPicker: ['Button', 'Input', 'Tooltip', 'Popup'],
  Dialog: ['Button', 'Scrollbar'],
  DialogProvider: ['Button', 'Scrollbar'],
  Drawer: ['Scrollbar'],
  Dropdown: ['Popup'],
  DropdownButton: ['Button', 'Dropdown', 'Popup'],
  Ellipsis: ['Tooltip', 'Popup'],
  FloatButton: ['Badge', 'Tooltip', 'Popup'],
  Image: ['Space', 'Spin'],
  InputSearch: ['Button'],
  List: ['Empty', 'Pagination', 'Input', 'Select', 'Scrollbar', 'Spin'],
  ListItem: ['Avatar'],
  Modal: ['Button', 'Scrollbar'],
  ModalProvider: ['Button', 'Scrollbar'],
  Notification: ['Scrollbar'],
  NotificationProvider: ['Scrollbar'],
  Pagination: ['Input', 'Select', 'Empty', 'Scrollbar'],
  Popconfirm: ['Button', 'Tooltip', 'Popup'],
  Popover: ['Tooltip', 'Popup'],
  Rate: ['Tooltip', 'Popup'],
  Select: ['Empty', 'Scrollbar'],
  Table: [
    'Checkbox',
    'Ellipsis',
    'Empty',
    'Pagination',
    'Input',
    'Select',
    'Radio',
    'Scrollbar',
    'Spin',
    'Tooltip',
    'Popup'
  ],
  Tag: ['Space'],
  TextScroll: ['Ellipsis', 'Tooltip', 'Popup'],
  Tooltip: ['Popup'],
  Upload: ['Image', 'Space', 'Spin'],
  Waterfall: ['Spin']
}
/**
 * 完全没有样式的组件（SFC 内不存在 <style> 块，且不复用其它组件的样式）
 *
 * 与 styleSources 的区别：styleSources 是「无样式但有来源」，本表是「无样式且无来源」，按需引入返回空。
 */
const stylelessComponents: ComponentName[] = ['ConfigProvider', 'Highlight', 'NumberAnimation', 'Watermark']

export { componentsMap, styleSources, componentDependencies, stylelessComponents, isComponentName }
export type { ComponentName }
