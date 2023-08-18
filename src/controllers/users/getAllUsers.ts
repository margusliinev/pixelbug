import { and, eq, inArray, ne } from 'drizzle-orm';
import { Response } from 'express';

import { db } from '../../db';
import { projects, projects_users, User, users } from '../../db/schema';
import { AuthenticatedRequest, NotFoundError, UnauthenticatedError } from '../../utils';

export const getAllUsers = async (req: AuthenticatedRequest, res: Response) => {
    if (!req.user) throw new UnauthenticatedError('Authentication Invalid');

    const result = await db
        .select()
        .from(projects)
        .leftJoin(projects_users, eq(projects.project_id, projects_users.project_id))
        .where(eq(projects_users.user_id, req.user.user_id));

    if (!result) {
        throw new NotFoundError('No projects found');
    }

    const userProjects = result.map((project) => project.projects.project_id);

    const allUsersQuery = await db
        .select()
        .from(users)
        .leftJoin(projects_users, eq(users.user_id, projects_users.user_id))
        .where(and(inArray(projects_users.project_id, userProjects), ne(users.user_id, req.user.user_id)));

    if (!allUsersQuery) {
        throw new NotFoundError('No users found');
    }

    const allUsers = allUsersQuery.map((user) => user.users);

    const uniqueUsers = allUsers
        .reduce((acc: User[], user) => {
            const existingUser = acc.find((existingUser) => existingUser.user_id === user.user_id);

            if (!existingUser) {
                acc.push(user);
            }

            return acc;
        }, [])
        .sort((a, b) => a.user_id - b.user_id);

    res.status(200).json({ success: true, users: uniqueUsers });
};
