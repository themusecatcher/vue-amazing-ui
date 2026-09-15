/**
 * 第三方样式依赖清单（单一数据源）
 *
 * 组件按需引入时，部分组件依赖了第三方库的独立 CSS 文件（如 DatePicker 依赖 @vuepic/vue-datepicker，
 * Swiper 依赖 swiper）。这些 CSS 无法被组件自身的 <style scoped> 覆盖，需要在构建时复制到产物的
 * vendorStylesDir 固定目录，再由 resolver 的 sideEffects 按需引用。
 *
 * target 路径采用「镜像原包结构」约定：vendorStylesDir/<包名>/<原包内相对路径>，例如
 * swiper/modules/effect-cards.css -> vendor-styles/swiper/modules/effect-cards.css，结构自解释，
 * 未来新增第三方依赖时只需镜像其 node_modules 路径即可。
 *
 * 本文件同时被以下两处消费，禁止再各自硬编码一份：
 * 1. vite.config.ts 的 copyVendorStylesPlugin —— 按 source 从 node_modules 复制到产物 vendorStylesDir 目录
 * 2. components/utils/resolver.ts 的 getSideEffects —— 按 target 生成 sideEffects 引用路径
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
 * 组件名 -> 该组件依赖的第三方样式 target 路径列表
 * 供 resolver.ts 的 getSideEffects 按组件名快速查表；由 vendorStyles 派生，保证两处始终一致
 */
export const vendorStylesByComponent: Record<string, string[]> = {
  DatePicker: vendorStyles.filter(({ source }) => source.startsWith('@vuepic/')).map(({ target }) => target),
  Swiper: vendorStyles.filter(({ source }) => source.startsWith('swiper/')).map(({ target }) => target)
}
