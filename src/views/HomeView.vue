<script setup>

</script>

<template>
  <main>
    <div class="claquete">
      <div class="claquete-topo">
        <div class="tira-branca"></div>
        <div class="tira-preta"></div>
      </div>
      <div class="claquete-corpo">
        <div class="info-linha">
          <h1>Seja Bem Vindo</h1>
        </div>
        <div class="info-linha"><span>-----------------</span> <span>---------------------</span></div>
        <div class="info-linha"><button class="start">Iniciar Atendimento</button></div>
      </div>
    </div>
  </main>
</template>
<style scoped>
main {
  width: 100%;
  min-height: calc(100vh - 80px);

  display: flex;
  justify-content: center;
  align-items: center;

  background: radial-gradient(
    circle at center,
    #555 0%,
    #2b2b2b 35%,
    #111 70%,
    #000 100%
  );
}

.claquete {
  width: 420px;
  background: #151515;
  border-radius: 12px;
  border: 3px solid #e0e0e0;
  box-shadow:
    0 0 40px rgba(255,255,255,.08),
    0 15px 35px rgba(0,0,0,.6);

  overflow: visible;
}

.claquete-topo {
  width: 102%;
  height: 55px;

  margin-left: -1%;
  margin-bottom: 18px;

  border: 2px solid #dcdcdc;
  border-radius: 8px;

  background: repeating-linear-gradient(
    -45deg,
    #fff 0,
    #fff 22px,
    #111 22px,
    #111 44px
  );

  transform-origin: left center;
  transform: rotate(-18deg);

  box-shadow: 0 5px 10px rgba(0,0,0,.4);
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

.info-linha:nth-child(2) {
  justify-content: space-between;
}

h1 {
  margin: 0;
  font-size: 2rem;
  color: white;
  letter-spacing: 2px;
}

.start {
  width: 85%;

  padding: 12px;

  border: 2px solid white;
  border-radius: 8px;

  background: transparent;
  color: white;

  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;

  transition: .25s;
}

.start:hover {
  background: white;
  color: black;
  transform: scale(1.05);
}
</style>
