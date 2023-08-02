import { ProjectList, ProjectNewButton, SpinnerPage } from '@/components';
import { useGetAllProjectsQuery } from '@/features/api/apiSlice';

const ProjectsPage = () => {
    const { data, isLoading } = useGetAllProjectsQuery(undefined, { refetchOnMountOrArgChange: true });

    if (isLoading) {
        return (
            <main className='w-full min-h-screen-minus-nav grid place-items-center bg-emerald-50'>
                <SpinnerPage />
            </main>
        );
    }

    if (!data || data.projects.length < 1) {
        return (
            <main className='px-6 py-10 xs:px-8 lg:px-12 xl:px-16 min-h-screen-minus-nav bg-emerald-50 grid place-items-center'>
                <div className='flex flex-col items-center'>
                    <svg
                        xmlns='http://www.w3.org/2000/svg'
                        fill='none'
                        viewBox='0 0 24 24'
                        strokeWidth='0.75'
                        stroke='currentColor'
                        className='w-11 h-11 text-neutral-500 mb-2'
                    >
                        <path
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            d='M12 10.5v6m3-3H9m4.06-7.19l-2.12-2.12a1.5 1.5 0 00-1.061-.44H4.5A2.25 2.25 0 002.25 6v12a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9a2.25 2.25 0 00-2.25-2.25h-5.379a1.5 1.5 0 01-1.06-.44z'
                        />
                    </svg>
                    <h1 className='font-semibold text-sm mb-1'>No projects</h1>
                    <h2 className='text-neutral-500 mb-5 text-sm'>Get started by creating a new project</h2>
                    <ProjectNewButton size='lg' />
                </div>
            </main>
        );
    }

    return (
        <main className='px-6 py-10 xs:px-8 lg:px-12 xl:px-16 min-h-screen-minus-nav bg-emerald-50'>
            <ProjectNewButton size='md' />
            <ProjectList data={data} />
        </main>
    );
};

export default ProjectsPage;
