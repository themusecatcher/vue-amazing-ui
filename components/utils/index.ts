/**
 * 组件库内部工具的聚合出口（barrel）
 *
 * 按「纯函数 → 主题 → Hooks → 浮层基础设施 → 渲染辅助」分块聚合；本文件仅供库内组件与测试引用，
 * 不承诺 API 稳定性 —— 对外公开的工具以 `components/index.ts` 的白名单导出为准。
 */

// 纯函数工具：日期/数字格式化、精度计算、节流防抖、DOM 操作
export * from './format'
export * from './math'
export * from './function'
export * from './dom'
// 颜色/主题工具
export * from './color'
// Hooks（通用 hooks + 组件业务 hooks）
export * from './hooks'
// DOM 观察 Hooks
export * from './observers'
// 弹出定位相关 composable
export * from './position'
// 浮层层级（z-index）管理层
export * from './z-index'

// 浮层挂载点契约（同域模型：甲类浮层挂进承载层内容容器）
export * from './floating-mount'
// 渲染辅助
export * from './render'
