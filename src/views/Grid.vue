<template>
  <div>
    <h1>Grid 栅格</h1>
    <h2 class="mt30 mb10">基本使用</h2>
    <Row class="row">
      <Col :span="24">col</Col>
    </Row>
    <Row class="row">
      <Col :span="12">col-12</Col>
      <Col :span="12">col-12</Col>
    </Row>
    <Row class="row">
      <Col :span="8">col-8</Col>
      <Col :span="8">col-8</Col>
      <Col :span="8">col-8</Col>
    </Row>
    <Row class="row">
      <Col :span="6">col-6</Col>
      <Col :span="6">col-6</Col>
      <Col :span="6">col-6</Col>
      <Col :span="6">col-6</Col>
    </Row>
    <h2 class="mt30 mb10">水平区块间隔</h2>
    <Row :gutter="16">
      <Col class="gutter-row" :span="6">
        <div class="gutter-box">col-6</div>
      </Col>
      <Col class="gutter-row" :span="6">
        <div class="gutter-box">col-6</div>
      </Col>
      <Col class="gutter-row" :span="6">
        <div class="gutter-box">col-6</div>
      </Col>
      <Col class="gutter-row" :span="6">
        <div class="gutter-box">col-6</div>
      </Col>
    </Row>
    <h2 class="mt30 mb10">响应式区块间隔</h2>
    <Row :gutter="{ xs: 8, sm: 16, md: 24, lg: 32 }">
      <Col class="gutter-row" :span="6">
        <div class="gutter-box">col-6</div>
      </Col>
      <Col class="gutter-row" :span="6">
        <div class="gutter-box">col-6</div>
      </Col>
      <Col class="gutter-row" :span="6">
        <div class="gutter-box">col-6</div>
      </Col>
      <Col class="gutter-row" :span="6">
        <div class="gutter-box">col-6</div>
      </Col>
    </Row>
    <h2 class="mt30 mb10">垂直区块间隔</h2>
    <Row :gutter="[16, 24]">
      <Col class="gutter-row" :span="6">
        <div class="gutter-box">col-6</div>
      </Col>
      <Col class="gutter-row" :span="6">
        <div class="gutter-box">col-6</div>
      </Col>
      <Col class="gutter-row" :span="6">
        <div class="gutter-box">col-6</div>
      </Col>
      <Col class="gutter-row" :span="6">
        <div class="gutter-box">col-6</div>
      </Col>
      <Col class="gutter-row" :span="6">
        <div class="gutter-box">col-6</div>
      </Col>
      <Col class="gutter-row" :span="6">
        <div class="gutter-box">col-6</div>
      </Col>
      <Col class="gutter-row" :span="6">
        <div class="gutter-box">col-6</div>
      </Col>
      <Col class="gutter-row" :span="6">
        <div class="gutter-box">col-6</div>
      </Col>
    </Row>
  </div>
</template>
<style lang="less" scoped>
.row {
  .m-col {
    padding: 16px 0;
    background: #1677ff;
  }
  :deep(:nth-child(2n+1)) {
    background: #1677ffbf;
  }
}
.gutter-box {
  background: #0092ff;
  padding: 8px 0;
}
</style>
