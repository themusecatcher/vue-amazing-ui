<script setup lang="ts">
function onClose (e: MouseEvent) {
  console.log(e, 'I was closed.')
}
</script>
<template>
  <div style="width: 425px;">
    <h1>Alert 警告提示</h1>
    <h2 class="mt30 mb10">共有四种样式 success、info、warn、error</h2>
    <Space direction="vertical" style="width: 100%">
      <Alert message="Info Text" />
      <Alert message="Success Text" type="success" />
      <Alert message="Warn Text" type="warn" />
      <Alert message="Error Text" type="error" />
    </Space>
    <h2 class="mt30 mb10">可关闭的警告提示</h2>
    <Space direction="vertical" style="width: 100%">
      <Alert
        message="Warning Text Warning Text Warning Text Warning Text Warning Text Warning Text Warning Text"
        type="warn"
        closable
        @close="onClose"
      />
      <Alert
        message="Error Text"
        description="Error Description Error Description Error Description Error Description Error Description Error Description"
        type="error"
        closable
        @close="onClose"
      />
    </Space>
    <h2 class="mt30 mb10">辅助性文字介绍</h2>
    <Space direction="vertical" style="width: 100%">
      <Alert message="Success Text" type="success">
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
        message="Warn Text"
        description="Warning Description Warning Description Warning Description Warning Description"
        type="warn"
      />
      <Alert
        message="Error Text"
        description="Error Description Error Description Error Description Error Description"
        type="error"
      />
    </Space>
    <h2 class="mt30 mb10">辅助图标</h2>
    <Space direction="vertical" style="width: 100%">
      <Alert message="Success Tips" type="success" show-icon />
      <Alert message="Informational Notes" type="info" show-icon />
      <Alert message="Warning" type="warning" show-icon />
      <Alert message="Error" type="error" show-icon />
      <Alert
        message="Success Tips"
        description="Detailed description and advices about successful copywriting."
        type="success"
        show-icon
        closable
      />
      <Alert
        message="Informational Notes"
        description="Additional description and informations about copywriting."
        type="info"
        show-icon
      />
      <Alert
        message="Warning"
        description="This is a warning notice about copywriting."
        type="warn"
        show-icon
      />
      <Alert
        message="Error"
        description="This is an error message about copywriting."
        type="error"
        show-icon
      />
    </Space>
  </div>
</template>
