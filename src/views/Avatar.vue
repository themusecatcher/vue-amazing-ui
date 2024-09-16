<script setup lang="ts">
import { h } from 'vue'
import { UserOutlined, TeamOutlined, SketchOutlined } from '@ant-design/icons-vue'
</script>
<template>
  <div>
    <h1>{{ $route.name }} {{ $route.meta.title }}</h1>
    <h2 class="mt30 mb10">基本使用</h2>
    <Space vertical>
      <Space align="center">
        <Avatar :size="64">
          <template #icon>
            <UserOutlined />
          </template>
        </Avatar>
        <Avatar size="large">
          <template #icon>
            <UserOutlined />
          </template>
        </Avatar>
        <Avatar>
          <template #icon>
            <UserOutlined />
          </template>
        </Avatar>
        <Avatar size="small">
          <template #icon>
            <UserOutlined />
          </template>
        </Avatar>
      </Space>
      <Space align="center">
        <Avatar shape="square" :size="64">
          <template #icon>
            <UserOutlined />
          </template>
        </Avatar>
        <Avatar shape="square" size="large">
          <template #icon>
            <UserOutlined />
          </template>
        </Avatar>
        <Avatar shape="square">
          <template #icon>
            <UserOutlined />
          </template>
        </Avatar>
        <Avatar shape="square" size="small">
          <template #icon>
            <UserOutlined />
          </template>
        </Avatar>
      </Space>
    </Space>
    <h2 class="mt30 mb10">自定义图标类型</h2>
    <Space align="center">
      <Avatar :icon="() => h(TeamOutlined)" />
      <Avatar>
        <template #icon>
          <UserOutlined />
        </template>
      </Avatar>
      <Avatar>U</Avatar>
      <Avatar :size="40">USER</Avatar>
      <Avatar :size="40" src="https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.0.5/1.jpg" />
      <Avatar style="color: #f56a00; background-color: #fde3cf">U</Avatar>
      <Avatar style="background-color: #87d068">
        <template #icon>
          <UserOutlined />
        </template>
      </Avatar>
    </Space>
    <h2 class="mt30 mb10">带徽标的头像</h2>
    <Space>
      <Badge :count="1">
        <Avatar shape="square">
          <template #icon>
            <UserOutlined />
          </template>
        </Avatar>
      </Badge>
      <Badge dot>
        <Avatar shape="square">
          <template #icon>
            <UserOutlined />
          </template>
        </Avatar>
      </Badge>
    </Space>
    <h2 class="mt30 mb10">响应式尺寸</h2>
    <Avatar :size="{ xs: 24, sm: 32, md: 40, lg: 64, xl: 80, xxl: 100 }">
      <template #icon>
        <SketchOutlined />
      </template>
    </Avatar>
  </div>
</template>
