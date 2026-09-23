import AutoComplete from './AutoComplete.vue'
export type {
  Props as AutoCompleteProps,
  Option as AutoCompleteOption,
  GroupOption as AutoCompleteGroupOption
} from './AutoComplete.vue'
import { withInstall } from '../utils/type'

export default withInstall(AutoComplete)
