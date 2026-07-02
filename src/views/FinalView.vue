<script setup>
import { RouterLink } from 'vue-router'
import { useCarrinhoStore } from '../stores/carrinho'

const carrinho = useCarrinhoStore()

function formatarPreco(valor) {
  return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
}
</script>

<template>
  <main class="carrinho">
    <header class="carrinho-header">
      <h1>Carrinho</h1>
      <p v-if="carrinho.quantidadeTotal">{{ carrinho.quantidadeTotal }} itens</p>
    </header>

    <div v-if="carrinho.itens.length === 0" class="carrinho-vazio">
      <p>Seu carrinho está vazio.</p>
      <RouterLink to="/loja">Ir para a loja</RouterLink>
    </div>

    <ul v-else class="carrinho-lista">
      <li v-for="item in carrinho.itens" :key="item.id" class="carrinho-item">
        <span class="item-icone" aria-hidden="true">{{ item.icone }}</span>
        <div class="item-info">
          <h2>{{ item.nome }}</h2>
          <p>{{ item.quantidade }}x {{ formatarPreco(item.preco) }}</p>
        </div>
        <span class="item-total">{{ formatarPreco(item.preco * item.quantidade) }}</span>
        <button type="button" class="btn-remover" @click="carrinho.remover(item.id)">Remover</button>
      </li>
    </ul>

    <footer v-if="carrinho.itens.length" class="carrinho-rodape">
      <span>Total</span>
      <strong>{{ formatarPreco(carrinho.total) }}</strong>
    </footer>
  </main>
</template>

<style scoped>
.carrinho {
  width: 100%;
  max-width: 640px;
  padding: 1.5rem 0 3rem;
  color: #f0f0f0;
}

.carrinho-header {
  margin-bottom: 1.5rem;
  padding-bottom: 0.75rem;
  text-align: center;
  border-bottom: 2px solid #c41e3a;
}

.carrinho-header h1 {
  margin-bottom: 0.25rem;
  font-size: 1.75rem;
  color: #fff;
}

.carrinho-header p {
  color: #999;
  font-size: 0.9rem;
}

.carrinho-vazio {
  text-align: center;
  padding: 2rem 1rem;
  color: #888;
}

.carrinho-vazio a {
  display: inline-block;
  margin-top: 1rem;
  color: #e8c547;
  text-decoration: none;
}

.carrinho-lista {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.carrinho-item {
  display: grid;
  grid-template-columns: auto 1fr auto auto;
  gap: 0.75rem;
  align-items: center;
  padding: 1rem;
  border: 1px solid #2a2a2a;
  border-radius: 10px;
  background: #141414;
}

.item-icone {
  font-size: 1.75rem;
}

.item-info h2 {
  margin: 0 0 0.2rem;
  font-size: 0.95rem;
  color: #fff;
}

.item-info p {
  margin: 0;
  font-size: 0.8rem;
  color: #888;
}

.item-total {
  font-weight: 700;
  color: #e8c547;
  white-space: nowrap;
}

.btn-remover {
  padding: 0.4rem 0.65rem;
  border: 1px solid #444;
  border-radius: 6px;
  background: transparent;
  color: #ccc;
  font-size: 0.75rem;
  cursor: pointer;
  transition: border-color 0.2s ease, color 0.2s ease;
}

.btn-remover:hover {
  border-color: #c41e3a;
  color: #fff;
}

.carrinho-rodape {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 1.5rem;
  padding-top: 1rem;
  border-top: 1px solid #333;
  font-size: 1.1rem;
}

.carrinho-rodape strong {
  font-size: 1.4rem;
  color: #e8c547;
}

@media (max-width: 520px) {
  .carrinho-item {
    grid-template-columns: auto 1fr;
    grid-template-rows: auto auto;
  }

  .item-total,
  .btn-remover {
    grid-column: 2;
  }

  .btn-remover {
    justify-self: start;
  }
}
</style>
