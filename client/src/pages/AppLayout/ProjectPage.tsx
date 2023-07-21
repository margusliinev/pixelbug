import { zodResolver } from '@hookform/resolvers/zod';
import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';
import moment from 'moment';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate, useParams } from 'react-router-dom';
import z from 'zod';

import { ButtonSpinner, PageSpinner, ProjectTeam } from '@/components';
import {
    Button,
    Calendar,
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
    Input,
    Popover,
    PopoverContent,
    PopoverTrigger,
    Textarea,
} from '@/components/ui';
import { useGetSingleProjectQuery } from '@/features/api/apiSlice';
import { createProjectFormSchema } from '@/utils/zodSchemas';

const ProjectPage = () => {
    const navigate = useNavigate();
    const { project_id } = useParams();
    const [showEditModal, setShowEditModal] = useState(false);
    const [enableEditing, setEnableEditing] = useState(false);
    const { data, isLoading } = useGetSingleProjectQuery(project_id || '');

    const form = useForm<z.infer<typeof createProjectFormSchema>>({
        resolver: zodResolver(createProjectFormSchema),
        defaultValues: {
            title: '',
            description: '',
            start_date: moment.utc().toDate(),
            end_date: moment.utc().toDate(),
        },
    });

    useEffect(() => {
        if (data) {
            form.reset({
                title: data.project.title,
                description: data.project.description,
                start_date: moment(data.project.start_date).toDate(),
                end_date: moment(data.project.end_date).toDate(),
            });
        }
    }, [data, form]);

    const submitForm = (values: z.infer<typeof createProjectFormSchema>) => {
        if (createProjectFormSchema.safeParse(values).success) {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
            console.log(values);
        }
    };

    if (isLoading) {
        return (
            <main className='w-full min-h-screen-minus-nav grid place-items-center'>
                <PageSpinner />
            </main>
        );
    }

    if (!data) {
        setTimeout(() => {
            navigate('/app/projects');
        }, 500);
        return (
            <main className='w-full min-h-screen-minus-nav grid place-items-center'>
                <PageSpinner />
            </main>
        );
    }

    return (
        <main className='px-6 py-10 xs:px-8 lg:px-12 xl:px-16 min-min-h-screen-minus-nav-minus-nav'>
            <Link to={'/app/projects'} className='flex items-center gap-2 text-2xl font-medium text-primary-hover-dark group'>
                <svg
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    strokeWidth='2'
                    stroke='currentColor'
                    className='w-6 h-6 transition-colors group-hover:text-primary-hover-light'
                >
                    <path strokeLinecap='round' strokeLinejoin='round' d='M11.25 9l-3 3m0 0l3 3m-3-3h7.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z' />
                </svg>
                <span>All Projects</span>
            </Link>
            <div className='shadow-project-card p-4 grid gap-4 my-4 rounded-md relative'>
                <div className='relative'>
                    <button className='absolute right-4 top-6 cursor-pointer z-50' onClick={() => setShowEditModal(!showEditModal)}>
                        <svg
                            xmlns='http://www.w3.org/2000/svg'
                            fill='none'
                            viewBox='0 0 24 24'
                            strokeWidth='1'
                            stroke='currentColor'
                            className='w-8 h-8'
                        >
                            <path
                                strokeLinecap='round'
                                strokeLinejoin='round'
                                d='M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z'
                            />
                        </svg>
                    </button>
                    {showEditModal && !enableEditing && (
                        <div className='absolute right-10 top-6 h-8 w-16 rounded-md border bg-background shadow-sm transition-opacity grid'>
                            <button
                                className='rounded-md transition-colors hover:bg-accent z-50'
                                onClick={() => {
                                    setShowEditModal(false);
                                    setEnableEditing(true);
                                }}
                            >
                                Edit
                            </button>
                        </div>
                    )}
                    {showEditModal && enableEditing && (
                        <div className='absolute right-10 top-6 h-8 w-16 rounded-md border bg-background shadow-sm transition-opacity grid'>
                            <button
                                className='rounded-md transition-colors hover:bg-accent z-50'
                                onClick={() => {
                                    setShowEditModal(false);
                                    setEnableEditing(false);
                                }}
                            >
                                Cancel
                            </button>
                        </div>
                    )}
                </div>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(submitForm)} className='grid space-y-6' noValidate>
                        <FormField
                            name='title'
                            render={({ field }) => (
                                <FormItem className='px-1'>
                                    <FormControl>
                                        <Input type='text' {...field} className='text-4xl h-fit font-semibold' disabled={!enableEditing} />
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
                                    <FormControl>
                                        <Textarea className='h-96 text-md' {...field} disabled={!enableEditing} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <div className='gap-4 items-end xs-550:flex xs-550:justify-between'>
                            <div className='grid items-end gap-4 md:flex'>
                                <FormField
                                    control={form.control}
                                    name='start_date'
                                    render={({ field }) => (
                                        <FormItem className='flex flex-col px-1 w-fit'>
                                            <FormLabel>Start Date</FormLabel>
                                            <Popover>
                                                <PopoverTrigger asChild>
                                                    <FormControl>
                                                        <Button variant={'outline'} className='w-52 sm:max-w-xs' disabled={!enableEditing}>
                                                            {field.value ? format(field.value, 'PPP') : <span>Pick a date</span>}
                                                            <CalendarIcon className='ml-auto h-4 w-4 opacity-50' />
                                                        </Button>
                                                    </FormControl>
                                                </PopoverTrigger>
                                                <PopoverContent className='w-auto p-0' align='start'>
                                                    {/* eslint-disable-next-line @typescript-eslint/no-unsafe-assignment */}
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
                                        <FormItem className='flex flex-col px-1 w-fit'>
                                            <FormLabel>Deadline</FormLabel>
                                            <Popover>
                                                <PopoverTrigger asChild>
                                                    <FormControl>
                                                        <Button variant={'outline'} className='w-52 sm:max-w-xs' disabled={!enableEditing}>
                                                            {field.value ? format(field.value, 'PPP') : <span>Pick a date</span>}
                                                            <CalendarIcon className='ml-auto h-4 w-4 opacity-50' />
                                                        </Button>
                                                    </FormControl>
                                                </PopoverTrigger>
                                                <PopoverContent className='w-auto p-0' align='start'>
                                                    {/* eslint-disable-next-line @typescript-eslint/no-unsafe-assignment */}
                                                    <Calendar mode='single' selected={field.value} onSelect={field.onChange} initialFocus />
                                                </PopoverContent>
                                            </Popover>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <Button type='submit' className='mt-4 w-full xs-550:w-36'>
                                {isLoading ? <ButtonSpinner /> : 'Update Project'}
                            </Button>
                        </div>
                    </form>
                </Form>
            </div>
            <ProjectTeam data={data} />
        </main>
    );
};

export default ProjectPage;
