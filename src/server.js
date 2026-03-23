import app from './app.js';
import { logger } from './utils/logger.js';

const PORT = process.env.PORT || 3000;
const server = app.listen(PORT, () => {
  logger.info('server-started', { port: PORT, env: process.env.NODE_ENV || 'dev' });
});

const gracefulShutdown = (signal) => {
  logger.info('server-shutdown', { signal });
  server.close(() => process.exit(0));
};

['SIGTERM', 'SIGINT'].forEach((signal) => {
  process.on(signal, () => gracefulShutdown(signal));
});
