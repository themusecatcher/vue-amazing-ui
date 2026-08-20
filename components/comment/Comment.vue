<script setup lang="ts">
import { computed, useSlots } from 'vue'
import type { VNode } from 'vue'
import { useSlotsExist } from 'components/utils'
export interface Props {
  actions?: Array<string | VNode> // 在评论内容下面呈现的操作项列表 Array | slot
  author?: string // 要显示为评论作者的元素 string | slot
  avatar?: string // 要显示为评论头像的元素，通常为头像图片地址 string | slot
  content?: string // 评论的主要内容 string | slot
  datetime?: string // 展示时间描述 string | slot
}
const props = withDefaults(defineProps<Props>(), {
  actions: undefined,
  author: undefined,
  avatar: undefined,
  content: undefined,
  datetime: undefined
})
const slots = useSlots()
const slotsExist = useSlotsExist(['actions', 'author', 'avatar', 'content', 'datetime', 'default'])
const showAvatar = computed(() => {
  return slotsExist.avatar || props.avatar
})
const showAuthor = computed(() => {
  return slotsExist.author || props.author
})
const showDatetime = computed(() => {
  return slotsExist.datetime || props.datetime
})
const showActions = computed(() => {
  return slotsExist.actions || (props.actions && props.actions.length)
})
// 合并 prop 与 slot 两种来源，统一为「每项一个 <li>」的操作项列表
const actionList = computed<Array<string | VNode>>(() => {
  if (slotsExist.actions) {
    return slots.actions?.() ?? []
  }
  if (Array.isArray(props.actions)) {
    return props.actions
  }
  return props.actions ? [props.actions] : []
})
const showNested = computed(() => {
  return slotsExist.default
})
</script>
<template>
  <div class="m-comment">
    <div class="comment-inner">
      <div v-if="showAvatar" class="comment-avatar">
        <slot name="avatar">
          <img :src="avatar" alt="comment-avatar" />
        </slot>
      </div>
      <div class="comment-content">
        <div class="comment-content-author">
          <span v-if="showAuthor" class="comment-content-author-name">
            <slot name="author">{{ author }}</slot>
          </span>
          <span v-if="showDatetime" class="comment-content-author-time">
            <slot name="datetime">{{ datetime }}</slot>
          </span>
        </div>
        <div class="comment-content-detail">
          <slot name="content">{{ content }}</slot>
        </div>
        <ul v-if="showActions" class="comment-actions">
          <li v-for="(action, index) in actionList" :key="`action-${index}`">
            <span v-if="typeof action === 'string'">{{ action }}</span>
            <component :is="action" v-else />
          </li>
        </ul>
      </div>
    </div>
    <div v-if="showNested" class="comment-nested">
      <slot></slot>
    </div>
  </div>
</template>
<style lang="less" scoped>
.m-comment {
  position: relative;
  background-color: inherit;
  font-size: 14px;
  color: rgba(0, 0, 0, 0.88);
  .comment-inner {
    display: flex;
    padding: 16px 0;
    .comment-avatar {
      position: relative;
      flex-shrink: 0;
      margin-right: 12px;
      cursor: pointer;
      :deep(img) {
        width: 32px;
        height: 32px;
        border-radius: 50%;
      }
    }
    .comment-content {
      position: relative;
      flex: 1 1 auto;
      min-width: 1px;
      font-size: 14px;
      word-wrap: break-word;
      .comment-content-author {
        display: flex;
        flex-wrap: wrap;
        justify-content: flex-start;
        margin-bottom: 4px;
        font-size: 14px;
        :deep(> a),
        > span {
          padding-right: 8px;
          font-size: 12px;
          line-height: 18px;
        }
        .comment-content-author-name {
          color: rgba(0, 0, 0, 0.45);
          font-size: 14px;
          transition: color 0.3s;
          :deep(> *) {
            color: rgba(0, 0, 0, 0.45);
            &:hover {
              color: rgba(0, 0, 0, 0.45);
            }
          }
        }
        .comment-content-author-time {
          color: rgba(0, 0, 0, 0.25);
          white-space: nowrap;
          cursor: auto;
        }
      }
      .comment-content-detail {
        :deep(p) {
          margin-bottom: inherit;
          white-space: pre-wrap;
        }
      }
      .comment-actions {
        margin-top: 12px;
        margin-bottom: 0;
        padding-left: 0;
        :deep(> li) {
          display: inline-block;
          color: rgba(0, 0, 0, 0.45);
          > span {
            margin-right: 10px;
            color: rgba(0, 0, 0, 0.45);
            font-size: 12px;
            cursor: pointer;
            transition: color 0.3s;
            user-select: none;
            &:hover {
              color: rgba(0, 0, 0, 0.65);
            }
          }
        }
      }
    }
  }
  .comment-nested {
    margin-left: 44px;
  }
}
</style>
