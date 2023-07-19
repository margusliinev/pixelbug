import { zodResolver } from '@hookform/resolvers/zod';
import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';
import { Search } from 'lucide-react';
import moment from 'moment';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import z from 'zod';

import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Command, CommandGroup, CommandItem, CommandList } from '@/components/ui/command';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Textarea } from '@/components/ui/textarea';
import { useGetProjectUsersQuery } from '@/features/api/apiSlice';
import { createProjectFormSchema } from '@/utils/zodSchemas';

const initialState = {
    search: '',
};

const ProjectsPage = () => {
    const [state, setState] = useState(initialState);
    const { data } = useGetProjectUsersQuery(undefined);
    const users = data?.users.filter((user) => {
        const searchTerm = state.search.toLowerCase();
        return (
            (searchTerm && user.job_title.toLowerCase().includes(searchTerm)) ||
            (searchTerm && user.username.toLowerCase().includes(searchTerm)) ||
            (searchTerm && user.email.toLowerCase().includes(searchTerm))
        );
    });
    const form = useForm<z.infer<typeof createProjectFormSchema>>({
        resolver: zodResolver(createProjectFormSchema),
        defaultValues: {
            title: '',
            description: '',
            start_date: null,
            end_date: null,
        },
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const searchValue = e.target.value;
        setState({ search: searchValue });
    };

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
                <DialogTrigger className='bg-primary text-white transition-colors w-fit h-10 px-4 py-2 rounded-md text-sm font-medium hover:bg-primary-hover-dark'>
                    Create Project
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Create Project</DialogTitle>
                    </DialogHeader>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(submitForm)} className='grid space-y-6 relative' noValidate>
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
                            <Command>
                                <FormLabel className='mb-1'>Developers</FormLabel>
                                <div className='flex items-center border-b px-2'>
                                    <Search className='mr-2 h-4 w-4 shrink-0 opacity-50' />
                                    <input
                                        placeholder='Find developers by job title (Try Full-Stack Developer)'
                                        type='text'
                                        className='flex h-10 w-full rounded-md py-3 text-sm outline-none placeholder:text-neutral-500'
                                        value={state.search}
                                        onChange={handleChange}
                                    />
                                </div>
                                <CommandList
                                    className={
                                        users && users.length < 1
                                            ? 'absolute rounded-md bg-white z-50 top-[340px] w-full'
                                            : 'absolute rounded-md bg-white z-50 top-[340px] w-full border shadow-md'
                                    }
                                >
                                    {users && users.length < 1 ? null : (
                                        <CommandGroup heading='users' className='px-3'>
                                            {users &&
                                                users.map((user) => {
                                                    return (
                                                        <article
                                                            key={user.user_id}
                                                            className='border-b cursor-pointer last-of-type:border-none last-of-type:mb-2'
                                                        >
                                                            <CommandItem className='h-20'>
                                                                <div className='grid items-center gap-2 justify-between w-full pr-6 sm:flex'>
                                                                    <div>
                                                                        <div className='font-medium mb-1'>
                                                                            {user.first_name && user.last_name
                                                                                ? `${user.first_name} ${user.last_name}`
                                                                                : user.username}
                                                                        </div>
                                                                        <div>{user.email}</div>
                                                                    </div>
                                                                    <div>{user.job_title}</div>
                                                                </div>
                                                            </CommandItem>
                                                        </article>
                                                    );
                                                })}
                                        </CommandGroup>
                                    )}
                                </CommandList>
                            </Command>
                            <div className='gap-4 items-end sm:flex sm:justify-between'>
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
                                <Button type='submit' className='mt-4 w-full sm:w-fit'>
                                    Create Project
                                </Button>
                            </div>
                        </form>
                    </Form>
                </DialogContent>
            </Dialog>
        </main>
    );
};

export default ProjectsPage;
