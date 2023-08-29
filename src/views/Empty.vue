<template>
  <div>
    <h1>Empty 空状态</h1>
    <h2 class="mt30 mb10">预置风格1</h2>
    <Empty />
    <h2 class="mt30 mb10">预置风格2 (image: 2)</h2>
    <Empty image="2" />
    <h2 class="mt30 mb10">无描述 (description: null)</h2>
    <Empty :description="null" />
    <h2 class="mt30 mb10">自定义</h2>
    <h3 class="mb10">自定义图片地址、描述内容和样式</h3>
    <Empty
      image="https://gw.alipayobjects.com/mdn/miniapp_social/afts/img/A*pevERLJC9v0AAAAAAAAAAABjAQAAAQ/original"
      :image-style="{
        width: '100px',
        height: '60px'
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
