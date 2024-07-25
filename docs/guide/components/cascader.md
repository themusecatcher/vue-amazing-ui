# 级联选择 Cascader

<BackTop />
<Watermark fullscreen content="Vue Amazing UI" />

## 何时使用

- 需要从一组相关联的数据集合进行选择，例如省市区，公司层级，事物分类等
- 从一个较大的数据集合中进行选择时，用多级分类进行分隔，方便选择

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
const optionsCustom = ref([
  {
    code: '1',
    name: '北京',
    items: [
      {
        code: '11',
        name: '北京市',
        items: [
          {
            code: '111',
            name: '东城区'
          },
          {
            code: '112',
            name: '西城区'
          }
        ]
      }
    ]
  },
  {
    code: '2',
    name: '浙江',
    items: [
      {
        code: '21',
        name: '杭州市',
        items: [
          {
            code: '211',
            name: '西湖区'
          },
          {
            code: '212',
            name: '余杭区'
          }
        ]
      },
      {
        code: '22',
        name: '湖州市',
        items: [
          {
            code: '221',
            name: '吴兴区'
          },
          {
            code: '222',
            name: '安吉区'
          }
        ]
      }
    ]
  }
])
const optionsDisabled = ref([
  {
    value: '1',
    label: '北京',
    disabled: true,
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
// 自定义过滤函数，当选项的 value 值大于 输入项时返回 true
function filter (inputValue: string, option: any) {
  return option.value > inputValue
}
</script>

## 基本使用

<Cascader :options="options" v-model="selectedValue" />

::: details Show Code

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
  <Cascader :options="options" v-model="selectedValue" />
</template>
```

:::

## 禁用

<Cascader
  :options="options"
  v-model="selectedValue"
  disabled />

::: details Show Code

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
</script>
<template>
  <Cascader
    :options="options"
    v-model="selectedValue"
    disabled />
</template>
```

:::

## 禁用某一级

*只禁用第一级：`disabled: [true]`*

*禁用前两级：`disabled: [true, true]`*

<br/>

<Cascader
  :options="options"
  v-model="selectedValue"
  :disabled="[true]"
  @change="onChange" />

::: details Show Code

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
    v-model="selectedValue"
    :disabled="[true]"
    @change="onChange" />
</template>
```

:::

## 禁用选项

*只需指定 `options` 里的 `disabled` 字段*

<br/>

<Cascader
  :options="optionsDisabled"
  v-model="selectedValue"
  @change="onChange" />

::: details Show Code

```vue
<script setup lang="ts">
import { ref, watchEffect } from 'vue'
const optionsDisabled = ref([
  {
    value: '1',
    label: '北京',
    disabled: true,
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
    :options="optionsDisabled"
    v-model="selectedValue"
    @change="onChange" />
</template>
```

:::

## 选择即改变

<Cascader
  :options="options"
  v-model="selectedValue"
  change-on-select
  @change="onChange" />

::: details Show Code

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
    v-model="selectedValue"
    change-on-select
    @change="onChange" />
</template>
```

:::

## 支持清除

<Cascader
  :options="options"
  v-model="selectedValue"
  allow-clear
  @change="onChange" />

::: details Show Code

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
    v-model="selectedValue"
    allow-clear
    @change="onChange" />
</template>
```

:::

## 支持搜索

<Cascader
  :width="100"
  :options="options"
  v-model="selectedValue"
  search
  @change="onChange" />

::: details Show Code

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
    :width="100"
    :options="options"
    v-model="selectedValue"
    search
    @change="onChange" />
</template>
```

:::

## 自定义搜索过滤函数

<Cascader
  :width="100"
  :options="options"
  v-model="selectedValue"
  search
  :filter="filter"
  @change="onChange" />

::: details Show Code

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
// 自定义过滤函数，当选项的 value 值大于 输入项时返回 true
function filter (inputValue: string, option: any) {
  return option.value > inputValue
}
</script>
<template>
  <Cascader
    :width="100"
    :options="options"
    v-model="selectedValue"
    search
    :filter="filter"
    @change="onChange" />
</template>
```

:::

## 自定义样式

<Cascader
  :options="options"
  v-model="selectedValue"
  :width="120"
  :height="36"
  :gap="12"
  @change="onChange" />

::: details Show Code

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
    v-model="selectedValue"
    :width="120"
    :height="36"
    :gap="12"
    @change="onChange" />
</template>
```

:::

## 自定义字段名

<Cascader
  :options="optionsCustom"
  v-model="selectedValue"
  label="name"
  value="code"
  children="items"
  @change="onChange" />

::: details Show Code

```vue
<script setup lang="ts">
import { ref, watchEffect } from 'vue'
const optionsCustom = ref([
  {
    code: '1',
    name: '北京',
    items: [
      {
        code: '11',
        name: '北京市',
        items: [
          {
            code: '111',
            name: '东城区'
          },
          {
            code: '112',
            name: '西城区'
          }
        ]
      }
    ]
  },
  {
    code: '2',
    name: '浙江',
    items: [
      {
        code: '21',
        name: '杭州市',
        items: [
          {
            code: '211',
            name: '西湖区'
          },
          {
            code: '212',
            name: '余杭区'
          }
        ]
      },
      {
        code: '22',
        name: '湖州市',
        items: [
          {
            code: '221',
            name: '吴兴区'
          },
          {
            code: '222',
            name: '安吉区'
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
    :options="optionsCustom"
    v-model="selectedValue"
    label="name"
    value="code"
    children="items"
    @change="onChange" />
</template>
```

:::

## APIs

### Cascader

参数 | 说明 | 类型 | 默认值 | 必传
-- | -- | -- | -- | --
options | 可选项数据源 | [Option](#option-type)[] | [] | false
label | 下拉字典项的文本字段名 | string | 'label' | false
value | 下拉字典项的值字段名 | string | 'value' | false
children | 下拉字典项的后代字段名 | string | 'children' | false
placeholder | 三级下拉各自占位文本 | string &#124; string[] | '请选择' | false
changeOnSelect | 当此项为 `true` 时，点选每级菜单选项值都会发生变化；否则只有选择第三级选项后选项值才会变化 | boolean | false | false
gap | 级联下拉框相互间隙宽度，单位 `px` | number | 8 | false
width | 三级下拉各自宽度，单位 `px` | 'auto' &#124; number &#124; number[] | 'auto' | false
height | 下拉框高度，单位 `px` | number | 32 | false
disabled | 三级各自是否禁用 | boolean &#124; boolean[] | false | false
allowClear | 是否支持清除 | boolean | false | false
search | 是否支持搜索，使用搜索时请设置 `width` | boolean | false | false
filter | 过滤条件函数，仅当支持搜索时生效，根据输入项进行筛选：<li>默认为 `true` 时，筛选每个选项的文本字段 `label` 是否包含输入项，包含返回 `true`，反之返回 `false`</li><li>当其为函数 `Function` 时，接受 `inputValue` `option` 两个参数，当 `option` 符合筛选条件时，应返回 `true`，反之则返回 `false`</li> | Function &#124; true | true | false
maxDisplay | 下拉面板最多能展示的下拉项数，超过后滚动显示 | number | 6 | false
modelValue <Tag color="cyan">v-model</Tag> | 级联选中项 | number[] &#124; string[] | [] | false

### Option Type

名称 | 说明 | 类型 | 必传
-- | -- | -- | --
label | 选项名 | string | false
value | 选项值 | string &#124; number | false
disabled | 是否禁用选项 | boolean | false
children | 选项 `children` 数组 | [Option](#option-type)[] | false
[propName: string] | 添加一个字符串索引签名，用于包含带有任意数量的其他属性 | any | false

## Events

名称 | 说明 | 类型
-- | -- | --
change | 选择完成后的回调 | (values: (number&#124;string)[], labels: string[]) => void
