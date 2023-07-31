import { and, eq, inArray, ne } from 'drizzle-orm';
import { Response } from 'express';

import { db } from '../../db/index';
import { projects, projects_users, tickets, User } from '../../db/schema';
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

    const current_users = await db
        .select({ user_id: projects_users.user_id })
        .from(projects_users)
        .where(and(eq(projects_users.project_id, Number(project_id)), ne(projects_users.user_id, manager_id)));

    const removed_users = current_users.filter((user) => !updated_users.includes(user.user_id as number)).map((user) => user.user_id as number);

    if (removed_users.length >= 1) {
        await db
            .update(tickets)
            .set({ assigned_user_id: null, status: 'unassigned' })
            .where(and(eq(tickets.project_id, Number(project_id)), inArray(tickets.assigned_user_id, removed_users)))
            .catch(() => {
                throw new Error('Failed to reset tickets');
            });
    }

    await db
        .delete(projects_users)
        .where(and(eq(projects_users.project_id, Number(project_id)), ne(projects_users.user_id, manager_id)))
        .catch(() => {
            throw new Error('Failed to update project users');
        });

    if (updated_users.length >= 1) {
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
    }

    res.status(200).json({ success: true, msg: 'Successfully updated project users' });
};
