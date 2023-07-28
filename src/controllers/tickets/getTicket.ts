/* eslint-disable @typescript-eslint/no-unused-vars */
import { eq } from 'drizzle-orm';
import { Response } from 'express';

import { db } from '../../db';
import { projects, tickets, users } from '../../db/schema';
import { AuthenticatedRequest, NotFoundError, UnauthenticatedError, UnauthorizedError } from '../../utils';

export const getTicket = async (req: AuthenticatedRequest, res: Response) => {
    if (!req.user) throw new UnauthenticatedError('Authentication Invalid');

    const { ticket_id } = req.params;

    const result = await db
        .select()
        .from(tickets)
        .where(eq(tickets.ticket_id, Number(ticket_id)));
    if (result.length < 1) {
        throw new NotFoundError('Ticket not found');
    }

    const assigned_user = result[0].assigned_user_id ? await db.select().from(users).where(eq(users.user_id, result[0].assigned_user_id)) : null;
    const reporter_user = result[0].reporter_user_id ? await db.select().from(users).where(eq(users.user_id, result[0].reporter_user_id)) : null;

    const assigned_user_name = assigned_user
        ? assigned_user[0].first_name && assigned_user[0].last_name
            ? assigned_user[0].first_name + ' ' + assigned_user[0].last_name
            : assigned_user[0].username
        : 'Unassigned';

    const reporter_user_name = reporter_user
        ? reporter_user[0].first_name && reporter_user[0].last_name
            ? reporter_user[0].first_name + ' ' + reporter_user[0].last_name
            : reporter_user[0].username
        : 'Unassigned';

    const ticketProject = result[0].project_id ? await db.select().from(projects).where(eq(projects.project_id, result[0].project_id)) : null;
    const ticketProject_title = ticketProject ? ticketProject[0].title : 'Deleted Project';

    const ticket = { ...result[0], assigned_user: assigned_user_name, reporter_user: reporter_user_name, project_title: ticketProject_title };

    res.status(200).json({ success: true, ticket: ticket });
};
