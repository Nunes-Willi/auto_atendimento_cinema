import { computed, ref } from 'vue'
import { defineStore } from 'pinia'

export const useCarrinhoStore = defineStore('carrinho', () => {
  const itens = ref([])
  const notificacao = ref('')
  const notificacoesNovas = ref(0)

  const total = computed(() =>
    itens.value.reduce((soma, item) => soma + item.preco * item.quantidade, 0),
  )

  const quantidadeTotal = computed(() =>
    itens.value.reduce((soma, item) => soma + item.quantidade, 0),
  )

  let timeoutNotificacao = null

  function adicionar(produto) {
    const item = itens.value.find((i) => i.id === produto.id)

    if (item) {
      item.quantidade += 1
    } else {
      itens.value.push({
        id: produto.id,
        nome: produto.nome,
        icone: produto.icone,
        preco: produto.preco,
        quantidade: 1,
      })
    }

    notificacoesNovas.value += 1
    notificacao.value = `${produto.nome} adicionado ao carrinho`

    clearTimeout(timeoutNotificacao)
    timeoutNotificacao = setTimeout(() => {
      notificacao.value = ''
    }, 2500)
  }

  function remover(id) {
    itens.value = itens.value.filter((item) => item.id !== id)
  }

  function limparNotificacoes() {
    notificacoesNovas.value = 0
  }

  return {
    itens,
    total,
    quantidadeTotal,
    notificacao,
    notificacoesNovas,
    adicionar,
    remover,
    limparNotificacoes,
  }
})
