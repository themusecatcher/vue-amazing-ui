import Calendar from './Calendar.vue'
export type {
  Props as CalendarProps,
  DayOfWeek as CalendarDayOfWeek,
  DefaultWeek as CalendarDefaultWeek,
  DateItem as CalendarDateItem,
  MonthItem as CalendarMonthItem
} from './Calendar.vue'
import { withInstall } from '../utils/type'

export default withInstall(Calendar)
