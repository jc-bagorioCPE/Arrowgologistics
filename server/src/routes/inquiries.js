import { Router } from 'express';
import { pool } from '../db.js';

const r = Router();
const clean = (v, max) => String(v ?? '').trim().slice(0, max);

r.post('/inquiries', async (req, res) => {
  const name = clean(req.body.name, 120);
  const email = clean(req.body.email, 160);
  const message = clean(req.body.message, 2000);
  const company = clean(req.body.company, 160) || null;
  const service = clean(req.body.service, 60) || null;
  const errors = {};
  if (!name) errors.name = 'Enter your name.';
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.email = 'Enter a valid email address.';
  if (message.length < 10) errors.message = 'Tell us a bit more (at least 10 characters).';
  if (Object.keys(errors).length) return res.status(400).json({ errors });
  await pool.query(
    'INSERT INTO inquiries (name, email, company, service, message) VALUES (?, ?, ?, ?, ?)',
    [name, email, company, service, message]
  );
  res.status(201).json({ ok: true });
});

export default r;
