<script setup>
import { RouterLink } from 'vue-router'
import { bannerUrl } from '../data/filmes'

defineProps({
  filme: {
    type: Object,
    required: true,
  },
})
</script>

<template>
  <section class="hero" :style="{ backgroundImage: `url('${bannerUrl(filme.bannerHero)}')` }">
    <div class="hero-overlay"></div>

    <div class="hero-conteudo">
      <RouterLink to="/cartazes" class="btn-voltar">← Escolher outro filme</RouterLink>

      <div class="hero-principal">
        <h1>{{ filme.titulo }}</h1>

        <div class="hero-tags">
          <span class="tag tag-classificacao">{{ filme.classificacao }}+</span>
          <span v-for="genero in filme.generos" :key="genero" class="tag">{{ genero }}</span>
          <span class="tag tag-duracao">{{ filme.duracao }}</span>
        </div>

        <div class="hero-nota">
          <span class="estrelas">★★★★★</span>
          <span>Nota média: {{ filme.nota }} ({{ filme.avaliacoes }})</span>
        </div>

        <div class="hero-acoes">
          <button type="button" class="btn-assistir">Comprar ingresso</button>
          <button type="button" class="btn-icone" aria-label="Favoritar">+</button>
          <button type="button" class="btn-icone" aria-label="Compartilhar">↗</button>
        </div>
      </div>

      <div class="hero-detalhes">
        <div class="hero-sinopse">
          <p>{{ filme.sinopse }}</p>
          <span class="link-detalhes">Mais detalhes</span>
        </div>

        <div class="hero-info">
          <p><strong>Ano:</strong> {{ filme.ano }}</p>
          <p><strong>Diretor:</strong> {{ filme.diretor }}</p>
          <p><strong>Áudio:</strong> {{ filme.audio }}</p>
          <p><strong>Legendas:</strong> {{ filme.legendas }}</p>
          <p><strong>Sala:</strong> {{ filme.sala }}</p>
        </div>
      </div>

      <div class="hero-horarios">
        <h2>Horários de hoje</h2>
        <ul>
          <li v-for="horario in filme.horarios" :key="horario">{{ horario }}</li>
        </ul>
      </div>
    </div>
  </section>
</template>

<style scoped>
.hero {
  position: relative;
  width: 100%;
  min-height: 85vh;
  background-size: cover;
  background-position: center top;
  background-repeat: no-repeat;
  color: #fff;
}

.hero-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    90deg,
    rgba(0, 0, 0, 0.92) 0%,
    rgba(0, 0, 0, 0.75) 45%,
    rgba(0, 0, 0, 0.4) 100%
  );
}

.hero-conteudo {
  position: relative;
  z-index: 1;
  max-width: 1200px;
  margin: 0 auto;
  padding: 6rem clamp(1.25rem, 4vw, 3rem) 3rem;
}

.btn-voltar {
  display: inline-flex;
  align-items: center;
  margin-bottom: 1.5rem;
  padding: 0.5rem 1rem;
  border: 1px solid rgba(255, 255, 255, 0.25);
  border-radius: 4px;
  background: rgba(0, 0, 0, 0.45);
  color: #eee;
  font-size: 0.85rem;
  font-weight: 600;
  text-decoration: none;
  transition: background 0.2s ease, border-color 0.2s ease, color 0.2s ease;
}

.btn-voltar:hover {
  border-color: #f47521;
  background: rgba(244, 117, 33, 0.2);
  color: #fff;
}

.hero-principal {
  max-width: 640px;
}

.hero-principal h1 {
  margin-bottom: 1rem;
  font-size: clamp(2rem, 5vw, 3.25rem);
  font-weight: 700;
  line-height: 1.1;
  text-shadow: 0 2px 16px rgba(0, 0, 0, 0.6);
}

.hero-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.tag {
  padding: 0.25rem 0.65rem;
  border-radius: 4px;
  background: rgba(255, 255, 255, 0.12);
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.04em;
}

.tag-classificacao {
  background: rgba(196, 30, 58, 0.85);
}

.tag-duracao {
  text-transform: none;
  letter-spacing: 0;
}

.hero-nota {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
  font-size: 0.9rem;
  color: #ddd;
}

.estrelas {
  color: #f47521;
  letter-spacing: 2px;
}

.hero-acoes {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 2.5rem;
}

.btn-assistir {
  padding: 0.85rem 1.75rem;
  border: none;
  border-radius: 4px;
  background: #f47521;
  color: #fff;
  font-size: 0.9rem;
  font-weight: 700;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  cursor: pointer;
  transition: background 0.2s ease, transform 0.2s ease;
}

.btn-assistir:hover {
  background: #ff8c3a;
  transform: scale(1.02);
}

.btn-icone {
  width: 42px;
  height: 42px;
  border: 1px solid rgba(255, 255, 255, 0.35);
  border-radius: 4px;
  background: rgba(0, 0, 0, 0.4);
  color: #fff;
  font-size: 1.2rem;
  cursor: pointer;
  transition: border-color 0.2s ease, background 0.2s ease;
}

.btn-icone:hover {
  border-color: #f47521;
  background: rgba(244, 117, 33, 0.2);
}

.hero-detalhes {
  display: grid;
  grid-template-columns: 1fr 280px;
  gap: 2rem;
  max-width: 900px;
  margin-bottom: 2rem;
}

.hero-sinopse p {
  font-size: 0.95rem;
  line-height: 1.65;
  color: #ccc;
}

.link-detalhes {
  display: inline-block;
  margin-top: 0.75rem;
  color: #f47521;
  font-size: 0.85rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  cursor: pointer;
}

.hero-info {
  font-size: 0.85rem;
  line-height: 1.7;
  color: #aaa;
}

.hero-info strong {
  color: #ddd;
}

.hero-horarios h2 {
  margin-bottom: 0.75rem;
  font-size: 1rem;
  font-weight: 600;
  color: #fff;
}

.hero-horarios ul {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  list-style: none;
  margin: 0;
  padding: 0;
}

.hero-horarios li {
  padding: 0.5rem 1rem;
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 4px;
  background: rgba(0, 0, 0, 0.35);
  font-size: 0.9rem;
  color: #eee;
}

@media (max-width: 768px) {
  .hero {
    min-height: auto;
  }

  .hero-conteudo {
    padding-top: 5rem;
  }

  .hero-detalhes {
    grid-template-columns: 1fr;
    gap: 1.25rem;
  }
}
</style>
