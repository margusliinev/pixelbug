import { and, eq, ne } from 'drizzle-orm';
import { Response } from 'express';

import { db } from '../../db';
import { Project, projects, tickets, User, users } from '../../db/schema';
import { AuthenticatedRequest, UnauthenticatedError } from '../../utils';

export const getAllTickets = async (req: AuthenticatedRequest, res: Response) => {
    if (!req.user) throw new UnauthenticatedError('Authentication Invalid');

    const result = await db
        .select()
        .from(tickets)
        .leftJoin(users, eq(users.user_id, tickets.reporter_user_id))
        .leftJoin(projects, eq(projects.project_id, tickets.project_id))
        .where(and(eq(tickets.assigned_user_id, req.user.user_id), ne(tickets.status, 'resolved')));

    const userTickets = result.map((ticket) => {
        const { ...ticketData } = ticket.tickets;
        const { title } = ticket.projects as Project;
        const { ...user } = ticket.users as User;
        return {
            ...ticketData,
            reporter_user: user.first_name && user.last_name ? `${user.first_name} ${user.last_name}` : user.username,
            project_title: title,
        };
    });

    res.status(200).json({ success: true, tickets: userTickets });
};
