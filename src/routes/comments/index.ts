/* eslint-disable @typescript-eslint/no-misused-promises */
import express from 'express';

import { createComment } from '../../controllers/comments';
import { auth } from '../../middleware/authMiddleware';

const router = express.Router();

router.route('/').post(auth, createComment);

export default router;
