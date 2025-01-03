<template>
  <div>
    <button
      :class="[
        'one-button',
        `one-btn-${type}`,
        disabled ? `is-disabled` : '',
        plain ? 'is-plain' : '',
        round ? 'is-round' : '',
      ]"
    >
      <svg-icon v-if="icon" :name="icon" class="icon"></svg-icon>
      <span>
        <slot></slot>
      </span>
    </button>
  </div>
</template>
<script setup lang="ts">
const propsData = withDefaults(
  defineProps<{
    type?: string
    disabled?: boolean
    icon?: string
    plain?: boolean
    round?: boolean
  }>(),
  {
    type: 'default',
    disabled: false,
    plain: false,
    round: false,
    icon: '',
  },
)
</script>
<style lang="scss" scoped>
// 基础按钮背景色
$button-background-colors: (
  'primary': $color-primary,
  'success': $color-success,
  'danger': $color-error,
  'warning': $color-warn,
);
// 基础按钮hover背景色
$button-hover-colors: (
  'primary': $color-base,
  'success': $color-success,
  'danger': $color-error,
  'warning': $color-warn,
);
// 基础按钮active背景色
$button-active-colors: (
  'primary': #004487,
  'success': $color-success,
  'danger': $color-error,
  'warning': $color-warn,
);
// 基础按钮disabled背景色
$button-disabled-colors: (
  'primary': #84b4de,
  'success': $color-success,
  'danger': $color-error,
  'warning': $color-warn,
);
// 朴素按钮背景色
$color-plain: (
  'primary': $color-primary-plain,
  'success': $color-success-plain,
  'danger': $color-error-plain,
  'warning': $color-warn-plain,
);
@mixin color-set($color) {
  background-color: $color;
  border-color: $color;
}
.one-button {
  height: 32px;
  padding: 4px 15px;
  border-radius: 6px;
  display: inline-block;
  font-weight: 400;
  text-align: center;
  border: 1.5px solid transparent;
  display: flex;
  align-items: center;
  cursor: pointer;
  font-size: 14px;
  line-height: 1.5;
  .icon {
    margin-right: 4px;
  }
  span {
    display: inline-block;
    vertical-align: middle;
  }
}
// 不同按钮的背景色
@each $button-type, $button-color in $button-background-colors {
  .one-btn-#{$button-type} {
    @include color-set($button-color);
    color: #ffffff;
  }
  // plain状态下border和color和基础一致，写在这个遍历里
  .one-btn-#{$button-type}.is-plain {
    background-color: map-get($color-plain, $button-type);
    border-color: $button-color;
    color: $button-color;
    &:hover,
    &:focus {
      color: $button-color;
      background-color: map-get($color-plain, $button-type);
    }
  }
  .one-btn-#{$button-type}.is-round {
    border-radius: 20px;
    padding: 4px 20px;
  }
}
// 不同按钮的hover状态
@each $button-type, $button-color in $button-hover-colors {
  .one-btn-#{$button-type} {
    &:hover {
      @include color-set($button-color);
    }
  }
}
// 不同按钮的active状态
@each $button-type, $button-color in $button-active-colors {
  .one-btn-#{$button-type} {
    &:active {
      @include color-set($button-color);
    }
  }
}
// 不同按钮disabled状态下背景色、hover背景色和active背景色全置统一
@each $button-type, $button-color in $button-disabled-colors {
  .one-btn-#{$button-type}.is-disabled {
    @include color-set($button-color);
    cursor: not-allowed;
    &:hover,
    &:active {
      @include color-set($button-color);
    }
  }
}
// default 单独设置
.one-btn-default {
  background: $color-white;
  border-color: $color-border;
  &:hover {
    border-color: $color-base;
    color: $color-base;
  }
}
</style>
