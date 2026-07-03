<script setup>
import { onMounted, ref } from 'vue'
import { RouterLink } from 'vue-router'
import { storeToRefs } from 'pinia'
import { filmes, bannerUrl } from '../data/filmes'
import { useCarrinhoStore } from '../stores/carrinho'

const carrinho = useCarrinhoStore()
const { filmeSelecionado } = storeToRefs(carrinho)

const fase = ref('inicio')

onMounted(() => {
  if (filmeSelecionado.value) {
    fase.value = 'sumido'
  }
})

function iniciarAtendimento() {
  if (fase.value !== 'inicio') return

  fase.value = 'batendo'
  setTimeout(() => {
    fase.value = 'sumindo'
    setTimeout(() => {
      fase.value = 'sumido'
    }, 600)
  }, 650)
}

function selecionarFilme(filme) {
  carrinho.selecionarFilme(filme)
}
</script>

<template>
  <section v-if="fase !== 'sumido'" id="homeClaquete">
    <main>
      <div v-if="fase === 'batendo'" class="flash"></div>

      <div
        class="claquete"
        :class="{ batendo: fase === 'batendo', fechado: fase === 'sumindo', sumindo: fase === 'sumindo' }"
      >
        <div class="claquete-topo"></div>

        <div class="claquete-corpo">
          <div class="info-linha">
            <h1>Seja Bem Vindo</h1>
          </div>
          <div class="info-linha info-linha-divisor"></div>
          <div class="info-linha">
            <button class="btnRun" type="button" :disabled="fase === 'batendo'" @click="iniciarAtendimento">
              {{ fase === 'batendo' ? 'Action!' : 'Iniciar Atendimento' }}
            </button>
          </div>
        </div>
      </div>
    </main>
  </section>

  <section v-else id="home" class="home-selecao">
    <header class="home-header">
      <p class="home-tag">Autoatendimento</p>
      <h1>Qual filme você quer ver?</h1>
      <p class="home-subtitulo">Toque em um cartaz para selecionar sua sessão</p>
    </header>

    <div v-if="filmeSelecionado" class="filme-destaque">
      <img :src="bannerUrl(filmeSelecionado.banner)" :alt="filmeSelecionado.titulo" />
      <div class="filme-destaque-info">
        <span class="destaque-label">Filme selecionado</span>
        <h2>{{ filmeSelecionado.titulo }}</h2>
        <p>{{ filmeSelecionado.duracao }} · {{ filmeSelecionado.sala }}</p>
        <div class="destaque-acoes">
          <RouterLink to="/carrinho" class="btn-continuar">Ir ao carrinho</RouterLink>
          <RouterLink to="/loja" class="btn-loja">Adicionar lanches</RouterLink>
        </div>
      </div>
    </div>

    <ul class="filmes-opcoes">
      <li v-for="filme in filmes" :key="filme.id">
        <button
          type="button"
          class="filme-opcao"
          :class="{ selecionado: filmeSelecionado?.id === filme.id }"
          @click="selecionarFilme(filme)"
        >
          <img :src="bannerUrl(filme.banner)" :alt="filme.titulo" loading="lazy" />
          <span class="filme-opcao-nome">{{ filme.titulo }}</span>
        </button>
      </li>
    </ul>
  </section>
</template>

<style scoped>
main {
  width: 100%;
  min-height: calc(100vh - 80px);
  display: flex;
  justify-content: center;
  align-items: center;
  background: radial-gradient(circle at center, #555 0%, #2b2b2b 35%, #111 70%, #000 100%);
}

.flash {
  position: fixed;
  inset: 0;
  background: #fff;
  opacity: 0;
  pointer-events: none;
  z-index: 10;
  animation: flash-claquete 0.35s ease-out;
}

.claquete {
  width: 420px;
  background: #151515;
  border-radius: 12px;
  border: 3px solid #e0e0e0;
  box-shadow:
    0 0 40px rgba(255, 255, 255, 0.08),
    0 15px 35px rgba(0, 0, 0, 0.6);
  overflow: visible;
}

.claquete-topo {
  width: 102%;
  height: 55px;
  margin-left: -1%;
  margin-bottom: 18px;
  border: 2px solid #dcdcdc;
  border-radius: 8px;
  background: repeating-linear-gradient(-45deg, #fff 0, #fff 22px, #111 22px, #111 44px);
  transform-origin: left center;
  transform: rotate(-18deg);
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.4);
  transition: transform 0.4s ease, margin-bottom 0.4s ease;
}

.claquete.batendo .claquete-topo {
  animation: claquete-bater 0.55s cubic-bezier(0.22, 1, 0.36, 1) forwards;
}

.claquete.fechado .claquete-topo,
.claquete.sumindo .claquete-topo {
  transform: rotate(0deg);
  margin-bottom: 0;
}

.claquete.sumindo {
  animation: claquete-sumir 0.6s ease forwards;
}

@keyframes claquete-sumir {
  to {
    opacity: 0;
    transform: scale(0.85);
  }
}

@keyframes claquete-bater {
  0% {
    transform: rotate(-18deg);
  }
  45% {
    transform: rotate(4deg);
  }
  70% {
    transform: rotate(-1deg);
  }
  100% {
    transform: rotate(0deg);
  }
}

@keyframes flash-claquete {
  0% {
    opacity: 0;
  }
  20% {
    opacity: 0.35;
  }
  100% {
    opacity: 0;
  }
}

.claquete-corpo {
  color: white;
  font-family: monospace;
  display: flex;
  flex-direction: column;
  gap: 18px;
  padding: 15px;
}

.info-linha {
  display: flex;
  justify-content: center;
  align-items: center;
  border-bottom: 1px solid #666;
  padding: 10px 0;
}

.info-linha-divisor {
  justify-content: space-between;
  font-size: 0.75rem;
  letter-spacing: 0.12em;
  color: #bbb;
}

h1 {
  margin: 0;
  font-size: 2rem;
  color: white;
  letter-spacing: 2px;
}

.btnRun {
  width: 85%;
  padding: 12px;
  border: 2px solid white;
  border-radius: 8px;
  background: transparent;
  color: white;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
  transition: 0.25s;
}

.btnRun:hover:not(:disabled) {
  background: white;
  color: black;
  transform: scale(1.05);
}

.btnRun:disabled {
  opacity: 0.7;
  cursor: wait;
}

.home-selecao {
  width: 100%;
  max-width: 900px;
  margin: 0 auto;
  padding: 1.5rem 0 3rem;
  color: #f0f0f0;
}

.home-header {
  margin-bottom: 1.75rem;
  text-align: center;
}

.home-tag {
  display: inline-block;
  margin: 0 0 0.5rem;
  padding: 0.25rem 0.75rem;
  border-radius: 999px;
  background: rgba(196, 30, 58, 0.2);
  color: #e8c547;
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.home-header h1 {
  margin: 0 0 0.35rem;
  font-size: clamp(1.6rem, 4vw, 2.1rem);
  color: #fff;
  letter-spacing: -0.02em;
}

.home-subtitulo {
  margin: 0;
  color: #888;
  font-size: 0.9rem;
}

.filme-destaque {
  display: flex;
  gap: 1.25rem;
  align-items: center;
  margin-bottom: 2rem;
  padding: 1rem;
  border: 2px solid #c41e3a;
  border-radius: 14px;
  background: linear-gradient(135deg, #1a1216 0%, #141414 100%);
  box-shadow: 0 8px 32px rgba(196, 30, 58, 0.15);
}

.filme-destaque img {
  width: 90px;
  aspect-ratio: 2 / 3;
  object-fit: cover;
  border-radius: 8px;
  flex-shrink: 0;
}

.destaque-label {
  display: block;
  margin-bottom: 0.25rem;
  font-size: 0.7rem;
  font-weight: 700;
  color: #e8c547;
  text-transform: uppercase;
  letter-spacing: 0.08em;
}

.filme-destaque-info h2 {
  margin: 0 0 0.35rem;
  font-size: 1.15rem;
  color: #fff;
}

.filme-destaque-info p {
  margin: 0 0 0.85rem;
  font-size: 0.85rem;
  color: #888;
}

.destaque-acoes {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.btn-continuar {
  display: inline-block;
  padding: 0.55rem 1rem;
  border-radius: 8px;
  background: #c41e3a;
  color: #fff;
  font-size: 0.85rem;
  font-weight: 600;
  text-decoration: none;
  transition: background 0.2s ease;
}

.btn-continuar:hover {
  background: #e02545;
}

.btn-loja {
  display: inline-block;
  padding: 0.55rem 1rem;
  border-radius: 8px;
  border: 1px solid rgba(255, 255, 255, 0.25);
  color: #ccc;
  font-size: 0.85rem;
  font-weight: 600;
  text-decoration: none;
  transition: border-color 0.2s ease, color 0.2s ease;
}

.btn-loja:hover {
  border-color: rgba(255, 255, 255, 0.45);
  color: #fff;
}

.filmes-opcoes {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(110px, 1fr));
  gap: 1rem;
  list-style: none;
  margin: 0;
  padding: 0;
}

.filme-opcao {
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 0;
  border: 2px solid #2a2a2a;
  border-radius: 10px;
  overflow: hidden;
  background: #141414;
  cursor: pointer;
  transition: border-color 0.25s ease, transform 0.25s ease, box-shadow 0.25s ease;
}

.filme-opcao:hover {
  transform: translateY(-4px);
  border-color: #555;
}

.filme-opcao.selecionado {
  border-color: #c41e3a;
  box-shadow: 0 0 20px rgba(196, 30, 58, 0.35);
}

.filme-opcao img {
  width: 100%;
  aspect-ratio: 2 / 3;
  object-fit: cover;
  display: block;
}

.filme-opcao-nome {
  padding: 0.5rem 0.35rem;
  font-size: 0.75rem;
  font-weight: 600;
  color: #ccc;
  text-align: center;
  line-height: 1.25;
}

.filme-opcao.selecionado .filme-opcao-nome {
  color: #e8c547;
}

@media (max-width: 520px) {
  .filme-destaque {
    flex-direction: column;
    text-align: center;
  }

  .filme-destaque img {
    width: 120px;
  }
}
</style>
