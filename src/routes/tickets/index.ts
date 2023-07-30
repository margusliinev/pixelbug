/* eslint-disable @typescript-eslint/no-misused-promises */
import express from 'express';

import { createTicket, getAllTickets, getTicket, updateTicket } from '../../controllers/tickets';
import { auth } from '../../middleware/authMiddleware';

const router = express.Router();

router.route('/').get(auth, getAllTickets).post(auth, createTicket);
router.route('/:ticket_id').get(auth, getTicket).patch(auth, updateTicket);

export default router;
