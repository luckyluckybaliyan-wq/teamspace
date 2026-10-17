# TeamSpace

A real-time project collaboration platform (mini Trello) built with **React + TypeScript** on the frontend and **Node.js + Express + TypeScript + MongoDB** on the backend.

## Features

- JWT authentication (register, login, protected routes)
- Projects with Admin / Member roles and invite-by-email
- Kanban board with drag-and-drop (To Do, In Progress, Done)
- Real-time board updates across users with Socket.IO
- Request validation with Zod, centralized error handling
- Dark mode (follows system theme)
- Docker support and GitHub Actions CI

## Tech stack

| Layer | Technology |
|---|---|
| Frontend | React 18, TypeScript, Vite, React Router, Axios, @hello-pangea/dnd |
| Backend | Node.js, Express, TypeScript, Socket.IO |
| Database | MongoDB + Mongoose |
| Auth / Validation | JWT, bcryptjs, Zod |
| DevOps | Docker, docker-compose, GitHub Actions |

## Project structure

```
teamspace/
├── client/   # React + TypeScript frontend
├── server/   # Express + TypeScript backend
├── docs/     # screenshots and API docs
└── docker-compose.yml
```

## Getting started

**Prerequisites:** Node.js 18+, and MongoDB running locally (or use the Docker option below).

### 1. Backend

```bash
cd server
cp .env.example .env      # on Windows: copy .env.example .env
npm install
npm run dev
```

Runs on http://localhost:5000

### 2. Frontend

```bash
cd client
cp .env.example .env
npm install
npm run dev
```

Runs on http://localhost:5173

### Docker (MongoDB + API)

```bash
docker compose up --build
```

## Scripts

| Where | Command | What it does |
|---|---|---|
| server | `npm run dev` | Start the API with hot reload |
| server | `npm run build && npm start` | Compile and run in production |
| client | `npm run dev` | Start the Vite dev server |
| client | `npm run build` | Type-check and build for production |

See [docs/api-docs.md](docs/api-docs.md) for the API reference.

## Roadmap

- [ ] Live chat per project
- [ ] Activity log and notifications
- [ ] Dashboard charts (tasks per status, overdue tasks)
- [ ] Task details (assignee, due date, comments)
- [ ] Refresh tokens
- [ ] Unit and integration tests (Jest + Supertest)
- [ ] Deployment (Vercel + Render)

## Screenshots

Add screenshots to `docs/screenshots/` and link them here.

## License

MIT
