import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { createShared } from '../firebase/social';
import { loadLastResult, rememberOwned } from '../utils/storage';
import { track } from '../utils/analytics';
import { breadcrumbJsonLd, buildMeta } from '../utils/seo';
import Breadcrumbs from '../components/Breadcrumbs';
import '../styles/TypePages.css';
import '../styles/Social.css';

const CRUMBS = [
  { name: 'início', path: '/' },
  { name: 'jogar com amigos', path: '/play' },
];

export const meta = () =>
  buildMeta({
    title: 'jogos de personalidade para curtir com amigos | TrueYouTeller',
    description:
      'descubra como seus amigos veem você, compare perfis em dupla ou monte um mapa de personalidade do seu grupo.',
    path: '/play',
    jsonLd: [breadcrumbJsonLd(CRUMBS)],
  });

const ROOM_EMOJIS = ['🏠', '🎓', '💼', '⚽', '🎮', '🍕', '✈️', '💜'];

const PlayHubPage = () => {
  const navigate = useNavigate();
  const [last, setLast] = useState(null);
  const [busy, setBusy] = useState('');
  const [error, setError] = useState('');
  const [roomName, setRoomName] = useState('');
  const [roomEmoji, setRoomEmoji] = useState(ROOM_EMOJIS[0]);

  useEffect(() => setLast(loadLastResult()), []);

  const create = async (kind, data, path) => {
    setBusy(kind);
    setError('');
    try {
      const id = await createShared(kind, data);
      rememberOwned(kind, id);
      track('social_create', { kind });
      navigate(`/${path}/${id}`);
    } catch (err) {
      console.error(err);
      setError('algo deu errado. tente novamente daqui a pouco.');
      setBusy('');
    }
  };

  const needsResult = !last?.type;
  const owner = last && { ownerName: last.name || 'Me', ownerType: last.type };

  const ResultGate = () => (
    <p className="play-gate">
      <Link to="/test">faa o teste primeiro</Link> para descobrir seu perfil.
    </p>
  );

  return (
    <div className="container section play-hub">
      <Breadcrumbs items={CRUMBS} />
      <h1 className="page-title">jogue com seus amigos</h1>
      <p className="types-intro">
        descobrir coisas sobre a gente fica melhor em grupo. escolha uma brincadeira e compartilhe o link com amigos,
        famlia ou com quem voc gosta. ningum precisa criar conta.
      </p>
      {error && <p className="form-error" role="alert">{error}</p>}

      <div className="play-grid">
        <section className="play-card" aria-labelledby="play-mirror">
          <span className="play-emoji" aria-hidden="true">🪞</span>
          <h2 id="play-mirror">como seus amigos veem você</h2>
          <p>seus amigos respondem 16 perguntas sobre você, sem se identificar. depois, compare as respostas com as suas.</p>
          {needsResult ? (
            <ResultGate />
          ) : (
            <button
              type="button"
              className="btn btn-primary"
              disabled={Boolean(busy)}
              onClick={() =>
                create('mirrors', { ...owner, ownerPercentages: last.percentages ?? { IE: 50, SN: 50, TF: 50, JP: 50 } }, 'mirror')
              }
            >
              {busy === 'mirrors' ? 'criando' : 'criar meu link'}
            </button>
          )}
        </section>

        <section className="play-card" aria-labelledby="play-guess">
          <span className="play-emoji" aria-hidden="true">🤔</span>
          <h2 id="play-guess">adivinhe meu tipo</h2>
          <p>ser que seus amigos acertam seu perfil? veja quem conhece voc melhor no placar.</p>
          {needsResult ? (
            <ResultGate />
          ) : (
            <button type="button" className="btn btn-primary" disabled={Boolean(busy)} onClick={() => create('guesses', owner, 'guess')}>
              {busy === 'guesses' ? 'criando' : 'comear a brincadeira'}
            </button>
          )}
        </section>

        <section className="play-card" aria-labelledby="play-duo">
          <span className="play-emoji" aria-hidden="true">💞</span>
          <h2 id="play-duo">relatrio para dupla</h2>
          <p>mande um link para seu par ou melhor amigo e comparem como vocês conversam, resolvem diferenas e se divertem.</p>
          {needsResult ? (
            <ResultGate />
          ) : (
            <div className="play-buttons">
              {[
                ['couple', '💑 casal'],
                ['bestie', '👯 melhores amigos'],
              ].map(([mode, label]) => (
                <button
                  key={mode}
                  type="button"
                  className="btn btn-primary"
                  disabled={Boolean(busy)}
                  onClick={() => create('duos', { mode, aName: owner.ownerName, aType: owner.ownerType }, 'duo')}
                >
                  {busy === 'duos' ? 'criando' : label}
                </button>
              ))}
            </div>
          )}
        </section>

        <section className="play-card" aria-labelledby="play-room">
          <span className="play-emoji" aria-hidden="true">👨‍👩‍👧‍👦</span>
          <h2 id="play-room">mapa do grupo</h2>
          <p>chame a famlia, a turma ou a equipe. cada pessoa entra com seu tipo e vocês veem o perfil do grupo.</p>
          <form
            className="room-form"
            onSubmit={(e) => {
              e.preventDefault();
              if (roomName.trim()) create('rooms', { name: roomName.trim().slice(0, 40), emoji: roomEmoji }, 'room');
            }}
          >
            <label htmlFor="room-name">nome do grupo</label>
            <input
              id="room-name"
              value={roomName}
              maxLength={40}
              onChange={(e) => setRoomName(e.target.value)}
              placeholder="ex.: nossa turma"
            />
            <div className="emoji-picker" role="radiogroup" aria-label="escolha um emoji para o grupo">
              {ROOM_EMOJIS.map((emoji) => (
                <button
                  key={emoji}
                  type="button"
                  role="radio"
                  aria-checked={roomEmoji === emoji}
                  className={roomEmoji === emoji ? 'selected' : ''}
                  onClick={() => setRoomEmoji(emoji)}
                >
                  {emoji}
                </button>
              ))}
            </div>
            <button type="submit" className="btn btn-primary" disabled={!roomName.trim() || Boolean(busy)}>
              {busy === 'rooms' ? 'criando' : 'criar grupo'}
            </button>
          </form>
        </section>
      </div>

      <p className="play-privacy">
        qualquer pessoa com o link pode ver o que foi compartilhado; envie apenas para quem voc conhece. as respostas
        sobre voc não mostram nomes. <Link to="/privacy">saiba mais sobre privacidade</Link>
      </p>
    </div>
  );
};

export default PlayHubPage;
