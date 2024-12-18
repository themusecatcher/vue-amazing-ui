import DefaultTheme from 'vitepress/theme'
import './global.less' // global less
import GlobalElement from './components/GlobalElement.vue'
// import VueAmazingUI from 'vue-amazing-ui'
// import 'vue-amazing-ui/css'
import VueAmazingUI from '../../../dist/index'
import '../../../dist/style.css'

export default {
  extends: DefaultTheme, // or ...DefaultTheme
  enhanceApp({ app }) {
    app.component('GlobalElement', GlobalElement)
    app.use(VueAmazingUI)
  }
}
