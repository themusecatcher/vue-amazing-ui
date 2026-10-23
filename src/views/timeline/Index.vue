<script setup lang="ts">
import { ref } from 'vue'
import { ClockCircleOutlined, SmileOutlined } from '@ant-design/icons-vue'
import type { TimelineItemProps, TimelineProps } from 'vue-amazing-ui'
type TimelineMode = NonNullable<TimelineProps['mode']>
type TimelineStart = NonNullable<TimelineProps['start']>
type TimelineLineType = NonNullable<TimelineProps['lineType']>
const timelineItems: TimelineItemProps[] = [
  { content: 'Create a services site 2025-06-24 10:10', color: 'green' },
  { content: 'Solve initial network problems 2025-06-24 10:10', color: 'red' },
  { content: 'Technical testing 2025-06-24 10:10', color: 'blue' },
  { content: 'Network problems being solved 2025-06-24 10:10' },
  { content: 'Network problems being solved 2 2025-06-24 10:10', color: 'gray' }
]
const reverse = ref(false)
// 水平节演示用独立状态：与「进行中与倒序」节的 reverse 解耦，避免一节的操作串扰另一节
const horizontal = ref(true)
const horizontalReverse = ref(false)
const mode = ref<TimelineMode>('left')
const modeOptions: { label: string; value: TimelineMode }[] = [
  { label: 'left', value: 'left' },
  { label: 'right', value: 'right' },
  { label: 'alternate', value: 'alternate' }
]
const start = ref<TimelineStart>('right')
const startOptions: { label: string; value: TimelineStart }[] = [
  { label: 'right', value: 'right' },
  { label: 'left', value: 'left' }
]
const lineType = ref<TimelineLineType>('solid')
const lineTypeOptions: { label: string; value: TimelineLineType }[] = [
  { label: 'solid', value: 'solid' },
  { label: 'dashed', value: 'dashed' },
  { label: 'dotted', value: 'dotted' }
]
</script>
<template>
  <div>
    <h1>{{ $route.name }} {{ $route.meta.title }}</h1>
    <h2 class="mt30 mb10">基本使用</h2>
    <Timeline>
      <TimelineItem v-for="(item, index) in timelineItems" :key="index" v-bind="item" />
    </Timeline>
    <h2 class="mt30 mb10">圆圈颜色</h2>
    <Timeline>
      <TimelineItem color="green" content="Create a services site 2025-06-24 10:10" />
      <TimelineItem color="green" content="Create a services site 2025-06-24 10:10" />
      <TimelineItem color="red">
        <p>Solve initial network problems 1</p>
        <p>Solve initial network problems 2</p>
        <p>Solve initial network problems 3 2025-06-24 10:10</p>
      </TimelineItem>
      <TimelineItem>
        <p>Technical testing 1</p>
        <p>Technical testing 2</p>
        <p>Technical testing 3 2025-06-24 10:10</p>
      </TimelineItem>
      <TimelineItem color="gray">
        <p>Technical testing 1</p>
        <p>Technical testing 2</p>
        <p>Technical testing 3 2025-06-24 10:10</p>
      </TimelineItem>
      <TimelineItem color="gray">
        <p>Technical testing 1</p>
        <p>Technical testing 2</p>
        <p>Technical testing 3 2025-06-24 10:10</p>
      </TimelineItem>
      <TimelineItem color="#00ccff">
        <template #dot>
          <SmileOutlined />
        </template>
        <p>Custom color testing</p>
      </TimelineItem>
    </Timeline>
    <h2 class="mt30 mb10">自定义时间轴点</h2>
    <Timeline>
      <TimelineItem content="Create a services site 2025-06-24 10:10" />
      <TimelineItem content="Custom dot">
        <template #dot>
          <span class="big-dot"></span>
        </template>
      </TimelineItem>
      <TimelineItem content="Custom icon">
        <template #dot>
          <ClockCircleOutlined class="dot-icon" />
        </template>
      </TimelineItem>
      <TimelineItem>
        <template #dot>
          <span class="big-dot"></span>
        </template>
        <p class="desc">Custom content</p>
        <p>Create a services site 2025-06-24 10:10</p>
      </TimelineItem>
    </Timeline>
    <h2 class="mt30 mb10">标题与时间</h2>
    <p class="mb10">
      节点按 <code>title</code> / <code>content</code> / <code>time</code> 渲染为三段结构，分别可用 <code>title</code> /
      <code>default</code> / <code>footer</code> 插槽覆盖
    </p>
    <Timeline>
      <TimelineItem content="Create a services site" color="success" />
      <TimelineItem title="Success" content="Build completed" time="2025-06-24 10:10" color="success" />
      <TimelineItem content="Integration test failed" time="2025-06-24 10:10" color="error" />
      <TimelineItem title="Warning" content="Bundle size exceeds limit" time="2025-06-24 10:10" color="warning" />
      <TimelineItem
        title="Info"
        content="Release notes published"
        time="2025-06-24 10:10"
        color="info"
        line-type="dashed"
      />
      <TimelineItem content="Release archived" color="gray" />
    </Timeline>
    <h2 class="mt30 mb10">标签</h2>
    <p class="mb10">任一节点提供 <code>label</code> 时整条时间轴切换为左右分栏，可用 <code>mode</code> 镜像或交替</p>
    <Space align="center" style="margin-bottom: 20px">
      mode:
      <Segmented v-model:value="mode" :options="modeOptions" />
    </Space>
    <Timeline :mode="mode">
      <TimelineItem label="2025-06-24 10:10" content="Create a services" />
      <TimelineItem label="2025-06-24 10:10" content="Solve initial network problems" />
      <TimelineItem content="Technical testing" />
      <TimelineItem label="2025-06-24 10:10" content="Network problems being solved">
        <template #label>
          <strong class="label-strong">2025-06-24 10:10</strong>
        </template>
      </TimelineItem>
    </Timeline>
    <h2 class="mt30 mb10">尺寸</h2>
    <Flex gap="large" align="flex-start" wrap="wrap">
      <Flex vertical gap="small" align="start">
        <span class="demo-label">small</span>
        <Timeline size="small">
          <TimelineItem content="Create a services site" color="success" />
          <TimelineItem content="Network problems being solved" />
        </Timeline>
      </Flex>
      <Flex vertical gap="small" align="start">
        <span class="demo-label">middle</span>
        <Timeline size="middle">
          <TimelineItem content="Create a services site" color="success" />
          <TimelineItem content="Network problems being solved" />
        </Timeline>
      </Flex>
      <Flex vertical gap="small" align="start">
        <span class="demo-label">large</span>
        <Timeline size="large">
          <TimelineItem content="Create a services site" color="success" />
          <TimelineItem content="Network problems being solved" />
        </Timeline>
      </Flex>
      <Flex vertical gap="small" align="start">
        <span class="demo-label">icon-size=20</span>
        <Timeline :icon-size="20">
          <TimelineItem content="Create a services site" color="success">
            <template #dot>
              <ClockCircleOutlined />
            </template>
          </TimelineItem>
          <TimelineItem content="Network problems being solved">
            <template #dot>
              <ClockCircleOutlined />
            </template>
          </TimelineItem>
        </Timeline>
      </Flex>
    </Flex>
    <h2 class="mt30 mb10">线型</h2>
    <p class="mb10">容器级 <code>line-type</code> 统一设置线型，节点级 <code>line-type</code> 可单独覆盖</p>
    <Space align="center" style="margin-bottom: 20px">
      line-type:
      <Segmented v-model:value="lineType" :options="lineTypeOptions" />
    </Space>
    <Timeline :line-type="lineType">
      <TimelineItem v-for="(item, index) in timelineItems" :key="index" v-bind="item" />
    </Timeline>
    <h2 class="mt30 mb10">右侧时间轴点</h2>
    <Timeline mode="right">
      <TimelineItem v-for="(item, index) in timelineItems" :key="index" v-bind="item" />
    </Timeline>
    <h2 class="mt30 mb10">交替展现</h2>
    <p class="mb10"> <code>alternate</code> 模式轴线居中、内容左右交替，<code>start</code> 决定首个内容出现的一侧 </p>
    <Space align="center" style="margin-bottom: 20px">
      start:
      <Segmented v-model:value="start" :options="startOptions" />
    </Space>
    <Timeline mode="alternate" :start="start">
      <TimelineItem v-for="(item, index) in timelineItems" :key="index" v-bind="item">
        <template #dot>
          <span class="big-dot" v-if="index === 2"></span>
        </template>
      </TimelineItem>
    </Timeline>
    <h2 class="mt30 mb10">节点位置</h2>
    <p class="mb10">
      <code>alternate</code> 模式下节点的 <code>position</code> 可单独指定内容所在侧，覆盖奇偶默认位置
    </p>
    <Timeline mode="alternate">
      <TimelineItem content="Create a services site 2025-06-24 10:10" time="2025-06-24 10:10" color="success" />
      <TimelineItem content="Solve initial network problems" time="2025-06-24 10:10" color="error" position="right" />
      <TimelineItem content="Technical testing" time="2025-06-24 10:10" color="warning" position="left" />
      <TimelineItem content="Network problems being solved" time="2025-06-24 10:10" color="info" />
    </Timeline>
    <h2 class="mt30 mb10">水平时间轴</h2>
    <p class="mb10">水平排列，可与 <code>reverse</code> 倒序组合；内容超出时容器可横向滚动</p>
    <Space align="center" style="margin-bottom: 20px">
      horizontal:
      <Switch v-model:value="horizontal" />
      reverse:
      <Switch v-model:value="horizontalReverse" />
    </Space>
    <Timeline :horizontal="horizontal" :reverse="horizontalReverse">
      <TimelineItem title="Create" content="Create a services site" time="2025-06-24 10:10" color="success" />
      <TimelineItem title="Error" content="Solve initial network problems" time="2025-06-24 10:10" color="error" />
      <TimelineItem title="Warning" content="Technical testing" time="2025-06-24 10:10" color="warning" />
      <TimelineItem title="Info" content="Network problems being solved" time="2025-06-24 10:10" color="info" />
    </Timeline>
    <h2 class="mt30 mb10">嵌套时间轴</h2>
    <Timeline>
      <TimelineItem title="Release" content="Create a services site" time="2025-06-24 10:10" color="success">
        <Timeline>
          <TimelineItem content="Technical testing 1" time="2025-06-24 10:10" />
          <TimelineItem content="Technical testing 2" time="2025-06-24 10:10" color="error" />
        </Timeline>
      </TimelineItem>
      <TimelineItem content="Network problems being solved" time="2025-06-24 10:10" color="warning" />
    </Timeline>
    <h2 class="mt30 mb10">进行中与倒序</h2>
    <Button type="primary" style="margin-bottom: 20px" @click="reverse = !reverse">Toggle Reverse</Button>
    <Timeline pending="Recording..." :reverse="reverse">
      <TimelineItem content="Create a services site" time="2025-06-24 10:10" />
      <TimelineItem content="Solve initial network problems" time="2025-06-24 10:10" />
      <TimelineItem content="Technical testing" time="2025-06-24 10:10" />
    </Timeline>
    <h2 class="mt30 mb10">自定义幽灵节点</h2>
    <p class="mb10">
      <code>pending</code> 传 <code>true</code> 时只表示进行中、不渲染内容；<code>pendingDot</code> 属性或
      <code>#pendingDot</code> 插槽可替换内置加载环，<code>#pending</code> 插槽可替换内容
    </p>
    <Timeline :pending="true">
      <TimelineItem content="Create a services site" time="2025-06-24 10:10" />
      <TimelineItem content="Solve initial network problems" time="2025-06-24 10:10" />
    </Timeline>
    <br />
    <Timeline pending="Recording...">
      <TimelineItem content="Create a services site" time="2025-06-24 10:10" />
      <TimelineItem content="Solve initial network problems" time="2025-06-24 10:10" />
      <template #pendingDot>
        <ClockCircleOutlined class="dot-icon" />
      </template>
    </Timeline>
  </div>
</template>
<style lang="less" scoped>
.big-dot {
  display: inline-block;
  width: 18px;
  height: 18px;
  border: 4px solid var(--va-primary-color);
  border-radius: 50%;
  background: var(--va-bg-container-color);
}
.dot-icon {
  font-size: 16px;
  color: var(--va-primary-color);
  background: var(--va-bg-container-color);
  border-radius: 50%;
}
.desc {
  margin-bottom: 4px;
  font-size: 16px;
  font-weight: 500;
}
.label-strong {
  color: var(--va-error-color);
}
.demo-label {
  color: var(--va-text-color-3);
  font-size: 13px;
  line-height: 22px;
}
</style>
