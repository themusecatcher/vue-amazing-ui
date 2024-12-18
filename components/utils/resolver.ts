export function VueAmazingUIResolver() {
  return {
    type: 'component' as const,
    resolve: (componentName: string) => {
      // 定义组件库中的组件名称映射
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
