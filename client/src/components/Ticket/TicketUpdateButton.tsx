import { zodResolver } from '@hookform/resolvers/zod';
import { ChangeEvent, useState } from 'react';
import { useForm } from 'react-hook-form';
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
import { useGetProjectUsersQuery } from '@/features/api/apiSlice';
import { PriorityEnum, StatusEnum, TicketPage } from '@/utils/types';

const TicketUpdateButton = ({ ticket }: { ticket: TicketPage }) => {
    const [open, setOpen] = useState(false);
    const { data } = useGetProjectUsersQuery(ticket.project_id.toString());

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
        assigned_user: z
            .enum(AssignedUserEnum)
            .optional()
            .refine((value) => value !== undefined, { message: 'Please select a developer' }),
    });

    const form = useForm<z.infer<typeof updateTicketFormSchema>>({
        resolver: zodResolver(updateTicketFormSchema),
        defaultValues: {
            title: ticket.title,
            description: ticket.description,
            priority: ticket.priority,
            status: ticket.status,
            assigned_user: ticket.assigned_user_id ? ticket.assigned_user_id.toString() : undefined,
        },
    });

    const submitForm = (values: z.infer<typeof updateTicketFormSchema>) => {
        if (updateTicketFormSchema.safeParse(values).success) {
            console.log(values);
        }
    };

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
                            name='assigned_user'
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
                            Update Ticket
                        </Button>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
};

export default TicketUpdateButton;
