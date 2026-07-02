<script setup>
import { computed, watch, watchEffect } from 'vue'
import { RouterLink, RouterView, useRoute } from 'vue-router'
import { useCarrinhoStore } from './stores/carrinho'

const route = useRoute()
const carrinho = useCarrinhoStore()
const paginaLivre = computed(() => route.meta.fullBleed === true)

watchEffect(() => {
  document.body.classList.toggle('pagina-filme', route.meta.fullBleed === true)
})

watch(
  () => route.path,
  (path) => {
    if (path === '/carrinho') carrinho.limparNotificacoes()
  },
)
</script>

<template>
  <header>
      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/cartazes">Cartazes</RouterLink>
        <RouterLink to="/loja">Loja</RouterLink>
        <RouterLink to="/carrinho" class="nav-carrinho">
          Carrinho
          <span v-if="carrinho.notificacoesNovas" class="badge">{{ carrinho.notificacoesNovas }}</span>
        </RouterLink>
      </nav>
  </header>

  <p v-if="carrinho.notificacao" class="toast" role="status">{{ carrinho.notificacao }}</p>

  <div :class="['conteudo', { 'conteudo-livre': paginaLivre }]">
    <RouterView />
  </div>
</template>

<style scoped>
header {
  width: 100%;
  display: flex;
  justify-content: center;
  position: fixed;
  top: 20px;
  left: 0;
  z-index: 1000;
}

nav {
  width: 60vh;
  font-size: 12px;
  text-align: center;
  border: 1px solid #333;
  border-radius: 15px;
  padding: 8px;
  background-color: #141414;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  text-decoration: none;
  color: #aaa;
}

nav a.router-link-exact-active {
  color: #fff;
  background-color: #c41e3a;
  border-radius: 15px;
}

.nav-carrinho {
  position: relative;
  padding-right: 0.5rem;
  margin-right: 0.35rem;
}

.badge {
  position: absolute;
  top: -8px;
  right: -14px;
  min-width: 18px;
  height: 18px;
  padding: 0 5px;
  border-radius: 999px;
  background: #e53935;
  color: #fff;
  font-size: 0.65rem;
  font-weight: 700;
  line-height: 18px;
  text-align: center;
  border: 2px solid #141414;
  box-shadow: 0 2px 8px rgba(229, 57, 53, 0.5);
}

.toast {
  position: fixed;
  top: 90px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 1100;
  padding: 0.75rem 1.25rem;
  border-radius: 8px;
  background: #1a1a1a;
  border: 1px solid #c41e3a;
  color: #fff;
  font-size: 0.9rem;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.4);
  animation: toast-in 0.3s ease;
}

@keyframes toast-in {
  from {
    opacity: 0;
    transform: translateX(-50%) translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateX(-50%) translateY(0);
  }
}

.conteudo {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 clamp(1.25rem, 4vw, 3rem);
  display: flex;
  flex-direction: column;
  align-items: center;
}
.conteudo-livre {
  max-width: none;
  padding: 0;
  align-items: stretch;
}
</style>
