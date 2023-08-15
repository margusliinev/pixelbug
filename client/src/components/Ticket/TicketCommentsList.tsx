import { Comment } from '@/utils/types';

const TicketCommentsList = ({ comments }: { comments: Comment[] }) => {
    return (
        <ul>
            {comments.map((comment) => {
                return <li key={comment.comment_id}>{comment.content}</li>;
            })}
        </ul>
    );
};

export default TicketCommentsList;
