import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button, Form, FormControl, FormField, FormItem, FormLabel, FormMessage, Textarea } from '@/components/ui';
import { createCommentFormSchema } from '@/utils/zodSchemas';

const TicketComments = () => {
    const form = useForm<z.infer<typeof createCommentFormSchema>>({
        resolver: zodResolver(createCommentFormSchema),
        defaultValues: {
            content: '',
        },
    });

    const submitForm = (values: z.infer<typeof createCommentFormSchema>) => {
        if (createCommentFormSchema.safeParse(values).success) {
            console.log(values);
        }
    };

    return (
        <div className='rounded-md p-6 bg-white shadow-project-card my-4'>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(submitForm)} className='grid gap-4 mb-4' noValidate>
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
                        Submit
                    </Button>
                </form>
            </Form>
            <h1 className='text-lg font-semibold leading-7 mb-2'>Comments (1)</h1>
            <hr className='border-neutral-200 mb-4' />
        </div>
    );
};

export default TicketComments;
