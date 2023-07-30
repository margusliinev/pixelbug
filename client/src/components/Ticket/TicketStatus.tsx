const TicketStatus = ({ status }: { status: string }) => {
    switch (status) {
        case 'unassigned':
            return <span className='py-1 px-2 capitalize text-sm bg-neutral-600 text-white rounded-md w-fit'>{status}</span>;
        case 'assigned':
            return <span className='py-1 px-2 capitalize text-sm bg-yellow-600 text-white rounded-md w-fit'>{status}</span>;
        case 'in_development':
            return <span className='py-1 px-2 capitalize text-sm bg-emerald-600 text-white rounded-md w-fit'>{status.replace(/_/g, ' ')}</span>;
        case 'on_hold':
            return <span className='py-1 px-2 capitalize text-sm bg-orange-500 text-white rounded-md w-fit'>{status.replace(/_/g, ' ')}</span>;
        case 'resolved':
            return <span className='py-1 px-2 capitalize text-sm bg-gray-700 text-white rounded-md w-fit'>{status}</span>;
        default:
            return <span className='py-1 px-2 capitalize text-sm bg-neutral-600 text-white rounded-md w-fit'>{status}</span>;
    }
};

export default TicketStatus;
