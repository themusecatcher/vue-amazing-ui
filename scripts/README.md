# scripts/ 脚本索引

本目录存放**开发期工具**（发布 / 部署 / 产物校验 / 文档生成），不进 npm 包产物、不进 `components/` 运行时依赖。脚本由 node / bash 直接执行，因此 `*.js` 不能 `import` 仓库内的 `.ts`（`engines` 允许的 Node 20.19 / 22.12 不支持类型擦除）。

## 两类文件

| 类型 | 判据 | 数量 |
| :-- | :-- | :-- |
| **入口脚本** | 在 `package.json` 的 `scripts` 中有对应命令，或由聚合命令 / npm 生命周期（`prepublishOnly`）触发 | 10 |
| **共用库** | 无独立命令，只被入口脚本或测试 `import`（文件名不带动作前缀） | 4 |

## 门禁命令（唯一清单）

门禁成员只写在 `package.json` 的聚合命令里，`publish.sh`、CI、本文件都引用聚合命令而不再逐个罗列 —— 新增校验只加聚合命令，就不会漏跑。

| 聚合命令 | 组成 | 需要构建产物 |
| :-- | :-- | :-- |
| `pnpm check:static` | `verify:theme` → `verify:inject-keys` → `verify:docs` | 否（只扫源码） |
| `pnpm check` | `lint:check` → `format:check` → `type-check` → `check:static` → `test` | 否 |
| `pnpm verify:artifacts` | `verify:deps` → `verify:on-demand` | 是（读 `es/` `lib/`） |
| `pnpm verify` | `build` → `verify:artifacts` → `guard` | 是 |

`check:static` 刻意排在 `test` 之前：三项源码守护合计约 0.45s，而 `vitest` 是全链最慢的一步，契约类失败应当先暴露。

## 入口脚本

### 发布链路（会改动远端状态）

| 命令 | 脚本 | 作用 | 前置条件 |
| :-- | :-- | :-- | :-- |
| `pnpm pub "<msg>"` | `publish.sh` | 单条命令跑完发版全流程：6 项前置校验 → `check` → `build` → `verify:artifacts` → `guard` → 提交推送 → `npm publish` → 升级自身依赖 → 打 tag → 建 GitHub Release → 重新部署文档。`<msg>` 可省略（默认 `feat: 发布 v<version> 版本`） | node、官方 npm 源、`npm login`、version 未在 npm 发布、`gh` 已安装并登录（脚本逐项校验，缺一即退出） |
| `pnpm push "<msg>"` | `push.sh` | `git add .` + commit + push，`<msg>` 必填且须符合 commitlint | — |
| `pnpm docs:deploy "<msg>"` | `deploy.sh` | 构建组件库 → `docs:build` → 强推到 `gh-pages` 分支 → 提交源码。第 2 个参数 `skipBuild=1` 时跳过重复构建（`publish.sh` 末尾即以 `"" 1` 调用） | `<msg>` 在 `skipBuild=1` 时可省略 |

> `publish.sh` 用 `phase` 变量 + `trap ERR` 兜底：中断提示随阶段变化，明确区分「尚未提交/推送/发布」与「npm 已发布但 tag / release / 文档未完成」，不再把守卫拦截误报成「可能已发布」。

### 静态契约守护（`check:static` 链内，免构建）

| 命令 | 脚本 | 检查什么 |
| :-- | :-- | :-- |
| `pnpm verify:theme` | `verify-theme.js` | 主题架构守护（`--strict` 运行，告警即失败）：组件不得走旧主题通道、`var(--va-*)` 引用登记与写入位置、公开令牌只消费不声明且只能由所属组件实例覆盖、组件级主色清单自检（重复键 / 目录存在）、公开变量闭合（零消费即失败）、演示站与文档内的 `--va-cp-*` 必须带 fallback、颜色字面量三档统计（设计固定 / 自有色彩资产 / 未登记） |
| `pnpm verify:inject-keys` | `verify-inject-keys.js` | provide / inject 注入契约守护（只扫源码）：键必须是 `Symbol` + `InjectionKey<T>`、变量名 `camelCase` + `Key`、描述串 = `va` + 变量名去 `Key`、键不得定义在 `.vue`、`provide`/`inject` 不得用字符串字面量、组件内不得裸 `inject`、公共入口不得导出 `*Key` |
| `pnpm verify:docs` | `check-doc-defaults.js` | 文档 Props「默认值」列与源码 `withDefaults` 的一致性守护（只扫源码 + `docs/`）：默认值列须写 prop 默认值（未传时的有效取值写进说明列），无法静态求值的行在脚本 `WHITELIST` 登记并写明理由 |

### 产物校验（`verify:artifacts` / `guard`，需先 `pnpm build`）

| 命令 | 脚本 | 检查什么 |
| :-- | :-- | :-- |
| `pnpm verify:deps` | `verify-style-deps.js` | ① `componentDependencies` 手写表 ↔ 产物 chunk 依赖图的双向闭包一致性（抓「漏写」与「写了但已不依赖」）；② 聚合入口 `index.d.ts` 的值导出 ↔ 运行时导出的双向一致性 |
| `pnpm verify:on-demand` | `verify-on-demand.js` | 在系统临时目录搭最小消费方工程，用 `unplugin-vue-components` 按需引入后真实构建，断言 CSS canary 选择器齐全、无模块缺失告警、`es/<dir>/style` 裸目录写法可被打包器与 Node ESM 解析 |
| `pnpm guard` | `prepublish-guard.js` | 毫秒级文本级断言，不跑构建：`package.json` 声明的产物入口存在、每组件样式入口契约（无编号 CSS、`es`/`lib` 双份入口、相对路径可解析、`sideEffects` 覆盖完整）、`index.d.ts` ↔ `index.js`/`index.cjs` 配对、`props` 运行时类型与源码类型对齐（DOM 类型须含 `Object`、字面量联合须含 `String`） |

`prepublish-guard.js` 有三处触发点，重复执行是有意为之：

1. `pnpm verify` 链尾（CI）—— 与其余产物校验同批；
2. `publish.sh` 在 **`git commit` / `git push` 之前**显式跑一次 —— 守卫失败即中止，不产生「已推送但产物是坏的」这种不可逆状态；
3. `package.json` 的 `prepublishOnly` 兜底 —— 即使绕开 `pnpm pub` 直接 `npm publish` 也会被拦。

守卫本身约 0.2s，多跑一次的代价远低于「发布后才发现产物坏了」。

### 文档生成

| 命令 | 脚本 | 输出 |
| :-- | :-- | :-- |
| `pnpm gen:vars` | `gen-component-vars-doc.js` | `docs/guide/parts/component-vars.md`（由 `docs/guide/customize-theme.md` 以 `<!--@include-->` 引入）。唯一数据源是 `components/theme/component-vars.js`，**改注册表后必须重跑**，`tests/component-vars.spec.ts` 会断言生成物与注册表逐字节一致 |

## 共用库

| 文件 | 职责 | 消费方 |
| :-- | :-- | :-- |
| `component-vars-check.js` | 「文本 → 结构化事实」的纯函数（剥注释、拆 SFC 段、收集 `var()` 引用与使用），**不含判定策略**——规则留在 `verify-theme.js` 与测试中，避免两处口径漂移；`verify-inject-keys.js` 与 `check-doc-defaults.js` 复用其中的 `stripComments` | `verify-theme.js`、`verify-inject-keys.js`、`check-doc-defaults.js`、`tests/component-vars.spec.ts` |
| `component-vars-check.d.ts` | 上者的类型声明，供 TS 测试导入时获得类型（手写文件，非构建产物） | `tests/component-vars.spec.ts` |
| `check-prop-runtime-types.js` | `interface Props` 字段文本 → 期望的运行时类型分支，并与 `es/` `lib/` 产物里的 `props` 声明比对；同样只做文本解析、不跑编译器 | `prepublish-guard.js`、`tests/prop-runtime-types.spec.ts` |
| `check-model-props.js` | v-model 声明契约（三条）：① 全库禁止 `defineModel`（无白名单例外，其受控判据与全库「传值即受控」冲突）；② `useControlledModel('x', ...)` 的字段在 `withDefaults` 里只能写 `undefined`（布尔字段必须显式写），否则判据恒真；③ 同一字段必须在 `defineEmits` 里声明 `update:x`，否则每次交互输出 dev 告警且监听器落进 `$attrs`；复用 `check-prop-runtime-types.js` 的 `collectSfcs` / `findBalancedEnd` 与 `component-vars-check.js` 的 `stripComments` | `prepublish-guard.js`、`check-doc-defaults.js`、`tests/model-props-contract.spec.ts` |

> 样式依赖表（`components/utils/style-deps.data.js`）不在本目录：它是纯 `.js` 数据源，`prepublish-guard.js` / `verify-style-deps.js` 直接 `import`，不再需要「正则解析 TS 源码」的读取器；数据侧的跨表引用完整性（键与值必须是已收录组件）由 `verify:deps` 断言。

## 契约 → 权威层

同一个契约只允许**一层**为权威，其余为兜底（并在此注明）。新增断言前先查表，避免同一规则在两处维护。

| 契约 | 权威层 | 备注 |
| :-- | :-- | :-- |
| 组件令牌注册表自洽（名称数组 / 元数据 / `themeRole`·`themeState`） | `tests/component-vars.spec.ts` | `verify-theme.js` 不再重复 |
| `ThemeComponentKey` 联合类型 ↔ `THEME_COMPONENTS` | `tests/component-vars.spec.ts` | — |
| 公开令牌每处使用都带与注册表一致的 fallback（含派生组件） | `tests/component-vars.spec.ts` | `verify-theme.js` 不再重复 |
| 悬空引用（无 fallback 且从未声明） | `tests/component-vars.spec.ts` | — |
| `theme.css` 两套表各含全部别名 | `tests/theme-build.spec.ts` | 直接调 `buildThemeCss()`，不读脏文件 |
| 组件级主色桥消费点 | `tests/component-vars.spec.ts` | 脚本只保留清单自检（重复键 / 目录存在） |
| `--va-*` 引用登记与写入位置（`--va-local-*` 例外、`--va-cp-*` 桥、全局白名单） | `scripts/verify-theme.js` | 口径比单测更细 |
| 公开变量闭合（零消费即失败） | `scripts/verify-theme.js` | 单测无此维度 |
| 颜色字面量三档统计（`--strict` 为门禁） | `scripts/verify-theme.js` | 跨文件统计 + 登记制 |
| 演示站 / 文档中的 `--va-cp-*` fallback | `scripts/verify-theme.js` | 单测只扫 `components/` |
| `props` 运行时类型 ↔ 源码类型 | `scripts/check-prop-runtime-types.js` | `guard` 第 ⑥ 项 + `tests/prop-runtime-types.spec.ts` |
| 样式依赖表跨表引用完整性（`styleSources` / `componentDependencies` / `stylelessComponents` 的键与值都在 `componentsMap` 内） | `scripts/verify-style-deps.js` | 数据层是 `.js`，编译期看不到；`verify:deps` 内断言（需产物，故不在 `check` 链）。数据的漏登记另有构建期「缺少样式文件」兜底 |
| v-model 声明契约 | `scripts/check-model-props.js` | `guard` 第 ⑦ 项 + `tests/model-props-contract.spec.ts` |
| 文档 Props 默认值列 ↔ 源码 `withDefaults` | `scripts/check-doc-defaults.js` | — |
| 生成文档 ↔ 注册表 | `tests/component-vars.spec.ts`（逐字节） | 生成脚本只负责渲染 |

## 命令链与钩子

两条链刻意不重叠：**产物无关的进 `check`，需构建的进 `verify`**；成员由 `package.json` 的聚合命令表达，见上文「门禁命令」。

`publish.sh` 跑的是 `check` → `build` → `verify:artifacts` → `guard`，与 CI 的 `check` / `verify` 同口径（守卫在推送前多跑一次，见上文说明）。

git hook 只覆盖静态检查，不碰本目录脚本：`pre-commit` → `lint-staged`（`*.js` 仅 prettier）、`commit-msg` → `commitlint`、`pre-push` → `type-check`。

## 新增脚本的约定

1. **入口必须有命令**：挂到 `package.json` 的 `scripts`，并归入 `check:static` / `verify:artifacts` 之一，避免出现只能手动敲长路径的脚本，也避免漏跑。
2. **需产物才能跑的一律不进 `check`**：`check` 要保持「不构建即可跑」，否则 CI 的 `check` job 会失去并行价值。
3. **被 2 处以上复用的逻辑抽成共用库**：不挂命令、不加动作前缀，并补进本文档的「共用库」表登记消费方。
4. **改完同步本表**：脚本职责、命令名、触发位置发生变化时，一并更新本文档（`development/project-structure.md` 只保留指向本文的入口，不再罗列文件名）。
