# 标签 Tag

<br/>

*进行标记和分类的小标签*

## 何时使用

- 用于标记事物的属性和维度
- 进行分类

<script setup lang="ts">
import { ref, watchEffect } from 'vue'

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

<Space>
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
  <Space>
    <Tag>Tag 1</Tag>
    <Tag><a href="https://blog.csdn.net/Dandrose">Link</a></Tag>
    <Tag closable @close="onClose">Tag 2</Tag>
  </Space>
</template>
```

:::

## 多彩标签

<Space>
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
<Space>
  <Tag color="#f50">#f50</Tag>
  <Tag color="#2db7f5">#2db7f5</Tag>
  <Tag color="#87d068">#87d068</Tag>
  <Tag color="#108ee9">#108ee9</Tag>
</Space>

::: details Show Code

```vue
<template>
  <Space>
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
  <Space>
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
<Space>
  <Tag color="success">success</Tag>
  <Tag color="processing">processing</Tag>
  <Tag color="error">error</Tag>
  <Tag color="warning">warning</Tag>
  <Tag color="default">default</Tag>
</Space>
<Divider orientation="left">With icon</Divider>
<Space>
  <Tag color="success">
    <template #icon>
      <svg focusable="false" class="u-svg" data-icon="check-circle" width="1em" height="1em" fill="currentColor" aria-hidden="true" viewBox="64 64 896 896"><path d="M699 353h-46.9c-10.2 0-19.9 4.9-25.9 13.3L469 584.3l-71.2-98.8c-6-8.3-15.6-13.3-25.9-13.3H325c-6.5 0-10.3 7.4-6.5 12.7l124.6 172.8a31.8 31.8 0 0051.7 0l210.6-292c3.9-5.3.1-12.7-6.4-12.7z"></path><path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z"></path></svg>
    </template>
    success
  </Tag>
  <Tag color="processing">
    <template #icon>
      <svg focusable="false" class="u-spin" data-icon="sync" width="1em" height="1em" fill="currentColor" aria-hidden="true" viewBox="64 64 896 896"><path d="M168 504.2c1-43.7 10-86.1 26.9-126 17.3-41 42.1-77.7 73.7-109.4S337 212.3 378 195c42.4-17.9 87.4-27 133.9-27s91.5 9.1 133.8 27A341.5 341.5 0 01755 268.8c9.9 9.9 19.2 20.4 27.8 31.4l-60.2 47a8 8 0 003 14.1l175.7 43c5 1.2 9.9-2.6 9.9-7.7l.8-180.9c0-6.7-7.7-10.5-12.9-6.3l-56.4 44.1C765.8 155.1 646.2 92 511.8 92 282.7 92 96.3 275.6 92 503.8a8 8 0 008 8.2h60c4.4 0 7.9-3.5 8-7.8zm756 7.8h-60c-4.4 0-7.9 3.5-8 7.8-1 43.7-10 86.1-26.9 126-17.3 41-42.1 77.8-73.7 109.4A342.45 342.45 0 01512.1 856a342.24 342.24 0 01-243.2-100.8c-9.9-9.9-19.2-20.4-27.8-31.4l60.2-47a8 8 0 00-3-14.1l-175.7-43c-5-1.2-9.9 2.6-9.9 7.7l-.7 181c0 6.7 7.7 10.5 12.9 6.3l56.4-44.1C258.2 868.9 377.8 932 512.2 932c229.2 0 415.5-183.7 419.8-411.8a8 8 0 00-8-8.2z"></path></svg>
    </template>
    processing
  </Tag>
  <Tag color="error">
    <template #icon>
      <svg focusable="false" class="u-svg" data-icon="close-circle" width="1em" height="1em" fill="currentColor" aria-hidden="true" viewBox="64 64 896 896"><path d="M685.4 354.8c0-4.4-3.6-8-8-8l-66 .3L512 465.6l-99.3-118.4-66.1-.3c-4.4 0-8 3.5-8 8 0 1.9.7 3.7 1.9 5.2l130.1 155L340.5 670a8.32 8.32 0 00-1.9 5.2c0 4.4 3.6 8 8 8l66.1-.3L512 564.4l99.3 118.4 66 .3c4.4 0 8-3.5 8-8 0-1.9-.7-3.7-1.9-5.2L553.5 515l130.1-155c1.2-1.4 1.8-3.3 1.8-5.2z"></path><path d="M512 65C264.6 65 64 265.6 64 513s200.6 448 448 448 448-200.6 448-448S759.4 65 512 65zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z"></path></svg>
    </template>
    error
  </Tag>
  <Tag color="warning">
    <template #icon>
      <svg focusable="false" class="u-svg" data-icon="exclamation-circle" width="1em" height="1em" fill="currentColor" aria-hidden="true" viewBox="64 64 896 896"><path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z"></path><path d="M464 688a48 48 0 1096 0 48 48 0 10-96 0zm24-112h48c4.4 0 8-3.6 8-8V296c0-4.4-3.6-8-8-8h-48c-4.4 0-8 3.6-8 8v272c0 4.4 3.6 8 8 8z"></path></svg>
    </template>
    warning
  </Tag>
  <Tag color="default">
    <template #icon>
      <svg focusable="false" class="u-svg" data-icon="clock-circle" width="1em" height="1em" fill="currentColor" aria-hidden="true" viewBox="64 64 896 896"><path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z"></path><path d="M686.7 638.6L544.1 535.5V288c0-4.4-3.6-8-8-8H488c-4.4 0-8 3.6-8 8v275.4c0 2.6 1.2 5 3.3 6.5l165.4 120.6c3.6 2.6 8.6 1.8 11.2-1.7l28.6-39c2.6-3.7 1.8-8.7-1.8-11.2z"></path></svg>
    </template>
    waiting
  </Tag>
  <Tag color="default">
    <template #icon>
      <svg focusable="false" class="u-svg" data-icon="minus-circle" width="1em" height="1em" fill="currentColor" aria-hidden="true" viewBox="64 64 896 896"><path d="M696 480H328c-4.4 0-8 3.6-8 8v48c0 4.4 3.6 8 8 8h368c4.4 0 8-3.6 8-8v-48c0-4.4-3.6-8-8-8z"></path><path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z"></path></svg>
    </template>
    stop
  </Tag>
</Space>

::: details Show Code

```vue
<template>
  <Divider orientation="left">Without icon</Divider>
  <Space>
    <Tag color="success">success</Tag>
    <Tag color="processing">processing</Tag>
    <Tag color="error">error</Tag>
    <Tag color="warning">warning</Tag>
    <Tag color="default">default</Tag>
  </Space>
  <Divider orientation="left">With icon</Divider>
  <Space>
    <Tag color="success">
      <template #icon>
        <svg focusable="false" class="u-svg" data-icon="check-circle" width="1em" height="1em" fill="currentColor" aria-hidden="true" viewBox="64 64 896 896"><path d="M699 353h-46.9c-10.2 0-19.9 4.9-25.9 13.3L469 584.3l-71.2-98.8c-6-8.3-15.6-13.3-25.9-13.3H325c-6.5 0-10.3 7.4-6.5 12.7l124.6 172.8a31.8 31.8 0 0051.7 0l210.6-292c3.9-5.3.1-12.7-6.4-12.7z"></path><path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z"></path></svg>
      </template>
      success
    </Tag>
    <Tag color="processing">
      <template #icon>
        <svg focusable="false" class="u-spin" data-icon="sync" width="1em" height="1em" fill="currentColor" aria-hidden="true" viewBox="64 64 896 896"><path d="M168 504.2c1-43.7 10-86.1 26.9-126 17.3-41 42.1-77.7 73.7-109.4S337 212.3 378 195c42.4-17.9 87.4-27 133.9-27s91.5 9.1 133.8 27A341.5 341.5 0 01755 268.8c9.9 9.9 19.2 20.4 27.8 31.4l-60.2 47a8 8 0 003 14.1l175.7 43c5 1.2 9.9-2.6 9.9-7.7l.8-180.9c0-6.7-7.7-10.5-12.9-6.3l-56.4 44.1C765.8 155.1 646.2 92 511.8 92 282.7 92 96.3 275.6 92 503.8a8 8 0 008 8.2h60c4.4 0 7.9-3.5 8-7.8zm756 7.8h-60c-4.4 0-7.9 3.5-8 7.8-1 43.7-10 86.1-26.9 126-17.3 41-42.1 77.8-73.7 109.4A342.45 342.45 0 01512.1 856a342.24 342.24 0 01-243.2-100.8c-9.9-9.9-19.2-20.4-27.8-31.4l60.2-47a8 8 0 00-3-14.1l-175.7-43c-5-1.2-9.9 2.6-9.9 7.7l-.7 181c0 6.7 7.7 10.5 12.9 6.3l56.4-44.1C258.2 868.9 377.8 932 512.2 932c229.2 0 415.5-183.7 419.8-411.8a8 8 0 00-8-8.2z"></path></svg>
      </template>
      processing
    </Tag>
    <Tag color="error">
      <template #icon>
        <svg focusable="false" class="u-svg" data-icon="close-circle" width="1em" height="1em" fill="currentColor" aria-hidden="true" viewBox="64 64 896 896"><path d="M685.4 354.8c0-4.4-3.6-8-8-8l-66 .3L512 465.6l-99.3-118.4-66.1-.3c-4.4 0-8 3.5-8 8 0 1.9.7 3.7 1.9 5.2l130.1 155L340.5 670a8.32 8.32 0 00-1.9 5.2c0 4.4 3.6 8 8 8l66.1-.3L512 564.4l99.3 118.4 66 .3c4.4 0 8-3.5 8-8 0-1.9-.7-3.7-1.9-5.2L553.5 515l130.1-155c1.2-1.4 1.8-3.3 1.8-5.2z"></path><path d="M512 65C264.6 65 64 265.6 64 513s200.6 448 448 448 448-200.6 448-448S759.4 65 512 65zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z"></path></svg>
      </template>
      error
    </Tag>
    <Tag color="warning">
      <template #icon>
        <svg focusable="false" class="u-svg" data-icon="exclamation-circle" width="1em" height="1em" fill="currentColor" aria-hidden="true" viewBox="64 64 896 896"><path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z"></path><path d="M464 688a48 48 0 1096 0 48 48 0 10-96 0zm24-112h48c4.4 0 8-3.6 8-8V296c0-4.4-3.6-8-8-8h-48c-4.4 0-8 3.6-8 8v272c0 4.4 3.6 8 8 8z"></path></svg>
      </template>
      warning
    </Tag>
    <Tag color="default">
      <template #icon>
        <svg focusable="false" class="u-svg" data-icon="clock-circle" width="1em" height="1em" fill="currentColor" aria-hidden="true" viewBox="64 64 896 896"><path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z"></path><path d="M686.7 638.6L544.1 535.5V288c0-4.4-3.6-8-8-8H488c-4.4 0-8 3.6-8 8v275.4c0 2.6 1.2 5 3.3 6.5l165.4 120.6c3.6 2.6 8.6 1.8 11.2-1.7l28.6-39c2.6-3.7 1.8-8.7-1.8-11.2z"></path></svg>
      </template>
      waiting
    </Tag>
    <Tag color="default">
      <template #icon>
        <svg focusable="false" class="u-svg" data-icon="minus-circle" width="1em" height="1em" fill="currentColor" aria-hidden="true" viewBox="64 64 896 896"><path d="M696 480H328c-4.4 0-8 3.6-8 8v48c0 4.4 3.6 8 8 8h368c4.4 0 8-3.6 8-8v-48c0-4.4-3.6-8-8-8z"></path><path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z"></path></svg>
      </template>
      stop
    </Tag>
  </Space>
</template>
<style lang="less" scoped>
.u-svg {
  display: inline-block;
  line-height: 1;
}
.u-spin {
  display: inline-block;
  line-height: 1;
  -webkit-animation: loadingCircle 1s infinite linear;
  animation: loadingCircle 1s infinite linear;
  @keyframes loadingCircle {
    100% {
      -webkit-transform: rotate(360deg);
      transform: rotate(360deg);
    }
  }
}
</style>
```

:::

## 动态添加和删除

### 使用字符串格式数组

<br/>

<Space>
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
  <Space>
    <Tag dynamic v-model:value="strTags" @dynamic-close="onDynamicClose" />
  </Space>
</template>
```

:::

### 使用对象格式数组

<br/>

<Space>
  <Tag dynamic v-model:value="objTags" @dynamic-close="onDynamicClose">
    <template #default="{ label, index }">
      <template v-if="index===1">
        {{ label }} {{ index }}
      </template>
    </template>
    <template #icon="{ index }">
      <template v-if="index===0">
        <svg focusable="false" class="u-svg" data-icon="check-circle" width="1em" height="1em" fill="currentColor" aria-hidden="true" viewBox="64 64 896 896"><path d="M699 353h-46.9c-10.2 0-19.9 4.9-25.9 13.3L469 584.3l-71.2-98.8c-6-8.3-15.6-13.3-25.9-13.3H325c-6.5 0-10.3 7.4-6.5 12.7l124.6 172.8a31.8 31.8 0 0051.7 0l210.6-292c3.9-5.3.1-12.7-6.4-12.7z"></path><path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z"></path></svg>
      </template>
    </template>
  </Tag>
</Space>

::: details Show Code

```vue
<script setup lang="ts">
import { ref, watchEffect } from 'vue'

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
  <Space>
    <Tag dynamic v-model:value="objTags" @dynamic-close="onDynamicClose">
      <template #default="{ label, index }">
        <template v-if="index===1">
          {{ label }} {{ index }}
        </template>
      </template>
      <template #icon="{ index }">
        <template v-if="index===0">
          <svg focusable="false" class="u-svg" data-icon="check-circle" width="1em" height="1em" fill="currentColor" aria-hidden="true" viewBox="64 64 896 896"><path d="M699 353h-46.9c-10.2 0-19.9 4.9-25.9 13.3L469 584.3l-71.2-98.8c-6-8.3-15.6-13.3-25.9-13.3H325c-6.5 0-10.3 7.4-6.5 12.7l124.6 172.8a31.8 31.8 0 0051.7 0l210.6-292c3.9-5.3.1-12.7-6.4-12.7z"></path><path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z"></path></svg>
        </template>
      </template>
    </Tag>
  </Space>
</template>

<style lang="less" scoped>
.u-svg {
  display: inline-block;
  line-height: 1;
}
</style>
```

:::

## 三种尺寸

<Space>
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
  <Space>
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

## 自定义动态标签排列方式

<Tag
  space-direction="vertical"
  :space-size="12"
  color="blue"
  size="large"
  dynamic
  v-model:value="strTags"
  closable
  @close="onDynamicClose" />

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
    space-direction="vertical"
    :space-size="12"
    color="blue"
    size="large"
    dynamic
    v-model:value="strTags"
    closable
    @close="onDynamicClose" />
</template>
```

:::

<style lang="less" scoped>
.u-svg {
  display: inline-block;
  line-height: 1;
}
.u-spin {
  display: inline-block;
  line-height: 1;
  -webkit-animation: loadingCircle 1s infinite linear;
  animation: loadingCircle 1s infinite linear;
  @keyframes loadingCircle {
    100% {
      -webkit-transform: rotate(360deg);
      transform: rotate(360deg);
    }
  }
}
</style>

## APIs

参数 | 说明 | 类型 | 默认值 | 必传
-- | -- | -- | -- | --
closable | 标签是否可以关闭 | boolean | false | false
color | 标签颜色，预置多种常用颜色：`'success'`, `'processing'`, `'error'`, `'warning'`, `'pink'`, `'red'`, `'yellow'`, `'orange'`, `'cyan'`, `'green'`, `'blue'`, `'purple'`, `'geekblue'`, `'magenta'`, `'volcano'`, `'gold'`, `'lime'` | string | '' | false
icon | 设置图标 | string &#124; slot | '' | false
size | 标签尺寸 | 'small' &#124; 'middle' &#124; 'large' | 'middle' | false
dynamic | 是否启用标签动态添加和删除 | boolean | false | false
value <Tag color="cyan">v-model</Tag> | 动态标签数组，`dynamic` 为 `true` 时生效 | string[] &#124; Tag[] | [] | false
spaceWidth | 间距区域总宽度 | string &#124; number | 'auto' | false
spaceAlign | 垂直排列方式 | 'stretch' &#124; 'start' &#124; 'end' &#124; 'center' &#124; 'baseline' | 'start' | false
spaceDirection | 间距方向 | 'horizontal' &#124; 'vertical' | 'horizontal' | false
spaceSize | 间距大小，数组时表示: `[水平间距, 垂直间距]` | number &#124; number[] &#124; 'small' &#124; 'middle' &#124; 'large' | 'small' | false

## Tag Type

名称 | 说明 | 类型 | 必传
-- | -- | -- | --
label | 标签文本名 | string &#124; slot | false
closable | 标签是否可以关闭，默认 `true` | boolean | false
color | 标签颜色 | string | false
icon | 设置图标 | string &#124; slot | false
size | 标签尺寸 | 'small' &#124; 'middle' &#124; 'large' | false

## Events

事件名称 | 说明 | 参数
-- | -- | --
close | 关闭时的回调 | (e: Event) => void
dynamicClose | 启用标签动态添加和删除时关闭的回调 | (tag: Tag, index: number) => void
