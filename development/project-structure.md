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

每个组件独占一个 kebab-case 目录，基础结构为「SFC + 入口」，可按需增加辅助模块（如 `modal/ModalRenderHost.ts`）：

```
components/
├── button/                 # 组件目录（kebab-case）
│   ├── Button.vue          # SFC 组件（PascalCase 文件名）
│   └── index.ts            # 组件入口（withInstall 默认导出 + 重命名后的 XxxProps）
├── auto-complete/
├── grid/                   # 复合组件：目录下再分 row/ col/ 子目录
│   ├── row/
│   │   ├── Row.vue
│   │   └── index.ts
│   ├── col/
│   └── index.ts
└── ...
```

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
