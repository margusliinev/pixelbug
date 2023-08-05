import { eq } from 'drizzle-orm';
import { Response } from 'express';

import { db } from '../../db/index';
import { tickets, users } from '../../db/schema';
import { AuthenticatedRequest, NotFoundError, UnauthenticatedError } from '../../utils';

export const deleteUser = async (req: AuthenticatedRequest, res: Response) => {
    if (!req.user) throw new UnauthenticatedError('Authentication Invalid');

    const result = await db.delete(users).where(eq(users.user_id, req.user.user_id)).returning();
    const user = result[0];
    if (!user) throw new NotFoundError('Failed to delete user');

    await db
        .update(tickets)
        .set({ assigned_user_id: null, status: 'unassigned' })
        .where(eq(tickets.assigned_user_id, req.user.user_id))
        .returning()
        .catch((error) => {
            console.log(error);
        });

    res.cookie('token', 'delete', {
        httpOnly: true,
        expires: new Date(Date.now()),
    });

    res.status(204).json({ success: true, msg: 'User has been deleted' });
};
