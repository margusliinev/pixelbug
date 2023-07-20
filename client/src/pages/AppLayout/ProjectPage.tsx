import { Link, useNavigate, useParams } from 'react-router-dom';

import { ManageProjectUsers } from '@/components';
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
            <ManageProjectUsers />
            <div className='shadow-project-card p-4 grid gap-4 my-4 rounded-md max-w-xl'>
                <header>
                    <h2 className='text-2xl font-semibold'>{data.project.title}</h2>
                </header>
                <hr />
                <section>
                    <h3 className='text-lg font-semibold'>Project Description:</h3>
                    <p className='text-sm text-neutral-600'>{data.project.description}</p>
                </section>
                <hr />
                <section>
                    <h3 className='font-semibold mb-2'>Project Manager:</h3>
                    <div className='flex items-center gap-4 py-2'>
                        <Avatar className='w-16 h-16 rounded-full shadow-project-card'>
                            <AvatarImage src={data.project.manager.profile_picture} />
                            <AvatarFallback className='text-2xl bg-neutral-200'>{data.project.manager.username.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <p className='font-medium'>{`${data.project.manager.first_name} ${data.project.manager.last_name}`}</p>
                    </div>
                </section>
                <hr />
                <section>
                    <h3 className='font-semibold mb-2'>Project Team:</h3>
                    <div className='grid gap-2'>
                        {data.project.users.map((user) => {
                            return <article key={user.user_id}>{user.username}</article>;
                        })}
                    </div>
                </section>
            </div>
        </main>
    );
};

export default ProjectPage;
