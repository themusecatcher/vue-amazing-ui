<script setup lang="ts">
import { ref } from 'vue'
const directionOptions = ref([
  {
    label: 'horizontal',
    value: 'horizontal'
  },
  {
    label: 'vertical',
    value: 'vertical'
  }
])
const direction = ref('horizontal')
const baseStyle = {
  width: '25%',
  height: '54px'
}
const justifyOptions = ref([
  {
    label: 'flex-start',
    value: 'flex-start'
  },
  {
    label: 'center',
    value: 'center'
  },
  {
    label: 'flex-end',
    value: 'flex-end'
  },
  {
    label: 'space-between',
    value: 'space-between'
  },
  {
    label: 'space-around',
    value: 'space-around'
  },
  {
    label: 'space-evenly',
    value: 'space-evenly'
  }
])
const alignOptions = ref([
  {
    label: 'flex-start',
    value: 'flex-start'
  },
  {
    label: 'center',
    value: 'center'
  },
  {
    label: 'flex-end',
    value: 'flex-end'
  }
])
const justify = ref(justifyOptions.value[0].value)
const alignItems = ref(alignOptions.value[0].value)
const boxStyle = {
  width: '100%',
  height: '120px',
  borderRadius: '6px',
  border: '1px solid #40a9ff'
}
const gapOptions = ref([
  {
    label: 'small',
    value: 'small'
  },
  {
    label: 'middle',
    value: 'middle'
  },
  {
    label: 'large',
    value: 'large'
  },
  {
    label: 'customize',
    value: 'customize'
  }
])
const gapSize = ref<'small' | 'middle' | 'large' | 'customize'>('middle')
const customGapSize = ref(16)
</script>
<template>
  <div>
    <h1>{{ $route.name }} {{ $route.meta.title }}</h1>
    <h2 class="mt30 mb10">基本使用</h2>
    <p class="mb10">通过 <code>vertical</code> 切换主轴方向</p>
    <Flex vertical>
      <RadioGroup :options="directionOptions" v-model:value="direction" />
      <Flex :vertical="direction === 'vertical'">
        <div v-for="n in 4" :key="n" :style="{ ...baseStyle, background: `${n % 2 ? '#1677ffbf' : '#1677ff'}` }" />
      </Flex>
    </Flex>
    <h2 class="mt30 mb10">对齐方式</h2>
    <p class="mb10">通过 <code>justify</code> 与 <code>align</code> 分别控制主轴与交叉轴的对齐方式</p>
    <Flex vertical :gap="12">
      <Flex vertical :gap="4">
        <span>justify：</span>
        <RadioGroup v-model:value="justify" button :options="justifyOptions" />
      </Flex>
      <Flex vertical :gap="4">
        <span>align：</span>
        <RadioGroup v-model:value="alignItems" button :options="alignOptions" />
      </Flex>
      <Flex :style="{ ...boxStyle }" :justify="justify" :align="alignItems">
        <Button type="primary">Primary</Button>
        <Button type="primary">Primary</Button>
        <Button type="primary">Primary</Button>
        <Button type="primary">Primary</Button>
      </Flex>
    </Flex>
    <h2 class="mt30 mb10">设置间距</h2>
    <p class="mb10">通过 <code>gap</code> 设置间距，可选档位或自定义数值</p>
    <Flex vertical>
      <RadioGroup :options="gapOptions" v-model:value="gapSize" />
      <Slider v-if="gapSize === 'customize'" v-model:value="customGapSize" />
      <Flex :gap="gapSize !== 'customize' ? gapSize : customGapSize">
        <Button type="primary">Primary</Button>
        <Button>Default</Button>
        <Button type="dashed">Dashed</Button>
        <Button type="link">Link</Button>
      </Flex>
    </Flex>
    <h2 class="mt30 mb10">自动换行</h2>
    <p class="mb10"
      ><code>wrap</code> 开启换行，<code>width</code> 限定容器宽度，<code>gap</code> 数组分别设置水平与垂直间距</p
    >
    <Flex wrap="wrap" :width="600" :gap="[8, 16]">
      <Button v-for="n in 16" :key="n" type="primary">Button</Button>
    </Flex>
    <h2 class="mt30 mb10">自定义标签</h2>
    <p class="mb10">通过 <code>component</code> 指定渲染的标签或组件，便于语义化布局</p>
    <Flex component="ul" vertical :gap="8" class="flex-list">
      <li v-for="n in 3" :key="n">列表项 {{ n }}</li>
    </Flex>
    <h2 class="mt30 mb10">容器伸缩</h2>
    <p class="mb10"
      >通过 <code>flex</code> 设置容器自身作为 flex 子项时的伸缩比，示例两块按 1 : 2 分配剩余宽度，无需另写
      <code>style</code></p
    >
    <Flex gap="small">
      <Flex flex="1" justify="center" align="center" class="flex-stretch-demo">flex: 1</Flex>
      <Flex flex="2" justify="center" align="center" class="flex-stretch-demo">flex: 2</Flex>
    </Flex>
    <h2 class="mt30 mb10">组合使用</h2>
    <p class="mb10">嵌套使用可实现更复杂的布局，主轴与交叉轴可分别控制</p>
    <Card :style="{ width: '620px', maxWidth: '100%' }" :body-style="{ padding: 0, overflow: 'hidden' }">
      <Flex justify="space-between">
        <img
          class="flex-combination-logo"
          src="https://themusecatcher.github.io/vue-amazing-ui/amazing-logo.svg"
          alt="Vue Amazing UI"
        />
        <Flex vertical align="flex-end" justify="space-between" class="flex-combination-body">
          <p class="flex-combination-quote"
            >“Vue Amazing UI is an enterprise-class UI library built with Vue 3 and TypeScript.”</p
          >
          <Button type="primary" href="https://themusecatcher.github.io/vue-amazing-ui/" target="_blank"
            >Get Started</Button
          >
        </Flex>
      </Flex>
    </Card>
  </div>
</template>
<style lang="less" scoped>
.flex-list {
  padding: 0;
  margin: 0;
  list-style: none;
  li {
    padding: 8px 12px;
    background: var(--va-fill-color-1);
    border-radius: 6px;
  }
}
// 组合使用：左侧图与卡片等高，右侧内容上下两端贴齐
.flex-combination-logo {
  display: block;
  width: 273px;
  height: 273px;
  object-fit: contain;
}
// 容器伸缩：两块以浅主色铺底，按比例分宽，文字居中
.flex-stretch-demo {
  height: 64px;
  font-size: 14px;
  font-weight: 500;
  color: var(--va-primary-color);
  background: var(--va-primary-bg-color);
  border-radius: 8px;
}
.flex-combination-body {
  flex: 1;
  padding: 32px;
}
.flex-combination-quote {
  margin: 0;
  font-size: 24px;
  font-weight: 600;
  line-height: 1.35;
  color: var(--va-text-color-1);
}
</style>
