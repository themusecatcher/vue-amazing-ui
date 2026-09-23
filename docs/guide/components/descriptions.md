# 描述列表 Descriptions

<GlobalElement />

*成组展示多个只读字段*

## 何时使用

- 常见于详情页的信息展示

<script setup lang="ts">
import { ref, reactive, computed, onMounted } from 'vue'
import { useWindowSize } from '@vueuse/core'
const size = ref('default')
const options = [
  {
    label: 'default',
    value: 'default'
  },
  {
    label: 'middle',
    value: 'middle'
  },
  {
    label: 'small',
    value: 'small'
  }
]
const labelAlign = ref<'left' | 'right' | 'center'>('left')
const labelAlignOptions = [
  {
    label: 'left',
    value: 'left'
  },
  {
    label: 'right',
    value: 'right'
  },
  {
    label: 'center',
    value: 'center'
  }
]
const show = ref(true)
const onClick = () => {
  show.value = false
}
// column 断点：与组件 Responsive 断点一一对应，rule 直观标注生效区间，min / max 用于判断当前视口命中项
type BreakpointKey = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl' | 'xxxl'
const breakpoints: { key: BreakpointKey; rule: string; min: number; max: number }[] = [
  { key: 'xs', rule: '<576px', min: 0, max: 575 },
  { key: 'sm', rule: '≥576px', min: 576, max: 767 },
  { key: 'md', rule: '≥768px', min: 768, max: 991 },
  { key: 'lg', rule: '≥992px', min: 992, max: 1199 },
  { key: 'xl', rule: '≥1200px', min: 1200, max: 1599 },
  { key: 'xxl', rule: '≥1600px', min: 1600, max: 1999 },
  { key: 'xxxl', rule: '≥2000px', min: 2000, max: Infinity }
]
const columnModeOptions = [
  { label: '统一列数', value: 'number' },
  { label: '响应式断点', value: 'responsive' }
]
const { width } = useWindowSize()
// 未挂载前不渲染依赖视口的反馈，避免服务端与客户端首屏输出不一致
const isMounted = ref(false)
onMounted(() => {
  isMounted.value = true
})
// 当前视口命中的断点：判定口径与组件一致（从大到小取第一个命中项）
const currentBreakpoint = computed<BreakpointKey | undefined>(() => {
  if (!isMounted.value) {
    return undefined
  }
  return breakpoints.find((bp) => width.value >= bp.min && width.value <= bp.max)?.key
})
const state = reactive({
  title: 'User Info',
  extra: 'extra',
  bordered: false,
  layout: 'horizontal' as 'horizontal' | 'vertical',
  size: 'default',
  colon: true,
  columnMode: 'number' as 'number' | 'responsive',
  columnValue: 3,
  column: {
    xs: 1,
    sm: 2,
    md: 3,
    lg: 3,
    xl: 3,
    xxl: 3,
    xxxl: 3
  },
  labelAlign: 'left' as 'left' | 'right' | 'center',
  labelStyle: {
    fontSize: '14px',
    color: '#FF6900',
    fontWeight: 600
  },
  contentStyle: {
    fontSize: '14px',
    color: '#1677FF',
    fontWeight: 400
  }
})
// 配置器最终传给组件的 column：统一列数传数值，响应式断点传对象
const columnConfig = computed(() => (state.columnMode === 'number' ? state.columnValue : state.column))
// 实时反馈当前实际生效的列数，帮助理解断点规则
const activeColumnTip = computed(() => {
  if (state.columnMode === 'number') {
    return `所有视口统一为 ${state.columnValue} 列`
  }
  const key = currentBreakpoint.value
  if (!key) {
    return '正在检测当前视口…'
  }
  const rule = breakpoints.find((bp) => bp.key === key)?.rule
  return `当前视口 ${width.value}px，命中 ${key}（${rule}），实际 ${state.column[key]} 列`
})
</script>

## 基本

<ClientOnly>
  <Descriptions title="User Info">
    <template #extra>
      <a href="#" @click="onClick">more</a>
    </template>
    <DescriptionsItem label="UserName">Zhou Maomao</DescriptionsItem>
    <DescriptionsItem label="Telephone">1810000000</DescriptionsItem>
    <DescriptionsItem label="Live">Hangzhou, Zhejiang</DescriptionsItem>
    <DescriptionsItem label="Remark">empty</DescriptionsItem>
    <DescriptionsItem label="Address"
      >No. 18, Wantang Road, Xihu District, Hangzhou, Zhejiang, China</DescriptionsItem
    >
  </Descriptions>
</ClientOnly>

::: details Show Code

```vue
<template>
  <Descriptions title="User Info">
    <template #extra>
      <a href="#" @click="onClick">more</a>
    </template>
    <DescriptionsItem label="UserName">Zhou Maomao</DescriptionsItem>
    <DescriptionsItem label="Telephone">1810000000</DescriptionsItem>
    <DescriptionsItem label="Live">Hangzhou, Zhejiang</DescriptionsItem>
    <DescriptionsItem label="Remark">empty</DescriptionsItem>
    <DescriptionsItem label="Address"
      >No. 18, Wantang Road, Xihu District, Hangzhou, Zhejiang, China</DescriptionsItem
    >
  </Descriptions>
</template>
```

:::

## 带边框的

<ClientOnly>
  <Descriptions title="User Info" bordered>
    <DescriptionsItem label="Product">Cloud Database</DescriptionsItem>
    <DescriptionsItem label="Billing Mode">Prepaid</DescriptionsItem>
    <DescriptionsItem label="Automatic Renewal">YES</DescriptionsItem>
    <DescriptionsItem label="Order time">2018-04-24 18:00:00</DescriptionsItem>
    <DescriptionsItem label="Usage Time" :span="2">2030-10-10 18:00:00</DescriptionsItem>
    <DescriptionsItem label="Status" :span="3">
      <Badge status="processing" ripple text="Running" />
    </DescriptionsItem>
    <DescriptionsItem label="Negotiated Amount">$80.00</DescriptionsItem>
    <DescriptionsItem label="Discount">$20.00</DescriptionsItem>
    <DescriptionsItem label="Official Receipts">$60.00</DescriptionsItem>
    <DescriptionsItem label="Config Info">
      Data disk type: MongoDB
      <br />
      Database version: 3.4
      <br />
      Package: dds.mongo.mid
      <br />
      Storage space: 10 GB
      <br />
      Replication factor: 3
      <br />
      Region: East China 1
      <br />
    </DescriptionsItem>
  </Descriptions>
</ClientOnly>

::: details Show Code

```vue
<template>
  <Descriptions title="User Info" bordered>
    <DescriptionsItem label="Product">Cloud Database</DescriptionsItem>
    <DescriptionsItem label="Billing Mode">Prepaid</DescriptionsItem>
    <DescriptionsItem label="Automatic Renewal">YES</DescriptionsItem>
    <DescriptionsItem label="Order time">2018-04-24 18:00:00</DescriptionsItem>
    <DescriptionsItem label="Usage Time" :span="2">2030-10-10 18:00:00</DescriptionsItem>
    <DescriptionsItem label="Status" :span="3">
      <Badge status="processing" ripple text="Running" />
    </DescriptionsItem>
    <DescriptionsItem label="Negotiated Amount">$80.00</DescriptionsItem>
    <DescriptionsItem label="Discount">$20.00</DescriptionsItem>
    <DescriptionsItem label="Official Receipts">$60.00</DescriptionsItem>
    <DescriptionsItem label="Config Info">
      Data disk type: MongoDB
      <br />
      Database version: 3.4
      <br />
      Package: dds.mongo.mid
      <br />
      Storage space: 10 GB
      <br />
      Replication factor: 3
      <br />
      Region: East China 1
      <br />
    </DescriptionsItem>
  </Descriptions>
</template>
```

:::

## 自定义尺寸

<ClientOnly>
  <Flex vertical gap="middle">
    <Radio :options="options" v-model:value="size" button button-style="solid" />
    <Descriptions bordered title="Custom Size" :size="size">
      <template #extra>
        <Button type="primary">Edit</Button>
      </template>
      <DescriptionsItem label="Product">Cloud Database</DescriptionsItem>
      <DescriptionsItem label="Billing">Prepaid</DescriptionsItem>
      <DescriptionsItem label="Time">18:00:00</DescriptionsItem>
      <DescriptionsItem label="Amount">$80.00</DescriptionsItem>
      <DescriptionsItem label="Discount">$20.00</DescriptionsItem>
      <DescriptionsItem label="Official">$60.00</DescriptionsItem>
      <DescriptionsItem label="Config Info">
        Data disk type: MongoDB
        <br />
        Database version: 3.4
        <br />
        Package: dds.mongo.mid
        <br />
        Storage space: 10 GB
        <br />
        Replication factor: 3
        <br />
        Region: East China 1
        <br />
      </DescriptionsItem>
    </Descriptions>
    <Descriptions title="Custom Size" :size="size">
      <template #extra>
        <Button type="primary">Edit</Button>
      </template>
      <DescriptionsItem label="Product">Cloud Database</DescriptionsItem>
      <DescriptionsItem label="Billing">Prepaid</DescriptionsItem>
      <DescriptionsItem label="Time">18:00:00</DescriptionsItem>
      <DescriptionsItem label="Amount">$80.00</DescriptionsItem>
      <DescriptionsItem label="Discount">$20.00</DescriptionsItem>
      <DescriptionsItem label="Official">$60.00</DescriptionsItem>
    </Descriptions>
  </Flex>
</ClientOnly>

::: details Show Code

```vue
<script setup lang="ts">
import { ref } from 'vue'
const size = ref('default')
const options = [
  {
    label: 'default',
    value: 'default'
  },
  {
    label: 'middle',
    value: 'middle'
  },
  {
    label: 'small',
    value: 'small'
  }
]
</script>
<template>
  <Flex vertical gap="middle">
    <Radio :options="options" v-model:value="size" button button-style="solid" />
    <Descriptions bordered title="Custom Size" :size="size">
      <template #extra>
        <Button type="primary">Edit</Button>
      </template>
      <DescriptionsItem label="Product">Cloud Database</DescriptionsItem>
      <DescriptionsItem label="Billing">Prepaid</DescriptionsItem>
      <DescriptionsItem label="Time">18:00:00</DescriptionsItem>
      <DescriptionsItem label="Amount">$80.00</DescriptionsItem>
      <DescriptionsItem label="Discount">$20.00</DescriptionsItem>
      <DescriptionsItem label="Official">$60.00</DescriptionsItem>
      <DescriptionsItem label="Config Info">
        Data disk type: MongoDB
        <br />
        Database version: 3.4
        <br />
        Package: dds.mongo.mid
        <br />
        Storage space: 10 GB
        <br />
        Replication factor: 3
        <br />
        Region: East China 1
        <br />
      </DescriptionsItem>
    </Descriptions>
    <Descriptions title="Custom Size" :size="size">
      <template #extra>
        <Button type="primary">Edit</Button>
      </template>
      <DescriptionsItem label="Product">Cloud Database</DescriptionsItem>
      <DescriptionsItem label="Billing">Prepaid</DescriptionsItem>
      <DescriptionsItem label="Time">18:00:00</DescriptionsItem>
      <DescriptionsItem label="Amount">$80.00</DescriptionsItem>
      <DescriptionsItem label="Discount">$20.00</DescriptionsItem>
      <DescriptionsItem label="Official">$60.00</DescriptionsItem>
    </Descriptions>
  </Flex>
</template>
```

:::

## 响应式

<ClientOnly>
  <Descriptions title="Responsive Descriptions" bordered :column="{ xxl: 4, xl: 3, lg: 3, md: 3, sm: 2, xs: 1 }">
    <DescriptionsItem label="Product">Cloud Database</DescriptionsItem>
    <DescriptionsItem label="Billing">Prepaid</DescriptionsItem>
    <DescriptionsItem label="Time">18:00:00</DescriptionsItem>
    <DescriptionsItem label="Amount">$80.00</DescriptionsItem>
    <DescriptionsItem label="Discount">$20.00</DescriptionsItem>
    <DescriptionsItem label="Official">$60.00</DescriptionsItem>
    <DescriptionsItem label="Config Info">
      Data disk type: MongoDB
      <br />
      Database version: 3.4
      <br />
      Package: dds.mongo.mid
      <br />
      Storage space: 10 GB
      <br />
      Replication factor: 3
      <br />
      Region: East China 1
    </DescriptionsItem>
  </Descriptions>
</ClientOnly>

::: details Show Code

```vue
<template>
  <Descriptions title="Responsive Descriptions" bordered :column="{ xxl: 4, xl: 3, lg: 3, md: 3, sm: 2, xs: 1 }">
    <DescriptionsItem label="Product">Cloud Database</DescriptionsItem>
    <DescriptionsItem label="Billing">Prepaid</DescriptionsItem>
    <DescriptionsItem label="Time">18:00:00</DescriptionsItem>
    <DescriptionsItem label="Amount">$80.00</DescriptionsItem>
    <DescriptionsItem label="Discount">$20.00</DescriptionsItem>
    <DescriptionsItem label="Official">$60.00</DescriptionsItem>
    <DescriptionsItem label="Config Info">
      Data disk type: MongoDB
      <br />
      Database version: 3.4
      <br />
      Package: dds.mongo.mid
      <br />
      Storage space: 10 GB
      <br />
      Replication factor: 3
      <br />
      Region: East China 1
    </DescriptionsItem>
  </Descriptions>
</template>
```

:::

## 垂直

<ClientOnly>
  <Descriptions title="User Info" layout="vertical">
    <DescriptionsItem label="UserName">Zhou Maomao</DescriptionsItem>
    <DescriptionsItem label="Telephone">1810000000</DescriptionsItem>
    <DescriptionsItem label="Live">Hangzhou, Zhejiang</DescriptionsItem>
    <DescriptionsItem label="Address" :span="2">
      No. 18, Wantang Road, Xihu District, Hangzhou, Zhejiang, China
    </DescriptionsItem>
    <DescriptionsItem label="Remark">empty</DescriptionsItem>
  </Descriptions>
</ClientOnly>

::: details Show Code

```vue
<template>
  <Descriptions title="User Info" layout="vertical">
    <DescriptionsItem label="UserName">Zhou Maomao</DescriptionsItem>
    <DescriptionsItem label="Telephone">1810000000</DescriptionsItem>
    <DescriptionsItem label="Live">Hangzhou, Zhejiang</DescriptionsItem>
    <DescriptionsItem label="Address" :span="2">
      No. 18, Wantang Road, Xihu District, Hangzhou, Zhejiang, China
    </DescriptionsItem>
    <DescriptionsItem label="Remark">empty</DescriptionsItem>
  </Descriptions>
</template>
```

:::

## 垂直带边框的

<ClientOnly>
  <Descriptions title="User Info" layout="vertical" bordered>
    <DescriptionsItem label="Product">Cloud Database</DescriptionsItem>
    <DescriptionsItem label="Billing Mode">Prepaid</DescriptionsItem>
    <DescriptionsItem label="Automatic Renewal">YES</DescriptionsItem>
    <DescriptionsItem label="Order time">2018-04-24 18:00:00</DescriptionsItem>
    <DescriptionsItem label="Usage Time" :span="2">2030-10-10 18:00:00</DescriptionsItem>
    <DescriptionsItem label="Status" :span="3">
      <Badge status="processing" ripple text="Running" />
    </DescriptionsItem>
    <DescriptionsItem label="Negotiated Amount">$80.00</DescriptionsItem>
    <DescriptionsItem label="Discount">$20.00</DescriptionsItem>
    <DescriptionsItem label="Official Receipts">$60.00</DescriptionsItem>
    <DescriptionsItem label="Config Info">
      Data disk type: MongoDB
      <br />
      Database version: 3.4
      <br />
      Package: dds.mongo.mid
      <br />
      Storage space: 10 GB
      <br />
      Replication factor: 3
      <br />
      Region: East China 1
      <br />
    </DescriptionsItem>
  </Descriptions>
</ClientOnly>

::: details Show Code

```vue
<template>
  <Descriptions title="User Info" layout="vertical" bordered>
    <DescriptionsItem label="Product">Cloud Database</DescriptionsItem>
    <DescriptionsItem label="Billing Mode">Prepaid</DescriptionsItem>
    <DescriptionsItem label="Automatic Renewal">YES</DescriptionsItem>
    <DescriptionsItem label="Order time">2018-04-24 18:00:00</DescriptionsItem>
    <DescriptionsItem label="Usage Time" :span="2">2030-10-10 18:00:00</DescriptionsItem>
    <DescriptionsItem label="Status" :span="3">
      <Badge status="processing" ripple text="Running" />
    </DescriptionsItem>
    <DescriptionsItem label="Negotiated Amount">$80.00</DescriptionsItem>
    <DescriptionsItem label="Discount">$20.00</DescriptionsItem>
    <DescriptionsItem label="Official Receipts">$60.00</DescriptionsItem>
    <DescriptionsItem label="Config Info">
      Data disk type: MongoDB
      <br />
      Database version: 3.4
      <br />
      Package: dds.mongo.mid
      <br />
      Storage space: 10 GB
      <br />
      Replication factor: 3
      <br />
      Region: East China 1
      <br />
    </DescriptionsItem>
  </Descriptions>
</template>
```

:::

## 无冒号

*使用 `colon` 属性关闭标签后的冒号*

<br/>

<ClientOnly>
  <Descriptions title="User Info" :colon="false">
    <DescriptionsItem label="UserName">Zhou Maomao</DescriptionsItem>
    <DescriptionsItem label="Telephone">1810000000</DescriptionsItem>
    <DescriptionsItem label="Live">Hangzhou, Zhejiang</DescriptionsItem>
  </Descriptions>
</ClientOnly>

:::: details Show Code

```vue
<template>
  <Descriptions title="User Info" :colon="false">
    <DescriptionsItem label="UserName">Zhou Maomao</DescriptionsItem>
    <DescriptionsItem label="Telephone">1810000000</DescriptionsItem>
    <DescriptionsItem label="Live">Hangzhou, Zhejiang</DescriptionsItem>
  </Descriptions>
</template>
```

::::

## 标签对齐

<ClientOnly>
  <Flex vertical gap="middle">
    <Radio :options="labelAlignOptions" v-model:value="labelAlign" button button-style="solid" />
    <Descriptions title="User Info" bordered :labelAlign="labelAlign">
      <DescriptionsItem label="UserName">Zhou Maomao</DescriptionsItem>
      <DescriptionsItem label="Telephone">1810000000</DescriptionsItem>
      <DescriptionsItem label="Live">Hangzhou, Zhejiang</DescriptionsItem>
    </Descriptions>
  </Flex>
</ClientOnly>

:::: details Show Code

```vue
<script setup lang="ts">
import { ref } from 'vue'
const labelAlign = ref('left')
const labelAlignOptions = [
  {
    label: 'left',
    value: 'left'
  },
  {
    label: 'right',
    value: 'right'
  },
  {
    label: 'center',
    value: 'center'
  }
]
</script>
<template>
  <Flex vertical gap="middle">
    <Radio :options="labelAlignOptions" v-model:value="labelAlign" button button-style="solid" />
    <Descriptions title="User Info" bordered :labelAlign="labelAlign">
      <DescriptionsItem label="UserName">Zhou Maomao</DescriptionsItem>
      <DescriptionsItem label="Telephone">1810000000</DescriptionsItem>
      <DescriptionsItem label="Live">Hangzhou, Zhejiang</DescriptionsItem>
    </Descriptions>
  </Flex>
</template>
```

::::

## 自定义类名

<ClientOnly>
  <Descriptions
    bordered
    title="Custom Class"
    labelClass="descriptions-demo-label"
    contentClass="descriptions-demo-content"
  >
    <DescriptionsItem label="Product">Cloud Database</DescriptionsItem>
    <DescriptionsItem label="Billing">Prepaid</DescriptionsItem>
    <DescriptionsItem label="Time">18:00:00</DescriptionsItem>
  </Descriptions>
</ClientOnly>

:::: details Show Code

```vue
<template>
  <Descriptions
    bordered
    title="Custom Class"
    labelClass="descriptions-demo-label"
    contentClass="descriptions-demo-content"
  >
    <DescriptionsItem label="Product">Cloud Database</DescriptionsItem>
    <DescriptionsItem label="Billing">Prepaid</DescriptionsItem>
    <DescriptionsItem label="Time">18:00:00</DescriptionsItem>
  </Descriptions>
</template>

<style lang="less">
/**
 * 自定义类名用例的演示样式。
 * 类名落在 Descriptions 内部元素上，而 `:deep()` 编译出的选择器与组件自身样式同优先级（均为 0,2,0），
 * 胜负取决于样式注入顺序（HMR 下不稳定，实测会被组件样式覆盖）。
 * 故改用非 scoped + 更高优先级选择器，保证演示效果稳定生效。
 */
.descriptions-wrap .descriptions-item-label.descriptions-demo-label {
  color: #1677ff;
  font-weight: 600;
}

.descriptions-wrap .descriptions-item-content.descriptions-demo-content {
  color: #52c41a;
}
</style>
```

::::

## 自定义头部

*使用 `header` 插槽自定义整个头部区域，替代 `title` 与 `extra`*

<br/>

<ClientOnly>
  <Descriptions>
    <template #header>
      <Flex gap="middle" align="center" justify="space-between" style="width: 100%">
        <span style="font-weight: 600; font-size: 16px">Custom Header</span>
        <Button type="primary">Edit</Button>
      </Flex>
    </template>
    <DescriptionsItem label="Product">Cloud Database</DescriptionsItem>
    <DescriptionsItem label="Billing">Prepaid</DescriptionsItem>
    <DescriptionsItem label="Time">18:00:00</DescriptionsItem>
  </Descriptions>
</ClientOnly>

:::: details Show Code

```vue
<template>
  <Descriptions>
    <template #header>
      <Flex gap="middle" align="center" justify="space-between" style="width: 100%">
        <span style="font-weight: 600; font-size: 16px">Custom Header</span>
        <Button type="primary">Edit</Button>
      </Flex>
    </template>
    <DescriptionsItem label="Product">Cloud Database</DescriptionsItem>
    <DescriptionsItem label="Billing">Prepaid</DescriptionsItem>
    <DescriptionsItem label="Time">18:00:00</DescriptionsItem>
  </Descriptions>
</template>
```

::::

## 自定义内容 & 标签样式

<ClientOnly>
  <Flex vertical gap="middle">
    <Descriptions
      bordered
      title="Custom Style"
      :labelStyle="{ fontWeight: 800, color: '#faad14' }"
      :contentStyle="{ fontWeight: 600, color: '#1677ff' }"
    >
      <template #extra>
        <Button type="primary">Edit</Button>
      </template>
      <DescriptionsItem label="Product">Cloud Database</DescriptionsItem>
      <DescriptionsItem label="Billing">Prepaid</DescriptionsItem>
      <DescriptionsItem label="Time">18:00:00</DescriptionsItem>
      <DescriptionsItem label="Amount" :labelStyle="{ color: '#52c41a' }" :contentStyle="{ color: '#ff4d4f' }"
        >$80.00</DescriptionsItem
      >
      <DescriptionsItem label="Discount">$20.00</DescriptionsItem>
      <DescriptionsItem label="Official">$60.00</DescriptionsItem>
      <DescriptionsItem label="Config Info">
        Data disk type: MongoDB
        <br />
        Database version: 3.4
        <br />
        Package: dds.mongo.mid
        <br />
        Storage space: 10 GB
        <br />
        Replication factor: 3
        <br />
        Region: East China 1
        <br />
      </DescriptionsItem>
    </Descriptions>
    <Descriptions
      title="Custom Style"
      :labelStyle="{ fontWeight: 800, color: '#faad14' }"
      :contentStyle="{ fontWeight: 600, color: '#1677ff' }"
    >
      <template #extra>
        <Button type="primary">Edit</Button>
      </template>
      <DescriptionsItem label="Product">Cloud Database</DescriptionsItem>
      <DescriptionsItem label="Billing">Prepaid</DescriptionsItem>
      <DescriptionsItem label="Time">18:00:00</DescriptionsItem>
      <DescriptionsItem label="Amount" :labelStyle="{ color: '#52c41a' }" :contentStyle="{ color: '#ff4d4f' }"
        >$80.00</DescriptionsItem
      >
      <DescriptionsItem label="Discount">$20.00</DescriptionsItem>
      <DescriptionsItem label="Official">$60.00</DescriptionsItem>
    </Descriptions>
  </Flex>
</ClientOnly>

::: details Show Code

```vue
<template>
  <Flex vertical gap="middle">
    <Descriptions
      bordered
      title="Custom Style"
      :labelStyle="{ fontWeight: 800, color: '#faad14' }"
      :contentStyle="{ fontWeight: 600, color: '#1677ff' }"
    >
      <template #extra>
        <Button type="primary">Edit</Button>
      </template>
      <DescriptionsItem label="Product">Cloud Database</DescriptionsItem>
      <DescriptionsItem label="Billing">Prepaid</DescriptionsItem>
      <DescriptionsItem label="Time">18:00:00</DescriptionsItem>
      <DescriptionsItem label="Amount" :labelStyle="{ color: '#52c41a' }" :contentStyle="{ color: '#ff4d4f' }"
        >$80.00</DescriptionsItem
      >
      <DescriptionsItem label="Discount">$20.00</DescriptionsItem>
      <DescriptionsItem label="Official">$60.00</DescriptionsItem>
      <DescriptionsItem label="Config Info">
        Data disk type: MongoDB
        <br />
        Database version: 3.4
        <br />
        Package: dds.mongo.mid
        <br />
        Storage space: 10 GB
        <br />
        Replication factor: 3
        <br />
        Region: East China 1
        <br />
      </DescriptionsItem>
    </Descriptions>
    <Descriptions
      title="Custom Style"
      :labelStyle="{ fontWeight: 800, color: '#faad14' }"
      :contentStyle="{ fontWeight: 600, color: '#1677ff' }"
    >
      <template #extra>
        <Button type="primary">Edit</Button>
      </template>
      <DescriptionsItem label="Product">Cloud Database</DescriptionsItem>
      <DescriptionsItem label="Billing">Prepaid</DescriptionsItem>
      <DescriptionsItem label="Time">18:00:00</DescriptionsItem>
      <DescriptionsItem label="Amount" :labelStyle="{ color: '#52c41a' }" :contentStyle="{ color: '#ff4d4f' }"
        >$80.00</DescriptionsItem
      >
      <DescriptionsItem label="Discount">$20.00</DescriptionsItem>
      <DescriptionsItem label="Official">$60.00</DescriptionsItem>
    </Descriptions>
  </Flex>
</template>
```

:::

## 描述列表配置器

<Flex vertical>
  <Row :gutter="[24, 12]">
    <Col :span="6">
      <Flex gap="small" vertical>
        title:
        <Input v-model:value="state.title" placeholder="title" />
      </Flex>
    </Col>
    <Col :span="6">
      <Flex gap="small" vertical>
        extra:
        <Input v-model:value="state.extra" placeholder="extra" />
      </Flex>
    </Col>
    <Col :span="6">
      <Space gap="small" vertical>
        bordered:
        <Switch v-model:value="state.bordered" />
      </Space>
    </Col>
    <Col :span="6">
      <Space gap="small" vertical>
        layout:
        <Switch v-model:value="state.layout" checked-value="vertical" un-checked-value="horizontal" />
      </Space>
    </Col>
    <Col :span="6">
      <Flex gap="small" vertical>
        size:
        <Select :options="options" v-model:value="state.size" />
      </Flex>
    </Col>
    <Col :span="6">
      <Space gap="small" vertical>
        colon:
        <Switch v-model:value="state.colon" />
      </Space>
    </Col>
    <Col :span="24">
      <Flex gap="small" vertical>
        <Flex gap="middle" align="center" wrap="wrap">
          column:
          <Segmented v-model:value="state.columnMode" :options="columnModeOptions" />
          <InputNumber
            v-if="state.columnMode === 'number'"
            v-model:value="state.columnValue"
            :min="1"
            :max="9"
          />
          <span class="descriptions-column-tip">{{ activeColumnTip }}</span>
        </Flex>
        <Flex v-if="state.columnMode === 'responsive'" gap="middle" align="flex-start" wrap="wrap">
          <Flex
            v-for="bp in breakpoints"
            :key="bp.key"
            gap="small"
            vertical
            align="center"
            class="descriptions-column-breakpoint"
          >
            <Tag size="small" :color="bp.key === currentBreakpoint ? 'processing' : undefined">
              {{ bp.key }}
            </Tag>
            <span class="descriptions-column-rule">{{ bp.rule }}</span>
            <InputNumber v-model:value="state.column[bp.key]" :min="1" :max="9" />
          </Flex>
        </Flex>
      </Flex>
    </Col>
    <Col :span="6">
      <Flex gap="small" vertical>
        labelAlign:
        <Select :options="labelAlignOptions" v-model:value="state.labelAlign" />
      </Flex>
    </Col>
    <Col :span="6">
      <Flex gap="small" vertical>
        labelStyle fontSize:
        <Input v-model:value="state.labelStyle.fontSize" placeholder="labelStyle fontSize" />
      </Flex>
    </Col>
    <Col :span="6">
      <Flex gap="small" vertical>
        labelStyle color:
        <ColorPicker v-model:value="state.labelStyle.color" />
      </Flex>
    </Col>
    <Col :span="6">
      <Flex gap="small" vertical>
        labelStyle fontWeight:
        <InputNumber
          v-model:value="state.labelStyle.fontWeight"
          :step="100"
          :min="100"
          :max="1000"
          placeholder="labelStyle fontWeight"
        />
      </Flex>
    </Col>
    <Col :span="6">
      <Flex gap="small" vertical>
        contentStyle fontSize:
        <Input v-model:value="state.contentStyle.fontSize" placeholder="contentStyle fontSize" />
      </Flex>
    </Col>
    <Col :span="6">
      <Flex gap="small" vertical>
        contentStyle color:
        <ColorPicker v-model:value="state.contentStyle.color" />
      </Flex>
    </Col>
    <Col :span="6">
      <Flex gap="small" vertical>
        contentStyle fontWeight:
        <InputNumber
          v-model:value="state.contentStyle.fontWeight"
          :step="100"
          :min="100"
          :max="1000"
          placeholder="contentStyle fontWeight"
        />
      </Flex>
    </Col>
  </Row>
  <Descriptions
    :title="state.title"
    :extra="state.extra"
    :bordered="state.bordered"
    :layout="state.layout"
    :size="state.size"
    :colon="state.colon"
    :column="columnConfig"
    :label-align="state.labelAlign"
    :label-style="state.labelStyle"
    :content-style="state.contentStyle"
  >
    <DescriptionsItem label="Product">Cloud Database</DescriptionsItem>
    <DescriptionsItem label="Billing">Prepaid</DescriptionsItem>
    <DescriptionsItem label="Time">18:00:00</DescriptionsItem>
    <DescriptionsItem label="Amount">$80.00</DescriptionsItem>
    <DescriptionsItem label="Discount">$20.00</DescriptionsItem>
    <DescriptionsItem label="Official">$60.00</DescriptionsItem>
    <DescriptionsItem label="Status" :span="1">
      <Badge status="processing" ripple text="Running" />
    </DescriptionsItem>
    <DescriptionsItem label="Usage Time" :span="2">2030-04-24 18:00:00</DescriptionsItem>
    <DescriptionsItem label="Address" :span="3"
      >No. 18, Wantang Road, Xihu District, Hangzhou, Zhejiang, China</DescriptionsItem
    >
  </Descriptions>
</Flex>

::: details Show Code

```vue
<script setup lang="ts">
import { ref, reactive, computed, onMounted } from 'vue'
import { useWindowSize } from '@vueuse/core'
const options = [
  {
    label: 'default',
    value: 'default'
  },
  {
    label: 'middle',
    value: 'middle'
  },
  {
    label: 'small',
    value: 'small'
  }
]
const labelAlignOptions = [
  {
    label: 'left',
    value: 'left'
  },
  {
    label: 'right',
    value: 'right'
  },
  {
    label: 'center',
    value: 'center'
  }
]
// column 断点：与组件 Responsive 断点一一对应，rule 直观标注生效区间，min / max 用于判断当前视口命中项
const breakpoints = [
  { key: 'xs', rule: '<576px', min: 0, max: 575 },
  { key: 'sm', rule: '≥576px', min: 576, max: 767 },
  { key: 'md', rule: '≥768px', min: 768, max: 991 },
  { key: 'lg', rule: '≥992px', min: 992, max: 1199 },
  { key: 'xl', rule: '≥1200px', min: 1200, max: 1599 },
  { key: 'xxl', rule: '≥1600px', min: 1600, max: 1999 },
  { key: 'xxxl', rule: '≥2000px', min: 2000, max: Infinity }
]
const columnModeOptions = [
  { label: '统一列数', value: 'number' },
  { label: '响应式断点', value: 'responsive' }
]
const { width } = useWindowSize()
// 未挂载前不渲染依赖视口的反馈，避免服务端与客户端首屏输出不一致
const isMounted = ref(false)
onMounted(() => {
  isMounted.value = true
})
// 当前视口命中的断点：判定口径与组件一致（从大到小取第一个命中项）
const currentBreakpoint = computed(() => {
  if (!isMounted.value) {
    return undefined
  }
  return breakpoints.find((bp) => width.value >= bp.min && width.value <= bp.max)?.key
})
const state = reactive({
  title: 'User Info',
  extra: 'extra',
  bordered: false,
  layout: 'horizontal',
  size: 'default',
  colon: true,
  columnMode: 'number',
  columnValue: 3,
  column: {
    xs: 1,
    sm: 2,
    md: 3,
    lg: 3,
    xl: 3,
    xxl: 3,
    xxxl: 3
  },
  labelAlign: 'left',
  labelStyle: {
    fontSize: '14px',
    color: '#FF6900',
    fontWeight: 600
  },
  contentStyle: {
    fontSize: '14px',
    color: '#1677FF',
    fontWeight: 400
  }
})
// 配置器最终传给组件的 column：统一列数传数值，响应式断点传对象
const columnConfig = computed(() => (state.columnMode === 'number' ? state.columnValue : state.column))
// 实时反馈当前实际生效的列数，帮助理解断点规则
const activeColumnTip = computed(() => {
  if (state.columnMode === 'number') {
    return `所有视口统一为 ${state.columnValue} 列`
  }
  const key = currentBreakpoint.value
  if (!key) {
    return '正在检测当前视口…'
  }
  const rule = breakpoints.find((bp) => bp.key === key)?.rule
  return `当前视口 ${width.value}px，命中 ${key}（${rule}），实际 ${state.column[key]} 列`
})
</script>
<template>
  <Flex vertical>
    <Row :gutter="[24, 12]">
      <Col :span="6">
        <Flex gap="small" vertical>
          title:
          <Input v-model:value="state.title" placeholder="title" />
        </Flex>
      </Col>
      <Col :span="6">
        <Flex gap="small" vertical>
          extra:
          <Input v-model:value="state.extra" placeholder="extra" />
        </Flex>
      </Col>
      <Col :span="6">
        <Space gap="small" vertical>
          bordered:
          <Switch v-model:value="state.bordered" />
        </Space>
      </Col>
      <Col :span="6">
        <Space gap="small" vertical>
          layout:
          <Switch v-model:value="state.layout" checked-value="vertical" un-checked-value="horizontal" />
        </Space>
      </Col>
      <Col :span="6">
        <Flex gap="small" vertical>
          size:
          <Select :options="options" v-model:value="state.size" />
        </Flex>
      </Col>
      <Col :span="6">
        <Space gap="small" vertical>
          colon:
          <Switch v-model:value="state.colon" />
        </Space>
      </Col>
      <Col :span="24">
        <Flex gap="small" vertical>
          <Flex gap="middle" align="center" wrap="wrap">
            column:
            <Segmented v-model:value="state.columnMode" :options="columnModeOptions" />
            <InputNumber
              v-if="state.columnMode === 'number'"
              v-model:value="state.columnValue"
              :min="1"
              :max="9"
            />
            <span class="descriptions-column-tip">{{ activeColumnTip }}</span>
          </Flex>
          <Flex v-if="state.columnMode === 'responsive'" gap="middle" align="flex-start" wrap="wrap">
            <Flex
              v-for="bp in breakpoints"
              :key="bp.key"
              gap="small"
              vertical
              align="center"
              class="descriptions-column-breakpoint"
            >
              <Tag size="small" :color="bp.key === currentBreakpoint ? 'processing' : undefined">
                {{ bp.key }}
              </Tag>
              <span class="descriptions-column-rule">{{ bp.rule }}</span>
              <InputNumber v-model:value="state.column[bp.key]" :min="1" :max="9" />
            </Flex>
          </Flex>
        </Flex>
      </Col>
      <Col :span="6">
        <Flex gap="small" vertical>
          labelAlign:
          <Select :options="labelAlignOptions" v-model:value="state.labelAlign" />
        </Flex>
      </Col>
      <Col :span="6">
        <Flex gap="small" vertical>
          labelStyle fontSize:
          <Input v-model:value="state.labelStyle.fontSize" placeholder="labelStyle fontSize" />
        </Flex>
      </Col>
      <Col :span="6">
        <Flex gap="small" vertical>
          labelStyle color:
          <ColorPicker v-model:value="state.labelStyle.color" />
        </Flex>
      </Col>
      <Col :span="6">
        <Flex gap="small" vertical>
          labelStyle fontWeight:
          <InputNumber
            v-model:value="state.labelStyle.fontWeight"
            :step="100"
            :min="100"
            :max="1000"
            placeholder="labelStyle fontWeight"
          />
        </Flex>
      </Col>
      <Col :span="6">
        <Flex gap="small" vertical>
          contentStyle fontSize:
          <Input v-model:value="state.contentStyle.fontSize" placeholder="contentStyle fontSize" />
        </Flex>
      </Col>
      <Col :span="6">
        <Flex gap="small" vertical>
          contentStyle color:
          <ColorPicker v-model:value="state.contentStyle.color" />
        </Flex>
      </Col>
      <Col :span="6">
        <Flex gap="small" vertical>
          contentStyle fontWeight:
          <InputNumber
            v-model:value="state.contentStyle.fontWeight"
            :step="100"
            :min="100"
            :max="1000"
            placeholder="contentStyle fontWeight"
          />
        </Flex>
      </Col>
    </Row>
    <Descriptions
      :title="state.title"
      :extra="state.extra"
      :bordered="state.bordered"
      :layout="state.layout"
      :size="state.size"
      :colon="state.colon"
      :column="columnConfig"
      :label-align="state.labelAlign"
      :label-style="state.labelStyle"
      :content-style="state.contentStyle"
    >
      <DescriptionsItem label="Product">Cloud Database</DescriptionsItem>
      <DescriptionsItem label="Billing">Prepaid</DescriptionsItem>
      <DescriptionsItem label="Time">18:00:00</DescriptionsItem>
      <DescriptionsItem label="Amount">$80.00</DescriptionsItem>
      <DescriptionsItem label="Discount">$20.00</DescriptionsItem>
      <DescriptionsItem label="Official">$60.00</DescriptionsItem>
      <DescriptionsItem label="Status" :span="1">
        <Badge status="processing" ripple text="Running" />
      </DescriptionsItem>
      <DescriptionsItem label="Usage Time" :span="2">2030-04-24 18:00:00</DescriptionsItem>
      <DescriptionsItem label="Address" :span="3"
        >No. 18, Wantang Road, Xihu District, Hangzhou, Zhejiang, China</DescriptionsItem
      >
    </Descriptions>
  </Flex>
</template>
<style lang="less">
.descriptions-column-breakpoint {
  width: 90px;
}

.descriptions-column-rule,
.descriptions-column-tip {
  font-size: 12px;
  color: rgba(0, 0, 0, 0.45);
}
</style>
```

:::

<style lang="less">
/**
 * 自定义类名用例的预览样式。
 * 与演示页保持一致：类名落在 Descriptions 内部元素上，需非 scoped + 更高优先级选择器才能稳定覆盖组件样式。
 */
.descriptions-wrap .descriptions-item-label.descriptions-demo-label {
  color: #1677ff;
  font-weight: 600;
}

.descriptions-wrap .descriptions-item-content.descriptions-demo-content {
  color: #52c41a;
}

.descriptions-column-breakpoint {
  width: 90px;
}

.descriptions-column-rule,
.descriptions-column-tip {
  font-size: 12px;
  color: rgba(0, 0, 0, 0.45);
}
</style>

## APIs

### Descriptions

参数 | 说明 | 类型 | 默认值
:-- | :-- | :-- | :--
title | 描述列表的标题，显示在最顶部 | string &#124; VNode | undefined
extra | 描述列表的操作区域，显示在右上方 | string &#124; VNode | undefined
bordered | 是否展示边框 | boolean | false
layout | 描述列表布局方式 | 'horizontal' &#124; 'vertical' | 'horizontal'
size | 设置列表的大小 | 'default' &#124; 'middle' &#124; 'small' | 'default'
colon | 是否显示标签后的冒号（边框模式不显示冒号） | boolean | true
column | 一行的 `DescriptionsItem` 数量，可以写成数值或支持响应式的对象写法 `{ xs: 8, sm: 16, md: 24 }` | number &#124; [DescriptionsResponsive](#responsive-type) | {xs: 1, sm: 2, md\: 3, lg: 3, xl: 3, xxl: 3, xxxl: 3}
labelAlign | 标签对齐方式 | 'left' &#124; 'right' &#124; 'center' | 'left'
labelStyle | 自定义标签样式，优先级低于 `DescriptionsItem`  的 `labelStyle` | [CSSProperties](https://cn.vuejs.org/api/utility-types.html#cssproperties) | undefined
contentStyle | 自定义内容样式，优先级低于 `DescriptionsItem`  的 `contentStyle` | [CSSProperties](https://cn.vuejs.org/api/utility-types.html#cssproperties) | undefined
labelClass | 标签自定义类名，与 `DescriptionsItem` 的 `labelClass` 叠加 | string | undefined
contentClass | 内容自定义类名，与 `DescriptionsItem` 的 `contentClass` 叠加 | string | undefined

### Responsive Type

名称 | 说明 | 类型 | 默认值
:-- | :-- | :-- | :--
xs | `<576px` 响应式栅格 | number | undefined
sm | `≥576px` 响应式栅格 | number | undefined
md | `≥768px` 响应式栅格 | number | undefined
lg | `≥992px` 响应式栅格 | number | undefined
xl | `≥1200px` 响应式栅格 | number | undefined
xxl | `≥1600px` 响应式栅格 | number | undefined
xxxl | `≥2000px` 响应式栅格 | number | undefined

### DescriptionsItem

参数 | 说明 | 类型 | 默认值
:-- | :-- | :-- | :--
label | 内容的描述标签 | string &#124; number &#124; VNode | undefined
span | 包含列的数量，未设置时按 `1` 处理；**最后一行的最后一项未设置 `span`（或显式 `span` 超出本行剩余列数）时收缩为剩余列数，即补满该行**，显式 `span` 未超出本行剩余列数时按显式值渲染 | number | 1
labelStyle | 自定义标签样式，优先级高于 `Descriptions` 的 `labelStyle` | [CSSProperties](https://cn.vuejs.org/api/utility-types.html#cssproperties) | undefined
contentStyle | 自定义内容样式，优先级高于 `Descriptions` 的 `contentStyle` | [CSSProperties](https://cn.vuejs.org/api/utility-types.html#cssproperties) | undefined
labelClass | 标签自定义类名，与 `Descriptions` 的 `labelClass` 叠加 | string | undefined
contentClass | 内容自定义类名，与 `Descriptions` 的 `contentClass` 叠加 | string | undefined

> 同一行 `span` 之和超过 `column` 时，超出本行剩余列数的项会收缩为剩余列数（开发环境会给出提示）。

## Slots

### Descriptions Slots

名称 | 说明 | 类型
:-- | :-- | :--
default | 自定义描述列表内容 | v-slot:default
header | 自定义整个头部区域，存在时替代 `title` 与 `extra` | v-slot:header
title | 自定义描述列表的标题 | v-slot:title
extra | 自定义描述列表的操作区域 | v-slot:extra

### DescriptionsItem Slots

名称 | 说明 | 类型
:-- | :-- | :--
label | 自定义描述标签 | v-slot:label
default | 自定义内容 | v-slot:default
