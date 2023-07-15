import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import z from 'zod';

import { MemberCheck } from '@/components';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';

import logo from '../../assets/logo.svg';

const formSchema = z.object({
    email: z.string().trim(),
    password: z.string().trim(),
});

const LoginPage = () => {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: '',
            password: '',
        },
    });

    const handleSubmit = (values: z.infer<typeof formSchema>) => {
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
                        <h1 className='mb-1 text-2xl font-semibold text-center'>Welcome back!</h1>
                        <p className='text-sm text-neutral-500 mb-4 text-center'>Please enter your credentials to sign in!</p>
                    </div>
                    <form onSubmit={form.handleSubmit(handleSubmit)} className='mx-auto grid max-w-sm space-y-4' noValidate>
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
                            Sign In
                        </Button>
                        <MemberCheck to={'/register'} question={"Don't have an account?"} text={'Register'} />
                    </form>
                </Form>
            </div>
        </main>
    );
};

export default LoginPage;
