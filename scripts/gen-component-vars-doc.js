#!/usr/bin/env node
/**
 * 组件级令牌文档生成器
 *
 * 唯一数据源：`components/theme/component-vars.js`。手写内容必然与注册表漂移，
 * 因此本节整篇由脚本生成（含说明文字），只允许改脚本再重新生成。
 *
 * 输出是「定制主题」页的片段：`docs/guide/parts/` 已被 srcExclude 排除、不单独成页，
 * 由 `docs/guide/customize-theme.md` 通过 `<!--@include-->` 引入。
 *
 * 用法：node scripts/gen-component-vars-doc.js
 */
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import {
  COMPONENT_THEME_NAMES,
  COMPONENT_VAR_NAMES,
  COMPONENT_VARS,
  THEME_COMPONENT_KEYS
} from '../components/theme/component-vars.js'

const rootDir = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const outputPath = resolve(rootDir, 'docs/guide/parts/component-vars.md')

/** 令牌组的中文标签（决定文档小节标题，顺序取首次出现） */
const GROUP_LABELS = {
  primary: '主色',
  foreground: '前景色',
  danger: '危险色',
  track: '已选轨道',
  rail: '未选轨道',
  handle: '滑块',
  tooltip: '数值气泡',
  surface: '容器',
  selected: '选中态',
  thumb: '滚动条滑块'
}

/**
 * 组件级补充说明：默认值的歧义（皮肤 vs 模式）、实例覆盖的来源等
 * 生成在每个组件小节的开头，避免读者把「浅色 / 深色」误读成暗色模式
 */
const COMPONENT_NOTES = {
  button:
    '`color` 属性会在这一个实例上内联写入 `--va-button-primary-color` 等令牌（实例级覆盖，优先级最高），因此传了 `color` 时下面这些令牌对该实例不生效。下拉按钮 `DropdownButton` 的共享分割线也跟随 `--va-button-primary-color-hover` / `--va-button-danger-color-hover`。',
  menu: '下表的「浅色 / 深色」指 `theme` 属性（独立皮肤），**与 `data-va-mode` 暗色模式无关**：两种皮肤下这些令牌都继续跟随全局令牌派生（例如浅色皮肤在暗色模式下会取 `--va-bg-container-color` 的暗色值）。三只主色桥令牌由 `theme.components.Menu.primaryColor` 派生；`--va-menu-item-selected-*` 的默认值通过它们间接跟随组件主色，直接覆盖选中态令牌仍然优先。'
}

/** 从组件文档的首个一级标题取展示名（如「按钮 Button」），避免再维护一份命名表 */
function readComponentTitle(dir) {
  const docPath = resolve(rootDir, 'docs/guide/components', `${dir}.md`)
  if (!existsSync(docPath)) {
    return dir
  }
  const matched = readFileSync(docPath, 'utf-8').match(/^#\s+(.+)$/m)
  return matched ? matched[1].trim() : dir
}

/** 注册表按组件 → 组两级归集，保持注册表顺序（决定表格行序） */
function groupByComponent() {
  const components = new Map()
  COMPONENT_VAR_NAMES.forEach((name) => {
    const meta = COMPONENT_VARS[name]
    const dir = meta.file.split('/')[0]
    if (!components.has(dir)) {
      components.set(dir, {
        dir,
        title: readComponentTitle(dir),
        componentName: meta.component,
        groups: new Map()
      })
    }
    const component = components.get(dir)
    if (!component.groups.has(meta.group)) {
      component.groups.set(meta.group, [])
    }
    component.groups.get(meta.group).push({ name, ...meta })
  })
  return [...components.values()]
}

/** 单个变量的默认值单元格：有 resolved 时按模式分列 */
function defaultValueCell(meta) {
  if (!meta.resolved) {
    return `\`${meta.fallback}\``
  }
  return `浅色 \`${meta.resolved.light}\`<br>深色 \`${meta.resolved.dark}\``
}

function renderTable(rows) {
  const hasResolved = rows.some((row) => Boolean(row.resolved))
  const header = hasResolved ? '| 变量 | 默认值（浅色皮肤 / 深色皮肤） | 说明 |' : '| 变量 | 默认值 | 说明 |'
  const body = rows.map((row) => `| \`${row.name}\` | ${defaultValueCell(row)} | ${row.description} |`)
  return [header, '| :-- | :-- | :-- |', ...body].join('\n')
}

export function render() {
  const sections = groupByComponent().map((component) => {
    const blocks = [...component.groups.entries()].map(([group, rows]) => {
      const label = GROUP_LABELS[group] ?? group
      return [`**${label}**`, '', renderTable(rows)].join('\n')
    })
    const parts = [`#### ${component.title}`]
    const note = COMPONENT_NOTES[component.dir]
    if (note) {
      parts.push(note)
    }
    // 从注册表推导「哪些令牌跟随组件级主色」，避免脚本里再维护一份映射
    const { componentName } = component
    const themeTokens = COMPONENT_VAR_NAMES.filter(
      (name) => COMPONENT_VARS[name].component === componentName && COMPONENT_VARS[name].themeRole
    )
    if (themeTokens.length > 0) {
      parts.push(
        `其中 ${themeTokens.map((name) => `\`${name}\``).join(' / ')} 会跟随 \`ConfigProvider\` 的 \`theme.components.${componentName}.primaryColor\` 自动派生；其余令牌需要用 \`CSS\` 直接覆盖。`
      )
    }
    parts.push(blocks.join('\n\n'))
    return parts.join('\n\n')
  })

  return `_本节由 \`node scripts/gen-component-vars-doc.js\` 从 \`components/theme/component-vars.js\` 生成，请勿手动修改；生成物需提交（不要加进 \`.gitignore\`）。_

组件令牌是**组件内部颜色变量的公开名字**（\`--va-<组件>-*\`），也包括把组件主色接到具体皮肤上的桥接令牌。
它们与全局令牌一样是普通的 \`CSS\` 自定义属性，直接在选择器里赋值即可，沿 \`DOM\` 继承生效；
组件令牌**只在消费处带默认值、自身不声明**，因此写在任何祖先选择器上都能生效，也不会被组件样式反向压住。

::: tip 组件级主色的支持范围
当前支持 \`${THEME_COMPONENT_KEYS.length}\` 个组件：${THEME_COMPONENT_KEYS.map((name) => `\`${name}\``).join(' / ')}。
\`Button\` / \`Slider\` / \`Menu\` 通过注册表里的 \`themeRole\` 令牌映射；其余组件在样式里消费内部桥变量
\`--va-cp-<component>-primary-*\`，配置后会覆盖该组件的全部主色使用点。写错组件名会在编译期报错。
:::

### 成组覆盖

同一个视觉元素的状态是**成组**的：只改常态会出现「悬停跳回默认色」，只改底色会出现
「文字不可读」。请整组覆盖，或改用 \`ConfigProvider.seed\` 让系统派生整套状态。

\`\`\`css
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
\`\`\`

### 变量清单

${sections.join('\n\n')}

### 已知限制

- **Teleport 浮层只转发全局令牌**：有生效 \`seed\` 时 \`40\` 个 \`--va-*\` 会随浮层根节点下发
  （只配置 \`theme.components\` 时只转发组件令牌，避免覆盖宿主用纯 \`CSS\` 写在 \`:root\` 上的主题），
  但你在祖先上手写的 **组件令牌**不会被带过去。受影响场景：
  - \`Menu\` 的弹出型子菜单（\`mode="horizontal"\`、\`inlineCollapsed\` 收起态）里的
    \`--va-menu-item-selected-*\`；
  - \`Notification\` / \`Modal\` / \`Select\` 等浮层内的 \`Scrollbar\` 的 \`--va-scrollbar-*\`。

  需要时请在 \`<html>\` 或浮层的承载层上设置。\`Menu\` 的 \`inline\` 模式、\`Scrollbar\` 的非浮层用法不受影响。
- **\`--va-menu-background\` 只改根列表背景**：弹出面板底色是另一套私有变量，不随它变化。
- **\`disabled\` 态不受组件令牌影响**：禁用态统一走中性令牌，这是刻意设计。
- **\`Button\` 的 \`danger\` 默认为单档**：常态 / 悬停 / 按下三态默认同色（历史视觉档位缺失）；
  已支持只覆盖常态色（悬停 / 按下跟随），但默认状态本身没有档位差。
- \`--va-scrollbar-width\` 是**全局运行时变量**（页面滚动锁定时由库写入 \`<html>\`，供固定定位元素补偿宽度），
  不属于组件令牌，也不跟随主题派生。

### 契约说明

- 本清单是**按需扩展**的，不代表组件全覆盖：只有上面列出的组件提供组件级令牌，
  其余组件的配色请用全局令牌 / \`props\` / 作用域 \`seed\`；
- 组件的其它内部变量（尺寸、层级、按 \`props\` 计算的实现细节、\`Tag\` 色板、深色皮肤色板等）是私有实现，
  不承诺、也不在本节列出；
- 令牌名在 minor 版本内保持稳定，重命名按 major 处理。
`
}

// 仅在「直接执行」时写盘：被单测 import 时不得产生副作用，
// 否则 `tests/component-vars.spec.ts` 的逐字节断言会先写盘再比较，永远自证通过
const isDirectRun = Boolean(process.argv[1]) && resolve(process.argv[1]) === fileURLToPath(import.meta.url)
if (isDirectRun) {
  mkdirSync(dirname(outputPath), { recursive: true })
  writeFileSync(outputPath, render(), 'utf-8')
  console.log(`✅ 已生成 ${outputPath}（${COMPONENT_VAR_NAMES.length} 个组件令牌）`)
}
