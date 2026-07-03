# Trailers locais

Os vídeos ficam nesta pasta e são usados pelo componente `MovieCard` no hover dos cartazes.

## Baixar todos automaticamente

```bash
sudo apt install yt-dlp   # Ubuntu/Debian
# ou: pipx install yt-dlp

chmod +x scripts/baixar-trailers.sh
./scripts/baixar-trailers.sh
```

O script atualiza o `yt-dlp`, testa cada link com `-F` e salva os arquivos abaixo.

## Arquivos e links oficiais

| Arquivo | Filme | URL oficial |
|---------|-------|-------------|
| `premonicao6.mp4` | Premonição 6: Laços de Sangue | https://www.youtube.com/watch?v=x4xsMz-L4hk |
| `panico.mp4` | Pânico VI (Scream VI) | https://www.youtube.com/watch?v=h74AXqw4Opc |
| `aranhaverso.mp4` | Homem-Aranha: Através do Aranhaverso | https://www.youtube.com/watch?v=cqGjhVJWtEg |
| `pulp-fiction.mp4` | Pulp Fiction | https://www.youtube.com/watch?v=s7EdQ4FqbhY |
| `spiderman-brand-new-day.mp4` | Spider-Man: Brand New Day | https://www.youtube.com/watch?v=PlulyWs1kS4 |

## Testar um link manualmente

```bash
yt-dlp -F https://www.youtube.com/watch?v=x4xsMz-L4hk
yt-dlp https://www.youtube.com/watch?v=x4xsMz-L4hk -o public/trailers/premonicao6.mp4
```

Se aparecer **Video unavailable**, atualize o `yt-dlp` ou verifique restrição regional.
