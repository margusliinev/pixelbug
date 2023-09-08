import { useAppSelector } from '@/utils/hooks';
import { Ticket } from '@/utils/types';

import { TicketDeleteButton, TicketSetStatusModal, TicketUpdateModal } from '..';

const TicketManagementButtons = ({ ticket }: { ticket: Ticket }) => {
    const { user } = useAppSelector((store) => store.user);
    return (
        <>
            {user && user.user_id === ticket.project_manager_id && (
                <ul className='flex items-center gap-2'>
                    <li>
                        <TicketUpdateModal ticket={ticket} />
                    </li>
                    <li>
                        <TicketDeleteButton />
                    </li>
                </ul>
            )}
            {user && user.user_id === ticket.assigned_user_id && user.user_id !== ticket.project_manager_id && (
                <ul className='flex items-center gap-2'>
                    <TicketSetStatusModal ticket={ticket} type='button' />
                </ul>
            )}
        </>
    );
};

export default TicketManagementButtons;
