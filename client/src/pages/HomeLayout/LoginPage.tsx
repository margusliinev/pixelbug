import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import z from 'zod';

import { MemberCheck, Spinner } from '@/components';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useLoginMutation } from '@/features/api/apiSlice';
import { DefaultAPIError } from '@/utils/types';
import { loginFormSchema } from '@/utils/zodSchemas';

import logo from '../../assets/logo.svg';

const LoginPage = () => {
    const [login, { isLoading }] = useLoginMutation();
    const navigate = useNavigate();

    const form = useForm<z.infer<typeof loginFormSchema>>({
        resolver: zodResolver(loginFormSchema),
        defaultValues: {
            email: '',
            password: '',
        },
    });

    const handleSubmit = (values: z.infer<typeof loginFormSchema>) => {
        if (loginFormSchema.safeParse(values).success) {
            login(values)
                .unwrap()
                .then((res) => {
                    if (res.success) {
                        navigate('/app');
                    }
                    return;
                })
                .catch((error: DefaultAPIError) => {
                    form.setError('email', { message: error.data.msg });
                    form.setError('password', { message: error.data.msg });
                });
        }
    };

    return (
        <main className='grid h-screen w-screen place-content-center'>
            <div className='mx-auto w-screen-90 max-w-md mb-32'>
                <Form {...form}>
                    <div className='mb-4 grid place-content-center mx-auto max-w-sm'>
                        <img src={logo} alt='logo' />
                    </div>
                    <div className='mx-auto max-w-sm'>
                        <h1 className='mb-1 text-2xl font-semibold text-center'>Welcome back!</h1>
                        <p className='text-sm text-gray-600 mb-4 text-center'>Please enter your credentials to sign in!</p>
                    </div>
                    <form onSubmit={form.handleSubmit(handleSubmit)} className='mx-auto grid max-w-sm space-y-4' noValidate>
                        <FormField
                            name='email'
                            render={({ field }) => (
                                <FormItem>
                                    <FormMessage className='text-center font-medium' />
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input
                                            type='email'
                                            {...field}
                                            onFocus={() => {
                                                form.clearErrors();
                                            }}
                                        />
                                    </FormControl>
                                </FormItem>
                            )}
                        ></FormField>
                        <FormField
                            name='password'
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Password</FormLabel>
                                    <FormControl>
                                        <Input
                                            type='password'
                                            {...field}
                                            onFocus={() => {
                                                form.clearErrors();
                                            }}
                                        />
                                    </FormControl>
                                </FormItem>
                            )}
                        ></FormField>
                        <Button type='submit' size={'sm'} disabled={isLoading}>
                            {isLoading ? <Spinner /> : 'Sign In'}
                        </Button>
                        <MemberCheck to={'/register'} question={"Don't have an account?"} text={'Register'} />
                    </form>
                </Form>
            </div>
        </main>
    );
};

export default LoginPage;
