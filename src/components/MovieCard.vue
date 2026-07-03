<script setup>
import { computed, ref } from 'vue'
import { RouterLink } from 'vue-router'
import { bannerUrl } from '../data/filmes'

const props = defineProps({
  filme: {
    type: Object,
    required: true,
  },
  to: {
    type: String,
    default: null,
  },
  afastar: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits(['hover-change'])

const hover = ref(false)
const videoRef = ref(null)
let playTimeout = null

const destino = computed(() => props.to ?? `/filme/${props.filme.id}`)

function iniciarTrailer() {
  hover.value = true
  emit('hover-change', true)

  if (!props.filme.trailer) return

  playTimeout = window.setTimeout(() => {
    const video = videoRef.value
    if (!video || !hover.value) return

    video.currentTime = 0
    video.play().catch(() => {})
  }, 200)
}

function pararTrailer() {
  hover.value = false
  emit('hover-change', false)
  window.clearTimeout(playTimeout)

  const video = videoRef.value
  if (!video) return

  video.pause()
  video.currentTime = 0
}
</script>

<template>
  <li class="movie-card" :class="{ hover, afastar }">
    <RouterLink :to="destino" class="movie-link" @mouseenter="iniciarTrailer" @mouseleave="pararTrailer">
      <div class="movie-media">
        <img
          class="movie-poster"
          :src="bannerUrl(filme.banner)"
          :alt="filme.titulo"
          loading="lazy"
        />

        <video
          v-if="filme.trailer"
          ref="videoRef"
          class="movie-video"
          :class="{ visivel: hover }"
          :src="filme.trailer"
          muted
          loop
          playsinline
          preload="metadata"
        />

        <span class="movie-classificacao">{{ filme.classificacao }}+</span>

        <div class="movie-acoes" :class="{ visivel: hover }">
          <span class="acao-principal">▶ Assistir</span>
          <span class="acao-secundaria">★ Favorito</span>
        </div>
      </div>

      <div class="movie-info">
        <h2>{{ filme.titulo }}</h2>
        <p>{{ filme.duracao }}</p>
      </div>
    </RouterLink>
  </li>
</template>

<style scoped>
.movie-card {
  position: relative;
  z-index: 1;
  list-style: none;
  flex: 1 1 calc(50% - 0.6rem);
  min-width: 120px;
  max-width: 175px;
  transition:
    flex 0.4s cubic-bezier(0.22, 1, 0.36, 1),
    max-width 0.4s cubic-bezier(0.22, 1, 0.36, 1),
    transform 0.4s cubic-bezier(0.22, 1, 0.36, 1),
    opacity 0.35s ease,
    margin 0.4s cubic-bezier(0.22, 1, 0.36, 1);
}

.movie-card.afastar {
  transform: scale(0.92);
  opacity: 0.55;
  margin-inline: 0.15rem;
}

.movie-card.hover {
  flex: 3 0 min(380px, 92vw);
  max-width: min(380px, 92vw);
  z-index: 20;
  transform: translateY(-10px) scale(1);
  opacity: 1;
  margin-inline: 0.5rem;
}

.movie-link {
  display: block;
  text-decoration: none;
  color: inherit;
}

.movie-media {
  position: relative;
  overflow: hidden;
  width: 100%;
  aspect-ratio: 2 / 3;
  border-radius: 10px;
  border: 2px solid #2a2a2a;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.45);
  transition:
    aspect-ratio 0.4s cubic-bezier(0.22, 1, 0.36, 1),
    border-color 0.3s ease,
    box-shadow 0.35s ease,
    border-radius 0.3s ease;
}

.movie-card.hover .movie-media {
  aspect-ratio: 16 / 9;
  border-color: #c41e3a;
  border-radius: 12px;
  box-shadow:
    0 28px 56px rgba(0, 0, 0, 0.7),
    0 0 0 1px rgba(196, 30, 58, 0.5),
    0 0 32px rgba(196, 30, 58, 0.28);
}

.movie-poster {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  opacity: 1;
  transform: scale(1);
  transition:
    opacity 0.3s ease,
    transform 0.4s ease;
}

.movie-card.hover .movie-poster {
  opacity: 0;
  transform: scale(1.08);
}

.movie-video {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 0;
  transition: opacity 0.3s ease 0.05s;
  pointer-events: none;
  background: #000;
}

.movie-video.visivel {
  opacity: 1;
}

.movie-classificacao {
  position: absolute;
  top: 0.5rem;
  left: 0.5rem;
  z-index: 2;
  padding: 0.2rem 0.45rem;
  border-radius: 4px;
  background: rgba(196, 30, 58, 0.92);
  color: #fff;
  font-size: 0.65rem;
  font-weight: 700;
}

.movie-acoes {
  position: absolute;
  inset: auto 0 0;
  z-index: 2;
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
  padding: 2.5rem 0.85rem 0.85rem;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.92) 0%, rgba(0, 0, 0, 0.45) 55%, transparent 100%);
  opacity: 0;
  transform: translateY(8px);
  transition:
    opacity 0.3s ease 0.08s,
    transform 0.35s cubic-bezier(0.22, 1, 0.36, 1) 0.05s;
}

.movie-acoes.visivel {
  opacity: 1;
  transform: translateY(0);
}

.acao-principal,
.acao-secundaria {
  font-size: 0.8rem;
  font-weight: 700;
  letter-spacing: 0.04em;
}

.acao-principal {
  color: #fff;
}

.acao-secundaria {
  color: #e8c547;
}

.movie-info {
  padding: 0.75rem 0.25rem 0;
  text-align: center;
  overflow: hidden;
  max-height: 4rem;
  opacity: 1;
  transition:
    opacity 0.25s ease,
    max-height 0.35s ease,
    padding 0.35s ease;
}

.movie-card.hover .movie-info {
  max-height: 0;
  padding-top: 0;
  opacity: 0;
}

.movie-info h2 {
  margin: 0 0 0.25rem;
  font-size: clamp(0.85rem, 1.5vw, 0.95rem);
  font-weight: 600;
  color: #eee;
  line-height: 1.3;
  transition: color 0.25s ease;
}

.movie-card.hover .movie-info h2 {
  color: #e8c547;
}

.movie-info p {
  margin: 0;
  font-size: 0.75rem;
  color: #666;
}

@media (min-width: 480px) {
  .movie-card {
    flex: 1 1 calc(33.333% - 0.85rem);
    max-width: 165px;
  }
}

@media (min-width: 768px) {
  .movie-card {
    flex: 1 1 calc(25% - 0.9rem);
    max-width: 175px;
  }

  .movie-card.hover {
    flex: 3.2 0 min(400px, 48vw);
    max-width: min(400px, 48vw);
  }
}

@media (min-width: 1024px) {
  .movie-card {
    flex: 1 1 calc(20% - 1rem);
    max-width: 190px;
  }

  .movie-card.hover {
    flex: 3.5 0 420px;
    max-width: 420px;
  }
}
</style>
