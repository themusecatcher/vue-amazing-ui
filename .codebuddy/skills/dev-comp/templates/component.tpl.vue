<script setup lang="ts">
// dev-comp template: 组件本体骨架
// 用 useInject 获取主题配置
// import { useInject } from '../../utils'

defineOptions({ name: 'Xxx' })

/* eslint-disable @typescript-eslint/no-empty-object-type */
const props = withDefaults(
  defineProps<{
    // 在此定义 props（参考 antdv/naive 对应组件的 API）
  }>(),
  {}
)

const emit = defineEmits<{
  // 在此定义事件
}>()
/* eslint-enable @typescript-eslint/no-empty-object-type */

// 组件逻辑
</script>

<template>
  <div class="vui-xxx">
    <!-- 组件模板 -->
  </div>
</template>

<style lang="less" scoped>
.vui-xxx {
  // light 主题
}

// dark 主题
</style>
