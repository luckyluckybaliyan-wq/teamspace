import { Task } from '../models/Task';
import { requireMember } from '../services/access';
import { emitToProject } from '../sockets/socket';
import { ApiError } from '../utils/ApiError';
import { asyncHandler } from '../utils/asyncHandler';

export const listTasks = asyncHandler(async (req, res) => {
  await requireMember(req.params.projectId, req.userId!);
  const tasks = await Task.find({ project: req.params.projectId }).sort({ createdAt: 1 });
  res.json(tasks);
});

export const createTask = asyncHandler(async (req, res) => {
  await requireMember(req.params.projectId, req.userId!);
  const task = await Task.create({
    ...req.body,
    project: req.params.projectId,
    createdBy: req.userId,
  });
  emitToProject(req.params.projectId, 'task:created', task);
  res.status(201).json(task);
});

export const updateTask = asyncHandler(async (req, res) => {
  const task = await Task.findById(req.params.id);
  if (!task) throw new ApiError(404, 'Task not found');
  await requireMember(task.project.toString(), req.userId!);

  task.set(req.body);
  await task.save();
  emitToProject(task.project.toString(), 'task:updated', task);
  res.json(task);
});

export const deleteTask = asyncHandler(async (req, res) => {
  const task = await Task.findById(req.params.id);
  if (!task) throw new ApiError(404, 'Task not found');
  await requireMember(task.project.toString(), req.userId!);

  await task.deleteOne();
  emitToProject(task.project.toString(), 'task:deleted', { _id: task.id });
  res.json({ message: 'Task deleted' });
});
