import { Response } from 'express';

import { db } from '../../db/index';
import { comments, NewComment } from '../../db/schema';
import { AuthenticatedRequest, BadRequestError, UnauthenticatedError } from '../../utils';

export const createComment = async (req: AuthenticatedRequest, res: Response) => {
    if (!req.user) throw new UnauthenticatedError('Authentication Invalid');

    const { ticket_id } = req.params;
    const { content } = req.body as NewComment;

    if (!content) {
        throw new BadRequestError('form', 'Please add a comment');
    }

    const comment_date_utc = new Date(Date.now());

    const result = await db
        .insert(comments)
        .values({
            content: content,
            comment_date: comment_date_utc,
            user_id: req.user.user_id,
            ticket_id: Number(ticket_id),
        })
        .returning();

    const comment = result[0];

    if (!comment) {
        throw new Error('Failed to create a new comment');
    }

    res.status(201).json({ success: true, msg: 'Successfully created a new comment' });
};
