<script lang="ts" setup>
import { reactive, ref } from 'vue'
import type { DrawerProps, RadioOption, SelectOption } from 'vue-amazing-ui'
import { PlusOutlined } from '@ant-design/icons-vue'

const placementOptions = ref<RadioOption[]>([
  {
    label: 'top',
    value: 'top'
  },
  {
    label: 'right',
    value: 'right'
  },
  {
    label: 'bottom',
    value: 'bottom'
  },
  {
    label: 'left',
    value: 'left'
  }
])
const ownerOptions = ref<SelectOption[]>([
  {
    label: 'Xiaoxiao Fu',
    value: 'xiao'
  },
  {
    label: 'Maomao Zhou',
    value: 'mao'
  }
])
const typeOptions = ref<SelectOption[]>([
  {
    label: 'Private',
    value: 'private'
  },
  {
    label: 'Public',
    value: 'public'
  }
])
const approverOptions = ref<SelectOption[]>([
  {
    label: 'Jack Ma',
    value: 'jack'
  },
  {
    label: 'Tom Liu',
    value: 'tom'
  }
])

// 基本用法
const open1 = ref<boolean>(false)
function onAfterOpenChange(val: boolean) {
  console.log('open', val)
}
function onClose1() {
  open1.value = false
}

// 自定义位置
const open2 = ref<boolean>(false)
const placement2 = ref<DrawerProps['placement']>('right')
function onClose2() {
  open2.value = false
}

// 额外操作
const open3 = ref<boolean>(false)
const placement3 = ref<DrawerProps['placement']>('right')
function onClose3() {
  open3.value = false
}

// 渲染在当前 DOM
const open4 = ref<boolean>(false)
function onClose4() {
  open4.value = false
}

// 抽屉表单
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
function onClose5() {
  open5.value = false
}

// 多层抽屉
const open6 = ref<boolean>(false)
const innerOpen6 = ref<boolean>(false)
function onClose6() {
  open6.value = false
}

// 信息预览抽屉
const open7 = ref<boolean>(false)
// 列表数据为两条同名 Lily
const profileList = ['Lily', 'Lily']
function onClose7() {
  open7.value = false
}

// 预设宽度
const open8 = ref<boolean>(false)
const size8 = ref<DrawerProps['size']>('default')
function showDrawer8(val: DrawerProps['size']) {
  size8.value = val
  open8.value = true
}
function onClose8() {
  open8.value = false
}

// 抽屉页脚（项目特有）
const open9 = ref<boolean>(false)
const placement9 = ref<DrawerProps['placement']>('right')
function onClose9() {
  open9.value = false
}

// 自定义 header & body 样式
const open10 = ref<boolean>(false)
function onClose10() {
  open10.value = false
}
</script>
<template>
  <div>
    <h1>{{ $route.name }} {{ $route.meta.title }}</h1>
    <h2 class="mt30 mb10">基本用法</h2>
    <p class="mb10">基础抽屉，点击触发按钮抽屉从右滑出，点击遮罩区关闭</p>
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
      @close="onClose1"
    >
      <p>Some contents...</p>
      <p>Some contents...</p>
      <p>Some contents...</p>
    </Drawer>

    <h2 class="mt30 mb10">自定义位置</h2>
    <p class="mb10">自定义位置，点击触发按钮抽屉从相应的位置滑出，点击遮罩区关闭</p>
    <Radio v-model:value="placement2" :options="placementOptions" style="margin-right: 8px" />
    <Button type="primary" @click="open2 = true">Open</Button>
    <Drawer v-model:open="open2" title="Basic Drawer" :closable="false" :placement="placement2" @close="onClose2">
      <p>Some contents...</p>
      <p>Some contents...</p>
      <p>Some contents...</p>
    </Drawer>

    <h2 class="mt30 mb10">额外操作</h2>
    <p class="mb10">操作按钮建议放在抽屉的右上角，可以使用 <code>extra</code> 属性来实现</p>
    <Radio v-model:value="placement3" :options="placementOptions" style="margin-right: 8px" />
    <Button type="primary" @click="open3 = true">Open</Button>
    <Drawer v-model:open="open3" :width="500" title="Basic Drawer" :placement="placement3" @close="onClose3">
      <template #extra>
        <Button style="margin-right: 8px" @click="onClose3">Cancel</Button>
        <Button type="primary" @click="onClose3">Submit</Button>
      </template>
      <p>Some contents...</p>
      <p>Some contents...</p>
      <p>Some contents...</p>
    </Drawer>

    <h2 class="mt30 mb10">渲染在当前 DOM</h2>
    <p class="mb10">渲染在当前 DOM 里。自定义容器，查看 <code>getContainer</code></p>
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
        @close="onClose4"
      >
        <p>Some contents...</p>
      </Drawer>
    </div>

    <h2 class="mt30 mb10">抽屉表单</h2>
    <p class="mb10">在抽屉中使用表单</p>
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
      @close="onClose5"
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
          <Button @click="onClose5">Cancel</Button>
          <Button type="primary" @click="onClose5">Submit</Button>
        </Space>
      </template>
    </Drawer>

    <h2 class="mt30 mb10">多层抽屉</h2>
    <p class="mb10">在抽屉内打开新的抽屉，用以解决多分支任务的复杂状况</p>
    <Button type="primary" @click="open6 = true">Open</Button>
    <Drawer
      v-model:open="open6"
      title="Multi-level drawer"
      width="520"
      :closable="false"
      :footer-style="{ textAlign: 'right' }"
      @close="onClose6"
    >
      <Button type="primary" @click="innerOpen6 = true">Two-level drawer</Button>
      <Drawer v-model:open="innerOpen6" title="Two-level Drawer" width="320" :closable="false">
        <p>This is two-level drawer</p>
      </Drawer>
      <template #footer>
        <Button style="margin-right: 8px" @click="onClose6">Cancel</Button>
        <Button type="primary" @click="onClose6">Submit</Button>
      </template>
    </Drawer>

    <h2 class="mt30 mb10">信息预览抽屉</h2>
    <p class="mb10">需要快速预览对象概要时使用，点击遮罩区关闭</p>
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
    <Drawer v-model:open="open7" :width="640" placement="right" :closable="false" @close="onClose7">
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
          C / C + +, data structures, software engineering, operating systems, computer networks, databases, compiler
          theory, computer architecture, Microcomputer Principle and Interface Technology, Computer English, Java, ASP,
          etc.
        </DescriptionsItem>
      </Descriptions>
      <Divider />
      <p class="profile-label">Contacts</p>
      <Descriptions :column="2">
        <DescriptionsItem label="Email">themusecatcher@163.com</DescriptionsItem>
        <DescriptionsItem label="Phone Number">+86 181 0000 0000</DescriptionsItem>
        <DescriptionsItem label="Github">
          <a href="https://github.com/themusecatcher/vue-amazing-ui"> github.com/themusecatcher/vue-amazing-ui </a>
        </DescriptionsItem>
      </Descriptions>
    </Drawer>

    <h2 class="mt30 mb10">预设宽度</h2>
    <p class="mb10">
      抽屉的默认宽度为 <code>378px</code>，另外还提供一个大号抽屉 <code>736px</code>，可以用
      <code>size</code> 属性来设置
    </p>
    <Button type="primary" style="margin-right: 8px" @click="showDrawer8('default')">
      Open Default Size (378px)
    </Button>
    <Button type="primary" @click="showDrawer8('large')">Open Large Size (736px)</Button>
    <Drawer v-model:open="open8" title="Basic Drawer" :size="size8" @close="onClose8">
      <template #extra>
        <Button style="margin-right: 8px" @click="onClose8">Cancel</Button>
        <Button type="primary" @click="onClose8">Submit</Button>
      </template>
      <p>Some contents...</p>
      <p>Some contents...</p>
      <p>Some contents...</p>
    </Drawer>

    <h2 class="mt30 mb10">抽屉页脚</h2>
    <Radio v-model:value="placement9" :options="placementOptions" style="margin-right: 8px" />
    <Button type="primary" @click="open9 = true">Open</Button>
    <Drawer
      v-model:open="open9"
      title="Basic Drawer"
      :placement="placement9"
      :footer-style="{ textAlign: 'right' }"
      @close="onClose9"
    >
      <p>Some contents...</p>
      <p>Some contents...</p>
      <p>Some contents...</p>
      <template #footer>
        <Button style="margin-right: 8px" @click="onClose9">Cancel</Button>
        <Button type="primary" @click="onClose9">Submit</Button>
      </template>
    </Drawer>

    <h2 class="mt30 mb10">自定义 header & body 样式</h2>
    <p class="mb10">
      通过 <code>header-style</code> 与 <code>body-style</code> 自定义抽屉头部与内容区域样式，并设置背景色便于观察
    </p>
    <Button type="primary" @click="open10 = true">Open</Button>
    <Drawer
      v-model:open="open10"
      :closable="false"
      title="Basic Drawer"
      :header-style="{ textAlign: 'center', background: '#e6f4ff' }"
      :body-style="{ textAlign: 'center' }"
      @close="onClose10"
    >
      <p>Some contents...</p>
      <p>Some contents...</p>
      <p>Some contents...</p>
    </Drawer>
  </div>
</template>
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
