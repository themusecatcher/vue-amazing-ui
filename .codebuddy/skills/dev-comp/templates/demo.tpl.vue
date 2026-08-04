<script setup lang="ts">
// dev-comp template: 演示页骨架
// 与 antdv/naive 真身并排对照是验收标准
import { ref, reactive, watch } from 'vue'
// import { Xxx } from 'vue-amazing-ui'  // 本项目组件
// import { Xxx as AXxx } from 'ant-design-vue'  // antdv 对照（可选）
// 或 import { NXxx } from 'naive-ui'  // naive 对照（可选）

// 演示数据
const items = ref([])
// 受控状态
const selectedKeys = ref<string[]>([])
const openKeys = ref<string[]>([])

// 事件处理
function handleClick(info: { key: string; keyPath: string[] }) {
  console.log('click:', info)
}
function handleSelect(info: { key: string; selectedKeys: string[] }) {
  selectedKeys.value = info.selectedKeys
}
function handleOpenChange(keys: (string | number)[]) {
  openKeys.value = keys as string[]
}
</script>

<template>
  <div class="demo-container">
    <h2>基础用法</h2>
    <div class="demo-row">
      <div class="demo-col">
        <h3>本项目</h3>
        <!-- <Xxx :items="items" v-model:selectedKeys="selectedKeys" @select="handleSelect" /> -->
      </div>
      <div class="demo-col">
        <h3>antdv (对照)</h3>
        <!-- <AXxx :items="items" v-model:selectedKeys="selectedKeys" @select="handleSelect" /> -->
      </div>
    </div>

    <h2>禁用</h2>
    <!-- 覆盖 disabled 态 -->

    <h2>主题切换</h2>
    <!-- 覆盖 light/dark -->
  </div>
</template>

<style lang="less" scoped>
.demo-container {
  padding: 16px;
}
.demo-row {
  display: flex;
  gap: 24px;
}
.demo-col {
  flex: 1;
}
</style>
