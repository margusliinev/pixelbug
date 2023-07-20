import { useParams } from 'react-router-dom';

import { useGetSingleProjectQuery } from '@/features/api/apiSlice';

const ProjectPage = () => {
    const { project_id } = useParams();
    const { data } = useGetSingleProjectQuery(project_id || '');

    return (
        <main>
            <h1>{data?.project.title}</h1>
        </main>
    );
};

export default ProjectPage;
