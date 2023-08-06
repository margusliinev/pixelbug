import { and, eq, or } from 'drizzle-orm';
import { Response } from 'express';

import { db } from '../../db/index';
import { projects, projects_users, tickets } from '../../db/schema';
import { AuthenticatedRequest, NotFoundError, UnauthenticatedError, UnauthorizedError } from '../../utils';

export const leaveProject = async (req: AuthenticatedRequest, res: Response) => {
    if (!req.user) throw new UnauthenticatedError('Authentication Invalid');

    const { project_id } = req.params;

    const project = await db
        .select()
        .from(projects)
        .where(eq(projects.project_id, Number(project_id)));

    if (project.length < 1) {
        throw new NotFoundError('Project not found');
    }

    const projectManagerID = project[0].manager_id;

    if (projectManagerID === req.user.user_id) throw new UnauthorizedError('Manager cannot leave the project');

    await db
        .update(tickets)
        .set({ assigned_user_id: null, status: 'unassigned', reporter_user_id: null })
        .where(or(eq(tickets.assigned_user_id, req.user.user_id), eq(tickets.reporter_user_id, req.user.user_id)))
        .returning()
        .catch((error) => {
            console.log(error);
        });

    const result = await db
        .delete(projects_users)
        .where(and(eq(projects_users.project_id, Number(project_id)), eq(projects_users.user_id, req.user.user_id)))
        .returning();
    if (!result) throw new Error('Failed to leave the project');

    res.status(204).json({ success: true, msg: 'You have successfully left the project' });
};
