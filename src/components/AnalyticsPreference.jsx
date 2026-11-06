import { useEffect, useState } from 'react';
import { getConsent, setConsent } from '../utils/analytics';

// Opt-out / opt-in switch for the privacy page.
const AnalyticsPreference = () => {
  const [consent, setConsentState] = useState(null);

  useEffect(() => setConsentState(getConsent()), []);

  const optedIn = consent === 'granted';
  const toggle = () => {
    const next = optedIn ? 'denied' : 'granted';
    setConsent(next);
    setConsentState(next);
  };

  return (
    <p className="analytics-preference" role="status">
      as mtricas esto{' '}
      <strong>{consent === null ? ' aguardando sua escolha' : optedIn ? ' ativadas' : ' desativadas'}</strong> neste navegador.{' '}
      <button type="button" className="btn" onClick={toggle}>
        {optedIn ? 'desativar mtricas' : 'aceitar mtricas'}
      </button>
    </p>
  );
};

export default AnalyticsPreference;
