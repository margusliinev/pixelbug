import { useState } from 'react';

const ProjectEditModal = () => {
    const [showEditModal, setShowEditModal] = useState(false);

    return (
        <>
            <button
                className='right-0 top-0 cursor-pointer'
                onClick={() => setShowEditModal(!showEditModal)}
                onBlur={() => {
                    setTimeout(() => {
                        setShowEditModal(false);
                    }, 150);
                }}
            >
                <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth='1' stroke='currentColor' className='w-8 h-8'>
                    <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        d='M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z'
                    />
                </svg>
            </button>
            {showEditModal && (
                <div className='absolute right-0 top-10 h-fit w-fit rounded-md border bg-background shadow-sm transition-opacity grid'>
                    <button
                        className='transition-colors text-primary py-1 px-4 w-full text-left hover:bg-accent z-50'
                        onClick={() => {
                            setShowEditModal(false);
                        }}
                    >
                        Edit
                    </button>
                    <button
                        className='transition-colors text-destructive py-1 px-4 w-full text-left hover:bg-accent z-50'
                        onClick={() => {
                            setShowEditModal(false);
                        }}
                    >
                        Delete
                    </button>
                </div>
            )}
        </>
    );
};

export default ProjectEditModal;
