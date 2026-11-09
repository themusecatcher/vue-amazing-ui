# 浏览器兼容性 Compatibility

_本文件是「支持矩阵」与「高版本 CSS / JS 特性使用政策」的单一真相源。可机器校验的部分由 `scripts/verify-has-usage.ts` 守护，条文见 `development/component-design.md` 的样式规范章节。_

## 支持矩阵（2026-11-09 定）

| 引擎 | 支持版本 | 依据 |
| --- | --- | --- |
| Chrome / Edge | `≥ 105` | `:has()` 与 `:focus-visible` 中较高的一档 |
| Safari / iOS Safari | `≥ 15.4` | 同上（`15.0`–`15.3` 既不支持 `:focus-visible` 也不支持 `:has()`） |
| Firefox | `≥ 121` | `:has()` 的支持起点 |
| Firefox ESR | `≥ 128` | ESR `115` 不支持 `:has()`，`128` 起跟随主线 |
| Opera Mini / KaiOS 2.x / IE | 不支持 | 前两者无法运行 `Vue 3`（`Opera Mini` 无 `Proxy`，`KaiOS 2.5` 内核为 Gecko 48） |

**`package.json > browserslist` 不等于支持矩阵**：它只驱动 autoprefixer 补前缀。实测解析结果仍包含 `op_mini all`、`kaios 2.5`、`op_mob 80`（`npx browserslist` 共 36 项），这些引擎跑不动本库，不能作为「需要兼容」的依据。

### 为什么下限是 Safari 15.4 而不是更低

下限由「已在用、且不可或不宜移除」的特性决定，按门槛从高到低：

| 特性 | 库内存量 | 最低引擎 | 不支持时的后果 | 可降级 |
| --- | --- | --- | --- | --- |
| `:focus-visible` | 26 处 | Safari 15.4 / Chrome 86 | 失去自定义焦点环，退回 UA 默认焦点环 | ✅ UA 兜底 |
| `:has()` | 8 条选择器 | Safari 15.4 / Chrome 105 | `Timeline` 标签分栏退化为「标签在内容上方」 | ✅ 已实测 |
| `scroll-behavior: smooth` | 8 处 | Safari 15.4 / Chrome 61 | 平滑滚动退化为跳转 | ✅ |
| `inset` 简写 | 29 处（含 1 处注释） | Safari 14.1 / Chrome 87 | 遮罩 / 浮层不覆盖 —— **功能级塌陷** | ❌ |
| `:where()` | 6 处 | Safari 14 / Chrome 88 | 该条规则整体失效（含特异性归零手段） | ⚠️ |
| `line-clamp` | 4 处 | 均成对带 `-webkit-line-clamp` | 无影响 | ✅ |
| `ResizeObserver` | 51 处 | Safari 13.1 | 尺寸测量静默失效（无 polyfill） | ❌ 无兜底 |
| JS 现代 API（`.at` / `Object.hasOwn` / `structuredClone` / `toSorted` / `groupBy` / `withResolvers` / `randomUUID`） | 0 | — | — | 已达标 |
| 产物 JS 语法 | `es/*.js` 含 `?.` / `??` | Safari 13.1 | — | 由 Vite `build.target`（默认 `baseline-widely-available`，Safari 16）兜底 |

结论：**单删 `:has()` 不会降低下限**（`:focus-visible` 与 Vite 默认 target 都在同一档或更高），要真正下移矩阵，必须链式处理 `inset`（14.1）→ `ResizeObserver`（13.1）。

## 判定口径

```
风险 = 是否落在矩阵外 × 失效后果严重度 × (1 − 可降级系数)
收益 = 矩阵下限的实际下移量 − 改造成本
```

三条推论：

1. **删除单个特性 ≠ 降低下限**。必须删到最低那一环，否则只是把风险从 A 移到 B。
2. **排序按「是否可降级」，不按「引擎版本够不够老」**。`inset` 失效是遮罩塌陷（不可降级），`:has()` 失效是布局退化（可降级）。
3. **不允许按「特性名气」批量清理**。`compat-check` 一类工具会按保守型基线把 `:focus-visible` / `inset` / `:where` / `:has` 全报 `CRITICAL`，直接照单执行会把库拉回旧 CSS 且破坏无障碍。

## 存量清单（2026-11-09 实测，`components/`）

- `:has()`：仅 `timeline/timeline-item/TimelineItem.vue`（单点收口，见下表「待触发项」）
- `:focus-visible`：26 处（焦点环，属 UA 可兜底项，不改造）
- `inset` 简写：29 处（含 `utils/position.ts` 注释 1 处）
- `ResizeObserver`：51 处（经 `@vueuse/core`，不支持时静默无效）
- `color-mix()` / `container-type` / `aspect-ratio` / `subgrid` / `clamp()` / `@layer`：0 处

## `:has()` 使用政策

条文见 `development/component-design.md`「样式规范 · 高版本 CSS 特性」。摘要：

- 仅用于纯视觉增强，必须存在基础样式兜底分支；
- 选择器参数必须限定直接子项（`:has(> .xxx.yyy)`）；
- 禁止与其他选择器共用逗号列表；
- 全库单点收口，白名单由 `scripts/verify-has-usage.ts` 校验（`pnpm verify:has-usage`，已并入 `pnpm check:static`）。

## 待触发项（不排期，触发条件满足时并入当次改造）

| 项 | 触发条件 | 改动面 |
| --- | --- | --- |
| `Timeline` 改为容器类判定（删除 8 条 `:has()`） | 矩阵下调到 Safari < 15.4 / 新增 RTL / 新增「按项混排布局」 | `Timeline.vue` 增加 `hasLabelItem`（扫 slot vnodes，Fragment 需递归）并让 `label` 与 `mode` 类互斥；`TimelineItem.vue` 重组 10 条 `alternate` + 6 条 `:nth-child` + 8 条 `:has()` 规则；同步两个 layout 单测与文档 |
| `inset` 简写展开 | 矩阵下调到 Safari < 14.1 | 29 处改为 `top/right/bottom/left`（或引入构建期 postcss 映射，参考 antdv `legacyLogicalProperties`） |
| `ResizeObserver` 兜底 | 矩阵下调到 Safari < 13.1 | 51 处调用点统一加特性检测或引入 polyfill |
| `browserslist` 与 `build.target` 基线对齐 | 出现实际前缀缺失时 | 前者按 Safari 26 解析、后者为 Safari 16；当前实测 `-webkit-user-select` / `-webkit-appearance` 均在，无实际缺陷 |

## 与其他库的对照（2026-11-09 调研）

| | 本库 | ant-design-vue 4.2.6 | naive-ui 2.45.3 |
| --- | --- | --- | --- |
| `browserslist` | `> 0.5%, last 2 versions, Firefox ESR, not dead` | 与本库完全相同 | 未声明 |
| `:has()` | 8 条（Timeline 分栏） | 1 处（`Radio` 焦点环） | 1 处（`Heatmap` `:has(> :only-child)`） |
| `:focus-visible` | 26 处 | 14 处 | 0 处 |
| 降级机制 | autoprefixer | 运行时 `supportSelector()` 探测 + `legacyLogicalProperties` 映射 + babel 降级 | 无（依赖使用方构建） |

三家实际下限趋同（Safari 15.4 档），差异在「有没有兜底机制」，而非「用不用高版本特性」。
