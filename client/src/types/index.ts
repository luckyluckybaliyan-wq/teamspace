export interface User {
  _id: string;
  name: string;
  email: string;
}

export type Role = 'admin' | 'member';

export interface Member {
  user: User;
  role: Role;
}

export interface Project {
  _id: string;
  name: string;
  description: string;
  owner: string;
  members: Member[];
}

export type TaskStatus = 'todo' | 'in-progress' | 'done';
export type Priority = 'low' | 'medium' | 'high';

export interface Task {
  _id: string;
  project: string;
  title: string;
  description: string;
  status: TaskStatus;
  priority: Priority;
}
