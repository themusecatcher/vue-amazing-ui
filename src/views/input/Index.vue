<script setup lang="ts">
import { ref, watchEffect } from 'vue'
import type { InputProps } from 'vue-amazing-ui'
import {
  UserOutlined,
  InfoCircleOutlined,
  SettingOutlined,
  EnvironmentOutlined,
  CompassOutlined
} from '@ant-design/icons-vue'
// 各分节独立绑定，操作任一用例不会联动其余用例
const basicValue = ref('')
const prefixSuffixValue = ref('')
const addonValue = ref('')
const sizeValue = ref('')
const clearValue = ref('')
const passwordValue = ref('')
const showCountValue = ref('')
const disabledValue = ref('')
const lazyValue = ref('')
const sizeOptions = [
  {
    label: 'small',
    value: 'small'
  },
  {
    label: 'middle',
    value: 'middle'
  },
  {
    label: 'large',
    value: 'large'
  }
]
const size = ref<InputProps['size']>('middle')
watchEffect(() => {
  console.log('lazyValue', lazyValue.value)
})
function onChange(e: Event) {
  console.log('change', e)
}
function onEnter(e: KeyboardEvent) {
  console.log('enter', e)
}
</script>
<template>
  <div>
    <h1>{{ $route.name }} {{ $route.meta.title }}</h1>
    <h2 class="mt30 mb10">基本使用</h2>
    <Space gap="small" vertical>
      <Alert type="info">
        .lazy:
        <br />
        默认情况下，v-model 会在每次 input 事件后更新数据 (IME 拼字阶段的状态例外)。
        <br />
        你可以添加 lazy 修饰符来改为在每次 change 事件后更新数据：
        <br />
        {{ '<Input v-model:value.lazy="msg" />' }}
      </Alert>
      <Input :width="200" v-model:value="basicValue" placeholder="Basic usage" @change="onChange" @enter="onEnter" />
      <Input :width="200" v-model:value.lazy="lazyValue" placeholder="Lazy usage" @change="onChange" @enter="onEnter" />
    </Space>
    <h2 class="mt30 mb10">与文字混排</h2>
    <p class="mb10">与文字同处一行时按基线对齐</p>
    <div style="display: flex; align-items: center; height: 32px; gap: 8px">
      <span>姓名</span>
      <Input :width="200" placeholder="与文字同行" />
    </div>
    <h2 class="mt30 mb10">前缀和后缀</h2>
    <Space gap="small" vertical :width="300">
      <Input v-model:value="prefixSuffixValue" placeholder="Basic usage" prefix="￥" suffix="RMB" />
      <Input v-model:value="prefixSuffixValue" placeholder="Basic usage">
        <template #prefix>
          <UserOutlined />
        </template>
        <template #suffix>
          <Tooltip :max-width="150" tooltip="Extra information">
            <InfoCircleOutlined />
          </Tooltip>
        </template>
      </Input>
    </Space>
    <h2 class="mt30 mb10">前置和后置标签</h2>
    <Space gap="small" vertical :width="300">
      <Input v-model:value="addonValue" placeholder="Basic usage" addon-before="Http://" addon-after=".com" />
      <Input v-model:value="addonValue" placeholder="Basic usage">
        <template #addonAfter>
          <SettingOutlined />
        </template>
      </Input>
    </Space>
    <h2 class="mt30 mb10">三种大小</h2>
    <Space gap="small" vertical :width="240">
      <RadioGroup :options="sizeOptions" v-model:value="size" button button-style="solid" />
      <Input v-model:value="sizeValue" :size="size" placeholder="Basic usage" />
      <Input v-model:value="sizeValue" :size="size" placeholder="Basic usage">
        <template #prefix>
          <UserOutlined />
        </template>
        <template #suffix>
          <InfoCircleOutlined />
        </template>
      </Input>
      <Input v-model:value="sizeValue" :size="size" placeholder="Basic usage">
        <template #addonBefore>
          <EnvironmentOutlined />
        </template>
        <template #addonAfter>
          <CompassOutlined />
        </template>
      </Input>
    </Space>
    <h2 class="mt30 mb10">带清除图标</h2>
    <Input :width="200" allow-clear v-model:value="clearValue" placeholder="input with clear icon" />
    <h2 class="mt30 mb10">密码框</h2>
    <Input :width="200" password v-model:value="passwordValue" placeholder="input password" />
    <h2 class="mt30 mb10">带字数提示</h2>
    <Space vertical>
      <Input show-count allow-clear v-model:value="showCountValue" placeholder="please input" />
      <Input show-count allow-clear v-model:value="showCountValue" :maxlength="20" placeholder="please input" />
    </Space>
    <h2 class="mt30 mb10">禁用</h2>
    <Input :width="200" disabled v-model:value="disabledValue" placeholder="disabled input" />
  </div>
</template>
