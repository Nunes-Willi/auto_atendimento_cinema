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
  <li class="filme">
    <RouterLink :to="`/filme/${filme.id}`" class="filme-link">
      <div class="filme-poster">
        <img :src="bannerUrl(filme.banner)" :alt="filme.titulo" loading="lazy" />
        <span class="filme-classificacao">{{ filme.classificacao }}+</span>
        <span class="filme-overlay">Ver detalhes</span>
      </div>
      <div class="filme-info">
        <h2>{{ filme.titulo }}</h2>
        <p>{{ filme.duracao }}</p>
      </div>
    </RouterLink>
  </li>
</template>

<style scoped>
.filme {
  position: relative;
  z-index: 1;
  list-style: none;
}

.filme-link {
  display: block;
  text-decoration: none;
  color: inherit;
  transition: transform 0.35s ease;
}

.filme:hover {
  z-index: 2;
}

.filme-link:hover {
  transform: translateY(-6px);
}

.filme-poster {
  position: relative;
  overflow: hidden;
  border-radius: 10px;
  border: 2px solid #2a2a2a;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.45);
  transition:
    border-color 0.35s ease,
    box-shadow 0.35s ease;
}

.filme-link:hover .filme-poster {
  border-color: #c41e3a;
  box-shadow:
    0 20px 40px rgba(196, 30, 58, 0.3),
    0 0 24px rgba(232, 197, 71, 0.1);
}

.filme-poster img {
  width: 100%;
  aspect-ratio: 2 / 3;
  object-fit: cover;
  display: block;
  transition: transform 0.4s ease;
}

.filme-link:hover .filme-poster img {
  transform: scale(1.08);
}

.filme-classificacao {
  position: absolute;
  top: 0.5rem;
  left: 0.5rem;
  padding: 0.2rem 0.45rem;
  border-radius: 4px;
  background: rgba(196, 30, 58, 0.9);
  color: #fff;
  font-size: 0.65rem;
  font-weight: 700;
}

.filme-overlay {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.55);
  color: #fff;
  font-size: 0.8rem;
  font-weight: 600;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.filme-link:hover .filme-overlay {
  opacity: 1;
}

.filme-info {
  padding: 0.75rem 0.25rem 0;
  text-align: center;
}

.filme-info h2 {
  margin: 0 0 0.25rem;
  font-size: clamp(0.85rem, 1.5vw, 0.95rem);
  font-weight: 600;
  color: #eee;
  line-height: 1.3;
  transition: color 0.3s ease;
}

.filme-link:hover .filme-info h2 {
  color: #e8c547;
}

.filme-info p {
  margin: 0;
  font-size: 0.75rem;
  color: #666;
}
</style>
