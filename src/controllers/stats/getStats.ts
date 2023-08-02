/* eslint-disable @typescript-eslint/no-unused-vars */
import { and, eq, ne } from 'drizzle-orm';
import { alias } from 'drizzle-orm/pg-core';
import { Response } from 'express';

import { db } from '../../db';
import { projects, projects_users, tickets, User, users } from '../../db/schema';
import { AuthenticatedRequest, NotFoundError, UnauthenticatedError, UnauthorizedError } from '../../utils';

export const getStats = async (req: AuthenticatedRequest, res: Response) => {
    if (!req.user) throw new UnauthenticatedError('Authentication Invalid');

    const result = await db
        .select()
        .from(projects)
        .leftJoin(projects_users, eq(projects.project_id, projects_users.project_id))
        .where(eq(projects_users.user_id, req.user.user_id));

    const userProjects = await Promise.all(
        result.map(async (project) => {
            const projectTickets = await db.select().from(tickets).where(eq(tickets.project_id, project.projects.project_id));
            const projectUsers = await db
                .select()
                .from(users)
                .leftJoin(projects_users, eq(users.user_id, projects_users.user_id))
                .where(eq(projects_users.project_id, project.projects.project_id));
            return { ...project.projects, tickets: projectTickets, users: projectUsers };
        })
    );

    res.status(200).json({ success: true, projects: userProjects });
};
