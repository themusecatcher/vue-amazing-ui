# Tooltip 触发与定位架构对齐方案（工作计划） Tooltip Trigger Alignment

> **状态：工作计划（长期保留）。** 用于记录「是否 / 如何把 Tooltip 对齐 antdv、naive-ui 的触发与定位实现」的分析结论与启动条件，后续按需推进。
> **当前结论：暂不实施。** 对齐方案本身不产生代码改动；§1「既有修复」为已完成的独立缺陷修复记录，不属于本方案。启动条件见 §8。
>
> 涉及组件：`components/tooltip/`、`components/popover/`、`components/popconfirm/`、`components/ellipsis/`、`components/color-picker/`、`components/back-top/`、`components/table/`、`components/float-button/`、`components/text-scroll/`

---

## 1. 结论摘要（TL;DR）

1. **当前实现（包裹层方案）在本组件范围内是合适的，不建议只为"更正统"而改造。**
2. 所谓"对齐主流"，本质不是"改好 Tooltip"，而是**引入一套组件间共享的触发 / 定位基础设施（触发原语）**，属于 breaking change + 版本级架构演进。
3. 真正启动的条件是**出现新的复用方**：新增 Dropdown / Tour，或显隐状态机出现第 3 次以上雷同复制。
4. 对齐有两个程度：轻度（仅事件注入方式）收益极小、不建议；彻底（移除包裹层 + 目标元素追踪）才是真对齐，代价见 §5 / §7。

### 与本次讨论相关的既有修复（独立缺陷修复，不属于本方案）

以下均已修复完成，与本对齐方案无关，仅作为背景记录。索引方式按**符号名 / 选择器名**（不写行号，见附录说明）。

**`components/tooltip/Tooltip.vue`**

- `trigger="focus"` 失效：`focus`/`blur` 不冒泡，必须靠捕获阶段或 `focusin`/`focusout` 才能从包裹层感知子元素焦点变化；现采用 `@focus.capture` / `@blur.capture`。
- 外部点击监听残留：`document` 的 `click` 监听改为幂等注册 / 移除（`addDocumentListener` / `removeDocumentListener`），并在 `onBeforeUnmount` 中无条件移除。
- 受控 `show` 未立即生效：`watch(() => props.show)` 原先会走 hover 延迟；现改为 `onShow(true)` / `onHide(true)` 跳过延迟，与 antd `visible` 的受控语义一致。
- `animationend` 未过滤事件源：插槽内容里的嵌套动画会冒泡到容器、误发 `animationend`；现按 `e.target !== tooltipRef` 过滤，只响应卡片自身的缩放动画。
- ResizeObserver 尺寸比对口径统一：原用 `borderBoxSize`（旧浏览器可能缺失，且回退 `contentRect` 时与 `tooltipCardSize` 的 offset 边框盒口径不一致，会使「尺寸未变则跳过」的守卫恒不成立）；现直接比较卡片元素的 `offsetWidth` / `offsetHeight`，与 `tooltipCardSize` 同源。
- 无障碍补强：卡片补 `role="tooltip"` 与唯一 `id`，触发器补 `aria-describedby`（仅在可见时关联，由 `tooltipCardId` / `ariaDescribedby` 提供）。

**共享层 `components/utils/observers.ts`（影响所有弹出类组件）**

- `scroll` 事件目标错绑：页面（视口）滚动时 `scroll` 只派发到 `window` / `document`，`documentElement` **收不到** —— 原实现把监听绑在 `getScrollParent()` 返回的 `documentElement` 上，回调恒不触发；同分支挂 `MutationObserver(documentElement, { subtree: true, attributes: true })` 兜底同样无效（滚动不产生属性突变，仅在 VitePress 文档站因滚动切换侧栏 `class` 而偶然生效，容易被误判为「VitePress 专用监听」）。`useScroll` 在 `target` 为 `window` / `document` 时存在同类错绑。
- 现改为统一解析：`resolveScrollEventTarget`（`documentElement` → `window`）与 `resolveScrollMeasureElement`（`window` / `document` → `documentElement`），由 `useScroll` / `useScrollParent` 共用。
- 回归用例：`tests/scroll-parent.spec.ts`（整页滚动路径 + 元素滚动容器路径）、`tests/use-scroll.spec.ts`。
- 复验方法：Chrome 无头加载探针页并**同步** `scrollTo(0, 500)`，期望输出 `targets=["document","window"]`、`mutationCallback=0`（`--virtual-time-budget` 下把 `scrollTo` 放进定时器里可能不派发）。

---

## 2. 现状架构（事实）

### 2.1 DOM 结构

```html
<div class="tooltip-wrap">           <!-- position: relative；hover 区域；:style / class 透传落点 -->
  <span class="tooltip-content">     <!-- inline-block；contentClass / contentStyle 落点；focus 宿主 -->
    <!-- 默认插槽子节点 -->
  </span>
  <!-- 弹出卡片经 Teleport 挂到 body 或指定容器 -->
</div>
```

### 2.2 包裹层承担的职责（4 项）

| 职责 | 实现位置 |
| :-- | :-- |
| 定位锚点 | `.tooltip-wrap` 的 `position: relative` + `getPositionedContainer()` 的查询起点 |
| hover 区域 | `.tooltip-wrap` 上的 `@mouseenter` / `@mouseleave` |
| `contentClass` / `contentStyle` 宿主 | `.tooltip-content` |
| focus 宿主 | `trigger="focus"` 时 `:tabindex="0"` + `@focus.capture` / `@blur.capture` |

### 2.3 事件绑定分布

| 事件 | 绑定位置 | 说明 |
| :-- | :-- | :-- |
| `mouseenter` / `mouseleave` | `.tooltip-wrap` | hover 触发 |
| `click` / `contextmenu` | `.tooltip-content` | 会冒泡，可直接绑包裹层 |
| `focus` / `blur` | `.tooltip-content`（**捕获阶段**） | 不冒泡，必须捕获 |
| `keydown.enter` / `keydown.esc` | `.tooltip-content` | 会冒泡 |
| 外部点击 | `document` + `click` 捕获 | `addDocumentListener` / `removeDocumentListener` |

### 2.4 共享层现状

- **已抽出的共享层（测量层）**：
  - `components/utils/position.ts` → `useFloatingPosition`（`Tooltip.vue` 中调用）
  - `components/utils/observers.ts` → `useScrollParent`（`Tooltip.vue` 中调用）
  - 已由 **Select / AutoComplete / Tooltip 三处共用**
- **未抽出、三处各写一份的层（显隐状态机 + 定位决策 + 事件）**：
  | 组件 | 状态变量 | 自身实现 |
  | :-- | :-- | :-- |
  | `components/tooltip/Tooltip.vue` | `tooltipShow` | `updatePosition` / `getPosition` / 触发 / 延迟 / 外部点击 |
  | `components/select/Select.vue` | `showOptions` | `updatePosition` / `getPosition` |
  | `components/auto-complete/AutoComplete.vue` | `showOptions` | `updatePosition` / `getPosition` |

> 结论：原语在项目里**已有复用苗头**（3 个组件共享测量层），只是目前抽的是"量"，没抽"决策与事件"；再往前一步就是触发原语。

---

## 3. 主流方案参照（antdv / naive-ui）

> 参照源码为本地克隆：`ant-design-vue/`、`naive-ui/`（非本仓库路径）。下述引用以符号名定位。

### 3.1 antdv：`vc-trigger` + dom-align

- `components/vc-trigger/Trigger.tsx`
  - 事件**注入到 clone 后的触发子元素**：`newChildProps.onFocus = this.onFocus; newChildProps.onBlur = this.onBlur`，再 `cloneElement(child, {...newChildProps, ref})`
  - `onFocus` / `onBlur`；`onBlur` 用 `contains(e.target, e.relatedTarget || document.activeElement)` 判断焦点是否真的离开
  - `contains` 工具：`components/vc-util/Dom/contains.ts`（即 `root.contains(n)` 的封装）
- 定位：`components/_util/placements.ts` + dom-align；`getRootDomNode()` 用 `findDOMNode` 解析真实目标并在未就绪时重试
- 特殊处理：`getDisabledCompatibleChildren` 为 disabled 元素额外包一层 span

### 3.2 naive-ui：`VBinder` / `VTarget` + `Popover`

- Tooltip 是"穿马甲的 Popover"：`src/tooltip/src/Tooltip.ts` 直接渲染 `NPopover`
- `src/popover/src/Popover.tsx`
  - `triggerEventMap = { focus: ['onFocus','onBlur'], click: ['onClick'], hover: ['onMouseenter','onMouseleave'], ... }`
  - `appendEvents(vNode, trigger, events)` 把 handler **合并进 trigger vnode 的 props**，并与子元素原有 handler **串联**
  - `handleFocus` / `handleBlur`、`handleClick`、`watchEffect` 兜底 disabled
- 定位：`vueuc` 的 `VBinder` / `VTarget`（追踪目标元素矩形）
- 兜底：trigger 为纯文本时包一层 span

### 3.3 共同点

1. **零包裹**：触发元素就是消费者传入的子元素本身（文本 / 多节点 / Fragment 场景才兜底包一层）。
2. **目标元素追踪**：定位不依赖"自己的包裹层"，而是追踪任意目标元素的矩形。
3. 这也解释了为什么 antd 一个 Trigger 能同时支撑 Tooltip / Popover / Dropdown / Select / Menu / Tour。

---

## 4. 方案对比

| 维度 | 当前（包裹层 + 捕获阶段） | antdv / naive（clone 子元素 + 目标追踪） |
| :-- | :-- | :-- |
| DOM 纯净度 / 布局影响 | **差**：多 2 层节点，`span` 为 `inline-block`，flex / grid / `table` 单元格场景会改变布局 | **好**：零额外节点 |
| 无障碍 | **中**：`trigger="focus"` 的 `tabindex` 落在包裹层，可聚焦子元素场景**多一个 Tab 停靠点**；语义只能挂包裹层（本轮已补 `role` / `aria-describedby`，但描述仍只能关联到包裹层，真实控件读不到） | **好**：语义可直接挂在真实控件上 |
| 事件正确性 / 副作用 | **好**：不改动消费者 vnode，不会覆盖子元素自带 handler / `ref` | **需合并**：naive 串联 handler、antdv 用 `createTwoChains`；antdv 的 `ref: 'triggerRef'` 曾覆盖用户 ref |
| 插槽形态覆盖 | **好**：文本 / 多节点 / 组件 / Fragment 全部统一，无分支 | **分支多**：文本、多节点、Fragment 仍需兜底包 `span`；disabled 元素还要再包一层 |
| 定位实现成本 | **低**：包裹层即稳定锚点 | **高**：需 `findDOMNode` 解析 + 重试 + 无单根兜底 |
| 公开 API | `contentClass` / `contentStyle` 天然有宿主 | 无宿主，需合并进子元素（语义变更） |
| 实现复杂度 | 低，单文件自洽 | 高，等于引入一个 trigger 原语 |
| 生态一致性 | 与 antd / naive 不一致 | 与主流一致 |

---

## 5. 影响面清单（改造前必须清点）

全库共 **8 个组件**二次封装了 Tooltip，其中 **6 个依赖包裹层**。

### 5.1 会受影响

| 组件 | 依赖点 | 说明 |
| :-- | :-- | :-- |
| `float-button/FloatButton.vue` | **最重** | `class="float-btn-tooltip"` 透传到 `.tooltip-wrap`；CSS 把它当布局骨架：`.float-btn-tooltip { width/height: 100% }`、`:deep(.tooltip-content) { width/height: 100% }`、`& > .float-btn-tooltip { .float-btn-body {...} }` 后代选择器 |
| `ellipsis/Ellipsis.vue` | `:style` 透传 + `contentStyle` | `:style="max-width"` → `.tooltip-wrap`；`:content-style="{ maxWidth }"` → `.tooltip-content` |
| `color-picker/ColorPicker.vue` | 同上 | `:style="width/height"` + `:content-style="{ width/height: 100% }"` |
| `back-top/BackTop.vue` | 同上 | `:style`（圆角）+ `:content-style`（圆角） |
| `table/Table.vue` | 同上（表头、表体两处） | `style="width: 100%"` + `:content-style="{ width: '100%' }"` |
| `text-scroll/TextScroll.vue` | **间接** | 把 `content-class` / `content-style` 传给 `Ellipsis`；`Ellipsis` 未声明这两个 prop 且未关 `inheritAttrs`，靠 attr 透传落到根节点 `<Tooltip>` 上 |

### 5.2 不受影响

| 组件 | 原因 |
| :-- | :-- |
| `popover/Popover.vue` | 仅用 `#tooltip` + 默认插槽 + `tooltip-style`，未碰包裹层 |
| `popconfirm/Popconfirm.vue` | 同上 + `trigger="click"` + `ref.hide()` |
| `rate/Rate.vue` | `v-bind="tooltipProps"` + 单元素默认插槽 |

> 注：`Rate` / `FloatButton` / `BackTop` / `Table` 都对外暴露 `tooltipProps` 透传入口，**第三方消费者**仍可能经它传入 `contentStyle`，属于对外 API 影响。

### 5.3 公开 API 影响

`contentClass` / `contentStyle` 是**已公开的 props**（文档 `docs/guide/components/tooltip.md` 有列出），语义就是"包裹层的类名 / 样式"。移除包裹层意味着语义必须变更（合并进子元素），属于 breaking change。

判定"是否受影响"的统一规则：

1. 使用了 `contentClass` / `contentStyle`；
2. 依赖 `class` / `style` 透传到 `.tooltip-wrap`；
3. 依赖针对 `.tooltip-wrap` / `.tooltip-content` 的 CSS。

---

## 6. 候选方案

| 方案 | 内容 | 结论 |
| :-- | :-- | :-- |
| **A. 保持现状** | 包裹层 + 捕获阶段监听；仅做低风险补强（见 §9） | **推荐（默认）** |
| **B. 轻度对齐** | 只把 `focus/click/hover` 改成 clone 子元素注入，保留包裹层 | **不推荐**：布局 / a11y 短板未解决，反而引入 handler 合并与 `ref` 冲突的复杂度，收益极小 |
| **C. 彻底对齐** | 移除包裹层，改用目标元素追踪 | 仅在 §8 启动条件满足时执行，步骤见 §7 |

---

## 7. 方案 C 实施步骤（若启动）

1. **抽原语**：新建无 UI 的触发层（`<Trigger>` / `useTrigger`），收敛：触发方式、延迟、显隐状态机、键盘、点击外部、受控 / 非受控。
2. **引入目标元素追踪**：替换"包裹层锚点"方案；选型待定（自研 / 参考 `vueuc` 的 `VTarget` / 引入 `@floating-ui/dom`）。
3. **兜底策略**：文本 / 多节点 / Fragment / disabled 元素仍需包一层，需明确规则。
4. **Tooltip 迁移**：事件注入子元素；`contentClass` / `contentStyle` 的兼容层或替代 API 设计。
5. **波及组件逐个迁移**：FloatButton（含 CSS 重写）、Ellipsis、ColorPicker、BackTop、Table、TextScroll。
6. **可选收拢**：Select / AutoComplete 迁移到同一原语，消灭第 2、3 份显隐状态机。
7. **交付配套**：回归用例、文档、迁移指南、版本声明。

---

## 8. 启动条件（满足任意一条再启动）

1. 新增 **Dropdown** 或 **Tour**（Tour 会直接判定包裹层模型不成立：目标不是自身子节点）。
2. 显隐状态机 + 定位决策出现**第 3 次雷同复制**（当前已接近临界：Tooltip / Select / AutoComplete 三份）。
3. 出现 **≥3 个组件**需要"把弹层定位到任意元素"。

---

## 9. 保持方案 A 时的低风险补强（可选，与对齐无关）

1. ~~**无障碍**：卡片加 `role="tooltip"`，并把 `aria-describedby` 接到触发元素~~ —— **已完成**（见 §1「既有修复」）。剩余待办：`trigger="focus"` 且插槽子元素本身可聚焦时可不设 `tabindex`（避免多一个 Tab 停靠点，需探测子元素可聚焦性）。
2. **布局代价显式化**：文档注明包裹层为 `inline-block`，flex / table 场景需用 `contentStyle` 调整。
3. **消除内部耦合**：`FloatButton` 的 `:deep(.tooltip-content)` 改用 `contentStyle` 表达，避免包裹层类名被外部依赖。

---

## 10. 回归用例清单（方案 C 必须覆盖）

- **定位**：12 方向、`flip` 翻转、次轴 clamp、箭头对齐、`arrowPointAtCenter`、`to` 为 `false` / 元素 / 选择器。
- **触发**：hover（`showDelay` / `hideDelay` / `showControl`）、click（外部关闭、`keyboard`）、focus（含可聚焦子元素、焦点在内容内移动不闪烁）、contextmenu、`disabled` 运行时切换。
- **生命周期**：卸载清理（`document` 监听、rAF、定时器）、keep-alive 场景。
- **布局**：flex / grid / `table` 单元格 / inline 上下文下的占位与尺寸。
- **无障碍**：`role` / `aria`、Tab 顺序。
- **波及组件**：Popover、Popconfirm、Rate、Ellipsis、ColorPicker、BackTop、Table、FloatButton、TextScroll。

---

## 11. 开放问题（待讨论决策）

1. `contentClass` / `contentStyle` 是**保留同名**（语义改为合并到子元素）还是**新增 `overlay*` 命名并废弃旧名**？
2. 是否接受 breaking change、走 major 版本？
3. 目标追踪方案选型：自研 / 参考 `vueuc` / 引入 `@floating-ui/dom`（新增依赖需评估体积与既有实现重叠度）。
4. 是否顺带收拢 Select / AutoComplete 的显隐状态机（扩大范围 vs 保持最小变更）。
5. 文本 / 多节点 / Fragment / disabled 的兜底包裹策略是否对外宣称（可能仍存在"额外节点"）。

---

## 附录：关键代码位置索引

> **本索引按符号名 / 选择器名引用，不写行号**：行号会随任何一次代码编辑漂移，本会话内已因此返工多次。
> 定位方式：`grep -n "<符号>" <文件>`。

| 位置 | 符号 / 选择器 | 说明 |
| :-- | :-- | :-- |
| `components/tooltip/Tooltip.vue` | `tooltipShow` / `documentListenerAttached` | 显隐状态 / 外部点击监听注册标识 |
| 同上 | `useFloatingPosition` / `useScrollParent` | 测量层 / 滚动感知 |
| 同上 | `updatePosition` / `getPosition` | 位置更新调度 / 定位计算 |
| 同上 | `clampCrossAxis` / `getPlacement` | 次轴夹紧 / 主轴翻转 |
| 同上 | `addDocumentListener` / `removeDocumentListener` / `onBeforeUnmount` | 外部点击监听注册 / 移除 / 卸载清理 |
| 同上 | `@focus.capture` / `@blur.capture` | 捕获阶段焦点监听 |
| 同上 | `.tooltip-wrap` / `.tooltip-content` | 包裹层 / 内容层（样式与职责落点） |
| 同上 | `tooltipCardId` / `ariaDescribedby` / `role="tooltip"` | 无障碍关联 |
| `components/utils/observers.ts` | `resolveScrollEventTarget` / `resolveScrollMeasureElement` / `useScrollParent` | 滚动目标解析 / 测量元素解析 / 滚动父元素感知 |
| `ant-design-vue` `vc-trigger/Trigger.tsx` | `onFocus` / `onBlur` / `newChildProps` | focus / blur 处理、事件注入子元素 |
| `naive-ui` `popover/src/Popover.tsx` | `triggerEventMap` / `appendEvents` / `handleFocus` / `handleBlur` | 触发事件映射、handler 合并与串联 |
