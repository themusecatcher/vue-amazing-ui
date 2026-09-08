# 贡献指南 Contributing

感谢你对 Vue Amazing UI 的关注与贡献。为保持代码库整洁、协作顺畅，请在提交代码前阅读本指南。

## 目录

- [环境准备](#环境准备)
- [开发设计指南](#开发设计指南)
- [分支规范](#分支规范)
- [提交规范](#提交规范)
- [代码质量门禁](#代码质量门禁)
- [开发流程](#开发流程)

## 环境准备

```sh
# 克隆仓库
git clone https://github.com/themusecatcher/vue-amazing-ui.git
cd vue-amazing-ui

# 安装依赖（推荐 pnpm）
pnpm i

# 启动组件开发环境
pnpm dev

# 启动文档站
pnpm docs:dev
```

## 开发设计指南

在开始编写组件之前，建议先阅读以下设计实现文档。它们完整描述了组件库的**设计实现画像**——组织架构、各类规范与实现机制，是新增 / 修改组件的权威依据；组件的功能与使用说明请查阅官方文档站（`docs/`）：

| 文档 | 说明 |
| :--- | :--- |
| [`development/project-structure.md`](development/project-structure.md) | 组织架构与目录结构 |
| [`development/import-export.md`](development/import-export.md) | 导入导出规范 |
| [`development/component-design.md`](development/component-design.md) | 组件设计规范（含主题系统） |
| [`development/demo-doc-guide.md`](development/demo-doc-guide.md) | 演示与文档编写规范 |
| [`development/build-system.md`](development/build-system.md) | 构建产物体系（含测试） |

## 分支规范

### 命名格式

统一采用 `<type>/<描述>` 格式，`type` 与提交规范保持一致，描述使用**全小写 kebab-case**（短横线连接）。

| 类型 | 格式 | 说明 | 示例 |
| :--- | :--- | :--- | :--- |
| 新功能 / 新组件 | `feat/<名称>` | 开发新组件或新功能 | `feat/menu`、`feat/dropdown` |
| 缺陷修复 | `fix/<描述>` | 修复已知问题 | `fix/inputnumber-empty` |
| 重构 | `refactor/<范围>` | 不改变行为的代码重构 | `refactor/table-split` |
| 文档 | `docs/<范围>` | 仅文档改动 | `docs/menu-api` |
| 样式 | `style/<范围>` | 样式调整 | `style/button-hover` |
| 性能 | `perf/<范围>` | 性能优化 | `perf/table-scroll` |

> 命名一律使用全小写 kebab-case，例如 `feat/auto-complete` 而非 `feat/autoComplete`。

### 生命周期约定

为避免分支长期停滞、与主干严重分叉，请遵守：

1. **从最新 `main` 切出**：创建分支前先 `git checkout main && git pull`，确保基线最新。
2. **定期同步主干**：开发周期较长的分支，应定期将 `main` 合并/变基进来，避免落后过多导致合并冲突。
3. **合入后及时删除**：功能合并进 `main` 后，删除对应的本地与远程分支，保持分支列表整洁。

   ```sh
   git push origin --delete <branch-name>   # 删除远程分支
   git branch -d <branch-name>              # 删除本地分支
   ```

4. **不在共享分支直接提交**：`main`、`gh-pages` 等共享分支不接受直接提交，一律通过功能分支合并。

## 提交规范

提交信息遵循 [Conventional Commits](https://www.conventionalcommits.org/)，由 `commitlint` 自动校验（`.husky/commit-msg`）。

### 格式

```text
<type>: <description>
```

- **不使用 scope**，即只写 `<type>: ...` 而非 `<type>(<scope>): ...`（commitlint 通过 `scope-empty` 规则强制校验，带 scope 的提交会被拦截）。
- header 长度不超过 **120** 个字符。
- 描述应清晰说明改动内容，避免使用无信息量的占位描述（如 `update`）。

### 支持的 type

| type | 说明 |
| :--- | :--- |
| `feat` | 新增功能或组件 |
| `fix` | 修复缺陷 |
| `docs` | 文档变更 |
| `style` | 代码格式 / 样式调整（不影响逻辑） |
| `refactor` | 重构（既非新增功能也非修复缺陷） |
| `perf` | 性能优化 |
| `test` | 测试相关 |
| `chore` | 构建流程、工具链、配置等杂项 |
| `revert` | 回滚提交 |

### 示例

```text
feat: 新增 Menu 菜单组件
fix: 修复 InputNumber 空值未校验被置空的问题
docs: 更新 Menu 组件 API 文档
chore: 补齐 type-check 门禁并强化发布流程
```

## 代码质量门禁

项目通过 [husky](https://github.com/typicode/husky) 配置了三道 Git 钩子，请勿使用 `--no-verify` 跳过。

| 钩子 | 触发时机 | 执行内容 |
| :--- | :--- | :--- |
| `pre-commit` | `git commit` 前 | `lint-staged`：对暂存文件执行 Prettier 格式化与 ESLint 自动修复 |
| `commit-msg` | 输入提交信息后 | `commitlint`：校验提交信息格式 |
| `pre-push` | `git push` 前 | `type-check`：执行 `vue-tsc` 全量类型检查 |

### 常用检查命令

```sh
pnpm lint         # ESLint 检查并自动修复
pnpm lint:check   # ESLint 只读检查（不修改文件）
pnpm type-check   # 类型检查
pnpm check        # 聚合检查：lint:check + type-check
```

提交前建议先本地运行 `pnpm check`，确保通过后再推送。

## 开发流程

1. 从最新 `main` 切出符合命名规范的功能分支。
2. 开发组件 / 功能，同步补充 `docs/` 下对应的文档与演示。
3. 本地运行 `pnpm check` 确保 lint 与类型检查通过。
4. 按提交规范提交（钩子会自动校验）。
5. 推送分支并发起 Pull Request，描述改动内容。
6. 合入 `main` 后删除功能分支。
