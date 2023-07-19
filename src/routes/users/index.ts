/* eslint-disable @typescript-eslint/no-misused-promises */
import express from 'express';

import { getUsers } from '../../controllers/users';
import { auth } from '../../middleware/authMiddleware';

const router = express.Router();

router.route('/').get(auth, getUsers);

export default router;
