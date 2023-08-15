import { Comment } from '@/utils/types';

import { TicketComment } from '..';

const TicketCommentsList = ({ comments }: { comments: Comment[] }) => {
    return (
        <ul>
            {comments.map((comment) => {
                return <TicketComment key={comment.comment_id} comment={comment} />;
            })}
        </ul>
    );
};

export default TicketCommentsList;
