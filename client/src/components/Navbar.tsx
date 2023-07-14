import { UserButton } from '.';

const Navbar = ({ isSidebarOpen, setIsSidebarOpen }: { isSidebarOpen: boolean; setIsSidebarOpen: React.Dispatch<React.SetStateAction<boolean>> }) => {
    return (
        <nav className='sticky top-0 z-20 grid h-20 w-full border-b bg-white shadow-sm'>
            <div className='flex items-center justify-between px-6 xs:px-8 lg:px-12 xl:px-16'>
                <div className='flex items-center gap-4'>
                    <button className='block cursor-pointer text-neutral-600 lg:hidden' onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
                        <svg
                            xmlns='http://www.w3.org/2000/svg'
                            fill='none'
                            viewBox='0 0 24 24'
                            strokeWidth='1.5'
                            stroke='currentColor'
                            className='h-6 w-6'
                        >
                            <path strokeLinecap='round' strokeLinejoin='round' d='M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5' />
                        </svg>
                    </button>
                    <div className='h-6 w-px bg-neutral-300 lg:hidden'></div>
                    <div className='flex w-full gap-2'>
                        <label htmlFor='search' className='text-neutral-400'>
                            <svg
                                xmlns='http://www.w3.org/2000/svg'
                                fill='none'
                                viewBox='0 0 24 24'
                                strokeWidth='2'
                                stroke='currentColor'
                                className='h-5 w-5'
                            >
                                <path
                                    strokeLinecap='round'
                                    strokeLinejoin='round'
                                    d='M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z'
                                />
                            </svg>
                        </label>
                        <input type='text' name='search' id='search' placeholder='Search...' className='w-full text-sm focus:outline-none' />
                    </div>
                </div>
                <UserButton />
            </div>
        </nav>
    );
};

export default Navbar;
