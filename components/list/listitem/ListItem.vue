<script setup lang="ts">
import { computed } from 'vue'
import type { CSSProperties, Slot } from 'vue'
import Avatar from 'components/avatar'
import { useSlotsExist } from 'components/utils'
export interface Props {
  avatar?: string // 列表元素的图标 string | slot
  avatarProps?: object // Avatar 组件属性配置，参考 Avatar Props，用于配置列表图标样式
  title?: string // 列表元素的标题 string | slot
  description?: string // 列表元素的描述内容 string | slot
  actions?: Slot // 列表操作组 slot
  extra?: string // 额外内容，展示在列表右侧 string | slot
  avatarStyle?: CSSProperties // 设置图标的样式
  titleStyle?: CSSProperties // 设置标题的样式
  descriptionStyle?: CSSProperties // 设置描述内容的样式
  contentStyle?: CSSProperties // 设置内容的样式
  actionsStyle?: CSSProperties // 设置操作区域的样式
  extraStyle?: CSSProperties // 设置额外内容的样式
}
const props = withDefaults(defineProps<Props>(), {
  avatar: undefined,
  avatarProps: () => ({}),
  title: undefined,
  description: undefined,
  actions: undefined,
  extra: undefined,
  avatarStyle: () => ({}),
  titleStyle: () => ({}),
  descriptionStyle: () => ({}),
  contentStyle: () => ({}),
  actionsStyle: () => ({}),
  extraStyle: () => ({})
})
const slotsExist = useSlotsExist(['avatar', 'title', 'description', 'default', 'actions', 'extra'])
const showAvatar = computed(() => {
  return slotsExist.avatar || props.avatar || JSON.stringify(props.avatarProps) !== '{}'
})
const showContent = computed(() => {
  return slotsExist.title || slotsExist.description || props.title || props.description
})
const showExtra = computed(() => {
  return slotsExist.extra || props.extra
})
</script>
<template>
  <div class="list-item-wrap">
    <div class="list-item-main">
      <div v-if="showAvatar || showContent" class="list-item-meta">
        <div v-if="showAvatar" class="list-item-avatar" :style="avatarStyle">
          <slot name="avatar">
            <Avatar v-bind="avatarProps">{{ avatar }}</Avatar>
          </slot>
        </div>
        <div v-if="showContent" class="list-item-content">
          <p class="list-item-title" :style="titleStyle">
            <slot name="title">{{ title }}</slot>
          </p>
          <div class="list-item-description" :style="descriptionStyle">
            <slot name="description">{{ description }}</slot>
          </div>
        </div>
      </div>
      <div v-if="slotsExist.default" :style="contentStyle">
        <slot></slot>
      </div>
      <div v-if="slotsExist.actions" class="list-item-actions" :style="actionsStyle">
        <slot name="actions"></slot>
      </div>
    </div>
    <div v-if="showExtra" class="list-item-extra" :style="extraStyle">
      <slot name="extra">{{ extra }}</slot>
    </div>
  </div>
</template>
<style lang="less" scoped>
.list-item-wrap {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 24px;
  color: rgba(0, 0, 0, 0.88);
  max-width: 100%;
  transition: all 0.3s;
  .list-item-main {
    display: flex;
    align-items: center;
    flex: 1;
    .list-item-meta {
      display: flex;
      flex: 1;
      align-items: flex-start;
      max-width: 100%;
      .list-item-avatar {
        margin-right: 16px;
      }
      .list-item-content {
        flex: 1 0;
        width: 0;
        color: rgba(0, 0, 0, 0.88);
        .list-item-title {
          margin-bottom: 4px;
          color: rgba(0, 0, 0, 0.88);
          font-size: 14px;
          font-weight: 700;
          line-height: 1.5714285714285714;
          :deep(a) {
            font-weight: 700;
            color: rgba(0, 0, 0, 0.88);
            transition: all 0.3s;
            &:hover {
              color: #1677ff;
            }
          }
        }
        .list-item-description {
          color: rgba(0, 0, 0, 0.45);
          font-size: 14px;
          line-height: 1.5714285714285714;
        }
      }
    }
    .list-item-actions {
      flex: 0 0 auto;
      margin-left: 48px;
      font-size: 0;
      :deep(svg) {
        fill: currentColor;
      }
      & > * {
        // 选择所有直接子元素，不包括深层的后代
        position: relative;
        display: inline-flex;
        align-items: center;
        padding: 0 8px;
        color: rgba(0, 0, 0, 0.45);
        font-size: 14px;
        line-height: 1.5714285714285714;
        text-align: center;
        &:first-child {
          padding-left: 0;
        }
        &:not(:last-child) {
          &::after {
            position: absolute;
            top: 50%;
            right: 0;
            width: 1px;
            height: 14px;
            transform: translateY(-50%);
            background-color: rgba(5, 5, 5, 0.06);
            content: '';
          }
        }
      }
      & > :deep(a) {
        // 选择所有直接子元素且是 a 标签
        color: #1677ff;
        transition: color 0.3s;
        &:hover {
          color: #4096ff;
        }
      }
    }
  }
  .list-item-extra {
    margin-left: 24px;
  }
}
</style>
