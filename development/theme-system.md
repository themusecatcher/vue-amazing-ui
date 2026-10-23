# 主题系统 Theme System

> 本文档描述主题系统的**实现架构**，面向组件库贡献者与深度定制者。使用说明（种子、模式、组件级主色、作用域换肤、迁移对照）见文档站 [定制主题](../docs/guide/customize-theme.md) 与 [组件级令牌](../docs/guide/customize-theme.md#组件级令牌)；本页只保留「读者需要改库代码时才会用到」的内容。

## 一句话

> 你给几个颜色种子，库用纯函数算出 42 个语义 CSS 变量，写到某个 DOM 节点上；组件只读变量、不认 JS，靠 CSS 继承自动变色。

```text
配置面                                  库内部                              DOM                       组件
──────────────────────────────────────────────────────────────────────────────────────────────────────────
seed + mode  ──┐
               ├─→ derive(seed, mode) ─→ 42 个 --va-*  ─┐
components   ──┘         │                              ├─→ 写到作用域节点 ─→ CSS 继承 ─→ var(--va-*)
                         └─→ 组件令牌（--va-<comp>-*）─┘        · 包裹元素
                                                                 · <html>
                                                                 · 浮层根节点
```

关键点：**JS 只算一次、写一次，染色全在 CSS 引擎里完成**。

## 四层配置面

| 想改什么 | 用什么 | 粒度 |
| :-- | :-- | :-- |
| 品牌色、语义色、中性基调（整套换色） | `ConfigProvider` 的 `theme.seed` | 全局 |
| 浅色 / 暗色 / 跟随系统 | `theme.mode` | 全局 |
| 某个组件的主色（自动派生状态） | `theme.components.<组件>.primaryColor` | 组件组 |
| 某个组件的某个视觉面 | `--va-<组件>-*` 组件令牌 | 单点 |
| 单个实例的特殊色 | 组件 prop（如 `Button.color`）或 `style` | 实例 |

选择顺序建议：**先试 `seed`，再试 `components`，最后才用令牌**。越往后越局部，也越需要自己维护 hover / active 等状态。

## 一条流水线（以 `#1677ff` 为例）

1. 种子归一化：只接受不透明 `#rgb` / `#rrggbb`（`#rrggbbff` 会收敛为 6 位），非法值告警并回退默认；
2. 生成色阶：每个颜色用 `@ant-design/colors` 摊成 10 档；
3. 映射语义角色：常态 = 第 6 档、悬停 = 第 5 档、按下 = 第 7 档、浅底 = 第 1 档、描边 = 第 3 档；
4. 生成中性阶梯：文本用 `基准色 + alpha`，背景 / 边框用 `基准色 ± 明暗量`；
5. 组装 42 个变量（键集合由契约固定，构建期与单测双重断言）；
6. 写入作用域节点：包裹元素（默认）、`<html>`（`abstract: true`）或浮层根节点（Teleport 转发）；
7. CSS 继承 → 组件样式里的 `var(--va-*)` 解析为新值。

换主色时实际只变 13 个变量（主色 6 + info 3 + 链接 3 + 焦点环 1），其余 27 个连值都不变。

## 三张变量表

| 表 | 谁生成 | 放在哪 | 作用 |
| :-- | :-- | :-- | :-- |
| 静态默认表 | `build/gen-theme.ts`（构建期） | 随每份按需样式入口下发 | 首帧即正确、SSR 可用、零 JS 切暗色 |
| 运行时作用域表 | `ConfigProvider` | 包裹元素 / `<html>` / 浮层根节点 | 自定义种子与组件主色 |
| 组件令牌 | 注册表 + Provider 派生 | 与作用域表同节点 | 组件细粒度覆盖入口 |

静态表的形态：

```css
:root, [data-va-mode='light'] { /* 42 个浅色默认值 */ }
[data-va-mode='light'] { color-scheme: light; }
[data-va-mode='dark']  { /* 42 个暗色默认值 */ color-scheme: dark; }
```

浅色表挂两处：`:root` 服务无属性的默认页面，`[data-va-mode='light']` 让暗色页面里的嵌套浅色作用域能把颜色翻回来。

## 写在哪，管到哪

| 位置 | 影响范围 | 什么时候用 |
| :-- | :-- | :-- |
| `ConfigProvider` 包裹元素（`abstract: false`，默认） | 自身子树 | 局部换肤、SSR 首帧要正确 |
| `<html>`（`abstract: true`） | 整页，含 body 级链接与全部浮层 | 应用级主题 |
| 浮层根节点（自动转发） | 该弹层 | 由库内部处理，无需配置 |

两种形态的行为差异：

| | `abstract: false` | `abstract: true` |
| :-- | :-- | :-- |
| 是否产生 DOM | 是（默认 `div`） | 否 |
| 变量位置 | 包裹元素行内 | `<html>` 行内（挂载后写入） |
| 首帧 | 可直接序列化，首帧即自定义色 | 沿用静态默认表，挂载后变色 |
| 多实例 | 天然隔离 | 注册表仲裁，最后一个已配置实例写入 |
| 浮层 | 需要边界转发 | 直接继承，无需转发 |

## 浮层为什么要"转发"

`Modal` / `Dropdown` / `Message` 等被 `Teleport` 到 `body`：**DOM 搬家了，CSS 继承链没跟过去**。

因此 `Provider` 通过 `THEME_TELEPORT_KEY` 把当前作用域的令牌与模式下发给浮层，浮层在自己的根节点再内联一次。写在 `<html>` 上的 owner 不需要转发（浮层直接继承）。

转发只包含「当前作用域真实生效」的内容：

- 没有生效 `seed` 时不带全局令牌 —— 否则默认色表会被内联到浮层，覆盖宿主用纯 CSS 写在 `:root` 上的主题；
- 未显式配置 `mode` 时不下发 `data-va-mode` —— 让浮层继续继承 `<html>` 上的模式，而不是被强制成 `light`。

## 组件级主色怎么落地

```text
theme.components.Button.primaryColor = '#ff6900'
        │ deriveColorStates → base / hover / active / bg / border / solid
        ├─ 内部桥：--va-cp-button-primary-*（7 个，统一格式；除 Button / Menu 外的组件读它，Slider 另有 1 处聚焦边框）
        └─ 公开令牌：--va-button-primary-color 等（themeRole 映射；Button / Menu 只读它）
```

**两类变量是「同时写、组件二选一消费」，不是覆盖关系**：

| 组件组 | Provider 写什么 | 组件样式读什么 |
| :-- | :-- | :-- |
| Button / Menu | 桥 7 个 + 公开令牌 | 公开令牌（桥是冗余写入） |
| Slider | 桥 7 个 + 公开令牌 | 公开令牌 + 1 个桥（聚焦边框） |
| TextScroll / Table / Alert / Input / Textarea / Modal（有令牌无 `themeRole` 的 6 个） | 桥 7 个 | 桥；公开令牌由用户手写 |
| 其余 30 个组件 | 只写桥 | 桥 |

桥的冗余写入不会影响视觉：`var(a, b)` 只引用其中一个名字。也正因为 Slider 仍读桥，**不能**按「是否有 `themeRole`」一刀切裁剪桥。

- 组件配置**优先于 seed**：因为它写在同一个作用域节点上，而组件样式先读组件令牌；
- 只认识一个字段 `primaryColor`，不负责组件的背景 / 文字 / 尺寸；
- 39 个组件支持组件级主色，其中 9 个另有公开令牌（Button / Slider / Menu 的令牌带 `themeRole` 映射，其余 6 个由用户手写）；另有 Card / Drawer / Scrollbar 3 个有公开令牌但不支持组件级主色，公开令牌共 51 个（分属 12 个组件）。

## 优先级链

```text
组件实例 prop / style（行内）
  > 最近一层祖先上的组件令牌
    > theme.components（写在作用域节点）
      > seed 派生的全局变量
        > 静态默认表
```

同一个变量冲突时按普通 CSS 级联处理；`--va-button-primary-color` 与 `--va-primary-color` 之间的选择不是优先级，而是 `var(a, b)` 的回退顺序。

## 取色出口

- 组件样式：只消费 `--va-*`，禁止 JS 注入颜色；
- JS / canvas / SVG：用主入口公开的 `derive(seed, mode)`，与 `--va-*` 逐值一致；
- 焦点环的「等效半透明色」是私有实现（`theme/derive.ts` 的 `alphaOver`），不对外导出；旧的 `getColorPalettes` / `getAlphaColor` 已随 3.0.0 移除，守护脚本仍禁止在 `components/**` 中重新出现。

## 文件地图

| 想知道什么 | 看哪里 |
| :-- | :-- |
| 42 个变量与命名规则 | `components/theme/vars.ts` |
| 颜色怎么算 | `components/theme/derive.ts` |
| 组件令牌与映射 | `components/theme/component-vars.js` |
| 编排：作用域、样式、生命周期 | `components/config-provider/theme-scope.ts` |
| 主题结构、空值判定、组件键工具 | `components/config-provider/theme-config.ts` |
| 种子继承、42 个变量派生、组件主色展开 | `components/config-provider/use-theme-seed.ts` |
| `<html>` 写入、恢复与 owner 仲裁 | `components/config-provider/theme-global-writer.ts` |
| 浮层转发内容组装 | `components/config-provider/use-theme-teleport.ts` |
| 注入键与转发协议 | `components/config-provider/context.ts` |
| 系统配色偏好 | `components/config-provider/theme-mode.ts` |
| 静态表生成 | `build/gen-theme.ts`、`vite.config.ts` 的 `theme-css` 插件 |
| 架构守护 | `scripts/verify-theme.js` |

## 工具函数收口

- 公开工具只保留主入口白名单（`components/index.ts`），内部工具走 `components/utils/index.ts` barrel，不承诺稳定性；
- 颜色 / 主题相关的公开出口只有 `derive` 与主题类型；历史色板 / 透明度色工具已移除，避免与 `--va-*` 出现两套取色口径。
