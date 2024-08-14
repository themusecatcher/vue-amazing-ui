<script setup lang="ts">
import { ref } from 'vue'
import { StarOutlined, LikeOutlined, MessageOutlined } from '@ant-design/icons-vue'
const listData = [
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
]
const simpleList = [
  'Vue Amazing UI is developed using TypeScript',
  'An Amazing Vue3 UI Components Library',
  'Streamline web development with Vue Amazing UI',
  'Incredible Vue components for modern web design',
  'Transform your Vue interface with Vue Amazing UI'
]
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
const bordered = ref(true)
const listData1: Record<string, string>[] = []

for (let i = 1; i <= 8; i++) {
  listData1.push({
    href: 'https://themusecatcher.github.io/vue-amazing-ui/',
    title: `Vue Amazing UI part ${i}`,
    avatar: 'https://joeschmoe.io/api/v1/random',
    description: 'Vue Amazing UI, An Amazing Vue3 UI Components Library.',
    content:
      'Vue Amazing UI supplies streamline web development, incredible Vue components for modern web design and transform your Vue interface completely.'
  })
}
const paginationListData = ref(listData1.slice(0, 3))
const pagination = {
  p: 1,
  pageSize: 3,
  total: 8,
  onChange: (page: number, pageSize: number) => {
    console.log('change page', page)
    console.log('change pageSize', pageSize)
    const start = (page - 1) * pageSize + 1
    const end = page * pageSize > 8 ? 8 : page * pageSize
    paginationListData.value = listData1.slice(start - 1, end)
  }
}
const actions: Record<string, any>[] = [
  { icon: StarOutlined, text: '156' },
  { icon: LikeOutlined, text: '156' },
  { icon: MessageOutlined, text: '2' }
]
const data = [
  {
    title: 'Title 1'
  },
  {
    title: 'Title 2'
  },
  {
    title: 'Title 3'
  },
  {
    title: 'Title 4'
  },
  {
    title: 'Title 5'
  },
  {
    title: 'Title 6'
  },
  {
    title: 'Title 7'
  },
  {
    title: 'Title 8'
  }
]
</script>
<template>
  <div>
    <h1>{{ $route.name }} {{ $route.meta.title }}</h1>
    <h2 class="mt30 mb10">基本使用</h2>
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
    <h2 class="mt30 mb10">带边框列表</h2>
    <List bordered>
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
    <h2 class="mt30 mb10">三种尺寸</h2>
    <Flex vertical>
      <Radio :options="sizeOptions" v-model:value="size" button button-style="solid" />
      <Row :gutter="32">
        <Col :span="12">
          <List :size="size">
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
    <h2 class="mt30 mb10">列表添加操作项</h2>
    <Flex vertical>
      <Space>
        <Switch v-model="bordered" />
      </Space>
      <List :bordered="bordered">
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
    </Flex>
    <h2 class="mt30 mb10">自定义样式</h2>
    <List>
      <ListItem
        :avatar-style="{ alignSelf: 'center' }"
        :title-style="{ fontSize: '20px' }"
        :description-style="{ fontSize: '16px' }"
        :content-style="{ color: '#f50' }"
        v-for="(data, index) in listData"
        :key="index"
        :title="data.title"
      >
        <template #avatar>
          <Avatar size="large" src="https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.0.5/1.jpg" />
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
    <h2 class="mt30 mb10">竖排分页列表</h2>
    <List vertical size="large" show-pagination :pagination="pagination">
      <ListItem v-for="(data, index) in paginationListData" :key="index">
        <template #title>
          <a :href="data.href">{{ data.title }}</a>
        </template>
        <template #avatar>
          <Avatar src="https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.0.5/1.jpg" />
        </template>
        <template #description>
          {{ data.description }}
        </template>
        {{ data.content }}
        <template #actions>
          <span v-for="{ icon, text } in actions" :key="icon">
            <component :is="icon" style="margin-right: 8px" />
            {{ text }}
          </span>
        </template>
        <template #extra>
          <img
            class="u-img"
            width="272"
            alt="logo"
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
  </div>
</template>
<style lang="less" scoped>
.u-img {
  display: inline-block;
  vertical-align: bottom;
}
</style>
