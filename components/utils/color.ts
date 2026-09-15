import { TinyColor } from '@ctrl/tinycolor'
import { generate } from '@ant-design/colors'
/**
 * 获取颜色调色板
 *
 * @param {string} primaryColor 主色
 * @returns {string[]} 返回颜色调色板
 */
export function getColorPalettes(primaryColor: string): string[] {
  return generate(primaryColor)
}
/**
 * 是否为可靠的颜色值
 *
 * @param {number} color 颜色值
 * @returns {boolean} 返回颜色值是否可靠
 */
function isStableColor(color: number): boolean {
  return color >= 0 && color <= 255
}
/**
 * 获取透明度颜色，一般用作阴影色
 *
 * @param {string} frontColor 前景色
 * @param {string} [backgroundColor = '#ffffff'] 背景色
 * @returns {string} 返回透明度颜色
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
