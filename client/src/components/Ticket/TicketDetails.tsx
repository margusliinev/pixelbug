import { format, formatDistanceStrict } from 'date-fns';

import { Ticket } from '@/utils/types';

import { TicketPriority, TicketStatus } from '..';

const TicketDetails = ({ ticket }: { ticket: Ticket }) => {
    return (
        <section className='grid 2xl:grid-cols-2 gap-8'>
            <article className='grid gap-6'>
                <div className='grid grid-cols-[140px_1fr] items-center'>
                    <span className='font-semibold text-md'>Ticket Title:</span>
                    <p className='text-sm'>{ticket.title}</p>
                </div>
                <div className='grid grid-cols-[140px_1fr] items-center'>
                    <span className='font-semibold text-md'>Project:</span>
                    <p className='text-sm capitalize'>{ticket.project_title}</p>
                </div>
                <div className='grid grid-cols-[140px_1fr] items-center'>
                    <span className='font-semibold text-md'>Description:</span>
                    <p className='text-sm'>{ticket.description}</p>
                </div>
                <div className='grid grid-cols-[140px_1fr] items-center'>
                    <span className='font-semibold text-md'>Reported By:</span>
                    <p className='text-sm capitalize'>{ticket.reporter_user}</p>
                </div>
                <div className='grid grid-cols-[140px_1fr] items-center'>
                    <span className='font-semibold text-md'>Developer:</span>
                    <p className='text-sm capitalize'>{ticket.assigned_user}</p>
                </div>
            </article>
            <article className='grid gap-6'>
                <div className='grid grid-cols-[140px_1fr] items-center'>
                    <span className='font-semibold text-md'>Priority:</span>
                    <TicketPriority priority={`${ticket.priority}`} />
                </div>
                <div className='grid grid-cols-[140px_1fr] items-center'>
                    <span className='font-semibold text-md'>Status:</span>
                    <TicketStatus status={`${ticket.status}`} />
                </div>
                <div className='grid grid-cols-[140px_1fr] items-center'>
                    <span className='font-semibold text-md'>Created At:</span>
                    <p className='text-sm'>{format(new Date(ticket.start_date), 'PPP')}</p>
                </div>
                <div className='grid grid-cols-[140px_1fr] items-center'>
                    <span className='font-semibold text-md'>Resolved At:</span>
                    <p className='text-sm'>{ticket.completed_date ? format(new Date(ticket.completed_date), 'PPP') : 'Ticket is not yet resolved'}</p>
                </div>
                <div className='grid grid-cols-[140px_1fr] items-center'>
                    <span className='font-semibold text-md'>Resolution time:</span>
                    <p className='text-sm'>
                        {ticket.completed_date
                            ? formatDistanceStrict(new Date(ticket.completed_date), new Date(ticket.start_date))
                            : 'Will be calculated once ticket is resolved'}
                    </p>
                </div>
            </article>
        </section>
    );
};

export default TicketDetails;
