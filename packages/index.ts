import './less/global.less'
import {
  dateFormat,
  formatNumber,
  rafTimeout,
  cancelRaf,
  throttle,
  debounce,
  add,
  downloadFile,
  toggleDark,
  useEventListener,
  useMutationObserver,
  useScrollDirection,
  useFps,
  useMediaQuery,
  useResizeObserver
} from './utils'
import type { App } from 'vue'
import Alert from './alert'
import Avatar from './avatar'
import BackTop from './backtop'
import Badge from './badge'
import Breadcrumb from './breadcrumb'
import Button from './button'
import Card from './card'
import Carousel from './carousel'
import Cascader from './cascader'
import Checkbox from './checkbox'
import Collapse from './collapse'
import Countdown from './countdown'
import DatePicker from './datepicker'
import { Descriptions, DescriptionsItem } from './descriptions'
import Dialog from './dialog'
import Divider from './divider'
import Drawer from './drawer'
import Ellipsis from './ellipsis'
import Empty from './empty'
import Flex from './flex'
import FloatButton from './floatbutton'
import GradientText from './gradienttext'
import { Row, Col } from './grid'
import Image from './image'
import Input from './input'
import InputNumber from './inputnumber'
import { Layout, LayoutHeader, LayoutSider, LayoutContent, LayoutFooter } from './layout'
import List from './list'
import Message from './message'
import Modal from './modal'
import Notification from './notification'
import NumberAnimation from './numberanimation'
import Pagination from './pagination'
import Popconfirm from './popconfirm'
import Popover from './popover'
import Progress from './progress'
import QRCode from './qrcode'
import Radio from './radio'
import Rate from './rate'
import Result from './result'
import Scrollbar from './scrollbar'
import Segmented from './segmented'
import Select from './select'
import Skeleton from './skeleton'
import Slider from './slider'
import Space from './space'
import Spin from './spin'
import Statistic from './statistic'
import Steps from './steps'
import Swiper from './swiper'
import Switch from './switch'
import Table from './table'
import Tabs from './tabs'
import Tag from './tag'
import Textarea from './textarea'
import TextScroll from './textscroll'
import Timeline from './timeline'
import TimePicker from './timepicker'
import Tooltip from './tooltip'
import Upload from './upload'
import Video from './video'
import Waterfall from './waterfall'
import Watermark from './watermark'

// 所有组件列表
const components = [
  Alert,
  Avatar,
  BackTop,
  Badge,
  Breadcrumb,
  Button,
  Card,
  Carousel,
  Cascader,
  Checkbox,
  Collapse,
  Countdown,
  DatePicker,
  Descriptions,
  DescriptionsItem,
  Dialog,
  Divider,
  Drawer,
  Ellipsis,
  Empty,
  Flex,
  FloatButton,
  GradientText,
  Row,
  Col,
  Image,
  Input,
  InputNumber,
  Layout,
  LayoutHeader,
  LayoutSider,
  LayoutContent,
  LayoutFooter,
  List,
  Message,
  Modal,
  Notification,
  NumberAnimation,
  Pagination,
  Popconfirm,
  Popover,
  Progress,
  QRCode,
  Radio,
  Rate,
  Result,
  Scrollbar,
  Segmented,
  Select,
  Skeleton,
  Slider,
  Space,
  Spin,
  Statistic,
  Steps,
  Swiper,
  Switch,
  Table,
  Tabs,
  Tag,
  Textarea,
  TextScroll,
  Timeline,
  TimePicker,
  Tooltip,
  Upload,
  Video,
  Waterfall,
  Watermark
]

// 定义 install 方法
const install = function (app: App) {
  // 遍历注册所有组件
  /*
    component.__name ts报错
    Argument of type 'string | undefined' is not assignable to parameter of type 'string'.
    Type 'undefined' is not assignable to type 'string'.ts(2345)
    解决方式一：使用// @ts-ignore
    解决方式二：使用类型断言 尖括号语法(<string>component.__name) 或 as语法(component.__name as string)
  */
  components.forEach((component) => app.component(component.__name as string, component))
}

export {
  dateFormat,
  formatNumber,
  rafTimeout,
  cancelRaf,
  throttle,
  debounce,
  add,
  downloadFile,
  toggleDark,
  useEventListener,
  useMutationObserver,
  useScrollDirection,
  useFps,
  useMediaQuery,
  useResizeObserver
}
export {
  Alert,
  Avatar,
  BackTop,
  Badge,
  Breadcrumb,
  Button,
  Card,
  Carousel,
  Cascader,
  Checkbox,
  Collapse,
  Countdown,
  DatePicker,
  Descriptions,
  DescriptionsItem,
  Dialog,
  Divider,
  Drawer,
  Ellipsis,
  Empty,
  Flex,
  FloatButton,
  GradientText,
  Row,
  Col,
  Image,
  Input,
  InputNumber,
  Layout,
  LayoutHeader,
  LayoutSider,
  LayoutContent,
  LayoutFooter,
  List,
  Message,
  Modal,
  Notification,
  NumberAnimation,
  Pagination,
  Popconfirm,
  Popover,
  Progress,
  QRCode,
  Radio,
  Rate,
  Result,
  Scrollbar,
  Segmented,
  Select,
  Skeleton,
  Slider,
  Space,
  Spin,
  Statistic,
  Steps,
  Swiper,
  Switch,
  Table,
  Tabs,
  Tag,
  Textarea,
  TextScroll,
  Timeline,
  TimePicker,
  Tooltip,
  Upload,
  Video,
  Waterfall,
  Watermark
}

export default {
  install
}
