<script lang="ts" setup>
import { ref, h } from 'vue'
import type { QRCode, QRCodeProps } from 'vue-amazing-ui'
import { MinusOutlined, PlusOutlined, ReloadOutlined } from '@ant-design/icons-vue'
const qrcodeRef = ref<InstanceType<typeof QRCode> | null>(null)
const size = ref(160)
const padding = ref(12)
const formatPadding = (value: number) => `${value}px`
const value = ref('hello world')
const color = ref('#FF6900')
const bgColor = ref('#00000030')
const segmentedOptions = ['L', 'M', 'Q', 'H']
const level = ref<QRCodeProps['errorLevel']>('L')
const status = ref<'active' | 'expired' | 'loading' | 'scanned'>('expired')
const maskStyle = {
  '--qr-code-mask-bg-color': 'rgba(255, 255, 255, 0.88)',
  '--qr-code-mask-text-color': '#faad14'
}
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
const refreshStatus = () => {
  status.value = 'loading'
  setTimeout(() => {
    status.value = 'active'
  }, 1500)
}
const downloadQRCode = () => {
  const url = qrcodeRef.value?.toDataURL()
  if (!url) return
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
        <a class="u-file" href="https://www.nayuki.io/page/qr-code-generator-library" target="_blank"
          >QR Code generator library</a
        >
      </li>
    </ul>
    <h2 class="mt30 mb10">基本使用</h2>
    <Space vertical align="center">
      <QRCode :value="value" title="扫码查看当前内容" />
      <Input v-model:value="value" placeholder="-" :maxlength="60" />
    </Space>
    <h2 class="mt30 mb10">带 Icon 的例子</h2>
    <QRCode
      error-level="H"
      value="https://themusecatcher.blog.csdn.net"
      icon="https://themusecatcher.github.io/vue-amazing-ui/amazing-logo.svg"
    />
    <h2 class="mt30 mb10">不同的状态</h2>
    <p class="mb10"
      >通过 <code>status</code> 控制二维码状态，可选
      <code>active</code>、<code>expired</code>、<code>loading</code>、<code>scanned</code> 四个取值；<code
        >expired</code
      >
      状态点击「点击刷新」时触发 <code>refresh</code> 事件
    </p>
    <Space vertical align="center">
      <Space>
        <QRCode value="https://themusecatcher.blog.csdn.net" status="loading" />
        <QRCode value="https://themusecatcher.blog.csdn.net" :status="status" @refresh="refreshStatus" />
        <QRCode value="https://themusecatcher.blog.csdn.net" status="scanned" />
      </Space>
      <Segmented v-model:value="status" :options="['active', 'expired', 'loading', 'scanned']" />
      <Button :icon="h(ReloadOutlined)" @click="refreshStatus">重新获取二维码</Button>
    </Space>
    <h2 class="mt30 mb10">自定义遮罩配色</h2>
    <p class="mb10"
      >状态遮罩的配色由 <code>CSS</code> 变量 <code>--qr-code-mask-bg-color</code>（遮罩底色）和
      <code>--qr-code-mask-text-color</code>（遮罩内文案颜色）控制，在组件上重新声明同名变量即可覆盖
    </p>
    <p class="mb10"
      ><code>--qr-code-mask-text-color</code> 只作用于 <code>expiredText</code> / <code>scannedText</code> 文案；<code
        >loading</code
      >
      指示符与「点击刷新」按钮是 <code>Spin</code> /
      <code>Button</code>
      组件，沿用各自主题色。遮罩底色支持半透明色，可让二维码在遮罩下隐约透出（透明度越高，遮罩内文案的可读性越低）
    </p>
    <Space>
      <QRCode value="https://themusecatcher.blog.csdn.net" status="expired" />
      <QRCode :style="maskStyle" value="https://themusecatcher.blog.csdn.net" status="expired" />
    </Space>
    <h2 class="mt30 mb10">自定义渲染类型</h2>
    <p class="mb10"
      >通过设置 <code>type</code> 自定义渲染结果，可选 <code>svg</code>、<code>canvas</code>、<code>image</code>
      三种类型</p
    >
    <Space>
      <QRCode value="https://themusecatcher.blog.csdn.net" type="svg" />
      <QRCode value="https://themusecatcher.blog.csdn.net" type="canvas" />
      <QRCode value="https://themusecatcher.blog.csdn.net" type="image" />
    </Space>
    <h2 class="mt30 mb10">自定义尺寸</h2>
    <Space vertical>
      <Space>
        <Button @click="decline" :icon="h(MinusOutlined)"> small </Button>
        <Button @click="increase" :icon="h(PlusOutlined)"> large </Button>
      </Space>
      <QRCode :size="size" value="https://themusecatcher.blog.csdn.net" />
    </Space>
    <h2 class="mt30 mb10">自定义颜色</h2>
    <p class="mb10">通过设置 <code>color</code> 自定义二维码颜色，通过设置 <code>bgColor</code> 自定义背景颜色</p>
    <Space>
      <QRCode value="https://themusecatcher.blog.csdn.net" color="#52c41a" />
      <QRCode value="https://themusecatcher.blog.csdn.net" color="#1677FF" bg-color="#f5f5f5" />
      <QRCode value="https://themusecatcher.blog.csdn.net" :color="color" :bg-color="bgColor" />
      <Space vertical :width="164">
        <ColorPicker v-model:value="color" :modes="['hex']" />
        <ColorPicker v-model:value="bgColor" :modes="['hex']" />
      </Space>
    </Space>
    <h2 class="mt30 mb10">下载二维码</h2>
    <Space vertical>
      <QRCode ref="qrcodeRef" value="https://themusecatcher.blog.csdn.net" />
      <Button type="primary" @click="downloadQRCode">Download</Button>
    </Space>
    <h2 class="mt30 mb10">纠错比例</h2>
    <p class="mb10">纠错等级也叫纠错率，就是指二维码可以被遮挡后还能正常扫描，而这个能被遮挡的最大面积就是纠错率。</p>
    <p class="mb10">
      通常情况下二维码分为 4 个纠错级别：L级 可纠正约 7% 错误、M级 可纠正约 15% 错误、Q级 可纠正约 25% 错误、H级
      可纠正约 30%
      错误。并不是所有位置都可以缺损，像最明显的三个角上的方框，直接影响初始定位。中间零散的部分是内容编码，可以容忍缺损。当内容很少、最低版本即可容纳最高等级时，四个等级会生成完全相同的图案；内容增多后，选用不同等级生成的图案会有所不同。
    </p>
    <p class="mb10">
      传入的
      <code>errorLevel</code>
      是<b>最低等级</b>：当内容较少、提升等级不会增大二维码尺寸时，编码器会自动使用更高的纠错等级，因此内容越短实际纠错能力通常越强。
    </p>
    <p class="mb10">
      设置 <code>icon</code> 时建议使用 <code>M</code> 及以上等级（开发环境会对 <code>L</code>
      等级给出提示），避免图标遮挡点阵后影响识别。
    </p>
    <p class="mb10">
      有关更多信息，可参阅相关资料：<a href="https://www.qrcode.com/zh/about/error_correction.html" target="_blank"
        >https://www.qrcode.com/zh/about/error_correction.html</a
      >
    </p>
    <Space vertical>
      <QRCode value="https://themusecatcher.blog.csdn.net" :error-level="level" />
      <Segmented v-model:value="level" :options="segmentedOptions" />
    </Space>
    <h2 class="mt30 mb10">高级用法</h2>
    <Popover :tooltip-style="{ padding: 0 }">
      <template #content>
        <QRCode value="https://themusecatcher.blog.csdn.net" :bordered="false" />
      </template>
      <img width="100" height="100" src="https://themusecatcher.github.io/vue-amazing-ui/amazing-logo.svg" />
    </Popover>
    <h2 class="mt30 mb10">无边框</h2>
    <p class="mb10">通过设置 <code>bordered</code> 为 <code>false</code> 去掉外边框</p>
    <QRCode value="https://themusecatcher.blog.csdn.net" :bordered="false" />
    <h2 class="mt30 mb10">自定义内边距</h2>
    <p class="mb10">通过设置 <code>padding</code> 调整容器内边距，二维码绘制区随内边距变化</p>
    <Space vertical>
      <Space align="center">
        <span>padding</span>
        <Slider v-model:value="padding" :min="0" :max="48" :step="4" :width="260" :format-tooltip="formatPadding" />
      </Space>
      <QRCode value="https://themusecatcher.blog.csdn.net" :padding="padding" />
    </Space>
    <h2 class="mt30 mb10">自定义生成二维码</h2>
    <Space align="center" gap="large">
      <QRCode :value="value" />
      <Textarea v-model:value="value" :width="200" allowClear />
    </Space>
  </div>
</template>
