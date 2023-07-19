import { useGetAllProjectsQuery } from '@/features/api/apiSlice';

import { Project } from '.';

const ProjectsList = () => {
    const { data } = useGetAllProjectsQuery(undefined);

    return (
        <div className='grid grid-cols-3 w-full my-4 gap-4'>
            {data &&
                data.projects.map((project) => {
                    return <Project {...project} key={project.project_id} />;
                })}
        </div>
    );
};

export default ProjectsList;
