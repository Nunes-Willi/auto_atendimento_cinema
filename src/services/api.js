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

export default api
