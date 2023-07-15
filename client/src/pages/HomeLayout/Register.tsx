import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import z from 'zod';

import { MemberCheck, Spinner } from '@/components';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
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
                        navigate('/');
                    }
                    return;
                })
                .catch((error: DefaultAPIError) => {
                    if (error.data.type === 'username') {
                        form.setError('username', { message: error.data.msg });
                    } else if (error.data.type === 'email') {
                        form.setError('email', { message: error.data.msg });
                    } else if (error.data.type === 'password') {
                        form.setError('password', { message: error.data.msg });
                    } else {
                        return;
                    }
                });
        }
    };

    return (
        <main className='grid h-screen w-screen place-content-center'>
            <div className='mx-auto w-screen-90 max-w-md'>
                <Form {...form}>
                    <div className='mb-4 grid place-content-center mx-auto max-w-sm'>
                        <img src={logo} alt='logo' />
                    </div>
                    <div className='mx-auto max-w-sm'>
                        <h1 className='mb-1 text-center text-2xl font-semibold'>Create an account</h1>
                        <p className='text-sm text-neutral-500 mb-4 text-center'>And lets get you started with your free trial</p>
                    </div>
                    <form onSubmit={form.handleSubmit(submitForm)} className='mx-auto grid max-w-sm space-y-4' noValidate>
                        <FormField
                            name='username'
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Username</FormLabel>
                                    <FormControl>
                                        <Input type='text' placeholder='Username' {...field} />
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
                                        <Input type='email' placeholder='Email' {...field} />
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
                                        <Input type='password' placeholder='Password' {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        ></FormField>
                        <Button type='submit' size={'sm'} disabled={isLoading}>
                            {isLoading ? <Spinner /> : 'Sign Up'}
                        </Button>
                        <MemberCheck to='/login' question='Already have an account?' text='Login' />
                    </form>
                </Form>
            </div>
        </main>
    );
};

export default RegisterPage;
