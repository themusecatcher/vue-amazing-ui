# 骨架屏 Skeleton

<BackTop />
<Watermark fullscreen content="Vue Amazing UI" />

<br/>

*在需要等待加载内容的位置提供一个占位图形组合*

## 何时使用

- 网络较慢，需要长时间等待加载处理的情况下
- 图文信息内容较多的列表/卡片中
- 只在第一次加载数据的时候使用
- 可以被 `Spin` 完全代替，但是在可用的场景下可以比 `Spin` 提供更好的视觉效果和用户体验

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
const size = ref('default')
const buttonShape = ref('default')
const avatarShape = ref('circle')
const sizeOptions = ref([
  {
    label: 'Default',
    value: 'default'
  },
  {
    label: 'Large',
    value: 'large'
  },
  {
    label: 'Small',
    value: 'small'
  }
])
const buttonShapeOptions = ref([
  {
    label: 'Default',
    value: 'default'
  },
  {
    label: 'Round',
    value: 'round'
  },
  {
    label: 'Circle',
    value: 'circle'
  }
])
const avatarShapeOptions = ref([
  {
    label: 'Square',
    value: 'square'
  },
  {
    label: 'Circle',
    value: 'circle'
  }
])
</script>

## 基本使用

<Skeleton />

::: details Show Code

```vue
<template>
  <Skeleton />
</template>
```

:::

## 复杂的组合

<Skeleton avatar :paragraph="{ rows: 4 }" />

::: details Show Code

```vue
<template>
  <Skeleton avatar :paragraph="{ rows: 4 }" />
</template>
```

:::

## 包含子组件

<Button :loading="loading" @click="showSkeleton">Show Skeleton</Button>
<br/>
<br/>
<Skeleton :loading="loading">
  <div>
    <h4>Vue Amazing UI, a design language</h4>
    <br/>
    <p>
      We supply a series of design principles, practical patterns and high quality design
      resources, to help people create their product prototypes beautifully and efficiently.
    </p>
  </div>
</Skeleton>

::: details Show Code

```vue
<script setup lang="ts">
import { ref } from 'vue'

const loading = ref<boolean>(false)

const showSkeleton = () => {
  loading.value = true
  setTimeout(() => {
    loading.value = false
  }, 2000)
}
</script>
<template>
  <Button :loading="loading" @click="showSkeleton">Show Skeleton</Button>
  <br/>
  <br/>
  <Skeleton :loading="loading">
    <div>
      <h4>Vue Amazing UI, a design language</h4>
      <br/>
      <p>
        We supply a series of design principles, practical patterns and high quality design
        resources, to help people create their product prototypes beautifully and efficiently.
      </p>
    </div>
  </Skeleton>
</template>
```

:::

## 自定义标题和段落

<Skeleton avatar :title="{ width: '24%' }" :paragraph="{ rows: 4, width: ['48%', '72%', '96%', '60%'] }" />

::: details Show Code

```vue
<template>
  <Skeleton avatar :title="{ width: '24%' }" :paragraph="{ rows: 4, width: ['48%', '72%', '96%', '60%'] }" />
</template>
```

:::

## 按钮 / 输入框 / 图像 / 头像

<Flex :gap="32">
  <Flex vertical :gap="12" width="50%">
    <Skeleton :animated="animated" :button="{ shape: buttonShape, size: size, block: block}" />
    <Skeleton style="width: 200px" :animated="animated" :input="{ size: size }" />
    <Skeleton :animated="animated" image />
    <Skeleton :avatar="{ shape: avatarShape, size: size }" :paragraph="{ rows: 2 }" />
  </Flex>
  <Flex vertical :gap="36" width="50%">
    <Space :gap="32">
      <Space align="center">
        animated: <Switch v-model="animated" />
      </Space>
      <Space align="center">
        Button Block: <Switch v-model="block" />
      </Space>
    </Space>
    <Space align="center">
      Size: <Radio :options="sizeOptions" v-model:value="size" button />
    </Space>
    <Space align="center">
      Button Shape: <Radio :options="buttonShapeOptions" v-model:value="buttonShape" button />
    </Space>
    <Space align="center">
      Avatar Shape: <Radio :options="avatarShapeOptions" v-model:value="avatarShape" button />
    </Space>
  </Flex>
</Flex>

::: details Show Code

```vue
<script setup lang="ts">
import { ref } from 'vue'

const animated = ref(false)
const block = ref(false)
const size = ref('default')
const buttonShape = ref('default')
const avatarShape = ref('circle')
const sizeOptions = ref([
  {
    label: 'Default',
    value: 'default'
  },
  {
    label: 'Large',
    value: 'large'
  },
  {
    label: 'Small',
    value: 'small'
  }
])
const buttonShapeOptions = ref([
  {
    label: 'Default',
    value: 'default'
  },
  {
    label: 'Round',
    value: 'round'
  },
  {
    label: 'Circle',
    value: 'circle'
  }
])
const avatarShapeOptions = ref([
  {
    label: 'Square',
    value: 'square'
  },
  {
    label: 'Circle',
    value: 'circle'
  }
])
</script>
<template>
  <Flex :gap="32">
    <Flex vertical :gap="24" width="50%">
      <Skeleton :animated="animated" :button="{ shape: buttonShape, size: size, block: block}" />
      <Skeleton style="width: 200px" :animated="animated" :input="{ size: size }" />
      <Skeleton :animated="animated" image />
    </Flex>
    <Flex vertical :gap="32" width="50%">
      <Space :gap="32">
        <Space align="center">
          animated: <Switch v-model="animated" />
        </Space>
        <Space align="center">
          Button Block: <Switch v-model="block" />
        </Space>
      </Space>
      <Space align="center">
        Size: <Radio :options="sizeOptions" v-model:value="size" button />
      </Space>
      <Space align="center">
        Button Shape: <Radio :options="buttonShapeOptions" v-model:value="buttonShape" button />
      </Space>
      <Space align="center">
        Avatar Shape: <Radio :options="avatarShapeOptions" v-model:value="avatarShape" button />
      </Space>
    </Flex>
  </Flex>
</template>
```

:::

## APIs

### Skeleton

参数 | 说明 | 类型 | 默认值 | 必传
-- | -- | -- | -- | --
animated | 是否展示动画效果 | boolean | true | false
button | 是否使用按钮占位图 | boolean &#124; [SkeletonButtonProps](#skeletonbuttonprops-type) | false | false
avatar | 是否显示头像占位图 | boolean &#124; [SkeletonAvatarProps](#skeletonavatarprops-type) | false | false
input | 是否使用输入框占位图 | boolean &#124; [SkeletonInputProps](#skeletoninputprops-type) | false | false
image | 是否使用图像占位图 | boolean | false | false
title | 是否显示标题占位图 | boolean &#124; [SkeletonTitleProps](#skeletontitleprops-type) | true | false
paragraph | 是否显示段落占位图 | boolean &#124; [SkeletonParagraphProps](#skeletonparagraphprops-type) | true | false
loading | 为 `true` 时，显示占位图，反之则直接展示子组件 | boolean | true | false

### SkeletonButtonProps Type

名称 | 说明 | 类型 | 必传
-- | -- | -- | --
shape | 指定按钮的形状 | 'default' &#124; 'round' &#124; 'circle' | false
size | 设置按钮的大小 | 'default' &#124; 'small' &#124; 'large' | false
block | 将按钮宽度调整为其父宽度的选项 | boolean | false

### SkeletonAvatarProps Type

名称 | 说明 | 类型 | 必传
-- | -- | -- | --
shape | 指定头像的形状 | 'circle' &#124; 'square' | false
size | 设置头像占位图的大小 | number &#124; 'default' &#124; 'small' &#124; 'large' | false

### SkeletonInputProps Type

名称 | 说明 | 类型 | 必传
-- | -- | -- | --
size | 设置输入框的大小 | 'default' &#124; 'small' &#124; 'large' | false

### SkeletonTitleProps Type

名称 | 说明 | 类型 | 必传
-- | -- | -- | --
width | 设置标题占位图的宽度 | number &#124; string | false

### SkeletonParagraphProps Type

名称 | 说明 | 类型 | 必传
-- | -- | -- | --
rows | 设置段落占位图的行数 | number &#124; string | false
width | 设置段落占位图的宽度，若为数组时则为对应的每行宽度，反之则是最后一行的宽度 | number &#124; string &#124; Array<number&#124;string> | false
