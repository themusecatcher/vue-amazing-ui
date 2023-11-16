# 弹性布局 Flex<BackTop />

<br/>

*设置组件之间的间距，设置各种水平、垂直对齐方式*

## 与 Space 组件的区别

- Space 为内联元素提供间距，其本身会为每一个子元素添加包裹元素用于内联对齐。适用于行、列中多个子元素的等距排列。
- Flex 为块级元素提供间距，其本身不会添加包裹元素。适用于垂直或水平方向上的子元素布局，并提供了更多的灵活性和控制能力。

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

## 基本使用

<Flex gap="middle" vertical>
  <Radio :options="directionOptions" v-model:value="direction" />
  <Flex :vertical="direction === 'vertical'">
    <div
      v-for="n in 4" :key="n"
      :style="{ ...baseStyle, background: `${n % 2 ? '#1677ffbf' : '#1677ff'}` }"
    />
  </Flex>
</Flex>

::: details Show Code

```vue
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
</script>
<template>
  <Flex gap="middle" vertical>
    <Radio :options="directionOptions" v-model:value="direction" />
    <Flex :vertical="direction === 'vertical'">
      <div
        v-for="n in 4" :key="n"
        :style="{ ...baseStyle, background: `${n % 2 ? '#1677ffbf' : '#1677ff'}` }"
      />
    </Flex>
  </Flex>
</template>
```

:::

## 对齐方式

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

::: details Show Code

```vue
<script setup lang="ts">
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
</script>
<template>
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
</template>
```

:::

## 设置间隙

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

::: details Show Code

```vue
<script setup lang="ts">
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
</template>
```

:::

## 自动换行

<Flex wrap="wrap" :width="600" :gap="[8, 16]">
  <Button v-for="n in new Array(16)" :key="n" type="primary">Button</Button>
</Flex>
<br/>

::: details Show Code

```vue
<template>
  <Flex wrap="wrap" :width="600" :gap="[8, 16]">
    <Button v-for="n in new Array(16)" :key="n" type="primary">Button</Button>
  </Flex>
</template>
```

:::

## APIs

参数 | 说明 | 类型 | 默认值 | 必传
-- | -- | -- | -- | --
width | 区域总宽度 | string &#124; number | 'auto' | false
vertical | `flex` 主轴的方向是否垂直，`vertical` 使用 `flex-direction: column` | boolean | false | false
wrap | 设置元素单行显示还是多行显示；参考 [`flex-wrap`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/flex-wrap) | 'nowrap' &#124; 'wrap' &#124; 'wrap-reverse' | 'nowrap' | false
justify | 设置元素在主轴方向上的对齐方式；参考 [`justify-content`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/justify-content) | string | 'normal' | false
align | 设置元素在交叉轴方向上的对齐方式；参考 [`align-items`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/align-items) | string | 'normal' | false
gap | 设置网格之间的间隙，数组时表示: `[水平间距, 垂直间距]` | number &#124; number[] &#124; 'small' &#124; 'middle' &#124; 'large' | undefined | false
