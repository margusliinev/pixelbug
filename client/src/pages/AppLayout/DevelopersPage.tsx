import { useGetAllUsersQuery } from '@/features/api/apiSlice';

import { Avatar, AvatarFallback, AvatarImage } from '../../components/ui';

const DevelopersPage = () => {
    const { data } = useGetAllUsersQuery(undefined);

    if (!data || data.users.length < 1) {
        return (
            <main className='px-6 py-10 xs:px-8 lg:px-12 xl:px-16 min-h-screen-minus-nav bg-gray-100 grid place-items-center'>
                <div className='flex flex-col items-center'>
                    <svg
                        xmlns='http://www.w3.org/2000/svg'
                        fill='none'
                        viewBox='0 0 24 24'
                        strokeWidth='1'
                        stroke='currentColor'
                        className='w-11 h-11 text-neutral-500 mb-2'
                    >
                        <path
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            d='M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z'
                        />
                    </svg>

                    <h1 className='font-semibold text-sm mb-1'>No developers found</h1>
                    <h2 className='text-neutral-500 mb-5 text-sm'>Join new projects to connect with other developers</h2>
                </div>
            </main>
        );
    }

    return (
        <main className='px-6 py-10 xs:px-8 lg:px-12 xl:px-16 min-h-screen-minus-nav bg-gray-100'>
            <div className='grid xs-600:grid-cols-2 xl:grid-cols-3 3xl:grid-cols-4 4xl:grid-cols-5 gap-4 place-items-center'>
                {data.users.map((user) => {
                    return (
                        <article
                            key={user.user_id}
                            className='pt-8 bg-white shadow-user-card rounded-lg flex flex-col items-center text-center min-w-[250px] w-full'
                        >
                            <Avatar className='w-32 h-32 mb-4 rounded-full'>
                                <AvatarImage src={user.profile_picture} />
                                <AvatarFallback className='text-2xl bg-neutral-200'>
                                    {user.first_name && user.last_name
                                        ? user.first_name.charAt(0).toUpperCase()
                                        : user.username.charAt(0).toUpperCase()}
                                </AvatarFallback>
                            </Avatar>
                            <h1 className='capitalize text-sm font-medium mb-2'>
                                {user.first_name && user.last_name ? `${user.first_name} ${user.last_name}` : user.username}
                            </h1>
                            <h2 className='capitalize text-sm text-neutral-600 mb-3'>{user.job_title ? user.job_title : 'developer'}</h2>
                            <h3
                                className={
                                    user.role === 'user'
                                        ? 'capitalize text-xs mb-8 border-emerald-300 border w-fit justify-self-center bg-emerald-50 text-emerald-800 font-medium py-1 px-2 rounded-xl'
                                        : user.role === 'admin'
                                        ? 'capitalize text-xs mb-8 border-orange-300 border w-fit justify-self-center bg-orange-50 text-orange-600 font-medium py-1 px-2 rounded-xl'
                                        : 'capitalize text-xs mb-8 border-gray-500 border w-fit justify-self-center bg-gray-200 text-gray-800 font-medium py-1 px-2 rounded-xl'
                                }
                            >
                                {user.role}
                            </h3>
                            <div className='grid grid-cols-2 border-t border-neutral-200 w-full justify-self-end'>
                                <div className='grid place-items-center border-r border-neutral-200'>
                                    <a href={`mailto:${user.email}`} className='flex items-center p-4 text-sm gap-2 font-semibold'>
                                        <svg
                                            xmlns='http://www.w3.org/2000/svg'
                                            viewBox='0 0 20 20'
                                            fill='currentColor'
                                            aria-hidden='true'
                                            className='w-5 h-5 text-neutral-400'
                                        >
                                            <path d='M3 4a2 2 0 00-2 2v1.161l8.441 4.221a1.25 1.25 0 001.118 0L19 7.162V6a2 2 0 00-2-2H3z'></path>
                                            <path d='M19 8.839l-7.77 3.885a2.75 2.75 0 01-2.46 0L1 8.839V14a2 2 0 002 2h14a2 2 0 002-2V8.839z'></path>
                                        </svg>
                                        Email
                                    </a>
                                </div>
                                <div className='grid place-items-center'>
                                    <a href='tel:+1-123-456-789' className='flex items-center p-4 text-sm gap-2 font-semibold'>
                                        <svg
                                            xmlns='http://www.w3.org/2000/svg'
                                            viewBox='0 0 20 20'
                                            fill='currentColor'
                                            aria-hidden='true'
                                            className='w-5 h-5 text-neutral-400'
                                        >
                                            <path
                                                fillRule='evenodd'
                                                d='M2 3.5A1.5 1.5 0 013.5 2h1.148a1.5 1.5 0 011.465 1.175l.716 3.223a1.5 1.5 0 01-1.052 1.767l-.933.267c-.41.117-.643.555-.48.95a11.542 11.542 0 006.254 6.254c.395.163.833-.07.95-.48l.267-.933a1.5 1.5 0 011.767-1.052l3.223.716A1.5 1.5 0 0118 15.352V16.5a1.5 1.5 0 01-1.5 1.5H15c-1.149 0-2.263-.15-3.326-.43A13.022 13.022 0 012.43 8.326 13.019 13.019 0 012 5V3.5z'
                                                clipRule='evenodd'
                                            ></path>
                                        </svg>
                                        Call
                                    </a>
                                </div>
                            </div>
                        </article>
                    );
                })}
            </div>
        </main>
    );
};

export default DevelopersPage;
