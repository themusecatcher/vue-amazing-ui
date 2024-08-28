<script setup lang="ts">
import { ref } from 'vue'

const loading = ref<boolean>(false)

const showSkeleton = () => {
  loading.value = true
  setTimeout(() => {
    loading.value = false
  }, 2000)
}
const animated = ref(false)
const block = ref(false)
const size = ref('middle')
const buttonShape = ref('default')
const avatarShape = ref('circle')
const sizeOptions = ref([
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
])
const buttonShapeOptions = ref([
  {
    label: 'default',
    value: 'default'
  },
  {
    label: 'round',
    value: 'round'
  },
  {
    label: 'circle',
    value: 'circle'
  }
])
const avatarShapeOptions = ref([
  {
    label: 'square',
    value: 'square'
  },
  {
    label: 'circle',
    value: 'circle'
  }
])
</script>
<template>
  <div>
    <h1>{{ $route.name }} {{ $route.meta.title }}</h1>
    <h2 class="mt30 mb10">基本使用</h2>
    <Skeleton />
    <h2 class="mt30 mb10">复杂的组合</h2>
    <Skeleton avatar :paragraph="{ rows: 4 }" />
    <h2 class="mt30 mb10">包含子组件</h2>
    <Button :loading="loading" @click="showSkeleton">Show Skeleton</Button>
    <br />
    <br />
    <Skeleton :loading="loading">
      <div>
        <h4>Vue Amazing UI, a design language</h4>
        <br />
        <p>
          We supply a series of design principles, practical patterns and high quality design resources, to help people
          create their product prototypes beautifully and efficiently.
        </p>
      </div>
    </Skeleton>
    <h2 class="mt30 mb10">自定义标题和段落</h2>
    <Skeleton avatar :title="{ width: '24%' }" :paragraph="{ rows: 4, width: ['48%', '72%', '96%', '60%'] }" />
    <h2 class="mt30 mb10">按钮 / 输入框 / 图像 / 头像</h2>
    <Flex :gap="32">
      <Flex vertical :gap="12" width="50%">
        <Skeleton :animated="animated" :button="{ shape: buttonShape, size: size, block: block }" />
        <Skeleton style="width: 200px" :animated="animated" :input="{ size: size }" />
        <Skeleton :animated="animated" image />
        <Skeleton :avatar="{ shape: avatarShape, size: size }" :paragraph="{ rows: 2 }" />
      </Flex>
      <Flex vertical gap="large" width="50%">
        <Space gap="large">
          <Space align="center">
            animated:
            <Switch v-model="animated" />
          </Space>
          <Space align="center">
            Button Block:
            <Switch v-model="block" />
          </Space>
        </Space>
        <Space align="center">
          Size:
          <Radio :options="sizeOptions" v-model:value="size" button />
        </Space>
        <Space align="center">
          Button Shape:
          <Radio :options="buttonShapeOptions" v-model:value="buttonShape" button />
        </Space>
        <Space align="center">
          Avatar Shape:
          <Radio :options="avatarShapeOptions" v-model:value="avatarShape" button />
        </Space>
      </Flex>
    </Flex>
  </div>
</template>
