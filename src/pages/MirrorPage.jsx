import { useEffect, useMemo, useState } from 'react';
import { Link, useParams } from 'react-router';
import { MIRROR_MIN_RATINGS, MIRROR_QUESTIONS } from '../data/mirrorQuestions';
import { answerOptions } from '../data/questions';
import { PERSONALITY_TYPES } from '../data/personalityTypes';
import { addEntry } from '../firebase/social';
import { AXES, scoreAnswers } from '../utils/scoring';
import { getAnswer, isOwned, rememberAnswer } from '../utils/storage';
import { useEntries, useSharedDoc } from '../utils/useShared';
import { track } from '../utils/analytics';
import { buildMeta, SITE_URL } from '../utils/seo';
import ShareLinkBox from '../components/ShareLinkBox';
import SocialStatus from '../components/SocialStatus';
import '../styles/Social.css';

export const meta = () =>
  buildMeta({
    title: 'como seus amigos veem voc | TrueYouTeller',
    description: 'responda 16 perguntas rpidas e annimas sobre uma pessoa amiga.',
    path: '/play',
    noindex: true,
  });

const LETTER_NAMES = {
  I: 'mais reservado', E: 'mais expansivo', S: 'prtico', N: 'intuitivo',
  T: 'racional', F: 'guiado pelos sentimentos', J: 'planejador', P: 'espontneo',
};

// Average the friends' per-axis percentages, then pick letters (ties keep the owner's letter).
const friendsView = (ratings, ownerType) => {
  const scored = ratings.map((r) => scoreAnswers(r.answers, MIRROR_QUESTIONS).percentages);
  const average = Object.fromEntries(
    Object.keys(AXES).map((axis) => [axis, Math.round(scored.reduce((sum, p) => sum + p[axis], 0) / scored.length)])
  );
  const type = Object.entries(AXES)
    .map(([axis, [low, high]], i) => (average[axis] > 50 ? high : average[axis] < 50 ? low : ownerType[i]))
    .join('');
  return { average, type };
};

const RatingForm = ({ ownerName, onSubmit, busy }) => {
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState(() => Array(MIRROR_QUESTIONS.length).fill(null));
  const question = MIRROR_QUESTIONS[index];

  const choose = (value) => {
    const next = [...answers];
    next[index] = value;
    setAnswers(next);
    if (index < MIRROR_QUESTIONS.length - 1) setIndex(index + 1);
    else onSubmit(next);
  };

  return (
    <div className="social-panel">
      <div
        className="progress-bar-container"
        role="progressbar"
        aria-label="progresso"
        aria-valuemin={0}
        aria-valuemax={MIRROR_QUESTIONS.length}
        aria-valuenow={index}
      >
        <div className="progress-bar" style={{ width: `${(index / MIRROR_QUESTIONS.length) * 100}%` }} />
      </div>
      <p className="quiz-counter">
        {index + 1} de {MIRROR_QUESTIONS.length}
      </p>
      <h2 className="mirror-statement" aria-live="polite">
        {question.statement.replace('{name}', ownerName)}
      </h2>
      <div className="likert-row" role="group" aria-label="o quanto isso combina com a pessoa?">
        {answerOptions.map((option) => (
          <button
            key={option.value}
            type="button"
            className={`btn ${answers[index] === option.value ? 'btn-primary' : ''}`}
            disabled={busy}
            onClick={() => choose(option.value)}
          >
            {option.text}
          </button>
        ))}
      </div>
      {index > 0 && (
        <button type="button" className="btn quiz-back" onClick={() => setIndex(index - 1)}>
          ? voltar
        </button>
      )}
    </div>
  );
};

const MirrorResults = ({ mirror, ratings }) => {
  const { average, type } = useMemo(() => friendsView(ratings, mirror.ownerType), [ratings, mirror.ownerType]);
  const self = mirror.ownerPercentages;
  const gaps = Object.keys(AXES).map((axis) => ({ axis, gap: Math.abs(average[axis] - self[axis]) }));
  const biggest = gaps.sort((a, b) => b.gap - a.gap)[0];
  const [low, high] = AXES[biggest.axis];
  // Which way friends' view differs from yours: higher % means more of the second letter.
  const friendsLean = average[biggest.axis] > self[biggest.axis] ? high : low;

  return (
    <div className="social-panel">
      <h2>como seus amigos veem você</h2>
      <p className="mirror-summary">
        voc se v como <strong>{mirror.ownerType}</strong>. seus amigos veem voc como{' '}
        <strong>
          {type} ({PERSONALITY_TYPES[type].name})
        </strong>
        {type === mirror.ownerType ? '. voc se conhece bem! 🎯' : '. que curioso! 👀'}
      </p>
      <div className="mirror-bars">
        {Object.entries(AXES).map(([axis, [l, h]]) => (
          <div className="mirror-axis" key={axis}>
            <div className="axis-labels">
              <span>{LETTER_NAMES[l]}</span>
              <span>{LETTER_NAMES[h]}</span>
            </div>
            <div className="mirror-track">
              <span className="mirror-marker mirror-self" style={{ left: `${self[axis]}%` }} title="você">
                você
              </span>
              <span className="mirror-marker mirror-friends" style={{ left: `${average[axis]}%` }} title="amigos">
                amigos
              </span>
            </div>
          </div>
        ))}
      </div>
      {biggest.gap >= 10 && (
        <p className="mirror-gap">
          maior surpresa: seus amigos veem voc como mais <strong>{LETTER_NAMES[friendsLean]}</strong> do que você
          imaginava (uma diferena de {biggest.gap} pontos).
        </p>
      )}
      <p className="play-privacy">resultado baseado em {ratings.length} respostas annimas. mais respostas deixam o retrato mais consistente.</p>
    </div>
  );
};

const MirrorPage = () => {
  const { id } = useParams();
  const { status, doc: mirror } = useSharedDoc('mirrors', id);
  const ratings = useEntries('mirrors', id, 'ratings', status === 'ready');
  const [owner, setOwner] = useState(false);
  const [rated, setRated] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    setOwner(isOwned('mirrors', id));
    setRated(Boolean(getAnswer('mirrors', id)));
  }, [id]);

  if (status !== 'ready') return <SocialStatus status={status} what="mirror" />;

  const url = `${SITE_URL}/mirror/${id}`;
  const count = ratings?.length ?? 0;

  const submit = async (answers) => {
    setBusy(true);
    setError('');
    try {
      await addEntry('mirrors', id, 'ratings', { answers });
      rememberAnswer('mirrors', id, true);
      track('social_answer', { kind: 'mirrors' });
      setRated(true);
    } catch (err) {
      console.error(err);
      setError('não conseguimos salvar suas respostas. tente novamente.');
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="container section social-page">
      <span className="play-emoji" aria-hidden="true">🪞</span>
      <h1 className="page-title">
        {owner ? 'como seus amigos veem você?' : `como voc v ${mirror.ownerName}?`}
      </h1>

      {owner ? (
        <>
          <p className="types-intro">
            compartilhe este link com seus amigos. eles respondem 16 frases sobre você, sem se identificar. o resultado
            aparece quando {MIRROR_MIN_RATINGS} pessoas responderem.
          </p>
          <ShareLinkBox
            url={url}
            kind="mirrors"
            title="como voc me v?"
            text="quanto voc me conhece? responda 16 perguntas rpidas sobre mim, sem se identificar 🪞"
          />
          {ratings === null ? (
            <p>carregando respostas</p>
          ) : count >= MIRROR_MIN_RATINGS ? (
            <MirrorResults mirror={mirror} ratings={ratings} />
          ) : (
            <p className="mirror-waiting">
              {count} de {MIRROR_MIN_RATINGS} pessoas responderam at agora. o resultado aparece quando chegarmos a{' '}
              {MIRROR_MIN_RATINGS}, para manter as respostas annimas.
            </p>
          )}
        </>
      ) : rated ? (
        <div className="social-panel">
          <h2>obrigado por responder! 💜</h2>
          <p>suas respostas annimas foram enviadas para {mirror.ownerName}.</p>
          <p>quer descobrir seu prprio perfil?</p>
          <Link to="/test" className="btn btn-primary">fazer o teste de personalidade grátis</Link>
        </div>
      ) : (
        <>
          <p className="types-intro">
            {mirror.ownerName} quer saber como os amigos veem essa pessoa. avalie 16 frases; suas respostas so annimas.
          </p>
          {error && <p className="form-error" role="alert">{error}</p>}
          <RatingForm ownerName={mirror.ownerName} onSubmit={submit} busy={busy} />
        </>
      )}
    </div>
  );
};

export default MirrorPage;
