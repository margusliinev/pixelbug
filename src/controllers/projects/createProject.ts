import { Response } from 'express';
import moment from 'moment';

import { db } from '../../db/index';
import { Project, projects, projects_users } from '../../db/schema';
import { AuthenticatedRequest, BadRequestError, UnauthenticatedError } from '../../utils';

export const createProject = async (req: AuthenticatedRequest, res: Response) => {
    if (!req.user) throw new UnauthenticatedError('Authentication Invalid');

    const { title, description, start_date, end_date } = req.body as Project;

    if (!title || !description || !start_date || !end_date) {
        throw new BadRequestError('form', 'Please fill out all fields');
    }

    const manager_id = req.user.user_id;

    const start_date_utc = moment.utc(start_date).toDate();
    const end_date_utc = moment.utc(end_date).toDate();

    const result = await db
        .insert(projects)
        .values({
            title: title,
            description: description,
            manager_id: manager_id,
            start_date: start_date_utc,
            end_date: end_date_utc,
        })
        .returning();

    const project = result[0];

    const project_id = project.project_id;

    const project_user_result = await db
        .insert(projects_users)
        .values({
            project_id: project_id,
            user_id: manager_id,
        })
        .returning();

    if (!project || !project_user_result) throw new Error('Failed to create a new project');

    res.status(201).json({ success: true, project: project, msg: 'Successfully created a new project' });
};
