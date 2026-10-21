/** 组件令牌源码扫描工具的类型声明（实现见同名 `.js`） */

export interface VarUsage {
  /** 是否带了 fallback（`var(--x, …)`） */
  hasFallback: boolean
  /** 归一化后的 fallback 文本，未带 fallback 时为空串 */
  fallback: string
  /** 在源码中的起始下标 */
  index: number
}

export declare function stripComments(source: string): string

export declare function splitSfc(source: string): { head: string; style: string }

export declare function normalizeValue(value: string): string

export declare function collectVarRefs(source: string): { name: string; hasFallback: boolean }[]

export declare function collectVarUsages(source: string, name: string): VarUsage[]
