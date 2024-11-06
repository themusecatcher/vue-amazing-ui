<script setup lang="ts">
import { ref, reactive } from 'vue'
import { StarOutlined, LikeOutlined, MessageOutlined } from '@ant-design/icons-vue'
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
const simpleListData = ref([
  {
    title: 'Vue Amazing UI Title 1',
    description: 'An Amazing Vue3 UI Components Library.',
    content: 'content'
  },
  {
    title: 'Vue Amazing UI Title 2',
    description: 'An Amazing Vue3 UI Components Library.',
    content: 'content'
  },
  {
    title: 'Vue Amazing UI Title 3',
    description: 'An Amazing Vue3 UI Components Library.',
    content: 'content'
  },
  {
    title: 'Vue Amazing UI Title 4',
    description: 'An Amazing Vue3 UI Components Library.',
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
const allConfigListData = ref<any[]>([])
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
    <h2 class="mt30 mb10">隐藏分割线</h2>
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
    <h2 class="mt30 mb10">带边框列表</h2>
    <Flex vertical>
      <Space align="center"> bordered:<Switch v-model="bordered" /> </Space>
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
    <h2 class="mt30 mb10">三种尺寸</h2>
    <Flex vertical>
      <Radio :options="sizeOptions" v-model:value="size" button button-style="solid" />
      <Row :gutter="32">
        <Col :span="12">
          <List bordered :size="size">
            <ListItem v-for="(data, index) in simpleListData" :key="index">
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
    <h2 class="mt30 mb10">加载中</h2>
    <Flex vertical>
      <Space align="center"> Loading state:<Switch v-model="loading" /> </Space>
      <Row :gutter="32">
        <Col :span="12">
          <List bordered :loading="loading">
            <ListItem v-for="(data, index) in simpleListData" :key="index" :title="data.title">
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
    <h2 class="mt30 mb10">暂无数据</h2>
    <List>
      <ListItem v-for="(data, index) in []" :key="index"></ListItem>
    </List>
    <h2 class="mt30 mb10">显示悬浮样式</h2>
    <Row :gutter="32">
      <Col :span="12">
        <List bordered hoverable>
          <ListItem v-for="(data, index) in simpleListData" :key="index" :title="data.title">
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
    <h2 class="mt30 mb10">列表添加操作项</h2>
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
    <h2 class="mt30 mb10">自定义样式</h2>
    <List>
      <ListItem
        :avatar-props="{
          src: 'https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.0.5/1.jpg',
          size: 56
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
    <h2 class="mt30 mb10">竖排分页列表</h2>
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
          <span> <StarOutlined style="margin-right: 8px" />156 </span>
          <span> <LikeOutlined style="margin-right: 8px" />156 </span>
          <span> <MessageOutlined style="margin-right: 8px" />6 </span>
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
    <h2 class="mt30 mb10">列表配置器</h2>
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
  </div>
</template>
<style lang="less" scoped>
.u-img {
  display: inline-block;
  vertical-align: bottom;
}
</style>
