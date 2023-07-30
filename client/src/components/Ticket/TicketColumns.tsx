import { ColumnDef } from '@tanstack/react-table';
import { format } from 'date-fns';

import { TicketTable } from '@/utils/types';

export const columnsDesktop: ColumnDef<TicketTable>[] = [
    {
        accessorKey: 'title',
        header: 'Ticket Title',
    },
    {
        accessorKey: 'start_date',
        header: 'Reported Date',
        cell: (ticket) => format(new Date(ticket.row.original.start_date), 'PPP'),
    },
    {
        accessorKey: 'reporter_user',
        header: 'Reported By',
    },
    {
        accessorKey: 'status',
        header: 'Ticket Status',
    },
    {
        accessorKey: 'priority',
        header: 'Ticket Priority',
    },
];

export const columnsMobile: ColumnDef<TicketTable>[] = [
    {
        accessorKey: 'title',
        header: 'Ticket Title',
    },
    {
        accessorKey: 'status',
        header: 'Ticket Status',
    },
    {
        accessorKey: 'priority',
        header: 'Ticket Priority',
    },
];
