import { h } from 'vue'
import Theme from 'vitepress/theme'
import './vars.less'
// import './styles/global.less'
// import HomeSponsors from './components/HomeSponsors.vue'
// import AsideSponsors from './components/AsideSponsors.vue'
// import SvgImage from './SvgImage.vue'
import VueAmazingUI from '../../../dist/vue-amazing-ui'
import '../../../dist/style.css'
// import VueAmazingUI from 'vue-amazing-ui'
// import 'vue-amazing-ui/css'

export default {
  ...Theme,
  // Layout() {
  //   return h(Theme.Layout, null, {
  //     // 'home-features-after': () => h(HomeSponsors),
  //     // 'aside-ads-before': () => h(AsideSponsors),
  //   })
  // },
  enhanceApp({ app }) {
    // app.component('SvgImage', SvgImage)
    app.use(VueAmazingUI)
  },
}
