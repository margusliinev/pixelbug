import { eq } from 'drizzle-orm';
import { Response } from 'express';

import { db } from '../../db';
import { projects, projects_users, users } from '../../db/schema';
import { AuthenticatedRequest, UnauthenticatedError } from '../../utils';

export const getProjectUsers = async (req: AuthenticatedRequest, res: Response) => {
    if (!req.user) throw new UnauthenticatedError('Authentication Invalid');

    const { project_id } = req.params;

    const projectUsersQuery = await db
        .selectDistinct({ users: users })
        .from(projects)
        .leftJoin(projects_users, eq(projects.project_id, projects_users.project_id))
        .leftJoin(users, eq(projects_users.user_id, users.user_id))
        .where(eq(projects.project_id, Number(project_id)));

    const allUsers = await db.select().from(users);

    const projectUsers = projectUsersQuery.map((user) => user.users);

    // Array to compare user ID-s to get the users that are not in the project (other users)
    const projectUsersID = projectUsersQuery.map((user) => user.users?.user_id);

    const otherUsers = allUsers.filter((user) => !projectUsersID.includes(user.user_id));

    res.status(200).json({ success: true, projectUsers, otherUsers });
};
