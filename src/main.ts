import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import 'less/global.less'

import VueAmazingUI from 'components/index'
// import VueAmazingUI from '../dist/vue-amazing-ui'
// import '../dist/vue-amazing-ui.css'
// import VueAmazingUI from '../es/index'
// import VueAmazingUI from '../lib/index'
// import '../dist/vue-amazing-ui.css'
// import VueAmazingUI from 'vue-amazing-ui'
// import 'vue-amazing-ui/css'
// import { Row, Col, Button, Scrollbar, Radio, Switch, Space, Tooltip, Watermark } from '../es/index'
// import '../es/grid/row/Row.css'
// import '../es/grid/col/Col.css'
// import '../es/button/Button.css'
// import '../es/scrollbar/Scrollbar.css'
// import '../es/radio/Radio.css'
// import '../es/switch/Switch.css'
// import '../es/space/Space.css'
// import '../es/tooltip/Tooltip.css'
// import '../es/watermark/Watermark.css'

const app = createApp(App)
// window.rafTimeout = rafTimeout // 挂载到window上，全局可用，无需引入
app.use(router)
app.use(VueAmazingUI)
// app.use(Row).use(Col).use(Button).use(Scrollbar).use(Radio).use(Switch).use(Space).use(Tooltip).use(Watermark)
app.mount('#app')
