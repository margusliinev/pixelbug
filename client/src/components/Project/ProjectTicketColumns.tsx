import { ColumnDef } from '@tanstack/react-table';
import { format } from 'date-fns';

import { Ticket } from '@/utils/types';

export const columnsDesktop: ColumnDef<Ticket>[] = [
    {
        accessorKey: 'title',
        header: 'Title',
        cell: (ticket) => ticket.row.original.title.substring(0, 25) + '...',
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
        accessorKey: 'assigned_user',
        header: 'Developer',
    },
    {
        accessorKey: 'status',
        header: 'Status',
        cell: (ticket) => ticket.row.original.status.replace(/_/g, ' '),
    },
    {
        accessorKey: 'priority',
        header: 'Priority',
    },
];

export const columnsMobile: ColumnDef<Ticket>[] = [
    {
        accessorKey: 'title',
        header: 'Title',
        cell: (ticket) => ticket.row.original.title.substring(0, 20) + '...',
    },
    {
        accessorKey: 'assigned_user',
        header: 'Developer',
    },
    {
        accessorKey: 'priority',
        header: 'Priority',
    },
];
