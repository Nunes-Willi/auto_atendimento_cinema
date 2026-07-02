<script setup>
import { computed, ref } from 'vue'

const combos = [
  {
    icone: '🎬',
    nome: 'Combo Família',
    descricao: '2 baldes + 4 refri + 2 chocolates.',
    preco: 89.9,
  },
  {
    icone: '💑',
    nome: 'Combo Casal',
    descricao: '1 balde grande + 2 refri + 1 chocolate.',
    preco: 54.9,
  },
  {
    icone: '🍿',
    nome: 'Combo Pipoca + Refri',
    descricao: 'Pipoca média + refrigerante 500 ml.',
    preco: 28.9,
  },
  {
    icone: '⭐',
    nome: 'Combo Mega',
    descricao: '3 baldes + 6 refri + nachos + 3 doces.',
    preco: 129.9,
  },
  {
    icone: '🎟️',
    nome: 'Combo Cinema',
    descricao: 'Pipoca + refri + chocolate + caneca.',
    preco: 69.9,
  },
]

const pipocas = [
  {
    icone: '🍿',
    nome: 'Pipoca Salgada',
    descricao: 'Crocante com manteiga, tamanho médio.',
    preco: 18.9,
  },
  {
    icone: '🍬',
    nome: 'Pipoca Doce',
    descricao: 'Caramelizada, ideal para qualquer sessão.',
    preco: 19.9,
  },
  {
    icone: '🧈',
    nome: 'Pipoca Manteiga',
    descricao: 'Extra manteiga, tamanho grande.',
    preco: 22.9,
  },
  {
    icone: '🌶️',
    nome: 'Pipoca Picante',
    descricao: 'Toque de pimenta, tamanho médio.',
    preco: 20.9,
  },
]

const lanches = [
  { icone: '🥤', nome: 'Refrigerante Grande', descricao: '700 ml. Cola, guaraná ou limão.', preco: 12.5 },
  { icone: '💧', nome: 'Água Mineral', descricao: '500 ml gelada.', preco: 6.0 },
  { icone: '🧀', nome: 'Nachos com Queijo', descricao: 'Nachos com molho quentinho.', preco: 24.9 },
  { icone: '🍫', nome: 'Chocolate Premium', descricao: 'Barra belga 100 g.', preco: 15.9 },
  { icone: '🌭', nome: 'Hot Dog', descricao: 'Pão, salsicha e molhos.', preco: 18.0 },
  { icone: '🍟', nome: 'Batata Frita', descricao: 'Porção média crocante.', preco: 16.9 },
  { icone: '🧃', nome: 'Suco Natural', descricao: 'Laranja ou limão, 400 ml.', preco: 11.9 },
  { icone: '🥨', nome: 'Amendoim Salgado', descricao: 'Porção para compartilhar.', preco: 9.9 },
  { icone: '🪣', nome: 'Balde Personalizado', descricao: 'Arte do filme + pipoca grande.', preco: 42.9 },
  { icone: '☕', nome: 'Caneca Temática', descricao: 'Cerâmica exclusiva. 350 ml.', preco: 35.0 },
  { icone: '🍦', nome: 'Sorvete', descricao: 'Casquinha de baunilha ou chocolate.', preco: 14.0 },
  { icone: '🥪', nome: 'Sanduíche Natural', descricao: 'Frango com salada.', preco: 19.9 },
]

const comboRef = ref(null)
const lanchesIndice = ref(0)

const LANCHES_VISIVEIS = 8
const LANCHES_PASSO = 4

const lanchesVisiveis = computed(() => {
  const itens = []
  for (let i = 0; i < LANCHES_VISIVEIS; i++) {
    itens.push(lanches[(lanchesIndice.value + i) % lanches.length])
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
  lanchesIndice.value = (lanchesIndice.value + LANCHES_PASSO) % lanches.length
}
</script>

<template>
  <main class="catalogo">
    <header class="catalogo-header">
      <h1>Catálogo</h1>
      <p>Lanches e colecionáveis da bomboniere.</p>
    </header>

    <!-- 1. Combos -->
    <section class="secao" aria-labelledby="titulo-combos">
      <h2 id="titulo-combos" class="secao-titulo">Combos</h2>

      <div class="carrossel-wrapper">
        <button type="button" class="seta-btn" aria-label="Combos anteriores" @click="moverCombos(-1)">
          ‹
        </button>

        <div :ref="setComboEl" class="carrossel" tabindex="0">
          <article v-for="item in combos" :key="item.nome" class="produto">
            <span class="produto-icone" aria-hidden="true">{{ item.icone }}</span>
            <h3>{{ item.nome }}</h3>
            <p>{{ item.descricao }}</p>
            <span class="produto-preco">{{ formatarPreco(item.preco) }}</span>
          </article>
        </div>

        <button type="button" class="seta-btn" aria-label="Próximos combos" @click="moverCombos(1)">
          ›
        </button>
      </div>
    </section>

    <!-- 2. Pipocas -->
    <section class="secao" aria-labelledby="titulo-pipocas">
      <h2 id="titulo-pipocas" class="secao-titulo">Pipocas</h2>

      <div class="pipocas-grid">
        <article v-for="item in pipocas" :key="item.nome" class="produto">
          <span class="produto-icone" aria-hidden="true">{{ item.icone }}</span>
          <h3>{{ item.nome }}</h3>
          <p>{{ item.descricao }}</p>
          <span class="produto-preco">{{ formatarPreco(item.preco) }}</span>
        </article>
      </div>
    </section>

    <!-- 3. Lanches (resto) -->
    <section class="secao" aria-labelledby="titulo-lanches">
      <div class="secao-topo">
        <h2 id="titulo-lanches" class="secao-titulo">Lanches</h2>
        <button type="button" class="seta-btn" aria-label="Ver mais lanches" @click="avancarLanches">
          ›
        </button>
      </div>

      <div class="lanches-grid">
        <article v-for="(item, i) in lanchesVisiveis" :key="`${item.nome}-${i}`" class="produto">
          <span class="produto-icone" aria-hidden="true">{{ item.icone }}</span>
          <h3>{{ item.nome }}</h3>
          <p>{{ item.descricao }}</p>
          <span class="produto-preco">{{ formatarPreco(item.preco) }}</span>
        </article>
      </div>
    </section>
  </main>
</template>

<style scoped>
.catalogo {
  width: 100%;
  max-width: 960px;
  margin: 0 auto;
  padding: 1rem 0 2.5rem;
  color: #f0f0f0;
}

.catalogo-header {
  margin-bottom: 1.75rem;
  padding-bottom: 0.75rem;
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
  text-transform: uppercase;
  letter-spacing: 0.06em;
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
  transition: background 0.2s ease, border-color 0.2s ease;
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
  transition: box-shadow 0.2s ease, transform 0.2s ease, border-color 0.2s ease;
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
