# vue-amazing-ui 开发指引

## 组件开发

开发或完善组件时，请参考 `.codebuddy/skills/dev-comp/` 下的完整 SOP：

**核心流程（6 阶段）**：
1. 接续/初始化 — 读/建工作上下文，判断是否分阶段交付
2. 准备 — 分支 + 目录 + 组件注册占位
3. 组件本体 — 对照 Ant Design Vue / Naive UI 源码开发，先搜索复用项目已有资产
4. 演示用例 — `src/views/{组件}/Index.vue`，与 antdv/naive 真身并排对照
5. 文档 — `docs/guide/components/{组件}.md`，复用演示页内容；更新周边文档
6. 验收收尾 — lint + type-check + 浏览器实测，生成 devlog/度量/知识沉淀，生成 commit

**参考源**：
| 源 | GitHub | 官网 |
|:--|:--|:--|
| Ant Design Vue | https://github.com/vueComponent/ant-design-vue | https://www.antdv.com/components/overview-cn/ |
| Naive UI | https://github.com/tusen-ai/naive-ui | https://www.naiveui.com/zh-CN/os-theme/docs/introduction |

**红线**：
- 主题 light/dark 双份；链式访问用 `?.`；禁 `any`；SSR 安全
- 大组件必须分阶段交付（P1-Pn），避免半成品
- commit 格式 `<type>: <description>`（无 scope）
