import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { z } from 'zod';

import { Button, Form, FormControl, FormField, FormItem, FormLabel, FormMessage, Textarea } from '@/components/ui';
import { useCreateCommentMutation } from '@/features/api/apiSlice';
import { logoutUser } from '@/features/user/userSlice';
import { useAppDispatch } from '@/utils/hooks';
import { Comment, DefaultAPIError } from '@/utils/types';
import { commentFormSchema } from '@/utils/zodSchemas';

import { CommentsList, SpinnerButton } from '..';
import { useToast } from '../ui/use-toast';

const Comments = ({ comments }: { comments: Comment[] }) => {
    const { ticket_id } = useParams();
    const [createComment, { isLoading }] = useCreateCommentMutation();
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { toast } = useToast();

    const form = useForm<z.infer<typeof commentFormSchema>>({
        resolver: zodResolver(commentFormSchema),
        defaultValues: {
            content: '',
        },
    });

    const submitForm = async (values: z.infer<typeof commentFormSchema>) => {
        if (commentFormSchema.safeParse(values).success) {
            await createComment({ values, ticket_id: ticket_id || '' })
                .unwrap()
                .then((res) => {
                    if (res.success) {
                        form.reset();
                        toast({
                            title: 'Comment sent',
                        });
                    }
                })
                .catch(async (error: DefaultAPIError) => {
                    if (error.status === 401) {
                        await dispatch(logoutUser());
                        navigate('/auth/login');
                    }
                    toast({
                        title: 'Failed to comment on a ticket',
                        description: 'Please try again later',
                        variant: 'destructive',
                    });
                });
        }
    };

    return (
        <div className='rounded-md p-6 bg-white shadow-project-card my-4'>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(submitForm)} className='grid gap-4 mb-4 max-w-2xl' noValidate>
                    <FormField
                        control={form.control}
                        name='content'
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Leave a comment</FormLabel>
                                <FormControl>
                                    <Textarea {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button type='submit' className='xs-550:w-20 self-end '>
                        {isLoading ? <SpinnerButton /> : 'Submit'}
                    </Button>
                </form>
            </Form>
            <h1 className='text-lg font-semibold leading-7 mb-2'>
                Comments <span>{`(${comments.length})`}</span>
            </h1>
            <CommentsList comments={comments} />
        </div>
    );
};

export default Comments;
