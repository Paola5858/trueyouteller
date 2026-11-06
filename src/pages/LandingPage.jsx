import '../styles/LandingPage.css';
import { Link } from 'react-router';
import { FaPencilAlt, FaHeart, FaPaintBrush, FaLaughBeam, FaBolt } from 'react-icons/fa';
import { GiCrystalBall } from 'react-icons/gi';
import logo from '../images/trueyouteller-logo-removebg.webp';
import QuizCard from '../components/QuizCard';
import BadgeStrip from '../components/BadgeStrip';
import { QUIZZES } from '../data/quizzes';
import '../styles/Quiz.css';
import { buildMeta, faqJsonLd, organizationJsonLd, websiteJsonLd } from '../utils/seo';

const FAQS = [
  {
    question: 'o teste de personalidade  gratuito?',
    answer:
      'sim. o teste  grátis, não precisa criar conta e não tem contedo pago. no fim, voc recebe seu perfil completo, com tipo, pontos fortes e outras pistas sobre você.',
  },
  {
    question: 'quanto tempo leva?',
    answer:
      'cerca de 10 minutos. so 48 frases curtas para voc dizer o quanto cada uma combina com seu jeito.',
  },
  {
    question: 'este  um teste MBTI?',
    answer:
      'ele se inspira nas quatro dimenses do modelo MBTI e apresenta um entre 16 perfis. não  o instrumento oficial Myers-Briggs Type Indicator® nem substitui uma avaliao profissional.',
  },
  {
    question: 'o resultado  preciso?',
    answer:
      'a proposta  ajudar voc a refletir, não fazer diagnstico. responda pensando em como costuma agir, sem se preocupar com o que seria a resposta ideal.',
  },
  {
    question: 'o que aparece no resultado?',
    answer:
      'voc recebe seu tipo de personalidade, caractersticas que podem combinar com você, ideias sobre trabalho e relações, alm de sugestes de pessoas e personagens com perfil parecido.',
  },
];

export const meta = () =>
  buildMeta({
    title: 'teste de personalidade grátis: descubra seu perfil | TrueYouTeller',
    description:
      'faa um teste de personalidade grátis e descubra qual dos 16 perfis combina mais com você. sem cadastro, resultado na hora e cerca de 10 minutos.',
    path: '/',
    jsonLd: [websiteJsonLd, organizationJsonLd, faqJsonLd(FAQS)],
  });

const LandingPage = () => {
  return (
    <div className="landing-page">
      <header className="landing-header">
        <img
          src={logo}
          alt="bola de cristal do TrueYouTeller"
          className="crystal-ball-image"
          width="400"
          height="400"
          fetchPriority="high"
        />
        <h1>um teste leve para entender melhor o seu jeito</h1>
        <p className="subtitle">
          responda com calma e descubra qual dos 16 perfis mais combina com você. leva cerca de 10 minutos.
        </p>
        <Link to="/test" className="btn btn-primary bouncing">comear o teste grátis</Link>
      </header>

      <section className="section container how-it-works">
        <h2>como funciona</h2>
        <div className="steps-container">
          <div className="step">
            <div className="step-icon"><FaPencilAlt aria-hidden="true" /></div>
            <h3>1. responda no seu ritmo</h3>
            <p>leia 48 frases sobre como voc pensa, sente e age. não existe resposta certa.</p>
          </div>
          <div className="step">
            <div className="step-icon"><GiCrystalBall aria-hidden="true" /></div>
            <h3>2. veja seu perfil</h3>
            <p>ao terminar, voc recebe um tipo de personalidade e um animal que representa seu jeito.</p>
          </div>
          <div className="step">
            <div className="step-icon"><FaHeart aria-hidden="true" /></div>
            <h3>3. descubra novas pistas</h3>
            <p>explore seus pontos fortes, relações, ideias de carreira e perfis parecidos com o seu.</p>
          </div>
        </div>
      </section>

      <section className="section features-section">
        <div className="container">
          <h2>feito para ser leve e curioso</h2>
          <div className="features-container">
            <div className="feature-item">
              <div className="feature-icon"><FaPaintBrush aria-hidden="true" /></div>
              <h3>uma experincia descontrada</h3>
              <p>um teste com clima de brincadeira, sem cara de formulrio interminvel.</p>
            </div>
            <div className="feature-item">
              <div className="feature-icon"><FaLaughBeam aria-hidden="true" /></div>
              <h3>perguntas que fazem pensar</h3>
              <p>frases simples para voc refletir sobre seus hbitos e preferências.</p>
            </div>
            <div className="feature-item">
              <div className="feature-icon"><FaBolt aria-hidden="true" /></div>
              <h3>grátis e sem cadastro</h3>
              <p>seu resultado aparece assim que voc termina. sem conta e sem pegadinha.</p>
            </div>
          </div>
        </div>
      </section>

      <BadgeStrip />

      <section id="mini-games" className="section container mini-games">
        <h2>testes para se divertir</h2>
        <p>descubra sua casa de Hogwarts, um heri da Marvel, quem voc seria em FRIENDS e mais.</p>
        <div className="quiz-grid">
          {QUIZZES.slice(0, 3).map((quiz) => (
            <QuizCard key={quiz.slug} quiz={quiz} />
          ))}
        </div>
        <p className="mini-games-more">
          <Link to="/quizzes" className="btn">ver os {QUIZZES.length} testes ?</Link>
        </p>
      </section>

      <section id="faq" className="section container faq-section">
        <h2>dvidas frequentes</h2>
        <div className="faq-list">
          {FAQS.map(({ question, answer }) => (
            <details key={question} className="faq-item">
              <summary>{question}</summary>
              <p>{answer}</p>
            </details>
          ))}
        </div>
      </section>

      <section className="section container final-cta">
        <h2>quer comear a se conhecer melhor?</h2>
        <Link to="/test" className="btn btn-primary bouncing">vamos l</Link>
      </section>
    </div>
  );
};

export default LandingPage;
