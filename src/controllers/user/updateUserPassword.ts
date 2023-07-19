import { eq } from 'drizzle-orm';
import { Response } from 'express';
import moment from 'moment';

import { db } from '../../db';
import { users } from '../../db/schema';
import { AuthenticatedRequest, BadRequestError, comparePassword, hashPassword, UnauthenticatedError, validatePassword } from '../../utils';

interface UserUpdatePassword {
    password: string;
    newPassword: string;
    confirmNewPassword: string;
}

export const updateUserPassword = async (req: AuthenticatedRequest, res: Response) => {
    if (!req.user) {
        throw new UnauthenticatedError('Authentication Invalid');
    }

    const { password, newPassword, confirmNewPassword } = req.body as UserUpdatePassword;

    if (!password || !newPassword || !confirmNewPassword) {
        throw new BadRequestError('form', 'Missing current password, new password, or confirm password');
    }

    validatePassword(newPassword);

    const userData = await db.select().from(users).where(eq(users.user_id, req.user.user_id));
    const currentPassword = userData[0].password;

    const passwordMatch = await comparePassword(password, currentPassword);

    if (!passwordMatch) {
        throw new BadRequestError('password', 'Your current password is incorrect');
    }

    if (newPassword !== confirmNewPassword) {
        throw new BadRequestError('confirmNewPassword', 'Passwords do not match');
    }

    const hashedPassword = await hashPassword(newPassword);

    const updateTime = moment.utc().toDate();

    const result = await db
        .update(users)
        .set({ password: hashedPassword, updated_at: updateTime })
        .where(eq(users.user_id, req.user.user_id))
        .returning();
    const updatedUser = result[0];
    if (!updatedUser) throw new BadRequestError('form', 'Failed to update user password');

    const user = {
        user_id: result[0].user_id,
        username: result[0].username,
        email: result[0].email,
        first_name: result[0].first_name,
        last_name: result[0].last_name,
        job_title: result[0].job_title,
        profile_picture: result[0].profile_picture,
        verified: result[0].verified,
        role: result[0].role,
        created_at: result[0].created_at,
        updated_at: result[0].updated_at,
    };

    res.status(200).json({ success: true, user: user, msg: 'Your password has been updated' });
};
