# 标签 Tag

<GlobalElement />

_进行标记和分类的小标签_

## 何时使用

- 用于标记事物的属性和维度
- 进行分类

<script setup lang="ts">
import { ref } from 'vue'
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
import type { TagItem } from 'vue-amazing-ui'
const onClose = (e: MouseEvent) => {
  console.log('e', e)
}
// 可选择标签：每个标签各自独立受控，操作任一标签不联动其余标签
const checkableOptions = ['Movies', 'Books', 'Music', 'Sports']
const checkableTags = ref([false, true, false, false])
const onCheckableChange = (tag: string, checked: boolean) => {
  console.log(tag, checked)
}
// 动态添加和删除：字符串数组与对象数组分别独立绑定
const dynamicTags = ref<string[]>(['天空', '大海', '湖泊'])
const objTags = ref<TagItem[]>([
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
const onDynamicClose = (item: TagItem, index: number) => {
  console.log('item', item)
  console.log('index', index)
}
// 热门标签：选中项汇总为父侧集合，标签只上报变更，结果实时回显
const hotTags = ['Movies', 'Books', 'Music', 'Sports']
const selectedTags = ref<string[]>([])
const onHotTagChange = (tag: string, checked: boolean) => {
  selectedTags.value = checked ? [...selectedTags.value, tag] : selectedTags.value.filter((value) => value !== tag)
}
const sizeTags = ref<string[]>(['天空', '大海', '湖泊'])
const customLayoutTags = ref<string[]>(['天空', '大海', '湖泊'])
</script>

## 基本用法

<Space gap="small">
  <Tag>Tag 1</Tag>
  <Tag><a href="https://themusecatcher.blog.csdn.net">Link</a></Tag>
  <Tag closable @close="onClose">Tag 2</Tag>
  <Tag closable @close.prevent>Prevent Default</Tag>
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
    <Tag><a href="https://themusecatcher.blog.csdn.net">Link</a></Tag>
    <Tag closable @close="onClose">Tag 2</Tag>
    <Tag closable @close.prevent>Prevent Default</Tag>
  </Space>
</template>
```

:::

## 可选择标签

_通过 `CheckableTag` 实现类似 Checkbox 的效果，点击切换选中状态。_

<br/>

<Space gap="small" align="center">
  <span>Categories:</span>
  <CheckableTag
    v-for="(tag, index) in checkableOptions"
    :key="tag"
    v-model:checked="checkableTags[index]"
    @change="(checked: boolean) => onCheckableChange(tag, checked)"
  >
    {{ tag }}
  </CheckableTag>
</Space>

::: details Show Code

```vue
<script setup lang="ts">
import { ref } from 'vue'
const checkableOptions = ['Movies', 'Books', 'Music', 'Sports']
const checkableTags = ref([false, true, false, false])
const onCheckableChange = (tag: string, checked: boolean) => {
  console.log(tag, checked)
}
</script>
<template>
  <Space gap="small" align="center">
    <span>Categories:</span>
    <CheckableTag
      v-for="(tag, index) in checkableOptions"
      :key="tag"
      v-model:checked="checkableTags[index]"
      @change="(checked: boolean) => onCheckableChange(tag, checked)"
    >
      {{ tag }}
    </CheckableTag>
  </Space>
</template>
```

:::

## 多彩标签

_预设色板覆盖常用场景；预设值不满足需求时可直接传具体色值。_

<br/>

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
  <Tag color="pink-inverse">pink-inverse</Tag>
  <Tag color="blue-inverse">blue-inverse</Tag>
  <Tag color="green-inverse">green-inverse</Tag>
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
    <Tag color="pink-inverse">pink-inverse</Tag>
    <Tag color="blue-inverse">blue-inverse</Tag>
    <Tag color="green-inverse">green-inverse</Tag>
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

## 动态添加和删除

_使用字符串格式数组_

<br/>

<Tag dynamic v-model:value="dynamicTags" @dynamic-close="onDynamicClose" />

::: details Show Code

```vue
<script setup lang="ts">
import { ref, watchEffect } from 'vue'
import type { TagItem } from 'vue-amazing-ui'
const strTags = ref<string[]>(['天空', '大海', '湖泊'])
watchEffect(() => {
  console.log('strTags', strTags.value)
})
const onDynamicClose = (item: TagItem, index: number) => {
  console.log('item', item)
  console.log('index', index)
}
</script>
<template>
  <Tag dynamic v-model:value="strTags" @dynamic-close="onDynamicClose" />
</template>
```

:::

_使用对象格式数组，配合 `label` / `icon` 插槽自定义单项内容_

<br/>

<Tag dynamic v-model:value="objTags" @dynamic-close="onDynamicClose">
  <template #label="{ label, index }">
    <template v-if="index === 1">
      {{ label }} {{ index }}
    </template>
    <template v-else>
      {{ label }}
    </template>
  </template>
  <template #icon="{ index }">
    <template v-if="index === 0">
      <CheckCircleOutlined />
    </template>
  </template>
</Tag>

::: details Show Code

```vue
<script setup lang="ts">
import { ref, watchEffect } from 'vue'
import { CheckCircleOutlined } from '@ant-design/icons-vue'
import type { TagItem } from 'vue-amazing-ui'
const objTags = ref<TagItem[]>([
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
const onDynamicClose = (item: TagItem, index: number) => {
  console.log('item', item)
  console.log('index', index)
}
</script>
<template>
  <Tag dynamic v-model:value="objTags" @dynamic-close="onDynamicClose">
    <template #label="{ label, index }">
      <template v-if="index === 1">
        {{ label }} {{ index }}
      </template>
      <template v-else>
        {{ label }}
      </template>
    </template>
    <template #icon="{ index }">
      <template v-if="index === 0">
        <CheckCircleOutlined />
      </template>
    </template>
  </Tag>
</template>
```

:::

## 热门标签

_选择你感兴趣的话题，选中项汇总成集合实时回显（与「可选择标签」的独立受控不同）。_

<br/>

<Space gap="small" align="center">
  <span>Categories:</span>
  <CheckableTag
    v-for="tag in hotTags"
    :key="tag"
    :checked="selectedTags.includes(tag)"
    @change="(checked: boolean) => onHotTagChange(tag, checked)"
  >
    {{ tag }}
  </CheckableTag>
</Space>
<p>已选话题：{{ selectedTags.length ? selectedTags.join('、') : '暂无' }}</p>

::: details Show Code

```vue
<script setup lang="ts">
import { ref } from 'vue'
const hotTags = ['Movies', 'Books', 'Music', 'Sports']
const selectedTags = ref<string[]>([])
const onHotTagChange = (tag: string, checked: boolean) => {
  selectedTags.value = checked ? [...selectedTags.value, tag] : selectedTags.value.filter(value => value !== tag)
}
</script>
<template>
  <Space gap="small" align="center">
    <span>Categories:</span>
    <CheckableTag
      v-for="tag in hotTags"
      :key="tag"
      :checked="selectedTags.includes(tag)"
      @change="(checked: boolean) => onHotTagChange(tag, checked)"
    >
      {{ tag }}
    </CheckableTag>
  </Space>
  <p>已选话题：{{ selectedTags.length ? selectedTags.join('、') : '暂无' }}</p>
</template>
```

:::

## 图标按钮

_设置 `icon` 属性或在 `icon` 插槽内放置图标。_

<br/>

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
  <Tag color="processing" icon="😉">emoji</Tag>
</Space>

::: details Show Code

```vue
<script setup lang="ts">
import { AppleOutlined, TwitterOutlined, YoutubeOutlined, InstagramOutlined } from '@ant-design/icons-vue'
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
    <Tag color="processing" icon="😉">emoji</Tag>
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

## 三种尺寸

<Space gap="small" align="center">
  <Tag size="small" closable @close="onClose">爱在西元前</Tag>
  <Tag color="warning" closable @close="onClose">超人不会飞</Tag>
  <Tag color="blue" size="large" dynamic v-model:value="sizeTags" @dynamic-close="onDynamicClose" />
</Space>

::: details Show Code

```vue
<script setup lang="ts">
import { ref, watchEffect } from 'vue'
import type { TagItem } from 'vue-amazing-ui'
const strTags = ref<string[]>(['天空', '大海', '湖泊'])
watchEffect(() => {
  console.log('strTags', strTags.value)
})
const onClose = (e: MouseEvent) => {
  console.log('e', e)
}
const onDynamicClose = (item: TagItem, index: number) => {
  console.log('item', item)
  console.log('index', index)
}
</script>
<template>
  <Space gap="small" align="center">
    <Tag size="small" closable @close="onClose">爱在西元前</Tag>
    <Tag color="warning" closable @close="onClose">超人不会飞</Tag>
    <Tag color="blue" size="large" dynamic v-model:value="strTags" @dynamic-close="onDynamicClose" />
  </Space>
</template>
```

:::

## 自定义动态标签排列

_通过 `spaceProps` 配置标签组的排列方式，`Space` 支持的全部配置均可透传_

<br/>

<Tag dynamic color="blue" size="large" :space-props="{ vertical: true, gap: 12 }" v-model:value="customLayoutTags" @dynamic-close="onDynamicClose" />

::: details Show Code

```vue
<script setup lang="ts">
import { ref } from 'vue'
import type { TagItem } from 'vue-amazing-ui'
const strTags = ref<string[]>(['天空', '大海', '湖泊'])
const onDynamicClose = (item: TagItem, index: number) => {
  console.log(item, index)
}
</script>
<template>
  <Tag
    dynamic
    color="blue"
    size="large"
    :space-props="{ vertical: true, gap: 12 }"
    v-model:value="strTags"
    @dynamic-close="onDynamicClose"
  />
</template>
```

:::

## 自定义配色

_对象形式可分别指定背景、文字与边框色，适合浅色底等需要自定义文字色的场景_

<br/>

<Space gap="small">
  <Tag :color="{ color: '#f0f0f0', textColor: '#333333', borderColor: '#d9d9d9' }">浅色底</Tag>
  <Tag :color="{ color: '#ffe7ba', textColor: '#ad4e00' }">文字色独立</Tag>
  <Tag :color="{ textColor: '#1677ff', borderColor: '#1677ff' }">仅文字与边框</Tag>
</Space>

::: details Show Code

```vue
<template>
  <Space gap="small">
    <Tag :color="{ color: '#f0f0f0', textColor: '#333333', borderColor: '#d9d9d9' }">浅色底</Tag>
    <Tag :color="{ color: '#ffe7ba', textColor: '#ad4e00' }">文字色独立</Tag>
    <Tag :color="{ textColor: '#1677ff', borderColor: '#1677ff' }">仅文字与边框</Tag>
  </Space>
</template>
```

:::

## 禁用

_禁用后不再响应点击与关闭，可选择标签也不再切换选中态_

<br/>

<Space gap="small">
  <Tag disabled>不可点击</Tag>
  <Tag disabled closable>不可关闭</Tag>
  <Tag disabled color="success">success</Tag>
  <CheckableTag disabled>不可选择</CheckableTag>
  <CheckableTag disabled checked>已选中且禁用</CheckableTag>
</Space>

::: details Show Code

```vue
<template>
  <Space gap="small">
    <Tag disabled>不可点击</Tag>
    <Tag disabled closable>不可关闭</Tag>
    <Tag disabled color="success">success</Tag>
    <CheckableTag disabled>不可选择</CheckableTag>
    <CheckableTag disabled checked>已选中且禁用</CheckableTag>
  </Space>
</template>
```

:::

## 圆角

<Space gap="small">
  <Tag round>圆角标签</Tag>
  <Tag round color="processing">processing</Tag>
  <Tag round closable>可关闭</Tag>
  <CheckableTag round checked>可选</CheckableTag>
</Space>

::: details Show Code

```vue
<template>
  <Space gap="small">
    <Tag round>圆角标签</Tag>
    <Tag round color="processing">processing</Tag>
    <Tag round closable>可关闭</Tag>
    <CheckableTag round checked>可选</CheckableTag>
  </Space>
</template>
```

:::

## APIs

### Tag Props

| 名称 | 说明 | 类型 | 默认值 |
| :-- | :-- | :-- | :-- |
| value <Tag color="cyan">v-model</Tag> | 动态标签数组，仅当 `dynamic: true` 时生效；数组形态按首项类型判定，空数组时新增按对象项（`TagItem`）处理 | string[] &#124; [TagItem](#tagitem-type)[] | [] |
| icon | 设置图标，支持字符串 / VNode / 渲染函数；插槽形态请用 `#icon` | string &#124; VNode &#124; (() => VNode) | undefined |
| closeIcon | 自定义关闭图标，支持字符串 / VNode / 渲染函数；插槽形态请用 `#closeIcon` | string &#124; VNode &#124; (() => VNode) | undefined |
| color | 标签颜色。预置色板：`'pink'`, `'red'`, `'yellow'`, `'orange'`, `'cyan'`, `'green'`, `'blue'`, `'purple'`, `'geekblue'`, `'magenta'`, `'volcano'`, `'gold'`, `'lime'`；状态色：`'success'`, `'processing'`, `'error'`, `'warning'`, `'default'`；色板色支持 `-inverse` 深色底变体（如 `'pink-inverse'`）；也可传具体色值，或用 [TagColor](#tagcolor-type) 分别指定背景、文字与边框色 | string &#124; [TagColor](#tagcolor-type) | undefined |
| size | 标签尺寸 | 'small' &#124; 'middle' &#124; 'large' | 'middle' |
| round | 是否圆角胶囊形 | boolean | false |
| bordered | 是否有边框 | boolean | true |
| disabled | 是否禁用，禁用后不响应点击与关闭 | boolean | false |
| closable | 标签是否可以关闭 | boolean | false |
| dynamic | 是否启用标签动态添加和删除 | boolean | false |
| triggerClickOnClose | 点击关闭按钮时是否同时触发标签的 `click` | boolean | false |
| spaceProps | `Space` 组件属性配置，参考 [Space Props](./space.md#space-props) ，仅当 `dynamic: true` 时生效 | [SpaceProps](./space.md#space-props) | {} |

### TagColor Type

| 名称 | 说明 | 类型 |
| :-- | :-- | :-- |
| color? | 背景色 | string |
| textColor? | 文字色，同时作用于关闭图标 | string |
| borderColor? | 边框色 | string |

### TagItem Type

| 名称 | 说明 | 类型 |
| :-- | :-- | :-- |
| label? | 标签文本 | string |
| closable? | 标签是否可以关闭，默认 `true` | boolean |
| color? | 标签颜色 | string |
| icon? | 设置图标，支持字符串 / VNode / 渲染函数 | string &#124; VNode &#124; (() => VNode) |
| size? | 标签尺寸，默认 `'middle'` | 'small' &#124; 'middle' &#124; 'large' |
| bordered? | 是否有边框，默认取组件的 `bordered` | boolean |
| disabled? | 是否禁用，默认取组件的 `disabled` | boolean |

### CheckableTag Props

| 名称 | 说明 | 类型 | 默认值 |
| :-- | :-- | :-- | :-- |
| checked <Tag color="cyan">v-model</Tag> | 是否选中，未传时按非受控处理（初值 `false`） | boolean | undefined |
| disabled | 是否禁用，禁用后不响应点击与选中切换 | boolean | false |

> **属性透传**：`round` / `size` 等 `Tag` 的属性可直接写在 `CheckableTag` 上，会透传给内部的 `Tag`。

## Slots

`Tag` 的插槽如下；`CheckableTag` 只支持默认插槽。

| 名称 | 说明 | 用法 |
| :-- | :-- | :-- |
| icon | 自定义图标 | v-slot:icon="{ item, icon, index }" |
| closeIcon | 自定义关闭图标 | v-slot:closeIcon="{ item, index }" |
| label | 自定义标签文本 | v-slot:label="{ item, label, index }" |
| default | 自定义内容 | v-slot:default |

## Events

| 名称 | 说明 | 类型 |
| :-- | :-- | :-- |
| close | 关闭时的回调，调用 `event.preventDefault()` 可阻止关闭（动态标签组下为不从数组中移除） | (e: MouseEvent) => void |
| click | 点击标签时的回调，`CheckableTag` 同样派发 | (e: MouseEvent) => void |
| dynamicClose | 启用标签动态添加和删除时关闭的回调 | (item: [TagItem](#tagitem-type), index: number) => void |
| change | `CheckableTag` 选中状态变化时的回调 | (checked: boolean) => void |
