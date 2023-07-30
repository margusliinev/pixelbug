import { format } from 'date-fns';
import { Link } from 'react-router-dom';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui';
import { User } from '@/utils/types';

const Project = ({
    project_id,
    title,
    start_date,
    end_date,
    manager,
}: {
    project_id: number;
    title: string;
    start_date: Date;
    end_date: Date;
    manager: User;
}) => {
    const formatted_start_date = format(new Date(start_date), 'PPP');
    const formatted_end_date = format(new Date(end_date), 'PPP');

    return (
        <Link
            to={`/app/projects/${project_id}`}
            className='bg-white border-b-4 border-primary shadow-project-card p-4 rounded-md cursor-pointer transition-transform duration-300 hover:-translate-y-1'
        >
            <header>
                <h1 className='text-lg font-semibold capitalize mt-1 mb-2'>{title}</h1>
            </header>
            <hr className='my-4' />
            <section>
                <h2 className='font-semibold mb-2'>Project Manager:</h2>
                <div className='flex items-center gap-4 py-2'>
                    <Avatar className='w-16 h-16 rounded-full shadow-project-card'>
                        <AvatarImage src={manager.profile_picture} />
                        <AvatarFallback className='text-2xl bg-neutral-200'>
                            {manager.first_name && manager.last_name
                                ? manager.first_name.charAt(0).toUpperCase()
                                : manager.username.charAt(0).toUpperCase()}
                        </AvatarFallback>
                    </Avatar>
                    <p className='font-medium'>
                        {manager.first_name && manager.last_name ? `${manager.first_name} ${manager.last_name}` : manager.username}
                    </p>
                </div>
            </section>
            <hr className='my-4' />
            <footer className='flex justify-between my-4'>
                <div className='grid'>
                    <p className='font-semibold text-sm'>Start Date:</p>
                    <p className='text-sm tracking-tight'>{formatted_start_date}</p>
                </div>
                <div className='grid'>
                    <p className='font-semibold text-sm'>Deadline</p>
                    <p className='text-sm tracking-tight'>{formatted_end_date}</p>
                </div>
            </footer>
        </Link>
    );
};

export default Project;
