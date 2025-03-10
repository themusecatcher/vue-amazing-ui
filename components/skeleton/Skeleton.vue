<script setup lang="ts">
import { computed } from 'vue'
export interface SkeletonButtonProps {
  shape?: 'default' | 'round' | 'circle' // 指定按钮的形状，默认 'default'
  size?: 'small' | 'middle' | 'large' // 设置按钮的大小，默认 'middle'
  block?: boolean // 将按钮宽度调整为其父宽度的选项，默认 false
}
export interface SkeletonAvatarProps {
  shape?: 'circle' | 'square' // 指定头像的形状，默认 'circle'
  size?: number | 'small' | 'middle' | 'large' // 设置头像占位图的大小，默认 'middle'
}
export interface SkeletonInputProps {
  size: 'small' | 'middle' | 'large' // 设置输入框的大小，默认 'middle'
}
export interface SkeletonTitleProps {
  width?: number | string // 设置标题占位图的宽度，默认 '38%'
}
export interface SkeletonParagraphProps {
  rows?: number | string // 设置段落占位图的行数，默认 avatar ? 2 : 3
  width?: number | string | Array<number | string> // 设置段落占位图的宽度，若为数组时则为对应的每行宽度，反之则是最后一行的宽度，默认 '61%'
}
export interface Props {
  animated?: boolean // 是否展示动画效果
  button?: boolean | SkeletonButtonProps // 是否使用按钮占位图
  avatar?: boolean | SkeletonAvatarProps // 是否显示头像占位图
  input?: boolean | SkeletonInputProps // 是否使用输入框占位图
  image?: boolean // 是否使用图像占位图
  title?: boolean | SkeletonTitleProps // 是否显示标题占位图
  paragraph?: boolean | SkeletonParagraphProps // 是否显示段落占位图
  loading?: boolean // 为 true 时，显示占位图，反之则直接展示子组件
}
const props = withDefaults(defineProps<Props>(), {
  animated: true,
  button: false,
  image: false,
  avatar: false,
  input: false,
  title: true,
  paragraph: true,
  loading: true
})
const buttonSize = computed(() => {
  if (typeof props.button === 'object') {
    if (props.button.size === 'large') {
      return 40
    }
    if (props.button.size === 'small') {
      return 24
    }
    return 32
  }
})
const titleTop = computed(() => {
  if (typeof props.avatar === 'boolean') {
    return 8
  } else {
    if (typeof props.avatar.size === 'number') {
      return (props.avatar.size - 16) / 2
    } else {
      const topMap = {
        small: 4,
        middle: 8,
        large: 12
      }
      return topMap[props.avatar.size || 'middle']
    }
  }
})
const titleWidth = computed(() => {
  if (typeof props.title === 'boolean') {
    return '38%'
  } else {
    if (typeof props.title.width === 'number') {
      return `${props.title.width}px`
    }
    return props.title.width || '38%'
  }
})
const paragraphRows = computed(() => {
  if (typeof props.paragraph === 'boolean') {
    if (props.avatar) {
      return 2
    } else {
      return 3
    }
  } else {
    if (props.avatar) {
      return props.paragraph.rows || 2
    } else {
      return props.paragraph.rows || 3
    }
  }
})
const paragraphWidth = computed(() => {
  if (typeof props.paragraph === 'object') {
    if (Array.isArray(props.paragraph.width)) {
      return props.paragraph.width.map((width: number | string) => {
        if (typeof width === 'number') {
          return `${width}px`
        } else {
          return width
        }
      })
    } else if (typeof props.paragraph.width === 'number') {
      return Array(paragraphRows.value).fill(`${props.paragraph.width}px`)
    } else if (typeof props.paragraph.width === 'string') {
      return Array(paragraphRows.value).fill(props.paragraph.width)
    }
  }
  return Array(paragraphRows.value)
})
</script>
<template>
  <div
    v-if="loading"
    class="m-skeleton"
    :class="{ 'skeleton-avatar': avatar, 'skeleton-animated': animated }"
    :style="`--button-size: ${buttonSize}px; --title-top: ${titleTop}px;`"
  >
    <span
      v-if="button"
      class="skeleton-button"
      :class="{
        'button-round': typeof button !== 'boolean' && button.shape === 'round',
        'button-circle': typeof button !== 'boolean' && button.shape === 'circle',
        'button-sm': typeof button !== 'boolean' && button.size === 'small',
        'button-lg': typeof button !== 'boolean' && button.size === 'large',
        'button-block': typeof button !== 'boolean' && button.shape !== 'circle' && button.block
      }"
    ></span>
    <span
      v-if="input"
      class="skeleton-input"
      :class="{
        'input-sm': typeof input !== 'boolean' && input.size === 'small',
        'input-lg': typeof input !== 'boolean' && input.size === 'large'
      }"
    ></span>
    <div v-if="image" class="skeleton-image">
      <svg class="image-svg" viewBox="0 0 1098 1024" xmlns="http://www.w3.org/2000/svg">
        <path
          class="svg-path"
          d="M365.714286 329.142857q0 45.714286-32.036571 77.677714t-77.677714 32.036571-77.677714-32.036571-32.036571-77.677714 32.036571-77.677714 77.677714-32.036571 77.677714 32.036571 32.036571 77.677714zM950.857143 548.571429l0 256-804.571429 0 0-109.714286 182.857143-182.857143 91.428571 91.428571 292.571429-292.571429zM1005.714286 146.285714l-914.285714 0q-7.460571 0-12.873143 5.412571t-5.412571 12.873143l0 694.857143q0 7.460571 5.412571 12.873143t12.873143 5.412571l914.285714 0q7.460571 0 12.873143-5.412571t5.412571-12.873143l0-694.857143q0-7.460571-5.412571-12.873143t-12.873143-5.412571zM1097.142857 164.571429l0 694.857143q0 37.741714-26.843429 64.585143t-64.585143 26.843429l-914.285714 0q-37.741714 0-64.585143-26.843429t-26.843429-64.585143l0-694.857143q0-37.741714 26.843429-64.585143t64.585143-26.843429l914.285714 0q37.741714 0 64.585143 26.843429t26.843429 64.585143z"
        ></path>
      </svg>
    </div>
    <div v-if="avatar" class="skeleton-header">
      <span
        class="skeleton-avatar"
        :class="{
          'avatar-sm': typeof avatar !== 'boolean' && avatar.size === 'small',
          'avatar-lg': typeof avatar !== 'boolean' && avatar.size === 'large',
          'avatar-square': typeof avatar !== 'boolean' && avatar.shape === 'square'
        }"
      ></span>
    </div>
    <template v-if="!button && !image && !input">
      <div v-if="title || paragraph" class="skeleton-content">
        <h3 v-if="title" class="skeleton-title" :style="{ width: titleWidth }"></h3>
        <ul v-if="paragraph" class="skeleton-paragraph" :class="{ mt24: title, mt28: title && avatar }">
          <li v-for="n in paragraphRows" :key="n" :style="`width: ${paragraphWidth[(n as number) - 1]};`"></li>
        </ul>
      </div>
    </template>
  </div>
  <slot v-else></slot>
</template>
<style lang="less" scoped>
.m-skeleton {
  display: table;
  width: 100%;
  .skeleton-button {
    display: inline-block;
    vertical-align: top;
    background: rgba(0, 0, 0, 0.06);
    border-radius: 4px;
    width: 64px;
    min-width: 64px;
    height: 32px;
    line-height: 32px;
  }
  .button-sm {
    width: 48px;
    min-width: 48px;
    height: 24px;
    line-height: 24px;
  }
  .button-lg {
    width: 80px;
    min-width: 80px;
    height: 40px;
    line-height: 40px;
  }
  .button-round {
    border-radius: var(--button-size);
  }
  .button-circle {
    width: var(--button-size);
    min-width: var(--button-size);
    border-radius: 50%;
  }
  .button-block {
    width: 100%;
  }
  .skeleton-input {
    display: inline-block;
    vertical-align: top;
    background: rgba(0, 0, 0, 0.06);
    border-radius: 4px;
    width: 160px;
    min-width: 160px;
    height: 32px;
    line-height: 32px;
  }
  .input-sm {
    width: 120px;
    min-width: 120px;
    height: 24px;
    line-height: 24px;
  }
  .input-lg {
    width: 200px;
    min-width: 200px;
    height: 40px;
    line-height: 40px;
  }
  .skeleton-image {
    display: flex;
    align-items: center;
    justify-content: center;
    vertical-align: top;
    background: rgba(0, 0, 0, 0.06);
    border-radius: 4px;
    width: 96px;
    height: 96px;
    line-height: 96px;
    .image-svg {
      width: 48px;
      height: 48px;
      line-height: 48px;
      max-width: 192px;
      max-height: 192px;
      color: #bfbfbf;
      .svg-path {
        fill: currentColor;
      }
    }
  }
  .skeleton-header {
    display: table-cell;
    padding-right: 16px;
    vertical-align: top;
    .skeleton-avatar {
      display: inline-block;
      vertical-align: top;
      background: rgba(0, 0, 0, 0.06);
      width: 32px;
      height: 32px;
      line-height: 32px;
      border-radius: 50%;
    }
    .avatar-sm {
      width: 24px;
      height: 24px;
      line-height: 24px;
    }
    .avatar-lg {
      width: 40px;
      height: 40px;
      line-height: 40px;
    }
    .avatar-square {
      border-radius: 6px;
    }
  }
  .skeleton-content {
    display: table-cell;
    width: 100%;
    vertical-align: top;
    .skeleton-title {
      margin: 0;
      height: 16px;
      background: rgba(0, 0, 0, 0.06);
      border-radius: 4px;
    }
    .skeleton-paragraph {
      margin: 0;
      padding: 0;
      li {
        height: 16px;
        list-style: none;
        background: rgba(0, 0, 0, 0.06);
        border-radius: 4px;
        &:not(:first-child) {
          margin-top: 16px;
        }
        &:last-child {
          width: 61%;
        }
      }
    }
    .mt24 {
      margin-top: 24px;
    }
    .mt28 {
      margin-top: 28px;
    }
  }
}
.skeleton-avatar {
  .skeleton-content {
    .skeleton-title {
      margin-top: var(--title-top);
    }
  }
}
.skeleton-animated {
  .skeleton-button,
  .skeleton-input,
  .skeleton-image,
  .skeleton-header .skeleton-avatar,
  .skeleton-content .skeleton-title,
  .skeleton-content .skeleton-paragraph li {
    position: relative;
    z-index: 0;
    overflow: hidden;
    background: transparent;
    &::after {
      position: absolute;
      top: 0;
      left: -150%;
      bottom: 0;
      right: -150%;
      background: linear-gradient(90deg, rgba(0, 0, 0, 0.06) 25%, rgba(0, 0, 0, 0.15) 37%, rgba(0, 0, 0, 0.06) 63%);
      animation-name: skeletonLoading;
      animation-duration: 1.4s;
      animation-timing-function: ease;
      animation-iteration-count: infinite;
      content: '';
    }
    @keyframes skeletonLoading {
      0% {
        transform: translateX(-37.5%);
      }
      100% {
        transform: translateX(37.5%);
      }
    }
  }
}
</style>
