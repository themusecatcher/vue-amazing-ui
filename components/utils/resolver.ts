// 所有组件样式的路径映射
const componentsMap = {
  Alert: 'alert',
  Avatar: 'avatar',
  BackTop: 'backtop',
  Badge: 'badge',
  Breadcrumb: 'breadcrumb',
  Button: 'button',
  Calendar: 'calendar',
  Card: 'card',
  Carousel: 'carousel',
  Cascader: 'cascader',
  Checkbox: 'checkbox',
  Collapse: 'collapse',
  ColorPicker: 'colorpicker',
  ConfigProvider: 'configprovider',
  Countdown: 'countdown',
  DatePicker: 'datepicker',
  Descriptions: 'descriptions/descriptions',
  DescriptionsItem: 'descriptions/descriptionsitem',
  Dialog: 'dialog',
  Divider: 'divider',
  Drawer: 'drawer',
  Ellipsis: 'ellipsis',
  Empty: 'empty',
  Flex: 'flex',
  FloatButton: 'floatbutton',
  GradientText: 'gradienttext',
  Row: 'grid/row',
  Col: 'grid/col',
  Highlight: 'highlight',
  Image: 'image',
  Input: 'input',
  InputNumber: 'inputnumber',
  InputSearch: 'inputsearch',
  Layout: 'layout',
  LayoutHeader: 'layout/layoutheader',
  LayoutSider: 'layout/layoutsider',
  LayoutContent: 'layout/layoutcontent',
  LayoutFooter: 'layout/layoutfooter',
  List: 'list/list',
  ListItem: 'list/listitem',
  LoadingBar: 'loadingbar',
  Message: 'message',
  Modal: 'modal',
  Notification: 'notification',
  NumberAnimation: 'numberanimation',
  Pagination: 'pagination',
  Popconfirm: 'popconfirm',
  Popover: 'popover',
  Progress: 'progress',
  QRCode: 'qrcode',
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
  TextScroll: 'textscroll',
  Timeline: 'timeline',
  TimePicker: 'timepicker',
  Tooltip: 'tooltip',
  Upload: 'upload',
  Video: 'video',
  Waterfall: 'waterfall',
  Watermark: 'watermark'
}
// 定义组件依赖关系
const componentDependencies = {
  BackTop: ['Tooltip'],
  Calendar: ['Radio', 'Select', 'Empty', 'Scrollbar'],
  Card: ['Skeleton'],
  Carousel: ['Spin'],
  Cascader: ['Select', 'Empty', 'Scrollbar'],
  Collapse: ['Button'],
  ColorPicker: ['Button', 'Input', 'Tooltip'],
  Dialog: ['Button', 'Scrollbar'],
  Drawer: ['Scrollbar'],
  Ellipsis: ['Tooltip'],
  FloatButton: ['Badge', 'Tooltip'],
  Image: ['Space', 'Spin'],
  InputSearch: ['Button'],
  List: ['Empty', 'Pagination', 'Input', 'Select', 'Scrollbar', 'Spin'],
  ListItem: ['Avatar'],
  Modal: ['Button'],
  Pagination: ['Input', 'Select', 'Empty', 'Scrollbar'],
  Popconfirm: ['Button', 'Tooltip'],
  Popover: ['Tooltip'],
  Rate: ['Tooltip'],
  Select: ['Empty', 'Scrollbar'],
  Table: ['Checkbox', 'Ellipsis', 'Empty', 'Pagination', 'Input', 'Select', 'Radio', 'Scrollbar', 'Spin', 'Tooltip'],
  Tag: ['Space'],
  Upload: ['Image', 'Message', 'Space', 'Spin'],
  Waterfall: ['Spin']
}
function getSideEffects(componentName: string, options?: VueAmazingUIResolverOptions) {
  if (['ConfigProvider', 'Highlight', 'NumberAnimation', 'Watermark'].includes(componentName)) {
    // 无样式文件的组件
    return []
  }
  const sideEffectsComponents: string[] = [componentName] // 组件依赖的所有样式
  if (componentName in componentDependencies) {
    sideEffectsComponents.push(...componentDependencies[componentName as keyof typeof componentDependencies])
  }
  const type = options?.cjs ? 'lib' : 'es'
  const sideEffects: string[] = [`vue-amazing-ui/${type}/style/global.css`] // 组件库全局默认样式
  sideEffectsComponents.forEach((component: string) => {
    sideEffects.push(
      `vue-amazing-ui/${type}/${componentsMap[component as keyof typeof componentsMap]}/${component}.css`
    )
  })
  if (componentName === 'DatePicker') {
    // 特殊处理 DatePicker 组件样式依赖文件
    sideEffects.push(
      `vue-amazing-ui/${type}/node_modules/.pnpm/@vuepic_vue-datepicker@11.0.1_vue@3.5.13_typescript@5.8.2_/node_modules/@vuepic/vue-datepicker/dist/main.css`
    )
  }
  if (componentName === 'Swiper') {
    // 特殊处理 Swiper 组件样式依赖文件
    sideEffects.push(`vue-amazing-ui/${type}/node_modules/.pnpm/swiper@11.2.5/node_modules/swiper/swiper.css`)
    const swiperModulesStyle = [
      'effect-cards',
      'effect-creative',
      'effect-cube',
      'effect-fade',
      'effect-flip',
      'navigation',
      'pagination'
    ]
    swiperModulesStyle.forEach((moduleName) => {
      sideEffects.push(
        `vue-amazing-ui/${type}/node_modules/.pnpm/swiper@11.2.5/node_modules/swiper/modules/${moduleName}.css`
      )
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
      if (componentName in componentsMap) {
        return {
          name: componentName, // 组件名
          from: 'vue-amazing-ui', // 组件库名称
          sideEffects: getSideEffects(componentName, options) // 组件样式文件
        }
      }
    }
  }
}
