import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import z from 'zod';

import { MemberCheck, SpinnerButton } from '@/components';
import { Button, Card, Form, FormControl, FormField, FormItem, FormLabel, FormMessage, Input } from '@/components/ui';
import { useToast } from '@/components/ui/use-toast';
import { useLoginMutation } from '@/features/api/apiSlice';
import { DefaultAPIError } from '@/utils/types';
import { loginFormSchema } from '@/utils/zodSchemas';

import logo from '../../assets/logo.svg';
import HomeNavbar from '../../components/Navbar/HomeNavbar';

const LoginPage = () => {
    const [login, { isLoading }] = useLoginMutation();
    const navigate = useNavigate();
    const { toast } = useToast();

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

    const handleTestUserLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        await login({ email: 'johndoe@gmail.com', password: 'johndoe123' })
            .unwrap()
            .then((res) => {
                if (res.success) {
                    navigate('/app');
                }
                return;
            })
            .catch(() => {
                toast({
                    title: 'Failed to login as test user',
                    description: 'Please try again later',
                    variant: 'destructive',
                });
            });
    };

    return (
        <>
            <HomeNavbar text='Not a Pixelbug user?' link='/auth/register' />
            <main className='isolate px-6 pt-14 lg:px-8 h-screen'>
                <div className='absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80' aria-hidden='true'>
                    <div className='relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#059669] to-[#d4d4d4] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]'></div>
                </div>
                <div
                    className='fixed inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]'
                    aria-hidden='true'
                >
                    <div className='relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#059669] to-[#d4d4d4] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]'></div>
                </div>
                <div className='mx-auto max-w-md py-20'>
                    <Card className='px-8 py-12 bg-white/60 border-0 shadow-2xl'>
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
                                    {isLoading ? <SpinnerButton /> : 'Sign In'}
                                </Button>
                                <MemberCheck to={'/auth/register'} question={"Don't have an account?"} text={'Register'} />
                            </form>
                        </Form>
                        <form onSubmit={handleTestUserLogin}>
                            <div className='text-center mt-8 flex justify-between items-center gap-4'>
                                <div className='w-full h-[2px] bg-neutral-200'></div>
                                <p className='text-neutral-500 whitespace-nowrap'>Want to try the app?</p>
                                <div className='w-full h-[2px] bg-neutral-200'></div>
                            </div>
                            <div className='grid place-items-center mt-4'>
                                <Button type='submit' size={'sm'} className='bg-neutral-500 w-32 hover:bg-neutral-600'>
                                    {isLoading ? <SpinnerButton /> : 'Demo app'}
                                </Button>
                            </div>
                        </form>
                    </Card>
                </div>
            </main>
        </>
    );
};

export default LoginPage;
