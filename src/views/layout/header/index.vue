<template>
  <a-layout-header class="navs">
    <div class="navs-left">
      <div class="logo">
        <img :src="logo" />
      </div>
    </div>
    <div class="navs-right">1111</div>
  </a-layout-header>
</template>
<script lang="ts" setup>
import logoImg from '@/assets/logo.png'
const logo = ref<string>(logoImg)
</script>
<style module lang="scss" src="@/styles/export.scss"></style>
<style scoped lang="scss">
.navs {
  @include flex-row(space-between);
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 6;
  height: $long-50;
  .navs-left {
    display: flex;
    flex: 4;
    height: $long-50;
    .logo {
      display: inline-block;
      text-align: left;
      width: 176px;
      img {
        height: 28px;
        vertical-align: sub;
        border-style: none;
      }
    }
  }
  .navs-right {
    color: #fff;
    text-align: right;
    flex: 1;
  }
}
</style>
