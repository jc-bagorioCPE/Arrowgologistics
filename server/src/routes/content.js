import { Router } from 'express';
import { pool } from '../db.js';

const r = Router();
const by = (rows, key) => rows.reduce((m, x) => ((m[x[key]] ||= []).push(x), m), {});

r.get('/categories', async (_req, res) => {
  const [rows] = await pool.query('SELECT name FROM categories ORDER BY sort_order');
  res.json(rows.map((x) => x.name));
});

r.get('/services', async (_req, res) => {
  const [services] = await pool.query('SELECT * FROM services ORDER BY sort_order');
  const [inc] = await pool.query('SELECT service_id, text FROM service_inclusions ORDER BY sort_order');
  const [facts] = await pool.query('SELECT service_id, value, label FROM service_facts ORDER BY sort_order');
  const [cats] = await pool.query(
    'SELECT sc.service_id, c.name FROM service_categories sc JOIN categories c ON c.id = sc.category_id ORDER BY c.sort_order'
  );
  const I = by(inc, 'service_id'), F = by(facts, 'service_id'), C = by(cats, 'service_id');
  res.json(
    services.map((s) => ({
      id: s.id,
      name: s.name,
      title: s.title,
      description: s.description,
      icon: s.icon_paths,
      inclusions: (I[s.id] || []).map((x) => x.text),
      facts: (F[s.id] || []).map((x) => ({ value: x.value, label: x.label })),
      categories: (C[s.id] || []).map((x) => x.name),
    }))
  );
});

r.get('/locations', async (_req, res) => {
  const [locs] = await pool.query('SELECT * FROM locations ORDER BY id');
  const [cats] = await pool.query(
    'SELECT lc.location_id, c.name FROM location_categories lc JOIN categories c ON c.id = lc.category_id ORDER BY c.sort_order'
  );
  const C = by(cats, 'location_id');
  res.json(
    locs.map((l) => ({
      id: l.id,
      name: l.name,
      group: l.region_group,
      region: l.region,
      type: l.type,
      address: l.address,
      x: Number(l.map_x),
      y: Number(l.map_y),
      lat: Number(l.lat),
      lng: Number(l.lng),
      services: (C[l.id] || []).map((x) => x.name),
    }))
  );
});

r.get('/news', async (_req, res) => {
  const [rows] = await pool.query(
    "SELECT id, title, image_path AS image, image_alt AS alt, DATE_FORMAT(published_at,'%Y-%m-%d') AS date FROM news ORDER BY published_at DESC"
  );
  res.json(rows);
});

export default r;
