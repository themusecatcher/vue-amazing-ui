<script setup lang="ts">
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
            <svg
              focusable="false"
              class="u-svg"
              data-icon="like"
              width="1em"
              height="1em"
              fill="currentColor"
              aria-hidden="true"
              viewBox="64 64 896 896"
            >
              <path
                d="M885.9 533.7c16.8-22.2 26.1-49.4 26.1-77.7 0-44.9-25.1-87.4-65.5-111.1a67.67 67.67 0 00-34.3-9.3H572.4l6-122.9c1.4-29.7-9.1-57.9-29.5-79.4A106.62 106.62 0 00471 99.9c-52 0-98 35-111.8 85.1l-85.9 311H144c-17.7 0-32 14.3-32 32v364c0 17.7 14.3 32 32 32h601.3c9.2 0 18.2-1.8 26.5-5.4 47.6-20.3 78.3-66.8 78.3-118.4 0-12.6-1.8-25-5.4-37 16.8-22.2 26.1-49.4 26.1-77.7 0-12.6-1.8-25-5.4-37 16.8-22.2 26.1-49.4 26.1-77.7-.2-12.6-2-25.1-5.6-37.1zM184 852V568h81v284h-81zm636.4-353l-21.9 19 13.9 25.4a56.2 56.2 0 016.9 27.3c0 16.5-7.2 32.2-19.6 43l-21.9 19 13.9 25.4a56.2 56.2 0 016.9 27.3c0 16.5-7.2 32.2-19.6 43l-21.9 19 13.9 25.4a56.2 56.2 0 016.9 27.3c0 22.4-13.2 42.6-33.6 51.8H329V564.8l99.5-360.5a44.1 44.1 0 0142.2-32.3c7.6 0 15.1 2.2 21.1 6.7 9.9 7.4 15.2 18.6 14.6 30.5l-9.6 198.4h314.4C829 418.5 840 436.9 840 456c0 16.5-7.2 32.1-19.6 43z"
              ></path>
            </svg>
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
    <div style="width: 425px; background: #ececec; padding: 30px">
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
                <svg
                  focusable="false"
                  class="u-svg"
                  data-icon="arrow-up"
                  width="1em"
                  height="1em"
                  fill="currentColor"
                  aria-hidden="true"
                  viewBox="64 64 896 896"
                >
                  <path
                    d="M868 545.5L536.1 163a31.96 31.96 0 00-48.3 0L156 545.5a7.97 7.97 0 006 13.2h81c4.6 0 9-2 12.1-5.5L474 300.9V864c0 4.4 3.6 8 8 8h60c4.4 0 8-3.6 8-8V300.9l218.9 252.3c3 3.5 7.4 5.5 12.1 5.5h81c6.8 0 10.5-8 6-13.2z"
                  ></path>
                </svg>
              </template>
            </Statistic>
          </Card>
        </Col>
        <Col :span="12">
          <Card>
            <Statistic title="Idle" :value="9.3" :precision="2" suffix="%" :value-style="{ color: '#cf1322' }">
              <template #prefix>
                <svg
                  focusable="false"
                  class="u-svg"
                  data-icon="arrow-down"
                  width="1em"
                  height="1em"
                  fill="currentColor"
                  aria-hidden="true"
                  viewBox="64 64 896 896"
                >
                  <path
                    d="M862 465.3h-81c-4.6 0-9 2-12.1 5.5L550 723.1V160c0-4.4-3.6-8-8-8h-60c-4.4 0-8 3.6-8 8v563.1L255.1 470.8c-3-3.5-7.4-5.5-12.1-5.5h-81c-6.8 0-10.5 8.1-6 13.2L487.9 861a31.96 31.96 0 0048.3 0L868 478.5c4.5-5.2.8-13.2-6-13.2z"
                  ></path>
                </svg>
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
<style lang="less" scoped>
.u-svg {
  display: inline-flex;
  align-items: center;
  color: inherit;
  text-align: center;
  vertical-align: -0.125em;
}
</style>
