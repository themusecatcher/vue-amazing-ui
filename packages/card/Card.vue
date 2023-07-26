<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import type { CSSProperties } from 'vue'
interface Props {
  width?: number|string // 卡片宽度
  bordered?: boolean // 是否有边框
  extra?: string // 卡片右上角的操作区域 string | slot
  size?: 'default'|'small' // 卡片的尺寸
  title?: string // 卡片标题 string | slot
  headStyle?: CSSProperties //	标题区域自定义样式
  bodyStyle?: CSSProperties // 内容区域自定义样式
}
const props = withDefaults(defineProps<Props>(), {
  width: 'auto',
  bordered: true,
  extra: '',
  size: 'default',
  title: '',
  headStyle: () => ({}),
  bodyStyle: () => ({})
})
const cardWidth = computed(() => {
  if (typeof props.width === 'number') {
    return props.width + 'px'
  }
  return props.width
})
const headRef = ref() // 声明一个同名的模板引用
const showHead = ref(1)
onMounted(() => {
  showHead.value = headRef.value.offsetHeight
})
</script>
<template>
  <div
    class="m-card"
    :class="{'bordered': bordered, 'm-small-card': size === 'small'}"
    :style="`width: ${cardWidth};`">
    <div class="m-card-head" :style="headStyle" v-if="showHead">
      <div class="m-head-wrapper" ref="headRef">
        <div class="u-title">
          <slot name="title">{{ title }}</slot>
        </div>
        <div class="u-extra">
          <slot name="extra">{{ extra }}</slot>
        </div>
      </div>
    </div>
    <div class="m-card-body" :style="bodyStyle">
      <slot></slot>
    </div>
  </div>
</template>
<style lang="less" scoped>
.bordered {
  border: 1px solid #f0f0f0;
}
.m-card {
  font-size: 14px;
  color: rgba(0, 0, 0, .88);
  line-height: 1.5714285714285714;
  position: relative;
  background: #ffffff;
  border-radius: 8px;
  text-align: left;
  .m-card-head {
    display: flex;
    justify-content: center;
    flex-direction: column;
    min-height: 56px;
    margin-bottom: -1px;
    padding: 0 24px;
    color: rgba(0, 0, 0, .88);
    font-weight: 600;
    font-size: 16px;
    background: transparent;
    border-bottom: 1px solid #f0f0f0;
    border-radius: 8px 8px 0 0;
    .m-head-wrapper {
      width: 100%;
      display: flex;
      align-items: center;
      .u-title {
        display: inline-block;
        flex: 1;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
      .u-extra {
        margin-inline-start: auto;
        font-weight: normal;
        font-size: 14px;
      }
    }
  }
  .m-card-body {
    padding: 24px;
    border-radius: 0 0 8px 8px;
  }
}
.m-small-card {
  .m-card-head {
    min-height: 38px;
    padding: 0 12px;
    font-size: 14px;
  }
  .m-card-body {
    padding: 12px;
  }
}
</style>
