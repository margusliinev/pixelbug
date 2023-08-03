import { ColumnDef } from '@tanstack/react-table';
import { format } from 'date-fns';
import { ArrowUpDown, MoreHorizontal } from 'lucide-react';

import { Button, DropdownMenu, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui';
import { Ticket } from '@/utils/types';

import { TicketSetStatusButton } from '..';

export const columnsDesktop: ColumnDef<Ticket>[] = [
    {
        accessorKey: 'title',
        cell: (ticket) => (ticket.row.original.title.length > 20 ? ticket.row.original.title.substring(0, 20) + '...' : ticket.row.original.title),
        header: ({ column }) => {
            return (
                <Button variant='ghost' className='px-2 hover:bg-neutral-200' onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
                    Title
                    <ArrowUpDown className='ml-2 h-4 w-4' />
                </Button>
            );
        },
    },
    {
        accessorKey: 'project_title',
        header: ({ column }) => {
            return (
                <Button variant='ghost' className='px-2 hover:bg-neutral-200' onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
                    Project
                    <ArrowUpDown className='ml-2 h-4 w-4' />
                </Button>
            );
        },
    },
    {
        accessorKey: 'start_date',
        header: ({ column }) => {
            return (
                <Button variant='ghost' className='px-2 hover:bg-neutral-200' onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
                    Reported Date
                    <ArrowUpDown className='ml-2 h-4 w-4' />
                </Button>
            );
        },
        cell: (ticket) => format(new Date(ticket.row.original.start_date), 'PPP'),
    },
    {
        accessorKey: 'reporter_user',
        header: ({ column }) => {
            return (
                <Button variant='ghost' className='px-2 hover:bg-neutral-200' onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
                    Reported By
                    <ArrowUpDown className='ml-2 h-4 w-4' />
                </Button>
            );
        },
    },
    {
        accessorKey: 'status',
        header: ({ column }) => {
            return (
                <Button variant='ghost' className='px-2 hover:bg-neutral-200' onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
                    Status
                    <ArrowUpDown className='ml-2 h-4 w-4' />
                </Button>
            );
        },
        cell: (ticket) => ticket.row.original.status.replace(/_/g, ' '),
    },
    {
        accessorKey: 'priority',
        header: ({ column }) => {
            return (
                <Button variant='ghost' className='px-2 hover:bg-neutral-200' onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
                    Priority
                    <ArrowUpDown className='ml-2 h-4 w-4' />
                </Button>
            );
        },
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
                        <TicketSetStatusButton ticket={ticket.row.original} type={'link'} />
                    </DropdownMenuContent>
                </DropdownMenu>
            );
        },
    },
];

export const columnsMobile: ColumnDef<Ticket>[] = [
    {
        accessorKey: 'title',
        header: ({ column }) => {
            return (
                <Button variant='ghost' className='px-2 hover:bg-neutral-200' onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
                    Title
                    <ArrowUpDown className='ml-2 h-4 w-4' />
                </Button>
            );
        },
        cell: (ticket) => (ticket.row.original.title.length > 12 ? ticket.row.original.title.substring(0, 12) + '...' : ticket.row.original.title),
    },
    {
        accessorKey: 'status',
        header: ({ column }) => {
            return (
                <Button variant='ghost' className='px-2 hover:bg-neutral-200' onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
                    Status
                    <ArrowUpDown className='ml-2 h-4 w-4' />
                </Button>
            );
        },
        cell: (ticket) => ticket.row.original.status.replace(/_/g, ' '),
    },
    {
        accessorKey: 'priority',
        header: ({ column }) => {
            return (
                <Button variant='ghost' className='px-2 hover:bg-neutral-200' onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
                    Priority
                    <ArrowUpDown className='ml-2 h-4 w-4' />
                </Button>
            );
        },
    },
];
