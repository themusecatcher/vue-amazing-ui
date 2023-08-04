<script setup lang="ts">
import { ref, watchEffect } from 'vue'
import { rafTimeout } from '../index'
interface Collapse {
  key?: string|number // 对应activeKey，如果没有传入key属性，则默认使用数据索引(0,1,2...)绑定
  header?: string // 面板标题 string | slot
  text?: string // 面板内容 string | slot
}
interface Props {
  collapseData: Collapse[] // 折叠面板数据，可使用 v-slot 替换对应索引的 header 和 text
  activeKey?: number[] | number | string[] | string | null // (v-model)当前激活 tab 面板的 key
  copyable?: boolean // 是否可复制面板内容
  lang?: string // 面板右上角固定内容，例如标识language string | slot
  fontSize?: number // 面板标题和内容的字体大小
  headerFontSize?: number // 面板标题字体大小，优先级高于fontSize
  textFontSize?: number // 面板内容字体大小，优先级高于fontSize
  showArrow?: boolean // 是否展示面板上的箭头
}
const props = withDefaults(defineProps<Props>(), {
  collapseData: () => [],
  activeKey: null,
  copyable: false,
  lang: '',
  fontSize: 14,
  headerFontSize: 0,
  textFontSize: 0,
  showArrow: true
})
watchEffect(() => {
  getCollapseHeight(props.collapseData.length) // 获取各个面板内容高度
}, { flush: 'post' })

const text = ref()
const collapseHeight = ref<any[]>([])
function getCollapseHeight (len: number) {
  for (let n = 0; n < len; n++) {
    collapseHeight.value.push(text.value[n].offsetHeight)
  }
}
const emits = defineEmits(['update:activeKey', 'change'])
function emitValue (value: any) {
  emits('update:activeKey', value)
  emits('change', value)
}
function onClick (key: number|string) {
  if (activeJudge(key)) {
    if (Array.isArray(props.activeKey)) {
      const res = (props.activeKey as any[]).filter(actKey => actKey!== key)
      emitValue(res)
    } else {
      emitValue(null)
    }

  } else {
    if (Array.isArray(props.activeKey)) {
      emitValue([...props.activeKey, key])
    } else {
      emitValue(key)
    }
  }
}
function activeJudge (key: number|string): boolean {
  if (Array.isArray(props.activeKey)) {
    return (props.activeKey as any[]).includes(key)
  } else {
    return props.activeKey === key
  }
}
const copyTxt = ref('Copy')
function onCopy (index: number) {
  navigator.clipboard.writeText(text.value[index].innerText || '').then(() => {
    /* clipboard successfully set */
    copyTxt.value = 'Copied'
    rafTimeout(() => {
      copyTxt.value = 'Copy'
    }, 3000)
  }, (err) => {
    /* clipboard write failed */
    copyTxt.value = err
  })
}
</script>
<template>
  <div class="m-collapse">
    <div
      class="m-collapse-item"
      :class="{'u-collapse-item-active': activeJudge(data.key || index)}"
      v-for="(data, index) in collapseData" :key="index">
      <div class="u-collapse-header" @click="onClick(data.key || index)">
        <svg focusable="false" v-if="showArrow" class="u-arrow" data-icon="right" aria-hidden="true" viewBox="64 64 896 896"><path d="M765.7 486.8L314.9 134.7A7.97 7.97 0 00302 141v77.3c0 4.9 2.3 9.6 6.1 12.6l360 281.1-360 281.1c-3.9 3-6.1 7.7-6.1 12.6V883c0 6.7 7.7 10.4 12.9 6.3l450.8-352.1a31.96 31.96 0 000-50.4z"></path></svg>
        <div class="u-header" :class="{ml24: showArrow}" :style="`font-size: ${headerFontSize || fontSize }px;`">
          <slot name="header" :header="data.header" :key="data.key || index">{{ data.header || '--' }}</slot>
        </div>
      </div>
      <div class="u-collapse-content" :class="{'u-collapse-copyable': copyable}" :style="`height: ${activeJudge(data.key || index) ? collapseHeight[index]:0}px; opacity: ${activeJudge(data.key || index) ? 1:0};`">
        <div class="u-lang">
          <slot name="lang" :lang="lang" :key="data.key || index">{{ lang }}</slot>
        </div>
        <Button size="small" class="u-copy" type="primary" @click="onCopy(index)">{{ copyTxt }}</Button>
        <div ref="text" class="u-text" :style="`font-size: ${textFontSize || fontSize}px;`">
          <slot name="text" :text="data.text" :key="data.key || index">{{ data.text }}</slot>
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="less" scoped>
.m-collapse {
  background-color: rgba(0, 0, 0, .02);
  border: 1px solid #d9d9d9;
  border-bottom: 0;
  border-radius: 8px;
  .m-collapse-item {
    border-bottom: 1px solid #d9d9d9;
    &:last-child {
      border-radius: 0 0 8px 8px;
      .u-collapse-content {
        border-radius: 0 0 8px 8px;
      }
    }
    .u-collapse-header {
      position: relative;
      padding: 12px 16px;
      cursor: pointer;
      transition: all .3s;
      .u-arrow {
        position: absolute;
        width: 12px;
        height: 12px;
        top: 0;
        bottom: 0;
        margin: auto 0;
        fill: rgba(0,0,0,.88);
        transition: transform .3s;
      }
      .u-header {
        display: inline-block;
        color: rgba(0, 0, 0, .88);
        line-height: 1.5714285714285714;
      }
      .ml24 {
        margin-left: 24px;
      }
    }
    .u-collapse-content {
      position: relative;
      overflow: hidden;
      background-color: #ffffff;
      transition: height .2s cubic-bezier(0.645, 0.045, 0.355, 1), opacity .2s cubic-bezier(0.645, 0.045, 0.355, 1) !important;
      .u-lang {
        position: absolute;
        right: 10px;
        top: 6px;
        font-size: 14px;
        color: rgba(0, 0, 0, .38);
        opacity: 1;
        transition: opacity .3s;
      }
      .u-copy {
        position: absolute;
        right: 8px;
        top: 8px;
        opacity: 0;
        pointer-events: none;
        transition: opacity .3s;
      }
      .u-text {
        padding: 16px;
        color: rgba(0, 0, 0, .88);
        white-space: pre-wrap;
      }
    }
    .u-collapse-copyable {
      &:hover {
        .u-lang {
          opacity: 0;
          pointer-events: none;
        }
        .u-copy {
          opacity: 1;
          pointer-events: auto;
        }
      }
    }
  }
  .u-collapse-item-active {
    .u-arrow {
      transform: rotate(90deg);
    }
    .u-collapse-content {
      border-top: 1px solid #d9d9d9;
    }
  }
}
</style>
