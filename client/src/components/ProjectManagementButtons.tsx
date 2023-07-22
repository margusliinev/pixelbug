import { ProjectAPIResponse } from '@/utils/types';

import { DeleteProjectButton, ProjectUpdateButton, ProjectUsersButton } from '.';

const ProjectManagementButtons = ({ data }: { data: ProjectAPIResponse }) => {
    return (
        <ul className='flex items-center gap-2'>
            <li>
                <ProjectUsersButton />
            </li>
            <li>
                <ProjectUpdateButton data={data} />
            </li>
            <li>
                <DeleteProjectButton />
            </li>
        </ul>
    );
};

export default ProjectManagementButtons;
