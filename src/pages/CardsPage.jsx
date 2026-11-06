import { useEffect, useState } from 'react';
import { Link } from 'react-router';
import { PERSONALITY_TYPES } from '../data/personalityTypes';
import { QUIZZES } from '../data/quizzes';
import { getProgress } from '../utils/badges';
import { loadLastResult } from '../utils/storage';
import { axisBreakdown } from '../utils/scoring';
import { buildMeta } from '../utils/seo';
import TradingCard from '../components/TradingCard';
import '../styles/TypePages.css';
import '../styles/Social.css';

export const meta = () =>
  buildMeta({
    title: 'minha coleo de cartas | TrueYouTeller',
    description: 'colecione cartas de personalidade e dos testes rpidos.',
    path: '/cards',
    noindex: true,
  });

const CardsPage = () => {
  const [collected, setCollected] = useState(null);
  const [last, setLast] = useState(null);

  // Collection lives in the browser, so it is read after mount.
  useEffect(() => {
    const lastResult = loadLastResult();
    const cards = new Set(getProgress('cards'));
    if (lastResult?.type) cards.add(lastResult.type);
    setCollected(cards);
    setLast(lastResult);
  }, []);

  const typeCodes = Object.keys(PERSONALITY_TYPES);
  const quizCards = QUIZZES.flatMap((quiz) =>
    Object.entries(quiz.outcomes).map(([id, outcome]) => ({ key: `${quiz.slug}:${id}`, quiz, outcome }))
  );
  const total = typeCodes.length + quizCards.length;
  const count = collected ? [...collected].filter((key) => typeCodes.includes(key) || key.includes(':')).length : 0;

  return (
    <div className="container section cards-page">
      <h1 className="page-title">minha coleo de cartas</h1>
      <p className="types-intro">
        cada resultado vira uma carta para colecionar. quanto mais raro o perfil, mais difcil encontrar sua carta.
        {collected && (
          <>
            {' '}
            voc j tem <strong>{count}</strong> de {total} cartas.
          </>
        )}
      </p>
      {collected && count === 0 && (
        <div className="type-cta">
          <p>sua coleo ainda est vazia. faa um teste para ganhar a primeira carta.</p>
          <Link to="/test" className="btn btn-primary">fazer o teste grátis</Link>
        </div>
      )}

      <section aria-labelledby="type-cards">
        <h2 id="type-cards">cartas de personalidade</h2>
        <p>refaa o teste quando quiser para descobrir outros perfis. a gente muda com o tempo!</p>
        <div className="card-grid">
          {typeCodes.map((code) => (
            <TradingCard
              key={code}
              type={PERSONALITY_TYPES[code]}
              locked={!collected?.has(code)}
              breakdown={last?.type === code && last.percentages ? axisBreakdown(code, last.percentages) : null}
            />
          ))}
        </div>
      </section>

      <section aria-labelledby="quiz-cards">
        <h2 id="quiz-cards">cartas dos testes rpidos</h2>
        <div className="card-grid">
          {quizCards.map(({ key, quiz, outcome }) =>
            collected?.has(key) ? (
              <TradingCard key={key} quizOutcome={outcome} quizTitle={quiz.shortTitle} />
            ) : (
              <Link key={key} to={`/quizzes/${quiz.slug}`} className="card-link" aria-label={`fazer ${quiz.shortTitle} para desbloquear`}>
                <TradingCard quizOutcome={outcome} quizTitle={quiz.shortTitle} locked />
              </Link>
            )
          )}
        </div>
      </section>
    </div>
  );
};

export default CardsPage;
