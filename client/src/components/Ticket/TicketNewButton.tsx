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

const TicketNewButton = ({ size }: { size: string }) => {
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
                        navigate(`/app/projects/${res.ticket.project_id}/ticket/${res.ticket.ticket_id}`);
                    }
                })
                .catch(async (error: DefaultAPIError) => {
                    if (error.status === 401) {
                        await dispatch(logoutUser());
                        navigate('/auth/login');
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
            <DialogTrigger
                className={
                    size === 'sm'
                        ? 'bg-primary text-white transition-colors w-fit h-9 px-3 py-2 rounded-sm text-sm font-medium hover:bg-primary-hover-dark whitespace-nowrap'
                        : size === 'md'
                        ? 'bg-primary text-white transition-colors w-fit h-10 px-3 py-2 rounded-md text-sm font-medium hover:bg-primary-hover-dark whitespace-nowrap'
                        : 'bg-primary text-white transition-colors w-fit h-10 px-3 py-2 rounded-md text-sm font-medium hover:bg-primary-hover-dark whitespace-nowrap flex items-center gap-1'
                }
            >
                {size === 'sm' ? (
                    'New Ticket'
                ) : size === 'md' ? (
                    'New Ticket'
                ) : (
                    <>
                        <svg
                            xmlns='http://www.w3.org/2000/svg'
                            fill='none'
                            viewBox='0 0 24 24'
                            strokeWidth='2'
                            stroke='currentColor'
                            className='w-5 h-5'
                        >
                            <path strokeLinecap='round' strokeLinejoin='round' d='M12 4.5v15m7.5-7.5h-15' />
                        </svg>
                        <span className='font-medium text-sm'>New Ticket</span>
                    </>
                )}
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
                                    <Select onValueChange={field.onChange} defaultValue={field.value} disabled={data && data?.projects.length < 1}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue
                                                    placeholder={
                                                        data && data.projects.length < 1 ? "You don't have any projects" : 'Choose a project'
                                                    }
                                                />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent className='max-h-40 overflow-y-auto'>
                                            {data &&
                                                data.projects.map((project) => {
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
                                        <Input type='text' {...field} disabled={data && data?.projects.length < 1} />
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
                                        <Textarea className='h-32' {...field} disabled={data && data?.projects.length < 1} />
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
                                            <SelectTrigger disabled={data && data?.projects.length < 1}>
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
