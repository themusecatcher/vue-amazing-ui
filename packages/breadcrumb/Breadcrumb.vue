<template>
  <div class="m-breadcrumb" :style="`height: ${height}px;`">
    <div class="m-bread" v-for="(route, index) in routes" :key="index">
      <a
        :class="['u-route',{ active: index===len-1 }]"
        @click="index === len - 1 ? (e:any) => e.preventDefault() : goRouter(route)"
        :title="route.name">
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
<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'Breadcrumb',
  props: {
    routes: { // router的路由数组
      type: Array,
      required: true,
      default: () => {
        return []
      }
    },
    height: { // 面包屑高度
      type: Number,
      default: 60
    },
    separator: { // 自定义分隔符
      type: String,
      default: ''
    }
  },
  computed: {
    len () { // 面包屑层级总数
      return this.routes.length
    }
  },
  methods: {
    goRouter (route: { path: string, query: object }) {
      this.$router.push({ path: route.path, query: route.query || {} })
    }
  }
})
</script>
<style lang="less" scoped>
.m-breadcrumb {
  .m-bread {
    display: inline-block;
    vertical-align: middle;
    .u-route {
      height: 22px;
      font-size: 16px;
      font-weight: 400;
      line-height: 22px;
      color: #333;
      display: inline-block;
      vertical-align: middle;
      max-width: 240px;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      cursor: pointer;
      &:hover {
        color: @themeColor;
      }
    }
    .active {
      color: @themeColor;
      cursor: default;
    }
    .u-separator {
      display: inline-block;
      vertical-align: middle;
      margin: 0 6px;
    }
    .u-arrow {
      .u-separator();
      margin: 0 5px;
      width: 12px;
      height: 12px;
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