<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <header>
      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/cartazes">Cartazes</RouterLink>
        <RouterLink to="/loja">Loja</RouterLink>
        <RouterLink to="/final">Final</RouterLink>
      </nav>
  </header>
  <div class="conteudo">
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

.conteudo {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 clamp(1.25rem, 4vw, 3rem);
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
