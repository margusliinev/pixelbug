import { zodResolver } from '@hookform/resolvers/zod';
import { ChangeEvent, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import z from 'zod';

import {
    Button,
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
    Input,
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
    Textarea,
} from '@/components/ui';
import { useCreateTicketMutation, useGetAllProjectsQuery } from '@/features/api/apiSlice';
import { logoutUser } from '@/features/user/userSlice';
import { useAppDispatch } from '@/utils/hooks';
import { DefaultAPIError, PriorityEnum } from '@/utils/types';
import { createTicketFormSchema } from '@/utils/zodSchemas';

import { SpinnerButton } from '../../components';
import { useToast } from '../ui/use-toast';

const TicketNewButton = () => {
    const [createTicket, { isLoading }] = useCreateTicketMutation();
    const { data } = useGetAllProjectsQuery(undefined);
    const [open, setOpen] = useState(false);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { toast } = useToast();

    const form = useForm<z.infer<typeof createTicketFormSchema>>({
        resolver: zodResolver(createTicketFormSchema),
        defaultValues: {
            title: '',
            description: '',
        },
    });

    const submitForm = async (values: z.infer<typeof createTicketFormSchema>) => {
        if (createTicketFormSchema.safeParse(values).success) {
            await createTicket({
                project_id: Number(values.project_id),
                title: values.title,
                description: values.description,
                priority: values.priority,
            })
                .unwrap()
                .then((res) => {
                    if (res.success) {
                        form.reset();
                        toast({
                            title: 'Successfully created the ticket',
                        });
                        setOpen(false);
                    }
                })
                .catch(async (error: DefaultAPIError) => {
                    if (error.status === 401) {
                        await dispatch(logoutUser());
                        navigate('/');
                    }
                    toast({
                        title: 'Failed to create the ticket',
                        description: 'Please try again later',
                        variant: 'destructive',
                    });
                });
        }
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger className='bg-primary text-white transition-colors w-fit h-10 px-4 py-2 rounded-md text-sm font-medium hover:bg-primary-hover-dark'>
                New Ticket
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>New Ticket</DialogTitle>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(submitForm)} className='grid space-y-6' noValidate>
                        <FormField
                            control={form.control}
                            name='project_id'
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Project</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder='Choose a project' />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {data?.projects.map((project) => {
                                                return (
                                                    <SelectItem key={project.project_id} value={`${project.project_id}`} className='capitalize'>
                                                        {project.title}
                                                    </SelectItem>
                                                );
                                            })}
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            name='title'
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Title</FormLabel>
                                    <FormControl>
                                        <Input type='text' {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        ></FormField>
                        <FormField
                            control={form.control}
                            name='description'
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Description</FormLabel>
                                    <FormControl>
                                        <Textarea className='h-32' {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name='priority'
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Priority</FormLabel>
                                    <Select
                                        onValueChange={(value: string | ChangeEvent<Element>) => field.onChange(value as PriorityEnum)}
                                        defaultValue={field.value}
                                    >
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder='Choose ticket priority level' />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            <SelectItem value='low'>Low</SelectItem>
                                            <SelectItem value='medium'>Medium</SelectItem>
                                            <SelectItem value='high'>High</SelectItem>
                                            <SelectItem value='critical'>Critical</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button type='submit' className='mt-4 w-full xs-550:w-32'>
                            {isLoading ? <SpinnerButton /> : 'Create Ticket'}
                        </Button>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
};

export default TicketNewButton;
