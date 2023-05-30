# 选择器 Select

## 何时使用

- 弹出一个下拉菜单给用户选择操作，用于代替原生的选择器，或者需要一个更优雅的多选器时
- 当选项少时（少于 5 项），建议直接将选项平铺，使用 Radio 是更好的选择

<script setup lang="ts">
import { ref, watchEffect } from 'vue'
const options = ref([
      {
        label: '北京市',
        value: 1
      },
      {
        label: '上海市',
        value: 2
      },
      {
        label: '纽约市',
        value: 3
      },
      {
        label: '旧金山',
        value: 4
      },
      {
        label: '布宜诺斯艾利斯',
        value: 5
      },
      {
        label: '伊斯坦布尔',
        value: 6
      },
      {
        label: '拜占庭',
        value: 7
      },
      {
        label: '君士坦丁堡',
        value: 8
      }
    ])
const optionsDisabled = ref([
      {
        label: '北京市',
        value: 1
      },
      {
        label: '上海市',
        value: 2,
        disabled: true
      },
      {
        label: '纽约市',
        value: 3
      },
      {
        label: '旧金山',
        value: 4
      },
      {
        label: '布宜诺斯艾利斯',
        value: 5
      },
      {
        label: '伊斯坦布尔',
        value: 6
      },
      {
        label: '拜占庭',
        value: 7
      },
      {
        label: '君士坦丁堡',
        value: 8
      }
    ])
const selectedValue = ref(1)
watchEffect(() => {
  console.log('selectedValue:', selectedValue.value)
})
function onChange (value: string|number, label: string,  index: number) {
  console.log('value:', value)
  console.log('label:', label)
  console.log('index:', index)
}
</script>

## 基本使用

<Select :options="options" v-model="selectedValue" />

<details>
<summary>查看代码</summary>

```vue
<script setup lang="ts">
import { ref, watchEffect } from 'vue'
const options = ref([
      {
        label: '北京市',
        value: 1
      },
      {
        label: '上海市',
        value: 2
      },
      {
        label: '纽约市',
        value: 3
      },
      {
        label: '旧金山',
        value: 4
      },
      {
        label: '布宜诺斯艾利斯',
        value: 5
      },
      {
        label: '伊斯坦布尔',
        value: 6
      },
      {
        label: '拜占庭',
        value: 7
      },
      {
        label: '君士坦丁堡',
        value: 8
      }
    ])
const selectedValue = ref(1)
watchEffect(() => {
  console.log('selectedValue:', selectedValue.value)
})
</script>
<template>
  <Select :options="options" v-model="selectedValue" />
</template>
```

</details>

## 支持清除

<Select
  :options="options"
  v-model="selectedValue"
  @change="onChange"
  allow-clear />

<details>
<summary>查看代码</summary>

```vue
<script setup lang="ts">
import { ref, watchEffect } from 'vue'
const options = ref([
      {
        label: '北京市',
        value: 1
      },
      {
        label: '上海市',
        value: 2
      },
      {
        label: '纽约市',
        value: 3
      },
      {
        label: '旧金山',
        value: 4
      },
      {
        label: '布宜诺斯艾利斯',
        value: 5
      },
      {
        label: '伊斯坦布尔',
        value: 6
      },
      {
        label: '拜占庭',
        value: 7
      },
      {
        label: '君士坦丁堡',
        value: 8
      }
    ])
const selectedValue = ref(1)
watchEffect(() => {
  console.log('selectedValue:', selectedValue.value)
})
function onChange (value: string|number, label: string,  index: number) {
  console.log('value:', value)
  console.log('label:', label)
  console.log('index:', index)
}
</script>
<template>
  <Select
    :options="options"
    v-model="selectedValue"
    @change="onChange"
    allow-clear />
</template>
```

</details>

## 禁用

<Select :options="options" v-model="selectedValue" disabled />

<details>
<summary>查看代码</summary>

```vue
<script setup lang="ts">
import { ref } from 'vue'
const options = ref([
      {
        label: '北京市',
        value: 1
      },
      {
        label: '上海市',
        value: 2
      },
      {
        label: '纽约市',
        value: 3
      },
      {
        label: '旧金山',
        value: 4
      },
      {
        label: '布宜诺斯艾利斯',
        value: 5
      },
      {
        label: '伊斯坦布尔',
        value: 6
      },
      {
        label: '拜占庭',
        value: 7
      },
      {
        label: '君士坦丁堡',
        value: 8
      }
    ])
const selectedValue = ref(1)
</script>
<template>
  <Select :options="options" v-model="selectedValue" disabled />
</template>
```

</details>

## 禁用选项

<Select
  :options="optionsDisabled"
  v-model="selectedValue" />

<details>
<summary>查看代码</summary>

```vue
<script setup lang="ts">
import { ref } from 'vue'
const optionsDisabled = ref([
      {
        label: '北京市',
        value: 1
      },
      {
        label: '上海市',
        value: 2,
        disabled: true
      },
      {
        label: '纽约市',
        value: 3
      },
      {
        label: '旧金山',
        value: 4
      },
      {
        label: '布宜诺斯艾利斯',
        value: 5
      },
      {
        label: '伊斯坦布尔',
        value: 6
      },
      {
        label: '拜占庭',
        value: 7
      },
      {
        label: '君士坦丁堡',
        value: 8
      }
    ])
const selectedValue = ref(1)
</script>
<template>
  <Select :options="optionsDisabled" v-model="selectedValue" />
</template>
```

</details>

## 自定义宽度和高度

<Select
  :width="160"
  :height="36"
  :options="options"
  v-model="selectedValue"
  @change="onChange" />

<details>
<summary>查看代码</summary>

```vue
<script setup lang="ts">
import { ref, watchEffect } from 'vue'
const options = ref([
      {
        label: '北京市',
        value: 1
      },
      {
        label: '上海市',
        value: 2
      },
      {
        label: '纽约市',
        value: 3
      },
      {
        label: '旧金山',
        value: 4
      },
      {
        label: '布宜诺斯艾利斯',
        value: 5
      },
      {
        label: '伊斯坦布尔',
        value: 6
      },
      {
        label: '拜占庭',
        value: 7
      },
      {
        label: '君士坦丁堡',
        value: 8
      }
    ])
const selectedValue = ref(1)
watchEffect(() => {
  console.log('selectedValue:', selectedValue.value)
})
function onChange (value: string|number, label: string,  index: number) {
  console.log('value:', value)
  console.log('label:', label)
  console.log('index:', index)
}
</script>
<template>
  <Select
    :width="160"
    :height="36"
    :options="options"
    v-model="selectedValue"
    @change="onChange" />
</template>
```

</details>

## APIs

参数 | 说明 | 类型 | 默认值 | 必传
-- | -- | -- | -- | --
options | 选项数据 | Option[] | [] | false
label | 字典项的文本字段名 | string | 'label' | false
value | 字典项的值字段名 | string | 'value' | false
placeholder | 默认文字 | string | '请选择' | false
disabled | 是否禁用 | boolean | false | false
allowClear | 是否支持清除 | boolean | false | false
width | 宽度 | number | 120 | false
height | 高度 | number | 32 | false
maxDisplay | 下拉面板最多能展示的下拉项数，超过后滚动显示 | number | 6 | false
modelValue(v-model) | 当前选中的option条目 | number &#124; string &#124; null | null | false

## Option Type

名称 | 说明 | 类型 | 必传
-- | -- | -- | --
label | 选项名 | string | false
value | 选项值 | string &#124; number | false
disabled | 是否禁用选项 | boolean | false
[propName: string] | 添加一个字符串索引签名，用于包含带有任意数量的其他属性 | any | -

## Events

事件名称 | 说明 | 参数
-- | -- | --
change | 选项值改变后的回调 | (value: string &#124; number, label: string,  index: number) => void
