# 参考源与 antdv/naive 取舍规则

> dev-comp 阶段 0/2 加载。定义参考源位置与"对齐谁"的决策规则。

## 参考源位置（见 SKILL.md 个人化配置区）

| 源 | GitHub | 本地 clone | 官网 |
|:--|:--|:--|:--|
| Ant Design Vue | `REF_ANTDV_GH` | `REF_ANTDV_LOCAL` | `REF_ANTDV_DOC` |
| Naive UI | `REF_NAIVE_GH` | `REF_NAIVE_LOCAL` | `REF_NAIVE_DOC` |

**使用优先级**：本地 clone 源码（读实现细节、可复用算法）> 官网文档（对齐 API/交互/示例）。
本地 clone 不存在 → 降级用 `web_fetch` 读官网，并提示用户可clone 获得源码级复用。

## 对齐谁？（主参考源决策）

| 场景 | 主参考 | 理由 |
|:--|:--|:--|
| 项目已有该组件的雏形且用了某库 API风格 | **跟随雏形** | 保持一致，最小改动（如 Menu 雏形用 antdv `items` 风格 → 对齐 antdv） |
| 全新组件，antdv 有对应组件 | **antdv 优先** | 项目整体更贴近 antdv 生态（依赖含 ant-design-vue、@ant-design/icons-vue） |
| antdv 无但 naive 有 | naive | — |
| 两库都有且差异大 | 询问用户 | 让用户定API 风格，不擅自决定 |

## API 风格

- antdv 组件多为**配置式（items 数组）+ 组件式（插槽）双模式**，本项目倾向对齐这种双模式
- 大组件可分阶段：先配置式（P1），再组件式插槽（P2）

## 源码定位技巧

- antdv 组件源码：`{REF_ANTDV_LOCAL}/components/{组件名}/`（含 `index.en-US.md` 是权威 API 文档）
- naive 组件源码：`{REF_NAIVE_LOCAL}/src/{组件名}/`
- 找API 定义、Props 类型、事件回调参数结构时，直接读源码的 types 文件最准

## Demo 源码定位

> **对齐范围必须包含 demo**：demo 定义了「用户如何感知和使用」这个组件，是演示页/文档用例的对齐基准。

- antdv demo：`{REF_ANTDV_LOCAL}/components/{组件名}/demo/`（每个 `.vue` 文件一个用例）
- naive demo：`{REF_NAIVE_LOCAL}/src/{组件名}/demos/`（enUS/zhCN 各一份）
- antdv 文档页（成品效果）：antdv 官网 `https://www.antdv.com/components/{组件名}-cn/`
- 对齐方式：先读 demo 源码理解数据和交互方式，再浏览器打开官网对照成品效果
- **每个 antdv demo 在演示页中至少有一条对应用例**（覆盖或显式标记暂不覆盖）

## 注意

- 参考库版本：antdv `^4.2.6`、naive `^2.44.0`（devDependencies），对齐时以此版本为准
- License：复用算法思路可以，禁止整段拷贝带版权声明的代码；改写为项目风格
