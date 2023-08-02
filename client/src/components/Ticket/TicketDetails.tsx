import { format, formatDistanceStrict } from 'date-fns';

import { Ticket } from '@/utils/types';

import { TicketPriority, TicketStatus } from '..';

const TicketDetails = ({ ticket }: { ticket: Ticket }) => {
    return (
        <div>
            <div className='px-4 sm:px-0'>
                <h1 className='text-lg font-semibold leading-7'>Ticket Details</h1>
            </div>
            <div className='mt-6 border-t border-neutral-100'>
                <dl className='divide-y divide-neutral-200'>
                    <div className='px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0'>
                        <dt className='text-sm sm:text-base font-medium leading-6'>Ticket Title</dt>
                        <dd className='mt-1 text-sm sm:text-base leading-6 text-neutral-700 sm:col-span-2 sm:mt-0'>{ticket.title}</dd>
                    </div>
                    <div className='px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0'>
                        <dt className='text-sm sm:text-base font-medium leading-6'>Project</dt>
                        <dd className='mt-1 text-sm sm:text-base leading-6 text-neutral-700 sm:col-span-2 sm:mt-0'>{ticket.project_title}</dd>
                    </div>
                    <div className='px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0'>
                        <dt className='text-sm sm:text-base font-medium leading-6'>Description</dt>
                        <dd className='mt-1 text-sm sm:text-base leading-6 text-neutral-700 sm:col-span-2 sm:mt-0'>{ticket.description}</dd>
                    </div>
                    <div className='px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0'>
                        <dt className='text-sm sm:text-base font-medium leading-6'>Reported By</dt>
                        <dd className='mt-1 text-sm sm:text-base leading-6 text-neutral-700 sm:col-span-2 sm:mt-0'>{ticket.reporter_user}</dd>
                    </div>
                    <div className='px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0'>
                        <dt className='text-sm sm:text-base font-medium leading-6'>Developer</dt>
                        <dd className='mt-1 text-sm sm:text-base leading-6 text-neutral-700 sm:col-span-2 sm:mt-0'>{ticket.assigned_user}</dd>
                    </div>
                    <div className='px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0'>
                        <dt className='text-sm sm:text-base font-medium leading-6'>Priority</dt>
                        <dd className='mt-1 text-sm sm:text-base leading-6 text-neutral-700 sm:col-span-2 sm:mt-0'>
                            <TicketPriority priority={`${ticket.priority}`} />
                        </dd>
                    </div>
                    <div className='px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0'>
                        <dt className='text-sm sm:text-base font-medium leading-6'>Status</dt>
                        <dd className='mt-1 text-sm sm:text-base leading-6 text-neutral-700 sm:col-span-2 sm:mt-0'>
                            <TicketStatus status={`${ticket.status}`} />
                        </dd>
                    </div>
                    <div className='px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0'>
                        <dt className='text-sm sm:text-base font-medium leading-6 text-gray-900'>Created At</dt>
                        <dd className='mt-1 text-sm sm:text-base leading-6 text-neutral-700 sm:col-span-2 sm:mt-0'>
                            <p className='text-sm'>{format(new Date(ticket.start_date), 'PPP')}</p>
                        </dd>
                    </div>
                    <div className='px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0'>
                        <dt className='text-sm sm:text-base font-medium leading-6 text-gray-900'>Resolved At</dt>
                        <dd className='mt-1 text-sm sm:text-base leading-6 text-neutral-700 sm:col-span-2 sm:mt-0'>
                            <p className='text-sm'>
                                {ticket.completed_date ? format(new Date(ticket.completed_date), 'PPP') : 'Ticket is not yet resolved'}
                            </p>
                        </dd>
                    </div>
                    <div className='px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0'>
                        <dt className='text-sm sm:text-base font-medium leading-6 text-gray-900'>Resolution time</dt>
                        <dd className='mt-1 text-sm sm:text-base leading-6 text-neutral-700 sm:col-span-2 sm:mt-0'>
                            <p className='text-sm'>
                                {ticket.completed_date
                                    ? formatDistanceStrict(new Date(ticket.completed_date), new Date(ticket.start_date))
                                    : 'Will be calculated once ticket is resolved'}
                            </p>
                        </dd>
                    </div>
                </dl>
            </div>
        </div>
    );
};

export default TicketDetails;
