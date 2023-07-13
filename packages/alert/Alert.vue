<script setup lang="ts">
import { ref, onMounted } from 'vue'
interface Props {
  message?: string // 警告提示内容 string | slot
  description?: string // 警告提示的辅助性文字介绍 string | slot
  type?: 'success'|'info'|'warn'|'error' // 指定警告提示的样式，有四种选择 success、info、warn、error
  closable?: boolean // 是否显示关闭按钮
}
const props = withDefaults(defineProps<Props>(), {
  message: '',
  description: '',
  type: 'info',
  closable: false
})
const descRef = ref() // 声明一个同名的模板引用
const showDesc = ref(1)
onMounted(() => {
  showDesc.value = descRef.value.clientHeight
})
</script>
<template>
  <div class="m-alert" :class="[`${type}`, {'width-description': showDesc}]">
    <div class="m-content">
      <div class="u-message">
        <slot name="message">{{ message }}</slot>
      </div>
      <div class="u-description" v-if="showDesc" ref="descRef">
        <slot name="description">{{ description }}</slot>
      </div>
    </div>
    <a class="m-close" v-if="closable">
      <svg focusable="false" class="u-close" data-icon="close" width="1em" height="1em" fill="currentColor" aria-hidden="true" viewBox="64 64 896 896"><path d="M563.8 512l262.5-312.9c4.4-5.2.7-13.1-6.1-13.1h-79.8c-4.7 0-9.2 2.1-12.3 5.7L511.6 449.8 295.1 191.7c-3-3.6-7.5-5.7-12.3-5.7H203c-6.8 0-10.5 7.9-6.1 13.1L459.4 512 196.9 824.9A7.95 7.95 0 00203 838h79.8c4.7 0 9.2-2.1 12.3-5.7l216.5-258.1 216.5 258.1c3 3.6 7.5 5.7 12.3 5.7h79.8c6.8 0 10.5-7.9 6.1-13.1L563.8 512z"></path></svg>
    </a>
  </div>
</template>
<style lang="less" scoped>
.m-alert {
  padding: 8px 12px;
  color: rgba(0, 0, 0, 0.88);
  font-size: 14px;
  line-height: 1.5714285714285714;
  position: relative;
  display: flex;
  align-items: center;
  word-wrap: break-word;
  border-radius: 8px;
  .m-content {
    flex: 1;
    min-width: 0;
  }
  .m-close {
    margin-inline-start: 8px;
    padding: 0;
    overflow: hidden;
    font-size: 12px;
    color: rgba(0, 0, 0, 0.45);
    line-height: 12px;
    background-color: transparent;
    border: none;
    outline: none;
    cursor: pointer;
    .u-close {
      display: inline-block;
      vertical-align: bottom;
    }
  }
}
.info {
  background-color: #e6f4ff;
  border: 1px solid #91caff;
}
.success {
  background-color: #f6ffed;
  border: 1px solid #b7eb8f;
}
.warn {
  background-color: #fffbe6;
  border: 1px solid #ffe58f;
}
.error {
  background-color: #fff2f0;
  border: 1px solid #ffccc7;
}
.width-description {
  align-items: flex-start;
  padding-inline: 24px;
  padding-block: 20px;
  .u-message {
    display: block;
    margin-bottom: 8px;
    color: rgba(0, 0, 0, 0.88);
    font-size: 16px;
  }
  .u-description {
    display: block;
  }
}
</style>
