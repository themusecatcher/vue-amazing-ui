import { createDiscreteApi as createDiscreteApiImpl } from './createDiscreteApi'

export type { DiscreteApiInstance, DiscreteApiOptions } from './createDiscreteApi'

// 经本地常量再导出：纯转发模块会被 Rollup 转发优化剔除产物 JS，而 index.d.ts 仍会生成
export const createDiscreteApi = createDiscreteApiImpl
