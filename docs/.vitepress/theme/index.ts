import DefaultTheme from 'vitepress/theme'
import './global.less' // global less
import GlobalElement from './components/GlobalElement.vue'
// import VueAmazingUI from 'vue-amazing-ui'
// import 'vue-amazing-ui/css'
import VueAmazingUI from '../../../dist/vue-amazing-ui'
import '../../../dist/vue-amazing-ui.css'

export default {
  extends: DefaultTheme, // or ...DefaultTheme
  enhanceApp ({ app }) {
    app.component('GlobalElement', GlobalElement)
    app.use(VueAmazingUI)
  }
}
