import Table from './Table.vue'
import type { DefineComponent, Plugin } from 'vue'
import type { Props as TableProps } from './Table.vue'
import { withInstall } from '../utils/type'

export type {
  Props as TableProps,
  Column as TableColumn,
  Selection as TableSelection,
  ScrollOption as TableScrollOption
} from './Table.vue'

// 显式标注默认导出类型，避免 vue-tsc --build 序列化 Table 完整实例类型时超出上限（TS7056）；
// TableProps / DefineComponent / Plugin 均为具名类型，序列化体积可控，且 props 完整类型对消费者保留
export default withInstall(Table) as unknown as DefineComponent<TableProps> & Plugin
