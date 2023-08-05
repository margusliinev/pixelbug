import { Link } from 'react-router-dom';

const HomeNavbar = ({ text, link }: { text: string; link: string }) => {
    return (
        <header className='absolute inset-x-0 top-0 z-50'>
            <nav className='flex items-center justify-between p-6 lg:px-8 max-w-8xl w-screen-90 mx-auto' aria-label='Global'>
                <div className='flex lg:flex-1'>
                    <Link to={'/'} className='-m-1.5 p-1.5 text-4xl font-bold text-emerald-700'>
                        PixelBug
                    </Link>
                </div>
                <div className='hidden lg:flex lg:flex-1 lg:justify-end'>
                    <Link to={link} className='text-base leading-6 text-gray-900 group'>
                        {text}{' '}
                        <span aria-hidden='true' className='group-hover:text-primary transition-colors font-medium'>
                            &rarr;
                        </span>
                    </Link>
                </div>
            </nav>
        </header>
    );
};

export default HomeNavbar;
