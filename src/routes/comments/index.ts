/* eslint-disable @typescript-eslint/no-misused-promises */
import express from 'express';

import { createComment, deleteComment, updateComment } from '../../controllers/comments';
import { auth } from '../../middleware/authMiddleware';

const router = express.Router();

router.route('/tickets/:ticket_id/comments').post(auth, createComment).delete(auth, deleteComment).patch(auth, updateComment);

export default router;
