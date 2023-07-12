<script setup lang="ts">
interface Props {
  span?: number // 栅格占位格数，为 0 时相当于 display: none
}
withDefaults(defineProps<Props>(), {
  span: 0
})
</script>
<template>
  <div :class="`m-col col-${span}`" style="padding-left: var(--xGap); padding-right: var(--xGap);">
    <slot></slot>
  </div>
</template>
<style lang="less" scoped>
.m-col {
  position: relative;
  max-width: 100%;
  min-height: 1px;
  font-size: 14px;
  color: rgba(0, 0, 0, 0.88);
  line-height: 1.5714285714285714;
}
.col-1 {
  display: block;
  flex: 0 0 4.16666666666666%;
  max-width: 4.16666666666666%;
}
.col-2 {
  display: block;
  flex: 0 0 8.33333333333333%;
  max-width: 8.33333333333333%;
}
.col-3 {
  display: block;
  flex: 0 0 12.5%;
  max-width: 12.5%;
}
.col-4 {
  display: block;
  flex: 0 0 16.66666666666666%;
  max-width: 16.66666666666666%;
}
.col-5 {
  display: block;
  flex: 0 0 20.83333333333333%;
  max-width: 20.83333333333333%;
}
.col-6 {
  display: block;
  flex: 0 0 25%;
  max-width: 25%;
}
.col-7 {
  display: block;
  flex: 0 0 29.16666666666666%;
  max-width: 29.16666666666666%;
}
.col-8 {
  display: block;
  flex: 0 0 33.33333333333333%;
  max-width: 33.33333333333333%;
}
.col-9 {
  display: block;
  flex: 0 0 37.5%;
  max-width: 37.5%;
}
.col-10 {
  display: block;
  flex: 0 0 41.66666666666666%;
  max-width: 41.66666666666666%;
}
.col-11 {
  display: block;
  flex: 0 0 45.83333333333333%;
  max-width: 45.83333333333333%;
}
.col-12 {
  display: block;
  flex: 0 0 50%;
  max-width: 50%;
}
.col-13 {
  display: block;
  flex: 0 0 54.16666666666666%;
  max-width: 54.16666666666666%;
}
.col-14 {
  display: block;
  flex: 0 0 58.33333333333333%;
  max-width: 58.33333333333333%;
}
.col-15 {
  display: block;
  flex: 0 0 62.5%;
  max-width: 62.5%;
}
.col-16 {
  display: block;
  flex: 0 0 66.66666666666666%;
  max-width: 66.66666666666666%;
}
.col-17 {
  display: block;
  flex: 0 0 70.83333333333333%;
  max-width: 70.83333333333333%;
}
.col-18 {
  display: block;
  flex: 0 0 75%;
  max-width: 75%;
}
.col-19 {
  display: block;
  flex: 0 0 79.16666666666666%;
  max-width: 79.16666666666666%;
}
.col-20 {
  display: block;
  flex: 0 0 83.33333333333333%;
  max-width: 83.33333333333333%;
}
.col-21 {
  display: block;
  flex: 0 0 87.5%;
  max-width: 87.5%;
}
.col-22 {
  display: block;
  flex: 0 0 91.66666666666666%;
  max-width: 91.66666666666666%;
}
.col-23 {
  display: block;
  flex: 0 0 95.83333333333333%;
  max-width: 95.83333333333333%;
}
.col-24 {
  display: block;
  flex: 0 0 100%;
  max-width: 100%;
}
</style>
