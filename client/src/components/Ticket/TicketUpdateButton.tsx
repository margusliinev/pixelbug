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
import { PriorityEnum, StatusEnum, TicketPage } from '@/utils/types';
import { updateTicketFormSchema } from '@/utils/zodSchemas';

const TicketUpdateButton = ({ ticket }: { ticket: TicketPage }) => {
    const [open, setOpen] = useState(false);

    const form = useForm<z.infer<typeof updateTicketFormSchema>>({
        resolver: zodResolver(updateTicketFormSchema),
        defaultValues: {
            title: ticket.title,
            description: ticket.description,
            priority: ticket.priority,
            status: ticket.status,
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
