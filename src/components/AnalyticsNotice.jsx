import { useEffect, useState } from 'react';
import { Link } from 'react-router';
import { getConsent, setConsent, startAnalytics } from '../utils/analytics';

// aviso de privacidade: analytics roda por padrão, a pessoa pode recusar aqui
const AnalyticsNotice = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(getConsent() === null);
    const start = () => startAnalytics();
    if ('requestIdleCallback' in window) window.requestIdleCallback(start, { timeout: 4000 });
    else setTimeout(start, 2000);
  }, []);

  if (!visible) return null;

  const choose = (value) => {
    setConsent(value);
    setVisible(false);
  };

  return (
    <div className="analytics-notice" role="region" aria-label="preferências de privacidade">
      <p>
        podemos usar o Google Analytics para entender o que funciona e melhorar o site. não vendemos seus dados.{' '}
        <Link to="/privacy">leia nossa política de privacidade</Link>
      </p>
      <div className="analytics-notice-buttons">
        <button type="button" className="btn btn-primary" onClick={() => choose('granted')}>
          aceitar
        </button>
        <button type="button" className="btn" onClick={() => choose('denied')}>
          agora não
        </button>
      </div>
    </div>
  );
};

export default AnalyticsNotice;
