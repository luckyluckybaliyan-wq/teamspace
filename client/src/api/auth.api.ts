import api from './axios';
import { User } from '../types';

interface AuthResponse {
  token: string;
  user: User;
}

export const registerUser = (data: { name: string; email: string; password: string }) =>
  api.post<AuthResponse>('/auth/register', data).then((r) => r.data);

export const loginUser = (data: { email: string; password: string }) =>
  api.post<AuthResponse>('/auth/login', data).then((r) => r.data);

export const fetchMe = () => api.get<User>('/auth/me').then((r) => r.data);
