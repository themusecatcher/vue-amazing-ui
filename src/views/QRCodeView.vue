<script lang="ts" setup>
import { h, ref } from 'vue'
import { MinusOutlined, PlusOutlined } from '@ant-design/icons-vue'
const size = ref(160)
const value = ref('hello world')
const decline = () => {
  size.value = size.value - 10
  if (size.value < 48) {
    size.value = 48
  }
}
const increase = () => {
  size.value = size.value + 10
  if (size.value > 300) {
    size.value = 300
  }
}
</script>
<template>
  <div>
    <h1>{{ $route.name }} {{ $route.meta.title }}</h1>
    <h2 class="mt30 mb10">基本使用</h2>
    <QRCode value="https://blog.csdn.net/Dandrose" />
    <h2 class="mt30 mb10">无边框</h2>
    <QRCode value="https://blog.csdn.net/Dandrose" :bordered="false" />
    <h2 class="mt30 mb10">纠错等级</h2>
    <h3 class="mb10">纠错等级也叫纠错率，就是指二维码可以被遮挡后还能正常扫描，而这个能被遮挡的最大面积就是纠错率。</h3>
    <h3 class="mb10">
      通常情况下二维码分为 4 个纠错级别：L级 可纠正约 7% 错误、M级 可纠正约 15% 错误、Q级 可纠正约 25% 错误、H级
      可纠正约 30%
      错误。并不是所有位置都可以缺损，像最明显的三个角上的方框，直接影响初始定位。中间零散的部分是内容编码，可以容忍缺损。当二维码的内容编码携带信息比较少的时候，也就是链接比较短的时候，设置不同的纠错等级，生成的图片不会发生变化。
    </h3>
    <QRCode value="https://blog.csdn.net/Dandrose" error-level="M" />
    <h2 class="mt30 mb10">自定义尺寸</h2>
    <Space vertical>
      <Space>
        <Button @click="decline" :icon="() => h(MinusOutlined)"> small </Button>
        <Button @click="increase" :icon="() => h(PlusOutlined)"> large </Button>
      </Space>
      <QRCode :size="size" value="https://blog.csdn.net/Dandrose" />
    </Space>
    <h2 class="mt30 mb10">自定义样式</h2>
    <h3 class="mb10">自定义二维码颜色和背景色</h3>
    <Space>
      <QRCode value="https://blog.csdn.net/Dandrose" color="#52c41a" />
      <QRCode value="https://blog.csdn.net/Dandrose" color="#1677FF" bg-color="#f5f5f5" />
    </Space>
    <h2 class="mt30 mb10">自定义生成二维码</h2>
    <Space align="center" gap="large">
      <QRCode :value="value" />
      <Textarea v-model:value="value" :width="200" allowClear />
    </Space>
  </div>
</template>
