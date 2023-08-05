import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import z from 'zod';

import { HomeNavbar, MemberCheck, SpinnerButton } from '@/components';
import { Button, Card, Form, FormControl, FormField, FormItem, FormLabel, FormMessage, Input } from '@/components/ui';
import { useRegisterMutation } from '@/features/api/apiSlice';
import { DefaultAPIError } from '@/utils/types';
import { registerFormSchema } from '@/utils/zodSchemas';

import logo from '../../assets/logo.svg';

const RegisterPage = () => {
    const navigate = useNavigate();
    const [register, { isLoading }] = useRegisterMutation();

    const form = useForm<z.infer<typeof registerFormSchema>>({
        resolver: zodResolver(registerFormSchema),
        defaultValues: {
            username: '',
            email: '',
            password: '',
        },
    });

    const submitForm = (values: z.infer<typeof registerFormSchema>) => {
        if (registerFormSchema.safeParse(values).success) {
            register(values)
                .unwrap()
                .then((res) => {
                    if (res.success) {
                        navigate('/app');
                    }
                    return;
                })
                .catch((error: DefaultAPIError) => {
                    if (error.data.type === 'username') {
                        form.setError('username', { message: error.data.msg });
                    } else if (error.data.type === 'email') {
                        form.setError('email', { message: error.data.msg });
                    } else if (error.data.type === 'newPassword') {
                        form.setError('password', { message: error.data.msg });
                    } else {
                        return;
                    }
                });
        }
    };

    return (
        <>
            <HomeNavbar text='Already have an account?' link='/auth/login' />
            <main className='relative isolate px-6 pt-14 lg:px-8'>
                <div className='absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80' aria-hidden='true'>
                    <div className='relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#059669] to-[#d4d4d4] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]'></div>
                </div>
                <div
                    className='absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]'
                    aria-hidden='true'
                >
                    <div className='relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#059669] to-[#d4d4d4] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]'></div>
                </div>
                <div className='mx-auto max-w-md mt-20'>
                    <Card className='px-8 py-12 bg-white/60 border-0 shadow-2xl'>
                        <Form {...form}>
                            <div className='mb-4 grid place-content-center mx-auto max-w-sm'>
                                <img src={logo} alt='logo' />
                            </div>
                            <div className='mx-auto max-w-sm'>
                                <h1 className='mb-1 text-center text-2xl font-semibold'>Create an account</h1>
                                <p className='text-sm text-gray-600 mb-4 text-center'>And lets get you started with your free trial</p>
                            </div>
                            <form onSubmit={form.handleSubmit(submitForm)} className='mx-auto grid max-w-sm space-y-4' noValidate>
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
                                    name='password'
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Password</FormLabel>
                                            <FormControl>
                                                <Input type='password' {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                ></FormField>
                                <Button type='submit' size={'sm'} disabled={isLoading}>
                                    {isLoading ? <SpinnerButton /> : 'Sign Up'}
                                </Button>
                                <MemberCheck to='/auth/login' question='Already have an account?' text='Login' />
                            </form>
                        </Form>
                    </Card>
                </div>
            </main>
        </>
    );
};

export default RegisterPage;
