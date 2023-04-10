<script setup lang="ts">

</script>
<template>
  <div>
    <h2 class="mb10">Empty 空状态基本使用 预置图片1</h2>
    <Empty />
    <h2 class="mt30 mb10">Empty 预置图片2 (image: 2)</h2>
    <Empty
      image="2"
      description="暂无数据"/>
    <h2 class="mt30 mb10">Empty 无描述 (description: null)</h2>
    <Empty :description="null" />
    <h2 class="mt30 mb10">Empty (image: '图片地址' & image-style: {width: '100px', height: '60px'})</h2>
    <Empty
      image="https://gw.alipayobjects.com/mdn/miniapp_social/afts/img/A*pevERLJC9v0AAAAAAAAAAABjAQAAAQ/original"
      :image-style="{
        width: '100px',
        height: '60px',
      }">
      <template #description>
        <span>
          Customize
          <a href="#API">Description</a>
        </span>
      </template>
    </Empty>
  </div>
</template>
<style lang="less" scoped>

</style>
