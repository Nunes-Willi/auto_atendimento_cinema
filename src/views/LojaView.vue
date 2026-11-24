<script setup>
import { computed, onMounted, ref } from 'vue'
import { useCarrinhoStore } from '../stores/carrinho'
import { listarProdutos } from '../services/api'

const carrinho = useCarrinhoStore()

const produtos = ref([])
const carregando = ref(true)
const erro = ref('')

const combos = computed(() => produtos.value.filter((p) => p.categoria === 'combo'))
const pipocas = computed(() => produtos.value.filter((p) => p.categoria === 'pipoca'))
const lanches = computed(() => produtos.value.filter((p) => p.categoria === 'lanche'))

async function carregarProdutos() {
  carregando.value = true
  erro.value = ''
  try {
    produtos.value = await listarProdutos()
  } catch (e) {
    console.error(e)
    erro.value = 'Não foi possível carregar a loja. Verifique se a API Django está rodando.'
  } finally {
    carregando.value = false
  }
}

onMounted(carregarProdutos)

const comboRef = ref(null)
const lanchesIndice = ref(0)

const LANCHES_VISIVEIS = 8
const LANCHES_PASSO = 4

const lanchesVisiveis = computed(() => {
  const lista = lanches.value
  const quantidade = Math.min(LANCHES_VISIVEIS, lista.length)
  const itens = []
  for (let i = 0; i < quantidade; i++) {
    itens.push(lista[(lanchesIndice.value + i) % lista.length])
  }
  return itens
})

function setComboEl(el) {
  if (el) comboRef.value = el
}

function formatarPreco(valor) {
  return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
}

function moverCombos(direcao) {
  if (!comboRef.value) return
  comboRef.value.scrollBy({ left: direcao * 200, behavior: 'smooth' })
}

function avancarLanches() {
  if (!lanches.value.length) return
  lanchesIndice.value = (lanchesIndice.value + LANCHES_PASSO) % lanches.value.length
}

function adicionar(item) {
  carrinho.adicionar({
    id: item.id,
    nome: item.nome,
    icone: item.icone,
    preco: item.preco,
  })
}
</script>

<template>
  <main class="catalogo">
    <header class="catalogo-header">
      <h1>Catálogo</h1>
      <p>Lanches e colecionáveis da bomboniere.</p>
    </header>

    <p v-if="carregando" class="estado-api">Carregando produtos...</p>
    <div v-else-if="erro" class="estado-api estado-erro">
      <p>{{ erro }}</p>
      <button type="button" @click="carregarProdutos">Tentar novamente</button>
    </div>

    <template v-else>
      <section class="secao" aria-labelledby="titulo-combos">
        <h2 id="titulo-combos" class="secao-titulo">Combos</h2>

        <div class="carrossel-wrapper">
          <button
            type="button"
            class="seta-btn"
            aria-label="Combos anteriores"
            @click="moverCombos(-1)"
          >
            ‹
          </button>

          <div :ref="setComboEl" class="carrossel" tabindex="0">
            <article v-for="item in combos" :key="item.nome" class="produto">
              <span class="produto-icone" aria-hidden="true">{{ item.icone }}</span>
              <h3>{{ item.nome }}</h3>
              <p>{{ item.descricao }}</p>
              <span class="produto-preco">{{ formatarPreco(item.preco) }}</span>
              <button type="button" class="btn-adicionar" @click="adicionar(item)">
                Adicionar
              </button>
            </article>
          </div>

          <button
            type="button"
            class="seta-btn"
            aria-label="Próximos combos"
            @click="moverCombos(1)"
          >
            ›
          </button>
        </div>
      </section>

      <section class="secao" aria-labelledby="titulo-pipocas">
        <h2 id="titulo-pipocas" class="secao-titulo">Pipocas</h2>

        <div class="pipocas-grid">
          <article v-for="item in pipocas" :key="item.nome" class="produto">
            <span class="produto-icone" aria-hidden="true">{{ item.icone }}</span>
            <h3>{{ item.nome }}</h3>
            <p>{{ item.descricao }}</p>
            <span class="produto-preco">{{ formatarPreco(item.preco) }}</span>
            <button type="button" class="btn-adicionar" @click="adicionar(item)">Adicionar</button>
          </article>
        </div>
      </section>

      <section class="secao" aria-labelledby="titulo-lanches">
        <div class="secao-topo">
          <h2 id="titulo-lanches" class="secao-titulo">Lanches</h2>
          <button
            type="button"
            class="seta-btn"
            aria-label="Ver mais lanches"
            @click="avancarLanches"
          >
            ›
          </button>
        </div>

        <div class="lanches-grid">
          <article v-for="(item, i) in lanchesVisiveis" :key="`${item.nome}-${i}`" class="produto">
            <span class="produto-icone" aria-hidden="true">{{ item.icone }}</span>
            <h3>{{ item.nome }}</h3>
            <p>{{ item.descricao }}</p>
            <span class="produto-preco">{{ formatarPreco(item.preco) }}</span>
            <button type="button" class="btn-adicionar" @click="adicionar(item)">Adicionar</button>
          </article>
        </div>
      </section>
    </template>
  </main>
</template>

<style scoped>
.estado-api {
  padding: 3rem 1rem;
  text-align: center;
  opacity: 0.85;
}

.estado-erro button {
  margin-top: 1rem;
  padding: 0.6rem 1.2rem;
  border-radius: 8px;
  border: 1px solid currentColor;
  background: transparent;
  color: inherit;
  cursor: pointer;
}

.catalogo {
  width: 100%;
  max-width: 960px;
  margin: 0 auto;
  padding: 1.5rem 0 3rem;
  color: #f0f0f0;
}

.catalogo-header {
  margin-bottom: 1.75rem;
  padding-bottom: 0.75rem;
  text-align: center;
  border-bottom: 2px solid #c41e3a;
}

.catalogo-header h1 {
  margin-bottom: 0.25rem;
  font-size: 1.75rem;
  color: #fff;
}

.catalogo-header p {
  color: #999;
  font-size: 0.95rem;
}

.secao + .secao {
  margin-top: 2rem;
}

.secao-topo {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 0.75rem;
}

.secao-topo .secao-titulo {
  margin-bottom: 0;
}

.secao-titulo {
  margin-bottom: 0.75rem;
  font-size: 0.95rem;
  font-weight: 700;
  color: #e8c547;
  text-align: center;
  text-transform: uppercase;
  letter-spacing: 0.06em;
}

.secao-topo .secao-titulo {
  text-align: left;
}

.carrossel-wrapper {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.carrossel {
  display: flex;
  gap: 1rem;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  scroll-behavior: smooth;
  padding: 0.25rem 0;
  -ms-overflow-style: none;
  scrollbar-width: none;
}

.carrossel::-webkit-scrollbar {
  display: none;
}

.carrossel .produto {
  flex: 0 0 180px;
  scroll-snap-align: start;
}

.pipocas-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1rem;
}

.lanches-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: repeat(2, 1fr);
  gap: 1rem;
}

.seta-btn {
  flex-shrink: 0;
  width: 36px;
  height: 36px;
  border: 1px solid #333;
  border-radius: 50%;
  background: #1a1a1a;
  color: #fff;
  font-size: 1.4rem;
  line-height: 1;
  cursor: pointer;
  transition:
    background 0.2s ease,
    border-color 0.2s ease;
}

.seta-btn:hover {
  background: #c41e3a;
  border-color: #c41e3a;
}

.produto {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 1.25rem 0.75rem;
  border: 1px solid #2a2a2a;
  border-radius: 12px;
  background: #141414;
  transition:
    box-shadow 0.2s ease,
    transform 0.2s ease,
    border-color 0.2s ease;
}

.produto:hover {
  transform: translateY(-2px);
  border-color: #444;
  box-shadow: 0 6px 24px rgba(0, 0, 0, 0.5);
}

.produto-icone {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 56px;
  height: 56px;
  margin-bottom: 0.65rem;
  border-radius: 50%;
  background: #222;
  font-size: 1.75rem;
  line-height: 1;
}

.produto h3 {
  margin-bottom: 0.35rem;
  font-size: 0.9rem;
  font-weight: 600;
  color: #fff;
  line-height: 1.25;
}

.produto p {
  flex: 1;
  margin-bottom: 0.65rem;
  font-size: 0.78rem;
  color: #888;
  line-height: 1.35;
}

.produto-preco {
  font-size: 0.95rem;
  font-weight: 700;
  color: #e8c547;
}

.btn-adicionar {
  margin-top: 0.5rem;
  padding: 0.45rem 0.75rem;
  border: 1px solid #c41e3a;
  border-radius: 6px;
  background: transparent;
  color: #fff;
  font-size: 0.78rem;
  font-weight: 600;
  cursor: pointer;
  transition:
    background 0.2s ease,
    transform 0.2s ease;
}

.btn-adicionar:hover {
  background: #c41e3a;
  transform: scale(1.03);
}

@media (max-width: 720px) {
  .pipocas-grid,
  .lanches-grid {
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: auto;
  }

  .carrossel .produto {
    flex: 0 0 160px;
  }
}
</style>
