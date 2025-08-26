<script setup lang="ts">
import { ref } from 'vue'
import { ClockCircleOutlined, MinusOutlined, PlusOutlined } from '@ant-design/icons-vue'
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
    <Space>
      <Badge :value="5">
        <Avatar shape="square" size="large" />
      </Badge>
      <Badge :value="0" show-zero>
        <Avatar shape="square" size="large" />
      </Badge>
      <Badge>
        <template #value>
          <ClockCircleOutlined style="color: #f5222d" />
        </template>
        <Avatar shape="square" size="large" />
      </Badge>
    </Space>
    <h2 class="mt30 mb10">独立使用</h2>
    <Space>
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
    <Space gap="large">
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
    <Space gap="large">
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
    <Space gap="large">
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
    <Space gap="large">
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
    <Space>
      <Badge status="success" ripple />
      <Badge status="error" ripple />
      <Badge status="default" ripple />
      <Badge status="processing" ripple />
      <Badge status="warning" ripple />
    </Space>
    <br />
    <Space style="margin-top: 10px" vertical>
      <Badge status="success" text="Success" />
      <Badge status="error" text="Error" />
      <Badge status="default" text="Default" />
      <Badge status="processing" text="Processing" />
      <Badge status="warning" text="warning" />
    </Space>
    <h2 class="mt30 mb10">动态</h2>
    <Flex vertical>
      <Space gap="large" align="center">
        <Badge :value="value">
          <Avatar shape="square" size="large" />
        </Badge>
        <Button @click="decline">
          <MinusOutlined />
        </Button>
        <Button @click="increase">
          <PlusOutlined />
        </Button>
      </Space>
      <Space gap="large" align="center">
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
    <Space>
      <Badge v-for="color in colors" :key="color" :color="color" :text="color" />
    </Space>
    <h4 class="mt10 mb10">Custom</h4>
    <Space>
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
</style>
