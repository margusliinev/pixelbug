import cloudinary from 'cloudinary';
import { eq } from 'drizzle-orm';
import { Response } from 'express';

import { db } from '../../db/index';
import { users } from '../../db/schema';
import { AuthenticatedRequest, BadRequestError, UnauthenticatedError } from '../../utils';

export const uploadPicture = async (req: AuthenticatedRequest, res: Response) => {
    if (!req.user) throw new UnauthenticatedError('Authentication Invalid');

    if (!req.file) throw new BadRequestError('profile_picture', 'Failed to upload profile picture');

    if (req.file.size > 500000) {
        throw new BadRequestError('profile_picture', 'Profile picture file size is too big');
    }

    const allowedFormats = ['image/jpeg', 'image/jpg', 'image/png'];

    if (!allowedFormats.includes(req.file.mimetype)) {
        throw new BadRequestError('profile_picture', 'Invalid file format');
    }

    const response = await cloudinary.v2.uploader.upload(req.file.path);
    const result = await db.update(users).set({ profile_picture: response.secure_url }).where(eq(users.user_id, req.user.user_id)).returning();

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

    res.status(200).json({ success: true, isAuth: true, user: user, msg: 'Profile picture successfully updated' });
};
