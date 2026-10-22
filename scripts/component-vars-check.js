/**
 * 组件公开令牌的源码扫描工具（守护与测试共用）
 *
 * 只做「文本 → 结构化事实」的纯函数，不含任何策略：判定规则留在 `verify-theme.js` 与测试里，
 * 避免两处口径漂移。
 */

/** 去掉注释：`//` 前必须是行首或非冒号字符，避免误伤 `https://` 与 `var(--x)` */
export function stripComments(source) {
  return source
    .replace(/<!--[\s\S]*?-->/g, '')
    .replace(/\/\*[\s\S]*?\*\//g, '')
    .replace(/(^|[^:])\/\/[^\n]*/g, '$1')
}

/**
 * 按 SFC 分段：`<style>` 内容与其余部分分开
 *
 * 公开令牌「只能消费不能声明」只对 `<style>` 段成立（模板 / 脚本里的内联写入是实例覆盖，
 * 优先级最高且符合「实例 > 祖先」直觉），因此判定前必须先分段。
 *
 * @param {string} source 单文件组件源码
 * @returns {{ head: string, style: string }}
 */
export function splitSfc(source) {
  const styleBlocks = []
  const head = source.replace(/<style[^>]*>([\s\S]*?)<\/style>/g, (block, body) => {
    styleBlocks.push(body)
    return ''
  })
  return { head, style: styleBlocks.join('\n') }
}

/**
 * 归一化 CSS 值：折叠空白后比对，避免缩进 / 换行差异造成误报
 *
 * @param {string} value CSS 值文本
 */
export function normalizeValue(value) {
  return value.replace(/\s+/g, ' ').trim()
}

/**
 * 从 `start`（指向 `var(` 的左括号）起做括号配平，返回右括号下标；找不到返回 -1
 *
 * 用于解析 `var(--a, var(--b, c))` 这类嵌套 fallback —— 不能用 `split(',')` 切，
 * 否则嵌套 fallback 会被切碎。
 */
function findClosingParen(source, start) {
  let depth = 0
  for (let index = start; index < source.length; index += 1) {
    const char = source[index]
    if (char === '(') {
      depth += 1
    } else if (char === ')') {
      depth -= 1
      if (depth === 0) {
        return index
      }
    }
  }
  return -1
}

/**
 * 收集源码里所有 `var(--x…)` 引用，并标注是否带 fallback
 *
 * 与 `collectVarUsages` 的区别：本函数不知道要找哪个变量，用于「有没有悬空引用」这类全量审计。
 * 动态拼接的名字（如 `var(--back-top-${shape}-border-radius)`）会被截成 `--back-top-`，
 * 调用方据「以 `-` 结尾」跳过。
 *
 * @param {string} source 已剥离注释的源码
 * @returns {{ name: string, hasFallback: boolean }[]}
 */
export function collectVarRefs(source) {
  const refs = []
  let cursor = source.indexOf('var(--')
  while (cursor >= 0) {
    const openIndex = cursor + 'var'.length
    const closeIndex = findClosingParen(source, openIndex)
    const inner = closeIndex > 0 ? source.slice(openIndex + 1, closeIndex) : ''
    const matched = inner.match(/^(--[a-z0-9-]+)\s*(,)?/)
    if (matched) {
      refs.push({ name: matched[1], hasFallback: Boolean(matched[2]) })
    }
    cursor = source.indexOf('var(--', cursor + 4)
  }
  return refs
}

/**
 * 收集某个变量在源码里的全部 `var(<name>…)` 使用点
 *
 * @param {string} source 已剥离注释的源码
 * @param {string} name 变量名（含 `--` 前缀）
 * @returns {{ hasFallback: boolean, fallback: string, index: number }[]}
 */
export function collectVarUsages(source, name) {
  const needle = `var(${name}`
  const usages = []
  let cursor = source.indexOf(needle)
  while (cursor >= 0) {
    const next = source.indexOf(needle, cursor + needle.length)
    // 同前缀变量（`--x` 与 `--x-hover`）会互相命中：名字后必须紧跟空白 / 逗号 / 右括号
    const following = source[cursor + needle.length]
    if (following !== undefined && !/[\s,)]/.test(following)) {
      cursor = next
      continue
    }
    const openIndex = cursor + 'var'.length
    const closeIndex = findClosingParen(source, openIndex)
    const inner = closeIndex > 0 ? source.slice(openIndex + 1, closeIndex) : ''
    // inner 形如 `--name, fallback…` 或 `--name`
    const rest = inner.slice(name.length)
    const matched = rest.match(/^\s*,\s*([\s\S]*)$/)
    usages.push({
      hasFallback: Boolean(matched),
      fallback: matched ? normalizeValue(matched[1]) : '',
      index: cursor
    })
    cursor = next
  }
  return usages
}
