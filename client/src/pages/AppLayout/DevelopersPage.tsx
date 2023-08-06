import { useGetAllUsersQuery } from '@/features/api/apiSlice';

const DevelopersPage = () => {
    const { data } = useGetAllUsersQuery(undefined);

    console.log(data);

    if (!data) {
        return null;
    }

    return (
        <main className='px-6 py-10 xs:px-8 lg:px-12 xl:px-16 min-h-screen-minus-nav bg-neutral-100'>
            <div className='grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4 place-items-center'>
                {data.users.map((user) => {
                    return (
                        <article
                            key={user.user_id}
                            className='pt-8 bg-white shadow-user-card rounded-lg flex flex-col items-center text-center min-w-[280px] max-w-xs'
                        >
                            <img src={user.profile_picture} alt='picture' className='rounded-full w-32 h-32 mb-4' />
                            <h1 className='capitalize text-sm font-medium mb-2'>
                                {user.first_name && user.last_name ? `${user.first_name} ${user.last_name}` : user.username}
                            </h1>
                            <h2 className='capitalize text-sm text-neutral-600 mb-3'>{user.job_title ? user.job_title : 'developer'}</h2>
                            <h3 className='capitalize text-xs mb-8 border-emerald-300 border w-fit justify-self-center bg-emerald-50 text-emerald-800 font-medium py-1 px-2 rounded-xl '>
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
