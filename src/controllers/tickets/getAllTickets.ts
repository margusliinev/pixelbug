import { eq } from 'drizzle-orm';
import { Response } from 'express';

import { db } from '../../db';
import { tickets } from '../../db/schema';
import { AuthenticatedRequest, UnauthenticatedError } from '../../utils';

export const getAllTickets = async (req: AuthenticatedRequest, res: Response) => {
    if (!req.user) throw new UnauthenticatedError('Authentication Invalid');

    const userTickets = await db.select().from(tickets).where(eq(tickets.assigned_user_id, req.user.user_id));

    res.status(200).json({ success: true, tickets: userTickets });
};
