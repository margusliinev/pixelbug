import { ColumnDef } from '@tanstack/react-table';
import { format } from 'date-fns';
import { ArrowUpDown } from 'lucide-react';

import { Button } from '@/components/ui';
import { Ticket } from '@/utils/types';

export const columnsDesktop: ColumnDef<Ticket>[] = [
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
        cell: (ticket) => (ticket.row.original.title.length > 20 ? ticket.row.original.title.substring(0, 20) + '...' : ticket.row.original.title),
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
        accessorKey: 'assigned_user',
        header: ({ column }) => {
            return (
                <Button variant='ghost' className='px-2 hover:bg-neutral-200' onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
                    Developer
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
        accessorKey: 'assigned_user',
        header: ({ column }) => {
            return (
                <Button variant='ghost' className='px-2 hover:bg-neutral-200' onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
                    Developer
                    <ArrowUpDown className='ml-2 h-4 w-4' />
                </Button>
            );
        },
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
