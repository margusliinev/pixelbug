import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui';
import { Form, FormControl, FormField, FormItem, Input } from '@/components/ui';
import { useToast } from '@/components/ui/use-toast';
import { useDeleteCommentMutation, useUpdateCommentMutation } from '@/features/api/apiSlice';
import { logoutUser } from '@/features/user/userSlice';
import { useAppDispatch } from '@/utils/hooks';
import { Comment, DefaultAPIError } from '@/utils/types';

import { CommentButtons } from '..';

const SingleComment = ({ comment }: { comment: Comment }) => {
    const [enableEditing, setEnableEditing] = useState(false);
    const [updateComment] = useUpdateCommentMutation();
    const [deleteComment] = useDeleteCommentMutation();
    const dispatch = useAppDispatch();
    const { toast } = useToast();
    const { ticket_id } = useParams();

    const form = useForm({
        defaultValues: {
            content: comment.content || '',
        },
    });

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

    const handleEditComment = async (comment_id: number) => {
        await updateComment({ comment_id, ticket_id: ticket_id || '', content: form.getValues('content') })
            .unwrap()
            .then(() => {
                setEnableEditing(false);
                toast({
                    title: 'Comment was successfully updated',
                });
            })
            .catch(async (error: DefaultAPIError) => {
                if (error.status === 401) {
                    await dispatch(logoutUser());
                } else if (error.status === 403) {
                    toast({
                        title: 'You are not authorized to update this comment',
                        variant: 'destructive',
                    });
                } else {
                    toast({
                        title: 'Failed to update the comment',
                        description: 'Please try again later',
                        variant: 'destructive',
                    });
                }
            });
    };

    return (
        <li key={comment.comment_id} className='border-b border-neutral-200 block justify-between items-center first-of-type:border-t 2xl:flex'>
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
                        <CommentButtons
                            comment={comment}
                            enableEditing={enableEditing}
                            setEnableEditing={setEnableEditing}
                            handleEditComment={handleEditComment}
                            handleDeleteComment={handleDeleteComment}
                        />
                    </div>
                </div>
            </div>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(() => handleEditComment(comment.comment_id))} className='w-full max-w-none' noValidate>
                    <FormField
                        name='content'
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <Input
                                        type='text'
                                        className='w-full disabled:opacity-100 disabled:cursor-default disabled:ring-0 text-sm sm:text-base'
                                        {...field}
                                        disabled={!enableEditing}
                                    />
                                </FormControl>
                            </FormItem>
                        )}
                    ></FormField>
                </form>
            </Form>
            <div className='hidden 2xl:block'>
                <CommentButtons
                    comment={comment}
                    enableEditing={enableEditing}
                    setEnableEditing={setEnableEditing}
                    handleEditComment={handleEditComment}
                    handleDeleteComment={handleDeleteComment}
                />
            </div>
        </li>
    );
};

export default SingleComment;
