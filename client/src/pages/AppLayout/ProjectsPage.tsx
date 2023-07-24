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

    if (data && data.projects.length < 1) {
        return (
            <main className='px-6 py-10 xs:px-8 lg:px-12 xl:px-16 min-h-screen-minus-nav bg-emerald-50 grid place-items-center'>
                <div className='grid items-center justify-items-center  gap-4'>
                    <ProjectNewButton />
                    <div className='text-center'>
                        <h1 className='text-2xl mb-2 font-medium'>Looks like you don&apos;t have any active projects</h1>
                        <h2 className='text-xl'>
                            Click the &apos;<span className='font-medium'>New Project</span>&apos; button to get started!
                        </h2>
                    </div>
                </div>
            </main>
        );
    }

    return (
        <main className='px-6 py-10 xs:px-8 lg:px-12 xl:px-16 min-h-screen-minus-nav bg-emerald-50'>
            <ProjectNewButton />
            <ProjectList data={data} />
        </main>
    );
};

export default ProjectsPage;
