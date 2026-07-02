<script setup>
import { RouterLink, useRouter } from 'vue-router'
import { bannerUrl } from '../data/filmes'

const router = useRouter()

defineProps({
  filme: {
    type: Object,
    required: true,
  },
})

function comprarIngresso() {
  router.push('/')
}
</script>

<template>
  <section class="hero" :style="{ backgroundImage: `url('${bannerUrl(filme.bannerHero)}')` }">
    <div class="hero-overlay"></div>

    <div class="hero-conteudo">
      <RouterLink to="/cartazes" class="btn-voltar">← Escolher outro filme</RouterLink>

      <div class="hero-topo">
        <div class="hero-principal">
          <h1>{{ filme.titulo }}</h1>

          <div class="hero-tags">
            <span class="tag tag-classificacao">{{ filme.classificacao }}+</span>
            <span v-for="genero in filme.generos" :key="genero" class="tag">{{ genero }}</span>
            <span class="tag tag-duracao">{{ filme.duracao }}</span>
          </div>

          <div class="hero-nota">
            <span class="estrelas">★★★★★</span>
            <span>{{ filme.nota }} · {{ filme.avaliacoes }} avaliações</span>
          </div>

          <div class="hero-acoes">
            <button type="button" class="btn-assistir" @click="comprarIngresso">Comprar ingresso</button>
          </div>
        </div>

        <div class="hero-poster">
          <img :src="bannerUrl(filme.banner)" :alt="filme.titulo" />
        </div>
      </div>

      <div class="hero-painel">
        <div class="painel-bloco painel-sinopse">
          <h2>Sinopse</h2>
          <p>{{ filme.sinopse }}</p>
        </div>

        <div class="painel-bloco painel-info">
          <h2>Informações</h2>
          <dl>
            <div><dt>Ano</dt><dd>{{ filme.ano }}</dd></div>
            <div><dt>Diretor</dt><dd>{{ filme.diretor }}</dd></div>
            <div><dt>Áudio</dt><dd>{{ filme.audio }}</dd></div>
            <div><dt>Legendas</dt><dd>{{ filme.legendas }}</dd></div>
            <div><dt>Sala</dt><dd>{{ filme.sala }}</dd></div>
          </dl>
        </div>
      </div>

      <div class="hero-horarios">
        <h2>Sessões de hoje</h2>
        <ul>
          <li v-for="horario in filme.horarios" :key="horario">
            <button type="button">{{ horario }}</button>
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>

<style scoped>
.hero {
  position: relative;
  width: 100%;
  min-height: 100vh;
  background-size: cover;
  background-position: center top;
  background-repeat: no-repeat;
  color: #fff;
}

.hero-overlay {
  position: absolute;
  inset: 0;
  background:
    linear-gradient(to top, rgba(0, 0, 0, 0.95) 0%, rgba(0, 0, 0, 0.4) 40%, rgba(0, 0, 0, 0.65) 100%),
    linear-gradient(to right, rgba(0, 0, 0, 0.92) 0%, rgba(0, 0, 0, 0.5) 50%, transparent 100%);
}

.hero-conteudo {
  position: relative;
  z-index: 1;
  max-width: 1100px;
  margin: 0 auto;
  padding: 5.5rem clamp(1.25rem, 4vw, 3rem) 3rem;
}

.btn-voltar {
  display: inline-flex;
  align-items: center;
  margin-bottom: 2rem;
  padding: 0.5rem 1rem;
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 999px;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(8px);
  color: #eee;
  font-size: 0.85rem;
  font-weight: 600;
  text-decoration: none;
  transition: background 0.2s ease, border-color 0.2s ease;
}

.btn-voltar:hover {
  border-color: #f47521;
  background: rgba(244, 117, 33, 0.25);
  color: #fff;
}

.hero-topo {
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 2.5rem;
  align-items: end;
  margin-bottom: 2.5rem;
}

.hero-principal h1 {
  margin: 0 0 1rem;
  font-size: clamp(2.2rem, 5vw, 3.5rem);
  font-weight: 800;
  line-height: 1.05;
  letter-spacing: -0.02em;
  text-shadow: 0 4px 24px rgba(0, 0, 0, 0.6);
}

.hero-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.tag {
  padding: 0.3rem 0.7rem;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(4px);
  font-size: 0.72rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.tag-classificacao {
  background: rgba(196, 30, 58, 0.9);
}

.tag-duracao {
  text-transform: none;
  letter-spacing: 0;
}

.hero-nota {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  margin-bottom: 1.75rem;
  font-size: 0.95rem;
  color: #ccc;
}

.estrelas {
  color: #f47521;
  letter-spacing: 1px;
}

.btn-assistir {
  padding: 1rem 2rem;
  border: none;
  border-radius: 999px;
  background: linear-gradient(135deg, #f47521 0%, #e85d04 100%);
  color: #fff;
  font-size: 0.95rem;
  font-weight: 700;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  cursor: pointer;
  box-shadow: 0 8px 24px rgba(244, 117, 33, 0.35);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.btn-assistir:hover {
  transform: translateY(-2px);
  box-shadow: 0 12px 32px rgba(244, 117, 33, 0.45);
}

.hero-poster {
  display: none;
  width: 200px;
  flex-shrink: 0;
  border-radius: 12px;
  overflow: hidden;
  border: 3px solid rgba(255, 255, 255, 0.15);
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.6);
}

.hero-poster img {
  width: 100%;
  aspect-ratio: 2 / 3;
  object-fit: cover;
  display: block;
}

.hero-painel {
  display: grid;
  grid-template-columns: 1.4fr 1fr;
  gap: 1.25rem;
  margin-bottom: 2rem;
}

.painel-bloco {
  padding: 1.25rem 1.5rem;
  border-radius: 12px;
  background: rgba(20, 20, 20, 0.75);
  border: 1px solid rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(12px);
}

.painel-bloco h2 {
  margin: 0 0 0.85rem;
  font-size: 0.75rem;
  font-weight: 700;
  color: #e8c547;
  text-transform: uppercase;
  letter-spacing: 0.1em;
}

.painel-sinopse p {
  margin: 0;
  font-size: 0.95rem;
  line-height: 1.7;
  color: #bbb;
}

.painel-info dl {
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 0.65rem;
}

.painel-info div {
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  padding-bottom: 0.65rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.06);
  font-size: 0.85rem;
}

.painel-info div:last-child {
  border-bottom: none;
  padding-bottom: 0;
}

.painel-info dt {
  color: #777;
  font-weight: 500;
}

.painel-info dd {
  margin: 0;
  color: #eee;
  text-align: right;
}

.hero-horarios {
  padding: 1.25rem 1.5rem;
  border-radius: 12px;
  background: rgba(10, 10, 10, 0.8);
  border: 1px solid rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(12px);
}

.hero-horarios h2 {
  margin: 0 0 1rem;
  font-size: 0.75rem;
  font-weight: 700;
  color: #e8c547;
  text-transform: uppercase;
  letter-spacing: 0.1em;
}

.hero-horarios ul {
  display: flex;
  flex-wrap: wrap;
  gap: 0.65rem;
  list-style: none;
  margin: 0;
  padding: 0;
}

.hero-horarios button {
  padding: 0.65rem 1.25rem;
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.05);
  color: #fff;
  font-size: 0.95rem;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s ease, border-color 0.2s ease, transform 0.2s ease;
}

.hero-horarios button:hover {
  border-color: #f47521;
  background: rgba(244, 117, 33, 0.2);
  transform: translateY(-2px);
}

@media (min-width: 768px) {
  .hero-poster {
    display: block;
  }
}

@media (max-width: 768px) {
  .hero {
    min-height: auto;
  }

  .hero-conteudo {
    padding-top: 5rem;
  }

  .hero-topo {
    grid-template-columns: 1fr;
  }

  .hero-painel {
    grid-template-columns: 1fr;
  }
}
</style>
