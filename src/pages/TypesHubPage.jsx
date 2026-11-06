import { Link } from 'react-router';
import { PERSONALITY_TYPES } from '../data/personalityTypes';
import { getAnimalImage } from '../utils/images';
import { breadcrumbJsonLd, buildMeta, SITE_URL } from '../utils/seo';
import Breadcrumbs from '../components/Breadcrumbs';
import '../styles/TypePages.css';

const GROUPS = [
  { name: 'analistas', blurb: 'pessoas curiosas que gostam de ideias, lgica e estratgia.', codes: ['INTJ', 'INTP', 'ENTJ', 'ENTP'] },
  { name: 'diplomatas', blurb: 'pessoas guiadas por empatia, ideais e busca de sentido.', codes: ['INFJ', 'INFP', 'ENFJ', 'ENFP'] },
  { name: 'sentinelas', blurb: 'pessoas atentas que valorizam compromisso, organizao e lealdade.', codes: ['ISTJ', 'ISFJ', 'ESTJ', 'ESFJ'] },
  { name: 'exploradores', blurb: 'pessoas espontneas que gostam de ao e novas experincias.', codes: ['ISTP', 'ISFP', 'ESTP', 'ESFP'] },
];

const CRUMBS = [
  { name: 'início', path: '/' },
  { name: '16 tipos de personalidade', path: '/types' },
];

export const meta = () =>
  buildMeta({
    title: 'conhea os 16 tipos de personalidade | TrueYouTeller',
    description:
      'explore os 16 perfis de personalidade e conhea suas caractersticas, pontos fortes, relações e animal simblico.',
    path: '/types',
    jsonLd: [
      {
        '@context': 'https://schema.org',
        '@type': 'ItemList',
        name: 'os 16 tipos de personalidade',
        itemListElement: GROUPS.flatMap((g) => g.codes).map((code, i) => ({
          '@type': 'ListItem',
          position: i + 1,
          name: `${code}: ${PERSONALITY_TYPES[code].name}`,
          url: `${SITE_URL}/types/${code.toLowerCase()}`,
        })),
      },
      breadcrumbJsonLd(CRUMBS),
    ],
  });

const TypesHubPage = () => (
  <div className="container section types-hub">
    <Breadcrumbs items={CRUMBS} />
    <h1 className="page-title">os 16 tipos de personalidade</h1>
    <p className="types-intro">
      cada perfil combina quatro preferências: de onde vem sua energia (introverso ou extroverso), o que chama sua
      atenção (sensao ou intuio), como voc decide (razo ou sentimento) e como organiza a vida (planejamento ou
      flexibilidade). escolha um perfil para explorar ou <Link to="/test">faa o teste grátis</Link> para descobrir o seu.
    </p>
    {GROUPS.map((group) => (
      <section key={group.name} className="type-group" aria-labelledby={`group-${group.name}`}>
        <h2 id={`group-${group.name}`}>{group.name}</h2>
        <p>{group.blurb}</p>
        <div className="type-grid">
          {group.codes.map((code) => {
            const type = PERSONALITY_TYPES[code];
            return (
              <Link key={code} to={`/types/${code.toLowerCase()}`} className="type-tile">
                <img src={getAnimalImage(type.spiritAnimal)} alt="" loading="lazy" width="96" height="96" />
                <span className="type-tile-code">{code}</span>
                <span className="type-tile-name">{type.name}</span>
                <span className="type-tile-animal">{type.spiritAnimal}</span>
              </Link>
            );
          })}
        </div>
      </section>
    ))}
  </div>
);

export default TypesHubPage;
