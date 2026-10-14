import { describe, it, expect } from 'vitest'
import { getInputSize } from 'components/picker/date-utils'

/**
 * 回归守护：触发器输入框的宽度估算（原生 `size` 属性）。
 *
 * 触发器宽度随展示格式自适应，估算不足会把末位字符裁掉：中文格式里的全角字符（年 / 月 / 日）
 * 在字体中约占两个半角字符的宽度，须按 2 个字符计入。
 */
describe('输入框宽度估算', () => {
  it('半角格式按字符个数估算', () => {
    expect(getInputSize('yyyy-MM-dd')).toBe(12)
    expect(getInputSize('yyyy/MM/dd HH:mm:ss')).toBe(21)
  })

  it('全角字符按两个字符计入，中文格式的末位不被裁掉', () => {
    expect(getInputSize('yyyy年MM月dd日')).toBe(16)
    expect(getInputSize('yyyy年MM月dd日 HH时mm分')).toBe(25)
  })

  it('短格式取下限，避免触发器过窄', () => {
    expect(getInputSize('HH:mm')).toBe(12)
    expect(getInputSize('')).toBe(12)
  })
})
