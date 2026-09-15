// PostCSS 配置：让 package.json 的 browserslist 真正作用于产物 CSS。
// Vite 会自动读取本文件；autoprefixer 按 browserslist 为 CSS 补齐厂商前缀，
// 避免依赖人工在 .vue / .less 中手写 -webkit- / -moz- / -ms- 前缀而遗漏。
export default {
  plugins: {
    autoprefixer: {}
  }
}
