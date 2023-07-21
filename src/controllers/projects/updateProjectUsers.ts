import { and, eq, ne } from 'drizzle-orm';
import { Response } from 'express';

import { db } from '../../db/index';
import { projects, projects_users, User } from '../../db/schema';
import { AuthenticatedRequest, UnauthenticatedError } from '../../utils';

export const updateProjectUsers = async (req: AuthenticatedRequest, res: Response) => {
    if (!req.user) throw new UnauthenticatedError('Authentication Invalid');

    const { project_id } = req.params;

    const updated_users = req.body as User['user_id'][];

    if (!project_id) throw new Error('Failed to update the users');

    const manager_id_query = await db
        .selectDistinct({ manager_id: projects.manager_id })
        .from(projects)
        .where(eq(projects.project_id, Number(project_id)));
    const manager_id = manager_id_query[0].manager_id;

    await db
        .delete(projects_users)
        .where(and(eq(projects_users.project_id, Number(project_id)), ne(projects_users.user_id, manager_id)))
        .returning();

    const update_users_result = await db
        .insert(projects_users)
        .values(
            updated_users.map((user_id) => ({
                project_id: Number(project_id),
                user_id: user_id,
            }))
        )
        .returning();

    if (update_users_result.length !== updated_users.length) {
        throw new Error('Failed to update project users');
    }

    res.status(200).json({ success: true, msg: 'Successfully updated project users' });
};
