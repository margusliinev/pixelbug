import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import z from 'zod';

import { Spinner } from '@/components';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { updatePasswordFormSchema } from '@/utils/zodSchemas';

const ChangePassword = () => {
    const form = useForm<z.infer<typeof updatePasswordFormSchema>>({
        resolver: zodResolver(updatePasswordFormSchema),
        defaultValues: {
            password: '',
            newPassword: '',
            confirmNewPassword: '',
        },
    });

    const submitForm = (values: z.infer<typeof updatePasswordFormSchema>) => {
        if (updatePasswordFormSchema.safeParse(values).success) {
            console.log(values);
        }
    };
    return (
        <div className='grid px-6 py-4 xs:px-8 lg:px-12 xl:px-16'>
            <Form {...form}>
                <div>
                    <h1 className='mb-1 text-2xl font-semibold'>Change password</h1>
                    <p className='text-sm text-neutral-500 mb-4'>Update your password associated with your account.</p>
                </div>
                <form onSubmit={form.handleSubmit(submitForm)} className='grid max-w-xl space-y-4 w-full' noValidate>
                    <div className='grid grid-cols-2 gap-4'>
                        <FormField
                            name='password'
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Current Password</FormLabel>
                                    <FormControl>
                                        <Input type='password' {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        ></FormField>
                        <FormField
                            name='newPassword'
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>New Password</FormLabel>
                                    <FormControl>
                                        <Input type='password' {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        ></FormField>
                    </div>
                    <FormField
                        name='confirmNewPassword'
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Confirm New Password</FormLabel>
                                <FormControl>
                                    <Input type='password' {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    ></FormField>
                    <Button type='submit' size={'lg'} className='max-w-fit'>
                        Update Password
                    </Button>
                </form>
            </Form>
        </div>
    );
};

export default ChangePassword;
