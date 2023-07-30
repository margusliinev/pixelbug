import { eq } from 'drizzle-orm';
import { Response } from 'express';

import { db } from '../../db/index';
import { projects, tickets } from '../../db/schema';
import { AuthenticatedRequest, BadRequestError, NotFoundError, UnauthenticatedError, UnauthorizedError } from '../../utils';

interface Ticket {
    title: string;
    description: string;
    assigned_user_id: string;
    priority: 'low' | 'medium' | 'high' | 'critical';
    status: 'unassigned' | 'assigned' | 'in_development' | 'on_hold' | 'resolved';
}

export const updateTicket = async (req: AuthenticatedRequest, res: Response) => {
    if (!req.user) throw new UnauthenticatedError('Authentication Invalid');

    const { ticket_id } = req.params;
    const { title, description, assigned_user_id, priority, status } = req.body as Ticket;

    if (!title || !description || !assigned_user_id || !priority || !status) {
        throw new BadRequestError('form', 'Please fill out all fields');
    }

    const ticket = await db
        .select()
        .from(tickets)
        .where(eq(tickets.ticket_id, Number(ticket_id)));
    if (!ticket[0].project_id) throw new NotFoundError('Ticket not found');

    const project = await db.select().from(projects).where(eq(projects.project_id, ticket[0].project_id));
    const projectManagerID = project[0].manager_id;

    if (projectManagerID !== req.user.user_id) throw new UnauthorizedError('Only project manager can update tickets');

    const assignedUser = Number(assigned_user_id);

    const result = await db
        .update(tickets)
        .set({ title, description, assigned_user_id: assignedUser, priority, status })
        .where(eq(tickets.ticket_id, Number(ticket_id)))
        .returning();
    if (!result) throw new Error('Failed to update project');

    res.status(201).json({ success: true, msg: 'Successfully updated the project' });
};
