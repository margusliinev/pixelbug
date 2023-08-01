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
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui';
import { useUpdateTicketMutation } from '@/features/api/apiSlice';
import { logoutUser } from '@/features/user/userSlice';
import { useAppDispatch } from '@/utils/hooks';
import { DefaultAPIError, StatusEnum, TicketPage } from '@/utils/types';

import { SpinnerButton } from '..';
import { useToast } from '../ui/use-toast';

const TicketStatusUpdateButton = ({ ticket }: { ticket: TicketPage }) => {
    const [updateTicket, { isLoading }] = useUpdateTicketMutation();
    const [open, setOpen] = useState(false);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { toast } = useToast();

    const StatusEnum = ['unassigned', 'assigned', 'in_development', 'on_hold', 'resolved'] as const;

    const updateTicketFormSchema = z.object({
        status: z.enum(StatusEnum).refine((value) => StatusEnum.includes(value), { message: 'Please select ticket status' }),
    });

    const form = useForm<z.infer<typeof updateTicketFormSchema>>({
        resolver: zodResolver(updateTicketFormSchema),
        defaultValues: {
            status: ticket.status,
        },
    });

    const submitForm = async (ticketData: z.infer<typeof updateTicketFormSchema>) => {
        if (updateTicketFormSchema.safeParse(ticketData).success) {
            const values = {
                title: ticket.title,
                description: ticket.description,
                priority: ticket.priority,
                status: ticketData.status,
                assigned_user_id: ticket.assigned_user_id.toString(),
                completed_date: ticketData.status === 'resolved' ? new Date(Date.now()) : null,
            };
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
                status: ticket.status,
            });
        }
    }, [ticket, form]);

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger className='bg-primary text-white transition-colors w-fit px-3 py-2 rounded-md text-sm font-medium hover:bg-primary-hover-dark'>
                Update Status
            </DialogTrigger>
            <DialogContent className='max-w-lg'>
                <DialogHeader>
                    <DialogTitle>Update Status</DialogTitle>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(submitForm)} className='grid space-y-6' noValidate>
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
                            {isLoading ? <SpinnerButton /> : 'Update Status'}
                        </Button>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
};

export default TicketStatusUpdateButton;
