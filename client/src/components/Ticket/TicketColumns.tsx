import { ColumnDef } from '@tanstack/react-table';
import { format } from 'date-fns';
import { MoreHorizontal } from 'lucide-react';

import { Button, DropdownMenu, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui';
import { Ticket } from '@/utils/types';

import { TicketStatusUpdateButton } from '..';

export const columnsDesktop: ColumnDef<Ticket>[] = [
    {
        accessorKey: 'title',
        header: 'Ticket Title',
        cell: (ticket) => ticket.row.original.title.substring(0, 25) + '...',
    },
    {
        accessorKey: 'project_title',
        header: 'Project',
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
        accessorKey: 'priority',
        header: 'Ticket Priority',
    },
    {
        accessorKey: 'status',
        header: 'Ticket Status',
        cell: (ticket) => ticket.row.original.status.replace(/_/g, ' '),
    },
    {
        id: 'actions',
        cell: (ticket) => {
            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant='ghost' className='h-8 w-8 p-0'>
                            <span className='sr-only'>Open menu</span>
                            <MoreHorizontal className='h-4 w-4' />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align='end'>
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <TicketStatusUpdateButton ticket={ticket.row.original} type={'link'} />
                    </DropdownMenuContent>
                </DropdownMenu>
            );
        },
    },
];

export const columnsMobile: ColumnDef<Ticket>[] = [
    {
        accessorKey: 'title',
        header: 'Ticket Title',
        cell: (ticket) => ticket.row.original.title.substring(0, 20) + '...',
    },
    {
        accessorKey: 'status',
        header: 'Ticket Status',
    },
    {
        accessorKey: 'priority',
        header: 'Ticket Priority',
    },
    {
        id: 'actions',
        cell: (ticket) => {
            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant='ghost' className='h-8 w-8 p-0'>
                            <span className='sr-only'>Open menu</span>
                            <MoreHorizontal className='h-4 w-4' />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align='end'>
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <TicketStatusUpdateButton ticket={ticket.row.original} type={'link'} />
                    </DropdownMenuContent>
                </DropdownMenu>
            );
        },
    },
];
