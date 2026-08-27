<script setup lang="ts">
import { ref } from 'vue'
import type { ImageItem } from 'vue-amazing-ui'
const images = ref<ImageItem[]>([
  {
    src: 'https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.1.2/1.jpg',
    name: 'image-1.jpg'
  },
  {
    src: 'https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.1.2/2.jpg',
    name: 'image-2.jpg'
  },
  {
    src: 'https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.1.2/3.jpg',
    name: 'image-3.jpg'
  },
  {
    src: 'https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.1.2/4.jpg',
    name: 'image-4.jpg'
  },
  {
    src: 'https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.1.2/5.jpg',
    name: 'image-5.jpg'
  }
])
/**
 * 自定义下载示例：用 XHR + Blob 下载跨域图床图片
 * 内置 downloadFile 的 iframe 策略受图床 X-Frame-Options 限制，改用 XHR 取二进制后通过 Blob 触发下载，不受该限制
 */
function customDownload(url: string, fileName?: string) {
  // 以二进制流方式请求图片，需要图床开启 CORS 才能跨域读取
  const xhr = new XMLHttpRequest()
  xhr.open('GET', url, true)
  xhr.responseType = 'blob'
  xhr.onload = () => {
    if (xhr.status === 200) {
      // 将二进制流转为本地 Blob URL，再通过 a 标签的 download 属性强制下载（blob 同源，download 始终生效）
      const blobUrl = URL.createObjectURL(xhr.response)
      const a = document.createElement('a')
      a.href = blobUrl
      a.download = fileName || url.split('?')[0].split('/').pop() || 'download'
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(blobUrl) // 释放 Blob URL，避免内存泄漏
    }
  }
  xhr.send()
}
</script>
<template>
  <div>
    <h1>{{ $route.name }} {{ $route.meta.title }}</h1>
    <Alert class="mt10 mb10" type="warning" message="关于示例图片的下载功能" show-icon>
      <template #description>
        <p
          >示例图片虽以 <code>cdn.jsdelivr.net</code> 为入口，但下载时会 301 重定向到
          <code>raw.githubusercontent.com</code>，导致默认的「下载」按钮失效，原因如下：</p
        >
        <p class="mb10 mt10"
          >内置 <code>downloadFile</code> 对跨域地址走 <code>iframe</code> 策略，而
          <code>raw.githubusercontent.com</code> 设置了 <code>X-Frame-Options: deny</code>，浏览器拒绝在 iframe
          内加载，控制台报 <code>Refused to display ... in a frame</code>；即便不重定向，<code>cdn.jsdelivr.net</code>
          作为普通 CDN 也不支持 iframe 策略依赖的 <code>response-content-disposition</code> 参数。</p
        >
        <p class="mt10"
          >下方的「自定义下载」小节演示了可用的 <code>XHR + Blob</code> 方案：以二进制流读取图片（需图床开启 CORS，<code
            >raw.githubusercontent.com</code
          >
          返回 <code>Access-Control-Allow-Origin: *</code>）后转 Blob URL，再用 <code>a</code> 标签
          <code>download</code> 属性强制下载，不受上述限制。</p
        >
      </template>
    </Alert>
    <h2 class="mt30 mb10">基本使用</h2>
    <Image src="https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.1.2/1.jpg" />
    <h2 class="mt30 mb10">多张图片预览</h2>
    <p class="mb10"
      >可循环切换图片，并支持键盘 (<code>left</code> / <code>right</code> / <code>up</code> / <code>down</code>)
      按键切换</p
    >
    <Image :src="images" loop />
    <h2 class="mt30 mb10">禁用预览</h2>
    <Image src="https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.1.2/1.jpg" disabled />
    <h2 class="mt30 mb10">自定义样式</h2>
    <p class="mb10">自定义宽高；同时图片覆盖容器；预览文本设为 <code>preview</code></p>
    <Image :src="images" :width="[100, 200, 100, 200, 100]" :space-props="{ width: 416 }" fit="cover" loop>
      <template #preview>
        <p class="preview-txt">preview</p>
      </template>
    </Image>
    <h2 class="mt30 mb10">自定义预览图片样式</h2>
    <Image :src="images" :preview-image-style="{ background: '#fff', padding: '12px', borderRadius: '8px' }" loop />
    <h2 class="mt30 mb10">自定义排列方式 & 加载中样式</h2>
    <Image
      :src="images"
      :space-props="{ width: 332, gap: 16 }"
      :spin-props="{ tip: 'loading', indicator: 'spin-line', color: '#fadb14' }"
      loop
    />
    <h2 class="mt30 mb10">无边框</h2>
    <Image :src="images" :bordered="false" fit="cover" loop />
    <h2 class="mt30 mb10">相册模式</h2>
    <Image :src="images" album loop />
    <h2 class="mt30 mb10">自定义预览配置</h2>
    <p class="mb10">更改缩放比率和最大最小缩放比例</p>
    <Image
      :zoom-ratio="0.2"
      :min-zoom-scale="0.5"
      :max-zoom-scale="2"
      src="https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.1.2/1.jpg"
    />
    <h2 class="mt30 mb10">下载配置</h2>
    <p class="mb10">
      通过 <code>downloadOptions</code> 配置内置下载策略（<code>anchor</code> / <code>iframe</code>）与打开方式 （<code
        >_self</code
      >
      / <code>_blank</code>）。
    </p>
    <p class="mb10">
      下方示例强制 <code>anchor</code> 策略并设 <code>target="_blank"</code>，跨域下
      <code>download</code> 属性失效，点击后在新窗口打开图片。
    </p>
    <Image album :src="images" :download-options="{ strategy: 'anchor', target: '_blank' }" loop />
    <h2 class="mt30 mb10">自定义下载</h2>
    <p class="mb10"
      >跨域图床（如设置 <code>X-Frame-Options</code> 拒绝 <code>iframe</code> 的 CDN）下载受限时，内置
      <code>downloadFile</code> 可能无法满足：可通过 <code>downloadOptions</code> 调整内置下载策略，或通过
      <code>customDownload</code> 提供完全自定义的下载方法。
    </p>
    <p class="mb10"> 下方示例演示了用 XHR + Blob 绕过<code>X-Frame-Options</code> 限制下载跨域图床图片 </p>
    <Image album :src="images" :custom-download="customDownload" loop />
  </div>
</template>
<style lang="less" scoped>
.preview-txt {
  display: inline-block;
  font-size: 16px;
}
</style>
