<script setup lang="ts">
import { onMounted, ref } from 'vue'

interface Collapse {
  header?: string, // 标题
  text?: string // 内容文本
}
interface Props {
  collapseData: Collapse[], // 折叠面板数据
  activeKey?: number[] | number, // 当前激活 tab 面板的 key
}
const props = withDefaults(defineProps<Props>(), {
  activeKey: 0,
  collapseData: () => []
})


const emits = defineEmits(['update:activeKey'])
onMounted(() => {
  console.log('activeKey:', props.activeKey)
  computedHeightStyle()
})
const collapseHeight = ref<any[]>([])
function computedHeightStyle () {
  const len = props.collapseData.length
  for (let n = 0; n < len; n++) {
    console.log('n', n)
    const el = document.getElementById(`${n}`)
    collapseHeight.value.push(el?.offsetHeight)
  }
  console.log('collapseHeight:', collapseHeight.value)
  
}
function onClick (index: number) {
  if (activeJudge(index)) {
    if (Array.isArray(props.activeKey)) {
      const res = props.activeKey.filter(key => key!== index)
      emits('update:activeKey', res)
      emits('update:activeKey', res)
    } else {
      emits('update:activeKey', index)
      emits('update:activeKey', index)
    }
  } else {
    if (Array.isArray(props.activeKey)) {
      emits('update:activeKey', [...props.activeKey, index])
      emits('update:activeKey', [...props.activeKey, index])
    } else {
      emits('update:activeKey', index)
      emits('update:activeKey', index)
    }
  }
}
function activeJudge (index: number): boolean {
  if (Array.isArray(props.activeKey)) {
    return (props.activeKey as number[]).includes(index)
  } else {
    return props.activeKey === index
  }
}
</script>
<template>
  <div class="m-collapse">
    <div
      class="m-collapse-item"
      :class="{'u-collapse-item-active': activeJudge(index)}"
      v-for="(data, index) in collapseData" :key="index">
      <div class="u-collapse-header" @click="onClick(index)">
        <svg focusable="false" class="u-arrow" data-icon="right" aria-hidden="true" viewBox="64 64 896 896"><path d="M765.7 486.8L314.9 134.7A7.97 7.97 0 00302 141v77.3c0 4.9 2.3 9.6 6.1 12.6l360 281.1-360 281.1c-3.9 3-6.1 7.7-6.1 12.6V883c0 6.7 7.7 10.4 12.9 6.3l450.8-352.1a31.96 31.96 0 000-50.4z"></path></svg>
        <span class="u-header">{{ data.header || '--' }}</span>
      </div>
      <div class="u-collapse-content" :style="`height: ${activeJudge(index) ? collapseHeight[index]:0}px;`">
        <p class="u-content" :id="`${index}`">{{ data.text || '--' }}</p>
      </div>
    </div>
  </div>
</template>
<style lang="less" scoped>
.m-collapse {
  color: rgba(0, 0, 0, 0.88);
  font-size: 14px;
  line-height: 1.5714285714285714;
  background-color: rgba(0, 0, 0, 0.02);
  border: 1px solid #d9d9d9;
  border-bottom: 0;
  border-radius: 8px;
  .m-collapse-item {
    border-bottom: 1px solid #d9d9d9;
    &:last-child {
      border-radius: 0 0 8px 8px;
      .u-collapse-content {
        border-radius: 0 0 8px 8px;
      }
    }
    .u-collapse-header {
      position: relative;
      padding: 12px 16px;
      height: 22px;
      cursor: pointer;
      transition: all 0.3s;
      .u-arrow {
        display: inline-block;
        vertical-align: top;
        margin-top: 5px;
        width: 12px;
        height: 12px;
        margin-right: 12px;
        fill: rgba(0,0,0,.88);
        transition: transform 0.3s;
      }
      .u-header {
        display: inline-block;
        font-size: 14px;
        color: rgba(0, 0, 0, 0.88);
        height: 22px;
        line-height: 22px;
      }
    }
    .u-collapse-content {
      height: 0;
      overflow: hidden;
      background-color: #fff;
      transition: height .3s;
      .u-content {
        padding: 16px;
        font-size: 14px;
        color: rgba(0, 0, 0, 0.85);
      }
    }
  }
  .u-collapse-item-active {
    .u-arrow {
      transform: rotate(90deg);
    }
    .u-collapse-content {
      border-top: 1px solid #d9d9d9;
    }
  }
}
</style>
