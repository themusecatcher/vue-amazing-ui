import { defineConfig, DefaultTheme } from 'vitepress'

const ogDescription = 'Next Generation Frontend Tooling'
const ogImage = 'https://vitejs.dev/og-image.png'
const ogTitle = 'Vite'
const ogUrl = 'https://vitejs.dev'

// netlify envs
// const deployURL = process.env.DEPLOY_PRIME_URL || ''
const commitRef = process.env.COMMIT_REF?.slice(0, 8) || 'dev'

// const deployType = (() => {
//   switch (deployURL) {
//     case 'https://main--vite-docs-main.netlify.app':
//       return 'main'
//     case '':
//       return 'local'
//     default:
//       return 'release'
//   }
// })()
// const additionalTitle = ((): string => {
//   switch (deployType) {
//     case 'main':
//       return ' (main branch)'
//     case 'local':
//       return ' (local)'
//     case 'release':
//       return ''
//   }
// })()
// const versionLinks = ((): DefaultTheme.NavItemWithLink[] => {
//   switch (deployType) {
//     case 'main':
//     case 'local':
//       return [
//         {
//           text: 'Vite 4 Docs (release)',
//           link: 'https://vitejs.dev',
//         },
//         {
//           text: 'Vite 3 Docs',
//           link: 'https://v3.vitejs.dev',
//         },
//         {
//           text: 'Vite 2 Docs',
//           link: 'https://v2.vitejs.dev',
//         },
//       ]
//     case 'release':
//       return [
//         {
//           text: 'Vite 3 Docs',
//           link: 'https://v3.vitejs.dev',
//         },
//         {
//           text: 'Vite 2 Docs',
//           link: 'https://v2.vitejs.dev',
//         },
//       ]
//   }
// })()

export default defineConfig({
  title: `Vue Amazing UI`,
  description: 'Amazing UI 组件库',
  base: '/vue-amazing-ui/',

  head: [
    // 网站图标
    ['link', { rel: 'icon', type: 'image/svg+xml', href: 'logo.svg' }],
    // ['link', { rel: 'icon', type: 'image/x-icon', href: 'favicon.ico' }],
    // ['meta', { property: 'og:type', content: 'website' }],
    // ['meta', { property: 'og:title', content: ogTitle }],
    // ['meta', { property: 'og:image', content: ogImage }],
    // ['meta', { property: 'og:url', content: ogUrl }],
    // ['meta', { property: 'og:description', content: ogDescription }],
    // ['meta', { name: 'twitter:card', content: 'summary_large_image' }],
    // ['meta', { name: 'twitter:site', content: '@vite_js' }],
    // ['meta', { name: 'theme-color', content: '#646cff' }],
    // [
    //   'script',
    //   {
    //     src: 'https://cdn.usefathom.com/script.js',
    //     'data-site': 'CBDFBSLI',
    //     'data-spa': 'auto',
    //     defer: '',
    //   },
    // ],
  ],

  locales: {
    // root: { label: 'English' },
    // zh: { label: '简体中文', link: 'https://cn.vitejs.dev' },
    // ja: { label: '日本語', link: 'https://ja.vitejs.dev' },
    // es: { label: 'Español', link: 'https://es.vitejs.dev' },
    // pt: { label: 'Português', link: 'https://pt.vitejs.dev' },
  },

  themeConfig: {
    logo: '/logo.svg',

    editLink: {
      pattern: 'https://github.com/themusecatcher/vue-amazing-ui/tree/master/docs/:path',
      text: 'Suggest changes to this page',
    },

    socialLinks: [
      // { icon: 'mastodon', link: 'https://elk.zone/m.webtoo.ls/@vite' },
      // { icon: 'twitter', link: 'https://twitter.com/vite_js' },
      // { icon: 'discord', link: 'https://chat.vitejs.dev' },
      { icon: 'github', link: 'https://github.com/themusecatcher/vue-amazing-ui' },
    ],

    // algolia: {
    //   appId: '7H67QR5P0A',
    //   apiKey: 'deaab78bcdfe96b599497d25acc6460e',
    //   indexName: 'vitejs',
    //   searchParameters: {
    //     facetFilters: ['tags:en'],
    //   },
    // },

    // carbonAds: {
    //   code: 'CEBIEK3N',
    //   placement: 'vitejsdev',
    // },

    footer: {
      message: `Released under the MIT License. (${commitRef})`,
      // copyright: 'Copyright © 2019-present Evan You & Vite Contributors',
    },

    nav: [
      { text: '指引', link: '/guide/', activeMatch: '/guide/' },
      // { text: 'Config', link: '/config/', activeMatch: '/config/' },
      // { text: 'Plugins', link: '/plugins/', activeMatch: '/plugins/' },
      // {
      //   text: 'Resources',
      //   items: [
      //     { text: 'Team', link: '/team' },
      //     { text: 'Releases', link: '/releases' },
      //     {
      //       items: [
      //         {
      //           text: 'Twitter',
      //           link: 'https://twitter.com/vite_js',
      //         },
      //         {
      //           text: 'Discord Chat',
      //           link: 'https://chat.vitejs.dev',
      //         },
      //         {
      //           text: 'Awesome Vite',
      //           link: 'https://github.com/vitejs/awesome-vite',
      //         },
      //         {
      //           text: 'DEV Community',
      //           link: 'https://dev.to/t/vite',
      //         },
      //         {
      //           text: 'Rollup Plugins Compat',
      //           link: 'https://vite-rollup-plugins.patak.dev/',
      //         },
      //         {
      //           text: 'Changelog',
      //           link: 'https://github.com/vitejs/vite/blob/main/packages/vite/CHANGELOG.md',
      //         },
      //       ],
      //     },
      //   ],
      // },
      // {
      //   text: 'Version',
      //   items: versionLinks,
      // },
    ],

    sidebar: {
      '/guide/': [
        {
          text: '指引',
          items: [
            {
              text: '特性',
              link: '/guide/'
            },
            {
              text: '快速上手',
              link: '/guide/install'
            }
          ]
        },
        {
          text: '组件',
          items: [
            {
              text: '面包屑 Breadcrumb',
              link: '/guide/components/breadcrumb'
            },
            {
              text: '按钮 Button',
              link: '/guide/components/button'
            },
            {
              text: '走马灯 Carousel',
              link: '/guide/components/carousel'
            },
            {
              text: '级联选择 Cascader',
              link: '/guide/components/cascader'
            },
            {
              text: '多选框 Checkbox',
              link: '/guide/components/checkbox'
            },
            {
              text: '折叠面板 Collapse',
              link: '/guide/components/collapse'
            },
            {
              text: '倒计时 Countdown',
              link: '/guide/components/countdown'
            },
            {
              text: '日期选择 DatePicker',
              link: '/guide/components/datepicker'
            },
            {
              text: '对话框 Dialog',
              link: '/guide/components/dialog'
            },
            {
              text: '分割线 Divider',
              link: '/guide/components/divider'
            },
            {
              text: '空状态 Empty',
              link: '/guide/components/empty'
            },
            {
              text: '图片 Image',
              link: '/guide/components/image'
            },
            {
              text: '数字输入框 InputNumber',
              link: '/guide/components/inputnumber'
            },
            {
              text: '全局提示 Message',
              link: '/guide/components/message'
            },
            {
              text: '信息提示 Modal',
              link: '/guide/components/modal'
            },
            {
              text: '通知提醒框 Notification',
              link: '/guide/components/notification'
            },
            {
              text: '分页器 Pagination',
              link: '/guide/components/pagination'
            },
            {
              text: '进度条 Progress',
              link: '/guide/components/progress'
            },
            {
              text: '二维码 QRCode',
              link: '/guide/components/qrcode'
            },
            {
              text: '单选框 Radio',
              link: '/guide/components/radio'
            },
            {
              text: '评分 Rate',
              link: '/guide/components/rate'
            },
            {
              text: '选择器 Select',
              link: '/guide/components/select'
            },
            {
              text: '滑动输入条 Slider',
              link: '/guide/components/slider'
            },
            {
              text: '加载中 Spin',
              link: '/guide/components/spin'
            },
            {
              text: '步骤条 Steps',
              link: '/guide/components/steps'
            },
            {
              text: '触摸滑动插件 Swiper',
              link: '/guide/components/swiper'
            },
            {
              text: '开关 Switch',
              link: '/guide/components/switch'
            },
            {
              text: '表格 Table',
              link: '/guide/components/table'
            },
            {
              text: '标签页 Tabs',
              link: '/guide/components/tabs'
            },
            {
              text: '文字滚动 TextScroll',
              link: '/guide/components/textscroll'
            },
            {
              text: '时间轴 Timeline',
              link: '/guide/components/timeline'
            },
            {
              text: '文字提示 Tooltip',
              link: '/guide/components/tooltip'
            },
            {
              text: '上传 Upload',
              link: '/guide/components/upload'
            },
            {
              text: '播放器 Video',
              link: '/guide/components/video'
            },
            {
              text: '瀑布流 Waterfall',
              link: '/guide/components/waterfall'
            }
          ]
        }
      ],
      // '/config/': [
      //   {
      //     text: 'Config',
      //     items: [
      //       {
      //         text: 'Configuring Vite',
      //         link: '/config/'
      //       },
      //       {
      //         text: 'Shared Options',
      //         link: '/config/shared-options'
      //       },
      //       {
      //         text: 'Server Options',
      //         link: '/config/server-options'
      //       },
      //       {
      //         text: 'Build Options',
      //         link: '/config/build-options'
      //       },
      //       {
      //         text: 'Preview Options',
      //         link: '/config/preview-options'
      //       },
      //       {
      //         text: 'Dep Optimization Options',
      //         link: '/config/dep-optimization-options'
      //       },
      //       {
      //         text: 'SSR Options',
      //         link: '/config/ssr-options'
      //       },
      //       {
      //         text: 'Worker Options',
      //         link: '/config/worker-options'
      //       },
      //     ],
      //   },
      // ]
    }
  }
})
