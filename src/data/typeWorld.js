// "Your type's world": playful extras for each type, shown on result and type pages.
// Character twins are fun fan-style approximations, not official typings.

export const TYPE_WORLD = {
  ISTJ: {
    watch: ['The Crown', 'Apollo 13', 'Suits'],
    twin: 'Baldev Singh (Dilwale Dulhania Le Jayenge)',
    dreamDay: 'uma manhã tranquila, uma lista clara, tudo feito até as 17h e ninguém mudando o plano "rapidinho".',
    weekend: 'organizar a casa, uma caminhada longa por um caminho conhecido e um filme clássico que você sabe de cor.',
  },
  ISFJ: {
    watch: ['Little Women', 'Gilmore Girls', 'Paddington 2'],
    twin: 'Naina Talwar (Yeh Jawaani Hai Deewani)',
    dreamDay: 'ajudar alguém que realmente precisava, em um grupo acolhedor onde todo mundo agradece.',
    weekend: 'fazer algo gostoso para a família, rever uma série de conforto e ligar para um amigo de longa data.',
  },
  INFJ: {
    watch: ['Dead Poets Society', 'Arrival', 'Taare Zameen Par'],
    twin: 'Ram Shankar Nikumbh (Taare Zameen Par)',
    dreamDay: 'One deep, meaningful conversation that changes someone\'s life, then quiet time to journal about it.',
    weekend: 'uma caminhada longa sozinho, um livro que faz pensar e um papo sincero com chá.',
  },
  INTJ: {
    watch: ['Inception', 'Sherlock', 'Chak De! India'],
    twin: 'Kabir Khan (Chak De! India)',
    dreamDay: 'horas de foco total em um problema difícil e um plano que se encaixa perfeitamente.',
    weekend: 'aprender algo novo, jogos de estratégia e absolutamente nenhuma visita surpresa.',
  },
  ISTP: {
    watch: ['Mad Max: Fury Road', 'The Martian', 'Sholay'],
    twin: 'Jai (Sholay)',
    dreamDay: 'consertar algo com as próprias mãos e depois ir para algum lugar tranquilo.',
    weekend: 'uma viagem solo de carro, mexer em alguma coisa na garagem e um filme de ação.',
  },
  ISFP: {
    watch: ['Amlie', 'Spirited Away', 'Taare Zameen Par'],
    twin: 'Ishaan Awasthi (Taare Zameen Par)',
    dreamDay: 'criar algo bonito no seu ritmo, com boa música e ninguém olhando o relógio.',
    weekend: 'A sketchbook in a park, a farmers\' market, and a sunset you photograph twenty times.',
  },
  INFP: {
    watch: ['Tamasha', 'Howl\'s Moving Castle', 'The Perks of Being a Wallflower'],
    twin: 'Ved (Tamasha)',
    dreamDay: 'escrever, criar ou imaginar uma história que faça alguém se sentir menos sozinho.',
    weekend: 'leitura em dia de chuva, uma playlist para cada humor e conversas longas sobre a vida com alguém próximo.',
  },
  INTP: {
    watch: ['3 Idiots', 'Interstellar', 'Black Mirror'],
    twin: 'Ranchoddas "Rancho" Chanchad (3 Idiots)',
    dreamDay: 'mergulhar em um assunto fascinante, sem nenhuma reunião.',
    weekend: 'documentários, um projeto pessoal pela metade e um debate sobre a natureza do tempo.',
  },
  ESTP: {
    watch: ['Top Gun: Maverick', 'Fast & Furious', 'Sholay'],
    twin: 'Veeru (Sholay)',
    dreamDay: 'decisões rápidas, ação de verdade e uma grande vitória antes do almoço.',
    weekend: 'esportes radicais, uma viagem espontânea e uma noite que vira história.',
  },
  ESFP: {
    watch: ['Jab We Met', 'Mamma Mia!', 'La La Land'],
    twin: 'Geet (Jab We Met)',
    dreamDay: 'estar no palco, na câmera ou no meio da galera, fazendo todo mundo sorrir.',
    weekend: 'brunch com amigos, dança e dizer sim para o que aparecer.',
  },
  ENFP: {
    watch: ['Yeh Jawaani Hai Deewani', 'Up', 'Into the Spider-Verse'],
    twin: 'Bunny (Yeh Jawaani Hai Deewani)',
    dreamDay: 'trocar ideias malucas com gente inspiradora e depois começar três projetos novos.',
    weekend: 'A spontaneous trip with friends, deep 2am conversations, and a new hobby you\'ll love for a month.',
  },
  ENTP: {
    watch: ['Zindagi Na Milegi Dobara', 'Catch Me If You Can', 'The Social Network'],
    twin: 'Imran (Zindagi Na Milegi Dobara)',
    dreamDay: 'apresentar uma ideia ousada, vencer um debate e quebrar uma regra que merecia ser quebrada.',
    weekend: 'hackathons, escape rooms e discutir filmes só por diversão.',
  },
  ESTJ: {
    watch: ['The Devil Wears Prada', 'Moneyball', 'Shark Tank'],
    twin: 'Viru Sahastrabuddhe (3 Idiots)',
    dreamDay: 'liderar um time eficiente, bater todas as metas e terminar o dia com um relatório perfeito.',
    weekend: 'organizar um evento em família, jogar uma partida e planejar a próxima semana nos detalhes.',
  },
  ESFJ: {
    watch: ['Dilwale Dulhania Le Jayenge', 'Friends', 'The Holiday'],
    twin: 'Simran (Dilwale Dulhania Le Jayenge)',
    dreamDay: 'Bringing people together, remembering everyone\'s birthday, and hosting the perfect gathering.',
    weekend: 'uma reunião de família organizada por você, uma playlist de festa e ligar para todo mundo para saber como estão.',
  },
  ENFJ: {
    watch: ['Lagaan', 'Ted Lasso', 'The Pursuit of Happyness'],
    twin: 'Bhuvan (Lagaan)',
    dreamDay: 'inspirar um time a acreditar em algo maior e depois ver tudo dar certo.',
    weekend: 'trabalho voluntário, orientar um amigo e um jantar em que todo mundo se sente incluído.',
  },
  ENTJ: {
    watch: ['Succession', 'The Dark Knight', 'Kabhi Khushi Kabhie Gham'],
    twin: 'Yashvardhan Raichand (Kabhi Khushi Kabhie Gham)',
    dreamDay: 'definir uma visão ousada de manhã e fechar um grande acordo à noite.',
    weekend: 'jogos de estratégia, planejar metas para os próximos cinco anos e um jantar especial reservado com antecedência.',
  },
};

// Spotify search (playlists change often, so we link to search rather than one playlist).
export const spotifyLink = (code) => `https://open.spotify.com/search/${code}%20personality%20playlist`;
