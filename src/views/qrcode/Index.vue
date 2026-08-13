<script lang="ts" setup>
import { ref } from 'vue'
import { MinusOutlined, PlusOutlined } from '@ant-design/icons-vue'
const qrcodeRef = ref()
const size = ref(160)
const value = ref('hello world')
const color = ref('#FF6900')
const bgColor = ref('#00000030')
const segmentedOptions = ['L', 'M', 'Q', 'H']
const level = ref('L')
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
const dowloadQRCode = async () => {
  const url = await qrcodeRef.value.getQRCodeImage()
  const a = document.createElement('a')
  a.download = 'QRCode.png'
  a.href = url
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
}
</script>
<template>
  <div>
    <h1>{{ $route.name }} {{ $route.meta.title }}</h1>
    <ul class="m-list">
      <li>
        <a class="u-file" href="https://www.npmjs.com/package/qrcode" target="_blank">qrcode</a>
      </li>
    </ul>
    <h2 class="mt30 mb10">基本使用</h2>
    <QRCode value="https://themusecatcher.blog.csdn.net" />
    <h2 class="mt30 mb10">无边框</h2>
    <QRCode value="https://themusecatcher.blog.csdn.net" :bordered="false" />
    <h2 class="mt30 mb10">自定义尺寸</h2>
    <Space vertical>
      <Space>
        <Button @click="decline" :icon="MinusOutlined"> small </Button>
        <Button @click="increase" :icon="PlusOutlined"> large </Button>
      </Space>
      <QRCode :size="size" value="https://themusecatcher.blog.csdn.net" />
    </Space>
    <h2 class="mt30 mb10">下载二维码</h2>
    <Space vertical>
      <QRCode ref="qrcodeRef" />
      <Button type="primary" @click="dowloadQRCode">Downlaod</Button>
    </Space>
    <h2 class="mt30 mb10">气泡卡片二维码</h2>
    <Popover :tooltip-style="{ padding: 0 }">
      <template #content>
        <QRCode value="https://themusecatcher.blog.csdn.net" :bordered="false" />
      </template>
      <img width="100" height="100" src="https://themusecatcher.github.io/vue-amazing-ui/amazing-logo.svg" />
    </Popover>
    <h2 class="mt30 mb10">带 Icon 的二维码</h2>
    <QRCode
      error-level="H"
      value="https://themusecatcher.blog.csdn.net"
      icon="https://themusecatcher.github.io/vue-amazing-ui/amazing-logo.svg"
    />
    <h2 class="mt30 mb10">自定义渲染类型</h2>
    <h3 class="mb10">通过设置 type 自定义渲染结果，可选 svg canvas image 三种类型</h3>
    <Space>
      <QRCode value="https://themusecatcher.blog.csdn.net" type="svg" />
      <QRCode value="https://themusecatcher.blog.csdn.net" type="canvas" />
      <QRCode value="https://themusecatcher.blog.csdn.net" type="image" />
    </Space>
    <h2 class="mt30 mb10">自定义样式</h2>
    <h3 class="mb10">通过设置 color 和 bgColor 自定义二维码颜色和背景色</h3>
    <Space>
      <QRCode value="https://themusecatcher.blog.csdn.net" color="#52c41a" />
      <QRCode value="https://themusecatcher.blog.csdn.net" color="#1677FF" bg-color="#f5f5f5" />
      <QRCode value="https://themusecatcher.blog.csdn.net" :color="color" :bg-color="bgColor" />
      <Space vertical :width="164">
        <ColorPicker v-model:value="color" :modes="['hex']" />
        <ColorPicker v-model:value="bgColor" :modes="['hex']" />
      </Space>
    </Space>
    <h2 class="mt30 mb10">纠错等级</h2>
    <h3 class="mb10">纠错等级也叫纠错率，就是指二维码可以被遮挡后还能正常扫描，而这个能被遮挡的最大面积就是纠错率。</h3>
    <h3 class="mb10">
      通常情况下二维码分为 4 个纠错级别：L级 可纠正约 7% 错误、M级 可纠正约 15% 错误、Q级 可纠正约 25% 错误、H级
      可纠正约 30%
      错误。并不是所有位置都可以缺损，像最明显的三个角上的方框，直接影响初始定位。中间零散的部分是内容编码，可以容忍缺损。当二维码的内容编码携带信息比较少的时候，也就是链接比较短的时候，设置不同的纠错等级，生成的图片不会发生变化。
    </h3>
    <Space vertical>
      <QRCode value="https://themusecatcher.blog.csdn.net" :error-level="level" />
      <Segmented v-model:value="level" :options="segmentedOptions" />
    </Space>
    <h2 class="mt30 mb10">自定义生成二维码</h2>
    <Space align="center" gap="large">
      <QRCode :value="value" />
      <Textarea v-model:value="value" :width="200" allowClear />
    </Space>
  </div>
</template>
