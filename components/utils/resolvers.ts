// 组件库中的所有组件路径映射
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
const loadedStyleComponents: string[] = [] // 已加载样式的组件数组，避免重复加载样式文件
function getSideEffects(componentName: string, options?: VueAmazingUIResolverOptions) {
  if (!loadedStyleComponents.includes(componentName)) {
    loadedStyleComponents.push(componentName)
  }
  const sideEffectsComponents = [componentName] // 当前组件依赖的并且样式未被加载过的子组件数组
  const AvatarStyle = ['ListItem']
  if (AvatarStyle.includes(componentName) && !loadedStyleComponents.includes('Avatar')) {
    loadedStyleComponents.push('Avatar')
    sideEffectsComponents.push('Avatar')
  }
  const BadgeStyle = ['FloatButton']
  if (BadgeStyle.includes(componentName) && !loadedStyleComponents.includes('Badge')) {
    loadedStyleComponents.push('Badge')
    sideEffectsComponents.push('Badge')
  }
  const ButtonStyle = ['Collapse', 'ColorPicker', 'Dialog', 'InputSearch', 'Modal', 'Popconfirm']
  if (ButtonStyle.includes(componentName) && !loadedStyleComponents.includes('Button')) {
    loadedStyleComponents.push('Button')
    sideEffectsComponents.push('Button')
  }
  const CheckboxStyle = ['Table']
  if (CheckboxStyle.includes(componentName) && !loadedStyleComponents.includes('Checkbox')) {
    loadedStyleComponents.push('Checkbox')
    sideEffectsComponents.push('Checkbox')
  }
  const EllipsisStyle = ['Table']
  if (EllipsisStyle.includes(componentName)) {
    if (!loadedStyleComponents.includes('Ellipsis')) {
      loadedStyleComponents.push('Ellipsis')
      sideEffectsComponents.push('Ellipsis')
      if (!loadedStyleComponents.includes('Tooltip')) {
        loadedStyleComponents.push('Tooltip')
        sideEffectsComponents.push('Tooltip')
      }
    }
  }
  const EmptyStyle = ['List', 'Select', 'Table']
  if (EmptyStyle.includes(componentName) && !loadedStyleComponents.includes('Empty')) {
    loadedStyleComponents.push('Empty')
    sideEffectsComponents.push('Empty')
  }
  const ImageStyle = ['Upload']
  if (ImageStyle.includes(componentName)) {
    if (!loadedStyleComponents.includes('Image')) {
      loadedStyleComponents.push('Image')
      sideEffectsComponents.push('Image')
      if (!loadedStyleComponents.includes('Space')) {
        loadedStyleComponents.push('Space')
        sideEffectsComponents.push('Space')
      }
      if (!loadedStyleComponents.includes('Spin')) {
        loadedStyleComponents.push('Spin')
        sideEffectsComponents.push('Spin')
      }
    }
  }
  const InputStyle = ['ColorPicker', 'Pagination']
  if (InputStyle.includes(componentName) && !loadedStyleComponents.includes('Input')) {
    loadedStyleComponents.push('Input')
    sideEffectsComponents.push('Input')
  }
  const MessageStyle = ['Upload']
  if (MessageStyle.includes(componentName) && !loadedStyleComponents.includes('Message')) {
    loadedStyleComponents.push('Message')
    sideEffectsComponents.push('Message')
  }
  const PaginationStyle = ['List', 'Table']
  if (PaginationStyle.includes(componentName)) {
    if (!loadedStyleComponents.includes('Pagination')) {
      loadedStyleComponents.push('Pagination')
      sideEffectsComponents.push('Pagination')
      if (!loadedStyleComponents.includes('Input')) {
        loadedStyleComponents.push('Input')
        sideEffectsComponents.push('Input')
      }
      if (!loadedStyleComponents.includes('Select')) {
        loadedStyleComponents.push('Select')
        sideEffectsComponents.push('Select')
        if (!loadedStyleComponents.includes('Empty')) {
          loadedStyleComponents.push('Empty')
          sideEffectsComponents.push('Empty')
        }
        if (!loadedStyleComponents.includes('Scrollbar')) {
          loadedStyleComponents.push('Scrollbar')
          sideEffectsComponents.push('Scrollbar')
        }
      }
    }
  }
  const RadioStyle = ['Calendar', 'Table']
  if (RadioStyle.includes(componentName) && !loadedStyleComponents.includes('Radio')) {
    loadedStyleComponents.push('Radio')
    sideEffectsComponents.push('Radio')
  }
  const ScrollbarStyle = ['Dialog', 'Drawer', 'Select', 'Table']
  if (ScrollbarStyle.includes(componentName) && !loadedStyleComponents.includes('Scrollbar')) {
    loadedStyleComponents.push('Scrollbar')
    sideEffectsComponents.push('Scrollbar')
  }
  const SelectStyle = ['Calendar', 'Cascader', 'Pagination']
  if (SelectStyle.includes(componentName)) {
    if (!loadedStyleComponents.includes('Select')) {
      loadedStyleComponents.push('Select')
      sideEffectsComponents.push('Select')
      if (!loadedStyleComponents.includes('Empty')) {
        loadedStyleComponents.push('Empty')
        sideEffectsComponents.push('Empty')
      }
      if (!loadedStyleComponents.includes('Scrollbar')) {
        loadedStyleComponents.push('Scrollbar')
        sideEffectsComponents.push('Scrollbar')
      }
    }
  }
  const SkeletonStyle = ['Card']
  if (SkeletonStyle.includes(componentName) && !loadedStyleComponents.includes('Skeleton')) {
    loadedStyleComponents.push('Skeleton')
    sideEffectsComponents.push('Skeleton')
  }
  const SpaceStyle = ['Image', 'Tag', 'Upload']
  if (SpaceStyle.includes(componentName) && !loadedStyleComponents.includes('Space')) {
    loadedStyleComponents.push('Space')
    sideEffectsComponents.push('Space')
  }
  const SpinStyle = ['Carousel', 'Image', 'List', 'Table', 'Upload', 'Waterfall']
  if (SpinStyle.includes(componentName) && !loadedStyleComponents.includes('Spin')) {
    loadedStyleComponents.push('Spin')
    sideEffectsComponents.push('Spin')
  }
  const TooltipStyle = ['BackTop', 'ColorPicker', 'Ellipsis', 'FloatButton', 'Popconfirm', 'Popover', 'Rate', 'Table']
  if (TooltipStyle.includes(componentName) && !loadedStyleComponents.includes('Tooltip')) {
    loadedStyleComponents.push('Tooltip')
    sideEffectsComponents.push('Tooltip')
  }
  const type = options?.cjs ? 'lib' : 'es'
  const sideEffects: string[] = []
  sideEffectsComponents.forEach((component: string) => {
    sideEffects.push(
      `vue-amazing-ui/${type}/${componentsMap[component as keyof typeof componentsMap]}/${component}.css`
    )
  })
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
