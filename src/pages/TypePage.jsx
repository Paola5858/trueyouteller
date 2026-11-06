import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router';
import { PERSONALITY_TYPES } from '../data/personalityTypes';
import { pairSlug, topMatches } from '../data/compatibility';
import { getAnimalImage } from '../utils/images';
import { awardBadge, trackProgress } from '../utils/badges';
import { breadcrumbJsonLd, buildMeta, SITE_NAME, SITE_URL } from '../utils/seo';
import PersonalityProfile from '../components/PersonalityProfile';
import TypeWorld from '../components/TypeWorld';
import Breadcrumbs from '../components/Breadcrumbs';
import '../styles/TypePages.css';

const findType = (param) => PERSONALITY_TYPES[(param ?? '').toUpperCase()];

const crumbsFor = (type) => [
  { name: 'início', path: '/' },
  { name: '16 tipos de personalidade', path: '/types' },
  { name: `${type.code}: ${type.name}`, path: `/types/${type.code.toLowerCase()}` },
];

export const meta = ({ params }) => {
  const type = findType(params.type);
  if (!type) return [{ title: 'tipo de personalidade não encontrado | TrueYouTeller' }, { name: 'robots', content: 'noindex' }];
  const path = `/types/${type.code.toLowerCase()}`;
  const image = `${SITE_URL}/og/${type.code.toLowerCase()}.png`;
  const title = `perfil ${type.code} (${type.name}): características e compatibilidade`;
  const description = `conhea o perfil ${type.code} (${type.name}), seus pontos fortes, relaes, caminhos profissionais e animal simbólico.`;
  return buildMeta({
    title,
    description,
    path,
    image,
    type: 'article',
    jsonLd: [
      {
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: `perfil ${type.code}: ${type.name}`,
        description,
        image,
        url: `${SITE_URL}${path}`,
        author: { '@type': 'Organization', name: SITE_NAME, url: SITE_URL },
        publisher: { '@type': 'Organization', name: SITE_NAME, url: SITE_URL },
      },
      breadcrumbJsonLd(crumbsFor(type)),
    ],
  });
};

const TypePage = () => {
  const { type: typeParam } = useParams();
  const type = findType(typeParam);

  useEffect(() => {
    if (type && trackProgress('types', type.code) >= 5) awardBadge('explorer');
  }, [type]);

  if (!type) {
    return (
      <div className="container section type-page">
        <h1 className="page-title">esse tipo de personalidade não existe</h1>
        <p>
          explore os <Link to="/types">16 tipos de personalidade</Link> ou <Link to="/test">faa o teste grátis</Link>.
        </p>
      </div>
    );
  }

  const matches = topMatches(type.code);

  return (
    <div className="container section type-page">
      <Breadcrumbs items={crumbsFor(type)} />
      <header className="detailed-header type-hero">
        <img
          src={getAnimalImage(type.spiritAnimal)}
          alt={`${type.spiritAnimal}, animal simbólico do tipo ${type.code}`}
          className="spirit-animal-image-detailed"
          width="150"
          height="150"
        />
        <h1>{`perfil ${type.code}: ${type.name}`}</h1>
        <p className="detailed-header-description">{type.description}</p>
      </header>

      <section className="type-quick-facts" aria-label={`resumo do perfil ${type.code}`}>
        <div className="quick-fact">
          <span className="quick-fact-label">animal simbólico</span>
          <span className="quick-fact-value">{type.emoji} {type.spiritAnimal}</span>
        </div>
        <div className="quick-fact">
          <span className="quick-fact-label">pontos fortes</span>
          <span className="quick-fact-value">{type.strengthsWeaknesses.strengths.slice(0, 2).join(', ')}</span>
        </div>
        <div className="quick-fact">
          <span className="quick-fact-label">reas de trabalho</span>
          <span className="quick-fact-value">{type.careerInsights.careerIdeas.slice(0, 2).join(', ')}</span>
        </div>
        <div className="quick-fact">
          <span className="quick-fact-label">pessoas conhecidas {type.code}</span>
          <span className="quick-fact-value">{type.culturalConnections.famousMatches.slice(0, 2).join(', ')}</span>
        </div>
      </section>

      <div className="type-cta">
        <p>ser que voc  {type.code}? descubra em cerca de 10 minutos.</p>
        <Link to="/test" className="btn btn-primary">fazer o teste grátis</Link>
      </div>

      <section className="result-card" aria-labelledby="why-animal">
        <h2 id="why-animal">por que o {type.spiritAnimal}?</h2>
        <p>{type.reason}</p>
      </section>

      <PersonalityProfile type={type} />

      <TypeWorld code={type.code} />

      <section className="result-card" aria-labelledby="best-matches">
        <h2 id="best-matches">combinações para {type.code}</h2>
        <p>pelo nosso modelo de compatibilidade, estes perfis tendem a combinar com {type.name}:</p>
        <div className="match-grid">
          {matches.map(({ code, score }) => (
            <Link key={code} to={`/compatibility/${pairSlug(type.code, code)}`} className="match-card">
              <span className="match-code">{code}</span>
              <span className="match-name">{PERSONALITY_TYPES[code].name}</span>
              <span className="match-score">{score}% de compatibilidade</span>
            </Link>
          ))}
        </div>
        <p className="match-more">
          <Link to={`/compatibility?a=${type.code.toLowerCase()}`}>compare {type.code} com qualquer perfil ?</Link>
        </p>
      </section>
    </div>
  );
};

export default TypePage;
