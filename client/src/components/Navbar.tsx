const Navbar = () => {
    return (
        <nav className='h-20 top-0 border-b z-50 w-full sticky bg-white grid'>
            <div className='px-8 md:px-16 flex items-center'>
                <div className='flex gap-2 w-full'>
                    <label htmlFor='search' className='text-neutral-500'>
                        <svg
                            xmlns='http://www.w3.org/2000/svg'
                            fill='none'
                            viewBox='0 0 24 24'
                            strokeWidth='1.5'
                            stroke='currentColor'
                            className='w-6 h-6'
                        >
                            <path
                                strokeLinecap='round'
                                strokeLinejoin='round'
                                d='M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z'
                            />
                        </svg>
                    </label>
                    <input type='text' name='search' id='search' placeholder='Search...' className='w-full text-base focus:outline-none' />
                </div>
                <div className='max-w-fit flex items-center gap-2'>
                    <span className='font-normal text-neutral-500'>
                        <svg
                            xmlns='http://www.w3.org/2000/svg'
                            fill='none'
                            viewBox='0 0 24 24'
                            strokeWidth='1'
                            stroke='currentColor'
                            className='w-6 h-6 md:w-8 md:h-8'
                        >
                            <path
                                strokeLinecap='round'
                                strokeLinejoin='round'
                                d='M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z'
                            />
                        </svg>
                    </span>
                    <p className='text-sm md:text-base whitespace-nowrap font-medium'>John Doe</p>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
