import { eq } from 'drizzle-orm';
import { Response } from 'express';

import { db } from '../../db/index';
import { comments } from '../../db/schema';
import { AuthenticatedRequest, NotFoundError, UnauthenticatedError, UnauthorizedError } from '../../utils';

export const deleteComment = async (req: AuthenticatedRequest, res: Response) => {
    if (!req.user) throw new UnauthenticatedError('Authentication Invalid');

    const { comment_id } = req.body as { comment_id: number };

    const comment = await db.select().from(comments).where(eq(comments.comment_id, comment_id));
    if (!comment[0]) throw new NotFoundError('Comment Not Found');

    if (comment[0].user_id !== req.user.user_id) throw new UnauthorizedError('Your are not authorized to delete this comment');

    const deletedComment = await db.delete(comments).where(eq(comments.comment_id, comment_id));
    if (!deletedComment) {
        throw new Error('Comment could not be deleted');
    }

    res.status(204).json({ success: true, msg: 'Comment was successfully deleted' });
};
