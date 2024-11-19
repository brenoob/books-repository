<script setup lang="ts">
import { onMounted } from 'vue'
import { useBookStore } from '@/stores/bookStore'

const bookStore = useBookStore()

onMounted(() => {
  bookStore.fetchBooks()
})
</script>

<template>
  <div>
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
  <div v-if="bookStore.booksList.length" class="grid grid-cols-3 gap-4 max-md:grid-cols-1">
    <div
      v-for="book in bookStore.booksList"
      :key="book.id"
      class="card border border-slate-500 max-w-60"
    >
      <h3 class="text-xl font-bold">{{ book.volumeInfo.title }}</h3>
      <img :src="book.volumeInfo.imageLinks?.thumbnail" alt="Capa do livro" class="w-full" />
      <p>Autor(es): {{ book.volumeInfo.authors?.join(', ') || 'Desconhecido' }}</p>
      <p>Publicado em: {{ book.volumeInfo.publishedDate || 'livro não encontrado' }}</p>
    </div>
  </div>

  <p v-else>Nenhum livro encontrado.</p>
</template>
