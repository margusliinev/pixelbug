import { and, eq } from 'drizzle-orm';
import { Response } from 'express';

import { db } from '../../db/index';
import { NewTicket, projects_users, tickets } from '../../db/schema';
import { AuthenticatedRequest, BadRequestError, UnauthenticatedError, UnauthorizedError } from '../../utils';

export const createTicket = async (req: AuthenticatedRequest, res: Response) => {
    if (!req.user) throw new UnauthenticatedError('Authentication Invalid');

    const { project_id, title, description, priority } = req.body as NewTicket;

    if (!project_id || !title || !description || !priority) {
        throw new BadRequestError('form', 'Please fill out all fields');
    }

    const projectUsers = await db
        .select()
        .from(projects_users)
        .where(and(eq(projects_users.project_id, project_id), eq(projects_users.user_id, req.user.user_id)));
    if (projectUsers.length < 1) throw new UnauthorizedError('You are not authorized to create a ticket for this project');

    const start_date = new Date(Date.now());
    const end_date = new Date(Date.now());

    const result = await db
        .insert(tickets)
        .values({
            project_id: project_id,
            title: title,
            description: description,
            start_date: start_date,
            end_date: end_date,
            reporter_user_id: req.user.user_id,
            priority: priority,
        })
        .returning();

    const ticket = result[0];
    if (!ticket) throw new BadRequestError('form', 'Failed to create ticket');

    res.status(201).json({ success: true, msg: 'Successfully created a new ticket' });
};
