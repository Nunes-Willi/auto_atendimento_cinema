<script setup>
const filmes = [
  {
    titulo: 'Premonição 6',
    banner:
      '/banner/Poster Final Destination - Bloodlines - Premonição 6 - Filmes - Cartaz ou Quadro Decorativo.jpeg',
  },
  {
    titulo: 'Pânico',
    banner: '/banner/panico.webp',
  },
  {
    titulo: 'Spider-Man: New Day',
    banner: '/banner/spiderman-newday.jpeg',
  },
  {
    titulo: 'Pulp Fiction',
    banner: '/banner/pulp fiction.jpeg',
  },
  {
    titulo: 'Homem-Aranha no Aranhaverso',
    banner:
      '/banner/Spider-man Across The Spider-verse The Official Movie Special Book By Titan.jpeg',
  },
]
</script>

<template>
  <main class="cartazes">
    <header class="cartazes-header">
      <h1>Filmes em cartaz</h1>
    </header>

    <ul class="filmes-lista">
      <li v-for="filme in filmes" :key="filme.titulo" class="filme">
        <div class="filme-poster">
          <img :src="encodeURI(filme.banner)" :alt="filme.titulo" loading="lazy" />
        </div>
        <p>{{ filme.titulo }}</p>
      </li>
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

.filme {
  position: relative;
  z-index: 1;
  transition: transform 0.35s ease, z-index 0s;
}

.filme:hover {
  z-index: 2;
  transform: scale(1.06) translateY(-8px);
}

.filme-poster {
  overflow: hidden;
  border-radius: 8px;
  border: 2px solid #2a2a2a;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.4);
  transition:
    border-color 0.35s ease,
    box-shadow 0.35s ease,
    transform 0.35s ease;
}

.filme:hover .filme-poster {
  border-color: #c41e3a;
  box-shadow:
    0 16px 32px rgba(196, 30, 58, 0.35),
    0 0 20px rgba(232, 197, 71, 0.15);
  transform: scale(1.02);
}

.filme img {
  width: 100%;
  aspect-ratio: 2 / 3;
  object-fit: cover;
  display: block;
  transition: transform 0.35s ease;
}

.filme:hover img {
  transform: scale(1.12);
}

.filme p {
  margin-top: 0.75rem;
  font-size: clamp(0.85rem, 1.5vw, 1rem);
  color: #999;
  text-align: center;
  transition:
    transform 0.35s ease,
    color 0.35s ease,
    letter-spacing 0.35s ease;
}

.filme:hover p {
  transform: scale(1.08);
  color: #fff;
  letter-spacing: 0.03em;
}
</style>
