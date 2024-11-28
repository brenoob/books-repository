<script setup lang="ts">
import { onMounted } from 'vue'
import { useBookStore } from '@/stores/usebookStore'

const bookStore = useBookStore()

onMounted(() => {
  bookStore.fetchBooks()
})
</script>

<template>
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
    <div v-if="bookStore.booksList.length" class="container-card">
      <div v-for="book in bookStore.booksList" :key="book.id" class="card">
        <h3 class="text-xl font-bold truncate">{{ book.volumeInfo.title }}</h3>
        <img
          :src="book.volumeInfo.imageLinks?.thumbnail"
          alt="Capa do livro"
          class="min-w-[200px] h-[300px] rounded-md mt-2 mb-8"
        />
        <p class="truncate">
          Autor(es): {{ book.volumeInfo.authors?.join(', ') || 'Desconhecido' }}
        </p>
        <p>Publicado em: {{ book.volumeInfo.publishedDate || 'livro não encontrado' }}</p>
        <button class="btn" @click="$router.push({ name: 'details', params: { id: book.id } })">
          Detalhes
        </button>
      </div>
    </div>

    <p v-else>Nenhum livro encontrado.</p>
  </div>
</template>
