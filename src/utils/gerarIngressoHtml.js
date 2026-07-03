function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

function bannerUrl(caminho) {
  return encodeURI(caminho)
}

function formatarPreco(valor) {
  return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
}

async function carregarPosterBase64(banner) {
  if (!banner) return null

  try {
    const res = await fetch(bannerUrl(banner))
    if (!res.ok) return null
    const blob = await res.blob()
    return await new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.onload = () => resolve(reader.result)
      reader.onerror = reject
      reader.readAsDataURL(blob)
    })
  } catch {
    return null
  }
}

function gerarCodigoBarras(numero) {
  const digitos = numero.replace(/\D/g, '').padEnd(12, '0').slice(0, 12)
  let barras = ''

  for (const digito of digitos) {
    const largura = (Number(digito) % 3) + 1
    barras += `<span style="width:${largura}px"></span>`
  }

  return barras
}

function linhasItens(filme, pedidoResumo, precoIngresso) {
  const linhas = []

  if (filme) {
    linhas.push({
      nome: `Ingresso · ${filme.titulo}`,
      detalhe: filme.sala,
      valor: precoIngresso,
    })
  }

  for (const item of pedidoResumo) {
    linhas.push({
      nome: `${item.quantidade}x ${item.nome}`,
      detalhe: null,
      valor: item.preco * item.quantidade,
    })
  }

  return linhas
}

export async function gerarIngressoHtml({
  numeroIngresso,
  filme,
  pedidoResumo,
  total,
  precoIngresso,
  nota = 0,
  dataCompra = new Date(),
}) {
  const poster = filme ? await carregarPosterBase64(filme.banner) : null
  const dataFormatada = dataCompra.toLocaleString('pt-BR', {
    weekday: 'long',
    day: '2-digit',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
  const itens = linhasItens(filme, pedidoResumo, precoIngresso)
  const estrelas =
    nota > 0
      ? `${'★'.repeat(nota)}${'☆'.repeat(5 - nota)}`
      : null

  const itensHtml = itens
    .map(
      (item) => `
        <div class="item">
          <div>
            <strong>${escapeHtml(item.nome)}</strong>
            ${item.detalhe ? `<span>${escapeHtml(item.detalhe)}</span>` : ''}
          </div>
          <em>${formatarPreco(item.valor)}</em>
        </div>`,
    )
    .join('')

  return `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Ingresso ${escapeHtml(numeroIngresso)}</title>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }

    body {
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 2rem 1rem;
      font-family: "Segoe UI", system-ui, sans-serif;
      background:
        radial-gradient(circle at 20% 20%, rgba(196, 30, 58, 0.25), transparent 40%),
        radial-gradient(circle at 80% 80%, rgba(232, 197, 71, 0.12), transparent 35%),
        #0a0a0a;
      color: #f5f5f5;
    }

    .ticket {
      width: min(420px, 100%);
      border-radius: 20px;
      overflow: hidden;
      box-shadow:
        0 24px 60px rgba(0, 0, 0, 0.55),
        0 0 0 1px rgba(255, 255, 255, 0.06);
      background: linear-gradient(160deg, #1a1a1a 0%, #111 55%, #0d0d0d 100%);
    }

    .ticket-top {
      position: relative;
      padding: 1.5rem 1.5rem 1.25rem;
      background: linear-gradient(135deg, #c41e3a 0%, #8b1228 100%);
    }

    .ticket-top::after {
      content: "";
      position: absolute;
      inset: auto 0 -1px;
      height: 12px;
      background:
        radial-gradient(circle at 10px 0, transparent 10px, #111 10px) repeat-x;
      background-size: 20px 12px;
    }

    .brand {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 1rem;
      margin-bottom: 1rem;
    }

    .brand h1 {
      font-size: 1.1rem;
      letter-spacing: 0.22em;
      text-transform: uppercase;
    }

    .brand span {
      font-size: 0.7rem;
      letter-spacing: 0.08em;
      text-transform: uppercase;
      opacity: 0.85;
      padding: 0.35rem 0.55rem;
      border: 1px solid rgba(255, 255, 255, 0.35);
      border-radius: 999px;
    }

    .hero {
      display: grid;
      grid-template-columns: ${poster ? '96px 1fr' : '1fr'};
      gap: 1rem;
      align-items: center;
    }

    .poster {
      width: 96px;
      aspect-ratio: 2 / 3;
      object-fit: cover;
      border-radius: 10px;
      box-shadow: 0 8px 24px rgba(0, 0, 0, 0.35);
    }

    .filme-titulo {
      font-size: 1.55rem;
      line-height: 1.15;
      margin-bottom: 0.45rem;
    }

    .filme-meta {
      font-size: 0.85rem;
      opacity: 0.9;
    }

    .ticket-body {
      padding: 1.35rem 1.5rem 1.5rem;
    }

    .codigo-box {
      text-align: center;
      padding: 1rem;
      margin-bottom: 1.25rem;
      border-radius: 14px;
      background: rgba(255, 255, 255, 0.04);
      border: 1px dashed rgba(255, 255, 255, 0.12);
    }

    .codigo-label {
      display: block;
      font-size: 0.72rem;
      letter-spacing: 0.14em;
      text-transform: uppercase;
      color: #888;
      margin-bottom: 0.35rem;
    }

    .codigo-numero {
      font-size: 1.45rem;
      font-weight: 700;
      letter-spacing: 0.08em;
      color: #e8c547;
    }

    .barcode {
      display: flex;
      justify-content: center;
      align-items: flex-end;
      gap: 2px;
      height: 48px;
      margin: 0.85rem auto 0;
      max-width: 240px;
    }

    .barcode span {
      display: block;
      height: 100%;
      background: #f0f0f0;
      border-radius: 1px;
    }

    .info-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 0.75rem;
      margin-bottom: 1.25rem;
    }

    .info-card {
      padding: 0.75rem 0.85rem;
      border-radius: 12px;
      background: rgba(255, 255, 255, 0.03);
      border: 1px solid rgba(255, 255, 255, 0.06);
    }

    .info-card label {
      display: block;
      font-size: 0.68rem;
      letter-spacing: 0.12em;
      text-transform: uppercase;
      color: #777;
      margin-bottom: 0.25rem;
    }

    .info-card strong {
      font-size: 0.92rem;
      font-weight: 600;
    }

    .info-card.full {
      grid-column: 1 / -1;
    }

    .secao-titulo {
      font-size: 0.72rem;
      letter-spacing: 0.14em;
      text-transform: uppercase;
      color: #888;
      margin-bottom: 0.65rem;
    }

    .item {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      gap: 1rem;
      padding: 0.65rem 0;
      border-bottom: 1px solid rgba(255, 255, 255, 0.06);
    }

    .item:last-child { border-bottom: none; }

    .item strong {
      display: block;
      font-size: 0.92rem;
      margin-bottom: 0.15rem;
    }

    .item span {
      font-size: 0.78rem;
      color: #888;
    }

    .item em {
      font-style: normal;
      font-size: 0.88rem;
      color: #ccc;
      white-space: nowrap;
    }

    .total {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top: 1rem;
      padding-top: 1rem;
      border-top: 1px solid rgba(196, 30, 58, 0.45);
    }

    .total span {
      font-size: 0.85rem;
      letter-spacing: 0.08em;
      text-transform: uppercase;
      color: #aaa;
    }

    .total strong {
      font-size: 1.35rem;
      color: #e8c547;
    }

    .avaliacao {
      margin-top: 1rem;
      padding: 0.75rem 0.85rem;
      border-radius: 12px;
      background: rgba(232, 197, 71, 0.08);
      border: 1px solid rgba(232, 197, 71, 0.2);
      font-size: 0.88rem;
      color: #e8c547;
    }

    .rodape {
      margin-top: 1.25rem;
      padding-top: 1rem;
      text-align: center;
      font-size: 0.78rem;
      color: #666;
      line-height: 1.5;
    }

    .rodape strong {
      display: block;
      color: #c41e3a;
      font-size: 0.82rem;
      letter-spacing: 0.06em;
      text-transform: uppercase;
      margin-bottom: 0.35rem;
    }

    @media print {
      body {
        background: #fff;
        padding: 0;
      }

      .ticket {
        box-shadow: none;
        border: 1px solid #ddd;
      }
    }
  </style>
</head>
<body>
  <article class="ticket">
    <header class="ticket-top">
      <div class="brand">
        <h1>Cine Auto</h1>
        <span>Ingresso digital</span>
      </div>
      <div class="hero">
        ${poster ? `<img class="poster" src="${poster}" alt="${escapeHtml(filme?.titulo ?? 'Filme')}" />` : ''}
        <div>
          <h2 class="filme-titulo">${escapeHtml(filme?.titulo ?? 'Sessão de cinema')}</h2>
          <p class="filme-meta">
            ${filme ? `${escapeHtml(filme.duracao)} · ${escapeHtml(filme.sala)}` : 'Apresente na entrada'}
          </p>
        </div>
      </div>
    </header>

    <section class="ticket-body">
      <div class="codigo-box">
        <span class="codigo-label">Código do ingresso</span>
        <div class="codigo-numero">${escapeHtml(numeroIngresso)}</div>
        <div class="barcode">${gerarCodigoBarras(numeroIngresso)}</div>
      </div>

      <div class="info-grid">
        <div class="info-card">
          <label>Sala</label>
          <strong>${escapeHtml(filme?.sala ?? '—')}</strong>
        </div>
        <div class="info-card">
          <label>Duração</label>
          <strong>${escapeHtml(filme?.duracao ?? '—')}</strong>
        </div>
        <div class="info-card full">
          <label>Data da compra</label>
          <strong>${escapeHtml(dataFormatada)}</strong>
        </div>
      </div>

      <p class="secao-titulo">Resumo do pedido</p>
      <div class="itens">
        ${itensHtml || '<div class="item"><div><strong>Ingresso</strong></div></div>'}
      </div>

      <div class="total">
        <span>Total pago</span>
        <strong>${formatarPreco(total)}</strong>
      </div>

      ${estrelas ? `<div class="avaliacao">Sua avaliação: ${estrelas}</div>` : ''}

      <footer class="rodape">
        <strong>Apresente este ingresso na entrada</strong>
        Guarde este arquivo ou imprima para validação na portaria.<br />
        Obrigado por escolher o Cine Auto.
      </footer>
    </section>
  </article>
</body>
</html>`
}

export function baixarIngressoHtml(html, numeroIngresso) {
  const blob = new Blob([html], { type: 'text/html;charset=utf-8' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = `ingresso-${numeroIngresso}.html`
  link.click()
  URL.revokeObjectURL(url)
}
