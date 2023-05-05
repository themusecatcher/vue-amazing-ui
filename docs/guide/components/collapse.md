# 折叠面板 Collapse

<br/>

*可以折叠/展开的内容区域*

## 何时使用

- 对复杂区域进行分组和隐藏，保持页面的整洁

<script setup lang="ts">
import { ref, watchEffect } from 'vue'

const collapseData = ref([
  {
    key: '1',
    header: 'This is panel header 1',
    text: 'A dog is a type of domesticated animal.Known for its loyalty and faithfulness,it can be found as a welcome guest in many households across the world.'
  },
  {
    key: '2',
    header: 'This is panel header 2',
    text: `  A dog is a type of domesticated animal.Known for its loyalty and faithfulness,it can be found as a welcome guest in many households across the world.
  A dog is a type of domesticated animal.Known for its loyalty and faithfulness,it can be found as a welcome guest in many households across the world.`
  },
  {
    key: '3',
    header: 'This is panel header 3',
    text: 'A dog is a type of domesticated animal.Known for its loyalty and faithfulness,it can be found as a welcome guest in many households across the world.'
  }
])
const activeKey = ref(['1'])
watchEffect(() => {
  console.log('activeKey:', activeKey.value)
})
const key = ref('1')
watchEffect(() => {
  console.log('key:', key.value)
})
function onChange (key: any) {
  console.log('change:', key)
}
</script>

## 基本使用

#### activeKey 传入 number[] | string[]，所有面板可同时展开

<br/>
<Collapse
  :collapseData="collapseData"
  v-model:activeKey="activeKey"
  @change="onChange" />

<details>
<summary>查看代码</summary>

```vue
<script setup lang="ts">
import { ref, watchEffect } from 'vue'

const collapseData = ref([
  {
    key: '1',
    header: 'This is panel header 1',
    text: 'A dog is a type of domesticated animal.Known for its loyalty and faithfulness,it can be found as a welcome guest in many households across the world.'
  },
  {
    key: '2',
    header: 'This is panel header 2',
    text: `  A dog is a type of domesticated animal.Known for its loyalty and faithfulness,it can be found as a welcome guest in many households across the world.
  A dog is a type of domesticated animal.Known for its loyalty and faithfulness,it can be found as a welcome guest in many households across the world.`
  },
  {
    key: '3',
    header: 'This is panel header 3',
    text: 'A dog is a type of domesticated animal.Known for its loyalty and faithfulness,it can be found as a welcome guest in many households across the world.'
  }
])
const activeKey = ref(['1'])
watchEffect(() => {
  console.log('activeKey:', activeKey.value)
})
function onChange (key: any) {
  console.log('change:', key)
}
</script>
<template>
  <Collapse
    :collapseData="collapseData"
    v-model:activeKey="activeKey"
    @change="onChange" />
</template>
```

</details>

## '手风琴'

#### 只允许单个内容区域展开，只需 activeKey 传入 number | string 即可

<br/>
<Collapse
  :collapseData="collapseData"
  v-model:activeKey="key"
  @change="onChange" />

<details>
<summary>查看代码</summary>

```vue
<script setup lang="ts">
import { ref, watchEffect } from 'vue'

const collapseData = ref([
  {
    key: '1',
    header: 'This is panel header 1',
    text: 'A dog is a type of domesticated animal.Known for its loyalty and faithfulness,it can be found as a welcome guest in many households across the world.'
  },
  {
    key: '2',
    header: 'This is panel header 2',
    text: `  A dog is a type of domesticated animal.Known for its loyalty and faithfulness,it can be found as a welcome guest in many households across the world.
  A dog is a type of domesticated animal.Known for its loyalty and faithfulness,it can be found as a welcome guest in many households across the world.`
  },
  {
    key: '3',
    header: 'This is panel header 3',
    text: 'A dog is a type of domesticated animal.Known for its loyalty and faithfulness,it can be found as a welcome guest in many households across the world.'
  }
])
const key = ref('1')
watchEffect(() => {
  console.log('key:', key.value)
})
function onChange (key: any) {
  console.log('change:', key)
}
</script>
<template>
  <Collapse
    :collapseData="collapseData"
    v-model:activeKey="key"
    @change="onChange" />
</template>
```

</details>

## 可复制面板内容

<Collapse
  lang="template"
  copyable
  :collapseData="collapseData"
  v-model:activeKey="activeKey"
  @change="onChange" />

<details>
<summary>查看代码</summary>

```vue
<script setup lang="ts">
import { ref, watchEffect } from 'vue'

const collapseData = ref([
  {
    key: '1',
    header: 'This is panel header 1',
    text: 'A dog is a type of domesticated animal.Known for its loyalty and faithfulness,it can be found as a welcome guest in many households across the world.'
  },
  {
    key: '2',
    header: 'This is panel header 2',
    text: `  A dog is a type of domesticated animal.Known for its loyalty and faithfulness,it can be found as a welcome guest in many households across the world.
  A dog is a type of domesticated animal.Known for its loyalty and faithfulness,it can be found as a welcome guest in many households across the world.`
  },
  {
    key: '3',
    header: 'This is panel header 3',
    text: 'A dog is a type of domesticated animal.Known for its loyalty and faithfulness,it can be found as a welcome guest in many households across the world.'
  }
])
const activeKey = ref(['1'])
watchEffect(() => {
  console.log('activeKey:', activeKey.value)
})
function onChange (key: any) {
  console.log('change:', key)
}
</script>
<template>
  <Collapse
    lang="template"
    copyable
    :collapseData="collapseData"
    v-model:activeKey="activeKey"
    @change="onChange" />
</template>
```

</details>

## 使用插槽 slot 自定义 header、lang、text 内容

<Collapse
  :collapseData="collapseData"
  v-model:activeKey="activeKey"
  @change="onChange">
  <template #header="{ header, key }">
    <span v-if="key==='1'" style="color: burlywood;">burlywood color {{ header }} (key = {{ key }})</span>
  </template>
  <template #lang>typescript</template>
  <template #text="{ text, key }">
    <span v-if="key==='1'" style="color: burlywood;">burlywood color {{ text }} (key = {{ key }})</span>
  </template>
</Collapse>

<details>
<summary>查看代码</summary>

```vue
<script setup lang="ts">
import { ref, watchEffect } from 'vue'

const collapseData = ref([
  {
    key: '1',
    header: 'This is panel header 1',
    text: 'A dog is a type of domesticated animal.Known for its loyalty and faithfulness,it can be found as a welcome guest in many households across the world.'
  },
  {
    key: '2',
    header: 'This is panel header 2',
    text: `  A dog is a type of domesticated animal.Known for its loyalty and faithfulness,it can be found as a welcome guest in many households across the world.
  A dog is a type of domesticated animal.Known for its loyalty and faithfulness,it can be found as a welcome guest in many households across the world.`
  },
  {
    key: '3',
    header: 'This is panel header 3',
    text: 'A dog is a type of domesticated animal.Known for its loyalty and faithfulness,it can be found as a welcome guest in many households across the world.'
  }
])
const activeKey = ref(['1'])
watchEffect(() => {
  console.log('activeKey:', activeKey.value)
})
function onChange (key: any) {
  console.log('change:', key)
}
</script>
<template>
  <Collapse
    :collapseData="collapseData"
    v-model:activeKey="activeKey"
    @change="onChange">
    <template #header="{ header, key }">
      <span v-if="key==='1'" style="color: burlywood;">burlywood color {{ header }} (key = {{ key }})</span>
    </template>
    <template #lang>typescript</template>
    <template #text="{ text, key }">
      <span v-if="key==='1'" style="color: burlywood;">burlywood color {{ text }} (key = {{ key }})</span>
    </template>
  </Collapse>
</template>
```

</details>

## 隐藏箭头图标

<Collapse
  :show-arrow="false"
  :collapseData="collapseData"
  v-model:activeKey="activeKey"
  @change="onChange"/>

<details>
<summary>查看代码</summary>

```vue
<script setup lang="ts">
import { ref, watchEffect } from 'vue'

const collapseData = ref([
  {
    key: '1',
    header: 'This is panel header 1',
    text: 'A dog is a type of domesticated animal.Known for its loyalty and faithfulness,it can be found as a welcome guest in many households across the world.'
  },
  {
    key: '2',
    header: 'This is panel header 2',
    text: `  A dog is a type of domesticated animal.Known for its loyalty and faithfulness,it can be found as a welcome guest in many households across the world.
  A dog is a type of domesticated animal.Known for its loyalty and faithfulness,it can be found as a welcome guest in many households across the world.`
  },
  {
    key: '3',
    header: 'This is panel header 3',
    text: 'A dog is a type of domesticated animal.Known for its loyalty and faithfulness,it can be found as a welcome guest in many households across the world.'
  }
])
const activeKey = ref(['1'])
watchEffect(() => {
  console.log('activeKey:', activeKey.value)
})
function onChange (key: any) {
  console.log('change:', key)
}
</script>
<template>
  <Collapse
    :show-arrow="false"
    :collapseData="collapseData"
    v-model:activeKey="activeKey"
    @change="onChange"/>
</template>
```

</details>
