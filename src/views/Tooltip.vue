<script setup lang="ts">
function openChange(visible: boolean) {
  console.log('visible:', visible)
}
</script>
<template>
  <div>
    <h1>{{ $route.name }} {{ $route.meta.title }}</h1>
    <h2 class="mt30 mb10">基本使用</h2>
    <Space gap="large">
      <Tooltip tooltip="Tesla" @open-change="openChange">
        <Button type="primary">特斯拉</Button>
      </Tooltip>
      <Tooltip tooltip="Godzilla" @open-change="openChange">
        <Button type="primary">哥斯拉</Button>
      </Tooltip>
    </Space>
    <h2 class="mt30 mb10">自定义样式</h2>
    <Tooltip
      :max-width="180"
      bg-color="#fff"
      :tooltip-style="{
        padding: '12px 18px',
        borderRadius: '12px',
        fontSize: '18px',
        color: '#1677ff'
      }"
    >
      <template #tooltip>Godzilla VS Kong</template>
      <Button type="primary">哥斯拉大战金刚</Button>
    </Tooltip>
    <h2 class="mt30 mb10">不同的触发方式</h2>
    <Space gap="large">
      <Tooltip>
        <template #tooltip>Vue Amazing UI</template>
        <Button type="primary">Hover Me</Button>
      </Tooltip>
      <Tooltip trigger="click">
        <template #tooltip>Vue Amazing UI</template>
        <Button type="primary">Click Me</Button>
      </Tooltip>
    </Space>
    <h2 class="mt30 mb10">延迟显示隐藏</h2>
    <Space gap="large">
      <Tooltip
        :show-delay="300"
        :hide-delay="300"
        tooltip="Vue Amazing UI (delay 300ms)"
        :tooltip-style="{ textAlign: 'center' }"
      >
        <Button type="primary">Delay 300ms Tooltip</Button>
      </Tooltip>
      <Tooltip
        :show-delay="500"
        :hide-delay="500"
        tooltip="Vue Amazing UI (delay 500ms)"
        :tooltip-style="{ textAlign: 'center' }"
      >
        <Button type="primary">Delay 500ms Tooltip</Button>
      </Tooltip>
    </Space>
    <h2 class="mt30 mb10">隐藏箭头</h2>
    <Tooltip :arrow="false" tooltip="Vue Amazing UI">
      <Button type="primary">Hide Arrow</Button>
    </Tooltip>
  </div>
</template>
