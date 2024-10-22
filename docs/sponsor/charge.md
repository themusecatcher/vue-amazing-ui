# 充电 Charge Me

<BackTop />
<Watermark fullscreen content="Vue Amazing UI" />

*我的成长与可持续发展，离不开您的支持与赞助 ❤️❤️*

<script setup lang="ts">
import { ref } from 'vue'
import { HeartFilled, HeartOutlined } from '@ant-design/icons-vue'
const sponsorText = {
  title: '如果您 Vue Amazing UI 有用，您可以请作者喝杯茶表示支持，非常感谢❤️🙏❤️'
}
const QRCodes = [
  {
    src: 'https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.0.8/wechat.jpg',
    name: 'WeChat'
  },
  {
    src: 'https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.0.8/alipay.jpg',
    name: 'Alipay'
  }
]
</script>

## Sponsor

<TextScroll
  :scrollText="sponsorText"
  single
  :height="54"
  :board-style="{ backgroundColor: '#e6f4ff' }"
  :text-style="{ fontSize: '20px', fontWeight: 500, color: 'rgba(0, 0, 0, 0.88)' }"
/>

<br/>

<Card :body-style="{ position: 'relative' }">
  <Tag class="wechat-tag" color="#07c160" size="large" :bordered="false">WeChat</Tag>
  <Tag class="alipay-tag" color="#1677ff" size="large" :bordered="false">Alipay</Tag>
  <Image
    class="sponsor-image"
    :src="QRCodes"
    loop
    :width="190"
    :height="190"
    :bordered="false"
    :space-props="{
      style: {
        display: 'flex',
        justifyContent: 'space-between'
      }
    }"
  />
</Card>

<br/>

<Alert type="info" :bordered="false" show-icon>
  <template #icon>
    <HeartFilled style="font-size: 32px; color: #d4380d;" />
  </template>
  <span style="font-size: 20px; font-weight: 600;">Vue Amazing UI to YOU ：</span>
  <template #description>
    <span style="font-size: 16px;">
      您的支持和赞助对我来说至关重要！
      <br/>
      真诚感谢每一位现有的和未来的支持者和赞助者！
    </span>
  </template>
</Alert>

<style scoped lang="less">
.wechat-tag {
  font-size: 16px;
  height: 36px;
  padding-inline: 12px;
  position: absolute;
  left: 119px;
  transform: translateX(-50%);
}
.alipay-tag {
  font-size: 16px;
  height: 36px;
  padding-inline: 12px;
  position: absolute;
  right: 119px;
  transform: translateX(50%);
}
.sponsor-image {
  display: block;
  margin-top: 48px;
}
</style>

## 赞助者

<!-- 虚位以待... -->

<Space gap="small">
  <Tooltip tooltip="themusecatcher@github">
    <Avatar :size="36" src="https://github.com/themusecatcher.png" href="https://github.com/themusecatcher" target="_blank" />
  </Tooltip>
</Space>
