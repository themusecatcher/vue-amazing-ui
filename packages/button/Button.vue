<script setup lang="ts">
import { computed } from 'vue'
interface Query {
  [propName: string]: any // 添加一个字符串索引签名，用于包含带有任意数量的其他属性
}
interface Route {
  path?: string // 路由地址
  query?: Query // 路由查询参数
}
interface Props {
  name?: string // 按钮文本 string | slot
  type?: 'default'|'primary'|'danger'|'dashed'|'text'|'link' // 按钮类型
  effect?: 'fade'|'reverse' // 悬浮变化效果，只有 type 为 default 时，effect 才生效
  size?: 'small'|'middle'|'large' // 按钮尺寸
  route?: Route // 跳转目标URL地址
  target?: '_self'|'_blank' // 如何打开目标URL，设置route时才起作用，与a标签的target属性一致
  disabled?: boolean // 是否禁用
  loading?: boolean // 是否加载中
  center?: boolean // 是否将按钮宽度调整为其父宽度并居中展示
}
const props = withDefaults(defineProps<Props>(), {
  name: '按钮',
  type: 'default',
  effect: 'fade',
  size: 'middle',
  route: () => ({}),
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
const emit = defineEmits(['click'])
function onClick (e: Event) {
  if (!isRoute.value) {
    emit('click', e)
  }
}
function getUrl (route: Route) {
  var targetUrl = route.path
  if (route.query && JSON.stringify(route.query) !== '{}') {
    const query = route.query
    Object.keys(query).forEach((param, index) => {
      if (index === 0) {
        targetUrl = targetUrl + '?' + param + '=' + query[param]
      } else {
        targetUrl = targetUrl + '&' + param + '=' + query[param]
      }
    })
  }
  return targetUrl
}
</script>
<template>
  <div :class="['m-btn-wrap', {'center': center}]">
    <a
      @click="onClick"
      :href="getUrl(route)"
      :target="isRoute ? target : '_self'"
      :disabled="disabled"
      class="m-btn"
      :class="[type, size, {[effect]: type === 'default', disabled: disabled, 'm-btn-loading': !isRoute && loading}]">
      <span v-show="!isRoute" :class="[`m-loading-icon`, {[`loading-${size}`]: loading}]">
        <span class="u-spin-circle" :class="`spin-${size}`"></span>
      </span>
      <span class="u-text">
        <slot>{{ name }}</slot>
      </span>
    </a>
  </div>
</template>
<style lang="less" scoped>
@primary: @themeColor;
@danger: #FF4D4F;
.m-btn-wrap {
  display: inline-block;
  .m-btn {
    position: relative;
    display: inline-flex;
    align-items: center;
    font-weight: 400;
    line-height: 1.5714285714285714;
    color: rgba(0, 0, 0, .88);
    white-space: nowrap;
    text-align: center;
    background-color: transparent;
    border: 1px solid transparent;
    user-select: none;
    cursor: pointer;
    transition: all 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
    .m-loading-icon {
      display: inline-flex;
      align-items: center;
      text-align: left;
      opacity: 0;
      width: 0;
      height: 100%;
      transition: width .3s cubic-bezier(0.645, 0.045, 0.355, 1), opacity .3s cubic-bezier(0.645, 0.045, 0.355, 1);
      .u-spin-circle {
        border-radius: 50%;
        border-width: 1px;
        border-style: solid;
        border-color: transparent;
        border-top-color: inherit; // 显示1/4圆
        animation: loadingCircle 1s infinite linear;
        -webkit-animation: loadingCircle 1s infinite linear;
      }
      .spin-small, .spin-middle {
        width: 14px;
        height: 14px;
      }
      .spin-large {
        width: 16px;
        height: 16px;
      }
      @keyframes loadingCircle {
        100% {
          transform: rotate(360deg);
        }
      }
    }
    .loading-small, .loading-middle {
      width: 22px;
      opacity: 1;
    }
    .loading-large {
      width: 24px;
      opacity: 1;
    }
    .u-text {
      display: inline-flex;
      align-items: center;
      height: 100%;
    }
  }
  .m-btn-loading {
    opacity: .65;
    pointer-events: none;
  }
  .fade {
    background-color: #ffffff;
    border-color: #d9d9d9;
    box-shadow: 0 2px 0 rgba(0, 0, 0, .02);
    &:hover {
      color: fade(@primary, 80%);
      border-color: fade(@primary, 80%);
    }
    &:active {
      color: shade(@primary, 12%);
      border-color: shade(@primary, 12%);
    }
  }
  .default {
    .fade();
  }
  .primary {
    color: #fff;
    background-color: @primary;
    box-shadow: 0 2px 0 rgba(5, 145, 255, .1);
    &:hover {
      background-color: fade(@primary, 80%);
      border-color: fade(@primary, 80%);
    }
    &:active {
      background-color: shade(@primary, 12%);
      border-color: shade(@primary, 12%);
    }
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
      background-color: shade(@danger, 12%);
      border-color: shade(@danger, 12%);
    }
  }
  .dashed {
    .fade();
    border-style: dashed;
  }
  .text {
    &:hover {
      background-color: rgba(0, 0, 0, .06);
    }
    &:active {
      background-color: rgba(0, 0, 0, .15);
    }
  }
  .link {
    color: @primary;
    &:hover {
      color: fade(@primary, 80%);
    }
    &:active {
      color: shade(@primary, 12%);
    }
  }
  .reverse {
    &:hover {
      color: #fff;
      background-color: fade(@primary, 80%);
      border-color: fade(@primary, 80%);
    }
    &:active {
      color: #fff;
      background-color: shade(@primary, 12%);
      border-color: shade(@primary, 12%);
    }
  }
  .small {
    font-size: 14px;
    height: 24px;
    padding: 0px 7px;
    border-radius: 4px;
  }
  .middle {
    font-size: 14px;
    height: 32px;
    padding: 4px 15px;
    border-radius: 6px;
  }
  .large {
    font-size: 16px;
    height: 40px;
    padding: 6.428571428571429px 15px;
    border-radius: 8px;
  }
  .disabled {
    border-color: #d9d9d9;
    color: rgba(0, 0, 0, .25);
    background-color: rgba(0, 0, 0, .04);
    box-shadow: none;
    cursor: not-allowed;
    &:hover, &:active {
      border-color: #d9d9d9;
      color: rgba(0, 0, 0, .25);
      background-color: rgba(0, 0, 0, .04);
    }
    &.text, &.link {
      background-color: transparent;
      border: none;
    }
  }
}
.center {
  display: block;
  text-align: center;
}
</style>
