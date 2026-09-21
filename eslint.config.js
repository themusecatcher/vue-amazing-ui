import pluginVue from 'eslint-plugin-vue'
import { defineConfigWithVueTs, vueTsConfigs } from '@vue/eslint-config-typescript'
import skipFormatting from '@vue/eslint-config-prettier/skip-formatting'

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
    // docs/.vitepress/** 参与 lint（站点配置与主题组件属项目源码，naive-ui / ant-design-vue 亦不忽略站点源码）。
    // 但其下的 cache/ 是 Vite 依赖预构建产物（第三方 bundle），必须排除；dist/ 已由上面的 **/dist/** 覆盖。
    // 另需注意：该目录仍不在任何 tsconfig 的 include 中 —— 项目根用 vite 7、vitepress 依赖 vite 5，二者 Plugin
    // 类型不兼容（给该目录跑 tsc 会报 TS2322 假错误），故 type-check 有意不覆盖它，运行时错误由 pnpm docs:build 兜住。
    ignores: ['**/dist/**', '**/dist-ssr/**', '**/es/**', '**/lib/**', '**/coverage/**', 'docs/.vitepress/cache/**']
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
  }
)
