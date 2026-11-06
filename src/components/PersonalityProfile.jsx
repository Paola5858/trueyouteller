import React from 'react';
import { FaStar, FaBriefcase, FaHeart, FaUsers, FaFilm } from 'react-icons/fa';
import { getCelebrityImage } from '../utils/images';
import '../styles/DetailedResultsPage.css';

const renderList = (items) => (
  <ul>
    {items.map((item, index) => <li key={index}>{item}</li>)}
  </ul>
);

// Full write-up for one personality type (an entry of PERSONALITY_TYPES).
const PersonalityProfile = ({ type }) => (
    <>
      {/* viso geral da personalidade */}
      <div className="result-card">
        <h2><FaStar /> viso geral da personalidade</h2>
        <p><strong>traos de personalidade:</strong> {type.personalityTraits}</p>
        <div className="card-subsection">
          <h3>ideias para crescer</h3>
          <p>{type.personalGrowth}</p>
        </div>
        <div className="card-subsection columns">
          <div>
            <h4>pontos fortes</h4>
            {renderList(type.strengthsWeaknesses.strengths)}
          </div>
          <div>
            <h4>pontos de atenção</h4>
            {renderList(type.strengthsWeaknesses.weaknesses)}
          </div>
        </div>
        <div className="card-subsection columns">
            <div>
                <h4>o que recarrega suas energias</h4>
                <p>{type.whatEnergizesYou}</p>
            </div>
            <div>
                <h4>o que pode cansar você</h4>
                <p>{type.whatDrainsYou}</p>
            </div>
        </div>
      </div>

      {/* caminhos profissionais */}
      <div className="result-card">
        <h2><FaBriefcase /> caminhos profissionais</h2>
        <p>{type.careerInsights.careerPath}</p>
         <div className="card-subsection columns">
          <div>
            <h4>seus pontos fortes no trabalho</h4>
            {renderList(type.careerInsights.careerStrengthsWeaknesses.strengths)}
          </div>
          <div>
            <h4>pontos de atenção no trabalho</h4>
            {renderList(type.careerInsights.careerStrengthsWeaknesses.weaknesses)}
          </div>
        </div>
        <div className="card-subsection">
            <h3>reas que podem combinar com você</h3>
            <div className="tags-container">
                {type.careerInsights.careerIdeas.map(idea => <span className="tag" key={idea}>{idea}</span>)}
            </div>
        </div>
        <div className="card-subsection">
          <h3>seu jeito de trabalhar</h3>
          <p>{type.careerInsights.workspaceHabits}</p>
        </div>
      </div>

      {/* relações e conexes */}
      <div className="result-card">
        <h2><FaHeart /> relações e conexes</h2>
        <p>{type.relationshipsConnections.yourRelationships}</p>
        <div className="card-subsection columns">
          <div>
            <h4>pontos fortes nas relações</h4>
            {renderList(type.relationshipsConnections.relationshipStrengthsWeaknesses.strengths)}
          </div>
          <div>
            <h4>pontos de atenção nas relações</h4>
            {renderList(type.relationshipsConnections.relationshipStrengthsWeaknesses.weaknesses)}
          </div>
        </div>
         <div className="card-subsection">
          <h3>como voc costuma demonstrar carinho</h3>
          <p>{type.relationshipsConnections.yourLoveLanguage}</p>
        </div>
      </div>
      
      {/* amizades e famlia */}
       <div className="result-card">
        <h2><FaUsers /> amizades e famlia</h2>
        <div className="card-subsection">
            <h3>amizades</h3>
            <p>{type.socialCirclesFamilyLife.friendships.description}</p>
            <div className="strengths-weaknesses-container">
                <div>
                    <h4>pontos fortes:</h4>
                    <ul>
                        {type.socialCirclesFamilyLife.friendships.strengths.map(item => <li key={item}>{item}</li>)}
                    </ul>
                </div>
                <div>
                    <h4>pontos de atenção:</h4>
                    <ul>
                        {type.socialCirclesFamilyLife.friendships.weaknesses.map(item => <li key={item}>{item}</li>)}
                    </ul>
                </div>
            </div>
        </div>
        <div className="card-subsection">
            <h3>vida em famlia</h3>
            <p>{type.socialCirclesFamilyLife.parenthood.description}</p>
            <div className="strengths-weaknesses-container">
                <div>
                    <h4>pontos fortes:</h4>
                    <ul>
                        {type.socialCirclesFamilyLife.parenthood.strengths.map(item => <li key={item}>{item}</li>)}
                    </ul>
                </div>
                <div>
                    <h4>pontos de atenção:</h4>
                    <ul>
                        {type.socialCirclesFamilyLife.parenthood.weaknesses.map(item => <li key={item}>{item}</li>)}
                    </ul>
                </div>
            </div>
        </div>
      </div>

      {/* referncias culturais */}
       <div className="result-card">
        <h2><FaFilm /> referncias culturais</h2>
        <p>por diverso, reunimos algumas pessoas conhecidas e personagens que podem ter um perfil parecido com o seu. so apenas comparaes ilustrativas.</p>
        <div className="famous-matches-container">
            {type.culturalConnections.famousMatches.map(match => (
                <div className="celebrity-card" key={match}>
                    <img
                        src={getCelebrityImage(type.code, match)}
                        alt={match}
                        className="celebrity-image"
                        loading="lazy"
                        width="360"
                        height="540"
                    />
                    <p className="celebrity-name">{match}</p>
                </div>
            ))}
        </div>
      </div>
    </>
);

export default PersonalityProfile;
