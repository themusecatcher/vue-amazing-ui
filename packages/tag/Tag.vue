<script setup lang="ts">
import { ref, onMounted } from 'vue'
interface Props {
  closable?: boolean // 标签是否可以关闭
  color?: string // 标签颜色
  icon?: string // 设置图标 string | slot
}
withDefaults(defineProps<Props>(), {
  closable: false,
  color: '',
  icon: ''
})
const presetColor = ['success', 'processing', 'error', 'warn', 'pink', 'red', 'yellow', 'orange', 'cyan', 'green', 'blue', 'purple', 'geekblue', 'magenta', 'volcano', 'gold', 'lime']
const hidden = ref(false)
const iconRef = ref()
const showIcon = ref(1)
onMounted(() => {
  showIcon.value = iconRef.value.offsetWidth
})
const emit = defineEmits(['close'])
function onClose (e: MouseEvent) {
  hidden.value = true
  emit('close', e)
}
</script>
<template>
  <div
    class="m-tag"
    :class="[color && presetColor.includes(color) ? 'tag-' + color:'', {'has-color': color && !presetColor.includes(color), hidden: hidden}]"
    :style="`background-color: ${color && !presetColor.includes(color) ? color : ''};`">
    <span class="m-icon" ref="iconRef" v-if="showIcon">
      <slot name="icon"></slot>
    </span>
    <span class="u-tag">
      <slot></slot>
    </span>
    <svg v-if="closable" @click="onClose" focusable="false" class="u-close" data-icon="close" width="1em" height="1em" fill="currentColor" aria-hidden="true" viewBox="64 64 896 896"><path d="M563.8 512l262.5-312.9c4.4-5.2.7-13.1-6.1-13.1h-79.8c-4.7 0-9.2 2.1-12.3 5.7L511.6 449.8 295.1 191.7c-3-3.6-7.5-5.7-12.3-5.7H203c-6.8 0-10.5 7.9-6.1 13.1L459.4 512 196.9 824.9A7.95 7.95 0 00203 838h79.8c4.7 0 9.2-2.1 12.3-5.7l216.5-258.1 216.5 258.1c3 3.6 7.5 5.7 12.3 5.7h79.8c6.8 0 10.5-7.9 6.1-13.1L563.8 512z"></path></svg>
  </div>
</template>
<style lang="less" scoped>
.m-tag {
  font-size: 12px;
  line-height: 20px;
  display: inline-block;
  height: auto;
  color: rgba(0, 0, 0, .88);
  margin-inline-end: 8px;
  padding-inline: 7px;
  white-space: nowrap;
  background: rgba(0, 0, 0, .02);
  border: 1px solid #d9d9d9;
  border-radius: 4px;
  opacity: 1;
  transition: all .2s;
  text-align: start;
  .m-icon {
    margin-right: 5px;
    display: inline-flex;
    align-items: center;
    text-align: center;
    vertical-align: -.125em;
  }
  .u-tag {
    display: inline-block;
  }
  .u-close {
    margin-inline-start: 3px;
    fill: rgba(0, 0, 0, .45);
    font-size: 12px;
    cursor: pointer;
    transition: all .2s;
    display: inline-flex;
    align-items: center;
    text-align: center;
    vertical-align: -.125em;
    &:hover {
      fill: rgba(0, 0, 0, .88);
    }
  }
}
.tag-success {
  color: #52c41a;
  background: #f6ffed;
  border-color: #b7eb8f;
  :deep(svg) {
    fill: #52c41a;
  }
}
.tag-processing {
  color: #1677ff;
  background: #e6f4ff;
  border-color: #91caff;
  :deep(svg) {
    fill: #1677ff;
  }
}
.tag-error {
  color: #ff4d4f;
  background: #fff2f0;
  border-color: #ffccc7;
  :deep(svg) {
    fill: #ff4d4f;
  }
}
.tag-warn {
  color: #faad14;
  background: #fffbe6;
  border-color: #ffe58f;
  :deep(svg) {
    fill: #faad14;
  }
}
.tag-pink {
  color: #c41d7f;
  background: #fff0f6;
  border-color: #ffadd2;
  :deep(svg) {
    fill: #c41d7f;
  }
}
.tag-red {
  color: #cf1322;
  background: #fff1f0;
  border-color: #ffa39e;
  :deep(svg) {
    fill: #cf1322;
  }
}
.tag-yellow {
  color: #d4b106;
  background: #feffe6;
  border-color: #fffb8f;
  :deep(svg) {
    fill: #d4b106;
  }
}
.tag-orange {
  color: #d46b08;
  background: #fff7e6;
  border-color: #ffd591;
  :deep(svg) {
    fill: #d46b08;
  }
}
.tag-green {
  color: #389e0d;
  background: #f6ffed;
  border-color: #b7eb8f;
  :deep(svg) {
    fill: #389e0d;
  }
}
.tag-cyan {
  color: #08979c;
  background: #e6fffb;
  border-color: #87e8de;
  :deep(svg) {
    fill: #08979c;
  }
}
.tag-blue {
  color: #0958d9;
  background: #e6f4ff;
  border-color: #91caff;
  :deep(svg) {
    fill: #0958d9;
  }
}
.tag-purple {
  color: #531dab;
  background: #f9f0ff;
  border-color: #d3adf7;
  :deep(svg) {
    fill: #531dab;
  }
}
.tag-geekblue {
  color: #1d39c4;
  background: #f0f5ff;
  border-color: #adc6ff;
  :deep(svg) {
    fill: #1d39c4;
  }
}
.tag-magenta {
  color: #c41d7f;
  background: #fff0f6;
  border-color: #ffadd2;
  :deep(svg) {
    fill: #c41d7f;
  }
}
.tag-volcano {
  color: #d4380d;
  background: #fff2e8;
  border-color: #ffbb96;
  :deep(svg) {
    fill: #d4380d;
  }
}
.tag-gold {
  color: #d48806;
  background: #fffbe6;
  border-color: #ffe58f;
  :deep(svg) {
    fill: #d48806;
  }
}
.tag-lime {
  color: #7cb305;
  background: #fcffe6;
  border-color: #eaff8f;
  :deep(svg) {
    fill: #7cb305;
  }
}
.has-color {
  color: #fff;
  border-color: transparent;
}
.hidden {
  display: none;
}
</style>
