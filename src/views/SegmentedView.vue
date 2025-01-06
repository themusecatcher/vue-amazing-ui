<script setup lang="ts">
import { reactive, ref } from 'vue'
import { UserOutlined } from '@ant-design/icons-vue'
import type { SegmentedProps, SegmentedOption } from 'vue-amazing-ui'
const options = reactive<string[]>(['Daily', 'Weekly', 'Monthly', 'Quarterly', 'Yearly'])
const optionsDisabled = reactive<(string | SegmentedOption)[]>([
  'Daily',
  { label: 'Weekly', value: 'Weekly', disabled: true },
  'Monthly',
  { label: 'Quarterly', value: 'Quarterly', disabled: true },
  'Yearly'
])
const value = ref<SegmentedProps['value']>(options[0])
const value2 = ref<SegmentedProps['value']>('Daily')
const onChange = (value: string | number) => {
  console.log('change', value)
}
const dynamicOptions = reactive<string[]>(['Daily', 'Weekly', 'Monthly'])
const dynamicValue = ref<SegmentedProps['value']>(dynamicOptions[0])
const loading = ref<boolean>(false)
const disabled = ref<boolean>(false)
const loadMore = () => {
  loading.value = true
  setTimeout(() => {
    dynamicOptions.push(...['Quarterly', 'Yearly'])
    loading.value = false
    disabled.value = true
  }, 1000)
}
const customOptions1 = reactive<SegmentedOption[]>([
  {
    label: 'user1',
    value: 'user1',
    payload: {
      src: 'https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.0.5/1.jpg',
      style: { backgroundColor: '#f56a00' }
    }
  },
  {
    label: 'user2',
    value: 'user2',
    payload: {
      style: { backgroundColor: '#f56a00' },
      content: 'K'
    }
  },
  {
    label: 'user3',
    value: 'user3',
    payload: {
      icon: 'User',
      style: { backgroundColor: '#f56a00' }
    }
  }
])
const customValue = ref<SegmentedProps['value']>(customOptions1[0].value)
const customOptions2 = reactive<SegmentedOption[]>([
  {
    value: 'spring',
    payload: {
      title: 'Spring',
      subTitle: 'Jan-Mar'
    }
  },
  {
    value: 'summer',
    payload: {
      title: 'Summer',
      subTitle: 'Apr-Jun'
    }
  },
  {
    value: 'autumn',
    payload: {
      title: 'Autumn',
      subTitle: 'Jul-Sept'
    }
  },
  {
    value: 'winter',
    payload: {
      title: 'Winter',
      subTitle: 'Oct-Dec'
    }
  }
])
const customValue2 = ref<SegmentedProps['value']>(customOptions2[0].value)
</script>
<template>
  <div>
    <h1>{{ $route.name }} {{ $route.meta.title }}</h1>
    <h2 class="mt30 mb10">基本使用</h2>
    <Segmented v-model:value="value" :options="options" @change="onChange" />
    <h2 class="mt30 mb10">禁用</h2>
    <Space vertical>
      <Segmented v-model:value="value" disabled :options="options" />
      <Segmented v-model:value="value2" :options="optionsDisabled" />
    </Space>
    <h2 class="mt30 mb10">动态加载数据</h2>
    <Space vertical>
      <Segmented v-model:value="dynamicValue" :options="dynamicOptions" />
      <Button type="primary" :loading="loading" :disabled="disabled" @click="loadMore">Load More</Button>
    </Space>
    <h2 class="mt30 mb10">block 分段控制器</h2>
    <Space :width="600">
      <Segmented v-model:value="value" block :options="options" />
    </Space>
    <h2 class="mt30 mb10">自定义渲染</h2>
    <Space vertical>
      <Segmented v-model:value="customValue" :options="customOptions1">
        <template #label="{ label, payload = {} }">
          <div style="padding: 4px">
            <template v-if="payload.icon">
              <Avatar :style="payload.style">
                <template #icon>
                  <UserOutlined />
                </template>
                {{ payload.content }}
              </Avatar>
            </template>
            <template v-else>
              <Avatar :src="payload.src" :style="payload.style">
                {{ payload.content }}
              </Avatar>
            </template>
            <div>{{ label }}</div>
          </div>
        </template>
      </Segmented>
      <Segmented v-model:value="customValue2" :options="customOptions2">
        <template #label="{ payload }">
          <div style="padding: 4px 4px">
            <div>{{ payload.title }}</div>
            <div>{{ payload.subTitle }}</div>
          </div>
        </template>
      </Segmented>
    </Space>
    <h2 class="mt30 mb10">三种大小</h2>
    <Space vertical>
      <Segmented v-model:value="value" :options="options" size="large" />
      <Segmented v-model:value="value" :options="options" />
      <Segmented v-model:value="value" :options="options" size="small" />
    </Space>
  </div>
</template>
