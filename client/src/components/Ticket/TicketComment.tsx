import { useParams } from 'react-router-dom';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui';
import { useToast } from '@/components/ui/use-toast';
import { useDeleteCommentMutation } from '@/features/api/apiSlice';
import { logoutUser } from '@/features/user/userSlice';
import { useAppDispatch } from '@/utils/hooks';
import { Comment, DefaultAPIError } from '@/utils/types';

import { TicketCommentButtons } from '..';

const TicketComment = ({ comment }: { comment: Comment }) => {
    const [deleteComment] = useDeleteCommentMutation();
    const dispatch = useAppDispatch();
    const { toast } = useToast();
    const { ticket_id } = useParams();

    const handleEditComment = (comment_id: number) => {
        console.log(`Edit comment ${comment_id}`);
    };

    const handleDeleteComment = async (comment_id: number) => {
        await deleteComment({ comment_id, ticket_id: ticket_id || '' })
            .unwrap()
            .then(() => {
                toast({
                    title: 'Comment was successfully deleted',
                });
            })
            .catch(async (error: DefaultAPIError) => {
                if (error.status === 401) {
                    await dispatch(logoutUser());
                } else if (error.status === 403) {
                    toast({
                        title: 'You are not authorized to delete this comment',
                        variant: 'destructive',
                    });
                } else {
                    toast({
                        title: 'Failed to delete the comment',
                        description: 'Please try again later',
                        variant: 'destructive',
                    });
                }
            });
    };

    return (
        <li key={comment.comment_id} className='border-b border-neutral-200 block justify-between items-center gap-2 first-of-type:border-t 2xl:flex'>
            <div className='grid 2xl:flex items-center gap-2 mb-4 my-4'>
                <div className='flex items-center gap-2 justify-between'>
                    <div className='flex items-center justify-between gap-2'>
                        <Avatar className='w-12 h-12 sm:w-14 sm:h-14 rounded-full shadow-project-card'>
                            <AvatarImage src={comment.user.profile_picture} />
                            <AvatarFallback className='text-2xl bg-neutral-200'>
                                {comment.user.first_name && comment.user.last_name
                                    ? comment.user.first_name.charAt(0).toUpperCase()
                                    : comment.user.username.charAt(0).toUpperCase()}
                            </AvatarFallback>
                        </Avatar>
                        <p className='font-medium text-blue-500 whitespace-nowrap'>
                            {comment.user.first_name && comment.user.last_name
                                ? `${comment.user.first_name} ${comment.user.last_name}`
                                : comment.user.username}
                            :
                        </p>
                    </div>
                    <div className='2xl:hidden'>
                        <TicketCommentButtons comment={comment} handleEditComment={handleEditComment} handleDeleteComment={handleDeleteComment} />
                    </div>
                </div>
                <p className='text-sm sm:text-base'>{comment.content}</p>
            </div>
            <div className='hidden 2xl:block'>
                <TicketCommentButtons comment={comment} handleEditComment={handleEditComment} handleDeleteComment={handleDeleteComment} />
            </div>
        </li>
    );
};

export default TicketComment;
