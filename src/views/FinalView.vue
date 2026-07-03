<script setup>
import { ref } from 'vue'
import { RouterLink } from 'vue-router'
import { storeToRefs } from 'pinia'
import { useCarrinhoStore, PRECO_INGRESSO } from '../stores/carrinho'
import { baixarIngressoHtml, gerarIngressoHtml } from '../utils/gerarIngressoHtml'

const carrinho = useCarrinhoStore()
const { itens, total, filmeSelecionado } = storeToRefs(carrinho)

const etapa = ref('carrinho')
const numeroIngresso = ref('')
const nota = ref(0)
const pedidoResumo = ref([])
const filmePedido = ref(null)
const totalPagamento = ref(0)
const erroValidacao = ref('')
const baixandoIngresso = ref(false)

function formatarPreco(valor) {
  return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
}

function gerarNumeroIngresso() {
  const codigo = Math.floor(100000 + Math.random() * 900000)
  return `CIN-${codigo}`
}

function irParaPagamento() {
  erroValidacao.value = ''

  if (!filmeSelecionado.value) {
    erroValidacao.value = 'Pedido inválido. Escolha um filme antes de pagar.'
    return
  }

  totalPagamento.value = total.value
  etapa.value = 'pagamento'
}

function voltarCarrinho() {
  etapa.value = 'carrinho'
}

function confirmarPagamento() {
  numeroIngresso.value = gerarNumeroIngresso()
  filmePedido.value = { ...filmeSelecionado.value }
  pedidoResumo.value = itens.value.map((item) => ({
    nome: item.nome,
    quantidade: item.quantidade,
    preco: item.preco,
  }))
  carrinho.limpar()
  carrinho.limparFilme()
  etapa.value = 'concluido'
}

function definirNota(valor) {
  nota.value = valor
}

async function baixarIngresso() {
  baixandoIngresso.value = true

  try {
    const html = await gerarIngressoHtml({
      numeroIngresso: numeroIngresso.value,
      filme: filmePedido.value,
      pedidoResumo: pedidoResumo.value,
      total: totalPagamento.value,
      precoIngresso: PRECO_INGRESSO,
      nota: nota.value,
    })

    baixarIngressoHtml(html, numeroIngresso.value)
  } finally {
    baixandoIngresso.value = false
  }
}
</script>

<template>
  <main class="checkout">
    <header class="checkout-header">
      <h1>
        {{
          etapa === 'carrinho' ? 'Carrinho' : etapa === 'pagamento' ? 'Pagamento' : 'Pedido concluído'
        }}
      </h1>
      <p v-if="etapa === 'carrinho' && (itens.length || filmeSelecionado)" class="checkout-subtitulo">
        <span v-if="filmeSelecionado">1 ingresso</span>
        <span v-if="filmeSelecionado && itens.length"> · </span>
        <span v-if="itens.length">{{ itens.length }} {{ itens.length === 1 ? 'item da loja' : 'itens da loja' }}</span>
      </p>
    </header>

    <section v-if="etapa === 'carrinho'">
      <div v-if="!filmeSelecionado && !itens.length" class="checkout-vazio">
        <p>Nenhum filme ou item no pedido.</p>
        <RouterLink to="/">Escolher filme</RouterLink>
      </div>

      <ul v-else class="carrinho-lista">
        <li v-if="filmeSelecionado" class="filme-resumo">
          <span class="resumo-tag">Ingresso</span>
          <strong>{{ filmeSelecionado.titulo }}</strong>
          <span class="resumo-detalhe">{{ filmeSelecionado.sala }} · {{ formatarPreco(PRECO_INGRESSO) }}</span>
        </li>
        <li v-else class="filme-aviso">
          <p>Nenhum filme selecionado.</p>
          <div class="filme-aviso-links">
            <RouterLink to="/">Escolher na Home</RouterLink>
            <RouterLink to="/cartazes">Ver cartazes</RouterLink>
          </div>
        </li>

        <li v-if="!itens.length && filmeSelecionado" class="loja-opcional">
          <p>Quer adicionar pipoca ou bebida?</p>
          <RouterLink to="/loja">Ir para a loja</RouterLink>
        </li>

        <li v-for="item in itens" :key="item.id" class="carrinho-item">
          <div class="item-linha">
            <span class="item-icone" aria-hidden="true">{{ item.icone }}</span>
            <div class="item-info">
              <h2>{{ item.nome }}</h2>
              <p>{{ formatarPreco(item.preco) }} cada</p>
            </div>
            <span class="item-total">{{ formatarPreco(item.preco * item.quantidade) }}</span>
          </div>

          <div class="item-controles">
            <span class="controles-label">Quantidade</span>
            <div class="item-quantidade">
              <button type="button" aria-label="Remover um" @click="carrinho.diminuir(item.id)">-</button>
              <span>{{ item.quantidade }}</span>
              <button type="button" aria-label="Adicionar um" @click="carrinho.aumentar(item.id)">+</button>
            </div>
          </div>
        </li>
      </ul>

      <footer v-if="filmeSelecionado" class="checkout-rodape">
        <p v-if="erroValidacao" class="erro-validacao">
          {{ erroValidacao }}
          <span class="erro-links">
            <RouterLink to="/">Escolher filme</RouterLink>
          </span>
        </p>
        <div class="total-linha">
          <span>Total</span>
          <strong>{{ formatarPreco(total) }}</strong>
        </div>
        <button type="button" class="btn-principal" @click="irParaPagamento">Ir para pagamento</button>
      </footer>
    </section>

    <section v-else-if="etapa === 'pagamento'" class="pagamento">
      <p class="pagamento-total">
        Total a pagar: <strong>{{ formatarPreco(totalPagamento) }}</strong>
      </p>

      <div class="pix-box">
        <div class="pix-cabecalho">
          <span class="pix-logo">Pix</span>
          <span class="pix-badge">Pagamento instantâneo</span>
        </div>
        <p>Escaneie o QR Code com o app do seu banco.</p>
        <div class="pix-qrcode-wrap">
          <img src="/PixLele.jpeg" alt="QR Code Pix" class="pix-qrcode" />
        </div>
      </div>

      <div class="pagamento-acoes">
        <button type="button" class="btn-secundario" @click="voltarCarrinho">Voltar</button>
        <button type="button" class="btn-principal" @click="confirmarPagamento">Confirmar pagamento</button>
      </div>
    </section>

    <section v-else class="concluido">
      <div class="concluido-icone">✓</div>
      <h2>Pagamento confirmado!</h2>
      <p class="ingresso-numero">Ingresso nº <strong>{{ numeroIngresso }}</strong></p>
      <p v-if="filmePedido" class="ingresso-filme">{{ filmePedido.titulo }}</p>

      <div class="nota-box">
        <p>Como foi sua experiência?</p>
        <div class="nota-estrelas">
          <button
            v-for="estrela in 5"
            :key="estrela"
            type="button"
            :class="{ ativa: estrela <= nota }"
            @click="definirNota(estrela)"
          >
            ★
          </button>
        </div>
      </div>

      <ul class="pedido-resumo">
        <li v-if="filmePedido">1x Ingresso — {{ filmePedido.titulo }}</li>
        <li v-for="item in pedidoResumo" :key="item.nome">
          {{ item.quantidade }}x {{ item.nome }}
        </li>
      </ul>

      <button type="button" class="btn-principal" :disabled="baixandoIngresso" @click="baixarIngresso">
        {{ baixandoIngresso ? 'Gerando ingresso...' : 'Baixar ingresso digital' }}
      </button>
      <RouterLink to="/" class="link-inicio">Voltar ao início</RouterLink>
    </section>
  </main>
</template>

<style scoped>
.checkout {
  width: 100%;
  max-width: 520px;
  padding: 1.5rem 0 3rem;
  color: #f0f0f0;
}

.checkout-header {
  margin-bottom: 1.5rem;
  padding-bottom: 0.75rem;
  text-align: center;
  border-bottom: 2px solid #c41e3a;
}

.checkout-header h1 {
  margin: 0;
  font-size: 1.75rem;
  color: #fff;
}

.checkout-subtitulo {
  margin: 0.35rem 0 0;
  color: #888;
  font-size: 0.9rem;
}

.checkout-vazio {
  text-align: center;
  padding: 2rem 1rem;
  color: #888;
}

.checkout-vazio a {
  display: inline-block;
  margin-top: 1rem;
  color: #e8c547;
  text-decoration: none;
}

.carrinho-lista {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 0.85rem;
}

.filme-resumo {
  padding: 1rem;
  border: 1px solid rgba(196, 30, 58, 0.4);
  border-radius: 10px;
  background: rgba(196, 30, 58, 0.08);
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
}

.resumo-tag {
  font-size: 0.7rem;
  font-weight: 700;
  color: #e8c547;
  text-transform: uppercase;
  letter-spacing: 0.08em;
}

.filme-resumo strong {
  color: #fff;
  font-size: 1rem;
}

.resumo-detalhe {
  font-size: 0.8rem;
  color: #888;
}

.filme-aviso {
  padding: 1rem;
  border: 1px solid rgba(229, 57, 53, 0.4);
  border-radius: 10px;
  background: rgba(229, 57, 53, 0.08);
  text-align: center;
}

.filme-aviso p {
  margin: 0 0 0.65rem;
  color: #ff8a80;
  font-size: 0.9rem;
}

.filme-aviso-links {
  display: flex;
  justify-content: center;
  gap: 1rem;
}

.filme-aviso-links a {
  color: #e8c547;
  font-size: 0.85rem;
  text-decoration: none;
}

.loja-opcional {
  padding: 1rem;
  border: 1px dashed rgba(255, 255, 255, 0.15);
  border-radius: 10px;
  text-align: center;
}

.loja-opcional p {
  margin: 0 0 0.5rem;
  color: #888;
  font-size: 0.9rem;
}

.loja-opcional a {
  color: #e8c547;
  font-size: 0.85rem;
  text-decoration: none;
}

.erro-validacao {
  margin: 0 0 1rem;
  padding: 0.75rem;
  border-radius: 8px;
  background: rgba(229, 57, 53, 0.12);
  border: 1px solid rgba(229, 57, 53, 0.35);
  color: #ff8a80;
  font-size: 0.85rem;
  text-align: center;
}

.erro-links {
  display: block;
  margin-top: 0.5rem;
}

.erro-links a {
  color: #e8c547;
  text-decoration: none;
  font-weight: 600;
}

.ingresso-filme {
  margin: -1rem 0 1.5rem;
  color: #ccc;
  font-size: 1rem;
}

.carrinho-item {
  padding: 1rem;
  border: 1px solid #2a2a2a;
  border-radius: 12px;
  background: #141414;
}

.item-linha {
  display: flex;
  align-items: center;
  gap: 0.85rem;
  margin-bottom: 0.85rem;
}

.item-icone {
  font-size: 1.75rem;
  flex-shrink: 0;
}

.item-info {
  flex: 1;
  min-width: 0;
}

.item-info h2 {
  margin: 0 0 0.2rem;
  font-size: 0.95rem;
  color: #fff;
}

.item-info p {
  margin: 0;
  font-size: 0.8rem;
  color: #888;
}

.item-total {
  font-weight: 700;
  color: #e8c547;
  white-space: nowrap;
}

.item-controles {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: 0.75rem;
  border-top: 1px solid #2a2a2a;
}

.controles-label {
  font-size: 0.8rem;
  color: #666;
}

.item-quantidade {
  display: flex;
  align-items: center;
  gap: 0.65rem;
}

.item-quantidade button {
  width: 36px;
  height: 36px;
  border: 1px solid #444;
  border-radius: 8px;
  background: #1a1a1a;
  color: #fff;
  font-size: 1.25rem;
  line-height: 1;
  cursor: pointer;
  transition: border-color 0.2s ease, background 0.2s ease;
}

.item-quantidade button:hover {
  border-color: #c41e3a;
  background: #2a1518;
}

.item-quantidade span {
  min-width: 1.5rem;
  text-align: center;
  font-weight: 700;
  font-size: 1rem;
}

.checkout-rodape {
  margin-top: 1.5rem;
  padding-top: 1rem;
  border-top: 1px solid #333;
}

.total-linha {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  font-size: 1.1rem;
}

.total-linha strong {
  font-size: 1.4rem;
  color: #e8c547;
}

.btn-principal {
  width: 100%;
  padding: 0.85rem;
  border: none;
  border-radius: 8px;
  background: #c41e3a;
  color: #fff;
  font-size: 0.95rem;
  font-weight: 700;
  cursor: pointer;
  transition: background 0.2s ease, transform 0.2s ease;
}

.btn-principal:hover {
  background: #e02545;
  transform: translateY(-1px);
}

.btn-secundario {
  padding: 0.85rem 1.25rem;
  border: 1px solid #444;
  border-radius: 8px;
  background: transparent;
  color: #ccc;
  font-size: 0.9rem;
  cursor: pointer;
  transition: border-color 0.2s ease, color 0.2s ease;
}

.btn-secundario:hover {
  border-color: #888;
  color: #fff;
}

.pagamento-total {
  text-align: center;
  margin-bottom: 1.25rem;
  font-size: 1rem;
  color: #ccc;
}

.pagamento-total strong {
  display: block;
  margin-top: 0.25rem;
  color: #e8c547;
  font-size: 1.5rem;
}

.pix-box {
  padding: 1.5rem;
  border: 1px solid #2a2a2a;
  border-radius: 12px;
  background: #141414;
  text-align: center;
}

.pix-cabecalho {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.65rem;
  margin-bottom: 0.75rem;
}

.pix-logo {
  font-size: 1.25rem;
  font-weight: 800;
  color: #32bcad;
}

.pix-badge {
  padding: 0.2rem 0.6rem;
  border-radius: 999px;
  background: rgba(50, 188, 173, 0.15);
  color: #32bcad;
  font-size: 0.7rem;
  font-weight: 600;
}

.pix-box > p {
  margin: 0 0 1.25rem;
  font-size: 0.85rem;
  color: #888;
}

.pix-qrcode-wrap {
  display: flex;
  justify-content: center;
}

.pix-qrcode {
  width: 100%;
  max-width: 240px;
  height: auto;
  aspect-ratio: 1;
  object-fit: contain;
  border-radius: 8px;
  background: #fff;
  padding: 0.75rem;
}

.pagamento-acoes {
  display: flex;
  gap: 0.75rem;
  margin-top: 1.5rem;
}

.pagamento-acoes .btn-principal {
  flex: 1;
  width: auto;
}

.concluido {
  text-align: center;
}

.concluido-icone {
  width: 64px;
  height: 64px;
  margin: 0 auto 1rem;
  border-radius: 50%;
  background: rgba(46, 125, 50, 0.2);
  border: 2px solid #4caf50;
  color: #4caf50;
  font-size: 2rem;
  line-height: 60px;
}

.concluido h2 {
  margin: 0 0 0.5rem;
  color: #fff;
}

.ingresso-numero {
  margin: 0 0 1.5rem;
  color: #aaa;
  font-size: 0.95rem;
}

.ingresso-numero strong {
  color: #e8c547;
  font-size: 1.15rem;
}

.nota-box {
  margin-bottom: 1.5rem;
  padding: 1rem;
  border: 1px solid #2a2a2a;
  border-radius: 10px;
  background: #141414;
}

.nota-box p {
  margin: 0 0 0.75rem;
  font-size: 0.9rem;
  color: #bbb;
}

.nota-estrelas {
  display: flex;
  justify-content: center;
  gap: 0.35rem;
}

.nota-estrelas button {
  border: none;
  background: none;
  font-size: 1.75rem;
  color: #444;
  cursor: pointer;
  transition: color 0.2s ease, transform 0.2s ease;
}

.nota-estrelas button.ativa {
  color: #e8c547;
}

.nota-estrelas button:hover {
  transform: scale(1.15);
}

.pedido-resumo {
  list-style: none;
  margin: 0 0 1.5rem;
  padding: 0;
  font-size: 0.85rem;
  color: #888;
}

.pedido-resumo li + li {
  margin-top: 0.35rem;
}

.link-inicio {
  display: inline-block;
  margin-top: 1rem;
  color: #e8c547;
  font-size: 0.9rem;
  text-decoration: none;
}
</style>
