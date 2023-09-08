import { ProjectAPIResponse } from '@/utils/types';

import { ProjectDeleteModal, ProjectUpdateModal, ProjectUsersModal } from '../../components';

const ProjectManagementButtons = ({ data }: { data: ProjectAPIResponse }) => {
    return (
        <ul className='flex items-center gap-2'>
            <li>
                <ProjectUsersModal />
            </li>
            <li>
                <ProjectUpdateModal data={data} />
            </li>
            <li>
                <ProjectDeleteModal />
            </li>
        </ul>
    );
};

export default ProjectManagementButtons;
