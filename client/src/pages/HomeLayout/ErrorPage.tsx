import { Link } from 'react-router-dom';

const ErrorPage = () => {
    return (
        <main className='grid min-h-screen place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8'>
            <div className='text-center'>
                <p className='text-lg font-semibold text-primary'>404</p>
                <h1 className='mt-4 text-3xl font-bold tracking-tight text-neutral-900 sm:text-5xl'>Page not found</h1>
                <p className='mt-6 text-base leading-7 text-neutral-600'>Sorry, we couldn’t find the page you’re looking for.</p>
                <div className='mt-10 flex items-center justify-center gap-x-6'>
                    <Link
                        to={'/app'}
                        className='rounded-md bg-primary px-3.5 py-2.5 text-sm font-semibold transition-colors text-white shadow-sm hover:bg-primary-hover-dark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
                    >
                        Go back home
                    </Link>
                    <Link to='/login' className='text-sm font-semibold text-neutral-900'>
                        Head to login page <span aria-hidden='true'>&rarr;</span>
                    </Link>
                </div>
            </div>
        </main>
    );
};

export default ErrorPage;
