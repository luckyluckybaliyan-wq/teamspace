import { Router } from 'express';
import { deleteTask, updateTask } from '../controllers/task.controller';
import { protect } from '../middleware/auth.middleware';
import { validate } from '../middleware/validate.middleware';
import { updateTaskSchema } from '../validators/schemas';

const router = Router();
router.use(protect);

router.route('/:id').patch(validate(updateTaskSchema), updateTask).delete(deleteTask);

export default router;
