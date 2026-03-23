import { logger } from '../utils/logger.js';

// eslint-disable-next-line no-unused-vars
export const errorHandler = (err, req, res, next) => {
  logger.error('unhandled-error', { error: err.message, stack: err.stack });
  const status = err.status || 500;
  const safeMessage = status < 500 ? err.message : 'Unexpected server error';
  res.status(status).json({ error: safeMessage });
};
