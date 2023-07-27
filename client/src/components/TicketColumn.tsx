import { format } from 'date-fns';
import { Link } from 'react-router-dom';

import { Ticket } from '@/utils/types';

const TicketColumn = ({ title, priority, status, start_date, ticket_id }: Ticket) => {
    const formatted_start_date = format(new Date(start_date), 'PPP');

    return (
        <Link to={`/app/tickets/${ticket_id}`} className='grid grid-cols-4 items-center last-of-type:border-b'>
            <h1 className='p-3 border-t border-l'>{title}</h1>
            <p className='p-3 border-t border-l'>{formatted_start_date}</p>
            <p className='p-3 border-t border-l'>{priority}</p>
            <p className='p-3 border-t border-l border-r'>{status}</p>
        </Link>
    );
};

export default TicketColumn;
