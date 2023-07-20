import { Response } from 'express';

import { db } from '../../db/index';
import { projects_users, User } from '../../db/schema';
import { AuthenticatedRequest, UnauthenticatedError } from '../../utils';

export const updateProjectUsers = async (req: AuthenticatedRequest, res: Response) => {
    if (!req.user) throw new UnauthenticatedError('Authentication Invalid');

    const { project_id } = req.params;

    const { updated_users } = req.body as { updated_users: User['user_id'][] };

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
