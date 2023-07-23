import { AllProjectsAPIResponse } from '@/utils/types';

import { ProjectCard } from '.';

const ProjectList = ({ data }: { data: AllProjectsAPIResponse | undefined }) => {
    return (
        <div className='grid md:grid-cols-2 2xl:grid-cols-3 w-full my-4 gap-4'>
            {data &&
                data.projects.map((project) => {
                    return <ProjectCard {...project} key={project.project_id} />;
                })}
        </div>
    );
};

export default ProjectList;
