/**
 * 组件级公开令牌注册表
 *
 * 唯一数据源：文档生成脚本（`scripts/gen-component-vars-doc.js`）、守护（`scripts/verify-theme.js`）
 * 与测试（`tests/component-vars.spec.ts`）都直接 import 本文件。必须是 `.js` 而不是 `.ts`：
 * 上述脚本由 `node` 直接执行，engines 允许的 Node 20.19 / 22.12 都不支持 import `.ts`。
 * 运行期由 `components/config-provider/theme-scope.ts` 读取，用于把组件级通用主色映射到
 * 现有公开令牌；因此本文件同时提供 `components/theme/component-vars.d.ts` 供 `vue-tsc` 解析。
 *
 * 【不变量一】公开令牌只能「带默认值消费」，禁止在任何组件 `<style>` 里以 `--name:` 声明。
 *   元素自身的声明优先于从祖先继承的值，用户在外面写的同名变量会被压住 —— 文档就成了假承诺。
 *
 * 【不变量二】默认值不能挪到 `:root` 一次性声明来省掉重复。
 *   自定义属性的 `var()` 替换发生在**声明处**的 computed-value 阶段，继承传递的是已替换的计算值：
 *   `:root { --va-button-primary-color: var(--va-primary-color) }` 会固定成根节点的颜色，
 *   嵌套作用域换肤（`ConfigProvider` + 自定义种子）随即失效。fallback 是在消费元素上求值的，
 *   只有它能跟随最近一层继承值。
 *
 * 【不变量三】公开的视觉面必须成对 / 状态闭合：底色与前景色、常态与 hover 一起公开，
 *   `disabled` 态一律不公开（统一走中性令牌）。否则用户覆盖一次就得到半吊子视觉。
 *
 * 【不变量四】`themeRole` / `themeState` 只描述「组件级通用主色如何映射到本令牌」，
 *   不改变令牌的公开默认值；未标记的令牌（中性色、皮肤固定色）不参与组件级派生。
 *   映射目标由组件注册表决定，ConfigProvider 只认识 `primaryColor` 这一个粗粒度配置。
 *
 * @typedef {'base' | 'hover' | 'active' | 'bg' | 'border' | 'solid'} ComponentThemeState
 * @typedef {Object} ComponentVarMeta
 * @property {string} component 所属组件名（与 `theme.components.<Component>` 的键一致）
 * @property {string} file 所属组件源文件（相对 components/）
 * @property {string} group 令牌组：同一视觉元素的状态族，文档按组呈现、用户按组覆盖
 * @property {string} fallback 必须与组件样式里的 `var(name, fallback)` 逐字一致
 * @property {{ light: string, dark: string }} [resolved] fallback 指向组件私有名（`var(--menu-xxx)`）时必填
 * @property {'primary'} [themeRole] 组件级通用色角色；未标记表示不跟随组件主色
 * @property {ComponentThemeState | { light: ComponentThemeState, dark: ComponentThemeState }} [themeState]
 *   取 `deriveColorStates` 的哪一档；按模式分列用于皮肤/模式映射不同的组件
 * @property {string} description 面向使用者的说明
 */

/** 公开令牌名（增删必须同步 `COMPONENT_VARS` 的键） */
export const COMPONENT_VAR_NAMES = [
  '--va-button-primary-color',
  '--va-button-primary-color-hover',
  '--va-button-primary-color-active',
  '--va-button-solid-text-color',
  '--va-button-danger-color',
  '--va-button-danger-color-hover',
  '--va-button-danger-color-active',
  '--va-slider-track-color',
  '--va-slider-track-color-hover',
  '--va-slider-rail-color',
  '--va-slider-rail-color-hover',
  '--va-slider-handle-color',
  '--va-slider-handle-shadow-color',
  '--va-slider-handle-shadow-color-hover-focus',
  '--va-slider-dot-border-color',
  '--va-slider-dot-border-color-hover',
  '--va-slider-dot-color-active',
  '--va-slider-tooltip-bg-color',
  '--va-slider-tooltip-color',
  '--va-menu-primary-color',
  '--va-menu-primary-palette',
  '--va-menu-primary-text-color',
  '--va-menu-background',
  '--va-menu-popup-background',
  '--va-menu-inline-submenu-background',
  '--va-menu-item-selected-background',
  '--va-menu-item-selected-color',
  '--va-text-scroll-bg-color',
  '--va-text-scroll-shadow-color',
  '--va-scrollbar-color',
  '--va-scrollbar-color-hover',
  '--va-table-bg-color',
  '--va-table-header-bg-color',
  '--va-table-footer-bg-color',
  '--va-table-border-color',
  '--va-card-bg-color',
  '--va-card-border-color',
  '--va-alert-bg-color',
  '--va-alert-border-color',
  '--va-input-bg-color',
  '--va-input-border-color',
  '--va-input-text-color',
  '--va-input-placeholder-color',
  '--va-textarea-bg-color',
  '--va-textarea-border-color',
  '--va-textarea-text-color',
  '--va-textarea-placeholder-color',
  '--va-modal-bg-color',
  '--va-modal-title-color',
  '--va-modal-text-color',
  '--va-drawer-bg-color',
  '--va-drawer-header-border-color',
  '--va-drawer-footer-border-color'
]

/** 令牌元数据（键集合必须与 `COMPONENT_VAR_NAMES` 完全一致） */
export const COMPONENT_VARS = {
  '--va-button-primary-color': {
    component: 'Button',
    file: 'button/Button.vue',
    group: 'primary',
    fallback: 'var(--va-primary-color)',
    themeRole: 'primary',
    themeState: 'base',
    description: '主按钮底色（常态）'
  },
  '--va-button-primary-color-hover': {
    component: 'Button',
    file: 'button/Button.vue',
    group: 'primary',
    fallback: 'var(--va-primary-color-hover)',
    themeRole: 'primary',
    themeState: 'hover',
    description: '主按钮底色（悬停）'
  },
  '--va-button-primary-color-active': {
    component: 'Button',
    file: 'button/Button.vue',
    group: 'primary',
    fallback: 'var(--va-primary-color-active)',
    themeRole: 'primary',
    themeState: 'active',
    description: '主按钮底色（按下）'
  },
  '--va-button-solid-text-color': {
    component: 'Button',
    file: 'button/Button.vue',
    group: 'foreground',
    fallback: 'var(--va-text-color-solid)',
    themeRole: 'primary',
    themeState: 'solid',
    description: '实色底上的文字色（`primary` / `danger` / `reverse` 共用）'
  },
  '--va-button-danger-color': {
    component: 'Button',
    file: 'button/Button.vue',
    group: 'danger',
    fallback: 'var(--va-error-color)',
    description: '危险按钮底色（常态）'
  },
  '--va-button-danger-color-hover': {
    component: 'Button',
    file: 'button/Button.vue',
    group: 'danger',
    fallback: 'var(--va-button-danger-color, var(--va-error-color))',
    description: '危险按钮底色（悬停）；默认跟随常态色，只覆盖常态色时不会跳回全局红'
  },
  '--va-button-danger-color-active': {
    component: 'Button',
    file: 'button/Button.vue',
    group: 'danger',
    fallback: 'var(--va-button-danger-color, var(--va-error-color))',
    description: '危险按钮底色（按下）；默认跟随常态色'
  },
  '--va-slider-track-color': {
    component: 'Slider',
    file: 'slider/Slider.vue',
    group: 'track',
    fallback: 'var(--va-primary-border-color)',
    themeRole: 'primary',
    themeState: 'border',
    description: '已选轨道底色（常态）'
  },
  '--va-slider-track-color-hover': {
    component: 'Slider',
    file: 'slider/Slider.vue',
    group: 'track',
    fallback: 'var(--va-primary-color)',
    themeRole: 'primary',
    themeState: 'base',
    description: '已选轨道底色（悬停）'
  },
  '--va-slider-rail-color': {
    component: 'Slider',
    file: 'slider/Slider.vue',
    group: 'rail',
    fallback: 'var(--va-fill-color-1)',
    description: '未选轨道底色（常态）'
  },
  '--va-slider-rail-color-hover': {
    component: 'Slider',
    file: 'slider/Slider.vue',
    group: 'rail',
    fallback: 'var(--va-fill-color-2)',
    description: '未选轨道底色（悬停）'
  },
  '--va-slider-handle-color': {
    component: 'Slider',
    file: 'slider/Slider.vue',
    group: 'handle',
    fallback: 'var(--va-bg-elevated-color)',
    description: '滑块圆点底色'
  },
  '--va-slider-handle-shadow-color': {
    component: 'Slider',
    file: 'slider/Slider.vue',
    group: 'handle',
    fallback: 'var(--va-primary-border-color)',
    themeRole: 'primary',
    themeState: 'border',
    description: '滑块光环色（常态，常驻 `2px`）'
  },
  '--va-slider-handle-shadow-color-hover-focus': {
    component: 'Slider',
    file: 'slider/Slider.vue',
    group: 'handle',
    fallback: 'var(--va-primary-color)',
    themeRole: 'primary',
    themeState: 'base',
    description: '滑块光环色（悬停 / 聚焦，放大到 `4px`）'
  },
  // 刻度点（`marks` 场景）：只公开常态描边 / 悬停描边 / 激活描边三个视觉面，
  // 点底色 `--slider-dot-color` 与 mark 文字色属于组件自有细节，仍为私有变量。
  '--va-slider-dot-border-color': {
    component: 'Slider',
    file: 'slider/Slider.vue',
    group: 'dot',
    fallback: 'var(--va-border-split-color)',
    description: '刻度点描边色（常态）'
  },
  '--va-slider-dot-border-color-hover': {
    component: 'Slider',
    file: 'slider/Slider.vue',
    group: 'dot',
    fallback: 'var(--va-fill-color-2)',
    description: '刻度点描边色（悬停）'
  },
  '--va-slider-dot-color-active': {
    component: 'Slider',
    file: 'slider/Slider.vue',
    group: 'dot',
    fallback: 'var(--va-primary-border-color)',
    themeRole: 'primary',
    themeState: 'border',
    description: '刻度点描边色（激活态，跟随组件级主色）'
  },
  '--va-slider-tooltip-bg-color': {
    component: 'Slider',
    file: 'slider/Slider.vue',
    group: 'tooltip',
    fallback: 'var(--va-bg-spotlight-color)',
    description: '数值气泡底色'
  },
  '--va-slider-tooltip-color': {
    component: 'Slider',
    file: 'slider/Slider.vue',
    group: 'tooltip',
    fallback: 'var(--va-text-color-solid)',
    description: '数值气泡文字色；改底色时需同步覆盖，否则浅底白字不可读'
  },
  '--va-menu-primary-color': {
    component: 'Menu',
    file: 'menu/Menu.vue',
    group: 'primary',
    fallback: 'var(--va-primary-color)',
    themeRole: 'primary',
    themeState: 'base',
    description: '菜单主色桥：选中项文字 / 深色皮肤选中底 / 水平状态下划线'
  },
  '--va-menu-primary-palette': {
    component: 'Menu',
    file: 'menu/Menu.vue',
    group: 'primary',
    fallback: 'var(--va-primary-bg-color)',
    themeRole: 'primary',
    themeState: 'bg',
    description: '菜单主色浅底桥：浅色皮肤选中项底色（深色皮肤改用 --va-menu-primary-color）'
  },
  '--va-menu-primary-text-color': {
    component: 'Menu',
    file: 'menu/Menu.vue',
    group: 'primary',
    fallback: 'var(--va-primary-text-color)',
    themeRole: 'primary',
    themeState: 'base',
    description: '菜单主色文字桥：浅色皮肤选中项文字 / 水平菜单下划线'
  },
  '--va-menu-background': {
    component: 'Menu',
    file: 'menu/Menu.vue',
    group: 'surface',
    fallback: 'var(--menu-background)',
    resolved: {
      light: 'var(--va-bg-container-color)',
      dark: 'var(--va-bg-brand-dark-color, #001529)'
    },
    description: '菜单根列表背景；弹出子菜单面板取 --va-menu-popup-background，不受它影响'
  },
  '--va-menu-popup-background': {
    component: 'Menu',
    file: 'menu/Menu.vue',
    group: 'surface',
    fallback: 'var(--menu-popup-background)',
    resolved: {
      light: 'var(--va-bg-elevated-color)',
      dark: 'var(--va-bg-brand-dark-color, #001529)'
    },
    description: '弹出子菜单（浮层面板）背景；深色皮肤取品牌色暗底，与根列表同色'
  },
  '--va-menu-inline-submenu-background': {
    component: 'Menu',
    file: 'menu/Menu.vue',
    group: 'surface',
    fallback: 'var(--menu-inline-submenu-background)',
    resolved: {
      light: 'var(--va-fill-color-1)',
      dark: 'var(--va-bg-brand-dark-deep-color, #000c17)'
    },
    description: '内联子菜单（inline 展开的下一级列表）背景；深色皮肤取更深一阶的品牌色暗底'
  },
  '--va-menu-item-selected-background': {
    component: 'Menu',
    file: 'menu/Menu.vue',
    group: 'selected',
    fallback: 'var(--menu-item-selected-background)',
    resolved: {
      light: 'var(--va-primary-bg-color)',
      dark: 'var(--va-primary-color)'
    },
    description: '选中项（含按下态）底色'
  },
  '--va-menu-item-selected-color': {
    component: 'Menu',
    file: 'menu/Menu.vue',
    group: 'selected',
    fallback: 'var(--menu-item-selected-color)',
    resolved: {
      light: 'var(--va-primary-text-color)',
      dark: '#fff'
    },
    description: '选中项文字色 / 水平菜单下划线色'
  },
  '--va-text-scroll-bg-color': {
    component: 'TextScroll',
    file: 'text-scroll/TextScroll.vue',
    group: 'surface',
    fallback: 'var(--va-bg-container-color)',
    description: '滚动区域底色（横 / 纵两个变体共用）'
  },
  '--va-text-scroll-shadow-color': {
    component: 'TextScroll',
    file: 'text-scroll/TextScroll.vue',
    group: 'surface',
    fallback: 'var(--va-border-color)',
    description: '滚动区域外围阴影色（横 / 纵两个变体共用）'
  },
  '--va-scrollbar-color': {
    component: 'Scrollbar',
    file: 'scrollbar/Scrollbar.vue',
    group: 'thumb',
    fallback: 'var(--va-text-color-disabled)',
    description: '滚动条滑块底色（常态）'
  },
  '--va-scrollbar-color-hover': {
    component: 'Scrollbar',
    file: 'scrollbar/Scrollbar.vue',
    group: 'thumb',
    fallback: 'var(--va-text-color-3)',
    description: '滚动条滑块底色（悬停）'
  },
  /* ------------------------------ 容器 / 表单类（高频局部定制面） ------------------------------ */
  '--va-table-bg-color': {
    component: 'Table',
    file: 'table/Table.vue',
    group: 'surface',
    fallback: 'var(--va-bg-container-color)',
    description: '表格容器 / 数据行 / 固定列底色'
  },
  '--va-table-header-bg-color': {
    component: 'Table',
    file: 'table/Table.vue',
    group: 'header',
    fallback: 'var(--va-fill-color-4)',
    description: '表头单元格底色（含排序列表头与固定列表头）'
  },
  '--va-table-footer-bg-color': {
    component: 'Table',
    file: 'table/Table.vue',
    group: 'footer',
    fallback: 'var(--va-fill-color-4)',
    description: '表格底部（分页区）底色'
  },
  '--va-table-border-color': {
    component: 'Table',
    file: 'table/Table.vue',
    group: 'border',
    fallback: 'var(--va-border-split-color)',
    description: '单元格分隔线 / 外边框 / 固定列滚动阴影；另作可排序表头底与可排序行悬停底（改浅会连带变亮这两处底色）'
  },
  '--va-card-bg-color': {
    component: 'Card',
    file: 'card/Card.vue',
    group: 'surface',
    fallback: 'var(--va-bg-container-color)',
    description: '卡片底色'
  },
  '--va-card-border-color': {
    component: 'Card',
    file: 'card/Card.vue',
    group: 'border',
    fallback: 'var(--va-border-split-color)',
    description: '卡片外边框与标题分割线'
  },
  '--va-alert-bg-color': {
    component: 'Alert',
    file: 'alert/Alert.vue',
    group: 'surface',
    fallback: 'var(--va-fill-color-1)',
    description: '默认态提示框底色（语义态用 --va-{success,warning,error,info}-* 控制）'
  },
  '--va-alert-border-color': {
    component: 'Alert',
    file: 'alert/Alert.vue',
    group: 'border',
    fallback: 'var(--va-border-color)',
    description: '默认态提示框边框（语义态用 --va-{success,warning,error,info}-border-color 控制）'
  },
  '--va-input-bg-color': {
    component: 'Input',
    file: 'input/Input.vue',
    group: 'surface',
    fallback: 'var(--va-bg-container-color)',
    description: '输入框底色（含自动填充背景）'
  },
  '--va-input-border-color': {
    component: 'Input',
    file: 'input/Input.vue',
    group: 'border',
    fallback: 'var(--va-border-color)',
    description: '输入框常态边框（聚焦 / 悬停仍由主色派生）'
  },
  '--va-input-text-color': {
    component: 'Input',
    file: 'input/Input.vue',
    group: 'foreground',
    fallback: 'var(--va-text-color-1)',
    description: '输入文字与光标颜色'
  },
  '--va-input-placeholder-color': {
    component: 'Input',
    file: 'input/Input.vue',
    group: 'foreground',
    fallback: 'var(--va-text-color-disabled)',
    description: '占位符文字颜色'
  },
  '--va-textarea-bg-color': {
    component: 'Textarea',
    file: 'textarea/Textarea.vue',
    group: 'surface',
    fallback: 'var(--va-bg-container-color)',
    description: '文本域底色（含自动填充背景）'
  },
  '--va-textarea-border-color': {
    component: 'Textarea',
    file: 'textarea/Textarea.vue',
    group: 'border',
    fallback: 'var(--va-border-color)',
    description: '文本域常态边框（聚焦 / 悬停仍由主色派生）'
  },
  '--va-textarea-text-color': {
    component: 'Textarea',
    file: 'textarea/Textarea.vue',
    group: 'foreground',
    fallback: 'var(--va-text-color-1)',
    description: '输入文字与光标颜色'
  },
  '--va-textarea-placeholder-color': {
    component: 'Textarea',
    file: 'textarea/Textarea.vue',
    group: 'foreground',
    fallback: 'var(--va-text-color-disabled)',
    description: '占位符文字颜色'
  },
  '--va-modal-bg-color': {
    component: 'Modal',
    file: 'modal/Modal.vue',
    group: 'surface',
    fallback: 'var(--va-bg-elevated-color)',
    description: '弹窗内容区底色'
  },
  '--va-modal-title-color': {
    component: 'Modal',
    file: 'modal/Modal.vue',
    group: 'foreground',
    fallback: 'var(--va-text-color-1)',
    description: '弹窗标题颜色'
  },
  '--va-modal-text-color': {
    component: 'Modal',
    file: 'modal/Modal.vue',
    group: 'foreground',
    fallback: 'var(--va-text-color-1)',
    description: '弹窗正文颜色'
  },
  '--va-drawer-bg-color': {
    component: 'Drawer',
    file: 'drawer/Drawer.vue',
    group: 'surface',
    fallback: 'var(--va-bg-elevated-color)',
    description: '抽屉面板底色'
  },
  '--va-drawer-header-border-color': {
    component: 'Drawer',
    file: 'drawer/Drawer.vue',
    group: 'border',
    fallback: 'var(--va-border-split-color)',
    description: '抽屉头部与内容区之间的分割线'
  },
  '--va-drawer-footer-border-color': {
    component: 'Drawer',
    file: 'drawer/Drawer.vue',
    group: 'border',
    fallback: 'var(--va-border-split-color)',
    description: '抽屉底部操作区上方的分割线'
  }
}

/**
 * 支持组件级主色配置的组件名（按注册表首次出现顺序）。
 *
 * 只收录至少有一个 `themeRole` 令牌的组件；`ConfigProvider` 用它对未支持的键告警，
 * 文档生成器据此说明哪些组件可以走 `theme.components.<Component>.primaryColor`。
 */
export const COMPONENT_THEME_NAMES = [
  ...new Set(
    COMPONENT_VAR_NAMES.map((name) => COMPONENT_VARS[name])
      .filter((meta) => Boolean(meta.themeRole))
      .map((meta) => meta.component)
  )
]

/**
 * 支持 `theme.components.<Component>.primaryColor` 的组件清单
 *
 * 与 `COMPONENT_THEME_NAMES` 的区别：
 * - `COMPONENT_THEME_NAMES` 只收录「有公开组件令牌映射」的组件（Button / Slider / Menu）；
 * - 本清单是**全部已接线**的组件：它们的样式已经把主色使用点改为消费内部桥变量
 *   `--va-cp-<kebab>-primary-*`，Provider 只需按组件键写这组变量即可生效。
 *
 * `dir` 用于守护脚本与测试做「每个组件至少有一处桥变量消费」的覆盖检查；
 * 新增组件支持时，必须同时完成样式接线并把条目加到这里，否则视为假承诺。
 */
export const THEME_COMPONENTS = [
  { key: 'Alert', dir: 'alert' },
  { key: 'AutoComplete', dir: 'auto-complete' },
  { key: 'BackTop', dir: 'back-top' },
  { key: 'Badge', dir: 'badge' },
  { key: 'Button', dir: 'button' },
  { key: 'Calendar', dir: 'calendar' },
  { key: 'Carousel', dir: 'carousel' },
  { key: 'Checkbox', dir: 'checkbox' },
  { key: 'ColorPicker', dir: 'color-picker' },
  { key: 'DatePicker', dir: 'date-picker' },
  { key: 'FloatButton', dir: 'float-button' },
  { key: 'GradientText', dir: 'gradient-text' },
  { key: 'Image', dir: 'image' },
  { key: 'Input', dir: 'input' },
  { key: 'InputNumber', dir: 'input-number' },
  { key: 'InputSearch', dir: 'input-search' },
  { key: 'LoadingBar', dir: 'loading-bar' },
  { key: 'Menu', dir: 'menu' },
  { key: 'Message', dir: 'message' },
  { key: 'Modal', dir: 'modal' },
  { key: 'Notification', dir: 'notification' },
  { key: 'Pagination', dir: 'pagination' },
  { key: 'Popconfirm', dir: 'popconfirm' },
  { key: 'Progress', dir: 'progress' },
  { key: 'Radio', dir: 'radio' },
  { key: 'Select', dir: 'select' },
  { key: 'Slider', dir: 'slider' },
  { key: 'Spin', dir: 'spin' },
  { key: 'Steps', dir: 'steps' },
  { key: 'Swiper', dir: 'swiper' },
  { key: 'Switch', dir: 'switch' },
  { key: 'Table', dir: 'table' },
  { key: 'Tabs', dir: 'tabs' },
  { key: 'Tag', dir: 'tag' },
  { key: 'TextScroll', dir: 'text-scroll' },
  { key: 'Textarea', dir: 'textarea' },
  { key: 'TimePicker', dir: 'time-picker' },
  { key: 'Timeline', dir: 'timeline' },
  { key: 'Upload', dir: 'upload' }
]

/** 配置键集合（Provider 用于告警与桥变量写入） */
export const THEME_COMPONENT_KEYS = THEME_COMPONENTS.map((item) => item.key)

/**
 * 组件名 → 该组件参与「组件级主色映射」的公开令牌条目
 *
 * 只收录带 `themeRole` 的令牌（其余令牌不随组件主色变化）。Provider 按当前配置的组件
 * 直接取条目，不必每个组件都全表扫描 `COMPONENT_VARS`。
 */
export const COMPONENT_VARS_BY_COMPONENT = Object.entries(COMPONENT_VARS).reduce((result, [name, meta]) => {
  if (!meta.themeRole) {
    return result
  }
  if (!result[meta.component]) {
    result[meta.component] = []
  }
  result[meta.component].push([name, meta])
  return result
}, {})
