<script setup lang="ts">
import VueDatePicker from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'
import { computed } from 'vue'
export interface Props {
  width?: number // 日期选择器宽度
  size?: 'small' | 'middle' | 'large' // 日期选择器大小
  mode?: 'time' | 'date' | 'week' | 'month' | 'year' // 选择器模式，可选：时间time，日期date，周week，月month，年year
  // format?: string | ((date: Date) => string) | ((dates: Date[]) => string) // 日期展示格式，(yy: 年, M: 月, d: 天, H: 时, m: 分, s: 秒, w: 周)
  showTime?: boolean // 是否增加时间选择
  showToday?: boolean // 是否展示”今天“按钮
  // multiCalendars?: boolean // 范围选择器是否使用双日期面板
  // flow?: any[] // 定义选择顺序 ("calendar" | "time" | "month" | "year" | "minutes" | "hours" | "seconds")[]
  // dark?: boolean // 样式主题是否使用黑色
  modelType?: 'timestamp' | 'format' // v-model 值类型，可选 timestamp: 时间戳、format: 字符串，mode 为 week 或 year 时，该配置不生效
}
const props = withDefaults(defineProps<Props>(), {
  width: 180,
  size: 'middle',
  mode: 'date',
  /* format default
    Single picker: 'MM/dd/yyyy HH:mm'
    Range picker: 'MM/dd/yyyy HH:mm - MM/dd/yyyy HH:mm'
    Month picker: 'MM/yyyy'
    Time picker: 'HH:mm'
    Time picker range: 'HH:mm - HH:mm'
    Week picker: 'ww-yyyy'
  */
  showTime: false,
  showToday: false,
  // multiCalendars: false,
  // flow: () => [],
  // dark: false,
  modelType: 'format'
})
const time = computed(() => {
  return props.mode === 'time'
})
const week = computed(() => {
  return props.mode === 'week'
})
const month = computed(() => {
  return props.mode === 'month'
})
const year = computed(() => {
  return props.mode === 'year'
})
// const format = (date: Date) => {
//   const day = date.getDate()
//   const month = date.getMonth() + 1
//   const year = date.getFullYear()
//   return `${year}-${month}-${day}`
// }
</script>
<template>
  <VueDatePicker
    class="m-datepicker"
    :class="{
      'datepicker-small': size === 'small',
      'datepicker-large': size === 'large'
    }"
    :style="`width: ${width}px;`"
    locale="zh-CN"
    :month-change-on-scroll="false"
    :enable-time-picker="showTime"
    :time-picker="time"
    :week-picker="week"
    :month-picker="month"
    :year-picker="year"
    now-button-label="今天"
    :show-now-button="showToday"
    auto-apply
    text-input
    :model-type="modelType"
    :day-names="['一', '二', '三', '四', '五', '六', '七']"
  />
</template>
<style lang="less" scoped>
.m-datepicker {
  display: inline-block;
  :deep(.dp__input_wrap) {
    svg {
      fill: currentColor;
    }
    .dp__input {
      line-height: 1.5714285714285714;
    }
    :deep(.dp__input:hover:not(.dp__disabled)) {
      border-color: var(--dp-border-color-hover);
    }
    .dp__disabled {
      color: rgba(0, 0, 0, 0.25);
      cursor: not-allowed;
      &:hover {
        border-color: var(--dp-border-color);
      }
    }
    .dp__input_focus {
      box-shadow: 0 0 0 2px rgba(5, 145, 255, 0.1);
    }
  }
  :deep(.dp__outer_menu_wrap) {
    .dp__menu {
      overflow: hidden;
      border: none;
      border-radius: 8px;
      box-shadow:
        0 6px 16px 0 rgba(0, 0, 0, 0.08),
        0 3px 6px -4px rgba(0, 0, 0, 0.12),
        0 9px 28px 8px rgba(0, 0, 0, 0.05);
      .dp__arrow_top,
      .dp__arrow_bottom {
        display: none;
      }
      .dp__overlay {
        padding-top: 8px;
        .dp__overlay_container::-webkit-scrollbar-thumb {
          border-radius: 5px;
          cursor: pointer;
          background-color: var(--dp-scroll-bar-color);
          transition: background-color 0.2s cubic-bezier(0.4, 0, 0.2, 1);
          &:hover {
            background-color: rgba(0, 0, 0, 0.4);
          }
        }
      }
      .dp__cell_disabled.dp__today {
        background: transparent;
        border: 1px solid var(--dp-secondary-color);
      }
      .dp__cell_disabled.dp__active_date {
        border-color: var(--dp-secondary-color);
      }
    }
  }
}
// CSS variables
.m-datepicker {
  /*General*/
  --dp-font-family:
    -apple-system, blinkmacsystemfont, 'Segoe UI', roboto, oxygen, ubuntu, cantarell, 'Open Sans', 'Helvetica Neue',
    sans-serif;
  --dp-border-radius: 6px; /*Configurable border-radius*/
  --dp-cell-border-radius: 4px; /*Specific border radius for the calendar cell*/
  // --dp-common-transition: all 0.1s ease-in; /*Generic transition applied on buttons and calendar cells*/
  --dp-common-transition: all 0.2s ease; /*Generic transition applied on buttons and calendar cells*/
  /*Sizing*/
  --dp-button-height: 35px; /*Size for buttons in overlays*/
  --dp-month-year-row-height: 35px; /*Height of the month-year select row*/
  --dp-month-year-row-button-size: 35px; /*Specific height for the next/previous buttons*/
  --dp-button-icon-height: 20px; /*Icon sizing in buttons*/
  --dp-cell-size: 35px; /*Width and height of calendar cell*/
  --dp-cell-padding: 5px; /*Padding in the cell*/
  --dp-common-padding: 10px; /*Common padding used*/
  --dp-input-icon-padding: 35px; /*Padding on the left side of the input if icon is present*/
  --dp-input-padding: 4px 30px 4px 12px; /*Padding in the input*/
  --dp-menu-min-width: 260px; /*Adjust the min width of the menu*/
  --dp-action-buttons-padding: 2px 5px; /*Adjust padding for the action buttons in action row*/
  --dp-row-margin: 5px 0; /*Adjust the spacing between rows in the calendar*/
  --dp-calendar-header-cell-padding: 0.5rem; /*Adjust padding in calendar header cells*/
  --dp-two-calendars-spacing: 10px; /*Space between multiple calendars*/
  --dp-overlay-col-padding: 3px; /*Padding in the overlay column*/
  --dp-time-inc-dec-button-size: 32px; /*Sizing for arrow buttons in the time picker*/
  --dp-menu-padding: 6px 8px; /*Menu padding*/
  /*Font sizes*/
  --dp-font-size: 14px; /*Default font-size*/
  --dp-preview-font-size: 12px; /*Font size of the date preview in the action row*/
  --dp-time-font-size: 28px; /*Font size in the time picker*/
  /*Transitions*/
  --dp-animation-duration: 0.2s; /*Transition duration*/
  --dp-menu-appear-transition-timing: cubic-bezier(0.4, 0, 0.2, 1); /*Timing on menu appear animation*/
  --dp-transition-timing: ease-in-out; /*Timing on slide animations*/
}
.datepicker-small {
  --dp-input-padding: 0px 30px 0px 12px;
}
.datepicker-large {
  --dp-font-size: 16px;
  :deep(.dp__input_wrap) {
    .dp__input {
      height: 40px;
    }
  }
}
// dark theme configuration
.dp__theme_dark,
:deep(.dp__theme_dark) {
  --dp-background-color: #212121;
  --dp-text-color: #fff;
  --dp-hover-color: #484848;
  --dp-hover-text-color: #fff;
  --dp-hover-icon-color: #959595;
  // --dp-primary-color: #005cb2;
  --dp-primary-color: #1668dc;
  --dp-primary-disabled-color: #61a8ea;
  --dp-primary-text-color: #fff;
  --dp-secondary-color: #a9a9a9;
  --dp-border-color: #2d2d2d;
  --dp-menu-border-color: #2d2d2d;
  --dp-border-color-hover: #aaaeb7;
  --dp-border-color-focus: #aaaeb7;
  --dp-disabled-color: #737373;
  --dp-disabled-color-text: #d0d0d0;
  --dp-scroll-bar-background: #212121;
  --dp-scroll-bar-color: #484848;
  --dp-success-color: #00701a;
  --dp-success-color-disabled: #428f59;
  --dp-icon-color: #959595;
  --dp-danger-color: #e53935;
  --dp-marker-color: #e53935;
  --dp-tooltip-color: #3e3e3e;
  --dp-highlight-color: rgb(0 92 178 / 20%);
  --dp-range-between-dates-background-color: var(--dp-hover-color, #484848);
  --dp-range-between-dates-text-color: var(--dp-hover-text-color, #fff);
  --dp-range-between-border-color: var(--dp-hover-color, #fff);
}
// light theme configuration
.dp__theme_light,
:deep(.dp__theme_light) {
  --dp-background-color: #fff;
  // --dp-text-color: #212121;
  --dp-text-color: rgba(0, 0, 0, 0.88);
  // --dp-hover-color: #f3f3f3;
  // --dp-hover-color: rgba(0, 0, 0, 0.04);
  // --dp-hover-text-color: #212121;
  --dp-hover-text-color: rgba(0, 0, 0, 0.88);
  --dp-hover-icon-color: #959595;
  // --dp-primary-color: #1976d2;
  --dp-primary-color: #1677ff;
  --dp-primary-disabled-color: #6bacea;
  // --dp-primary-text-color: #f8f5f5;
  --dp-primary-text-color: #fff;
  // --dp-secondary-color: #c0c4cc;
  --dp-secondary-color: rgba(0, 0, 0, 0.25);
  // --dp-border-color: #ddd;
  --dp-border-color: #d9d9d9;
  // --dp-menu-border-color: #ddd;
  --dp-menu-border-color: #d9d9d9;
  // --dp-border-color-hover: #aaaeb7;
  --dp-border-color-hover: #4096ff;
  // --dp-border-color-focus: #aaaeb7;
  --dp-border-color-focus: #4096ff;
  // --dp-disabled-color: #f6f6f6;
  --dp-disabled-color: rgba(0, 0, 0, 0.04);
  // --dp-scroll-bar-background: #f3f3f3;
  --dp-scroll-bar-background: transparent;
  // --dp-scroll-bar-color: #959595;
  --dp-scroll-bar-color: rgba(0, 0, 0, 0.25);
  --dp-success-color: #76d275;
  --dp-success-color-disabled: #a3d9b1;
  --dp-icon-color: #959595;
  --dp-danger-color: #ff6f60;
  --dp-marker-color: #ff6f60;
  --dp-tooltip-color: #fafafa;
  --dp-disabled-color-text: #8e8e8e;
  --dp-highlight-color: rgb(25 118 210 / 10%);
  --dp-range-between-dates-background-color: var(--dp-hover-color, rgba(0, 0, 0, 0.04));
  --dp-range-between-dates-text-color: var(--dp-hover-text-color, rgba(0, 0, 0, 0.88));
  --dp-range-between-border-color: var(--dp-hover-color, rgba(0, 0, 0, 0.04));
}
</style>
