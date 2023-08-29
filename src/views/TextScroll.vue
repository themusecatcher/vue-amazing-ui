<script setup lang="ts">
import { ref } from 'vue'
const text = ref([
      {
        title: '美国作家杰罗姆·大卫·塞林格创作的唯一一部长篇小说',
        link: 'https://blog.csdn.net/Dandrose?type=blog'
      },
      {
        title: '首次出版于1951年'
      },
      {
        title: '塞林格将故事的起止局限于16岁的中学生霍尔顿·考尔菲德从离开学校到纽约游荡的三天时间内,塞林格将故事的起止局限于16岁的中学生霍尔顿·考尔菲德从离开学校到纽约游荡的三天时间内'
      },
      {
        title: '并借鉴了意识流天马行空的写作方法，充分探索了一个十几岁少年的内心世界'
      },
      {
        title: '愤怒与焦虑是此书的两大主题，主人公的经历和思想在青少年中引起强烈共鸣'
      }
    ])
function onClick (value: string) { // 获取点击的标题
  console.log('value:', value)
}
</script>
<template>
  <div>
    <h1>TextScroll 文字滚动</h1>
    <h2 class="mt30 mb10">水平文字滚动</h2>
    <TextScroll
      :text="text"
      @click="onClick"
      width="100%"
      :amount="4"
      background-color="#FFF"
      :height="50" />
    <h2 class="mt30 mb10">垂直文字滚动</h2>
    <TextScroll
      :text="text"
      @click="onClick"
      vertical
      background-color="#e6f4ff"
      :gap="60"
      :interval="3000"
      width="100%"
      :height="60" />
  </div>
</template>
