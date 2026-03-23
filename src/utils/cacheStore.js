const store = new Map();
const DEFAULT_TTL_MS = 1000 * 60 * 5; // 5 minutes

const makeKey = (question) => question.trim().toLowerCase();

export const cacheStore = {
  get: (question) => {
    const key = makeKey(question);
    const entry = store.get(key);
    if (!entry) return null;
    if (Date.now() > entry.expiresAt) {
      store.delete(key);
      return null;
    }
    return entry.payload;
  },
  set: (question, payload, ttl = DEFAULT_TTL_MS) => {
    const key = makeKey(question);
    store.set(key, { payload, expiresAt: Date.now() + ttl });
  },
};
