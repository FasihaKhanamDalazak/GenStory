# GenStory Deployment Guide

This guide shows how to deploy the `backend` and `frontend` of your GenStory project.

## 1. Local setup & validation

### Backend
1. Open a terminal in `c:\GenStory\backend`.
2. Create and activate a Python virtual environment:
   - PowerShell:
     ```powershell
     python -m venv .venv
     .\.venv\Scripts\Activate.ps1
     ```
3. Install backend dependencies:
   ```powershell
   pip install -r requirements.txt
   ```
4. Copy `backend/.env.example` to `backend/.env` and fill in values.
5. Start the backend server:
   ```powershell
   uvicorn main:app --host 0.0.0.0 --port 8000
   ```
6. Confirm the API is running by opening:
   - `http://localhost:8000/docs`

### Frontend
1. Open a terminal in `c:\GenStory\frontend`.
2. Install frontend dependencies:
   ```powershell
   npm install
   ```
3. Copy `frontend/.env.example` to `frontend/.env` and update `VITE_API_BASE_URL` if needed.
4. Start the frontend dev server:
   ```powershell
   npm run dev
   ```
5. Confirm the app is running by opening:
   - `http://localhost:5173`

## 2. Deployment overview

Your project is split into two parts:
- `backend` is a FastAPI app
- `frontend` is a Vite + React app

You can deploy them separately, which is the simplest approach.

## 3. Recommended deployment flow

### Backend deployment
Use a service like Render, Railway, Fly.io, or Heroku. The backend must:
- install Python dependencies
- use `uvicorn` to run `main:app`
- set required environment variables
- optionally use PostgreSQL for a production database

#### Backend deploy settings
- Build command: `pip install -r requirements.txt`
- Start command: `uvicorn main:app --host 0.0.0.0 --port $PORT`
- Environment variables:
  - `DATABASE_URL` (recommended production value: `postgresql://user:pass@host:port/dbname`)
  - `GOOGLE_API_KEY`
  - `ALLOWED_ORIGINS` (comma-separated, e.g. `https://yourfrontend.com`)
  - `API_PREFIX=/api`

> If you use SQLite in production, the file will be stored inside the deployed app container and may not persist after redeploys. For a stable deployment, use PostgreSQL.

### Frontend deployment
Use Vercel, Netlify, or another static host. The frontend build uses `VITE_API_BASE_URL`.

#### Frontend deploy settings
- Build command: `npm run build`
- Output directory: `dist`
- Environment variables:
  - `VITE_API_BASE_URL=https://your-backend-domain.com/api`

## 4. Example environment files

### `backend/.env.example`
```ini
DATABASE_URL=sqlite:///./database.db
API_PREFIX=/api
DEBUG=False
ALLOWED_ORIGINS=http://localhost:3000,http://localhost:5173
GOOGLE_API_KEY=your-google-api-key
```

### `frontend/.env.example`
```ini
VITE_API_BASE_URL=http://localhost:8000/api
VITE_DEBUG=true
```

## 5. Common deployment hosts

### Option A: Render
1. Create a Render account.
2. Connect your GitHub repository.
3. Create a new Web Service for the backend.
4. Set the build and start commands as above.
5. Add environment variables.
6. Deploy the backend.

Then create a new Static Site for the frontend:
1. Connect the same repo.
2. Set build command `npm run build`.
3. Set publish directory `dist`.
4. Add `VITE_API_BASE_URL`.

### Option B: Vercel + externally hosted backend
1. Deploy frontend on Vercel.
2. Set `VITE_API_BASE_URL` to the backend URL.
3. Deploy backend on Render, Railway, or Heroku.

## 6. Next step
Once your backend is live, update the frontend env to point at that backend URL and redeploy the frontend.

If you want, I can now walk you through **exactly one host** step by step (Render, Railway, or Vercel).