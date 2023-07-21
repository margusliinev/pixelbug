import { useNavigate, useParams } from 'react-router-dom';

import { ManageProjectUsers, PageSpinner } from '@/components';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui';
import { useGetSingleProjectQuery } from '@/features/api/apiSlice';
import { useAppSelector } from '@/utils/hooks';

const ProjectPage = () => {
    const { user } = useAppSelector((store) => store.user);
    const { project_id } = useParams();
    const navigate = useNavigate();
    const { data, isLoading } = useGetSingleProjectQuery(project_id || '');

    if (isLoading) {
        return (
            <main className='w-full min-h-screen-minus-nav grid place-items-center'>
                <PageSpinner />
            </main>
        );
    }

    if (!data) {
        setTimeout(() => {
            navigate('/app/projects');
        }, 500);
        return (
            <main className='w-full min-h-screen-minus-nav grid place-items-center'>
                <PageSpinner />
            </main>
        );
    }

    return (
        <main className='px-6 py-10 xs:px-8 lg:px-12 xl:px-16 min-min-h-screen-minus-nav-minus-nav'>
            {/* <Link to={'/app/projects'} className='flex items-center gap-2 text-2xl font-medium mb-4 text-primary-hover-dark group'>
                <svg
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    strokeWidth='2'
                    stroke='currentColor'
                    className='w-6 h-6 transition-colors group-hover:text-primary-hover-light'
                >
                    <path strokeLinecap='round' strokeLinejoin='round' d='M11.25 9l-3 3m0 0l3 3m-3-3h7.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z' />
                </svg>
                <span>All Projects</span>
            </Link> */}
            {user?.user_id === data.project.manager.user_id && <ManageProjectUsers />}
            <div className='shadow-project-card p-4 grid gap-4 my-4 rounded-md'>
                <h1 className='text-4xl font-semibold'>{data.project.title}</h1>
                <hr />
                <p className='text-md text-neutral-600 whitespace-pre-wrap'>{data.project.description}</p>
            </div>
            <div className='shadow-project-card p-4 grid gap-4 my-4 rounded-md max-w-xl'>
                <h1 className='text-4xl font-semibold'>Project Team</h1>
                <hr />
                <section>
                    <h2 className='font-semibold text-xl'>Manager:</h2>
                    <div className='flex items-center gap-4 py-2'>
                        <Avatar className='w-12 h-12 xs-550:w-16 xs-550:h-16 rounded-full'>
                            <AvatarImage src={data.project.manager.profile_picture} />
                            <AvatarFallback className='text-2xl bg-neutral-200'>{data.project.manager.username.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <p className='font-medium'>{`${data.project.manager.first_name} ${data.project.manager.last_name}`}</p>
                    </div>
                </section>
                <section>
                    {data.project.users.length < 1 ? null : (
                        <>
                            <h2 className='font-semibold text-xl'>Developers:</h2>
                            <div className='grid gap-4'>
                                {data.project.users.map((user) => {
                                    return (
                                        <article key={user.user_id}>
                                            <div className='flex gap-2 xs:gap-4 items-center justify-between'>
                                                <div className='flex items-center gap-2 py-2'>
                                                    <Avatar className='w-12 h-12 xs-550:w-16 xs-550:h-16 rounded-full'>
                                                        <AvatarImage src={user.profile_picture} />
                                                        <AvatarFallback className='text-2xl bg-neutral-200'>{user.username.charAt(0)}</AvatarFallback>
                                                    </Avatar>
                                                    <div>
                                                        <div className='font-medium mb-1'>
                                                            {user.first_name && user.last_name
                                                                ? `${user.first_name} ${user.last_name}`
                                                                : user.username}
                                                        </div>
                                                        <div className='hidden xs-500:block'>{user.email}</div>
                                                    </div>
                                                </div>
                                                <div className='hidden sm:block'>{user.job_title}</div>
                                            </div>
                                        </article>
                                    );
                                })}
                            </div>
                        </>
                    )}
                </section>
            </div>
        </main>
    );
};

export default ProjectPage;
