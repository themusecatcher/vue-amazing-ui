# ✨ 成为赞助者

<GlobalElement hide-sponsor />

`Vue Amazing UI` 是采用 `MIT` 许可的开源项目，使用完全免费。组件库及文档所有工作均由作者一人完成，开发迭代过程实属不易...为了组件库的健康可持续发展，非常期望能获得您的支持与赞助。

<script setup lang="ts">
import { ref, h } from 'vue'
import { HeartFilled, WechatOutlined, AlipayOutlined, UserOutlined } from '@ant-design/icons-vue'
import { useMediaQuery } from 'vue-amazing-ui'
import WeChat from '/wechat.jpg'
import Alipay from '/alipay.jpg'
import Avatar0 from '/avatar.png'
import Avatar1 from '/avatar_1.jpeg'
import Avatar2 from '/avatar_2.jpg'
import Avatar3 from '/avatar_3.png'
import Avatar4 from '/avatar_4.png'
import Avatar5 from '/avatar_5.png'
import Avatar6 from '/avatar_6.jpg'
const { match: isMobile } = useMediaQuery('(max-width: 768px)')
const sponsorItem = {
  title: '如果觉得 Vue Amazing UI 有用、有趣，或者对您有帮助，欢迎对作者表示下支持，非常感谢 ❤️'
}
const sponsorOptions = ['WeChat', 'Alipay']
const sponsorType = ref('WeChat')
const QRCodes = [
  {
    src: WeChat,
    // src: 'https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.0.8/wechat.jpg',
    name: 'WeChat'
  },
  {
    src: Alipay,
    // src: 'https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.0.8/alipay.jpg',
    name: 'Alipay'
  }
]
</script>

## 赞助

<TextScroll
  v-if="!isMobile"
  :items="sponsorItem"
  single
  :gap="12"
  :item-style="{ fontSize: '18px', fontWeight: 500, color: 'rgba(0, 0, 0, 0.88)' }"
/> <Alert v-else style="background-color: #fff; box-shadow: 0 0 5px #d3d3d3;">

  <p style="font-size: 18px; font-weight: 500; color: rgba(0, 0, 0, 0.88);">
    {{ sponsorItem.title }}
  </p>
</Alert>

<br/>

<div v-if="isMobile">
  <Segmented size="large" block style="padding: 4px; margin: 0 auto;" v-model:value="sponsorType" :options="sponsorOptions">
    <template #label="{ label }">
      <span v-if="label === 'WeChat'" style="font-weight: 500; color: #07c160;">
        <WechatOutlined style="fill: currentColor;" /> {{ label }}
      </span>
      <span v-if="label === 'Alipay'" style="font-weight: 500; color: #1677ff;">
        <AlipayOutlined style="fill: currentColor;" /> {{ label }}
      </span>
    </template>
  </Segmented>
  <Card :width="248" style="background: transparent; margin: 24px auto 32px;">
    <img v-show="sponsorType === 'WeChat'" class="qrcode-image" :src="WeChat" />
    <img v-show="sponsorType === 'Alipay'" class="qrcode-image" :src="Alipay" />
  </Card>
</div>
<Card v-else :body-style="{ position: 'relative' }" style="background: transparent; margin-bottom: 32px;">
  <Tag class="wechat-tag" color="#07c160" size="large" :bordered="false">
    <template #icon>
      <WechatOutlined />
    </template>
    WeChat
  </Tag>
  <Tag class="alipay-tag" color="#1677ff" size="large" :bordered="false">
    <template #icon>
      <AlipayOutlined />
    </template>
    Alipay
  </Tag>
  <Image
    class="sponsor-image"
    :src="QRCodes"
    loop
    :width="240"
    :height="240"
    :bordered="false"
    :space-props="{
      style: {
        display: 'flex',
        justifyContent: 'space-between'
      }
    }"
  />
</Card>

<Alert type="info" :bordered="false" show-icon>
  <template #icon>
    <HeartFilled style="font-size: 36px; color: #cf1322;" />
  </template>
  <GradientText
    :size="24"
    :weight="700"
    :gradient="{
      deg: '90deg',
      from: '#09c8ce',
      to: '#eb2f96'
    }"
  >
    Vue Amazing UI to YOU：
  </GradientText>
  <template #description>
    <span style="font-size: 18px; font-weight: 500;">
      • 您的支持和赞助对我来说至关重要！
      <br/>
      • 真诚感谢每一位现有的和未来的支持者和赞助者！
      <br/>
      • 生命不息，迭代不止！未来，我将继续努力！
    </span>
  </template>
</Alert>

<style scoped lang="less">
.qrcode-image {
  width: 200px;
  height: 200px;
  vertical-align: bottom;
}
.wechat-tag {
  font-size: 16px;
  font-weight: 500;
  height: 36px;
  padding-inline: 12px;
  position: absolute;
  left: 144px;
  transform: translateX(-50%);
}
.alipay-tag {
  font-size: 16px;
  font-weight: 500;
  height: 36px;
  padding-inline: 12px;
  position: absolute;
  right: 144px;
  transform: translateX(50%);
}
.sponsor-image {
  display: block;
  margin-top: 48px;
}
</style>

## 赞助者 🫡

所有的赞助者都将出现在此处，非常感谢你们的支持与赞助 ❤️❤️

_可自定义展示您的个人头像，名称以及主页的跳转地址（只需将这些信息发送至右下角的邮箱，稍待片刻 😉）_

<br/>

<Space gap="small">
  <Tooltip>
    <template #tooltip>
      <div style="text-align: center">
        GitHub
        <br/>
        @themusecatcher
      </div>
    </template>
    <Avatar :size="36" :src="Avatar0" href="https://github.com/themusecatcher" target="_blank" />
  </Tooltip>
  <Tooltip>
    <template #tooltip>
      <div style="text-align: center">
        WeChat
        <br/>
        @Ant
      </div>
    </template>
    <Avatar :size="36" :src="Avatar1" />
  </Tooltip>
  <Tooltip>
    <template #tooltip>
      <div style="text-align: center">
        GitHub
        <br/>
        @nizhensh-i
      </div>
    </template>
    <Avatar :size="36" :src="Avatar2" href="https://github.com/nizhensh-i" target="_blank" />
  </Tooltip>
  <Tooltip>
    <template #tooltip>
      <div style="text-align: center">
        GitHub
        <br/>
        @beijin1949
      </div>
    </template>
    <Avatar style="border-color: rgba(0, 0, 0, 0.25)" color="#fff" :size="36" :src="Avatar3" href="https://github.com/beijin1949" target="_blank" />
  </Tooltip>
  <Tooltip>
    <template #tooltip>
      <div style="text-align: center">
        GitHub
        <br/>
        @JinZemin
      </div>
    </template>
    <Avatar :size="36" :src="Avatar4" href="https://github.com/JinZemin" target="_blank" />
  </Tooltip>
  <Tooltip>
    <template #tooltip>
      <div style="text-align: center">
        GitHub
        <br/>
        @ye5840
      </div>
    </template>
    <Avatar :size="36" :src="Avatar5" href="https://github.com/ye5840" target="_blank" />
  </Tooltip>
  <Tooltip>
    <template #tooltip>
      <div style="text-align: center">
        WeChat
        <br/>
        @**洋
      </div>
    </template>
    <Avatar :size="36" :src="Avatar6" />
  </Tooltip>
  <Tooltip>
    <template #tooltip>
      <div style="text-align: center">
        WeChat
        <br/>
        @*梦
      </div>
    </template>
    <Avatar :size="36" :icon="() => h(UserOutlined)" />
  </Tooltip>
  <Tooltip>
    <template #tooltip>
      <div style="text-align: center">
        Alipay
        <br/>
        @**山
      </div>
    </template>
    <Avatar :size="36" :icon="() => h(UserOutlined)" />
  </Tooltip>
</Space>
