import { cacheStore } from '../utils/cacheStore.js';
import { logger } from '../utils/logger.js';

export const cacheMiddleware = (req, res, next) => {
  if (req.method !== 'POST' || req.path !== '/ask') return next();
  const { question } = req.body || {};
  if (!question) return next();
  const cached = cacheStore.get(question);
  if (!cached) return next();
  logger.info('cache-hit', { questionSnippet: question.slice(0, 40) });
  return res.json({ source: 'cache', ...cached });
};
