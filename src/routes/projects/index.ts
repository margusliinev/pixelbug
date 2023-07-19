/* eslint-disable @typescript-eslint/no-misused-promises */
import express from 'express';

import { createProject } from '../../controllers/projects';
import { getAllProjects } from '../../controllers/projects/getAllProjects';
import { auth } from '../../middleware/authMiddleware';

const router = express.Router();

router.route('/projects').get(auth, getAllProjects).post(auth, createProject);

export default router;
