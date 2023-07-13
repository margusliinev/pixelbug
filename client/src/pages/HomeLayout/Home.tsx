import { Link } from 'react-router-dom';

const HomePage = () => {
    return (
        <main className='grid place-content-center bg-background text-foreground min-h-screen'>
            <h1 className='text-2xl md:text-4xl font-medium justify-self-center text-center'>Welcome to PixelBug!</h1>
            <div className='flex gap-4 justify-self-center mt-4'>
                <Link to={'/login'} className='text-xl bg-primary text-primary-foreground p-2 rounded-md transition-colors hover:bg-primary/90'>
                    Login
                </Link>
                <Link to={'/register'} className='text-xl bg-primary text-primary-foreground p-2 rounded-md transition-colors hover:bg-primary/90'>
                    Register
                </Link>
            </div>
        </main>
    );
};

export default HomePage;
