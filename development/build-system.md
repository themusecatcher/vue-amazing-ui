# 构建产物体系 Build System

> 描述组件库的三产物构建、类型生成、第三方样式处理与测试。

## 三产物概览

构建产出三种格式，满足不同消费场景：

| 产物目录 | 格式 | 用途 |
| :--- | :--- | :--- |
| `dist/` | ES + UMD + IIFE（全量） | CDN / `<script>` 全量引入 |
| `es/` | ESM（按需，preserveModules） | 打包工具按需引入 |
| `lib/` | CJS（按需，preserveModules） | Node / 旧打包工具 |

`package.json` 的 `exports` 映射：

```json
{
  "main": "lib/index.cjs",
  "module": "es/index.js",
  "unpkg": "dist/index.iife.js",
  "types": "es/index.d.ts",
  "exports": {
    ".": { "types": "./es/index.d.ts", "import": "./es/index.js", "require": "./lib/index.cjs" },
    "./css": { "types": "./dist/css.d.ts", "default": "./dist/style.css" },
    "./*": "./*"
  }
}
```

## 构建配置（vite.config.ts）

- 根据构建参数 `dir` 分发：
  - `dir=dist` → `buildDistOptions`（全量：es + umd；`f=iife` 时只出 iife）。
  - 其余（含 `build-only`）→ `buildESAndLibOptions`（按需：es + lib，`preserveModules: true` + `preserveModulesRoot: 'components'`，后者保证产物落在 `es/button/` 而非 `es/components/button/`）。
- `externalDependencies`：库模式外部化依赖（vue / date-fns / swiper 等），不打进产物。注意 swiper 只外部化子路径 `swiper/modules` / `swiper/vue`，主包留在产物中由 Rollup 处理。
- `externalGlobals`：IIFE / UMD 构建的外部依赖全局变量名。
- `generateCssDtsPlugin`：`dir=dist` 时生成 `dist/css.d.ts`，供 `package.json` 的 `exports['./css'].types` 指向，解决 `import 'vue-amazing-ui/css'` 的 TS 报错。

以下两项有「不能凭直觉改」的原因，调整前需先确认：

| 配置 | 值 | 原因 |
| :--- | :--- | :--- |
| `buildDistOptions.emptyOutDir` | `false` | `build:components` 用 `run-p` 并行执行 `build:dist` / `build:browser`（两者都写 `dist`），若为 `true` 会在启动时各自清空 `dist` 造成竞态、产物互相覆盖；清空动作由前置 `clean` 串行完成 |
| `cssCodeSplit` | dist 为 `false`，es / lib 为 `true` | dist 需合并出单个 `style.css` 供全量引入；es / lib 需按组件粒度拆分出各组件 `Xxx.css` 供按需引入 |

## 类型生成（dts）

`vite-plugin-dts` 从源码生成 `*.d.ts`，`beforeWriteFile` 负责把带 `components/` 前缀的输出路径规整为与运行产物对齐的形式。共 4 条正则，按序尝试（前一条未命中才试下一条）：

| 生成路径 | 规整后路径 |
| :--- | :--- |
| `es/components/button/index.d.ts` | `es/button/index.d.ts` |
| `es/components/button/Button.d.ts` | `es/button/Button.d.ts` |
| `es/components/components.d.ts` | `es/components.d.ts` |
| `es/components/grid/row/Row.d.ts` | `es/grid/row/Row.d.ts`（复合组件的二级子目录） |

## 别名与模块解析

`vite.config.ts` 的 `resolve.alias` 定义了 5 个别名，`vitest.config.ts` 同步了其中 4 个（无 `vue-amazing-ui`）：

| 别名 | 指向 |
| :--- | :--- |
| `@` | `src/` |
| `#` | `types/` |
| `components` | `components/` |
| `less` | `src/assets/less/` |
| `vue-amazing-ui` | **重定向到源码出口 `components/index.ts`**，使演示页按真实用户用法书写 `import { Button } from 'vue-amazing-ui'`，实际解析到源码 |

文档站与演示环境的解析目标不同：演示环境（`pnpm dev`）需要热更新，`vue-amazing-ui` 经上表别名指向源码出口；文档站演示的是发布产物行为，由 `docs/.vitepress/config.ts` 的 `docsResolveLibraryToDist`（`enforce: 'pre'` 的 `resolveId` 钩子）把 `vue-amazing-ui` 统一指向 `dist/index.js`。`docs/.vitepress/theme/index.ts` 亦从 `../../../dist/index` 引入库主体与 `XxxProvider`，与页面 demo 的 `useXxx` 同源，injection key（`Symbol`）一致、`inject` 可正常命中。因此文档站命令（`pnpm docs:dev` / `pnpm docs:build`）需先执行 `pnpm build` 产出 `dist`（`pnpm docs:deploy` 已内含构建）。新增全局提示类能力时须保持「Provider 与 useXxx 同源」，详见该文件内注释。

## 第三方样式处理（vendor-styles）

部分组件依赖第三方库的独立 CSS（`DatePicker` → `@vuepic/vue-datepicker`、`Swiper` → `swiper`），无法被组件 `<style scoped>` 覆盖：

- `components/utils/vendor-styles.ts` 是**单一数据源**，定义 `source`（node_modules 源路径）与 `target`（产物内路径）。
- `copyVendorStylesPlugin`（vite.config.ts）：构建时把第三方 CSS 复制到产物的 `vendor-styles/` 目录，并清理 Vite 隐式 emit 到 `node_modules` 的孤儿 CSS asset（已被固定路径取代）。
- `resolver.ts` 的 `getSideEffects`：按组件名查表，生成按需引入的第三方样式 sideEffects。

> 新增依赖第三方 CSS 的组件时，需同步维护 `vendor-styles.ts` 的 `vendorStyles` 与 `vendorStylesByComponent`。

## 常用命令

```sh
pnpm build             # clean + 三产物构建（run-s clean build:components）
pnpm build:components  # 并行 type-check + dist + browser(iife) + es/lib
pnpm format            # Prettier 格式化 src/ 与 components/
pnpm lint              # ESLint 检查并修复
pnpm type-check        # vue-tsc 类型检查
pnpm check             # 聚合检查：lint:check + format:check + type-check + test
pnpm test              # vitest 运行测试
```

> 启动类命令（`pnpm dev` / `pnpm docs:dev`）见 [CONTRIBUTING.zh-CN.md](../CONTRIBUTING.zh-CN.md) 的环境准备章节。

## 测试

- 配置：`vitest.config.ts`（独立于 vite.config.ts，避免库模式构建配置干扰）。
- 环境：`happy-dom`，`globals: true`，用例匹配 `tests/**/*.spec.ts`。
- 框架：`@vue/test-utils` + `vitest`。
- `tests/setup.ts`：为 happy-dom 提供符合 `AnimationFrameID` 契约的 `requestAnimationFrame` 实现（详见文件内注释）。
- 用例分类（按主题分布，新增用例就近归入或新建 `<主题>.spec.ts`）：
  - 环境 / 内建：`env.spec.ts`、`internal.spec.ts`、`ssr.spec.ts`
  - 缺陷回归：`bugs.spec.ts`
  - 命令式 API：`discrete.spec.ts`
  - 组件行为：`carousel-drag.spec.ts`、`carousel-slide.spec.ts`、`carousel-state.spec.ts`、`descriptions.spec.ts`、`dialog.spec.ts`、`drawer.spec.ts`、`modal.spec.ts`、`modal-icon.spec.ts`、`number-animation.spec.ts`、`popover.spec.ts`、`select-search.spec.ts`、`tooltip.spec.ts`、`watermark.spec.ts`
  - 工具函数 / Hooks：`lock-scroll.spec.ts`、`scroll-parent.spec.ts`、`use-scroll.spec.ts`、`use-slots-exist.spec.ts`
  - 资源清理：`raf-cleanup.spec.ts`、`timer-cleanup.spec.ts`
  - 构建产物：`resolver.spec.ts`

> 单个组件的用例较多时，按关注点拆为多个文件（如 `Carousel` 拆为 drag / slide / state 三篇），命名沿用 `<主题>-<关注点>.spec.ts`。
