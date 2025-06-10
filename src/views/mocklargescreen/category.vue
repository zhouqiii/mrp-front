<template>
  <div>
    <Header>
      <template #content>
        <Canvas>
          <template #content>
            <category></category>
            <div class="text-8xl">
              饼图嵌套自定义内容graphic:{elements} 在element里定义自定义要显示的内容
            </div>
            <div class="text-[24px]">
              饼图嵌套自定义内容graphic:{elements} 在element里定义自定义要显示的内容
            </div>
          </template>
        </Canvas>
      </template>
    </Header>
  </div>
</template>
<script setup lang="ts">
import Header from '@/views/screen/index.vue'
import Canvas from '@/views/mocklargescreen/components/canvas.vue'
import category from '@/views/mocklargescreen/components/category.vue'
</script>
