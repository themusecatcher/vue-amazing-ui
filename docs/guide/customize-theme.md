---
description: '通过 ConfigProvider 的 7 个颜色种子定制主题，默认主题色为 #1677ff'
---

# 定制主题

<GlobalElement />

`Vue Amazing UI` 的主题在**颜色维度有四层配置面**：`7` 个颜色种子（改整套）→ 组件级主色 `theme.components`（改某个组件的整套主色）→ 全局语义变量 `--va-*`（改某个作用域）→ [组件令牌](#组件级令牌与整组覆盖)（改单个视觉面）；此外还有模式维度（`theme.mode`）与组件实例自身的 `prop` / `style`（见 [ConfigProvider 的配置面](/guide/components/config-provider.html#配置面-从全局到实例)）。默认颜色全部由派生函数按种子计算，组件样式只消费语义变量 `--va-*`，因此改一个种子，常态 / 悬停 / 按下 / 浅底 / 描边会同步变化。

<br/>

派生规则：每个种子色先摊成 `10` 级色阶（第 `1` 档最浅、第 `10` 档最深），再按固定档位映射语义角色 —— 浅底取第 `1` 档、描边第 `3` 档、链接悬停第 `4` 档、悬停第 `5` 档、常态与主色文字第 `6` 档、按下第 `7` 档。暗色的色阶方向相反，悬停 / 按下改取第 `7` / `5` 档（链接悬停两模式共用悬停档），常态与主色文字仍取第 `6` 档。

<br/>

默认主题色为 <Tag :bordered="false" color="#1677ff">#1677ff</Tag>，无需任何配置。

> 本页说明概念、派生规则与变量清单；可交互演示与 API 见 [ConfigProvider](/guide/components/config-provider.html)。

## 术语说明：种子 / 派生 / 变量 / 令牌

| 术语 | 定义 | 对应代码 |
| :-- | :-- | :-- |
| 种子（`seed`） | 一整套色阶的**起点色**，共 `7` 个 | `theme.seed.primary = '#1677ff'` |
| 派生 | 由起点色**计算**出一整组深浅（常态 / 悬停 / 按下 / 浅底 / 描边） | `derive(seed, mode)`，库内部完成 |
| 变量（`--va-*`） | 派生结果落地为 `CSS` 变量，组件只读取变量 | `--va-primary-color` 等 `42` 个 |
| 令牌（`--va-<组件>-*`） | 组件内部细节的**公开变量名**，用于单点覆盖 | `--va-slider-handle-shadow-color` |

**核心结论：给定 `7` 个种子，`42` 个变量由库派生，组件只消费变量；因此换肤不重建组件，也不产生运行时开销。**

## 主题模型：种子 → 派生 → 变量

_本节先给出派生模型，下文所有用法都基于它：**种子 → 派生 → `42` 个 `CSS` 变量 → 组件只读变量**。_

```text
seed + mode ──┐
              ├─→ derive(seed, mode) ─→ 42 个 --va-* ─┐
components ───┘         │                            ├─→ 写到作用域节点 ─→ CSS 继承 ─→ var(--va-*)
                        └─→ 组件令牌 --va-<comp>-* ─┘     · 包裹元素 / <html> / 浮层根节点
```

关键点：**`JS` 只算一次、写一次，染色全在 `CSS` 引擎里完成**。换主色时实际只变 `15` 个变量（主色 `6` + `info` `3` + 链接 `3` + 焦点环 `1` + 品牌色暗底 `2`），其余 `27` 个连值都不变；暗色不是第二套种子，而是 `derive` 的另一个入参。

### 作用域与载体

| 载体 | 影响范围 | 适用场景 |
| :-- | :-- | :-- |
| `ConfigProvider` 包裹元素（`abstract: false`，默认） | 自身子树 | 局部换肤；`SSR` 首帧即可序列化 |
| `<html>`（`abstract: true`） | 整页，含页面链接与全部浮层 | 应用级主题，最外层传一次 |
| 浮层根节点（库自动转发） | 该弹层 | 无需配置，作用域内的弹窗 / 下拉自动跟随 |
| 任意祖先选择器上的 `--va-*` | 该子树 | 只改某个变量或某个组件令牌 |

### 优先级链

```text
组件实例 prop / style（行内）
  > 最近一层祖先上的组件令牌
    > theme.components（写在作用域节点）
      > seed 派生的全局变量
        > 静态默认表
```

同一个变量冲突时按普通 `CSS` 级联处理；`--va-button-primary-color` 与 `--va-primary-color` 之间不是优先级，而是 `var(a, b)` 的回退顺序。

### 排查清单：颜色没生效

| 现象 | 先查 |
| :-- | :-- |
| 只有这一个组件不对 | 是否被实例 `style` / `color` `prop` 等更高优先级覆盖 |
| 悬停或按下跳回默认色 | 只覆盖了常态，需整组覆盖（常态 / 悬停 / 按下） |
| 弹窗 / 下拉没跟随 | 作用域模式下是否在 `Provider` 子树内；应用级主题是否用了 `abstract: true` |
| 暗色只变了一半 | 纯 `CSS` 切暗色时 `data-va-mode` 必须写在实际作用域节点上 |
| 覆盖了组件令牌但无效 | 该视觉面是否已公开（见[组件级令牌](#组件级令牌与整组覆盖)），是否写在 `<style>` 声明而非消费处 |
| 自定义 `SVG` 不变色 | `fill` 是 `presentation attribute`，不解析 `var()`，请写进 `style` |

> 构建期静态表、三张变量表、内部桥与公开令牌的双写约定、`Teleport` 转发协议、`verify:theme` 守护等实现细节，属于贡献者文档，见仓库 `development/theme-system.md`；面向使用者的结论已全部收在本页。

## 颜色种子：seed

_修改种子后的联动效果：[种子换色](/guide/components/config-provider.html#种子换色-全组件联动)、[语义种子](/guide/components/config-provider.html#语义种子-success-warning-error-info)_

| 种子 | 默认值 | 说明 |
| :-- | :-- | :-- |
| `primary` | `#1677ff` | 品牌主色 |
| `success` | `#52c41a` | 成功色 |
| `warning` | `#faad14` | 警告色 |
| `error` | `#ff4d4f` | 错误 / 危险色 |
| `info` | 跟随 `primary` | 信息色；未传时复用主色的三件套 |
| `neutralText` | `#000000` | 中性文本基准（透明度阶梯的叠加色） |
| `neutralBg` | `#ffffff` | 中性背景基准（显式传入时两个模式共用） |

种子只接受**不透明**的 `#rgb` / `#rrggbb`（`#rrggbbff` 会收敛为 `6` 位）；半透明（如 `#1677ff80`）会被判为非法并在开发环境告警、回退该字段默认值，不会中断其余字段的派生 —— 否则色阶基色会变成半透明，按钮底色与文字对比度全部失真。

## 组件级主色：theme.components

_只覆盖某个组件的主题色，其余组件仍用全局种子；组件配置优先于 `seed`_

旧版 `theme.Button.primaryColor` 的能力由 `theme.components` 承接：这里只放**通用主色**，组件内部的细分令牌（如 `Slider` 的 `rail` / `tooltip`、`Button` 的 `ripple`）仍是 `CSS` 变量、不在 `components` 配置面里，需要时用[组件级令牌](#组件级令牌与整组覆盖)覆盖。

```vue
<script setup lang="ts">
import type { ConfigProviderTheme } from 'vue-amazing-ui'
const theme: ConfigProviderTheme = {
  seed: { primary: '#1677ff' },
  components: {
    Button: { primaryColor: '#18a058' },
    Slider: { primaryColor: '#18a058' }
  }
}
</script>
<template>
  <ConfigProvider :theme="theme">
    <Button type="primary">Button 使用组件主色</Button>
    <Slider :value="40" />
  </ConfigProvider>
</template>
```

- 组件配置优先于 `seed`：`Button` 用 `#18a058` 派生，其余组件仍用 `#1677ff`；
- 组件主色与 `seed` 共用同一校验口径：接受 `#rgb` / `#rrggbb` / `#rrggbbff`（`alpha` 必须为 `ff`），非法值告警并忽略该组件配置；
- 当前有 `39` 个组件接入了组件级主色（完整清单见[组件级令牌](#组件级令牌与整组覆盖)），覆盖对外暴露的主色使用点；组合组件内的子组件与派生组件（如 `DropdownButton` 的分割线）跟随宿主组件的令牌，不单独配置。未接入的组件（如 `Dropdown`）写入键名会在开发环境告警、不会静默生效，需要时用组件令牌或嵌套作用域；
- 运行期移除某个组件的配置（整体替换 `theme`，或删掉 `components.Button`）会回落到 `seed`；
- 组件配置写在 `ConfigProvider` 的作用域节点上（`abstract: false` 写包裹元素，`abstract: true` 写 `<html>`），优先级高于 `seed` 与外层祖先的 `--va-primary-*`。`Button` / `Slider` / `Menu` 仍可在更近的元素上覆盖公开组件令牌；其余组件要再覆盖时，请用更内层的 `ConfigProvider` 重新配置该组件；
- 组件配置沿 `DOM` 继承：外层设置的 `components.Button` 会继续作用于内层；内层只改 `seed` 不会把它重置，需要重置时在内层显式设置该组件的 `primaryColor`；
- 组件主色按 `Provider` 解析出的 `mode` 派生；如果页面是用纯 `CSS` `data-va-mode` 切暗色、而 `Provider` 没有 `mode`，请补传 `mode`，否则组件主色会按浅色色阶派生；
- 组件级主色只影响该组件**自身**的主色使用点；组合组件内的子组件（如 `InputSearch` 内的 `Input`、`Popconfirm` 内的 `Button`）按子组件自己的 `theme.components` 配置，需要时分别配置；
- `abstract: true` 时组件配置要和 `seed` / `mode` 放在同一个 `Provider` 上；只有组件配置时请用 `abstract: false`，否则它不参与 `<html>` 写入，开发环境会告警；
- 配置 `Button` / `Slider` / `Menu` 时，`Provider` 会同时写出内部桥与公开令牌（同一份派生结果的两套名字），组件样式只读其中一套；两种入口最终落到同一个变量，实现细节见仓库 `development/theme-system.md` 的「组件级主色怎么落地」；
- 在线演示：[组件级主色](/guide/components/config-provider.html#组件级主色-theme-components)。

## 运行期切换：响应式 theme

_修改种子即可，推荐用 `computed` 派生；整体替换 `theme` 对象或就地改写 `seed` 字段都会生效_

```vue
<!-- App.vue -->
<script setup lang="ts">
import { computed, ref } from 'vue'
import type { ConfigProviderTheme } from 'vue-amazing-ui'
const primary = ref<string>('#ff6900')
const theme = computed<ConfigProviderTheme>(() => ({
  seed: { primary: primary.value }
}))
</script>
<template>
  <!-- 应用级主题：显式 abstract=true，变量写到 <html>，浮层与页面链接一并跟随 -->
  <ConfigProvider :abstract="true" :theme="theme">
    <RouterView />
  </ConfigProvider>
</template>
```

- 在线演示：[运行期切换主题](/guide/components/config-provider.html#运行期切换-响应式-theme)。

## 明暗模式：light / dark / auto

_`mode` 是派生函数的入参，不是第二套种子；`dark` 与 `light` 共用同一组种子_

```vue
<script setup lang="ts">
import { ref } from 'vue'
import type { ConfigProviderTheme, ThemeMode } from 'vue-amazing-ui'
const mode = ref<ThemeMode>('light')
const theme = ref<ConfigProviderTheme>({ mode: mode.value })
</script>
<template>
  <ConfigProvider :abstract="true" :theme="theme">
    <RouterView />
  </ConfigProvider>
</template>
```

- `mode="light" | "dark"`：显式指定；
- `mode="auto"`：跟随系统 `prefers-color-scheme`，变化时自动重写变量，卸载后解除监听；
- 未传 `mode`：沿用外层作用域（最外层为浅色）；
- 在线演示：[明暗模式切换](/guide/components/config-provider.html#明暗模式-light-dark-auto)。

最外层只切 `mode` 而未传 `seed`（也没有可继承的种子）时，`Provider` 不会写任何变量，而是把 `data-va-mode` 写到作用域节点上，由静态默认表接管 —— 因此切换暗色是纯 `CSS` 行为，零样式重建。

暗色表同时输出 `color-scheme: dark`（浅色表对应的 `[data-va-mode='light']` 输出 `color-scheme: light`），原生滚动条、表单控件与默认背景会随模式切换。

::: tip `mode="auto"` 在 SSR 下的首帧
服务端拿不到 `prefers-color-scheme`，此时下发任何模式都会和客户端首次渲染不一致（hydration mismatch）。因此 `abstract: false` + `mode="auto"` 时，首帧不下发变量与 `data-va-mode`，由客户端挂载后补写；服务端首帧会用静态默认表（浅色）。需要首帧即暗色时，请在 SSR 侧显式传 `mode="dark"`。

默认的 `abstract: false` 会把变量序列化进包裹元素，`SSR` 首帧即正确；`abstract: true` 不产出可序列化的变量（变量在客户端挂载后写 `<html>`），首帧沿用静态默认表。
:::

## 作用域换肤：嵌套 ConfigProvider

_主题沿 `DOM` 级联：在某个区域外层再包一个 `ConfigProvider`，换肤只作用于该子树_

```vue
<template>
  <ConfigProvider :theme="{ seed: { primary: '#1677ff' } }">
    <Button type="primary">外层主色</Button>
    <ConfigProvider :abstract="false" :theme="{ seed: { primary: '#18a058' } }">
      <Button type="primary">子树主色</Button>
    </ConfigProvider>
  </ConfigProvider>
</template>
```

- 默认 `abstract: false`：实例渲染包裹元素，变量与 `data-va-mode` 写在该元素上，只作用于自身子树，`SSR` 首帧可直接序列化；
- `Teleport` 到 `body` 的浮层（弹窗 / 下拉 / 消息等）由**边界转发**补齐：浮层根节点带上当前作用域的令牌与模式，因此作用域内的浮层也跟随，不会退回静态默认表；
- 需要页面级生效（主题化 `body` 级链接、body 背景等）时，在最外层传 `:abstract="true"`，由它把变量写到 `<html>`；
- 「`<html>` 写入者」按**是否配置了全局主题域**（种子或模式）判定：只配置 `theme.components` 的实例不参与写入权仲裁（`abstract: true` 时会告警，应用级组件配置请与 `seed` / `mode` 同层）；未传 `theme`（或传空对象）的 `ConfigProvider` 不占用该名额，因此应用根部放一个空主题实例，不会让页面里的主题实例失效；
- 嵌套实例未显式传 `mode` 时继承外层模式（暗色区域内的子作用域不会派生出浅色变量）；
- 嵌套实例未显式传 `seed` 时继承外层种子（「外层换品牌色 + 内层只切暗色」不会退回默认蓝）；传了则**整体替换**，不做逐字段合并；
- 组件级配置写在同一个作用域节点上：内层 `Provider` 的 `theme.components` 覆盖外层；宿主要在组件配置之上再覆盖，请写在更靠近组件的元素上，或用组件实例 `prop`；
- 嵌套实例若显式传 `abstract: true`（无包裹元素），没有可承载变量的节点，只能随外层生效，开发环境会告警；
- 作用域标记在组件 `setup` 时确定：运行期给父级增删主题不会改变已挂载子级的判定（例如父级随后移除主题，子级不会接管 `<html>`）。需要动态切换时请重新挂载子树，或改用 `abstract: false` 的分层作用域；
- 在最外层只切 `mode`、且没有可继承的种子时，`Provider` 不写任何变量，只写 `data-va-mode`：静态表已按模式声明全量变量（含 `[data-va-mode='light']` 回环），宿主对 `:root` 单变量的覆盖不会被遮蔽；
- 在线演示：[作用域换肤](/guide/components/config-provider.html#作用域换肤-嵌套-configprovider)。

## 单变量覆盖：`--va-*`

_`--va-*` 是公开契约，宿主可直接在任意作用域覆盖_

```css
.my-panel {
  --va-primary-color: #ff6900;
  --va-primary-color-hover: #d95a00;
  --va-primary-color-active: #b34b00;
}
```

::: warning
只覆盖 `--va-primary-color` 而不覆盖 `-hover` / `-active`，会出现「常态变了、悬停没变」。换色应通过 `ConfigProvider.seed` 派生整套；只想改某个组件时用 `theme.components.<Component>.primaryColor`；或在同一作用域同时覆盖完整状态变量。
:::

## 颜色变量清单：42 个 `--va-*`

_共 `42` 个；新增变量必须同时满足「不是现有变量的函数」与「至少有一个组件消费」_

| 分组 | 变量 |
| :-- | :-- |
| 主色 | `--va-primary-color` / `-hover` / `-active`；`--va-primary-bg-color` / `--va-primary-border-color` / `--va-primary-text-color` |
| 语义色 | `--va-{success,warning,error,info}-color` / `-bg-color` / `-border-color` |
| 文本 | `--va-text-color-1` / `-2` / `-3` / `--va-text-color-solid` / `--va-text-color-disabled` |
| 背景 | `--va-bg-container-color` / `--va-bg-elevated-color` / `--va-bg-layout-color` / `--va-bg-spotlight-color` / `--va-bg-brand-dark-color` / `--va-bg-brand-dark-deep-color` |
| 边框 | `--va-border-color` / `--va-border-split-color` |
| 填充 | `--va-fill-color-1` / `--va-fill-color-2` / `--va-fill-color-3` / `--va-fill-color-4` |
| 阴影 | `--va-shadow-color` / `--va-focus-shadow` / `--va-popup-shadow` |
| 遮罩 | `--va-mask-color` |
| 链接 | `--va-link-color` / `-hover` / `-active` |

- `--va-primary-text-color` / `--va-link-*` 与主色同值，**不做对比度改写**；`--va-primary-text-color` 的消费面是「主色文字」场景（`Menu` 选中项、`Tabs` 激活页签、`Pagination` 当前页），单独覆盖它可以把「色块」与「文字」的取色拉开；
- `--va-text-color-solid` 是**实色底（彩色底 / 黑色遮罩）上的文字色**，两种模式恒为白；按钮主色底、`Badge` 计数、`Avatar`、图片预览的白色 `chrome` 都取它；
- `--va-bg-elevated-color` 是浮层底（浅色 `#ffffff` / 暗色 `#1f1f1f`）：暗色下它比 `--va-bg-container-color` 提亮一档，`Modal` / `Drawer` / `Message` / `Notification` / `Dialog` / `Popover` / `Popconfirm` / `Dropdown` / `Select` 面板 / 日期面板 / `ColorPicker` 面板都取它，否则浮层与页面同色、层级无法分辨；
- `--va-bg-spotlight-color` 是反色浮层底（浅色 `rgba(0,0,0,.85)` / 暗色 `#424242`），`Tooltip` 默认取它；
- `--va-bg-brand-dark-color` / `--va-bg-brand-dark-deep-color` 是**品牌色暗底**（默认主色下 `#001129` / `#000a17`）：取主色的色相与饱和度、亮度压到 `8%` / `4.5%`，两个模式取值相同。`Menu` 的 `theme="dark"` 皮肤取它们做根列表 / 浮层面板与内联子菜单的底色，因此**换主题色时深色皮肤跟着变色相**；配置了 `theme.components.Menu.primaryColor` 时按该组件主色重新派生（优先于 `seed`）；是否启用这套皮肤仍只由 `theme` 属性决定，与 `data-va-mode` 无关；
- `--va-mask-color` 两模式固定 `rgba(0, 0, 0, 0.45)`，`Modal` / `Drawer` / 图片预览的遮罩都取它（遮罩不跟随正文色，否则暗色下会变成白色蒙层）；
- `--va-fill-color-3` 是最强的一档中性叠加（浅色 `rgba(0,0,0,.15)` / 暗色 `rgba(255,255,255,.18)`），`Watermark` 的默认水印色取它，因此暗色下自动变成半透明白；显式传 `textStyle.color` 时以传入值为准；
- `--va-fill-color-4` 是最淡的一档中性叠加（浅色 `rgba(0,0,0,.02)` / 暗色 `rgba(255,255,255,.04)`），用于默认标签底、`Result` 内容区底纹、表格展开行；
- 编号 `1`~`4` 只表示档位，不代表强度顺序（`3` 最强、`4` 最淡）；
- 阴影变量是完整 `box-shadow` 值，直接整体赋值即可；
- `--va-shadow-color` 是方向性 / 局部阴影的基色（浅色极淡黑、暗色加深）；**不要**拿 `--va-fill-color-2` 当阴影色，它在暗色下是白色，会形成光晕；
- 例外是**落在自身遮罩上的面板阴影**（如 `Drawer` 的四向面板）：遮罩在暗色下已是 `rgba(0,0,0,.45)` 的深色叠加，再用加深的基色会在面板与遮罩交界处叠出一条黑边，这类阴影改用固定 `rgba(0,0,0,.08)` 基色。

::: tip 关于可读性
系统不替品牌色兜底。如果主色偏浅（如黄色、亮青），主色文字与主色按钮上的白字对比度会不足 —— 这时应当**换一个更深的品牌色**（或单独覆盖 `--va-primary-text-color` / `--va-text-color-solid`），而不是期待主题系统自动修正。
:::

## 脚本取色：derive

_组件样式只读 `CSS` 变量；需要在 `JS` / `canvas` / `SVG` 里拿到同一份色值时，用主入口导出的 `derive`_

```ts
import { derive } from 'vue-amazing-ui'
import type { ThemeVars } from 'vue-amazing-ui'

// 与 <ConfigProvider :theme="{ seed, mode }"> 写出的 42 个变量逐值一致
const vars: ThemeVars = derive({ primary: '#18a058' }, 'dark')
vars['--va-primary-color'] // => '#178b4e'
```

- `derive(seed?, mode?)`：`seed` 为 `ThemeSeed`（未传的字段取默认值），`mode` 为已解析的 `'light'` / `'dark'`（缺省 `'light'`）；
- 返回 `ThemeVars`（42 个 `--va-*` 的只读快照，键名见上一节清单），`ThemeSnapshot` 是它的只读别名；结果带缓存，同一组输入返回同一对象；
- 需要 `theme.mode = 'auto'` 的语义时，请先在业务侧把 `auto` 解析成 `light` / `dark` 再传入 —— `derive` 只接受已解析的模式（`ResolvedMode`）；
- 其它主题出口：`DEFAULT_PRIMARY` / `DEFAULT_SEEDS`（默认主色与默认种子）、`THEME_VAR_NAMES`（变量名清单）、`MODE_ATTRIBUTE`（`data-va-mode` 属性名）；
- 旧版 `getColorPalettes` / `getAlphaColor` 已移除：色阶与透明度色都改由 `derive` 的返回值和 `--va-*` 承担，避免出现两套取色口径。

## 组件级令牌与整组覆盖

_只想改某一个组件时（例如「主色按钮变绿、链接仍是品牌蓝」），用 `--va-<组件>-*`；下面是完整清单与覆盖约定_

- 与全局令牌一样是继承的 `CSS` 变量，写在任意祖先选择器上即生效，不需要碰库内部类名；
- 只覆盖常态会出现「悬停跳回默认色」，请整组覆盖（常态 / 悬停 / 按下）；底色类令牌要同时看前景色（如滑动输入条的气泡）；
- 令牌按「高频 + 可覆盖」逐步扩展，不追求组件全覆盖：只有当用户能在自己的选择器上覆盖、且确实有「只改这个组件」的场景时，才会公开；
- 在线演示：[组件令牌覆盖](/guide/components/config-provider.html#组件令牌-单组件细节覆盖)。

<!--@include: ./parts/component-vars.md-->

## 暗色覆盖范围：固定色值

_`mode="dark"` 覆盖所有消费 `--va-*` 的样式；下列颜色按设计固定，不随明暗切换_

- `Tag` 的预设色板（`pink` / `red` / `blue` 等 `13` 色）按模式声明为组件继承变量（`--tag-*`，组件自有资产，不属于 `--va-*` 契约）：嵌套作用域与带 `data-va-mode` 的浮层都取最近作用域的值，不再是“暗色页面里永远走暗色板”；
- `Badge` / `Result` 的自定义色板：浅色值固定，暗色另有一套按暗色阶梯重算的覆盖；语义状态（`success` / `processing` / `error` / `warning`）与 `Timeline` 的圆点直接取 `--va-*`，随模式切换；
- 深色 `Sider`：本身就是一套独立预设皮肤，改主题不应重定义它；
- `theme="dark"` 的 `Menu`：皮肤仍是一套独立预设（是否启用只由 `theme` 属性决定，不随 `data-va-mode` 切换），但三个表面色的默认值由主色派生（`--va-bg-brand-dark-color` / `--va-bg-brand-dark-deep-color`），换主色时同步换色相；需要让它跟随明暗模式或与页面容器同色时，把 `--va-menu-background` / `--va-menu-popup-background` / `--va-menu-inline-submenu-background` 分别指向 `--va-bg-container-color` / `--va-bg-elevated-color` / `--va-fill-color-1`；
- `Image` 预览与 `Video` 播放器的固定 `chrome`（深色底 + 白色图标）；
- 各类中性投影（`box-shadow` 中的黑色阴影）；
- `Watermark` 的水印颜色默认取 `--va-fill-color-3`（随模式变），只有显式传 `textStyle.color` 时才脱离主题。

::: warning 自定义 SVG 不要写 `fill="var(--va-*)"`
SVG 的 presentation attribute（`fill` / `stroke` / `stop-color`）不解析 CSS 变量，写上去会被静默忽略并退回默认色。请写成 `style="fill: var(--va-fill-color-2)"` 或用 CSS 类绑定，`pnpm verify:theme` 会对该写法直接报错。
:::

## 迁移：旧版主题 API

_旧版 `theme.common.primaryColor` / `theme.Button.primaryColor` 已改为 `seed` / `components`；`abstract` 默认值与被移除的工具函数 / 私有变量见下方逐条_

```diff
- <ConfigProvider :theme="{ common: { primaryColor: '#ff6900' } }">
+ <ConfigProvider :theme="{ seed: { primary: '#ff6900' } }">

- <ConfigProvider :theme="{ Button: { primaryColor: '#18a058' } }">
+ <ConfigProvider :theme="{ components: { Button: { primaryColor: '#18a058' } } }">
```

- 组件级主色（`theme.Button.primaryColor`）改为 `theme.components.Button.primaryColor`，只覆盖通用主色；更细的部件颜色用[组件级令牌](#组件级令牌与整组覆盖)或在子树外层包一个 `ConfigProvider` 换肤；
- `abstract` 默认值由 `true` 改为 `false`：不写 `abstract` 时实例会渲染一层包裹元素（`tag` 可改为 `span` 等行内元素），主题只作用于自身子树；需要页面级主题（`Teleport` 浮层、页面链接色）时在最外层显式传 `:abstract="true"`，嵌套层保持默认；
- 旧版由 `JS` 注入的 `--<组件名>-primary-color` 一类主题对象已移除：组件样式改为只消费 `--va-*`，配置 `theme.components` 时由 `ConfigProvider` 在作用域节点写入内部桥变量（实现细节，不需要手工覆盖）；曾用这些变量覆盖配色的样式需改为 `--va-<组件名>-*` 令牌；
- 需要单独调某个组件的配色时，用 [组件级令牌](#组件级令牌与整组覆盖) 的 `--va-<组件>-*`：它是 `CSS` 侧的公开名（不是旧版由 `JS` 注入的主题对象），组件私有变量仍不对外承诺；
- 取色改用主题派生：`--va-*` 由 `ConfigProvider` 写入，`JS` / `canvas` / `SVG` 场景用公开的 `derive(seed, mode)` 取同一份结果；旧版 `getColorPalettes` / `getAlphaColor` 已随本版移除；
- 定时与暗色切换：`rafTimeout` / `cancelRaf` 改用 `setTimeout` / 原生 `requestAnimationFrame`（返回类型 `AnimationFrameID` 一并移除），`toggleDark` 改用 `theme.mode`，或直接写 `<html data-va-mode="dark">`；
- 旧版通过行内变量覆盖组件配色的写法，改为覆盖上表的 `--va-*`（注意优先级随级联关系变化）。

## 离散 API：与 `createDiscreteApi` 的关系

_离散实例的浮层挂在 `body`：传了 `configProviderProps.theme` 时由边界转发写到浮层根节点；未传时从 `<html>` 继承主应用主题_

它不会改写 `<html>`，`dispose()` 也不会误清除主应用写入的变量。`configProviderProps.theme`（含 `seed` / `mode` / `components`）会作用于该实例自己的浮层（经内部转发通道写到浮层根节点，不污染全局）；未传时浮层沿用 `<html>` 上的主应用主题。
