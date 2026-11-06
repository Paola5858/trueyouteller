import React, { useEffect, useState } from 'react';
import { FaLink, FaShareNodes, FaWhatsapp } from 'react-icons/fa6';
import { copyText, nativeShare } from '../utils/share';
import { track } from '../utils/analytics';

// The link a creator sends to friends, with copy / WhatsApp / native share.
const ShareLinkBox = ({ url, text, title, kind }) => {
  const [status, setStatus] = useState('');
  const [canNativeShare, setCanNativeShare] = useState(false);
  useEffect(() => setCanNativeShare(typeof navigator.share === 'function'), []);

  const sent = (method) => track('social_invite', { kind, method });
  const copy = async () => {
    const ok = await copyText(url);
    setStatus(ok ? 'link copiado!' : 'não foi possvel copiar. selecione o link acima.');
    if (ok) sent('copy_link');
  };

  return (
    <div className="share-link-box">
      <input className="share-link-input" value={url} readOnly aria-label="link para compartilhar" onFocus={(e) => e.target.select()} />
      <div className="share-buttons">
        {canNativeShare && (
          <button
            type="button"
            className="btn btn-primary share-btn"
            onClick={async () => {
              await nativeShare({ title, text, url });
              sent('native');
            }}
          >
            <FaShareNodes aria-hidden="true" /> compartilhar
          </button>
        )}
        <a
          className="btn share-btn share-whatsapp"
          href={`https://wa.me/?text=${encodeURIComponent(`${text} ${url}`)}`}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => sent('whatsapp')}
        >
          <FaWhatsapp aria-hidden="true" /> WhatsApp
        </a>
        <button type="button" className="btn share-btn" onClick={copy}>
          <FaLink aria-hidden="true" /> copiar link
        </button>
      </div>
      <p className="share-status" role="status">{status}</p>
    </div>
  );
};

export default ShareLinkBox;
