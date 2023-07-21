import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import z from 'zod';

import { ButtonSpinner } from '@/components';
import { Button, Form, FormControl, FormField, FormItem, FormLabel, FormMessage, Input } from '@/components/ui';
import { useToast } from '@/components/ui/use-toast';
import { useLogoutMutation, useUpdateUserPasswordMutation } from '@/features/api/apiSlice';
import { setUser } from '@/features/user/userSlice';
import { useAppDispatch } from '@/utils/hooks';
import { DefaultAPIError } from '@/utils/types';
import { updatePasswordFormSchema } from '@/utils/zodSchemas';

const ChangePassword = () => {
    const { toast } = useToast();
    const navigate = useNavigate();
    const [updateUserPassword, { isLoading }] = useUpdateUserPasswordMutation();
    const [logout] = useLogoutMutation();
    const dispatch = useAppDispatch();

    const form = useForm<z.infer<typeof updatePasswordFormSchema>>({
        resolver: zodResolver(updatePasswordFormSchema),
        defaultValues: {
            password: '',
            newPassword: '',
            confirmNewPassword: '',
        },
    });

    const submitForm = async (values: z.infer<typeof updatePasswordFormSchema>) => {
        if (updatePasswordFormSchema.safeParse(values).success) {
            await updateUserPassword(values)
                .unwrap()
                .then((res) => {
                    if (res.success) {
                        form.reset();
                        dispatch(setUser(res.user));
                        toast({
                            title: 'Password Successfully Updated!',
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
                    if (error.data.type === 'password') {
                        form.setError('password', { message: error.data.msg });
                    } else if (error.data.type === 'newPassword') {
                        form.setError('newPassword', { message: error.data.msg });
                    } else if (error.data.type === 'confirmNewPassword') {
                        form.setError('newPassword', { message: error.data.msg });
                        form.setError('confirmNewPassword', { message: error.data.msg });
                    } else {
                        return;
                    }
                });
        }
    };
    return (
        <>
            <Form {...form}>
                <div>
                    <h1 className='mb-1 text-2xl font-semibold'>Change password</h1>
                    <p className='text-sm text-gray-600 mb-4'>Update your password associated with your account.</p>
                </div>
                <form onSubmit={form.handleSubmit(submitForm)} className='grid max-w-xl space-y-4 w-full' noValidate>
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
                                    <Input type='password' {...field} onFocus={() => form.clearErrors()} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    ></FormField>
                    <FormField
                        name='confirmNewPassword'
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Confirm New Password</FormLabel>
                                <FormControl>
                                    <Input type='password' {...field} onFocus={() => form.clearErrors()} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    ></FormField>
                    <Button type='submit' size={'sm'} className='w-40 p-5' disabled={isLoading}>
                        {isLoading ? <ButtonSpinner /> : 'Update Password'}
                    </Button>
                </form>
            </Form>
        </>
    );
};

export default ChangePassword;
