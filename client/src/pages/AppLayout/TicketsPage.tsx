import { SpinnerPage, TicketNewButton } from '@/components';
import { TicketTable } from '@/components/Ticket/TicketTable';
import { useGetAllTicketsQuery } from '@/features/api/apiSlice';

import { columnsDesktop, columnsMobile } from '../../components/Ticket/TicketColumns';

const TicketsPage = () => {
    const { data, isLoading } = useGetAllTicketsQuery(undefined);
    const isMobile = window.innerWidth < 640;

    if (isLoading) {
        return (
            <main className='w-full min-h-screen-minus-nav grid place-items-center bg-emerald-50'>
                <SpinnerPage />
            </main>
        );
    }

    if (!data || data.tickets.length < 1) {
        return (
            <main className='px-6 py-10 xs:px-8 lg:px-12 xl:px-16 min-h-screen-minus-nav bg-emerald-50 grid place-items-center'>
                <div className='grid items-center justify-items-center  gap-4'>
                    <TicketNewButton size='lg' />
                    <div className='text-center'>
                        <h1 className='text-2xl mb-2 font-medium'>Looks like there are no tickets assigned to you</h1>
                        <h2 className='text-lg'>
                            Want to report a bug? Click &apos;<span className='font-medium'>New Ticket</span>&apos; and fill out the form!
                        </h2>
                    </div>
                </div>
            </main>
        );
    }

    return (
        <main className='px-6 py-10 xs:px-8 lg:px-12 xl:px-16 min-h-screen-minus-nav bg-emerald-50'>
            <TicketNewButton size='lg' />
            <div className='rounded-md p-4 bg-white shadow-project-card my-4'>
                {isMobile ? (
                    <TicketTable columns={columnsMobile} data={data.tickets} />
                ) : (
                    <TicketTable columns={columnsDesktop} data={data.tickets} />
                )}
            </div>
        </main>
    );
};

export default TicketsPage;
