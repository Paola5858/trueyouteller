// Group room roles and character twins, derived from each member's type.

// First matching rule wins, so more specific roles come first.
export const ROLES = [
  { id: 'planner', emoji: '📋', name: 'quem organiza', blurb: 'mantém o grupo organizado e nos horários.', match: (t) => t.endsWith('TJ') },
  { id: 'heart', emoji: '💗', name: 'o coração do grupo', blurb: 'percebe como cada pessoa está se sentindo e ajuda a manter a paz.', match: (t) => t[1] === 'S' && t[2] === 'F' && t[3] === 'J' },
  { id: 'spark', emoji: '✨', name: 'a faísca', blurb: 'traz energia e planos espontâneos.', match: (t) => t[0] === 'E' && t[3] === 'P' },
  { id: 'visionary', emoji: '🔭', name: 'quem sonha alto', blurb: 'imagina as grandes ideias.', match: (t) => t[1] === 'N' && t[3] === 'P' },
  { id: 'mentor', emoji: '🌱', name: 'quem inspira', blurb: 'incentiva todo mundo a crescer.', match: (t) => t[1] === 'N' && t[2] === 'F' },
  { id: 'fixer', emoji: '🛠️', name: 'quem resolve', blurb: 'resolve problemas práticos com calma.', match: (t) => t[1] === 'S' && t[3] === 'P' },
  { id: 'anchor', emoji: '⚓', name: 'o porto seguro', blurb: 'estável, leal e confiável.', match: () => true },
];

export const roleFor = (type) => ROLES.find((role) => role.match(type));

// Temperaments: if one is missing, the group has a blind spot.
export const TEMPERAMENTS = [
  { id: 'NT', name: 'analistas', emoji: '🧠', test: (t) => t[1] === 'N' && t[2] === 'T', gap: 'ninguém curte revisar um plano procurando falhas. confiram bem as decisões importantes.' },
  { id: 'NF', name: 'diplomatas', emoji: '🕊️', test: (t) => t[1] === 'N' && t[2] === 'F', gap: 'ninguém costuma checar como o grupo está se sentindo. perguntem como as pessoas estão de verdade.' },
  { id: 'SJ', name: 'sentinelas', emoji: '🛡️', test: (t) => t[1] === 'S' && t[3] === 'J', gap: 'ninguém cuida da logística naturalmente. combinem quem reserva, paga e avisa.' },
  { id: 'SP', name: 'exploradores', emoji: '🏄', test: (t) => t[1] === 'S' && t[3] === 'P', gap: 'ninguém puxa a diversão espontânea. marquem um dia de "dizer sim".' },
];

// Character twins by type (fun approximations, not canon).
export const FRIENDS_TWIN = {
  ESFJ: 'Monica', ENFJ: 'Monica', ISTJ: 'Monica', ESTJ: 'Monica',
  ENTP: 'Chandler', INTP: 'Chandler', ISTP: 'Chandler',
  ENFP: 'Phoebe', INFP: 'Phoebe', ISFP: 'Phoebe',
  INTJ: 'Ross', INFJ: 'Ross', ISFJ: 'Ross',
  ESFP: 'Rachel', ENTJ: 'Rachel',
  ESTP: 'Joey',
};

export const AVENGERS_TWIN = {
  ENTP: 'Iron Man', ENTJ: 'Iron Man', INTJ: 'Doctor Strange',
  ISTJ: 'Captain America', ISFJ: 'Captain America', ESTJ: 'Nick Fury',
  ESFP: 'Thor', ESTP: 'Thor', ENFJ: 'Thor',
  ISTP: 'Black Widow', INFJ: 'Black Widow',
  ENFP: 'Spider-Man', ISFP: 'Spider-Man', ESFJ: 'Spider-Man',
  INTP: 'Hulk', INFP: 'Hulk',
};
