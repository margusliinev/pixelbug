/* eslint-disable @typescript-eslint/no-misused-promises */
import express from 'express';

import { createProject, getAllProjects, getSingleProject } from '../../controllers/projects';
import { auth } from '../../middleware/authMiddleware';

const router = express.Router();

router.route('/projects').get(auth, getAllProjects).post(auth, createProject);
router.route('/projects/:project_id').get(auth, getSingleProject);

export default router;
