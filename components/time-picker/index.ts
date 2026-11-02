import TimePicker from './TimePicker.vue'
export type {
  Props as TimePickerProps,
  TimePickerType,
  TimePickerValue,
  TimePickerFormattedValue,
  TimePickerDisabledTime,
  TimePickerRangeDisabledTime,
  TimePickerDisabledTimeUnits,
  TimePickerRangeSide,
  TimePickerRangeInfo,
  TimePickerSlots
} from './TimePicker.vue'
import { withInstall } from '../utils/type'

export default withInstall(TimePicker)
