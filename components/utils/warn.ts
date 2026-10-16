/**
 * 开发期用法告警（统一规范）
 *
 * 输出结构固定为 `[vue-amazing-ui] {组件名或工具名}: {中文说明}`，且**仅在开发环境输出**。
 *
 * ⚠️ 环境判定刻意使用 `process.env.NODE_ENV`，而不是 `import.meta.env.DEV`：
 * - `import.meta.env.DEV` 在 Vite 的**库构建**中会被直接内联为 `false`，导致消费方在任何环境都收不到告警；
 * - `process.env.NODE_ENV` 在 Vite 的库构建中会被**原样保留**，交由消费方的打包工具（webpack / Vite / Rollup 等）
 *   在打包时替换成该消费方自身的环境 —— 这是「使用组件库包的项目」也能在开发环境看到告警的前提。
 *
 * 因此库内所有开发期判定都应走本文件（`isDevEnv` / `warnUsage`），不要再另写 `import.meta.env.DEV`。
 *
 * 适用：调用方式有误、入参被忽略、配置不生效等**只在开发期需要提醒**的情况。
 * 不适用：运行时失败（异步报错、DOM 操作失败等）—— 这类直接用 `console.error` / `console.warn`，
 * 保持线上可观测，格式同样以 `[vue-amazing-ui]` 开头。
 */

/**
 * 当前是否处于开发环境
 *
 * `try / catch` 兜底不经打包工具直接引用产物的场景：此时 `process` 不存在，按非开发环境处理。
 */
export function isDevEnv(): boolean {
  try {
    return process.env.NODE_ENV !== 'production'
  } catch {
    return false
  }
}

/** 开发期用法告警：组件名 / 工具名 + 中文说明，仅开发环境输出 */
export function warnUsage(component: string, message: string): void {
  if (!isDevEnv()) return
  console.warn(`[vue-amazing-ui] ${component}: ${message}`)
}

/**
 * `process` 的最小类型声明
 *
 * 组件库产物在浏览器运行时，`process` 由消费方的打包工具在打包时替换；
 * 项目 tsconfig 沿用 `@vue/tsconfig` 的 `types: []`（不加载 `@types/node`），故在此声明所需字段。
 */
declare const process: { env: { NODE_ENV?: string } }
