/**
 * 库内告警 / 日志的唯一出口（统一规范）
 *
 * 一个函数、三档级别，**环境策略绑定在级别上**，因此规则可以一句话复述：
 * - `error` —— 运行时失败（回调抛错、编码 / 绘制 / 读取失败）：**全环境输出**，线上必须可观测；
 * - `warn`  —— 用法有误 / 入参被忽略 / 配置不生效：仅开发期输出；
 * - `debug` —— 预期内降级（跨域限制、测量失败、字体检测失败）：仅开发期输出。
 *
 * 输出结构固定为 `[vue-amazing-ui] {组件名或工具名}: {中文说明}`，便于使用方在控制台过滤。
 *
 * ⚠️ 环境判定刻意使用 `process.env.NODE_ENV`，而不是 `import.meta.env.DEV`：
 * - `import.meta.env.DEV` 在 Vite 的**库构建**中会被直接内联为 `false`，导致消费方在任何环境都收不到告警；
 * - `process.env.NODE_ENV` 在 Vite 的库构建中会被**原样保留**（`dist` / `es` / `lib` 产物均已核对），
 *   交由消费方的打包工具（webpack / Vite / Rollup 等）在打包时替换成该消费方自身的环境 ——
 *   这是「使用组件库包的项目」也能在开发环境看到告警的前提。
 *
 * 「开发期」指的是**最终构建 / 运行这份代码时的模式**（`NODE_ENV !== 'production'`），
 * 而不是「库作者写代码期间」：库自身的演示站与单测、第三方项目的 dev server 都算开发期，
 * 第三方项目的 build 产物算生产。因此同一份库产物在两种场景下表现不同，这正是设计目的。
 *
 * 因此库内所有环境判定都应走本文件（`isDevEnv`），不要再另写 `import.meta.env.DEV`。
 * 组件与工具函数内**禁止直写 `console.*`**：由 ESLint `no-console` 守护，仅本文件放行。
 */

/** 告警级别：`error` 线上可观测，`warn` / `debug` 仅开发期输出 */
export type LogLevel = 'warn' | 'error' | 'debug'

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

/**
 * 统一日志出口
 *
 * @param level - 级别，决定输出环境：`error` 全环境，`warn` / `debug` 仅开发期
 * @param component - 组件名或工具名，输出为 `[vue-amazing-ui] {component}: {message}`
 * @param message - 中文说明
 * @param error - 原始错误对象，提供时作为第二个参数输出，便于在控制台展开堆栈
 */
export function log(level: LogLevel, component: string, message: string, error?: unknown): void {
  if (level !== 'error' && !isDevEnv()) return
  const text = `[vue-amazing-ui] ${component}: ${message}`
  if (error === undefined) {
    console[level](text)
    return
  }
  console[level](text, error)
}

/**
 * `process` 的最小类型声明
 *
 * 组件库产物在浏览器运行时，`process` 由消费方的打包工具在打包时替换；
 * 项目 tsconfig 沿用 `@vue/tsconfig` 的 `types: []`（不加载 `@types/node`），故在此声明所需字段。
 */
declare const process: { env: { NODE_ENV?: string } }
