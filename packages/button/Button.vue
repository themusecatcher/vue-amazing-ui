<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { computed } from 'vue'
interface Props {
  name?: string // 按钮默认文本 string | slot
  type?: string // 按钮类型
  effect?: string // 按钮悬浮变化效果，只有 type 为 default 时，reverse 才生效
  size?: string // 按钮尺寸
  width?: number // 按钮宽度
  height?: number // 按钮高度
  borderRadius?: number // 按钮圆角
  route?: object // 按钮跳转目标URL地址
  target?: string // 按钮如何打开目标URL，设置route时才起作用，与a标签的target属性一致
  disabled?: boolean // 按钮是否禁用
  loading?: boolean // 按钮是否加载中
  center?: boolean // 是否将按钮设置为块级元素并居中展示
}
const props = withDefaults(defineProps<Props>(), {
  name: '按钮', // string 或 v-slot
  type: 'default', // 'default' 'primary' 'danger'
  effect: 'fade', //  'fade' 'reverse'
  size: 'middle', // 'small' 'middle' 'large'
  width: 0, // 优先级高于size属性，为0时自适应内容的宽度
  height: 0, // 优先级高于size属性
  borderRadius: 5,
  route: () => { return {} },
  target: '_self',
  disabled: false,
  loading: false,
  center: false
})
const isRoute = computed(() => {
  if (JSON.stringify(props.route) === '{}') {
    return false
  } else {
    return true
  }
})
</script>
<template>
  <span :class="['m-btn-wrap', {'center': center}]">
    <RouterLink
      v-if="isRoute"
      :to="route"
      :target="target"
      :disabled="disabled"
      class="m-btn fade"
      :class="[type, size, {[effect]: type === 'default', widthType: width, disabled: disabled}]"
      :style="`border-radius: ${borderRadius}px; width: ${width ? width + 'px':'auto'}; height: ${height ? height + 'px':'auto'}; line-height: ${height - 2}px;`">
      <span class="u-text">
        <slot>{{ name }}</slot>
      </span>
    </RouterLink>
    <a
      v-else
      @click.stop="$emit('click')"
      :disabled="disabled"
      class="m-btn"
      :class="[type, size, {[effect]: type === 'default', widthType: width, disabled: disabled, 'm-btn-loading': loading}]"
      :style="`border-radius: ${borderRadius}px; width: ${width ? width + 'px':'auto'}; height: ${height ? height + 'px':'auto'}; line-height: ${height - 2}px;`">
      <span class="m-loading-icon" :class="{'show-spin': loading}">
        <span class="u-spin-circle" v-show="loading"></span>
      </span>
      <span class="u-text">
        <slot>{{ name }}</slot>
      </span>
    </a>
  </span>
</template>
<style lang="less" scoped>
.m-btn-wrap {
  box-sizing: border-box;
  display: inline-block;
  .m-btn {
    display: inline-block;
    color: rgba(0,0,0,.88);
    background-color: transparent;
    border: 1px solid #d9d9d9;
    box-shadow: 0 2px 0 rgba(0, 0, 0, 0.02);
    transition: all .2s cubic-bezier(.645,.045,.355,1);
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    cursor: pointer;
    .m-loading-icon {
      display: inline-flex;
      align-items: center;
      text-align: left;
      opacity: 0;
      width: 0;
      transition: width 0.3s cubic-bezier(0.645, 0.045, 0.355, 1),opacity 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
      .u-spin-circle {
        display: inline-block;
        width: 12px;
        height: 12px;
        border-radius: 50%;
        border-width: 1px;
        border-style: solid;
        border-color: transparent;
        border-top-color: inherit; // 显示1/4圆
        animation: loadingCircle 1s infinite linear;
        -webkit-animation: loadingCircle 1s infinite linear;
      }
      @keyframes loadingCircle {
        100% {
          transform: rotate(360deg);
        }
      }
    }
    .show-spin {
      width: 22px;
      opacity: 1;
    }
    .u-text {
      display: inline-block;
    }
  }
  .m-btn-loading {
    opacity: 0.65;
    pointer-events: none;
  }
  .primary {
    color: #fff;
    background-color: @primary;
    border-color: @primary;
    text-shadow: 0 -1px 0 rgb(0 0 0 / 12%);
    box-shadow: 0 2px 0 rgb(0 0 0 / 5%);
    &:hover {
      background-color: #40a9ff;
      border-color: #40a9ff;
    }
    &:active {
      background-color: #096dd9;
      border-color: #096dd9;
    }
  }
  .default {
    .fade();
  }
  .danger {
    color: #fff;
    background-color: @danger;
    border-color: @danger;
    text-shadow: 0 -1px 0 rgb(0 0 0 / 12%);
    box-shadow: 0 2px 0 rgb(0 0 0 / 5%);
    &:hover {
      background-color: fade(@danger, 80%);
      border-color: fade(@danger, 80%);
    }
    &:active {
      background-color: #d9363e;
      border-color: #d9363e;
    }
  }
  .fade {
    &:hover {
      color: fade(@themeColor, 80%);
      border-color: fade(@themeColor, 80%);
    }
    &:active {
      color: shade(@themeColor, 12%);
      border-color: shade(@themeColor, 12%);
    }
  }
  .reverse {
    &:hover {
      color: #fff;
      background-color: fade(@themeColor, 80%);
      border-color: fade(@themeColor, 80%);
    }
    &:active {
      color: #fff;
      background-color: shade(@themeColor, 12%);
      border-color: shade(@themeColor, 12%);
    }
  }
  .small {
    line-height: 22px;
    padding: 0 7px;
    font-size: 14px;
  }
  .middle {
    line-height: 30px;
    padding: 0 15px;
    font-size: 14px;
  }
  .large {
    line-height: 38px;
    padding: 0 15px;
    font-size: 16px;
  }
  .widthType {
    padding: 0;
    text-align: center;
  }
  .disabled {
    color: rgba(0, 0, 0, 0.25);
    background-color: #f5f5f5;
    border-color: #d9d9d9;
    text-shadow: none;
    box-shadow: none;
    cursor: not-allowed;
    &:hover, &:active {
      color: rgba(0, 0, 0, 0.25);
      background-color: #f5f5f5;
      border-color: #d9d9d9;
      text-shadow: none;
      box-shadow: none;
    }
  }
}
.center {
  display: block;
  text-align: center;
}
</style>
