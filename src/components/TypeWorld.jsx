import { spotifyLink, TYPE_WORLD } from '../data/typeWorld';
import '../styles/Cards.css';

// "Your type's world" section for result and type pages.
const TypeWorld = ({ code, isYou = false }) => {
  const world = TYPE_WORLD[code];
  if (!world) return null;
  return (
    <section className="result-card type-world" aria-labelledby={`world-${code}`}>
      <h2 id={`world-${code}`}>{isYou ? 'seu universo' : `universo ${code}`} 🌍</h2>
      <div className="type-world-grid">
        <div className="type-world-item">
          <h3>🎬 para assistir</h3>
          <ul>
            {world.watch.map((title) => (
              <li key={title}>{title}</li>
            ))}
          </ul>
        </div>
        <div className="type-world-item">
          <h3>🎭 personagem que combina</h3>
          <p>{world.twin}</p>
          <p className="type-world-note">uma comparao divertida, sem classificao oficial.</p>
        </div>
        <div className="type-world-item">
          <h3>💼 um dia ideal de trabalho</h3>
          <p>{world.dreamDay}</p>
        </div>
        <div className="type-world-item">
          <h3>☀️ fim de semana perfeito</h3>
          <p>{world.weekend}</p>
        </div>
      </div>
      <a className="btn type-world-spotify" href={spotifyLink(code)} target="_blank" rel="noopener noreferrer">
        🎧 encontrar playlists {code} no Spotify
      </a>
    </section>
  );
};

export default TypeWorld;
