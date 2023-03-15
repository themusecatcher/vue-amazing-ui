import type { App } from 'vue'
import Breadcrumb from './breadcrumb'
import Button from './button'
import Countdown from './countdown'
import Dialog from './dialog'
import Message from './message'
import Modal from './modal'
import Notification from './notification'
import Pagination from './pagination'
import Spin from './spin'
import Switch from './switch'
import Tooltip from './tooltip'
import Video from './video'
import Waterfall from './waterfall'

// 所有组件列表
const components = [
  Breadcrumb,
  Button,
  Countdown,
  Dialog,
  Message,
  Modal,
  Notification,
  Pagination,
  Spin,
  Switch,
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
  Countdown,
  Dialog,
  Message,
  Modal,
  Notification,
  Pagination,
  Spin,
  Switch,
  Tooltip,
  Video,
  Waterfall
}

const VueAmazingUI = {
  install
}
export default VueAmazingUI