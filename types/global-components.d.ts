// demo（src/views）通过 app.use(VueAmazingUI) 全量注册组件，模板中直接使用 <Button /> 等标签。
// unplugin-vue-components 仅配置了 AntDesignVue / NaiveUi 的 resolver，不会为本地组件生成声明，
// 因此这里显式声明全部自有组件，使模板中的 props / slots 能够真正参与 vue-tsc 类型检查。
// 注意：components.d.ts 由 unplugin-vue-components 自动生成，会被覆盖，故不写入该文件。
import type * as VueAmazingUI from '../components/index'

declare module 'vue' {
  export interface GlobalComponents {
    Alert: typeof VueAmazingUI.Alert
    AutoComplete: typeof VueAmazingUI.AutoComplete
    Avatar: typeof VueAmazingUI.Avatar
    BackTop: typeof VueAmazingUI.BackTop
    Badge: typeof VueAmazingUI.Badge
    Breadcrumb: typeof VueAmazingUI.Breadcrumb
    Button: typeof VueAmazingUI.Button
    Calendar: typeof VueAmazingUI.Calendar
    Card: typeof VueAmazingUI.Card
    Carousel: typeof VueAmazingUI.Carousel
    Cascader: typeof VueAmazingUI.Cascader
    Checkbox: typeof VueAmazingUI.Checkbox
    Col: typeof VueAmazingUI.Col
    Collapse: typeof VueAmazingUI.Collapse
    ColorPicker: typeof VueAmazingUI.ColorPicker
    ConfigProvider: typeof VueAmazingUI.ConfigProvider
    Countdown: typeof VueAmazingUI.Countdown
    DatePicker: typeof VueAmazingUI.DatePicker
    Descriptions: typeof VueAmazingUI.Descriptions
    DescriptionsItem: typeof VueAmazingUI.DescriptionsItem
    Dialog: typeof VueAmazingUI.Dialog
    DialogProvider: typeof VueAmazingUI.DialogProvider
    Divider: typeof VueAmazingUI.Divider
    Drawer: typeof VueAmazingUI.Drawer
    Ellipsis: typeof VueAmazingUI.Ellipsis
    Empty: typeof VueAmazingUI.Empty
    Flex: typeof VueAmazingUI.Flex
    FloatButton: typeof VueAmazingUI.FloatButton
    GradientText: typeof VueAmazingUI.GradientText
    Highlight: typeof VueAmazingUI.Highlight
    Image: typeof VueAmazingUI.Image
    Input: typeof VueAmazingUI.Input
    InputNumber: typeof VueAmazingUI.InputNumber
    InputSearch: typeof VueAmazingUI.InputSearch
    List: typeof VueAmazingUI.List
    ListItem: typeof VueAmazingUI.ListItem
    LoadingBar: typeof VueAmazingUI.LoadingBar
    Message: typeof VueAmazingUI.Message
    MessageProvider: typeof VueAmazingUI.MessageProvider
    Modal: typeof VueAmazingUI.Modal
    ModalProvider: typeof VueAmazingUI.ModalProvider
    Notification: typeof VueAmazingUI.Notification
    NotificationProvider: typeof VueAmazingUI.NotificationProvider
    NumberAnimation: typeof VueAmazingUI.NumberAnimation
    Pagination: typeof VueAmazingUI.Pagination
    Popconfirm: typeof VueAmazingUI.Popconfirm
    Popover: typeof VueAmazingUI.Popover
    Progress: typeof VueAmazingUI.Progress
    QRCode: typeof VueAmazingUI.QRCode
    Radio: typeof VueAmazingUI.Radio
    Rate: typeof VueAmazingUI.Rate
    Result: typeof VueAmazingUI.Result
    Row: typeof VueAmazingUI.Row
    Scrollbar: typeof VueAmazingUI.Scrollbar
    Segmented: typeof VueAmazingUI.Segmented
    Select: typeof VueAmazingUI.Select
    Skeleton: typeof VueAmazingUI.Skeleton
    Slider: typeof VueAmazingUI.Slider
    Space: typeof VueAmazingUI.Space
    Spin: typeof VueAmazingUI.Spin
    Statistic: typeof VueAmazingUI.Statistic
    Steps: typeof VueAmazingUI.Steps
    Swiper: typeof VueAmazingUI.Swiper
    Switch: typeof VueAmazingUI.Switch
    Table: typeof VueAmazingUI.Table
    Tabs: typeof VueAmazingUI.Tabs
    Tag: typeof VueAmazingUI.Tag
    TextScroll: typeof VueAmazingUI.TextScroll
    Textarea: typeof VueAmazingUI.Textarea
    Timeline: typeof VueAmazingUI.Timeline
    Tooltip: typeof VueAmazingUI.Tooltip
    Upload: typeof VueAmazingUI.Upload
    Video: typeof VueAmazingUI.Video
    Waterfall: typeof VueAmazingUI.Waterfall
    Watermark: typeof VueAmazingUI.Watermark
  }
}
