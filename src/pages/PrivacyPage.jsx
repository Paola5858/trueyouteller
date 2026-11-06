import { Link } from 'react-router';
import { buildMeta } from '../utils/seo';
import AnalyticsPreference from '../components/AnalyticsPreference';
import '../styles/PrivacyPage.css';

export const meta = () =>
  buildMeta({
    title: 'privacidade | TrueYouTeller',
    description: 'entenda quais dados o TrueYouTeller guarda e como suas escolhas de privacidade funcionam.',
    path: '/privacy',
  });

const LAST_UPDATED = '1 de outubro de 2026';

const PrivacyPage = () => (
  <div className="privacy-page container section">
    <h1 className="page-title">privacidade</h1>
    <p className="privacy-updated">ltima atualizao: {LAST_UPDATED}</p>

    <h2>o que guardamos</h2>
    <p>quando voc termina o teste de personalidade, guardamos:</p>
    <ul>
      <li>o nome ou apelido informado no início,</li>
      <li>suas respostas às perguntas,</li>
      <li>o tipo de personalidade calculado, e</li>
      <li>o horrio em que voc terminou.</li>
    </ul>
    <p>
      não pedimos e-mail, telefone ou dados de conta para fazer o teste. voc pode usar um apelido; tambm d para
      gerar um nome aleatrio.
    </p>

    <h2>para que usamos esses dados</h2>
    <p>
      os resultados so armazenados para manter o servio e ajudar a entender o funcionamento do teste. não vendemos
      seus dados nem os usamos para publicidade.
    </p>

    <h2>formulrios de contato e opinio</h2>
    <p>
      as mensagens enviadas pelos formulrios de <Link to="/contact">contato</Link> e{' '}
      <Link to="/feedback">opinio</Link> chegam à equipe por e-mail, junto com o nome e o endereo informados, para
      que possamos responder.
    </p>

    <h2>mtricas de uso</h2>
    <p>
      somente se voc aceitar, usamos o Google Analytics 4 (por meio do Firebase) para entender como o site  usado,
      como as pginas visitadas e quantas pessoas terminam um teste. o servio pode usar cookies e receber seu endereo
      IP para estimar sua localizao. não enviamos seu nome nem suas respostas ao Google Analytics.
    </p>
    <AnalyticsPreference />

    <h2>jogos com amigos</h2>
    <p>
      ao criar um link de "como seus amigos veem você", "adivinhe meu tipo", casal, amizade ou sala em grupo,
      guardamos o nome e o tipo que voc escolheu compartilhar, alm das respostas enviadas pelo link. qualquer pessoa
      com o link pode ver esse contedo, ento compartilhe apenas com quem voc conhece. as avaliaes sobre voc não
      mostram o nome de quem respondeu. os links não podem ser pesquisados nem listados. para pedir a excluso,{' '}
      <Link to="/contact">fale com a gente</Link> e envie o link.
    </p>

    <h2>dados salvos no seu aparelho</h2>
    <p>
      para que o site funcione sem conta, seu navegador guarda o teste em andamento, seu resultado mais recente,
      distintivos, cartas, links de jogos, tema visual e escolha sobre mtricas. limpar os dados do navegador remove
      essas informaes.
    </p>

    <h2>onde os dados ficam</h2>
    <p>
      resultados e dados dos jogos ficam no Google Firebase (Cloud Firestore). o site  hospedado no Firebase Hosting,
      que pode manter registros tcnicos, como endereos IP, por segurana.
    </p>

    <h2>suas escolhas</h2>
    <p>
      para pedir a excluso do resultado do teste, <Link to="/contact">fale com a gente</Link> e informe o nome usado
      e uma data aproximada. voc tambm pode mudar sua escolha sobre mtricas aqui ou na faixa de privacidade.
    </p>

    <h2>não  uma avaliao clnica</h2>
    <p>
      o TrueYouTeller  uma experincia de entretenimento e reflexo. não  uma avaliao psicolgica ou mdica.
    </p>
  </div>
);

export default PrivacyPage;
