import { track } from './analytics';

// Fun, browser-only achievements. Stored in localStorage; unlocking one fires a
// "tyt:badge" window event that the BadgeToast component shows.
export const BADGES = [
  { id: 'first-test', emoji: '🔮', name: 'olhar de cristal', hint: 'termine o teste de personalidade' },
  { id: 'quiz-rookie', emoji: '🎯', name: 'primeiro desafio', hint: 'termine qualquer teste rpido' },
  { id: 'quiz-master', emoji: '🏆', name: 'mestre dos testes', hint: 'termine todos os testes rpidos' },
  { id: 'sharer', emoji: '🦋', name: 'espalha a novidade', hint: 'compartilhe um resultado' },
  { id: 'matchmaker', emoji: '💞', name: 'cupido dos perfis', hint: 'compare dois tipos de personalidade' },
  { id: 'inviter', emoji: '🧲', name: 'puxa a conversa', hint: 'convide algum para comparar os perfis' },
  { id: 'explorer', emoji: '🧭', name: 'explorador de perfis', hint: 'leia sobre 5 tipos de personalidade' },
  { id: 'night-owl', emoji: '🦉', name: 'coruja noturna', hint: 'ative o tema escuro' },
];

const KEY = 'tyt:badges';
const PROGRESS_KEY = 'tyt:badge-progress';

const read = (key, fallback) => {
  try {
    return JSON.parse(globalThis.localStorage?.getItem(key)) ?? fallback;
  } catch {
    return fallback;
  }
};

const write = (key, value) => {
  try {
    globalThis.localStorage?.setItem(key, JSON.stringify(value));
  } catch {
    // Storage unavailable: badges just aren't remembered.
  }
};

export const loadBadges = () => read(KEY, []);

export const awardBadge = (id) => {
  const owned = loadBadges();
  if (owned.includes(id)) return;
  write(KEY, [...owned, id]);
  track('unlock_achievement', { achievement_id: id });
  const badge = BADGES.find((b) => b.id === id);
  if (badge && typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('tyt:badge', { detail: badge }));
  }
};

export const getProgress = (name) => read(PROGRESS_KEY, {})[name] ?? [];

// Adds `value` to a named set (e.g. quizzes finished) and returns the set's size.
export const trackProgress = (name, value) => {
  const progress = read(PROGRESS_KEY, {});
  const items = new Set(progress[name] ?? []);
  items.add(value);
  write(PROGRESS_KEY, { ...progress, [name]: [...items] });
  return items.size;
};
