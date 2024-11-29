<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import { Icon } from '@iconify/vue'
import { ref } from 'vue'

const isMenuOpen = ref(true)

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value
}
</script>

<template>
  <header class="header">
    <div class="wrapper">
      <img
        alt="logo"
        class="logo w-8 h-8 rounded-full"
        src="@/assets/logo.webp"
        width="34"
        height="34"
        @click="$router.push({ name: 'home' })"
      />
      <div v-if="isMenuOpen" class="">
        <nav class="toggle-menu">
          <RouterLink to="/">Home</RouterLink>
          <RouterLink to="/favorites">Favorites</RouterLink>
          <RouterLink to="/about">About</RouterLink>
        </nav>
      </div>
      <button @click="toggleMenu" class="toggle-menu-button">
        <Icon :icon="isMenuOpen ? 'mdi:menu' : 'mdi:close'"></Icon>
      </button>
    </div>
  </header>

  <RouterView />
</template>
