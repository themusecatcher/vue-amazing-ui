<script setup lang="ts">
import { ref } from 'vue'
const tip = ref('加载中...')
const spinning = ref(true)
</script>
<template>
  <div>
    <h1>Spin 加载中</h1>
    <h2 class="mt30 mb10">基本使用</h2>
    <Spin style="width: 800px;" :tip="tip" :spinning="spinning">
      <p class="spin-content">当 spinning 为 false 时，不显示 loading 状态；当 spinning 为 true 时，显示 loading 效果；如果不设置 tip 描述文案时，则只有 loading 效果水平垂直居中；如果设置了 tip 描述文案，则 loading 效果和 tip 描述文案一起水平垂直居中。</p>
    </Spin>
    <h2 class="mt30 mb10">四分之一圆形指示符 (indicator: quarter-circle)</h2>
    <Spin style="width: 800px;" :tip="tip" :spinning="spinning" indicator="quarter-circle">
      <p class="spin-content">当 spinning 为 false 时，不显示 loading 状态；当 spinning 为 true 时，显示 loading 效果；如果不设置 tip 描述文案时，则只有 loading 效果水平垂直居中；如果设置了 tip 描述文案，则 loading 效果和 tip 描述文案一起水平垂直居中。</p>
    </Spin>
    <h2 class="mt30 mb10">四分之三圆形指示符 (indicator: three-quarters-circle)</h2>
    <Spin style="width: 800px;" :tip="tip" :spinning="spinning" indicator="three-quarters-circle">
      <p class="spin-content">当 spinning 为 false 时，不显示 loading 状态；当 spinning 为 true 时，显示 loading 效果；如果不设置 tip 描述文案时，则只有 loading 效果水平垂直居中；如果设置了 tip 描述文案，则 loading 效果和 tip 描述文案一起水平垂直居中。</p>
    </Spin>
    <h2 class="mt30 mb10">动态圆形指示符 (indicator: dynamic-circle)</h2>
    <Spin style="width: 800px;" :tip="tip" :spinning="spinning" indicator="dynamic-circle">
      <p class="spin-content">当 spinning 为 false 时，不显示 loading 状态；当 spinning 为 true 时，显示 loading 效果；如果不设置 tip 描述文案时，则只有 loading 效果水平垂直居中；如果设置了 tip 描述文案，则 loading 效果和 tip 描述文案一起水平垂直居中。</p>
    </Spin>
    <h2 class="mt30 mb10">自定义颜色</h2>
    <Space>
      <Spin :tip="tip" class="u-spin" color="#fadb14" :spinning="spinning" />
      <Spin :tip="tip" class="u-spin" color="#fadb14" :spinning="spinning" indicator="quarter-circle" />
      <Spin :tip="tip" class="u-spin" color="#fadb14" :spinning="spinning" indicator="three-quarters-circle" />
      <Spin :tip="tip" class="u-spin" color="#fadb14" :spinning="spinning" indicator="dynamic-circle" />
    </Space>
    <h2 class="mt30 mb10">各种大小</h2>
    <Space direction="vertical">
      <Space>
        <Spin :tip="tip" class="u-spin" :spinning="spinning" size="small" />
        <Spin :tip="tip" class="u-spin" :spinning="spinning" size="default" />
        <Spin :tip="tip" class="u-spin" :spinning="spinning" size="large" />
      </Space>
      <Space>
        <Spin :tip="tip" class="u-spin" :spinning="spinning" size="small" indicator="quarter-circle" />
        <Spin :tip="tip" class="u-spin" :spinning="spinning" size="default"  indicator="quarter-circle" />
        <Spin :tip="tip" class="u-spin" :spinning="spinning" size="large"  indicator="quarter-circle" />
      </Space>
      <Space>
        <Spin :tip="tip" class="u-spin" :spinning="spinning" size="small" indicator="three-quarters-circle" />
        <Spin :tip="tip" class="u-spin" :spinning="spinning" size="default"  indicator="three-quarters-circle" />
        <Spin :tip="tip" class="u-spin" :spinning="spinning" size="large"  indicator="three-quarters-circle" />
      </Space>
      <Space>
        <Spin :tip="tip" class="u-spin" :spinning="spinning" size="small" indicator="dynamic-circle" />
        <Spin :tip="tip" class="u-spin" :spinning="spinning" size="default"  indicator="dynamic-circle" />
        <Spin :tip="tip" class="u-spin" :spinning="spinning" size="large"  indicator="dynamic-circle" />
      </Space>
    </Space>
    <h3>Loading state: <Switch v-model:checked="spinning" /></h3>
    <h2 class="mt30 mb10">Ant Design Vue 加载中</h2>
    <a-spin :tip="tip" size="default" :spinning="spinning">
      <p class="spin-content">当 spinning 为 false 时，不显示 loading 状态；当 spinning 为 true 时，延迟`delay`ms时间后，显示 loading 效果；如果 spinning 状态在 `delay` 时间内结束，则不显示 loading 状态；如果不设置 tip 描述文案时，则只有 loading 效果水平垂直居中；如果设置了 tip 描述文案，则 loading 效果和 tip 描述文案一起水平垂直居中。</p>
    </a-spin>
  </div>
</template>
<style lang="less" scoped>
.spin-content {
  display: inline-block;
  border: 1px solid #91d5ff;
  background-color: #e6f7ff;
  padding: 30px;
}
.u-spin {
  display: inline-block;
  width: 100px;
  height: 100px;
}
</style>
