# Fortix_Project

Quick start — run the backend and frontend for local development

Prerequisites:
- Node.js (16+ recommended)

Backend (API)

1. Open a terminal and go to the backend folder:

	```bash
	cd fortixController
	```

2. Install dependencies and start the server (it uses the `.env` file for MongoDB URI):

	```bash
	npm install
	npm run start
	```

The backend listens on `http://localhost:4444` by default and exposes routes under `/api` (for example `/api/user`).

Frontend (Vite + React)

1. In another terminal, go to the frontend folder:

	```bash
	cd fortixWeb
	```

2. Install dependencies and start the dev server:

	```bash
	npm install
	npm run dev
	```

The frontend dev server uses a Vite proxy that forwards `/api` requests to `http://localhost:4444`, so API calls in the app can use relative paths like `/api/user/login`.

Testing the API quickly (curl examples)

Register a new user:

```bash
curl -X POST http://localhost:4444/api/user/register \
  -H 'Content-Type: application/json' \
  -d '{"name":"TestUser","email":"test@example.com","password":"testpass"}'
```

Login with the user:

```bash
curl -X POST http://localhost:4444/api/user/login \
  -H 'Content-Type: application/json' \
  -d '{"email":"test@example.com","password":"testpass"}'
```

Notes:
- The backend `.env` file currently contains a MongoDB Atlas connection string. Keep secrets out of public repositories.
- If you see `npm audit` findings, you can run `npm audit fix` to attempt to resolve them.

If you'd like, I can:
- Run through the app flows (login/register) and fix any frontend issues.
- Hash existing plaintext passwords in the DB (recommended) or add a migration to re-hash them.

The team that finds solutions where others see “not found.”
