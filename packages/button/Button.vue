<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  name?: string, // 按钮默认文本
  type?: string, // 按钮类型
  effect?: string, // 按钮悬浮变化效果，只有type为default时，reverse才生效
  size?: string, // 按钮尺寸
  width?: number, // 按钮宽度
  height?: number, // 按钮高度
  borderRadius?: number, // 按钮圆角
  route?: object, // 按钮跳转目标URL地址
  target?: string, // 按钮如何打开目标URL，设置route时才起作用
  disabled?: boolean, // 按钮是否禁用
  center?: boolean, // 是否将按钮设置为块级元素并居中展示
}
const props = withDefaults(defineProps<Props>(), {
  name: '按钮', // string 或 v-slot
  type: 'default', // 'default' 'primary' 'danger'
  effect: 'fade', //  'fade' 'reverse'
  size: 'middle', // 'small' 'middle' 'large'
  width: 0, // 默认0时自适应内容的宽度
  height: 40,
  borderRadius: 4,
  route: () => { return {} },
  target: '_self',
  disabled: false,
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
  <span :class="['m-button', {'center': center}]">
    <router-link
      v-if="isRoute"
      :to="route"
      :target="target"
      :disabled="disabled"
      class="u-button fade"
      :class="[type, size, {[effect]: type === 'default', widthType: width, disabled: disabled}]"
      :style="{borderRadius: borderRadius + 'px', width: (width - 2) + 'px', height: (height - 2)+'px', lineHeight: (height - 2)+'px'}">
      <slot>{{ name }}</slot>
    </router-link>
    <a
      v-else
      @click.stop="$emit('click')"
      :disabled="disabled"
      class="u-button"
      :class="[type, size, {[effect]: type === 'default', widthType: width, disabled: disabled}]"
      :style="{borderRadius: borderRadius + 'px', width: (width - 2) + 'px', height: (height - 2)+'px', lineHeight: (height - 2)+'px'}">
      <slot>{{ name }}</slot>
    </a>
  </span>
</template>
<style lang="less" scoped>
@primary: '#1890FF';
@danger: '#ff4d4f';
.m-button {
  display: inline-block;
  .u-button {
    display: inline-block;
    color: rgba(0,0,0,.65);
    background-color: #fff;
    border: 1px solid #d9d9d9;
    box-shadow: 0 2px 0 rgb(0 0 0 / 2%);
    transition: all .3s cubic-bezier(.645,.045,.355,1);
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    cursor: pointer;
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
      background-color: #ff7875;
      border-color: #ff7875;
    }
    &:active {
      background-color: #d9363e;
      border-color: #d9363e;
    }
  }
  .fade {
    &:hover {
      color: #40a9ff;
      border-color: #40a9ff;
    }
    &:active {
      color: #096dd9;
      border-color: #096dd9;
    }
  }
  .reverse {
    &:hover {
      color: #fff;
      background-color: #40a9ff;
      border-color: #40a9ff;
    }
    &:active {
      color: #fff;
      background-color: #096dd9;
      border-color: #096dd9;
    }
  }
  .small {
    height: 24px;
    line-height: 24px;
    padding: 0 7px;
    font-size: 14px;
  }
  .middle {
    height: 32px;
    line-height: 32px;
    padding: 0 15px;
    font-size: 14px;
  }
  .large {
    height: 40px;
    line-height: 40px;
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
  }
}
.center {
  display: block;
  text-align: center;
}
</style>
