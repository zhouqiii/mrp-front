<template>
  <div>
    <button
      :class="[
        'one-button',
        `one-btn-${type}`,
        disabled ? `one-btn-${type}-disabled` : '',
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
$color-plain: (
  'primary': #0062b0,
  'success': #00a870,
  'danger': #f36c6e5e,
  'warning': #f58916,
);
$button-background-colors: (
  'primary': #0062b0,
  'success': #00a870,
  'danger': #f74b4d,
  'warning': #f58916,
);
$button-hover-colors: (
  'primary': #0f80d6,
  'success': #00a870,
  'danger': #f74b4d,
  'warning': #f58916,
);
$button-active-colors: (
  'primary': #004487,
  'success': #00a870,
  'danger': #f74b4d,
  'warning': #f58916,
);
$button-disabled-colors: (
  'primary': #84b4de,
  'success': #00a870,
  'danger': #f74b4d,
  'warning': #f58916,
);
$primaryHover: #0f80d6;

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
    background-color: $button-color;
    border-color: $button-color;
    color: #ffffff;
  }
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
      border-color: $button-color;
      background: $button-color;
    }
  }
}
// 不同按钮的active状态
@each $button-type, $button-color in $button-active-colors {
  .one-btn-#{$button-type} {
    &:active {
      border-color: $button-color;
      background: $button-color;
    }
  }
}
// 不同按钮disabled状态下背景色、hover背景色和active背景色全置统一
@each $button-type, $button-color in $button-disabled-colors {
  .one-btn-#{$button-type}-disabled {
    background-color: $button-color;
    border-color: $button-color;
    cursor: not-allowed;
    &:hover {
      border-color: $button-color;
      background: $button-color;
    }
    &:active {
      border-color: $button-color;
      background: $button-color;
    }
  }
}
.one-btn-default {
  background: #ffffff;
  border-color: #d9d9d9;
  &:hover {
    border-color: $primaryHover;
    color: $primaryHover;
  }
}
</style>
