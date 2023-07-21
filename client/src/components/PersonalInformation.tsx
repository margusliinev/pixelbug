import { zodResolver } from '@hookform/resolvers/zod';
import moment from 'moment';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import z from 'zod';

import { ButtonSpinner } from '@/components';
import { Button, Form, FormControl, FormField, FormItem, FormLabel, FormMessage, Input } from '@/components/ui';
import { useToast } from '@/components/ui/use-toast';
import { useLogoutMutation, useUpdateUserProfileMutation } from '@/features/api/apiSlice';
import { setUser } from '@/features/user/userSlice';
import { useAppDispatch, useAppSelector } from '@/utils/hooks';
import { DefaultAPIError, User } from '@/utils/types';
import { profileFormSchema } from '@/utils/zodSchemas';

import ChangeAvatar from './ChangeAvatar';

const PersonalInformation = () => {
    const { toast } = useToast();
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const [updateUserProfile, { isLoading }] = useUpdateUserProfileMutation();
    const [logout] = useLogoutMutation();
    const { user } = useAppSelector((store) => store.user);
    const { first_name, last_name, username, email, job_title } = user as User;

    const date = user?.updated_at.toLocaleString('en-EU', { timeZone: 'gmt' });
    const formattedDate = moment(date).format('Do MMMM');

    const form = useForm<z.infer<typeof profileFormSchema>>({
        resolver: zodResolver(profileFormSchema),
        defaultValues: {
            first_name: first_name || '',
            last_name: last_name || '',
            username: username || '',
            email: email || '',
            job_title: job_title || '',
        },
    });

    const submitForm = async (values: z.infer<typeof profileFormSchema>) => {
        if (profileFormSchema.safeParse(values).success) {
            await updateUserProfile(values)
                .unwrap()
                .then((res) => {
                    if (res.success) {
                        dispatch(setUser(res.user));
                        toast({
                            title: 'Profile was successfully updated',
                        });
                    }
                })
                .catch((error: DefaultAPIError) => {
                    if (error.status === 401) {
                        dispatch(setUser(null));
                        logout(undefined).finally(() => {
                            navigate('/');
                        });
                    }
                    if (error.data.type === 'username') {
                        form.setError('username', { message: error.data.msg });
                    } else if (error.data.type === 'email') {
                        form.setError('email', { message: error.data.msg });
                    } else if (error.data.type === 'first_name') {
                        form.setError('first_name', { message: error.data.msg });
                    } else if (error.data.type === 'last_name') {
                        form.setError('last_name', { message: error.data.msg });
                    } else if (error.data.type === 'job_title') {
                        form.setError('job_title', { message: error.data.msg });
                    } else {
                        return;
                    }
                });
        }
    };
    return (
        <>
            <div>
                <h1 className='mb-1 text-2xl font-semibold flex items-center gap-2'>
                    Personal Information
                    {user?.created_at === user?.updated_at ? (
                        <span className='text-sm text-destructive font-medium mt-1 whitespace-nowrap hidden sm:block'>(Profile not complete)</span>
                    ) : (
                        <span className='text-sm text-neutral-500 font-normal mt-1 whitespace-nowrap hidden sm:block'>
                            Last update: {formattedDate}
                        </span>
                    )}
                </h1>
                <p className='text-sm text-gray-600 mb-4'>Use a permanent address where you can receive mail.</p>
            </div>
            <ChangeAvatar />
            <Form {...form}>
                <form onSubmit={form.handleSubmit(submitForm)} className='grid max-w-xl space-y-4 w-full' noValidate>
                    <div className='grid grid-cols-2 gap-4'>
                        <FormField
                            name='first_name'
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>First Name</FormLabel>
                                    <FormControl>
                                        <Input type='text' {...field} className='capitalize' />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        ></FormField>
                        <FormField
                            name='last_name'
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Last Name</FormLabel>
                                    <FormControl>
                                        <Input type='text' {...field} className='capitalize' />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        ></FormField>
                    </div>
                    <FormField
                        name='username'
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Username</FormLabel>
                                <FormControl>
                                    <Input type='text' {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    ></FormField>
                    <FormField
                        name='email'
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <Input type='email' {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    ></FormField>
                    <FormField
                        name='job_title'
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Job Title</FormLabel>
                                <FormControl>
                                    <Input type='text' {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    ></FormField>
                    <Button type='submit' size={'sm'} className='w-36 p-5' disabled={isLoading}>
                        {isLoading ? <ButtonSpinner /> : 'Update Profile'}
                    </Button>
                </form>
            </Form>
        </>
    );
};

export default PersonalInformation;
