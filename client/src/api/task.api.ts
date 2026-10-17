import api from './axios';
import { Priority, Task, TaskStatus } from '../types';

export const getTasks = (projectId: string) =>
  api.get<Task[]>(`/projects/${projectId}/tasks`).then((r) => r.data);

export const createTask = (projectId: string, data: { title: string; priority?: Priority }) =>
  api.post<Task>(`/projects/${projectId}/tasks`, data).then((r) => r.data);

export const updateTaskStatus = (id: string, status: TaskStatus) =>
  api.patch<Task>(`/tasks/${id}`, { status }).then((r) => r.data);

export const deleteTask = (id: string) => api.delete(`/tasks/${id}`);
