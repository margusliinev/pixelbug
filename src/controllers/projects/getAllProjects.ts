import { eq } from 'drizzle-orm';
import { Response } from 'express';

import { db } from '../../db';
import { projects, projects_users, users } from '../../db/schema';
import { AuthenticatedRequest, UnauthenticatedError } from '../../utils';

export const getAllProjects = async (req: AuthenticatedRequest, res: Response) => {
    if (!req.user) throw new UnauthenticatedError('Authentication Invalid');

    const result = await db
        .select()
        .from(projects)
        .leftJoin(projects_users, eq(projects.project_id, projects_users.project_id))
        .leftJoin(users, eq(projects.manager_id, users.user_id)) // Join the users table using the manager_id column
        .where(eq(projects_users.user_id, req.user.user_id));

    const userProjects = result.map((project) => {
        const { manager_id, ...projectData } = project.projects; // Extract project data excluding manager_id
        const manager = project.users; // Access the joined users table to get manager info
        return { ...projectData, manager }; // Merge project data and manager info
    });

    res.status(200).json({ success: true, projects: userProjects });
};
