<script setup lang="ts">
import { ref } from 'vue'
import { LikeFilled, LikeOutlined, DislikeFilled, DislikeOutlined } from '@ant-design/icons-vue'
// 1. 基本评论
const likes = ref<number>(0)
const dislikes = ref<number>(0)
const action = ref<string>()
function like() {
  likes.value = 1
  dislikes.value = 0
  action.value = 'liked'
}
function dislike() {
  likes.value = 0
  dislikes.value = 1
  action.value = 'disliked'
}
// 2. 配合 List 组件
const listData = [
  {
    actions: ['Reply to'],
    author: 'Han Solo',
    avatar: 'https://api.dicebear.com/7.x/miniavs/svg?seed=1',
    content:
      'We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.',
    datetime: '2 days ago'
  },
  {
    actions: ['Reply to'],
    author: 'Han Solo',
    avatar: 'https://api.dicebear.com/7.x/miniavs/svg?seed=2',
    content:
      'We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.',
    datetime: '3 days ago'
  }
]
// 4. 回复框
interface CommentItem {
  author: string
  avatar: string
  content: string
  datetime: string
}
const comments = ref<CommentItem[]>([])
const submitting = ref<boolean>(false)
const value = ref<string>('')
function handleSubmit() {
  if (!value.value) {
    return
  }
  submitting.value = true
  setTimeout(() => {
    submitting.value = false
    comments.value = [
      {
        author: 'Han Solo',
        avatar: 'https://api.dicebear.com/7.x/miniavs/svg?seed=me',
        content: value.value,
        datetime: 'just now'
      },
      ...comments.value
    ]
    value.value = ''
  }, 1000)
}
</script>
<template>
  <div>
    <h1>{{ $route.name }} {{ $route.meta.title }}</h1>
    <h2 class="mt30 mb10">基本评论</h2>
    <p class="mb10">一个基本的评论组件，带有作者、头像、时间和操作</p>
    <Comment>
      <template #actions>
        <span key="comment-basic-like">
          <Tooltip tooltip="Like" style="display: inline-block">
            <LikeFilled v-if="action === 'liked'" @click="like" />
            <LikeOutlined v-else @click="like" />
          </Tooltip>
          <span style="padding-left: 8px; cursor: auto">{{ likes }}</span>
        </span>
        <span key="comment-basic-dislike">
          <Tooltip tooltip="Dislike" style="display: inline-block">
            <DislikeFilled v-if="action === 'disliked'" @click="dislike" />
            <DislikeOutlined v-else @click="dislike" />
          </Tooltip>
          <span style="padding-left: 8px; cursor: auto">{{ dislikes }}</span>
        </span>
        <span key="comment-basic-reply-to">Reply to</span>
      </template>
      <template #author><a>Han Solo</a></template>
      <template #avatar>
        <Avatar src="https://api.dicebear.com/7.x/miniavs/svg?seed=han" alt="Han Solo" />
      </template>
      <template #content>
        <p>
          We supply a series of design principles, practical patterns and high quality design resources (Sketch and
          Axure), to help people create their product prototypes beautifully and efficiently.
        </p>
      </template>
      <template #datetime>
        <Tooltip tooltip="2016-11-22 11:22:33" style="display: inline-block">
          <span>8 hours ago</span>
        </Tooltip>
      </template>
    </Comment>
    <h2 class="mt30 mb10">配合 List 组件</h2>
    <p class="mb10">配合 <code>List</code> 组件展现评论列表</p>
    <List :header="`${listData.length} replies`">
      <ListItem v-for="(item, index) in listData" :key="index">
        <Comment :author="item.author" :avatar="item.avatar">
          <template #actions>
            <span v-for="(act, idx) in item.actions" :key="idx">{{ act }}</span>
          </template>
          <template #content>
            <p>{{ item.content }}</p>
          </template>
          <template #datetime>
            <Tooltip :tooltip="item.datetime" style="display: inline-block">
              <span>{{ item.datetime }}</span>
            </Tooltip>
          </template>
        </Comment>
      </ListItem>
    </List>
    <h2 class="mt30 mb10">嵌套评论</h2>
    <p class="mb10">评论可以嵌套</p>
    <Comment>
      <template #actions>
        <span key="comment-nested-reply-to">Reply to</span>
      </template>
      <template #author><a>Han Solo</a></template>
      <template #avatar>
        <Avatar src="https://api.dicebear.com/7.x/miniavs/svg?seed=han" alt="Han Solo" />
      </template>
      <template #content>
        <p
          >We supply a series of design principles, practical patterns and high quality design resources (Sketch and
          Axure).</p
        >
      </template>
      <Comment>
        <template #actions>
          <span>Reply to</span>
        </template>
        <template #author><a>Han Solo</a></template>
        <template #avatar>
          <Avatar src="https://api.dicebear.com/7.x/miniavs/svg?seed=han2" alt="Han Solo" />
        </template>
        <template #content>
          <p
            >We supply a series of design principles, practical patterns and high quality design resources (Sketch and
            Axure).</p
          >
        </template>
        <Comment>
          <template #actions>
            <span>Reply to</span>
          </template>
          <template #author><a>Han Solo</a></template>
          <template #avatar>
            <Avatar src="https://api.dicebear.com/7.x/miniavs/svg?seed=han3" alt="Han Solo" />
          </template>
          <template #content>
            <p
              >We supply a series of design principles, practical patterns and high quality design resources (Sketch and
              Axure).</p
            >
          </template>
        </Comment>
        <Comment>
          <template #actions>
            <span>Reply to</span>
          </template>
          <template #author><a>Han Solo</a></template>
          <template #avatar>
            <Avatar src="https://api.dicebear.com/7.x/miniavs/svg?seed=han4" alt="Han Solo" />
          </template>
          <template #content>
            <p
              >We supply a series of design principles, practical patterns and high quality design resources (Sketch and
              Axure).</p
            >
          </template>
        </Comment>
      </Comment>
    </Comment>
    <h2 class="mt30 mb10">回复框</h2>
    <p class="mb10">评论编辑器组件提供了相同样式的封装以支持自定义评论编辑器</p>
    <List v-if="comments.length" :header="`${comments.length} ${comments.length > 1 ? 'replies' : 'reply'}`">
      <ListItem v-for="(item, index) in comments" :key="index">
        <Comment :author="item.author" :avatar="item.avatar" :content="item.content" :datetime="item.datetime" />
      </ListItem>
    </List>
    <Comment>
      <template #avatar>
        <Avatar src="https://api.dicebear.com/7.x/miniavs/svg?seed=me" alt="Han Solo" />
      </template>
      <template #content>
        <Textarea v-model:value="value" :rows="4" />
        <Button html-type="submit" :loading="submitting" type="primary" class="mt10" @click="handleSubmit">
          Add Comment
        </Button>
      </template>
    </Comment>
  </div>
</template>
