/* eslint-disable @typescript-eslint/no-misused-promises */
import express from 'express';

import { createProject } from '../../controllers/projects';
import { auth } from '../../middleware/authMiddleware';

const router = express.Router();

router.route('/projects').post(auth, createProject);

export default router;
