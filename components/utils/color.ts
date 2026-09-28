import { TinyColor } from '@ctrl/tinycolor'
import { generate } from '@ant-design/colors'

/**
 * 获取主色对应的调色板
 *
 * @param primaryColor - 主色（如 `#1677ff`）
 * @returns 由浅到深共 10 个色值的数组（@ant-design/colors 生成）
 */
export function getColorPalettes(primaryColor: string): string[] {
  return generate(primaryColor)
}
/**
 * 判断 RGB 单通道值是否落在合法区间
 *
 * @param color - 单个通道的取值
 * @returns 是否在 0~255 之间
 */
function isStableColor(color: number): boolean {
  return color >= 0 && color <= 255
}
/**
 * 计算前景色叠在背景色上所需的最小不透明度 α，一般用作阴影色
 *
 * 从 0.01 起逐步增大 α，取第一个能反解出合法 RGB 的取值 —— 这样得到的阴影与背景同色系，
 * 且由浏览器精确还原；前景色本身已带透明度（a < 1）时原样返回。
 *
 * @param frontColor - 前景色
 * @param backgroundColor - 背景色；可选，默认 '#ffffff'
 * @returns rgba 字符串形式的透明度颜色
 */
export function getAlphaColor(frontColor: string, backgroundColor: string = '#ffffff'): string {
  const { r: fR, g: fG, b: fB, a: originAlpha } = new TinyColor(frontColor).toRgb()
  if (originAlpha < 1) return frontColor
  const { r: bR, g: bG, b: bB } = new TinyColor(backgroundColor).toRgb()
  for (let fA = 0.01; fA <= 1; fA += 0.01) {
    const r = Math.round((fR - bR * (1 - fA)) / fA)
    const g = Math.round((fG - bG * (1 - fA)) / fA)
    const b = Math.round((fB - bB * (1 - fA)) / fA)
    if (isStableColor(r) && isStableColor(g) && isStableColor(b)) {
      return new TinyColor({ r, g, b, a: Math.round(fA * 100) / 100 }).toRgbString()
    }
  }
  return new TinyColor({ r: fR, g: fG, b: fB, a: 1 }).toRgbString()
}
