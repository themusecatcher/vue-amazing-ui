<script setup lang="ts">
import { computed, useSlots } from 'vue'
interface Props {
  avatar?: string // 列表元素的图标 string | slot
  title?: string // 列表元素的标题 string | slot
  description?: string // 列表元素的描述内容 string | slot
}
const props = withDefaults(defineProps<Props>(), {
  avatar: undefined,
  title: undefined,
  description: undefined
})
const slots = useSlots()
const showAvatar = computed(() => {
  const avatarSlots = slots.avatar?.()
  console.log('avatarSlots', avatarSlots)
  if (avatarSlots && avatarSlots?.length) {
    return true
  }
  return false
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
</script>
<template>
  <div class="m-list-item">
    <div class="m-list-item-avatar" v-if="showAvatar">
      <slot name="avatar"></slot>
    </div>
    <div class="m-list-item-content" v-if="showContent">
      <h4 class="list-item-title">
        <slot name="title">{{ title }}</slot>
      </h4>
      <div class="list-item-description">
        <slot name="description">{{ description }}</slot>
      </div>
    </div>
    <slot></slot>
  </div>
</template>
<style lang="less" scoped>
.m-list-item {
  display: flex;
  justify-content: space-between;
  padding: 12px 24px;
  color: rgba(0, 0, 0, 0.88);
  max-width: 100%;
  transition: all 0.3s;
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
</style>
