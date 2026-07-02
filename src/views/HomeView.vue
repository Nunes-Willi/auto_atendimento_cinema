<script setup>
import { ref } from 'vue'

const fase = ref('inicio')

function iniciarAtendimento() {
  if (fase.value !== 'inicio') return

  fase.value = 'batendo'
  setTimeout(() => {
    fase.value = 'sumindo'
    setTimeout(() => {
      fase.value = 'sumido'
    }, 600)
  }, 650)
}

</script>

<template>
  <section id="homeClaquete" v-if="fase !== 'sumido'">
  <main>
    <div v-if="fase === 'batendo'" class="flash"></div>

    <div
      v-if="fase !== 'sumido'"
      class="claquete"
      :class="{ batendo: fase === 'batendo', fechado: fase === 'sumindo', sumindo: fase === 'sumindo' }"
    >
      <div class="claquete-topo"></div>

      <div class="claquete-corpo">
        <div class="info-linha">
          <h1>Seja Bem Vindo</h1>
        </div>
        <div class="info-linha info-linha-divisor">
        </div>
        <div class="info-linha">
          <button class="btnRun" type="button" :disabled="fase === 'batendo'" @click="iniciarAtendimento">
            {{ fase === 'batendo' ? 'Action!' : 'Iniciar Atendimento' }}
          </button>
        </div>
      </div>
    </div>
    </main>
  </section>
  <section id="home" v-else>
    <div>
      <h1>Compra de Ingressos</h1>
      <ul>
        <li class="1filme">
          <img src="/banner/panico.webp" alt="">
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur debitis necessitatibus amet sed id. Corporis nemo nobis cum corrupti facilis fugiat cumque voluptatibus ipsa, reprehenderit laboriosam soluta minus non consequatur.</p>
        </li>
        <li class="2filme">
          <img src="/banner/panico.webp" alt="">
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur debitis necessitatibus amet sed id. Corporis nemo nobis cum corrupti facilis fugiat cumque voluptatibus ipsa, reprehenderit laboriosam soluta minus non consequatur.</p>
        </li>
        <li class="3filme">
          <img src="/banner/panico.webp" alt="">
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur debitis necessitatibus amet sed id. Corporis nemo nobis cum corrupti facilis fugiat cumque voluptatibus ipsa, reprehenderit laboriosam soluta minus non consequatur.</p>
        </li>
        <li class="4filme">
          <img src="/banner/panico.webp" alt="">
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur debitis necessitatibus amet sed id. Corporis nemo nobis cum corrupti facilis fugiat cumque voluptatibus ipsa, reprehenderit laboriosam soluta minus non consequatur.</p>
        </li>
        <li class="5filme">
          <img src="/banner/panico.webp" alt="">
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur debitis necessitatibus amet sed id. Corporis nemo nobis cum corrupti facilis fugiat cumque voluptatibus ipsa, reprehenderit laboriosam soluta minus non consequatur.</p>
        </li>
      </ul>
    </div>
  </section>
</template>

<style scoped>
main {
  width: 100%;
  min-height: calc(100vh - 80px);
  display: flex;
  justify-content: center;
  align-items: center;
  background: radial-gradient(circle at center, #555 0%, #2b2b2b 35%, #111 70%, #000 100%);
}

.flash {
  position: fixed;
  inset: 0;
  background: #fff;
  opacity: 0;
  pointer-events: none;
  z-index: 10;
  animation: flash-claquete 0.35s ease-out;

  border-radius: 2rem;
}

.claquete {
  width: 420px;
  background: #151515;
  border-radius: 12px;
  border: 3px solid #e0e0e0;
  box-shadow:
    0 0 40px rgba(255, 255, 255, 0.08),
    0 15px 35px rgba(0, 0, 0, 0.6);
  overflow: visible;
}

.claquete-topo {
  width: 102%;
  height: 55px;
  margin-left: -1%;
  margin-bottom: 18px;
  border: 2px solid #dcdcdc;
  border-radius: 8px;
  background: repeating-linear-gradient(-45deg, #fff 0, #fff 22px, #111 22px, #111 44px);
  transform-origin: left center;
  transform: rotate(-18deg);
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.4);
  transition: transform 0.4s ease, margin-bottom 0.4s ease;
}

.claquete.batendo .claquete-topo {
  animation: claquete-bater 0.55s cubic-bezier(0.22, 1, 0.36, 1) forwards;
}

.claquete.fechado .claquete-topo,
.claquete.sumindo .claquete-topo {
  transform: rotate(0deg);
  margin-bottom: 0;
}

.claquete.sumindo {
  animation: claquete-sumir 0.6s ease forwards;
}

@keyframes claquete-sumir {
  to {
    opacity: 0;
    transform: scale(0.85);
  }
}

@keyframes claquete-bater {
  0% {
    transform: rotate(-18deg);
  }
  45% {
    transform: rotate(4deg);
  }
  70% {
    transform: rotate(-1deg);
  }
  100% {
    transform: rotate(0deg);
  }
}

@keyframes flash-claquete {
  0% {
    opacity: 0;
  }
  20% {
    opacity: 0.35;
  }
  100% {
    opacity: 0;
  }
}

.claquete-corpo {
  color: white;
  font-family: monospace;
  display: flex;
  flex-direction: column;
  gap: 18px;
  padding: 15px;
}

.info-linha {
  display: flex;
  justify-content: center;
  align-items: center;
  border-bottom: 1px solid #666;
  padding: 10px 0;
}

.info-linha-divisor {
  justify-content: space-between;
  font-size: 0.75rem;
  letter-spacing: 0.12em;
  color: #bbb;
}

h1 {
  margin: 0;
  font-size: 2rem;
  color: white;
  letter-spacing: 2px;
}

.btnRun {
  width: 85%;
  padding: 12px;
  border: 2px solid white;
  border-radius: 8px;
  background: transparent;
  color: white;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
  transition: 0.25s;
}

.btnRun:hover:not(:disabled) {
  background: white;
  color: black;
  transform: scale(1.05);
}

.start:disabled {
  opacity: 0.7;
  cursor: wait;
}

#home {
  background: #111;
  padding: 60px 40px;
  color: white;
}

#home h1 {
  text-align: center;
  margin-bottom: 40px;
  font-size: 2.5rem;
}

#home ul {
  display: flex;
  justify-content: center;
  gap: 25px;
  flex-wrap: wrap;
  padding: 0;
}

#home ul li {
  width: 230px;
  list-style: none;

  display: flex;
  flex-direction: column;
  align-items: center;

  background: #1b1b1b;
  border: 2px solid #444;
  border-radius: 12px;

  padding: 20px;

  transition: .3s;
}

#home ul li:hover {
  border-color: white;
  transform: translateY(-8px);
  box-shadow: 0 10px 25px rgba(255,255,255,.15);
}

#home img {
  width: 170px;
  aspect-ratio: 2 / 3;
  object-fit: cover;

  border-radius: 8px;
  margin-bottom: 18px;
}

#home p {
  text-align: justify;
  line-height: 1.6;
  font-size: .95rem;
}
</style>
