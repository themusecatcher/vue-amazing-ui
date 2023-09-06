<script setup lang="ts">
import { ref } from 'vue'

function onStarted () {
  console.log('started')
}
function onFinished () {
  console.log('finished')
}
const animationRef = ref()
function onClick () {
  animationRef.value.play()
}
</script>
<template>
  <div>
    <h1>NumberAnimation 数值动画</h1>
    <h2 class="mt30 mb10">基本使用</h2>
    <Row>
      <Col :span="12">
        <Statistic title="一个小目标">
          <NumberAnimation :to="100000000.12345" />
        </Statistic>
      </Col>
      <Col :span="12">
        <Statistic title="一个小目标">
          <NumberAnimation :to="100000000.12345" separator="" />
        </Statistic>
      </Col>
    </Row>
    <h2 class="mt30 mb10">精度</h2>
    <Row>
      <Col :span="12">
        <Statistic title="一个小目标">
          <NumberAnimation :from="0.00" :to="100000000.12345" :precision="2" />
        </Statistic>
      </Col>
      <Col :span="12">
        <Statistic title="一个小目标">
          <NumberAnimation :to="100000000.12345" :precision="3"/>
        </Statistic>
      </Col>
    </Row>
    <h2 class="mt30 mb10">自定义前缀 & 后缀</h2>
    <Row>
      <Col :span="12">
        <Statistic title="一个小目标">
          <NumberAnimation
            prefix="$"
            :from="0"
            :to="100000000" />
        </Statistic>
      </Col>
      <Col :span="12">
        <Statistic title="一个小目标">
          <NumberAnimation
            :from="0"
            :to="100000000"
            suffix="元" />
        </Statistic>
      </Col>
    </Row>
    <h2 class="mt30 mb10">自定义样式</h2>
    <Statistic title="一个小目标">
      <NumberAnimation :value-style="{fontSize: '30px', fontWeight: 600, color: '#d4380d'}" :from="0" :to="100000000"/>
    </Statistic>
    <h2 class="mt30 mb10">自定义播放和动画时间</h2>
    <Statistic title="一个小目标">
      <NumberAnimation
        ref="animationRef"
        :from="0"
        :to="100000000"
        :duration="5000"
        :precision="2"
        :autoplay="false"
        @started="onStarted"
        @finished="onFinished" />
    </Statistic>
    <Button @click="onClick">播放</Button>
  </div>
</template>
