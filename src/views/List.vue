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

const listData1: Record<string, string>[] = []

for (let i = 0; i < 6; i++) {
  listData1.push({
    href: 'https://www.antdv.com/',
    title: `ant design vue part ${i}`,
    avatar: 'https://joeschmoe.io/api/v1/random',
    description: 'Ant Design, a design language for background applications, is refined by Ant UED Team.',
    content:
      'We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.'
  })
}

const pagination = {
  onChange: (page: number) => {
    console.log(page)
  },
  pageSize: 3
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
    <br />
    <a-list bordered item-layout="horizontal" :data-source="listData">
      <template #header>
        <div>Header</div>
      </template>
      <template #renderItem="{ item }">
        <a-list-item>
          <a-list-item-meta
            description="Ant Design, a design language for background applications, is refined by Ant UED Team"
          >
            <template #title>
              <a href="https://www.antdv.com/">{{ item.title }}</a>
            </template>
            <template #avatar>
              <a-avatar src="https://joeschmoe.io/api/v1/random" />
            </template>
          </a-list-item-meta>
        </a-list-item>
      </template>
      <template #footer>
        <div>Footer</div>
      </template>
    </a-list>
    <h2 class="mt30 mb10">三种尺寸</h2>
    <Flex vertical>
      <Radio :options="sizeOptions" v-model:value="size" button button-style="solid" />
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
    </Flex>
    <h2 class="mt30 mb10">列表添加操作项</h2>
    <List bordered>
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
          <!-- <a>delete</a> -->
        </template>
      </ListItem>
    </List>
    <a-list bordered item-layout="horizontal" :data-source="listData">
      <template #renderItem="{ item }">
        <a-list-item>
          <a-list-item-meta
            description="Ant Design, a design language for background applications, is refined by Ant UED Team"
          >
            <template #title>
              <a href="https://www.antdv.com/">{{ item.title }}</a>
            </template>
            <template #avatar>
              <a-avatar src="https://joeschmoe.io/api/v1/random" />
            </template>
          </a-list-item-meta>
          <div>content</div>
          <template #actions>
            <a key="list-loadmore-edit">edit</a>
            <a key="list-loadmore-more">more</a>
          </template>
        </a-list-item>
      </template>
    </a-list>
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
    <h2 class="mt30 mb10">竖排列表</h2>
    <a-list item-layout="vertical" size="large" :pagination="pagination" :data-source="listData1">
      <template #footer>
        <div>
          <b>ant design vue</b>
          footer part
        </div>
      </template>
      <template #renderItem="{ item }">
        <a-list-item key="item.title">
          <template #actions>
            <span v-for="{ icon, text } in actions" :key="icon">
              <component :is="icon" style="margin-right: 8px" />
              {{ text }}
            </span>
          </template>
          <template #extra>
            <img width="272" alt="logo" src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png" />
          </template>
          <a-list-item-meta :description="item.description">
            <template #title>
              <a :href="item.href">{{ item.title }}</a>
            </template>
            <template #avatar><a-avatar :src="item.avatar" /></template>
          </a-list-item-meta>
          {{ item.content }}
        </a-list-item>
      </template>
    </a-list>
    <br />
    <List vertical size="large" show-pagination :pagination="{ total: 6, p: 1, pageSize: 3 }">
      <ListItem v-for="(data, index) in listData1" :key="index" :title="data.title">
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
    <h2 class="mt30 mb10">栅格列表</h2>
    <a-list :grid="{ gutter: 16, column: 6 }" :data-source="data">
      <template #renderItem="{ item }">
        <a-list-item>
          <a-card :title="item.title">Card content</a-card>
        </a-list-item>
      </template>
    </a-list>
    <List :grid="{ gutter: 16, column: 4 }">
      <ListItem v-for="(item, index) in data" :key="index">
        <Card :title="item.title">Card content</Card>
      </ListItem>
    </List>
  </div>
</template>
<style lang="less" scoped>
.u-img {
  display: inline-block;
  vertical-align: bottom;
}
</style>
