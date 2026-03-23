import { useCallback, useMemo, useRef, useState } from 'react';
import { askQuestion } from '../lib/api.js';

const buildEntry = (payload) => ({
  id: `${Date.now()}-${Math.round(Math.random() * 1e6)}`,
  timestamp: new Date().toISOString(),
  ...payload,
});

export const useAskLegalAi = () => {
  const [history, setHistory] = useState([]);
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState(null);
  const cacheRef = useRef(new Map());

  const ask = useCallback(async (question) => {
    const trimmed = question.trim();
    if (!trimmed) {
      setError('Merci de saisir une question.');
      return null;
    }

    const cacheKey = trimmed.toLowerCase();
    setStatus('loading');
    setError(null);

    if (cacheRef.current.has(cacheKey)) {
      const cachedPayload = cacheRef.current.get(cacheKey);
      const entry = buildEntry({ ...cachedPayload, question: trimmed, source: 'cache' });
      setHistory((prev) => [entry, ...prev].slice(0, 20));
      setStatus('cached');
      return entry;
    }

    try {
      const response = await askQuestion(trimmed);
      const payload = {
        question: trimmed,
        answer: response.answer,
        contextId: response.contextId || 'contexte-inconnu',
        source: response.source || 'live',
      };
      cacheRef.current.set(cacheKey, payload);
      const entry = buildEntry(payload);
      setHistory((prev) => [entry, ...prev].slice(0, 20));
      setStatus('live');
      return entry;
    } catch (err) {
      const isAbort = err.name === 'AbortError';
      setError(isAbort ? 'Temps dépassé (10s). Réessayez.' : err.message || 'Erreur réseau.');
      setStatus('error');
      return null;
    }
  }, []);

  const lastAnswer = useMemo(() => history[0] ?? null, [history]);

  return { ask, history, status, error, lastAnswer };
};
