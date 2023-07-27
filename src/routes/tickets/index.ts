/* eslint-disable @typescript-eslint/no-misused-promises */
import express from 'express';

import { createTicket } from '../../controllers/tickets';
import { auth } from '../../middleware/authMiddleware';

const router = express.Router();

router.route('/').post(auth, createTicket);

export default router;
