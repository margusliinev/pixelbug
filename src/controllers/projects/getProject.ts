/* eslint-disable @typescript-eslint/no-unused-vars */
import { and, eq, ne } from 'drizzle-orm';
import { Response } from 'express';

import { db } from '../../db';
import { projects, projects_users, User, users } from '../../db/schema';
import { AuthenticatedRequest, NotFoundError, UnauthenticatedError, UnauthorizedError } from '../../utils';

export const getProject = async (req: AuthenticatedRequest, res: Response) => {
    if (!req.user) throw new UnauthenticatedError('Authentication Invalid');

    const { project_id } = req.params;

    const projectQuery = await db
        .selectDistinctOn([projects.project_id])
        .from(projects)
        .where(eq(projects.project_id, Number(project_id)));

    if (projectQuery.length < 1) {
        throw new NotFoundError('Project not found');
    }

    const projectManagerId = projectQuery[0].manager_id;

    const { manager_id, ...projectData } = projectQuery[0];

    const manager = await db.select().from(users).where(eq(users.user_id, projectManagerId));
    const { password, ...managerNoPassword } = manager[0]; // Exclude password from manager data

    const projectUsersQuery = await db
        .selectDistinct({ users: users })
        .from(projects)
        .leftJoin(projects_users, eq(projects.project_id, projects_users.project_id))
        .leftJoin(users, eq(projects_users.user_id, users.user_id))
        .where(and(eq(projects.project_id, Number(project_id)), ne(projects_users.user_id, manager_id)));
    const projectUsers = projectUsersQuery.map((user) => {
        const { password, ...userNoPassword } = user.users as User; // Exclude password from user data
        return userNoPassword;
    });

    const isUserProjectMember = projectUsers.map((user) => user?.user_id).includes(req.user.user_id);
    const isUserManager = req.user.user_id === projectManagerId;

    if (!isUserManager && !isUserProjectMember) {
        throw new UnauthorizedError('You are not authorized to view this project');
    }

    const project = { ...projectData, manager: managerNoPassword, users: projectUsers };

    res.status(200).json({ success: true, project: project });
};
