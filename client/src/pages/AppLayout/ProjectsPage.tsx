import { zodResolver } from '@hookform/resolvers/zod';
import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';
import moment from 'moment';
import { useForm } from 'react-hook-form';
import z from 'zod';

import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Textarea } from '@/components/ui/textarea';
import { createProjectFormSchema } from '@/utils/zodSchemas';

const ProjectsPage = () => {
    const form = useForm<z.infer<typeof createProjectFormSchema>>({
        resolver: zodResolver(createProjectFormSchema),
        defaultValues: {
            title: '',
            description: '',
        },
    });

    const submitForm = (values: z.infer<typeof createProjectFormSchema>) => {
        if (createProjectFormSchema.safeParse(values).success) {
            const start_date_utc = moment(values.start_date).utc().toDate();
            const end_date_utc = moment(values.end_date).utc().toDate();
            console.log(values.title);
            console.log(values.description);
            console.log(start_date_utc);
            console.log(end_date_utc);
        }
    };
    return (
        <main className='grid px-6 py-4 xs:px-8 lg:px-12 xl:px-16'>
            <Dialog>
                <DialogTrigger className='bg-primary text-white w-fit h-10 px-4 py-2 rounded-md text-sm font-medium hover:bg-primary-hover-dark'>
                    Create Project
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Create Project</DialogTitle>
                    </DialogHeader>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(submitForm)} className='grid space-y-6' noValidate>
                            <FormField
                                name='title'
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Project Name</FormLabel>
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
                            <div className='grid gap-4 items-end sm:flex sm:justify-between'>
                                <div className='grid items-end gap-4 md:flex'>
                                    <FormField
                                        control={form.control}
                                        name='start_date'
                                        render={({ field }) => (
                                            <FormItem className='flex flex-col'>
                                                <FormLabel>Start Date</FormLabel>
                                                <Popover>
                                                    <PopoverTrigger asChild>
                                                        <FormControl>
                                                            <Button variant={'outline'} className='w-52 sm:max-w-xs'>
                                                                {field.value ? format(field.value, 'PPP') : <span>Pick a date</span>}
                                                                <CalendarIcon className='ml-auto h-4 w-4 opacity-50' />
                                                            </Button>
                                                        </FormControl>
                                                    </PopoverTrigger>
                                                    <PopoverContent className='w-auto p-0' align='start'>
                                                        <Calendar mode='single' selected={field.value} onSelect={field.onChange} initialFocus />
                                                    </PopoverContent>
                                                </Popover>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name='end_date'
                                        render={({ field }) => (
                                            <FormItem className='flex flex-col'>
                                                <FormLabel>End Date</FormLabel>
                                                <Popover>
                                                    <PopoverTrigger asChild>
                                                        <FormControl>
                                                            <Button variant={'outline'} className='w-52 sm:max-w-xs'>
                                                                {field.value ? format(field.value, 'PPP') : <span>Pick a date</span>}
                                                                <CalendarIcon className='ml-auto h-4 w-4 opacity-50' />
                                                            </Button>
                                                        </FormControl>
                                                    </PopoverTrigger>
                                                    <PopoverContent className='w-auto p-0' align='start'>
                                                        <Calendar mode='single' selected={field.value} onSelect={field.onChange} initialFocus />
                                                    </PopoverContent>
                                                </Popover>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                                <Button type='submit'>Create Project</Button>
                            </div>
                        </form>
                    </Form>
                </DialogContent>
            </Dialog>
        </main>
    );
};

export default ProjectsPage;
