<template>
  <div class="favorites-view container mx-auto px-4 py-8">
    <h1 class="text-3xl font-bold text-heading mb-6">Meus Livros Favoritos</h1>

    <div class="flex justify-center">
      <div v-if="favorites.length === 0">
        <p class="mb-4">Você ainda não tem livros favoritos.</p>
        <router-link to="/" class="btn inline-block"> Buscar Livros </router-link>
      </div>

      <div v-else class="container-card">
        <div v-for="book in favorites" :key="book.id" class="card">
          <h3 class="text-xl font-bold truncate">{{ book.volumeInfo.title }}</h3>
          <img
            :src="book.volumeInfo.imageLinks?.thumbnail"
            alt="Capa do livro"
            class="min-w-[200px] h-[300px] rounded-md mt-2 mb-8"
          />
          <Icon
            class="text-red-400 cursor-pointer ml-auto mb-2 w-6 h-6"
            @click="bookStore.toggleFavorite(book)"
            icon="mdi:favorite"
          ></Icon>
          <p class="truncate">
            Autor(es): {{ book.volumeInfo.authors?.join(', ') || 'Desconhecido' }}
          </p>
          <p>Publicado em: {{ book.volumeInfo.publishedDate || 'livro não encontrado' }}</p>
          <button class="btn" @click="$router.push({ name: 'details', params: { id: book.id } })">
            Detalhes
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { useBookStore } from '@/stores/usebookStore'
import { Icon } from '@iconify/vue/dist/iconify.js'

const bookStore = useBookStore()

const favorites = computed(() => bookStore.favoriteBooks)

onMounted(() => {
  bookStore.loadStorageFavorites()
})
</script>
