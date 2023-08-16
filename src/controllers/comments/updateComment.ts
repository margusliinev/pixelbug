import { eq } from 'drizzle-orm';
import { Response } from 'express';

import { db } from '../../db/index';
import { Comment, comments } from '../../db/schema';
import { AuthenticatedRequest, BadRequestError, UnauthenticatedError } from '../../utils';

export const updateComment = async (req: AuthenticatedRequest, res: Response) => {
    if (!req.user) throw new UnauthenticatedError('Authentication Invalid');

    const { content, comment_id } = req.body as Comment;

    if (!content) {
        throw new BadRequestError('form', 'Comment must be provided');
    }

    const result = await db
        .update(comments)
        .set({ content: content })
        .where(eq(comments.comment_id, Number(comment_id)))
        .returning();

    if (!result) {
        throw new Error('Failed to update the comment');
    }

    res.status(200).json({ success: true, msg: 'Successfully created a new comment' });
};
