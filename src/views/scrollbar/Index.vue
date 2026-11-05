<script setup lang="ts">
import { ref, onMounted } from 'vue'
import type { ScrollbarExpose, ScrollbarScrollData, ScrollDirection } from 'vue-amazing-ui'
// 滚动事件用例：方向与派发次数直接打在页面上，不依赖控制台
const scrollEventRef = ref<ScrollbarExpose | null>(null)
// scroll 与 scrollend 各用一个变量：共用一个会被后到的事件覆盖，看不出两者方向是否一致
const lastScrollDirection = ref<ScrollDirection | ''>('')
const lastScrollEndDirection = ref<ScrollDirection | ''>('')
const scrollCount = ref(0)
const scrollEndCount = ref(0)
function onDirectionScroll(_e: Event, direction: ScrollDirection) {
  lastScrollDirection.value = direction
  scrollCount.value++
}
function onDirectionScrollEnd(_e: Event, direction: ScrollDirection) {
  lastScrollEndDirection.value = direction
  scrollEndCount.value++
}
// 实例方法用例：getScrollData 读取的是调用瞬间的实时值，每次滚动同步刷新
const scrollMethodRef = ref<ScrollbarExpose | null>(null)
const scrollData = ref<ScrollbarScrollData | null>(null)
function readScrollData() {
  scrollData.value = scrollMethodRef.value?.getScrollData() ?? null
  console.log('scrollData', scrollData.value)
}
// KeepAlive 用例：在两个组件实例之间切换，演示切回后滚动位置恢复
const keepAliveVisible = ref(true)
const keepAliveRef = ref<ScrollbarExpose | null>(null)
onMounted(() => {
  // 首屏读一次滚动数据，之后由 scroll 事件实时刷新
  readScrollData()
  // 预置滚动位置：切走再切回即可看出恢复效果，无需用户先手动滚动
  keepAliveRef.value?.scrollTo({ top: 40 })
})
</script>
<template>
  <div>
    <h1>{{ $route.name }} {{ $route.meta.title }}</h1>
    <h2 class="mt30 mb10">基本使用</h2>
    <Scrollbar style="max-height: 120px">
      我们在田野上面找猪<br />
      想象中已找到了三只<br />
      小鸟在白云上面追逐<br />
      它们在树底下跳舞<br />
      啦啦啦啦啦啦啦啦咧<br />
      啦啦啦啦咧<br />
      我们在想象中度过了许多年<br />
      想象中我们是如此的疯狂<br />
      我们在城市里面找猪<br />
      想象中已找到了几百万只<br />
      小鸟在公园里面唱歌<br />
      它们独自在想象里跳舞<br />
      啦啦啦啦啦啦啦啦咧<br />
      啦啦啦啦咧<br />
      我们在想象中度过了许多年<br />
      许多年之后我们又开始想象<br />
      啦啦啦啦啦啦啦啦咧
    </Scrollbar>
    <h2 class="mt30 mb10">滚动事件与方向</h2>
    <p class="mb10">
      <code>scroll</code> 在滚动中派发、<code>scrollend</code> 在某一方向停止滚动后（约
      <code>100ms</code> 无滚动）派发，两者都带方向参数；方向按本次位移判定，因此拖动 <code>thumb</code>、<code
        >scrollTo</code
      >
      / <code>scrollBy</code>、直接写入滚动位置同样会派发，横向与纵向同帧变化时各派发一次；<code>scrollend</code>
      的派发与 <code>autoHide</code> / <code>trigger</code> 无关
    </p>
    <Flex vertical>
      <Space>
        <Button @click="scrollEventRef?.scrollTo({ top: 9999, behavior: 'smooth' })">滚到底部</Button>
        <Button @click="scrollEventRef?.scrollBy(0, -120)">上移 120</Button>
      </Space>
      <Space>
        <Tag>scroll 方向：{{ lastScrollDirection || '-' }}</Tag>
        <Tag>scrollend 方向：{{ lastScrollEndDirection || '-' }}</Tag>
        <Tag>scroll：{{ scrollCount }}</Tag>
        <Tag>scrollend：{{ scrollEndCount }}</Tag>
      </Space>
      <Scrollbar
        ref="scrollEventRef"
        style="height: 120px; border: 1px solid var(--va-border-color); border-radius: 8px"
        :content-style="{ padding: '8px 12px' }"
        @scroll="onDirectionScroll"
        @scrollend="onDirectionScrollEnd"
      >
        <template v-for="n in 2" :key="n">
          我们在田野上面找猪，想象中已找到了三只；小鸟在白云上面追逐，它们在树底下跳舞。<br />
          啦啦啦啦啦啦啦啦咧，啦啦啦啦咧。我们在想象中度过了许多年，想象中我们是如此的疯狂。<br />
          我们在城市里面找猪，想象中已找到了几百万只；小鸟在公园里面唱歌，它们独自在想象里跳舞。<br />
          啦啦啦啦啦啦啦啦咧，啦啦啦啦咧。许多年之后我们又开始想象，啦啦啦啦啦啦啦啦咧。
        </template>
      </Scrollbar>
    </Flex>
    <h2 class="mt30 mb10">横向滚动</h2>
    <Scrollbar x-scrollable>
      <div style="white-space: nowrap; padding: 12px">
        我们在田野上面找猪 想象中已找到了三只 小鸟在白云上面追逐 它们在树底下跳舞 啦啦啦啦啦啦啦啦咧 啦啦啦啦咧
        我们在想象中度过了许多年 想象中我们是如此的疯狂 我们在城市里面找猪 想象中已找到了几百万只 小鸟在公园里面唱歌
        它们独自在想象里跳舞 啦啦啦啦啦啦啦啦咧 啦啦啦啦咧 我们在想象中度过了许多年 许多年之后我们又开始想象
        啦啦啦啦啦啦啦啦咧
      </div>
    </Scrollbar>
    <h2 class="mt30 mb10">垂直及横向滚动</h2>
    <Scrollbar style="max-height: 120px" x-scrollable>
      <div style="white-space: nowrap; padding-right: 12px" v-for="n in 9" :key="n">
        我们在田野上面找猪 想象中已找到了三只 小鸟在白云上面追逐 它们在树底下跳舞 啦啦啦啦啦啦啦啦咧 啦啦啦啦咧
        我们在想象中度过了许多年 想象中我们是如此的疯狂 我们在城市里面找猪 想象中已找到了几百万只 小鸟在公园里面唱歌
        它们独自在想象里跳舞 啦啦啦啦啦啦啦啦咧 啦啦啦啦咧 我们在想象中度过了许多年 许多年之后我们又开始想象
        啦啦啦啦啦啦啦啦咧
      </div>
      <div style="white-space: nowrap; padding-bottom: 12px">
        我们在田野上面找猪 想象中已找到了三只 小鸟在白云上面追逐 它们在树底下跳舞 啦啦啦啦啦啦啦啦咧 啦啦啦啦咧
        我们在想象中度过了许多年 想象中我们是如此的疯狂 我们在城市里面找猪 想象中已找到了几百万只 小鸟在公园里面唱歌
        它们独自在想象里跳舞 啦啦啦啦啦啦啦啦咧 啦啦啦啦咧 我们在想象中度过了许多年 许多年之后我们又开始想象
        啦啦啦啦啦啦啦啦咧
      </div>
    </Scrollbar>
    <h2 class="mt30 mb10">触发方式</h2>
    <Scrollbar style="max-height: 120px" trigger="none">
      我们在田野上面找猪<br />
      想象中已找到了三只<br />
      小鸟在白云上面追逐<br />
      它们在树底下跳舞<br />
      啦啦啦啦啦啦啦啦咧<br />
      啦啦啦啦咧<br />
      我们在想象中度过了许多年<br />
      想象中我们是如此的疯狂<br />
      我们在城市里面找猪<br />
      想象中已找到了几百万只<br />
      小鸟在公园里面唱歌<br />
      它们独自在想象里跳舞<br />
      啦啦啦啦啦啦啦啦咧<br />
      啦啦啦啦咧<br />
      我们在想象中度过了许多年<br />
      许多年之后我们又开始想象<br />
      啦啦啦啦啦啦啦啦咧
    </Scrollbar>
    <h2 class="mt30 mb10">鼠标在滚动区域时不自动隐藏</h2>
    <Scrollbar style="max-height: 120px" :auto-hide="false" :delay="1000">
      我们在田野上面找猪<br />
      想象中已找到了三只<br />
      小鸟在白云上面追逐<br />
      它们在树底下跳舞<br />
      啦啦啦啦啦啦啦啦咧<br />
      啦啦啦啦咧<br />
      我们在想象中度过了许多年<br />
      想象中我们是如此的疯狂<br />
      我们在城市里面找猪<br />
      想象中已找到了几百万只<br />
      小鸟在公园里面唱歌<br />
      它们独自在想象里跳舞<br />
      啦啦啦啦啦啦啦啦咧<br />
      啦啦啦啦咧<br />
      我们在想象中度过了许多年<br />
      许多年之后我们又开始想象<br />
      啦啦啦啦啦啦啦啦咧
    </Scrollbar>
    <h2 class="mt30 mb10">自定义样式</h2>
    <p class="mb10">
      可通过设置 <code>size</code> 属性，并用 <code>--va-scrollbar-*</code> 令牌（滑块颜色）与
      <code>--scrollbar-*</code> 变量（轨道偏移）自定义样式
    </p>
    <Scrollbar
      style="
        max-height: 120px;
        border-radius: 12px;
        --va-scrollbar-color: var(--va-text-color-3);
        --va-scrollbar-color-hover: var(--va-text-color-2);
        --scrollbar-rail-vertical-right: 2px 6px 2px auto;
      "
      :size="8"
      :content-style="{
        backgroundColor: 'var(--va-primary-bg-color)',
        padding: '16px 24px',
        fontSize: '16px',
        borderRadius: '12px'
      }"
    >
      我们在田野上面找猪<br />
      想象中已找到了三只<br />
      小鸟在白云上面追逐<br />
      它们在树底下跳舞<br />
      啦啦啦啦啦啦啦啦咧<br />
      啦啦啦啦咧<br />
      我们在想象中度过了许多年<br />
      想象中我们是如此的疯狂<br />
      我们在城市里面找猪<br />
      想象中已找到了几百万只<br />
      小鸟在公园里面唱歌<br />
      它们独自在想象里跳舞<br />
      啦啦啦啦啦啦啦啦咧<br />
      啦啦啦啦咧<br />
      我们在想象中度过了许多年<br />
      许多年之后我们又开始想象<br />
      啦啦啦啦啦啦啦啦咧
    </Scrollbar>
    <h2 class="mt30 mb10">滚动条位置</h2>
    <Flex vertical>
      <Scrollbar style="max-height: 120px; padding-left: 12px" y-placement="left">
        我们在田野上面找猪<br />
        想象中已找到了三只<br />
        小鸟在白云上面追逐<br />
        它们在树底下跳舞<br />
        啦啦啦啦啦啦啦啦咧<br />
        啦啦啦啦咧<br />
        我们在想象中度过了许多年<br />
        想象中我们是如此的疯狂<br />
        我们在城市里面找猪<br />
        想象中已找到了几百万只<br />
        小鸟在公园里面唱歌<br />
        它们独自在想象里跳舞<br />
        啦啦啦啦啦啦啦啦咧<br />
        啦啦啦啦咧<br />
        我们在想象中度过了许多年<br />
        许多年之后我们又开始想象<br />
        啦啦啦啦啦啦啦啦咧
      </Scrollbar>
      <Scrollbar x-scrollable x-placement="top">
        <div style="white-space: nowrap; padding: 12px">
          我们在田野上面找猪 想象中已找到了三只 小鸟在白云上面追逐 它们在树底下跳舞 啦啦啦啦啦啦啦啦咧 啦啦啦啦咧
          我们在想象中度过了许多年 想象中我们是如此的疯狂 我们在城市里面找猪 想象中已找到了几百万只 小鸟在公园里面唱歌
          它们独自在想象里跳舞 啦啦啦啦啦啦啦啦咧 啦啦啦啦咧 我们在想象中度过了许多年 许多年之后我们又开始想象
          啦啦啦啦啦啦啦啦咧
        </div>
      </Scrollbar>
    </Flex>
    <h2 class="mt30 mb10">实例方法</h2>
    <p class="mb10">
      通过模板 <code>ref</code> 调用 <code>scrollTo</code> / <code>scrollBy</code> / <code>getScrollData</code>：<code
        >options</code
      >
      形式可传 <code>behavior: 'smooth'</code> 产生过渡；<code>(left, top)</code> 双参形式与原生一致、不接受
      <code>behavior</code>（立即到位）；<code>getScrollData()</code>
      在调用瞬间读取容器的真实几何值，未挂载时各项为
      <code>0</code>，下方数值随滚动实时刷新
    </p>
    <Flex vertical>
      <Space>
        <Button @click="scrollMethodRef?.scrollTo({ top: 0, left: 0, behavior: 'smooth' })">平滑回到起点</Button>
        <Button @click="scrollMethodRef?.scrollTo({ left: 9999, behavior: 'smooth' })">平滑滚到最右</Button>
        <Button @click="scrollMethodRef?.scrollBy(120, 0)">瞬移右移 120</Button>
        <Button @click="readScrollData">读取滚动数据</Button>
      </Space>
      <Space v-if="scrollData">
        <Tag>top：{{ scrollData.scrollTop }}</Tag>
        <Tag>left：{{ scrollData.scrollLeft }}</Tag>
        <Tag>内容：{{ scrollData.scrollWidth }} × {{ scrollData.scrollHeight }}</Tag>
        <Tag>可视：{{ scrollData.clientWidth }} × {{ scrollData.clientHeight }}</Tag>
      </Space>
      <Scrollbar
        ref="scrollMethodRef"
        x-scrollable
        style="max-height: 120px; border: 1px solid var(--va-border-color); border-radius: 8px"
        :content-style="{ padding: '8px 12px' }"
        @scroll="readScrollData"
      >
        <div v-for="n in 3" :key="n" style="white-space: nowrap">
          我们在田野上面找猪 想象中已找到了三只 小鸟在白云上面追逐 它们在树底下跳舞 啦啦啦啦啦啦啦啦咧 啦啦啦啦咧
          我们在想象中度过了许多年 想象中我们是如此的疯狂 我们在城市里面找猪 想象中已找到了几百万只 小鸟在公园里面唱歌
          它们独自在想象里跳舞 啦啦啦啦啦啦啦啦咧 啦啦啦啦咧 我们在想象中度过了许多年 许多年之后我们又开始想象
          啦啦啦啦啦啦啦啦咧
        </div>
      </Scrollbar>
    </Flex>
    <h2 class="mt30 mb10">KeepAlive 保持滚动位置</h2>
    <p class="mb10">
      被 <code>KeepAlive</code> 缓存后，切走再切回会恢复失活前的滚动位置：失活期间 DOM 被移出文档，浏览器会把
      <code>scrollTop</code> 归零，组件按失活前记录的位置写回；下方已预置滚动位置，直接点 <code>切走</code> 再点
      <code>显示滚动区</code> 即可看到恢复效果
    </p>
    <Flex vertical>
      <Space>
        <Button :type="keepAliveVisible ? 'primary' : 'default'" @click="keepAliveVisible = true">显示滚动区</Button>
        <Button :type="keepAliveVisible ? 'default' : 'primary'" @click="keepAliveVisible = false">切走</Button>
      </Space>
      <KeepAlive>
        <Scrollbar
          v-if="keepAliveVisible"
          ref="keepAliveRef"
          key="keep-alive-scrollbar"
          style="height: 120px; border: 1px solid var(--va-border-color); border-radius: 8px"
          :content-style="{ padding: '8px 12px' }"
        >
          <template v-for="n in 2" :key="n">
            我们在田野上面找猪，想象中已找到了三只；小鸟在白云上面追逐，它们在树底下跳舞。<br />
            啦啦啦啦啦啦啦啦咧，啦啦啦啦咧。我们在想象中度过了许多年，想象中我们是如此的疯狂。<br />
            我们在城市里面找猪，想象中已找到了几百万只；小鸟在公园里面唱歌，它们独自在想象里跳舞。<br />
            啦啦啦啦啦啦啦啦咧，啦啦啦啦咧。许多年之后我们又开始想象，啦啦啦啦啦啦啦啦咧。
          </template>
        </Scrollbar>
        <Empty v-else key="keep-alive-empty" style="height: 120px" description="点「显示滚动区」查看滚动位置恢复" />
      </KeepAlive>
    </Flex>
  </div>
</template>
