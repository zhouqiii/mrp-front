<template>
  <div>
    <Header>
      <template #content>
        <Canvas>
          <template #content>
            <plan></plan>
          </template>
        </Canvas>
      </template>
    </Header>
  </div>
</template>
<script setup lang="ts">
import Header from '@/views/screen/index.vue'
import Canvas from '@/views/mocklargescreen/components/canvas.vue'
import plan from '@/views/mocklargescreen/components/plan.vue'
</script>
