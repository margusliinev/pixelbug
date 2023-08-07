import { SpinnerPage, TicketNewButton } from '@/components';
import { TicketTable } from '@/components/Ticket/TicketTable';
import { useGetAllTicketsQuery } from '@/features/api/apiSlice';

import { columnsDesktop, columnsMobile } from '../../components/Ticket/TicketColumns';

const TicketsPage = () => {
    const { data, isLoading } = useGetAllTicketsQuery('');
    const isMobile = window.innerWidth < 768;

    if (isLoading) {
        return (
            <main className='w-full min-h-screen-minus-nav grid place-items-center bg-neutral-100'>
                <SpinnerPage />
            </main>
        );
    }

    if (!data || data.tickets.length < 1) {
        return (
            <main className='px-6 py-10 xs:px-8 lg:px-12 xl:px-16 min-h-screen-minus-nav bg-neutral-100 grid place-items-center'>
                <div className='flex flex-col items-center'>
                    <svg
                        xmlns='http://www.w3.org/2000/svg'
                        fill='none'
                        viewBox='0 0 24 24'
                        strokeWidth='1'
                        stroke='currentColor'
                        className='w-10 h-10 text-neutral-500 mb-2'
                    >
                        <path
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            d='M16.5 6v.75m0 3v.75m0 3v.75m0 3V18m-9-5.25h5.25M7.5 15h3M3.375 5.25c-.621 0-1.125.504-1.125 1.125v3.026a2.999 2.999 0 010 5.198v3.026c0 .621.504 1.125 1.125 1.125h17.25c.621 0 1.125-.504 1.125-1.125v-3.026a2.999 2.999 0 010-5.198V6.375c0-.621-.504-1.125-1.125-1.125H3.375z'
                        />
                    </svg>
                    <h1 className='font-semibold text-sm mb-1'>No tickets</h1>
                    <h2 className='text-neutral-500 mb-5 text-sm'>Get started by creating a new ticket</h2>
                    <TicketNewButton size='lg' />
                </div>
            </main>
        );
    }

    return (
        <main className='px-6 py-10 xs:px-8 lg:px-12 xl:px-16 min-h-screen-minus-nav bg-neutral-100'>
            <TicketNewButton size='md' />
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
