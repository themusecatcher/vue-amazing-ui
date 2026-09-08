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
  - 其余（含 `build-only`）→ `buildESAndLibOptions`（按需：es + lib，`preserveModules: true`）。
- `externalDependencies`：库模式外部化依赖（vue / date-fns / swiper 等），不打进产物。
- `externalGlobals`：IIFE / UMD 构建的外部依赖全局变量名。

## 类型生成（dts）

`vite-plugin-dts` 从源码生成 `*.d.ts`，`beforeWriteFile` 负责把输出路径从 `es/components/button/index.d.ts` 规整为 `es/button/index.d.ts`（去除 `components/` 前缀），使类型路径与运行产物路径对齐。

## 第三方样式处理（vendor-styles）

部分组件依赖第三方库的独立 CSS（`DatePicker` → `@vuepic/vue-datepicker`、`Swiper` → `swiper`），无法被组件 `<style scoped>` 覆盖：

- `components/utils/vendor-styles.ts` 是**单一数据源**，定义 `source`（node_modules 源路径）与 `target`（产物内路径）。
- `copyVendorStylesPlugin`（vite.config.ts）：构建时把第三方 CSS 复制到产物的 `vendor-styles/` 目录。
- `resolver.ts` 的 `getSideEffects`：按组件名查表，生成按需引入的第三方样式 sideEffects。

> 新增依赖第三方 CSS 的组件时，需同步维护 `vendor-styles.ts` 的 `vendorStyles` 与 `vendorStylesByComponent`。

## 常用命令

```sh
pnpm build             # format + clean + 三产物构建
pnpm build:components  # 并行 type-check + dist + iife + es/lib
pnpm lint              # ESLint 检查并修复
pnpm type-check        # vue-tsc 类型检查
pnpm check             # lint:check + type-check
pnpm test              # vitest 运行测试
```

> 启动类命令（`pnpm dev` / `pnpm docs:dev`）见 [CONTRIBUTING.md](../CONTRIBUTING.md) 的环境准备章节。

## 测试

- 配置：`vitest.config.ts`（独立于 vite.config.ts，避免库模式构建配置干扰）。
- 环境：`happy-dom`，`globals: true`，用例匹配 `tests/**/*.spec.ts`。
- 框架：`@vue/test-utils` + `vitest`。
- `tests/setup.ts`：为 happy-dom 提供符合 `AnimationFrameID` 契约的 `requestAnimationFrame` 实现（详见文件内注释）。
- 用例分类：`bugs.spec.ts`（缺陷回归）、`discrete.spec.ts`、`internal.spec.ts`、`env.spec.ts`。
