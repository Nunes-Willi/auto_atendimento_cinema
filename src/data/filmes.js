export const filmes = [
  {
    id: 'premonicacao-6',
    titulo: 'Premonição 6',
    banner:
      '/banner/Poster Final Destination - Bloodlines - Premonição 6 - Filmes - Cartaz ou Quadro Decorativo.jpeg',
    bannerHero:
      '/banner2/Poster Final Destination - Bloodlines - Premonição 6 - Filmes - Cartaz ou Quadro Decorativo2.jpeg',
    classificacao: '18',
    generos: ['Terror', 'Suspense', 'Sobrenatural'],
    nota: 4.1,
    avaliacoes: '8,2K',
    duracao: '1h 50min',
    ano: 2025,
    diretor: 'Zach Lipovsky',
    sinopse:
      'A jovem Stefani enfrenta pesadelos terríveis e descobre uma conexão sombria com a misteriosa morte de sua avó. Para quebrar o ciclo de mortes, ela precisa desvendar segredos de família e impedir que a premonição se cumpra mais uma vez.',
    audio: 'Inglês, Português',
    legendas: 'Português',
    sala: 'Sala 3 · Dolby Atmos',
    horarios: ['14:00', '16:30', '19:00', '21:30'],
    trailer: '/trailers/premonicao6.mp4',
  },
  {
    id: 'panico',
    titulo: 'Pânico',
    banner: '/banner/panico.webp',
    bannerHero: '/banner2/panico2.jpeg',
    classificacao: '16',
    generos: ['Terror', 'Slasher', 'Mistério'],
    nota: 4.5,
    avaliacoes: '15K',
    duracao: '2h 02min',
    ano: 2022,
    diretor: 'Matt Bettinelli-Olpin',
    sinopse:
      'Um novo assassino mascarado surge em Woodsboro e começa a caçar um grupo de jovens. Sidney Prescott e outros sobreviventes retornam para enfrentar o passado e descobrir quem está por trás da máscara.',
    audio: 'Inglês, Português',
    legendas: 'Português',
    sala: 'Sala 1 · 2D',
    horarios: ['15:00', '18:00', '21:00'],
    trailer: '/trailers/panico.mp4',
  },
  {
    id: 'spider-man-new-day',
    titulo: 'Spider-Man: New Day',
    banner: '/banner/spiderman-newday.jpeg',
    bannerHero: '/banner2/spiderman-newday2.jpeg',
    classificacao: '12',
    generos: ['Ação', 'Aventura', 'Ficção científica'],
    nota: 4.7,
    avaliacoes: '22K',
    duracao: '2h 15min',
    ano: 2026,
    diretor: 'Destin Daniel Cretton',
    sinopse:
      'Peter Parker tenta recomeçar sua vida em Nova York enquanto lida com novas ameaças e responsabilidades. Um vilão misterioso coloca a cidade inteira em perigo e testa os limites do Homem-Aranha.',
    audio: 'Inglês, Português',
    legendas: 'Português, Inglês',
    sala: 'Sala 5 · IMAX',
    horarios: ['13:00', '16:00', '19:30', '22:00'],
    trailer: '/trailers/spiderman-brand-new-day.mp4',
  },
  {
    id: 'pulp-fiction',
    titulo: 'Pulp Fiction',
    banner: '/banner/pulp fiction.jpeg',
    bannerHero: '/banner2/pulp fiction2.jpeg',
    classificacao: '18',
    generos: ['Crime', 'Drama', 'Clássico'],
    nota: 4.9,
    avaliacoes: '31K',
    duracao: '2h 34min',
    ano: 1994,
    diretor: 'Quentin Tarantino',
    sinopse:
      'Histórias entrelaçadas de criminosos, boxeadores e gângsters em Los Angeles. Um roteiro icônico que mistura humor negro, violência estilizada e diálogos memoráveis.',
    audio: 'Inglês, Português',
    legendas: 'Português',
    sala: 'Sala 2 · Retrospectiva',
    horarios: ['17:00', '20:30'],
    trailer: '/trailers/pulp-fiction.mp4',
  },
  {
    id: 'homem-aranha-aranhaverso',
    titulo: 'Homem-Aranha no Aranhaverso',
    banner:
      '/banner/Spider-man Across The Spider-verse The Official Movie Special Book By Titan.jpeg',
    bannerHero:
      '/banner2/Spider-man Across The Spider-verse The Official Movie Special Book By Titan2.jpeg',
    classificacao: '10',
    generos: ['Animação', 'Ação', 'Aventura'],
    nota: 4.8,
    avaliacoes: '28K',
    duracao: '2h 20min',
    ano: 2023,
    diretor: 'Joaquim Dos Santos',
    sinopse:
      'Miles Morales viaja pelo multiverso e encontra uma equipe de Spider-People encarregada de proteger a existência de cada realidade. Ele precisa decidir o que significa ser um herói.',
    audio: 'Inglês, Português',
    legendas: 'Português, Inglês, Espanhol',
    sala: 'Sala 4 · 3D',
    horarios: ['14:30', '17:30', '20:00'],
    trailer: '/trailers/aranhaverso.mp4',
  },
]

export function getFilmeById(id) {
  return filmes.find((filme) => filme.id === id)
}

export function bannerUrl(caminho) {
  return encodeURI(caminho)
}
