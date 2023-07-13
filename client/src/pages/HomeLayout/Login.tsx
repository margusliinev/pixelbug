import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import z from 'zod';

import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';

import logo from '../../assets/logo.svg';

const formSchema = z.object({
    email: z.string().min(0).max(50).email(),
    password: z.string().min(8),
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
        <main className='h-screen w-screen grid place-content-center'>
            <div className='w-screen-90 max-w-md mx-auto'>
                <Form {...form}>
                    <div className='grid place-content-center mb-4'>
                        <img src={logo} alt='logo' />
                    </div>
                    <h1 className='font-semibold text-2xl text-center mb-4'>Sign in to your account</h1>
                    <form onSubmit={form.handleSubmit(handleSubmit)} className='space-y-4 grid max-w-sm mx-auto'>
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
                            Submit
                        </Button>
                        <div className='flex justify-center mt-4 gap-2'>
                            <p>Don&apos;t have an account?</p>
                            <Link to='/register' className='text-base transition-color text-primary font-semibold hover:text-primary-hover'>
                                Register
                            </Link>
                        </div>
                    </form>
                </Form>
            </div>
        </main>
    );
};

export default LoginPage;
