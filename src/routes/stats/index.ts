/* eslint-disable @typescript-eslint/no-misused-promises */
import express from 'express';

import { getStats } from '../../controllers/stats';
import { auth } from '../../middleware/authMiddleware';

const router = express.Router();

router.route('/').get(auth, getStats);

export default router;
