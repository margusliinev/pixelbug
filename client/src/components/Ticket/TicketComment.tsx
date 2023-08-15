import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui';
import { Comment } from '@/utils/types';

const TicketComment = ({ comment }: { comment: Comment }) => {
    return (
        <li key={comment.comment_id}>
            <div className='comment-header'>
                <Avatar className='w-12 h-12 rounded-full shadow-project-card'>
                    <AvatarImage src={comment.user.profile_picture} />
                    <AvatarFallback className='text-2xl bg-neutral-200'>
                        {comment.user.first_name && comment.user.last_name
                            ? comment.user.first_name.charAt(0).toUpperCase()
                            : comment.user.username.charAt(0).toUpperCase()}
                    </AvatarFallback>
                </Avatar>
            </div>
        </li>
    );
};

export default TicketComment;
