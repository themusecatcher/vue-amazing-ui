import { componentsMap, isComponentName, styleSources, stylelessComponents } from './style-deps'
import type { ComponentName } from './style-deps'

/**
 * 计算按需引入携带的样式 sideEffects
 *
 * 每组件一个样式入口后，本函数只回答一个问题：「该组件的样式入口在哪」——
 * 入口 `es|lib/<dir>/style/index.{js,cjs}` 内部已按「global → 自身 → 依赖 → vendor」的顺序
 * 引用全部所需 CSS（由构建期 build/generate-style-entries.ts 依据 style-deps.ts 生成）。
 * 因此这里不再维护依赖表、也不再拼接多条 CSS 路径。
 */
function getSideEffects(componentName: ComponentName, options?: VueAmazingUIResolverOptions): string[] {
  if (stylelessComponents.includes(componentName)) {
    // 无样式文件的组件
    return []
  }
  // 组件自身无样式文件时，入口落在其样式来源组件的目录（如 MessageProvider -> Message）
  const source = styleSources[componentName] ?? componentName
  const type = options?.cjs ? 'lib' : 'es'
  const ext = options?.cjs ? 'cjs' : 'js'
  // 显式给出文件名（而非裸目录 `…/style`）：resolver 属自动注入，不依赖消费方工具链的目录索引解析
  return [`vue-amazing-ui/${type}/${componentsMap[source]}/style/index.${ext}`]
}
export interface VueAmazingUIResolverOptions {
  cjs?: boolean // whether use commonjs build, default false
}
export function VueAmazingUIResolver(options?: VueAmazingUIResolverOptions) {
  return {
    type: 'component' as const,
    resolve: (componentName: string) => {
      // where `componentName` is always CapitalCase
      if (isComponentName(componentName)) {
        return {
          name: componentName, // 组件名
          from: 'vue-amazing-ui', // 组件库名称
          sideEffects: getSideEffects(componentName, options) // 组件样式入口
        }
      }
    }
  }
}
