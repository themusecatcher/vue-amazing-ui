<script setup lang="ts">
import { ref } from 'vue'
const listData = [
  {
    title: 'Vue Amazing UI Title 1',
    description: 'Vue Amazing UI, An Amazing Vue3 UI Components Library.'
  },
  {
    title: 'Vue Amazing UI Title 2',
    description: 'Vue Amazing UI, An Amazing Vue3 UI Components Library.'
  },
  {
    title: 'Vue Amazing UI Title 3',
    description: 'Vue Amazing UI, An Amazing Vue3 UI Components Library.'
  },
  {
    title: 'Vue Amazing UI Title 4',
    description: 'Vue Amazing UI, An Amazing Vue3 UI Components Library.'
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
    <a-list item-layout="horizontal" :data-source="listData">
      <template #renderItem="{ item }">
        <a-list-item>
          {{ item.title }}
          <a-list-item-meta
            description="Ant Design, a design language for background applications, is refined by Ant UED Team"
          >
            <template #avatar>
              <a-avatar src="https://joeschmoe.io/api/v1/random" />
            </template>
          </a-list-item-meta>
        </a-list-item>
      </template>
    </a-list>
    <h2 class="mt30 mb10">带边框列表</h2>
    <List bordered>
      <ListItem v-for="(data, index) in listData" :key="index" :title="data.title">
        <template #avatar>
          <Avatar src="https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.0.5/1.jpg" />
        </template>
        <template #description>
          {{ data.description }}
        </template>
      </ListItem>
    </List>
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
  </div>
</template>
