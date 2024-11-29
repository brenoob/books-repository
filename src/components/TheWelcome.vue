<script setup lang="ts">
import { onMounted } from 'vue'
import { useBookStore } from '@/stores/usebookStore'
import { Icon } from '@iconify/vue/dist/iconify.js'

const bookStore = useBookStore()

onMounted(() => {
  bookStore.fetchBooks()
})
</script>

<template>
  <h1 class="text-3xl font-bold pl-2 pt-2">Book Repository</h1>
  <div class="container-search">
    <h2 class="text-2xl font-bold text-center my-4 md:mr-2">pesquise livros</h2>
    <div class="search-bar">
      <input
        type="text"
        placeholder="Buscar livros"
        class="input input-bordered input-primary w-full max-w-xs pl-2 rounded"
        v-model="bookStore.search"
        @input="bookStore.fetchBooks"
      />
    </div>
  </div>
  <div class="flex justify-center">
    <p v-if="bookStore.loading">Buscando livros...</p>

    <p v-else-if="bookStore.error" class="text-red-400">Erro nenhum livro encontrado.</p>

    <div v-else-if="bookStore.booksList.length" class="container-card">
      <div v-for="book in bookStore.booksList" :key="book.id" class="card">
        <h3 class="text-xl font-bold truncate">{{ book.volumeInfo.title }}</h3>
        <img
          :src="book.volumeInfo.imageLinks?.thumbnail"
          alt="Capa do livro"
          class="min-w-[200px] h-[300px] rounded-md mt-2 mb-8"
        />
        <Icon
          :class="
            bookStore.favoriteBooks.some((f) => f.id === book.id) ? 'text-red-500' : 'text-gray-500'
          "
          class="cursor-pointer ml-auto mb-2"
          @click="bookStore.toggleFavorite(book)"
          icon="mdi:favorite"
          width="24"
          height="24"
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
</template>
