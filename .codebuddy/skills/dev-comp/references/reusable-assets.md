# 项目可复用资产清单

> dev-comp 阶段 2 "先搜索后编码" 时加载。已有资产直接用，不重造。

## 动画

| 需求 | 已有 | 位置 |
|:--|:--|:--|
| 展开/收起高度动画 | Collapse 组件 | `components/collapse/Collapse.vue` |

> 使用方式：参考 Collapse 的 height + opacity Transition 方案，复用动画逻辑。

## 浮层定位

| 需求 | 已有 | 位置 |
|:--|:--|:--|
| 弹出浮层定位（Tooltip/Popover 等） | Tooltip 组件 | `components/tooltip/Tooltip.vue` |
| Popconfirm 确认气泡 | Popconfirm 组件 | `components/popconfirm/` |

## 主题系统

| 需求 | 已有 | 位置 |
|:--|:--|:--|
| 主题色注入（组件级） | useInject | `components/utils/index.ts`（第 752 行附近） |
| ConfigProvider 全局配置 | ConfigProvider | `components/configprovider/` |

> 使用方式：组件内 `const theme = useInject('ComponentName')` 获取主题配置，子组件通过 provide/inject 传递。

## 工具函数

| 函数 | 位置 | 用途 |
|:--|:--|:--|
| `useSlotsExist` | `components/utils/index.ts`（第 702 行附近） | 判断插槽是否存在 |
| `useResizeObserver` | `components/utils/index.ts`（第 631 行附近） | 监听元素尺寸变化 |
| `withInstall` | `components/utils/type.ts` | 组件安装器（withInstall） |

## 图标

| 来源 | 说明 |
|:--|:--|
| `@ant-design/icons-vue` | antdv 图标库，项目中已有依赖 |
| 自定义 VNode / 渲染函数 | 组件 icon prop 支持 VNode 或 render 函数 |

## 引用资产注意事项

- **使用前验证**：先用 `search_content` 确认函数/组件在当前代码中仍存在且接口未变
- **参考已有用法**：看其他组件如何使用该资产，保持调用风格一致
- **最小入侵**：只复用、不改造原资产代码；发现缺陷不在此需求中修
