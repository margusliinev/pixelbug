import { useState } from 'react';

const Navbar = () => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    return (
        <nav className='h-16 top-0 border-b shadow-sm z-50 w-full sticky bg-white grid'>
            <div className='px-6 xs:px-8 lg:px-12 xl:px-16 flex items-center justify-between'>
                <div className='flex items-center gap-4'>
                    <div className='block lg:hidden text-neutral-600 cursor-pointer'>
                        <svg
                            xmlns='http://www.w3.org/2000/svg'
                            fill='none'
                            viewBox='0 0 24 24'
                            strokeWidth='1.5'
                            stroke='currentColor'
                            className='w-6 h-6'
                        >
                            <path strokeLinecap='round' strokeLinejoin='round' d='M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5' />
                        </svg>
                    </div>
                    <div className='h-6 w-px bg-neutral-300 lg:hidden'></div>
                    <div className='flex gap-2 w-full'>
                        <label htmlFor='search' className='text-neutral-400'>
                            <svg
                                xmlns='http://www.w3.org/2000/svg'
                                fill='none'
                                viewBox='0 0 24 24'
                                strokeWidth='2'
                                stroke='currentColor'
                                className='w-5 h-5'
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
                <button onClick={() => setIsDropdownOpen(!isDropdownOpen)} className='flex items-center gap-3 max-w-fit'>
                    <span className='font-normal text-neutral-500'>
                        <svg
                            xmlns='http://www.w3.org/2000/svg'
                            fill='none'
                            viewBox='0 0 24 24'
                            strokeWidth='1'
                            stroke='currentColor'
                            className='w-9 h-9 lg:w-8 lg:h-8'
                        >
                            <path
                                strokeLinecap='round'
                                strokeLinejoin='round'
                                d='M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z'
                            />
                        </svg>
                    </span>
                    <p className='hidden text-sm whitespace-nowrap font-medium lg:block'>John Doe</p>
                    {isDropdownOpen ? (
                        <svg
                            xmlns='http://www.w3.org/2000/svg'
                            fill='none'
                            viewBox='0 0 24 24'
                            strokeWidth='2.5'
                            stroke='currentColor'
                            className='w-3.5 h-3.5 text-neutral-500 hidden lg:block ml-px'
                        >
                            <path strokeLinecap='round' strokeLinejoin='round' d='M4.5 15.75l7.5-7.5 7.5 7.5' />
                        </svg>
                    ) : (
                        <svg
                            xmlns='http://www.w3.org/2000/svg'
                            fill='none'
                            viewBox='0 0 24 24'
                            strokeWidth='2.5'
                            stroke='currentColor'
                            className='w-3.5 h-3.5 text-neutral-500 hidden lg:block ml-px'
                        >
                            <path strokeLinecap='round' strokeLinejoin='round' d='M19.5 8.25l-7.5 7.5-7.5-7.5' />
                        </svg>
                    )}
                </button>
            </div>
        </nav>
    );
};

export default Navbar;
