<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <header class="flex justify-between items-center p-4 bg-gray-800 text-white">
    <div class="wrapper">
      <img
        alt="logo"
        class="logo w-8 h-8 rounded-full"
        src="@/assets/logo.webp"
        width="125"
        height="125"
      />
      <nav class="flex gap-4">
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/about">About</RouterLink>
      </nav>
    </div>
  </header>

  <RouterView />
</template>
