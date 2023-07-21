import { useGetAllProjectsQuery } from '@/features/api/apiSlice';

import { Project } from '.';

const ProjectsList = () => {
    const { data } = useGetAllProjectsQuery(undefined);
    console.log(data);

    return (
        <div className='grid md:grid-cols-2 2xl:grid-cols-3 w-full my-4 gap-4'>
            {data &&
                data.projects.map((project) => {
                    return <Project {...project} key={project.project_id} />;
                })}
        </div>
    );
};

export default ProjectsList;
