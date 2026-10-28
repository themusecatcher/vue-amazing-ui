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
    "./es/*/style": "./es/*/style/index.js",
    "./lib/*/style": "./lib/*/style/index.cjs",
    "./*": "./*"
  }
}
```

> 两条 `./es/*/style` / `./lib/*/style` 映射用于支持样式的**裸目录写法**（`import 'vue-amazing-ui/es/button/style'`）——
> Node ESM 不支持目录索引解析，仅靠 `"./*"` 透传无法命中 `style/index.js`；`*` 为 exports 的模式通配、更具体者优先，
> 因此不影响 `"./*"` 对其它子路径的透传。resolver 仍使用显式文件路径（不依赖目录索引）。

## 构建配置（vite.config.ts）

- 根据构建参数 `dir` 分发：
  - `dir=dist` → `buildDistOptions`（全量：es + umd；`f=iife` 时只出 iife）。umd 保留给 require / AMD / 全局脚本形态的消费方，故 `dist/index.umd.cjs` 不是冗余产物。
  - 其余（含 `build-only`）→ `buildESAndLibOptions`（按需：es + lib，`preserveModules: true` + `preserveModulesRoot: 'components'`，后者保证产物落在 `es/button/` 而非 `es/components/button/`）。
- `externalDependencies`：库模式外部化依赖（vue / date-fns / swiper 等），不打进产物。注意 swiper 只外部化子路径 `swiper/modules` / `swiper/vue`——源码仅从这两个子路径 import（另有 type-only 的 `swiper/types` 与 CSS 的 `swiper/css*`，样式由 `vendor-styles` 单独复制），**主包 swiper 不会进入产物**，由消费方按 `dependencies` 解析子路径。
- `externalGlobals`：IIFE / UMD 构建的外部依赖全局变量名。
- `generateCssDtsPlugin`：`dir=dist` 时生成 `dist/css.d.ts`，供 `package.json` 的 `exports['./css'].types` 指向，解决 `import 'vue-amazing-ui/css'` 的 TS 报错。
- `stylePostBuildPlugin` 在 `closeBundle` 内**顺序**执行三步后处理（`dir=dist` 时整体跳过），共同确立「样式与 JS 分离」下的产物契约：
  `copyVendorStyles()`（复制第三方样式到 `vendor-styles/`）→ `mergeComponentStyles()`（合并同一 SFC 的编号 CSS，一个组件一个 CSS）→ `generateStyleEntries()`（生成样式入口 `es|lib/<dir>/style/index.{js,cjs}`，**按产物目录聚合**：同目录的多个组件合并为同一个入口，如库内共用的 `picker/`，见 [project-structure.md](project-structure.md)）。
  **顺序不可调换**：生成器需要读到合并后的终态 CSS 与已复制的 vendor 样式。三步合并为单个插件而非三个插件，是因为 Rollup 的 `closeBundle` 是 parallel hook，多插件之间的执行顺序不保证。

以下两项有「不能凭直觉改」的原因，调整前需先确认：

| 配置 | 值 | 原因 |
| :--- | :--- | :--- |
| `buildDistOptions.emptyOutDir` | `false` | `build:components` 用 `run-p` 并行执行 `build:dist` / `build:browser`（两者都写 `dist`），若为 `true` 会在启动时各自清空 `dist` 造成竞态、产物互相覆盖；清空动作由前置 `clean` 串行完成 |
| `css.preprocessorOptions` | 不配置 | 3.0 起主题唯一来源是 `components/theme` 的 `DEFAULT_SEEDS`（构建期派生 `components/style/generated/theme.css`），不再向 Less 注入主题变量；全仓 88 处 `<style lang="less">` 与 3 份全局 less 均不使用内联 JS / `@plugin`，故 `modifyVars` 与 `javascriptEnabled` 都无消费方。加回前先确认确实有 Less 变量消费方，否则会形成第二份主色事实 |
| `cssCodeSplit` | dist 为 `false`，es / lib 为 `true` | dist 需合并出单个 `style.css` 供全量引入；es / lib 需按组件粒度拆分出各组件 `Xxx.css` 供按需引入 |
| `package.json` 的 `sideEffects` | `["dist/*.css", "*.css", "**/style/*"]` | webpack 生产模式默认开启 `optimization.sideEffects`：未被白名单覆盖的文件会被判定为「无副作用」，`import 'vue-amazing-ui/es/button/style'` 这类**纯副作用导入**会被 tree-shaking 丢弃（实测 webpack 5.111：`es/<dir>/style/index.js` 是 `.js`、未被 `*.css` 覆盖 → 样式静默丢失）。不含 `/` 的模式会被 webpack 自动补 `**/` 前缀（故 `*.css` 能覆盖嵌套 CSS）；`**/style/*` 专门覆盖样式入口 JS/CJS（含 `es/grid/row/style` 这类嵌套目录）。`scripts/prepublish-guard.js` 的第 ④ 项断言会兜住漏配 |
| `dts` 插件的注册条件 | 仅 `dir === undefined`（即 `build-only` / es|lib 构建） | `dts` 的 `outDir` 固定为 `['es','lib']`，与构建自身的产出目录无关。若 dist 构建也注册，三条声明流水线会同时写 `es|lib`，并与 `build-only` 的 `emptyOutDir` 清空（发生在 `renderStart`）竞态，表现为 `[vite:dts] ENOENT ... es/<component>/index.d.ts` 的 CI 随机红，且类型被重复生成三遍 |

## 类型生成（dts）

`vite-plugin-dts` 从源码生成 `*.d.ts`，以 `entryRoot` 指定 `components/` 为类型产物根，输出路径直接对齐运行产物结构（`es/button/index.d.ts` 而非 `es/components/button/index.d.ts`；复合组件同样落在 `es/grid/row/Row.d.ts`），无需逐条改写路径。`outDir` 为 `['es', 'lib']`，与 JS 产物同目录；`tsconfigPath` 指向 dts 专用的 `tsconfig.dts.json`；`cleanVueFileName` 把 `.vue.d.ts` 规整为 `.d.ts`。

插件**只在 `dir === undefined` 的构建里注册**（即 `build-only`）：类型产物只服务 `es` / `lib`，dist 全量构建不产出 `.d.ts`。这既是产物归属问题，也是并发安全问题——`build:components` 用 `run-p` 并行跑三个构建，若 dist 构建也写 `es|lib` 的声明，会与 `build-only` 的 `emptyOutDir` 清空竞态，CI 会随机报 `ENOENT ... es/<component>/index.d.ts` 且类型被重复生成三遍。

**已知问题（2026-10-25 定位，构建配置未改动）**：`es` / `lib` 已存在旧产物时直接执行 es|lib 构建（`build-only` 或 `vite build`，即跳过 `pnpm clean`），`vite-plugin-dts@4.5.4` 的 `writeBundle`（单例执行：写 d.ts → `unlink` 中间文件 → `removeDirIfEmpty(outDir)`）会把 `es/` 删空，随后以「Xxx 缺少样式文件」的误导性报错失败——此时应查 dts 与既有产物的竞态，而非 `style-deps.ts`。实验矩阵（es/lib 各自「在 / 不在」）：仅 **lib 存在旧产物**时失败（es 空、lib 正常），其余组合均成功——lib 覆盖旧文件写入快、先完成并触发该钩子，此时 es 的 rollup 写入尚未落盘，`removeDirIfEmpty(es)` 把半成品目录删空；与 es 在不在、`outDir` 单 / 多均无关（单 `['es']` 同样复现）。规避：es|lib 单独重复构建前先 `pnpm clean`；**发布链路（`pnpm build` / `scripts/publish.sh` / CI）自带 clean 前置，不受影响**。根治需升级 `vite-plugin-dts` 到 5.x（major，暂不引入）。

| 源码路径 | 类型产物路径 |
| :--- | :--- |
| `components/button/index.ts` | `es/button/index.d.ts` |
| `components/button/Button.vue` | `es/button/Button.d.ts` |
| `components/components.ts` | `es/components.d.ts` |
| `components/grid/row/Row.vue` | `es/grid/row/Row.d.ts`（复合组件的二级子目录） |

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

部分组件依赖第三方库的独立 CSS（`Swiper` → `swiper`），无法被组件 `<style scoped>` 覆盖：

- `components/utils/vendor-styles.ts` 是**单一数据源**，定义 `source`（node_modules 源路径）与 `target`（产物内路径）。
- `stylePostBuildPlugin` 内的 `copyVendorStyles()`（vite.config.ts）：构建时把第三方 CSS 复制到产物的 `vendor-styles/` 目录，并清理 Vite 隐式 emit 到 `node_modules` 的孤儿 CSS asset（已被固定路径取代）。
- `build/generate-style-entries.ts`：把 `vendorStylesByComponent` 查到的 target 写进该组件的样式入口，消费方按需引入时随入口一并加载（`resolver` 不再读取 vendor 表）。

> 新增依赖第三方 CSS 的组件时，需同步维护 `vendor-styles.ts` 的 `vendorStyles` 与 `vendorStylesByComponent`。

## 常用命令

```sh
pnpm build             # clean + 三产物构建（run-s clean build:components）
pnpm build:components  # 并行 type-check + dist + browser(iife) + es/lib
pnpm format            # Prettier 格式化全仓库（排除项由 .prettierignore 声明：构建产物 / markdown / 锁文件等）
pnpm format:check      # 只检查不写盘（CI 与 pnpm check 使用；范围同 format）
pnpm lint              # ESLint 检查并修复
pnpm type-check        # vue-tsc 类型检查
pnpm check             # 聚合检查：lint:check + format:check + type-check + test
pnpm test              # vitest 运行测试
pnpm verify            # 重量级门禁：build + verify:deps + verify:on-demand + verify:theme + verify:inject-keys + guard（发布前 / CI 自检）
pnpm verify:deps       # 产物一致性校验：依赖表 ↔ chunk 闭包 + 聚合入口类型声明 ↔ 运行时导出（需已构建产物）
pnpm verify:on-demand  # 按需引入端到端验证：临时消费方工程 + canary 断言（需已构建产物）
pnpm verify:theme      # 主题架构守护：变量契约 / 组件令牌注册表 / 组件文件与登记表一致性
pnpm verify:inject-keys # 注入契约守护：键类型 / 命名 / 描述串 / 读取通道（只扫源码）
pnpm guard             # 产物守卫：毫秒级存在性校验（样式入口 / 编号 CSS / 入口内引用 / 聚合入口类型与运行时配对 / props 运行时类型与源码类型对齐）
```

> `scripts/publish.sh` 也会在构建后强制执行 `verify:deps`、`verify:on-demand`、`verify:theme` 与 `verify:inject-keys`（`guard` 由 `prepublishOnly` 触发）。
> 边界：`verify:on-demand` 用 Vite 构建，而 Vite 不做 webpack 式的 `sideEffects` tree-shaking，测不到「样式入口被 webpack 丢弃」这类问题 —— 该场景由 `prepublish-guard.js` 的第 ④ 项断言兜底。
> CI 已启用：`.github/workflows/verify.yml` 在 PR 与 `main` 上**并行**跑两个 job —— `check`（`pnpm check`）与 `verify`（`pnpm verify` + `pnpm docs:build`，含完整构建）；
> `docs:build` 必须晚于 `build`：docs 站的组件库来源是 `dist/` 产物（`docs/.vitepress/config.ts` 的 resolveId 钩子把 `'vue-amazing-ui'` 指向 `../../dist/index.js`），并非 npm 上的同名包；它同时兜住 `docs/**/*.md`（VitePress 的 md-as-SFC）的模板 / 标签结构错误 —— 这批 md 不可纳入 Prettier（会破坏构建，详见 `.github/workflows/verify.yml` 文件头说明）。
> 安装按 lock 文件对齐（`pnpm install --frozen-lockfile`），Node 24，并统一锁定时区为 `Asia/Shanghai`（runner 默认 UTC，本仓库时间敏感用例会漂）。
> 提交钩子**保持现状**：`verify:*` 含完整构建（约 30–60s），不适合放进 `.husky/pre-commit` / `pre-push`。

> 启动类命令（`pnpm dev` / `pnpm docs:dev`）见 [CONTRIBUTING.zh-CN.md](../CONTRIBUTING.zh-CN.md) 的环境准备章节。

## 测试

- 配置：`vitest.config.ts`（独立于 vite.config.ts，避免库模式构建配置干扰）。
- 环境：`happy-dom`，`globals: true`，用例匹配 `tests/**/*.spec.ts`。
- 框架：`@vue/test-utils` + `vitest`。
- `tests/setup.ts`：为 happy-dom 提供返回值稳定为 `number`、帧间隔固定的 `requestAnimationFrame` 实现，供组件帧调度（`Countdown` / `Table` / `Dialog` / `useFps` 等）在测试中可取消、可预期（详见文件内注释）。
- 用例分类（按主题分布，新增用例就近归入或新建 `<主题>.spec.ts`）：
  - 环境 / 内建：`env.spec.ts`、`internal.spec.ts`、`ssr.spec.ts`
  - 缺陷回归：`bugs.spec.ts`
  - 命令式 API：`discrete.spec.ts`
  - 组件行为：`carousel-drag.spec.ts`、`carousel-slide.spec.ts`、`carousel-state.spec.ts`、`cascader.spec.ts`、`descriptions.spec.ts`、`dialog.spec.ts`、`drawer.spec.ts`、`modal.spec.ts`、`modal-icon.spec.ts`、`number-animation.spec.ts`、`popover.spec.ts`、`select-*.spec.ts`（搜索 / 多选 / 子组件 / 分组 / 标签值 / 虚拟滚动 / 键盘 / 浮层）、`option-click-selection.spec.ts`、`field-names.spec.ts`、`blur-suppression.spec.ts`、`tooltip.spec.ts`、`watermark.spec.ts`
  - 工具函数 / Hooks：`lock-scroll.spec.ts`、`scroll-parent.spec.ts`、`use-scroll.spec.ts`、`use-slots-exist.spec.ts`
  - 资源清理：`raf-cleanup.spec.ts`、`timer-cleanup.spec.ts`
  - 构建产物：`resolver.spec.ts`（样式入口路径）、`generate-style-entries.spec.ts`（入口内容与断言）、`merge-component-styles.spec.ts`（编号 CSS 合并）

> 单个组件的用例较多时，按关注点拆为多个文件（如 `Carousel` 拆为 drag / slide / state 三篇），命名沿用 `<主题>-<关注点>.spec.ts`。
