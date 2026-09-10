# Contributing

English | [中文](CONTRIBUTING.zh-CN.md)

Thanks for your interest in Vue Amazing UI. To keep the codebase clean and collaboration smooth, please read this guide before submitting code.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Design Implementation Guide](#design-implementation-guide)
- [Branch Convention](#branch-convention)
- [Commit Convention](#commit-convention)
- [Quality Gates](#quality-gates)
- [Development Workflow](#development-workflow)

## Prerequisites

```sh
# Clone the repository
git clone https://github.com/themusecatcher/vue-amazing-ui.git
cd vue-amazing-ui

# Install dependencies (pnpm is recommended)
pnpm i

# Start the component development environment
pnpm dev

# Start the docs site
pnpm docs:dev
```

## Design Implementation Guide

Before writing a component, it is recommended to read the design implementation documents below. They fully describe the **design implementation profile** of the component library — its structure, conventions, and mechanisms — and are the authoritative reference for adding or modifying components. For a component's features and usage, please refer to the official docs site (`docs/`):

| Document | Description |
| :--- | :--- |
| [`development/project-structure.md`](development/project-structure.md) | Project structure and directory layout |
| [`development/import-export.md`](development/import-export.md) | Import and export conventions |
| [`development/component-design.md`](development/component-design.md) | Component design conventions (including the theme system) |
| [`development/demo-doc-guide.md`](development/demo-doc-guide.md) | Demo and documentation writing conventions |
| [`development/build-system.md`](development/build-system.md) | Build artifacts (including testing) |

## Branch Convention

### Naming Format

Always use the `<type>/<description>` format. The `type` is consistent with the commit convention, and the description must be **all-lowercase kebab-case** (words joined by hyphens).

| Type | Format | Description | Example |
| :--- | :--- | :--- | :--- |
| New feature / component | `feat/<name>` | Develop a new component or feature | `feat/menu`, `feat/dropdown` |
| Bug fix | `fix/<description>` | Fix a known issue | `fix/inputnumber-empty` |
| Refactor | `refactor/<scope>` | Code refactoring without behavior change | `refactor/table-split` |
| Docs | `docs/<scope>` | Documentation-only changes | `docs/menu-api` |
| Style | `style/<scope>` | Style adjustments | `style/button-hover` |
| Performance | `perf/<scope>` | Performance optimization | `perf/table-scroll` |

> Always use all-lowercase kebab-case, for example `feat/auto-complete` instead of `feat/autoComplete`.

### Lifecycle Conventions

To avoid long-stalled branches and severe divergence from the mainline, please follow:

1. **Branch off the latest `main`**: run `git checkout main && git pull` before creating a branch to keep the baseline up to date.
2. **Sync with the mainline regularly**: for branches with a long development cycle, merge/rebase `main` in periodically to avoid falling too far behind and causing merge conflicts.
3. **Delete promptly after merging**: once a feature is merged into `main`, delete the corresponding local and remote branches to keep the branch list tidy.

   ```sh
   git push origin --delete <branch-name>   # delete the remote branch
   git branch -d <branch-name>              # delete the local branch
   ```

4. **Never commit directly to shared branches**: shared branches such as `main` and `gh-pages` do not accept direct commits — always merge through a feature branch.

## Commit Convention

Commit messages follow [Conventional Commits](https://www.conventionalcommits.org/) and are validated automatically by `commitlint` (`.husky/commit-msg`).

### Format

```text
<type>: <description>
```

- **No scope**, i.e. write `<type>: ...` instead of `<type>(<scope>): ...` (enforced by the `scope-empty` rule in commitlint; commits with a scope will be rejected).
- The header must not exceed **120** characters.
- The description should clearly state what changed; avoid placeholder descriptions that carry no information (e.g. `update`).

### Supported Types

| type | Description |
| :--- | :--- |
| `feat` | New feature or component |
| `fix` | Bug fix |
| `docs` | Documentation changes |
| `style` | Code formatting / style adjustments (no logic impact) |
| `refactor` | Refactoring (neither a new feature nor a bug fix) |
| `perf` | Performance optimization |
| `test` | Testing-related |
| `chore` | Build process, tooling, configuration and other chores |
| `revert` | Revert a commit |

### Examples

```text
feat: 新增 Menu 菜单组件
fix: 修复 InputNumber 空值未校验被置空的问题
docs: 更新 Menu 组件 API 文档
chore: 补齐 type-check 门禁并强化发布流程
```

## Quality Gates

The project configures three Git hooks via [husky](https://github.com/typicode/husky). Please do not skip them with `--no-verify`.

| Hook | Trigger | Action |
| :--- | :--- | :--- |
| `pre-commit` | before `git commit` | `lint-staged`: run Prettier formatting and ESLint auto-fix on staged files |
| `commit-msg` | after the commit message is entered | `commitlint`: validate the commit message format |
| `pre-push` | before `git push` | `type-check`: run a full `vue-tsc` type check |

### Common Check Commands

```sh
pnpm lint         # ESLint check with auto-fix
pnpm lint:check   # ESLint check only (does not modify files)
pnpm type-check   # Type checking
pnpm test         # Unit tests (vitest)
pnpm check        # Aggregate check: lint:check + type-check + test
```

Before committing, it is recommended to run `pnpm check` locally and make sure it passes before pushing.

## Development Workflow

1. Branch off the latest `main` with a feature branch that follows the naming convention.
2. Develop the component / feature, and add the corresponding docs and demos under `docs/`.
3. Run `pnpm check` locally to make sure lint and type checks pass.
4. Commit following the commit convention (the hooks validate automatically).
5. Push the branch and open a Pull Request describing your changes.
6. Delete the feature branch after it is merged into `main`.
