import { Link } from 'react-router-dom';

const HomePage = () => {
    return (
        <main className='grid min-h-screen place-content-center bg-background text-foreground'>
            <h1 className='justify-self-center text-center text-2xl font-medium md:text-4xl'>Welcome to PixelBug!</h1>
            <div className='mt-4 flex gap-4 justify-self-center'>
                <Link to={'/login'} className='rounded-md bg-primary p-2 text-xl text-primary-foreground transition-colors hover:bg-primary/90'>
                    Login
                </Link>
                <Link to={'/register'} className='rounded-md bg-primary p-2 text-xl text-primary-foreground transition-colors hover:bg-primary/90'>
                    Register
                </Link>
            </div>
        </main>
    );
};

export default HomePage;
