import { useGetAllProjectsQuery } from '@/features/api/apiSlice';

import { Project } from '.';

const ProjectList = () => {
    const { data } = useGetAllProjectsQuery(undefined);

    return (
        <div className='grid md:grid-cols-2 2xl:grid-cols-3 w-full my-4 gap-4'>
            {data &&
                data.projects.map((project) => {
                    return <Project {...project} key={project.project_id} />;
                })}
        </div>
    );
};

export default ProjectList;
