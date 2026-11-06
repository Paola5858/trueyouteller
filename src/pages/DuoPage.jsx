import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router';
import { PERSONALITY_TYPES } from '../data/personalityTypes';
import { pairSlug } from '../data/compatibility';
import { buildDuoReport } from '../data/duoReport';
import { addEntry } from '../firebase/social';
import { getAnimalImage } from '../utils/images';
import { clearPendingJoin, isOwned } from '../utils/storage';
import { useEntries, useSharedDoc } from '../utils/useShared';
import { track } from '../utils/analytics';
import { buildMeta, SITE_URL } from '../utils/seo';
import ShareLinkBox from '../components/ShareLinkBox';
import SocialStatus from '../components/SocialStatus';
import JoinPanel from '../components/JoinPanel';
import '../styles/TypePages.css';
import '../styles/Social.css';

export const meta = () =>
  buildMeta({
    title: 'relatrio de personalidade para duplas | TrueYouTeller',
    description: 'veja como dois perfis se combinam na conversa, nos planos e na hora de resolver diferenas.',
    path: '/play',
    noindex: true,
  });

const Person = ({ name, type }) => (
  <div className="compat-type">
    <img src={getAnimalImage(PERSONALITY_TYPES[type].spiritAnimal)} alt="" width="110" height="110" />
    <span className="compat-type-code">{name}</span>
    <span className="compat-type-name">
      {type}  {PERSONALITY_TYPES[type].name}
    </span>
  </div>
);

const DuoPage = () => {
  const { id } = useParams();
  const { status, doc: duo } = useSharedDoc('duos', id);
  const partners = useEntries('duos', id, 'partner', status === 'ready');
  const [owner, setOwner] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => setOwner(isOwned('duos', id)), [id]);

  if (status !== 'ready') return <SocialStatus status={status} what="report" />;

  const partner = partners?.[0];
  const couple = duo.mode === 'couple';
  const label = couple ? 'relatrio de casal' : 'relatrio de amizade';

  const join = async ({ name, type }) => {
    setBusy(true);
    setError('');
    try {
      await addEntry('duos', id, 'partner', { name, type }, 'b');
      clearPendingJoin();
      track('social_answer', { kind: 'duos' });
    } catch (err) {
      console.error(err);
      setError('algum j respondeu a este relatrio ou algo deu errado. tente novamente.');
    } finally {
      setBusy(false);
    }
  };

  const report =
    partner && buildDuoReport({ mode: duo.mode, a: { name: duo.aName, type: duo.aType }, b: { name: partner.name, type: partner.type } });

  return (
    <div className="container section social-page compat-page">
      <span className="play-emoji" aria-hidden="true">{couple ? '💑' : '👯'}</span>
      <h1 className="page-title">
        {partner ? `${duo.aName} & ${partner.name}` : couple ? 'relatrio de casal' : 'relatrio de amizade'}
      </h1>

      {partners === null ? (
        <p className="page-loading">carregando</p>
      ) : report ? (
        <>
          <div className="compat-pair">
            <Person name={duo.aName} type={duo.aType} />
            <div className="compat-score" style={{ '--score': report.score }} role="img" aria-label={`${report.score}% match`}>
              <span className="compat-score-number">{report.score}%</span>
              <span className="compat-score-tier">
                {report.tier.emoji} {report.tier.label}
              </span>
            </div>
            <Person name={partner.name} type={partner.type} />
          </div>
          <div className="duo-sections">
            {report.sections.map((section) => (
              <section key={section.title} className="social-panel duo-section">
                <h2>
                  <span aria-hidden="true">{section.emoji}</span> {section.title}
                </h2>
                <p>{section.text}</p>
              </section>
            ))}
          </div>
          <div className="quiz-result-actions">
            <Link to={`/compatibility/${pairSlug(duo.aType, partner.type)}`} className="btn btn-primary">
              ver a compatibilidade entre {duo.aType} e {partner.type}
            </Link>
            <Link to="/play" className="btn">jogar outra brincadeira</Link>
          </div>
        </>
      ) : owner ? (
        <>
          <p className="types-intro">
            envie este link para {couple ? 'seu par' : 'sua melhor amizade'}. o relatrio aparece aqui assim que a outra
            pessoa entrar.
          </p>
          <ShareLinkBox
            url={`${SITE_URL}/duo/${id}`}
            kind="duos"
            title={couple ? 'nosso relatrio de personalidade de casal' : 'nosso relatrio de amizade'}
            text={couple ? 'vamos descobrir como nossos jeitos combinam 💑' : 'vamos comparar nossos perfis de amizade 👯'}
          />
          <p className="mirror-waiting">esperando a outra pessoa entrar</p>
        </>
      ) : (
        <div className="social-panel">
          <p>
            <strong>{duo.aName}</strong> ({duo.aType}) convidou voc para um {label}. entre com seu perfil para ver o resultado.
          </p>
          {error && <p className="form-error" role="alert">{error}</p>}
          <JoinPanel label={label} returnPath={`/duo/${id}`} onJoin={join} busy={busy} />
        </div>
      )}
    </div>
  );
};

export default DuoPage;
