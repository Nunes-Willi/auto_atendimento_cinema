import { computed, ref } from 'vue'
import { defineStore } from 'pinia'

export const PRECO_INGRESSO = 34.9

export const useCarrinhoStore = defineStore('carrinho', () => {
  const itens = ref([])
  const filmeSelecionado = ref(null)
  const notificacao = ref('')
  const notificacoesNovas = ref(0)

  const temFilme = computed(() => filmeSelecionado.value !== null)

  const total = computed(() => {
    const totalLoja = itens.value.reduce((soma, item) => soma + item.preco * item.quantidade, 0)
    const totalIngresso = filmeSelecionado.value ? PRECO_INGRESSO * qtdIngressos.value : 0
    return totalLoja + totalIngresso
  })

  const qtdIngressos = ref(1)
  const podeFinalizar = computed(() => filmeSelecionado.value !== null)

  const quantidadeTotal = computed(() =>
    itens.value.reduce((soma, item) => soma + item.quantidade, 0),
  )

  let timeoutNotificacao = null

  function adicionar(produto, silencioso = false) {
    const index = itens.value.findIndex((i) => i.id === produto.id)

    if (index >= 0) {
      const atual = itens.value[index]
      itens.value[index] = { ...atual, quantidade: atual.quantidade + 1 }
    } else {
      itens.value.push({
        id: produto.id,
        nome: produto.nome,
        icone: produto.icone,
        preco: produto.preco,
        quantidade: 1,
      })
    }

    itens.value = [...itens.value]

    if (!silencioso) {
      notificacoesNovas.value += 1
      notificacao.value = `${produto.nome} adicionado ao carrinho`

      clearTimeout(timeoutNotificacao)
      timeoutNotificacao = setTimeout(() => {
        notificacao.value = ''
      }, 2500)
    }
  }

  function aumentar(id) {
    itens.value = itens.value.map((item) =>
      item.id === id ? { ...item, quantidade: item.quantidade + 1 } : item,
    )
  }

  function diminuir(id) {
    itens.value = itens.value
      .map((item) =>
        item.id === id ? { ...item, quantidade: item.quantidade - 1 } : item,
      )
      .filter((item) => item.quantidade > 0)
  }

  function limpar() {
    itens.value = []
  }

  function limparNotificacoes() {
    notificacoesNovas.value = 0
  }

  function selecionarFilme(filme) {
    filmeSelecionado.value = {
      id: filme.id,
      titulo: filme.titulo,
      banner: filme.banner,
      duracao: filme.duracao,
      sala: filme.sala,
    }
  }

  function alterarQtd(novaQtd) {
    qtdIngressos.value = Math.min(10, Math.max(1, novaQtd))
  }

  function limparFilme() {
    filmeSelecionado.value = null
  }


  return {
    itens,
    filmeSelecionado,
    temFilme,
    podeFinalizar,
    qtdIngressos,
    total,
    quantidadeTotal,
    notificacao,
    notificacoesNovas,
    adicionar,
    aumentar,
    diminuir,
    limpar,
    limparNotificacoes,
    selecionarFilme,
    limparFilme,
    alterarQtd,
  }
})
