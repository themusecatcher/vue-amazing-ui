<template>
  <div>
    <h1>{{ $route.name }} {{ $route.meta.title }}</h1>
    <h2 class="mt30 mb10">预置风格: filled</h2>
    <Empty />
    <h2 class="mt30 mb10">预置风格: outlined</h2>
    <Empty image="outlined" />
    <h2 class="mt30 mb10">无描述</h2>
    <Empty :description="null" />
    <h2 class="mt30 mb10">自定义风格</h2>
    <h3 class="mb10">自定义图片地址、描述内容和样式</h3>
    <Empty
      image="https://gw.alipayobjects.com/mdn/miniapp_social/afts/img/A*pevERLJC9v0AAAAAAAAAAABjAQAAAQ/original"
      :image-style="{
        height: '60px'
      }"
    >
      <template #description>
        <span>
          Customize
          <a href="#api">Description</a>
        </span>
      </template>
      <template #footer>
        <Button type="primary">Create Now</Button>
      </template>
    </Empty>
    <h2>插槽自定义</h2>
    <Empty :image-style="{ height: '48px' }" :description-style="{ color: 'rgb(169, 174, 184)' }">
      <svg
        class="u-svg"
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        stroke="currentColor"
        stroke-width="4"
        stroke-linecap="butt"
        stroke-linejoin="miter"
      >
        <path
          d="M24 5v6m7 1 4-4m-18 4-4-4m28.5 22H28s-1 3-4 3-4-3-4-3H6.5M40 41H8a2 2 0 0 1-2-2v-8.46a2 2 0 0 1 .272-1.007l6.15-10.54A2 2 0 0 1 14.148 18H33.85a2 2 0 0 1 1.728.992l6.149 10.541A2 2 0 0 1 42 30.541V39a2 2 0 0 1-2 2Z"
        ></path>
      </svg>
    </Empty>
  </div>
</template>
<style lang="less" scoped>
.u-svg {
  display: inline-block;
  vertical-align: bottom;
  width: 48px;
  height: 48px;
  fill: none;
  stroke: rgb(169, 174, 184);
}
</style>
