<script setup lang="ts">
import type { PickerPreset, PickerPresetValue } from './types'
export interface PresetPanelProps {
  presets?: PickerPreset[] // 预设选项，值为单选时间戳或范围两段元组
}
const props = withDefaults(defineProps<PresetPanelProps>(), {
  presets: () => []
})
const emits = defineEmits<{
  select: [value: PickerPresetValue] // 点击预设：立即取值（函数值在此惰性求值）
  hover: [value: PickerPresetValue | null] // 悬浮预设：供宿主在面板上预览该区间，移出为 null
}>()
/** 解析预设值：函数值惰性求值，使「近 7 天」这类预设始终相对当前时刻 */
function resolvePresetValue(preset: PickerPreset): PickerPresetValue {
  const raw = preset.value
  return typeof raw === 'function' ? raw() : raw
}
function onPresetClick(preset: PickerPreset, event: MouseEvent) {
  // 阻止冒泡：避免点击穿透到触发器 / 面板容器的点击判定
  event.stopPropagation()
  emits('select', resolvePresetValue(preset))
}
function onPresetEnter(preset: PickerPreset) {
  emits('hover', resolvePresetValue(preset))
}
function onPresetLeave() {
  emits('hover', null)
}
</script>
<template>
  <div v-if="presets.length" class="picker-presets">
    <ul>
      <li
        v-for="(preset, index) in presets"
        :key="index"
        class="picker-presets-item"
        @click="onPresetClick(preset, $event)"
        @mouseenter="onPresetEnter(preset)"
        @mouseleave="onPresetLeave"
      >
        <template v-if="typeof preset.label === 'string'">{{ preset.label }}</template>
        <component :is="preset.label" v-else />
      </li>
    </ul>
  </div>
</template>
<style lang="less" scoped>
// 预设侧栏：贴面板左侧，宽度随内容（120-200px），条目单行省略、超长时侧栏内部滚动
.picker-presets {
  display: flex;
  flex: none;
  flex-direction: column;
  min-width: 120px;
  max-width: 200px;
  ul {
    // height 0 + flex auto：高度交给同一行的面板决定，条目过多时在侧栏内滚动
    flex: auto;
    height: 0;
    margin: 0;
    padding: 8px;
    overflow: auto;
    list-style: none;
    border-inline-end: 1px solid rgba(5, 5, 5, 0.06);
  }
}
.picker-presets-item {
  padding-block: 1px;
  padding-inline: 8px;
  overflow: hidden;
  color: rgba(0, 0, 0, 0.88);
  // 侧栏内容一律左对齐：面板本体是 `text-align: center`（日期格居中），预设条目不该跟着居中
  text-align: left;
  white-space: nowrap;
  text-overflow: ellipsis;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s;
  & + .picker-presets-item {
    margin-top: 8px;
  }
  &:hover {
    background: rgba(0, 0, 0, 0.04);
  }
}
</style>
