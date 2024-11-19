import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import type { Item, Root } from '@/types/bookType'

export const useBookStore = defineStore('books', () => {
  const books = ref<Item[]>([])
  const search = ref('harry potter')

  const booksList = computed(() => books.value)

  const fetchBooks = async () => {
    try {
      const url = `https://www.googleapis.com/books/v1/volumes?q=${search.value}`
      const response = await fetch(url)
      const data: Root = await response.json()
      books.value = data.items || []
    } catch (error) {
      console.log('erro ao buscar livros', error)
    }
  }

  return { booksList, search, fetchBooks }
})
