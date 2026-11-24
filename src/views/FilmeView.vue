<script setup>
import { ref, watch } from 'vue'
import { useRoute, RouterLink } from 'vue-router'
import FilmeHero from '../components/FilmeHero.vue'
import { useFilmesStore } from '../stores/filmes'

const route = useRoute()
const filmesStore = useFilmesStore()

const filme = ref(null)
const carregando = ref(true)
const erro = ref('')

watch(
  () => route.params.id,
  async (id) => {
    carregando.value = true
    erro.value = ''
    try {
      filme.value = await filmesStore.obter(id)
    } catch (e) {
      console.error(e)
      erro.value = 'Não foi possível falar com a API Django.'
    } finally {
      carregando.value = false
    }
  },
  { immediate: true },
)
</script>

<template>
  <div v-if="carregando" class="filme-nao-encontrado">
    <p>Carregando filme...</p>
  </div>

  <div v-else-if="erro" class="filme-nao-encontrado">
    <h1>{{ erro }}</h1>
    <RouterLink to="/cartazes">Voltar aos cartazes</RouterLink>
  </div>

  <div v-else-if="filme" class="filme-pagina">
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
