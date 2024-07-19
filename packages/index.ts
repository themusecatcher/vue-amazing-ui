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
  useMediaQuery
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
import Col from './col'
import Collapse from './collapse'
import Countdown from './countdown'
import DatePicker from './datepicker'
import Descriptions from './descriptions'
import DescriptionsItem from './descriptionsitem'
import Dialog from './dialog'
import Divider from './divider'
import Drawer from './drawer'
import Ellipsis from './ellipsis'
import Empty from './empty'
import Flex from './flex'
import GradientText from './gradienttext'
import Image from './image'
import Input from './input'
import InputNumber from './inputnumber'
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
import Row from './row'
import Scrollbar from './scrollbar'
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
  Col,
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
  GradientText,
  Image,
  Input,
  InputNumber,
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
  Row,
  Scrollbar,
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
  useMediaQuery
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
  Col,
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
  GradientText,
  Image,
  Input,
  InputNumber,
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
  Row,
  Scrollbar,
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
  Tooltip,
  Upload,
  Video,
  Waterfall,
  Watermark
}

export default {
  install
}
