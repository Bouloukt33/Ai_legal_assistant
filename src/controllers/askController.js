import { askLegalAssistant } from '../services/ragService.js';
import { cacheStore } from '../utils/cacheStore.js';
import { logger } from '../utils/logger.js';

export const askController = async (req, res, next) => {
  try {
    const { question } = req.body || {};
    if (!question) {
      return res.status(400).json({ error: 'La question est requise.' });
    }

    const result = await askLegalAssistant(question);
    cacheStore.set(question, result);
    logger.info('ask-success', { contextId: result.contextId });

    return res.json({ source: 'live', ...result });
  } catch (error) {
    return next(error);
  }
};
