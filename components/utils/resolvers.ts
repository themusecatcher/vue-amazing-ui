// 组件库中的所有组件路径映射
const componentsMap = {
  Alert: 'alert',
  Avatar: 'avatar',
  BackTop: 'backtop',
  Badge: 'badge',
  Breadcrumb: 'breadcrumb',
  Button: 'button',
  Card: 'card',
  Carousel: 'carousel',
  Cascader: 'cascader',
  Checkbox: 'checkbox',
  Collapse: 'collapse',
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
export function VueAmazingUIResolver() {
  return {
    type: 'component' as const,
    resolve: (componentName: string) => {
      // where `componentName` is always CapitalCase
      if (componentName in componentsMap) {
        return {
          name: componentName, // 组件名
          from: 'vue-amazing-ui', // 组件库名称
          sideEffects: `vue-amazing-ui/es/${componentsMap[componentName as keyof typeof componentsMap]}/${componentName}.css` // 组件样式文件
        }
      }
    }
  }
}
type ChangeCaseType =
  | 'camelCase'
  | 'capitalCase'
  | 'constantCase'
  | 'dotCase'
  | 'headerCase'
  | 'noCase'
  | 'paramCase'
  | 'pascalCase'
  | 'pathCase'
  | 'sentenceCase'
  | 'snakeCase'
export function VueAmazingUIStyleResolve() {
  const changeCase: ChangeCaseType = 'pascalCase'
  return {
    libraryName: 'vue-amazing-ui', // 需要导入的库名
    libraryNameChangeCase: changeCase, // 'pascalCase': 帕斯卡命名法，每个单词的首字母大写，不使用分隔符；默认 'paramCase'，导出的名称转换格式
    // esModule: true, // 默认 false，如果样式文件不是 .css 后缀。需要开启此选项
    resolveStyle: (componentName: string) => {
      return `vue-amazing-ui/es/${componentsMap[componentName as keyof typeof componentsMap]}/${componentName}.css` // 组件样式文件
    }
  }
}
