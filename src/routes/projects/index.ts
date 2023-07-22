/* eslint-disable @typescript-eslint/no-misused-promises */
import express from 'express';

import { createProject, getAllProjects, getProjectUsers, getSingleProject, updateProject, updateProjectUsers } from '../../controllers/projects';
import { auth } from '../../middleware/authMiddleware';

const router = express.Router();

router.route('/').get(auth, getAllProjects).post(auth, createProject);
router.route('/:project_id').get(auth, getSingleProject).patch(auth, updateProject);
router.route('/:project_id/users').get(auth, getProjectUsers).put(auth, updateProjectUsers);

export default router;
