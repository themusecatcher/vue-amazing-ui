# 列表 List

<BackTop />
<Watermark fullscreen content="Vue Amazing UI" />

<br/>

*通用列表*

## 何时使用

- 最基础的列表展示，可承载文字、列表、图片、段落，链接等

<script setup lang="ts">
import { ref, reactive } from 'vue'
const listData = ref([
  {
    title: 'Vue Amazing UI Title 1',
    description: 'Vue Amazing UI, An Amazing Vue3 UI Components Library.',
    content: 'content'
  },
  {
    title: 'Vue Amazing UI Title 2',
    description: 'Vue Amazing UI, An Amazing Vue3 UI Components Library.',
    content: 'content'
  },
  {
    title: 'Vue Amazing UI Title 3',
    description: 'Vue Amazing UI, An Amazing Vue3 UI Components Library.',
    content: 'content'
  },
  {
    title: 'Vue Amazing UI Title 4',
    description: 'Vue Amazing UI, An Amazing Vue3 UI Components Library.',
    content: 'content'
  }
])
const bordered = ref(true)
const simpleList = ref([
  'Vue Amazing UI is developed using TypeScript',
  'An Amazing Vue3 UI Components Library',
  'Streamline web development with Vue Amazing UI',
  'Incredible Vue components for modern web design',
  'Transform your Vue interface with Vue Amazing UI'
])
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
const size = ref('middle')
const loading = ref(true)
const allListData = ref<any[]>([])
for (let i = 1; i <= 8; i++) {
  allListData.value.push({
    href: 'https://themusecatcher.github.io/vue-amazing-ui/',
    title: `Vue Amazing UI part ${i}`,
    avatar: 'https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.0.5/1.jpg',
    description: 'Vue Amazing UI, An Amazing Vue3 UI Components Library.',
    content:
      'Vue Amazing UI supplies streamline web development, incredible Vue components for modern web design and transform your Vue interface completely.'
  })
}
const paginationListData = ref<any[]>([])
paginationListData.value = allListData.value.slice(0, 3)
const pagination = {
  page: 1,
  pageSize: 3,
  total: 8,
  onChange: (page: number, pageSize: number) => {
    console.log('change page', page)
    console.log('change pageSize', pageSize)
    const start = (page - 1) * pageSize + 1
    const end = page * pageSize > 8 ? 8 : page * pageSize
    paginationListData.value = allListData.value.slice(start - 1, end)
  }
}
const allConfigListData = ref<ang[]>([])
for (let i = 1; i <= 30; i++) {
  allConfigListData.value.push({
    href: 'https://themusecatcher.github.io/vue-amazing-ui/',
    title: `Vue Amazing UI Title ${i}`,
    description: 'Vue Amazing UI, An Amazing Vue3 UI Components Library.',
    content: 'Incredible Vue components for modern web design'
  })
}
const configListData = ref<any[]>([])
configListData.value = allConfigListData.value.slice(0, 5)
const state = reactive({
  bordered: true,
  vertical: false,
  split: true,
  size: 'middle',
  loading: false,
  hoverable: true,
  header: 'list header',
  footer: 'list footer',
  extra: 'extra',
  showPagination: true,
  pagination: {
    page: 1,
    pageSize: 5,
    total: 30,
    showTotal: (total: number, range: number[]) => `${range[0]}-${range[1]} of ${total} items`,
    showSizeChanger: true,
    showQuickJumper: true,
    onChange: (page: number, pageSize: number) => {
      console.log('change page', page)
      console.log('change pageSize', pageSize)
      const start = (page - 1) * pageSize + 1
      const end = page * pageSize > state.pagination.total ? state.pagination.total : page * pageSize
      configListData.value = allConfigListData.value.slice(start - 1, end)
    }
  }
})
</script>

## 基本使用

<List>
  <ListItem v-for="(data, index) in listData" :key="index" :title="data.title">
    <template #avatar>
      <Avatar src="https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.0.5/1.jpg" />
    </template>
    <template #description>
      {{ data.description }}
    </template>
  </ListItem>
</List>

::: details Show Code

```vue
<script setup lang="ts">
import { ref } from 'vue'

const listData = ref([
  {
    title: 'Vue Amazing UI Title 1',
    description: 'Vue Amazing UI, An Amazing Vue3 UI Components Library.',
    content: 'content'
  },
  {
    title: 'Vue Amazing UI Title 2',
    description: 'Vue Amazing UI, An Amazing Vue3 UI Components Library.',
    content: 'content'
  },
  {
    title: 'Vue Amazing UI Title 3',
    description: 'Vue Amazing UI, An Amazing Vue3 UI Components Library.',
    content: 'content'
  },
  {
    title: 'Vue Amazing UI Title 4',
    description: 'Vue Amazing UI, An Amazing Vue3 UI Components Library.',
    content: 'content'
  }
])
</script>
<template>
  <List>
    <ListItem v-for="(data, index) in listData" :key="index" :title="data.title">
      <template #avatar>
        <Avatar src="https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.0.5/1.jpg" />
      </template>
      <template #description>
        {{ data.description }}
      </template>
    </ListItem>
  </List>
</template>
```

:::

## 隐藏分割线

<List :split="false">
  <ListItem v-for="(data, index) in listData" :key="index" :title="data.title">
    <template #avatar>
      <Avatar src="https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.0.5/1.jpg" />
    </template>
    <template #description>
      {{ data.description }}
    </template>
  </ListItem>
</List>

::: details Show Code

```vue
<script setup lang="ts">
import { ref } from 'vue'

const listData = ref([
  {
    title: 'Vue Amazing UI Title 1',
    description: 'Vue Amazing UI, An Amazing Vue3 UI Components Library.',
    content: 'content'
  },
  {
    title: 'Vue Amazing UI Title 2',
    description: 'Vue Amazing UI, An Amazing Vue3 UI Components Library.',
    content: 'content'
  },
  {
    title: 'Vue Amazing UI Title 3',
    description: 'Vue Amazing UI, An Amazing Vue3 UI Components Library.',
    content: 'content'
  },
  {
    title: 'Vue Amazing UI Title 4',
    description: 'Vue Amazing UI, An Amazing Vue3 UI Components Library.',
    content: 'content'
  }
])
</script>
<template>
  <List :split="false">
    <ListItem v-for="(data, index) in listData" :key="index" :title="data.title">
      <template #avatar>
        <Avatar src="https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.0.5/1.jpg" />
      </template>
      <template #description>
        {{ data.description }}
      </template>
    </ListItem>
  </List>
</template>
```

:::

## 带边框列表

<Flex vertical>
  <Space>
    <Switch v-model="bordered" />
  </Space>
  <List :bordered="bordered">
    <template #header>
      <div>Header</div>
    </template>
    <ListItem v-for="(data, index) in listData" :key="index" :title="data.title">
      <template #avatar>
        <Avatar src="https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.0.5/1.jpg" />
      </template>
      <template #description>
        {{ data.description }}
      </template>
    </ListItem>
    <template #footer>
      <div>Footer</div>
    </template>
  </List>
</Flex>

::: details Show Code

```vue
<script setup lang="ts">
import { ref } from 'vue'

const listData = ref([
  {
    title: 'Vue Amazing UI Title 1',
    description: 'Vue Amazing UI, An Amazing Vue3 UI Components Library.',
    content: 'content'
  },
  {
    title: 'Vue Amazing UI Title 2',
    description: 'Vue Amazing UI, An Amazing Vue3 UI Components Library.',
    content: 'content'
  },
  {
    title: 'Vue Amazing UI Title 3',
    description: 'Vue Amazing UI, An Amazing Vue3 UI Components Library.',
    content: 'content'
  },
  {
    title: 'Vue Amazing UI Title 4',
    description: 'Vue Amazing UI, An Amazing Vue3 UI Components Library.',
    content: 'content'
  }
])
const bordered = ref(true)
</script>
<template>
  <Flex vertical>
    <Space>
      <Switch v-model="bordered" />
    </Space>
    <List :bordered="bordered">
      <template #header>
        <div>Header</div>
      </template>
      <ListItem v-for="(data, index) in listData" :key="index" :title="data.title">
        <template #avatar>
          <Avatar src="https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.0.5/1.jpg" />
        </template>
        <template #description>
          {{ data.description }}
        </template>
      </ListItem>
      <template #footer>
        <div>Footer</div>
      </template>
    </List>
  </Flex>
</template>
```

:::

## 三种尺寸

<Flex vertical>
  <Radio :options="sizeOptions" v-model:value="size" button button-style="solid" />
  <Row :gutter="32">
    <Col :span="12">
      <List bordered :size="size">
        <ListItem v-for="(data, index) in listData" :key="index">
          <template #avatar>
            <Avatar src="https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.0.5/1.jpg" />
          </template>
          <template #title>
            <a href="https://themusecatcher.github.io/vue-amazing-ui/">{{ data.title }}</a>
          </template>
          <template #description>
            {{ data.description }}
          </template>
        </ListItem>
      </List>
    </Col>
    <Col :span="12">
      <List bordered :size="size">
        <template #header>
          <div>Header</div>
        </template>
        <ListItem v-for="(data, index) in simpleList" :key="index">
          {{ data }}
        </ListItem>
        <template #footer>
          <div>Footer</div>
        </template>
      </List>
    </Col>
  </Row>
</Flex>

::: details Show Code

```vue
<script setup lang="ts">
import { ref } from 'vue'

const listData = ref([
  {
    title: 'Vue Amazing UI Title 1',
    description: 'Vue Amazing UI, An Amazing Vue3 UI Components Library.',
    content: 'content'
  },
  {
    title: 'Vue Amazing UI Title 2',
    description: 'Vue Amazing UI, An Amazing Vue3 UI Components Library.',
    content: 'content'
  },
  {
    title: 'Vue Amazing UI Title 3',
    description: 'Vue Amazing UI, An Amazing Vue3 UI Components Library.',
    content: 'content'
  },
  {
    title: 'Vue Amazing UI Title 4',
    description: 'Vue Amazing UI, An Amazing Vue3 UI Components Library.',
    content: 'content'
  }
])
const simpleList = ref([
  'Vue Amazing UI is developed using TypeScript',
  'An Amazing Vue3 UI Components Library',
  'Streamline web development with Vue Amazing UI',
  'Incredible Vue components for modern web design',
  'Transform your Vue interface with Vue Amazing UI'
])
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
const size = ref('middle')
</script>
<template>
  <Flex vertical>
    <Radio :options="sizeOptions" v-model:value="size" button button-style="solid" />
    <Row :gutter="32">
      <Col :span="12">
        <List bordered :size="size">
          <ListItem v-for="(data, index) in listData" :key="index">
            <template #avatar>
              <Avatar src="https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.0.5/1.jpg" />
            </template>
            <template #title>
              <a href="https://themusecatcher.github.io/vue-amazing-ui/">{{ data.title }}</a>
            </template>
            <template #description>
              {{ data.description }}
            </template>
          </ListItem>
        </List>
      </Col>
      <Col :span="12">
        <List bordered :size="size">
          <template #header>
            <div>Header</div>
          </template>
          <ListItem v-for="(data, index) in simpleList" :key="index">
            {{ data }}
          </ListItem>
          <template #footer>
            <div>Footer</div>
          </template>
        </List>
      </Col>
    </Row>
  </Flex>
</template>
```

:::

## 加载中

<Flex vertical>
  <Space> Loading state:<Switch v-model="loading" /> </Space>
  <Row :gutter="32">
    <Col :span="12">
      <List bordered :loading="loading">
        <ListItem v-for="(data, index) in listData" :key="index" :title="data.title">
          <template #avatar>
            <Avatar src="https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.0.5/1.jpg" />
          </template>
          <template #description>
            {{ data.description }}
          </template>
        </ListItem>
      </List>
    </Col>
    <Col :span="12">
      <List bordered :loading="loading" :spin-props="{ indicator: 'dynamic-circle' }">
        <template #header>
          <div>Header</div>
        </template>
        <ListItem v-for="(data, index) in simpleList" :key="index">
          {{ data }}
        </ListItem>
        <template #footer>
          <div>Footer</div>
        </template>
      </List>
    </Col>
  </Row>
</Flex>

::: details Show Code

```vue
<script setup lang="ts">
import { ref } from 'vue'

const listData = ref([
  {
    title: 'Vue Amazing UI Title 1',
    description: 'Vue Amazing UI, An Amazing Vue3 UI Components Library.',
    content: 'content'
  },
  {
    title: 'Vue Amazing UI Title 2',
    description: 'Vue Amazing UI, An Amazing Vue3 UI Components Library.',
    content: 'content'
  },
  {
    title: 'Vue Amazing UI Title 3',
    description: 'Vue Amazing UI, An Amazing Vue3 UI Components Library.',
    content: 'content'
  },
  {
    title: 'Vue Amazing UI Title 4',
    description: 'Vue Amazing UI, An Amazing Vue3 UI Components Library.',
    content: 'content'
  }
])
const simpleList = ref([
  'Vue Amazing UI is developed using TypeScript',
  'An Amazing Vue3 UI Components Library',
  'Streamline web development with Vue Amazing UI',
  'Incredible Vue components for modern web design',
  'Transform your Vue interface with Vue Amazing UI'
])
const loading = ref(true)
</script>
<template>
  <Flex vertical>
    <Space> Loading state:<Switch v-model="loading" /> </Space>
    <Row :gutter="32">
      <Col :span="12">
        <List bordered :loading="loading">
          <ListItem v-for="(data, index) in listData" :key="index" :title="data.title">
            <template #avatar>
              <Avatar src="https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.0.5/1.jpg" />
            </template>
            <template #description>
              {{ data.description }}
            </template>
          </ListItem>
        </List>
      </Col>
      <Col :span="12">
        <List bordered :loading="loading" :spin-props="{ indicator: 'dynamic-circle' }">
          <template #header>
            <div>Header</div>
          </template>
          <ListItem v-for="(data, index) in simpleList" :key="index">
            {{ data }}
          </ListItem>
          <template #footer>
            <div>Footer</div>
          </template>
        </List>
      </Col>
    </Row>
  </Flex>
</template>
```

:::

## 暂无数据

<List>
  <ListItem v-for="(data, index) in []" :key="index"></ListItem>
</List>

::: details Show Code

```vue
<template>
  <List>
    <ListItem v-for="(data, index) in []" :key="index"></ListItem>
  </List>
</template>
```

:::

## 显示悬浮样式

<Row :gutter="32">
  <Col :span="12">
    <List bordered hoverable>
      <ListItem v-for="(data, index) in listData" :key="index" :title="data.title">
        <template #avatar>
          <Avatar src="https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.0.5/1.jpg" />
        </template>
        <template #description>
          {{ data.description }}
        </template>
      </ListItem>
    </List>
  </Col>
  <Col :span="12">
    <List bordered hoverable>
      <template #header>
        <div>Header</div>
      </template>
      <ListItem v-for="(data, index) in simpleList" :key="index">
        {{ data }}
      </ListItem>
      <template #footer>
        <div>Footer</div>
      </template>
    </List>
  </Col>
</Row>

::: details Show Code

```vue
<script setup lang="ts">
import { ref } from 'vue'

const listData = ref([
  {
    title: 'Vue Amazing UI Title 1',
    description: 'Vue Amazing UI, An Amazing Vue3 UI Components Library.',
    content: 'content'
  },
  {
    title: 'Vue Amazing UI Title 2',
    description: 'Vue Amazing UI, An Amazing Vue3 UI Components Library.',
    content: 'content'
  },
  {
    title: 'Vue Amazing UI Title 3',
    description: 'Vue Amazing UI, An Amazing Vue3 UI Components Library.',
    content: 'content'
  },
  {
    title: 'Vue Amazing UI Title 4',
    description: 'Vue Amazing UI, An Amazing Vue3 UI Components Library.',
    content: 'content'
  }
])
const simpleList = ref([
  'Vue Amazing UI is developed using TypeScript',
  'An Amazing Vue3 UI Components Library',
  'Streamline web development with Vue Amazing UI',
  'Incredible Vue components for modern web design',
  'Transform your Vue interface with Vue Amazing UI'
])
</script>
<template>
  <Row :gutter="32">
    <Col :span="12">
      <List bordered hoverable>
        <ListItem v-for="(data, index) in listData" :key="index" :title="data.title">
          <template #avatar>
            <Avatar src="https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.0.5/1.jpg" />
          </template>
          <template #description>
            {{ data.description }}
          </template>
        </ListItem>
      </List>
    </Col>
    <Col :span="12">
      <List bordered hoverable>
        <template #header>
          <div>Header</div>
        </template>
        <ListItem v-for="(data, index) in simpleList" :key="index">
          {{ data }}
        </ListItem>
        <template #footer>
          <div>Footer</div>
        </template>
      </List>
    </Col>
  </Row>
</template>
```

:::

## 列表添加操作项

<List>
  <ListItem v-for="(data, index) in listData" :key="index" :title="data.title">
    <template #avatar>
      <Avatar src="https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.0.5/1.jpg" />
    </template>
    <template #description>
      {{ data.description }}
    </template>
    {{ data.content }}
    <template #actions>
      <a>edit</a>
      <a>more</a>
    </template>
  </ListItem>
</List>

::: details Show Code

```vue
<script setup lang="ts">
import { ref } from 'vue'

const listData = ref([
  {
    title: 'Vue Amazing UI Title 1',
    description: 'Vue Amazing UI, An Amazing Vue3 UI Components Library.',
    content: 'content'
  },
  {
    title: 'Vue Amazing UI Title 2',
    description: 'Vue Amazing UI, An Amazing Vue3 UI Components Library.',
    content: 'content'
  },
  {
    title: 'Vue Amazing UI Title 3',
    description: 'Vue Amazing UI, An Amazing Vue3 UI Components Library.',
    content: 'content'
  },
  {
    title: 'Vue Amazing UI Title 4',
    description: 'Vue Amazing UI, An Amazing Vue3 UI Components Library.',
    content: 'content'
  }
])
</script>
<template>
  <List>
    <ListItem v-for="(data, index) in listData" :key="index" :title="data.title">
      <template #avatar>
        <Avatar src="https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.0.5/1.jpg" />
      </template>
      <template #description>
        {{ data.description }}
      </template>
      {{ data.content }}
      <template #actions>
        <a>edit</a>
        <a>more</a>
      </template>
    </ListItem>
  </List>
</template>
```

:::

## 自定义样式

<List>
  <ListItem
    :avatar-props="{
      src: 'https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.0.5/1.jpg',
      size: 60
    }"
    :avatar-style="{ alignSelf: 'center' }"
    :title-style="{ fontSize: '20px' }"
    :description-style="{ fontSize: '16px' }"
    :content-style="{ fontSize: '18px', color: '#f50', marginLeft: '16px' }"
    :extra-style="{ overflow: 'hidden', borderRadius: '12px' }"
    v-for="(data, index) in listData"
    :key="index"
    :title="data.title"
  >
    <template #description>
      {{ data.description }}
    </template>
    {{ data.content }}
    <template #actions>
      <a>edit</a>
      <a>more</a>
    </template>
    <template #extra>
      <img
        class="u-img"
        width="200"
        alt="extra"
        src="https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.0.5/2.jpg"
      />
    </template>
  </ListItem>
</List>

::: details Show Code

```vue
<script setup lang="ts">
import { ref } from 'vue'

const listData = ref([
  {
    title: 'Vue Amazing UI Title 1',
    description: 'Vue Amazing UI, An Amazing Vue3 UI Components Library.',
    content: 'content'
  },
  {
    title: 'Vue Amazing UI Title 2',
    description: 'Vue Amazing UI, An Amazing Vue3 UI Components Library.',
    content: 'content'
  },
  {
    title: 'Vue Amazing UI Title 3',
    description: 'Vue Amazing UI, An Amazing Vue3 UI Components Library.',
    content: 'content'
  },
  {
    title: 'Vue Amazing UI Title 4',
    description: 'Vue Amazing UI, An Amazing Vue3 UI Components Library.',
    content: 'content'
  }
])
</script>
<template>
  <List>
    <ListItem
      :avatar-props="{
        src: 'https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.0.5/1.jpg',
        size: 60
      }"
      :avatar-style="{ alignSelf: 'center' }"
      :title-style="{ fontSize: '20px' }"
      :description-style="{ fontSize: '16px' }"
      :content-style="{ fontSize: '18px', color: '#f50', marginLeft: '16px' }"
      :extra-style="{ overflow: 'hidden', borderRadius: '12px' }"
      v-for="(data, index) in listData"
      :key="index"
      :title="data.title"
    >
      <template #description>
        {{ data.description }}
      </template>
      {{ data.content }}
      <template #actions>
        <a>edit</a>
        <a>more</a>
      </template>
      <template #extra>
        <img
          class="u-img"
          width="200"
          alt="extra"
          src="https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.0.5/2.jpg"
        />
      </template>
    </ListItem>
  </List>
</template>
```

:::

## 竖排分页列表

<List vertical size="large" show-pagination :pagination="pagination">
  <ListItem v-for="(data, index) in paginationListData" :key="index">
    <template #title>
      <a :href="data.href" target="_blank">{{ data.title }}</a>
    </template>
    <template #avatar>
      <Avatar src="https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.0.5/1.jpg" />
    </template>
    <template #description>
      {{ data.description }}
    </template>
    {{ data.content }}
    <template #actions>
      <span>
        <svg
          class="u-svg"
          focusable="false"
          data-icon="star"
          width="1em"
          height="1em"
          fill="currentColor"
          aria-hidden="true"
          viewBox="64 64 896 896"
        >
          <path
            d="M908.1 353.1l-253.9-36.9L540.7 86.1c-3.1-6.3-8.2-11.4-14.5-14.5-15.8-7.8-35-1.3-42.9 14.5L369.8 316.2l-253.9 36.9c-7 1-13.4 4.3-18.3 9.3a32.05 32.05 0 00.6 45.3l183.7 179.1-43.4 252.9a31.95 31.95 0 0046.4 33.7L512 754l227.1 119.4c6.2 3.3 13.4 4.4 20.3 3.2 17.4-3 29.1-19.5 26.1-36.9l-43.4-252.9 183.7-179.1c5-4.9 8.3-11.3 9.3-18.3 2.7-17.5-9.5-33.7-27-36.3zM664.8 561.6l36.1 210.3L512 672.7 323.1 772l36.1-210.3-152.8-149L417.6 382 512 190.7 606.4 382l211.2 30.7-152.8 148.9z"
          ></path>
        </svg>
        156
      </span>
      <span>
        <svg
          class="u-svg"
          focusable="false"
          data-icon="like"
          width="1em"
          height="1em"
          fill="currentColor"
          aria-hidden="true"
          viewBox="64 64 896 896"
        >
          <path
            d="M885.9 533.7c16.8-22.2 26.1-49.4 26.1-77.7 0-44.9-25.1-87.4-65.5-111.1a67.67 67.67 0 00-34.3-9.3H572.4l6-122.9c1.4-29.7-9.1-57.9-29.5-79.4A106.62 106.62 0 00471 99.9c-52 0-98 35-111.8 85.1l-85.9 311H144c-17.7 0-32 14.3-32 32v364c0 17.7 14.3 32 32 32h601.3c9.2 0 18.2-1.8 26.5-5.4 47.6-20.3 78.3-66.8 78.3-118.4 0-12.6-1.8-25-5.4-37 16.8-22.2 26.1-49.4 26.1-77.7 0-12.6-1.8-25-5.4-37 16.8-22.2 26.1-49.4 26.1-77.7-.2-12.6-2-25.1-5.6-37.1zM184 852V568h81v284h-81zm636.4-353l-21.9 19 13.9 25.4a56.2 56.2 0 016.9 27.3c0 16.5-7.2 32.2-19.6 43l-21.9 19 13.9 25.4a56.2 56.2 0 016.9 27.3c0 16.5-7.2 32.2-19.6 43l-21.9 19 13.9 25.4a56.2 56.2 0 016.9 27.3c0 22.4-13.2 42.6-33.6 51.8H329V564.8l99.5-360.5a44.1 44.1 0 0142.2-32.3c7.6 0 15.1 2.2 21.1 6.7 9.9 7.4 15.2 18.6 14.6 30.5l-9.6 198.4h314.4C829 418.5 840 436.9 840 456c0 16.5-7.2 32.1-19.6 43z"
          ></path>
        </svg>
        156
      </span>
      <span>
        <svg
          class="u-svg"
          focusable="false"
          data-icon="message"
          width="1em"
          height="1em"
          fill="currentColor"
          aria-hidden="true"
          viewBox="64 64 896 896"
        >
          <path
            d="M464 512a48 48 0 1096 0 48 48 0 10-96 0zm200 0a48 48 0 1096 0 48 48 0 10-96 0zm-400 0a48 48 0 1096 0 48 48 0 10-96 0zm661.2-173.6c-22.6-53.7-55-101.9-96.3-143.3a444.35 444.35 0 00-143.3-96.3C630.6 75.7 572.2 64 512 64h-2c-60.6.3-119.3 12.3-174.5 35.9a445.35 445.35 0 00-142 96.5c-40.9 41.3-73 89.3-95.2 142.8-23 55.4-34.6 114.3-34.3 174.9A449.4 449.4 0 00112 714v152a46 46 0 0046 46h152.1A449.4 449.4 0 00510 960h2.1c59.9 0 118-11.6 172.7-34.3a444.48 444.48 0 00142.8-95.2c41.3-40.9 73.8-88.7 96.5-142 23.6-55.2 35.6-113.9 35.9-174.5.3-60.9-11.5-120-34.8-175.6zm-151.1 438C704 845.8 611 884 512 884h-1.7c-60.3-.3-120.2-15.3-173.1-43.5l-8.4-4.5H188V695.2l-4.5-8.4C155.3 633.9 140.3 574 140 513.7c-.4-99.7 37.7-193.3 107.6-263.8 69.8-70.5 163.1-109.5 262.8-109.9h1.7c50 0 98.5 9.7 144.2 28.9 44.6 18.7 84.6 45.6 119 80 34.3 34.3 61.3 74.4 80 119 19.4 46.2 29.1 95.2 28.9 145.8-.6 99.6-39.7 192.9-110.1 262.7z"
          ></path>
        </svg>
        6
      </span>
    </template>
    <template #extra>
      <img
        class="u-img"
        width="272"
        alt="extra"
        src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png"
      />
    </template>
  </ListItem>
  <template #footer>
    <div>
      <b>Vue Amazing UI</b>
      footer part
    </div>
  </template>
</List>

<style lang="less" scoped>
.u-img {
  display: inline-block;
  vertical-align: bottom;
}
.u-svg {
  margin-right: 8px;
  fill: rgba(0, 0, 0, 0.45);
}
</style>

::: details Show Code

```vue
<script setup lang="ts">
import { ref } from 'vue'

const allListData = ref<any[]>([])
for (let i = 1; i <= 8; i++) {
  allListData.value.push({
    href: 'https://themusecatcher.github.io/vue-amazing-ui/',
    title: `Vue Amazing UI part ${i}`,
    avatar: 'https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.0.5/1.jpg',
    description: 'Vue Amazing UI, An Amazing Vue3 UI Components Library.',
    content:
      'Vue Amazing UI supplies streamline web development, incredible Vue components for modern web design and transform your Vue interface completely.'
  })
}
const paginationListData = ref<any[]>([])
paginationListData.value = allListData.value.slice(0, 3)
const pagination = {
  page: 1,
  pageSize: 3,
  total: 8,
  onChange: (page: number, pageSize: number) => {
    console.log('change page', page)
    console.log('change pageSize', pageSize)
    const start = (page - 1) * pageSize + 1
    const end = page * pageSize > 8 ? 8 : page * pageSize
    paginationListData.value = allListData.value.slice(start - 1, end)
  }
}
</script>
<template>
  <List vertical size="large" show-pagination :pagination="pagination">
    <ListItem v-for="(data, index) in paginationListData" :key="index">
      <template #title>
        <a :href="data.href" target="_blank">{{ data.title }}</a>
      </template>
      <template #avatar>
        <Avatar src="https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.0.5/1.jpg" />
      </template>
      <template #description>
        {{ data.description }}
      </template>
      {{ data.content }}
      <template #actions>
        <span>
          <svg
            class="u-svg"
            focusable="false"
            data-icon="star"
            width="1em"
            height="1em"
            fill="currentColor"
            aria-hidden="true"
            viewBox="64 64 896 896"
          >
            <path
              d="M908.1 353.1l-253.9-36.9L540.7 86.1c-3.1-6.3-8.2-11.4-14.5-14.5-15.8-7.8-35-1.3-42.9 14.5L369.8 316.2l-253.9 36.9c-7 1-13.4 4.3-18.3 9.3a32.05 32.05 0 00.6 45.3l183.7 179.1-43.4 252.9a31.95 31.95 0 0046.4 33.7L512 754l227.1 119.4c6.2 3.3 13.4 4.4 20.3 3.2 17.4-3 29.1-19.5 26.1-36.9l-43.4-252.9 183.7-179.1c5-4.9 8.3-11.3 9.3-18.3 2.7-17.5-9.5-33.7-27-36.3zM664.8 561.6l36.1 210.3L512 672.7 323.1 772l36.1-210.3-152.8-149L417.6 382 512 190.7 606.4 382l211.2 30.7-152.8 148.9z"
            ></path>
          </svg>
          156
        </span>
        <span>
          <svg
            class="u-svg"
            focusable="false"
            data-icon="like"
            width="1em"
            height="1em"
            fill="currentColor"
            aria-hidden="true"
            viewBox="64 64 896 896"
          >
            <path
              d="M885.9 533.7c16.8-22.2 26.1-49.4 26.1-77.7 0-44.9-25.1-87.4-65.5-111.1a67.67 67.67 0 00-34.3-9.3H572.4l6-122.9c1.4-29.7-9.1-57.9-29.5-79.4A106.62 106.62 0 00471 99.9c-52 0-98 35-111.8 85.1l-85.9 311H144c-17.7 0-32 14.3-32 32v364c0 17.7 14.3 32 32 32h601.3c9.2 0 18.2-1.8 26.5-5.4 47.6-20.3 78.3-66.8 78.3-118.4 0-12.6-1.8-25-5.4-37 16.8-22.2 26.1-49.4 26.1-77.7 0-12.6-1.8-25-5.4-37 16.8-22.2 26.1-49.4 26.1-77.7-.2-12.6-2-25.1-5.6-37.1zM184 852V568h81v284h-81zm636.4-353l-21.9 19 13.9 25.4a56.2 56.2 0 016.9 27.3c0 16.5-7.2 32.2-19.6 43l-21.9 19 13.9 25.4a56.2 56.2 0 016.9 27.3c0 16.5-7.2 32.2-19.6 43l-21.9 19 13.9 25.4a56.2 56.2 0 016.9 27.3c0 22.4-13.2 42.6-33.6 51.8H329V564.8l99.5-360.5a44.1 44.1 0 0142.2-32.3c7.6 0 15.1 2.2 21.1 6.7 9.9 7.4 15.2 18.6 14.6 30.5l-9.6 198.4h314.4C829 418.5 840 436.9 840 456c0 16.5-7.2 32.1-19.6 43z"
            ></path>
          </svg>
          156
        </span>
        <span>
          <svg
            class="u-svg"
            focusable="false"
            data-icon="message"
            width="1em"
            height="1em"
            fill="currentColor"
            aria-hidden="true"
            viewBox="64 64 896 896"
          >
            <path
              d="M464 512a48 48 0 1096 0 48 48 0 10-96 0zm200 0a48 48 0 1096 0 48 48 0 10-96 0zm-400 0a48 48 0 1096 0 48 48 0 10-96 0zm661.2-173.6c-22.6-53.7-55-101.9-96.3-143.3a444.35 444.35 0 00-143.3-96.3C630.6 75.7 572.2 64 512 64h-2c-60.6.3-119.3 12.3-174.5 35.9a445.35 445.35 0 00-142 96.5c-40.9 41.3-73 89.3-95.2 142.8-23 55.4-34.6 114.3-34.3 174.9A449.4 449.4 0 00112 714v152a46 46 0 0046 46h152.1A449.4 449.4 0 00510 960h2.1c59.9 0 118-11.6 172.7-34.3a444.48 444.48 0 00142.8-95.2c41.3-40.9 73.8-88.7 96.5-142 23.6-55.2 35.6-113.9 35.9-174.5.3-60.9-11.5-120-34.8-175.6zm-151.1 438C704 845.8 611 884 512 884h-1.7c-60.3-.3-120.2-15.3-173.1-43.5l-8.4-4.5H188V695.2l-4.5-8.4C155.3 633.9 140.3 574 140 513.7c-.4-99.7 37.7-193.3 107.6-263.8 69.8-70.5 163.1-109.5 262.8-109.9h1.7c50 0 98.5 9.7 144.2 28.9 44.6 18.7 84.6 45.6 119 80 34.3 34.3 61.3 74.4 80 119 19.4 46.2 29.1 95.2 28.9 145.8-.6 99.6-39.7 192.9-110.1 262.7z"
            ></path>
          </svg>
          6
        </span>
      </template>
      <template #extra>
        <img
          class="u-img"
          width="272"
          alt="extra"
          src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png"
        />
      </template>
    </ListItem>
    <template #footer>
      <div>
        <b>Vue Amazing UI</b>
        footer part
      </div>
    </template>
  </List>
</template>
<style lang="less" scoped>
.u-img {
  display: inline-block;
  vertical-align: bottom;
}
.u-svg {
  margin-right: 8px;
  fill: rgba(0, 0, 0, 0.45);
}
</style>
```

:::

## 列表配置器

<Flex gap="large" vertical>
  <Row :gutter="[24, 12]">
    <Col :span="6">
      <Space gap="small" vertical> bordered:<Switch v-model="state.bordered" /> </Space>
    </Col>
    <Col :span="6">
      <Space gap="small" vertical> vertical:<Switch v-model="state.vertical" /> </Space>
    </Col>
    <Col :span="6">
      <Space gap="small" vertical> split:<Switch v-model="state.split" /> </Space>
    </Col>
    <Col :span="6">
      <Space gap="small" vertical>
        size:<Radio :options="sizeOptions" v-model:value="state.size" button button-style="solid" />
      </Space>
    </Col>
    <Col :span="6">
      <Space gap="small" vertical> loading:<Switch v-model="state.loading" /> </Space>
    </Col>
    <Col :span="6">
      <Space gap="small" vertical> hoverable:<Switch v-model="state.hoverable" /> </Space>
    </Col>
    <Col :span="6">
      <Flex gap="small" vertical> header:<Input v-model:value="state.header" placeholder="header" /> </Flex>
    </Col>
    <Col :span="6">
      <Flex gap="small" vertical> footer:<Input v-model:value="state.footer" placeholder="footer" /> </Flex>
    </Col>
    <Col :span="6">
      <Flex gap="small" vertical> extra:<Input v-model:value="state.extra" placeholder="extra" /> </Flex>
    </Col>
    <Col :span="6">
      <Space gap="small" vertical> showPagination:<Switch v-model="state.showPagination" /> </Space>
    </Col>
    <Col :span="6">
      <Space gap="small" vertical> showSizeChanger:<Switch v-model="state.pagination.showSizeChanger" /> </Space>
    </Col>
    <Col :span="6">
      <Space gap="small" vertical> showQuickJumper:<Switch v-model="state.pagination.showQuickJumper" /> </Space>
    </Col>
  </Row>
  <List
    :bordered="state.bordered"
    :vertical="state.vertical"
    :split="state.split"
    :size="state.size"
    :loading="state.loading"
    :hoverable="state.hoverable"
    :header="state.header"
    :footer="state.footer"
    :showPagination="state.showPagination"
    :pagination="state.pagination"
  >
    <ListItem v-for="(data, index) in configListData" :key="index" :extra="state.extra">
      <template #title>
        <a :href="data.href" target="_blank">{{ data.title }}</a>
      </template>
      <template #avatar>
        <Avatar src="https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.0.5/1.jpg" />
      </template>
      <template #description>
        {{ data.description }}
      </template>
      {{ data.content }}
    </ListItem>
  </List>
</Flex>

::: details Show Code

```vue
<script setup lang="ts">
import { ref, reactive } from 'vue'

const allConfigListData = ref<ang[]>([])
for (let i = 1; i <= 30; i++) {
  allConfigListData.value.push({
    href: 'https://themusecatcher.github.io/vue-amazing-ui/',
    title: `Vue Amazing UI Title ${i}`,
    description: 'Vue Amazing UI, An Amazing Vue3 UI Components Library.',
    content: 'Incredible Vue components for modern web design'
  })
}
const configListData = ref<any[]>([])
configListData.value = allConfigListData.value.slice(0, 5)
const state = reactive({
  bordered: true,
  vertical: false,
  split: true,
  size: 'middle',
  loading: false,
  hoverable: true,
  header: 'list header',
  footer: 'list footer',
  extra: 'extra',
  showPagination: true,
  pagination: {
    page: 1,
    pageSize: 5,
    total: 30,
    showTotal: (total: number, range: number[]) => `${range[0]}-${range[1]} of ${total} items`,
    showSizeChanger: true,
    showQuickJumper: true,
    onChange: (page: number, pageSize: number) => {
      console.log('change page', page)
      console.log('change pageSize', pageSize)
      const start = (page - 1) * pageSize + 1
      const end = page * pageSize > state.pagination.total ? state.pagination.total : page * pageSize
      configListData.value = allConfigListData.value.slice(start - 1, end)
    }
  }
})
</script>
<template>
  <Flex gap="large" vertical>
    <Row :gutter="[24, 12]">
      <Col :span="6">
        <Space gap="small" vertical> bordered:<Switch v-model="state.bordered" /> </Space>
      </Col>
      <Col :span="6">
        <Space gap="small" vertical> vertical:<Switch v-model="state.vertical" /> </Space>
      </Col>
      <Col :span="6">
        <Space gap="small" vertical> split:<Switch v-model="state.split" /> </Space>
      </Col>
      <Col :span="6">
        <Space gap="small" vertical>
          size:<Radio :options="sizeOptions" v-model:value="state.size" button button-style="solid" />
        </Space>
      </Col>
      <Col :span="6">
        <Space gap="small" vertical> loading:<Switch v-model="state.loading" /> </Space>
      </Col>
      <Col :span="6">
        <Space gap="small" vertical> hoverable:<Switch v-model="state.hoverable" /> </Space>
      </Col>
      <Col :span="6">
        <Flex gap="small" vertical> header:<Input v-model:value="state.header" placeholder="header" /> </Flex>
      </Col>
      <Col :span="6">
        <Flex gap="small" vertical> footer:<Input v-model:value="state.footer" placeholder="footer" /> </Flex>
      </Col>
      <Col :span="6">
        <Flex gap="small" vertical> extra:<Input v-model:value="state.extra" placeholder="extra" /> </Flex>
      </Col>
      <Col :span="6">
        <Space gap="small" vertical> showPagination:<Switch v-model="state.showPagination" /> </Space>
      </Col>
      <Col :span="6">
        <Space gap="small" vertical> showSizeChanger:<Switch v-model="state.pagination.showSizeChanger" /> </Space>
      </Col>
      <Col :span="6">
        <Space gap="small" vertical> showQuickJumper:<Switch v-model="state.pagination.showQuickJumper" /> </Space>
      </Col>
    </Row>
    <List
      :bordered="state.bordered"
      :vertical="state.vertical"
      :split="state.split"
      :size="state.size"
      :loading="state.loading"
      :hoverable="state.hoverable"
      :header="state.header"
      :footer="state.footer"
      :showPagination="state.showPagination"
      :pagination="state.pagination"
    >
      <ListItem v-for="(data, index) in configListData" :key="index" :extra="state.extra">
        <template #title>
          <a :href="data.href" target="_blank">{{ data.title }}</a>
        </template>
        <template #avatar>
          <Avatar src="https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.0.5/1.jpg" />
        </template>
        <template #description>
          {{ data.description }}
        </template>
        {{ data.content }}
      </ListItem>
    </List>
  </Flex>
</template>
```

:::

## APIs

### List

参数 | 说明 | 类型 | 默认值
-- | -- | -- | --
bordered | 是否展示边框 | boolean | false
vertical | 是否使用竖直样式 | boolean | false
split | 是否展示分割线 | boolean | true
size | 列表尺寸 | 'small' &#124; 'middle' &#124; 'large' | 'middle'
loading | 是否加载中 | boolean | false
hoverable | 是否显示悬浮样式 | boolean | false
header | 列表头部 | string &#124; slot | undefined
footer | 列表底部 | string &#124; slot | undefined
spinProps | `Spin` 组件属性配置，参考 [Spin Props](https://themusecatcher.github.io/vue-amazing-ui/guide/components/spin.html#spin)，用于配置列表加载中样式 | object | {}
emptyProps | `Empty` 组件属性配置，参考 [Empty Props](https://themusecatcher.github.io/vue-amazing-ui/guide/components/empty.html#empty)，用于配置暂无数据样式 | object | {}
showPagination | 是否显示分页 | boolean | false
pagination | `Pagination` 组件属性配置，参考 [Pagination Props](https://themusecatcher.github.io/vue-amazing-ui/guide/components/pagination.html#pagination)，用于配置分页功能 | object | {}

### ListItem

参数 | 说明 | 类型 | 默认值
-- | -- | -- | --
avatar | 列表元素的图标字符 | string &#124; slot | undefined
avatarProps | `Avatar` 组件属性配置，参考 [Avatar Props](https://themusecatcher.github.io/vue-amazing-ui/guide/components/avatar.html#avatar)，用于配置列表图标样式 | object | {}
title | 列表元素的标题 | string &#124; slot | undefined
description | 列表元素的描述内容 | string &#124; slot | undefined
actions | 列表操作组 | slot | undefined
extra | 额外内容，展示在列表右侧 | string &#124; slot | undefined
avatarStyle | 设置图标的样式 | [CSSProperties](https://cn.vuejs.org/api/utility-types.html#cssproperties) | {}
titleStyle | 设置标题的样式 | [CSSProperties](https://cn.vuejs.org/api/utility-types.html#cssproperties) | {}
descriptionStyle | 设置描述内容的样式 | [CSSProperties](https://cn.vuejs.org/api/utility-types.html#cssproperties) | {}
contentStyle | 设置内容的样式 | [CSSProperties](https://cn.vuejs.org/api/utility-types.html#cssproperties) | {}
actionsStyle | 设置操作区域的样式 | [CSSProperties](https://cn.vuejs.org/api/utility-types.html#cssproperties) | {}
extraStyle | 设置额外内容的样式 | [CSSProperties](https://cn.vuejs.org/api/utility-types.html#cssproperties) | {}
