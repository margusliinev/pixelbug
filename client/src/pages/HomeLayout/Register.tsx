import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import z from 'zod';

import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';

import logo from '../../assets/logo.svg';

const formSchema = z.object({
    username: z.string().min(3).max(16),
    email: z.string().min(0).max(50).email(),
    password: z.string().min(8),
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

    const handleSubmit = (values: z.infer<typeof formSchema>) => {
        console.log(values);
    };

    return (
        <main className='grid h-screen w-screen place-content-center'>
            <div className='mx-auto w-screen-90 max-w-md'>
                <Form {...form}>
                    <div className='mb-4 grid place-content-center'>
                        <img src={logo} alt='logo' />
                    </div>
                    <h1 className='mb-4 text-center text-2xl font-semibold'>Sign up for an account</h1>
                    <form onSubmit={form.handleSubmit(handleSubmit)} className='mx-auto grid max-w-sm space-y-4'>
                        <FormField
                            name='username'
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Username</FormLabel>
                                    <FormControl>
                                        <Input type='text' placeholder='Username' {...field} required />
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
                                        <Input type='email' placeholder='Email' {...field} required />
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
                                        <Input type='password' placeholder='Password' {...field} required />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        ></FormField>
                        <Button type='submit' size={'sm'}>
                            Sign Up
                        </Button>
                        <div className='mt-4 flex justify-center gap-2'>
                            <p>Already have an account?</p>
                            <Link to='/login' className=' transition-color hover:text-primary-hover font-semibold text-primary'>
                                Login
                            </Link>
                        </div>
                    </form>
                </Form>
            </div>
        </main>
    );
};

export default RegisterPage;
