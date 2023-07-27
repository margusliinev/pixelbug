import { Ticket } from '@/utils/types';

import { TicketColumn } from '.';

const TicketTable = ({ tickets }: { tickets: Ticket[] }) => {
    return (
        <div className='grid my-2'>
            {tickets &&
                tickets.map((ticket) => {
                    return <TicketColumn {...ticket} key={ticket.ticket_id} />;
                })}
        </div>
    );
};

export default TicketTable;
