import axios from 'axios'

const api = axios.create({
  baseURL: '/api',
})

export async function listarFilmes() {
  const filmes = []
  let pagina = 1
  let totalPaginas = 1

  do {
    const { data } = await api.get('/filmes/', { params: { page: pagina, page_size: 100 } })
    filmes.push(...data.results)
    totalPaginas = data.total_pages
    pagina++
  } while (pagina <= totalPaginas)

  return filmes
}

export async function buscarFilme(id) {
  const { data } = await api.get(`/filmes/${id}/`)
  return data
}

export async function listarProdutos() {
  const { data } = await api.get('/produtos/', { params: { ativo: true, page_size: 100 } })
  return data.results.map((produto) => ({ ...produto, preco: Number(produto.preco) }))
}

export async function criarPedido(pedido) {
  const { data } = await api.post('/pedidos/', pedido)
  return data
}

export default api
