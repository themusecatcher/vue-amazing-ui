# 级联选择 Cascader

## 何时使用

- 需要从一组相关联的数据集合进行选择，例如省市区，公司层级，事物分类等
- 从一个较大的数据集合中进行选择时，用多级分类进行分隔，方便选择

## 基本使用

<script setup lang="ts">
import { ref, watchEffect } from 'vue'
const options = ref([
  {
    value: '1',
    label: '北京',
    children: [
      {
        value: '11',
        label: '北京市',
        children: [
          {
            value: '111',
            label: '东城区'
          },
          {
            value: '112',
            label: '西城区'
          }
        ]
      }
    ]
  },
  {
    value: '2',
    label: '浙江',
    children: [
      {
        value: '21',
        label: '杭州市',
        children: [
          {
            value: '211',
            label: '西湖区'
          },
          {
            value: '212',
            label: '余杭区'
          }
        ]
      },
      {
        value: '22',
        label: '湖州市',
        children: [
          {
            value: '221',
            label: '吴兴区'
          },
          {
            value: '222',
            label: '安吉区'
          }
        ]
      }
    ]
  }
])
const selectedValue = ref(['2', '21', '212'])
watchEffect(() => {
  console.log('selectedValue:', selectedValue.value)
})
function onChange (values: (number|string)[], labels: string[]) {
  console.log('values:', values)
  console.log('labels:', labels)
}
</script>

<Cascader :options="options" v-model:selectedValue="selectedValue" />

<details>
<summary>查看代码</summary>

```vue
<script setup lang="ts">
import { ref, watchEffect } from 'vue'
const options = ref([
  {
    value: '1',
    label: '北京',
    children: [
      {
        value: '11',
        label: '北京市',
        children: [
          {
            value: '111',
            label: '东城区'
          },
          {
            value: '112',
            label: '西城区'
          }
        ]
      }
    ]
  },
  {
    value: '2',
    label: '浙江',
    children: [
      {
        value: '21',
        label: '杭州市',
        children: [
          {
            value: '211',
            label: '西湖区'
          },
          {
            value: '212',
            label: '余杭区'
          }
        ]
      },
      {
        value: '22',
        label: '湖州市',
        children: [
          {
            value: '221',
            label: '吴兴区'
          },
          {
            value: '222',
            label: '安吉区'
          }
        ]
      }
    ]
  }
])
const selectedValue = ref(['2', '21', '212'])
watchEffect(() => {
  console.log('selectedValue:', selectedValue.value)
})
</script>
<template>
  <Cascader :options="options" v-model:selectedValue="selectedValue" />
</template>
```

</details>

## 点击任一级下拉时，选项值都会发生变化

<Cascader
  :options="options"
  v-model:selectedValue="selectedValue"
  changeOnSelect
  @change="onChange" />

<details>
<summary>查看代码</summary>

```vue
<script setup lang="ts">
import { ref, watchEffect } from 'vue'
const options = ref([
  {
    value: '1',
    label: '北京',
    children: [
      {
        value: '11',
        label: '北京市',
        children: [
          {
            value: '111',
            label: '东城区'
          },
          {
            value: '112',
            label: '西城区'
          }
        ]
      }
    ]
  },
  {
    value: '2',
    label: '浙江',
    children: [
      {
        value: '21',
        label: '杭州市',
        children: [
          {
            value: '211',
            label: '西湖区'
          },
          {
            value: '212',
            label: '余杭区'
          }
        ]
      },
      {
        value: '22',
        label: '湖州市',
        children: [
          {
            value: '221',
            label: '吴兴区'
          },
          {
            value: '222',
            label: '安吉区'
          }
        ]
      }
    ]
  }
])
const selectedValue = ref(['2', '21', '212'])
watchEffect(() => {
  console.log('selectedValue:', selectedValue.value)
})
function onChange (values: (number|string)[], labels: string[]) {
  console.log('values:', values)
  console.log('labels:', labels)
}
</script>
<template>
  <Cascader
    :options="options"
    v-model:selectedValue="selectedValue"
    changeOnSelect
    @change="onChange" />
</template>
```

</details>

## 只禁用第一级下拉

<Cascader
  :options="options"
  v-model:selectedValue="selectedValue"
  :disabled="[true]"
  @change="onChange" />

<details>
<summary>查看代码</summary>

```vue
<script setup lang="ts">
import { ref, watchEffect } from 'vue'
const options = ref([
  {
    value: '1',
    label: '北京',
    children: [
      {
        value: '11',
        label: '北京市',
        children: [
          {
            value: '111',
            label: '东城区'
          },
          {
            value: '112',
            label: '西城区'
          }
        ]
      }
    ]
  },
  {
    value: '2',
    label: '浙江',
    children: [
      {
        value: '21',
        label: '杭州市',
        children: [
          {
            value: '211',
            label: '西湖区'
          },
          {
            value: '212',
            label: '余杭区'
          }
        ]
      },
      {
        value: '22',
        label: '湖州市',
        children: [
          {
            value: '221',
            label: '吴兴区'
          },
          {
            value: '222',
            label: '安吉区'
          }
        ]
      }
    ]
  }
])
const selectedValue = ref(['2', '21', '212'])
watchEffect(() => {
  console.log('selectedValue:', selectedValue.value)
})
function onChange (values: (number|string)[], labels: string[]) {
  console.log('values:', values)
  console.log('labels:', labels)
}
</script>
<template>
  <Cascader
    :options="options"
    v-model:selectedValue="selectedValue"
    :disabled="[true]"
    @change="onChange" />
</template>
```

</details>

## 自定义每级宽度和间隙

<Cascader
  :options="options"
  v-model:selectedValue="selectedValue"
  :width="120"
  :gap="12"
  @change="onChange" />

<details>
<summary>查看代码</summary>

```vue
<script setup lang="ts">
import { ref, watchEffect } from 'vue'
const options = ref([
  {
    value: '1',
    label: '北京',
    children: [
      {
        value: '11',
        label: '北京市',
        children: [
          {
            value: '111',
            label: '东城区'
          },
          {
            value: '112',
            label: '西城区'
          }
        ]
      }
    ]
  },
  {
    value: '2',
    label: '浙江',
    children: [
      {
        value: '21',
        label: '杭州市',
        children: [
          {
            value: '211',
            label: '西湖区'
          },
          {
            value: '212',
            label: '余杭区'
          }
        ]
      },
      {
        value: '22',
        label: '湖州市',
        children: [
          {
            value: '221',
            label: '吴兴区'
          },
          {
            value: '222',
            label: '安吉区'
          }
        ]
      }
    ]
  }
])
const selectedValue = ref(['2', '21', '212'])
watchEffect(() => {
  console.log('selectedValue:', selectedValue.value)
})
function onChange (values: (number|string)[], labels: string[]) {
  console.log('values:', values)
  console.log('labels:', labels)
}
</script>
<template>
  <Cascader
    :options="options"
    v-model:selectedValue="selectedValue"
    :width="120"
    :gap="12"
    @change="onChange" />
</template>
```

</details>
