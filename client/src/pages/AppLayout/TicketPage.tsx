import { useNavigate, useParams } from 'react-router-dom';

import { SpinnerPage } from '@/components';
import { useGetTicketQuery } from '@/features/api/apiSlice';

const TicketPage = () => {
    const { ticket_id } = useParams();
    const { data, isLoading } = useGetTicketQuery(ticket_id || '');
    const navigate = useNavigate();

    if (isLoading) {
        return (
            <main className='w-full min-h-screen-minus-nav grid place-items-center bg-emerald-50'>
                <SpinnerPage />
            </main>
        );
    }

    if (!data) {
        setTimeout(() => {
            navigate('/app/projects');
        }, 500);
        return (
            <main className='w-full min-h-screen-minus-nav grid place-items-center bg-emerald-50'>
                <SpinnerPage />
            </main>
        );
    }

    return (
        <main className='px-6 py-10 xs:px-8 lg:px-12 xl:px-16 min-h-screen-minus-nav bg-emerald-50'>
            <h1>{data.ticket.reporter_user}</h1>
        </main>
    );
};

export default TicketPage;
