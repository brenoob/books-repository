import { ref, computed, watch } from 'vue'
import { defineStore } from 'pinia'
import type { Item, Root } from '@/types/bookType'

export const useBookStore = defineStore('books', () => {
  const books = ref<Item[]>([])
  const search = ref('harry potter')
  const favorites = ref<Item[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)

  const booksList = computed(() => books.value)
  const favoriteBooks = computed(() => favorites.value)

  const fetchBooks = async () => {
    loading.value = true
    error.value = null
    try {
      const url = `https://www.googleapis.com/books/v1/volumes?q=${search.value}`
      const response = await fetch(url)
      const data: Root = await response.json()
      books.value = data.items || []
    } catch (err: unknown) {
      error.value = err instanceof Error ? err.message : 'erro desconhecido ao buscar livros'
    } finally {
      loading.value = false
    }
  }

  const toggleFavorite = (book: Item) => {
    const index = favorites.value.findIndex((f) => f.id === book.id)
    if (index >= 0) {
      //remover de favoritos
      favorites.value.splice(index, 1)
    } else {
      //adicionar aos favoritos
      favorites.value.push(book)
    }
  }
  const loadStorageFavorites = () => {
    const storedFavorites = localStorage.getItem('favorites')
    if (storedFavorites) {
      favorites.value = JSON.parse(storedFavorites)
    }
  }

  const saveStorageFavorites = () => {
    localStorage.setItem('favorites', JSON.stringify(favorites.value))
  }

  watch(favorites, saveStorageFavorites, { deep: true })

  loadStorageFavorites()

  return {
    booksList,
    search,
    fetchBooks,
    toggleFavorite,
    saveStorageFavorites,
    loadStorageFavorites,
    favoriteBooks,
    loading,
    error,
  }
})
