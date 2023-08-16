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
import { auth, checkForTestUser } from '../../middleware/authMiddleware';

const router = express.Router();

router.route('/').get(auth, getAllProjects).post(auth, createProject).delete(auth, checkForTestUser, deleteProject);
router.route('/:project_id').get(auth, getProject).patch(auth, updateProject).delete(auth, checkForTestUser, leaveProject);
router.route('/:project_id/users').get(auth, getProjectUsers).put(auth, checkForTestUser, updateProjectUsers);

export default router;
