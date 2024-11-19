<script setup lang="ts">
import { onMounted } from 'vue'
import { useBookStore } from '@/stores/bookStore'

const bookStore = useBookStore()

onMounted(() => {
  bookStore.fetchBooks()
})
</script>

<template>
  <div class="flex justify-end mr-8 gap-2 items-center">
    <h2 class="text-2xl font-bold underline">pesquise livros</h2>
    <div class="search-bar">
      <input
        type="text"
        placeholder="Buscar livros"
        class="input input-bordered input-primary w-full max-w-xs"
        v-model="bookStore.search"
        @input="bookStore.fetchBooks"
      />
    </div>
  </div>
  <div class="flex justify-center">
    <div v-if="bookStore.booksList.length" class="container-card">
      <div
        v-for="book in bookStore.booksList"
        :key="book.id"
        class="card"
      >
        <h3 class="text-xl font-bold truncate">{{ book.volumeInfo.title }}</h3>
        <img :src="book.volumeInfo.imageLinks?.thumbnail" alt="Capa do livro" class="w-[200px] h-[300px] rounded-md mt-2 mb-8" />
        <p>Autor(es): {{ book.volumeInfo.authors?.join(', ') || 'Desconhecido' }}</p>
        <p>Publicado em: {{ book.volumeInfo.publishedDate || 'livro não encontrado' }}</p>
      </div>
    </div>

    <p v-else>Nenhum livro encontrado.</p>
  </div>
</template>
