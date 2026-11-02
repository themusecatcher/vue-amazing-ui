import { log } from 'components/utils'

/**
 * 判断文件是否匹配 `accept` 约束（仅拖拽路径需要）
 *
 * 点选路径由 `<input accept>` 原生校验，拖拽路径没有这层约束，需按 MDN 的 accept 语法自行比对。
 * 规则对齐 antdv 的 `vc-upload/attr-accept.ts`：
 * - 全通配 `*`（含 `*` 斜杠 `*` 的写法）：放行所有文件，本库 `accept` 默认值即 `'*'`；
 * - `.ext`：按文件名后缀比对，`.jpg` 与 `.jpeg` 互通；
 * - `image/*`：按主 mime 比对；
 * - 完整 mime（如 `application/pdf`）：精确比对；
 * - 非法 token（如 `image`）：告警后放行 —— 使用方的书写错误不该变成静默拦截。
 *
 * @param file - 待判定的文件
 * @param accept - `accept` 属性值，多个类型用逗号分隔
 * @returns 是否接受该文件
 */
export function attrAccept(file: File, accept: string): boolean {
  if (!accept) return true
  const fileName = file.name
  const mimeType = file.type
  const baseMimeType = mimeType.replace(/\/.*$/, '')
  return accept.split(',').some((type) => {
    const validType = type.trim()
    // 通配：`*` 或 `*/*`
    if (/^\*(\/\*)?$/.test(validType)) return true
    // 后缀形式：`.jpg` / `.png`
    if (validType.startsWith('.')) {
      const lowerType = validType.toLowerCase()
      const affixList = lowerType === '.jpg' || lowerType === '.jpeg' ? ['.jpg', '.jpeg'] : [lowerType]
      return affixList.some((affix) => fileName.toLowerCase().endsWith(affix))
    }
    // 主类型通配：`image/*`
    if (/\/\*$/.test(validType)) {
      return baseMimeType === validType.replace(/\/.*$/, '')
    }
    // 完整 mime
    if (mimeType === validType) return true
    // 非法 token：告警放行
    if (/^\w+$/.test(validType)) {
      log('warn', 'Upload', `accept 中的 ${validType} 不是合法的文件类型，已跳过该条校验`)
      return true
    }
    return false
  })
}
