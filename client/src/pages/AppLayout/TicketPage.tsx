import { Link, useNavigate, useParams } from 'react-router-dom';

import { SpinnerPage } from '@/components';
import { useGetTicketQuery } from '@/features/api/apiSlice';
import { useAppSelector } from '@/utils/hooks';

const TicketPage = () => {
    const navigate = useNavigate();
    const { project_id, ticket_id } = useParams();
    const { data, isLoading } = useGetTicketQuery(ticket_id || '');
    const { user } = useAppSelector((store) => store.user);

    if (isLoading) {
        return (
            <main className='w-full min-h-screen-minus-nav grid place-items-center bg-emerald-50'>
                <SpinnerPage />
            </main>
        );
    }

    if (!data) {
        setTimeout(() => {
            navigate('/app/tickets');
        }, 500);
        return (
            <main className='w-full min-h-screen-minus-nav grid place-items-center bg-emerald-50'>
                <SpinnerPage />
            </main>
        );
    }

    return (
        <main className='px-6 py-10 xs:px-8 lg:px-12 xl:px-16 min-h-screen-minus-nav bg-emerald-50'>
            <div className='grid gap-4 sm:flex items-end justify-between'>
                <Link
                    to={project_id ? `/app/projects/${project_id}` : `/app/tickets`}
                    className='flex items-center gap-2 text-2xl font-medium text-primary-hover-dark group w-fit'
                >
                    <svg
                        xmlns='http://www.w3.org/2000/svg'
                        fill='none'
                        viewBox='0 0 24 24'
                        strokeWidth='2'
                        stroke='currentColor'
                        className='w-6 h-6 transition-colors group-hover:text-primary-hover-light'
                    >
                        <path strokeLinecap='round' strokeLinejoin='round' d='M11.25 9l-3 3m0 0l3 3m-3-3h7.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z' />
                    </svg>
                    <span>{project_id ? 'Back to Project' : 'All Tickets'}</span>
                </Link>
                {user?.user_id === (data.ticket.assigned_user_id || data.ticket.reported_user_id) ? <button>TicketManagementButton</button> : null}
            </div>
            <h1>{data.ticket.reporter_user}</h1>
        </main>
    );
};

export default TicketPage;