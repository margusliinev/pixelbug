import { TicketPage } from '@/utils/types';

import { TicketDeleteButton, TicketUpdateButton } from '..';

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
                <TicketDeleteButton />
            </li>
        </ul>
    );
};

export default TicketManagementButtons;
