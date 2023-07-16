import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import z from 'zod';

// import { Spinner } from '@/components';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useAppSelector } from '@/utils/hooks';
import { User } from '@/utils/types';
import { profileFormSchema } from '@/utils/zodSchemas';

import { ChangeAvatar } from '.';

const PersonalInformation = () => {
    const { user } = useAppSelector((store) => store.user);
    const { first_name, last_name, username, email, job_title } = user as User;
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

    const submitForm = (values: z.infer<typeof profileFormSchema>) => {
        if (profileFormSchema.safeParse(values).success) {
            console.log(values);
        }
    };
    return (
        <div className='grid px-6 py-4 xs:px-8 lg:px-12 xl:px-16'>
            <div>
                <h1 className='mb-1 text-2xl font-semibold'>Personal Information</h1>
                <p className='text-sm text-neutral-500 mb-4'>Use a permanent address where you can receive mail.</p>
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
                                        <Input type='text' {...field} />
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
                                        <Input type='text' {...field} />
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
                    <Button type='submit' size={'lg'} className='max-w-fit'>
                        Update Profile
                    </Button>
                </form>
            </Form>
        </div>
    );
};

export default PersonalInformation;
