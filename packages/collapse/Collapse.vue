<script setup lang="ts">
import { onMounted, ref } from 'vue'

interface Collapse {
  key?: string|number, // 对应activeKey，如果没有传入key属性，则默认使用数字索引(0,1,2...)绑定
  header?: string, // 面板头内容
  text?: string // 面板内容
}
interface Props {
  collapseData: Collapse[], // 折叠面板数据
  activeKey?: number[] | number | string[] | string, // 当前激活 tab 面板的 key
}
const props = withDefaults(defineProps<Props>(), {
  activeKey: 0,
  collapseData: () => []
})

onMounted(() => {
  getCollapseHeight() // 获取各个面板内容高度
})
const collapseHeight = ref<any[]>([])
function getCollapseHeight () {
  const len = props.collapseData.length
  for (let n = 0; n < len; n++) {
    const el = document.getElementById(`${n}`)
    collapseHeight.value.push(el?.offsetHeight)
  }
}

const emits = defineEmits(['update:activeKey', 'change'])
function dealEmit (value: any) {
  emits('update:activeKey', value)
  emits('change', value)
}
function onClick (key: number|string) {
  if (activeJudge(key)) {
    if (Array.isArray(props.activeKey)) {
      const res = (props.activeKey as any[]).filter(actKey => actKey!== key)
      dealEmit(res)
    } else {
      dealEmit(null)
    }
  } else {
    if (Array.isArray(props.activeKey)) {
      dealEmit([...props.activeKey, key])
    } else {
      dealEmit(key)
    }
  }
}
function activeJudge (key: number|string): boolean {
  if (Array.isArray(props.activeKey)) {
    return (props.activeKey as any[]).includes(key)
  } else {
    return props.activeKey === key
  }
}
</script>
<template>
  <div class="m-collapse">
    <div
      class="m-collapse-item"
      :class="{'u-collapse-item-active': activeJudge(data.key || index)}"
      v-for="(data, index) in collapseData" :key="index">
      <div class="u-collapse-header" @click="onClick(data.key || index)">
        <svg focusable="false" class="u-arrow" data-icon="right" aria-hidden="true" viewBox="64 64 896 896"><path d="M765.7 486.8L314.9 134.7A7.97 7.97 0 00302 141v77.3c0 4.9 2.3 9.6 6.1 12.6l360 281.1-360 281.1c-3.9 3-6.1 7.7-6.1 12.6V883c0 6.7 7.7 10.4 12.9 6.3l450.8-352.1a31.96 31.96 0 000-50.4z"></path></svg>
        <span class="u-header">{{ data.header || '--' }}</span>
      </div>
      <div class="u-collapse-content" :style="`height: ${activeJudge(data.key || index) ? collapseHeight[index]:0}px;`">
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
