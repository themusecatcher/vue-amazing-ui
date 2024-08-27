<script setup lang="ts">
function openChange(visible: boolean) {
  console.log('visible:', visible)
}
</script>
<template>
  <div class="ml60">
    <h1>{{ $route.name }} {{ $route.meta.title }}</h1>
    <h2 class="mt30 mb10">基本使用</h2>
    <Popover title="Title" @open-change="openChange">
      <template #content>
        <p>Content</p>
        <p>Content</p>
      </template>
      <Button type="primary">Hover me</Button>
    </Popover>
    <h2 class="mt30 mb10">自定义样式</h2>
    <Popover
      :max-width="180"
      :title-style="{ fontSize: '16px', fontWeight: 'bold', color: '#1677ff' }"
      :content-style="{ color: '#fff' }"
      bg-color="rgba(0, 0, 0.8)"
      :popover-style="{ padding: '12px 18px', borderRadius: '12px' }"
    >
      <template #title> Custom Title </template>
      <template #content>
        <p>Custom Content</p>
        <p>Custom Content</p>
      </template>
      <Button type="primary">Hover me</Button>
    </Popover>
    <h2 class="mt30 mb10">不同的触发方式</h2>
    <Space>
      <Popover title="Hover Title">
        <template #content>
          <p>Content</p>
          <p>Content</p>
        </template>
        <Button type="primary">Hover Me</Button>
      </Popover>
      <Popover title="Click Title" trigger="click">
        <template #content>
          <p>Content</p>
          <p>Content</p>
        </template>
        <Button type="primary">Click Me</Button>
      </Popover>
    </Space>
    <h2 class="mt30 mb10">延迟显示隐藏</h2>
    <Space>
      <Popover :show-delay="300" :hide-delay="300" title="delay 300ms" content="Vue Amazing UI">
        <Button type="primary">Delay 300ms Popover</Button>
      </Popover>
      <Popover :show-delay="500" :hide-delay="500" title="delay 500ms" content="Vue Amazing UI">
        <Button type="primary">Delay 500ms Popover</Button>
      </Popover>
    </Space>
    <h2 class="mt30 mb10">隐藏箭头</h2>
    <Popover :arrow="false" content="Vue Amazing UI">
      <Button type="primary">Hide Arrow</Button>
    </Popover>
  </div>
</template>
