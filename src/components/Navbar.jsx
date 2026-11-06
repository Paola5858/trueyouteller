import { useState } from 'react';
import { NavLink } from 'react-router';
import { FaBars, FaTimes } from 'react-icons/fa';
import ThemeToggle from './ThemeToggle';
import '../styles/Navbar.css';
import logo from '../images/trueyouteller.webp';
import logoDark from '../images/trueyouteller-dark.webp';

const Navbar = () => {
  const [click, setClick] = useState(false);

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

  return (
    <nav className="navbar" aria-label="menu principal">
      <div className="navbar-container container">
        <NavLink to="/" className="navbar-logo" onClick={closeMobileMenu}>
          <img src={logo} alt="início do TrueYouTeller" className="navbar-brand-logo logo-light" width="150" height="150" />
          <img src={logoDark} alt="" className="navbar-brand-logo logo-dark" width="150" height="150" />
        </NavLink>
        <button
          type="button"
          className="menu-icon"
          onClick={handleClick}
          aria-label={click ? 'fechar menu' : 'abrir menu'}
          aria-expanded={click}
          aria-controls="nav-menu"
        >
          {click ? <FaTimes /> : <FaBars />}
        </button>
        <div className="navbar-right">
          <ul id="nav-menu" className={click ? 'nav-menu active' : 'nav-menu'}>
            <li className="nav-item">
              <NavLink to="/types" className="nav-links" onClick={closeMobileMenu}>
                tipos
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/quizzes" className="nav-links" onClick={closeMobileMenu}>
                testes rpidos
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/compatibility" className="nav-links" onClick={closeMobileMenu}>
                compatibilidade
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/play" className="nav-links" onClick={closeMobileMenu}>
                jogar
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/about" className="nav-links" onClick={closeMobileMenu}>
                sobre ns
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/contact" className="nav-links" onClick={closeMobileMenu}>
                contato
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/test" className="nav-links nav-cta" onClick={closeMobileMenu}>
                fazer o teste
              </NavLink>
            </li>
          </ul>
          <ThemeToggle />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
