# API Reference

Base URL: `http://localhost:5000/api`. Protected routes need the header `Authorization: Bearer <token>`.

## Auth

| Method | Endpoint | Body | Description |
|---|---|---|---|
| POST | `/auth/register` | `name, email, password` | Create account, returns `token` and `user` |
| POST | `/auth/login` | `email, password` | Login, returns `token` and `user` |
| GET | `/auth/me` | - | Current user |

## Projects

| Method | Endpoint | Body | Description |
|---|---|---|---|
| GET | `/projects` | - | Projects you belong to |
| POST | `/projects` | `name, description?` | Create a project (you become admin) |
| GET | `/projects/:id` | - | Project details with members |
| POST | `/projects/:id/members` | `email, role?` | Add a member (admin only) |
| DELETE | `/projects/:id` | - | Delete project and its tasks (admin only) |

## Tasks

| Method | Endpoint | Body | Description |
|---|---|---|---|
| GET | `/projects/:projectId/tasks` | - | List tasks of a project |
| POST | `/projects/:projectId/tasks` | `title, priority?, status?, ...` | Create a task |
| PATCH | `/tasks/:id` | any task field | Update a task (e.g. move status) |
| DELETE | `/tasks/:id` | - | Delete a task |

## Socket.IO events

Connect with `auth: { token }`, then emit `project:join` with the project id.

| Event | Direction | Payload |
|---|---|---|
| `project:join` / `project:leave` | client to server | `projectId` |
| `task:created` | server to client | task |
| `task:updated` | server to client | task |
| `task:deleted` | server to client | `{ _id }` |
