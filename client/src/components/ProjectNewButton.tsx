/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { zodResolver } from '@hookform/resolvers/zod';
import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
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
import { useCreateProjectMutation } from '@/features/api/apiSlice';
import { logoutUser } from '@/features/user/userSlice';
import { useAppDispatch } from '@/utils/hooks';
import { DefaultAPIError } from '@/utils/types';
import { createProjectFormSchema } from '@/utils/zodSchemas';

import { SpinnerButton } from '.';
import { useToast } from './ui/use-toast';

const ProjectNewButton = () => {
    const [createProject, { isLoading }] = useCreateProjectMutation();
    const [open, setOpen] = useState(false);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { toast } = useToast();

    const form = useForm<z.infer<typeof createProjectFormSchema>>({
        resolver: zodResolver(createProjectFormSchema),
        defaultValues: {
            title: '',
            description: '',
            start_date: null,
            end_date: null,
        },
    });

    const submitForm = async (values: z.infer<typeof createProjectFormSchema>) => {
        if (createProjectFormSchema.safeParse(values).success) {
            await createProject({
                title: values.title,
                description: values.description,
                start_date: values.start_date,
                end_date: values.end_date,
            })
                .unwrap()
                .then((res) => {
                    if (res.success) {
                        form.reset();
                        toast({
                            title: 'Project created successfully',
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
                        title: 'Failed to create the project',
                        description: 'Please try again later',
                        variant: 'destructive',
                    });
                });
        }
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger className='bg-primary text-white transition-colors w-fit h-10 px-4 py-2 rounded-md text-sm font-medium hover:bg-primary-hover-dark'>
                New Project
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>New Project</DialogTitle>
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
                        <div className='gap-4 items-end xs-550:flex xs-550:justify-between'>
                            <div className='grid items-end gap-4 md:flex'>
                                <FormField
                                    control={form.control}
                                    name='start_date'
                                    render={({ field }) => (
                                        <FormItem className='flex flex-col w-fit'>
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
                                                <PopoverContent className='w-auto p-0 absolute bottom-12' align='start'>
                                                    <Calendar
                                                        mode='single'
                                                        selected={field.value}
                                                        onSelect={field.onChange}
                                                        initialFocus
                                                        disabled={(date) =>
                                                            date < new Date(Date.now() - 86400000) ||
                                                            (date > form.getValues('end_date') && form.getValues('end_date') !== null)
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
                                                <PopoverContent className='w-auto p-0 absolute bottom-12' align='start'>
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
                            <Button type='submit' className='mt-4 w-full xs-550:w-32'>
                                {isLoading ? <SpinnerButton /> : 'Create Project'}
                            </Button>
                        </div>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
};

export default ProjectNewButton;
