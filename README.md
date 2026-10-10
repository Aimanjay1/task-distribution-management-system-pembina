# Task Distribution Management System (PSM PEMBINA IIUM)

Replaces the Google Form and Sheet PSPB workflow with two web apps that share one database.

| Folder | What it is | Status |
| --- | --- | --- |
| `apps/admin` | Admin website: new members and internal management, for committee | Dashboard UI with sample data |
| `apps/pocket-pd` | Pocket PD: the official site for PDs | Not started |
| `packages/db` | Shared database schema (Supabase Postgres + Drizzle) | Waiting on team review |

## Running the admin website

```bash
npm install          # once, from the repo root
npm run dev:admin    # then open http://localhost:3000
```

## Where things live in `apps/admin`

- `app/page.tsx` is the dashboard page. Add `?gender=akhawat` to the URL to switch views.
- `app/_components/` holds the dashboard's building blocks (cards, bars, sidebar).
- `lib/types.ts` mirrors the agreed schema.
- `lib/sample-data.ts` is fake data with a fixed seed, so the numbers stay the same on every reload.
- `lib/dashboard.ts` computes every number on the dashboard. When the database is ready, only the data source changes; the rules stay.
