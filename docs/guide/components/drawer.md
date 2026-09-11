# 抽屉 Drawer

<GlobalElement />

*屏幕边缘滑出的浮层面板*

## 何时使用

> 抽屉从父窗体边缘滑入，覆盖住部分父窗体内容。用户在抽屉内操作时不必离开当前任务，操作完成后，可以平滑地回到原任务。

- 当需要一个附加的面板来控制父窗体内容，这个面板在需要时呼出。比如，控制界面展示样式，往界面中添加内容
- 当需要在当前任务流中插入临时任务，创建或预览附加内容。比如展示协议条款，创建子对象

<script lang="ts" setup>
import { reactive, ref } from 'vue'
import type { RadioOption, SelectOption } from 'vue-amazing-ui'
import { PlusOutlined } from '@ant-design/icons-vue'
const placementOptions = ref<RadioOption[]>([
  { label: 'top', value: 'top' },
  { label: 'right', value: 'right' },
  { label: 'bottom', value: 'bottom' },
  { label: 'left', value: 'left' }
])
const ownerOptions = ref<SelectOption[]>([
  { label: 'Xiaoxiao Fu', value: 'xiao' },
  { label: 'Maomao Zhou', value: 'mao' }
])
const typeOptions = ref<SelectOption[]>([
  { label: 'Private', value: 'private' },
  { label: 'Public', value: 'public' }
])
const approverOptions = ref<SelectOption[]>([
  { label: 'Jack Ma', value: 'jack' },
  { label: 'Tom Liu', value: 'tom' }
])
const open1 = ref<boolean>(false)
const open2 = ref<boolean>(false)
const placement2 = ref<'top' | 'right' | 'bottom' | 'left'>('right')
const open3 = ref<boolean>(false)
const placement3 = ref<'top' | 'right' | 'bottom' | 'left'>('right')
const open4 = ref<boolean>(false)
const open5 = ref<boolean>(false)
const form5 = reactive({
  name: '',
  url: '',
  owner: undefined as string | undefined,
  type: undefined as string | undefined,
  approver: undefined as string | undefined,
  dateTime: '',
  description: ''
})
const open6 = ref<boolean>(false)
const innerOpen6 = ref<boolean>(false)
const open7 = ref<boolean>(false)
// 列表数据为两条同名 Lily
const profileList = ['Lily', 'Lily']
const open8 = ref<boolean>(false)
const size8 = ref<'default' | 'large'>('default')
const open9 = ref<boolean>(false)
const placement9 = ref<'top' | 'right' | 'bottom' | 'left'>('right')
const open10 = ref<boolean>(false)
function onAfterOpenChange(val: boolean) {
  console.log('open', val)
}
function onClose() {
  open1.value = false
  open2.value = false
  open3.value = false
  open4.value = false
  open5.value = false
  open6.value = false
  open7.value = false
  open8.value = false
  open9.value = false
}
function showDrawer8(val: 'default' | 'large') {
  size8.value = val
  open8.value = true
}
</script>

## 基本用法

*基础抽屉，点击触发按钮抽屉从右滑出，点击遮罩区关闭*

<br/>

<Button type="primary" @click="open1 = true">Open</Button>
<Drawer
  v-model:open="open1"
  class="custom-class"
  root-class-name="root-class-name"
  :root-style="{ color: 'blue' }"
  :content-wrapper-style="{ color: 'red' }"
  title="Basic Drawer"
  placement="right"
  @after-open-change="onAfterOpenChange"
  @close="onClose"
>
  <p>Some contents...</p>
  <p>Some contents...</p>
  <p>Some contents...</p>
</Drawer>

:::: details Show Code

```vue
<script lang="ts" setup>
import { ref } from 'vue'
const open = ref<boolean>(false)
function afterOpenChange(val: boolean) {
  console.log('open', val)
}
function onClose() {
  open.value = false
}
</script>
<template>
  <Button type="primary" @click="open = true">Open</Button>
  <Drawer
    v-model:open="open"
    class="custom-class"
    root-class-name="root-class-name"
    :root-style="{ color: 'blue' }"
    :content-wrapper-style="{ color: 'red' }"
    title="Basic Drawer"
    placement="right"
    @after-open-change="afterOpenChange"
    @close="onClose"
  >
    <p>Some contents...</p>
    <p>Some contents...</p>
    <p>Some contents...</p>
  </Drawer>
</template>
```

::::

## 自定义位置

*自定义位置，点击触发按钮抽屉从相应的位置滑出，点击遮罩区关闭*

<br/>

<Radio v-model:value="placement2" :options="placementOptions" style="margin-right: 8px" />
<Button type="primary" @click="open2 = true">Open</Button>
<Drawer v-model:open="open2" title="Basic Drawer" :closable="false" :placement="placement2" @close="onClose">
  <p>Some contents...</p>
  <p>Some contents...</p>
  <p>Some contents...</p>
</Drawer>

:::: details Show Code

```vue
<script lang="ts" setup>
import { ref } from 'vue'
import type { RadioOption } from 'vue-amazing-ui'
const open = ref<boolean>(false)
const options = ref<RadioOption[]>([
  { label: 'top', value: 'top' },
  { label: 'right', value: 'right' },
  { label: 'bottom', value: 'bottom' },
  { label: 'left', value: 'left' }
])
const placement = ref('right')
function onClose() {
  open.value = false
}
</script>
<template>
  <Radio v-model:value="placement" :options="options" style="margin-right: 8px" />
  <Button type="primary" @click="open = true">Open</Button>
  <Drawer v-model:open="open" title="Basic Drawer" :closable="false" :placement="placement" @close="onClose">
    <p>Some contents...</p>
    <p>Some contents...</p>
    <p>Some contents...</p>
  </Drawer>
</template>
```

::::

## 额外操作

*操作按钮建议放在抽屉的右上角，可以使用 `extra` 属性来实现*

<br/>

<Radio v-model:value="placement3" :options="placementOptions" style="margin-right: 8px" />
<Button type="primary" @click="open3 = true">Open</Button>
<Drawer v-model:open="open3" :width="500" title="Basic Drawer" :placement="placement3" @close="onClose">
  <template #extra>
    <Button style="margin-right: 8px" @click="onClose">Cancel</Button>
    <Button type="primary" @click="onClose">Submit</Button>
  </template>
  <p>Some contents...</p>
  <p>Some contents...</p>
  <p>Some contents...</p>
</Drawer>

:::: details Show Code

```vue
<script lang="ts" setup>
import { ref } from 'vue'
import type { RadioOption } from 'vue-amazing-ui'
const open = ref<boolean>(false)
const options = ref<RadioOption[]>([
  { label: 'top', value: 'top' },
  { label: 'right', value: 'right' },
  { label: 'bottom', value: 'bottom' },
  { label: 'left', value: 'left' }
])
const placement = ref('right')
function onClose() {
  open.value = false
}
</script>
<template>
  <Radio v-model:value="placement" :options="options" style="margin-right: 8px" />
  <Button type="primary" @click="open = true">Open</Button>
  <Drawer v-model:open="open" :width="500" title="Basic Drawer" :placement="placement" @close="onClose">
    <template #extra>
      <Button style="margin-right: 8px" @click="onClose">Cancel</Button>
      <Button type="primary" @click="onClose">Submit</Button>
    </template>
    <p>Some contents...</p>
    <p>Some contents...</p>
    <p>Some contents...</p>
  </Drawer>
</template>
```

::::

## 渲染在当前 DOM

*渲染在当前 DOM 里。自定义容器，查看 `getContainer`*

<br/>

<div class="inline-container">
  Render in this
  <div style="margin-top: 16px">
    <Button type="primary" @click="open4 = true">Open</Button>
  </div>
  <Drawer
    v-model:open="open4"
    title="Basic Drawer"
    placement="right"
    :closable="false"
    :get-container="false"
    :style="{ position: 'absolute' }"
    @close="onClose"
  >
    <p>Some contents...</p>
  </Drawer>
</div>

:::: details Show Code

```vue
<script lang="ts" setup>
import { ref } from 'vue'
const open = ref(false)
function onClose() {
  open.value = false
}
</script>
<template>
  <div
    :style="{
      height: '200px',
      overflow: 'hidden',
      position: 'relative',
      border: '1px solid #ebedf0',
      borderRadius: '2px',
      padding: '48px',
      textAlign: 'center',
      background: '#fafafa'
    }"
  >
    Render in this
    <div style="margin-top: 16px">
      <Button type="primary" @click="open = true">Open</Button>
    </div>
    <Drawer
      v-model:open="open"
      title="Basic Drawer"
      placement="right"
      :closable="false"
      :get-container="false"
      :style="{ position: 'absolute' }"
      @close="onClose"
    >
      <p>Some contents...</p>
    </Drawer>
  </div>
</template>
```

::::

## 抽屉表单

*在抽屉中使用表单*

<br/>

<Button type="primary" @click="open5 = true">
  <template #icon><PlusOutlined /></template>
  New account
</Button>
<Drawer
  v-model:open="open5"
  title="Create a new account"
  :width="720"
  :body-style="{ paddingBottom: '80px' }"
  :footer-style="{ textAlign: 'right' }"
  @close="onClose"
>
  <Row :gutter="16">
    <Col :span="12">
      <div class="form-item">
        <span class="form-label">Name</span>
        <Input v-model:value="form5.name" placeholder="Please enter user name" />
      </div>
    </Col>
    <Col :span="12">
      <div class="form-item">
        <span class="form-label">Url</span>
        <Input v-model:value="form5.url" addon-before="http://" addon-after=".com" placeholder="please enter url" />
      </div>
    </Col>
  </Row>
  <Row :gutter="16">
    <Col :span="12">
      <div class="form-item">
        <span class="form-label">Owner</span>
        <Select
          v-model="form5.owner"
          :options="ownerOptions"
          placeholder="Please select an owner"
          style="width: 100%"
        />
      </div>
    </Col>
    <Col :span="12">
      <div class="form-item">
        <span class="form-label">Type</span>
        <Select
          v-model="form5.type"
          :options="typeOptions"
          placeholder="Please choose the type"
          style="width: 100%"
        />
      </div>
    </Col>
  </Row>
  <Row :gutter="16">
    <Col :span="12">
      <div class="form-item">
        <span class="form-label">Approver</span>
        <Select
          v-model="form5.approver"
          :options="approverOptions"
          placeholder="Please choose the approver"
          style="width: 100%"
        />
      </div>
    </Col>
    <Col :span="12">
      <div class="form-item">
        <span class="form-label">DateTime</span>
        <DatePicker v-model="form5.dateTime" placeholder="Please choose the dateTime" style="width: 100%" />
      </div>
    </Col>
  </Row>
  <Row :gutter="16">
    <Col :span="24">
      <div class="form-item">
        <span class="form-label">Description</span>
        <Textarea v-model:value="form5.description" :rows="4" placeholder="please enter url description" />
      </div>
    </Col>
  </Row>
  <template #extra>
    <Space>
      <Button @click="onClose">Cancel</Button>
      <Button type="primary" @click="onClose">Submit</Button>
    </Space>
  </template>
</Drawer>

:::: details Show Code

```vue
<script lang="ts" setup>
import { reactive, ref } from 'vue'
import type { SelectOption } from 'vue-amazing-ui'
import { PlusOutlined } from '@ant-design/icons-vue'
const open = ref<boolean>(false)
const form = reactive({
  name: '',
  url: '',
  owner: undefined as string | undefined,
  type: undefined as string | undefined,
  approver: undefined as string | undefined,
  dateTime: '',
  description: ''
})
const ownerOptions = ref<SelectOption[]>([
  { label: 'Xiaoxiao Fu', value: 'xiao' },
  { label: 'Maomao Zhou', value: 'mao' }
])
const typeOptions = ref<SelectOption[]>([
  { label: 'Private', value: 'private' },
  { label: 'Public', value: 'public' }
])
const approverOptions = ref<SelectOption[]>([
  { label: 'Jack Ma', value: 'jack' },
  { label: 'Tom Liu', value: 'tom' }
])
function onClose() {
  open.value = false
}
</script>
<template>
  <Button type="primary" @click="open = true">
    <template #icon><PlusOutlined /></template>
    New account
  </Button>
  <Drawer
    v-model:open="open"
    title="Create a new account"
    :width="720"
    :body-style="{ paddingBottom: '80px' }"
    :footer-style="{ textAlign: 'right' }"
    @close="onClose"
  >
    <Row :gutter="16">
      <Col :span="12">
        <div class="form-item">
          <span class="form-label">Name</span>
          <Input v-model:value="form.name" placeholder="Please enter user name" />
        </div>
      </Col>
      <Col :span="12">
        <div class="form-item">
          <span class="form-label">Url</span>
          <Input v-model:value="form.url" addon-before="http://" addon-after=".com" placeholder="please enter url" />
        </div>
      </Col>
    </Row>
    <Row :gutter="16">
      <Col :span="12">
        <div class="form-item">
          <span class="form-label">Owner</span>
          <Select
            v-model="form.owner"
            :options="ownerOptions"
            placeholder="Please select an owner"
            style="width: 100%"
          />
        </div>
      </Col>
      <Col :span="12">
        <div class="form-item">
          <span class="form-label">Type</span>
          <Select
            v-model="form.type"
            :options="typeOptions"
            placeholder="Please choose the type"
            style="width: 100%"
          />
        </div>
      </Col>
    </Row>
    <Row :gutter="16">
      <Col :span="12">
        <div class="form-item">
          <span class="form-label">Approver</span>
          <Select
            v-model="form.approver"
            :options="approverOptions"
            placeholder="Please choose the approver"
            style="width: 100%"
          />
        </div>
      </Col>
      <Col :span="12">
        <div class="form-item">
          <span class="form-label">DateTime</span>
          <DatePicker v-model="form.dateTime" placeholder="Please choose the dateTime" style="width: 100%" />
        </div>
      </Col>
    </Row>
    <Row :gutter="16">
      <Col :span="24">
        <div class="form-item">
          <span class="form-label">Description</span>
          <Textarea v-model:value="form.description" :rows="4" placeholder="please enter url description" />
        </div>
      </Col>
    </Row>
    <template #extra>
      <Space>
        <Button @click="onClose">Cancel</Button>
        <Button type="primary" @click="onClose">Submit</Button>
      </Space>
    </template>
  </Drawer>
</template>
```

::::

## 多层抽屉

*在抽屉内打开新的抽屉，用以解决多分支任务的复杂状况*

<br/>

<Button type="primary" @click="open6 = true">Open</Button>
<Drawer
  v-model:open="open6"
  title="Multi-level drawer"
  width="520"
  :closable="false"
  :footer-style="{ textAlign: 'right' }"
  @close="onClose"
>
  <Button type="primary" @click="innerOpen6 = true">Two-level drawer</Button>
  <Drawer v-model:open="innerOpen6" title="Two-level Drawer" width="320" :closable="false">
    <p>This is two-level drawer</p>
  </Drawer>
  <template #footer>
    <Button style="margin-right: 8px" @click="onClose">Cancel</Button>
    <Button type="primary" @click="onClose">Submit</Button>
  </template>
</Drawer>

:::: details Show Code

```vue
<script lang="ts" setup>
import { ref } from 'vue'
const open = ref<boolean>(false)
const childrenDrawer = ref<boolean>(false)
function onClose() {
  open.value = false
}
</script>
<template>
  <Button type="primary" @click="open = true">Open</Button>
  <Drawer
    v-model:open="open"
    title="Multi-level drawer"
    width="520"
    :closable="false"
    :footer-style="{ textAlign: 'right' }"
    @close="onClose"
  >
    <Button type="primary" @click="childrenDrawer = true">Two-level drawer</Button>
    <Drawer v-model:open="childrenDrawer" title="Two-level Drawer" width="320" :closable="false">
      <p>This is two-level drawer</p>
    </Drawer>
    <template #footer>
      <Button style="margin-right: 8px" @click="onClose">Cancel</Button>
      <Button type="primary" @click="onClose">Submit</Button>
    </template>
  </Drawer>
</template>
```

::::

## 信息预览抽屉

*需要快速预览对象概要时使用，点击遮罩区关闭*

<br/>

<List bordered>
  <ListItem v-for="(name, index) in profileList" :key="index" :title="name" description="Progresser XTech">
    <template #avatar>
      <Avatar src="https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.1.2/1.jpg" />
    </template>
    <template #actions>
      <a href="#" @click.prevent="open7 = true">View Profile</a>
    </template>
  </ListItem>
</List>
<Drawer v-model:open="open7" :width="640" placement="right" :closable="false" @close="onClose">
  <p class="profile-title">User Profile</p>
  <p class="profile-label">Personal</p>
  <Descriptions :column="2">
    <DescriptionsItem label="Full Name">Lily</DescriptionsItem>
    <DescriptionsItem label="Account">themusecatcher</DescriptionsItem>
    <DescriptionsItem label="City">HangZhou</DescriptionsItem>
    <DescriptionsItem label="Country">China🇨🇳</DescriptionsItem>
    <DescriptionsItem label="Birthday">February 2,1900</DescriptionsItem>
    <DescriptionsItem label="Website">-</DescriptionsItem>
    <DescriptionsItem label="Message">Make things as simple as possible but no simpler.</DescriptionsItem>
  </Descriptions>
  <Divider />
  <p class="profile-label">Company</p>
  <Descriptions :column="2">
    <DescriptionsItem label="Position">Programmer</DescriptionsItem>
    <DescriptionsItem label="Responsibilities">Coding</DescriptionsItem>
    <DescriptionsItem label="Department">XTech</DescriptionsItem>
    <DescriptionsItem label="Supervisor">
      <a>Lin</a>
    </DescriptionsItem>
    <DescriptionsItem label="Skills">
      C / C + +, data structures, software engineering, operating systems, computer networks, databases,
      compiler theory, computer architecture, Microcomputer Principle and Interface Technology, Computer English,
      Java, ASP, etc.
    </DescriptionsItem>
  </Descriptions>
  <Divider />
  <p class="profile-label">Contacts</p>
  <Descriptions :column="2">
    <DescriptionsItem label="Email">themusecatcher@163.com</DescriptionsItem>
    <DescriptionsItem label="Phone Number">+86 181 0000 0000</DescriptionsItem>
    <DescriptionsItem label="Github">
      <a href="https://github.com/themusecatcher/vue-amazing-ui">
        github.com/themusecatcher/vue-amazing-ui
      </a>
    </DescriptionsItem>
  </Descriptions>
</Drawer>

:::: details Show Code

```vue
<script lang="ts" setup>
import { ref } from 'vue'
const open = ref<boolean>(false)
// 列表数据为两条同名 Lily
const profileList = ['Lily', 'Lily']
function onClose() {
  open.value = false
}
</script>
<template>
  <List bordered>
    <ListItem v-for="(name, index) in profileList" :key="index" :title="name" description="Progresser XTech">
      <template #avatar>
        <Avatar src="https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.1.2/1.jpg" />
      </template>
      <template #actions>
        <a href="#" @click.prevent="open = true">View Profile</a>
      </template>
    </ListItem>
  </List>
  <Drawer v-model:open="open" :width="640" placement="right" :closable="false" @close="onClose">
    <p class="profile-title">User Profile</p>
    <p class="profile-label">Personal</p>
    <Descriptions :column="2">
      <DescriptionsItem label="Full Name">Lily</DescriptionsItem>
      <DescriptionsItem label="Account">themusecatcher</DescriptionsItem>
      <DescriptionsItem label="City">HangZhou</DescriptionsItem>
      <DescriptionsItem label="Country">China🇨🇳</DescriptionsItem>
      <DescriptionsItem label="Birthday">February 2,1900</DescriptionsItem>
      <DescriptionsItem label="Website">-</DescriptionsItem>
      <DescriptionsItem label="Message">Make things as simple as possible but no simpler.</DescriptionsItem>
    </Descriptions>
    <Divider />
    <p class="profile-label">Company</p>
    <Descriptions :column="2">
      <DescriptionsItem label="Position">Programmer</DescriptionsItem>
      <DescriptionsItem label="Responsibilities">Coding</DescriptionsItem>
      <DescriptionsItem label="Department">XTech</DescriptionsItem>
      <DescriptionsItem label="Supervisor">
        <a>Lin</a>
      </DescriptionsItem>
      <DescriptionsItem label="Skills">
        C / C + +, data structures, software engineering, operating systems, computer networks, databases,
        compiler theory, computer architecture, Microcomputer Principle and Interface Technology, Computer English,
        Java, ASP, etc.
      </DescriptionsItem>
    </Descriptions>
    <Divider />
    <p class="profile-label">Contacts</p>
    <Descriptions :column="2">
      <DescriptionsItem label="Email">themusecatcher@163.com</DescriptionsItem>
      <DescriptionsItem label="Phone Number">+86 181 0000 0000</DescriptionsItem>
      <DescriptionsItem label="Github">
        <a href="https://github.com/themusecatcher/vue-amazing-ui">
          github.com/themusecatcher/vue-amazing-ui
        </a>
      </DescriptionsItem>
    </Descriptions>
  </Drawer>
</template>
```

::::

## 预设宽度

*抽屉的默认宽度为 `378px`，另外还提供一个大号抽屉 `736px`，可以用 `size` 属性来设置*

<br/>

<Button type="primary" style="margin-right: 8px" @click="showDrawer8('default')">Open Default Size (378px)</Button>
<Button type="primary" @click="showDrawer8('large')">Open Large Size (736px)</Button>
<Drawer v-model:open="open8" title="Basic Drawer" :size="size8" @close="onClose">
  <template #extra>
    <Button style="margin-right: 8px" @click="onClose">Cancel</Button>
    <Button type="primary" @click="onClose">Submit</Button>
  </template>
  <p>Some contents...</p>
  <p>Some contents...</p>
  <p>Some contents...</p>
</Drawer>

:::: details Show Code

```vue
<script lang="ts" setup>
import { ref } from 'vue'
import type { DrawerProps } from 'vue-amazing-ui'
const open = ref<boolean>(false)
const size = ref<DrawerProps['size']>('default')
function showDrawer(val: DrawerProps['size']) {
  size.value = val
  open.value = true
}
function onClose() {
  open.value = false
}
</script>
<template>
  <Button type="primary" style="margin-right: 8px" @click="showDrawer('default')">Open Default Size (378px)</Button>
  <Button type="primary" @click="showDrawer('large')">Open Large Size (736px)</Button>
  <Drawer v-model:open="open" title="Basic Drawer" :size="size" @close="onClose">
    <template #extra>
      <Button style="margin-right: 8px" @click="onClose">Cancel</Button>
      <Button type="primary" @click="onClose">Submit</Button>
    </template>
    <p>Some contents...</p>
    <p>Some contents...</p>
    <p>Some contents...</p>
  </Drawer>
</template>
```

::::

## 抽屉页脚

<Radio v-model:value="placement9" :options="placementOptions" style="margin-right: 8px" />
<Button type="primary" @click="open9 = true">Open</Button>
<Drawer
  v-model:open="open9"
  title="Basic Drawer"
  :placement="placement9"
  :footer-style="{ textAlign: 'right' }"
  @close="onClose"
>
  <p>Some contents...</p>
  <p>Some contents...</p>
  <p>Some contents...</p>
  <template #footer>
    <Button style="margin-right: 8px" @click="onClose">Cancel</Button>
    <Button type="primary" @click="onClose">Submit</Button>
  </template>
</Drawer>

:::: details Show Code

```vue
<script lang="ts" setup>
import { ref } from 'vue'
import type { RadioOption } from 'vue-amazing-ui'
const open = ref<boolean>(false)
const options = ref<RadioOption[]>([
  { label: 'top', value: 'top' },
  { label: 'right', value: 'right' },
  { label: 'bottom', value: 'bottom' },
  { label: 'left', value: 'left' }
])
const placement = ref('right')
function onClose() {
  open.value = false
}
</script>
<template>
  <Radio v-model:value="placement" :options="options" style="margin-right: 8px" />
  <Button type="primary" @click="open = true">Open</Button>
  <Drawer
    v-model:open="open"
    title="Basic Drawer"
    :placement="placement"
    :footer-style="{ textAlign: 'right' }"
    @close="onClose"
  >
    <p>Some contents...</p>
    <p>Some contents...</p>
    <p>Some contents...</p>
    <template #footer>
      <Button style="margin-right: 8px" @click="onClose">Cancel</Button>
      <Button type="primary" @click="onClose">Submit</Button>
    </template>
  </Drawer>
</template>
```

::::

## 自定义 header & body 样式

*通过 `header-style` 与 `body-style` 自定义抽屉头部与内容区域样式，并设置背景色便于观察*

<br/>

<Button type="primary" @click="open10 = true">Open</Button>
<Drawer
  v-model:open="open10"
  :closable="false"
  title="Basic Drawer"
  :header-style="{ textAlign: 'center', background: '#e6f4ff' }"
  :body-style="{ textAlign: 'center' }"
>
  <p>Some contents...</p>
  <p>Some contents...</p>
  <p>Some contents...</p>
</Drawer>

:::: details Show Code

```vue
<script lang="ts" setup>
import { ref } from 'vue'
const open = ref<boolean>(false)
</script>
<template>
  <Button type="primary" @click="open = true">Open</Button>
  <Drawer
    v-model:open="open"
    :closable="false"
    title="Basic Drawer"
    :header-style="{ textAlign: 'center' }"
    :body-style="{ textAlign: 'center' }"
  >
    <p>Some contents...</p>
    <p>Some contents...</p>
    <p>Some contents...</p>
  </Drawer>
</template>
```

::::

<style lang="less" scoped>
p {
  color: rgba(0, 0, 0, 0.88);
}
.inline-container {
  height: 200px;
  overflow: hidden;
  position: relative;
  border: 1px solid #ebedf0;
  border-radius: 2px;
  padding: 48px;
  text-align: center;
  background: #fafafa;
}
.form-item {
  margin-bottom: 16px;
}
.form-label {
  display: block;
  margin-bottom: 8px;
  color: rgba(0, 0, 0, 0.88);
}
.profile-title {
  font-size: 16px;
  line-height: 24px;
  margin-bottom: 24px;
  color: rgba(0, 0, 0, 0.85);
}
.profile-label {
  font-size: 16px;
  line-height: 24px;
  margin-bottom: 16px;
  color: rgba(0, 0, 0, 0.85);
}
</style>

## APIs

### Drawer

参数 | 说明 | 类型 | 默认值
:-- | :-- | :-- | :--
width | 抽屉宽度，在 `placement` 为 `right` 或 `left` 时使用，单位 `px` | string &#124; number | 378
height | 抽屉高度，在 `placement` 为 `top` 或 `bottom` 时使用，单位 `px` | string &#124; number | 378
size | 预设抽屉宽度（或高度），`default` 为 `378px`、`large` 为 `736px` | 'default' &#124; 'large' | 'default'
title | 标题 | string | undefined
closable | 是否显示左上角的关闭按钮 | boolean | true
closeIcon | 自定义关闭图标，插槽形态请用 `#closeIcon` | [VNode](https://cn.vuejs.org/api/utility-types.html#vnode) &#124; (() => VNode) | undefined
placement | 抽屉的方向 | 'top' &#124; 'right' &#124; 'bottom' &#124; 'left' | 'right'
headerClass | 设置 `Drawer` 头部的类名 | string | undefined
headerStyle | 设置 `Drawer` 头部的样式 | [CSSProperties](https://cn.vuejs.org/api/utility-types.html#cssproperties) | {}
bodyClass | 设置 `Drawer` 内容部分的类名 | string | undefined
bodyStyle | 设置 `Drawer` 内容部分的样式 | [CSSProperties](https://cn.vuejs.org/api/utility-types.html#cssproperties) | {}
footer | 抽屉的页脚 | string | undefined
footerClass | 设置 `Drawer` 页脚的类名 | string | undefined
footerStyle | 设置 `Drawer` 页脚的样式 | [CSSProperties](https://cn.vuejs.org/api/utility-types.html#cssproperties) | {}
extra | 抽屉右上角的操作区域 | string | undefined
scrollbarProps | `Scrollbar` 组件属性配置，参考 [Scrollbar Props](./scrollbar.md#scrollbar)，用于设置内容滚动条的样式 | [ScrollbarProps](./scrollbar.md#scrollbar) | {}
destroyOnClose | 关闭时是否销毁 `Drawer` 里的子元素 | boolean | false
forceRender | 预渲染 `Drawer` 内元素 | boolean | false
contentWrapperStyle | 设置 `Drawer` 包裹内容部分的样式 | [CSSProperties](https://cn.vuejs.org/api/utility-types.html#cssproperties) | {}
rootClassName | 最外层容器的类名 | string | undefined
rootStyle | 最外层容器的样式 | [CSSProperties](https://cn.vuejs.org/api/utility-types.html#cssproperties) | {}
getContainer | 指定 `Drawer` 挂载的节点，`false` 时渲染在当前 `DOM` | string &#124; HTMLElement &#124; (() => HTMLElement) &#124; false | 'body'
zIndex | 设置 `Drawer` 的 `z-index` | number | 1000
open <Tag color="cyan">v-model</Tag> | 抽屉是否可见 | boolean | false
autofocus | 抽屉展开后是否将焦点切换至其 `DOM` 节点 | boolean | true
keyboard | 是否支持键盘 `esc` 关闭 | boolean | true
mask | 是否展示遮罩 | boolean | true
maskClosable | 点击蒙层是否允许关闭 | boolean | true
maskStyle | 遮罩样式 | [CSSProperties](https://cn.vuejs.org/api/utility-types.html#cssproperties) | {}
blockScroll | 是否在打开时禁用 `body` 滚动 | boolean | true
push | 用于设置多层 `Drawer` 的推动行为 | boolean &#124; { distance: string &#124; number } | \{ distance: 180 }

## Events

名称 | 说明 | 类型
:-- | :-- | :--
close | 点击遮罩层或左上角叉或取消按钮的回调 | (e: Event) => void
afterOpenChange | 切换抽屉时动画结束后的回调 | (open: boolean) => void

## Slots

名称 | 说明 | 类型
:-- | :-- | :--
title | 自定义标题 | v-slot:title
extra | 自定义抽屉右上角的操作区域 | v-slot:extra
default | 自定义抽屉内容 | v-slot:default
footer | 自定义抽屉的页脚 | v-slot:footer
closeIcon | 自定义关闭图标 | v-slot:closeIcon
