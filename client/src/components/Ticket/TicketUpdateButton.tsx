import { zodResolver } from '@hookform/resolvers/zod';
import { ChangeEvent, useEffect, useState } from 'react';
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
import { useGetProjectUsersQuery, useUpdateTicketMutation } from '@/features/api/apiSlice';
import { logoutUser } from '@/features/user/userSlice';
import { useAppDispatch } from '@/utils/hooks';
import { DefaultAPIError, PriorityEnum, StatusEnum, Ticket } from '@/utils/types';

import { SpinnerButton } from '..';
import { useToast } from '../ui/use-toast';

const TicketUpdateButton = ({ ticket }: { ticket: Ticket }) => {
    const { data } = useGetProjectUsersQuery(ticket.project_id.toString());
    const [updateTicket, { isLoading }] = useUpdateTicketMutation();
    const [open, setOpen] = useState(false);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { toast } = useToast();

    const projectUsers = data?.projectUsers.map((user) => {
        return user.user_id.toString();
    });

    const PriorityEnum = ['low', 'medium', 'high', 'critical'] as const;
    const StatusEnum = ['unassigned', 'assigned', 'in_development', 'on_hold', 'resolved'] as const;
    const AssignedUserEnum = [ticket.assigned_user_id ? ticket.assigned_user_id.toString() : '', ...(projectUsers ?? '')] as const;

    const updateTicketFormSchema = z.object({
        title: z.string().trim().min(1, { message: 'Please enter ticket title' }),
        description: z.string().trim().min(1, { message: 'Please enter ticket description' }),
        priority: z.enum(PriorityEnum).refine((value) => PriorityEnum.includes(value), { message: 'Please select ticket priority' }),
        status: z.enum(StatusEnum).refine((value) => StatusEnum.includes(value), { message: 'Please select ticket status' }),
        assigned_user_id: z
            .enum(AssignedUserEnum)
            .optional()
            .refine((value) => value, { message: 'Please select a developer' }),
        completed_date: z.date().optional(),
    });

    const form = useForm<z.infer<typeof updateTicketFormSchema>>({
        resolver: zodResolver(updateTicketFormSchema),
        defaultValues: {
            title: ticket.title,
            description: ticket.description,
            priority: ticket.priority,
            status: ticket.status,
            assigned_user_id: ticket.assigned_user_id ? ticket.assigned_user_id.toString() : undefined,
        },
    });

    const submitForm = async (values: z.infer<typeof updateTicketFormSchema>) => {
        if (updateTicketFormSchema.safeParse(values).success) {
            if (values.status === 'resolved') {
                values.completed_date = new Date(Date.now());
            }
            await updateTicket({ values, ticket_id: ticket.ticket_id.toString() || '' })
                .unwrap()
                .then((res) => {
                    if (res.success) {
                        form.reset();
                        toast({
                            title: 'Successfully updated the ticket',
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
                        title: 'Failed to updated the ticket',
                        description: 'Please try again later',
                        variant: 'destructive',
                    });
                });
        }
    };

    // This useEffect is necessary to update the data in the update ticket modal after we have first updated the ticket

    useEffect(() => {
        if (ticket) {
            form.reset({
                title: ticket.title,
                description: ticket.description,
                priority: ticket.priority,
                status: ticket.status,
                assigned_user_id: ticket.assigned_user_id ? ticket.assigned_user_id.toString() : undefined,
            });
        }
    }, [ticket, form]);

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger className='bg-primary text-white transition-colors w-fit px-3 py-2 rounded-md text-sm font-medium hover:bg-primary-hover-dark'>
                Update Ticket
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Update Ticket</DialogTitle>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(submitForm)} className='grid space-y-6' noValidate>
                        <FormField
                            name='title'
                            render={({ field }) => (
                                <FormItem className='px-1'>
                                    <FormLabel>Ticket Title</FormLabel>
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
                                <FormItem className='px-1'>
                                    <FormLabel>Ticket Description</FormLabel>
                                    <FormControl>
                                        <Textarea className='h-64' {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name='assigned_user_id'
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Developer</FormLabel>
                                    <Select
                                        onValueChange={(value: string | ChangeEvent<Element>) => field.onChange(value)}
                                        defaultValue={field.value}
                                        disabled={data && data.projectUsers.length < 1}
                                    >
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue
                                                    placeholder={
                                                        data && data.projectUsers.length < 1
                                                            ? 'There are no developers in your project'
                                                            : 'Assign ticket to a developer'
                                                    }
                                                />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent className='max-h-40 overflow-y-auto'>
                                            {data &&
                                                data.projectUsers.map((user) => {
                                                    return (
                                                        <SelectItem key={user.user_id} value={`${user.user_id}`} className='capitalize'>
                                                            {user.first_name && user.last_name
                                                                ? `${user.first_name} ${user.last_name}`
                                                                : user.username}
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
                        <FormField
                            control={form.control}
                            name='status'
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Status</FormLabel>
                                    <Select
                                        onValueChange={(value: string | ChangeEvent<Element>) => field.onChange(value as StatusEnum)}
                                        defaultValue={field.value}
                                    >
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder='Choose ticket status' />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            <SelectItem value='unassigned'>Unassigned</SelectItem>
                                            <SelectItem value='assigned'>Assigned</SelectItem>
                                            <SelectItem value='in_development'>In Development</SelectItem>
                                            <SelectItem value='on_hold'>On Hold</SelectItem>
                                            <SelectItem value='resolved'>Resolved</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button type='submit' className='mt-4 w-full xs-550:w-32'>
                            {isLoading ? <SpinnerButton /> : 'Update Ticket'}
                        </Button>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
};

export default TicketUpdateButton;
