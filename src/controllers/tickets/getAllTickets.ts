/* eslint-disable @typescript-eslint/no-unused-vars */
import { eq } from 'drizzle-orm';
import { Response } from 'express';

import { db } from '../../db';
import { Project, projects, tickets, User, users } from '../../db/schema';
import { AuthenticatedRequest, UnauthenticatedError } from '../../utils';

export const getAllTickets = async (req: AuthenticatedRequest, res: Response) => {
    if (!req.user) throw new UnauthenticatedError('Authentication Invalid');

    const result = await db
        .select()
        .from(tickets)
        .leftJoin(users, eq(users.user_id, tickets.assigned_user_id))
        .leftJoin(projects, eq(projects.project_id, tickets.project_id))
        .where(eq(tickets.assigned_user_id, req.user.user_id));

    const userTickets = result.map((ticket) => {
        const { ...ticketData } = ticket.tickets; // Extract ticket data
        const { title } = ticket.projects as Project;
        const { password, user_id, profile_picture, created_at, updated_at, role, verified, ...user } = ticket.users as User; // Remove unneeded user data and extract rest
        return { ...ticketData, assigned_user: user, project_title: title }; // Merge ticket data and user info
    });

    res.status(200).json({ success: true, tickets: userTickets });
};
