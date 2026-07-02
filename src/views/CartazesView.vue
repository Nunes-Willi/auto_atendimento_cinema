<script setup>
import FilmeCard from '../components/FilmeCard.vue'
import { filmes } from '../data/filmes'
</script>

<template>
  <main class="cartazes">
    <header class="cartazes-header">
      <h1>Filmes em cartaz</h1>
    </header>

    <ul class="filmes-lista">
      <FilmeCard v-for="filme in filmes" :key="filme.id" :filme="filme" />
    </ul>
  </main>
</template>

<style scoped>
.cartazes {
  width: 100%;
  padding: 1.5rem 0 3rem;
}

.cartazes-header {
  margin-bottom: 2rem;
  padding-bottom: 1rem;
  text-align: center;
  border-bottom: 2px solid #c41e3a;
}

.cartazes-header h1 {
  font-size: clamp(1.75rem, 4vw, 2.25rem);
  color: #fff;
}

.filmes-lista {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: clamp(1rem, 3vw, 2rem);
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
