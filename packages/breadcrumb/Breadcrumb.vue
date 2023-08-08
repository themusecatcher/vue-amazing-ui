<script setup lang="ts">
import { computed } from 'vue'
interface Query {
  [propName: string]: any // 添加一个字符串索引签名，用于包含带有任意数量的其他属性
}
interface Route {
  path: string // 路由地址
  query?: Query // 路由查询参数
  name: string // 路由名称
}
interface Props {
  routes: Array<Route> // 或者Route[] router的路由数组，没有 ? 时，即表示 required: true
  fontSize?: number // 字体大小
  height?: number // 面包屑高度
  maxWidth?: number // 文本最大显示宽度，超出后显示省略号
  separator?: string // 自定义分隔符
  target?: '_self'|'_blank' // 如何打开目标URL，当前窗口或新窗口
}
const props = withDefaults(defineProps<Props>(), {
  routes: () => [],
  fontSize: 14,
  height: 21,
  maxWidth: 180,
  separator: '',
  target: '_self'
})
const len = computed(() => {
  return props.routes.length
})
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
  <div class="m-breadcrumb" :style="`height: ${height}px;`">
    <div class="m-bread" v-for="(route, index) in routes" :key="index">
      <a
        :class="['u-route',{ active: index===len-1 }]"
        :style="`font-size: ${fontSize}px; max-width: ${maxWidth}px;`"
        :href="index === len - 1 ? 'javascript:;' : getUrl(route)"
        :title="route.name"
        :target="index === len - 1 ? '_self' : target">
        {{ route.name || '--' }}
      </a>
      <template v-if="index !== len - 1">
        <span v-if="separator" class="u-separator">{{ separator }}</span>
        <svg v-else class="u-arrow" viewBox="64 64 896 896" data-icon="right" aria-hidden="true" focusable="false"><path d="M765.7 486.8L314.9 134.7A7.97 7.97 0 0 0 302 141v77.3c0 4.9 2.3 9.6 6.1 12.6l360 281.1-360 281.1c-3.9 3-6.1 7.7-6.1 12.6V883c0 6.7 7.7 10.4 12.9 6.3l450.8-352.1a31.96 31.96 0 0 0 0-50.4z"></path></svg>
      </template>
    </div>
    <div class="assist"></div>
  </div>
</template>
<style lang="less" scoped>
.m-breadcrumb {
  display: flex;
  align-items: center;
  .m-bread {
    display: inline-flex;
    align-items: center;
    line-height: 1.5714285714285714;
    .u-route {
      color: rgba(0, 0, 0, .45);
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      cursor: pointer;
      padding: 0 4px;
      border-radius: 4px;
      transition: color .2s, background-color .2s;
      &:hover {
        background-color: rgba(0, 0, 0, .05);
        color: rgba(0, 0, 0, .88);
      }
    }
    .active {
      color: rgba(0, 0, 0, .88);
      cursor: default;
      &:hover {
        background-color: transparent;
      }
    }
    .u-separator {
      margin: 0 4px;
      color: rgba(0, 0, 0, .45);
    }
    .u-arrow {
      width: 12px;
      height: 12px;
      fill: rgba(0, 0, 0, .45);
    }
  }
  .assist {
    height: 100%;
    width: 0;
    display: inline-block;
    vertical-align: middle;
  }
}
</style>
