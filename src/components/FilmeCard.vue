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
      </div>
      <p>{{ filme.titulo }}</p>
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

.filme-link:hover .filme-poster {
  border-color: #c41e3a;
  box-shadow:
    0 16px 32px rgba(196, 30, 58, 0.35),
    0 0 20px rgba(232, 197, 71, 0.15);
  transform: scale(1.02);
}

.filme-poster img {
  width: 100%;
  aspect-ratio: 2 / 3;
  object-fit: cover;
  display: block;
  transition: transform 0.35s ease;
}

.filme-link:hover .filme-poster img {
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

.filme-link:hover p {
  transform: scale(1.08);
  color: #fff;
  letter-spacing: 0.03em;
}
</style>
