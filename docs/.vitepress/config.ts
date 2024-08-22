import { defineConfig } from 'vitepress'

export default defineConfig({
  title: `Vue Amazing UI`,
  description: 'Amazing UI 组件库',
  base: '/vue-amazing-ui/',

  head: [ // 网站图标
    ['link', { rel: 'icon', type: 'image/svg+xml', href: 'https://cn.vitejs.dev/viteconf.svg' }]
    // ['link', { rel: 'icon', type: 'image/x-icon', href: 'favicon.ico' }],
  ],
  appearance: true, // 默认 true，设为 false 则无法切换dark/light主题，可选 'dark' true false
  markdown: {
    lineNumbers: false // 是否显示行数，默认false
  },
  themeConfig: {
    logo: '/amazing-icon.svg',

    editLink: {
      pattern: 'https://github.com/themusecatcher/vue-amazing-ui/tree/master/docs/:path',
      text: 'Suggest changes to this page'
    },
    // 默认支持icon包括：'discord'|'facebook'|'github'|'instagram'|'linkedin'|'mastodon'|'slack'|'twitter'|'youtube'
    socialLinks: [
      { icon: 'github', link: 'https://github.com/themusecatcher/vue-amazing-ui' }
      // 自定义icon
      // {
      //   icon: {
      //     svg: '<svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title>Dribbble</title><path d="M12...6.38z"/></svg>'
      //   },
      //   link: 'https://www.npmjs.com/package/vue-amazing-ui'
      // }
    ],

    // search: { // vitepress 内置 search
    //   provider: 'local'
    // },

    algolia: { // algolia 搜索服务 与 内置 search 可二选一
      appId: 'SHDNEYGA8Z',
      apiKey: '91419401b0b0efd31b610e54e5b97249',
      indexName: 'vue-amazing-ui'
    },

    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2023-present The Muse Catcher'
    },

    nav: [
      { text: '组件', link: '/guide/features', activeMatch: '/guide/' },
      { text: '工具', link: '/utils/started', activeMatch: '/utils/' },
      {
        text: '链接',
        items: [
          { text: 'My Github', link: 'https://github.com/themusecatcher' },
          { text: 'My CSDN', link: 'https://blog.csdn.net/Dandrose?type=blog' },
          { text: 'Front-end Notes', link: 'https://themusecatcher.github.io/front-end-notes/' },
          {
            items: [
              {
                text: 'vue',
                link: 'https://cn.vuejs.org/'
              },
              {
                text: 'vitepress',
                link: 'https://vitepress.dev/'
              },
              {
                text: 'markdown',
                link: 'https://markdown.com.cn/'
              }
            ]
          }
        ]
      }
    ],

    sidebar: {
      '/guide/': [
        {
          text: '指引',
          items: [
            {
              text: '特性',
              link: '/guide/features'
            },
            {
              text: '快速上手',
              link: '/guide/started'
            },
            {
              text: '更新日志',
              link: '/guide/changelog'
            }
          ]
        },
        {
          text: '组件',
          items: [
            {
              text: '警告提示 Alert',
              link: '/guide/components/alert'
            },
            {
              text: '头像 Avatar',
              link: '/guide/components/avatar'
            },
            {
              text: '回到顶部 BackTop',
              link: '/guide/components/backtop'
            },
            {
              text: '徽标 Badge',
              link: '/guide/components/badge'
            },
            {
              text: '面包屑 Breadcrumb',
              link: '/guide/components/breadcrumb'
            },
            {
              text: '按钮 Button',
              link: '/guide/components/button'
            },
            {
              text: '卡片 Card',
              link: '/guide/components/card'
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
              text: '描述列表 Descriptions',
              link: '/guide/components/descriptions'
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
              text: '抽屉 Drawer',
              link: '/guide/components/drawer'
            },
            {
              text: '文本省略 Ellipsis',
              link: '/guide/components/ellipsis'
            },
            {
              text: '空状态 Empty',
              link: '/guide/components/empty'
            },
            {
              text: '弹性布局 Flex',
              link: '/guide/components/flex'
            },
            {
              text: '渐变文字 GradientText',
              link: '/guide/components/gradienttext'
            },
            {
              text: '栅格 Grid',
              link: '/guide/components/grid'
            },
            {
              text: '图片 Image',
              link: '/guide/components/image'
            },
            {
              text: '输入框 Input',
              link: '/guide/components/input'
            },
            {
              text: '数字输入框 InputNumber',
              link: '/guide/components/inputnumber'
            },
            {
              text: '列表 List',
              link: '/guide/components/list'
            },
            {
              text: '加载条 LoadingBar',
              link: '/guide/components/loadingbar'
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
              text: '通知提醒 Notification',
              link: '/guide/components/notification'
            },
            {
              text: '数值动画 NumberAnimation',
              link: '/guide/components/numberanimation'
            },
            {
              text: '分页 Pagination',
              link: '/guide/components/pagination'
            },
            {
              text: '弹出确认 Popconfirm',
              link: '/guide/components/popconfirm'
            },
            {
              text: '气泡卡片 Popover',
              link: '/guide/components/popover'
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
              text: '结果 Result',
              link: '/guide/components/result'
            },
            {
              text: '滚动条 Scrollbar',
              link: '/guide/components/scrollbar'
            },
            {
              text: '分段控制器 Segmented',
              link: '/guide/components/segmented'
            },
            {
              text: '选择器 Select',
              link: '/guide/components/select'
            },
            {
              text: '骨架屏 Skeleton',
              link: '/guide/components/skeleton'
            },
            {
              text: '滑动输入条 Slider',
              link: '/guide/components/slider'
            },
            {
              text: '间距 Space',
              link: '/guide/components/space'
            },
            {
              text: '加载中 Spin',
              link: '/guide/components/spin'
            },
            {
              text: '统计数值 Statistic',
              link: '/guide/components/statistic'
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
              text: '标签 Tag',
              link: '/guide/components/tag'
            },
            {
              text: '文本域 Textarea',
              link: '/guide/components/textarea'
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
            },
            {
              text: '水印 Watermark',
              link: '/guide/components/watermark'
            }
          ]
        }
      ],
      '/utils/': [
        {
          text: '指引',
          items: [
            {
              text: '快速上手',
              link: '/utils/started'
            }
          ]
        },
        {
          text: '工具',
          items: [
            {
              text: 'dateFormat 日期格式化',
              link: '/utils/functions/date-format'
            },
            {
              text: 'formatNumber 数字格式化',
              link: '/utils/functions/format-number'
            },
            {
              text: 'rafTimeout 定时器',
              link: '/utils/functions/raf-timeout'
            },
            {
              text: 'throttle 节流',
              link: '/utils/functions/throttle'
            },
            {
              text: 'debounce 防抖',
              link: '/utils/functions/debounce'
            },
            {
              text: 'add 加法',
              link: '/utils/functions/add'
            },
            {
              text: 'downloadFile 下载文件',
              link: '/utils/functions/download-file'
            },
            {
              text: 'toggleDark 切换暗黑',
              link: '/utils/functions/toggle-dark'
            },
            {
              text: 'useEventListener 事件监听',
              link: '/utils/functions/event-listener'
            },
            {
              text: 'useMutationObserver DOM监听',
              link: '/utils/functions/mutation-observer'
            },
            {
              text: 'useScrollDirection 滚动方向',
              link: '/utils/functions/scroll-direction'
            },
            {
              text: 'useFps 刷新率',
              link: '/utils/functions/fps'
            },
            {
               text: 'useMediaQuery 媒体查询',
              link: '/utils/functions/media-query'
            },
            {
               text: 'useResizeObserver 监听DOM尺寸',
              link: '/utils/functions/resize-observer'
            },
            {
               text: 'useSlotsExist 监听插槽存在',
              link: '/utils/functions/slots-exist'
            }
          ]
        }
      ]
    }
  }
})
