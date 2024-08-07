<script setup lang="ts">
import { reactive, ref } from 'vue'
const options = reactive(['Daily', 'Weekly', 'Monthly', 'Quarterly', 'Yearly'])
const optionsDisabled = reactive([
  'Daily',
  { label: 'Weekly', value: 'Weekly', disabled: true },
  'Monthly',
  { label: 'Quarterly', value: 'Quarterly', disabled: true },
  'Yearly'
])
const value = ref(options[0])
const value2 = ref('Daily')
const onChange = (value: string | number) => {
  console.log('change', value)
}
const dynamicOptions = reactive(['Daily', 'Weekly', 'Monthly'])
const dynamicValue = ref(dynamicOptions[0])
const loading = ref(false)
const disabled = ref(false)
const loadMore = () => {
  loading.value = true
  setTimeout(() => {
    dynamicOptions.push(...['Quarterly', 'Yearly'])
    loading.value = false
    disabled.value = true
  }, 1000)
}
const customOptions1 = reactive([
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
const customValue = ref(customOptions1[0].value)
const customOptions2 = reactive([
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
const customValue2 = ref(customOptions2[0].value)
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
                  <svg
                    focusable="false"
                    class="u-icon"
                    data-icon="user"
                    width="1em"
                    height="1em"
                    fill="currentColor"
                    aria-hidden="true"
                    viewBox="64 64 896 896"
                  >
                    <path
                      d="M858.5 763.6a374 374 0 00-80.6-119.5 375.63 375.63 0 00-119.5-80.6c-.4-.2-.8-.3-1.2-.5C719.5 518 760 444.7 760 362c0-137-111-248-248-248S264 225 264 362c0 82.7 40.5 156 102.8 201.1-.4.2-.8.3-1.2.5-44.8 18.9-85 46-119.5 80.6a375.63 375.63 0 00-80.6 119.5A371.7 371.7 0 00136 901.8a8 8 0 008 8.2h60c4.4 0 7.9-3.5 8-7.8 2-77.2 33-149.5 87.8-204.3 56.7-56.7 132-87.9 212.2-87.9s155.5 31.2 212.2 87.9C779 752.7 810 825 812 902.2c.1 4.4 3.6 7.8 8 7.8h60a8 8 0 008-8.2c-1-47.8-10.9-94.3-29.5-138.2zM512 534c-45.9 0-89.1-17.9-121.6-50.4S340 407.9 340 362c0-45.9 17.9-89.1 50.4-121.6S466.1 190 512 190s89.1 17.9 121.6 50.4S684 316.1 684 362c0 45.9-17.9 89.1-50.4 121.6S557.9 534 512 534z"
                    ></path>
                  </svg>
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
<style lang="less" scoped>
.u-icon {
  display: inline-block;
  fill: #fff;
}
</style>
