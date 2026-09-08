import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { describe, it, expect } from 'vitest'
import { VueAmazingUIResolver } from 'components/utils/resolver'
import type { VueAmazingUIResolverOptions } from 'components/utils/resolver'

/**
 * 按需引入 resolver 的回归防护。
 *
 * 背景：componentsMap / providerStyles / componentDependencies 三张表互相引用
 * （Provider 指向底层组件、依赖数组指向其它组件名），任一处写错组件名都会
 * 生成 `vue-amazing-ui/es/undefined/Xxx.css` 这类不存在的路径，且只在消费方
 * 构建时才暴露。历史上出现过两类真实回归：
 *   1. Modal / Notification 遗漏 Scrollbar 依赖，内容区滚动条无样式；
 *   2. Upload 移除内嵌 Message 后，样式依赖未同步移除。
 * 故此处既断言关键组件的依赖，也做一次全量路径合法性扫描。
 */
function sideEffectsOf(name: string, options?: VueAmazingUIResolverOptions): string[] {
  return VueAmazingUIResolver(options).resolve(name)?.sideEffects ?? []
}

// 从 resolver.ts 源码解析 componentsMap，避免为测试而导出内部常量
const resolverSource = readFileSync(resolve(process.cwd(), 'components/utils/resolver.ts'), 'utf-8')
function parseComponentsMap(): Array<[string, string]> {
  const block = resolverSource.match(/const componentsMap = \{([\s\S]*?)\n\}/)
  if (!block) {
    throw new Error('未能从 components/utils/resolver.ts 中解析出 componentsMap')
  }
  return [...block[1].matchAll(/^\s*([A-Za-z0-9]+):\s*'([^']+)',?\s*$/gm)].map((m) => [m[1], m[2]])
}

describe('resolver - Provider 组件解析', () => {
  const providers = ['MessageProvider', 'NotificationProvider', 'ModalProvider', 'DialogProvider']

  it('四个命令式 Provider 均应能被解析', () => {
    providers.forEach((name) => {
      const result = VueAmazingUIResolver().resolve(name)
      expect(result, `${name} 应能被 resolver 解析`).toBeDefined()
      expect(result?.from).toBe('vue-amazing-ui')
      expect(result?.name).toBe(name)
    })
  })

  it('Provider 复用底层组件样式，不引用自身不存在的样式文件', () => {
    const effects = sideEffectsOf('MessageProvider')
    expect(effects).toContain('vue-amazing-ui/es/message/Message.css')
    expect(effects.some((effect) => effect.includes('MessageProvider.css'))).toBe(false)
  })

  it('ModalProvider / DialogProvider 应注入底层组件及其依赖样式', () => {
    expect(sideEffectsOf('ModalProvider')).toContain('vue-amazing-ui/es/modal/Modal.css')
    expect(sideEffectsOf('ModalProvider')).toContain('vue-amazing-ui/es/scrollbar/Scrollbar.css')
    expect(sideEffectsOf('DialogProvider')).toContain('vue-amazing-ui/es/dialog/Dialog.css')
    expect(sideEffectsOf('DialogProvider')).toContain('vue-amazing-ui/es/scrollbar/Scrollbar.css')
  })
})

describe('resolver - 组件样式依赖（回归防护）', () => {
  it('Modal 应注入 Scrollbar 样式', () => {
    expect(sideEffectsOf('Modal')).toContain('vue-amazing-ui/es/scrollbar/Scrollbar.css')
  })

  it('Notification 应注入 Scrollbar 样式', () => {
    expect(sideEffectsOf('Notification')).toContain('vue-amazing-ui/es/scrollbar/Scrollbar.css')
  })

  it('Table 应注入其摊平后的全部依赖样式', () => {
    const effects = sideEffectsOf('Table')
    const required = ['Checkbox', 'Ellipsis', 'Empty', 'Pagination', 'Input', 'Select', 'Radio', 'Tooltip']
    required.forEach((dep) => {
      expect(
        effects.some((effect) => effect.endsWith(`/${dep}.css`)),
        `缺少 ${dep} 样式`
      ).toBe(true)
    })
  })

  it('Upload 不应再注入 Message 样式', () => {
    const effects = sideEffectsOf('Upload')
    expect(effects.some((effect) => effect.includes('message/Message.css'))).toBe(false)
  })
})

describe('resolver - 无样式组件', () => {
  it.each(['ConfigProvider', 'Highlight', 'NumberAnimation', 'Watermark'])('%s 不应引入任何样式', (name) => {
    expect(sideEffectsOf(name)).toEqual([])
  })
})

describe('resolver - 构建格式与第三方样式', () => {
  it('cjs 选项下样式路径应指向 lib 产物', () => {
    expect(sideEffectsOf('Button', { cjs: true })).toContain('vue-amazing-ui/lib/style/global.css')
    expect(sideEffectsOf('Button', { cjs: true })).toContain('vue-amazing-ui/lib/button/Button.css')
  })

  it('默认（es）样式路径应指向 es 产物', () => {
    expect(sideEffectsOf('Button')).toContain('vue-amazing-ui/es/button/Button.css')
  })

  it('DatePicker 与 Swiper 应注入第三方样式', () => {
    expect(sideEffectsOf('DatePicker')).toContain('vue-amazing-ui/es/vendor-styles/vue-datepicker/main.css')
    expect(sideEffectsOf('Swiper')).toContain('vue-amazing-ui/es/vendor-styles/swiper/swiper.css')
  })
})

describe('resolver - 未收录组件', () => {
  it('应返回 undefined，交由其它 resolver 处理', () => {
    expect(VueAmazingUIResolver().resolve('NotExistComponent')).toBeUndefined()
  })
})

describe('resolver - 全量组件映射', () => {
  const entries = parseComponentsMap()

  it('应解析出全部组件映射', () => {
    expect(entries.length).toBeGreaterThanOrEqual(68)
  })

  it('每个组件的样式路径均应合法、不出现 undefined', () => {
    entries.forEach(([name, dir]) => {
      const effects = sideEffectsOf(name)
      if (effects.length === 0) {
        return // 无样式组件，已由独立用例覆盖
      }
      expect(effects[0], `${name} 首项应为全局默认样式`).toBe('vue-amazing-ui/es/style/global.css')
      effects.forEach((effect) => {
        expect(effect, `${name} 的样式路径 ${effect} 不应含 undefined`).not.toContain('undefined')
        expect(effect.startsWith('vue-amazing-ui/es/'), `${name} 的样式路径 ${effect} 前缀异常`).toBe(true)
      })
      // 非 Provider 组件的首个组件样式应为 <目录>/<组件名>.css
      if (!name.endsWith('Provider')) {
        expect(effects, `${name} 应注入自身样式`).toContain(`vue-amazing-ui/es/${dir}/${name}.css`)
      }
    })
  })
})
