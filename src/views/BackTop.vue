<script setup lang="ts">
import { ref } from 'vue'
function onShow(show: boolean) {
  console.log('show', show)
}
const scrollContainer = ref()
</script>
<template>
  <div style="height: 150vh">
    <h1>{{ $route.name }} {{ $route.meta.title }}</h1>
    <h2 class="mt30 mb10">基本使用</h2>
    <h3 class="mb10">BackTop 会找到首个可滚动的祖先元素并且监听它的滚动事件</h3>
    <BackTop :right="100" @show="onShow" />
    <h2 class="mt30 mb10">自定义可视高度</h2>
    <h3 class="mb10">自定义滚动时触发显示回到顶部的高度</h3>
    <BackTop :bottom="100" :visibility-height="300">
      <div style="width: 200px; height: 40px; line-height: 40px; text-align: center; font-size: 14px"
        >可视高度：300px</div
      >
    </BackTop>
    <h2 class="mt30 mb10">自定义位置</h2>
    <BackTop :right="40" :bottom="160">
      <div style="width: 200px; height: 40px; line-height: 40px; text-align: center; font-size: 14px">改变位置</div>
    </BackTop>
    <h2 class="mt30 mb10">自定义监听目标</h2>
    <h3 class="mb10">自定义设定监听哪个元素来触发 BackTop</h3>
    <BackTop :listen-to="scrollContainer" :bottom="220" :visibility-height="10">
      <div style="width: 200px; height: 40px; line-height: 40px; text-align: center; font-size: 14px"> 指定目标 </div>
    </BackTop>
    <div ref="scrollContainer" style="width: 600px; overflow: auto; height: 100px; line-height: 1.57">
      这块应该写一个有意思的笑话。<br />
      这块应该写一个有意思的笑话。<br />
      这块应该写一个有意思的笑话。<br />
      这块应该写一个有意思的笑话。<br />
      这块应该写一个有意思的笑话。<br />
      这块应该写一个有意思的笑话。<br />
      这块应该写一个有意思的笑话。<br />
      这块应该写一个有意思的笑话。<br />
      这块应该写一个有意思的笑话。<br />
      这块应该写一个有意思的笑话。<br />
    </div>
    <br />
    <h3 class="mb10">自动监听 Scrollbar 来触发 BackTop</h3>
    <Scrollbar style="width: 600px; height: 100px">
      <BackTop :bottom="280" :visibility-height="10">
        <div style="width: 200px; height: 40px; line-height: 40px; text-align: center; font-size: 14px"
          >监听 Scrollbar</div
        >
      </BackTop>
      这块应该写一个有意思的笑话。
      <br />
      这块应该写一个有意思的笑话。
      <br />
      这块应该写一个有意思的笑话。
      <br />
      这块应该写一个有意思的笑话。
      <br />
      这块应该写一个有意思的笑话。
      <br />
      这块应该写一个有意思的笑话。
      <br />
      这块应该写一个有意思的笑话。
      <br />
      这块应该写一个有意思的笑话。
      <br />
      这块应该写一个有意思的笑话。
      <br />
      这块应该写一个有意思的笑话。
      <br />
    </Scrollbar>
  </div>
</template>
