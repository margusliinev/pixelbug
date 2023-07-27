import { ColumnDef } from '@tanstack/react-table';

import { Ticket } from '@/utils/types';

export const columns: ColumnDef<Ticket>[] = [
    {
        accessorKey: 'title',
        header: 'Ticket Title',
    },
    {
        accessorKey: 'start_date',
        header: 'Created',
    },
    {
        accessorKey: 'project_title',
        header: 'Project Title',
    },
    {
        accessorKey: 'assigned_user.username',
        header: 'Assigned User',
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
