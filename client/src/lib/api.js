const sanitizeBaseUrl = (value) => value.replace(/\/$/, '');
const DEFAULT_TIMEOUT = Number(import.meta.env.VITE_API_TIMEOUT || 10000);

const API_BASE_URL = sanitizeBaseUrl(import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000');

export const askQuestion = async (question) => {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(new DOMException('timeout', 'AbortError')), DEFAULT_TIMEOUT);

  try {
    const response = await fetch(`${API_BASE_URL}/ask`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ question }),
      signal: controller.signal,
    });

    if (!response.ok) {
      const errorBody = await response.json().catch(() => ({}));
      throw new Error(errorBody.error || 'Erreur serveur inattendue.');
    }

    return response.json();
  } finally {
    clearTimeout(timeoutId);
  }
};
