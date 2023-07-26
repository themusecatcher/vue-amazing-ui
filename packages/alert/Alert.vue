<script setup lang="ts">
import { ref, onMounted, nextTick } from 'vue'
interface Props {
  message?: string // 警告提示内容 string | slot
  description?: string // 警告提示的辅助性文字介绍 string | slot
  type?: 'success'|'info'|'warn'|'error' // 指定警告提示的样式，有四种选择 success、info、warn、error
  closable?: boolean // 是否显示关闭按钮
  closeText?: string // 自定义关闭按钮 string | slot
  icon?: string // 自定义图标，showIcon 为 true 时有效 string | slot
  showIcon?: boolean // 是否显示辅助图标
}
const props = withDefaults(defineProps<Props>(), {
  message: '',
  description: '',
  type: 'info',
  closable: false,
  closeText: '',
  icon: '',
  showIcon: false
})
const descRef = ref() // 声明一个同名的模板引用
const showDesc = ref(1)
const alert = ref()
onMounted(() => {
  showDesc.value = descRef.value.offsetHeight
  if (props.closable) {
    nextTick(() => {
      alert.value.style.height = alert.value.offsetHeight + 'px'
      alert.value.style.opacity = 1
    })
  }
})
const emit = defineEmits(['close'])
function onClose (e: MouseEvent):void {
  alert.value.style.height = 0
  alert.value.style.opacity = 0
  emit('close', e)
}
</script>
<template>
  <div  ref="alert" class="m-alert-wrapper">
    <div
      class="m-alert"
      :class="[`${type}`, {'width-description': showDesc}]">
      <template v-if="showIcon">
        <span class="m-icon" v-if="!showDesc">
          <slot name="icon">
            <img v-if="icon" :src="icon" class="u-icon-img" />
            <svg focusable="false" v-else-if="type==='info'" class="u-icon" data-icon="info-circle" width="1em" height="1em" fill="currentColor" aria-hidden="true" viewBox="64 64 896 896"><path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm32 664c0 4.4-3.6 8-8 8h-48c-4.4 0-8-3.6-8-8V456c0-4.4 3.6-8 8-8h48c4.4 0 8 3.6 8 8v272zm-32-344a48.01 48.01 0 010-96 48.01 48.01 0 010 96z"></path></svg>
            <svg focusable="false" v-else-if="type==='success'" class="u-icon" data-icon="check-circle" width="1em" height="1em" fill="currentColor" aria-hidden="true" viewBox="64 64 896 896"><path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm193.5 301.7l-210.6 292a31.8 31.8 0 01-51.7 0L318.5 484.9c-3.8-5.3 0-12.7 6.5-12.7h46.9c10.2 0 19.9 4.9 25.9 13.3l71.2 98.8 157.2-218c6-8.3 15.6-13.3 25.9-13.3H699c6.5 0 10.3 7.4 6.5 12.7z"></path></svg>
            <svg focusable="false" v-else-if="type==='warn'" class="u-icon" data-icon="exclamation-circle" width="1em" height="1em" fill="currentColor" aria-hidden="true" viewBox="64 64 896 896"><path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm-32 232c0-4.4 3.6-8 8-8h48c4.4 0 8 3.6 8 8v272c0 4.4-3.6 8-8 8h-48c-4.4 0-8-3.6-8-8V296zm32 440a48.01 48.01 0 010-96 48.01 48.01 0 010 96z"></path></svg>
            <svg focusable="false" v-else-if="type==='error'" class="u-icon" data-icon="close-circle" width="1em" height="1em" fill="currentColor" aria-hidden="true" viewBox="64 64 896 896"><path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm165.4 618.2l-66-.3L512 563.4l-99.3 118.4-66.1.3c-4.4 0-8-3.5-8-8 0-1.9.7-3.7 1.9-5.2l130.1-155L340.5 359a8.32 8.32 0 01-1.9-5.2c0-4.4 3.6-8 8-8l66.1.3L512 464.6l99.3-118.4 66-.3c4.4 0 8 3.5 8 8 0 1.9-.7 3.7-1.9 5.2L553.5 514l130 155c1.2 1.5 1.9 3.3 1.9 5.2 0 4.4-3.6 8-8 8z"></path></svg>
          </slot>
        </span>
        <span class="m-big-icon" v-else>
          <slot name="icon">
            <img v-if="icon" :src="icon" class="u-big-icon-img" />
            <svg focusable="false" v-else-if="type==='info'" class="u-icon" data-icon="info-circle" width="1em" height="1em" fill="currentColor" aria-hidden="true" viewBox="64 64 896 896"><path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z"></path><path d="M464 336a48 48 0 1096 0 48 48 0 10-96 0zm72 112h-48c-4.4 0-8 3.6-8 8v272c0 4.4 3.6 8 8 8h48c4.4 0 8-3.6 8-8V456c0-4.4-3.6-8-8-8z"></path></svg>
            <svg focusable="false" v-else-if="type==='success'" class="u-icon" data-icon="check-circle" width="1em" height="1em" fill="currentColor" aria-hidden="true" viewBox="64 64 896 896"><path d="M699 353h-46.9c-10.2 0-19.9 4.9-25.9 13.3L469 584.3l-71.2-98.8c-6-8.3-15.6-13.3-25.9-13.3H325c-6.5 0-10.3 7.4-6.5 12.7l124.6 172.8a31.8 31.8 0 0051.7 0l210.6-292c3.9-5.3.1-12.7-6.4-12.7z"></path><path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z"></path></svg>
            <svg focusable="false" v-else-if="type==='warn'" class="u-icon" data-icon="exclamation-circle" width="1em" height="1em" fill="currentColor" aria-hidden="true" viewBox="64 64 896 896"><path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z"></path><path d="M464 688a48 48 0 1096 0 48 48 0 10-96 0zm24-112h48c4.4 0 8-3.6 8-8V296c0-4.4-3.6-8-8-8h-48c-4.4 0-8 3.6-8 8v272c0 4.4 3.6 8 8 8z"></path></svg>
            <svg focusable="false" v-else-if="type==='error'" class="u-icon" data-icon="close-circle" width="1em" height="1em" fill="currentColor" aria-hidden="true" viewBox="64 64 896 896"><path d="M685.4 354.8c0-4.4-3.6-8-8-8l-66 .3L512 465.6l-99.3-118.4-66.1-.3c-4.4 0-8 3.5-8 8 0 1.9.7 3.7 1.9 5.2l130.1 155L340.5 670a8.32 8.32 0 00-1.9 5.2c0 4.4 3.6 8 8 8l66.1-.3L512 564.4l99.3 118.4 66 .3c4.4 0 8-3.5 8-8 0-1.9-.7-3.7-1.9-5.2L553.5 515l130.1-155c1.2-1.4 1.8-3.3 1.8-5.2z"></path><path d="M512 65C264.6 65 64 265.6 64 513s200.6 448 448 448 448-200.6 448-448S759.4 65 512 65zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z"></path></svg>
          </slot>
        </span>
      </template>
      <div class="m-content">
        <div class="u-message">
          <slot name="message">{{ message }}</slot>
        </div>
        <div class="u-description" v-if="showDesc" ref="descRef">
          <slot name="description">{{ description }}</slot>
        </div>
      </div>
      <a class="m-close" @click="onClose" v-if="closable">
        <slot name="closeText">
          <span v-if="closeText">{{ closeText }}</span>
          <svg v-else focusable="false" class="u-close" data-icon="close" width="1em" height="1em" fill="currentColor" aria-hidden="true" viewBox="64 64 896 896"><path d="M563.8 512l262.5-312.9c4.4-5.2.7-13.1-6.1-13.1h-79.8c-4.7 0-9.2 2.1-12.3 5.7L511.6 449.8 295.1 191.7c-3-3.6-7.5-5.7-12.3-5.7H203c-6.8 0-10.5 7.9-6.1 13.1L459.4 512 196.9 824.9A7.95 7.95 0 00203 838h79.8c4.7 0 9.2-2.1 12.3-5.7l216.5-258.1 216.5 258.1c3 3.6 7.5 5.7 12.3 5.7h79.8c6.8 0 10.5-7.9 6.1-13.1L563.8 512z"></path></svg>
        </slot>
      </a>
    </div>
  </div>
</template>
<style lang="less" scoped>
.m-alert-wrapper {
  overflow: hidden;
  transition: height .3s cubic-bezier(0.78, 0.14, 0.15, 0.86), opacity .3s cubic-bezier(.78, 0.14, 0.15, 0.86);
}
.m-alert {
  box-sizing: border-box;
  margin: 0;
  padding: 8px 12px;
  color: rgba(0, 0, 0, .88);
  font-size: 14px;
  line-height: 1.5714285714285714;
  list-style: none;
  position: relative;
  display: flex;
  align-items: center;
  word-wrap: break-word;
  border-radius: 8px;
  .m-icon {
    margin-inline-end: 8px;
    line-height: 0;
  }
  .m-big-icon {
    margin-inline-end: 12px;
    font-size: 24px;
    line-height: 0;
  }
  .u-icon-img {
    display: inline-block;
    width: 14px;
    height: 14px;
  }
  .u-big-icon-img {
    display: inline-block;
    width: 24px;
    height: 24px;
  }
  .u-icon {
    display: inline-block;
  }
  .m-content {
    flex: 1;
    min-width: 0;
  }
  .m-close {
    margin-inline-start: 8px;
    font-size: 12px;
    color: rgba(0, 0, 0, .45);
    line-height: 12px;
    cursor: pointer;
    transition: color .2s;
    &:hover {
      color: rgba(0, 0, 0, .88);
    }
    .u-close {
      display: inline-block;
      vertical-align: bottom;
      fill: rgba(0, 0, 0, .45);
      transition: fill .2s;
      &:hover {
        fill: rgba(0, 0, 0, .88);
      }
    }
  }
}
.info {
  background-color: #e6f4ff;
  border: 1px solid #91caff;
  .m-icon, .m-big-icon {
    :deep(.u-icon) {
      fill: #1677ff;
    }
  }
}
.success {
  background-color: #f6ffed;
  border: 1px solid #b7eb8f;
  .m-icon, .m-big-icon {
    :deep(.u-icon) {
      fill: #52c41a;
    }
  }
}
.warn {
  background-color: #fffbe6;
  border: 1px solid #ffe58f;
  .m-icon, .m-big-icon {
    :deep(.u-icon) {
      fill: #faad14;
    }
  }
}
.error {
  background-color: #fff2f0;
  border: 1px solid #ffccc7;
  .m-icon, .m-big-icon {
    :deep(.u-icon) {
      fill: #ff4d4f;
    }
  }
}
.width-description {
  align-items: flex-start;
  padding-inline: 24px;
  padding-block: 20px;
  .u-message {
    display: block;
    margin-bottom: 8px;
    color: rgba(0, 0, 0, .88);
    font-size: 16px;
  }
  .u-description {
    display: block;
  }
}
</style>
