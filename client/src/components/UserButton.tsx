import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useLogoutMutation } from '@/features/api/apiSlice';
import { useAppSelector } from '@/utils/hooks';

const UserButton = () => {
    const [logout] = useLogoutMutation();
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const { user } = useAppSelector((store) => store.user);
    const navigate = useNavigate();

    const handleLogout = async () => {
        await logout(undefined);
        navigate('/');
    };

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
                <Avatar className='rounded-full'>
                    <AvatarImage src={user?.profile_picture} />
                    <AvatarFallback className='bg-neutral-200'>{user?.username.charAt(0)}</AvatarFallback>
                </Avatar>
                <p className='hidden whitespace-nowrap text-sm font-medium lg:block capitalize'>{user?.username}</p>
                {isDropdownOpen ? (
                    <svg
                        xmlns='http://www.w3.org/2000/svg'
                        fill='none'
                        viewBox='0 0 24 24'
                        strokeWidth='2.5'
                        stroke='currentColor'
                        className='ml-1 hidden h-3.5 w-3.5 text-gray-600 lg:block'
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
                        className='ml-1 hidden h-3.5 w-3.5 text-gray-600 lg:block'
                    >
                        <path strokeLinecap='round' strokeLinejoin='round' d='M19.5 8.25l-7.5 7.5-7.5-7.5' />
                    </svg>
                )}
            </button>
            <div
                className={
                    isDropdownOpen
                        ? 'absolute right-0 top-12 w-32 rounded-md border bg-background shadow-sm transition-opacity grid'
                        : 'absolute right-0 top-12 w-32 rounded-md border bg-background shadow-sm transition-opacity opacity-0 invisible'
                }
            >
                <Link to={'/app/profile'} className='px-3 pt-3 pb-1 text-sm hover:bg-accent w-full'>
                    Your Profile
                </Link>
                <button className='px-3 pb-3 pt-1 text-sm hover:bg-accent w-full text-left' onClick={handleLogout}>
                    Sign Out
                </button>
            </div>
        </div>
    );
};

export default UserButton;
