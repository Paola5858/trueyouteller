// "How others see you": friends rate 16 third-person statements about the owner.
// {name} is replaced with the owner's name. 4 per axis, 2 per pole; same direction
// convention as questions.js (+1 toward E, N, F, P).
const E = { axis: 'IE', direction: 1 };
const I = { axis: 'IE', direction: -1 };
const N = { axis: 'SN', direction: 1 };
const S = { axis: 'SN', direction: -1 };
const F = { axis: 'TF', direction: 1 };
const T = { axis: 'TF', direction: -1 };
const P = { axis: 'JP', direction: 1 };
const J = { axis: 'JP', direction: -1 };

const q = (statement, map) => ({ statement, mapping: [map] });

export const MIRROR_QUESTIONS = [
  q('{name} anima o ambiente quando chega.', E),
  q('{name} tem ideias diferentes e adora imaginar "e se...".', N),
  q('{name} fala com sinceridade, mesmo quando  difcil ouvir.', T),
  q('{name} costuma ter um plano e talvez at um plano reserva.', J),
  q('{name} precisa de um tempo sozinho para recarregar depois de socializar.', I),
  q('{name} percebe detalhes prticos que passam batido para os outros.', S),
  q('{name} costuma notar primeiro quando algum não est bem.', F),
  q('{name} lida numa boa quando os planos mudam de ltima hora.', P),
  q('{name} geralmente comea a conversa com quem ainda não conhece.', E),
  q('{name} viaja nas ideias e gosta de olhar o panorama geral.', N),
  q('{name} decide mais pela razo do que pela emoo.', T),
  q('{name} gosta de deixar as coisas organizadas e resolvidas com antecedncia.', J),
  q('{name} prefere uma conversa profunda a uma festa cheia.', I),
  q('{name} prefere um jeito prtico e conhecido de resolver as coisas.', S),
  q('{name} prefere manter a paz a ganhar uma discusso.', F),
  q('{name} costuma render melhor quando o prazo est chegando.', P),
];

export const MIRROR_MIN_RATINGS = 3;
