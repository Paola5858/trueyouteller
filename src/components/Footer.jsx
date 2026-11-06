import React from 'react';
import { Link } from 'react-router';
import { PERSONALITY_TYPES } from '../data/personalityTypes';

const Footer = () => (
  <footer className="site-footer">
    <div className="container footer-grid">
      <div>
        <h2>TrueYouTeller</h2>
        <p>um teste de personalidade gratuito e divertido para descobrir seu perfil e seu animal simblico.</p>
      </div>
      <nav aria-label="explore">
        <h2>explore</h2>
        <ul>
          <li><Link to="/test">teste de personalidade grátis</Link></li>
          <li><Link to="/types">16 tipos de personalidade</Link></li>
          <li><Link to="/compatibility">compatibilidade entre perfis</Link></li>
          <li><Link to="/quizzes">testes rpidos</Link></li>
          <li><Link to="/play">jogar com amigos</Link></li>
          <li><Link to="/cards">minha coleo de cartas</Link></li>
          <li><Link to="/#faq">FAQ</Link></li>
        </ul>
      </nav>
      <nav aria-label="tipos de personalidade" className="footer-types">
        <h2>tipos de personalidade</h2>
        <ul>
          {Object.values(PERSONALITY_TYPES).map((type) => (
            <li key={type.code}>
              <Link to={`/types/${type.code.toLowerCase()}`}>{type.code}</Link>
            </li>
          ))}
        </ul>
      </nav>
      <nav aria-label="sobre o projeto">
        <h2>sobre o projeto</h2>
        <ul>
          <li><Link to="/about">sobre ns</Link></li>
          <li><Link to="/contact">contato</Link></li>
          <li><Link to="/feedback">deixe sua opinio</Link></li>
          <li><Link to="/privacy">privacidade</Link></li>
        </ul>
      </nav>
    </div>
    <p className="container footer-bottom">
      © {new Date().getFullYear()} TrueYouTeller. feito para se conhecer melhor, não para fins de diagnstico.
    </p>
  </footer>
);

export default Footer;
