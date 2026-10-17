import api from './axios';
import { Project } from '../types';

export const getProjects = () => api.get<Project[]>('/projects').then((r) => r.data);

export const getProject = (id: string) => api.get<Project>(`/projects/${id}`).then((r) => r.data);

export const createProject = (data: { name: string; description?: string }) =>
  api.post<Project>('/projects', data).then((r) => r.data);

export const addMember = (id: string, email: string) =>
  api.post<Project>(`/projects/${id}/members`, { email }).then((r) => r.data);

export const deleteProject = (id: string) => api.delete(`/projects/${id}`);
