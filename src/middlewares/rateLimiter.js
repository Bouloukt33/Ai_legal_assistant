import { logger } from '../utils/logger.js';

const buckets = new Map();
const WINDOW_MS = 60 * 1000;
const MAX_REQUESTS = 60;

export const rateLimiter = (req, res, next) => {
  const key = req.ip || req.headers['x-forwarded-for'] || 'global';
  const bucket = buckets.get(key) || { count: 0, resetsAt: Date.now() + WINDOW_MS };

  if (Date.now() > bucket.resetsAt) {
    bucket.count = 0;
    bucket.resetsAt = Date.now() + WINDOW_MS;
  }

  bucket.count += 1;
  buckets.set(key, bucket);

  if (bucket.count > MAX_REQUESTS) {
    logger.warn('rate-limit', { key, count: bucket.count });
    return res.status(429).json({ error: 'Rate limit exceeded. Try again shortly.' });
  }

  res.setHeader('X-RateLimit-Remaining', Math.max(0, MAX_REQUESTS - bucket.count));
  return next();
};
