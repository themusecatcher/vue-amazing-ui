<script setup lang="ts">
import { ref } from 'vue'
const spinning = ref(true)
</script>
<template>
  <div>
    <h1>{{ $route.name }} {{ $route.meta.title }}</h1>
    <h2 class="mt30 mb10">基本使用</h2>
    <Flex align="center"> Loading state:<Switch v-model="spinning" /> </Flex>
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
    <h2 class="mt30 mb10">圆环指示符</h2>
    <Spin style="width: 800px" :spinning="spinning" indicator="ring-circle">
      <p class="spin-content">
        当 spinning 为 false 时，不显示 loading 状态；当 spinning 为 true 时，显示 loading 效果；如果不设置 tip
        描述文案时，则只有 loading 效果水平垂直居中；如果设置了 tip 描述文案，则 loading 效果和 tip
        描述文案一起水平垂直居中。
      </p>
    </Spin>
    <h2 class="mt30 mb10">圆环轨道指示符</h2>
    <Spin style="width: 800px" :spinning="spinning" indicator="ring-rail">
      <p class="spin-content">
        当 spinning 为 false 时，不显示 loading 状态；当 spinning 为 true 时，显示 loading 效果；如果不设置 tip
        描述文案时，则只有 loading 效果水平垂直居中；如果设置了 tip 描述文案，则 loading 效果和 tip
        描述文案一起水平垂直居中。
      </p>
    </Spin>
    <h2 class="mt30 mb10">动态圆环指示符</h2>
    <Spin style="width: 800px" :spinning="spinning" indicator="dynamic-circle">
      <p class="spin-content">
        当 spinning 为 false 时，不显示 loading 状态；当 spinning 为 true 时，显示 loading 效果；如果不设置 tip
        描述文案时，则只有 loading 效果水平垂直居中；如果设置了 tip 描述文案，则 loading 效果和 tip
        描述文案一起水平垂直居中。
      </p>
    </Spin>
    <h2 class="mt30 mb10">双圆环指示符</h2>
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
      <Spin class="u-spin" tip="加载中..." :spinning="spinning" indicator="ring-circle" />
      <Spin class="u-spin" tip="加载中..." :spinning="spinning" indicator="ring-rail" />
      <Spin class="u-spin" tip="加载中..." :spinning="spinning" indicator="dynamic-circle" />
      <Spin class="u-spin" tip="加载中..." :spinning="spinning" indicator="magic-ring" />
    </Space>
    <h2 class="mt30 mb10">自定义样式</h2>
    <Space>
      <Spin class="u-spin" color="#fadb14" :spinning="spinning" />
      <Spin class="u-spin" color="#fadb14" :spinning="spinning" indicator="spin-dot" />
      <Spin class="u-spin" color="#fadb14" :spinning="spinning" indicator="spin-line" />
      <Spin class="u-spin" color="#fadb14" :spinning="spinning" :spin-circle-percent="50" indicator="ring-circle" />
      <Spin
        class="u-spin"
        color="#fadb14"
        :spin-circle-percent="50"
        ring-rail-color="rgba(212, 136, 6, 0.6)"
        :spinning="spinning"
        indicator="ring-rail"
      />
      <Spin class="u-spin" color="#fadb14" :spinning="spinning" indicator="dynamic-circle" />
      <Spin class="u-spin" color="#fadb14" magic-ring-color="#ffe58f" :spinning="spinning" indicator="magic-ring" />
    </Space>
    <h2 class="mt30 mb10">各种大小</h2>
    <Space vertical>
      <Space>
        <Spin class="u-size-spin" :spinning="spinning" size="small" />
        <Spin class="u-size-spin" :spinning="spinning" />
        <Spin class="u-size-spin" :spinning="spinning" size="large" />
        <Spin class="u-size-spin" :spinning="spinning" size="small" indicator="spin-dot" />
        <Spin class="u-size-spin" :spinning="spinning" indicator="spin-dot" />
        <Spin class="u-size-spin" :spinning="spinning" size="large" indicator="spin-dot" />
        <Spin class="u-size-spin" :spinning="spinning" size="small" indicator="spin-line" />
        <Spin class="u-size-spin" :spinning="spinning" indicator="spin-line" />
        <Spin class="u-size-spin" :spinning="spinning" size="large" indicator="spin-line" />
      </Space>
      <Space>
        <Spin class="u-size-spin" :spinning="spinning" size="small" indicator="ring-circle" />
        <Spin class="u-size-spin" :spinning="spinning" indicator="ring-circle" />
        <Spin class="u-size-spin" :spinning="spinning" size="large" indicator="ring-circle" />
        <Spin class="u-size-spin" :spinning="spinning" size="small" indicator="ring-rail" />
        <Spin class="u-size-spin" :spinning="spinning" indicator="ring-rail" />
        <Spin class="u-size-spin" :spinning="spinning" size="large" indicator="ring-rail" />
        <Spin class="u-size-spin" :spinning="spinning" size="small" indicator="dynamic-circle" />
        <Spin class="u-size-spin" :spinning="spinning" indicator="dynamic-circle" />
        <Spin class="u-size-spin" :spinning="spinning" size="large" indicator="dynamic-circle" />
      </Space>
      <Space>
        <Spin class="u-size-spin" :spinning="spinning" size="small" indicator="magic-ring" />
        <Spin class="u-size-spin" :spinning="spinning" indicator="magic-ring" />
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
