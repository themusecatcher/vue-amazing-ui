# 多选框 Checkbox

## 何时使用

- 在一组可选项中进行多项选择时
- 单独使用可以表示两种状态之间的切换，和 Switch 类似

<script setup lang="ts">
import { ref, watch, computed } from 'vue'

const options = ref([
      {
        label: '北京市',
        value: 1
      },
      {
        label: '上海市上海市上海市上海市',
        value: 2,
        disabled: true
      },
      {
        label: '郑州市',
        value: 3
      },
      {
        label: '纽约市纽约市纽约市纽约市',
        value: 4
      },
      {
        label: '旧金山',
        value: 5
      },
      {
        label: '悉尼市',
        value: 6
      },
      {
        label: '伦敦市',
        value: 7
      },
      {
        label: '巴黎市',
        value: 8
      }
    ])

const value = ref([2]) // 多选框v-model
watch(value, (to) => {
  console.log('p to:', to)
})
function onChange (value: any[]) {
  console.log('change:', value)
}

const checkAll = ref(false) // 全选v-model
const indeterminate = computed(() => {
  if (value.value.length > 0 && value.value.length < options.value.length) {
    return true
  } else {
    false
  }
}) // 全选样式控制
watch(checkAll, (to) => {
  console.log('p to:', to)
  if (to) {
    value.value = options.value.map(option => option.value)
  } else {
    value.value = []
  }
})
</script>

## 基本使用

<Checkbox :options="options" v-model:value="value" @change="onChange" />

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
        label: '上海市上海市上海市上海市',
        value: 2,
        disabled: true
      },
      {
        label: '郑州市',
        value: 3
      },
      {
        label: '纽约市纽约市纽约市纽约市',
        value: 4
      },
      {
        label: '旧金山',
        value: 5
      },
      {
        label: '悉尼市',
        value: 6
      },
      {
        label: '伦敦市',
        value: 7
      },
      {
        label: '巴黎市',
        value: 8
      }
    ])

const value = ref([2]) // 多选框v-model
watchEffect(() => {
  console.log('value:', value)
})
function onChange (value: any[]) {
  console.log('change:', value)
}
</script>
<template>
  <Checkbox :options="options" v-model:value="value" @change="onChange" />
</template>
```

</details>

## 实现全选效果

<Checkbox class="mb10" :indeterminate="indeterminate" v-model:checked="checkAll">Check All</Checkbox>
<br/>
<Checkbox :options="options" v-model:value="value" />

<details>
<summary>查看代码</summary>

```vue
<script setup lang="ts">
import { ref, watch, watchEffect, computed } from 'vue'

const options = ref([
      {
        label: '北京市',
        value: 1
      },
      {
        label: '上海市上海市上海市上海市',
        value: 2,
        disabled: true
      },
      {
        label: '郑州市',
        value: 3
      },
      {
        label: '纽约市纽约市纽约市纽约市',
        value: 4
      },
      {
        label: '旧金山',
        value: 5
      },
      {
        label: '悉尼市',
        value: 6
      },
      {
        label: '伦敦市',
        value: 7
      },
      {
        label: '巴黎市',
        value: 8
      }
    ])

const value = ref([2]) // 多选框v-model
watchEffect(() => {
  console.log('value:', value)
})
const checkAll = ref(false) // 全选v-model
const indeterminate = computed(() => {
  if (value.value.length > 0 && value.value.length < options.value.length) {
    return true
  } else {
    return false
  }
}) // 全选样式控制
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
```

</details>

## 垂直排列

<Checkbox :options="options" vertical v-model:value="value"/>

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
        label: '上海市上海市上海市上海市',
        value: 2,
        disabled: true
      },
      {
        label: '郑州市',
        value: 3
      },
      {
        label: '纽约市纽约市纽约市纽约市',
        value: 4
      },
      {
        label: '旧金山',
        value: 5
      },
      {
        label: '悉尼市',
        value: 6
      },
      {
        label: '伦敦市',
        value: 7
      },
      {
        label: '巴黎市',
        value: 8
      }
    ])

const value = ref([2]) // 多选框v-model
watchEffect(() => {
  console.log('value:', value)
})
</script>
<template>
  <Checkbox :options="options" vertical v-model:value="value"/>
</template>
```

</details>
