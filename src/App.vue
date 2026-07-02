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
  <RouterView />
</template>

<style scoped>
body{
  margin: 0;
  padding-top: 80px;
}
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
  border: 1px solid black;
  border-radius: 15px;
  padding: 8px;
  background-color: white;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  text-decoration: none;
}

nav a.router-link-exact-active {
  color: white;
  background-color: rgba(0, 0, 0, 0.863);
  border-radius: 15px;
}
</style>
