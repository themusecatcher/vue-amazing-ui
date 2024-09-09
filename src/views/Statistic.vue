<script setup lang="ts">
import { LikeOutlined, ArrowUpOutlined, ArrowDownOutlined } from '@ant-design/icons-vue'
function formatter(value: string): string {
  console.log('value', value)
  return '1年有 ' + value + ' 天'
}
</script>
<template>
  <div>
    <h1>{{ $route.name }} {{ $route.meta.title }}</h1>
    <h2 class="mt30 mb10">基本使用</h2>
    <Row>
      <Col :span="12">
        <Statistic title="Active Users" :value="112893" />
      </Col>
      <Col :span="12">
        <Statistic title="Account Balance (CNY)" :precision="2" :value="112893" />
      </Col>
    </Row>
    <h2 class="mt30 mb10">添加前缀和后缀</h2>
    <Row :gutter="16">
      <Col :span="12">
        <Statistic title="Feedback" :value="1128">
          <template #suffix>
            <LikeOutlined />
          </template>
        </Statistic>
      </Col>
      <Col :span="12">
        <Statistic title="Unmerged" :value="90">
          <template #suffix>
            <span>%</span>
          </template>
        </Statistic>
      </Col>
    </Row>
    <h2 class="mt30 mb10">在卡片中使用</h2>
    <div style="width: 425px; background: #ececec; padding: 30px; border-radius: 8px">
      <Row :gutter="16">
        <Col :span="12">
          <Card>
            <Statistic
              title="Feedback"
              :value="11.28"
              :precision="2"
              suffix="%"
              :value-style="{ color: '#3f8600' }"
              style="margin-right: 50px"
            >
              <template #prefix>
                <ArrowUpOutlined />
              </template>
            </Statistic>
          </Card>
        </Col>
        <Col :span="12">
          <Card>
            <Statistic title="Idle" :value="9.3" :precision="2" suffix="%" :value-style="{ color: '#cf1322' }">
              <template #prefix>
                <ArrowDownOutlined />
              </template>
            </Statistic>
          </Card>
        </Col>
      </Row>
    </div>
    <h2 class="mt30 mb10">自定义数值样式</h2>
    <Statistic title="Worth" :value="1600000" :value-style="{ color: '#3f8600' }" prefix="$" suffix="/ 天" />
    <h2 class="mt30 mb10">设置数值精度</h2>
    <Statistic title="Precision" :value="100000000.1" :precision="2" />
    <h2 class="mt30 mb10">自定义千分位标识符</h2>
    <Statistic title="Precision" :value="100000000.1" separator=";" :precision="3" />
    <h2 class="mt30 mb10">自定义数值展示</h2>
    <Statistic title="Formatter" :value="365" :value-style="{ color: '#1677ff' }" :formatter="formatter" />
  </div>
</template>
