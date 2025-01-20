<template>
  <a-tooltip v-if="isShowTooltip" :transfer="true" trigger="hover" overlayClassName="table-class">
    <template #title>
      <span>{{ title }}</span>
    </template>
    <div class="tooltip-content" @mouseleave="mouseleave">
      <span ref="contentRef">
        {{ content }}
      </span>
    </div>
  </a-tooltip>
  <div v-else class="tooltip-content" @mouseenter="mouseenter">
    <span ref="contentRef">
      {{ content }}
    </span>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  props: {
    content: {
      type: String,
      default: '',
    },
    title: {
      type: String,
      default: '',
    },
  },
  setup() {
    const contentRef = ref()
    const isShowTooltip = ref(false)
    const mouseleave = () => {
      // isShowTooltip.value = false
    }
    const mouseenter = () => {
      if (contentRef.value.parentNode.offsetWidth > contentRef.value.offsetWidth) {
        isShowTooltip.value = false
      } else {
        isShowTooltip.value = true
      }
    }
    return {
      contentRef,
      mouseenter,
      mouseleave,
      isShowTooltip,
    }
  },
})
</script>

<style>
.tooltip-content {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
</style>
