/**
 * 格式化日期时间
 *
 * @param value - 待格式化的值，支持数字 / 字符串 / Date，默认当前时间
 * @param format - 格式化模板，默认 `'YYYY-MM-DD HH:mm:ss'`
 *                 占位符：`YYYY` / `YY` 年、`M` / `MM` 月、`D` / `DD` 日、`H` / `HH` 时、`m` / `mm` 分、`s` / `ss` 秒、`SSS` 毫秒
 * @returns 格式化后的字符串；数字 / 字符串无法解析为日期时返回空字符串
 *
 * 注意：`Date` 入参不做有效性校验，传入 `Invalid Date` 会得到 `NaN-NaN-NaN …` 而非空字符串。
 */
export function dateFormat(value: number | string | Date = Date.now(), format: string = 'YYYY-MM-DD HH:mm:ss'): string {
  try {
    let date: Date
    if (typeof value === 'number' || typeof value === 'string') {
      date = new Date(value)
      if (isNaN(date.getTime())) {
        throw new Error('Invalid date')
      }
    } else {
      date = value
    }
    const padZero = (value: number, len: number = 2): string => {
      // 左侧补零函数
      return String(value).padStart(len, '0')
    }
    const replacement = (match: string) => {
      switch (match) {
        case 'YYYY':
          return padZero(date.getFullYear())
        case 'YY':
          return padZero(date.getFullYear()).slice(2, 4)
        case 'MM':
          return padZero(date.getMonth() + 1)
        case 'M':
          return String(date.getMonth() + 1)
        case 'DD':
          return padZero(date.getDate())
        case 'D':
          return String(date.getDate())
        case 'HH':
          return padZero(date.getHours())
        case 'H':
          return String(date.getHours())
        case 'mm':
          return padZero(date.getMinutes())
        case 'm':
          return String(date.getMinutes())
        case 'ss':
          return padZero(date.getSeconds())
        case 's':
          return String(date.getSeconds())
        case 'SSS':
          return padZero(date.getMilliseconds(), 3)
        default:
          return match
      }
    }
    return format.replace(/(YYYY|YY|M{1,2}|D{1,2}|H{1,2}|m{1,2}|s{1,2}|SSS)/g, replacement)
  } catch (error) {
    console.error('Error formatting date:', error)
    return ''
  }
}
/**
 * 数字格式化
 *
 * 支持精度、千分位分隔符、小数点字符、前后缀的自由组合（如金额 `$1,234.50`）。
 *
 * @param value - 要格式化的数字或数字字符串
 * @param precision - 保留的小数位数，默认 2
 * @param separator - 千分位分隔符，默认 `','`
 * @param decimal - 小数点字符，默认 `'.'`
 * @param prefix - 前缀，默认无
 * @param suffix - 后缀，默认无
 * @returns 格式化后的字符串；`value` 无法转为有效数字时返回空字符串（类型不符仅告警）
 */
export function formatNumber(
  value: number | string,
  precision: number = 2,
  separator: string = ',',
  decimal: string = '.',
  prefix?: string,
  suffix?: string
): string {
  // 类型检查
  if (typeof value !== 'number' && typeof value !== 'string') {
    console.warn('Expected value to be of type number or string')
  }
  if (typeof precision !== 'number') {
    console.warn('Expected precision to be of type number')
  }
  // 转换为数字，非数值 / NaN / Infinity 一律返回空串
  const numValue = Number(value)
  if (isNaN(numValue) || !isFinite(numValue)) {
    return ''
  }
  const [integerPart, decimalPart] = numValue.toFixed(precision).split('.')
  // separator 非字符串或为空串时跳过千分位，避免拼入非法字符
  const formattedInteger =
    typeof separator === 'string' && separator !== ''
      ? integerPart.replace(/(\d)(?=(\d{3})+$)/g, `$1${separator}`)
      : integerPart
  const formatValue = decimalPart ? `${formattedInteger}${decimal}${decimalPart}` : formattedInteger
  return `${prefix || ''}${formatValue}${suffix || ''}`
}
