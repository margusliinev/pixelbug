import { eq } from 'drizzle-orm';
import { Response } from 'express';

import { db } from '../../db/index';
import { Project, projects, projects_users, User, users } from '../../db/schema';
import { AuthenticatedRequest, UnauthenticatedError } from '../../utils';

export const createProject = async (req: AuthenticatedRequest, res: Response) => {
    if (!req.user) throw new UnauthenticatedError('Authentication Invalid');

    const { title, description, start_date, end_date } = req.body as Project;
    const { added_users } = req.body as { added_users: User['user_id'][] };

    const manager_id = req.user.user_id;

    const result = await db
        .insert(projects)
        .values({
            title: title,
            description: description,
            manager_id: manager_id,
            start_date: start_date,
            end_date: end_date,
        })
        .returning();
    const project = result[0];

    const project_id = project.project_id;

    const project_user_result = await db
        .insert(projects_users)
        .values(
            added_users.map((user_id) => ({
                project_id: project_id,
                user_id: user_id,
            }))
        )
        .returning();
    if (project_user_result.length !== added_users.length) {
        throw new Error('Failed to add users to project');
    }

    const createdProject = await db
        .selectDistinctOn([projects.project_id], { projects: projects })
        .from(projects)
        .leftJoin(projects_users, eq(projects.project_id, projects_users.project_id))
        .leftJoin(users, eq(projects_users.user_id, users.user_id))
        .where(eq(projects.project_id, project_id));
    const newProject = createdProject.map((project) => project.projects);

    const createdProjectUsers = await db
        .selectDistinct({ users: users })
        .from(projects)
        .leftJoin(projects_users, eq(projects.project_id, projects_users.project_id))
        .leftJoin(users, eq(projects_users.user_id, users.user_id))
        .where(eq(projects.project_id, project_id));
    const newProjectUsers = createdProjectUsers.map((user) => user.users);

    res.status(201).json({ success: true, data: { project: newProject, users: newProjectUsers }, msg: 'Successfully created a new project' });
};
