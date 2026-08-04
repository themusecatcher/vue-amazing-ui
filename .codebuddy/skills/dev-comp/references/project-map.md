# 项目结构地图（vue-amazing-ui）

> dev-comp 执行阶段 1/3/4 时的项目结构权威参考。

## 组件三件套 + 注册链路

```
components/{组件名}/                # ① 组件本体
  ├─ {Xxx}.vue                # 单组件
  ├─ index.ts                           # withInstall + 类型导出
  └─ {子组件}/{Sub}.vue + index.ts      # 多子组件时（如 menu/menuitem）
components/components.ts                 # ← 手动追加导出（注册点A）
components/index.ts# 自动 install 循环（无需手改）

src/views/{组件名}/                      # ② 演示用例
  ├─ Index.vue                          # 演示页
  └─ index.ts                           # export default { title: '中文名' }（路由自动注册）
src/router/index.ts# import.meta.glob 自动扫描（无需手改）

docs/guide/components/{组件名}.md        # ③ vitepress 文档
docs 侧边栏配置                # ← 手动追加入口（注册点 B）
```

## 注册点真实写法（实证）

### 注册点 A：`components/components.ts`
```ts
export type { Props as XxxProps } from './xxx'
export { default as Xxx } from './xxx'
```

### 组件 `index.ts`（单组件，如 tabs）
```ts
import Xxx from './Xxx.vue'
export type { Props, Item } from './Xxx.vue'
import { withInstall } from '../utils/type'
export default withInstall(Xxx)
```

### 组件 `index.ts`（多子组件，如 menu 聚合层）
```ts
import Menu from './menu'
import MenuItem from './menuitem'
export type { MenuProps, ItemType, ... } from './menu'
export type { MenuItemProps } from './menuitem'
export { Menu, MenuItem }
```
子组件层 `menu/menu/index.ts`：
```ts
import Menu from './Menu.vue'
export type { Props as MenuProps, ItemType, ... } from './Menu.vue'
import { withInstall } from '../../utils/type'   // 注意层级 ../../
export default withInstall(Menu)
```

### 用例 `src/views/{组件名}/index.ts`
```ts
export default { title: '标签页' }   // title 为中文名，用于路由 meta + 侧边栏
```

## 自动化机制（无需手动维护）

| 机制 | 实现 | 含义 |
|:--|:--|:--|
| 全局注册 | `components/index.ts` 遍历 `components` 调`app.install` | 组件在 `components.ts` 导出即自动全局注册 |
| 路由生成 | `src/router/index.ts`用 `import.meta.glob('../views/**/index.ts')` | 建 `views/{名}/Index.vue`+`index.ts` 即自动生成路由 |
| 类型产物 | vite-plugin-dts |构建时自动生成 `es/index.d.ts` |

## 关键脚本（package.json）

| 脚本 | 用途 |
|:--|:--|
| `pnpm dev` | 启动演示（vite） |
| `pnpm docs:dev` | 启动文档（vitepress，端口 8000） |
| `pnpm lint:check` | ESLint 检查（不fix） |
| `pnpm type-check` | vue-tsc 类型检查（约 9s） |
| `pnpm check` | lint:check + type-check |

## 门禁

- **lint-staged**：commit 时对暂存文件跑 prettier + eslint --fix
- **commitlint**：`<type>: <description>`，**scope-empty**（禁止 scope）
- **pre-push**：跑 type-check
