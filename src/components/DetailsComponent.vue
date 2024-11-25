<template>
  <div v-if="book" class="flex items-center justify-center gap-4 m-4 border p-4 rounded-md">
    <img
      :src="book.volumeInfo.imageLinks?.thumbnail"
      :alt="`Capa do livro ${book.volumeInfo.title}`"
      class="rounded shadow-md h-72"
    />
    <div class="flex flex-col gap-4">
      <h1 class="text-2xl font-bold">{{ book.volumeInfo.title }}</h1>
      <p><strong>Autor(es):</strong> {{ book.volumeInfo.authors?.join(', ') || 'Desconhecido' }}</p>
      <p>
        <strong>Data de publicação:</strong> {{ book.volumeInfo.publishedDate || 'Não disponível' }}
      </p>
      <p>
        <strong>Descrição:</strong> {{ book.volumeInfo.description || 'Sem descrição disponível' }}
      </p>
      <router-link to="/" class="text-blue-500 rounded shadow-md">Voltar</router-link>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import { useBookStore } from '@/stores/bookStore'
import type { Item } from '@/types/bookType'

const route = useRoute()
const bookStore = useBookStore()
const book = ref<Item>()

onMounted(async () => {
  const bookId = route.params.id
  book.value = bookStore.booksList.find((book) => book.id === bookId)

  if (!book.value) {
    await bookStore.fetchBooks()
    book.value = bookStore.booksList.find((b) => b.id === bookId)
  }

  if (!book.value) {
    console.error('livro não encontrado')
  }
})
</script>
