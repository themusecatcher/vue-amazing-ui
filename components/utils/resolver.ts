import { componentsMap, isComponentName, styleSources, stylelessComponents } from './style-deps'
import type { ComponentName } from './style-deps'

/**
 * unplugin-vue-components 的按需引入 resolver
 *
 * 通过组件名回答两件事：组件从哪引入、需要携带哪些样式 sideEffects。样式依赖的完整知识放在
 * `style-deps.ts`（SSOT），本文件只做查表与路径拼接。
 */

/**
 * 计算按需引入时随组件携带的样式入口
 *
 * 每组件一个样式入口后，本函数只需回答「该组件的样式入口在哪」：入口
 * `es|lib/<dir>/style/index.{js,cjs}` 内部已按「global → 自身 → 依赖 → vendor」顺序引齐全部 CSS
 * （由构建期 build/generate-style-entries.ts 依据 style-deps.ts 生成），故此处不再维护依赖表。
 *
 * @param componentName - 组件名（必为 componentsMap 已收录的键）
 * @param options - resolver 选项，`cjs: true` 时指向 lib 产物
 * @returns 该组件的样式入口路径数组；无样式组件返回空数组
 */
function getSideEffects(componentName: ComponentName, options?: VueAmazingUIResolverOptions): string[] {
  if (stylelessComponents.includes(componentName)) {
    // 无样式文件的组件
    return []
  }
  // 组件自身无样式时，入口落在其样式来源组件的目录（如 MessageProvider -> Message）
  const source = styleSources[componentName] ?? componentName
  const type = options?.cjs ? 'lib' : 'es'
  const ext = options?.cjs ? 'cjs' : 'js'
  // 显式给出文件名（而非裸目录 `…/style`）：resolver 属自动注入，不依赖消费方工具链的目录索引解析
  return [`vue-amazing-ui/${type}/${componentsMap[source]}/style/index.${ext}`]
}
/** `VueAmazingUIResolver` 的选项 */
export interface VueAmazingUIResolverOptions {
  /** 是否使用 CommonJS 产物（`lib` + `.cjs`）；默认 false，即 ESM（`es` + `.js`） */
  cjs?: boolean
}

/**
 * 创建按需引入 resolver
 *
 * 命中库内组件名时返回源码位置与样式入口；未收录的组件名返回 undefined，交由其它 resolver 处理。
 *
 * @param options - resolver 选项
 * @returns unplugin-vue-components 的组件 resolver
 *
 * @example
 * // vite.config.ts
 * Components({ resolvers: [VueAmazingUIResolver()] })
 */
export function VueAmazingUIResolver(options?: VueAmazingUIResolverOptions) {
  return {
    type: 'component' as const,
    resolve: (componentName: string) => {
      // componentName 恒为 PascalCase
      if (isComponentName(componentName)) {
        return {
          name: componentName, // 组件名
          from: 'vue-amazing-ui', // 组件库名称
          sideEffects: getSideEffects(componentName, options) // 样式入口
        }
      }
    }
  }
}
