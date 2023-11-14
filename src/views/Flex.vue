<script setup lang="ts">
import { ref } from 'vue'
const directionOptions = ref([
        {
          label: 'horizontal',
          value: 'horizontal'
        },
        {
          label: 'vertical',
          value: 'vertical',
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
          label: 'Small',
          value: 'small'
        },
        {
          label: 'Middle',
          value: 'middle',
        },
        {
          label: 'Large',
          value: 'large'
        },
        {
          label: 'Customize',
          value: 'customize'
        }
      ])
const gapSize = ref('small')
const customGapSize = ref(8)
</script>
<template>
  <div>
    <h1>Flex 弹性布局</h1>
    <h2 class="mt30 mb10">基本使用</h2>
    <Flex gap="middle" vertical>
      <Radio :options="directionOptions" v-model:value="direction" />
      <Flex :vertical="direction === 'vertical'">
        <div
          v-for="n in 4" :key="n"
          :style="{ ...baseStyle, background: `${n % 2 ? '#1677ffbf' : '#1677ff'}` }"
        />
      </Flex>
    </Flex>
    <h2 class="mt30 mb10">对齐方式</h2>
    <Flex gap="middle" align="start" vertical>
      <p>Select justify :</p>
      <Radio v-model:value="justify" button :options="justifyOptions" />
      <p>Select align :</p>
      <Radio v-model:value="alignItems" button :options="alignOptions" />
      <Flex :style="{ ...boxStyle }" :justify="justify" :align="alignItems">
        <Button type="primary">Primary</Button>
        <Button type="primary">Primary</Button>
        <Button type="primary">Primary</Button>
        <Button type="primary">Primary</Button>
      </Flex>
    </Flex>
    <h2 class="mt30 mb10">设置间隙</h2>
    <Flex gap="middle" vertical>
      <Radio :options="gapOptions" v-model:value="gapSize" />
      <template v-if="gapSize === 'customize'">
        <Slider v-model:value="customGapSize" />
      </template>
      <Flex :gap="gapSize !== 'customize' ? gapSize : customGapSize">
        <Button type="primary">Primary</Button>
        <Button>Default</Button>
        <Button type="dashed">Dashed</Button>
        <Button type="link">Link</Button>
      </Flex>
    </Flex>
    <h2 class="mt30 mb10">自动换行</h2>
    <Flex wrap="wrap" :width="600" :gap="[8, 16]">
      <Button v-for="n in new Array(16)" :key="n" type="primary">Button</Button>
    </Flex>
  </div>
</template>
