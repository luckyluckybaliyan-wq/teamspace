import { FormEvent, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { addMember, getProject } from '../api/project.api';
import { createTask, deleteTask, getTasks, updateTaskStatus } from '../api/task.api';
import Board from '../components/board/Board';
import { useAuth } from '../context/AuthContext';
import { useProjectSocket } from '../hooks/useProjectSocket';
import { Priority, Project, Task, TaskStatus } from '../types';

export default function ProjectBoard() {
  const { id } = useParams<{ id: string }>();
  const { user } = useAuth();
  const [project, setProject] = useState<Project | null>(null);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [title, setTitle] = useState('');
  const [priority, setPriority] = useState<Priority>('medium');
  const [memberEmail, setMemberEmail] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (!id) return;
    getProject(id).then(setProject).catch(console.error);
    getTasks(id).then(setTasks).catch(console.error);
  }, [id]);

  // Real-time updates from other users (deduplicated by task id)
  useProjectSocket(id, {
    onCreated: (task) => setTasks((prev) => (prev.some((t) => t._id === task._id) ? prev : [...prev, task])),
    onUpdated: (task) => setTasks((prev) => prev.map((t) => (t._id === task._id ? task : t))),
    onDeleted: ({ _id }) => setTasks((prev) => prev.filter((t) => t._id !== _id)),
  });

  const isAdmin = project?.members.some((m) => m.user._id === user?._id && m.role === 'admin');

  const handleAddTask = async (e: FormEvent) => {
    e.preventDefault();
    if (!id) return;
    const task = await createTask(id, { title, priority });
    setTasks((prev) => (prev.some((t) => t._id === task._id) ? prev : [...prev, task]));
    setTitle('');
  };

  const handleMove = async (taskId: string, status: TaskStatus) => {
    const previous = tasks;
    setTasks((prev) => prev.map((t) => (t._id === taskId ? { ...t, status } : t))); // optimistic
    try {
      await updateTaskStatus(taskId, status);
    } catch {
      setTasks(previous);
    }
  };

  const handleDelete = async (taskId: string) => {
    await deleteTask(taskId);
    setTasks((prev) => prev.filter((t) => t._id !== taskId));
  };

  const handleAddMember = async (e: FormEvent) => {
    e.preventDefault();
    if (!id) return;
    try {
      setProject(await addMember(id, memberEmail));
      setMemberEmail('');
      setMessage('Member added');
    } catch (err: any) {
      setMessage(err.response?.data?.message || 'Could not add member');
    }
  };

  if (!project) return <p className="center">Loading...</p>;

  return (
    <div className="page">
      <h2>{project.name}</h2>
      <p className="muted">
        Members: {project.members.map((m) => `${m.user.name} (${m.role})`).join(', ')}
      </p>

      <form className="inline-form" onSubmit={handleAddTask}>
        <input placeholder="New task title" value={title} onChange={(e) => setTitle(e.target.value)} required />
        <select value={priority} onChange={(e) => setPriority(e.target.value as Priority)}>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
        <button type="submit">Add task</button>
      </form>

      {isAdmin && (
        <form className="inline-form" onSubmit={handleAddMember}>
          <input type="email" placeholder="Add member by email" value={memberEmail} onChange={(e) => setMemberEmail(e.target.value)} required />
          <button type="submit">Invite</button>
          {message && <span className="muted">{message}</span>}
        </form>
      )}

      <Board tasks={tasks} onMove={handleMove} onDelete={handleDelete} />
    </div>
  );
}
