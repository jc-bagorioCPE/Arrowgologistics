import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { pool } from './db.js';
import content from './routes/content.js';
import inquiries from './routes/inquiries.js';

const app = express();
app.use(cors({ origin: process.env.CLIENT_ORIGIN || 'http://localhost:5173' }));
app.use(express.json({ limit: '50kb' }));

app.get('/api/health', async (_req, res) => {
  try {
    await pool.query('SELECT 1');
    res.json({ ok: true, db: 'connected' });
  } catch (e) {
    res.status(503).json({ ok: false, db: e.code || 'unreachable' });
  }
});
app.use('/api', content);
app.use('/api', inquiries);

// Express 5 forwards errors from async route handlers here automatically.
app.use((err, _req, res, _next) => {
  console.error(err);
  res.status(500).json({ error: 'Something went wrong on our side. Please try again.' });
});

const port = Number(process.env.PORT || 5000);
app.listen(port, () => console.log(`Arrowgo API running on http://localhost:${port}`));
