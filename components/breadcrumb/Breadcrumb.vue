<script setup lang="ts">
import { computed } from 'vue'
import type { CSSProperties } from 'vue'
export interface Query {
  [propName: string]: any // 添加一个字符串索引签名，用于包含带有任意数量的其他属性
}
export interface Route {
  name: string // 路由名称
  path?: string // 路由地址
  query?: Query // 路由查询参数
}
export interface Props {
  routes?: Route[] // router 路由数组
  breadcrumbClass?: string // 设置面包屑类名
  breadcrumbStyle?: CSSProperties // 设置面包屑样式
  maxWidth?: string | number // 设置文本最大显示宽度，超出后显示省略号，单位 px
  separator?: string // 自定义分隔符，默认为 '>' string | slot
  separatorStyle?: CSSProperties // 设置分隔符样式
  target?: '_self' | '_blank' // 如何打开目标 URL，当前窗口或新窗口
}
const props = withDefaults(defineProps<Props>(), {
  routes: () => [],
  breadcrumbClass: undefined,
  breadcrumbStyle: () => ({}),
  maxWidth: '100%',
  separator: undefined,
  separatorStyle: () => ({}),
  target: '_self'
})
const breadcrumbAmount = computed(() => {
  return props.routes.length
})
function getTargetUrl(route: Route): string {
  let targetUrl: string = ''
  if (route.path) {
    targetUrl = route.path
  }
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
  <div
    class="m-breadcrumb"
    :class="breadcrumbClass"
    :style="[
      `
        --breadcrumb-color: rgba(0, 0, 0, 0.45);
        --breadcrumb-bg-color-hover: rgba(0, 0, 0, 0.06);
        --breadcrumb-color-hover: rgba(0, 0, 0, 0.88);
        --breadcrumb-color-active: rgba(0, 0, 0, 0.88);
        --breadcrumb-padding: 0 4px;
        --breadcrumb-border-radius: 4px;
        --breadcrumb-separator-color: rgba(0, 0, 0, 0.45);
      `,
      breadcrumbStyle
    ]"
  >
    <div class="breadcrumb-item" v-for="(route, index) in routes" :key="index">
      <component
        :is="route.path ? 'a' : 'span'"
        class="breadcrumb-link"
        :class="{
          'link-hover': route.path,
          'link-active': index === breadcrumbAmount - 1
        }"
        :style="`max-width: ${maxWidth}px;`"
        :href="getTargetUrl(route)"
        :target="target"
        :title="route.name"
      >
        {{ route.name }}
      </component>
      <span v-if="index < breadcrumbAmount - 1" class="breadcrumb-separator" :style="separatorStyle">
        <slot name="separator" :route="route" :index="index">
          <span v-if="separator">{{ separator }}</span>
          <svg
            v-else
            focusable="false"
            data-icon="right"
            width="1em"
            height="1em"
            fill="currentColor"
            aria-hidden="true"
            viewBox="64 64 896 896"
          >
            <path
              d="M765.7 486.8L314.9 134.7A7.97 7.97 0 00302 141v77.3c0 4.9 2.3 9.6 6.1 12.6l360 281.1-360 281.1c-3.9 3-6.1 7.7-6.1 12.6V883c0 6.7 7.7 10.4 12.9 6.3l450.8-352.1a31.96 31.96 0 000-50.4z"
            ></path>
          </svg>
        </slot>
      </span>
    </div>
  </div>
</template>
<style lang="less" scoped>
.m-breadcrumb {
  font-size: 14px;
  color: var(--breadcrumb-color);
  line-height: 1.5714285714285714;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  .breadcrumb-item {
    display: inline-flex;
    align-items: center;
    .breadcrumb-link {
      display: inline-block;
      color: var(--breadcrumb-color);
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      padding: var(--breadcrumb-padding);
      border-radius: var(--breadcrumb-border-radius);
      text-decoration: none;
      cursor: text;
      transition:
        color 0.2s,
        background-color 0.2s;
    }
    .link-hover {
      cursor: pointer;
      &:hover {
        background-color: var(--breadcrumb-bg-color-hover);
        color: var(--breadcrumb-color-hover);
      }
    }
    .link-active {
      color: var(--breadcrumb-color-active);
    }
    .breadcrumb-separator {
      display: inline-flex;
      align-items: center;
      margin: 0 4px;
      color: var(--breadcrumb-separator-color);
      :deep(svg) {
        margin-left: -2px;
        margin-right: -2px;
        fill: currentColor;
      }
    }
  }
}
</style>
