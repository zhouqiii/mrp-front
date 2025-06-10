<template>
  <div :class="['one-message', `one-message-${options.type}`]">
    <svg-icon :name="options.type" width="1.2em" height="1.2em"></svg-icon>
    <div v-if="options.dangerouslyUseHTMLString" v-html="options.content"></div>
    <div v-else>{{ options.content }}</div>
  </div>
</template>
<script setup lang="ts">
import SvgIcon from '@/components/SvgIcon/index.vue'
type IType = 'success' | 'error' | 'warn' | 'info'
interface IMessage {
  type: IType
  content: string
  duration?: number
  dangerouslyUseHTMLString?: boolean
}
const propsData = withDefaults(defineProps<{ options: IMessage }>(), {
  options: () => ({
    type: 'success',
    content: '',
    duration: 2,
    dangerouslyUseHTMLString: false,
  }),
})
</script>
<style lang="scss" scoped>
$message-colors: (
  'info': $color-info,
  'success': $color-success,
  'error': $color-error,
  'warn': $color-warn,
);
$message-back-colors: (
  'info': $color-info-plain,
  'success': $color-success-plain,
  'error': $color-error-plain,
  'warn': $color-warn-plain,
);
// 占位符选择器 定义可复用的样式块
%message-base {
  position: absolute;
  top: $size-small-2;
  left: 50%;
  height: 50px;
  line-height: 50px;
  font-size: 14px;
  border-radius: 4px;
  z-index: 999;
}
.one-message {
  @include flex-row();
  // 被继承
  @extend %message-base;
  padding: $size-mini-4;
  min-width: 200px;
  animation: move 0.38s linear forwards;
  @keyframes move {
    0% {
      transform: translate3d(0, -75px, 0);
      opacity: 0.16;
    }

    50% {
      opacity: 0.68;
    }

    100% {
      transform: none;
      opacity: 1;
    }
  }
  svg {
    margin-right: 4px;
  }
}
@each $type, $color in $message-colors {
  .one-message-#{$type} {
    border: 1px solid $color;
    color: $color;
  }
}
@each $type, $color in $message-back-colors {
  .one-message-#{$type} {
    background-color: $color;
  }
}
</style>
