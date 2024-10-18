<template>
  <div>
    <h1>{{ $route.name }} {{ $route.meta.title }}</h1>
    <h2 class="mt30 mb10">基本使用</h2>
    <Space gap="small" vertical>
      <GradientText>basic</GradientText>
      <GradientText type="info">info</GradientText>
      <GradientText type="success">success</GradientText>
      <GradientText type="warning">warning</GradientText>
      <GradientText type="error">error</GradientText>
    </Space>
    <h2 class="mt30 mb10">文字样式</h2>
    <Space gap="small" vertical>
      <GradientText type="info" :size="36" :weight="500">Live Forever</GradientText>
      <GradientText type="error" :size="36" :weight="600">Live Forever</GradientText>
      <GradientText type="warning" :size="24" :weight="700">Married with Children</GradientText>
      <GradientText type="success" :size="24" :weight="800">Back in the USSR</GradientText>
    </Space>
    <h2 class="mt30 mb10">自定义颜色</h2>
    <Space gap="small" vertical>
      <GradientText
        :size="24"
        :weight="500"
        :gradient="{
          from: 'rgb(85, 85, 85)',
          to: 'rgb(170, 170, 170)'
        }"
        >定制颜色</GradientText
      >
      <GradientText
        :size="24"
        :weight="500"
        :gradient="{
          deg: 180,
          from: 'rgb(85, 85, 85)',
          to: 'rgb(170, 170, 170)'
        }"
        >定制颜色</GradientText
      >
      <GradientText
        :size="28"
        :weight="500"
        :gradient="{
          deg: '90deg',
          from: '#09c8ce',
          to: '#eb2f96'
        }"
        >和标题一样的颜色</GradientText
      >
      <GradientText :size="24" :weight="500" gradient="linear-gradient(90deg, #1677ff 0%, lime 50%, #ff6900 100%)"
        >瞎写的颜色</GradientText
      >
    </Space>
  </div>
</template>
