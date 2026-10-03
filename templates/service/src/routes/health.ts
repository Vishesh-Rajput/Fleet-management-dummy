import { Router } from 'express';
import { checkDb } from '../db';

export const healthRouter = Router();

healthRouter.get('/health', async (_req, res) => {
  const dbUp = await checkDb();
  res.status(dbUp ? 200 : 503).json({ status: dbUp ? 'ok' : 'degraded', db: dbUp ? 'up' : 'down' });
});