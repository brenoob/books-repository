<script setup lang="ts">
import AboutComponent from '@/components/AboutComponent.vue'
</script>

<template>
  <AboutComponent />
</template>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
