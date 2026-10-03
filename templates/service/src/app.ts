import express from 'express';
import { healthRouter } from './routes/health';
import { errorHandler, notFound } from './middleware/errorHandler';

export function createApp() {
  const app = express();
  app.use(express.json());
  app.use(healthRouter);
  app.use(notFound);
  app.use(errorHandler);
  return app;
}