import { useNavigate, useParams } from 'react-router-dom';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui';
import { useGetSingleProjectQuery } from '@/features/api/apiSlice';

const ProjectPage = () => {
    const { project_id } = useParams();
    const navigate = useNavigate();
    const { data, isError } = useGetSingleProjectQuery(project_id || '');

    if (!data) return null;

    if (isError) {
        setTimeout(() => {
            navigate('/jobs');
        }, 1000);
    }

    return (
        <main className='px-6 py-10 xs:px-8 lg:px-12 xl:px-16 min-h-screen-minus-nav'>
            <div className='shadow-project-card p-4 grid gap-4 rounded-md'>
                <header>
                    <h1 className='text-2xl font-semibold mb-4'>{data.project.title}</h1>
                    <h2 className='text-lg font-semibold'>Project Description:</h2>
                    <p className='text-sm text-neutral-600'>{data.project.description}</p>
                </header>
                <section>
                    <h2 className='font-semibold mb-2'>Project Manager:</h2>
                    <div className='flex items-center gap-4 py-2'>
                        <Avatar className='w-16 h-16 rounded-full shadow-project-card'>
                            <AvatarImage src={data.project.manager.profile_picture} />
                            <AvatarFallback className='text-2xl bg-neutral-200'>{data.project.manager.username.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <p className='font-medium'>{`${data.project.manager.first_name} ${data.project.manager.last_name}`}</p>
                    </div>
                </section>
                <section>
                    <h2 className='font-semibold mb-2'>Project Team:</h2>
                </section>
            </div>
        </main>
    );
};

export default ProjectPage;
