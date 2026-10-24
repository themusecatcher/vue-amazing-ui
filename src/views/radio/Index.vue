<script setup lang="ts">
import { h, ref, watchEffect } from 'vue'
import type { Radio, RadioButton, RadioGroupOption, RadioProps } from 'vue-amazing-ui'
// 基本使用
const checked = ref<boolean>(false)
const onChange = (checked: boolean) => {
  console.log('change', checked)
}
// 单选组合 / 表单字段名
const groupItems = [
  { value: 1, label: 'A' },
  { value: 2, label: 'B' },
  { value: 3, label: 'C' },
  { value: 4, label: 'D' }
]
const groupValue = ref<RadioProps['value']>(1)
const nameItems = [
  { value: '1', label: 'A' },
  { value: '2', label: 'B' },
  { value: '3', label: 'C' },
  { value: '4', label: 'D' }
]
const nameValue = ref<string>('1')
// 选项列表：城市选项，长短混排便于观察换行与间距
const options = ref<RadioGroupOption[]>([
  { label: '拜占庭', value: 1 },
  { label: '君士坦丁堡', value: 2 },
  { label: '伊斯坦布尔', value: 3 },
  { label: '布宜诺斯艾利斯', value: 4 }
])
const optionGroupValue = ref<RadioProps['value']>(1)
// 单选组垂直排列
const verticalItems = [
  { value: 1, label: 'Option A' },
  { value: 2, label: 'Option B' },
  { value: 3, label: 'Option C' },
  { value: 4, label: 'More...' }
]
// 逐项定高并居中：选项内嵌控件出现 / 消失时不影响行盒基线
const verticalStyle: Record<string, string> = {
  display: 'flex',
  alignItems: 'center',
  height: '32px',
  lineHeight: '30px'
}
const verticalValue = ref<RadioProps['value']>(1)
const verticalAttrValue = ref<RadioProps['value']>(1)
// 按钮样式 / 填底的按钮样式 / 按钮大小
const buttonItems = [
  { value: 'a', label: 'Hangzhou' },
  { value: 'b', label: 'Shanghai' },
  { value: 'c', label: 'Beijing' },
  { value: 'd', label: 'Chengdu' }
]
const outlineValue = ref<RadioProps['value']>('a')
const outlineItemDisabledValue = ref<RadioProps['value']>('a')
const outlineGroupDisabledValue = ref<RadioProps['value']>('a')
const outlineOptionsValue = ref<RadioProps['value']>(2)
const buttonChecked = ref<boolean>(false)
const solidValue = ref<RadioProps['value']>('a')
const solidItemDisabledValue = ref<RadioProps['value']>('c')
const solidChecked = ref<boolean>(false)
const solidOptionsGroupValue = ref<RadioProps['value']>(2)
const sizeOptions = [
  { label: 'small', value: 'small' },
  { label: 'middle', value: 'middle' },
  { label: 'large', value: 'large' }
]
const buttonSizeValue = ref<RadioProps['size']>('middle')
const largeValue = ref<RadioProps['value']>('a')
const middleValue = ref<RadioProps['value']>('a')
const smallValue = ref<RadioProps['value']>('a')
const sizeChecked = ref<boolean>(false)
const sizeOptionsValue = ref<RadioProps['value']>(2)
// 禁用
const disabled = ref<boolean>(true)
const toggleDisabled = () => {
  disabled.value = !disabled.value
}
const disabledChecked = ref<boolean>(true)
const disabledUnchecked = ref<boolean>(false)
const disabledOptionsValue = ref<RadioProps['value']>(2)
const disabledGroupValue = ref<RadioProps['value']>(1)
// 禁用选项
const optionsDisabled = ref<RadioGroupOption[]>([
  { label: '拜占庭', value: 1 },
  { label: '君士坦丁堡', value: 2, disabled: true },
  { label: '伊斯坦布尔', value: 3 },
  { label: '布宜诺斯艾利斯', value: 4 }
])
const optionDisabledButtonValue = ref<RadioProps['value']>(1)
const optionDisabledGroupValue = ref<RadioProps['value']>(1)
// 自定义选项名
const customSlotValue = ref<RadioProps['value']>(2)
const customSlotGroupValue = ref<RadioProps['value']>(1)
// 非字符串选项名：label 直接传入 VNode
const vnodeOptions: RadioGroupOption[] = [
  { label: '拜占庭', value: 1 },
  { label: h('span', { style: 'color: #ff6900' }, '君士坦丁堡'), value: 2 },
  { label: '伊斯坦布尔', value: 3 }
]
const vnodeValue = ref<RadioProps['value']>(1)
const vnodeGroupValue = ref<RadioProps['value']>(1)
// 自定义间距 / 单选组间距
const horizontalGap = ref(16)
const verticalGap = ref(8)
const gapRadioValue = ref<RadioProps['value']>(2)
const groupGap = ref(16)
const groupVertical = ref<boolean>(true)
const groupGapValue = ref<RadioProps['value']>(1)
// 聚焦方法
const focusChecked = ref<boolean>(false)
const focusFocused = ref<boolean>(false)
const focusRadioRef = ref<InstanceType<typeof Radio> | null>(null)
const focusButtonChecked = ref<boolean>(false)
const focusButtonFocused = ref<boolean>(false)
const focusButtonRef = ref<InstanceType<typeof RadioButton> | null>(null)
watchEffect(() => {
  console.log('checked', checked.value)
})
</script>
<template>
  <div>
    <h1>{{ $route.name }} {{ $route.meta.title }}</h1>
    <h2 class="mt30 mb10">基本使用</h2>
    <p class="mb10">独立用法：<code>v-model:checked</code> 双向绑定选中态，<code>change</code> 事件回传最新选中值</p>
    <Flex vertical align="start">
      <Radio v-model:checked="checked" @change="onChange">Radio</Radio>
    </Flex>
    <h2 class="mt30 mb10">单选组合</h2>
    <p class="mb10"
      >选中值由 <code>RadioGroup</code> 统一维护，组内 <code>Radio</code> 用
      <code>value</code> 标识自身，无需各自维护选中态</p
    >
    <Flex vertical align="start">
      <RadioGroup v-model:value="groupValue">
        <Radio v-for="item in groupItems" :key="item.value" :value="item.value">{{ item.label }}</Radio>
      </RadioGroup>
    </Flex>
    <h2 class="mt30 mb10">表单字段名</h2>
    <p class="mb10"
      >设置 <code>name</code> 后，组内各原生 <code>input</code> 共享同一字段名，浏览器据此把它们识别为同一组选项</p
    >
    <Flex vertical align="start">
      <RadioGroup v-model:value="nameValue" name="radioGroup">
        <Radio v-for="item in nameItems" :key="item.value" :value="item.value">{{ item.label }}</Radio>
      </RadioGroup>
    </Flex>
    <h2 class="mt30 mb10">选项列表</h2>
    <p class="mb10"
      >配置式写法：传入 <code>options</code> 数组即可渲染整组选项；自定义选项名、按钮形态等能力均由
      <code>RadioGroup</code> 承载</p
    >
    <RadioGroup v-model:value="optionGroupValue" :options="options" />
    <h2 class="mt30 mb10">单选组垂直排列</h2>
    <p class="mb10">选项内需要放输入框等控件时，逐项定高并居中，可避免控件出现 / 消失时整行跳动</p>
    <Flex vertical align="start">
      <RadioGroup v-model:value="verticalValue" style="display: inline-block">
        <Radio v-for="item in verticalItems" :key="item.value" :value="item.value" :style="verticalStyle">
          {{ item.label }}
          <Input v-if="item.value === 4 && verticalValue === 4" style="width: 100px; margin-left: 10px" />
        </Radio>
      </RadioGroup>
    </Flex>
    <p class="mb10 mt10">也可以直接用 <code>vertical</code> 让组内选项垂直排列</p>
    <Flex vertical align="start">
      <RadioGroup v-model:value="verticalAttrValue" vertical>
        <Radio v-for="item in groupItems" :key="item.value" :value="item.value">{{ item.label }}</Radio>
      </RadioGroup>
    </Flex>
    <h2 class="mt30 mb10">按钮样式</h2>
    <p class="mb10">按钮形态有两种写法：组内放 <code>RadioButton</code>，或给组设置 <code>button</code></p>
    <Flex vertical align="start">
      <Flex vertical gap="small" align="start">
        <span class="demo-label">默认</span>
        <RadioGroup v-model:value="outlineValue">
          <RadioButton v-for="button in buttonItems" :key="button.value" :value="button.value">
            {{ button.label }}
          </RadioButton>
        </RadioGroup>
      </Flex>
      <Flex vertical gap="small" align="start">
        <span class="demo-label">单项禁用</span>
        <RadioGroup v-model:value="outlineItemDisabledValue">
          <RadioButton
            v-for="button in buttonItems"
            :key="button.value"
            :value="button.value"
            :disabled="button.value === 'b'"
          >
            {{ button.label }}
          </RadioButton>
        </RadioGroup>
      </Flex>
      <Flex vertical gap="small" align="start">
        <span class="demo-label">整组禁用</span>
        <RadioGroup v-model:value="outlineGroupDisabledValue" disabled>
          <RadioButton v-for="button in buttonItems" :key="button.value" :value="button.value">
            {{ button.label }}
          </RadioButton>
        </RadioGroup>
      </Flex>
      <Flex vertical gap="small" align="start">
        <span class="demo-label">配置式</span>
        <RadioGroup v-model:value="outlineOptionsValue" :options="options" button />
      </Flex>
    </Flex>
    <p class="mb10 mt10">单组件同样可用 <code>button</code> 切换按钮形态</p>
    <Radio v-model:checked="buttonChecked" button @change="onChange">Radio Button</Radio>
    <h2 class="mt30 mb10">填底的按钮样式</h2>
    <p class="mb10">在按钮形态基础上设置 <code>buttonStyle="solid"</code>，选中项以主题色填底</p>
    <Flex vertical align="start">
      <Flex vertical gap="small" align="start">
        <span class="demo-label">默认</span>
        <RadioGroup v-model:value="solidValue" button-style="solid">
          <RadioButton v-for="button in buttonItems" :key="button.value" :value="button.value">
            {{ button.label }}
          </RadioButton>
        </RadioGroup>
      </Flex>
      <Flex vertical gap="small" align="start">
        <span class="demo-label">单项禁用</span>
        <RadioGroup v-model:value="solidItemDisabledValue" button-style="solid">
          <RadioButton
            v-for="button in buttonItems"
            :key="button.value"
            :value="button.value"
            :disabled="button.value === 'b'"
          >
            {{ button.label }}
          </RadioButton>
        </RadioGroup>
      </Flex>
      <Flex vertical gap="small" align="start">
        <span class="demo-label">配置式</span>
        <RadioGroup v-model:value="solidOptionsGroupValue" :options="options" button button-style="solid" />
      </Flex>
    </Flex>
    <p class="mb10 mt10">单组件的填底按钮形态：<code>button</code> 配合 <code>buttonStyle="solid"</code></p>
    <Radio v-model:checked="solidChecked" button button-style="solid" @change="onChange"> Radio Button Solid </Radio>
    <h2 class="mt30 mb10">按钮大小</h2>
    <p class="mb10">组的 <code>size</code> 统一作用于组内所有按钮，未指定时各按钮回落自身 <code>size</code></p>
    <Flex vertical align="start">
      <Flex vertical gap="small" align="start">
        <span class="demo-label">large</span>
        <RadioGroup v-model:value="largeValue" size="large">
          <RadioButton v-for="button in buttonItems" :key="button.value" :value="button.value">
            {{ button.label }}
          </RadioButton>
        </RadioGroup>
      </Flex>
      <Flex vertical gap="small" align="start">
        <span class="demo-label">middle</span>
        <RadioGroup v-model:value="middleValue" size="middle">
          <RadioButton v-for="button in buttonItems" :key="button.value" :value="button.value">
            {{ button.label }}
          </RadioButton>
        </RadioGroup>
      </Flex>
      <Flex vertical gap="small" align="start">
        <span class="demo-label">small</span>
        <RadioGroup v-model:value="smallValue" size="small">
          <RadioButton v-for="button in buttonItems" :key="button.value" :value="button.value">
            {{ button.label }}
          </RadioButton>
        </RadioGroup>
      </Flex>
    </Flex>
    <p class="mb10 mt10">单组件按自身 <code>size</code> 渲染，可与上方的尺寸选择联动切换</p>
    <Flex vertical align="start">
      <Flex vertical gap="small" align="start">
        <span class="demo-label">尺寸</span>
        <RadioGroup :options="sizeOptions" v-model:value="buttonSizeValue" button button-style="solid" />
      </Flex>
      <Flex vertical gap="small" align="start">
        <span class="demo-label">单组件</span>
        <Radio v-model:checked="sizeChecked" button :size="buttonSizeValue">Radio Button</Radio>
      </Flex>
      <Flex vertical gap="small" align="start">
        <span class="demo-label">配置式</span>
        <RadioGroup :options="options" v-model:value="sizeOptionsValue" button :size="buttonSizeValue" />
      </Flex>
    </Flex>
    <h2 class="mt30 mb10">禁用</h2>
    <p class="mb10">开关演示整组禁用：禁用后不可聚焦、不可切换，<code>disabled</code> 由组统一下发给组内各项</p>
    <Flex vertical align="start">
      <Button type="primary" @click="toggleDisabled">Toggle disabled</Button>
      <Flex vertical gap="small" align="start">
        <span class="demo-label">单选按钮</span>
        <Flex gap="small" align="center">
          <Radio v-model:checked="disabledChecked" :disabled="disabled">Disabled</Radio>
          <Radio v-model:checked="disabledUnchecked" :disabled="disabled">Disabled</Radio>
        </Flex>
      </Flex>
      <Flex vertical gap="small" align="start">
        <span class="demo-label">配置式</span>
        <RadioGroup :options="options" v-model:value="disabledOptionsValue" disabled />
      </Flex>
      <Flex vertical gap="small" align="start">
        <span class="demo-label">按钮形态</span>
        <RadioGroup :options="options" v-model:value="disabledOptionsValue" button disabled />
      </Flex>
      <Flex vertical gap="small" align="start">
        <span class="demo-label">单选组</span>
        <RadioGroup v-model:value="disabledGroupValue" :options="options" disabled />
      </Flex>
    </Flex>
    <h2 class="mt30 mb10">禁用选项</h2>
    <p class="mb10">在选项数据里给单项设置 <code>disabled: true</code>，仅该项不可选，其余选项不受影响</p>
    <Flex vertical align="start">
      <Flex vertical gap="small" align="start">
        <span class="demo-label">单选组</span>
        <RadioGroup v-model:value="optionDisabledGroupValue" :options="optionsDisabled" />
      </Flex>
      <Flex vertical gap="small" align="start">
        <span class="demo-label">按钮形态</span>
        <RadioGroup v-model:value="optionDisabledButtonValue" :options="optionsDisabled" button />
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
        <RadioGroup :options="options" v-model:value="customSlotValue">
          <template #default="{ option, label, index }">
            <span v-if="index === 1" style="color: #ff6900">{{ label }}</span>
            <span v-else-if="index === 3" style="color: #1677ff">{{ option?.label }}</span>
            <span v-else>{{ label }}</span>
          </template>
        </RadioGroup>
      </Flex>
      <Flex vertical gap="small" align="start">
        <span class="demo-label">插槽 · 组合式</span>
        <RadioGroup v-model:value="customSlotGroupValue">
          <Radio :value="1">拜占庭</Radio>
          <Radio :value="2"><span style="color: #ff6900">君士坦丁堡</span></Radio>
          <Radio :value="3">伊斯坦布尔</Radio>
          <Radio :value="4"><span style="color: #1677ff">布宜诺斯艾利斯</span></Radio>
        </RadioGroup>
      </Flex>
    </Flex>
    <p class="mb10 mt10"
      >选项名支持富内容：配置式可把 <code>VNode</code> 作为 <code>label</code> 传入，组合式直接在插槽内写 HTML 或组件</p
    >
    <Flex vertical align="start">
      <Flex vertical gap="small" align="start">
        <span class="demo-label">VNode · 配置式</span>
        <RadioGroup :options="vnodeOptions" v-model:value="vnodeValue" />
      </Flex>
      <Flex vertical gap="small" align="start">
        <span class="demo-label">VNode · 组合式</span>
        <RadioGroup v-model:value="vnodeGroupValue">
          <Radio :value="1">拜占庭</Radio>
          <Radio :value="2"><span style="color: #1677ff">君士坦丁堡</span></Radio>
          <Radio :value="3">伊斯坦布尔</Radio>
        </RadioGroup>
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
          <RadioGroup :gap="[horizontalGap, verticalGap]" :options="options" v-model:value="gapRadioValue" />
        </div>
      </Flex>
    </Flex>
    <h2 class="mt30 mb10">单选组间距</h2>
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
      <RadioGroup v-model:value="groupGapValue" :gap="groupGap" :vertical="groupVertical">
        <Radio v-for="item in groupItems" :key="item.value" :value="item.value">{{ item.label }}</Radio>
      </RadioGroup>
    </Flex>
    <h2 class="mt30 mb10">聚焦方法</h2>
    <p class="mb10"
      >组件暴露 <code>focus</code> / <code>blur</code> 方法操作原生
      <code>input</code>，程序化聚焦同样会显示焦点环；键盘聚焦与脚本聚焦显示焦点环，鼠标按下不显示</p
    >
    <Flex vertical align="start">
      <Flex vertical gap="small" align="start">
        <span class="demo-label">圆点形态</span>
        <Flex gap="small" align="center">
          <Radio
            ref="focusRadioRef"
            v-model:checked="focusChecked"
            @focusin="focusFocused = true"
            @focusout="focusFocused = false"
          >
            Radio
          </Radio>
          <Button @click="focusRadioRef?.focus()">focus</Button>
          <Button @click="focusRadioRef?.blur()">blur</Button>
          <span class="demo-tip">{{ focusFocused ? '已聚焦' : '未聚焦' }}</span>
        </Flex>
      </Flex>
      <Flex vertical gap="small" align="start">
        <span class="demo-label">按钮形态</span>
        <Flex gap="small" align="center">
          <RadioButton
            ref="focusButtonRef"
            v-model:checked="focusButtonChecked"
            @focusin="focusButtonFocused = true"
            @focusout="focusButtonFocused = false"
          >
            Radio Button
          </RadioButton>
          <Button @click="focusButtonRef?.focus()">focus</Button>
          <Button @click="focusButtonRef?.blur()">blur</Button>
          <span class="demo-tip">{{ focusButtonFocused ? '已聚焦' : '未聚焦' }}</span>
        </Flex>
      </Flex>
    </Flex>
  </div>
</template>
<style lang="less" scoped>
.demo-label {
  color: var(--va-text-color-3);
  font-size: 13px;
  line-height: 22px;
}
.demo-tip {
  color: var(--va-text-color-3);
  font-size: 13px;
  line-height: 22px;
}
</style>
