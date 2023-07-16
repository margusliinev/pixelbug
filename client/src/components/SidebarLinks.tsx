import { NavLink } from 'react-router-dom';

const SidebarLinks = ({
    isSidebarOpen,
    setIsSidebarOpen,
}: {
    isSidebarOpen: boolean;
    setIsSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
    return (
        <div className='h-full px-4 py-8'>
            <ul className='grid gap-4'>
                <li>
                    <NavLink
                        to='/app/dashboard'
                        className={({ isActive }) =>
                            isActive
                                ? 'flex cursor-pointer items-center gap-3 rounded-md bg-primary-foreground px-4 py-2 text-sm font-semibold text-primary transition-colors'
                                : 'flex cursor-pointer items-center gap-3 rounded-md px-4 py-2 text-sm font-semibold transition-colors'
                        }
                        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                    >
                        <svg
                            xmlns='http://www.w3.org/2000/svg'
                            fill='none'
                            viewBox='0 0 24 24'
                            strokeWidth='1.5'
                            stroke='currentColor'
                            className='h-6 w-6 text-gray-600'
                        >
                            <path
                                strokeLinecap='round'
                                strokeLinejoin='round'
                                d='M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25'
                            />
                        </svg>
                        <p>Dashboard</p>
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        to='/app/projects'
                        className={({ isActive }) =>
                            isActive
                                ? 'flex cursor-pointer items-center gap-3 rounded-md bg-primary-foreground px-4 py-2 text-sm font-semibold text-primary transition-colors'
                                : 'flex cursor-pointer items-center gap-3 rounded-md px-4 py-2 text-sm font-semibold transition-colors'
                        }
                        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                    >
                        <svg
                            xmlns='http://www.w3.org/2000/svg'
                            fill='none'
                            viewBox='0 0 24 24'
                            strokeWidth='1.5'
                            stroke='currentColor'
                            className='h-6 w-6 text-gray-600'
                        >
                            <path
                                strokeLinecap='round'
                                strokeLinejoin='round'
                                d='M2.25 12.75V12A2.25 2.25 0 014.5 9.75h15A2.25 2.25 0 0121.75 12v.75m-8.69-6.44l-2.12-2.12a1.5 1.5 0 00-1.061-.44H4.5A2.25 2.25 0 002.25 6v12a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9a2.25 2.25 0 00-2.25-2.25h-5.379a1.5 1.5 0 01-1.06-.44z'
                            />
                        </svg>
                        <p>Projects</p>
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        to='/app/tickets'
                        className={({ isActive }) =>
                            isActive
                                ? 'flex cursor-pointer items-center gap-3 rounded-md bg-primary-foreground px-4 py-2 text-sm font-semibold text-primary transition-colors'
                                : 'flex cursor-pointer items-center gap-3 rounded-md px-4 py-2 text-sm font-semibold transition-colors'
                        }
                        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                    >
                        <svg
                            xmlns='http://www.w3.org/2000/svg'
                            fill='none'
                            viewBox='0 0 24 24'
                            strokeWidth='1.5'
                            stroke='currentColor'
                            className='h-6 w-6 text-gray-600'
                        >
                            <path
                                strokeLinecap='round'
                                strokeLinejoin='round'
                                d='M16.5 6v.75m0 3v.75m0 3v.75m0 3V18m-9-5.25h5.25M7.5 15h3M3.375 5.25c-.621 0-1.125.504-1.125 1.125v3.026a2.999 2.999 0 010 5.198v3.026c0 .621.504 1.125 1.125 1.125h17.25c.621 0 1.125-.504 1.125-1.125v-3.026a2.999 2.999 0 010-5.198V6.375c0-.621-.504-1.125-1.125-1.125H3.375z'
                            />
                        </svg>
                        <p>Tickets</p>
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        to='/app/profile'
                        className={({ isActive }) =>
                            isActive
                                ? 'flex cursor-pointer items-center gap-3 rounded-md bg-primary-foreground px-4 py-2 text-sm font-semibold text-primary transition-colors'
                                : 'flex cursor-pointer items-center gap-3 rounded-md px-4 py-2 text-sm font-semibold transition-colors'
                        }
                        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                    >
                        <svg
                            xmlns='http://www.w3.org/2000/svg'
                            fill='none'
                            viewBox='0 0 24 24'
                            strokeWidth='1.5'
                            stroke='currentColor'
                            className='h-6 w-6 text-gray-600'
                        >
                            <path
                                strokeLinecap='round'
                                strokeLinejoin='round'
                                d='M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z'
                            />
                        </svg>
                        <p>Profile</p>
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        to='/app/users'
                        className={({ isActive }) =>
                            isActive
                                ? 'flex cursor-pointer items-center gap-3 rounded-md bg-primary-foreground px-4 py-2 text-sm font-semibold text-primary transition-colors'
                                : 'flex cursor-pointer items-center gap-3 rounded-md px-4 py-2 text-sm font-semibold transition-colors'
                        }
                        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                    >
                        <svg
                            xmlns='http://www.w3.org/2000/svg'
                            fill='none'
                            viewBox='0 0 24 24'
                            strokeWidth='1.5'
                            stroke='currentColor'
                            className='h-6 w-6 text-gray-600'
                        >
                            <path
                                strokeLinecap='round'
                                strokeLinejoin='round'
                                d='M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z'
                            />
                        </svg>
                        <p>Users</p>
                    </NavLink>
                </li>
            </ul>
        </div>
    );
};

export default SidebarLinks;
