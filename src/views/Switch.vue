<script setup lang="ts">
import { ref, watchEffect } from 'vue'

const checked = ref(true)
const customValue1 = ref('no')
const customValue2 = ref(2)
function onChange(checked: boolean) {
  console.log('checked:', checked)
}
watchEffect(() => {
  console.log('checked:', checked.value)
})
</script>
<template>
  <div>
    <h1>{{ $route.name }} {{ $route.meta.title }}</h1>
    <h2 class="mt30 mb10">基本使用</h2>
    <Switch v-model="checked" @change="onChange" />
    <h2 class="mt30 mb10">禁用开关</h2>
    <Switch v-model="checked" disabled />
    <h2 class="mt30 mb10">三种大小</h2>
    <Space>
      <Switch v-model="checked" size="small" />
      <Switch v-model="checked" />
      <Switch v-model="checked" size="large" />
    </Space>
    <h2 class="mt30 mb10">加载中</h2>
    <Space>
      <Switch v-model="checked" size="small" loading />
      <Switch v-model="checked" loading />
      <Switch v-model="checked" size="large" loading />
    </Space>
    <h2 class="mt30 mb10">带 文字 / 数字 / 字母 的开关</h2>
    <Space>
      <Switch v-model="checked" checked="开" unchecked="关" />
      <Switch v-model="checked" checked="1" unchecked="0" />
      <Switch v-model="checked" checked="yes" unchecked="no" />
    </Space>
    <h2 class="mt30 mb10">自定义图标和样式</h2>
    <Switch
      class="u-theme-switch"
      v-model="checked"
      ripple-color="#faad14"
      :circle-style="{ background: checked ? '#001529' : '#fff' }"
    >
      <template #node="{ checked }">
        <svg
          v-if="checked"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
          focusable="false"
          viewBox="0 0 24 24"
          class="u-dark-svg"
        >
          <path
            d="M12.1,22c-0.3,0-0.6,0-0.9,0c-5.5-0.5-9.5-5.4-9-10.9c0.4-4.8,4.2-8.6,9-9c0.4,0,0.8,0.2,1,0.5c0.2,0.3,0.2,0.8-0.1,1.1c-2,2.7-1.4,6.4,1.3,8.4c2.1,1.6,5,1.6,7.1,0c0.3-0.2,0.7-0.3,1.1-0.1c0.3,0.2,0.5,0.6,0.5,1c-0.2,2.7-1.5,5.1-3.6,6.8C16.6,21.2,14.4,22,12.1,22zM9.3,4.4c-2.9,1-5,3.6-5.2,6.8c-0.4,4.4,2.8,8.3,7.2,8.7c2.1,0.2,4.2-0.4,5.8-1.8c1.1-0.9,1.9-2.1,2.4-3.4c-2.5,0.9-5.3,0.5-7.5-1.1C9.2,11.4,8.1,7.7,9.3,4.4z"
          ></path>
        </svg>
        <svg
          v-else
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
          focusable="false"
          viewBox="0 0 24 24"
          class="u-light-svg"
        >
          <path
            d="M12,18c-3.3,0-6-2.7-6-6s2.7-6,6-6s6,2.7,6,6S15.3,18,12,18zM12,8c-2.2,0-4,1.8-4,4c0,2.2,1.8,4,4,4c2.2,0,4-1.8,4-4C16,9.8,14.2,8,12,8z"
          ></path>
          <path d="M12,4c-0.6,0-1-0.4-1-1V1c0-0.6,0.4-1,1-1s1,0.4,1,1v2C13,3.6,12.6,4,12,4z"></path>
          <path d="M12,24c-0.6,0-1-0.4-1-1v-2c0-0.6,0.4-1,1-1s1,0.4,1,1v2C13,23.6,12.6,24,12,24z"></path>
          <path
            d="M5.6,6.6c-0.3,0-0.5-0.1-0.7-0.3L3.5,4.9c-0.4-0.4-0.4-1,0-1.4s1-0.4,1.4,0l1.4,1.4c0.4,0.4,0.4,1,0,1.4C6.2,6.5,5.9,6.6,5.6,6.6z"
          ></path>
          <path
            d="M19.8,20.8c-0.3,0-0.5-0.1-0.7-0.3l-1.4-1.4c-0.4-0.4-0.4-1,0-1.4s1-0.4,1.4,0l1.4,1.4c0.4,0.4,0.4,1,0,1.4C20.3,20.7,20,20.8,19.8,20.8z"
          ></path>
          <path d="M3,13H1c-0.6,0-1-0.4-1-1s0.4-1,1-1h2c0.6,0,1,0.4,1,1S3.6,13,3,13z"></path>
          <path d="M23,13h-2c-0.6,0-1-0.4-1-1s0.4-1,1-1h2c0.6,0,1,0.4,1,1S23.6,13,23,13z"></path>
          <path
            d="M4.2,20.8c-0.3,0-0.5-0.1-0.7-0.3c-0.4-0.4-0.4-1,0-1.4l1.4-1.4c0.4-0.4,1-0.4,1.4,0s0.4,1,0,1.4l-1.4,1.4C4.7,20.7,4.5,20.8,4.2,20.8z"
          ></path>
          <path
            d="M18.4,6.6c-0.3,0-0.5-0.1-0.7-0.3c-0.4-0.4-0.4-1,0-1.4l1.4-1.4c0.4-0.4,1-0.4,1.4,0s0.4,1,0,1.4l-1.4,1.4C18.9,6.5,18.6,6.6,18.4,6.6z"
          ></path>
        </svg>
      </template>
    </Switch>
    <h2 class="mt30 mb10">自定义选中的值</h2>
    <Space :gap="30">
      <Space vertical align="center">
        <Switch v-model="customValue1" checked-value="on" unchecked-value="off">
          <template #checked>on</template>
          <template #unchecked>off</template>
        </Switch>
        Current Value: {{ customValue1 }}
      </Space>
      <Space vertical align="center">
        <Switch v-model="customValue2" :checked-value="1" :unchecked-value="2">
          <template #checked>yes</template>
          <template #unchecked>no</template>
        </Switch>
        Current Value: {{ customValue2 }}
      </Space>
    </Space>
  </div>
</template>
<style lang="less" scoped>
.u-theme-switch.switch-checked {
  background: #faad14;
  &:hover:not(.disabled) {
    background: #e8b339;
  }
}
.u-dark-svg {
  width: 12px;
  height: 12px;
  fill: #fff;
}
.u-light-svg {
  width: 12px;
  height: 12px;
  fill: rgba(60, 60, 67, 0.75);
}
</style>
