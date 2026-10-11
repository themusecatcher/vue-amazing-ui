/**
 * 日期时间选择内核的共享类型
 *
 * 内核由 `DatePicker` / `TimePicker` 共用，内部一律以「毫秒时间戳」为值口径（与 `Calendar` 的
 * `disabledDate(timestamp)` / `valueFormat` 一致），字符串展示只在组件壳层经 `format` 转换，
 * 内核不感知 `Date` 对象，避免可变引用在多层之间来回拷贝。
 */
import type { VNode } from 'vue'

/** 范围形态的两段值：某段被单独清空（含「先选终点再选更晚起点」产生的中间态）时该段为 `null` */
export type PickerRangeValue = [number | null, number | null]
/** 范围形态的两段文本：与 `PickerRangeValue` 逐段对应，该段未选时为空字符串 */
export type PickerRangeFormattedValue = [string, string]

/** 主轨道值：单选为毫秒时间戳，范围形态为两段元组，整体为空时为 `null` */
export type PickerValue = number | PickerRangeValue | null
/** 字符串轨道值：由 `format` / `valueFormat` 解析与回写，整体为空时为 `null` */
export type PickerFormattedValue = string | PickerRangeFormattedValue | null

/** 范围形态的两段标识，用于按段传入的判定与回写 */
export type PickerRangeSide = 'start' | 'end'

/** 范围形态：值形态为两元组，面板为双列 */
export type PickerRangeType = 'daterange' | 'datetimerange' | 'weekrange' | 'monthrange' | 'yearrange' | 'quarterrange'
/** 选择形态：决定面板组合与值形态（`datetime` / `datetimerange` 为带时间面板的形态） */
export type PickerType = 'date' | 'week' | 'month' | 'quarter' | 'year' | 'datetime' | PickerRangeType

/** 单选形态（`PickerType` 中排除范围形态） */
export type PickerSingleType = Exclude<PickerType, PickerRangeType>
/** 带时间面板的形态 */
export type PickerDateTimeType = 'datetime' | 'datetimerange'

/** 面板展示模式：由形态推导，决定当前渲染哪一块面板 */
export type PickerPanelMode = 'date' | 'week' | 'month' | 'quarter' | 'year' | 'decade' | 'time'

/** 组件尺寸 */
export type PickerSize = 'small' | 'middle' | 'large'
/** 校验状态 */
export type PickerStatus = 'warning' | 'error'

/** 禁用日期判定，入参为当日零点的时间戳 */
export type PickerDisabledDate = (timestamp: number) => boolean

/** 时间面板中按单位禁用的时间值（未声明或空数组表示该单位全部可选） */
export interface PickerDisabledTimeUnits {
  disabledHours?: () => number[]
  disabledMinutes?: (hour: number) => number[]
  disabledSeconds?: (hour: number, minute: number) => number[]
}

/** 禁用时间判定，入参为当前面板草稿值的时间戳 */
export type PickerDisabledTime = (timestamp: number) => PickerDisabledTimeUnits
/** 范围形态的禁用时间判定，`side` 区分起点与终点 */
export type PickerRangeDisabledTime = (timestamp: number, side: PickerRangeSide) => PickerDisabledTimeUnits

/** 预设选项的值：单选形态为一个时间戳，范围形态为两段元组 */
export type PickerPresetValue = number | [number, number]

/** 预设选项：值为预设值或返回预设值的函数（惰性求值，用于依赖当前时刻的预设如「近 7 天」） */
export interface PickerPreset {
  label: string | VNode
  value: PickerPresetValue | (() => PickerPresetValue)
}

/** 时间面板选项：`DatePicker.timePickerProps` 与未来 `TimePicker` 共用同一份口径 */
export interface PickerTimePanelProps {
  hourStep?: number
  minuteStep?: number
  secondStep?: number
  use12Hours?: boolean
  hideDisabledOptions?: boolean
}

/** 时间面板列中的一格 */
export interface PickerTimeUnit {
  label: string
  value: number
  disabled: boolean
}

/** 时间面板列显隐与 12 小时制的解析结果 */
export interface PickerTimePanelLayout {
  use12Hours: boolean
  showHour: boolean
  showMinute: boolean
  showSecond: boolean
}
