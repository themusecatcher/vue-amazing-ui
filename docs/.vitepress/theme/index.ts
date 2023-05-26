// import { h } from 'vue'
import Theme from 'vitepress/theme'
import './global.less'
// import VueAmazingUI from 'vue-amazing-ui'
// import 'vue-amazing-ui/css'
import VueAmazingUI from '../../../dist/vue-amazing-ui'
import '../../../dist/style.css'

export default {
  ...Theme,
  // Layout() {
  //   return h(Theme.Layout, null, {
  //     // 'home-features-after': () => h(HomeSponsors),
  //     // 'aside-ads-before': () => h(AsideSponsors),
  //   })
  // },
  enhanceApp ({ app }) {
    // app.component('SvgImage', SvgImage)
    app.use(VueAmazingUI)
  },
}
