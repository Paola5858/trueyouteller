import { useEffect, useMemo, useState } from 'react';
import { Link, useLocation, useNavigate, useParams } from 'react-router';
import { PERSONALITY_TYPES } from '../data/personalityTypes';
import { axisBreakdown, decodePercentages } from '../utils/scoring';
import { getPendingJoin, inviteUrl, loadLastResult, resultUrl } from '../utils/storage';
import { getCompatibility, pairSlug } from '../data/compatibility';
import { awardBadge } from '../utils/badges';
import { track } from '../utils/analytics';
import { getAnimalImage } from '../utils/images';
import { buildMeta, SITE_URL } from '../utils/seo';
import AxisBars from '../components/AxisBars';
import ShareSheet from '../components/ShareSheet';
import PersonalityProfile from '../components/PersonalityProfile';
import TradingCard from '../components/TradingCard';
import TypeWorld from '../components/TypeWorld';
import { rarityFor } from '../data/typeRarity';
import '../styles/ResultsPage.css';
import '../styles/Social.css';

const REVEAL_MS = 2400;

const findType = (param) => PERSONALITY_TYPES[(param ?? '').toUpperCase()];

export const meta = ({ params }) => {
  const type = findType(params.type);
  if (!type) return [{ title: 'resultado não encontrado | TrueYouTeller' }, { name: 'robots', content: 'noindex' }];
  return buildMeta({
    title: `${type.code}: ${type.name} | resultado do teste | TrueYouTeller`,
    description: `conhea o perfil ${type.code} (${type.name}) e faa o teste grátis para descobrir o seu.`,
    path: `/result/${type.code.toLowerCase()}`,
    image: `${SITE_URL}/og/${type.code.toLowerCase()}.png`,
    noindex: true,
  });
};

const prefersReducedMotion = () => window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

const celebrate = async () => {
  if (prefersReducedMotion()) return;
  const { default: confetti } = await import('canvas-confetti');
  const colors = ['#5B2C6F', '#F39C12', '#E8DAEF', '#ffffff'];
  confetti({ particleCount: 120, spread: 80, origin: { y: 0.35 }, colors });
  setTimeout(() => confetti({ particleCount: 80, spread: 120, origin: { y: 0.3 }, colors }), 350);
};

// Shown to someone who took the test from a friend's invite link.
const InviterMatch = ({ type, inviter }) => {
  const { score, tier } = getCompatibility(type.code, inviter.type);
  useEffect(() => track('invite_match', { pair: pairSlug(type.code, inviter.type), score }), [type.code, inviter.type, score]);
  const who = inviter.name || 'sua pessoa amiga';
  return (
    <div className="inviter-match">
      <p className="inviter-match-title">
        você ({type.code}) e {who} ({inviter.type})
      </p>
      <p className="inviter-match-score">
        {score}%  {tier.emoji} {tier.label}
      </p>
      <Link to={`/compatibility/${pairSlug(type.code, inviter.type)}`} className="btn btn-primary">
        ver a compatibilidade completa
      </Link>
    </div>
  );
};

const InviteFriend = ({ type, name }) => {
  const [copied, setCopied] = useState(false);
  const url = inviteUrl({ type: type.code, name });
  const text = `meu tipo  ${type.code}! faa este teste grátis e vamos ver como nossos perfis combinam 💞`;

  const share = async () => {
    awardBadge('inviter');
    track('invite_send', { method: navigator.share ? 'native' : 'copy', personality_type: type.code });
    if (navigator.share) {
      try {
          await navigator.share({ title: 'nossos perfis combinam?', text, url });
      } catch {
        // Share sheet dismissed.
      }
      return;
    }
    try {
      await navigator.clipboard.writeText(`${text} ${url}`);
      setCopied(true);
    } catch {
      setCopied(false);
    }
  };

  return (
    <section className="invite-friend" aria-labelledby="invite-heading">
      <h2 id="invite-heading">compare seu perfil com algum 💞</h2>
      <p>mande o link para uma amizade, seu par ou algum especial. quando a pessoa terminar o teste, vocês veem como combinam.</p>
      <div className="share-buttons">
        <button type="button" className="btn btn-primary share-btn" onClick={share}>
          {copied ? 'link do convite copiado!' : 'compartilhar convite'}
        </button>
        <a
          className="btn share-btn share-whatsapp"
          href={`https://wa.me/?text=${encodeURIComponent(`${text} ${url}`)}`}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => {
            awardBadge('inviter');
            track('invite_send', { method: 'whatsapp', personality_type: type.code });
          }}
        >
          convite pelo WhatsApp
        </a>
        <Link to={`/compatibility?a=${type.code.toLowerCase()}`} className="btn share-btn">
          j sabe o tipo da outra pessoa?
        </Link>
      </div>
    </section>
  );
};

const ResultPage = () => {
  const { type: typeParam } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const type = findType(typeParam);

  // Query params (name, percentages) and storage only exist in the browser, so they are
  // read after mount; the prerendered HTML shows the generic type view.
  const [client, setClient] = useState(null);
  const [revealing, setRevealing] = useState(Boolean(location.state?.fresh));

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const name = params.get('n')?.slice(0, 40) || '';
    const percentages = decodePercentages(params.get('p'));
    const last = loadLastResult();
    const isOwner = Boolean(last && type && last.type === type.code && (!name || last.name === name));
    setClient({
      name,
      percentages,
      isOwner,
      invitedBy: isOwner ? last.invitedBy : null,
      pendingJoin: isOwner ? getPendingJoin() : null,
    });
  }, [location.search, type]);

  useEffect(() => {
    if (!revealing) return undefined;
    const timer = setTimeout(
      () => {
        setRevealing(false);
        celebrate();
        // Drop the "fresh" flag so a refresh shows the result straight away.
        navigate(`${location.pathname}${location.search}`, { replace: true, state: null });
      },
      prefersReducedMotion() ? 300 : REVEAL_MS
    );
    return () => clearTimeout(timer);
  }, [revealing, navigate, location.pathname, location.search]);

  const breakdown = useMemo(
    () => (type && client?.percentages ? axisBreakdown(type.code, client.percentages) : null),
    [type, client]
  );

  if (!type) {
    return (
      <div className="results-container container section">
        <div className="results-card">
          <h1 className="page-title">esse tipo de personalidade não existe</h1>
          <p>a bola de cristal não reconhece "{typeParam}".</p>
          <Link to="/test" className="btn btn-primary">fazer o teste grátis</Link>
        </div>
      </div>
    );
  }

  if (revealing) {
    return (
      <div className="results-container container section">
        <div className="results-card reveal-card" role="status">
          <div className="crystal-orb" aria-hidden="true">🔮</div>
          <h1 className="page-title">lendo sua bola de cristal</h1>
          <p>misturando suas respostas com uma pitada de magia ✨</p>
        </div>
      </div>
    );
  }

  const name = client?.name;
  const isOwner = client?.isOwner;
  const heading = isOwner
    ? `voc  ${type.name} (${type.code})`
    : name
      ? `${name}  ${type.name} (${type.code})`
      : `${type.code}: ${type.name}`;
  const shareUrl = resultUrl({ type: type.code, name, percentages: client?.percentages });

  return (
    <div className="results-container container section">
      <div className={`results-card ${client ? 'flip-in' : ''}`}>
        <p className="result-kicker">{isOwner ? `${name}, seu tipo de personalidade ` : 'tipo de personalidade'}</p>
        <h1 className="result-name">{heading}</h1>
        <p className="result-description">{type.description}</p>
        {client?.pendingJoin && (
          <div className="pending-join">
            <p>voc fez o teste para entrar em {client.pendingJoin.label}.</p>
            <Link to={client.pendingJoin.path} className="btn btn-primary">
              concluir entrada ?
            </Link>
          </div>
        )}
        {client?.invitedBy && <InviterMatch type={type} inviter={client.invitedBy} />}
        <div className="spirit-animal-section">
          <img
            src={getAnimalImage(type.spiritAnimal)}
            alt={type.spiritAnimal}
            className="spirit-animal-image"
            width="250"
            height="250"
          />
          <h2 className="spirit-animal-heading">
            {isOwner ? 'seu animal simblico ' : name ? `o animal simblico de ${name} ` : 'animal simblico:'} {type.spiritAnimal}
          </h2>
          <p>{type.reason}</p>
        </div>

        {breakdown && (
          <section className="breakdown-section" aria-labelledby="breakdown-heading">
            <h2 id="breakdown-heading">{isOwner ? 'seu perfil em detalhes' : 'perfil em detalhes'}</h2>
            <AxisBars rows={breakdown} />
          </section>
        )}

        {!isOwner && (
          <div className="friend-cta">
            <p>
              {name ? `seu jeito parece com o de ${name}? faa o teste e descubra como os perfis combinam.` : 'quer descobrir seu prprio perfil?'}{' '}
              leva cerca de 10 minutos.
            </p>
            <Link
              to={name ? `/test?ref=${type.code.toLowerCase()}&rn=${encodeURIComponent(name)}` : '/test'}
              className="btn btn-primary bouncing"
            >
              fazer o teste grátis
            </Link>
          </div>
        )}

        <ShareSheet type={type} name={name} breakdown={breakdown} url={shareUrl} isOwner={isOwner} />

        {isOwner && <InviteFriend type={type} name={name} />}

        {isOwner && (
          <section className="your-card" aria-labelledby="card-heading">
            <h2 id="card-heading">sua carta: {rarityFor(type.code).emoji} {rarityFor(type.code).label}!</h2>
            <p>
              apenas cerca de {rarityFor(type.code).percent}% das pessoas tm o perfil {type.code}. faa outros testes para colecionar cartas.
            </p>
            <div className="your-card-row">
              <TradingCard type={type} breakdown={breakdown} />
            </div>
            <Link to="/cards" className="btn">🃏 ver minha coleo</Link>
          </section>
        )}

        {isOwner && (
          <section className="play-teaser" aria-labelledby="play-teaser-heading">
            <h2 id="play-teaser-heading">jogue com seus amigos 🎲</h2>
            <ul className="play-teaser-list">
              <li>🪞 como seus amigos veem você?</li>
              <li>🤔 eles conseguem adivinhar seu tipo?</li>
              <li>💞 relatrio para casal ou amizade</li>
              <li>👨‍👩‍👧‍👦 mapa de personalidade do grupo</li>
            </ul>
            <Link to="/play" className="btn btn-primary">comear uma brincadeira</Link>
          </section>
        )}

        <div className="results-buttons-container">
          <a href="#full-profile" className="btn btn-primary">ver o perfil completo ↓</a>
          <Link to={`/types/${type.code.toLowerCase()}`} className="btn">saiba tudo sobre {type.code}</Link>
          {isOwner && <Link to="/test" className="btn">refazer o teste</Link>}
        </div>
      </div>

      <div id="full-profile" className="detailed-results-page full-profile">
        <h2 className="full-profile-heading">
          {isOwner ? 'seu perfil completo' : `perfil ${type.code}`}
        </h2>
        <PersonalityProfile type={type} />
        <TypeWorld code={type.code} isYou={isOwner} />
      </div>
    </div>
  );
};

export default ResultPage;
