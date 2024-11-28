import { describe, it, expect, vi, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import Home from '@/components/TheWelcome.vue'
import { setActivePinia, createPinia } from 'pinia'
import { useBookStore } from '@/stores/usebookStore'

vi.mock('@/stores/bookStore', () => ({
  useBookStore: vi.fn(),
}))

describe('Home.vue', () => {
  beforeEach(() => {
    setActivePinia(createPinia()) // Ativar Pinia antes de cada teste
  })

  function createMockBookStore(overrides = {}) {
    // Retorna um mock baseado no tipo esperado pelo Pinia
    return {
      booksList: [],
      search: '',
      fetchBooks: vi.fn(),
      $state: {}, // Estado inicial
      $patch: vi.fn(),
      $reset: vi.fn(),
      $subscribe: vi.fn(),
      $onAction: vi.fn(),
      $dispose: vi.fn(),
      $id: 'books',
      ...overrides, // Permite sobrescrever propriedades conforme o necessário
    } as unknown as ReturnType<typeof useBookStore>
  }

  it('deve exibir a mensagem de "Nenhum livro encontrado" quando a lista de livros estiver vazia', () => {
    const mockBookStore = createMockBookStore()
    vi.mocked(useBookStore).mockReturnValue(mockBookStore)

    const wrapper = mount(Home)

    expect(wrapper.text()).toContain('Nenhum livro encontrado.')
    expect(mockBookStore.fetchBooks).toHaveBeenCalled()
  })

  it('deve exibir a lista de livros quando houver livros no store', async () => {
    const mockBookStore = createMockBookStore({
      booksList: [
        {
          id: '1',
          volumeInfo: {
            title: 'Livro Exemplo',
            imageLinks: {
              thumbnail: 'https://example.com/capa.jpg',
            },
            authors: ['Autor 1'],
            publishedDate: '2023',
          },
        },
      ],
    })
    vi.mocked(useBookStore).mockReturnValue(mockBookStore)

    const wrapper = mount(Home)

    expect(wrapper.findAll('.card').length).toBe(1)
    expect(wrapper.text()).toContain('Livro Exemplo')
    expect(wrapper.html()).toContain('<img src="https://example.com/capa.jpg"')
    expect(wrapper.text()).toContain('Autor(es): Autor 1')
    expect(wrapper.text()).toContain('Publicado em: 2023')
  })

  it('deve chamar a função fetchBooks ao modificar o campo de busca', async () => {
    const mockBookStore = createMockBookStore()
    vi.mocked(useBookStore).mockReturnValue(mockBookStore)

    const wrapper = mount(Home)

    const input = wrapper.find('input')
    await input.setValue('novo livro')

    expect(mockBookStore.search).toBe('novo livro')
    expect(mockBookStore.fetchBooks).toHaveBeenCalled()
  })
})
