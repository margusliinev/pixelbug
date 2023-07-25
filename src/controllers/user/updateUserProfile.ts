import { eq } from 'drizzle-orm';
import { Response } from 'express';

import { db } from '../../db';
import { NewUser, users } from '../../db/schema';
import {
    AuthenticatedRequest,
    BadRequestError,
    isUpdatedEmailUnique,
    normalizeEmail,
    UnauthenticatedError,
    validateEmail,
    validateFirstName,
    validateJobTitle,
    validateLastName,
    validateUsername,
} from '../../utils';

export const updateUserProfile = async (req: AuthenticatedRequest, res: Response) => {
    if (!req.user) {
        throw new UnauthenticatedError('Authentication Invalid');
    }

    const { username, email, first_name, last_name, job_title } = req.body as NewUser;

    if (!username || !email) {
        throw new BadRequestError('form', 'Missing username or email');
    }

    validateUsername(username);
    validateEmail(email);

    const normalizedEmail = normalizeEmail(email);

    const uniqueEmail = await isUpdatedEmailUnique(normalizedEmail, req.user.user_id);
    if (!uniqueEmail) throw new BadRequestError('email', 'Email is already in use');

    const updateData: Partial<NewUser> = { username: username, email: normalizedEmail };

    if (!first_name) {
        const first_name = '';
        updateData.first_name = first_name;
    } else {
        validateFirstName(first_name);
        updateData.first_name = first_name.trim();
    }
    if (!last_name) {
        const last_name = '';
        updateData.last_name = last_name;
    } else {
        validateLastName(last_name);
        updateData.last_name = last_name.trim();
    }
    if (!job_title) {
        const job_title = '';
        updateData.job_title = job_title;
    } else {
        validateJobTitle(job_title);
        updateData.job_title = job_title.trim();
    }

    updateData.updated_at = new Date(Date.now());
    const result = await db.update(users).set(updateData).where(eq(users.user_id, req.user.user_id)).returning();

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

    res.status(200).json({ success: true, user: user, msg: 'Your profile was successfully updated' });
};
