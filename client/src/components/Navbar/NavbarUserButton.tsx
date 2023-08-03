import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { logoutUser } from '@/features/user/userSlice';
import { useAppDispatch, useAppSelector } from '@/utils/hooks';

const NavbarUserButton = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { user } = useAppSelector((store) => store.user);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const handleLogout = async () => {
        await dispatch(logoutUser());
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
                    <AvatarFallback className='bg-neutral-200'>
                        {user?.first_name && user.last_name ? user.first_name.charAt(0).toUpperCase() : user?.username.charAt(0).toUpperCase()}
                    </AvatarFallback>
                </Avatar>
                <p className='hidden whitespace-nowrap text-sm font-medium md:block'>
                    {user?.first_name && user.last_name ? `${user.first_name} ${user.last_name}` : user?.username}
                </p>
                {isDropdownOpen ? (
                    <svg
                        xmlns='http://www.w3.org/2000/svg'
                        fill='none'
                        viewBox='0 0 24 24'
                        strokeWidth='2.5'
                        stroke='currentColor'
                        className='ml-1 hidden h-3.5 w-3.5 text-gray-600 md:block'
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
                        className='ml-1 hidden h-3.5 w-3.5 text-gray-600 md:block'
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
                <Link to={'/app/account'} className='px-3 pt-3 pb-1 text-sm hover:bg-accent w-full hover:rounded-tl-md hover:rounded-tr-md'>
                    Your Account
                </Link>
                <button
                    className='px-3 pb-3 pt-1 text-sm hover:bg-accent w-full text-left hover:rounded-bl-md hover:rounded-br-md'
                    onClick={handleLogout}
                >
                    Sign Out
                </button>
            </div>
        </div>
    );
};

export default NavbarUserButton;
