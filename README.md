# Arrowgo Logistics Inc. homepage

Vite + React, Tailwind CSS, shadcn/ui components, Node.js + Express, MySQL (XAMPP).

## Run it

1. **Start MySQL** in the XAMPP Control Panel (Apache is not needed).
2. **Import the database**: open http://localhost/phpmyadmin, go to the *Import* tab, choose `server/db/arrowgo.sql`, click *Go*.
   This creates the `arrowgo` database with all tables and the seed data.
3. **Install dependencies** (from this folder): `npm install` then `npm run install:all`
4. **Configure** (only if your XAMPP MySQL has a password): edit `server/.env`. Defaults are user `root`, empty password, port 3306.
5. **Start**: `npm run dev`, then open http://localhost:5173

The API runs on http://localhost:5000. Check it at `/api/health`.

## Structure

```
server/
  db/arrowgo.sql        schema + seed data (import into MySQL)
  src/index.js          Express app
  src/db.js             mysql2 connection pool
  src/routes/           GET /api/services, /locations, /categories, /news; POST /api/inquiries
client/
  src/components/       one file per page section
  src/components/ui/    shadcn/ui components (button, badge, card, tabs, input, textarea, label)
  src/data/             map paths, globe geometry, service scene art (static assets, not in the DB)
  public/               logo and news photos
```

## Editing content

Services, locations (and which services each offers), categories and news all live in MySQL.
Change them in phpMyAdmin and reload the page. Inquiries from the contact form are saved to the `inquiries` table.
News photos are files in `client/public/news/`; the `news.image_path` column points to them.

## Adding more shadcn components

`components.json` is set up, so `npx shadcn@latest add dialog` (from `client/`) works.
