import TimePicker from './TimePicker.vue'
export type {
  TimePickerProps,
  TimePickerType,
  TimePickerValue,
  TimePickerFormattedValue,
  TimePickerDisabledTime,
  TimePickerRangeDisabledTime,
  TimePickerDisabledTimeUnits,
  TimePickerRangeSide,
  TimePickerRangeInfo
} from './TimePicker.vue'
import { withInstall } from '../utils/type'

export default withInstall(TimePicker)
