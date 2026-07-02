<script setup>
import FilmeCard from '../components/FilmeCard.vue'
import { filmes } from '../data/filmes'
</script>

<template>
  <main class="cartazes">
    <header class="cartazes-header">
      <p class="cartazes-tag">Em cartaz agora</p>
      <h1>Escolha seu filme</h1>
      <p class="cartazes-subtitulo">{{ filmes.length }} títulos disponíveis nesta semana</p>
    </header>

    <section class="cartazes-grid">
      <ul class="filmes-lista">
        <FilmeCard v-for="filme in filmes" :key="filme.id" :filme="filme" />
      </ul>
    </section>
  </main>
</template>

<style scoped>
.cartazes {
  width: 100%;
  padding: 2rem 0 4rem;
}

.cartazes-header {
  margin-bottom: 2.5rem;
  padding: 2rem 1.5rem;
  text-align: center;
  border-radius: 16px;
  background: linear-gradient(145deg, #1a1216 0%, #141414 100%);
  border: 1px solid #2a2a2a;
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.35);
}

.cartazes-tag {
  display: inline-block;
  margin: 0 0 0.75rem;
  padding: 0.3rem 0.85rem;
  border-radius: 999px;
  background: rgba(196, 30, 58, 0.2);
  color: #e8c547;
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
}

.cartazes-header h1 {
  margin: 0 0 0.5rem;
  font-size: clamp(1.85rem, 4vw, 2.5rem);
  color: #fff;
  letter-spacing: -0.02em;
}

.cartazes-subtitulo {
  margin: 0;
  color: #888;
  font-size: 0.95rem;
}

.cartazes-grid {
  padding: 0 0.25rem;
}

.filmes-lista {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: clamp(1.25rem, 3vw, 2rem);
  width: 100%;
  list-style: none;
  margin: 0;
  padding: 0;
}

@media (min-width: 480px) {
  .filmes-lista {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (min-width: 768px) {
  .filmes-lista {
    grid-template-columns: repeat(4, 1fr);
  }
}

@media (min-width: 1024px) {
  .filmes-lista {
    grid-template-columns: repeat(5, 1fr);
  }
}
</style>
