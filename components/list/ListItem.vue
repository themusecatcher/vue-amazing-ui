<script setup lang="ts">
import { computed, useSlots } from 'vue'
import type { CSSProperties } from 'vue'
interface Props {
  avatar?: string // 列表元素的图标 string | slot
  title?: string // 列表元素的标题 string | slot
  description?: string // 列表元素的描述内容 string | slot
  extra?: string // 额外内容，在 vertical 的情况下, 展示右侧内容; horizontal 展示在列表元素最右侧 string | slot
  avatarStyle?: CSSProperties // 设置图标的样式
  titleStyle?: CSSProperties // 设置标题的样式
  descriptionStyle?: CSSProperties // 设置描述内容的样式
  contentStyle?: CSSProperties // 设置内容的样式
  actionsStyle?: CSSProperties // 设置操作区域的样式
  extraStyle?: CSSProperties // 设置额外内容的样式
}
const props = withDefaults(defineProps<Props>(), {
  avatar: undefined,
  title: undefined,
  description: undefined,
  extra: undefined,
  avatarStyle: () => ({}),
  titleStyle: () => ({}),
  descriptionStyle: () => ({}),
  contentStyle: () => ({}),
  actionsStyle: () => ({}),
  extraStyle: () => ({})
})
const slots = useSlots()
const showAvatar = computed(() => {
  const avatarSlots = slots.avatar?.()
  return Boolean(avatarSlots && avatarSlots?.length)
})
const showContent = computed(() => {
  const titleSlots = slots.title?.()
  const descriptionSlots = slots.description?.()
  let n = 0
  if (titleSlots && titleSlots[0].children?.length) {
    n++
  }
  if (descriptionSlots && descriptionSlots[0].children?.length) {
    n++
  }
  return Boolean(n) || props.title || props.description
})
const showDefault = computed(() => {
  const defaultSlots = slots.default?.()
  return Boolean(defaultSlots && defaultSlots?.length)
})
const showActions = computed(() => {
  const actionsSlots = slots.actions?.()
  return Boolean(actionsSlots && actionsSlots?.length)
})
const showExtra = computed(() => {
  const extraSlots = slots.extra?.()
  return Boolean(extraSlots && extraSlots?.length)
})
</script>
<template>
  <div class="m-list-item">
    <div class="m-list-item-main">
      <div class="m-list-item-meta" v-if="showAvatar || showContent">
        <div class="m-list-item-avatar" v-if="showAvatar" :style="avatarStyle">
          <slot name="avatar"></slot>
        </div>
        <div class="m-list-item-content" v-if="showContent">
          <h4 class="list-item-title" :style="titleStyle">
            <slot name="title">{{ title }}</slot>
          </h4>
          <div class="list-item-description" :style="descriptionStyle">
            <slot name="description">{{ description }}</slot>
          </div>
        </div>
      </div>
      <div v-if="showDefault" :style="contentStyle">
        <slot></slot>
      </div>
      <div class="list-item-actions" v-if="showActions" :style="actionsStyle">
        <slot name="actions"></slot>
      </div>
    </div>
    <div class="list-item-extra" v-if="showExtra" :style="extraStyle">
      <slot name="extra"></slot>
    </div>
  </div>
</template>
<style lang="less" scoped>
.m-list-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 24px;
  color: rgba(0, 0, 0, 0.88);
  max-width: 100%;
  transition: all 0.3s;
  .m-list-item-main {
    display: flex;
    align-items: center;
    flex: 1;
    .m-list-item-meta {
      display: flex;
      flex: 1;
      align-items: flex-start;
      max-width: 100%;
      .m-list-item-avatar {
        margin-right: 16px;
      }
      .m-list-item-content {
        flex: 1 0;
        width: 0;
        color: rgba(0, 0, 0, 0.88);
        .list-item-title {
          margin-bottom: 4px;
          color: rgba(0, 0, 0, 0.88);
          font-size: 14px;
          line-height: 1.5714285714285714;
          :deep(a) {
            color: rgba(0, 0, 0, 0.88);
            transition: all 0.3s;
            &:hover {
              color: @themeColor;
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
      & > * {
        // 选择所有直接子元素，不包括深层的后代
        position: relative;
        display: inline-block;
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
        color: @themeColor;
        transition: color 0.3s;
        &:hover {
          color: #4096ff;
        }
      }
    }
  }
}
</style>
