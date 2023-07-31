import { eq } from 'drizzle-orm';
import { Response } from 'express';

import { db } from '../../db/index';
import { projects, tickets } from '../../db/schema';
import { AuthenticatedRequest, NotFoundError, UnauthenticatedError, UnauthorizedError } from '../../utils';

export const closeTicket = async (req: AuthenticatedRequest, res: Response) => {
    if (!req.user) throw new UnauthenticatedError('Authentication Invalid');

    const { ticket_id } = req.params;

    const ticket = await db
        .select()
        .from(tickets)
        .where(eq(tickets.ticket_id, Number(ticket_id)));
    if (!ticket[0].project_id) throw new NotFoundError('Ticket not found');

    const project = await db.select().from(projects).where(eq(projects.project_id, ticket[0].project_id));
    const projectManagerID = project[0].manager_id;

    if (projectManagerID !== req.user.user_id) throw new UnauthorizedError('Only project manager can update tickets');

    const result = await db
        .update(tickets)
        .set({ completed_date: new Date(Date.now()) })
        .where(eq(tickets.ticket_id, Number(ticket_id)))
        .returning();
    if (!result) throw new Error('Failed to close the ticket');

    res.status(200).json({ success: true, msg: 'Ticket was successfully closed' });
};
