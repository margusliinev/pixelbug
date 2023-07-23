/* eslint-disable @typescript-eslint/no-unused-vars */
import { and, eq, ne } from 'drizzle-orm';
import { Response } from 'express';

import { db } from '../../db';
import { projects, projects_users, User, users } from '../../db/schema';
import { AuthenticatedRequest, UnauthenticatedError } from '../../utils';

export const getProjectUsers = async (req: AuthenticatedRequest, res: Response) => {
    if (!req.user) throw new UnauthenticatedError('Authentication Invalid');

    const { project_id } = req.params;

    // Get manager ID to filter it out from the returned project users
    const manager_id_query = await db
        .selectDistinct({ manager_id: projects.manager_id })
        .from(projects)
        .where(eq(projects.project_id, Number(project_id)));
    const manager_id = manager_id_query[0].manager_id;

    const projectUsersQuery = await db
        .selectDistinct({ users: users })
        .from(projects)
        .leftJoin(projects_users, eq(projects.project_id, projects_users.project_id))
        .leftJoin(users, eq(projects_users.user_id, users.user_id))
        .where(and(eq(projects.project_id, Number(project_id)), ne(projects_users.user_id, manager_id)));

    const allUsers = await db.select().from(users);

    const projectUsers = projectUsersQuery.map((user) => {
        const { password, ...userNoPassword } = user.users as User; // Exclude password from user data
        return userNoPassword;
    });

    // Array to compare user ID-s to get the users that are not in the project (other users)
    const projectUsersID = projectUsersQuery.map((user) => user.users?.user_id);

    const otherUsers = allUsers
        .filter((user) => !projectUsersID.includes(user.user_id) && user.user_id !== manager_id)
        .map((user) => {
            const { password, ...userNoPassword } = user as User; // Exclude password from user data
            return userNoPassword;
        });

    res.status(200).json({ success: true, projectUsers, otherUsers });
};
