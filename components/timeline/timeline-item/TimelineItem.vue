<script setup lang="ts">
import { computed } from 'vue'
import type { VNode } from 'vue'
import { useSlotsExist } from 'components/utils'
export interface Props {
  title?: string // 标题，位于内容上方
  content?: string // 内容
  time?: string | number // 时间，位于内容下方
  label?: string // 左侧标签，存在时整条时间轴切换为左右分栏布局
  color?: string // 轴点颜色，支持预设语义色与任意 CSS 颜色
  lineType?: 'solid' | 'dashed' | 'dotted' // 单独覆盖该节点的线型
  position?: 'left' | 'right' // 交替模式下单独指定该节点内容所在侧
}
// 声明组件插槽类型
export interface TimelineItemSlots {
  default?: () => VNode[]
  dot?: () => VNode[]
  footer?: () => VNode[]
  label?: () => VNode[]
  title?: () => VNode[]
}
const props = withDefaults(defineProps<Props>(), {
  title: undefined,
  content: undefined,
  time: undefined,
  label: undefined,
  color: undefined,
  lineType: undefined,
  position: undefined
})
defineSlots<TimelineItemSlots>()
const slotsExist = useSlotsExist(['default', 'dot', 'footer', 'label', 'title'])
// 预设色映射到主题变量（语义别名与色名双轨），非预设值按 CSS 颜色原样使用
const COLOR_TOKENS: Record<string, string> = {
  primary: 'var(--va-cp-timeline-primary-color, var(--va-primary-color))',
  blue: 'var(--va-cp-timeline-primary-color, var(--va-primary-color))',
  success: 'var(--va-success-color)',
  green: 'var(--va-success-color)',
  warning: 'var(--va-warning-color)',
  error: 'var(--va-error-color)',
  red: 'var(--va-error-color)',
  info: 'var(--va-info-color)',
  default: 'var(--va-text-color-disabled)',
  gray: 'var(--va-text-color-disabled)'
}
const showLabel = computed(() => slotsExist.label || Boolean(props.label))
const showTitle = computed(() => slotsExist.title || Boolean(props.title))
const showFooter = computed(() => slotsExist.footer || props.time !== undefined)
const headStyle = computed(() => {
  const { color } = props
  if (color === undefined) {
    return undefined
  }
  // 大小写不敏感匹配预设，避免 'Blue' 之类的写法被当成无效 CSS 颜色
  const token = COLOR_TOKENS[color.toLowerCase()] ?? color
  // 实例色只写组件私有变量，不直接覆盖 border-color / color，样式侧继续走主题令牌
  return { '--timeline-dot-color': token }
})
const itemClasses = computed(() => {
  return [
    {
      'timeline-item-has-label': showLabel.value,
      'timeline-item-left': props.position === 'left',
      'timeline-item-right': props.position === 'right'
    },
    props.lineType === undefined ? [] : [`timeline-item-line-${props.lineType}`]
  ]
})
</script>
<template>
  <li class="timeline-item-wrap" :class="itemClasses">
    <div v-if="showLabel" class="timeline-item-label">
      <slot v-if="slotsExist.label" name="label"></slot>
      <template v-else>{{ label }}</template>
    </div>
    <div class="timeline-item-tail"></div>
    <div class="timeline-item-head" :class="{ 'timeline-item-head-custom': slotsExist.dot }" :style="headStyle">
      <slot v-if="slotsExist.dot" name="dot"></slot>
      <span v-else class="timeline-item-head-dot"></span>
    </div>
    <div class="timeline-item-content">
      <div v-if="showTitle" class="timeline-item-content-title">
        <slot v-if="slotsExist.title" name="title"></slot>
        <template v-else>{{ title }}</template>
      </div>
      <div class="timeline-item-content-body">
        <slot v-if="slotsExist.default" name="default"></slot>
        <template v-else>{{ content }}</template>
      </div>
      <div v-if="showFooter" class="timeline-item-content-footer">
        <slot v-if="slotsExist.footer" name="footer"></slot>
        <template v-else>{{ time }}</template>
      </div>
    </div>
  </li>
</template>
<style lang="less" scoped>
.timeline-item-wrap {
  position: relative;
  min-height: var(--timeline-line-height, 22px);
  // 显式清零：宿主环境的 `li + li { margin }` 之类规则会撑开节点间距
  margin: 0;
  list-style: none;
  // 节点级线型覆写，连线直接读取该变量，垂直/水平两种布局共用
  &.timeline-item-line-solid {
    --timeline-line-type: solid;
  }
  &.timeline-item-line-dashed {
    --timeline-line-type: dashed;
  }
  &.timeline-item-line-dotted {
    --timeline-line-type: dotted;
  }
}
.timeline-item-label {
  display: block;
  margin-bottom: 4px;
  font-size: var(--timeline-meta-font-size, 12px);
  color: var(--va-text-color-3);
}
.timeline-item-tail {
  position: absolute;
  top: calc(
    (var(--timeline-line-height, 22px) + var(--timeline-head-size, 10px)) / 2 - var(--timeline-content-offset, 7px) +
      1px
  );
  left: calc((var(--timeline-head-size, 10px) - var(--timeline-line-width, 2px)) / 2);
  height: calc(100% + var(--timeline-gap, 20px) - var(--timeline-head-size, 10px));
  border-left: var(--timeline-line-width, 2px) var(--timeline-line-type, solid)
    var(--timeline-line-color, var(--va-border-split-color));
}
.timeline-item-head {
  position: absolute;
  top: calc(
    (var(--timeline-line-height, 22px) - var(--timeline-head-size, 10px)) / 2 - var(--timeline-content-offset, 7px) +
      1px
  );
  left: 0;
  color: var(--timeline-dot-color, var(--timeline-head-color, currentColor));
  // 用网格居中并锁定轨道尺寸：自定义轴点可超出轴点框且不被压缩（flex 会把超宽内容挤成椭圆）
  display: grid;
  grid-template-columns: 100%;
  grid-template-rows: 100%;
  place-items: center;
  width: var(--timeline-head-size, 10px);
  height: var(--timeline-head-size, 10px);
}
// 自定义轴点默认沿用正文色，仅在显式指定 color 时才取实例色
.timeline-item-head-custom {
  color: var(--timeline-dot-color, inherit);
}
.timeline-item-head-dot {
  display: block;
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  border: var(--timeline-head-border-width, 2px) solid currentColor;
  border-radius: 50%;
  background: var(--timeline-head-bg, var(--va-bg-container-color));
}
.timeline-item-content {
  position: relative;
  top: calc(-1 * var(--timeline-content-offset, 7px));
  margin-left: calc(var(--timeline-head-size, 10px) + var(--timeline-content-gap, 16px));
  word-break: break-word;
}
.timeline-item-content-title {
  margin-bottom: 6px;
  font-size: var(--timeline-title-font-size, 14px);
  font-weight: 500;
}
.timeline-item-content-footer {
  margin-top: 6px;
  font-size: var(--timeline-meta-font-size, 12px);
  color: var(--va-text-color-3);
}
// 轴线贴右：轴点与连线镜像到右侧，内容右对齐
.timeline-right > .timeline-item-wrap {
  .timeline-item-tail {
    right: calc((var(--timeline-head-size, 10px) - var(--timeline-line-width, 2px)) / 2);
    left: auto;
  }
  .timeline-item-head {
    right: 0;
    left: auto;
  }
  .timeline-item-content {
    margin-right: calc(var(--timeline-head-size, 10px) + var(--timeline-content-gap, 16px));
    margin-left: 0;
    text-align: end;
  }
}
// 中轴交替：轴线居中，内容按奇偶分居两侧，默认内容先从右侧出现
.timeline-alternate > .timeline-item-wrap {
  .timeline-item-tail,
  .timeline-item-head {
    right: auto;
    left: 50%;
    transform: translateX(-50%);
  }
  .timeline-item-content {
    width: calc(50% - var(--timeline-alt-offset, 12px));
    margin-left: calc(50% + var(--timeline-alt-offset, 12px));
    text-align: start;
  }
}
.timeline-alternate > .timeline-item-wrap:nth-child(even) > .timeline-item-content {
  margin-left: 0;
  text-align: end;
}
// start=left 时奇偶互换，内容先从左侧出现
.timeline-alternate.timeline-start-left > .timeline-item-wrap:nth-child(odd) > .timeline-item-content {
  margin-left: 0;
  text-align: end;
}
.timeline-alternate.timeline-start-left > .timeline-item-wrap:nth-child(even) > .timeline-item-content {
  margin-left: calc(50% + var(--timeline-alt-offset, 12px));
  text-align: start;
}
// 节点级 position 优先于奇偶默认值，故放在交替规则之后
.timeline-alternate.timeline-wrap > .timeline-item-wrap.timeline-item-right > .timeline-item-content {
  margin-left: calc(50% + var(--timeline-alt-offset, 12px));
  text-align: start;
}
.timeline-alternate.timeline-wrap > .timeline-item-wrap.timeline-item-left > .timeline-item-content {
  margin-left: 0;
  text-align: end;
}
// 分栏布局：任一节点带 label 时轴线移到中线，标签在左半、内容在右半（水平布局不参与）
.timeline-wrap:has(.timeline-item-has-label):not(.timeline-horizontal) > .timeline-item-wrap {
  .timeline-item-tail,
  .timeline-item-head {
    right: auto;
    left: 50%;
    transform: translateX(-50%);
  }
  .timeline-item-label {
    position: absolute;
    top: calc(-1 * var(--timeline-content-offset, 7px));
    left: 0;
    width: calc(50% - var(--timeline-alt-offset, 12px));
    margin-bottom: 0;
    line-height: var(--timeline-line-height, 22px);
    text-align: end;
  }
  .timeline-item-content {
    width: calc(50% - var(--timeline-alt-offset, 12px));
    margin-right: 0;
    margin-left: calc(50% + var(--timeline-alt-offset, 12px));
    text-align: start;
  }
}
// 分栏 + 右向：标签与内容整体镜像，内容在左半（右对齐）、标签在右半
.timeline-wrap:has(.timeline-item-has-label):not(.timeline-horizontal):where(.timeline-right) > .timeline-item-wrap {
  .timeline-item-label {
    right: 0;
    left: auto;
    text-align: start;
  }
  .timeline-item-content {
    margin-right: calc(50% + var(--timeline-alt-offset, 12px));
    margin-left: 0;
    text-align: end;
  }
}
// 分栏 + 交替：偶数位镜像，与奇数位左右交错
.timeline-wrap:has(.timeline-item-has-label):not(.timeline-horizontal):where(.timeline-alternate)
  > .timeline-item-wrap:nth-child(even) {
  .timeline-item-label {
    right: 0;
    left: auto;
    text-align: start;
  }
  .timeline-item-content {
    margin-right: calc(50% + var(--timeline-alt-offset, 12px));
    margin-left: 0;
    text-align: end;
  }
}
// 分栏 + 交替 + start=left：奇偶互换，故奇位镜像、偶位回到默认
.timeline-wrap:has(.timeline-item-has-label):not(.timeline-horizontal).timeline-alternate.timeline-start-left
  > .timeline-item-wrap:nth-child(odd) {
  .timeline-item-label {
    right: 0;
    left: auto;
    text-align: start;
  }
  .timeline-item-content {
    margin-right: calc(50% + var(--timeline-alt-offset, 12px));
    margin-left: 0;
    text-align: end;
  }
}
.timeline-wrap:has(.timeline-item-has-label):not(.timeline-horizontal).timeline-alternate.timeline-start-left
  > .timeline-item-wrap:nth-child(even) {
  .timeline-item-label {
    right: auto;
    left: 0;
    text-align: end;
  }
  .timeline-item-content {
    margin-right: 0;
    margin-left: calc(50% + var(--timeline-alt-offset, 12px));
    text-align: start;
  }
}
// 自定义轴点：以轴点为圆心由内容撑开尺寸，圆底遮住连线，图标与连线之间自然留出间隙
.timeline-item-head-custom {
  top: calc(var(--timeline-line-height, 22px) / 2 - var(--timeline-content-offset, 7px));
  left: calc(var(--timeline-head-size, 10px) / 2);
  width: auto;
  height: auto;
  padding: 4px;
  background: var(--timeline-head-bg, var(--va-bg-container-color));
  border-radius: 50%;
  transform: translate(-50%, -50%);
}
.timeline-right > .timeline-item-wrap > .timeline-item-head-custom {
  right: calc(var(--timeline-head-size, 10px) / 2);
  left: auto;
}
.timeline-alternate > .timeline-item-wrap > .timeline-item-head-custom,
.timeline-wrap:has(.timeline-item-has-label):not(.timeline-horizontal)
  > .timeline-item-wrap
  > .timeline-item-head-custom {
  right: auto;
  left: 50%;
}
// 水平布局放在最后，覆盖垂直/交替/分栏的定位规则；label 退化为内容上方的普通标签
.timeline-wrap.timeline-horizontal > .timeline-item-wrap {
  flex: 0 0 auto;
  min-height: 0;
  .timeline-item-tail {
    top: calc(var(--timeline-head-size, 10px) / 2 - var(--timeline-line-width, 2px) / 2);
    right: auto;
    left: var(--timeline-head-size, 10px);
    width: calc(100% + var(--timeline-horizontal-gap, 40px) - var(--timeline-head-size, 10px));
    height: 0;
    transform: none;
    border-top: var(--timeline-line-width, 2px) var(--timeline-line-type, solid)
      var(--timeline-line-color, var(--va-border-split-color));
    border-left: 0;
  }
  .timeline-item-head {
    top: 0;
    right: auto;
    left: 0;
    transform: none;
  }
  .timeline-item-head-custom {
    top: calc(var(--timeline-head-size, 10px) / 2);
    right: auto;
    left: calc(var(--timeline-head-size, 10px) / 2);
  }
  .timeline-item-label {
    position: static;
    width: auto;
    margin-bottom: 4px;
    text-align: start;
  }
  .timeline-item-content {
    top: auto;
    width: auto;
    margin-top: calc(var(--timeline-head-size, 10px) + 12px);
    margin-right: 0;
    margin-left: 0;
    text-align: start;
  }
}
// 视觉末位节点（倒序时是 DOM 首位）保留下方留白，使容器总高度与「项 + 间距」口径一致
.timeline-wrap:not(.timeline-horizontal):not(.timeline-reverse) > .timeline-item-wrap:last-child {
  padding-bottom: var(--timeline-gap, 20px);
}
.timeline-wrap.timeline-reverse:not(.timeline-horizontal) > .timeline-item-wrap:first-child {
  padding-bottom: var(--timeline-gap, 20px);
}
// 视觉末位节点内容保底高度：避免单行末项过矮导致连线留白失衡；
// 存在幽灵节点时，幽灵节点前一项同样保底
.timeline-wrap:not(.timeline-reverse)
  > .timeline-item-wrap:last-child:not(.timeline-item-pending)
  > .timeline-item-content,
.timeline-wrap.timeline-pending:not(.timeline-reverse) > .timeline-item-wrap:nth-last-child(2) > .timeline-item-content,
.timeline-wrap.timeline-reverse > .timeline-item-wrap:first-child > .timeline-item-content,
.timeline-wrap.timeline-reverse.timeline-pending > .timeline-item-wrap:last-child > .timeline-item-content {
  min-height: var(--timeline-last-content-min-height, 48px);
}
.timeline-wrap > .timeline-item-wrap:last-child > .timeline-item-tail {
  display: none;
}
// 非倒序时幽灵节点位于视觉末位：由它前面那一项画点线尾段表示流程仍在进行，
// 幽灵节点自身不画尾线，以区分「已发生」与「进行中」
.timeline-wrap.timeline-pending:not(.timeline-reverse) > .timeline-item-wrap:nth-last-child(2) > .timeline-item-tail {
  display: block;
  border-left-style: dotted;
}
// 倒序时视觉末位是 DOM 首位，幽灵节点在视觉首位向下正常续接
.timeline-wrap.timeline-reverse > .timeline-item-wrap:first-child > .timeline-item-tail {
  display: none;
}
.timeline-wrap.timeline-pending.timeline-reverse > .timeline-item-wrap:last-child > .timeline-item-tail {
  display: block;
  border-left-style: dotted;
}
</style>
