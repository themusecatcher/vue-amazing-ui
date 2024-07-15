<template>
  <div>
    <h1>{{ $route.name }} {{ $route.meta.title }}</h1>
    <h2 class="mt30 mb10">基本使用</h2>
    <Space vertical>
      <GradientText>basic</GradientText>
      <GradientText type="info">info</GradientText>
      <GradientText type="success">success</GradientText>
      <GradientText type="warning">warning</GradientText>
      <GradientText type="error">error</GradientText>
    </Space>
    <h2 class="mt30 mb10">文字大小</h2>
    <Space vertical>
      <GradientText :size="36" type="info">Live Forever</GradientText>
      <GradientText :size="36" type="error">Live Forever</GradientText>
      <GradientText :size="24" type="warning">Married with Children</GradientText>
      <GradientText :size="24" type="success">Back in the USSR</GradientText>
    </Space>
    <h2 class="mt30 mb10">自定义颜色</h2>
    <Space vertical>
      <GradientText
        :size="24"
        :gradient="{
          from: 'rgb(85, 85, 85)',
          to: 'rgb(170, 170, 170)'
        }"
        >定制颜色</GradientText
      >
      <GradientText
        :size="24"
        :gradient="{
          deg: 180,
          from: 'rgb(85, 85, 85)',
          to: 'rgb(170, 170, 170)'
        }"
        >定制颜色</GradientText
      >
      <GradientText
        :size="28"
        :gradient="{
          deg: '90deg',
          from: '#09c8ce',
          to: '#eb2f96'
        }"
        >和标题一样的颜色</GradientText
      >
      <GradientText :size="24" gradient="linear-gradient(90deg, red 0%, green 50%, blue 100%)">瞎写的颜色</GradientText>
    </Space>
  </div>
</template>
