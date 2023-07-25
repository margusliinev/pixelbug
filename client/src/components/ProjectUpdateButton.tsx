/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { zodResolver } from '@hookform/resolvers/zod';
import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import z from 'zod';

import {
    Button,
    Calendar,
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
    Popover,
    PopoverContent,
    PopoverTrigger,
    Textarea,
} from '@/components/ui';
import { useUpdateProjectMutation } from '@/features/api/apiSlice';
import { logoutUser } from '@/features/user/userSlice';
import { useAppDispatch } from '@/utils/hooks';
import { DefaultAPIError, ProjectAPIResponse } from '@/utils/types';
import { updateProjectFormSchema } from '@/utils/zodSchemas';

import { SpinnerButton } from '.';
import { useToast } from './ui/use-toast';

const ProjectUpdateButton = ({ data }: { data: ProjectAPIResponse }) => {
    const [updateProject, { isLoading }] = useUpdateProjectMutation();
    const [open, setOpen] = useState(false);
    const { project_id } = useParams();
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { toast } = useToast();

    const form = useForm<z.infer<typeof updateProjectFormSchema>>({
        resolver: zodResolver(updateProjectFormSchema),
        defaultValues: {
            title: data.project.title,
            description: data.project.description,
            start_date: new Date(data.project.start_date).setHours(0, 0, 0, 0),
            end_date: new Date(data.project.end_date).setHours(0, 0, 0, 0),
        },
    });

    const submitForm = async (values: z.infer<typeof updateProjectFormSchema>) => {
        if (updateProjectFormSchema.safeParse(values).success) {
            await updateProject({ values, project_id: project_id || '' })
                .unwrap()
                .then((res) => {
                    if (res.success) {
                        form.reset();
                        toast({
                            title: 'Successfully updated the project',
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
                        title: 'Failed to updated the project',
                        description: 'Please try again later',
                        variant: 'destructive',
                    });
                });
        }
    };

    // This useEffect is necessary to update the data in the update project modal after we have first updated the project

    useEffect(() => {
        if (data.project) {
            form.reset({
                title: data.project.title,
                description: data.project.description,
                start_date: new Date(data.project.start_date).setHours(0, 0, 0, 0),
                end_date: new Date(data.project.end_date).setHours(0, 0, 0, 0),
            });
        }
    }, [data, form]);

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger className='bg-primary text-white transition-colors w-fit px-3 py-2 rounded-md text-sm font-medium hover:bg-primary-hover-dark'>
                Update Project
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Update Project</DialogTitle>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(submitForm)} className='grid space-y-6' noValidate>
                        <FormField
                            name='title'
                            render={({ field }) => (
                                <FormItem className='px-1'>
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
                                <FormItem className='px-1'>
                                    <FormLabel>Description</FormLabel>
                                    <FormControl>
                                        <Textarea className='h-64' {...field} />
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
                                                        <Button variant={'outline'} className='w-52 sm:max-w-xs'>
                                                            {field.value ? format(field.value, 'PPP') : <span>Pick a date</span>}
                                                            <CalendarIcon className='ml-auto h-4 w-4 opacity-50' />
                                                        </Button>
                                                    </FormControl>
                                                </PopoverTrigger>
                                                <PopoverContent className='w-auto p-0' align='start'>
                                                    <Calendar
                                                        mode='single'
                                                        selected={field.value}
                                                        onSelect={field.onChange}
                                                        initialFocus
                                                        disabled={(date) =>
                                                            date < new Date(Date.now() - 86400000) || date > form.getValues('end_date')
                                                        }
                                                    />
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
                                                        <Button variant={'outline'} className='w-52 sm:max-w-xs'>
                                                            {field.value ? format(field.value, 'PPP') : <span>Pick a date</span>}
                                                            <CalendarIcon className='ml-auto h-4 w-4 opacity-50' />
                                                        </Button>
                                                    </FormControl>
                                                </PopoverTrigger>
                                                <PopoverContent className='w-auto p-0' align='start'>
                                                    <Calendar
                                                        mode='single'
                                                        selected={field.value}
                                                        onSelect={field.onChange}
                                                        initialFocus
                                                        disabled={(date) =>
                                                            date < form.getValues('start_date') || form.getValues('start_date') === null
                                                        }
                                                    />
                                                </PopoverContent>
                                            </Popover>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <Button type='submit' className='mt-4 w-full xs-550:w-36'>
                                {isLoading ? <SpinnerButton /> : 'Update Project'}
                            </Button>
                        </div>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
};

export default ProjectUpdateButton;
