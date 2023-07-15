import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import z from 'zod';

import { MemberCheck } from '@/components';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';

import logo from '../../assets/logo.svg';

// const usernameRegex = /^[a-zA-Z\d](?:[a-zA-Z\d]|-(?=[a-zA-Z\d])){3,16}$/;
// const emailRegex = /^[^\s@]{1,50}@[^\s@]+\.[^\s@]+$/;
// const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d!@#$%&*,.?]{8,50}$/;

const formSchema = z.object({
    username: z
        .string()
        .trim()
        .refine((username) => username.length >= 3 && username.length <= 16, {
            message: 'Username must be between 3 and 16 characters',
        })
        .refine((username) => !username.startsWith('-') && !username.endsWith('-'), {
            message: 'Username cannot start or end with a hyphen',
        })
        .refine((username) => /^[a-zA-Z-]+$/.test(username), {
            message: 'Username can only contain letters A-Z and hyphens (-)',
        }),
    email: z
        .string()
        .max(50, { message: 'Email must be under 50 characters' })
        .email({ message: 'Invalid Email' })
        .trim()
        .refine((email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email), {
            message: 'Invalid Email',
        }),
    password: z
        .string()
        .min(8, { message: 'Password must be at least 8 characters' })
        .max(50, { message: 'Password must be under 50 characters' })
        .trim()
        .refine((password) => /[A-Za-z]/.test(password), {
            message: 'Password must contain at least one letter',
        })
        .refine((password) => /\d/.test(password), {
            message: 'Password must contain at least one number',
        })
        .refine((password) => /^[A-Za-z\d!@#$%&*,.?]+$/.test(password), {
            message: 'Allowed special characters: !@#$%&*,.?',
        }),
});

const RegisterPage = () => {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            username: '',
            email: '',
            password: '',
        },
    });

    const submitForm = (values: z.infer<typeof formSchema>) => {
        console.log(values);
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
                        <Button type='submit' size={'sm'}>
                            Sign Up
                        </Button>
                        <MemberCheck to='/login' question='Already have an account?' text='Login' />
                    </form>
                </Form>
            </div>
        </main>
    );
};

export default RegisterPage;
