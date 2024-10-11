# 标签 Tag

<BackTop />
<Watermark fullscreen content="Vue Amazing UI" />

*进行标记和分类的小标签*

## 何时使用

- 用于标记事物的属性和维度
- 进行分类

<script setup lang="ts">
import { ref, watchEffect } from 'vue'
import {
  CheckCircleOutlined,
  SyncOutlined,
  CloseCircleOutlined,
  ExclamationCircleOutlined,
  ClockCircleOutlined,
  MinusCircleOutlined,
  AppleOutlined,
  TwitterOutlined,
  YoutubeOutlined,
  InstagramOutlined
} from '@ant-design/icons-vue'
const strTags = ref(['天空', '大海', '湖泊'])
watchEffect(() => {
  console.log('strTags', strTags.value)
})
const objTags = ref([
  {
    label: '天空',
    color: 'processing'
  },
  {
    label: '大海',
    closable: false,
    color: 'error'
  },
  {
    label: '湖泊',
    color: 'pink'
  }
])
watchEffect(() => {
  console.log('objTags', objTags.value)
})
const onClose = (e: MouseEvent) => {
  console.log('e', e)
}
const onDynamicClose = (tag: any, index: number) => {
  console.log('tag', tag)  
  console.log('index', index)  
}
</script>

## 基本使用

<Space gap="small">
  <Tag>Tag 1</Tag>
  <Tag><a href="https://blog.csdn.net/Dandrose">Link</a></Tag>
  <Tag closable @close="onClose">Tag 2</Tag>
</Space>

::: details Show Code

```vue
<script setup lang="ts">
const onClose = (e: MouseEvent) => {
  console.log(e)
}
</script>
<template>
  <Space gap="small">
    <Tag>Tag 1</Tag>
    <Tag><a href="https://blog.csdn.net/Dandrose">Link</a></Tag>
    <Tag closable @close="onClose">Tag 2</Tag>
  </Space>
</template>
```

:::

## 多彩标签

<Space gap="small">
  <Tag color="pink">pink</Tag>
  <Tag color="red">red</Tag>
  <Tag color="yellow">yellow</Tag>
  <Tag color="orange">orange</Tag>
  <Tag color="cyan">cyan</Tag>
  <Tag color="green">green</Tag>
  <Tag color="blue">blue</Tag>
  <Tag color="purple">purple</Tag>
  <Tag color="geekblue">geekblue</Tag>
  <Tag color="magenta">magenta</Tag>
  <Tag color="volcano">volcano</Tag>
  <Tag color="gold">gold</Tag>
  <Tag color="lime">lime</Tag>
</Space>
<br/>
<br/>
<Space gap="small">
  <Tag color="#f50">#f50</Tag>
  <Tag color="#2db7f5">#2db7f5</Tag>
  <Tag color="#87d068">#87d068</Tag>
  <Tag color="#108ee9">#108ee9</Tag>
</Space>

::: details Show Code

```vue
<template>
  <Space gap="small">
    <Tag color="pink">pink</Tag>
    <Tag color="red">red</Tag>
    <Tag color="yellow">yellow</Tag>
    <Tag color="orange">orange</Tag>
    <Tag color="cyan">cyan</Tag>
    <Tag color="green">green</Tag>
    <Tag color="blue">blue</Tag>
    <Tag color="purple">purple</Tag>
    <Tag color="geekblue">geekblue</Tag>
    <Tag color="magenta">magenta</Tag>
    <Tag color="volcano">volcano</Tag>
    <Tag color="gold">gold</Tag>
    <Tag color="lime">lime</Tag>
  </Space>
  <br/>
  <br/>
  <Space gap="small">
    <Tag color="#f50">#f50</Tag>
    <Tag color="#2db7f5">#2db7f5</Tag>
    <Tag color="#87d068">#87d068</Tag>
    <Tag color="#108ee9">#108ee9</Tag>
  </Space>
</template>
```

:::

## 预设状态的标签

<Divider orientation="left">Without icon</Divider>
<Space gap="small">
  <Tag color="success">success</Tag>
  <Tag color="processing">processing</Tag>
  <Tag color="error">error</Tag>
  <Tag color="warning">warning</Tag>
  <Tag color="default">default</Tag>
</Space>
<Divider orientation="left">With icon</Divider>
<Space gap="small">
  <Tag color="success">
    <template #icon>
      <CheckCircleOutlined />
    </template>
    success
  </Tag>
  <Tag color="processing">
    <template #icon>
      <SyncOutlined spin />
    </template>
    processing
  </Tag>
  <Tag color="error">
    <template #icon>
      <CloseCircleOutlined />
    </template>
    error
  </Tag>
  <Tag color="warning">
    <template #icon>
      <ExclamationCircleOutlined />
    </template>
    warning
  </Tag>
  <Tag color="default">
    <template #icon>
      <ClockCircleOutlined />
    </template>
    waiting
  </Tag>
  <Tag color="default">
    <template #icon>
      <MinusCircleOutlined />
    </template>
    stop
  </Tag>
</Space>

::: details Show Code

```vue
<script setup lang="ts">
import {
  CheckCircleOutlined,
  SyncOutlined,
  CloseCircleOutlined,
  ExclamationCircleOutlined,
  ClockCircleOutlined,
  MinusCircleOutlined
} from '@ant-design/icons-vue'
</script>
<template>
  <Divider orientation="left">Without icon</Divider>
  <Space gap="small">
    <Tag color="success">success</Tag>
    <Tag color="processing">processing</Tag>
    <Tag color="error">error</Tag>
    <Tag color="warning">warning</Tag>
    <Tag color="default">default</Tag>
  </Space>
  <Divider orientation="left">With icon</Divider>
  <Space gap="small">
    <Tag color="success">
      <template #icon>
        <CheckCircleOutlined />
      </template>
      success
    </Tag>
    <Tag color="processing">
      <template #icon>
        <SyncOutlined spin />
      </template>
      processing
    </Tag>
    <Tag color="error">
      <template #icon>
        <CloseCircleOutlined />
      </template>
      error
    </Tag>
    <Tag color="warning">
      <template #icon>
        <ExclamationCircleOutlined />
      </template>
      warning
    </Tag>
    <Tag color="default">
      <template #icon>
        <ClockCircleOutlined />
      </template>
      waiting
    </Tag>
    <Tag color="default">
      <template #icon>
        <MinusCircleOutlined />
      </template>
      stop
    </Tag>
  </Space>
</template>
```

:::

## 图标按钮标签

<Space gap="small">
  <Tag color="#cd853f">
    <template #icon>
      <AppleOutlined />
    </template>
    Apple
  </Tag>
  <Tag color="#55acee">
    <template #icon>
      <TwitterOutlined />
    </template>
    Twitter
  </Tag>
  <Tag color="#cd201f">
    <template #icon>
      <YoutubeOutlined />
    </template>
    Youtube
  </Tag>
  <Tag color="#3b5999">
    <template #icon>
      <InstagramOutlined />
    </template>
    Instagram
  </Tag>
</Space>

::: details Show Code

```vue
<script setup lang="ts">
import {
  AppleOutlined,
  TwitterOutlined,
  YoutubeOutlined,
  InstagramOutlined
} from '@ant-design/icons-vue'
</script>
<template>
  <Space gap="small">
    <Tag color="#cd853f">
      <template #icon>
        <AppleOutlined />
      </template>
      Apple
    </Tag>
    <Tag color="#55acee">
      <template #icon>
        <TwitterOutlined />
      </template>
      Twitter
    </Tag>
    <Tag color="#cd201f">
      <template #icon>
        <YoutubeOutlined />
      </template>
      Youtube
    </Tag>
    <Tag color="#3b5999">
      <template #icon>
        <InstagramOutlined />
      </template>
      Instagram
    </Tag>
  </Space>
</template>
```

:::

## 动态添加和删除

### 使用字符串格式数组

<br/>

<Space gap="small">
  <Tag dynamic v-model:value="strTags" @dynamic-close="onDynamicClose" />
</Space>

::: details Show Code

```vue
<script setup lang="ts">
import { ref, watchEffect } from 'vue'

const strTags = ref(['天空', '大海', '湖泊'])
watchEffect(() => {
  console.log('strTags', strTags.value)
})
const onDynamicClose = (tag: any, index: number) => {
  console.log('tag', tag)  
  console.log('index', index)  
}
</script>
<template>
  <Space gap="small">
    <Tag dynamic v-model:value="strTags" @dynamic-close="onDynamicClose" />
  </Space>
</template>
```

:::

### 使用对象格式数组

<br/>

<Space gap="small">
  <Tag dynamic v-model:value="objTags" @dynamic-close="onDynamicClose">
    <template #default="{ label, index }">
      <template v-if="index===1">
        {{ label }} {{ index }}
      </template>
    </template>
    <template #icon="{ index }">
      <template v-if="index===0">
        <CheckCircleOutlined />
      </template>
    </template>
  </Tag>
</Space>

::: details Show Code

```vue
<script setup lang="ts">
import { ref, watchEffect } from 'vue'
import { CheckCircleOutlined } from '@ant-design/icons-vue'
const objTags = ref([
  {
    label: '天空',
    color: 'processing'
  },
  {
    label: '大海',
    closable: false,
    color: 'error'
  },
  {
    label: '湖泊',
    color: 'pink'
  }
])
watchEffect(() => {
  console.log('objTags', objTags.value)
})
const onDynamicClose = (tag: any, index: number) => {
  console.log('tag', tag)  
  console.log('index', index)  
}
</script>
<template>
  <Space gap="small">
    <Tag dynamic v-model:value="objTags" @dynamic-close="onDynamicClose">
      <template #default="{ label, index }">
        <template v-if="index===1">
          {{ label }} {{ index }}
        </template>
      </template>
      <template #icon="{ index }">
        <template v-if="index===0">
          <CheckCircleOutlined />
        </template>
      </template>
    </Tag>
  </Space>
</template>
```

:::

## 三种尺寸

<Space gap="small">
  <Tag closable size="small" @close="onClose">
    爱在西元前
  </Tag>
  <Tag color="warning" closable @close="onClose">
    超人不会飞
  </Tag>
  <Tag
    color="blue"
    size="large"
    dynamic
    v-model:value="strTags"
    closable
    @close="onDynamicClose" />
</Space>

::: details Show Code

```vue
<script setup lang="ts">
import { ref, watchEffect } from 'vue'

const strTags = ref(['天空', '大海', '湖泊'])
watchEffect(() => {
  console.log('strTags', strTags.value)
})
const onClose = (e: MouseEvent) => {
  console.log('e', e)
}
const onDynamicClose = (tag: any, index: number) => {
  console.log('tag', tag)  
  console.log('index', index)  
}
</script>
<template>
  <Space gap="small">
    <Tag closable size="small" @close="onClose">
      爱在西元前
    </Tag>
    <Tag color="warning" closable @close="onClose">
      超人不会飞
    </Tag>
    <Tag
      color="blue"
      size="large"
      dynamic
      v-model:value="strTags"
      closable
      @close="onDynamicClose" />
  </Space>
</template>
```

:::

## 自定义动态标签排列

<Tag
  closable
  dynamic
  color="blue"
  size="large"
  :space-props="{ vertical: true, gap: 12 }"
  v-model:value="strTags"
  @close="onDynamicClose"
/>

::: details Show Code

```vue
<script setup lang="ts">
import { ref, watchEffect } from 'vue'

const strTags = ref(['天空', '大海', '湖泊'])
watchEffect(() => {
  console.log('strTags', strTags.value)
})
const onDynamicClose = (tag: any, index: number) => {
  console.log('tag', tag)  
  console.log('index', index)  
}
</script>
<template>
  <Tag
    closable
    dynamic
    color="blue"
    size="large"
    :space-props="{ vertical: true, gap: 12 }"
    v-model:value="strTags"
    @close="onDynamicClose"
  />
</template>
```

:::

## 无边框

<Space gap="small">
  <Tag :bordered="false">Tag 1</Tag>
  <Tag :bordered="false">Tag 2</Tag>
  <Tag :bordered="false" closable>Tag 3</Tag>
  <Tag :bordered="false" closable>Tag 4</Tag>
</Space>
<Divider />
<Space gap="small">
  <Tag :bordered="false" color="processing">processing</Tag>
  <Tag :bordered="false" color="success">success</Tag>
  <Tag :bordered="false" color="error">error</Tag>
  <Tag :bordered="false" color="warning">warning</Tag>
  <Tag :bordered="false" color="magenta">magenta</Tag>
  <Tag :bordered="false" color="red">red</Tag>
  <Tag :bordered="false" color="volcano">volcano</Tag>
  <Tag :bordered="false" color="orange">orange</Tag>
  <Tag :bordered="false" color="gold">gold</Tag>
  <Tag :bordered="false" color="lime">lime</Tag>
  <Tag :bordered="false" color="green">green</Tag>
  <Tag :bordered="false" color="cyan">cyan</Tag>
  <Tag :bordered="false" color="blue">blue</Tag>
  <Tag :bordered="false" color="geekblue">geekblue</Tag>
  <Tag :bordered="false" color="purple">purple</Tag>
</Space>

::: details Show Code

```vue
<template>
  <Space gap="small">
    <Tag :bordered="false">Tag 1</Tag>
    <Tag :bordered="false">Tag 2</Tag>
    <Tag :bordered="false" closable>Tag 3</Tag>
    <Tag :bordered="false" closable>Tag 4</Tag>
  </Space>
  <Divider />
  <Space gap="small">
    <Tag :bordered="false" color="processing">processing</Tag>
    <Tag :bordered="false" color="success">success</Tag>
    <Tag :bordered="false" color="error">error</Tag>
    <Tag :bordered="false" color="warning">warning</Tag>
    <Tag :bordered="false" color="magenta">magenta</Tag>
    <Tag :bordered="false" color="red">red</Tag>
    <Tag :bordered="false" color="volcano">volcano</Tag>
    <Tag :bordered="false" color="orange">orange</Tag>
    <Tag :bordered="false" color="gold">gold</Tag>
    <Tag :bordered="false" color="lime">lime</Tag>
    <Tag :bordered="false" color="green">green</Tag>
    <Tag :bordered="false" color="cyan">cyan</Tag>
    <Tag :bordered="false" color="blue">blue</Tag>
    <Tag :bordered="false" color="geekblue">geekblue</Tag>
    <Tag :bordered="false" color="purple">purple</Tag>
  </Space>
</template>
```

:::

## APIs

### Tag

参数 | 说明 | 类型 | 默认值
-- | -- | -- | --
closable | 标签是否可以关闭 | boolean | false
color | 标签颜色，预置多种常用颜色：`'success'`, `'processing'`, `'error'`, `'warning'`, `'pink'`, `'red'`, `'yellow'`, `'orange'`, `'cyan'`, `'green'`, `'blue'`, `'purple'`, `'geekblue'`, `'magenta'`, `'volcano'`, `'gold'`, `'lime'` | string | undefined
icon | 设置图标 | string &#124; slot | undefined
size | 标签尺寸 | 'small' &#124; 'middle' &#124; 'large' | 'middle'
bordered | 是否有边框 | boolean | true
dynamic | 是否启用标签动态添加和删除 | boolean | false
value <Tag color="cyan">v-model</Tag> | 动态标签数组，仅当 `dynamic: true` 时生效 | string[] &#124; [Tag](#tag-type)[] | []
spaceProps | `Space` 组件属性配置，参考 [Space Props](https://themusecatcher.github.io/vue-amazing-ui/guide/components/space.html#space) ，仅当 `dynamic: true` 时生效 | object | {}

### Tag Type

名称 | 说明 | 类型 | 默认值
-- | -- | -- | --
label? | 标签文本名 | string &#124; slot | undefined
closable? | 标签是否可以关闭 | boolean | true
color? | 标签颜色 | string | undefined
icon? | 设置图标 | string &#124; slot | undefined
size? | 标签尺寸 | 'small' &#124; 'middle' &#124; 'large' | 'middle'
bordered? | 是否有边框 | boolean | true

## Events

名称 | 说明 | 类型
-- | -- | --
close | 关闭时的回调 | (e: Event) => void
dynamicClose | 启用标签动态添加和删除时关闭的回调 | (tag: Tag, index: number) => void
