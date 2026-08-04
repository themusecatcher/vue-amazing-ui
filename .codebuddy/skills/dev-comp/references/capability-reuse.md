# dev-comp 能力复用规范

> dev-comp 对 dev-flow 生态能力的"软复用"策略。使用即加载。
> 核心原则：**运行时独立、能力软引用、零硬依赖**。删掉 dev-flow 不影响 dev-comp。

## 工作上下文

**状态**：自建（借设计不借模板）。

- dev-flow 模板 400+ 行，绑 TAPD/iWiki/跨项目/门控字段，对开源组件库基本不适用
- dev-comp 自建精简版（40 行），只留：组件名/phase/参考源/进度/接续指引/决策记录/可复用资产索引
- 命名沿用 `vaui-{组件名}-{YYYYMMDD}.md`，存储沿用 `~/.codebuddy/working-context/`
- 不调 `validate-working-context.sh`，不做 JSON Schema 校验

## plan

**状态**：直接复用 `todo_write` 工具（框架内置，无依赖）。

## 开发日志 devlog

**状态**：直接调用 `use_skill('tech-doc')`（独立 skill），生成六段式 devlog。

调用时机：阶段 5 收尾。

**降级**：tech-doc 未安装→跳过并提示「tech-doc 未安装，跳过 devlog 生成，建议安装以自动生成开发日志」。

## 度量采集 metrics

**状态**：自建精简 YAML（借数据模型精髓，裁掉公司特定字段）。

- dev-flow metrics schema（Tier 1/2/3）绑定 TAPD/iWiki/codewiki/跨项目，对组件库不适用
- dev-comp 自建精简版 `templates/metrics-lite.tpl.yaml`，字段：component / phase / files_changed / lines_added / lines_deleted / first_time_right / lint_pass_first_try / browser_verified / devlog_generated / knowledge_updated
- 写入 `~/.codebuddy/.metrics/reports/`（与 dev-flow 同一目录，但独立文件）

## 知识沉淀 knowledge

**状态**：直接调用 `use_skill('knowledge-loop')`（独立 skill）。

- 阶段 2 检索：搜索先前组件开发经验（`knowledge/projects/ui-components/`）
- 阶段 5 沉淀：组件接口/数据模型/易错点等写入 `ui-components/` / `error-prone/`

**降级**：knowledge-loop 未安装→跳过并提示用户可安装。

## 提交 commit

**状态**：直接调用 `use_skill('smart-commit')`（独立 skill）。

- 生成 `<type>: <description>` 格式（**无 scope**，对齐项目 commitlint scope-empty）
- 等用户确认后才提交（红线）

**降级**：smart-commit 未安装→AI 手写 message 供用户复制，不自动提交。

## 分享 skill 时

其他人复用本 skill 需：

1. 修改 `SKILL.md` §个人化配置区（项目根/参考源本地路径）
2. 确保以下独立 skill 已安装（或接受降级）：`tech-doc` / `knowledge-loop` / `smart-commit`
3. 本 skill 本身只需复制 `~/.codebuddy/skills/dev-comp/` 目录即可，无需改任何配置
