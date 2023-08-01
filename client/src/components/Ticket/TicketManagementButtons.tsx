import { TicketPage } from '@/utils/types';

import { TicketDeleteButton, TicketUpdateButton } from '..';

const TicketManagementButtons = ({ ticket }: { ticket: TicketPage }) => {
    return (
        <ul className='flex items-center gap-2'>
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
