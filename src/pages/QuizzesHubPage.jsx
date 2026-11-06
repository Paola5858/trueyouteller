import React from 'react';
import { Link } from 'react-router';
import { QUIZZES } from '../data/quizzes';
import { breadcrumbJsonLd, buildMeta, SITE_URL } from '../utils/seo';
import Breadcrumbs from '../components/Breadcrumbs';
import QuizCard from '../components/QuizCard';
import '../styles/Quiz.css';

const CRUMBS = [
  { name: 'início', path: '/' },
  { name: 'testes rpidos', path: '/quizzes' },
];

export const meta = () =>
  buildMeta({
    title: 'testes de personalidade para se divertir | TrueYouTeller',
    description:
      'faa testes rpidos sobre Hogwarts, Marvel, FRIENDS, Divertida Mente e elementos. resultados na hora para compartilhar.',
    path: '/quizzes',
    jsonLd: [
      {
        '@context': 'https://schema.org',
        '@type': 'ItemList',
        name: 'testes de personalidade para se divertir',
        itemListElement: QUIZZES.map((quiz, i) => ({
          '@type': 'ListItem',
          position: i + 1,
          name: quiz.title,
          url: `${SITE_URL}/quizzes/${quiz.slug}`,
        })),
      },
      breadcrumbJsonLd(CRUMBS),
    ],
  });

const QuizzesHubPage = () => (
  <div className="container section quizzes-hub">
    <Breadcrumbs items={CRUMBS} />
    <h1 className="page-title">testes rpidos para se divertir</h1>
    <p className="types-intro">
      testes curtos, resultados na hora e ideias para compartilhar com os amigos. quer ir alm? faa o{' '}
      <Link to="/test">teste completo de personalidade</Link>.
    </p>
    <div className="quiz-grid">
      {QUIZZES.map((quiz) => (
        <QuizCard key={quiz.slug} quiz={quiz} headingLevel="h2" />
      ))}
    </div>
  </div>
);

export default QuizzesHubPage;
