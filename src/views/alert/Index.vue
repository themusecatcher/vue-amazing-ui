<script setup lang="ts">
import { AlertFilled, AlertOutlined, SmileOutlined } from '@ant-design/icons-vue'
function onClose(e: Event) {
  console.log(e, 'I was closed.')
}
</script>
<template>
  <div style="width: 425px">
    <h1>{{ $route.name }} {{ $route.meta.title }}</h1>
    <h2 class="mt30 mb10">基本使用</h2>
    <Alert message="Default Text" />
    <h2 class="mt30 mb10">不同类型</h2>
    <Flex vertical>
      <Alert message="Info Text" type="info" />
      <Alert message="Success Text" type="success" />
      <Alert message="Warning Text" type="warning" />
      <Alert message="Error Text" type="error" />
    </Flex>
    <h2 class="mt30 mb10">无边框</h2>
    <Flex vertical>
      <Alert message="Default Text" :bordered="false" />
      <Alert message="Info Text" type="info" :bordered="false" />
      <Alert message="Success Text" type="success" :bordered="false" />
      <Alert message="Warning Text" type="warning" :bordered="false" />
      <Alert message="Error Text" type="error" :bordered="false" />
    </Flex>
    <h2 class="mt30 mb10">可关闭</h2>
    <Flex vertical>
      <Alert
        message="Warning Text Warning Text Warning Text Warning Text Warning Text Warning Text Warning Text"
        type="warning"
        closable
        @close="onClose"
      />
      <Alert
        message="Error Text"
        description="Error Description Error Description Error Description Error Description Error Description"
        type="error"
        closable
        @close="onClose"
      />
      <Alert
        :bordered="false"
        message="Info Text Info Text Info Text Info Text Info Text Info Text Info Text"
        type="info"
        closable
        @close="onClose"
      />
      <Alert
        :bordered="false"
        message="Success Text"
        description="Success Description Success Description Success Description Success Description"
        type="success"
        closable
        @close="onClose"
      />
    </Flex>
    <h2 class="mt30 mb10">辅助性文字介绍</h2>
    <Flex vertical>
      <Alert
        message="Default Text"
        description="Default Description Default Description Default Description Default Description"
      />
      <Alert type="success">
        Success Text
        <template #description>
          <p>
            Success Description
            <span style="color: red">Success</span>
            Description Success Description
          </p>
        </template>
      </Alert>
      <Alert
        message="Info Text"
        description="Info Description Info Description Info Description Info Description"
        type="info"
      />
      <Alert
        message="Warning Text"
        description="Warning Description Warning Description Warning Description Warning Description"
        type="warning"
      />
      <Alert
        message="Error Text"
        description="Error Description Error Description Error Description Error Description"
        type="error"
      />
    </Flex>
    <h2 class="mt30 mb10">辅助图标</h2>
    <Flex vertical>
      <Alert message="Default Tips" show-icon>
        <template #icon>
          <AlertFilled />
        </template>
      </Alert>
      <Alert message="Success Tips" type="success" show-icon />
      <Alert message="Informational Notes" type="info" show-icon />
      <Alert message="Warning" type="warning" show-icon />
      <Alert message="Error" type="error" show-icon />
      <Alert
        message="Default Tips"
        description="Detailed description and advices about successful copywriting."
        show-icon
      >
        <template #icon>
          <AlertOutlined />
        </template>
      </Alert>
      <Alert
        message="Success Tips"
        description="Detailed description and advices about successful copywriting."
        type="success"
        show-icon
      />
      <Alert
        message="Informational Notes"
        description="Additional description and informations about copywriting."
        type="info"
        show-icon
      />
      <Alert message="Warning" description="This is a warning notice about copywriting." type="warning" show-icon />
      <Alert message="Error" description="This is an error message about copywriting." type="error" show-icon />
    </Flex>
    <h2 class="mt30 mb10">自定义图标</h2>
    <Flex vertical>
      <Alert type="success" show-icon>
        <template #icon>
          <SmileOutlined />
        </template>
        Success Tips
      </Alert>
      <Alert type="info" show-icon>
        <template #icon>
          <SmileOutlined />
        </template>
        Informational Notes
      </Alert>
      <Alert type="warning" show-icon>
        <template #icon>
          <SmileOutlined />
        </template>
        Warning
      </Alert>
      <Alert type="error" show-icon>
        <template #icon>
          <SmileOutlined />
        </template>
        Error
      </Alert>
      <Alert type="success" show-icon>
        <template #icon>
          <Avatar size="small" src="https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.1.2/1.jpg" />
        </template>
        Success
      </Alert>
      <Alert
        message="Success Tips"
        description="Detailed description and advices about successful copywriting."
        type="success"
        show-icon
      >
        <template #icon>
          <smile-outlined />
        </template>
      </Alert>
      <Alert
        message="Informational Notes"
        description="Additional description and informations about copywriting."
        type="info"
        show-icon
      >
        <template #icon>
          <smile-outlined />
        </template>
      </Alert>
      <Alert message="Warning" description="This is a warning notice about copywriting." type="warning" show-icon>
        <template #icon>
          <smile-outlined />
        </template>
      </Alert>
      <Alert message="Error" description="This is an error message about copywriting." type="error" show-icon>
        <template #icon>
          <smile-outlined />
        </template>
      </Alert>
      <Alert
        message="Info Tips"
        description="Detailed description and advices about successful copywriting."
        type="info"
        show-icon
      >
        <template #icon>
          <Avatar size="large" src="https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.1.2/2.jpg" />
        </template>
      </Alert>
    </Flex>
    <h2 class="mt30 mb10">自定义关闭文字</h2>
    <Alert message="Info Text" type="info" closable close-text="Close Now" @close="onClose" />
    <h2 class="mt30 mb10">自定义操作项</h2>
    <Flex vertical>
      <Alert message="Success Tips" type="success" show-icon closable>
        <template #actions>
          <Button size="small" type="text">UNDO</Button>
        </template>
      </Alert>
      <Alert
        message="Error Text"
        show-icon
        description="Error Description Error Description Error Description Error Description"
        type="error"
      >
        <template #actions>
          <Button size="small" type="danger" ghost>Detail</Button>
        </template>
      </Alert>
      <Alert message="Warning Text" type="warning" closable>
        <template #actions>
          <Button size="small" type="text">Done</Button>
        </template>
      </Alert>
      <Alert
        message="Info Text"
        description="Info Description Info Description Info Description Info Description"
        type="info"
        closable
      >
        <template #actions>
          <Space vertical gap="small" align="center">
            <Button size="small" type="primary">Accept</Button>
            <Button size="small" type="danger" ghost>Decline</Button>
          </Space>
        </template>
      </Alert>
    </Flex>
  </div>
</template>
