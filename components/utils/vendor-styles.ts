/**
 * 第三方样式依赖清单（单一数据源）
 *
 * 部分组件依赖第三方库的独立 CSS（DatePicker → @vuepic/vue-datepicker、Swiper → swiper），
 * 它们无法被组件自身的 <style scoped> 覆盖，需在构建期复制进产物后再由样式入口按需引用。
 *
 * `target` 采用「镜像原包结构」约定：`vendorStylesDir/<包名>/<原包内相对路径>`，
 * 新增依赖时只需镜像其 node_modules 路径。本文件被以下两处消费，禁止再各自硬编码一份：
 * 1. `vite.config.ts` 的 stylePostBuildPlugin —— 按 source 从 node_modules 复制到产物；
 * 2. `build/generate-style-entries.ts` —— 按 vendorStylesByComponent 写进组件样式入口。
 */
export interface VendorStyle {
  /** 第三方 CSS 在 node_modules 中的源路径 */
  source: string
  /** 复制到产物后，相对于产物根目录（es/lib）的目标路径 */
  target: string
}

/** 第三方样式在产物（es/lib）中的存放目录名 */
export const vendorStylesDir = 'vendor-styles'

/** swiper 依赖的模块样式清单（与 Swiper.vue 中实际 import 的模块保持一致） */
const swiperModules = [
  'effect-cards',
  'effect-creative',
  'effect-cube',
  'effect-fade',
  'effect-flip',
  'navigation',
  'pagination'
]

/** 第三方样式依赖清单 */
export const vendorStyles: VendorStyle[] = [
  {
    source: '@vuepic/vue-datepicker/dist/main.css',
    target: `${vendorStylesDir}/vue-datepicker/main.css`
  },
  {
    source: 'swiper/swiper.css',
    target: `${vendorStylesDir}/swiper/swiper.css`
  },
  ...swiperModules.map((moduleName) => ({
    source: `swiper/modules/${moduleName}.css`,
    target: `${vendorStylesDir}/swiper/modules/${moduleName}.css`
  }))
]

/**
 * 组件名 → 该组件依赖的第三方样式 target 路径列表
 *
 * 由 `vendorStyles` 按来源包名派生，保证与清单始终一致；供 `build/generate-style-entries.ts`
 * 按组件名查表写入样式入口。
 */
export const vendorStylesByComponent: Record<string, string[]> = {
  DatePicker: vendorStyles.filter(({ source }) => source.startsWith('@vuepic/')).map(({ target }) => target),
  Swiper: vendorStyles.filter(({ source }) => source.startsWith('swiper/')).map(({ target }) => target)
}
