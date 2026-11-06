import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router';
import { PERSONALITY_TYPES } from '../data/personalityTypes';
import { getCompatibility, pairSlug, parsePairSlug, topMatches, TYPE_CODES } from '../data/compatibility';
import { getAnimalImage } from '../utils/images';
import { loadLastResult } from '../utils/storage';
import { awardBadge } from '../utils/badges';
import { track } from '../utils/analytics';
import { breadcrumbJsonLd, buildMeta, SITE_URL } from '../utils/seo';
import Breadcrumbs from '../components/Breadcrumbs';
import '../styles/DetailedResultsPage.css';
import '../styles/TypePages.css';

const OG_IMAGE = `${SITE_URL}/og/compatibility.png`;

// "The Architect" -> "Architect", for phrasing like "Two Architects".
const bareName = (type) => type.name.replace(/^The /, '');

const crumbsFor = (pair) => [
  { name: 'início', path: '/' },
  { name: 'compatibilidade', path: '/compatibility' },
  ...(pair ? [{ name: `${pair[0]} & ${pair[1]}`, path: `/compatibility/${pairSlug(pair[0], pair[1])}` }] : []),
];

export const meta = ({ params }) => {
  if (!params.pair) {
    return buildMeta({
      title: 'compatibilidade entre tipos de personalidade | TrueYouTeller',
      description:
        'compare dois dos 16 perfis de personalidade e veja afinidades, possíveis desafios e dicas para a convivência.',
      path: '/compatibility',
      image: OG_IMAGE,
      jsonLd: [breadcrumbJsonLd(crumbsFor(null))],
    });
  }
  const pair = parsePairSlug(params.pair);
  if (!pair) return [{ title: 'compatibilidade não encontrada | TrueYouTeller' }, { name: 'robots', content: 'noindex' }];
  const { a, b, score } = getCompatibility(...pair);
  const same = a.code === b.code;
  return buildMeta({
      title: same
      ? `compatibilidade ${a.code} e ${b.code}: dois perfis ${bareName(a)} (${score}%) | TrueYouTeller`
      : `compatibilidade ${a.code} e ${b.code}: ${score}% | TrueYouTeller`,
    description: `como ${a.code} (${a.name}) e ${b.code} (${b.name}) combinam? veja afinidades, desafios e dicas para a convivência.`,
    path: `/compatibility/${pairSlug(a.code, b.code)}`,
    image: OG_IMAGE,
    type: 'article',
    jsonLd: [breadcrumbJsonLd(crumbsFor(pair))],
  });
};

const TypeSelect = ({ id, label, value, onChange }) => (
  <div className="compat-select">
    <label htmlFor={id}>{label}</label>
    <select id={id} value={value} onChange={(e) => onChange(e.target.value)}>
      <option value="">escolha um tipo</option>
      {TYPE_CODES.map((code) => (
        <option key={code} value={code}>
          {code} ? {PERSONALITY_TYPES[code].name}
        </option>
      ))}
    </select>
  </div>
);

const Picker = ({ initialA = '', initialB = '' }) => {
  const navigate = useNavigate();
  const [a, setA] = useState(initialA);
  const [b, setB] = useState(initialB);

  // Pre-fill from ?a= or the visitor's own last result (browser-only, so after mount).
  useEffect(() => {
    if (initialA) return;
    const fromQuery = new URLSearchParams(window.location.search).get('a')?.toUpperCase();
    const fromResult = loadLastResult()?.type;
    const pick = [fromQuery, fromResult].find((code) => PERSONALITY_TYPES[code ?? '']);
    if (pick) setA(pick);
  }, [initialA]);

  const submit = (e) => {
    e.preventDefault();
    if (a && b) navigate(`/compatibility/${pairSlug(a, b)}`);
  };

  return (
    <form className="compat-picker" onSubmit={submit}>
      <TypeSelect id="type-a" label="seu tipo" value={a} onChange={setA} />
      <span className="compat-plus" aria-hidden="true">💞</span>
      <TypeSelect id="type-b" label="tipo da outra pessoa" value={b} onChange={setB} />
      <button type="submit" className="btn btn-primary" disabled={!a || !b}>
        comparar perfis
      </button>
    </form>
  );
};

const TypeBadge = ({ type }) => (
  <Link to={`/types/${type.code.toLowerCase()}`} className="compat-type">
    <img src={getAnimalImage(type.spiritAnimal)} alt="" width="110" height="110" />
    <span className="compat-type-code">{type.code}</span>
    <span className="compat-type-name">{type.name}</span>
  </Link>
);

const PairView = ({ pair }) => {
  const { a, b, score, tier, axes } = getCompatibility(...pair);
  useEffect(() => {
    awardBadge('matchmaker');
    track('compat_check', { pair: pairSlug(a.code, b.code), score });
  }, [a.code, b.code, score]);
  const sameCount = axes.filter(function(x){ return x.same; }).length;
  const others = topMatches(a.code, 4).filter(({ code }) => code !== b.code).slice(0, 3);

  return (
    <>
      <header className="compat-hero">
        <h1 className="page-title">{"compatibilidade: " + a.code + " e " + b.code}</h1>
        <div className="compat-pair">
          <TypeBadge type={a} />
          <div
            className="compat-score"
            style={{ '--score': score }}
            role="img"
            aria-label={score + "% de compatibilidade"}
          >
            <span className="compat-score-number">{score}%</span>
            <span className="compat-score-tier">
              {tier.emoji} {tier.label}
            </span>
          </div>
          <TypeBadge type={b} />
        </div>
        <p className="compat-summary">
          {a.code === b.code ?
            "dois perfis " + bareName(a) + " podem se entender de um jeito especial. veja como isso aparece no dia a dia e onde vale ter atenção."
            : a.name + " (" + a.code + ") e " + b.name + " (" + b.code + ") compartilham " + sameCount + " de 4 preferências. veja como isso pode aparecer nas relações e no trabalho."
          }
        </p>
      </header>

      <div className="compat-axes">
        {axes.map((axis) => (
          <section key={axis.axis} className="result-card compat-axis" aria-labelledby={`axis-${axis.axis}`}>
            <h2 id={`axis-${axis.axis}`}>
              <span className="compat-letters">
                {axis.letters[0]} + {axis.letters[1]}
              </span>{' '}
              {axis.title}
            </h2>
            <p>
              <strong>✅ ponto forte:</strong> {axis.strength}
            </p>
            <p>
              <strong>⚠️ vale observar:</strong> {axis.friction}
            </p>
            <p>
              <strong>💡 uma ideia:</strong> {axis.tip}
            </p>
          </section>
        ))}
      </div>

      <div className="type-cta">
        <p>ainda não sabe seu tipo? descubra em cerca de 10 minutos e convide a outra pessoa para fazer o teste.</p>
        <Link to="/test" className="btn btn-primary">fazer o teste grátis</Link>
      </div>

      <section className="result-card" aria-labelledby="more-matches">
        <h2 id="more-matches">mais combinações para {a.code}</h2>
        <div className="match-grid">
          {others.map(({ code, score: otherScore }) => (
            <Link key={code} to={`/compatibility/${pairSlug(a.code, code)}`} className="match-card">
              <span className="match-code">{a.code} &amp; {code}</span>
              <span className="match-name">{PERSONALITY_TYPES[code].name}</span>
              <span className="match-score">{otherScore}% de compatibilidade</span>
            </Link>
          ))}
        </div>
      </section>

      <section className="result-card" aria-labelledby="check-another">
        <h2 id="check-another">comparar outro par</h2>
        <Picker key={`${a.code}-${b.code}`} initialA={a.code} />
      </section>
    </>
  );
};

const CompatibilityPage = () => {
  const { pair: pairParam } = useParams();
  const navigate = useNavigate();
  const pair = pairParam ? parsePairSlug(pairParam) : null;
  const canonical = pair && pairSlug(pair[0], pair[1]);

  // /compatibility/intj-enfp and /compatibility/enfp-intj are the same page.
  useEffect(() => {
    if (pair && pairParam !== canonical) navigate(`/compatibility/${canonical}`, { replace: true });
  }, [pair, pairParam, canonical, navigate]);

  if (pairParam && !pair) {
    return (
      <div className="container section compat-page">
        <h1 className="page-title">não encontramos esse par</h1>
        <p>escolha dois tipos abaixo para comparar os perfis.</p>
        <Picker />
      </div>
    );
  }

  return (
    <div className="container section compat-page">
      <Breadcrumbs items={crumbsFor(pair)} />
      {pair ? (
        <PairView pair={pair} />
      ) : (
        <>
          <h1 className="page-title">compatibilidade entre perfis</h1>
          <p className="types-intro">
            escolha dois dos 16 tipos para ver onde combinam e em que pontos podem pensar diferente. ainda não sabe o seu?{' '}
            <Link to="/test">fa?a o teste grátis</Link>.
          </p>
          <Picker />
        </>
      )}
    </div>
  );
};

export default CompatibilityPage;
