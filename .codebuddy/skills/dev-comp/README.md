# dev-comp 组件库开发迭代工作流

> 面向 vue-amazing-ui 组件库的单组件开发迭代领域 SOP。本 README 为**人类阅读导航**，AI 运行时入口为 `SKILL.md`。

## 架构概览

```text
dev-comp 采用「轻量领域流程 + 软复用」架构（无程序化执行层，无门控脚本）：

L0 入口层    SKILL.md（触发规则 + 个人化配置 + 6 阶段总览）
              ↓
L1 流程层    references/flow.md（6 阶段详细执行手册）
              ↓
L2 参考层    references/（按需加载）
              ↓
L3 模板层    templates/（组件/演示/工作上下文/度量 骨架模板）

软复用层    use_skill('tech-doc')    → devlog
            use_skill('knowledge-loop') → 知识沉淀/检索
            use_skill('smart-commit') → 提交信息生成
```

**核心理念**：领域专注 + 能力软引用。不进入 dev-flow 状态机与门控，只借用其生态中**独立存在**的 skill 作为能力模块。大组件支持分阶段交付（P1-Pn），参考 Ant Design Vue 与 Naive UI（官网 + 本地 clone 源码）。

## 与 dev-flow 的关系

| 维度 | dev-flow | dev-comp |
|:--|:--|:--|
| 定位 | 通用跨项目开发工作流 | vue-amazing-ui 组件开发专项 |
| 流程复杂度 | 阶段 0 + 步骤 1~10 + 门控 + 脚本校验 | 6 阶段，无门控，无脚本 |
| 能力依赖 | 编排 10+ 关联 skill | 软复用 3 个独立 skill（tech-doc/knowledge-loop/smart-commit） |
| 对 dev-flow 依赖 | — | **零硬依赖**。删掉 dev-flow 不影响运行 |
| 共存 | 互斥激活。`dev-flow` 命令与 `dc:` 命令二选一 | 同左 |

## 流程总览

```text
用户输入 dc: / 开发 xxx 组件
  ↓
阶段 0  接续/初始化   → 读/建精简工作上下文 + todo plan + 分阶段决策
  ↓
阶段 1  准备          → 分支 + 建目录/配置 + 注册占位
  ↓
阶段 2  组件本体      → 对照 antdv/naive 源码开发（先搜索复用项目资产）
  ↓
阶段 3  演示用例      → src/views/xxx/Index.vue + index.ts
  ↓
阶段 4  文档          → docs 复用演示页 + 周边文档联动
  ↓
阶段 5  验收收尾      → lint+type-check+浏览器对照 → devlog+metrics+knowledge → commit
```

| 组件复杂度 | 策略 |
|:--|:--|
| 简单（单文件、API < 8） | 一次性走完 6 阶段 |
| 复杂（多子组件/递归/多模式） | **分阶段 P1-Pn**，每次只走一个 P |

## 目录结构

```text
dev-comp/
├── README.md                        # 本文件：人类阅读导航
├── SKILL.md                         # AI 运行时入口（触发 + 配置 + 6阶段总览 + 红线）
├── references/                      # 参考文档（按需加载）
│   ├── flow.md                      #   6 阶段详细执行规范
│   ├── project-map.md               #   项目结构地图（三件套 + 注册链路 + 脚本）
│   ├── reference-sources.md         #   antdv/naive 参考源 + API 对齐决策规则
│   ├── reusable-assets.md           #   项目可复用资产清单（动画/浮层/主题/utils）
│   ├── checklists.md                #   开发全链路 checklist（分支/注册/主题/SSR/验收）
│   └── capability-reuse.md          #   软复用 dev-flow 能力策略 + 降级
└── templates/                     # 骨架模板
    ├── component.tpl.vue            #   组件本体骨架
    ├── demo.tpl.vue                 #   演示页骨架（含并排对照结构）
    ├── working-context-lite.tpl.md  #   精简工作上下文模板（40 行）
    └── metrics-lite.tpl.yaml        #   精简度量报告模板
```

## 文件职责速查

| 文件 | 职责 | 谁读 | 何时读 |
|:--|:--|:--|:--|
| `SKILL.md` | 触发规则、个人化配置、6阶段总览、红线 | AI | 触发 `dc:` / `dev-comp` 时自动加载 |
| `references/flow.md` | 6 阶段详细执行手册 | AI | 执行任一阶段时加载 |
| `references/project-map.md` | 项目结构、注册链路、脚本、门禁 | AI | 阶段 1/3/4 |
| `references/reference-sources.md` | 参考源路径 + antdv/naive 取舍规则 | AI | 阶段 0/2 |
| `references/reusable-assets.md` | 项目可复用的动画/浮层/主题/utils | AI | 阶段 2（先搜索后编码） |
| `references/checklists.md` | 开发全链路检查清单 | AI | 阶段 1/2/4/5 |
| `references/capability-reuse.md` | 软复用策略 + 降级方案 | AI | 阶段 5（能力沉淀时） |
| `templates/*` | 组件/演示/上下文/度量 骨架模板 | AI | 建新文件时 |

## 关联 Skill 调用关系

```text
dev-comp 在以下环节调用独立 Skill（缺失则降级跳过，不阻断）：

阶段 2 ──→ knowledge-loop     （检索历史组件经验，可选）
阶段 5 ──→ tech-doc           （devlog 生成）
           knowledge-loop     （沉淀组件知识，可选）
           smart-commit       （Commit 信息生成）
```

## 关联数据目录

| 目录 | 用途 | 哪个阶段写入 |
|:--|:--|:--|
| `~/.codebuddy/working-context/` | 工作上下文（命名 `vaui-{组件}-{日期}.md`） | 阶段 0 创建，各阶段更新 |
| `~/.codebuddy/dev-logs/` | 开发日志（由 tech-doc 生成） | 阶段 5 |
| `~/.codebuddy/.metrics/reports/` | 度量报告（精简 YAML） | 阶段 5 |
| `~/.codebuddy/knowledge/projects/ui-components/` | 组件知识沉淀 | 阶段 5 |

## 个人化配置

换人换机时，只需修改 `SKILL.md` 顶部「个人化配置区」：

| 配置项 | 说明 |
|:--|:--|
| `PROJECT_ROOT` | vue-amazing-ui 项目根路径 |
| `REF_ANTDV_LOCAL` | Ant Design Vue 本地 clone 路径 |
| `REF_NAIVE_LOCAL` | Naive UI 本地 clone 路径 |

其余流程、checklist、模板均为项目通用，无需改动。

## 安装

```bash
# 复制 skill 目录到用户 skills 目录
cp -r dev-comp ~/.codebuddy/skills/

# 确保以下独立 skill 已安装（非强制，缺失时降级）
# - tech-doc（devlog 生成）
# - knowledge-loop（知识沉淀，可选）
# - smart-commit（提交信息生成）
```

## 触发命令

| 命令 | 说明 |
|:--|:--|
| `dc:` | 进入 dev-comp，提示指定组件名 |
| `dc: 开发 Menu 组件` | 进入，开发指定组件 |
| `dc: 完善 Table 组件` | 进入，完善已有组件 |
| `dc:status` / `dc:st` | 查看当前组件开发进度 |
| `dev-comp`（技能名直呼） | 进入，提示指定组件名 |
