/**
 * 精确加法，规避 JS 浮点运算误差（如 `0.1 + 0.2 !== 0.3`）
 *
 * 两个整数直接相加；含小数时先按 `toFixed` 对齐到相同的小数位数，转成整数相加后再折算回小数。
 *
 * @param num1 - 第一个加数
 * @param num2 - 第二个加数
 * @returns 两个加数的和
 * @throws 任一入参为 `NaN` 时抛错
 */
export function add(num1: number, num2: number): number {
  // 用 Number.isNaN（不做类型转换，区别于全局 isNaN）拦截非法入参
  if (Number.isNaN(num1) || Number.isNaN(num2)) {
    throw new Error('Both num1 and num2 must be valid numbers.')
  }
  // 检查输入是否为小数
  const isDecimalNum1 = num1 % 1 !== 0
  const isDecimalNum2 = num2 % 1 !== 0
  if (!isDecimalNum1 && !isDecimalNum2) {
    return num1 + num2 // 如果两个数字都是整数，则直接返回它们的和
  }
  const num1DeciStr = String(num1).split('.')[1] ?? ''
  const num2DeciStr = String(num2).split('.')[1] ?? ''
  const maxLen = Math.max(num1DeciStr.length, num2DeciStr.length)
  const factor = Math.pow(10, maxLen)
  const num1Str = num1.toFixed(maxLen)
  const num2Str = num2.toFixed(maxLen)
  // 将小数点移除并转换为整数相加
  const result = (+num1Str.replace('.', '') + +num2Str.replace('.', '')) / factor
  return result
}
