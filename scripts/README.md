# scripts/ 脚本索引

本目录存放**开发期工具**（发布 / 部署 / 产物校验 / 文档生成），不进 npm 包产物、不进 `components/` 运行时依赖。校验与生成脚本为 `.ts`，由 `tsx` 执行；发布链为 `.sh`，由 `sh` 执行。`.ts` 脚本的类型由 `tsconfig.node.json` 在 `pnpm type-check` 内检查。

## 三类文件

分类只按**职能**，与「是不是入口」无关：入口与否从 `package.json` 一眼可见，名字不必重复表达；名字要表达的是打开文件才能知道的差别。

| 类型 | 判据 | 命名 | 数量 |
| :-- | :-- | :-- | :-- |
| **入口脚本** | 在 `package.json` 的 `scripts` 中有对应命令，或由聚合命令 / npm 生命周期（`prepublishOnly`）触发 | `verify-*`（门禁）/ `gen-*`（生成）/ `prepublish-*`（生命周期）/ `*.sh`（发布链） | 10 |
| **判定模块** | 返回 problem 列表、由守卫或单测调用，自身不退出进程 | `check-*` | 2 |
| **解析工具** | 只把文本解析成结构化事实，零判定 | `-parse` 后缀 | 1 |

> `check-*` 只表示「判定模块」，不表示入口 —— `check-model-props.ts`、`check-prop-runtime-types.ts` 都没有命令。门禁入口一律 `verify-*` 且与 `pnpm` 命令同名，唯一例外是 `verify-style-deps.ts` ↔ `verify:deps`：`style-deps` 指明了校验对象，信息量优先于字面对齐，映射由本文件的命令表兜住。

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
| `pnpm verify:theme` | `verify-theme.ts` | 主题架构守护（`--strict` 运行，告警即失败）：组件不得走旧主题通道、`var(--va-*)` 引用登记与写入位置、公开令牌只消费不声明且只能由所属组件实例覆盖、组件级主色清单自检（重复键 / 目录存在）、公开变量闭合（零消费即失败）、演示站与文档内的 `--va-cp-*` 必须带 fallback、颜色字面量三档统计（设计固定 / 自有色彩资产 / 未登记） |
| `pnpm verify:inject-keys` | `verify-inject-keys.ts` | provide / inject 注入契约守护（只扫源码）：键必须是 `Symbol` + `InjectionKey<T>`、变量名 `camelCase` + `Key`、描述串 = `va` + 变量名去 `Key`、键不得定义在 `.vue`、`provide`/`inject` 不得用字符串字面量、组件内不得裸 `inject`、公共入口不得导出 `*Key` |
| `pnpm verify:docs` | `verify-docs.ts` | 组件文档两项断言（只扫源码 + `docs/`），同进程同退出码：① Props「默认值」列 ↔ 源码 `withDefaults`（默认值列须写 prop 默认值，未传时的有效取值写进说明列；无法静态求值的行在 `WHITELIST` 登记并写明理由）；② 尾部章节顺序必须是 `APIs → Slots → Events → Methods → CSS 变量 → 在 setup 外使用` 的**子序列**（章节可缺省、相对顺序不可变），并拦截尾部自造标题（`## API` / `## 属性` / `## 事件` / `## 实例方法` 等），口径见 `development/demo-doc-guide.md` 的「尾部章节顺序」 |

### 产物校验（`verify:artifacts` / `guard`，需先 `pnpm build`）

| 命令 | 脚本 | 检查什么 |
| :-- | :-- | :-- |
| `pnpm verify:deps` | `verify-style-deps.ts` | ① `componentDependencies` 手写表 ↔ 产物 chunk 依赖图的双向闭包一致性（抓「漏写」与「写了但已不依赖」）；② 聚合入口 `index.d.ts` 的值导出 ↔ 运行时导出的双向一致性 |
| `pnpm verify:on-demand` | `verify-on-demand.ts` | 在系统临时目录搭最小消费方工程，用 `unplugin-vue-components` 按需引入后真实构建，断言 CSS canary 选择器齐全、无模块缺失告警、`es/<dir>/style` 裸目录写法可被打包器与 Node ESM 解析 |
| `pnpm guard` | `prepublish-guard.ts` | 毫秒级文本级断言，不跑构建：`package.json` 声明的产物入口存在、每组件样式入口契约（无编号 CSS、`es`/`lib` 双份入口、相对路径可解析、`sideEffects` 覆盖完整）、`index.d.ts` ↔ `index.js`/`index.cjs` 配对、`props` 运行时类型与源码类型对齐（DOM 类型须含 `Object`、字面量联合须含 `String`） |

`prepublish-guard.ts` 有三处触发点，重复执行是有意为之：

1. `pnpm verify` 链尾（CI）—— 与其余产物校验同批；
2. `publish.sh` 在 **`git commit` / `git push` 之前**显式跑一次 —— 守卫失败即中止，不产生「已推送但产物是坏的」这种不可逆状态；
3. `package.json` 的 `prepublishOnly` 兜底 —— 即使绕开 `pnpm pub` 直接 `npm publish` 也会被拦。

守卫本身约 0.2s，多跑一次的代价远低于「发布后才发现产物坏了」。

### 文档生成

| 命令 | 脚本 | 输出 |
| :-- | :-- | :-- |
| `pnpm gen:vars` | `gen-component-vars-doc.ts` | `docs/guide/parts/component-vars.md`（由 `docs/guide/customize-theme.md` 以 `<!--@include-->` 引入）。唯一数据源是 `components/theme/component-vars.ts`，**改注册表后必须重跑**，`tests/component-vars.spec.ts` 会断言生成物与注册表逐字节一致 |

## 判定模块（无命令，返回 problem 列表）

| 文件 | 职责 | 消费方 |
| :-- | :-- | :-- |
| `check-prop-runtime-types.ts` | `interface Props` 字段文本 → 期望的运行时类型分支，并与 `es/` `lib/` 产物里的 `props` 声明比对；同样只做文本解析、不跑编译器 | `prepublish-guard.ts`、`tests/prop-runtime-types.spec.ts` |
| `check-model-props.ts` | v-model 声明契约（三条）：① 全库禁止 `defineModel`（无白名单例外，其受控判据与全库「传值即受控」冲突）；② `useControlledModel('x', ...)` 的字段在 `withDefaults` 里只能写 `undefined`（布尔字段必须显式写），否则判据恒真；③ 同一字段必须在 `defineEmits` 里声明 `update:x`，否则每次交互输出 dev 告警且监听器落进 `$attrs`；复用 `check-prop-runtime-types.ts` 的 `collectSfcs` / `findBalancedEnd` 与 `component-vars-parse.ts` 的 `stripComments` | `prepublish-guard.ts`、`verify-docs.ts`、`tests/model-props-contract.spec.ts` |

## 解析工具（无命令，零判定）

| 文件 | 职责 | 消费方 |
| :-- | :-- | :-- |
| `component-vars-parse.ts` | 「文本 → 结构化事实」的纯函数（剥注释、拆 SFC 段、收集 `var()` 引用与使用），**不含判定策略**——规则留在 `verify-theme.ts` 与测试中，避免两处口径漂移 | `verify-theme.ts`、`verify-inject-keys.ts`、`verify-docs.ts`、`check-model-props.ts`、`tests/component-vars.spec.ts` |

> 样式依赖表（`components/utils/style-deps.ts`）不在本目录：入口脚本由 `tsx` 执行，直接 `import` 同一份 `.ts`，不再需要「正则解析 TS 源码」的读取器；跨表引用完整性（键与值必须是已收录组件）由类型系统在编译期保证，`verify:deps` 内保留同口径运行期断言（覆盖 `tsx` 只擦除类型的情形）。

## 契约 → 权威层

同一个契约只允许**一层**为权威，其余为兜底（并在此注明）。新增断言前先查表，避免同一规则在两处维护。

| 契约 | 权威层 | 备注 |
| :-- | :-- | :-- |
| 组件令牌注册表自洽（名称数组 / 元数据 / `themeRole`·`themeState`） | `tests/component-vars.spec.ts` | `verify-theme.ts` 不再重复 |
| `ThemeComponentKey` 联合类型 ↔ `THEME_COMPONENTS` | `tests/component-vars.spec.ts` | — |
| 公开令牌每处使用都带与注册表一致的 fallback（含派生组件） | `tests/component-vars.spec.ts` | `verify-theme.ts` 不再重复 |
| 悬空引用（无 fallback 且从未声明） | `tests/component-vars.spec.ts` | — |
| `theme.css` 两套表各含全部别名 | `tests/theme-build.spec.ts` | 直接调 `buildThemeCss()`，不读脏文件 |
| 组件级主色桥消费点 | `tests/component-vars.spec.ts` | 脚本只保留清单自检（重复键 / 目录存在） |
| `--va-*` 引用登记与写入位置（`--va-local-*` 例外、`--va-cp-*` 桥、全局白名单） | `scripts/verify-theme.ts` | 口径比单测更细 |
| 公开变量闭合（零消费即失败） | `scripts/verify-theme.ts` | 单测无此维度 |
| 颜色字面量三档统计（`--strict` 为门禁） | `scripts/verify-theme.ts` | 跨文件统计 + 登记制 |
| 演示站 / 文档中的 `--va-cp-*` fallback | `scripts/verify-theme.ts` | 单测只扫 `components/` |
| `props` 运行时类型 ↔ 源码类型 | `scripts/check-prop-runtime-types.ts` | `guard` 第 ⑥ 项 + `tests/prop-runtime-types.spec.ts` |
| 样式依赖表跨表引用完整性（`styleSources` / `componentDependencies` / `stylelessComponents` 的键与值都在 `componentsMap` 内） | `components/utils/style-deps.ts`（编译期）+ `scripts/verify-style-deps.ts`（运行期） | 类型注解 `Partial<Record<ComponentName, ComponentName>>` 已在 `pnpm type-check` 拦住越界键值；`verify:deps` 保留同口径运行期断言，覆盖脚本侧 `tsx` 只擦除类型的情形（需产物，故不在 `check` 链）。数据的漏登记另有构建期「缺少样式文件」兜底 |
| v-model 声明契约 | `scripts/check-model-props.ts` | `guard` 第 ⑦ 项 + `tests/model-props-contract.spec.ts` |
| 文档 Props 默认值列 ↔ 源码 `withDefaults` | `scripts/verify-docs.ts` | — |
| 组件文档尾部章节顺序 | `scripts/verify-docs.ts`（第 ② 项断言） | 口径文本在 `development/demo-doc-guide.md`「尾部章节顺序」，脚本只做子序列断言；与默认值同扫 `docs/`，故不单开脚本 |
| 生成文档 ↔ 注册表 | `tests/component-vars.spec.ts`（逐字节） | 生成脚本只负责渲染 |

## 命令链与钩子

两条链刻意不重叠：**产物无关的进 `check`，需构建的进 `verify`**；成员由 `package.json` 的聚合命令表达，见上文「门禁命令」。

`publish.sh` 跑的是 `check` → `build` → `verify:artifacts` → `guard`，与 CI 的 `check` / `verify` 同口径（守卫在推送前多跑一次，见上文说明）。

git hook 只覆盖静态检查，不碰本目录脚本：`pre-commit` → `lint-staged`（`*.ts` / `*.js` 均 prettier + eslint）、`commit-msg` → `commitlint`、`pre-push` → `type-check`（源码与 `scripts/` 走 `vue-tsc --build`，`tests/` 走 `tsconfig.test.json`）。

## 新增脚本的约定

1. **入口必须有命令**：挂到 `package.json` 的 `scripts`，并归入 `check:static` / `verify:artifacts` 之一，避免出现只能手动敲长路径的脚本，也避免漏跑。
2. **需产物才能跑的一律不进 `check`**：`check` 要保持「不构建即可跑」，否则 CI 的 `check` job 会失去并行价值。
3. **被 2 处以上复用的逻辑先定性质再命名**：含判定（返回 problem 列表）→ `check-*` 判定模块；纯解析（文本 → 结构化事实）→ `-parse` 后缀解析工具。两者都不挂命令，并补进对应表格登记消费方。
4. **改完同步本表**：脚本职责、命令名、触发位置发生变化时，一并更新本文档（`development/project-structure.md` 只保留指向本文的入口，不再罗列文件名）。

## 目录：为什么不分子目录

13 个脚本分三类，扁平存放。前缀在字母序里已经完成分组（`check-*` → `component-*` → `deploy` → `gen-*` → `prepublish-*` → `publish` → `push` → `verify-*`），分子目录不减少扫描成本，只增加路径深度；而迁移成本是持续的：`package.json` 11 处路径（10 个文件，`prepublish-guard.ts` 被 `prepublishOnly` 与 `guard` 各引一次）、`tests/` 4 处相对 import、本文件与 `development/*.md` 的路径引用都要跟着改，且以后每个新文件都要先做一次「放哪个目录」的决策。

不按「语言」拆（`.ts` / `.sh` 扩展名已表达），也不按「入口/库」拆（`package.json` 已表达）。唯一有意义的切分轴是**是否会改远端状态**（发布链 vs 只读校验），但当前只有 3 个 `.sh`，单独建目录反而会让发布脚本从 `ls` 首屏消失。

满足任一条再拆：

1. 扁平目录脚本数 > 18；
2. 出现第二种执行环境或依赖集（如浏览器侧脚本、需要独立 `dependencies` 的子工具）；
3. 某脚本需要配套 `fixtures/` / 模板资源目录；
4. 发布链扩到 5 个以上脚本（如新增回滚、changelog、release notes 生成）→ 拆出 `scripts/release/`，此时「改远端状态」才值得用目录单独标记。
