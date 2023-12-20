<script setup lang="ts">
import { ref } from 'vue'
const show = ref(true)
const colors = [
  'pink',
  'red',
  'yellow',
  'orange',
  'cyan',
  'green',
  'blue',
  'purple',
  'geekblue',
  'magenta',
  'volcano',
  'gold',
  'lime'
]
</script>
<template>
  <div>
    <h1>Badge 徽标数</h1>
    <h2 class="mt30 mb10">基本使用</h2>
    <Space :size="20">
      <Badge :count="5">
        <span class="u-cube"></span>
      </Badge>
      <Badge :count="0" show-zero>
        <span class="u-cube"></span>
      </Badge>
      <Badge>
        <template #count>
          <svg focusable="false" class="u-svg" data-icon="clock-circle" width="1em" height="1em" fill="currentColor" aria-hidden="true" viewBox="64 64 896 896"><path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z"></path><path d="M686.7 638.6L544.1 535.5V288c0-4.4-3.6-8-8-8H488c-4.4 0-8 3.6-8 8v275.4c0 2.6 1.2 5 3.3 6.5l165.4 120.6c3.6 2.6 8.6 1.8 11.2-1.7l28.6-39c2.6-3.7 1.8-8.7-1.8-11.2z"></path></svg>
        </template>
        <span class="u-cube"></span>
      </Badge>
    </Space>
    <h2 class="mt30 mb10">独立使用</h2>
    <Space :size="20">
      <Badge :count="25" />
      <Badge
        :count="4"
        :count-style="{
          backgroundColor: '#fff',
          color: '#999',
          boxShadow: '0 0 0 1px #d9d9d9 inset',
        }"
      />
      <Badge :count="109" :count-style="{ backgroundColor: '#52c41a' }" />
    </Space>
    <h2 class="mt30 mb10">封顶数字</h2>
    <Space :size="30">
      <Badge :count="99">
        <span class="u-cube"></span>
      </Badge>
      <Badge :count="100">
        <span class="u-cube"></span>
      </Badge>
      <Badge :count="99" :max="10">
        <span class="u-cube"></span>
      </Badge>
      <Badge :count="1000" :max="999">
        <span class="u-cube"></span>
      </Badge>
    </Space>
    <h2 class="mt30 mb10">小红点</h2>
    <Badge dot>
      <a href="#">Link something</a>
    </Badge>
    <h2 class="mt30 mb10">状态点</h2>
    <Space :size="10">
      <Badge status="success" />
      <Badge status="error" />
      <Badge status="default" />
      <Badge status="processing" />
      <Badge status="warning" />
    </Space>
    <br/>
    <Space style="margin-top: 10px;" direction="vertical" :size="10">
      <Badge status="success" text="Success" />
      <Badge status="error" text="Error" />
      <Badge status="default" text="Default" />
      <Badge status="processing" text="Processing" />
      <Badge status="warning" text="warning" />
    </Space>
    <h2 class="mt30 mb10">动态</h2>
    <Space :size="20" align="center">
      <Badge :dot="show">
        <span class="u-cube"></span>
      </Badge>
      <Switch v-model:checked="show" />
    </Space>
    <h2 class="mt30 mb10">自定义悬浮状态点的显示文字</h2>
    <Badge :count="5" title="Custom hover text">
      <span class="u-cube"></span>
    </Badge>
    <h2 class="mt30 mb10">多彩徽标</h2>
    <h4 class="mb10">Presets</h4>
    <Space :size="20">
      <Badge
        v-for="color in colors" :key="color"
        :color="color"
        :text="color" />
    </Space>
    <h4 class="mt10 mb10">Custom</h4>
    <Space :size="20">
      <Badge color="#f50" text="#f50" />
      <Badge color="#2db7f5" text="#2db7f5" />
      <Badge color="#87d068" text="#87d068" />
      <Badge color="#108ee9" text="#108ee9" />
    </Space>
  </div>
</template>
<style lang="less" scoped>
.u-cube {
  display: inline-block;
  border-radius: 8px;
  width: 40px;
  height: 40px;
  background: rgba(0, 0, 0, 0.25);
}
.u-svg {
  fill: #f5222d;
}
</style>
