/* eslint-disable @typescript-eslint/no-misused-promises */
import express from 'express';

import {
    createProject,
    deleteProject,
    getAllProjects,
    getProject,
    getProjectUsers,
    leaveProject,
    updateProject,
    updateProjectUsers,
} from '../../controllers/projects';
import { auth } from '../../middleware/authMiddleware';

const router = express.Router();

router.route('/').get(auth, getAllProjects).post(auth, createProject).delete(auth, deleteProject);
router.route('/:project_id').get(auth, getProject).patch(auth, updateProject).delete(auth, leaveProject);
router.route('/:project_id/users').get(auth, getProjectUsers).put(auth, updateProjectUsers);

export default router;
