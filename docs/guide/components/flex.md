# 弹性布局 Flex

<GlobalElement />

_设置组件之间的间距，设置各种水平、垂直对齐方式_

## 与 `Space` 组件的区别

- `Space` 为内联元素提供间距，自身以 `inline-flex` 排列子元素（不额外包裹），适用于行内多个元素的等距排列。
- `Flex` 为块级元素提供间距，自身以 `flex` 排列子元素，适用于垂直或水平方向上的布局，并提供了更多的灵活性和控制能力。

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
const gapSize = ref('middle')
const customGapSize = ref(16)
</script>

## 基本使用

<Flex vertical>
  <RadioGroup :options="directionOptions" v-model:value="direction" />
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
    value: 'vertical'
  }
])
const direction = ref('horizontal')
const baseStyle = {
  width: '25%',
  height: '54px'
}
</script>
<template>
  <Flex vertical>
    <RadioGroup :options="directionOptions" v-model:value="direction" />
    <Flex :vertical="direction === 'vertical'">
      <div v-for="n in 4" :key="n" :style="{ ...baseStyle, background: `${n % 2 ? '#1677ffbf' : '#1677ff'}` }" />
    </Flex>
  </Flex>
</template>
```

:::

## 对齐方式

_通过 `justify` 与 `align` 分别控制主轴与交叉轴的对齐方式_

<br/>

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
</template>
```

:::

## 设置间隙

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

::: details Show Code

```vue
<script setup lang="ts">
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
const gapSize = ref('middle')
const customGapSize = ref(16)
</script>
<template>
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
</template>
```

:::

## 自动换行

<Flex wrap="wrap" :width="600" :gap="[8, 16]">
  <Button v-for="n in 16" :key="n" type="primary">Button</Button>
</Flex>
<br/>

::: details Show Code

```vue
<template>
  <Flex wrap="wrap" :width="600" :gap="[8, 16]">
    <Button v-for="n in 16" :key="n" type="primary">Button</Button>
  </Flex>
</template>
```

:::

## 组合使用

_嵌套使用可实现更复杂的布局，主轴与交叉轴可分别控制_

<br/>

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

<style lang="less" scoped>
.flex-combination-logo {
  display: block;
  width: 273px;
  height: 273px;
  object-fit: contain;
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

::: details Show Code

```vue
<template>
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
</template>
<style lang="less" scoped>
.flex-combination-logo {
  display: block;
  width: 273px;
  height: 273px;
  object-fit: contain;
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
```

:::

## 自定义标签

_通过 `component` 指定渲染的标签或组件，便于语义化布局_

<br/>

<Flex component="ul" vertical :gap="8" class="flex-list">
  <li v-for="n in 3" :key="n">列表项 {{ n }}</li>
</Flex>

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
</style>

::: details Show Code

```vue
<template>
  <Flex component="ul" vertical :gap="8" class="flex-list">
    <li v-for="n in 3" :key="n">列表项 {{ n }}</li>
  </Flex>
</template>
```

:::

## 容器伸缩

_通过 `flex` 设置容器自身作为 `flex` 子项时的伸缩比，示例两块按 `1 : 2` 分配剩余宽度，无需另写 `style`_

<br/>

<Flex gap="small">
  <Flex flex="1" justify="center" align="center" class="flex-stretch-demo">flex: 1</Flex>
  <Flex flex="2" justify="center" align="center" class="flex-stretch-demo">flex: 2</Flex>
</Flex>

<style lang="less" scoped>
.flex-stretch-demo {
  height: 64px;
  font-size: 14px;
  font-weight: 500;
  color: var(--va-primary-color);
  background: var(--va-primary-bg-color);
  border-radius: 8px;
}
</style>

::: details Show Code

```vue
<template>
  <Flex gap="small">
    <Flex flex="1" justify="center" align="center" class="flex-stretch-demo">flex: 1</Flex>
    <Flex flex="2" justify="center" align="center" class="flex-stretch-demo">flex: 2</Flex>
  </Flex>
</template>
<style lang="less" scoped>
.flex-stretch-demo {
  height: 64px;
  font-size: 14px;
  font-weight: 500;
  color: var(--va-primary-color);
  background: var(--va-primary-bg-color);
  border-radius: 8px;
}
</style>
```

:::

## APIs

### Flex Props

| 名称 | 说明 | 类型 | 默认值 |
| :-- | :-- | :-- | :-- |
| width | 弹性区域总宽度，单位 `px` | string &#124; number | 'auto' |
| flex | 容器自身作为 `flex` 子项时的伸缩简写，数值即 `flex-grow`，字符串原样透传 | string &#124; number | undefined |
| vertical | `flex` 主轴的方向是否垂直，`vertical` 使用 `flex-direction: column` | boolean | false |
| wrap | 设置元素单行显示还是多行显示；参考 [`flex-wrap`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/flex-wrap) | 'nowrap' &#124; 'wrap' &#124; 'wrap-reverse' | 'nowrap' |
| justify | 设置元素在主轴方向上的对齐方式；参考 [`justify-content`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/justify-content) | string | 'normal' |
| align | 设置元素在交叉轴方向上的对齐方式；参考 [`align-items`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/align-items) | string | 'normal' |
| gap | 设置网格之间的间隙，数组时表示: `[水平间距, 垂直间距]` | number &#124; number[] &#124; 'small' &#124; 'middle' &#124; 'large' | 'middle' |
| component | 渲染的标签名或组件，用于语义化布局 | string &#124; Component | 'div' |

无子元素时不参与布局（不占父级 `flex` 的一份间距）。

## Slots

| 名称 | 说明 | 用法 |
| :-- | :-- | :-- |
| default | 自定义内容 | v-slot:default |
