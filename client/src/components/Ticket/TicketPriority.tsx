const TicketPriority = ({ priority }: { priority: string }) => {
    switch (priority) {
        case 'low':
            return <span className='py-1 px-2 capitalize text-sm bg-emerald-600 text-white rounded-md w-fit'>{priority}</span>;
        case 'medium':
            return <span className='py-1 px-2 capitalize text-sm bg-yellow-600 text-white rounded-md w-fit'>{priority}</span>;
        case 'high':
            return <span className='py-1 px-2 capitalize text-sm bg-red-500 text-white rounded-md w-fit'>{priority}</span>;
        case 'critical':
            return <span className='py-1 px-2 capitalize text-sm bg-red-700 text-white rounded-md w-fit'>{priority}</span>;
        default:
            return <span className='py-1 px-2 capitalize text-sm bg-emerald-600 text-white rounded-md w-fit'>{priority}</span>;
    }
};

export default TicketPriority;
