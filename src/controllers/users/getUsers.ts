import { Response } from 'express';

import { db } from '../../db/index';
import { users } from '../../db/schema';
import { AuthenticatedRequest, UnauthenticatedError } from '../../utils';

export const getUsers = async (req: AuthenticatedRequest, res: Response) => {
    if (!req.user) throw new UnauthenticatedError('Authentication Invalid');

    const result = await db.select().from(users);
    if (result.length < 1) throw new Error('No users found');

    res.status(200).json({ success: true, users: result });
};
