import { useState } from 'react';

import { ProjectAPIResponse } from '@/utils/types';

import { DeleteProject, EditProject } from '.';

const ProjectSettingsModal = ({ data }: { data: ProjectAPIResponse }) => {
    const [showEditModal, setShowEditModal] = useState(false);

    return (
        <div className='relative'>
            <button className='right-0 top-0 cursor-pointer' onClick={() => setShowEditModal(!showEditModal)}>
                <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth='1' stroke='currentColor' className='w-8 h-8'>
                    <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        d='M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z'
                    />
                </svg>
            </button>
            {showEditModal && (
                <div className='absolute right-4 top-8 h-fit w-fit rounded-md border bg-background shadow-sm transition-opacity grid'>
                    <EditProject data={data} />
                    <DeleteProject />
                </div>
            )}
        </div>
    );
};

export default ProjectSettingsModal;
