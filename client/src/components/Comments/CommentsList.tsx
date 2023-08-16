import { Comment } from '@/utils/types';

import { SingleComment } from '..';

const CommentsList = ({ comments }: { comments: Comment[] }) => {
    return (
        <ul>
            {comments.map((comment) => {
                return <SingleComment key={comment.comment_id} comment={comment} />;
            })}
        </ul>
    );
};

export default CommentsList;
