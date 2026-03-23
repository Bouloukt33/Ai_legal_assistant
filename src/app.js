import 'dotenv/config';
import express from 'express';
import cors from 'cors';

import { requestTimeout } from './middlewares/requestTimeout.js';
import { rateLimiter } from './middlewares/rateLimiter.js';
import { cacheMiddleware } from './middlewares/cacheMiddleware.js';
import { errorHandler } from './middlewares/errorHandler.js';
import { askController } from './controllers/askController.js';
import { logger } from './utils/logger.js';

const app = express();

app.use(cors({
  origin: (process.env.CORS_ORIGINS || '*').split(',').map((origin) => origin.trim()),
  credentials: true,
}));
app.use(express.json({ limit: '1mb' }));
app.use(requestTimeout());
app.use(rateLimiter);
app.use((req, res, next) => {
  logger.info('request-received', { method: req.method, path: req.path });
  next();
});
app.use(cacheMiddleware);

app.post('/ask', askController);

app.use((req, res) => res.status(404).json({ error: 'Route not found' }));

app.use(errorHandler);

export default app;
