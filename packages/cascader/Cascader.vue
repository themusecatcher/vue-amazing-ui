<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
// import { region } from 'apis/index'
  // model: {
  //   prop: 'address',
  //   event: 'model'
  // },
const props = defineProps({
    address: { // （v-model）省市区选中项
      type: Object,
      default: () => {
        return {}
      }
    },
    defaultAddress: { // 省市区初始值，在未设置address（v-model）时生效
      type: Object,
      default: () => {
        return {}
      }
    },
    changeOnSelect: { // 当此项为true时，点选每级菜单选项值（v-model）都会发生变化；否则只有选择区选项后选项值才会变化
      type: Boolean,
      default: false
    },
    zIndex: { // 下拉层级
      type: Number,
      default: 1
    },
    gap: { // 级联下拉框相互间隙宽度，单位px，默认8px
      type: Number,
      default: 8
    },
    provinceWidth: { // 省下拉宽度
      type: Number,
      default: null
    },
    cityWidth: { // 市下拉宽度
      type: Number,
      default: null
    },
    areaWidth: { // 区下拉宽度
      type: Number,
      default: null
    },
    width: { // 省市区统一宽度
      type: Number,
      default: 160
    },
    height: { // 下拉框高度
      type: Number,
      default: 36
    },
    provinceDisabled: { // 是否禁用省下拉
      type: Boolean,
      default: false
    },
    cityDisabled: { // 是否禁用市下拉
      type: Boolean,
      default: false
    },
    disabled: { // 省市区统一是否全部禁用
      type: Boolean,
      default: false
    },
    provincePlaceholder: { // 省占位文本
      type: String,
      default: '请选择省'
    },
    cityPlaceholder: { // 市占位文本
      type: String,
      default: '请选择市'
    },
    areaPlaceholder: { // 区占位文本
      type: String,
      default: '请选择区'
    },
    placeholder: { // 省市区统一占位文本
      type: String,
      default: '请选择'
    },
    num: { // 下拉面板最多能展示的下拉项数，超过后滚动显示
      type: Number,
      default: 6
    }
  })
const provinceData = ref([])
const cityData = ref([])
const areaData = ref([])
const regionParams = ref({
        level: 0,
        pcode: ''
      })
const addressName = ref({
        provinceName: '',
        cityName: '',
        areaName: ''
      })
watch(
  () => props.address,
  (to) => {
    console.log('address', to)
    if (to.province) {
      getCity(to.province)
    }
  }
)
onMounted(() => {
  getProvince()
})

function getProvince () { // 获取省数据
  regionParams.value.level = 0
  regionParams.value.pcode = ''
  region(regionParams.value).then((res: any) => {
    console.log('province-res:', res)
    if (res.message.code === 0) {
      if (res.data && res.data.length) {
        provinceData.value = res.data
        if (props.address.province) {
          getCity(props.address.province)
        }
      }
    }
  })
}
function getCity (key: any) { // 获取市数据
  regionParams.value.level = 1
  regionParams.value.pcode = key
  region(regionParams.value).then((res: any) => {
    console.log('city-res:', res)
    if (res.message.code === 0) {
      if (res.data && res.data.length) {
        cityData.value = res.data
        if (props.address.city) {
          getArea(props.address.city)
        }
      }
    }
  })
}
function getArea (key: any) { // 获取区数据
  regionParams.value.level = 2
  regionParams.value.pcode = key
  region(regionParams).then((res: any) => {
    console.log('area-res:', res)
    if (res.message.code === 0) {
      if (res.data && res.data.length) {
        areaData.value = res.data
      }
    }
  })
}
const emits = defineEmits(['update:address', 'change'])
function getProvinceCode (name: any, key: any) { // 省下拉回调
  console.log('province:', name, key)
  addressName.value.provinceName = name
  cityData.value = []
  areaData.value = []
  if (props.changeOnSelect) {
    emits('update:address', { province: key, city: '', area: '' })
    emits('change', { province: key, city: '', area: '' }, { provinceName: name, cityName: '', areaName: '' })
  }
  // 获取市下拉列表
  getCity(key)
}
function getCityCode (name: any, key: any) { // 市下拉回调
  console.log('city:', name, key)
  addressName.value.cityName = name
  areaData.value = []
  if (props.changeOnSelect) {
    emits('update:address', { ...props.address, city: key, area: '' })
    emits('change', { ...props.address, area: '' }, { ...addressName, areaName: '' })
  }
  // 获取区下拉列表
  getArea(key)
}
function getAreaCode (name: any, key: any) { // 区下拉回调
  console.log('area:', name, key)
  addressName.value.areaName = name
  emits('update:address', { ...props.address, area: key })
  emits('change', props.address, addressName)
}
</script>
<template>
  <div class="m-cascader-wrap" :style="`height: ${height}px;`">
    <Select
      :style="`margin-right: ${gap}px; z-index: ${zIndex};`"
      :selectData="provinceData"
      :defaultValue="defaultAddress.province"
      v-model="address.province"
      name="name"
      value="zoneCode"
      :disabled="provinceDisabled || disabled"
      :width="provinceWidth || width"
      :height="height"
      :num="num"
      :placeholder="provincePlaceholder || placeholder"
      @change="getProvinceCode" />
    <Select
      :style="`margin-right: ${gap}px; z-index: ${zIndex};`"
      :selectData="cityData"
      :defaultValue="defaultAddress.city"
      v-model="address.city"
      name="name"
      value="zoneCode"
      :disabled="cityDisabled || disabled"
      :width="cityWidth || width"
      :height="36"
      :num="num"
      :placeholder="cityPlaceholder || placeholder"
      @change="getCityCode" />
    <Select
      :style="`z-index: ${zIndex};`"
      :selectData="areaData"
      :defaultValue="defaultAddress.area"
      v-model="address.area"
      name="name"
      value="zoneCode"
      :disabled="disabled"
      :width="areaWidth || width"
      :height="height"
      :num="num"
      :placeholder="areaPlaceholder || placeholder"
      @change="getAreaCode" />
  </div>
</template>
<style lang="less" scoped>
.m-cascader-wrap {
  display: inline-block;
}
</style>
