import { getCompatibility } from './compatibility.js';

// Couple / BFF joint report built from how the two types compare on each axis.
// {a} and {b} are replaced with the two names.

const FIGHT = {
  different: {
    TF: '{a} e {b} brigam de jeitos diferentes: uma pessoa quer resolver o problema, a outra quer se sentir ouvida primeiro. comecem com "eu te entendo", depois resolvam.',
  },
  same: {
    T: 'vocês dois debatem como advogados. as brigas são curtas e lógicas, mas lembrem de pedir desculpas, não só dizer "você tem razão".',
    F: 'vocês dois evitam conflito, então as brigas podem ferver em silêncio. falem o que incomoda cedo e com carinho.',
  },
};

const APOLOGY = {
  same: {
    F: 'um bilhete sincero, um abraço demorado e "eu nunca quero que você se sinta assim" funcionam para os dois.',
    T: 'Explain what went wrong, own it and agree on a fix. That\'s romance to you two.',
  },
  different: '{thinker} precisa de uma explicação clara e um plano; {feeler} precisa ouvir que o que sentiu importa. ofereçam os dois.',
};

const PLANS = {
  bothJ: 'dois planejadores! a agenda de vocês é uma obra de arte. deixem um dia por mês sem planos, de propósito.',
  bothP: 'dois espíritos livres! as aventuras acontecem por acaso. combinem uma pessoa para cuidar de ingressos e prazos.',
  mixed: '{planner} planeja a viagem; {spontaneous} decide o que rola quando vocês chegam. equilíbrio perfeito.',
};

const DATES = {
  couple: {
    EE: 'um festival, um show ou um jantar com amigos que vira karaokê',
    II: 'uma maratona de filmes aconchegante, com lanches caseiros e celulares desligados',
    mixed: 'uma aula de culinária: social o bastante para um, focada o bastante para o outro',
  },
  bestie: {
    EE: 'uma viagem de carro com playlist alta e zero momentos de silêncio',
    II: 'um rolê por livrarias e cafés, seguido de uma caminhada longa',
    mixed: 'um escape room: trabalho em equipe, enigmas e muita conversa depois',
  },
};

const SUPERPOWERS = {
  NN: 'sonhar juntos com planos grandes e originais',
  SS: 'tirar coisas reais do papel, rápido',
  TT: 'resolver qualquer problema sem drama',
  FF: 'fazer todo mundo ao redor se sentir bem-vindo',
  default: 'Covering each other\'s blind spots',
};

const fill = (text, names) => text.replace(/\{(\w+)\}/g, (_, key) => names[key] ?? key);

export const buildDuoReport = ({ mode, a, b }) => {
  const { score, tier } = getCompatibility(a.type, b.type);
  const [ta, tb] = [a.type, b.type];
  const names = {
    a: a.name,
    b: b.name,
    thinker: ta[2] === 'T' ? a.name : b.name,
    feeler: ta[2] === 'F' ? a.name : b.name,
    planner: ta[3] === 'J' ? a.name : b.name,
    spontaneous: ta[3] === 'P' ? a.name : b.name,
  };
  const sameTF = ta[2] === tb[2];
  const energy = ta[0] === 'E' && tb[0] === 'E' ? 'EE' : ta[0] === 'I' && tb[0] === 'I' ? 'II' : 'mixed';
  const plans = ta[3] === 'J' && tb[3] === 'J' ? 'bothJ' : ta[3] === 'P' && tb[3] === 'P' ? 'bothP' : 'mixed';
  const superpower =
    (ta[1] === tb[1] && SUPERPOWERS[ta[1] + tb[1]]) || (sameTF && SUPERPOWERS[ta[2] + tb[2]]) || SUPERPOWERS.default;

  return {
    score,
    tier,
    sections: [
      { emoji: '⚡', title: 'como vocês brigam', text: fill(sameTF ? FIGHT.same[ta[2]] : FIGHT.different.TF, names) },
      { emoji: '🕊️', title: 'como pedir desculpas', text: fill(sameTF ? APOLOGY.same[ta[2]] : APOLOGY.different, names) },
      { emoji: '🗓️', title: 'quem planeja e quem improvisa', text: fill(PLANS[plans], names) },
      {
        emoji: mode === 'couple' ? '🌹' : '🎒',
        title: mode === 'couple' ? 'o encontro ideal de vocês' : 'o rolê ideal de vocês',
        text: `${a.name} e ${b.name} iam curtir ${DATES[mode][energy]}.`,
      },
      { emoji: '🦸', title: 'o superpoder de vocês', text: superpower },
    ],
  };
};
