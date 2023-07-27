import { SpinnerPage, TicketNewButton, TicketTable } from '@/components';
import { useGetAllTicketsQuery } from '@/features/api/apiSlice';

const TicketsPage = () => {
    const { data, isLoading } = useGetAllTicketsQuery(undefined);

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
                    <TicketNewButton />
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
            <TicketNewButton />
            <TicketTable tickets={data.tickets} />
        </main>
    );
};

export default TicketsPage;
