# 组织架构 Project Structure

> 本文档描述 Vue Amazing UI 的目录结构与命名规范，是理解代码库全貌的入口。
> 本系列 `development/` 文档聚焦组件库的**设计实现画像**（架构、机制、规范）；组件的功能与使用说明请查阅官方文档站（`docs/`）。

## 顶层目录

| 目录 / 文件 | 职责 |
| :--- | :--- |
| `components/` | 组件库源码（核心），所有组件、工具函数、样式均在此 |
| `src/` | 组件开发演示环境（`pnpm dev` 启动） |
| `index.html` | 演示环境的 HTML 入口 |
| `docs/` | VitePress 文档站（`pnpm docs:dev` 启动） |
| `types/` | 全局类型声明（`env.d.ts` 环境变量、`global-components.d.ts` 全局组件） |
| `tests/` | Vitest 测试用例 |
| `scripts/` | 发布 / 部署脚本（`deploy.sh` / `publish.sh` / `push.sh`）、发布前守卫（`prepublish-guard.js`）与产物级校验脚本（`parse-style-deps.js` / `verify-style-deps.js` / `verify-on-demand.js`） |
| `build/` | 构建后处理（`merge-component-styles.ts` 合并同一 SFC 的编号 CSS、`generate-style-entries.ts` 生成每组件样式入口），由 `vite.config.ts` 的 `closeBundle` 调用 |
| `vite.config.ts` | 构建配置（三产物 dist / es / lib） |
| `tsconfig.*.json` | 各环境 TypeScript 配置 |
| `vitest.config.ts` | 测试配置（独立于 vite.config.ts） |
| `postcss.config.js` | PostCSS 配置（autoprefixer 依据 `package.json` 的 browserslist 自动补厂商前缀） |
| `eslint.config.js` | ESLint 配置 |
| `commitlint.config.js` | 提交信息校验配置 |
| `pnpm-workspace.yaml` | pnpm 工作区配置（受信依赖放行、自引用安装白名单） |
| `components.d.ts` | unplugin-vue-components 自动生成的全局组件类型声明（勿手改） |
| `development/` | 贡献者设计规范文档（即本系列文档，组织架构 / 导入导出 / 组件设计等） |

## components/ 内部结构

组件库核心目录，按职责分为组件目录与公共模块。

### 组件目录

每个组件（族）独占一个 kebab-case 目录，基础结构为「SFC + 入口」，可按需增加辅助模块（如 `modal/ModalRenderHost.ts`）：

```
components/
├── button/                 # 组件目录（kebab-case）
│   ├── Button.vue          # SFC 组件（PascalCase 文件名）
│   └── index.ts            # 组件入口（withInstall 默认导出 + 重命名后的 XxxProps）
├── auto-complete/
├── descriptions/           # 有主组件：主组件 SFC + index.ts 平铺在族目录顶层
│   ├── Descriptions.vue    # 主组件（index.ts 默认导出 withInstall 后的它）
│   ├── index.ts            # 族入口：默认导出主组件，具名导出子组件
│   └── descriptions-item/  # 子组件各占一个 kebab-case 子目录
│       ├── DescriptionsItem.vue
│       └── index.ts
├── grid/                   # 无主组件（成员平级）：全部成员各占子目录
│   ├── row/
│   │   ├── Row.vue
│   │   └── index.ts
│   ├── col/
│   └── index.ts
└── ...
```

复合目录的两种形态，按「目录内是否存在主组件」区分：

| 形态 | 判据 | 目录顶层 | 示例 |
| :--- | :--- | :--- | :--- |
| 主组件平铺 | 目录名即代表某个主组件 | 主组件 SFC + `index.ts` | `descriptions/`、`list/`、`select/` |
| 成员平级 | 无主组件，成员各自独立 | 仅聚合 `index.ts` | `grid/` |

> 伴生而非父子关系的组件（底层组件 + `Provider` + `useXxx`）平铺在同一族目录顶层，如 `message/`、`modal/`、`dialog/`、`notification/`、`loading-bar/`。
>
> 每个「拥有独立样式的可独立引入组件」必须独占一个产物目录：构建期样式入口按组件产物目录聚合（`build/generate-style-entries.ts`），同目录的多个组件会被合并为一个 `style/index.js`，故禁止为减少目录层级而把多个组件平铺到同一目录（会连带引入无关组件的样式）。
>
> 聚合入口 `index.ts` 中**任何具名导出都禁止走纯转发**——即导出项直接来自其他模块、入口自身不为它持有运行时绑定（`export { X } from './x'` 或 `import X from './x'; export { X }`）。这类导出会被 Rollup 转发优化剔除，两种表现面：
>
> - **表现面 ①：整个入口全是纯转发**（入口自身无任何本地绑定）→ 连该 `index.js` 都不生成，深层路径 `vue-amazing-ui/es|lib/<dir>` 报 `ERR_MODULE_NOT_FOUND`；
> - **表现面 ②：入口另有本地绑定**（如 `export default withInstall(X)`）、仅个别具名导出是纯转发 → 模块存在，但该具名导出不进 `index.js`，`import { useX } from 'vue-amazing-ui/es/<dir>'` 取到 `undefined`。
>
> 两种情况下 `index.d.ts` 都会照常声明，形成「类型有声明、运行时无模块」的错位。须经**本地常量**再导出持有绑定，如 `export const Row = RowComp`、`export const useMessage = useMessageImpl`。
>
> 已登记例外：`utils/index.ts` 是 `export * from` 形式的纯 barrel，展开为逐符号本地绑定成本高且无深层导入需求 —— 工具函数请从包根（`vue-amazing-ui`）或具体文件（`vue-amazing-ui/es/utils/format`）导入。该例外已列入 `scripts/prepublish-guard.js` 的 `INDEX_DTS_WHITELIST`。
>
> **构建期专用模块**同样会形成空头声明：`utils/vendor-styles.ts` 仅被 `vite.config.ts` / `build/` 与测试引用，不参与运行时模块图，产物中本就没有对应 JS，而 `tsconfig.dts.json` 仍会为它生成 `vendor-styles.d.ts`。处置方式是把它登记进该文件的 `exclude`，使其不产出 `.d.ts`（已登记）—— 新增同类「仅构建期使用」的模块时须同步登记。
>
> 校验覆盖（两者都需已构建产物，**不在 `pnpm check` 内**）：
>
> - `pnpm guard` 第 ⑤ 项 → **表现面 ①**（`<dir>/index.d.ts` 在、`index.js` 不在），只查目录索引、不查普通文件；
> - `pnpm verify:deps` 的聚合入口导出一致性校验 → **表现面 ②**（`index.d.ts` 声明的值导出 ↔ 运行时导出的**双向**比对）；
> - 新增 `useXxx` / 子组件具名导出时仍须按上述本地常量写法自查，不要依赖校验兜底。

命名约定：

| 对象 | 约定 | 示例 |
| :--- | :--- | :--- |
| 组件目录名 | kebab-case | `auto-complete`、`input-number` |
| SFC 文件名 | PascalCase | `Button.vue`、`AutoComplete.vue` |
| 入口文件 | 统一 `index.ts` | `button/index.ts` |

### 公共模块

| 目录 / 文件 | 职责 |
| :--- | :--- |
| `components/utils/` | 共享工具与 Hooks（详见下文） |
| `components/style/global.less` | 组件库全局默认样式 |
| `components/discrete/` | `createDiscreteApi` 命令式 API |
| `components/components.ts` | 组件汇总导出（命名约定集中处） |
| `components/index.ts` | 库入口（install + 工具函数导出） |

### utils/ 工具目录

`components/utils/` 共 13 个文件，按职责分组：

| 文件 | 职责 |
| :--- | :--- |
| `index.ts` | barrel 汇总，按分组 `export *` |
| `format.ts` | 日期 / 数字格式化 |
| `math.ts` | 精度计算 |
| `function.ts` | 节流防抖、rAF 定时器 |
| `dom.ts` | DOM 操作、文件下载、暗黑模式切换 |
| `color.ts` | 颜色工具（调色板 / 透明度色） |
| `hooks.ts` | 通用 Hooks（挂载状态 / 插槽检测 / 主题注入等） |
| `observers.ts` | DOM 观察与滚动监听 Hooks |
| `position.ts` | 弹出定位 composable |
| `render.ts` | 内容渲染辅助（统一归一为 VNode） |
| `type.ts` | `withInstall` 高阶函数 |
| `resolver.ts` | `unplugin-vue-components` 按需引入 resolver（返回组件的样式入口路径，见 [import-export.md](import-export.md)） |
| `style-deps.ts` | 样式依赖表（单一数据源：`componentsMap` / `styleSources` / `componentDependencies` / `stylelessComponents`） |
| `vendor-styles.ts` | 第三方样式依赖清单（单一数据源） |

> `index.ts` 是 barrel，只汇总 `format` / `math` / `function` / `dom` / `color` / `hooks` / `observers` / `position` / `render` 九组；`type` / `resolver` / `style-deps` / `vendor-styles` 不属于 barrel 成员，需从具体文件引入（如 `import { withInstall } from 'components/utils/type'`）。
> 工具函数的功能与使用说明见官方文档站 `docs/utils/functions/`。

### style/global.less

全局默认样式，定义通用 reset、`--primary-color` CSS 变量与基础字体。组件按需引入时都会携带此样式。

## src/ 演示环境

`pnpm dev` 启动的开发演示环境（非发布产物）：

```
src/
├── views/                  # 演示页（每个组件一个目录）
│   ├── button/             # 演示目录（camelCase）
│   │   ├── Index.vue       # 演示页面
│   │   └── index.ts        # 路由 meta（title）
│   ├── layout/             # 布局演示页
│   ├── timepicker/         # 纯演示页：无对应 components/ 组件，复用 DatePicker 能力展示
│   ├── home/
│   ├── exception/
│   └── ...
├── router/                 # 自动路由（import.meta.glob）
├── layouts/                # 布局组件
├── assets/                 # 静态资源
├── theme.ts                # 演示应用共享主题（App.vue 与 router 的离散实例共用同一份）
├── App.vue
└── main.ts
```

> 演示目录使用 **camelCase** 命名（`autoComplete`、`inputNumber`），与 `components/` 的 kebab-case 不同，注意区分。

## docs/ 文档站

`pnpm docs:dev` 启动的 VitePress 文档站（面向使用者）：

```
docs/
├── .vitepress/             # VitePress 配置与主题
│   ├── config.ts           # 站点配置（sidebar / nav / algolia）、组件库解析到 dist 的 resolveId 钩子
│   └── theme/              # 主题（GlobalElement 等全局组件、Provider 同构包裹）
├── guide/                  # 指引 + 组件文档
│   ├── components/         # 每个组件一篇 md（kebab-case）
│   ├── features.md         # 组件总览页
│   ├── getting-started.md
│   ├── import-on-demand.md
│   ├── customize-theme.md
│   ├── changelog.md
│   └── template.md         # 组件文档模板
├── utils/                  # 工具函数文档
│   ├── functions/          # 工具函数文档（kebab-case，一篇可涵盖多个关联函数）
│   └── getting-started.md
├── public/                 # 文档站静态资源（Logo / 配图等）
├── sponsor/
└── index.md
```

## 命名规范速查

| 场景 | 约定 | 示例 |
| :--- | :--- | :--- |
| 组件目录 | kebab-case | `auto-complete` |
| SFC 组件文件 | PascalCase | `AutoComplete.vue` |
| 组件入口 | `index.ts` | `auto-complete/index.ts` |
| 演示目录 | camelCase | `autoComplete` |
| 组件文档 | kebab-case `.md` | `auto-complete.md` |
| 工具函数文档 | kebab-case `.md` | `date-format.md` |
