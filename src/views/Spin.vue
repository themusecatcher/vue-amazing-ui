<script setup lang="ts">
import { ref } from 'vue'
const spinning = ref(true)
</script>
<template>
  <div>
    <h1>{{ $route.name }} {{ $route.meta.title }}</h1>
    <h2 class="mt30 mb10">基本使用</h2>
    <Flex align="center"> Loading state:<Switch v-model:checked="spinning" /> </Flex>
    <br />
    <Spin style="width: 800px" :spinning="spinning">
      <p class="spin-content">
        当 spinning 为 false 时，不显示 loading 状态；当 spinning 为 true 时，显示 loading 效果；如果不设置 tip
        描述文案时，则只有 loading 效果水平垂直居中；如果设置了 tip 描述文案，则 loading 效果和 tip
        描述文案一起水平垂直居中。
      </p>
    </Spin>
    <h2 class="mt30 mb10">旋转的点</h2>
    <Spin style="width: 800px" :spinning="spinning" indicator="spin-dot">
      <p class="spin-content">
        当 spinning 为 false 时，不显示 loading 状态；当 spinning 为 true 时，显示 loading 效果；如果不设置 tip
        描述文案时，则只有 loading 效果水平垂直居中；如果设置了 tip 描述文案，则 loading 效果和 tip
        描述文案一起水平垂直居中。
      </p>
    </Spin>
    <h2 class="mt30 mb10">旋转的线</h2>
    <Spin style="width: 800px" :spinning="spinning" indicator="spin-line">
      <p class="spin-content">
        当 spinning 为 false 时，不显示 loading 状态；当 spinning 为 true 时，显示 loading 效果；如果不设置 tip
        描述文案时，则只有 loading 效果水平垂直居中；如果设置了 tip 描述文案，则 loading 效果和 tip
        描述文案一起水平垂直居中。
      </p>
    </Spin>
    <h2 class="mt30 mb10">四分之一圆形指示符</h2>
    <Spin style="width: 800px" :spinning="spinning" indicator="quarter-circle">
      <p class="spin-content">
        当 spinning 为 false 时，不显示 loading 状态；当 spinning 为 true 时，显示 loading 效果；如果不设置 tip
        描述文案时，则只有 loading 效果水平垂直居中；如果设置了 tip 描述文案，则 loading 效果和 tip
        描述文案一起水平垂直居中。
      </p>
    </Spin>
    <h2 class="mt30 mb10">二分之一圆形指示符</h2>
    <Spin style="width: 800px" :spinning="spinning" indicator="half-circle">
      <p class="spin-content">
        当 spinning 为 false 时，不显示 loading 状态；当 spinning 为 true 时，显示 loading 效果；如果不设置 tip
        描述文案时，则只有 loading 效果水平垂直居中；如果设置了 tip 描述文案，则 loading 效果和 tip
        描述文案一起水平垂直居中。
      </p>
    </Spin>
    <h2 class="mt30 mb10">四分之三圆形指示符</h2>
    <Spin style="width: 800px" :spinning="spinning" indicator="three-quarters-circle">
      <p class="spin-content">
        当 spinning 为 false 时，不显示 loading 状态；当 spinning 为 true 时，显示 loading 效果；如果不设置 tip
        描述文案时，则只有 loading 效果水平垂直居中；如果设置了 tip 描述文案，则 loading 效果和 tip
        描述文案一起水平垂直居中。
      </p>
    </Spin>
    <h2 class="mt30 mb10">动态圆形指示符</h2>
    <Spin style="width: 800px" :spinning="spinning" indicator="dynamic-circle">
      <p class="spin-content">
        当 spinning 为 false 时，不显示 loading 状态；当 spinning 为 true 时，显示 loading 效果；如果不设置 tip
        描述文案时，则只有 loading 效果水平垂直居中；如果设置了 tip 描述文案，则 loading 效果和 tip
        描述文案一起水平垂直居中。
      </p>
    </Spin>
    <h2 class="mt30 mb10">魔法圆环指示符</h2>
    <Spin style="width: 800px" :spinning="spinning" indicator="magic-ring">
      <p class="spin-content">
        当 spinning 为 false 时，不显示 loading 状态；当 spinning 为 true 时，显示 loading 效果；如果不设置 tip
        描述文案时，则只有 loading 效果水平垂直居中；如果设置了 tip 描述文案，则 loading 效果和 tip
        描述文案一起水平垂直居中。
      </p>
    </Spin>
    <h2 class="mt30 mb10">自定义描述文案</h2>
    <Space>
      <Spin class="u-spin" tip="加载中..." :spinning="spinning" />
      <Spin class="u-spin" tip="加载中..." :spinning="spinning" indicator="spin-dot" />
      <Spin class="u-spin" tip="加载中..." :spinning="spinning" indicator="spin-line" />
      <Spin class="u-spin" tip="加载中..." :spinning="spinning" indicator="quarter-circle" />
      <Spin class="u-spin" tip="加载中..." :spinning="spinning" indicator="half-circle" />
      <Spin class="u-spin" tip="加载中..." :spinning="spinning" indicator="three-quarters-circle" />
      <Spin class="u-spin" tip="加载中..." :spinning="spinning" indicator="dynamic-circle" />
      <Spin class="u-spin" tip="加载中..." :spinning="spinning" indicator="magic-ring" />
    </Space>
    <h2 class="mt30 mb10">自定义颜色</h2>
    <Space>
      <Spin class="u-spin" color="#fadb14" :spinning="spinning" />
      <Spin class="u-spin" color="#fadb14" :spinning="spinning" indicator="spin-dot" />
      <Spin class="u-spin" color="#fadb14" :spinning="spinning" indicator="spin-line" />
      <Spin class="u-spin" color="#fadb14" :spinning="spinning" indicator="quarter-circle" />
      <Spin class="u-spin" color="#fadb14" :spinning="spinning" indicator="half-circle" />
      <Spin class="u-spin" color="#fadb14" :spinning="spinning" indicator="three-quarters-circle" />
      <Spin class="u-spin" color="#fadb14" :spinning="spinning" indicator="dynamic-circle" />
      <Spin class="u-spin" color="#fadb14" ring-color="#ffe58f" :spinning="spinning" indicator="magic-ring" />
    </Space>
    <h2 class="mt30 mb10">各种大小</h2>
    <Space vertical>
      <Space>
        <Spin class="u-size-spin" :spinning="spinning" size="small" />
        <Spin class="u-size-spin" :spinning="spinning" size="default" />
        <Spin class="u-size-spin" :spinning="spinning" size="large" />
        <Spin class="u-size-spin" :spinning="spinning" size="small" indicator="spin-dot" />
        <Spin class="u-size-spin" :spinning="spinning" size="default" indicator="spin-dot" />
        <Spin class="u-size-spin" :spinning="spinning" size="large" indicator="spin-dot" />
        <Spin class="u-size-spin" :spinning="spinning" size="small" indicator="spin-line" />
        <Spin class="u-size-spin" :spinning="spinning" size="default" indicator="spin-line" />
        <Spin class="u-size-spin" :spinning="spinning" size="large" indicator="spin-line" />
      </Space>
      <Space>
        <Spin class="u-size-spin" :spinning="spinning" size="small" indicator="quarter-circle" />
        <Spin class="u-size-spin" :spinning="spinning" size="default" indicator="quarter-circle" />
        <Spin class="u-size-spin" :spinning="spinning" size="large" indicator="quarter-circle" />
        <Spin class="u-size-spin" :spinning="spinning" size="small" indicator="half-circle" />
        <Spin class="u-size-spin" :spinning="spinning" size="default" indicator="half-circle" />
        <Spin class="u-size-spin" :spinning="spinning" size="large" indicator="half-circle" />
        <Spin class="u-size-spin" :spinning="spinning" size="small" indicator="three-quarters-circle" />
        <Spin class="u-size-spin" :spinning="spinning" size="default" indicator="three-quarters-circle" />
        <Spin class="u-size-spin" :spinning="spinning" size="large" indicator="three-quarters-circle" />
      </Space>
      <Space>
        <Spin class="u-size-spin" :spinning="spinning" size="small" indicator="dynamic-circle" />
        <Spin class="u-size-spin" :spinning="spinning" size="default" indicator="dynamic-circle" />
        <Spin class="u-size-spin" :spinning="spinning" size="large" indicator="dynamic-circle" />
        <Spin class="u-size-spin" :spinning="spinning" size="small" indicator="magic-ring" />
        <Spin class="u-size-spin" :spinning="spinning" size="default" indicator="magic-ring" />
        <Spin class="u-size-spin" :spinning="spinning" size="large" indicator="magic-ring" />
      </Space>
    </Space>
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
  width: 100px;
  height: 100px;
}
.u-size-spin {
  width: 80px;
  height: 80px;
}
</style>
