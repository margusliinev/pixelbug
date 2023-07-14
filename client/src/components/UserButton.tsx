import { useState } from 'react';
import { Link } from 'react-router-dom';

const UserButton = () => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    return (
        <div className='relative'>
            <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                onBlur={() => {
                    setTimeout(() => {
                        setIsDropdownOpen(false);
                    }, 150);
                }}
                className='flex max-w-fit items-center gap-2'
            >
                <span className=' font-normal text-neutral-500'>
                    <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth='1' stroke='currentColor' className='h-8 w-8'>
                        <path
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            d='M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z'
                        />
                    </svg>
                </span>
                <p className='hidden whitespace-nowrap text-sm font-medium lg:block'>John Doe</p>
                {isDropdownOpen ? (
                    <svg
                        xmlns='http://www.w3.org/2000/svg'
                        fill='none'
                        viewBox='0 0 24 24'
                        strokeWidth='2.5'
                        stroke='currentColor'
                        className='ml-1 hidden h-3.5 w-3.5 text-neutral-500 lg:block'
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
                        className='ml-1 hidden h-3.5 w-3.5 text-neutral-500 lg:block'
                    >
                        <path strokeLinecap='round' strokeLinejoin='round' d='M19.5 8.25l-7.5 7.5-7.5-7.5' />
                    </svg>
                )}
            </button>
            <div
                className={
                    isDropdownOpen
                        ? 'absolute right-0 top-10 w-32 rounded-md border bg-background shadow-sm transition-opacity grid'
                        : 'absolute right-0 top-10 w-32 rounded-md border bg-background shadow-sm transition-opacity opacity-0 invisible'
                }
            >
                <Link to={'/app/profile'} className='px-3 pt-3 pb-1 text-sm hover:bg-accent w-full'>
                    Your Profile
                </Link>
                <button className='px-3 pb-3 pt-1 text-sm hover:bg-accent w-full text-left'>Sign Out</button>
            </div>
        </div>
    );
};

export default UserButton;
