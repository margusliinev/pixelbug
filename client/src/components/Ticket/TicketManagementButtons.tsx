import { TicketPage } from '@/utils/types';

import { TicketUpdateButton } from '..';

const TicketManagementButtons = ({ ticket }: { ticket: TicketPage }) => {
    return (
        <ul className='flex items-center gap-2'>
            <li>
                <button className='bg-neutral-700 text-white transition-colors w-fit px-3 py-2 rounded-md text-sm font-medium hover:bg-neutral-800'>
                    Close Ticket
                </button>
            </li>

            <li>
                <TicketUpdateButton ticket={ticket} />
            </li>

            <li>
                <button className='bg-destructive text-white transition-colors w-fit px-3 py-2 rounded-md text-sm font-medium hover:bg-red-600'>
                    Delete Ticket
                </button>
            </li>
        </ul>
    );
};

export default TicketManagementButtons;
