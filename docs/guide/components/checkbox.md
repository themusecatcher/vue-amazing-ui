# 多选框 Checkbox

## 何时使用

- 在一组可选项中进行多项选择时
- 单独使用可以表示两种状态之间的切换，和 Switch 类似

<script setup lang="ts">
import { ref, watch, watchEffect, computed } from 'vue'

const options = ref([
      {
        label: '北京市',
        value: 1
      },
      {
        label: '纽约市',
        value: 2
      },
      {
        label: '布宜诺斯艾利斯',
        value: 3
      },
      {
        label: '伊斯坦布尔',
        value: 4
      },
      {
        label: '拜占庭',
        value: 5
      },
      {
        label: '君士坦丁堡',
        value: 6
      }
    ])

const optionsDisabled = ref([
      {
        label: '北京市',
        value: 1
      },
      {
        label: '纽约市',
        value: 2,
        disabled: true
      },
      {
        label: '布宜诺斯艾利斯',
        value: 3
      },
      {
        label: '伊斯坦布尔',
        value: 4
      },
      {
        label: '拜占庭',
        value: 5
      },
      {
        label: '君士坦丁堡',
        value: 6
      }
    ])
const value = ref([2]) // 多选框v-model
watchEffect(() => {
  console.log('value:', value.value)
})
function onChange (value: any[]) {
  console.log('change:', value)
}

const checkAll = ref(false) // 全选v-model
const indeterminate = computed(() => { // 全选样式控制
  if (value.value.length > 0 && value.value.length < options.value.length) {
    return true
  } else {
    false
  }
})
watch(checkAll, (to) => {
  console.log('checkAll:', to)
  if (to) {
    value.value = options.value.map(option => option.value)
  } else {
    value.value = []
  }
})
</script>

## 基本使用

<Checkbox :options="options" v-model:value="value" />

::: details Show Code

```vue
<script setup lang="ts">
import { ref, watchEffect } from 'vue'

const options = ref([
      {
        label: '北京市',
        value: 1
      },
      {
        label: '纽约市',
        value: 2
      },
      {
        label: '布宜诺斯艾利斯',
        value: 3
      },
      {
        label: '伊斯坦布尔',
        value: 4
      },
      {
        label: '拜占庭',
        value: 5
      },
      {
        label: '君士坦丁堡',
        value: 6
      }
    ])

const value = ref([2]) // 多选框v-model
watchEffect(() => {
  console.log('value:', value.value)
})
</script>
<template>
  <Checkbox :options="options" v-model:value="value" />
</template>
```

:::

## 禁用

<Checkbox :options="options" v-model:value="value" disabled />

::: details Show Code

```vue
<script setup lang="ts">
import { ref } from 'vue'

const options = ref([
      {
        label: '北京市',
        value: 1
      },
      {
        label: '纽约市',
        value: 2
      },
      {
        label: '布宜诺斯艾利斯',
        value: 3
      },
      {
        label: '伊斯坦布尔',
        value: 4
      },
      {
        label: '拜占庭',
        value: 5
      },
      {
        label: '君士坦丁堡',
        value: 6
      }
    ])
const value = ref([2]) // 多选框v-model
</script>
<template>
  <Checkbox :options="options" v-model:value="value" disabled />
</template>
```

:::

## 禁用选项

<Checkbox :options="optionsDisabled" v-model:value="value" />

::: details Show Code

```vue
<script setup lang="ts">
import { ref, watchEffect } from 'vue'

const optionsDisabled = ref([
      {
        label: '北京市',
        value: 1
      },
      {
        label: '纽约市',
        value: 2,
        disabled: true
      },
      {
        label: '布宜诺斯艾利斯',
        value: 3
      },
      {
        label: '伊斯坦布尔',
        value: 4
      },
      {
        label: '拜占庭',
        value: 5
      },
      {
        label: '君士坦丁堡',
        value: 6
      }
    ])
const value = ref([2]) // 多选框v-model
watchEffect(() => {
  console.log('value:', value.value)
})
</script>
<template>
  <Checkbox :options="optionsDisabled" v-model:value="value" />
</template>
```

:::

## 实现全选效果

<Checkbox class="mb10" :indeterminate="indeterminate" v-model:checked="checkAll">Check All</Checkbox>
<br/>
<Checkbox :options="options" v-model:value="value" />

<style lang="less" scoped>
.mb10 {
  margin-bottom: 10px;
}
</style>
::: details Show Code

```vue
<script setup lang="ts">
import { ref, watch, watchEffect, computed } from 'vue'

const options = ref([
      {
        label: '北京市',
        value: 1
      },
      {
        label: '纽约市',
        value: 2
      },
      {
        label: '布宜诺斯艾利斯',
        value: 3
      },
      {
        label: '伊斯坦布尔',
        value: 4
      },
      {
        label: '拜占庭',
        value: 5
      },
      {
        label: '君士坦丁堡',
        value: 6
      }
    ])

const value = ref([2]) // 多选框v-model
watchEffect(() => {
  console.log('value:', value.value)
})
const checkAll = ref(false) // 全选v-model
const indeterminate = computed(() => { // 全选样式控制
  if (value.value.length > 0 && value.value.length < options.value.length) {
    return true
  } else {
    return false
  }
})
watch(checkAll, (to) => {
  console.log('checkAll:', to)
  if (to) {
    value.value = options.value.map(option => option.value)
  } else {
    value.value = []
  }
})
</script>
<template>
  <Checkbox class="mb10" :indeterminate="indeterminate" v-model:checked="checkAll">Check All</Checkbox>
  <br/>
  <Checkbox :options="options" v-model:value="value" />
</template>
<style>
.mb10 {
  margin-bottom: 10px;
}
</style>
```

:::

## 垂直排列

<Checkbox vertical :options="options" v-model:value="value" />

::: details Show Code

```vue
<script setup lang="ts">
import { ref, watchEffect } from 'vue'

const options = ref([
      {
        label: '北京市',
        value: 1
      },
      {
        label: '纽约市',
        value: 2
      },
      {
        label: '布宜诺斯艾利斯',
        value: 3
      },
      {
        label: '伊斯坦布尔',
        value: 4
      },
      {
        label: '拜占庭',
        value: 5
      },
      {
        label: '君士坦丁堡',
        value: 6
      }
    ])

const value = ref([2]) // 多选框v-model
watchEffect(() => {
  console.log('value:', value.value)
})
</script>
<template>
  <Checkbox vertical :options="options" v-model:value="value" />
</template>
```

:::

## 自定义间距

<Checkbox :gap="24" :options="options" v-model:value="value" />

::: details Show Code

```vue
<script setup lang="ts">
import { ref, watchEffect } from 'vue'

const options = ref([
      {
        label: '北京市',
        value: 1
      },
      {
        label: '纽约市',
        value: 2
      },
      {
        label: '布宜诺斯艾利斯',
        value: 3
      },
      {
        label: '伊斯坦布尔',
        value: 4
      },
      {
        label: '拜占庭',
        value: 5
      },
      {
        label: '君士坦丁堡',
        value: 6
      }
    ])

const value = ref([2]) // 多选框v-model
watchEffect(() => {
  console.log('value:', value.value)
})
</script>
<template>
  <Checkbox :gap="24" :options="options" v-model:value="value" />
</template>
```

:::

## 自定义展示区域宽高

<Checkbox vertical :width="110" :height="150" :options="options" v-model:value="value" />

::: details Show Code

```vue
<script setup lang="ts">
import { ref, watchEffect } from 'vue'

const options = ref([
      {
        label: '北京市',
        value: 1
      },
      {
        label: '纽约市',
        value: 2
      },
      {
        label: '布宜诺斯艾利斯',
        value: 3
      },
      {
        label: '伊斯坦布尔',
        value: 4
      },
      {
        label: '拜占庭',
        value: 5
      },
      {
        label: '君士坦丁堡',
        value: 6
      }
    ])

const value = ref([2]) // 多选框v-model
watchEffect(() => {
  console.log('value:', value.value)
})
</script>
<template>
  <Checkbox vertical :width="120" :height="150" :options="options" v-model:value="value" />
</template>
```

:::

## APIs

参数 | 说明 | 类型 | 默认值 | 必传
-- | -- | -- | -- | --
options | 复选元素数据 | Option[] | [] | false
disabled | 是否禁用所有复选框 | boolean | false | false
vertical | 是否垂直排列 | boolean | false | false
value <Tag color="cyan">v-model</Tag> | 当前选中的值 | any[] | [] | false
gap | 多个单选框之间的间距，单位px，垂直排列时，间距即垂直间距 | number | 8 | false
width | 复选区域最大展示宽度，超出后折行 | string &#124; number | 'auto' | false
height | 复选区域最大展示高度，超出后滚动 | string &#124; number | 'auto' | false
indeterminate | 全选时的样式控制 | boolean | false | false
checked <Tag color="cyan">v-model</Tag> | 是否全选 | boolean | false | false

## Option Type

名称 | 说明 | 类型 | 必传
-- | -- | -- | --
label | 选项名 | string | true
value | 选项值 | any | true
disabled | 是否禁用选项 | boolean | false

## Events

事件名称 | 说明 | 参数
-- | -- | --
change | 变化时回调函数 | (value: any[]) => void
