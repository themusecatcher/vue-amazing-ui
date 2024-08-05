<script setup lang="ts">
import { ref } from 'vue'
const value = ref(5)
const dot = ref(true)
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
function decline() {
  if (value.value >= 1) {
    value.value--
  }
}
function increase() {
  value.value++
}
</script>
<template>
  <div>
    <h1>{{ $route.name }} {{ $route.meta.title }}</h1>
    <h2 class="mt30 mb10">基本使用</h2>
    <Space :gap="20">
      <Badge :value="5">
        <Avatar shape="square" size="large" />
      </Badge>
      <Badge :value="0" show-zero>
        <Avatar shape="square" size="large" />
      </Badge>
      <Badge>
        <template #value>
          <svg
            focusable="false"
            class="u-svg"
            data-icon="clock-circle"
            width="1em"
            height="1em"
            fill="currentColor"
            aria-hidden="true"
            viewBox="64 64 896 896"
          >
            <path
              d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z"
            ></path>
            <path
              d="M686.7 638.6L544.1 535.5V288c0-4.4-3.6-8-8-8H488c-4.4 0-8 3.6-8 8v275.4c0 2.6 1.2 5 3.3 6.5l165.4 120.6c3.6 2.6 8.6 1.8 11.2-1.7l28.6-39c2.6-3.7 1.8-8.7-1.8-11.2z"
            ></path>
          </svg>
        </template>
        <Avatar shape="square" size="large" />
      </Badge>
    </Space>
    <h2 class="mt30 mb10">独立使用</h2>
    <Space :gap="20">
      <Badge :value="25" />
      <Badge
        :value="4"
        :value-style="{
          backgroundColor: '#fff',
          color: '#999',
          boxShadow: '0 0 0 1px #d9d9d9 inset'
        }"
      />
      <Badge :value="109" :value-style="{ backgroundColor: '#52c41a' }" />
    </Space>
    <h2 class="mt30 mb10">封顶数字</h2>
    <Space :gap="30">
      <Badge :value="99">
        <Avatar shape="square" size="large" />
      </Badge>
      <Badge :value="100">
        <Avatar shape="square" size="large" />
      </Badge>
      <Badge :value="99" :max="10">
        <Avatar shape="square" size="large" />
      </Badge>
      <Badge :value="1000" :max="999">
        <Avatar shape="square" size="large" />
      </Badge>
    </Space>
    <h2 class="mt30 mb10">自定义内容</h2>
    <Space :gap="30">
      <Badge value="hello" :value-style="{ backgroundColor: '#1677FF' }">
        <Avatar shape="square" size="large" />
      </Badge>
      <Badge>
        <template #value>
          <span class="u-value">world</span>
        </template>
        <Avatar shape="square" size="large" />
      </Badge>
    </Space>
    <h2 class="mt30 mb10">自定义徽标样式</h2>
    <Space :gap="30">
      <Badge :value="99" :value-style="{ backgroundColor: 'magenta' }">
        <Avatar shape="square" size="large" />
      </Badge>
      <Badge value="hello" :value-style="{ backgroundColor: 'gold' }">
        <Avatar shape="square" size="large" />
      </Badge>
      <Badge dot :value-style="{ width: '10px', height: '10px', backgroundColor: 'purple' }">
        <Avatar shape="square" size="large" />
      </Badge>
    </Space>
    <h2 class="mt30 mb10">徽标偏移</h2>
    <Space :gap="30">
      <Badge value="9" :offset="[-20, 10]">
        <Avatar shape="square" size="large" />
      </Badge>
      <Badge dot :offset="[-15, 10]">
        <Avatar shape="square" size="large" />
      </Badge>
      <Badge dot status="success" :offset="['-50%', '30%']">
        <Avatar shape="square" size="large" />
      </Badge>
    </Space>
    <h2 class="mt30 mb10">小红点</h2>
    <Badge dot>
      <a href="#">Link something</a>
    </Badge>
    <h2 class="mt30 mb10">状态点</h2>
    <Space :gap="10">
      <Badge status="success" />
      <Badge status="error" />
      <Badge status="default" />
      <Badge status="processing" />
      <Badge status="warning" />
    </Space>
    <br />
    <Space style="margin-top: 10px" vertical :gap="10">
      <Badge status="success" text="Success" />
      <Badge status="error" text="Error" />
      <Badge status="default" text="Default" />
      <Badge status="processing" text="Processing" />
      <Badge status="warning" text="warning" />
    </Space>
    <h2 class="mt30 mb10">动态</h2>
    <Flex gap="middle" vertical>
      <Space :gap="20" align="center">
        <Badge :value="value">
          <Avatar shape="square" size="large" />
        </Badge>
        <Button @click="decline">
          <svg
            focusable="false"
            data-icon="minus"
            width="1em"
            height="1em"
            fill="currentColor"
            aria-hidden="true"
            viewBox="64 64 896 896"
          >
            <path d="M872 474H152c-4.4 0-8 3.6-8 8v60c0 4.4 3.6 8 8 8h720c4.4 0 8-3.6 8-8v-60c0-4.4-3.6-8-8-8z"></path>
          </svg>
        </Button>
        <Button @click="increase">
          <svg
            focusable="false"
            data-icon="plus"
            width="1em"
            height="1em"
            fill="currentColor"
            aria-hidden="true"
            viewBox="64 64 896 896"
          >
            <path d="M482 152h60q8 0 8 8v704q0 8-8 8h-60q-8 0-8-8V160q0-8 8-8z"></path>
            <path d="M192 474h672q8 0 8 8v60q0 8-8 8H160q-8 0-8-8v-60q0-8 8-8z"></path>
          </svg>
        </Button>
      </Space>
      <Space :gap="20" align="center">
        <Badge :dot="dot">
          <Avatar shape="square" size="large" />
        </Badge>
        <Switch v-model="dot" />
      </Space>
    </Flex>
    <h2 class="mt30 mb10">自定义悬浮状态点的显示文字</h2>
    <Badge :value="5" title="Custom hover text">
      <Avatar shape="square" size="large" />
    </Badge>
    <h2 class="mt30 mb10">多彩徽标</h2>
    <h4 class="mb10">Presets</h4>
    <Space :gap="20">
      <Badge v-for="color in colors" :key="color" :color="color" :text="color" />
    </Space>
    <h4 class="mt10 mb10">Custom</h4>
    <Space :gap="20">
      <Badge color="#f50" text="#f50" />
      <Badge color="#2db7f5" text="#2db7f5" />
      <Badge color="#87d068" text="#87d068" />
      <Badge color="#108ee9" text="#108ee9" />
    </Space>
  </div>
</template>
<style lang="less" scoped>
.u-value {
  display: inline-block;
  line-height: 20px;
  padding: 0 6px;
  background-color: #faad14;
  color: #fff;
  border-radius: 10px;
  box-shadow: 0 0 0 1px #ffffff;
}
.u-svg {
  fill: #f5222d;
}
</style>
