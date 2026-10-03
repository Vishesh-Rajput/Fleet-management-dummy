import { createApp } from './app';
import { config } from './config';
import { pool } from './db';

const app = createApp();
const server = app.listen(config.port, () => {
  console.log(`listening on ${config.port}`);
});

process.on('SIGTERM', () => {
  server.close(() => pool.end());
});