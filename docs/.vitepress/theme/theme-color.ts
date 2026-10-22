import { ref } from 'vue'
// 主色默认值从库产物取：与 ConfigProvider 的默认种子同源，避免文档站与库各写一份而漂移
import { DEFAULT_PRIMARY } from '../../../dist/index'

/**
 * 文档站自定义主题色
 *
 * 写入方：`components/GlobalElement.vue` 中常驻浮钮里的 ColorPicker
 * 消费方：`theme/index.ts` 里包裹全站的 ConfigProvider（作为 `theme.seed.primary`）
 *
 * 放在模块级而非某个组件内：浮钮渲染在页面内容里，ConfigProvider 在 Layout 外层，
 * 两者不是父子关系，只能靠共享 ref 通信；同时保证站内跳转后选中的颜色不丢。
 */

export { DEFAULT_PRIMARY }

/**
 * 取色面板的预设色板
 *
 * 选色口径：**每个色系只留一个代表色**，按色相绕环排列，保证相邻两块一眼可辨。
 * 近似色会让「换主题色」失去意义，故只保留差异足够大、且作为主色可用的颜色：
 * - 蓝 `#1677ff`：当前默认主色，作为参照点必须保留；
 * - 橙 `#FF6900` / 琥珀 `#FFB400`：规划中的新默认主色候选，须保留以便一键预览；
 * - 其余紫 / 洋红 / 红 / 绿 / 青各留一个代表色。
 *
 * ⚠️ 琥珀 `#FFB400` 的已知问题：主色底的对比色恒为白（`SOLID_TEXT_COLOR`，见 `theme/derive.ts`），
 * 高亮度主色上白字对比度仅约 1.8:1。若 `#FFB400` 真正成为默认主色，需要组件库把
 * `--va-text-color-solid` 改为随种子明暗反转（高亮度主色反转为深色字），
 * 这不是往色板里加色能解决的问题。
 *
 * 曾被移除的色（如需手动取用，面板内输入框仍可直接填色值）：
 * - `#2f54eb`：与默认蓝 `#1677ff` 同为蓝系，色相差仅 10°，冗余；
 * - `#fa8c16`：与 `#FF6900` 同为橙系，色相差 7°，且 `#FF6900` 未来即默认色，冗余；
 * - `#FFCE00`：高明度黄，对比度比 `#FFB400` 更低（约 1.5:1），作为主色不可读。
 */
export const THEME_SWATCHES = [
  DEFAULT_PRIMARY,
  '#722ed1',
  '#eb2f96',
  '#f5222d',
  '#FF6900',
  '#FFB400',
  '#52c41a',
  '#13c2c2'
]

/** 当前选中的主色 */
export const themePrimary = ref(DEFAULT_PRIMARY)
