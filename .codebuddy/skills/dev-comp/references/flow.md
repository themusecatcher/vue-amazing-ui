# dev-comp 6 阶段执行规范

> 本文件是 dev-comp 各阶段的详细执行手册。SKILL.md 触发后按需加载本文件。
> 原则：轻量、领域聚焦、软复用能力。全程不进dev-flow 状态机。

---

## 阶段 0 · 接续 / 初始化

**目标**：判断是新组件还是接续已有组件，建立/恢复工作上下文，列出计划。

1. **扫描已有工作上下文**：`ls ~/.codebuddy/working-context/ | grep -i {组件名}`
   - 命中 → 读取该文件，恢复 phase/进度/决策，跳到「下一步动作」继续，**不新建**
   - 未命中 → 用 `templates/working-context-lite.tpl.md` 新建（命名：`vaui-{组件名}-{YYYYMMDD}.md`）
2. **复杂度与分阶段决策**：
   - 简单组件（单文件、无子组件、API < 8个）→ 一次做完，不分阶段
   - 复杂组件（多子组件/递归/多模式，如 Menu/Table/Cascader）→ **必须分阶段 P1-Pn**，本轮只做一个 P，避免半成品
   - 分阶段时在工作上下文「阶段规划」表里写清每个 P 的范围
3. **列 plan**：用 `todo_write` 把本轮要做的事拆成 todo（对应阶段 1-5 的具体动作）
4. **确认参考源与 API 风格**：读 `references/reference-sources.md`，确定主参考（antdv/naive）与 API 风格，写入工作上下文

**产出**：工作上下文文件 + todo plan + 分阶段决策。

---

## 阶段 1 · 准备（分支 + 目录 + 注册占位）

**目标**：建好骨架，让组件能被导入（哪怕还是空壳）。

1. **分支策略**（读 `references/checklists.md` §分支）：
   - 全新组件 → 从主干新建 `feat/{组件名}`
   - 已有雏形（如 Menu 在 layout 分支）→ 在既有特性分支续做，不新建
   - ⚠️ 先 `git branch --show-current` 确认当前分支，不盲目切换
2. **建组件目录**（读 `references/project-map.md` §组件结构）：
   - 单组件：`components/{组件名}/` → `{Xxx}.vue` + `index.ts`
   - 多子组件：`components/{组件名}/{子}/` 各自 `.vue` + `index.ts`，外层 `index.ts` 聚合
   - 用 `templates/component.tpl.vue` 作骨架
3. **注册占位**（读 `references/checklists.md` §注册同步）：
   - `components/{组件名}/index.ts`：`withInstall` + 类型导出
   - `components/components.ts`：追加 `export type {...}` + `export { default as Xxx }`
   - 顶层 `components/index.ts` 与 router **无需手改**（自动）

**产出**：可import 的组件骨架 + 注册完成。

---

## 阶段 2 · 组件本体开发

**目标**：实现组件功能，对齐参考库，最大化复用项目资产。

1. **先搜索后编码（红线）**：读 `references/reusable-assets.md`，需要的能力（动画/浮层/主题/尺寸监听/工具函数）**先查项目已有**，有则复用，无则再造。必要时 `use_skill('knowledge-loop')` 检索历史组件经验。
2. **对照参考库**（读 `references/reference-sources.md`）：
   - 优先读本地 clone 源码（`REF_ANTDV_LOCAL`/`REF_NAIVE_LOCAL`）理解实现
   - API/交互对齐官网文档
   - 复杂功能可直接复用参考库的算法思路（注意 License/改写）
3. **编码红线**：
   - 主题 **light/dark 双份**（沿用 `useInject('组件名')` + ConfigProvider）
   - 所有链式访问用可选链 `?.`；禁 `any`（用 `unknown` + 守卫）；`const` 优先；`===`
   - **SSR 安全**：docs 会 SSR 渲染，禁裸用 `window`/`document`，需判断或 onMounted 内用
   - CSS：scoped；缩进 2 空格；嵌套 ≤3 层；颜色/间距用主题变量
4. **类型定义**：Props/事件/暴露方法定义明确类型，从 `Xxx.vue` 导出，经`index.ts` 对齐到 `components.ts`

**产出**：功能完整的组件本体 + 类型。

---

## 阶段 3 · 演示用例

**目标**：在 `src/views` 建演示页，作为验收基准（阶段 4 文档会复用它）。

1. 建 `src/views/{组件名}/`：
   - `Index.vue`：用 `templates/demo.tpl.vue` 作骨架，覆盖组件主要用法
   - `index.ts`：`export default { title: '{中文名}' }`（路由自动注册，无需改 router）
2. **并排真身对照**：演示页中把antdv `<a-xxx>` 或 naive `<n-xxx>` 真身与本项目 `<Xxx>` 并排放，视觉/交互 1:1 对照——这是**验收标准**
3. 覆盖用例：基础用法、各props、各事件、边界（禁用/空数据/极值）、主题切换

**产出**：可在 `pnpm dev` 中访问的演示页。

---

## 阶段 4 · 文档

**目标**：补vitepress 组件文档及周边文档。

1. **组件文档**：`docs/guide/components/{组件名}.md`
   - **关键：复用演示页**——docs 与 `src/views/{组件名}/Index.vue` 的 script+template 高度同源，直接迁移并加 vitepress 说明块（何时使用/API 表格）
   - API 表格：Props/Events/Slots/暴露方法，参照 antdv 文档结构
2. **周边文档联动**（读 `references/checklists.md` §周边文档）：
   - vitepress 侧边栏配置（新增组件入口）
   - `docs/index.md`（若有组件清单）
   - `docs/guide/changelog.md`（新增变更记录）
   - `README.md` + `README.zh-CN.md`（组件清单，中英双份）

**产出**：可在 `pnpm docs:dev` 中访问的组件文档 + 周边同步。

---

## 阶段 5 · 验收收尾

**目标**：质量验证 + 能力沉淀 + 提交。

1. **质量验证**（读 `references/checklists.md` §验收）：
   - `pnpm lint:check`（ESLint，须 EXIT 0）
   - `pnpm type-check`（vue-tsc，须无本组件错误）
   - **浏览器实测**：`pnpm dev` 打开演示页，与真身 1:1 对照，覆盖多实例/边界/交互/主题切换，控制台 0 error/warning
   - ⚠️ 后台 watch 进程会干扰终端输出 → 复杂命令重定向到文件再 `read_file` 读取；验证后关端口
2. **能力沉淀**（软复用，缺失则降级跳过，读 `references/capability-reuse.md`）：
   - devlog：`use_skill('tech-doc')` 生成开发日志
   - metrics：按 `templates/metrics-lite.tpl.yaml` 写一份到 `CAP_METRICS_DIR`
   - knowledge：`use_skill('knowledge-loop')` 沉淀组件经验（接口/易错点）
3. **提交**：`use_skill('smart-commit')` 生成 `feat: ...` message（无 scope）→ **等用户确认才提交**
4. **收尾**：更新工作上下文 status（本P 完成 → 若还有下一 P，标注接续指引；全部完成 → 可归档）

**产出**：验收通过 + devlog/metrics/knowledge + commit（待用户确认）。

---

## dc:st / dc:status 子命令

读取当前组件的工作上下文，输出：组件名/当前 phase/进度/下一步/未完成的 P。
