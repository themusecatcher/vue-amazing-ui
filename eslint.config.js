import pluginVue from 'eslint-plugin-vue'
import { defineConfigWithVueTs, vueTsConfigs } from '@vue/eslint-config-typescript'
import skipFormatting from '@vue/eslint-config-prettier/skip-formatting'

/** 库内深引入的统一提示（三种写法共用，避免文案多处漂移） */
const DEEP_IMPORT_MESSAGE = [
  '库内引入请走目录入口（如 components/radio、components/picker、components/utils）；',
  '仅 utils/type、utils/resolver、utils/log 与 config-provider/context 允许直引文件，',
  '构建期模块（style-deps / vendor-styles）禁止在组件内引用'
].join('')

// To allow more languages other than `ts` in `.vue` files, uncomment the following lines:
// import { configureVueProject } from '@vue/eslint-config-typescript'
// configureVueProject({ scriptLangs: ['ts', 'tsx'] })
// More info at https://github.com/vuejs/eslint-config-typescript/#advanced-setup

export default defineConfigWithVueTs(
  {
    name: 'app/files-to-lint',
    files: ['**/*.{ts,mts,tsx,vue}']
  },

  {
    name: 'app/files-to-ignore',
    // docs/.vitepress/** 参与 lint（站点配置与主题组件属项目源码）。
    // 但其下的 cache/、.temp/ 均为 VitePress 运行时产物（依赖预构建 / 页面数据与 SSR 临时文件），必须排除；
    // dist/ 已由上面的 **/dist/** 覆盖。
    // 另需注意：该目录仍不在任何 tsconfig 的 include 中 —— 项目根用 vite 7、vitepress 依赖 vite 5，二者 Plugin
    // 类型不兼容（给该目录跑 tsc 会报 TS2322 假错误），故 type-check 有意不覆盖它，运行时错误由 pnpm docs:build 兜住。
    ignores: [
      '**/dist/**',
      '**/dist-ssr/**',
      '**/es/**',
      '**/lib/**',
      '**/coverage/**',
      'docs/.vitepress/cache/**',
      'docs/.vitepress/.temp/**'
    ]
  },

  pluginVue.configs['flat/essential'],
  vueTsConfigs.recommended,
  skipFormatting,

  // 添加自定义规则
  {
    name: 'custom-eslint-rules',
    rules: {
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-unused-vars': 'off',
      '@typescript-eslint/no-unused-expressions': 'off',
      '@typescript-eslint/no-duplicate-enum-values': 'off',
      '@typescript-eslint/no-unsafe-function-type': 'off',
      'vue/multi-word-component-names': 'off',
      'vue/no-unused-vars': 'off',
      'vue/return-in-computed-property': 'off',
      'vue/require-toggle-inside-transition': 'off'
    }
  },

  // 库内引入路径约束：组件目录的内容统一由目录入口 index.ts 汇总（见 development/project-structure.md）。
  // 三类深引入分别约束：
  //   1. 别名写法 `components/<dir>/<子目录|文件>` → group（gitignore 语义，例外用 ! 前缀）；
  //   2/3. 相对写法 → regex。group 无法对 `..` 做精确豁免（`../*/*` 会连 `../../utils/type`
  //        一并命中且 negate 失效），故相对路径改用 regex 表达。
  // 允许的写法：同目录兄弟文件（`./date-utils`）、同族父目录辅助模块（`../siderHook`）、
  // 目录入口（`../radio` / `./descriptions-item`）、`./style/*`、`utils/type`、`utils/resolver`、
  // `utils/log`（纯函数，主题派生层不能引 utils 汇总入口，否则会把 Vue 拖进构建期脚本）。
  // 构建期模块 style-deps / vendor-styles 不设例外：组件内本就不应引用它们。
  {
    name: 'custom/no-deep-component-imports',
    files: ['components/**/*.{ts,vue}'],
    rules: {
      'no-restricted-imports': [
        'error',
        {
          patterns: [
            // 跨目录相对文件（`../<dir>/<文件>`、`../../...`）；目录入口与父目录辅助模块不匹配
            { regex: '^(?:\\.\\./)+(?!.*utils/(?:type|resolver|log)$)[^/]+/.+$', message: DEEP_IMPORT_MESSAGE },
            // 同目录子目录文件（`./<子目录>/<文件>`）；兄弟文件与子目录入口不匹配
            { regex: '^\\./(?!style/)(?!utils/(?:type|resolver|log)$)[^/]+/.+$', message: DEEP_IMPORT_MESSAGE },
            {
              group: [
                'components/*/*',
                '!components/utils/type',
                '!components/utils/resolver',
                '!components/utils/log',
                // 主题注入键集中在 config-provider/context.ts（见 development/theme-system.md 的文件地图）。
                // 十几个组件按需 inject 这些键；改走 components/config-provider 会把 ConfigProvider.vue
                // 一并带进每个组件的依赖图，故放行该辅助模块
                '!components/config-provider/context'
              ],
              message: DEEP_IMPORT_MESSAGE
            }
          ]
        }
      ]
    }
  },

  // 告警 / 日志统一出口的守护：组件与工具函数内禁止直写 `console.*`。
  // 统一走 `components/utils/log.ts` 的 `log(level, component, message, error?)`：
  // - error 全环境输出（线上可观测），warn / debug 仅开发期输出；
  // - 前缀 `[vue-amazing-ui] {组件名}: {说明}` 由出口统一拼装，避免各处手写漂移。
  // 仅出口文件自身放行 console。
  {
    name: 'custom/no-console-in-components',
    files: ['components/**/*.{ts,vue}'],
    rules: {
      'no-console': 'error'
    }
  },
  {
    name: 'custom/no-console-exceptions',
    files: ['components/utils/log.ts'],
    rules: {
      'no-console': 'off'
    }
  }
)
