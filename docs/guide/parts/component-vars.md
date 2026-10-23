_本节由 `node scripts/gen-component-vars-doc.js` 从 `components/theme/component-vars.js` 生成，请勿手动修改；生成物需提交（不要加进 `.gitignore`）。_

组件令牌是**组件内部颜色变量的公开名字**（`--va-<组件>-*`），也包括把组件主色接到具体皮肤上的桥接令牌。
它们与全局令牌一样是普通的 `CSS` 自定义属性，直接在选择器里赋值即可，沿 `DOM` 继承生效；
组件令牌**只在消费处带默认值、自身不声明**，因此写在任何祖先选择器上都能生效，也不会被组件样式反向压住。

::: tip 组件级主色的支持范围
当前支持 `39` 个组件：`Alert` / `AutoComplete` / `BackTop` / `Badge` / `Button` / `Calendar` / `Carousel` / `Checkbox` / `ColorPicker` / `DatePicker` / `FloatButton` / `GradientText` / `Image` / `Input` / `InputNumber` / `InputSearch` / `LoadingBar` / `Menu` / `Message` / `Modal` / `Notification` / `Pagination` / `Popconfirm` / `Progress` / `Radio` / `Select` / `Slider` / `Spin` / `Steps` / `Swiper` / `Switch` / `Table` / `Tabs` / `Tag` / `TextScroll` / `Textarea` / `TimePicker` / `Timeline` / `Upload`。
`Button` / `Slider` / `Menu` 通过注册表里的 `themeRole` 令牌映射；其余组件在样式里消费内部桥变量
`--va-cp-<component>-primary-*`，配置后会覆盖该组件的全部主色使用点。写错组件名会在编译期报错。
:::

### 成组覆盖

同一个视觉元素的状态是**成组**的：只改常态会出现「悬停跳回默认色」，只改底色会出现
「文字不可读」。请整组覆盖，或改用 `ConfigProvider.seed` 让系统派生整套状态。

```css
/* 主色按钮：常态 / 悬停 / 按下 */
.my-zone {
  --va-button-primary-color: #18a058;
  --va-button-primary-color-hover: #36ad6a;
  --va-button-primary-color-active: #0c7a43;
}

/* 危险按钮：只覆盖常态即可，悬停 / 按下默认跟随常态色 */
.my-zone {
  --va-button-danger-color: #d03050;
}

/* 滑动输入条：轨道（已选 / 未选）各两态 */
.my-zone {
  --va-slider-track-color: #18a058;
  --va-slider-track-color-hover: #36ad6a;
  --va-slider-rail-color: #eef1f5;
  --va-slider-rail-color-hover: #e3e8ef;
}

/* 数值气泡：底色与文字色必须成对 */
.my-zone {
  --va-slider-tooltip-bg-color: #ffffff;
  --va-slider-tooltip-color: #333639;
}
```

### 变量清单

#### 按钮 Button

`color` 属性会在这一个实例上内联写入 `--va-button-primary-color` 等令牌（实例级覆盖，优先级最高），因此传了 `color` 时下面这些令牌对该实例不生效。下拉按钮 `DropdownButton` 的共享分割线也跟随 `--va-button-primary-color-hover` / `--va-button-danger-color-hover`。

其中 `--va-button-primary-color` / `--va-button-primary-color-hover` / `--va-button-primary-color-active` / `--va-button-solid-text-color` 会跟随 `ConfigProvider` 的 `theme.components.Button.primaryColor` 自动派生；其余令牌需要用 `CSS` 直接覆盖。

**主色**

| 名称 | 说明 | 默认值 |
| :-- | :-- | :-- |
| `--va-button-primary-color` | 主按钮底色（常态） | `var(--va-primary-color)` |
| `--va-button-primary-color-hover` | 主按钮底色（悬停） | `var(--va-primary-color-hover)` |
| `--va-button-primary-color-active` | 主按钮底色（按下） | `var(--va-primary-color-active)` |

**前景色**

| 名称 | 说明 | 默认值 |
| :-- | :-- | :-- |
| `--va-button-solid-text-color` | 实色底上的文字色（`primary` / `danger` / `reverse` 共用） | `var(--va-text-color-solid)` |

**危险色**

| 名称 | 说明 | 默认值 |
| :-- | :-- | :-- |
| `--va-button-danger-color` | 危险按钮底色（常态） | `var(--va-error-color)` |
| `--va-button-danger-color-hover` | 危险按钮底色（悬停）；默认跟随常态色，只覆盖常态色时不会跳回全局红 | `var(--va-button-danger-color, var(--va-error-color))` |
| `--va-button-danger-color-active` | 危险按钮底色（按下）；默认跟随常态色 | `var(--va-button-danger-color, var(--va-error-color))` |

#### 滑动输入条 Slider

其中 `--va-slider-track-color` / `--va-slider-track-color-hover` / `--va-slider-handle-shadow-color` / `--va-slider-handle-shadow-color-hover-focus` / `--va-slider-dot-color-active` 会跟随 `ConfigProvider` 的 `theme.components.Slider.primaryColor` 自动派生；其余令牌需要用 `CSS` 直接覆盖。

**已选轨道**

| 名称 | 说明 | 默认值 |
| :-- | :-- | :-- |
| `--va-slider-track-color` | 已选轨道底色（常态） | `var(--va-primary-border-color)` |
| `--va-slider-track-color-hover` | 已选轨道底色（悬停） | `var(--va-primary-color)` |

**未选轨道**

| 名称 | 说明 | 默认值 |
| :-- | :-- | :-- |
| `--va-slider-rail-color` | 未选轨道底色（常态） | `var(--va-fill-color-1)` |
| `--va-slider-rail-color-hover` | 未选轨道底色（悬停） | `var(--va-fill-color-2)` |

**滑块**

| 名称 | 说明 | 默认值 |
| :-- | :-- | :-- |
| `--va-slider-handle-color` | 滑块圆点底色 | `var(--va-bg-elevated-color)` |
| `--va-slider-handle-shadow-color` | 滑块光环色（常态，常驻 `2px`） | `var(--va-primary-border-color)` |
| `--va-slider-handle-shadow-color-hover-focus` | 滑块光环色（悬停 / 聚焦，放大到 `4px`） | `var(--va-primary-color)` |

**刻度点**

| 名称 | 说明 | 默认值 |
| :-- | :-- | :-- |
| `--va-slider-dot-border-color` | 刻度点描边色（常态） | `var(--va-border-split-color)` |
| `--va-slider-dot-border-color-hover` | 刻度点描边色（悬停） | `var(--va-fill-color-2)` |
| `--va-slider-dot-color-active` | 刻度点描边色（激活态，跟随组件级主色） | `var(--va-primary-border-color)` |

**数值气泡**

| 名称 | 说明 | 默认值 |
| :-- | :-- | :-- |
| `--va-slider-tooltip-bg-color` | 数值气泡底色 | `var(--va-bg-spotlight-color)` |
| `--va-slider-tooltip-color` | 数值气泡文字色；改底色时需同步覆盖，否则浅底白字不可读 | `var(--va-text-color-solid)` |

#### 导航菜单 Menu

下表的「浅色 / 深色」指 `theme` 属性（独立皮肤），**与 `data-va-mode` 暗色模式无关**：浅色皮肤的容器令牌跟随全局令牌派生（暗色模式下自动取暗色值），深色皮肤的三只表面令牌（根列表 / 浮层面板 / 内联子菜单）取**品牌色暗底** `--va-bg-brand-dark-color` / `--va-bg-brand-dark-deep-color`（主色色相与饱和度、亮度压到 `8%` / `4.5%`，两个模式同值），因此换主题色时深色皮肤同步换色相；是否启用这套皮肤只由 `theme` 属性决定。三只主色桥令牌由 `theme.components.Menu.primaryColor` 派生；`--va-menu-item-selected-*` 的默认值通过它们间接跟随组件主色，直接覆盖选中态令牌仍然优先。组件级 `primaryColor` 同样驱动深色皮肤的三只表面令牌（按该主色重新派生暗底，优先级高于 `seed`）；直接覆盖令牌依然优先级最高。

其中 `--va-menu-primary-color` / `--va-menu-primary-palette` / `--va-menu-primary-text-color` 会跟随 `ConfigProvider` 的 `theme.components.Menu.primaryColor` 自动派生；其余令牌需要用 `CSS` 直接覆盖。

**主色**

| 名称 | 说明 | 默认值 |
| :-- | :-- | :-- |
| `--va-menu-primary-color` | 菜单主色桥：选中项文字 / 深色皮肤选中底 / 水平状态下划线 | `var(--va-primary-color)` |
| `--va-menu-primary-palette` | 菜单主色浅底桥：浅色皮肤选中项底色（深色皮肤改用 --va-menu-primary-color） | `var(--va-primary-bg-color)` |
| `--va-menu-primary-text-color` | 菜单主色文字桥：浅色皮肤选中项文字 / 水平菜单下划线 | `var(--va-primary-text-color)` |

**容器**

| 名称 | 说明 | 默认值（浅色皮肤 / 深色皮肤） |
| :-- | :-- | :-- |
| `--va-menu-background` | 菜单根列表背景；弹出子菜单面板取 --va-menu-popup-background，不受它影响 | 浅色 `var(--va-bg-container-color)`<br>深色 `var(--va-bg-brand-dark-color, #001529)` |
| `--va-menu-popup-background` | 弹出子菜单（浮层面板）背景；深色皮肤取品牌色暗底，与根列表同色 | 浅色 `var(--va-bg-elevated-color)`<br>深色 `var(--va-bg-brand-dark-color, #001529)` |
| `--va-menu-inline-submenu-background` | 内联子菜单（inline 展开的下一级列表）背景；深色皮肤取更深一阶的品牌色暗底 | 浅色 `var(--va-fill-color-1)`<br>深色 `var(--va-bg-brand-dark-deep-color, #000c17)` |

**选中态**

| 名称 | 说明 | 默认值（浅色皮肤 / 深色皮肤） |
| :-- | :-- | :-- |
| `--va-menu-item-selected-background` | 选中项（含按下态）底色 | 浅色 `var(--va-primary-bg-color)`<br>深色 `var(--va-primary-color)` |
| `--va-menu-item-selected-color` | 选中项文字色 / 水平菜单下划线色 | 浅色 `var(--va-primary-text-color)`<br>深色 `#fff` |

#### 文字滚动 TextScroll

**容器**

| 名称 | 说明 | 默认值 |
| :-- | :-- | :-- |
| `--va-text-scroll-bg-color` | 滚动区域底色（横 / 纵两个变体共用） | `var(--va-bg-container-color)` |
| `--va-text-scroll-shadow-color` | 滚动区域外围阴影色（横 / 纵两个变体共用） | `var(--va-border-color)` |

#### 滚动条 Scrollbar

**滚动条滑块**

| 名称 | 说明 | 默认值 |
| :-- | :-- | :-- |
| `--va-scrollbar-color` | 滚动条滑块底色（常态） | `var(--va-text-color-disabled)` |
| `--va-scrollbar-color-hover` | 滚动条滑块底色（悬停） | `var(--va-text-color-3)` |

#### 表格 Table

**容器**

| 名称 | 说明 | 默认值 |
| :-- | :-- | :-- |
| `--va-table-bg-color` | 表格容器 / 数据行 / 固定列底色 | `var(--va-bg-container-color)` |

**表头**

| 名称 | 说明 | 默认值 |
| :-- | :-- | :-- |
| `--va-table-header-bg-color` | 表头单元格底色（含排序列表头与固定列表头） | `var(--va-fill-color-4)` |

**底部**

| 名称 | 说明 | 默认值 |
| :-- | :-- | :-- |
| `--va-table-footer-bg-color` | 表格底部（分页区）底色 | `var(--va-fill-color-4)` |

**边框**

| 名称 | 说明 | 默认值 |
| :-- | :-- | :-- |
| `--va-table-border-color` | 单元格分隔线 / 外边框 / 固定列滚动阴影；另作可排序表头底与可排序行悬停底（改浅会连带变亮这两处底色） | `var(--va-border-split-color)` |

#### 卡片 Card

**容器**

| 名称 | 说明 | 默认值 |
| :-- | :-- | :-- |
| `--va-card-bg-color` | 卡片底色 | `var(--va-bg-container-color)` |

**边框**

| 名称 | 说明 | 默认值 |
| :-- | :-- | :-- |
| `--va-card-border-color` | 卡片外边框与标题分割线 | `var(--va-border-split-color)` |

#### 警告提示 Alert

**容器**

| 名称 | 说明 | 默认值 |
| :-- | :-- | :-- |
| `--va-alert-bg-color` | 默认态提示框底色（语义态用 --va-{success,warning,error,info}-* 控制） | `var(--va-fill-color-1)` |

**边框**

| 名称 | 说明 | 默认值 |
| :-- | :-- | :-- |
| `--va-alert-border-color` | 默认态提示框边框（语义态用 --va-{success,warning,error,info}-border-color 控制） | `var(--va-border-color)` |

#### 输入框 Input

**容器**

| 名称 | 说明 | 默认值 |
| :-- | :-- | :-- |
| `--va-input-bg-color` | 输入框底色（含自动填充背景） | `var(--va-bg-container-color)` |

**边框**

| 名称 | 说明 | 默认值 |
| :-- | :-- | :-- |
| `--va-input-border-color` | 输入框常态边框（聚焦 / 悬停仍由主色派生） | `var(--va-border-color)` |

**前景色**

| 名称 | 说明 | 默认值 |
| :-- | :-- | :-- |
| `--va-input-text-color` | 输入文字与光标颜色 | `var(--va-text-color-1)` |
| `--va-input-placeholder-color` | 占位符文字颜色 | `var(--va-text-color-disabled)` |

#### 文本域 Textarea

**容器**

| 名称 | 说明 | 默认值 |
| :-- | :-- | :-- |
| `--va-textarea-bg-color` | 文本域底色（含自动填充背景） | `var(--va-bg-container-color)` |

**边框**

| 名称 | 说明 | 默认值 |
| :-- | :-- | :-- |
| `--va-textarea-border-color` | 文本域常态边框（聚焦 / 悬停仍由主色派生） | `var(--va-border-color)` |

**前景色**

| 名称 | 说明 | 默认值 |
| :-- | :-- | :-- |
| `--va-textarea-text-color` | 输入文字与光标颜色 | `var(--va-text-color-1)` |
| `--va-textarea-placeholder-color` | 占位符文字颜色 | `var(--va-text-color-disabled)` |

#### 模态框 Modal

**容器**

| 名称 | 说明 | 默认值 |
| :-- | :-- | :-- |
| `--va-modal-bg-color` | 弹窗内容区底色 | `var(--va-bg-elevated-color)` |

**前景色**

| 名称 | 说明 | 默认值 |
| :-- | :-- | :-- |
| `--va-modal-title-color` | 弹窗标题颜色 | `var(--va-text-color-1)` |
| `--va-modal-text-color` | 弹窗正文颜色 | `var(--va-text-color-1)` |

#### 抽屉 Drawer

**容器**

| 名称 | 说明 | 默认值 |
| :-- | :-- | :-- |
| `--va-drawer-bg-color` | 抽屉面板底色 | `var(--va-bg-elevated-color)` |

**边框**

| 名称 | 说明 | 默认值 |
| :-- | :-- | :-- |
| `--va-drawer-header-border-color` | 抽屉头部与内容区之间的分割线 | `var(--va-border-split-color)` |
| `--va-drawer-footer-border-color` | 抽屉底部操作区上方的分割线 | `var(--va-border-split-color)` |

### 已知限制

- **Teleport 浮层只转发全局令牌**：有生效 `seed` 时 `40` 个 `--va-*` 会随浮层根节点下发
  （只配置 `theme.components` 时只转发组件令牌，避免覆盖宿主用纯 `CSS` 写在 `:root` 上的主题），
  但你在祖先上手写的 **组件令牌**不会被带过去。受影响场景：
  - `Menu` 的弹出型子菜单（`mode="horizontal"`、`inlineCollapsed` 收起态）里的
    `--va-menu-item-selected-*`；
  - `Notification` / `Modal` / `Select` 等浮层内的 `Scrollbar` 的 `--va-scrollbar-*`。

  需要时请在 `<html>` 或浮层的承载层上设置。`Menu` 的 `inline` 模式、`Scrollbar` 的非浮层用法不受影响。
- **`--va-menu-background` 只改根列表背景**：弹出面板底色是另一套私有变量，不随它变化。
- **`disabled` 态不受组件令牌影响**：禁用态统一走中性令牌，这是刻意设计。
- **`Button` 的 `danger` 默认为单档**：常态 / 悬停 / 按下三态默认同色（历史视觉档位缺失）；
  已支持只覆盖常态色（悬停 / 按下跟随），但默认状态本身没有档位差。
- `--va-scrollbar-width` 是**全局运行时变量**（页面滚动锁定时由库写入 `<html>`，供固定定位元素补偿宽度），
  不属于组件令牌，也不跟随主题派生。

### 契约说明

- 本清单是**按需扩展**的，不代表组件全覆盖：只有上面列出的组件提供组件级令牌，
  其余组件的配色请用全局令牌 / `props` / 作用域 `seed`；
- 组件的其它内部变量（尺寸、层级、按 `props` 计算的实现细节、`Tag` 色板、深色皮肤色板等）是私有实现，
  不承诺、也不在本节列出；
- 令牌名在 minor 版本内保持稳定，重命名按 major 处理。
