import Cascader, { SHOW_CHILD, SHOW_PARENT } from './Cascader.vue'
import { withInstall } from '../utils/type'
export type {
  Props as CascaderProps,
  Option as CascaderOption,
  FieldNames as CascaderFieldNames,
  SearchConfig as CascaderSearchConfig,
  DisplayRenderParams as CascaderDisplayRenderParams,
  SearchRenderParams as CascaderSearchRenderParams,
  SearchSegment as CascaderSearchSegment,
  TagRenderParams as CascaderTagRenderParams,
  MaxTagPlaceholderParams as CascaderMaxTagPlaceholderParams,
  CascaderValue,
  CascaderPath,
  CascaderModelValue,
  CascaderPlacement,
  ShowCheckedStrategy
} from './Cascader.vue'
export { SHOW_CHILD, SHOW_PARENT }
// 回填策略常量同时挂在组件上，便于以 `Cascader.SHOW_PARENT` 的形式使用
export default Object.assign(withInstall(Cascader), { SHOW_PARENT, SHOW_CHILD })
