<template>
  <div class="box relative w-3/5 h-[200px] bg-[#052139] p-4">
    <span class="top-sign"></span>
    <span class="left-sign"></span>
    <span class="right-sign"></span>
    <span class="bottom-sign"></span>
    <div class="top-border"></div>
    <div class="bottom-border"></div>
    <div class="w-full h-full p-[24px] tw-flex-row-center">
      <a-space :size="72">
        <template #split>
          <div class="diagonal-line"></div>
        </template>
        <div
          v-for="title in tabsList"
          :class="[
            'text-5xl',
            'w-[180px]',
            'h-[60px]',
            'tw-flex-row-center',
            active == title ? 'active-bg' : '',
          ]"
          @click="active = title"
        >
          <div>{{ title }}</div>
        </div>
      </a-space>
    </div>
  </div>
</template>
<script setup lang="ts">
const tabsList = ref<string[]>(['全息档案', '维保档案', '数据档案'])
const active = ref('')
</script>
<style lang="scss" scoped>
.top-border {
  position: absolute;
  left: 0;
  top: 0;
  width: 80%; /* 设置边框长度 */
  &::after {
    content: '';
    display: block;
    height: 2px; /* 设置边框高度 */
    background-color: #54dcf2; /* 设置边框颜色 */
    box-shadow:
    /*左-上-右-下边阴影*/
      0px 0px 10px #54ddf2a3,
      0px 0px 10px #54ddf2a3,
      0px 0px 10px #54ddf2a3,
      0px 0px 10px #54ddf2a3;
    -moz-box-shadow:
      0px 0px 10px #54ddf2a3,
      0px 0px 10px #54ddf2a3,
      0px 0px 10px #54ddf2a3,
      0px 0px 10px #54ddf2a3;
    -webkit-box-shadow:
      0px 0px 10px #54ddf2a3,
      0px 0px 10px #54ddf2a3,
      0px 0px 10px #54ddf2a3,
      0px 0px 10px #54ddf2a3;
  }
}
.bottom-border {
  position: absolute;
  right: 0;
  bottom: 0;
  width: 80%; /* 设置边框长度 */
  &::after {
    content: '';
    display: block;
    height: 2px; /* 设置边框高度 */
    background-color: #54dcf2; /* 设置边框颜色 */
    /*
     box-shadow: x y 阴影范围 颜色 x正值阴影向box的x轴即横向右侧偏移，x负值向x轴左侧偏移; y轴正值阴影向box的y轴即竖向下侧偏移，y轴负值向y轴上侧
     */
    box-shadow:
    /*左-上-右-下边阴影*/
      0px 0px 10px #54ddf2a3,
      0px 0px 10px #54ddf2a3,
      0px 0px 10px #54ddf2a3,
      0px 0px 10px #54ddf2a3;
    -moz-box-shadow:
      0px 0px 10px #54ddf2a3,
      0px 0px 10px #54ddf2a3,
      0px 0px 10px #54ddf2a3,
      0px 0px 10px #54ddf2a3;
    -webkit-box-shadow:
      0px 0px 10px #54ddf2a3,
      0px 0px 10px #54ddf2a3,
      0px 0px 10px #54ddf2a3,
      0px 0px 10px #54ddf2a3;
  }
}
.top-sign {
  display: block;
  position: absolute;
  top: -8px;
  left: -8px;
  width: 96px;
  height: 16px;
  background: #54dcf2;
  clip-path: polygon(
    0 0,
    100% 0,
    100% 16px,
    100% calc(100% - 16px),
    calc(100% - 16px) 100%,
    0 100%,
    0 100%,
    0 0
  );
}
.left-sign {
  display: block;
  position: absolute;
  top: -8px;
  left: -8px;
  width: 16px;
  height: 96px;
  background: #54dcf2;
  clip-path: polygon(
    0 0,
    100% 0,
    100% 16px,
    100% calc(100% - 16px),
    calc(100% - 16px) 100%,
    0 100%,
    0 100%,
    0 0
  );
}
.right-sign {
  display: block;
  position: absolute;
  bottom: -8px;
  right: -8px;
  width: 16px;
  height: 96px;
  background: #54dcf2;
  clip-path: polygon(
    16px 0,
    100% 0,
    100% 0,
    100% 100%,
    100% 100%,
    0 100%,
    0 calc(100% - 16px),
    0 16px
  );
}
.bottom-sign {
  display: block;
  position: absolute;
  bottom: -8px;
  right: -8px;
  width: 96px;
  height: 16px;
  background: #54dcf2;
  clip-path: polygon(
    16px 0,
    100% 0,
    100% 0,
    100% 100%,
    100% 100%,
    0 100%,
    0 calc(100% - 16px),
    0 16px
  );
}
.active-bg {
  border: 1px solid #0090eb;
  border-top: 0;
  background: linear-gradient(to top, #026eaf 0%, #052139 100%);
  text-align: center;
  transform: skewX(-45deg);
  border-radius: 15px;
  div {
    transform: skewX(45deg);
  }
}
.diagonal-line {
  height: 40px;
  width: 4px;
  margin-top: 10px;
  background: linear-gradient(to top, #043d63 0%, #0086d3 50%, #043d63 100%);
  transform-origin: top left;
  transform: rotate(45deg);
  margin-left: 14px; // 根据40px高和45度偏移计算居中
}
</style>
