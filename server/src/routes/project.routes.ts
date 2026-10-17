import { Router } from 'express';
import {
  addMember,
  createProject,
  deleteProject,
  getProject,
  listProjects,
} from '../controllers/project.controller';
import { createTask, listTasks } from '../controllers/task.controller';
import { protect } from '../middleware/auth.middleware';
import { validate } from '../middleware/validate.middleware';
import { createTaskSchema, memberSchema, projectSchema } from '../validators/schemas';

const router = Router();
router.use(protect);

router.route('/').get(listProjects).post(validate(projectSchema), createProject);
router.route('/:id').get(getProject).delete(deleteProject);
router.post('/:id/members', validate(memberSchema), addMember);

router
  .route('/:projectId/tasks')
  .get(listTasks)
  .post(validate(createTaskSchema), createTask);

export default router;
