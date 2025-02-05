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
function getSideEffects(componentName: string, options?: VueAmazingUIResolverOptions) {
  const type = options?.cjs ? 'lib' : 'es'
  const sideEffects = [
    `vue-amazing-ui/${type}/${componentsMap[componentName as keyof typeof componentsMap]}/${componentName}.css`
  ]
  // 依赖子组件的样式
  const AvatarStyle = ['ListItem']
  if (AvatarStyle.includes(componentName)) {
    sideEffects.push(`vue-amazing-ui/${type}/avatar/Avatar.css`)
  }
  const BadgeStyle = ['FloatButton']
  if (BadgeStyle.includes(componentName)) {
    sideEffects.push(`vue-amazing-ui/${type}/badge/Badge.css`)
  }
  const ButtonStyle = ['Collapse', 'ColorPicker', 'Dialog', 'InputSearch', 'Modal', 'Popconfirm']
  if (ButtonStyle.includes(componentName)) {
    sideEffects.push(`vue-amazing-ui/${type}/button/Button.css`)
  }
  const CheckboxStyle = ['Table']
  if (CheckboxStyle.includes(componentName)) {
    sideEffects.push(`vue-amazing-ui/${type}/checkbox/Checkbox.css`)
  }
  const EllipsisStyle = ['Table']
  if (EllipsisStyle.includes(componentName)) {
    sideEffects.push(`vue-amazing-ui/${type}/ellipsis/Ellipsis.css`)
  }
  const EmptyStyle = ['List', 'Select', 'Table']
  if (EmptyStyle.includes(componentName)) {
    sideEffects.push(`vue-amazing-ui/${type}/empty/Empty.css`)
  }
  const ImageStyle = ['Upload']
  if (ImageStyle.includes(componentName)) {
    sideEffects.push(`vue-amazing-ui/${type}/image/Image.css`)
  }
  const InputStyle = ['ColorPicker', 'Pagination']
  if (InputStyle.includes(componentName)) {
    sideEffects.push(`vue-amazing-ui/${type}/input/Input.css`)
  }
  const MessageStyle = ['Upload']
  if (MessageStyle.includes(componentName)) {
    sideEffects.push(`vue-amazing-ui/${type}/message/Message.css`)
  }
  const PaginationStyle = ['List', 'Table']
  if (PaginationStyle.includes(componentName)) {
    sideEffects.push(`vue-amazing-ui/${type}/pagination/Pagination.css`)
  }
  const RadioStyle = ['Table']
  if (RadioStyle.includes(componentName)) {
    sideEffects.push(`vue-amazing-ui/${type}/radio/Radio.css`)
  }
  const ScrollbarStyle = ['Dialog', 'Drawer', 'Select', 'Table']
  if (ScrollbarStyle.includes(componentName)) {
    sideEffects.push(`vue-amazing-ui/${type}/scrollbar/Scrollbar.css`)
  }
  const SelectStyle = ['Cascader', 'Pagination']
  if (SelectStyle.includes(componentName)) {
    sideEffects.push(`vue-amazing-ui/${type}/select/Select.css`)
  }
  const SkeletonStyle = ['Card']
  if (SkeletonStyle.includes(componentName)) {
    sideEffects.push(`vue-amazing-ui/${type}/skeleton/Skeleton.css`)
  }
  const SpaceStyle = ['Image', 'Tag', 'Upload']
  if (SpaceStyle.includes(componentName)) {
    sideEffects.push(`vue-amazing-ui/${type}/space/Space.css`)
  }
  const SpinStyle = ['Carousel', 'Image', 'List', 'Table', 'Upload', 'Waterfall']
  if (SpinStyle.includes(componentName)) {
    sideEffects.push(`vue-amazing-ui/${type}/spin/Spin.css`)
  }
  const TooltipStyle = ['BackTop', 'ColorPicker', 'Ellipsis', 'FloatButton', 'Popconfirm', 'Popover', 'Rate', 'Table']
  if (TooltipStyle.includes(componentName)) {
    sideEffects.push(`vue-amazing-ui/${type}/tooltip/Tooltip.css`)
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
