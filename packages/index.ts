import { dateFormat, requestAnimationFrame, cancelAnimationFrame, rafTimeout, cancelRaf, throttle, debounce, add } from '@/utils/util'
import type { App } from 'vue'
import Breadcrumb from './breadcrumb'
import Button from './button'
import Carousel from './carousel'
import Cascader from './cascader'
import Checkbox from './checkbox'
import Collapse from './collapse'
import Countdown from './countdown'
import DatePicker from './datepicker'
import Dialog from './dialog'
import Divider from './divider'
import Empty from './empty'
import Image from './image'
import InputNumber from './inputnumber'
import Message from './message'
import Modal from './modal'
import Notification from './notification'
import Pagination from './pagination'
import Progress from './progress'
import QRCode from './qrcode'
import Radio from './radio'
import Rate from './rate'
import Select from './select'
import Slider from './slider'
import Spin from './spin'
import Steps from './steps'
import Swiper from './swiper'
import Switch from './switch'
import Table from './table'
import Tabs from './tabs'
import TextScroll from './textscroll'
import Timeline from './timeline'
import Tooltip from './tooltip'
import Video from './video'
import Waterfall from './waterfall'

// 所有组件列表
const components = [
  Breadcrumb,
  Button,
  Carousel,
  Cascader,
  Checkbox,
  Collapse,
  Countdown,
  DatePicker,
  Dialog,
  Divider,
  Empty,
  Image,
  InputNumber,
  Message,
  Modal,
  Notification,
  Pagination,
  Progress,
  QRCode,
  Radio,
  Rate,
  Select,
  Slider,
  Spin,
  Steps,
  Swiper,
  Switch,
  Table,
  Tabs,
  TextScroll,
  Timeline,
  Tooltip,
  Video,
  Waterfall
]

console.log('components:', components)
// 定义 install 方法
const install = (app: App): void => {
  // 遍历注册所有组件
  /*
    component.__name ts报错
    Argument of type 'string | undefined' is not assignable to parameter of type 'string'.
    Type 'undefined' is not assignable to type 'string'.ts(2345)
    解决方式一：使用// @ts-ignore
    解决方式二：使用类型断言 尖括号语法(<string>component.__name) 或 as语法(component.__name as string)
  */
  components.forEach(component => app.component(component.__name as string, component))
}

export {
  dateFormat,
  requestAnimationFrame,
  cancelAnimationFrame,
  rafTimeout,
  cancelRaf,
  throttle,
  debounce,
  add
}
export {
  Breadcrumb,
  Button,
  Carousel,
  Cascader,
  Checkbox,
  Collapse,
  Countdown,
  DatePicker,
  Dialog,
  Divider,
  Empty,
  Image,
  InputNumber,
  Message,
  Modal,
  Notification,
  Pagination,
  Progress,
  QRCode,
  Radio,
  Rate,
  Select,
  Slider,
  Spin,
  Steps,
  Swiper,
  Switch,
  Table,
  Tabs,
  TextScroll,
  Timeline,
  Tooltip,
  Video,
  Waterfall
}

const VueAmazingUI = {
  install
}
export default VueAmazingUI
