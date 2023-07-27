// import { SpinnerPage, TicketList, TicketNewButton } from '@/components';
import { TicketNewButton } from '@/components';

const TicketsPage = () => {
    // if (isLoading) {
    //     return (
    //         <main className='w-full min-h-screen-minus-nav grid place-items-center bg-emerald-50'>
    //             <SpinnerPage />
    //         </main>
    //     );
    // }

    // if (data && data.tickets.length < 1) {
    //     return (
    //         <main className='px-6 py-10 xs:px-8 lg:px-12 xl:px-16 min-h-screen-minus-nav bg-emerald-50 grid place-items-center'>
    //             <div className='grid items-center justify-items-center  gap-4'>
    //                 <TicketNewButton />
    //                 <div className='text-center'>
    //                     <h1 className='text-2xl mb-2 font-medium'>Looks like you don&apos;t have any active tickets</h1>
    //                     <h2 className='text-xl'>
    //                         Click the &apos;<span className='font-medium'>New Ticket</span>&apos; button to get started!
    //                     </h2>
    //                 </div>
    //             </div>
    //         </main>
    //     );
    // }

    return (
        // <main className='px-6 py-10 xs:px-8 lg:px-12 xl:px-16 min-h-screen-minus-nav bg-emerald-50'>
        //     <TicketNewButton />
        //     <TicketList data={data} />
        // </main>
        <main className='px-6 py-10 xs:px-8 lg:px-12 xl:px-16 min-h-screen-minus-nav bg-emerald-50'>
            <TicketNewButton />
        </main>
    );
};

export default TicketsPage;
