#!/usr/bin/env bash
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
OUT="$ROOT/public/trailers"

mkdir -p "$OUT"

if ! command -v yt-dlp >/dev/null 2>&1; then
  echo "yt-dlp não encontrado."
  echo ""
  echo "No Ubuntu, instale com uma das opções:"
  echo "  sudo apt install yt-dlp"
  echo "  pipx install yt-dlp"
  echo "  pip install -U yt-dlp --break-system-packages"
  exit 1
fi

echo "Atualizando yt-dlp..."
yt-dlp -U 2>/dev/null || true

FORMATOS='bestvideo[ext=mp4]+bestaudio[ext=m4a]/best[ext=mp4]/best'

baixar() {
  local nome="$1"
  local url="$2"
  local arquivo="$3"
  local destino="$OUT/$arquivo"

  echo ""
  echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
  echo "▶ $nome"
  echo "  URL: $url"
  echo "  Arquivo: $arquivo"

  echo "  Verificando formatos disponíveis..."
  if ! yt-dlp -F "$url" | head -n 20; then
    echo "  ✗ Não foi possível listar formatos. Link indisponível ou yt-dlp desatualizado."
    return 1
  fi

  echo "  Baixando..."
  yt-dlp \
    -f "$FORMATOS" \
    --merge-output-format mp4 \
    --no-playlist \
    --no-overwrites \
    -o "$destino" \
    "$url"

  if [[ -f "$destino" ]]; then
    echo "  ✓ Salvo em public/trailers/$arquivo"
  else
    echo "  ✗ Falha ao salvar $arquivo"
    return 1
  fi
}

FALHAS=0

baixar \
  "Premonição 6: Laços de Sangue" \
  "https://www.youtube.com/watch?v=x4xsMz-L4hk" \
  "premonicao6.mp4" || FALHAS=$((FALHAS + 1))

baixar \
  "Pânico VI (Scream VI)" \
  "https://www.youtube.com/watch?v=h74AXqw4Opc" \
  "panico.mp4" || FALHAS=$((FALHAS + 1))

baixar \
  "Homem-Aranha: Através do Aranhaverso" \
  "https://www.youtube.com/watch?v=cqGjhVJWtEg" \
  "aranhaverso.mp4" || FALHAS=$((FALHAS + 1))

baixar \
  "Pulp Fiction" \
  "https://www.youtube.com/watch?v=s7EdQ4FqbhY" \
  "pulp-fiction.mp4" || FALHAS=$((FALHAS + 1))

baixar \
  "Spider-Man: Brand New Day" \
  "https://www.youtube.com/watch?v=PlulyWs1kS4" \
  "spiderman-brand-new-day.mp4" || FALHAS=$((FALHAS + 1))

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

if [[ "$FALHAS" -eq 0 ]]; then
  echo "Todos os trailers foram baixados em public/trailers/"
else
  echo "$FALHAS trailer(s) falharam."
  echo "Dicas:"
  echo "  • Atualize o yt-dlp: pip install -U yt-dlp"
  echo "  • Teste um link manualmente: yt-dlp -F URL"
  echo "  • Se aparecer 'Video unavailable', pode ser restrição regional"
  exit 1
fi
