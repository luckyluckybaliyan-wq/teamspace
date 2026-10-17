import { Project } from '../models/Project';
import { Task } from '../models/Task';
import { User } from '../models/User';
import { requireMember } from '../services/access';
import { ApiError } from '../utils/ApiError';
import { asyncHandler } from '../utils/asyncHandler';

export const createProject = asyncHandler(async (req, res) => {
  const { name, description } = req.body;
  const project = await Project.create({
    name,
    description,
    owner: req.userId,
    members: [{ user: req.userId, role: 'admin' }],
  });
  res.status(201).json(project);
});

export const listProjects = asyncHandler(async (req, res) => {
  const projects = await Project.find({ 'members.user': req.userId }).sort({ createdAt: -1 });
  res.json(projects);
});

export const getProject = asyncHandler(async (req, res) => {
  await requireMember(req.params.id, req.userId!);
  const project = await Project.findById(req.params.id).populate('members.user', 'name email');
  res.json(project);
});

export const addMember = asyncHandler(async (req, res) => {
  const project = await requireMember(req.params.id, req.userId!, true);
  const user = await User.findOne({ email: req.body.email });
  if (!user) throw new ApiError(404, 'No user with that email');

  if (project.members.some((m) => m.user.toString() === user.id)) {
    throw new ApiError(409, 'User is already a member');
  }
  project.members.push({ user: user._id, role: req.body.role || 'member' });
  await project.save();

  const populated = await Project.findById(project.id).populate('members.user', 'name email');
  res.json(populated);
});

export const deleteProject = asyncHandler(async (req, res) => {
  const project = await requireMember(req.params.id, req.userId!, true);
  await Task.deleteMany({ project: project._id });
  await project.deleteOne();
  res.json({ message: 'Project deleted' });
});
