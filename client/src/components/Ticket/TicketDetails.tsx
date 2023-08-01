import { format } from 'date-fns';

import { Ticket } from '@/utils/types';

import { TicketPriority, TicketStatus } from '..';

const TicketDetails = ({ ticket }: { ticket: Ticket }) => {
    return (
        <>
            <div className='grid grid-cols-[120px_1fr]'>
                <span className='font-semibold text-md'>Project Name:</span>
                <p className='text-sm capitalize'>{ticket.project_title}</p>
            </div>
            <div className='grid grid-cols-[120px_1fr]'>
                <span className='font-semibold text-md'>Ticket Title:</span>
                <p className='text-sm'>{ticket.title}</p>
            </div>
            <div className='grid grid-cols-[120px_1fr]'>
                <span className='font-semibold text-md'>Description:</span>
                <p className='text-sm'>{ticket.description}</p>
            </div>
            <div className='grid grid-cols-[120px_1fr]'>
                <span className='font-semibold text-md'>Priority:</span>
                <TicketPriority priority={`${ticket.priority}`} />
            </div>
            <div className='grid grid-cols-[120px_1fr]'>
                <span className='font-semibold text-md'>Status:</span>
                <TicketStatus status={`${ticket.status}`} />
            </div>
            <div className='grid grid-cols-[120px_1fr]'>
                <span className='font-semibold text-md'>Reported By:</span>
                <p className='text-sm capitalize'>{ticket.reporter_user}</p>
            </div>
            <div className='grid grid-cols-[120px_1fr]'>
                <span className='font-semibold text-md'>Developer:</span>
                <p className='text-sm capitalize'>{ticket.assigned_user}</p>
            </div>
            <div className='grid grid-cols-[120px_1fr]'>
                <span className='font-semibold text-md'>Created At:</span>
                <p className='text-sm'>{format(new Date(ticket.start_date), 'PPP')}</p>
            </div>
            <div className='grid grid-cols-[120px_1fr]'>
                <span className='font-semibold text-md'>Resolved At:</span>
                <p className='text-sm'>{ticket.completed_date ? format(new Date(ticket.completed_date), 'PPP') : 'Ticket is not yet resolved'}</p>
            </div>
        </>
    );
};

export default TicketDetails;
