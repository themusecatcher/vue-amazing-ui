---
description: Vue Amazing UI 组件库的版本更新记录，含新增组件、接口重构、缺陷修复与文档更新
---

# 更新日志

<GlobalElement />

::: tip 提示
如果你在使用过程中发现了问题、`bug`或希望贡献新功能 / 新组件，欢迎通过以下方式与我联系：

- **问题反馈**：前往 [GitHub Issues](https://github.com/themusecatcher/vue-amazing-ui/issues) 提交 `issue`，建议附上复现步骤或最小示例
- **代码贡献**：新功能、新组件、`bug` 修复及文档更新，请先阅读[贡献指南](https://github.com/themusecatcher/vue-amazing-ui/blob/main/CONTRIBUTING.zh-CN.md)，再向 `main` 分支发起 `Pull Request`
- **直接联系**：通过页面右下角邮箱地址与我直接沟通
:::

## <VersionDateTag date="2026-10-26">3.3.1</VersionDateTag>

- 修复 [文本滚动 TextScroll](/guide/components/text-scroll.html) 的滚动启停、节奏与样式：`start()` 重复调用不再叠加滚动，`KeepAlive` 失活即暂停、返回后接着滚动，`interval` 改为纯停留时长（过渡另计 `duration`，同参数下整体变慢），`ellipsis` 下 `itemStyle` 的 `maxWidth` 生效
- 更新组件库文档与贡献者文档

## <VersionDateTag date="2026-10-25">3.3.0</VersionDateTag>

- 新增 [菜单 Menu](/guide/components/menu.html) 深色皮肤（`theme="dark"`）的底色跟随主题色：根列表、浮层面板与内联子菜单同步换色相（`theme.components.Menu.primaryColor` 同样驱动）；新增 `--va-bg-brand-dark-color` / `--va-bg-brand-dark-deep-color`，浮层面板与内联子菜单可用 `--va-menu-popup-background` / `--va-menu-inline-submenu-background` 单独覆盖
- 优化 [加载中 Spin](/guide/components/spin.html) 翻转双环配色：内环改为跟随外环取色、不再固定为主色，并修复两环交界处的叠压亮线
- 优化 [二维码 QRCode](/guide/components/qr-code.html) 的默认取色：`color` / `bgColor` / `borderColor` 改取 `--va-text-color-1` / `--va-bg-container-color` / `--va-border-split-color`，暗色主题下二维码自动反色；中央图标底色属性 `iconBackgroundColor` 移除，改用 `iconBgColor`
- 新增 [二维码 QRCode](/guide/components/qr-code.html) 的 `spinProps` 属性，可配置 `loading` 状态的指示符与文案；遮罩不透明度改由 `--qr-code-mask-opacity` 控制，默认值由 `1` 改为 `0.96`
- 修复 [抽屉 Drawer](/guide/components/drawer.html) 面板阴影在暗色主题下与遮罩叠加出更深的色带
- 修复 [轮播图 Swiper](/guide/components/swiper.html) 分页器未选中的圆点与进度条轨道在暗色主题下不可见
- 修复 [徽标 Badge](/guide/components/badge.html) 实色底上的计数文字在暗色主题下对比不足的问题
- 修复 [日期选择器 DatePicker](/guide/components/date-picker.html) 与 [时间选择器 TimePicker](/guide/components/time-picker.html) 范围选择箭头在暗色主题下与面板底色割裂
- 优化 [下拉菜单 Dropdown](/guide/components/dropdown.html) 与 [选择器 Select](/guide/components/select.html) 选项类型的透传字段类型，读取自定义字段无需再断言
- 更新使用者文档和贡献者文档
- 组件库及文档代码优化

## <VersionDateTag date="2026-10-24">3.2.1</VersionDateTag>

- 修复 [按钮 Button](/guide/components/button.html) 与 [开关 Switch](/guide/components/switch.html) 波纹未播完时连点、后续波纹不再播放的问题
- 修复 [开关 Switch](/guide/components/switch.html)、[单选框 Radio](/guide/components/radio.html) 与 [复选框 Checkbox](/guide/components/checkbox.html) 波纹未播完即被禁用、重新启用后凭空播放一次波纹的问题
- 优化 [按钮 Button](/guide/components/button.html)、[开关 Switch](/guide/components/switch.html)、[单选框 Radio](/guide/components/radio.html) 与 [复选框 Checkbox](/guide/components/checkbox.html) 的水波纹动画及样式效果
- 组件库及文档代码优化

## <VersionDateTag date="2026-10-24">3.2.0</VersionDateTag>

- 重构并增强 [文本省略 Ellipsis](/guide/components/ellipsis.html)：提示显隐与溢出状态不再改变文本容器的结构、类名与样式，提示实例按需创建（受控开合时提前创建）；`tooltip` 由 `boolean` 扩展为 `boolean | EllipsisTooltipProps`，原先直接写在组件上的 [文字提示 Tooltip](/guide/components/tooltip.html) 属性（如 `bg-color` / `trigger`）需移入该对象，`content-class` / `content-style` 一并失效（类名与样式直接写在组件上），并新增 `EllipsisTooltipProps` 类型导出；`expand` 在单行文本下同样可展开
- 优化 [浮动按钮 FloatButton](/guide/components/float-button.html)：无提示内容时不再创建 [文字提示 Tooltip](/guide/components/tooltip.html) 实例，按钮的结构、类名与尺寸保持不变
- 新增 [文字提示 Tooltip](/guide/components/tooltip.html) 的 `anchor` 与 `getDisabled` 属性：前者传入外部元素作为锚点（不再渲染触发包裹层），后者在每次展示前判定是否允许展示
- 更新组件库文档

## <VersionDateTag date="2026-10-23">3.1.0</VersionDateTag>

- 重构并增强 [时间轴 Timeline](/guide/components/timeline.html)：拆分为容器 + `TimelineItem` 节点组件（容器只管整体布局与状态，数据场景直接 `v-for` 渲染；节点结构改为语义化列表 `ul` / `li`，补齐无障碍语义与系统减少动效偏好下的表现），新增幽灵节点 `pending` / `pendingDot`（内置加载环）、倒序 `reverse`、水平排列 `horizontal`（超出可横向滚动）与尺寸档位 `size` / `iconSize`，节点补齐 `title` / `content` / `time` 三段结构与左侧标签 `label`，并支持 `position` / `lineType` 单侧覆盖、自定义轴点插槽与预设语义色轴点
- 调整 [时间轴 Timeline](/guide/components/timeline.html) 的属性、插槽、类名与类型导出：移除 `items` 属性与 `Item` 类型（节点改用 `TimelineItem` 承载）、`width`（宽度交由宿主布局控制）与空内容 `--` 占位；`desc` → `content`、`lineStyle` → `lineType`、`mode` 的 `center` → `alternate`、容器 `position` → `start`（默认 `left` → `right`，交替模式内容先从右侧出现）；旧 `dot` / `desc` 作用域插槽改为无作用域参数的 `dot` / 默认插槽；除 `timeline-wrap` 外类名一律更名（如 `timeline-item` → `timeline-item-wrap`、`timeline-dot` → `timeline-item-head`），依赖旧类名的自定义样式需同步改写；`TimelineItem` 类型改为同名组件、节点配置类型改用 `TimelineItemProps`
- 组件库文档更新优化

## <VersionDateTag date="2026-10-22">3.0.0</VersionDateTag>

- 重构 [全局化配置 ConfigProvider](/guide/components/config-provider.html) 的 `theme` 为 `{ seed, mode, components }`：原 `{ common, 组件名 }` 写法移除（组件级配色改用 `theme.components`），颜色只需给种子，色阶、状态色与暗色档位由库内派生；主题相关迁移（`theme` 形状、`abstract` 默认值、被移除的工具函数与私有变量）对照见[定制主题](/guide/customize-theme.html#迁移-旧版主题-api)
- 重建主题变量契约：新增 `40` 个全局语义变量（主色阶 / 状态色 / 文字 / 底色 / 边框 / 填充 / 投影 / 遮罩）与 `51` 个组件令牌（含 [滑动输入条 Slider](/guide/components/slider.html) 刻度点的常态 / 悬停 / 激活描边），组件配色统一只取 `--va-*`（含 `--va-cp-*` 组件主色桥），在任一祖先选择器上即可整组换肤或逐值改单点
- [全局化配置 ConfigProvider](/guide/components/config-provider.html) 组件新增暗色模式 `theme.mode`（`light` / `dark` / `auto`，`auto` 跟随系统配色）：静态变量表随样式产物下发，纯 `CSS` 场景直接写 `<html data-va-mode="dark">` 即可；`Teleport` 浮层与页面链接一并跟随，并逐处补齐遮罩、面板、气泡与固定色表面（[模态框 Modal](/guide/components/modal.html) / [抽屉 Drawer](/guide/components/drawer.html) / [图片 Image](/guide/components/image.html) 预览、[对话框 Dialog](/guide/components/dialog.html)、[二维码 QRCode](/guide/components/qr-code.html)、[菜单 Menu](/guide/components/menu.html) 折叠气泡、[颜色选择器 ColorPicker](/guide/components/color-picker.html)、[标签 Tag](/guide/components/tag.html)、[表格 Table](/guide/components/table.html)、[列表 List](/guide/components/list.html)）
- [全局化配置 ConfigProvider](/guide/components/config-provider.html) 组件新增组件级主色 `theme.components.<组件名>.primaryColor`，覆盖 `39` 个使用主色的内置组件，键名写错会在编译期报错，旧版由 `JS` 注入的 `--<组件名>-primary-color` 一类主题变量一并移除：曾用它们覆盖组件配色的样式需改为 `--va-<组件名>-*` 令牌或 `theme.components`
- [全局化配置 ConfigProvider](/guide/components/config-provider.html) 组件 `abstract` 属性默认值由 `true` 改为 `false`：实例默认渲染一层包裹元素（`tag` 可换 `span` 等），主题只作用于自身子树；需要页面级主题（`Teleport` 浮层、页面链接色）时在最外层显式传 `:abstract="true"`
- 移除 `toggleDark` / `rafTimeout` / `cancelRaf` / `getColorPalettes` / `getAlphaColor` 与 `AnimationFrameID` 类型：暗色切换改用 `theme.mode` 或直接写 `data-va-mode`，延时改用 `setTimeout` / 原生 `requestAnimationFrame`，取色改用 `derive(seed, mode)`（支持 `JS` / `canvas` / `SVG` 场景）
- 新增主题公开出口 `derive` / `DEFAULT_PRIMARY` / `DEFAULT_SEEDS` / `THEME_VAR_NAMES` / `MODE_ATTRIBUTE` 与 `ThemeSeed` / `ThemeMode` / `ResolvedMode` / `ThemeVars` / `ThemeSnapshot` / `ComponentThemeConfig` / `ThemeComponentKey` 类型，脚本取色与 `--va-*` 取同一份派生结果
- 统一库内告警输出：`error` 全环境输出、`warn` / `debug` 仅开发期输出，同一提醒只输出一次；[二维码 QRCode](/guide/components/qr-code.html) 编码 / 绘制失败与 [折叠面板 Collapse](/guide/components/collapse.html) 复制失败改为 `error`
- [水印 Watermark](/guide/components/watermark.html) 默认色由固定黑 / 白改为语义变量（显式传 `textStyle.color` 后不再随模式反转），并让 `fixed=false` 时覆盖整个文档而不只首屏
- 离散 API（`createDiscreteApi`）的浮层不再改写 `<html>`：未传主题时继承主应用主题，传 `configProviderProps.theme` 时在该浮层内独立生效（见[离散 API 的主题](/guide/components/config-provider.html#离散-api-的主题)），`dispose()` 也不会误清主应用写入的变量
- 修复 [日历 Calendar](/guide/components/calendar.html) 年选择器选中年份后列表区间随面板平移，重新展开才滚动到选中项
- 修复 [按钮 Button](/guide/components/button.html) 点击后动画未结束即被禁用、重新启用时凭空播放波纹
- 修复 [进度条 Progress](/guide/components/progress.html) 进度值越界或非数导致进度条显示异常
- 修复 [回到顶部 BackTop](/guide/components/back-top.html) 提示气泡的圆角被库强制覆盖、无法沿用 [文字提示 Tooltip](/guide/components/tooltip.html) 自身圆角
- 全量适配组件库浅色和暗色主题，优化组件库构建配置
- 更新组件库文档和贡献者文档
- 组件库及文档代码优化

## <VersionDateTag date="2026-10-19">2.15.2</VersionDateTag>

- 重构并增强 [单选框 Radio](/guide/components/radio.html) 与 [复选框 Checkbox](/guide/components/checkbox.html)：新增 `RadioGroup` / `CheckboxGroup` 组合式用法（统一下发选中值与禁用态并承载组内选项，组内项以 `value` 标识自身，`Radio` 另有 `RadioButton` 提供按钮形态，`options` 支持字符串 / 数字简写与 `VNode` 选项名）与原生 `input` 承载（`name` 下发到组内每个原生 `input`，`id`（前缀 + 选项下标）/ `autofocus` 在 `options` 模式下下发，补齐键盘操作与屏幕阅读器语义，暴露 `focus` / `blur` 实例方法且调用 `focus` 时同样显示焦点环，`change` 事件在「新值」首参之后追加事件对象——含状态快照与原始事件，首参用法不受影响，`RadioChangeEvent` / `CheckboxChangeEvent` 类型随组件一并导出），优化选中反馈并修复定高行内与输入框混排时文字与控件基线错位、内容溢出行盒的问题
- 移除 [单选框 Radio](/guide/components/radio.html) 与 [复选框 Checkbox](/guide/components/checkbox.html) 的 `options` / `vertical` / `gap` 属性，配置式写法统一由 `RadioGroup` / `CheckboxGroup` 承载；[复选框 Checkbox](/guide/components/checkbox.html) 的 `value` 不再接受数组；[单选框 Radio](/guide/components/radio.html) 的 `buttonSize` 更名为 `size`（置于 `RadioGroup` 内时由组的 `size` 下发，组未指定时回落自身尺寸）；选项类型统一为 `RadioGroupOption` / `CheckboxGroupOption`（`RadioOption` / `CheckboxOption` 不再导出）
- [日历 Calendar](/guide/components/calendar.html) 的模式切换器改用 `RadioGroup`，`modeRadioProps` 类型同步改为 `RadioGroupProps`
- 修复 [输入框 Input](/guide/components/input.html)：未绑定 `v-model` 时输入内容（含输入法合成文本）会因悬浮 / 聚焦等状态变化丢失，与文字混排时会把所在行文字基线压低
- 更新组件库文档和贡献者文档
- 组件库及文档代码优化

## <VersionDateTag date="2026-10-18">2.15.1</VersionDateTag>

- 增强 [日历 Calendar](/guide/components/calendar.html)：新增 `defaultValue`、`validRange`（字符串按 `valueFormat` 解析、区间外的年 / 月选项一并收窄）与 `headerFull` / `dateFull` / `monthFull` 插槽，`mode` 改为受控（外部变更同步到面板），并补齐键盘导航（月份面板按月步进）、`grid` 无障碍语义、整月 / 整年禁用与窄屏头部
- 重构 [日历 Calendar](/guide/components/calendar.html) 的对外接口：`select` 每次选中都触发（含重复点击已选中日期），第二参改为 `{ source }`（新增 `year` / `customize` 来源），年 / 月选择器与键盘操作同样写回选中值并触发 `change` / `select`，`panelChange` 在跨月 / 跨年时补发；移除 `dateStrip` 属性，日期区恒定渲染六周，新增 `CalendarSelectInfo` 类型导出
- 优化修复 [日历 Calendar](/guide/components/calendar.html) 的取值与显示
- 更新补充 [日历 Calendar](/guide/components/calendar.html) 演示文档
- 更新组件库文档：文档站补充社交分享卡片的标签与分享封面图，页面链接分享到社交平台时可显示该页标题、描述与封面图
- 组件库及文档代码优化

## <VersionDateTag date="2026-10-17">2.15.0</VersionDateTag>

- 重构并增强 [颜色选择器 ColorPicker](/guide/components/color-picker.html)：浮层改为组件自持，显隐改用 `v-model:open`（原 `v-model:show`），面板样式改用 `panelStyle` / `panelClass`（原 `tooltipStyle`），原 [文字提示 Tooltip](/guide/components/tooltip.html) 派生属性（延迟、箭头等）与 `trigger` 插槽旧回传值一并移除（现回传 `{ value }`，程序化开合请用 `v-model:open`），并新增 `defaultOpen` / `openChange` / `destroyOnHide` / `placement` / `to` / `zIndex` / `offset` 属性；`complete` 事件改为仅在输入框提交或拖动结束时触发（依赖「选色即完成」请改用 `update:value`）；同时修复非法色值与越界输入导致崩溃、禁用态仍可展开、`panelStyle` 宽度反复展开跳变等问题
- [文字提示 Tooltip](/guide/components/tooltip.html)（含派生的 [气泡卡片 Popover](/guide/components/popover.html) / [气泡确认框 Popconfirm](/guide/components/popconfirm.html)）的显隐双向绑定统一为 `v-model:open`（原 `v-model:show`），`showControl` 改名为 `openControl`
- 修正告警输出：[上传 Upload](/guide/components/upload.html) 的 `beforeUpload` 返回 `false` 时不再误报为「执行出错」，回调异常改走 `error` 级；开发期告警统一为 `[vue-amazing-ui] {组件名}: {说明}` 并修复其在库构建下永不输出的问题（现随使用方构建环境生效），运行时错误与降级日志同样加前缀
- 更新使用者文档与贡献者文档
- 组件库及文档代码优化

## <VersionDateTag date="2026-10-16">2.14.2</VersionDateTag>

- 优化 [回到顶部 BackTop](/guide/components/back-top.html) 的 `listenTo` 属性：字符串参数改为按 `CSS` 选择器解析（元素标签名本身就是合法选择器，原写法仍然有效）
- 新增 [滚动条 Scrollbar](/guide/components/scrollbar.html) 实例属性 `scrollElement`，可获取内部滚动容器元素（便于为 `BackTop` 等指定滚动监听目标）；文档同步修正 `getScrollData` 的类型签名（补全漏标的 `scrollTop`）
- 优化 [菜单 Menu](/guide/components/menu.html) 组件，将 `select` / `deselect` 事件参数类型 `SelectInfo` 调整为 `MenuSelectInfo`
- 更新 [布局 Layout](/guide/components/layout.html) 文档：补充 `CSS` 变量清单与浅色侧边栏底色的覆盖示例
- 更新 [栅格 Grid](/guide/components/grid.html) 文档：补充固定高度容器下 `align="stretch"` 的生效边界与正确写法
- 更新 [回到顶部 BackTop](/guide/components/back-top.html) 文档：补充与容器内滚动组合时的监听目标选取说明
- 组件库及文档代码优化

## <VersionDateTag date="2026-10-15">2.14.1</VersionDateTag>

- 重构并增强 [二维码 QRCode](/guide/components/qr-code.html)：编码改为内置实现（移除第三方依赖，体积减小），`canvas` / `image` 高清屏清晰度提升；修复 `canvas` 不渲染、重复更新累积画布、中央图标缺底色块 / 被拉伸、`bordered` 绘制区尺寸偏差与跳动等问题；新增 `status` 属性与 `refresh` 事件（`active` / `expired` / `loading` / `scanned` 四种状态，含遮罩与点击刷新）、`iconBackgroundColor` / `iconBorderRadius` / `title` / `padding` 属性与 `--qr-code-mask-bg-color` / `--qr-code-mask-text-color` 遮罩变量，中央图标绘入二维码本体（导出图片同样包含）
- [二维码 QRCode](/guide/components/qr-code.html) 组件的 `errorLevel` 改为「最低等级」且默认值由 `'H'` 改为 `'M'`（需保留原行为可显式设置 `errorLevel="H"`）、`scale` 改为「最小像素倍率下限」，实例方法 `getQRCodeImage` 更名为 `toDataURL` 并改为同步返回 `string`（`await ref.getQRCodeImage()` 改为 `ref.toDataURL()`）；[二维码 QRCode](/guide/components/qr-code.html) 与 [回到顶部 BackTop](/guide/components/back-top.html) 的根类名与 `CSS` 变量前缀统一为组件目录名的短横线形式（`qrcode-wrap` → `qr-code-wrap`、`backtop-wrap` → `back-top-wrap`，`--qrcode-*` / `--backtop-*` → `--qr-code-*` / `--back-top-*`，[回到顶部 BackTop](/guide/components/back-top.html) 的 `desc` → `description`），依赖旧 `API` / 类名 / 变量的自定义用法需同步调整
- 优化并更新 [二维码 QRCode](/guide/components/qr-code.html) 组件文档演示

## <VersionDateTag date="2026-10-14">2.14.0</VersionDateTag>

- 新增 [时间选择器 TimePicker](/guide/components/time-picker.html) 组件：时分秒三列滚动面板，支持 `type="timerange"` 范围形态、`12` 小时制与步长配置；[全局化配置 ConfigProvider](/guide/components/config-provider.html) 的 `theme` 同步新增 `TimePicker` 键
- 重构 [日期选择器 DatePicker](/guide/components/date-picker.html) 为自研实现（移除第三方依赖）：`v-model` 改用 `v-model:value` / `v-model:formatted-value`（毫秒时间戳 / 字符串双轨），`modelType` 改用 `valueFormat`，`mode` / `range` / `showTime` / `maxRange` 移除（形态改由 `type` 承担），`format` 不再支持函数形态，`showToday` 默认值由 `false` 改为 `true`
- 增强 [日期选择器 DatePicker](/guide/components/date-picker.html)：新增日期时间、周、月 / 季 / 年及各自的范围形态（含 `presets` 预设范围与按段配置），以及面板定制（`dateRender` / `renderExtraFooter`）、键盘导航与无障碍语义，并新增 `defaultTime` / `allowEmpty` / `showNow` / `showArrow` / `inputReadOnly` / `panelClass` / `panelStyle` / `zIndex` 等属性与 `panelChange` 事件
- 修复锁定页面滚动时背景页面与浮层横向抖动、且页面仍可横向推移的问题：锁定期间横向滚动一并禁用，被回收的滚动条宽度等量补偿，库内常驻的 [回到顶部 BackTop](/guide/components/back-top.html) 与 [浮动按钮 FloatButton](/guide/components/float-button.html) 一并补偿（宿主自有固定定位元素可用 `--va-scrollbar-width` 自行补偿）
- 组件库不再对外导出 `lockScroll` 工具函数
- 全局字体口径调整：库不再声明字体族，组件与内容继承宿主字体（原生表单控件由 `font-family: inherit` 兜底），浮层改为承接触发位置的字体族
- 组件库所有组件内部样式变量统一加组件名前缀，如曾用它做过外部覆盖，请同步改名
- 更新使用者文档与贡献者文档
- 组件库及文档代码优化

## <VersionDateTag date="2026-10-13">2.13.2</VersionDateTag>

- 修复 [全局化配置 ConfigProvider](/guide/components/config-provider.html) 组件级主题：运行期增删组件键即时生效（新增覆盖生效、移除覆盖回退 `common`），`theme` 中的非本库组件键改为忽略并告警
- 修复 [文本省略 Ellipsis](/guide/components/ellipsis.html) 的 `tooltipMaxWidth` 属性不生效的问题
- 更新 [全局化配置 ConfigProvider](/guide/components/config-provider.html) 与 [定制主题](/guide/customize-theme.html) 文档：新增「运行期切换组件级主题」示例，补充 `theme` 的运行期用法与组件主题键名 / 回退顺序说明
- 更新 [日历 Calendar](/guide/components/calendar.html) 文档演示：通知事项改用 [文本省略 Ellipsis](/guide/components/ellipsis.html) 截断并悬浮展示完整内容
- 优化更新贡献者文档和 `README` 文档

## <VersionDateTag date="2026-10-12">2.13.1</VersionDateTag>

- 优化并增强 [加载中 Spin](/guide/components/spin.html)：新增 `delay` / `fitContent` 属性与自定义指示符（`indicator` 属性 / `#indicator` 插槽，含 `SpinIndicator` / `SpinBuiltinIndicator` 类型导出）；重做点阵 / 线阵与 `magic-ring` 翻面动效，`speed` / `spinCircleWidth` 现同时支持 `magic-ring`；指示符进出淡入淡出；修复 `spinCircleWidth` / `spinCirclePercent` 越界值导致指示符消失
- 重命名 [加载中 Spin](/guide/components/spin.html) 组件属性 `indicator` 取值：`spin-dot` → `dot-wheel`、`spin-line` → `line-wheel`（旧值已移除）

## <VersionDateTag date="2026-09-30">2.13.0</VersionDateTag>

- 新增 [布局 Layout](/guide/components/layout.html) 组件：含 `Layout` / `LayoutHeader` / `LayoutContent` / `LayoutFooter` / `LayoutSider`，支持侧边栏收起与 `light` / `dark` 主题
- 新增 [导航菜单 Menu](/guide/components/menu.html) 组件：支持 `items` 配置与 `MenuItem` / `MenuSubMenu` / `MenuItemGroup` / `MenuDivider` 子组件两种写法，含 `horizontal` / `vertical` / `inline` 三种菜单类型与 `light` / `dark` 主题，展开与选中可受控、可多选，`inline` 支持收起与缩进，水平溢出收进省略子菜单
- 增强 [全局化配置 ConfigProvider](/guide/components/config-provider.html)：`theme` 新增 `Menu` 键（可按 `Menu` 覆盖主题色）；`common.primaryColor` 派生的色阶写入 `--va-link-color` / `--va-link-color-hover` / `--va-link-color-active`，页面链接颜色随主题色一并变化 —— 默认写到 `:root` 全局生效，`:abstract="false"` 的嵌套实例只在自身子树内生效
- 优化 [全局提示 Message](/guide/components/message.html) 的进出场动效时长
- 修复 [滑动输入条 Slider](/guide/components/slider.html) 手柄气泡在贴近容器边缘时不再居中的问题
- 全局默认样式的 `<a>` 重构为 `:where()` 包裹的低特异性链接基座，配色改由主色色阶决定（常态 / 悬停 / 按下为 `#1677ff` / `#69b1ff` / `#0958d9`，原悬停色 `#4096ff`），且不再移除焦点轮廓；同时移除 `--primary-color` / `--primary-color-hover` 主题变量，主题色请改用 [全局化配置 ConfigProvider](/guide/components/config-provider.html) 的 `theme`
- 更新 [全局化配置 ConfigProvider](/guide/components/config-provider.html) 文档：新增「链接颜色跟随主题」章节（变量、作用域与自定义覆盖写法），主题示例与 `ComponentName` 类型补 `Menu`，并订正 `tag` 属性的生效条件为 `abstract` 为 `false` 时有效
- 更新贡献者文档：`development/` 的全局样式说明改为「组件样式基座 + 主题色由 `ConfigProvider` 提供」，并补充链接色变量的双作用域写入规则
- 组件库及文档优化

## <VersionDateTag date="2026-09-24">2.12.0</VersionDateTag>

- 新增 [下拉菜单 Dropdown](/guide/components/dropdown.html) 组件
- 补齐 [对话框 Dialog](/guide/components/dialog.html) / [全局提示 Message](/guide/components/message.html) / [模态框 Modal](/guide/components/modal.html) / [通知提醒 Notification](/guide/components/notification.html) 的 `Provider` 默认插槽类型声明
- 组件库及文档优化

## <VersionDateTag date="2026-09-23">2.11.0</VersionDateTag>

- 优化统一 [选择器 Select](/guide/components/select.html)、[级联选择 Cascader](/guide/components/cascader.html)、[开关 Switch](/guide/components/switch.html) 的 `API` 形态：双向绑定改用 `v-model:value`（回写事件 `update:value`）；`label` / `value` 字段名属性合并为 `fieldNames` 对象，改用 `:field-names="{ label: 'name', value: 'id' }"`（分组 / 后代子选项字段名分别为 `Select` 的 `options` 与 `Cascader` 的 `children``）；Select` 的 `search` / `filter` 更名为 `showSearch` / `filterOption`（旧名移除）、`placement` 取值扩展为四向（默认 `bottomLeft`）、`change` 回调第二参由文本 `label` 改为完整 `option` 对象，并新增 `SelectValue` / `SelectFieldNames` / `CascaderFieldNames` 类型导出
- 重构并增强 [选择器 Select](/guide/components/select.html)：单选模式属性 / 事件 / 插槽 / 方法全量补齐（`bordered` / `status` / `loading` / `dropdownRender` / `notFoundContent` 等属性与 `focus()` / `blur()` / `scrollTo()` 等方法），新增多选 / 标签模式（`mode`、标签折叠 `maxTagCount` / `tagRender`、`tokenSeparators` 分词与 `deselect` 事件，多选下 `value` 为数组）、`labelInValue`、子组件式选项 `SelectOption` / `SelectOptGroup`、默认开启的虚拟滚动 `virtual` 与无障碍语义，并优化下拉面板滚动越界回弹；按选项文本搜索需显式传 `option-filter-prop="label"`
- [描述列表 Descriptions](/guide/components/descriptions.html) 与 [列表 List](/guide/components/list.html) 的主组件上提至组件目录顶层；自动按需引入不受影响，手动引入样式需将 `descriptions/descriptions/style` 改为 `descriptions/style`，`list` 同理
- 修复聚合入口具名导出在产物 `JS` 中缺失的问题：`Row` / `Col` / `useDialog` / `useMessage` / `useModal` / `useNotification` / `useLoadingBar` / `createDiscreteApi` 此前从包入口具名引入时运行时为 `undefined`，现均可正常引入
- 补齐 [轮播图 Carousel](/guide/components/carousel.html) 的插槽类型声明（新增 `CarouselSlots` 类型），自定义箭头 / 圆点插槽可获得作用域参数类型提示
- 组件库及文档代码优化

## <VersionDateTag date="2026-09-22">2.10.1</VersionDateTag>

- 重构 [加载条 LoadingBar](/guide/components/loading-bar.html) 为 `Provider + Hook` 形态：新增 `<LoadingBarProvider>` + `useLoadingBar()` 与 `createDiscreteApi(['loadingBar'])` 两种 `api` 获取方式（形态与 [全局提示 Message](/guide/components/message.html) / [模态框 Modal](/guide/components/modal.html) 等同族组件一致），并新增 `loadingBarStyle` 属性（可按 `loading` / `finish` / `error` 三态注入自定义样式）；`<LoadingBar>` 组件本体继续导出，`props` 与 `start` / `finish` / `error` 方法签名不变，但 `api` 由 `ref` 改为经 `@ready` 回传 —— 原 `<LoadingBar ref="loadingBar">` + `loadingBar.value.start()` 写法需迁移为 `<LoadingBar @ready="api = $event" />` 或改用 `useLoadingBar()`
- 修复 `createDiscreteApi` 在路由守卫（`app.runWithContext` 上下文）中调用时取不到 `api` 的问题，影响 [加载条 LoadingBar](/guide/components/loading-bar.html) / [对话框 Dialog](/guide/components/dialog.html) / [全局提示 Message](/guide/components/message.html) / [模态框 Modal](/guide/components/modal.html) / [通知提醒 Notification](/guide/components/notification.html)
- 更新使用者文档：[加载条 LoadingBar](/guide/components/loading-bar.html) 重写演示与 `api` 用法说明（改用 `<LoadingBarProvider>`），[全局化配置 ConfigProvider](/guide/components/config-provider.html) 与 [快速上手](/guide/getting-started.html) 的加载条示例同步迁移
- 更新贡献者文档：`development/component-design.md` 将 `loading-bar` 纳入「`SFC + Hook + Provider`」三段式清单并补充 `LoadingBarProvider` 的样式入口登记，`development/demo-doc-guide.md` 的全局包裹写法同步改为 `useLoadingBar()`

## <VersionDateTag date="2026-09-21">2.10.0</VersionDateTag>

- 新增 [评论 Comment](/guide/components/comment.html) 组件
- 重构按需引入的样式注入为「每组件一个样式入口」：手动引入可用 `import 'vue-amazing-ui/es/button/style'` 一次引全全局默认样式、组件自身样式与其依赖组件样式，无需再自行列举；自动按需引入（`VueAmazingUIResolver`）用法与行为不变
- 更新使用者文档：[按需引入](/guide/import-on-demand.html)、[快速上手](/guide/getting-started.html) 与 [特性](/guide/features.html) 的手动引入示例统一改用上述样式入口写法并合并重复内容，`README` 同步；组件文档示例风格与文档站正文样式一并订正
- 更新贡献者文档：`development/` 补充样式入口模型、构建后处理与产物校验说明，并同步「新增组件三步接线」清单；`CONTRIBUTING` 补充 `pnpm verify` 门禁与对应自检提示
- 工程优化：新增 `GitHub Actions` 门禁、按需引入的产物级校验脚本与发布守卫等

## <VersionDateTag date="2026-09-20">2.9.0</VersionDateTag>

- 重构组件库内部浮层能力，收敛为统一内核与内部宿主，[文字提示 Tooltip](/guide/components/tooltip.html)、[选择器 Select](/guide/components/select.html)、[自动完成 AutoComplete](/guide/components/auto-complete.html)、[滑动输入条 Slider](/guide/components/slider.html) 全部接入 —— 公开 `props` / 事件 / 插槽行为均无变化，仅 [自动完成 AutoComplete](/guide/components/auto-complete.html) 的 `value` 由必填放宽为可选
- 移除 [文字提示 Tooltip](/guide/components/tooltip.html) 与 [文本省略 Ellipsis](/guide/components/ellipsis.html) 上未文档化的 `observeScroll` 方法，滚动跟随改由内部处理
- 公开工具函数由 `24` 个缩减为 `22` 个，移除 `useFloatingPosition` 与 `useInject` —— 浮动定位请改用上述浮层组件
- 新增 [全局化配置 ConfigProvider](/guide/components/config-provider.html) 的 `baseZIndex` 属性：传入后统一为浮层分配层级（后打开者在上），修复浮层被 [对话框 Modal](/guide/components/modal.html) / [弹窗 Dialog](/guide/components/dialog.html) / [抽屉 Drawer](/guide/components/drawer.html) 遮罩覆盖的问题
- 默认层级同步收敛：[文字提示 Tooltip](/guide/components/tooltip.html) 族 `999 → 1070`、[选择器 Select](/guide/components/select.html) 与 [自动完成 AutoComplete](/guide/components/auto-complete.html) `1000 → 1050`、[图片 Image](/guide/components/image.html) 预览遮罩 `1000 → 1070`
- [全局提示 Message](/guide/components/message.html) / [通知提醒 Notification](/guide/components/notification.html) 默认层级由 `2000` 调整为 `1030` / `1040`，不再高于浮层，修复消息 / 通知内的 [选择器 Select](/guide/components/select.html) / [文字提示 Tooltip](/guide/components/tooltip.html) 被压住的问题
- 浮层隐藏后归还层级槽位（数值随「同时可见的浮层数」增长），[图片 Image](/guide/components/image.html) 未打开预览、[加载进度条 LoadingBar](/guide/components/loading-bar.html) 未开始加载时不再预先占用
- [文字提示 Tooltip](/guide/components/tooltip.html) / [选择器 Select](/guide/components/select.html) / [自动完成 AutoComplete](/guide/components/auto-complete.html) / [级联选择 Cascader](/guide/components/cascader.html) 及内部宿主 `Popup` 的 `to` 不传时不再固定挂 `body`，改为就近挂到承载层内容容器；显式传入 `to`（含 `to: false`）行为不变
- 补齐浮层定制入口：[文字提示 Tooltip](/guide/components/tooltip.html) 新增 `popupClassName` / `popupStyle` / `zIndex` / `destroyOnHide`（隐藏后卸载浮层 `DOM`），[选择器 Select](/guide/components/select.html) 新增 `popupClassName` / `dropdownMenuStyle` / `zIndex`，[自动完成 AutoComplete](/guide/components/auto-complete.html) 与 [图片 Image](/guide/components/image.html) 新增 `zIndex`，[滑动输入条 Slider](/guide/components/slider.html) 新增 `tooltipClass` / `tooltipPlacement` 与 `tooltip` 插槽
- 面板改由「参照容器 + 面板」两层组成并新增 `.va-popup-*` 类名，依赖旧 `DOM` 结构的 `:deep()` 选择器需改用上述公开属性；[滑动输入条 Slider](/guide/components/slider.html) 手柄气泡根类名由 `handle-tooltip` 调整为 `slider-tooltip`、箭头类名由 `tooltip-arrow` 调整为 `slider-tooltip-arrow`
- 新增 [选择器 Select](/guide/components/select.html) 键盘操作：`↑` `↓` 移动高亮项（跳过禁用项、端点回绕）、`Enter` 选中、`Esc` 关闭，面板收起时 `↑` `↓` 可直接展开，与 [自动完成 AutoComplete](/guide/components/auto-complete.html) 行为一致
- 修复浮层跟随：锚点位于嵌套双层滚动容器内时外层滚动不触发跟随
- 优化浮层溢出处理：空间不足时改为主动调整对齐侧（原为硬推回边界），箭头随对齐侧同步移动并始终指向触发器
- 修复承载层内的浮层残留：容器关闭后 [文字提示 Tooltip](/guide/components/tooltip.html) 等会随容器一起收起（此前仅点击容器外区域才会关闭，按 `Esc` 关闭或程序化关闭时残留打开态）
- 优化同族浮层的层叠顺序：容器改为随首次展示挂载并移到目标末尾，使上下关系始终等于最近一次打开的先后（后打开者在上；此前取决于模板源码顺序）
- 修复 [自动完成 AutoComplete](/guide/components/auto-complete.html) 受控 `open` 模式下开合事件方向相反的问题
- 修复 [选择器 Select](/guide/components/select.html) / [自动完成 AutoComplete](/guide/components/auto-complete.html) 容器关闭后残留聚焦边框、按 `Tab` 或点击其他区域切走焦点时面板未关闭

## <VersionDateTag date="2026-09-15">2.8.1</VersionDateTag>

- 新增 [滑动输入条 Slider](/guide/components/slider.html) 的 `SliderMarks` 类型导出，用于标注刻度数据的类型
- 优化并统一 [图片 Image](/guide/components/image.html) / [轮播图 Swiper](/guide/components/swiper.html) / [瀑布流 Waterfall](/guide/components/waterfall.html) 的图片名称提取：统一从 `src` 解析末段，剥离查询参数与哈希并做 `URL` 解码，`alt` 与下载文件名更准确
- 修复 [消息提示 Message](/guide/components/message.html) / [通知提醒 Notification](/guide/components/notification.html) 的 `icon` 传入字符串时不显示内容的问题，现统一渲染为文本节点
- 重构组件库内部公共能力（内容渲染、实例标识生成、焦点锁定、水波纹状态、视口宽度响应等），抽取为公共工具函数与组合式函数
- 收敛 `createDiscreteApi` 的内部类型导出：`DiscreteApiType` / `MaybeRef` / `DiscreteApi` 不再对外导出，仅影响从深层子路径导入的写法；`DiscreteApiOptions` / `DiscreteApiInstance` 不受影响
- 优化发布脚本：发版时输出可点击的 `git tag` 链接
- 优化文档演示：轮播图 `mousewheel` 演示默认开启、数字动画补全精度示例、主题定制与刻度示例改用 `import type` 导入类型
- 统一各组件文档中的类型引用为公开导出名（如 `TabsItem` / `SwiperImage` / `UploadFileType`），使用时可直接 `import type` 使用
- 组件库文档优化

## <VersionDateTag date="2026-09-14">2.8.0</VersionDateTag>

- 重构并增强 [描述列表 Descriptions](/guide/components/descriptions.html)：改为数据驱动渲染，新增 `layout` / `colon` / `labelAlign` 等属性、`#header` 插槽与 `xxxl` 断点，修复子项丢失等问题。移除 `vertical` 属性，改用 `layout="vertical"`
- 增强 [抽屉 Drawer](/guide/components/drawer.html)：新增 `to` / `push` / `size` / `mask` 等属性、`afterOpenChange` 事件与 `#closeIcon` 插槽，支持多层推动与 `class` / `style` 透传，修复打开后页面滚动被永久锁死。默认挂载到 `body`，依赖原渲染位置的样式需改用 `to` 或 `rootClassName` 定制
- 修复 [对话框 Modal](/guide/components/modal.html) / [Dialog](/guide/components/dialog.html) / [加载条 LoadingBar](/guide/components/loading-bar.html) / [消息提示 Message](/guide/components/message.html) / [通知提醒 Notification](/guide/components/notification.html) 的 `class` / `style` 无法透传问题
- 增强 [轮播图 Carousel](/guide/components/carousel.html)：新增 `loop` / `initialIndex` / 受控 `currentIndex` 等属性、`beforeChange` / `afterChange` 事件与 `#prevArrow` / `#nextArrow` / `#dots` 插槽，修复越界、加载失败、动画中断等交互问题；`fadeFunction` 默认值由 `'cubic-bezier(0.4, 0, 0.2, 1)'` 改为 `[0.4, 0, 0.2, 1]`。属性 `dotsTrigger` 更名为 `dotTrigger`；移除 `change` 事件，切换监听改用 `beforeChange` / `afterChange`，当前页同步使用 `v-model:current-index`
- 增强 [数字动画 NumberAnimation](/guide/components/number-animation.html)：缓动支持传入三次贝塞尔控制点数组与缓动函数，卸载时中止在飞动画。属性 `transition` 更名为 `easing`，类型 `NumberAnimationTransitionFunc` 更名为 `NumberAnimationEasingPreset`
- 优化工具函数文档：补充边界说明与可运行示例
- 修复 `lockScroll` 在 `SSR` / `Node` 环境调用报错；订正 [useOptionsSupported](/utils/functions/use-options-supported.html) 参数名为 `option`
- 修复按需引入 `VueAmazingUIResolver` 引用 `DescriptionsItem` 不存在的样式路径

## <VersionDateTag date="2026-09-12">2.7.4</VersionDateTag>

- 优化 [useSlotsExist](/utils/functions/use-slots-exist.html) 作用域插槽在探测时因无参调用触发形参位置解构的 `TypeError`，导致整页渲染中断，同时新增单元测试
- 增强 [徽标 Badge](/guide/components/badge.html) 组件：数值变化时数字逐位上下滚动（超出 `max` 展示 `max+`），离场期间保留隐藏前最后展示的数值；`showZero` 动态切换时同步刷新展示值
- 优化 [警告提示 Alert](/guide/components/alert.html)：重构关闭离场动画，冻结高度后平滑收缩、同步收起内边距与下边距、动画结束才卸载元素；新增 `afterClose` 事件
- 新增 [统计数值 Statistic](/guide/components/statistic.html) `tabularNums` 属性：数值滚动时使用等宽数字，避免宽度抖动
- 优化 [选择器 Select](/guide/components/select.html)：面板打开时自动将当前选中项滚动到可视区域内
- 修复 [formatNumber](/utils/functions/format-number.html)：数值为 `0` 时丢失 `prefix` / `suffix` 的问题
- 优化多个组件全局文字断行：`word-break: break-all` 调整为 `break-word`，避免英文单词与数字被从中间截断
- 组件库文档及工程优化

## <VersionDateTag date="2026-09-11">2.7.3</VersionDateTag>

- 优化 [文字提示 Tooltip](/guide/components/tooltip.html) 定位与交互：修复缩放动画期间位置错位、焦点在内容内移动时闪烁，受控 `show` 立即生效，补充 `role="tooltip"` 与 `aria-describedby`；订正 `enter` 文档描述（实际为切换显示）
- 增强 [返回顶部 BackTop](/guide/components/back-top.html)：`listenTo` 支持 `Document` 与返回目标的函数，修复整页滚动监听失效
- 修复 [水印 Watermark](/guide/components/watermark.html)：切换全屏后防篡改失效，清理写入 `<html>` 的 `style`
- 优化 [气泡卡片 Popover](/guide/components/popover.html) / [气泡确认框 Popconfirm](/guide/components/popconfirm.html)：订正 `enter` 文档描述（实际为切换显示）；`Popover` 移除 `keyboard` 属性
- 重构滚动工具函数：[useScroll](/utils/functions/use-scroll.html) / [useScrollParent](/utils/functions/use-scroll-parent.html) / [useMutationObserver](/utils/functions/use-mutation-observer.html) / [useResizeObserver](/utils/functions/use-resize-observer.html)：整页滚动改监听 `window` 以修复监听失效，统一观察目标归一化
- 新增 [Tooltip](/guide/components/tooltip.html)、[Popover](/guide/components/popover.html)、[Watermark](/guide/components/watermark.html)、[useScroll](/utils/functions/use-scroll.html)、[useScrollParent](/utils/functions/use-scroll-parent.html) 单元测试，同步更新文档
- 优化组件库发布脚本

## <VersionDateTag date="2026-09-10">2.7.2</VersionDateTag>

- 修复 `SSR` / `Node` 渲染报错：[Avatar](/guide/components/avatar.html)、[Row](/guide/components/grid.html) / [Col](/guide/components/grid.html)、[Descriptions](/guide/components/descriptions.html)、[QRCode](/guide/components/qr-code.html)、[Tag](/guide/components/tag.html)、[Watermark](/guide/components/watermark.html) 及 [useMediaQuery](/utils/functions/use-media-query.html)、[useFps](/utils/functions/use-fps.html)、[useMutationObserver](/utils/functions/use-mutation-observer.html)、[useResizeObserver](/utils/functions/use-resize-observer.html)、[useScrollParent](/utils/functions/use-scroll-parent.html)
- 修复卸载后定时器 / 动画帧泄漏：[Countdown](/guide/components/countdown.html)、[Carousel](/guide/components/carousel.html)、[TextScroll](/guide/components/text-scroll.html)、[Select](/guide/components/select.html)、[useFps](/utils/functions/use-fps.html)、[useMediaQuery](/utils/functions/use-media-query.html)
- 修复 [Carousel](/guide/components/carousel.html) 容器尺寸为 `0` 时自动轮播失效、[Select](/guide/components/select.html) 搜索过滤自触发循环、[Tag](/guide/components/tag.html) 动态编辑后输入框未清空、[Upload](/guide/components/upload.html) 重复选择同一文件不触发 `change`、[QRCode](/guide/components/qr-code.html) `canvas` 未就绪时跳过绘制、`cancelRaf` 帧 `id` 为 `0` 时误判
- 澄清 `rafTimeout` 语义：回调绑定渲染帧、页面不可见时暂停，与 `setTimeout` / `setInterval` **不等价**
- 优化 [Rate](/guide/components/rate.html) 未选中状态守卫；收敛组件与演示的模板引用类型，并为可空引用补充 `?.` 与判空守卫
- 工程优化：`postcss` + `autoprefixer` 按 `browserslist` 补齐产物 `CSS` 厂商前缀，`vue` 提升为 `peerDependencies`，`engines` / `packageManager` 收紧；新增 `prepublishOnly` 产物入口守卫与 `format:check` 门禁

## <VersionDateTag date="2026-09-09">2.7.1</VersionDateTag>

- 优化 [Dialog](/guide/components/dialog.html) / [Modal](/guide/components/modal.html) 的点击展开：修复命令式场景（如 `createDiscreteApi`）点击丢失、退回中心；离场动画按打开时的位置收起
- [Avatar](/guide/components/avatar.html)、[BackTop](/guide/components/back-top.html)、[Button](/guide/components/button.html)、[FloatButton](/guide/components/float-button.html)、[Popconfirm](/guide/components/popconfirm.html) 的 `icon` 类型由 `VNode | Slot` 收紧为 `VNode | (() => VNode)`，不再支持直接传组件对象，改用 `h(...)` 渲染函数或 `#icon` 插槽
- 类型强化：具名 / 作用域插槽组件补充 `xxxSlots` 类型并接入 `defineSlots()`，文档类型表同步清理 `string | slot` 写法

## <VersionDateTag date="2026-09-08">2.7.0</VersionDateTag>

- 移除 [Message](/guide/components/message.html)、[Notification](/guide/components/notification.html)、[Modal](/guide/components/modal.html) 实例 `ref` 上的命令式方法，统一改用 `useXxx()`（需外层 `XxxProvider`）或 `createDiscreteApi()`；[Dialog](/guide/components/dialog.html) 新增 `useDialog()` / `createDiscreteApi()` 命令式入口；`window['$xxx']` 写法改为赋值 `api`；`@ready` 回传 `api`，句柄支持 `destroy()` / `update()`，`Notification` 额外支持 `destroy(key)` 按 `key` 精确关闭
- 调整四组件浮层默认挂载：`Teleport` 到 `body`，新增 `to` 指定挂载节点；依赖原渲染位置的 `scoped` 样式与 `:deep()` 覆写失效，需改为全局样式
- 调整 `Notification`：`description` 更名 `content`、移除组件级 `title` / `description`、`top` / `bottom` 默认 `24` → `16`；Message 单条配置移除 `top`
- 调整 `Modal` 命令式 `maskClosable` 默认改 `false`（组件级仍为 `true`）、`Esc` 监听改绑弹窗主体（焦点移出弹窗后不再响应）、入口类型导出由 `Props` / `Modal` 调整为 `ModalProps` / `ModalOptions` / `ModalUpdate` / `ModalReactive` / `ModalApi`；[Upload](/guide/components/upload.html) 移除内嵌 Message：`messageProps` / `actionMessage` / `UploadMessageType` 及相关方法移除，改用 `success` / `error` / `remove` 事件
- 重构并增强 [Dialog](/guide/components/dialog.html) / [Modal](/guide/components/modal.html)：改为多实例层叠架构，新增 `mask` / `closable` / `closeIcon`、`wrapClass` / `containerClass` 等分层定制与 `onEsc` / `onMaskClick` / `afterClose` 回调（其中 [Dialog](/guide/components/dialog.html) 额外新增 `draggable` 拖拽），`title` / `content` 支持 `string` / `VNode` / 渲染函数 / 插槽，并补充 `aria-*` 与可聚焦关闭按钮
- 增强 [Notification](/guide/components/notification.html) / [Message](/guide/components/message.html) 组件：新增 `maxCount` / `keepAliveOnHover` / `to` 等属性，`Notification` 新增 `key` 与 `placement` 的 `top` / `bottom` 居中位置；定时器改为按 `key` 独立管理，修复多条干扰与常驻消息阻塞回收
- 新增 `lockScroll` 工具函数（第 `24` 个），`Drawer` / `Modal` / `Dialog` 统一改用并补充卸载兜底释放；修复 [Table](/guide/components/table.html) 就地改写用户 `columns`、空 `columns` 崩溃与 `colspan` 计算错误
- 优化 `VueAmazingUIResolver` 按需引入：新增四个命令式 `Provider` 组件的自动引入与样式注入，修复 `Modal` / `Notification` 缺失 [Scrollbar](/guide/components/scrollbar.html) 样式依赖
- 工程优化：`xxxProps` 类型由 `object` 精确为对应 `Props`；新增 `vitest` 单元测试并纳入 `pnpm check`；新增 `development/` 设计指南

## <VersionDateTag date="2026-08-30">2.6.2</VersionDateTag>

- 优化并更新 [下载文件 downloadFile](/utils/functions/download-file.html) 工具函数和文档：`iframe` 策略在未传入文件名时，自动从文件地址中提取文件名并拼接 `response-content-disposition` 参数，与 `anchor` 策略行为对齐，修复跨域图片 / `PDF` 等可预览类型在 `iframe` 内预览而非下载的问题；地址无有效文件名时（如纯域名）不拼接参数，避免发出 `filename` 为空的畸形请求
- 优化并更新 [图片 Image](/guide/components/image.html) 组件：未显式设置 `name` 时，自动使用从图片地址中提取的图片名称，内置下载与 `customDownload` 自定义下载方法均生效
- 优化组件库发布脚本
- 组件库配置及文档代码优化

## <VersionDateTag date="2026-08-29">2.6.1</VersionDateTag>

- 优化并重构 [通知提醒 Notification](/guide/components/notification.html) 组件，修复不同弹出位置的通知相互干扰的问题，多个弹出位置的通知可同时独立展示；自动关闭时长改为优先取单条通知的 `duration`，未设置时使用组件默认 `duration`
- 优化并更新 [图片 Image](/guide/components/image.html) 组件：支持从图片地址提取图片名称，兼容相对路径与带查询参数 / 哈希的地址，并支持 `URL` 解码（含非法百分号编码兜底）；优化预览动画效果，遮罩层与预览图动画一致
- 优化组件库发布脚本
- 组件库及文档代码优化

## <VersionDateTag date="2026-08-28">2.6.0</VersionDateTag>

- 组件文档路径统一为短横线命名，侧边栏与引用链接同步更新
- 拆分 `utils` 为多模块并整理导出；新增抽象弹出定位与滚动感知组合式函数，重构 [选择器 Select](/guide/components/select.html)、[文字提示 Tooltip](/guide/components/tooltip.html)、[自动完成 AutoComplete](/guide/components/auto-complete.html) 等弹出类组件代码
- 优化 [全局化配置 ConfigProvider](/guide/components/config-provider.html) 组件代码
- 优化并更新 [自动完成 AutoComplete](/guide/components/auto-complete.html) 组件文档及演示用例
- 优化按需引入时第三方样式的处理
- 优化并重构 [下载文件 downloadFile](/utils/functions/download-file.html) 工具函数：内置同源 `anchor` 与跨域 `iframe` 双下载策略并自动分流，支持自定义文件名（含中文）与下载策略配置
- 优化并更新 [图片 Image](/guide/components/image.html) 组件和文档用例，新增 `downloadOptions`、`customDownload` 属性，支持调整内置下载策略或提供完全自定义的下载方法
- 优化组件库 `vite` 构建配置逻辑与按需引入 `resolver` 逻辑
- 修复全局样式导入 `import 'vue-amazing-ui/css'` 的 `TypeScript` 类型声明缺失问题
- 优化组件库发布脚本，发版时自动生成并推送版本标签，并自动创建与标签同名的 `GitHub Release`
- 组件库及文档代码优化

## <VersionDateTag date="2026-08-26">2.5.3</VersionDateTag>

- 优化并更新 [自动完成 AutoComplete](/guide/components/auto-complete.html) 组件和文档：新增 `width` 属性，支持显式指定组件宽度
- 优化并更新 [全局化配置 ConfigProvider](/guide/components/config-provider.html) 组件和文档：`Theme` 类型新增 `AutoComplete` 组件级主题色配置，修复 `AutoComplete` 无法通过 `theme.AutoComplete` 单独定制主题色的问题
- 组件库配置优化

## <VersionDateTag date="2026-08-25">2.5.2</VersionDateTag>

- 优化并增强 [文字提示 Tooltip](/guide/components/tooltip.html) 组件：`flip` 主轴翻转改为同轴方向翻转（`top`↔`bottom` / `left`↔`right`），并始终保留原次轴对齐后缀；新增次轴方向溢出兜底逻辑，避免弹出框次轴方向超出视口或滚动容器边界；箭头新增回退样式，兼容不支持 `clip-path: path` 的浏览器；消除重复的类型定义；将模板内联事件表达式提取为具名方法，提升可读性与可维护性
- 优化并更新 [滑动输入条 Slider](/guide/components/slider.html)、[选择器 Select](/guide/components/select.html)、[文本省略 Ellipsis](/guide/components/ellipsis.html)、[数字动画 NumberAnimation](/guide/components/number-animation.html)、[倒计时 Countdown](/guide/components/countdown.html)、[瀑布流 Waterfall](/guide/components/waterfall.html)、[文字滚动 TextScroll](/guide/components/text-scroll.html)、[日历 Calendar](/guide/components/calendar.html)、[数字输入框 InputNumber](/guide/components/input-number.html) 组件，将多源原子值监听由「数组字面量 + deep」优化为多源 `getter` 数组，去除冗余的深度遍历
- 优化并更新 [悬浮按钮 FloatButton](/guide/components/float-button.html) 组件和文档，调整属性 `zIndex` 默认值由 `9` 为 `99`
- 文档新增 [AI Coding Kit](https://themusecatcher.github.io/ai-coding-kit/) 导航链接
- 组件库脚本优化

## <VersionDateTag date="2026-08-24">2.5.1</VersionDateTag>

- 优化并增强 [文字提示 Tooltip](/guide/components/tooltip.html) 组件和文档，`placement` 属性新增支持 `12` 个方向；新增 `arrowPointAtCenter` 属性使箭头指向目标元素中心；`bgColor` 支持多种预设色彩；`trigger` 新增 `focus` / `contextmenu` 触发方式；新增 `disabled` 属性支持禁用；`showDelay` / `hideDelay` 属性调整为仅在 `trigger: hover` 时生效，`click` / `focus` / `contextmenu` 等触发方式立即显示与隐藏；修复弹出框挂载到 `body` 时被中间可滚动容器边界误判导致意外翻转的问题
- 优化并更新 [颜色选择器 ColorPicker](/guide/components/color-picker.html) 组件和文档，优化弹层定位与显隐行为：弹层定位由 `bottom` 调整为 `bottomLeft`，避免面板与触发元素错位；新增 `keyboard` 键盘支持；`showDelay` / `hideDelay` 调整为立即显示与隐藏
- 优化并更新 [文本省略 Ellipsis](/guide/components/ellipsis.html) 组件，过渡动画时长与库默认档位对齐
- 组件库及文档代码优化

## <VersionDateTag date="2026-08-19">2.5.0</VersionDateTag>

- 新增 [自动完成 AutoComplete](/guide/components/auto-complete.html) 组件

## <VersionDateTag date="2026-08-17">2.4.27</VersionDateTag>

- 修复 [搜索框 InputSearch](/guide/components/input-search.html) 组件搜索按钮与输入框连接处的样式问题
- 优化 [走马灯 Carousel](/guide/components/carousel.html) 组件 `slideFunction` 属性类型定义，由 `string | number[]` 精确为 `CubicBezierPoints | EasingFunction`，提供更准确的类型提示
- 新增项目贡献指南，优化项目构建、工程配置及发布流程
- 组件库及文档代码优化

## <VersionDateTag date="2026-05-31">2.4.26</VersionDateTag>

- 优化 [滚动条 Scrollbar](/guide/components/scrollbar.html) 组件使用效果，调整属性 `autoHide` 默认值为 `false`，`delay` 属性默认值为 `0`

## <VersionDateTag date="2026-05-30">2.4.25</VersionDateTag>

- 优化 [表格 Table](/guide/components/table.html) 组件

## <VersionDateTag date="2026-03-08">2.4.24</VersionDateTag>

- 优化并更新 [颜色选择器 ColorPicker](/guide/components/color-picker.html)、[滚动条 Scrollbar](/guide/components/scrollbar.html)、[图片 Image](/guide/components/image.html)、[滑动输入条 Slider](/guide/components/slider.html) 组件，将鼠标事件（`Mouse Events`）迁移为指针事件（`Pointer Events`），统一支持鼠标、触屏和手写笔等多种输入设备的交互
- 优化并更新 [表格 Table](/guide/components/table.html) 组件，优化表格头部跟随滚动效果
- 优化并更新 [颜色选择器 ColorPicker](/guide/components/color-picker.html) 组件样式交互，为色相滑块和透明度滑块添加 `touch-action: none` 样式，修复触屏设备拖动时触发页面滚动的问题
- 组件库及文档代码优化
- 更新组件库部分依赖版本

## <VersionDateTag date="2025-11-17">2.4.23</VersionDateTag>

- 修复 [数字输入框 InputNumber](/guide/components/input-number.html) 组件初始为空值时非法输入未置空问题，关闭 [#44](https://github.com/themusecatcher/vue-amazing-ui/issues/44)
- 更新组件库部分依赖版本

## <VersionDateTag date="2025-10-15">2.4.22</VersionDateTag>

- 优化并更新 [滚动条 Scrollbar](/guide/components/scrollbar.html) 组件代码，修复当使用 `Methods` 进行滚动时滚动条无法正常显示的问题
- 优化并更新 [表格 Table](/guide/components/table.html) 组件代码
- 优化并更新 [标签页 Tabs](/guide/components/tabs.html) 组件代码
- 更新组件库部分依赖版本

## <VersionDateTag date="2025-09-05">2.4.21</VersionDateTag>

- 优化并更新 [选择器 Select](/guide/components/select.html) 组件，兼容弹出框在文档中自动调整弹出位置的功能
- 更新组件库部分依赖版本

## <VersionDateTag date="2025-09-02">2.4.20</VersionDateTag>

- 优化并更新 [文字提示 Tooltip](/guide/components/tooltip.html) 组件，兼容弹出框在文档中自动调整弹出位置的功能

## <VersionDateTag date="2025-08-28">2.4.19</VersionDateTag>

- 优化并更新 [选择器 Select](/guide/components/select.html) 组件，新增 `placement` `flip` `to` 属性，支持：设置下拉面板弹出位置；设置下拉面板被浏览器窗口或最近可滚动父元素遮挡时自动调整弹出位置；设置下拉面板挂载的容器节点，默认挂载到 `body` 下
- 优化并更新 [文字滚动 TextScroll](/guide/components/text-scroll.html) 组件，属性 `amount` 新增 `false` 类型，用于支持所有文字平铺展示；新增 `ellipsis` `ellipsisProps` 属性，支持：设置文字超出时是否启用文本省略组件；配置文本省略组件属性
- 组件库及文档代码优化
- 更新组件库部分依赖版本

## <VersionDateTag date="2025-08-22">2.4.18</VersionDateTag>

- 优化并更新 [回到顶部 BackTop](/guide/components/back-top.html)、[加载条 LoadingBar](/guide/components/loading-bar.html)、[文字提示 Tooltip](/guide/components/tooltip.html) 组件，在初始未展示时不进行任何组件渲染，提升初始加载性能

## <VersionDateTag date="2025-08-21">2.4.17</VersionDateTag>

- 优化并更新 [文字提示 Tooltip](/guide/components/tooltip.html) 组件，并在文档新增自定义设置弹出框挂载容器示例

## <VersionDateTag date="2025-08-19">2.4.16</VersionDateTag>

- 优化并更新 [颜色选择器 ColorPicker](/guide/components/color-picker.html) 组件拖动效果，修复不透明度拖动时位置偏差的问题

## <VersionDateTag date="2025-08-18">2.4.15</VersionDateTag>

- 优化并更新 [文字提示 Tooltip](/guide/components/tooltip.html) 组件，新增 `to` 属性，支持设置弹出框挂载的容器节点，默认挂载到 `body` 下
- 优化组件库部分使用 `Tooltip` 组件的代码逻辑
- 更新组件库部分依赖版本

## <VersionDateTag date="2025-06-19">2.4.14</VersionDateTag>

- 修复 [触摸滑动 Swiper](/guide/components/swiper.html) 组件，使用按需引入时样式版本引入错误的问题

## <VersionDateTag date="2025-06-05">2.4.13</VersionDateTag>

- 优化并更新 [表格 Table](/guide/components/table.html) 组件，新增 `rowKey` 属性，用于支持设置表格内容行的唯一标识 `key`

## <VersionDateTag date="2025-06-04">2.4.12</VersionDateTag>

- 优化并更新 [瀑布流 Waterfall](/guide/components/waterfall.html) 组件

## <VersionDateTag date="2025-06-02">2.4.11</VersionDateTag>

- 优化并更新 [图片 Image](/guide/components/image.html) 组件，修复预览时图片居中的问题

## <VersionDateTag date="2025-05-30">2.4.10</VersionDateTag>

- 新增 [是否支持事件监听器选项 useOptionsSupported](/utils/functions/use-options-supported.html) 工具函数，用于检查浏览器是否支持给定的事件监听器选项；优化组件库中使用了 `addEventListener` 事件监听器选项的组件代码
- 更新组件库部分依赖版本

## <VersionDateTag date="2025-05-29">2.4.9</VersionDateTag>

- 新增 [是否支持事件监听器选项 useOptionsSupported](/utils/functions/use-options-supported.html) 工具函数，用于检查浏览器是否支持给定的事件监听器选项；优化组件库中使用了 `addEventListener` 事件监听器选项的组件代码

## <VersionDateTag date="2025-05-26">2.4.8</VersionDateTag>

- 优化并更新 [图片 Image](/guide/components/image.html) 组件，修复图片已加载（含缓存与 `SSG` 场景）时加载态不消失的问题；新增 `previewSpinProps` 配置预览加载中样式

## <VersionDateTag date="2025-05-23">2.4.7</VersionDateTag>

- 修复 [输入框 Input](/guide/components/input.html)、[搜索框 InputSearch](/guide/components/input-search.html)、[文本域 Textarea](/guide/components/textarea.html) 组件使用文本合成系统输入且带字数提示时字数统计的问题

## <VersionDateTag date="2025-05-22">2.4.6</VersionDateTag>

- 优化并更新 [文字提示 Tooltip](/guide/components/tooltip.html) 组件，优化自动查找最近的可滚动父元素
- 优化并更新 [输入框 Input](/guide/components/input.html) 组件，修复使用文本合成系统输入时的问题；新增 `compositionstart` `compositionend` 回调事件
- 优化并更新 [搜索框 InputSearch](/guide/components/input-search.html) 组件，修复使用文本合成系统输入时的问题；新增 `compositionstart` `compositionend` 回调事件
- 优化并更新 [文本域 Textarea](/guide/components/textarea.html) 组件，修复使用文本合成系统输入时的问题；新增 `compositionstart` `compositionend` 回调事件
- 更新组件库文档及部分依赖版本

## <VersionDateTag date="2025-05-06">2.4.5</VersionDateTag>

- 优化并更新 [瀑布流 Waterfall](/guide/components/waterfall.html) 组件
- 更新组件库部分依赖版本

## <VersionDateTag date="2025-04-16">2.4.4</VersionDateTag>

- 优化并更新 [文字滚动 TextScroll](/guide/components/text-scroll.html) 组件水平滚动动画
- 组件库及文档代码优化

## <VersionDateTag date="2025-03-27">2.4.3</VersionDateTag>

- 优化并更新[日期选择器 DatePicker](/guide/components/date-picker.html) 组件，新增 `maxRange` 属性，用于支持自定义最长日期可选择范围
- 组件库及文档代码优化

## <VersionDateTag date="2025-03-25">2.4.2</VersionDateTag>

- 组件库及文档代码优化

## <VersionDateTag date="2025-03-21">2.4.1</VersionDateTag>

- 优化并更新[日期选择器 DatePicker](/guide/components/date-picker.html) 组件，文档新增多种日期禁用场景及使用方式
- 组件库及文档代码优化

## <VersionDateTag date="2025-03-19">2.4.0</VersionDateTag>

- 新增 [高亮文本 Highlight](/guide/components/highlight.html) 组件，用于高亮文本
- 组件库及文档代码优化

## <VersionDateTag date="2025-03-18">2.3.4</VersionDateTag>

- 优化并更新 [滑动输入条 Slider](/guide/components/slider.html) 组件，更新 `Marks` 类型

## <VersionDateTag date="2025-03-17">2.3.3</VersionDateTag>

- 组件库及文档代码优化

## <VersionDateTag date="2025-03-15">2.3.2</VersionDateTag>

- 优化并更新 [按钮 Button](/guide/components/button.html) 组件，删除 `rippleColor` 属性，新增 `color` 属性，支持自定义按钮颜色
- 修复 [进度条 Progress](/guide/components/progress.html) 组件渐变进度圈展示
- 组件库及文档代码优化

## <VersionDateTag date="2025-03-14">2.3.1</VersionDateTag>

- 优化并更新 [全局化配置 ConfigProvider](/guide/components/config-provider.html) 组件，新增 `abstract` `tag` 属性，支持：设置是否不存在 `DOM` 包裹元素；自定义 `ConfigProvider` 被渲染成的元素，`abstract` 为 `true` 时有效
- 更新自动按需引入，修复 [全局化配置 ConfigProvider](/guide/components/config-provider.html) 组件引入的问题
- 组件库及文档代码优化

## <VersionDateTag date="2025-03-13">2.3.0</VersionDateTag>

- 新增 [全局化配置 ConfigProvider](/guide/components/config-provider.html) 组件，用于支持全局自定义主题色
- 优化并更新 [加载条 LoadingBar](/guide/components/loading-bar.html) 组件代码
- 优化并更新支持自定义主题色的组件，用于配合 `ConfigProvider` 组件支持全局自定义主题色
- 组件库及文档代码优化

## <VersionDateTag date="2025-03-07">2.2.15</VersionDateTag>

- 优化并更新 [日期选择 DatePicker](/guide/components/date-picker.html) 组件，新增颜色样式变量，用于支持自定义主题色
- 优化并更新 [触摸滑动 Swiper](/guide/components/swiper.html) 组件，新增 `CSS` 变量，支持：自定义主题色；自定义切换动画效果

## <VersionDateTag date="2025-03-06">2.2.14</VersionDateTag>

- 优化并更新 [警告提示 Alert](/guide/components/alert.html) 组件，新增颜色样式变量，用于支持自定义主题色
- 优化并更新 [级联选择 Cascader](/guide/components/cascader.html) 组件，新增 `size` 属性，支持三种尺寸；同时支持自定义主题色
- 优化并更新 [回到顶部 BackTop](/guide/components/back-top.html) 组件代码，重命名相关样式变量
- 优化并更新 [轮播图 Carousel](/guide/components/carousel.html) 组件代码，重命名相关样式变量
- 优化并更新 [加载条 LoadingBar](/guide/components/loading-bar.html) 组件代码，重命名相关样式变量
- 优化并更新 [进度条 Progress](/guide/components/progress.html) 组件代码，重命名相关样式变量
- 优化并更新 [选择器 Select](/guide/components/select.html) 组件代码
- 组件库及文档代码优化

## <VersionDateTag date="2025-03-05">2.2.13</VersionDateTag>

- 优化并更新 [日历 Calendar](/guide/components/calendar.html) 组件，新增颜色样式变量和 `yearSelectProps` `monthSelectProps` `modeRadioProps` 属性，用于支持自定义主题色和设置组件属性
- 优化并更新 [颜色选择器 ColorPicker](/guide/components/color-picker.html) 组件，新增颜色样式变量和 `width` `inputProps` 属性，用于支持自定义主题色和设置组件属性
- 优化并更新 [分页 Pagination](/guide/components/pagination.html) 组件代码
- 优化并更新 [选择器 Select](/guide/components/select.html) 组件代码
- 组件库及文档代码优化

## <VersionDateTag date="2025-03-04">2.2.12</VersionDateTag>

- 优化并更新 [按钮 Button](/guide/components/button.html) 组件，新增颜色样式变量，用于支持自定义主题色或样式
- 优化并更新 [浮动按钮 FloatButton](/guide/components/float-button.html) 组件，新增颜色样式变量，用于支持自定义主题色
- 优化并更新 [输入框 Input](/guide/components/input.html) 组件，新增颜色样式变量，用于支持自定义主题色
- 优化并更新 [数字输入框 InputNumber](/guide/components/input-number.html) 组件，新增颜色样式变量，用于支持自定义主题色
- 优化并更新 [搜索框 InputSearch](/guide/components/input-search.html) 组件，新增颜色样式变量，用于支持自定义主题色
- 优化并更新 [文本域 Textarea](/guide/components/textarea.html) 组件，新增颜色样式变量，用于支持自定义主题色
- 优化并更新 [选择器 Select](/guide/components/select.html) 组件，新增颜色样式变量，用于支持自定义主题色
- 优化并更新 [全局提示 Message](/guide/components/message.html) 组件，新增颜色样式变量，用于支持自定义不同类型颜色
- 优化并更新 [模态框 Modal](/guide/components/modal.html) 组件，新增颜色样式变量，用于支持自定义不同类型颜色
- 优化并更新 [通知提醒 Notification](/guide/components/notification.html) 组件，新增颜色样式变量，用于支持自定义不同类型颜色
- 优化并更新 [弹出确认 Popconfirm](/guide/components/popconfirm.html) 组件，新增颜色样式变量，用于支持自定义不同类型颜色
- 优化并更新 [进度条 Progress](/guide/components/progress.html) 组件，重命名相关颜色变量
- 优化并更新 [分页 Pagination](/guide/components/pagination.html) 组件，新增主题色样式变量，用于支持自定义主题色；新增 `jumperProps` `changerProps` 属性，支持自定义设置 `jumper` 和 `changer` 组件的属性
- 优化并更新 [评分 Rate](/guide/components/rate.html) 组件，重命名相关 `CSS` 变量
- 优化并更新 [滑动输入条 Slider](/guide/components/slider.html) 组件，重命名相关 `CSS` 变量
- 优化并更新 [步骤条 Steps](/guide/components/steps.html) 组件，新增颜色样式变量，用于支持自定义主题色
- 优化并更新 [开关 Switch](/guide/components/switch.html) 组件，新增颜色样式变量，用于支持自定义主题色
- 优化并更新 [标签页 Tabs](/guide/components/tabs.html) 组件，新增颜色样式变量，用于支持自定义主题色
- 优化并更新 [上传 Upload](/guide/components/upload.html) 组件，新增颜色样式变量，用于支持自定义主题色
- 更新 [对话框 Dialog](/guide/components/dialog.html) 组件文档，新增自定义主题色样例
- 更新 [抽屉 Drawer](/guide/components/drawer.html) 组件文档，新增自定义主题色样例
- 组件库及文档代码优化

## <VersionDateTag date="2025-02-28">2.2.11</VersionDateTag>

- 优化并更新 [回到顶部 BackTop](/guide/components/back-top.html) 组件代码
- 优化并更新 [面包屑 Breadcrumb](/guide/components/breadcrumb.html) 组件，新增多个样式变量，用于支持更丰富的样式自定义
- 优化并更新 [复选框 Checkbox](/guide/components/checkbox.html) 组件，新增主题色样式变量，用于支持自定义主题色
- 优化并更新 [单选框 Radio](/guide/components/radio.html) 组件，新增主题色样式变量，用于支持自定义主题色
- 优化并更新 [滑动输入条 Slider](/guide/components/slider.html) 组件代码；新增 `tooltipOpen` 属性，支持设置是否一直显示 `tooltip`
- 组件库及文档代码优化

## <VersionDateTag date="2025-02-27">2.2.10</VersionDateTag>

- 优化并更新 [滑动输入条 Slider](/guide/components/slider.html) 组件；新增 `tooltipStyle` 属性，支持自定义 `tooltip` 样式，同时新增相关 `CSS` 变量，用于支持更丰富的样式自定义

## <VersionDateTag date="2025-02-26">2.2.9</VersionDateTag>

- 优化并更新 [表格 Table](/guide/components/table.html) 组件代码相关类型定义
- 优化并更新 [滑动输入条 Slider](/guide/components/slider.html) 组件，新增 `marks` 属性，支持添加刻度标记，并可自定义标记样式；更新属性 `step` 的类型为 `number | 'mark'`，支持当 `marks` 不为空对象时，设置 `step` 为 `'mark'`，此时 `Slider` 的可选值仅有 `marks` 标记的部分
- 组件库及文档代码优化

## <VersionDateTag date="2025-02-22">2.2.8</VersionDateTag>

- 优化并更新 [回到顶部 BackTop](/guide/components/back-top.html) 组件，修复在某些情况下无法自动找到可滚动祖先节点的问题

## <VersionDateTag date="2025-02-21">2.2.7</VersionDateTag>

- 优化并更新 [头像 Avatar](/guide/components/avatar.html)、[描述列表 Descriptions](/guide/components/descriptions.html)、[栅格 Grid](/guide/components/grid.html) 响应式相关组件代码

## <VersionDateTag date="2025-02-19">2.2.6</VersionDateTag>

- 优化并更新 [图片 Image](/guide/components/image.html) 组件，预览时新增下载图片操作；新增 `disabled` `previewImageStyle` 属性，支持：禁用图片预览功能；自定义预览图片时 `img` 元素的样式
- 优化 [下载文件 downloadFile](/utils/functions/download-file.html) 工具函数代码

## <VersionDateTag date="2025-02-18">2.2.5</VersionDateTag>

- 优化并更新 [进度条 Progress](/guide/components/progress.html) 组件；调整属性 `lineCap` 类型为：`'round' | 'butt'`
- 优化并更新 [二维码 QRCode](/guide/components/qr-code.html) 组件；新增 `type` `icon` `iconSize` 属性；支持：设置二维码渲染类型，可选 `svg` `canvas` `image` 三种；在二维码中设置图片 `Icon` 并自定义 `Icon` 尺寸大小；新增方法：`getQRCodeImage()`，用于获取二维码图片

## <VersionDateTag date="2025-02-17">2.2.4</VersionDateTag>

- 组件库及文档代码优化

## <VersionDateTag date="2025-02-14">2.2.3</VersionDateTag>

- 优化并更新 [日期选择 DatePicker](/guide/components/date-picker.html) 组件样式和过渡动画效果；新增属性 `size`，支持设置日期选择组件大小
- 优化并更新 [触摸滑动 Swiper](/guide/components/swiper.html) 组件过渡动画效果
- 组件库及文档代码优化

## <VersionDateTag date="2025-02-13">2.2.2</VersionDateTag>

- 优化并更新 [标签页 Tabs](/guide/components/tabs.html) 组件代码
- 优化并更新 [全局提示 Message](/guide/components/message.html) 组件代码
- 优化并更新 [通知提醒 Notification](/guide/components/notification.html) 组件代码
- 优化并更新 [触摸滑动 Swiper](/guide/components/swiper.html) 组件代码
- 组件库及文档代码优化

## <VersionDateTag date="2025-02-12">2.2.1</VersionDateTag>

- 优化并更新自动按需引入 resolver: `VueAmazingUIResolver`；当使用自动按需引入时，resolver 自动引入组件库全局默认样式
- 组件库及文档代码优化

## <VersionDateTag date="2025-02-11">2.2.0</VersionDateTag>

- 新增 [日历 Calendar](/guide/components/calendar.html) 组件
- 组件库代码优化

## <VersionDateTag date="2025-02-10">2.1.8</VersionDateTag>

- 更新自动按需引入：`VueAmazingUIResolver` ，修复无法识别 [颜色选择器 ColorPicker](/guide/components/color-picker.html) 组件的问题
- 组件库代码优化

## <VersionDateTag date="2025-02-07">2.1.7</VersionDateTag>

- 优化并更新 [徽标 Badge](/guide/components/badge.html) 组件，将属性 `ripple` 默认值调整为 `false`
- 组件库及文档代码优化

## <VersionDateTag date="2025-02-06">2.1.6</VersionDateTag>

- 优化并更新 [选择器 Select](/guide/components/select.html) 组件交互，自动记录下拉面板滚动位置
- 组件库及文档代码优化

## <VersionDateTag date="2025-02-05">2.1.5</VersionDateTag>

- 移除通过 自动引入样式 使用组件库及相关 `api`，推荐使用自动按需引入
- 优化并更新自动按需引入 api: `VueAmazingUIResolver`，关闭 [#29](https://github.com/themusecatcher/vue-amazing-ui/issues/29)
- 组件库及文档代码优化

## <VersionDateTag date="2025-01-22">2.1.4</VersionDateTag>

- 优化并更新 [按钮 Button](/guide/components/button.html) 组件，新增支持设置多种 `CSS` 变量自定义样式
- 优化并更新 [颜色选择器 ColorPicker](/guide/components/color-picker.html) 组件，调整弹出面板默认弹出位置为 `bottom`，关闭 [#27](https://github.com/themusecatcher/vue-amazing-ui/issues/27)
- 组件库及文档代码优化

## <VersionDateTag date="2025-01-21">2.1.3</VersionDateTag>

- 优化并更新 [分段控制器 Segmented](/guide/components/segmented.html) 组件，优化选项切换过渡效果
- 组件库及文档代码优化

## <VersionDateTag date="2025-01-20">2.1.2</VersionDateTag>

- 优化并更新 [颜色选择器 ColorPicker](/guide/components/color-picker.html) 组件
- 优化并更新 [监听插槽存在 useSlotsExist](/utils/functions/use-slots-exist.html) 工具函数
- 组件库及文档代码优化

## <VersionDateTag date="2025-01-17">2.1.1</VersionDateTag>

- 组件库及文档代码优化

## <VersionDateTag date="2025-01-16">2.1.0</VersionDateTag>

- 新增 [颜色选择器 ColorPicker](/guide/components/color-picker.html) 组件，关闭 [#23](https://github.com/themusecatcher/vue-amazing-ui/issues/23)
- 组件库及文档代码优化

## <VersionDateTag date="2025-01-15">2.0.12</VersionDateTag>

- 优化并更新 [输入框 Input](/guide/components/input.html) 组件
- 优化并更新 [文字提示 Tooltip](/guide/components/tooltip.html) 组件

## <VersionDateTag date="2025-01-14">2.0.11</VersionDateTag>

- 优化并更新 [输入框 Input](/guide/components/input.html) 组件
- 优化并更新 [搜索框 InputSearch](/guide/components/input-search.html) 组件
- 优化并更新 [文本域 Textarea](/guide/components/textarea.html) 组件
- 优化并更新 [数字输入框 InputNumber](/guide/components/input-number.html) 组件代码，新增 `enter` 事件，支持监听按下回车的回调
- 组件库及文档代码优化

## <VersionDateTag date="2025-01-13">2.0.10</VersionDateTag>

- 优化并更新 [图片 Image](/guide/components/image.html) 组件代码，新增 `draggable` 属性，支持设置是否可以拖动图片
- 优化并更新 [文本省略 Ellipsis](/guide/components/ellipsis.html) 组件
- 优化并更新 [滑动输入条 Slider](/guide/components/slider.html) 组件
- 优化并更新 [滚动条 Scrollbar](/guide/components/scrollbar.html) 组件
- 优化并更新 [文字提示 Tooltip](/guide/components/tooltip.html) 组件，新增 `animationend` 事件，在显示 / 隐藏动画结束时触发

## <VersionDateTag date="2025-01-10">2.0.9</VersionDateTag>

- 优化并更新 [文字滚动 TextScroll](/guide/components/text-scroll.html) 组件，将 `pauseOnMouseEnter` 属性默认值调整为 `false`，并更新文档示例
- 组件库及文档代码优化

## <VersionDateTag date="2025-01-09">2.0.8</VersionDateTag>

- 优化并更新 [头像 Avatar](/guide/components/avatar.html) 组件
- 优化并更新 [分段控制器 Segmented](/guide/components/segmented.html) 组件
- 组件库及文档代码优化

## <VersionDateTag date="2025-01-07">2.0.7</VersionDateTag>

- 优化并更新 [轮播图 Carousel](/guide/components/carousel.html) 组件，图片类型 `Image` 新增 `link` `target` 属性，支持：设置图片跳转链接；设置如何打开跳转链接
- 优化并更新 [触摸滑动 Swiper](/guide/components/swiper.html) 组件，图片类型 `Image` 新增 `target` 属性，支持设置如何打开跳转链接
- 优化并更新 [瀑布流 Waterfall](/guide/components/waterfall.html) 组件，图片类型 `Image` 新增 `link` `target` 属性，支持：设置图片跳转链接；设置如何打开跳转链接
- 优化并更新 [表格 Table](/guide/components/table.html) 组件；`rowSelection` 属性新增 `selectedRowKeys`，用于支持设置选中项的 `key` 数组，需和 `onChange` 配合使用

## <VersionDateTag date="2025-01-06">2.0.6</VersionDateTag>

- 优化并更新 [对话框 Dialog](/guide/components/dialog.html) 组件，新增 `destroyOnClose` `scrollbarProps` 属性，支持：设置关闭时是否销毁 `Dialog` 里的子元素；固定高度时使用滚动条组件，并可自定义滚动条样式
- 优化并更新 [模态框 Modal](/guide/components/modal.html) 组件，新增 `destroyOnClose` 属性，支持：设置关闭时是否销毁 `Modal` 里的子元素
- 组件库及文档代码优化

## <VersionDateTag date="2025-01-03">2.0.5</VersionDateTag>

- 优化并更新 [复选框 Checkbox](/guide/components/checkbox.html) 组件点击动画效果及代码
- 优化并更新 [单选框 Radio](/guide/components/radio.html) 组件代码
- 优化并更新 [表格 Table](/guide/components/table.html) 组件代码及功能优化；`scroll` 属性新增 `initialScrollPositionOnChange` 类型，用于设置当分页、排序变化后是否滚动到表格初始位置；新增 `rowSelection` 属性，用于支持设置列表项选择，更多配置项请参考 [Selection Type](/guide/components/table.html#selection-type)
- 组件库及文档代码优化

## <VersionDateTag date="2024-12-30">2.0.4</VersionDateTag>

- 优化并更新 [水印 Watermark](/guide/components/watermark.html) 组件，新增 `fixed` 属性，支持固定全屏水印
- 组件库及文档代码优化

## <VersionDateTag date="2024-12-26">2.0.3</VersionDateTag>

- 优化并更新 [倒计时 Countdown](/guide/components/countdown.html) 组件，将 `finishedText` 属性重命名为 `finish`
- 修复 [搜索框 InputSearch](/guide/components/input-search.html) 组件使用插槽自定义搜索图标不生效的问题
- 所有支持插槽的组件文档新增 `Slots` 相关说明文档
- 组件库及文档代码优化

## <VersionDateTag date="2024-12-24">2.0.2</VersionDateTag>

- 优化并更新 [浮动按钮 FloatButton](/guide/components/float-button.html) 组件，`icon` 属性新增类型 `VNode`
- 新增 `VueAmazingUIStyleResolve` 方法导出，用于配合 `vite-plugin-style-import` 插件实现按需自动引入组件样式，具体请参考 [自动引入样式](/guide/import-on-demand.html#%E8%87%AA%E5%8A%A8%E6%8C%89%E9%9C%80%E5%BC%95%E5%85%A5-%E5%BC%BA%E7%83%88%E6%8E%A8%E8%8D%90)
- 组件库及文档代码优化

## <VersionDateTag date="2024-12-20">2.0.1</VersionDateTag>

- 优化并更新 [步骤条 Steps](/guide/components/steps.html) 组件，将 `Steps` 属性重命名为 `items`
- 优化并更新 [标签页 Tabs](/guide/components/tabs.html) 组件，将 `tabPages` 属性重命名为 `items`
- 组件库及文档代码优化

## <VersionDateTag date="2024-12-18">2.0.0</VersionDateTag>

- 优化组件库打包构建；所有组件支持手动或自动按需引入；全面支持基于 `ES modules` 的 `tree shaking`
- 新增 `VueAmazingUIResolver` 方法导出，用于配合 `unplugin-vue-components` 插件支持组件库的自动按需引入，具体请参考 [自动按需引入](/guide/import-on-demand.html#%E8%87%AA%E5%8A%A8%E6%8C%89%E9%9C%80%E5%BC%95%E5%85%A5-%E5%BC%BA%E7%83%88%E6%8E%A8%E8%8D%90)
- 组件库及文档代码优化

## <VersionDateTag date="2024-12-10">1.10.4</VersionDateTag>

- 优化并更新 [复选框 Checkbox](/guide/components/checkbox.html) 组件，删除 `width` `height` 属性；新增选中动画效果
- 优化并更新 [单选框 Radio](/guide/components/radio.html) 组件，删除 `width` `height` 属性；新增选中动画效果
- 优化并更新 [文字滚动 TextScroll](/guide/components/text-scroll.html) 组件，将 `verticalInterval` 属性重命名为 `interval`；新增 `duration` 属性；用于控制垂直滚动过渡持续时间；代码逻辑优化

## <VersionDateTag date="2024-12-09">1.10.3</VersionDateTag>

- 优化并更新 [表格 Table](/guide/components/table.html) 组件，新增 `sticky` 属性，支持：对于长表格设置跟随页面固定表头和水平滚动条，方便查看表头和使用滚动条
- 优化并更新 [文字滚动 TextScroll](/guide/components/text-scroll.html) 组件，将 `scrollText` 属性重命名为 `items`；删除 `interval` `step` 属性，新增 `speed` 属性；用于更方便的控制水平滚动动画速度；重构水平滚动动画效果；新增 `pauseOnMouseEnter` 属性，支持控制鼠标移入时是否暂停滚动
- 组件库及文档代码优化

## <VersionDateTag date="2024-12-05">1.10.2</VersionDateTag>

- 优化并更新 [播放器 Video](/guide/components/video.html) 组件，新增 `iconSize` 属性；重命名 `showPlay` 属性为 `playIcon`；新增 `play` `pause` 方法；支持：设置播放暂停图标的尺寸；使用 `Methods` 控制播放暂停

## <VersionDateTag date="2024-12-04">1.10.1</VersionDateTag>

- 优化类型声明文件导出
- 组件库及文档代码优化

## <VersionDateTag date="2024-12-03">1.10.0</VersionDateTag>

- 添加类型声明文件，提供所有组件相关类型定义的导出，为使用 `TypeScript` 开发提供更好的支持
- 组件库及文档代码优化

## <VersionDateTag date="2024-12-02">1.9.12</VersionDateTag>

- 优化并更新 [折叠面板 Collapse](/guide/components/collapse.html) 组件，将 `collapseData` 属性重命名为 `items`，新增 `collapseStyle` `copyText` `copiedText` 等属性；支持：自定义样式；自定义箭头图标；自定义复制按钮文本；单个面板自定义样式、箭头属性、复制按钮等功能
- 优化并更新 [时间轴 Timeline](/guide/components/timeline.html) 组件，将 `timelineData` 属性重命名为 `items`

## <VersionDateTag date="2024-11-28">1.9.11</VersionDateTag>

- 修复组件库 `vue-amazing-ui@1.9.10` 更新 `vite` 至 `v6` 后，打包时 `cssFileName` 默认值更改为 `package.json` 中的 `name` 值导致无法引入 `css` 文件的相关问题

## <VersionDateTag date="2024-11-28">1.9.10</VersionDateTag>

- 优化并更新 [回到顶部 BackTop](/guide/components/back-top.html) 组件，新增支持设置多种 `CSS` 变量自定义样式
- 优化并更新 [滑动输入条 Slider](/guide/components/slider.html) 组件，新增支持设置多种 `CSS` 变量自定义样式
- 组件库及文档代码优化

## <VersionDateTag date="2024-11-27">1.9.9</VersionDateTag>

- 优化并更新 [表格 Table](/guide/components/table.html) 组件代码和功能
- 优化并更新 [进度条 Progress](/guide/components/progress.html) 组件，重构组件，新增支持更多样式自定义
- 组件库及文档代码优化

## <VersionDateTag date="2024-11-26">1.9.8</VersionDateTag>

- 优化并更新 [滚动条 Scrollbar](/guide/components/scrollbar.html) 组件，新增 `yScrollable` 属性，用于控制是否使用垂直滚动；新增支持通过设置 `--scrollbar` 相关变量自定义滚动条样式
- 优化并更新 [表格 Table](/guide/components/table.html) 组件，新增 `rowClassName` `showSorterTooltip` `sortDirections` `tooltipProps` 属性；表格列的配置项 `columns` 属性新增 `align` `className` `key` `children` `showSorterTooltip` `sortTooltipProps` `defaultSortOrder` `sortDirections` `sorter` 类型；新增 `expand` `expandedRowsChange` 事件；支持：设置列文本对齐方式；自定义样式；列表头分组；是否显示下一次排序的 `tooltip` 提示；自定义某列的默认排序顺序；设置支持的排序方式；表格排序控制；展开行变化回调事件；排序变化回调事件
- 优化并更新 [文字提示 Tooltip](/guide/components/tooltip.html) 组件，新增 `contentClass` `showControl` 属性，支持：设置展示内容的类名；是否 `trigger: hover` 时只使用 `show` 属性控制显示隐藏
- 优化并更新 [弹出确认 Popconfirm](/guide/components/popconfirm.html) 组件，新增 `keyboard` 属性，默认支持按键操作
- 优化并更新 [气泡卡片 Popover](/guide/components/popover.html) 组件，新增 `keyboard` 属性，默认支持按键操作
- 组件库及文档代码优化

## <VersionDateTag date="2024-11-20">1.9.7</VersionDateTag>

- 优化并更新 [滚动条 Scrollbar](/guide/components/scrollbar.html) 组件，新增 `xPlacement` `yPlacement` 属性，支持设置滚动条位置；调整是否使用横向滚动属性名 `horizontal` 为 `xScrollable`；新增 `getScrollData` 方法，用于获取滚动区域相关数据；新增 `scrollend` 回调函数，同时回调函数新增 `direction` 参数，用于表示滚动方向
- 优化并更新 [表格 Table](/guide/components/table.html) 组件，新增 `scrollbarProps` 属性，表格所有滚动均使用 [滚动条 Scrollbar](/guide/components/scrollbar.html) 组件，并支持滚动条相关属性配置
- 新增 [滚动监测 useScroll](/utils/functions/use-scroll.html) 工具函数，用于实时监测指定元素滚动位置及状态；删除 `useScrollDirection` 工具函数
- 组件库及文档代码优化

## <VersionDateTag date="2024-11-15">1.9.6</VersionDateTag>

- 优化并更新 [选择器 Select](/guide/components/select.html) 组件，新增 `size` 属性，支持设置选择器的尺寸大小
- 优化并更新 [分页 Pagination](/guide/components/pagination.html) 组件，新增 `size` 属性，支持设置分页器的尺寸大小
- 优化并更新 [表格 Table](/guide/components/table.html) 组件，新增 `size` `striped` `ellipsisProps` `scroll` `showExpandColumn` `expandColumnTitle` `expandColumnWidth` `expandCell` `expandedRowRender` `expandFixed` `expandedRowKeys` `expandRowByClick` 等属性；支持：设置三种尺寸；斑马条纹；合并单元格；可编辑单元格；可编辑行；可展开；固定列；固定表头；固定头和列等多种功能
- 组件库及文档代码优化

## <VersionDateTag date="2024-11-13">1.9.5</VersionDateTag>

- 优化并更新 [浮动按钮 FloatButton](/guide/components/float-button.html) 组件，新增 `zIndex` 属性，支持设置按钮的 `z-index` 值
- 优化并更新 [文字滚动 TextScroll](/guide/components/float-button.html) 组件代码
- 优化并更新 [文本省略 Ellipsis](/guide/components/ellipsis.html) 组件
- 组件库及文档代码优化

## <VersionDateTag date="2024-11-08">1.9.4</VersionDateTag>

- 优化并更新 [文本省略 Ellipsis](/guide/components/ellipsis.html) 组件，优化弹出提示默认最大宽度计算方式
- 优化并更新 [文字提示 Tooltip](/guide/components/tooltip.html) 组件，优化弹出位置自动调整
- 优化并更新 [警告提示 Alert](/guide/components/alert.html) 组件，优化关闭时的动画效果
- 优化并更新 [徽标 Badge](/guide/components/badge.html) 组件，优化关闭时的动画效果
- 优化并更新 [图片 Image](/guide/components/image.html) 组件，优化预览打开关闭动画效果
- 优化并更新 [全局提示 Message](/guide/components/message.html) 组件，优化显示隐藏动画效果
- 优化并更新 [选择器 Select](/guide/components/select.html) 组件，优化红点显示隐藏动画效果
- 优化并更新 [表格 Table](/guide/components/table.html) 组件，重构表格组件；新增 `header` `footer` `bordered` `tableLayout` 属性；支持：使用 `headerCell` `bodyCell` 自定义个性化头部单元格和内容单元格；引入文本省略组件，支持表格头部或内容单元格文本溢出时自动显示省略号，且悬浮省略文本时，自动弹出文字提示
- 组件库及文档代码优化

## <VersionDateTag date="2024-11-06">1.9.3</VersionDateTag>

- 优化并更新 [上传 Upload](/guide/components/upload.html) 组件，新增 `draggable` 属性，支持控制拖拽上传功能
- 优化并更新 [文字提示 Tooltip](/guide/components/tooltip.html) 组件代码和动画效果，支持异步更新内容和文字提示，自动更新文字提示框位置
- 优化并更新 [回到顶部 BackTop](/guide/components/back-top.html) 组件，`icon` 属性新增支持 `VNode` 类型
- 优化并更新 [按钮 Button](/guide/components/button.html) 组件，`icon` 属性新增支持 `VNode` 类型
- 组件库及文档代码优化

## <VersionDateTag date="2024-11-04">1.9.2</VersionDateTag>

- 优化并更新 [对话框 Dialog](/guide/components/dialog.html) 组件，新增 `titleStyle` `contentStyle` `bodyClass` `bodyStyle` `maskStyle` `transformOrigin` `blockScroll` `keyboard` `maskClosable` 等属性；删除部分属性；支持：控制对话框动画出现位置；控制打开对话框时禁用背景滚动；控制键盘 `Esc` 关闭；控制点击蒙层关闭；设置标题、内容、`body`、蒙层样式等功能
- 优化并更新 [模态框 Modal](/guide/components/modal.html) 组件，新增 `titleStyle` `contentStyle` `bodyClass` `bodyStyle` `maskStyle` `transformOrigin` `blockScroll` `keyboard` `maskClosable` 等属性；删除部分属性；支持：控制模态框动画出现位置；控制打开模态框时禁用背景滚动；控制键盘 `Esc` 关闭；控制点击蒙层关闭；设置标题、内容、`body`、蒙层样式等功能
- 组件库及文档代码优化

## <VersionDateTag date="2024-10-31">1.9.1</VersionDateTag>

- 优化并更新 [对话框 Dialog](/guide/components/dialog.html) 组件，优化显示隐藏动画效果
- 优化并更新 [图片 Image](/guide/components/image.html) 组件，优化显示隐藏动画效果
- 优化并更新 [全局提示 Message](/guide/components/message.html) 组件，优化显示隐藏动画效果
- 优化并更新 [模态框 Modal](/guide/components/modal.html) 组件，优化显示隐藏动画效果
- 优化并更新 [按钮 Button](/guide/components/modal.html) 组件，新增 `keyboard` 属性，支持控制是否支持键盘操作
- 组件库及文档代码优化

## <VersionDateTag date="2024-10-30">1.9.0</VersionDateTag>

- 优化并更新 [文字提示 Tooltip](/guide/components/tooltip.html) 组件，新增 `flip` `keyboard` `transitionDuration` 属性，支持自动调整弹出位置；按键控制；自定义过渡动画时间；使用 `Methods` 控制显示隐藏
- 优化并更新 [弹出确认 Popconfirm](/guide/components/popconfirm.html) 组件，以 `Tooltip` 组件为基础重构，新增 `tooltipStyle` 属性，删除部分原有属性，更多属性请参考 [Tooltip](/guide/components/tooltip.html#tooltip)，支持自动调整弹出位置；自定义过渡动画时间等
- 优化并更新 [气泡卡片 Popover](/guide/components/popconfirm.html) 组件，以 `Tooltip` 组件为基础重构，新增 `tooltipStyle` 属性，删除部分原有属性，更多属性请参考 [Tooltip](/guide/components/tooltip.html#tooltip)，支持自动调整弹出位置；自定义过渡动画时间等
- 优化并更新 [文本省略 Ellipsis](/guide/components/ellipsis.html) 组件，新增 `tooltipMaxWidth` 属性，删除 `tooltipProps` 属性，更多属性请参考 [Tooltip](/guide/components/tooltip.html#tooltip)，支持自动调整弹出位置；自定义过渡动画时间；延迟显示隐藏；隐藏箭头等
- 组件库及文档代码优化

## <VersionDateTag date="2024-10-25">1.8.10</VersionDateTag>

- 优化并更新 [文字提示 Tooltip](/guide/components/tooltip.html) 组件，新增 `tooltipClass` `placement` 属性，支持自定义弹出提示位置及类名
- 优化并更新 [标签页 Tabs](/guide/components/tabs.html) 组件，修复当标签页左右切换时，页面会短暂出现滚动条的问题
- 组件库及文档代码优化

## <VersionDateTag date="2024-10-24">1.8.9</VersionDateTag>

- 优化并更新 [浮动按钮 FloatButton](/guide/components/float-button.html) 组件
- 组件库文档代新增赞助功能模块
- 组件库及文档代码优化

## <VersionDateTag date="2024-10-22">1.8.8</VersionDateTag>

- 优化并更新 [头像 Avatar](/guide/components/avatar.html) 组件，新增 `href` `target` 属性，支持链接跳转功能
- 优化并更新 [文字滚动 TextScroll](/guide/components/text-scroll.html) 组件，新增 `hrefHoverColor` 属性，支持自定义链接悬浮颜色
- 组件库及文档代码优化

## <VersionDateTag date="2024-10-21">1.8.7</VersionDateTag>

- 优化并更新 [上传 Upload](/guide/components/upload.html) 组件，新增 `drop` `preview` 事件回调，调整 `beforeUpload` 属性，支持返回一个 `Promise` 对象，用于控制上传
- 优化并更新 [加载中 Spin](/guide/components/upload.html) 组件
- 组件库及文档代码优化

## <VersionDateTag date="2024-10-18">1.8.6</VersionDateTag>

- 优化并更新 [警告提示 Alert](/guide/components/alert.html) 组件，新增 `type: 'default'` 类型，以及 `bordered` 属性
- 优化并更新 [头像 Avatar](/guide/components/avatar.html) 组件，新增 `color` 属性
- 优化并更新 [渐变文字 GradientText](/guide/components/gradient-text.html) 组件，新增 `weight` 属性
- 优化并更新 [抽屉 Drawer](/guide/components/drawer.html) 组件，支持开启抽屉时，禁止背景滚动
- 组件库及文档代码优化

## <VersionDateTag date="2024-10-17">1.8.5</VersionDateTag>

- 优化并更新 [文本省略 Ellipsis](/guide/components/ellipsis.html) 组件
- 组件库及文档代码优化

## <VersionDateTag date="2024-10-16">1.8.4</VersionDateTag>

- 优化并更新 [评分 Rate](/guide/components/rate.html) 组件，支持键盘左/右按键操作评分
- 组件库及文档代码优化

## <VersionDateTag date="2024-10-15">1.8.3</VersionDateTag>

- 优化并更新 [单选框 Radio](/guide/components/radio.html) 组件，新增 `checked` `width` `height` 属性，调整 `gap` 属性相关功能
- 优化并更新 [评分 Rate](/guide/components/rate.html) 组件，新增 `tooltips` `tooltipProps` 属性，支持设置文案提示
- 组件库及文档代码优化

## <VersionDateTag date="2024-10-14">1.8.2</VersionDateTag>

- 优化并更新 [复选框 Checkbox](/guide/components/checkbox.html) 组件
- 组件库及文档代码优化

## <VersionDateTag date="2024-10-11">1.8.1</VersionDateTag>

- 优化并更新 [选择器 Select](/guide/components/select.html) 组件，新增 `openChange` 事件
- 优化并更新 [文字滚动 TextScroll](/guide/components/text-scroll.html) 组件，新增 `start` `stop` `reset` 方法，支持手动控制开始、暂停、重置滚动
- 组件库及文档代码优化

## <VersionDateTag date="2024-10-10">1.8.0</VersionDateTag>

- 新增 [浮动按钮 FloatButton](/guide/components/float-button.html) 组件
- 组件库及文档代码优化

## <VersionDateTag date="2024-10-09">1.7.2</VersionDateTag>

- 优化并更新 [对话框 Dialog](/guide/components/dialog.html) 组件，将属性 `show` 重命名为 `open`
- 组件库及文档代码优化

## <VersionDateTag date="2024-10-01">1.7.1</VersionDateTag>

- 优化并更新 [按钮 Button](/guide/components/button.html) 组件
- 优化并更新 [选择框 Select](/guide/components/select.html) 组件
- 组件库及文档代码优化

## <VersionDateTag date="2024-09-28">1.7.0</VersionDateTag>

- 优化并更新 [标签页 Tabs](/guide/components/tabs.html) 组件，新增 `prefix` `suffix` `animated` `tabGutter` `tabStyle` `tabPosition` `contentStyle` 属性

## <VersionDateTag date="2024-09-26">1.6.9</VersionDateTag>

- 优化并更新 [标签页 Tabs](/guide/components/tabs.html) 组件，新增带图标的标签页功能
- 组件库及文档代码优化

## <VersionDateTag date="2024-09-24">1.6.8</VersionDateTag>

- 优化 [徽标 Badge](/guide/components/badge.html) 组件实现
- 优化并更新 [卡片 Card](/guide/components/card.html) 组件，新增 `hoverable` `skeletonProps` 属性，并调整卡片尺寸 `size` 功能
- 优化并更新 [折叠面板 Collapse](/guide/components/collapse.html) 组件，新增 `copyProps` 属性
- 组件库及文档代码优化

## <VersionDateTag date="2024-09-18">1.6.7</VersionDateTag>

- 组件库代码优化

## <VersionDateTag date="2024-09-13">1.6.6</VersionDateTag>

- 优化并更新 [滑动输入条 Slider](/guide/components/slider.html) 组件，新增垂直模式
- 优化并更新 [数字输入框 InputNumber](/guide/components/input-number.html) 组件
- 组件库及文档代码优化

## <VersionDateTag date="2024-09-10">1.6.5</VersionDateTag>

- 优化并更新 [全局提示 Message](/guide/components/message.html) 组件，新增自定义图标、自定义类名、自定义样式等功能
- 优化并更新 [模态框 Modal](/guide/components/modal.html) 组件，新增自定义图标、自定义类型、自定义样式等功能
- 组件库及文档代码优化

## <VersionDateTag date="2024-09-06">1.6.4</VersionDateTag>

- 优化并更新 [倒计时 Countdown](/guide/components/countdown.html) 组件，新增随时暂停和重置倒计时功能
- 优化并更新 [通知提醒 Notification](/guide/components/notification.html) 组件，新增自定义图标、自定义类名、自定义样式等功能
- 组件库及文档代码优化

## <VersionDateTag date="2024-08-30">1.6.3</VersionDateTag>

- 优化并更新 [回到顶部 Backtop](/guide/components/back-top.html) 组件，新增 `icon` `description` `tooltip` `tooltipProps` `type` `shape` 属性
- 优化并更新 [文字提示 Tooltip](/guide/components/tooltip.html) 组件，新增 `contentStyle` 属性
- 优化并更新 [按钮 Button](/guide/components/button.html) 组件，新增 `buttonClass` 属性，删除 `loadingColor` 属性
- 组件库及文档代码优化

## <VersionDateTag date="2024-08-29">1.6.2</VersionDateTag>

- 优化并更新 [对话框 Dialog](/guide/components/dialog.html) 组件，`top` 属性新增 `string` 类型
- 优化并更新 [水印 Watermark](/guide/components/watermark.html) 组件，新增 `textStyle` 属性，删除 `color` `fontSize` `fontWeight` `fontFamily` `fontStyle` 属性
- 优化并更新 [折叠面板 Collapse](/guide/components/collapse.html) 组件，新增 `disabled` `itemStyle` `headerStyle` `contentStyle` `arrow` `arrowStyle` `extra` 属性
- 组件库及文档代码优化

## <VersionDateTag date="2024-08-27">1.6.1</VersionDateTag>

- 优化并更新 [输入框 Input](/guide/components/input.html) 组件
- 优化并更新 [文字提示 Tooltip](/guide/components/tooltip.html) 组件，新增 `bgColor` `tooltipStyle` `arrow` `trigger` `showDelay` `hideDelay` `show` 属性
- 优化并更新 [气泡卡片 Popover](/guide/components/popover.html) 组件，新增 `titleStyle` `contentStyle` `bgColor` `popoverStyle` `arrow` `trigger` `showDelay` `hideDelay` `show` 属性
- 优化并更新 [弹出确认 Popconfirm](/guide/components/popconfirm.html) 组件，新增 `titleStyle` `descriptionStyle` `bgColor` `popconfirmStyle` `iconStyle` `arrow` `trigger` `showDelay` `hideDelay` `show` 属性
- 组件库代码优化

## <VersionDateTag date="2024-08-23">1.6.0</VersionDateTag>

- 新增 [搜索框 InputSearch](/guide/components/input-search.html) 组件
- 组件库代码优化

## <VersionDateTag date="2024-08-22">1.5.4</VersionDateTag>

- 优化并更新 [按钮 Button](/guide/components/button.html) 组件，新增 `shape` `icon` 属性
- 新增工具函数 [监听插槽存在 useSlotsExist](/utils/functions/use-slots-exist.html)，用于监听 Vue 组件中插槽是否存在
- 组件库代码优化

## <VersionDateTag date="2024-08-19">1.5.3</VersionDateTag>

- 优化并更新 [面包屑 Breadcrumb](/guide/components/breadcrumb.html) 组件，新增 `breadcrumbClass` `breadcrumbStyle` `separatorStyle` 属性
- 优化并更新 [对话框 Dialog](/guide/components/dialog.html) 组件，新增 `cancelProps` `okProps` 属性
- 优化并更新 [加载中 Spin](/guide/components/spin.html) 组件，新增 `spinCircleWidth` `spinCirclePercent` `ringRailColor` 属性
- 组件库代码优化

## <VersionDateTag date="2024-08-16">1.5.2</VersionDateTag>

- 优化并更新 [水印 Watermark](/guide/components/watermark.html) 组件，新增浏览器暗黑模式下水印颜色自动反转
- 优化并更新 [警告提示 Alert](/guide/components/alert.html)，新增 `actions` 属性
- 优化并更新 [加载中 Spin](/guide/components/spin.html)，新增 `indicator: 'ring-circle'` 加载中类型，并新增 `ringCirclePercent` `ringCircleColor` 属性，优化整体效果
- 组件库优化

## <VersionDateTag date="2024-08-15">1.5.1</VersionDateTag>

- 优化并更新 [列表 List](/guide/components/list.html) 组件
- 组件库代码优化

## <VersionDateTag date="2024-08-14">1.5.0</VersionDateTag>

- 新增 [列表 List](/guide/components/list.html) 组件
- 优化并更新 [空状态 Empty](/guide/components/empty.html) 组件，新增 `footer` 属性
- 组件库代码优化

## <VersionDateTag date="2024-08-13">1.4.7</VersionDateTag>

- 优化并更新 [表格 Table](/guide/components/table.html) 组件，新增 `spinProps` `emptyProps` 属性
- 优化并更新 [表格 Pagination](/guide/components/table.html) 组件，新增 `disabled` `pageAmount` 属性，更新 `showTotal` 属性
- 优化并更新 [输入框 Input](/guide/components/input.html) 组件
- 优化并更新 [文本域 Textarea](/guide/components/textarea.html) 组件
- 组件库及文档代码优化

## <VersionDateTag date="2024-08-08">1.4.6</VersionDateTag>

- 优化并更新 [文字滚动 TextScroll](/guide/components/text-scroll.html) 组件，优化滚动逻辑
- 优化并更新 [空状态 Empty](/guide/components/empty.html) 组件，新增 `descriptionStyle` 属性

## <VersionDateTag date="2024-08-07">1.4.5</VersionDateTag>

- 优化并更新 [倒计时 Countdown](/guide/components/countdown.html) 组件
- 优化并更新 [弹性布局 Flex](/guide/components/flex.html) 组件
- 优化并更新 [间距 Space](/guide/components/space.html) 组件
- 优化并更新 [头像 Avatar](/guide/components/avatar.html) 组件
- 优化并更新 [卡片 Card](/guide/components/card.html) 组件
- 组件库及文档代码优化

## <VersionDateTag date="2024-08-05">1.4.4</VersionDateTag>

- 重构并优化 [开关 Switch](/guide/components/switch.html) 组件
- 优化并更新 [水印 Watermark](/guide/components/watermark.html) 组件
- 组件库及文档代码优化

## <VersionDateTag date="2024-08-02">1.4.3</VersionDateTag>

- 优化并更新 [空状态 Empty](/guide/components/empty.html) 组件
- 优化并更新 [模态框 Modal](/guide/components/modal.html) 组件，新增 `cancelProps` `okType` `okProps` `noticeProps` 属性
- 组件库及文档代码优化

## <VersionDateTag date="2024-08-01">1.4.2</VersionDateTag>

- 优化 [选择器 Select](/guide/components/select.html) 组件
- 优化 [对话框 Dialog](/guide/components/dialog.html) 组件
- 优化并更新 [滚动条 Scrollbar](/guide/components/scrollbar.html) 组件，新增 `contentClass` 属性
- 优化 [抽屉 Drawer](/guide/components/drawer.html) 组件，新增 `headerClass` `scrollbarProps` `bodyClass` `footerClass` 属性

## <VersionDateTag date="2024-07-31">1.4.1</VersionDateTag>

- 优化 [按钮 Button](/guide/components/button.html) 组件
- 优化并更新 [标签 Tag](/guide/components/tag.html) 组件，新增 `spaceProps` 属性
- 优化并更新 [图片 Image](/guide/components/image.html) 组件，新增 `spaceProps` `spinProps` 属性，同时删除了部分属性
- 优化并更新 [上传 Upload](/guide/components/upload.html) 组件，新增 `spaceProps` `spinProps` `imageProps` `messageProps` `actionMessage` 属性，同时删除了部分属性
- 组件库及文档代码优化

## <VersionDateTag date="2024-07-30">1.4.0</VersionDateTag>

- 新增 [加载条 LoadingBar](/guide/components/loading-bar.html) 组件

## <VersionDateTag date="2024-07-29">1.3.4</VersionDateTag>

- 优化并更新 [滚动条 Scrollbar](/guide/components/scrollbar.html) 组件，新增 `autoHide` `delay` 属性
- 优化并更新 [选择器 Select](/guide/components/select.html) 组件，新增 `scrollbarProps` 属性

## <VersionDateTag date="2024-07-26">1.3.3</VersionDateTag>

- 优化 [文本省略 Ellipsis](/guide/components/ellipsis.html) 组件，新增 `tooltipProps` 属性

## <VersionDateTag date="2024-07-26">1.3.2</VersionDateTag>

- 优化 [滑动输入条 Slider](/guide/components/slider.html) 组件
- 优化 [瀑布流 Waterfall](/guide/components/waterfall.html) 组件

## <VersionDateTag date="2024-07-25">1.3.1</VersionDateTag>

- 优化 [标签页 Tabs](/guide/components/tabs.html) 组件实现
- 优化 [轮播图 Carousel](/guide/components/carousel.html) 组件实现
- 优化更新 [按钮 Button](/guide/components/button.html) 组件
- 优化更新 [弹出确认 Popconfirm](/guide/components/popconfirm.html) 组件
- 组件库及文档代码优化

## <VersionDateTag date="2024-07-24">1.3.0</VersionDateTag>

- 新增 [分段控制器 Segmented](/guide/components/segmented.html) 组件
- 修复 [文本省略 Ellipsis](/guide/components/ellipsis.html) 组件：当文本区域宽高变化时，`tooltip` 显示的问题
- 修复 [文字滚动 TextScroll](/guide/components/text-scroll.html)组件：滚动区域尺寸变化时的横向滚动问题

## <VersionDateTag date="2024-07-23">1.2.0</VersionDateTag>

- 优化 [按钮 Button](/guide/components/button.html) 组件，并新增相关功能
- 优化 [评分 Rate](/guide/components/rate.html) 组件
- 修复并优化 [文本省略 Ellipsis](/guide/components/ellipsis.html) 组件

## <VersionDateTag date="2024-07-22">1.1.2</VersionDateTag>

- 新增 [监听DOM尺寸 useResizeObserver](/utils/functions/use-resize-observer.html) 工具函数

## <VersionDateTag date="2024-07-19">1.1.1</VersionDateTag>

- 优化 [描述列表 Descriptions](/guide/components/descriptions.html) 组件

## <VersionDateTag date="2024-07-18">1.1.0</VersionDateTag>

- 新增 [滚动条 Scrollbar](/guide/components/scrollbar.html) 组件
- 新增 [DOM监听 useMutationObserver](/utils/functions/use-mutation-observer.html) 工具函数

## future

- 新增 穿梭框 Transfer 组件
- 新增 漫游式引导 Tour 组件
