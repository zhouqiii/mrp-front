<template>
  <a-layout-content>
    <router-view v-slot="{ Component, route }">
      <transition name="fade-transform" mode="out-in">
        <keep-alive>
          <component
            v-if="$route.meta.keepAlive"
            :is="Component"
            :key="route.meta.usePathKey ? route.path : undefined"
            class="content"
          />
        </keep-alive>
      </transition>
      <transition name="fade-transform" mode="out-in">
        <component
          v-if="!$route.meta.keepAlive"
          :is="Component"
          :key="route.meta.usePathKey ? route.path : undefined"
          class="content"
        />
      </transition>
    </router-view>
  </a-layout-content>
</template>
<script setup lang="ts"></script>
<style module lang="scss" src="@/styles/export.scss"></style>
<style scoped lang="scss"></style>
