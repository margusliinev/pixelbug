import { NewProject, ProjectsList } from '@/components';

const ProjectsPage = () => {
    return (
        <main className='grid px-6 py-4 xs:px-8 lg:px-12 xl:px-16'>
            <NewProject />
            <ProjectsList />
        </main>
    );
};

export default ProjectsPage;
