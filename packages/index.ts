import type { App } from 'vue'
import Breadcrumb from './breadcrumb'
import Button from './button'
import Cascader from './cascader'
import Checkbox from './checkbox'
import Countdown from './countdown'
import DatePicker from './datepicker'
import Dialog from './dialog'
import Message from './message'
import Modal from './modal'
import Notification from './notification'
import Pagination from './pagination'
import Radio from './radio'
import Select from './select'
import Spin from './spin'
import Swiper from './swiper'
import Switch from './switch'
import TextScroll from './textscroll'
import Tooltip from './tooltip'
import Video from './video'
import Waterfall from './waterfall'

// 所有组件列表
const components = [
  Breadcrumb,
  Button,
  Cascader,
  Checkbox,
  Countdown,
  DatePicker,
  Dialog,
  Message,
  Modal,
  Notification,
  Pagination,
  Radio,
  Select,
  Spin,
  Swiper,
  Switch,
  TextScroll,
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
  Breadcrumb,
  Button,
  Cascader,
  Checkbox,
  Countdown,
  DatePicker,
  Dialog,
  Message,
  Modal,
  Notification,
  Pagination,
  Radio,
  Select,
  Spin,
  Swiper,
  Switch,
  TextScroll,
  Tooltip,
  Video,
  Waterfall
}

const VueAmazingUI = {
  install
}
export default VueAmazingUI