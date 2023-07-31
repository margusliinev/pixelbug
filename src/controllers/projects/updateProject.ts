import { eq } from 'drizzle-orm';
import { Response } from 'express';

import { db } from '../../db/index';
import { Project, projects } from '../../db/schema';
import { AuthenticatedRequest, BadRequestError, UnauthenticatedError, UnauthorizedError } from '../../utils';

export const updateProject = async (req: AuthenticatedRequest, res: Response) => {
    if (!req.user) throw new UnauthenticatedError('Authentication Invalid');

    const { project_id } = req.params;
    const { title, description, start_date, end_date } = req.body as Project;

    if (!title || !description || !start_date || !end_date) {
        throw new BadRequestError('form', 'Please fill out all fields');
    }

    const start_date_utc = new Date(start_date);
    const end_date_utc = new Date(end_date);

    const project = await db
        .select()
        .from(projects)
        .where(eq(projects.project_id, Number(project_id)));
    const projectManagerID = project[0].manager_id;

    if (projectManagerID !== req.user.user_id) throw new UnauthorizedError('Only project manager can update the project');

    const result = await db
        .update(projects)
        .set({ title, description, start_date: start_date_utc, end_date: end_date_utc })
        .where(eq(projects.project_id, Number(project_id)))
        .returning();
    if (!result) throw new Error('Failed to update project');

    res.status(200).json({ success: true, msg: 'Successfully updated the project' });
};
