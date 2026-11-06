import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { PERSONALITY_TYPES } from '../data/personalityTypes';
import { loadLastResult, setPendingJoin } from '../utils/storage';

// Join a room or duo with your saved result, a type you already know, or by taking the test first.
const JoinPanel = ({ label, returnPath, onJoin, busy }) => {
  const navigate = useNavigate();
  const [last, setLast] = useState(undefined);
  const [name, setName] = useState('');
  const [manualType, setManualType] = useState('');
  const [manual, setManual] = useState(false);

  useEffect(() => {
    const result = loadLastResult();
    setLast(result);
    if (result?.name) setName(result.name);
  }, []);

  if (last === undefined) return null;

  const type = manual ? manualType : last?.type;
  const canJoin = name.trim() && type;

  const takeTest = () => {
    setPendingJoin({ path: returnPath, label });
    navigate('/test');
  };

  return (
    <form
      className="join-panel"
      onSubmit={(e) => {
        e.preventDefault();
        if (canJoin) onJoin({ name: name.trim().slice(0, 30), type });
      }}
    >
      <label htmlFor="join-name">seu nome</label>
      <input id="join-name" value={name} maxLength={30} onChange={(e) => setName(e.target.value)} placeholder="como podemos chamar você?" />

      {last?.type && !manual ? (
        <p className="join-type">
          entrando como <strong>{last.type}</strong> ({PERSONALITY_TYPES[last.type].name}), do seu ltimo teste.{' '}
          <button type="button" className="link-button" onClick={() => setManual(true)}>
            escolher outro tipo
          </button>
        </p>
      ) : manual ? (
        <>
          <label htmlFor="join-type">seu tipo</label>
          <select id="join-type" value={manualType} onChange={(e) => setManualType(e.target.value)}>
            <option value="">escolha seu tipo</option>
            {Object.keys(PERSONALITY_TYPES).map((code) => (
              <option key={code} value={code}>
                {code}  {PERSONALITY_TYPES[code].name}
              </option>
            ))}
          </select>
        </>
      ) : (
        <div className="join-options">
          <p>para entrar, precisamos saber seu tipo de personalidade.</p>
          <button type="button" className="btn btn-primary" onClick={takeTest}>
            fazer o teste grátis (10 min)
          </button>
          <button type="button" className="btn" onClick={() => setManual(true)}>
            j sei meu tipo
          </button>
        </div>
      )}

      {(last?.type || manual) && (
        <button type="submit" className="btn btn-primary" disabled={!canJoin || busy}>
          {busy ? 'entrando' : `entrar: ${label}`}
        </button>
      )}
    </form>
  );
};

export default JoinPanel;
