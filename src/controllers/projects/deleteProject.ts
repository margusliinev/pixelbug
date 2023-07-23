import { eq } from 'drizzle-orm';
import { Response } from 'express';

import { db } from '../../db/index';
import { projects } from '../../db/schema';
import { AuthenticatedRequest, NotFoundError, UnauthenticatedError, UnauthorizedError } from '../../utils';

export const deleteProject = async (req: AuthenticatedRequest, res: Response) => {
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

    if (projectManagerID !== req.user.user_id) throw new UnauthorizedError('Only project manager can delete the project');

    const result = await db
        .delete(projects)
        .where(eq(projects.project_id, Number(project_id)))
        .returning();
    if (!result) throw new Error('Failed to delete the project');

    res.status(204).json({ success: true, msg: 'Project was successfully deleted' });
};
