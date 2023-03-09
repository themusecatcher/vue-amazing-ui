<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { RouterView } from 'vue-router'
// import videoUrl from '@/assets/files/Bao.mp4'
// import videoCover from '@/assets/images/Bao.jpg'

// const videoUrl = ref(new URL('@/assets/files/Bao.mp4', import.meta.url).href)
// const videoCover = ref(new URL('@/assets/images/Bao.jpg', import.meta.url).href)

const videoUrl = ref()
const videoCover = ref()

const hideOnSinglePage = ref(false)
const total = ref(100)
const pagination = ref({
  pageSize: 10,
  p: 1
})
const routes = ref([
    {
      path: '/first', // 路由地址
      query: { id: 1, tab: 2 }, // 路由参数
      name: '一级路由' // 路由名称
    },
    {
      path: '/second',
      name: '二级路由'
    },
    {
      path: '/third',
      name: '三级路由三级路由三级路由三级路由三级路由三级路由三级路由'
    }
  ])
function changePage (pager: object) { // 分页器回调
  console.log('pager:', pager)
}
function onFinish () {
  console.log('countdown finished')
}
function onClick () {
  console.log('click')
}

onMounted(() => {
  setTimeout(() => { // 模拟接口调用
      videoUrl.value = 'https://download.jinhui365.cn/group1/M00/00/A7/CgAAcmNCagWAejQND0jqHviL8QA869.mp4'
      videoCover.value = 'https://download.jinhui365.cn//group1/M00/00/A8/CgAAcmNCddKACHUbAADB2zx3w90256.jpg'
    }, 1000)
})
</script>

<template>
  <div class="app">
    <RouterView />
    <Countdown
      style="margin-top: 50px;"
      title="Countdown"
      :countdown="12 * 30 * 24 * 60 * 60"
      format="Y 年 M 月 D 天 H 时 m 分 s 秒"
      finishedText="Finished"
      @finish="onFinish">
      <template #prefix>There's only </template>
      <!-- <template #finish>&lt; FinishedText slot &gt;</template> -->
      <template #suffix> left for the end.</template>
    </CountDown>
    <Breadcrumb :routes="routes" :height="60" />
    <Pagination
      @change="changePage"
      :current="pagination.p"
      :pageSize="pagination.pageSize"
      :total="total"
      :hideOnSinglePage="hideOnSinglePage"
      :showQuickJumper="true"
      :showTotal="true"
      placement="center"
    />
    <Video
      v-show="true"
      :videoUrl="videoUrl"
      :videoCover="videoCover"
      :width="800"
      :height="450"
      :autoplay="false"
      :controls="true"
      :loop="false"
      :muted="false"
      preload="auto"
      :showPlay="true"
      :playWidth="96"
      zoom="cotain"
    />
    <br/>
    <Button
      class="mr20"
      type="primary"
      effect="reverse"
      size="middle"
      :width="120"
      :height="40"
      :borderRadius="4"
      :disabled="false"
      :center="false"
      @click="onClick">
      按钮Button
    </Button>
  </div>
</template>

<style lang="less" scoped>
.app {
  width: 1200px;
  margin: 0 auto;
}
</style>
