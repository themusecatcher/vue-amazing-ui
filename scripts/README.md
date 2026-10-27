# scripts/ 脚本索引

本目录存放**开发期工具**（发布 / 部署 / 产物校验 / 文档生成），不进 npm 包产物、不进 `components/` 运行时依赖。脚本由 node / bash 直接执行，因此 `*.js` 不能 `import` 仓库内的 `.ts`（`engines` 允许的 Node 20.19 / 22.12 不支持类型擦除）。

## 两类文件

| 类型 | 判据 | 数量 |
| :-- | :-- | :-- |
| **入口脚本** | 在 `package.json` 的 `scripts` 中有对应命令，或由 npm 生命周期（`prepublishOnly`）触发 | 9 |
| **共用库** | 无独立命令，只被入口脚本或测试 `import`（文件名不带动作前缀） | 3 |

## 入口脚本

### 发布链路（会改动远端状态）

| 命令 | 脚本 | 作用 | 前置条件 |
| :-- | :-- | :-- | :-- |
| `pnpm pub "<msg>"` | `publish.sh` | 单条命令跑完发版全流程：6 项前置校验 → `check` → `build` → 三项产物校验 → 提交推送 → `npm publish` → 升级自身依赖 → 打 tag → 建 GitHub Release → 重新部署文档。`<msg>` 可省略（默认 `feat: 发布 v<version> 版本`） | node、官方 npm 源、`npm login`、version 未在 npm 发布、`gh` 已安装并登录（脚本逐项校验，缺一即退出） |
| `pnpm push "<msg>"` | `push.sh` | `git add .` + commit + push，`<msg>` 必填且须符合 commitlint | — |
| `pnpm docs:deploy "<msg>"` | `deploy.sh` | 构建组件库 → `docs:build` → 强推到 `gh-pages` 分支 → 提交源码。第 2 个参数 `skipBuild=1` 时跳过重复构建（`publish.sh` 末尾即以 `"" 1` 调用） | `<msg>` 在 `skipBuild=1` 时可省略 |

> `publish.sh` 全程用 `trap ERR` 兜底：`npm publish` 之后任一步失败会提示「npm 已发布但 git 未同步」，需人工补全。

### 校验类（`pnpm verify` 链内，顺序在 `build` 之后）

除 `verify:theme`、`verify:inject-keys` 只扫源码外，其余三项都读取已构建的 `es/` `lib/` 产物——单独手跑前需先 `pnpm build`。

| 命令 | 脚本 | 检查什么 |
| :-- | :-- | :-- |
| `pnpm verify:deps` | `verify-style-deps.js` | ① `componentDependencies` 手写表 ↔ 产物 chunk 依赖图的双向闭包一致性（抓「漏写」与「写了但已不依赖」）；② 聚合入口 `index.d.ts` 的值导出 ↔ 运行时导出的双向一致性 |
| `pnpm verify:on-demand` | `verify-on-demand.js` | 在系统临时目录搭最小消费方工程，用 `unplugin-vue-components` 按需引入后真实构建，断言 CSS canary 选择器齐全、无模块缺失告警、`es/<dir>/style` 裸目录写法可被打包器与 Node ESM 解析 |
| `pnpm verify:theme` | `verify-theme.js` | 主题架构守护：组件不得参与主题派色、`var(--va-*)` 引用一致性、公开令牌只消费不声明且 fallback 逐字一致、注册表自检（键集合 / `.d.ts` 联合类型同步）等 |
| `pnpm verify:inject-keys` | `verify-inject-keys.js` | provide / inject 注入契约守护（只扫源码）：键必须是 `Symbol` + `InjectionKey<T>`、变量名 `camelCase` + `Key`、描述串 = `va` + 变量名去 `Key`、键不得定义在 `.vue`、`provide`/`inject` 不得用字符串字面量、组件内不得裸 `inject`、公共入口不得导出 `*Key` |
| `pnpm guard` | `prepublish-guard.js` | 毫秒级文本级断言，不跑构建：`package.json` 声明的产物入口存在、每组件样式入口契约（无编号 CSS、`es`/`lib` 双份入口、相对路径可解析、`sideEffects` 覆盖完整）、`index.d.ts` ↔ `index.js`/`index.cjs` 配对、`props` 运行时类型与源码类型对齐（DOM 类型须含 `Object`、字面量联合须含 `String`） |

`prepublish-guard.js` 另由 `package.json` 的 **`prepublishOnly`** 自动触发，因此即使绕开 `pnpm pub` 直接 `npm publish` 也会被拦。它已被 `pnpm verify` 链收录，故 `publish.sh` 内不再单独调用，避免同一断言跑两遍。

### 文档生成

| 命令 | 脚本 | 输出 |
| :-- | :-- | :-- |
| `pnpm gen:vars` | `gen-component-vars-doc.js` | `docs/guide/parts/component-vars.md`（由 `docs/guide/customize-theme.md` 以 `<!--@include-->` 引入）。唯一数据源是 `components/theme/component-vars.js`，**改注册表后必须重跑**，`tests/component-vars.spec.ts` 会断言生成物与注册表逐字节一致 |

## 共用库

| 文件 | 职责 | 消费方 |
| :-- | :-- | :-- |
| `parse-style-deps.js` | 用正则解析 `components/utils/style-deps.ts`，得到三张表 + 无样式白名单（`componentsMap` / `styleSources` / `componentDependencies` / `stylelessComponents`） | `prepublish-guard.js`、`verify-style-deps.js` |
| `component-vars-check.js` | 「文本 → 结构化事实」的纯函数（剥注释、拆 SFC 段、收集 `var()` 引用与使用），**不含判定策略**——规则留在 `verify-theme.js` 与测试中，避免两处口径漂移；`verify-inject-keys.js` 复用其中的 `stripComments` | `verify-theme.js`、`verify-inject-keys.js`、`tests/component-vars.spec.ts` |
| `component-vars-check.d.ts` | 上者的类型声明，供 TS 测试导入时获得类型（手写文件，非构建产物） | `tests/component-vars.spec.ts` |
| `check-prop-runtime-types.js` | `interface Props` 字段文本 → 期望的运行时类型分支，并与 `es/` `lib/` 产物里的 `props` 声明比对；同样只做文本解析、不跑编译器 | `prepublish-guard.js`、`tests/prop-runtime-types.spec.ts` |

## 命令链

两条链刻意不重叠：**产物无关的进 `check`，需构建的进 `verify`**。

| 链 | 组成 | 使用位置 |
| :-- | :-- | :-- |
| `pnpm check` | `lint:check` → `format:check` → `type-check` → `test` | CI `check` job、`publish.sh` |
| `pnpm verify` | `build` → `verify:deps` → `verify:on-demand` → `verify:theme` → `verify:inject-keys` → `guard` | CI `verify` job（随后 `docs:build`） |

`publish.sh` 跑的是 `check` + `build` + 四项 `verify:*`，**不含 `guard`**——该断言改由 `npm publish` 的 `prepublishOnly` 触发，只跑一次。

git hook 只覆盖静态检查，不碰本目录脚本：`pre-commit` → `lint-staged`（`*.js` 仅 prettier）、`commit-msg` → `commitlint`、`pre-push` → `type-check`。

## 新增脚本的约定

1. **入口必须有命令**：挂到 `package.json` 的 `scripts`（`verify:*` 走 `pnpm verify` 链，`check` 类走 `pnpm check` 链），避免出现只能手动敲长路径的脚本。
2. **需产物才能跑的一律不进 `check`**：`check` 要保持「不构建即可跑」，否则 CI 的 `check` job 会失去并行价值。
3. **被 2 处以上复用的逻辑抽成共用库**：不挂命令、不加动作前缀，并补进本文档的「共用库」表登记消费方。
4. **改完同步本表**：脚本职责、命令名、触发位置发生变化时，一并更新本文档（`development/project-structure.md` 只保留指向本文的入口，不再罗列文件名）。
