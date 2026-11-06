// Scenario mode: 24 relatable situations (6 per axis). Each option carries a value
// toward the axis's second letter (E, N, F, P): +2 strongly, +1 slightly, -1/-2 toward
// the first letter. Shaped like questions.js so utils/scoring.js scores it unchanged.
export const SCENARIO_VERSION = 1;

const s = (axis, emoji, text, options) => ({
  emoji,
  statement: text,
  mapping: [{ axis, direction: 1 }],
  options: options.map(([label, value]) => ({ text: label, value })),
});

export const scenarios = [
  s('IE', '🎉', 'uma pessoa amiga convida voc para uma festa onde s conhece ela.', [
    ['oba, gente nova! vou e converso com todo mundo.', 2],
    ['vou com minha amizade e talvez conhea mais uma ou duas pessoas.', 1],
    ['passo uma hora por l e depois vou embora sem alarde.', -1],
    ['arranjo uma desculpa e fico em casa com uns petiscos.', -2],
  ]),
  s('SN', '🧩', 'voc ganha um aparelho novo com um manual enorme.', [
    ['leio o manual passo a passo antes de mexer em qualquer coisa.', -2],
    ['dou uma olhada no guia rpido e depois testo.', -1],
    ['deixo o manual de lado e descubro como funciona na prtica.', 1],
    ['j comeo a imaginar usos diferentes do que ele foi feito para fazer.', 2],
  ]),
  s('TF', '🍕', 'uma pessoa amiga preparou o jantar para você, mas a comida não ficou muito boa.', [
    ['"que carinho seu, muito obrigado!" (e falo de corao)', 2],
    ['agradeo e sugiro com jeitinho colocar um pouco mais de sal da prxima vez.', 1],
    ['elogio o esforo e digo o que poderia melhorar.', -1],
    ['falo com sinceridade. a pessoa vai querer fazer melhor.', -2],
  ]),
  s('JP', '✈️', 'voc vai passar uma semana viajando.', [
    ['roteiro de cada dia, reservas feitas e tudo anotado.', -2],
    ['passagens e hospedagem reservadas, com uma lista bsica de passeios.', -1],
    ['passagens compradas; o resto a gente decide quando chegar.', 1],
    ['compro a passagem e deixo a aventura me levar.', 2],
  ]),
  s('IE', '📱', 'seu celular toca: uma pessoa amiga est ligando sem avisar.', [
    ['atendo na hora. adoro uma conversa surpresa!', 2],
    ['atendo. vai ser bom colocar o papo em dia.', 1],
    ['deixo tocar e mando uma mensagem perguntando o que houve.', -1],
    ['fico um pouco tenso, não atendo e talvez retorne amanh.', -2],
  ]),
  s('SN', '🎬', 'um filme termina de um jeito aberto e misterioso.', [
    ['adorei! vou ler teorias de fs at de madrugada.', 2],
    ['interessante. vou ficar pensando no que aquilo queria dizer.', 1],
    ['meio frustrante. s queria saber o que aconteceu.', -1],
    ['não gostei. prefiro um final bem explicado.', -2],
  ]),
  s('TF', '🏆', 'sua equipe precisa escolher algum para receber um prmio.', [
    ['quem teve os melhores resultados, sem dvida.', -2],
    ['principalmente pelos resultados, mas o esforo tambm conta.', -1],
    ['quem mais cresceu ou ajudou outras pessoas a se destacar.', 1],
    ['quem mais precisa de um incentivo neste momento.', 2],
  ]),
  s('JP', '📚', 'um trabalho importante precisa ser entregue daqui a duas semanas.', [
    ['comeo hoje e termino alguns dias antes do prazo.', -2],
    ['fao um plano e avanão um pouquinho por dia.', -1],
    ['penso bastante e fao a maior parte nos ltimos dias.', 1],
    ['na noite anterior. a presso me inspira.', 2],
  ]),
  s('IE', '🍽️', 'hora do almoo no seu primeiro dia em um trabalho ou escola.', [
    ['sento com um grupo grande e me apresento.', 2],
    ['me junto a algum que parece simptico.', 1],
    ['como com fones de ouvido e talvez converse depois.', -1],
    ['procuro o canto mais tranquilo que encontrar.', -2],
  ]),
  s('SN', '🗺️', 'voc est conhecendo uma cidade nova sem guia.', [
    ['sigo um mapa e visito os lugares mais famosos.', -2],
    ['leio algumas avaliaes e escolho lugares prticos.', -1],
    ['caminho sem pressa e vejo o que chama minha atenção.', 1],
    ['invento histrias sobre a cidade enquanto exploro.', 2],
  ]),
  s('TF', '😢', 'uma pessoa amiga est chorando por causa de um trmino.', [
    ['dou um abrao e deixo a pessoa chorar o tempo que precisar.', 2],
    ['escuto e depois lembro o quanto ela  incrvel.', 1],
    ['escuto e ajudo a pensar nos prximos passos.', -1],
    ['explico por que talvez tenha sido melhor assim.', -2],
  ]),
  s('JP', '🛒', 'hora de fazer compras no mercado.', [
    ['fao uma lista detalhada, separada por corredor.', -2],
    ['levo uma lista, mas acrescento algumas coisas.', -1],
    ['tenho s uma ideia geral do que preciso.', 1],
    ['escolho o que parece bom e deixo o jantar ser surpresa.', 2],
  ]),
  s('IE', '🎤', 'algum pede uma pessoa voluntria para subir ao palco.', [
    ['levanto a mo antes mesmo de a pessoa terminar a frase.', 2],
    ['se ningum mais for, eu topo.', 1],
    ['afundo na cadeira e evito olhar para a pessoa.', -1],
    ['prefiro enfrentar um urso.', -2],
  ]),
  s('SN', '💡', 'no trabalho ou na escola, aparece um problema que ningum resolveu antes.', [
    ['vejo como situaes parecidas foram resolvidas.', -2],
    ['reno os fatos e escolho uma soluo sensata.', -1],
    ['penso em algumas solues criativas.', 1],
    ['questiono se estamos tentando resolver o problema certo.', 2],
  ]),
  s('TF', '🤝', 'duas pessoas amigas pedem que voc resolva uma discusso entre elas.', [
    ['analiso os fatos e digo quem tem razo.', -2],
    ['tento ser justo, mesmo que algum fique chateado.', -1],
    ['busco um meio-termo para ningum sair magoado.', 1],
    ['me preocupo primeiro em ajudar as duas a continuarem amigas.', 2],
  ]),
  s('JP', '🗓️', 'seus planos para o fim de semana so cancelados.', [
    ['que chato. logo organizo outra coisa.', -2],
    ['fico um pouco decepcionado, mas arranjo outra opo.', -1],
    ['boa, agora o fim de semana est livre!', 1],
    ['no fundo, eu estava torcendo para isso acontecer.', 2],
  ]),
  s('IE', '🔋', 'depois de uma semana longa e cheia, voc recarrega as energias', [
    ['saindo com o mximo de amigos que conseguir.', 2],
    ['jantando com algumas pessoas prximas.', 1],
    ['passando uma noite tranquila com uma pessoa.', -1],
    ['ficando completamente sozinho. não me chamem.', -2],
  ]),
  s('SN', '📖', 'escolha um livro para ler nas frias.', [
    ['uma histria real ou um guia til.', -2],
    ['um romance realista sobre o dia a dia.', -1],
    ['fantasia ou fico cientfica.', 1],
    ['algo estranho e cheio de ideias filosficas.', 2],
  ]),
  s('TF', '📝', 'voc vai dar sua opinio sobre o trabalho de uma pessoa amiga.', [
    ['vou direto ao ponto: explico o que não funcionou.', -2],
    ['sou sincero e dou algumas sugestes.', -1],
    ['comeo pelo que gostei e depois sugiro mudanas com cuidado.', 1],
    ['dou mais incentivo. a pessoa se esforou tanto!', 2],
  ]),
  s('JP', '🧳', 'hora de arrumar a mala para uma viagem.', [
    ['fao uma lista e deixo tudo pronto dois dias antes.', -2],
    ['arrumo na noite anterior, com a lista na mo.', -1],
    ['jogo tudo na mala uma hora antes de sair.', 1],
    ['esqueo metade e compro o que faltar por l.', 2],
  ]),
  s('IE', '💬', 'em um grupo de mensagens, voc costuma', [
    ['mandar memes e puxar assunto.', 2],
    ['responder e participar bastante.', 1],
    ['ler tudo, mas responder de vez em quando.', -1],
    ['deixar o grupo silenciado e pensar "um dia eu leio".', -2],
  ]),
  s('SN', '☁️', 'voc est deitado na grama, olhando para as nuvens.', [
    ['confiro se vai chover mais tarde.', -2],
    ['reparo nas formas e nas cores.', -1],
    ['vejo drages e castelos nas nuvens.', 1],
    ['penso em como somos pequenos no universo.', 2],
  ]),
  s('TF', '🐶', 'voc est escolhendo entre duas propostas de trabalho.', [
    ['o melhor salrio e mais oportunidades de carreira.', -2],
    ['principalmente a melhor proposta, mas o clima tambm conta.', -1],
    ['a equipe que pareceu mais acolhedora.', 1],
    ['a vaga em que posso ajudar mais pessoas.', 2],
  ]),
  s('JP', '🎨', 'seu quarto ou sua mesa est', [
    ['impecvel. tudo tem seu lugar.', -2],
    ['quase sempre arrumado.', -1],
    ['uma baguna organizada. eu sei onde est tudo.', 1],
    ['uma exploso criativa.', 2],
  ]),
];
