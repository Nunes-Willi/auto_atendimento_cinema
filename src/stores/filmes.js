import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import { buscarFilme, listarFilmes } from '../services/api'
import { extrasPorNome } from '../data/filmes'

const PADRAO = {
  generos: [],
  audio: 'Inglês, Português',
  legendas: 'Português',
  horarios: ['14:00', '17:00', '20:00'],
}

function formatarDuracao(minutos) {
  const h = Math.floor(minutos / 60)
  const m = String(minutos % 60).padStart(2, '0')
  return h ? `${h}h ${m}min` : `${m}min`
}

export function adaptarFilme(api) {
  const extras = extrasPorNome(api.nome) ?? {}

  return {
    ...PADRAO,
    sala: `Sala ${(api.id % 5) + 1} · 2D`,
    ...extras,
    id: api.id,
    titulo: api.nome,
    sinopse: api.sinopse,
    preco: Number(api.preco),
    classificacao: api.classificacao,
    duracaoMinutos: api.duracao,
    duracao: formatarDuracao(api.duracao),
    banner: api.imagem,
    bannerHero: extras.bannerHero ?? api.imagem,
  }
}

export const useFilmesStore = defineStore('filmes', () => {
  const filmes = ref([])
  const carregando = ref(false)
  const erro = ref('')
  const carregado = ref(false)

  const total = computed(() => filmes.value.length)

  async function carregar(forcar = false) {
    if (carregado.value && !forcar) return
    carregando.value = true
    erro.value = ''

    try {
      const dados = await listarFilmes()
      filmes.value = dados.map(adaptarFilme)
      carregado.value = true
    } catch (e) {
      console.error(e)
      erro.value = 'Não foi possível carregar os filmes. Verifique se a API Django está rodando.'
    } finally {
      carregando.value = false
    }
  }

  async function obter(id) {
    const local = filmes.value.find((f) => String(f.id) === String(id))
    if (local) return local

    try {
      return adaptarFilme(await buscarFilme(id))
    } catch (e) {
      if (e.response?.status === 404) return null
      throw e
    }
  }

  return { filmes, carregando, erro, carregado, total, carregar, obter }
})
