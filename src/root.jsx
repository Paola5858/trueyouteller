import { Links, Meta, Outlet, Scripts, ScrollRestoration, isRouteErrorResponse, Link } from 'react-router';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import BadgeToast from './components/BadgeToast';
import AnalyticsNotice from './components/AnalyticsNotice';
import { themeInitScript } from './components/ThemeToggle';
import './styles/App.css';

export const links = () => [
  { rel: 'icon', href: '/favicon.ico', sizes: '48x48' },
  { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicon-32x32.png' },
  { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/favicon-16x16.png' },
  { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png' },
  { rel: 'manifest', href: '/site.webmanifest' },
  { rel: 'preload', href: '/fonts/nunito-latin.woff2', as: 'font', type: 'font/woff2', crossOrigin: 'anonymous' },
  { rel: 'preload', href: '/fonts/chewy-latin.woff2', as: 'font', type: 'font/woff2', crossOrigin: 'anonymous' },
];

export function Layout({ children }) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="theme-color" content="#5B2C6F" />
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
        <Meta />
        <Links />
      </head>
      <body>
        <div className="App">
          <Navbar />
          <main>{children}</main>
          <Footer />
        </div>
        <BadgeToast />
        <AnalyticsNotice />
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}

export function HydrateFallback() {
  return <div className="container section page-loading" aria-busy="true">carregando</div>;
}

export function ErrorBoundary({ error }) {
  const notFound = isRouteErrorResponse(error) && error.status === 404;
  return (
    <div className="container section error-page">
      <title>{notFound ? 'pgina não encontrada | TrueYouTeller' : 'algo deu errado | TrueYouTeller'}</title>
      <meta name="robots" content="noindex" />
      <h1>{notFound ? 'opa! esta pgina se perdeu 🔮' : 'opa! algo deu errado'}</h1>
      <p>
        {notFound
          ? 'a bola de cristal não encontrou o que voc procurava.'
          : 'atualize a pgina ou volte para o início.'}
      </p>
      <Link to="/" className="btn btn-primary">voltar ao início</Link>
    </div>
  );
}
