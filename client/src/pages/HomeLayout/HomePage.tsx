import { Link } from 'react-router-dom';

import { HomeNavbar } from '@/components';

import Logo from '../../assets/logo.svg';

const HomePage = () => {
    return (
        <>
            <HomeNavbar text='Not a Pixelbug user?' link='/auth/register' />
            <div className='isolate px-6 pt-8 lg:px-8 h-screen'>
                <div className='absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl md:-top-80' aria-hidden='true'>
                    <div className='relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#059669] to-[#d4d4d4] opacity-30 md:left-[calc(50%-30rem)] md:w-[72.1875rem]'></div>
                </div>
                <div className='mx-auto max-w-2xl pb-36 pt-24 md:pb-24 md:pt-28 lg:pb-24 lg:pt-28'>
                    <div className='mb-2 md:mb-0'>
                        <img src={Logo} alt='logo' className='mx-auto opacity-90 h-14 w-14' />
                    </div>
                    <div className='hidden md:mb-8 md:flex md:justify-center mt-4'>
                        <div className='relative rounded-full px-3 py-1 text-sm leading-6 text-gray-600 ring-1 ring-gray-900/10'>
                            Pixelbug has everything you need and nothing you don&apos;t
                        </div>
                    </div>
                    <div className='text-center'>
                        <h1 className='text-3xl sm:text-4xl font-bold tracking-tight text-gray-900 md:text-6xl mb-2'>
                            Experiences Perfected, <br />
                        </h1>
                        <h1 className='text-3xl sm:text-4xl font-bold tracking-tight text-gray-900 md:text-6xl'>Bugs Rejected!</h1>
                        <p className='mt-6 text-lg leading-8 text-gray-600'>
                            PixelBug is your ultimate companion for bug-free software development. With its robust tracking and comprehensive
                            management tools, PixelBug helps you track and analyze bugs at every stage of your project.
                        </p>
                        <div className='mt-6 md:mt-10 flex items-center justify-center gap-x-6'>
                            <Link
                                to={'/auth/register'}
                                className='rounded-md bg-emerald-600 px-3.5 py-2.5 text-sm font-semibold transition-colors text-white shadow-sm hover:bg-emerald-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
                            >
                                Get started
                            </Link>
                            <Link to={'/auth/login'} className='text-sm font-semibold leading-6 text-gray-900 group'>
                                Want to demo?{' '}
                                <span aria-hidden='true' className='group-hover:text-primary transition-colors'>
                                    →
                                </span>
                            </Link>
                        </div>
                    </div>
                </div>
                <div
                    className='fixed inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl md:top-[calc(100%-30rem)]'
                    aria-hidden='true'
                >
                    <div className='relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#059669] to-[#d4d4d4] opacity-30 md:left-[calc(50%+36rem)] md:w-[72.1875rem]'></div>
                </div>
            </div>
        </>
    );
};

export default HomePage;
