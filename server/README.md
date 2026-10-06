# CareFlow API & MongoDB Setup

CareFlow uses a React/Vite frontend, an Express API, and MongoDB. The API stores hospital, staff, patient, bed, prediction, and alert records. Forecasts are generated from saved synthetic admissions history; they are operational estimates for an academic demonstration, not clinical guidance.

## Requirements

- Node.js 18 or later
- MongoDB Community Server installed locally, or a MongoDB connection string

## Start the API

If Windows blocks the MongoDB service, start the installed database directly from the project root. Its persistent files will be stored under the ignored `.data` folder:

```powershell
powershell -ExecutionPolicy Bypass -File .\server\start-database.ps1
```
1. In `server`, copy `.env.example` to `.env` and set a unique `JWT_SECRET`. Set `MONGO_URI` to your MongoDB connection string.
2. Install and start the API:

   ```powershell
   cd server
   npm install
   npm run dev
   ```

   The API listens on port 5000. Check `http://localhost:5000/api/health` for API and database status.

## Start the frontend

In a second terminal:

```powershell
cd client
npm install
npm run dev
```

Open `http://localhost:3000`. Vite proxies `/api` requests to the server on port 5000.

## Load sample records

Sign in to the app and use **Load Demo Data** in the dashboard toolbar, or send `POST http://localhost:5000/api/seed` while the API runs outside production. This creates synthetic operational records and a demo administrator:

- Email: `admin@careflow.com`
- Password: `admin12345`

The seed route is disabled when `NODE_ENV=production`. Change the demo password before using any non-local deployment.

## Main API routes

- `POST /api/auth/register`, `POST /api/auth/login`, `GET /api/auth/me`
- `GET /api/hospitals/summary`
- `GET/POST /api/patients`, `PATCH /api/patients/:id`
- `GET/POST /api/beds`, `PATCH /api/beds/:id`
- `GET/POST /api/staff`, `PATCH /api/staff/:id`
- `POST /api/predictions/forecast`, `POST /api/simulation`
- `GET /api/alerts`, `PATCH /api/alerts/:id/resolve`
- `GET /api/analytics`



