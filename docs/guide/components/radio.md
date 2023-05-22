# 单选框 Radio

## 何时使用

- 用于在多个备选项中选中单个状态
- 和 Select 的区别是，Radio 所有选项默认可见，方便用户在比较中选择，因此选项不宜过多

<script setup lang="ts">
import { ref, watch } from 'vue'
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
        label: '伦敦市',
        value: 5
      },
      {
        label: '巴黎市',
        value: 6
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
        label: '伦敦市',
        value: 5
      },
      {
        label: '巴黎市',
        value: 6
      }
    ])

const value = ref(1)
watch(value, (to) => {
  console.log('p to:', to)
})
function onChange (value: any) {
  console.log('change:', value)
}
</script>

## 基本使用

<Radio :options="options" @change="onChange" v-model:value="value" />

<details>
<summary>查看代码</summary>

```vue
<script setup lang="ts">
import { ref, watch } from 'vue'
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
        label: '伦敦市',
        value: 5
      },
      {
        label: '巴黎市',
        value: 6
      }
    ])

const value = ref(1)
watch(value, (to) => {
  console.log('p to:', to)
})
function onChange (value: any) {
  console.log('change:', value)
}
</script>
<template>
  <Radio :options="options" @change="onChange" v-model:value="value" />
</template>
```

</details>

## 垂直排列

<Radio :options="options" @change="onChange" v-model:value="value" vertical />

<details>
<summary>查看代码</summary>

```vue
<script setup lang="ts">
import { ref, watch } from 'vue'
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
        label: '伦敦市',
        value: 5
      },
      {
        label: '巴黎市',
        value: 6
      }
    ])

const value = ref(1)
watch(value, (to) => {
  console.log('p to:', to)
})
function onChange (value: any) {
  console.log('change:', value)
}
</script>
<template>
  <Radio :options="options" @change="onChange" v-model:value="value" vertical />
</template>
```

</details>

## 禁用全部

<Radio :options="options" @change="onChange" v-model:value="value" disabled />

<details>
<summary>查看代码</summary>

```vue
<script setup lang="ts">
import { ref, watch } from 'vue'
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
        label: '伦敦市',
        value: 5
      },
      {
        label: '巴黎市',
        value: 6
      }
    ])

const value = ref(1)
watch(value, (to) => {
  console.log('p to:', to)
})
function onChange (value: any) {
  console.log('change:', value)
}
</script>
<template>
  <Radio :options="options" @change="onChange" v-model:value="value" disabled />
</template>
```

</details>

## 禁用单个

<Radio :options="optionsDisabled" @change="onChange" v-model:value="value" />

<details>
<summary>查看代码</summary>

```vue
<script setup lang="ts">
import { ref, watch } from 'vue'
const options = ref([
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
        label: '伦敦市',
        value: 5
      },
      {
        label: '巴黎市',
        value: 6
      }
    ])

const value = ref(1)
watch(value, (to) => {
  console.log('p to:', to)
})
function onChange (value: any) {
  console.log('change:', value)
}
</script>
<template>
  <Radio :options="options" @change="onChange" v-model:value="value" />
</template>
```

</details>
