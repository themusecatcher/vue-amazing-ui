---
name: dev-comp
description: 面向 vue-amazing-ui 组件库的单组件开发迭代工作流。轻量领域流程（6 阶段）+ 软复用 dev-flow 生态能力（工作上下文/plan/开发日志/度量/知识沉淀/提交），全程不进入 dev-flow 流程状态机与门控，因此轻量不臃肿。适用于在该组件库中新增或完善单个组件（如Menu/Table），参考源为 Ant Design Vue 与 Naive UI（官网+ 本地 clone 源码）。触发命令：dc: / 组件开发 / 开发 xxx 组件 / 完善 xxx 组件。
---

# dev-comp —— 组件库开发迭代工作流

> 定位：vue-amazing-ui 单组件开发迭代领域 SOP。
> 架构：**轻量领域流程 + 软复用 dev-flow 能力模块**。全程❌ 不产生 `.flow` 锁、❌ 不走门控、❌ 不做逐步 JSON 校验。

## ⚙️ 个人化配置区（复用/分享时只改这一块）

> 本 skill 核心流程通用；下列配置**换人换机时只需填 3 个本地路径**，其余保持默认即可。

### 必填（首次使用前填写）

| 配置项 | 填写你的本地路径 | 说明 |
|:--|:--|:--|
| `PROJECT_ROOT` | `<填写>` | 组件库项目根，如 `~/myGithub/vue-amazing-ui` |
| `REF_ANTDV_LOCAL` | `<填写或留空>` | Ant Design Vue 本地 clone 路径（留空则降级用官网） |
| `REF_NAIVE_LOCAL` | `<填写或留空>` | Naive UI 本地 clone 路径（留空则降级用官网） |

### 默认可用（无需修改）

| 配置项 | 当前值 | 说明 |
|:--|:--|:--|
| `REF_ANTDV_GH` | https://github.com/vueComponent/ant-design-vue | Ant Design Vue GitHub |
| `REF_NAIVE_GH` | https://github.com/tusen-ai/naive-ui | Naive UI GitHub |
| `REF_ANTDV_DOC` | https://www.antdv.com/components/overview-cn/ | antdv 官网 |
| `REF_NAIVE_DOC` | https://www.naiveui.com/zh-CN/os-theme/docs/introduction | naive 官网 |
| `CAP_WORKING_CONTEXT_DIR` | `~/.codebuddy/working-context/` | 工作上下文目录 |
| `CAP_METRICS_DIR` | `~/.codebuddy/.metrics/reports/` | 度量报告目录 |

> 本地 clone 不存在时：降级为仅用官网（web_fetch）参考，并提示用户可clone 以获得源码级复用。

## 触发规则

| 信号 | 行为 |
|:--|:--|
| `dc:`（技能名 `dev-comp` 也生效） | 进入 dev-comp，提示指定组件名 |
| `dc: {组件名}` / `dc: 开发 Menu` | 进入，开发指定组件 |
| `dc:status` / `dc:st` | 查看当前组件进度 |
| 仅输入 `dc:`（无后续） | 提示补充组件名 |
| `组件开发` / `开发 {X} 组件` / `完善 {X} 组件` / `补全 {X} 组件` | 进入 dev-comp |
| 仅提及组件但无开发意图（如"看看 Menu 怎么实现的"）| 不触发，普通对话 |

**优先级**：incident-triage（告警硬触发）> 用户显式 dev-flow 命令 > dev-comp > 普通对话。
**与 dev-flow 互斥**：用户显式用 `dev-flow` 命令时走 dev-flow；用 `dc:` / `dev-comp` 或组件开发意图时走本 skill。二者不同时激活。

## 6 阶段流程总览

```
阶段 0  接续/初始化   → 读/建精简工作上下文 + todo plan + 分阶段决策
阶段 1  准备          → 分支 + 建目录/配置 + 注册占位
阶段 2  组件本体      → 对照antdv/naive 源码开发（先搜索复用项目资产）
阶段 3  演示用例      → src/views/xxx/Index.vue + index.ts
阶段 4  文档          → docs 复用演示页 + 周边文档联动
阶段 5  验收收尾      → lint+type-check+浏览器对照 → devlog+metrics+knowledge → smart-commit
```

> 完整执行规范 → `read_file("references/flow.md")`

## 能力复用索引（软复用，零硬依赖 dev-flow）

| 能力 | 复用方式 | 何时用 | 详见 |
|:--|:--|:--|:--|
| 工作上下文 | 自建精简版（模板 40 行） | 阶段 0 建/接续 | `templates/working-context-lite.tpl.md` |
| plan | `todo_write` 工具 | 阶段 0 列计划 | — |
| 开发日志 | `use_skill('tech-doc')` | 阶段 5 收尾 | `references/capability-reuse.md` |
| 度量采集 | 自建精简 YAML | 阶段 5 收尾 | `templates/metrics-lite.tpl.yaml` |
| 知识沉淀 | `use_skill('knowledge-loop')` | 阶段 2 检索 / 阶段 5 沉淀 | `references/capability-reuse.md` |
| 提交 | `use_skill('smart-commit')` | 阶段 5 提交 | `references/capability-reuse.md` |

> ⚠️ 上述被调 skill 缺失时**优雅降级**：跳过该环节并一句话提示用户，不阻断主流程。

## 按需加载索引

| 场景 | 加载文件 |
|:--|:--|
| 执行任一阶段 | `references/flow.md` |
| 项目结构/注册链路 | `references/project-map.md` |
| 参考源路径 + antdv/naive 取舍 | `references/reference-sources.md` |
| 找可复用的项目已有资产 | `references/reusable-assets.md` |
| 注册/主题/SSR/周边文档 checklist | `references/checklists.md` |
| 如何软复用 dev-flow 能力 + 降级 | `references/capability-reuse.md` |

## 核心红线（继承项目规范）

- ❌ 禁止自动 `git commit`：commit message仅生成，用户明确选择才提交（用 smart-commit）
- ❌ commit 格式：`<type>: <description>`（**无 scope**，项目 commitlint scope-empty）
- ❌ 先搜索后编码：新增能力前先查项目已有资产（`references/reusable-assets.md`）
- ✅ 主题 light/dark 双份；链式访问用可选链 `?.`；禁 any；SSR 安全（禁裸用 window/document）
- ✅ 大组件分阶段交付（P1-Pn），避免半成品
- ✅ 验收标准：演示页与antdv/naive 真身并排 1:1 对照 + 浏览器实测
