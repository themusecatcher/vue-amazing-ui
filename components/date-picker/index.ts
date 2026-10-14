import DatePicker from './DatePicker.vue'
export type {
  DatePickerProps,
  DatePickerValue,
  DatePickerFormattedValue,
  DatePickerType,
  DatePickerDisabledTime,
  DatePickerRangeDisabledTime,
  DatePickerDisabledTimeUnits,
  DatePickerTimeProps,
  DatePickerPreset,
  DatePickerRangeInfo
} from './DatePicker.vue'
import { withInstall } from '../utils/type'

export default withInstall(DatePicker)
