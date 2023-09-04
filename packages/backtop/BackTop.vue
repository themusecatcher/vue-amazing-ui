<script setup lang="ts">
import { ref, computed, watch, watchEffect, nextTick } from 'vue'
interface Props {
  bottom?: number|string // BackTop 距离页面底部的高度
  right?: number|string // BackTop 距离页面右侧的宽度
  visibilityHeight?: number // 滚动时触发显示回到顶部的高度
  to?: string|HTMLElement // BackTop 渲染的容器节点 可选 元素标签名(例如 'body') 或者 目标元素本身，下同
  listenTo?: string|HTMLElement // 监听滚动的元素，如果为 undefined 会监听距离最近的一个可滚动的祖先节点
}
const props = withDefaults(defineProps<Props>(), {
  bottom: 40,
  right: 40,
  visibilityHeight: 180,
  to: 'body',
  listenTo: undefined
})
const bottomPosition = computed(() => {
  if (typeof props.bottom === 'number') {
    return props.bottom + 'px'
  }
  return props.bottom
})
const rightPosition = computed(() => {
  if (typeof props.right === 'number') {
    return props.right + 'px'
  }
  return props.right
})
const backtop = ref()
const scrollTop = ref(0)
const scrollTarget = ref<any>()
watchEffect(() => {
  // 监听滚动的元素
  nextTick(() => {
    if (props.listenTo === undefined) {
      scrollTarget.value = getScrollParentElement(backtop.value?.parentElement)
    } else if (typeof props.listenTo === 'string') {
      scrollTarget.value = typeof document !== 'undefined' ? document.getElementsByTagName(props.listenTo)[0] : null
    } else if (props.listenTo instanceof HTMLElement) {
      scrollTarget.value = props.listenTo
    }
    if (scrollTarget.value) {
      observeElement(scrollTarget.value)
      scrollTarget.value.addEventListener('scroll', (e: any) => {
        scrollTop.value = e.target.scrollTop
      })
    }
  })
})
function observeElement (el: HTMLElement) {
  // 当观察到变动时执行的回调函数
  const callback = function (mutationsList: any, observer: any) {
    scrollTop.value = scrollTarget.value.scrollTop
  }
  // 观察器的配置（需要观察什么变动）
  const config = { attributes: true, subtree: true }
  // 创建一个观察器实例并传入回调函数
  const observer = new MutationObserver(callback)
  // 以上述配置开始观察目标节点
  observer.observe(el, config)
}
watchEffect(() => {
  // 渲染容器节点
  nextTick(() => {
    var target = null
    if (typeof props.to === 'string') {
      target = typeof document !== 'undefined' ? document.getElementsByTagName(props.to)[0] : null
    } else if (props.to instanceof HTMLElement) {
      target = props.to
    }
    target && target.appendChild(backtop.value)
  })
})
const show = computed(() => {
  return scrollTop.value >= props.visibilityHeight
})
function getScrollParentElement (el: any) {
  if (el) {
    if (el.scrollHeight > el.clientHeight) {
      return el
    } else {
      return getScrollParentElement(el.parentElement)
    }
  }
  return null
}
const emits = defineEmits(['click', 'show'])
function onBackTop () {
  scrollTarget.value && scrollTarget.value.scrollTo({
    top: 0,
    behavior: 'smooth' // 平滑滚动并产生过渡效果
  })
  emits('click')
}
watch(show, (to) => {
  emits('show', to)
})
</script>
<template>
  <Transition>
    <div ref="backtop" v-show="show" @click="onBackTop" class="m-backtop" :style="`bottom: ${bottomPosition}; right: ${rightPosition};`">
      <slot>
        <span class="m-icon">
          <svg class="u-icon" viewBox="0 0 24 24" version="1.1" xmlns="http://www.w3.org/2000/svg" xlinkHref="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill-rule="evenodd"><g transform="translate(-139.000000, -4423.000000)" fill-rule="nonzero"><g transform="translate(120.000000, 4285.000000)"><g transform="translate(7.000000, 126.000000)"><g transform="translate(24.000000, 24.000000) scale(1, -1) translate(-24.000000, -24.000000) translate(12.000000, 12.000000)"><g transform="translate(4.000000, 2.000000)"><path d="M8,0 C8.51283584,0 8.93550716,0.38604019 8.99327227,0.883378875 L9,1 L9,10.584 L12.2928932,7.29289322 C12.6834175,6.90236893 13.3165825,6.90236893 13.7071068,7.29289322 C14.0675907,7.65337718 14.0953203,8.22060824 13.7902954,8.61289944 L13.7071068,8.70710678 L8.70710678,13.7071068 L8.62544899,13.7803112 L8.618,13.784 L8.59530661,13.8036654 L8.4840621,13.8753288 L8.37133602,13.9287745 L8.22929083,13.9735893 L8.14346259,13.9897165 L8.03324678,13.9994506 L7.9137692,13.9962979 L7.77070917,13.9735893 L7.6583843,13.9401293 L7.57677845,13.9063266 L7.47929125,13.8540045 L7.4048407,13.8036865 L7.38131006,13.7856883 C7.35030318,13.7612383 7.32077858,13.7349921 7.29289322,13.7071068 L2.29289322,8.70710678 L2.20970461,8.61289944 C1.90467972,8.22060824 1.93240926,7.65337718 2.29289322,7.29289322 C2.65337718,6.93240926 3.22060824,6.90467972 3.61289944,7.20970461 L3.70710678,7.29289322 L7,10.585 L7,1 L7.00672773,0.883378875 C7.06449284,0.38604019 7.48716416,0 8,0 Z"></path><path d="M14.9333333,15.9994506 C15.5224371,15.9994506 16,16.4471659 16,16.9994506 C16,17.5122865 15.5882238,17.9349578 15.0577292,17.9927229 L14.9333333,17.9994506 L1.06666667,17.9994506 C0.477562934,17.9994506 0,17.5517354 0,16.9994506 C0,16.4866148 0.411776203,16.0639435 0.9422708,16.0061783 L1.06666667,15.9994506 L14.9333333,15.9994506 Z"></path></g></g></g></g></g></g></svg>
        </span>
      </slot>
    </div>
  </Transition>
</template>
<style lang="less" scoped>
.v-enter-from,
.v-leave-to {
  opacity: 0;
  transform: scale(.75);
}
.m-backtop {
  position: fixed;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  color: rgba(0, 0, 0, .88);
  border-radius: 22px;
  height: 44px;
  min-width: 44px;
  box-shadow: 0 2px 8px 0px rgba(0, 0, 0, .12);
  background-color: #fff;
  transition: all .3s cubic-bezier(.4, 0, .2, 1);
  &:hover {
    color: @themeColor;
    box-shadow: 0 2px 8px 3px rgba(0, 0, 0, .12);
    .m-icon .u-icon {
      fill: @themeColor;
    }
  }
  .m-icon {
    font-size: 26px;
    transition: color .3s cubic-bezier(.4, 0, .2, 1);
    height: 1em;
    width: 1em;
    line-height: 1em;
    text-align: center;
    display: inline-block;
    position: relative;
    fill: currentColor;
    transform: translateZ(0);
    .u-icon {
      fill: rgba(0, 0, 0, .88);
      pointer-events: none;
      height: 1em;
      width: 1em;
    }
  }
}
</style>
