import { useAppSelector } from '@/utils/hooks';
import { Ticket } from '@/utils/types';

import { TicketDeleteButton, TicketStatusUpdateButton, TicketUpdateButton } from '..';

const TicketManagementButtons = ({ ticket }: { ticket: Ticket }) => {
    const { user } = useAppSelector((store) => store.user);
    return (
        <>
            {user && user.user_id === ticket.project_manager_id && (
                <ul className='flex items-center gap-2'>
                    <li>
                        <TicketUpdateButton ticket={ticket} />
                    </li>
                    <li>
                        <TicketDeleteButton />
                    </li>
                </ul>
            )}
            {user && user.user_id === ticket.assigned_user_id && (
                <ul className='flex items-center gap-2'>
                    <TicketStatusUpdateButton ticket={ticket} type='button' />
                </ul>
            )}
        </>
    );
};

export default TicketManagementButtons;
