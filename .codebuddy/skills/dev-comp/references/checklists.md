# dev-comp 开发 checklist

> 阶段 1/2/4/5 按需加载。覆盖组件开发全链路的检查项。

---

## 分支（阶段 1）

- [ ] 确认当前分支名：`git branch --show-current`
- [ ] 全新组件 → 从主干新建 `feat/{组件名}`，已有雏形 → 在既有分支续做
- [ ] 分支名遵循 `feat/` 或 `fix/` 前缀

## 注册同步（阶段 1）

- [ ] `components/{组件名}/index.ts`：`import { withInstall }` → `export default withInstall(Xxx)` + 类型导出
- [ ] `components/components.ts`：追加 `export type { Props as XxxProps }` + `export { default as Xxx }`
- [ ] 多子组件：外层 `index.ts` 聚合 `export { Menu, MenuItem }` + 导出所有子类型
- [ ] 确认无需手动修改 `components/index.ts`（自动 install 循环）和 `src/router/index.ts`（glob 自动扫描）
- [ ] withInstall 时的 `utils/type` import 路径层级：单层 `../utils/type`，双层 `../../utils/type`

## 主题样式（阶段 2）

- [ ] light 主题样式完整
- [ ] dark 主题样式完整（通过 `useInject` 或 CSS 变量适配）
- [ ] 颜色/间距使用项目 CSS 变量，不硬编码
- [ ] CSS scoped，缩进 2 空格，嵌套 ≤3 层

## SSR 安全（阶段 2）

- [ ] 组件内无裸用 `window` / `document` / `localStorage`
- [ ] 浏览器 API 放在 `onMounted` 内或加 `typeof window !== 'undefined'` 判断

## 对齐检查（阶段 2，新增）

- [ ] antdv 全部 demo（`{REF_ANTDV_LOCAL}/components/{组件名}/demo/*.vue`）已逐一读取
- [ ] 每个 antdv demo 在演示页中有对应用例（覆盖或标记暂不覆盖）
- [ ] API Props 对比清单已完成（逐字段对比默认值/类型/必填）
- [ ] 默认值与 antdv 一致（`mode`/`triggerSubMenuAction` 等）
- [ ] ItemType 接口字段名与 antdv 一致（如 Menu 的 `itemIcon` 非 `icon`）
- [ ] 关键行为对齐（openKeys 自动关闭 / 级联高亮 / hover delay）

## 演示用例（阶段 3）

- [ ] `src/views/{组件名}/Index.vue` + `index.ts`（`export default { title: '中文名' }`）
- [ ] 演示页与 antdv `<a-xxx>` 或 naive `<n-xxx>` 真身并排对照
- [ ] 覆盖：基础用法、各 props、各事件、禁用态、空数据、极值、主题切换

## 周边文档（阶段 4）

- [ ] `docs/guide/components/{组件名}.md`（复用演示页 script+template，加 API 表格）
- [ ] vitepress 侧边栏配置 `docs/.vitepress/config.ts` 新增组件入口
- [ ] `docs/guide/changelog.md` 新增变更记录
- [ ] `README.md` + `README.zh-CN.md` 组件清单更新（中英双份）
- [ ] `docs/index.md`（若有组件清单）

## 验收（阶段 5）

- [ ] `pnpm lint:check` EXIT 0
- [ ] `pnpm type-check` 无本组件错误
- [ ] **浏览器实测**：`pnpm dev` 与真身 1:1 对照，覆盖多实例/边界/交互/主题切换
- [ ] 控制台 0 error / 0 warning
- [ ] 调试代码已清理（console.log、临时样式）
- [ ] 后台端口已关闭
