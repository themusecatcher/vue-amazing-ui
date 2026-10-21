<script setup lang="ts">
import { computed, h, ref, watch, watchEffect } from 'vue'
import type { Checkbox, CheckboxGroupOption } from 'vue-amazing-ui'
// 基本使用
const checked = ref<boolean>(false)
const onChange = (value: boolean | (string | number)[]) => {
  console.log('change', value)
}
// 受控：选中与禁用均由外部状态驱动
const controlled = ref<boolean>(false)
const controlledDisabled = ref<boolean>(false)
const controlledLabel = computed(
  () => `${controlled.value ? 'Checked' : 'Unchecked'}-${controlledDisabled.value ? 'Disabled' : 'Enabled'}`
)
const toggleControlled = () => {
  controlled.value = !controlled.value
}
const toggleControlledDisabled = () => {
  controlledDisabled.value = !controlledDisabled.value
}
// 全选：全选框的三态由子项已选数量推导
const plainOptions: string[] = ['Apple', 'Pear', 'Orange']
const checkedList = ref<string[]>(['Apple', 'Orange'])
const checkAll = ref<boolean>(false)
const indeterminate = ref<boolean>(false)
watch(
  checkedList,
  (value) => {
    indeterminate.value = value.length > 0 && value.length < plainOptions.length
    checkAll.value = value.length === plainOptions.length
  },
  { immediate: true }
)
const onCheckAllChange = (value: boolean) => {
  checkedList.value = value ? [...plainOptions] : []
}
// 复选框组
const groupOptions: CheckboxGroupOption[] = [
  { label: 'Apple', value: 'Apple' },
  { label: 'Pear', value: 'Pear' },
  { label: 'Orange', value: 'Orange' }
]
const groupPlainValue = ref<string[]>([])
const groupSelectedValue = ref<string[]>(['Apple'])
const groupObjectValue = ref<string[]>(['Pear'])
// 与栅格配合
const gridItems = ['A', 'B', 'C', 'D', 'E']
const gridValue = ref<string[]>([])
// 选项列表 / 垂直排列 / 禁用选项 / 自定义选项名：城市选项，长短混排便于观察换行与间距
const options = ref<CheckboxGroupOption[]>([
  { label: '拜占庭', value: 1 },
  { label: '君士坦丁堡', value: 2 },
  { label: '伊斯坦布尔', value: 3 },
  { label: '布宜诺斯艾利斯', value: 4 }
])
const optionsDisabled = ref<CheckboxGroupOption[]>([
  { label: '拜占庭', value: 1 },
  { label: '君士坦丁堡', value: 2, disabled: true },
  { label: '伊斯坦布尔', value: 3 },
  { label: '布宜诺斯艾利斯', value: 4 }
])
const groupOptionsDisabled: CheckboxGroupOption[] = [
  { label: 'Apple', value: 'Apple' },
  { label: 'Pear', value: 'Pear', disabled: true },
  { label: 'Orange', value: 'Orange' }
]
const listValue = ref<(string | number)[]>([2])
const verticalValue = ref<(string | number)[]>([1, 2])
const verticalGroupValue = ref<(string | number)[]>([1, 2])
// 禁用
const disabled = ref<boolean>(true)
const toggleDisabled = () => {
  disabled.value = !disabled.value
}
const disabledChecked = ref<boolean>(true)
const disabledUnchecked = ref<boolean>(false)
const disabledListValue = ref<(string | number)[]>([2])
const disabledGroupValue = ref<string[]>(['Apple'])
// 禁用选项
const optionDisabledListValue = ref<(string | number)[]>([1])
const optionDisabledGroupValue = ref<string[]>(['Apple'])
// 自定义选项名
const customSlotValue = ref<(string | number)[]>([2])
const customSlotGroupValue = ref<(string | number)[]>([1])
// 非字符串选项名：label 直接传入 VNode
const vnodeOptions: CheckboxGroupOption[] = [
  { label: '拜占庭', value: 1 },
  { label: h('span', { style: 'color: #ff6900' }, '君士坦丁堡'), value: 2 },
  { label: '伊斯坦布尔', value: 3 }
]
const vnodeValue = ref<(string | number)[]>([2])
const vnodeGroupValue = ref<(string | number)[]>([2])
// 自定义间距 / 复选框组间距
const horizontalGap = ref(16)
const verticalGap = ref(8)
const gapValue = ref<(string | number)[]>([2])
const groupGap = ref(16)
const groupVertical = ref<boolean>(true)
const groupGapValue = ref<(string | number)[]>([1, 2])
// 聚焦方法
const focusChecked = ref<boolean>(false)
const focusFocused = ref<boolean>(false)
const focusCheckboxRef = ref<InstanceType<typeof Checkbox> | null>(null)
watchEffect(() => {
  console.log('checked', checked.value)
})
</script>
<template>
  <div>
    <h1>{{ $route.name }} {{ $route.meta.title }}</h1>
    <h2 class="mt30 mb10">基本使用</h2>
    <p class="mb10">独立用法：<code>v-model:checked</code> 双向绑定选中态；「受控」示例由外部状态驱动选中与禁用</p>
    <Flex vertical align="start">
      <Flex vertical gap="small" align="start">
        <span class="demo-label">基础</span>
        <Checkbox v-model:checked="checked" @change="onChange">Checkbox</Checkbox>
      </Flex>
      <Flex vertical gap="small" align="start">
        <span class="demo-label">受控</span>
        <Flex gap="small" align="center">
          <Checkbox v-model:checked="controlled" :disabled="controlledDisabled">{{ controlledLabel }}</Checkbox>
          <Button size="small" type="primary" @click="toggleControlled">{{ controlled ? 'Uncheck' : 'Check' }}</Button>
          <Button size="small" type="primary" @click="toggleControlledDisabled">
            {{ controlledDisabled ? 'Enable' : 'Disable' }}
          </Button>
        </Flex>
      </Flex>
    </Flex>
    <h2 class="mt30 mb10">全选</h2>
    <p class="mb10"><code>indeterminate</code> 用于表达「部分选中」：全选框的半选态由子项已选数量推导</p>
    <Flex vertical align="start">
      <Flex vertical gap="small" align="start">
        <span class="demo-label">全选</span>
        <Checkbox :indeterminate="indeterminate" v-model:checked="checkAll" @change="onCheckAllChange">
          Check all
        </Checkbox>
      </Flex>
      <Flex vertical gap="small" align="start">
        <span class="demo-label">子项</span>
        <CheckboxGroup v-model:value="checkedList" :options="plainOptions" />
      </Flex>
    </Flex>
    <h2 class="mt30 mb10">复选框组</h2>
    <p class="mb10"
      >选中值由 <code>CheckboxGroup</code> 统一维护，组内 <code>Checkbox</code> 用 <code>value</code> 标识自身</p
    >
    <Flex vertical align="start">
      <Flex vertical gap="small" align="start">
        <span class="demo-label">默认</span>
        <CheckboxGroup v-model:value="groupPlainValue" :options="plainOptions" name="checkboxGroup" />
      </Flex>
      <Flex vertical gap="small" align="start">
        <span class="demo-label">默认选中</span>
        <CheckboxGroup v-model:value="groupSelectedValue" :options="plainOptions" />
      </Flex>
      <Flex vertical gap="small" align="start">
        <span class="demo-label">对象选项</span>
        <CheckboxGroup v-model:value="groupObjectValue" :options="groupOptions" />
      </Flex>
    </Flex>
    <h2 class="mt30 mb10">与栅格配合</h2>
    <p class="mb10"><code>CheckboxGroup</code> 内嵌 <code>Checkbox</code> 并与栅格组合，可实现多列对齐布局</p>
    <Flex vertical align="start">
      <CheckboxGroup v-model:value="gridValue" style="width: 100%">
        <Row>
          <Col v-for="item in gridItems" :key="item" :span="8">
            <Checkbox :value="item">{{ item }}</Checkbox>
          </Col>
        </Row>
      </CheckboxGroup>
    </Flex>
    <h2 class="mt30 mb10">选项列表</h2>
    <p class="mb10">配置式写法：传入 <code>options</code> 数组即可渲染整组选项，选中值为数组</p>
    <Flex vertical align="start">
      <CheckboxGroup :options="options" v-model:value="listValue" @change="onChange" />
    </Flex>
    <h2 class="mt30 mb10">垂直排列</h2>
    <Flex vertical align="start">
      <Flex vertical gap="small" align="start">
        <span class="demo-label">配置式</span>
        <CheckboxGroup :options="options" v-model:value="verticalValue" vertical />
      </Flex>
      <Flex vertical gap="small" align="start">
        <span class="demo-label">组合式</span>
        <CheckboxGroup v-model:value="verticalGroupValue" vertical>
          <Checkbox v-for="item in options" :key="item.value" :value="item.value">{{ item.label }}</Checkbox>
        </CheckboxGroup>
      </Flex>
    </Flex>
    <h2 class="mt30 mb10">禁用</h2>
    <p class="mb10">开关演示禁用态：禁用后不可聚焦、不可切换，组的 <code>disabled</code> 会叠加到组内各项</p>
    <Flex vertical align="start">
      <Button type="primary" @click="toggleDisabled">Toggle disabled</Button>
      <Flex vertical gap="small" align="start">
        <span class="demo-label">复选框</span>
        <Flex gap="small" align="center">
          <Checkbox v-model:checked="disabledChecked" :disabled="disabled">Disabled</Checkbox>
          <Checkbox v-model:checked="disabledUnchecked" :disabled="disabled">Disabled</Checkbox>
        </Flex>
      </Flex>
      <Flex vertical gap="small" align="start">
        <span class="demo-label">配置式</span>
        <CheckboxGroup :options="options" v-model:value="disabledListValue" disabled />
      </Flex>
      <Flex vertical gap="small" align="start">
        <span class="demo-label">复选框组</span>
        <CheckboxGroup v-model:value="disabledGroupValue" :options="groupOptions" disabled />
      </Flex>
    </Flex>
    <h2 class="mt30 mb10">禁用选项</h2>
    <p class="mb10">在选项数据里给单项设置 <code>disabled: true</code>，仅该项不可选，其余选项不受影响</p>
    <Flex vertical align="start">
      <Flex vertical gap="small" align="start">
        <span class="demo-label">配置式</span>
        <CheckboxGroup :options="optionsDisabled" v-model:value="optionDisabledListValue" />
      </Flex>
      <Flex vertical gap="small" align="start">
        <span class="demo-label">复选框组</span>
        <CheckboxGroup v-model:value="optionDisabledGroupValue" :options="groupOptionsDisabled" />
      </Flex>
    </Flex>
    <h2 class="mt30 mb10">自定义选项名</h2>
    <p class="mb10"
      ><code>options</code> 模式的默认插槽提供 <code>option</code> / <code>label</code> /
      <code>index</code>，可自行渲染选项名</p
    >
    <Flex vertical align="start">
      <Flex vertical gap="small" align="start">
        <span class="demo-label">插槽 · 配置式</span>
        <CheckboxGroup :options="options" v-model:value="customSlotValue">
          <template #default="{ option, label, index }">
            <span v-if="index === 1" style="color: #ff6900">{{ label }}</span>
            <span v-else-if="index === 3" style="color: #1677ff">{{ option?.label }}</span>
            <span v-else>{{ label }}</span>
          </template>
        </CheckboxGroup>
      </Flex>
      <Flex vertical gap="small" align="start">
        <span class="demo-label">插槽 · 组合式</span>
        <CheckboxGroup v-model:value="customSlotGroupValue">
          <Checkbox :value="1">拜占庭</Checkbox>
          <Checkbox :value="2"><span style="color: #ff6900">君士坦丁堡</span></Checkbox>
          <Checkbox :value="3">伊斯坦布尔</Checkbox>
          <Checkbox :value="4"><span style="color: #1677ff">布宜诺斯艾利斯</span></Checkbox>
        </CheckboxGroup>
      </Flex>
    </Flex>
    <p class="mb10 mt10"
      >选项名支持富内容：配置式可把 <code>VNode</code> 作为 <code>label</code> 传入，组合式直接在插槽内写 HTML 或组件</p
    >
    <Flex vertical align="start">
      <Flex vertical gap="small" align="start">
        <span class="demo-label">VNode · 配置式</span>
        <CheckboxGroup :options="vnodeOptions" v-model:value="vnodeValue" />
      </Flex>
      <Flex vertical gap="small" align="start">
        <span class="demo-label">VNode · 组合式</span>
        <CheckboxGroup v-model:value="vnodeGroupValue">
          <Checkbox :value="1">拜占庭</Checkbox>
          <Checkbox :value="2"><span style="color: #1677ff">君士坦丁堡</span></Checkbox>
          <Checkbox :value="3">伊斯坦布尔</Checkbox>
        </CheckboxGroup>
      </Flex>
    </Flex>
    <h2 class="mt30 mb10">自定义间距</h2>
    <p class="mb10"
      ><code>gap</code> 传数组时为「水平间距, 垂直间距」；垂直间距仅在选项换行时才生效，此处用窄容器触发换行</p
    >
    <Flex vertical align="start">
      <Flex gap="large">
        <Flex gap="small" vertical>
          <span>水平间距 {{ horizontalGap }}px</span>
          <Slider v-model:value="horizontalGap" :width="200" />
        </Flex>
        <Flex gap="small" vertical>
          <span>垂直间距 {{ verticalGap }}px</span>
          <Slider v-model:value="verticalGap" :width="200" />
        </Flex>
      </Flex>
      <Flex vertical gap="small" align="start">
        <span class="demo-label">窄容器</span>
        <div style="width: 240px">
          <CheckboxGroup :gap="[horizontalGap, verticalGap]" :options="options" v-model:value="gapValue" />
        </div>
      </Flex>
    </Flex>
    <h2 class="mt30 mb10">复选框组间距</h2>
    <p class="mb10">组的 <code>gap</code> 传数字即统一间距；打开「垂直排列」后 <code>gap</code> 转为行间距</p>
    <Flex vertical align="start">
      <Flex gap="large">
        <Flex gap="small" vertical>
          <span>选项间距 {{ groupGap }}px</span>
          <Slider v-model:value="groupGap" :width="200" />
        </Flex>
        <Flex gap="small" vertical align="flex-start">
          <span>垂直排列</span>
          <Switch v-model:value="groupVertical" />
        </Flex>
      </Flex>
      <CheckboxGroup v-model:value="groupGapValue" :gap="groupGap" :vertical="groupVertical">
        <Checkbox v-for="item in options" :key="item.value" :value="item.value">{{ item.label }}</Checkbox>
      </CheckboxGroup>
    </Flex>
    <h2 class="mt30 mb10">聚焦方法</h2>
    <p class="mb10"
      >组件暴露 <code>focus</code> / <code>blur</code> 方法操作原生 <code>input</code>，程序化聚焦同样会显示焦点环</p
    >
    <Flex gap="small" align="center">
      <Checkbox
        ref="focusCheckboxRef"
        v-model:checked="focusChecked"
        @focusin="focusFocused = true"
        @focusout="focusFocused = false"
      >
        Checkbox
      </Checkbox>
      <Button @click="focusCheckboxRef?.focus()">focus</Button>
      <Button @click="focusCheckboxRef?.blur()">blur</Button>
      <span class="demo-tip">{{ focusFocused ? '已聚焦' : '未聚焦' }}</span>
    </Flex>
  </div>
</template>
<style lang="less" scoped>
.demo-label {
  color: rgba(0, 0, 0, 0.45);
  font-size: 13px;
  line-height: 22px;
}
.demo-tip {
  color: rgba(0, 0, 0, 0.45);
  font-size: 13px;
  line-height: 22px;
}
</style>
