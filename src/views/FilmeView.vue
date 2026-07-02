<script setup>
import { computed } from 'vue'
import { useRoute, RouterLink } from 'vue-router'
import FilmeHero from '../components/FilmeHero.vue'
import { getFilmeById } from '../data/filmes'

const route = useRoute()
const filme = computed(() => getFilmeById(route.params.id))
</script>

<template>
  <div v-if="filme" class="filme-pagina">
    <FilmeHero :filme="filme" />
  </div>

  <div v-else class="filme-nao-encontrado">
    <h1>Filme não encontrado</h1>
    <RouterLink to="/cartazes">Voltar aos cartazes</RouterLink>
  </div>
</template>

<style scoped>
.filme-pagina {
  width: 100%;
}

.filme-nao-encontrado {
  padding: 4rem 1rem;
  text-align: center;
}

.filme-nao-encontrado h1 {
  margin-bottom: 1rem;
  color: #fff;
}

.filme-nao-encontrado a {
  color: #f47521;
  text-decoration: none;
}
</style>
