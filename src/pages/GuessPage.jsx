import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router';
import { PERSONALITY_TYPES } from '../data/personalityTypes';
import { addEntry } from '../firebase/social';
import { AXES } from '../utils/scoring';
import { getAnswer, isOwned, rememberAnswer } from '../utils/storage';
import { useEntries, useSharedDoc } from '../utils/useShared';
import { track } from '../utils/analytics';
import { buildMeta, SITE_URL } from '../utils/seo';
import ShareLinkBox from '../components/ShareLinkBox';
import SocialStatus from '../components/SocialStatus';
import '../styles/Social.css';

export const meta = () =>
  buildMeta({
    title: 'voc consegue adivinhar meu tipo? | TrueYouTeller',
    description: 'tente adivinhar o perfil de uma pessoa amiga e veja quem a conhece melhor.',
    path: '/play',
    noindex: true,
  });

const LETTER_NAMES = {
  I: 'reservado', E: 'expansivo', S: 'prtico', N: 'intuitivo',
  T: 'racional', F: 'sensvel', J: 'planejador', P: 'espontneo',
};

const matches = (guess, actual) => [...guess].filter((letter, i) => letter === actual[i]).length;

const VERDICTS = ['ainda esto se conhecendo 🙈', 'quase l 🤷', 'est chegando 🙂', 'por pouco! 🔥', 'almas gmeas! 🎯'];

const Leaderboard = ({ entries, ownerType }) => {
  const ranked = [...entries]
    .map((e) => ({ ...e, score: matches(e.guess, ownerType) }))
    .sort((a, b) => b.score - a.score);
  if (!ranked.length) return <p>ainda não tem palpites. espere um pouco ou d um toque nos amigos!</p>;
  return (
    <ol className="leaderboard">
      {ranked.map((entry, i) => (
        <li key={entry.id}>
          <span className="leaderboard-rank">{i === 0 ? '👑' : i + 1}</span>
          <span className="leaderboard-name">{entry.name}</span>
          <span className="leaderboard-guess">{entry.guess}</span>
          <span className="leaderboard-score">{entry.score}/4</span>
        </li>
      ))}
    </ol>
  );
};

const GuessForm = ({ ownerName, onSubmit, busy }) => {
  const [name, setName] = useState('');
  const [letters, setLetters] = useState({});
  const guess = Object.keys(AXES).map((axis) => letters[axis] ?? '').join('');
  const complete = guess.length === 4 && name.trim();

  return (
    <form
      className="social-panel guess-form"
      onSubmit={(e) => {
        e.preventDefault();
        if (complete) onSubmit({ name: name.trim().slice(0, 30), guess });
      }}
    >
      <label htmlFor="guess-name">seu nome</label>
      <input id="guess-name" value={name} maxLength={30} onChange={(e) => setName(e.target.value)} placeholder="como podemos chamar você?" />
      <p className="guess-help">escolha uma letra de cada par. como voc acha que {ownerName} ?</p>
      {Object.entries(AXES).map(([axis, pair]) => (
        <div key={axis} className="guess-pair" role="radiogroup" aria-label={`${pair[0]} ou ${pair[1]}`}>
          {pair.map((letter) => (
            <button
              key={letter}
              type="button"
              role="radio"
              aria-checked={letters[axis] === letter}
              className={`guess-letter ${letters[axis] === letter ? 'selected' : ''}`}
              onClick={() => setLetters({ ...letters, [axis]: letter })}
            >
              <span className="guess-letter-big">{letter}</span>
              <span>{LETTER_NAMES[letter]}</span>
            </button>
          ))}
        </div>
      ))}
      <button type="submit" className="btn btn-primary" disabled={!complete || busy}>
        {busy ? 'enviando' : guess.length === 4 ? `confirmar ${guess}` : 'escolha as quatro letras'}
      </button>
    </form>
  );
};

const GuessPage = () => {
  const { id } = useParams();
  const { status, doc: game } = useSharedDoc('guesses', id);
  const entries = useEntries('guesses', id, 'entries', status === 'ready');
  const [owner, setOwner] = useState(false);
  const [myGuess, setMyGuess] = useState(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    setOwner(isOwned('guesses', id));
    setMyGuess(getAnswer('guesses', id));
  }, [id]);

  if (status !== 'ready') return <SocialStatus status={status} what="game" />;

  const submit = async (entry) => {
    setBusy(true);
    setError('');
    try {
      await addEntry('guesses', id, 'entries', entry);
      rememberAnswer('guesses', id, entry.guess);
      track('social_answer', { kind: 'guesses', score: matches(entry.guess, game.ownerType) });
      setMyGuess(entry.guess);
    } catch (err) {
      console.error(err);
      setError('não conseguimos enviar seu palpite. tente novamente.');
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="container section social-page">
      <span className="play-emoji" aria-hidden="true">🤔</span>
      <h1 className="page-title">{owner ? 'quem conhece voc melhor?' : `adivinhe o tipo de personalidade de ${game.ownerName}`}</h1>

      {owner ? (
        <>
          <p className="types-intro">compartilhe o link com os amigos. eles tentam acertar seu perfil, e quem chegar mais perto vence.</p>
          <ShareLinkBox
            url={`${SITE_URL}/guess/${id}`}
            kind="guesses"
            title="adivinhe meu tipo de personalidade"
            text="voc consegue adivinhar meu tipo de personalidade? vamos ver quem me conhece melhor! 🤔"
          />
          <div className="social-panel">
            <h2>placar</h2>
            {entries ? <Leaderboard entries={entries} ownerType={game.ownerType} /> : <p>carregando</p>}
          </div>
        </>
      ) : myGuess ? (
        <div className="social-panel guess-reveal">
          <p className="result-kicker">seu palpite foi {myGuess}</p>
          <h2>
            {game.ownerName} é {game.ownerType} ({PERSONALITY_TYPES[game.ownerType].name})!
          </h2>
          <p className="guess-score">
            {matches(myGuess, game.ownerType)}/4 letras  {VERDICTS[matches(myGuess, game.ownerType)]}
          </p>
          <h3>placar</h3>
          {entries ? <Leaderboard entries={entries} ownerType={game.ownerType} /> : <p>carregando</p>}
          <p>agora descubra seu prprio perfil e crie uma brincadeira para os amigos.</p>
          <Link to="/test" className="btn btn-primary">fazer o teste grátis</Link>
        </div>
      ) : (
        <>
          {error && <p className="form-error" role="alert">{error}</p>}
          <GuessForm ownerName={game.ownerName} onSubmit={submit} busy={busy} />
        </>
      )}
    </div>
  );
};

export default GuessPage;
