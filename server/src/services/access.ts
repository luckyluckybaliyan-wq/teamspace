import { Types } from 'mongoose';
import { Project } from '../models/Project';
import { ApiError } from '../utils/ApiError';

/** Returns the project if the user is a member (or an admin when adminOnly is true). */
export async function requireMember(projectId: string, userId: string, adminOnly = false) {
  if (!Types.ObjectId.isValid(projectId)) throw new ApiError(404, 'Project not found');
  const project = await Project.findById(projectId);
  if (!project) throw new ApiError(404, 'Project not found');

  const membership = project.members.find((m) => m.user.toString() === userId);
  if (!membership) throw new ApiError(403, 'You are not a member of this project');
  if (adminOnly && membership.role !== 'admin') throw new ApiError(403, 'Admin access required');

  return project;
}
