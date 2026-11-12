/*
  文档站首页主标题（`.VPHero .name.clip`）的逐字动画所需的 DOM 拆分与配色。

  为什么必须拆字：悬停时想要的「逐字起落」只能靠每个字自己的 transform，
  整块 transform 只会得到呆板的缩放。

  为什么渐变必须跟着字走：VitePress 的渐变文字是 `background-clip: text` 画在
  `.name` 上的，而 text 裁剪遮罩**不跟随子元素的 transform** —— 渐变留在父级、
  让子字位移时，字形会滑出遮罩，整块变透明。所以渐变下放到每个字上，并按字在
  整词中的位置插值两端色（--c0 / --c1），视觉上仍读作一段连续渐变。

  写入的自定义属性：
  --i         序号，供 CSS 计算级联延迟（波浪式起落）
  --dir       奇偶倾斜方向，让波浪带点错落感而非整排平移
  --c0 / --c1 该字负责的那一小段渐变的两端色
  --glow      悬停柔光的颜色（取该字渐变的暖端，字色流到哪光就跟到哪）
*/
// 与 global.less 中 `h1` 的 `linear-gradient(to right, #09c8ce, #eb2f96)` 同一套色板：
// 首屏主标题要与组件页标题、首屏副标题读作同一条渐变，不能再沿用 VitePress 默认的紫/蓝
const GRADIENT_FROM = [0x09, 0xc8, 0xce] as const
const GRADIENT_TO = [0xeb, 0x2f, 0x96] as const
// 柔光透明度：重了会糊住笔画，轻了在浅色主题下看不见
const GLOW_ALPHA = 0.3

/** 按进度插值出 rgb 三通道，供 `--c0` / `--c1` / `--glow` 复用 */
function mixChannels(progress: number) {
  const ratio = Math.min(Math.max(progress, 0), 1)
  return GRADIENT_FROM.map((from, index) => Math.round(from + (GRADIENT_TO[index] - from) * ratio))
}

export function setupHeroTitleAnimation() {
  const name = document.querySelector<HTMLElement>('.VPHero .name.clip')
  const title = name?.textContent ?? ''
  // 已拆过（重复调用）或标题为空时直接返回；拆分后 textContent 仍是原文，
  // 故用「是否已存在 .hero-char」判断，而不是比对文本
  if (!name || !title.trim() || name.querySelector('.hero-char')) return

  const chars = [...title]
  // 字 i 承担整条渐变的 [i / n, (i + 1) / n] 区间：h1 的默认渐变是等距两色，
  // 逐字切片后拼回来才与原渐变的重心一致
  const stop = (index: number) => index / chars.length
  const fragment = document.createDocumentFragment()

  // 逐字拆开后，任意两个字之间都会成为换行点（原本只能在空格处断行），
  // 窄屏上标题会断成「Vue Amazin / g UI」。所以每个单词单独包一层不可断的
  // `.hero-word`，空格仍以纯文本节点留在单词之间 —— 断行点回到只有空格
  let word: HTMLElement | null = null
  chars.forEach((char, index) => {
    if (/\s/.test(char)) {
      word = null
      fragment.appendChild(document.createTextNode(char))
      return
    }
    if (!word) {
      word = document.createElement('span')
      word.className = 'hero-word'
      fragment.appendChild(word)
    }
    const span = document.createElement('span')
    span.className = 'hero-char'
    span.textContent = char
    const from = mixChannels(stop(index))
    const to = mixChannels(stop(index + 1))
    span.style.setProperty('--i', `${index}`)
    span.style.setProperty('--dir', index % 2 === 0 ? '-1' : '1')
    span.style.setProperty('--c0', `rgb(${from.join(', ')})`)
    span.style.setProperty('--c1', `rgb(${to.join(', ')})`)
    span.style.setProperty('--glow', `rgba(${to.join(', ')}, ${GLOW_ALPHA})`)
    word.appendChild(span)
  })

  name.textContent = ''
  name.appendChild(fragment)
}
