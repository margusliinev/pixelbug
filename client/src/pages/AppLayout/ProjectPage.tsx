import { format } from 'date-fns';
import { Link, useNavigate, useParams } from 'react-router-dom';

import { ProjectLeaveButton, ProjectManagementButtons, ProjectTeam, SpinnerPage } from '@/components';
import { useGetSingleProjectQuery } from '@/features/api/apiSlice';
import { useAppSelector } from '@/utils/hooks';

const ProjectPage = () => {
    const { project_id } = useParams();
    const { data, isLoading } = useGetSingleProjectQuery(project_id || '', { refetchOnMountOrArgChange: true });
    const { user } = useAppSelector((store) => store.user);
    const navigate = useNavigate();

    if (isLoading) {
        return (
            <main className='w-full min-h-screen-minus-nav grid place-items-center bg-emerald-50'>
                <SpinnerPage />
            </main>
        );
    }

    if (!data) {
        setTimeout(() => {
            navigate('/app/projects');
        }, 500);
        return (
            <main className='w-full min-h-screen-minus-nav grid place-items-center bg-emerald-50'>
                <SpinnerPage />
            </main>
        );
    }

    return (
        <main className='px-6 py-10 xs:px-8 lg:px-12 xl:px-16 min-h-screen-minus-nav bg-emerald-50'>
            <div className='grid gap-4 sm:flex items-end justify-between'>
                <Link to={'/app/projects'} className='flex items-center gap-2 text-2xl font-medium text-primary-hover-dark group w-fit'>
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
                </Link>
                {user?.user_id === data.project.manager.user_id && <ProjectManagementButtons data={data} />}
                {user?.user_id !== data.project.manager.user_id && <ProjectLeaveButton />}
            </div>
            <div className='bg-white shadow-project-card grid gap-4 my-4 p-4 rounded-md w-full'>
                <header className='flex justify-between'>
                    <h1 className='text-2xl md:text-3xl font-semibold'>{data.project.title}</h1>
                </header>
                <hr />
                <section className='my-2'>
                    <p className='text-sm md:text-base text-neutral-700 whitespace-pre-wrap'>{data.project.description}</p>
                </section>
                <hr />
                <section className='grid gap-4 sm:flex items-center sm:gap-10 my-2'>
                    <div className='flex items-center gap-2'>
                        <div className='flex items-center gap-2'>
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
                                    d='M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5'
                                />
                            </svg>
                            <p className='tracking-tight font-medium'>Start Date:</p>
                        </div>
                        <span className='text-sm whitespace-nowrap sm:text-base tracking-tight'>
                            {format(new Date(data.project.start_date), 'PPP')}
                        </span>
                    </div>
                    <div className='flex items-center gap-2'>
                        <div className='flex items-center gap-2'>
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
                                    d='M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5'
                                />
                            </svg>
                            <p className='tracking-tight font-medium'>Deadline:</p>
                        </div>
                        <span className='text-sm whitespace-nowrap sm:text-base tracking-tight'>
                            {format(new Date(data.project.end_date), 'PPP')}
                        </span>
                    </div>
                </section>
            </div>
            <ProjectTeam data={data} />
        </main>
    );
};

export default ProjectPage;
